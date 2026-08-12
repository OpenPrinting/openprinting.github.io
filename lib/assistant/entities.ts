// Deterministic printer/driver entity resolution over the real catalogue.
//
// Strategy (layered, most exact first):
//   L1 normalization/fusing happens in normalize.ts ("HL-1050" == "hl 1050").
//   L2 manufacturer aliases map alternate make names onto catalogue makes.
//   L3 exact lookups: printer id, fused "make model" name, fused model
//      (model-only matches resolve only when unique across makes).
//   L4 prefix scan for partial names ("hp laserjet" -> the LaserJet family).
//   L5 thresholding: only exact-class unique matches resolve silently;
//      everything else surfaces as an ambiguity with ranked candidates.
// Ties are broken by id, mirroring scoreThenIdComparator's convention.
//
// The resolver never invents entities: every candidate id comes from the
// loaded catalogue, and a miss produces an unresolved ref with near-miss
// suggestions (e.g. "Brother HL-2270DW", which is not in the dataset).

import type { DriverSummary, PrinterSummary } from "@/lib/foomatic/types"
import { normalizeDriverFamily } from "@/lib/foomatic/driver-family"
import { MAX_CANDIDATES, RESOLVE_MIN_SCORE, SCORE_EXACT, SCORE_MODEL_EXACT, SCORE_MODEL_PREFIX } from "./constants"
import { fuseText } from "./normalize"
import type { DriverRef, PrinterCandidate, PrinterRef } from "./types"

// Alternate manufacturer names seen in real queries. Canonical names on the
// right must exist in the catalogue; the artifact test enforces that.
export const MANUFACTURER_ALIASES: Record<string, string> = {
  hewlettpackard: "HP",
  hewlitpackard: "HP",
  hplaserjet: "HP", // "HP LaserJet" queries lead with this fused prefix
}

// Tokens that are capability/query vocabulary, never part of an entity name.
// Without this, "laser" would prefix-match every LaserJet model.
const EXCLUDED_ENTITY_TOKENS = new Set([
  "printer", "printers", "driver", "drivers", "laser", "inkjet", "ink", "jet",
  "dot", "matrix", "impact", "colour", "color", "coloured", "colored", "mono",
  "monochrome", "black", "white", "duplex", "sided", "postscript", "post",
  "script", "pcl", "pclxl", "pcl5", "pcl5e", "pcl6", "ps2", "ps3",
  "dpi", "resolution", "res", "linux", "support",
  "supported", "supports", "supporting", "similar", "like", "alternative",
  "alternatives", "recommend", "recommended", "recommendation", "recommendations",
  "compare", "comparison", "versus", "vs", "best", "better", "good", "great",
  "find", "show", "search", "list", "need", "want", "works", "work", "well",
  "use", "uses", "using", "the", "a", "an", "with", "and", "for", "this", "that",
  "what", "which", "why", "how", "does", "do", "is", "are", "to", "me", "my", "i",
  "one", "same", "high", "level",
])

interface IndexedPrinter {
  id: string
  manufacturer: string
  model: string
  fName: string
  fModel: string
}

export interface PrinterIndex {
  byId: Map<string, IndexedPrinter>
  byFusedId: Map<string, string[]>
  byFusedName: Map<string, string[]>
  byFusedModel: Map<string, string[]>
  // Sorted for binary-search prefix scans.
  nameList: { key: string; id: string }[]
  modelList: { key: string; id: string }[]
  makesByFused: Map<string, string>
}

function push(map: Map<string, string[]>, key: string, id: string) {
  if (!key) return
  const existing = map.get(key)
  if (existing) {
    if (!existing.includes(id)) existing.push(id)
  } else {
    map.set(key, [id])
  }
}

export function buildPrinterIndex(catalog: PrinterSummary[]): PrinterIndex {
  const index: PrinterIndex = {
    byId: new Map(),
    byFusedId: new Map(),
    byFusedName: new Map(),
    byFusedModel: new Map(),
    nameList: [],
    modelList: [],
    makesByFused: new Map(),
  }

  // The catalogue contains casing variants of the same make ("Epson" and
  // "EPSON"): the canonical spelling is the most frequent one, ties broken
  // deterministically. Filtering compares fused names, so records under any
  // variant still match.
  const makeCounts = new Map<string, Map<string, number>>()
  for (const printer of catalog) {
    const fused = fuseText(printer.manufacturer)
    const variants = makeCounts.get(fused) ?? new Map<string, number>()
    variants.set(printer.manufacturer, (variants.get(printer.manufacturer) ?? 0) + 1)
    makeCounts.set(fused, variants)
  }
  for (const [fused, variants] of makeCounts) {
    const canonical = [...variants.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    )[0][0]
    index.makesByFused.set(fused, canonical)
  }

  for (const printer of catalog) {
    const entry: IndexedPrinter = {
      id: printer.id,
      manufacturer: printer.manufacturer,
      model: printer.model,
      fName: fuseText(`${printer.manufacturer} ${printer.model}`),
      fModel: fuseText(printer.model),
    }
    index.byId.set(printer.id, entry)
    push(index.byFusedId, fuseText(printer.id), printer.id)
    push(index.byFusedName, entry.fName, printer.id)
    push(index.byFusedModel, entry.fModel, printer.id)
    index.nameList.push({ key: entry.fName, id: printer.id })
    index.modelList.push({ key: entry.fModel, id: printer.id })
  }

  for (const [alias, make] of Object.entries(MANUFACTURER_ALIASES)) {
    if (index.makesByFused.has(fuseText(make))) {
      index.makesByFused.set(alias, make)
    }
  }

  const byKey = (a: { key: string; id: string }, b: { key: string; id: string }) =>
    a.key.localeCompare(b.key) || a.id.localeCompare(b.id)
  index.nameList.sort(byKey)
  index.modelList.sort(byKey)

  return index
}

function prefixScan(list: { key: string; id: string }[], prefix: string, cap: number): string[] {
  if (prefix.length < 3) return []
  let low = 0
  let high = list.length
  while (low < high) {
    const mid = (low + high) >> 1
    if (list[mid].key < prefix) low = mid + 1
    else high = mid
  }
  const ids: string[] = []
  for (let i = low; i < list.length && list[i].key.startsWith(prefix); i++) {
    if (!ids.includes(list[i].id)) ids.push(list[i].id)
    if (ids.length > cap) break
  }
  return ids
}

interface Span {
  start: number
  end: number // exclusive
  score: number
  ids: string[]
  total: number
}

function toCandidates(index: PrinterIndex, ids: string[], score: number): PrinterCandidate[] {
  return ids
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .slice(0, MAX_CANDIDATES)
    .map(id => {
      const entry = index.byId.get(id)
      return {
        id,
        manufacturer: entry?.manufacturer ?? "",
        model: entry?.model ?? "",
        score,
      }
    })
}

export interface PrinterResolution {
  refs: PrinterRef[]
  makeOnly: string | null
  consumed: Set<number>
}

// Scans the token stream for printer references. Marks consumed tokens so the
// lexicon and unapplied-constraint detection only see what is left over.
export function resolvePrintersInText(tokens: string[], index: PrinterIndex): PrinterResolution {
  const consumed = new Set<number>()
  const spans: Span[] = []

  const windowFused = (start: number, end: number) => fuseText(tokens.slice(start, end).join(""))
  // A usable entity window needs at least one token that is neither query
  // vocabulary nor a bare number: "pcl 6" and "600" are capability phrases,
  // not model names.
  const windowUsable = (start: number, end: number) =>
    tokens.slice(start, end).some(token => !EXCLUDED_ENTITY_TOKENS.has(token) && !/^\d+$/.test(token))

  for (let size = Math.min(5, tokens.length); size >= 1; size--) {
    for (let start = 0; start + size <= tokens.length; start++) {
      const end = start + size
      if (!windowUsable(start, end)) continue
      const fused = windowFused(start, end)
      if (fused.length < 2) continue

      const exact = index.byFusedId.get(fused) ?? index.byFusedName.get(fused)
      if (exact) {
        spans.push({ start, end, score: SCORE_EXACT, ids: exact, total: exact.length })
        continue
      }

      const modelExact = index.byFusedModel.get(fused)
      if (modelExact) {
        spans.push({ start, end, score: SCORE_MODEL_EXACT, ids: modelExact, total: modelExact.length })
        continue
      }

      // Prefix matches only for windows that plausibly start a name: either
      // beginning with a make/alias, containing a digit (model numbers), or
      // long enough to be a family name ("laserjet", "stylus").
      const startsWithMake = [...index.makesByFused.keys()].some(
        make => fused.startsWith(make) && fused.length > make.length
      )
      // A bare make name is not a model prefix - the makeOnly handling below
      // covers "show me Canon printers".
      if (startsWithMake || /\d/.test(fused) || (fused.length >= 5 && !index.makesByFused.has(fused))) {
        const nameHits = prefixScan(index.nameList, fused, 200)
        const modelHits = prefixScan(index.modelList, fused, 200)
        const ids = [...new Set([...nameHits, ...modelHits])]
        if (ids.length > 0) {
          spans.push({ start, end, score: SCORE_MODEL_PREFIX, ids, total: ids.length })
        }
      }
    }
  }

  // A span directly followed by a model-number token failed to cover the
  // full name the user typed: "hp deskjet" out of "hp deskjet 5" (the literal
  // HP-DeskJet record must not swallow the 5), or "brother hl" out of
  // "brother hl 2270dw". Skipping it during selection lets a longer prefix
  // span - or the near-miss handling in parse.ts - answer honestly.
  // Exception: "<model> 600 dpi", where the number belongs to a resolution
  // constraint, not the name.
  const truncatesModelNumber = (span: Span) => {
    const next = span.end < tokens.length ? tokens[span.end] : null
    return (
      next !== null &&
      !EXCLUDED_ENTITY_TOKENS.has(next) &&
      /\d/.test(next) &&
      tokens[span.end + 1] !== "dpi"
    )
  }

  // Greedy selection: strongest, then longest, then leftmost; non-overlapping.
  spans.sort((a, b) => b.score - a.score || (b.end - b.start) - (a.end - a.start) || a.start - b.start)
  const chosen: Span[] = []
  for (const span of spans) {
    if (chosen.length >= 2) break
    if (truncatesModelNumber(span)) continue
    if (chosen.some(other => span.start < other.end && other.start < span.end)) continue
    // A weaker span of the same text adds nothing next to a stronger one.
    chosen.push(span)
  }
  chosen.sort((a, b) => a.start - b.start)

  const refs: PrinterRef[] = []
  for (const span of chosen) {
    for (let i = span.start; i < span.end; i++) consumed.add(i)
    const text = tokens.slice(span.start, span.end).join(" ")
    if (span.ids.length === 1 && span.score >= RESOLVE_MIN_SCORE) {
      refs.push({ kind: "resolved", id: span.ids[0] })
    } else {
      refs.push({
        kind: "ambiguous",
        text,
        candidates: toCandidates(index, span.ids, span.score),
        total: span.total,
      })
    }
  }

  // Standalone make mention ("show me Canon printers") -> manufacturer filter.
  let makeOnly: string | null = null
  if (refs.length === 0) {
    for (let size = 2; size >= 1; size--) {
      for (let start = 0; start + size <= tokens.length; start++) {
        if (tokens.slice(start, start + size).some((_, j) => consumed.has(start + j))) continue
        const make = index.makesByFused.get(windowFused(start, start + size))
        if (make) {
          makeOnly = make
          for (let i = start; i < start + size; i++) consumed.add(i)
          break
        }
      }
      if (makeOnly) break
    }
  }

  return { refs, makeOnly, consumed }
}

// Builds an unresolved near-miss reference from leftover model-looking tokens
// ("brother hl 2270dw" when no such model exists). Called by parse.ts AFTER
// the capability lexicon has consumed its tokens, so capability terms like
// "pcl5e" or "600 dpi" can never be misread as model numbers. Suggestions are
// real catalogue entries: model-prefix matches first, then same-make models.
export function findNearMissPrinter(
  tokens: string[],
  consumed: Set<number>,
  index: PrinterIndex,
  make: string | null,
  skipToken: (token: string) => boolean
): { ref: PrinterRef; used: number[] } | null {
  const leftover: number[] = []
  for (let i = 0; i < tokens.length; i++) {
    if (!consumed.has(i) && !EXCLUDED_ENTITY_TOKENS.has(tokens[i]) && !skipToken(tokens[i])) {
      leftover.push(i)
    }
  }
  if (leftover.length === 0) return null
  const text = leftover.map(i => tokens[i]).join(" ")
  const fused = fuseText(text)
  const modelish = fused.length >= 3 && /\d/.test(fused) && (/[a-z]/.test(fused) || make !== null)
  if (!modelish) return null

  const suggestionIds = [
    ...new Set([
      ...prefixScan(index.modelList, fused.slice(0, 4), 50),
      ...prefixScan(index.modelList, fused.slice(0, 3), 50),
    ]),
  ]
  const withinMake = make
    ? suggestionIds.filter(id => index.byId.get(id)?.manufacturer === make)
    : suggestionIds
  let pool = withinMake.length > 0 ? withinMake : suggestionIds
  if (pool.length === 0 && make) {
    // Fall back to the mentioned manufacturer's own models.
    pool = [...index.byId.values()]
      .filter(entry => entry.manufacturer === make)
      .map(entry => entry.id)
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 3)
  }
  return {
    ref: {
      kind: "unresolved",
      text: make ? `${make} ${text}` : text,
      suggestions: toCandidates(index, pool, SCORE_MODEL_PREFIX).slice(0, 3),
    },
    used: leftover,
  }
}

// ---------------------------------------------------------------------------
// Drivers

export interface DriverIndex {
  byFused: Map<string, string>
  families: Map<string, string[]>
  ids: string[]
}

export function buildDriverIndex(drivers: DriverSummary[]): DriverIndex {
  const index: DriverIndex = { byFused: new Map(), families: new Map(), ids: [] }
  for (const driver of drivers) {
    index.ids.push(driver.id)
    index.byFused.set(fuseText(driver.id), driver.id)
    index.byFused.set(fuseText(driver.name), driver.id)
    const family = normalizeDriverFamily(driver.id)
    const members = index.families.get(family)
    if (members) members.push(driver.id)
    else index.families.set(family, [driver.id])
  }
  index.ids.sort((a, b) => a.localeCompare(b))
  for (const members of index.families.values()) members.sort((a, b) => a.localeCompare(b))
  return index
}

// Resolves a driver mention in the token stream. `required` is set when the
// intent clearly asks about a driver, so a miss should produce an unresolved
// ref with suggestions rather than silence.
export function resolveDriverInText(
  tokens: string[],
  consumed: Set<number>,
  index: DriverIndex,
  required: boolean
): DriverRef | null {
  for (let size = 2; size >= 1; size--) {
    for (let start = 0; start + size <= tokens.length; start++) {
      const slice = tokens.slice(start, start + size)
      if (slice.some((_, j) => consumed.has(start + j))) continue
      if (slice.every(token => EXCLUDED_ENTITY_TOKENS.has(token))) continue
      const fused = fuseText(slice.join(""))
      if (fused.length < 3) continue

      const exact = index.byFused.get(fused)
      if (exact) {
        for (let i = start; i < start + size; i++) consumed.add(i)
        return { kind: "resolved", id: exact }
      }

      // A family name is never silently expanded to its members: the caller
      // must ask the user which member driver they mean.
      const family = index.families.get(fused)
      if (family && family.length > 0) {
        for (let i = start; i < start + size; i++) consumed.add(i)
        if (family.length === 1) return { kind: "resolved", id: family[0] }
        return { kind: "family", family: fused, members: family.slice(0, MAX_CANDIDATES) }
      }
    }
  }

  if (!required) return null

  // The intent needs a driver but nothing matched: suggest near names.
  for (let start = 0; start < tokens.length; start++) {
    if (consumed.has(start) || EXCLUDED_ENTITY_TOKENS.has(tokens[start])) continue
    const fused = fuseText(tokens[start])
    if (fused.length < 3) continue
    const suggestions = index.ids
      .filter(id => fuseText(id).startsWith(fused.slice(0, 2)))
      .slice(0, MAX_CANDIDATES)
    consumed.add(start)
    return { kind: "unresolved", text: tokens[start], suggestions }
  }

  return null
}
