// Executes a typed AssistantQuery against the local Foomatic artifacts.
// This is the only assistant layer that performs I/O, always through the
// injected AssistantData source (browser fetches in production, in-memory
// fixtures in tests, fs reads in the eval harness).
//
// Semantics enforced here:
// - Unknown never means false: filters select on known values only, and every
//   filter reports how many printers it excluded because the field is simply
//   not recorded.
// - Similarity answers come from the PR #224 recommendation shards verbatim:
//   shard order is preserved, entries are only ever subset-filtered, and no
//   score is recomputed or reinterpreted.
// - "best"/"recommend" without criteria clarifies instead of ranking, and
//   "better" without a dimension clarifies instead of assuming one.

import type { PrinterSummary } from "@/lib/foomatic/types"
import { normalizeDriverId } from "@/lib/foomatic/routes"
import { MIN_COMFORTABLE_RESULTS } from "./constants"
import type {
  AssistantData,
  AssistantPageContext,
  AssistantQuery,
  BetterDimension,
  CapabilityFilters,
  Chip,
  DriverRef,
  Execution,
  FilterDiagnostics,
  PrinterRef,
  Relaxation,
  SearchDiagnostics,
} from "./types"

export const STATUS_RANK: Record<string, number> = {
  Perfect: 3,
  Mostly: 2,
  Unsupported: 1,
  Unknown: 0,
}

export function printerName(p: { manufacturer?: string; model?: string; id: string }): string {
  const name = `${p.manufacturer ?? ""} ${p.model ?? ""}`.trim()
  return name || p.id
}

// ---------------------------------------------------------------------------
// Filter specs: each maps one CapabilityFilters field onto catalogue fields
// with explicit known/pass predicates so unknown counts stay distinguishable.

interface FilterSpec {
  label: string
  known: (p: PrinterSummary) => boolean
  pass: (p: PrinterSummary) => boolean
}

function buildSpecs(filters: CapabilityFilters): FilterSpec[] {
  const specs: FilterSpec[] = []

  if (filters.manufacturer !== undefined) {
    const make = filters.manufacturer
    specs.push({ label: make, known: () => true, pass: p => p.manufacturer === make })
  }
  if (filters.type !== undefined) {
    const type = filters.type
    specs.push({
      label: type === "dot-matrix" ? "dot-matrix" : type,
      known: p => p.type !== "unknown" && p.type !== undefined,
      pass: p => p.type === type,
    })
  }
  if (filters.color !== undefined) {
    const want = filters.color
    specs.push({
      label: want ? "colour" : "monochrome",
      known: p => p.color === true || p.color === false,
      pass: p => p.color === want,
    })
  }
  if (filters.minDpi !== undefined) {
    const min = filters.minDpi
    specs.push({
      label: `at least ${min} dpi`,
      known: p => typeof p.maxDpi === "number",
      pass: p => typeof p.maxDpi === "number" && p.maxDpi >= min,
    })
  }
  if (filters.postscript !== undefined) {
    const min = filters.postscript.minLevel
    if (min !== undefined) {
      specs.push({
        label: `PostScript ${min}`,
        known: p => typeof p.psLevel === "number",
        pass: p => typeof p.psLevel === "number" && p.psLevel >= min,
      })
    } else {
      // Positive evidence only: a printer without a recorded PS level or
      // POSTSCRIPT token is unknown, not "no PostScript".
      const evidenced = (p: PrinterSummary) =>
        typeof p.psLevel === "number" || (p.cs ?? []).includes("POSTSCRIPT")
      specs.push({ label: "PostScript", known: evidenced, pass: evidenced })
    }
  }
  if (filters.pcl !== undefined) {
    const min = filters.pcl.minLevel
    const tokenFor = min === 6 ? "PCLXL" : min === 5 ? "PCL5E" : null
    if (min !== undefined) {
      specs.push({
        label: `PCL ${min}`,
        known: p =>
          typeof p.pclLevel === "number" || (tokenFor !== null && (p.cs ?? []).includes(tokenFor)),
        pass: p =>
          (typeof p.pclLevel === "number" && p.pclLevel >= min) ||
          (tokenFor !== null && (p.cs ?? []).includes(tokenFor)),
      })
    } else {
      const evidenced = (p: PrinterSummary) =>
        typeof p.pclLevel === "number" ||
        (p.cs ?? []).some(token => token === "PCL" || token === "PCL5E" || token === "PCLXL")
      specs.push({ label: "PCL", known: evidenced, pass: evidenced })
    }
  }
  if (filters.support !== undefined) {
    const want = filters.support
    specs.push({
      label: want === "perfect" ? "Perfect Linux support" : "good Linux support (Perfect or Mostly)",
      known: p => p.status !== "Unknown" && p.status !== undefined,
      pass: p => (want === "perfect" ? p.status === "Perfect" : p.status === "Perfect" || p.status === "Mostly"),
    })
  }

  return specs
}

function applySpecs(pool: PrinterSummary[], specs: FilterSpec[]): {
  matches: PrinterSummary[]
  diagnostics: FilterDiagnostics[]
} {
  const diagnostics: FilterDiagnostics[] = []
  let current = pool
  for (const spec of specs) {
    const matches: PrinterSummary[] = []
    let excludedUnknown = 0
    for (const printer of current) {
      if (spec.pass(printer)) matches.push(printer)
      else if (!spec.known(printer)) excludedUnknown++
    }
    diagnostics.push({
      label: spec.label,
      matched: matches.length,
      excludedKnown: current.length - matches.length - excludedUnknown,
      excludedUnknown,
    })
    current = matches
  }
  return { matches: current, diagnostics }
}

// Presentation order for search results: keys from explicitly requested
// gradable criteria first, then the documented default
// (status rank desc -> driverCount desc -> id asc). This is a disclosed
// lexicographic sort over existing fields, not a score.
function orderMatches(matches: PrinterSummary[], filters: CapabilityFilters): {
  ordered: PrinterSummary[]
  orderingLabel: string
} {
  const parts: string[] = []
  const keys: ((a: PrinterSummary, b: PrinterSummary) => number)[] = []

  if (filters.minDpi !== undefined) {
    keys.push((a, b) => (b.maxDpi ?? 0) - (a.maxDpi ?? 0))
    parts.push("recorded maximum resolution")
  }
  keys.push((a, b) => (STATUS_RANK[b.status ?? "Unknown"] ?? 0) - (STATUS_RANK[a.status ?? "Unknown"] ?? 0))
  parts.push("Linux support status")
  keys.push((a, b) => (b.driverCount ?? 0) - (a.driverCount ?? 0))
  parts.push("number of listed drivers")

  const ordered = [...matches].sort((a, b) => {
    for (const key of keys) {
      const cmp = key(a, b)
      if (cmp !== 0) return cmp
    }
    return a.id.localeCompare(b.id)
  })

  return { ordered, orderingLabel: parts.join(", then ") }
}

// Rebuilds a canonical query string for a filter set, used by relaxation and
// clarification chips so every chip resubmits through the normal pipeline.
export function filtersToQueryText(filters: CapabilityFilters): string {
  const parts: string[] = ["find"]
  if (filters.color === true) parts.push("colour")
  if (filters.color === false) parts.push("monochrome")
  if (filters.manufacturer) parts.push(filters.manufacturer)
  if (filters.type) parts.push(filters.type === "dot-matrix" ? "dot matrix" : filters.type)
  parts.push("printers")
  const withs: string[] = []
  if (filters.postscript) {
    withs.push(filters.postscript.minLevel ? `postscript ${filters.postscript.minLevel}` : "postscript")
  }
  if (filters.pcl) withs.push(filters.pcl.minLevel ? `pcl ${filters.pcl.minLevel}` : "pcl")
  if (filters.minDpi !== undefined) withs.push(`${filters.minDpi} dpi`)
  if (filters.support) withs.push(filters.support === "perfect" ? "perfect linux support" : "good linux support")
  if (filters.duplex) withs.push("duplex")
  if (withs.length > 0) parts.push("with", withs.join(" and "))
  return parts.join(" ")
}

function computeRelaxations(
  catalog: PrinterSummary[],
  filters: CapabilityFilters,
  specLabels: string[]
): Relaxation[] {
  const keys = Object.keys(filters).filter(key => key !== "duplex") as (keyof CapabilityFilters)[]
  if (keys.length < 2) return []
  const relaxations: Relaxation[] = []
  for (const key of keys) {
    const reduced: CapabilityFilters = { ...filters }
    delete reduced[key]
    delete reduced.duplex
    const { matches } = applySpecs(catalog, buildSpecs(reduced))
    if (matches.length > 0) {
      const droppedLabel = specLabels[keys.indexOf(key)] ?? String(key)
      relaxations.push({
        droppedLabel,
        resultCount: matches.length,
        query: filtersToQueryText(reduced),
      })
    }
  }
  return relaxations
}

// ---------------------------------------------------------------------------
// Reference resolution against the loaded catalogue

type RefOutcome = { ok: true; summary: PrinterSummary } | { ok: false; execution: Execution }

function resolveRef(
  ref: PrinterRef,
  context: AssistantPageContext,
  byId: Map<string, PrinterSummary>,
  alternative?: Chip
): RefOutcome {
  if (ref.kind === "resolved") {
    const summary = byId.get(ref.id)
    if (summary) return { ok: true, summary }
    return {
      ok: false,
      execution: { kind: "entity-miss", state: "NO_MATCHES", text: ref.id, suggestions: [], driverSuggestions: [] },
    }
  }
  if (ref.kind === "context") {
    if (context.pageType === "printer") {
      const summary = byId.get(context.printerId)
      if (summary) return { ok: true, summary }
    }
    return {
      ok: false,
      execution: {
        kind: "clarify",
        state: "AMBIGUOUS",
        question: { topic: "context-needed", subject: "printer", alternative },
      },
    }
  }
  if (ref.kind === "ambiguous") {
    return {
      ok: false,
      execution: {
        kind: "clarify",
        state: "AMBIGUOUS",
        question: { topic: "printer-ambiguous", text: ref.text, candidates: ref.candidates, total: ref.total },
      },
    }
  }
  return {
    ok: false,
    execution: {
      kind: "entity-miss",
      state: "NO_MATCHES",
      text: ref.text,
      suggestions: ref.suggestions,
      driverSuggestions: [],
    },
  }
}

// ---------------------------------------------------------------------------

export async function executeQuery(
  query: AssistantQuery,
  context: AssistantPageContext,
  data: AssistantData
): Promise<Execution> {
  switch (query.intent) {
    case "UNSUPPORTED":
      return { kind: "unsupported", state: "UNSUPPORTED", reason: query.reason }

    case "GENERAL_INFO":
      return { kind: "info", state: "SUCCESS", topic: query.topic }

    case "PRINTER_LOOKUP": {
      const byId = await catalogById(data)
      const outcome = resolveRef(query.printer, context, byId)
      if (!outcome.ok) return outcome.execution
      const printer = await data.getPrinter(outcome.summary.id)
      return { kind: "printer-details", state: "SUCCESS", summary: outcome.summary, printer }
    }

    case "SUPPORT_QUERY": {
      const byId = await catalogById(data)
      const outcome = resolveRef(query.printer, context, byId)
      if (!outcome.ok) return outcome.execution
      const printer = await data.getPrinter(outcome.summary.id)
      return { kind: "support", state: "SUCCESS", summary: outcome.summary, printer }
    }

    case "DRIVER_LOOKUP": {
      const byId = await catalogById(data)
      const outcome = resolveRef(query.printer, context, byId)
      if (!outcome.ok) return outcome.execution
      const printer = await data.getPrinter(outcome.summary.id)
      if (!printer) {
        return { kind: "error", state: "ERROR", retryQuery: `which driver does ${printerName(outcome.summary)} use` }
      }
      return { kind: "driver-lookup", state: "SUCCESS", summary: outcome.summary, printer }
    }

    case "CAPABILITY_SEARCH":
      return executeSearch(query.filters, query.unapplied, query.recommend, data)

    case "SIMILAR_PRINTERS":
      return executeSimilar(query.printer, query.filters, query.better ?? null, context, data)

    case "EXPLANATION":
      return executeExplanation(query.source, query.candidate, context, data)

    case "DRIVER_SEARCH":
      return executeDriverSearch(query.driver, context, data)

    case "COMPARISON": {
      const byId = await catalogById(data)
      const first = resolveRef(query.printers[0], context, byId)
      if (!first.ok) return first.execution
      const second = resolveRef(query.printers[1], context, byId)
      if (!second.ok) return second.execution
      const [a, b] = await Promise.all([
        data.getPrinter(first.summary.id),
        data.getPrinter(second.summary.id),
      ])
      if (!a || !b) {
        return {
          kind: "error",
          state: "ERROR",
          retryQuery: `compare ${printerName(first.summary)} and ${printerName(second.summary)}`,
        }
      }
      return { kind: "comparison", state: "SUCCESS", a, b }
    }
  }
}

const catalogCache = new WeakMap<AssistantData, Promise<Map<string, PrinterSummary>>>()

async function catalogById(data: AssistantData): Promise<Map<string, PrinterSummary>> {
  let cached = catalogCache.get(data)
  if (!cached) {
    cached = data.getCatalog().then(catalog => new Map(catalog.map(p => [p.id, p])))
    catalogCache.set(data, cached)
  }
  return cached
}

async function executeSearch(
  filters: CapabilityFilters,
  unapplied: string[],
  recommend: boolean,
  data: AssistantData
): Promise<Execution> {
  const catalog = await data.getCatalog()

  const applicable: CapabilityFilters = { ...filters }
  const insufficient: string[] = []
  if (applicable.duplex) {
    // Recorded for zero printers in the current dataset: not filterable.
    delete applicable.duplex
    insufficient.push("duplex")
  }

  const specs = buildSpecs(applicable)

  if (specs.length === 0) {
    if (insufficient.length > 0) {
      return { kind: "insufficient", state: "INSUFFICIENT_DATA", message: { topic: "duplex", catalogSize: catalog.length } }
    }
    if (recommend) {
      return { kind: "clarify", state: "AMBIGUOUS", question: { topic: "criteria-needed" } }
    }
    // Only unrecognized constraints ("purple printer").
    return {
      kind: "search-results",
      state: "UNSUPPORTED",
      matches: [],
      total: 0,
      recommend,
      diagnostics: {
        filters: [],
        unapplied,
        insufficient,
        relaxations: [],
        orderingLabel: null,
        catalogSize: catalog.length,
      },
    }
  }

  const { matches, diagnostics } = applySpecs(catalog, specs)
  const { ordered, orderingLabel } = orderMatches(matches, applicable)

  const relaxations =
    ordered.length < MIN_COMFORTABLE_RESULTS
      ? computeRelaxations(catalog, applicable, specs.map(spec => spec.label))
      : []

  return {
    kind: "search-results",
    state: ordered.length === 0 ? "NO_MATCHES" : "SUCCESS",
    matches: ordered,
    total: ordered.length,
    recommend,
    diagnostics: {
      filters: diagnostics,
      unapplied,
      insufficient,
      relaxations,
      orderingLabel,
      catalogSize: catalog.length,
    },
  }
}

async function executeSimilar(
  ref: PrinterRef,
  filters: CapabilityFilters,
  better: BetterDimension | "unspecified" | null,
  context: AssistantPageContext,
  data: AssistantData
): Promise<Execution> {
  const byId = await catalogById(data)
  const outcome = resolveRef(ref, context, byId)
  if (!outcome.ok) return outcome.execution
  const source = outcome.summary

  if (better === "unspecified") {
    return {
      kind: "clarify",
      state: "AMBIGUOUS",
      question: { topic: "better-dimension", anchorName: printerName(source) },
    }
  }

  const entries = await data.getRecommendations(source.id)
  if (entries.length === 0) {
    return {
      kind: "insufficient",
      state: "INSUFFICIENT_DATA",
      message: { topic: "no-recommendation-data", printerName: printerName(source) },
    }
  }

  let filtered = entries
  let sourceMaxDpi: number | null = null

  if (better === "support") {
    const sourceRank = STATUS_RANK[source.status ?? "Unknown"] ?? 0
    filtered = filtered.filter(
      entry => entry.status !== "Unknown" && (STATUS_RANK[entry.status] ?? 0) > sourceRank
    )
  } else if (better === "drivers") {
    filtered = filtered.filter(entry => entry.driverCount > (source.driverCount ?? 0))
  } else if (better === "resolution") {
    sourceMaxDpi = typeof source.maxDpi === "number" ? source.maxDpi : null
    if (sourceMaxDpi === null) {
      return {
        kind: "insufficient",
        state: "INSUFFICIENT_DATA",
        message: {
          topic: "field-unrecorded",
          printerName: printerName(source),
          fieldLabel: "maximum resolution",
        },
      }
    }
    const anchor = sourceMaxDpi
    filtered = filtered.filter(entry => {
      const candidate = byId.get(entry.id)
      return typeof candidate?.maxDpi === "number" && candidate.maxDpi > anchor
    })
  }

  // Optional capability filters ("similar printers with colour") subset the
  // shard's top-K in place; shard order is never changed.
  let diagnostics: SearchDiagnostics | null = null
  const applicable: CapabilityFilters = { ...filters }
  delete applicable.duplex
  const specs = buildSpecs(applicable)
  if (specs.length > 0) {
    const summaries = filtered
      .map(entry => byId.get(entry.id))
      .filter((summary): summary is PrinterSummary => summary !== undefined)
    const { matches, diagnostics: filterDiagnostics } = applySpecs(summaries, specs)
    const kept = new Set(matches.map(match => match.id))
    filtered = filtered.filter(entry => kept.has(entry.id))
    diagnostics = {
      filters: filterDiagnostics,
      unapplied: [],
      insufficient: filters.duplex ? ["duplex"] : [],
      relaxations: [],
      orderingLabel: null,
      catalogSize: entries.length,
    }
  } else if (filters.duplex) {
    diagnostics = {
      filters: [],
      unapplied: [],
      insufficient: ["duplex"],
      relaxations: [],
      orderingLabel: null,
      catalogSize: entries.length,
    }
  }

  return {
    kind: "similar",
    state: "SUCCESS",
    source,
    entries: filtered,
    totalBeforeFilters: entries.length,
    diagnostics,
    better,
    sourceMaxDpi,
  }
}

async function executeExplanation(
  source: PrinterRef,
  candidate: PrinterRef | null,
  context: AssistantPageContext,
  data: AssistantData
): Promise<Execution> {
  const byId = await catalogById(data)

  // If we are not on a printer page, there is no recommendation list to
  // explain; when a candidate was named, offer its similarity list instead.
  let alternative: Chip | undefined
  if (candidate && candidate.kind === "resolved") {
    const candidateSummary = byId.get(candidate.id)
    if (candidateSummary) {
      alternative = {
        label: `Printers similar to ${printerName(candidateSummary)}`,
        query: `printers similar to ${printerName(candidateSummary)}`,
      }
    }
  }
  const sourceOutcome = resolveRef(source, context, byId, alternative)
  if (!sourceOutcome.ok) return sourceOutcome.execution
  const sourceSummary = sourceOutcome.summary

  const entries = await data.getRecommendations(sourceSummary.id)
  if (entries.length === 0) {
    return {
      kind: "insufficient",
      state: "INSUFFICIENT_DATA",
      message: { topic: "no-recommendation-data", printerName: printerName(sourceSummary) },
    }
  }

  if (!candidate) {
    return {
      kind: "clarify",
      state: "AMBIGUOUS",
      question: {
        topic: "explanation-candidate",
        sourceName: printerName(sourceSummary),
        topRecommendations: entries.slice(0, 3),
      },
    }
  }

  const candidateOutcome = resolveRef(candidate, context, byId)
  if (!candidateOutcome.ok) return candidateOutcome.execution

  const entry = entries.find(item => item.id === candidateOutcome.summary.id)
  if (!entry) {
    return {
      kind: "explanation-none",
      state: "NO_MATCHES",
      source: sourceSummary,
      candidateName: printerName(candidateOutcome.summary),
    }
  }

  return { kind: "explanation", state: "SUCCESS", source: sourceSummary, entry }
}

async function executeDriverSearch(
  ref: DriverRef,
  context: AssistantPageContext,
  data: AssistantData
): Promise<Execution> {
  if (ref.kind === "family") {
    return {
      kind: "clarify",
      state: "AMBIGUOUS",
      question: { topic: "driver-family", family: ref.family, members: ref.members },
    }
  }
  if (ref.kind === "unresolved") {
    return {
      kind: "clarify",
      state: "AMBIGUOUS",
      question: { topic: "driver-unresolved", text: ref.text, suggestions: ref.suggestions },
    }
  }

  if (ref.kind === "same-as") {
    const byId = await catalogById(data)
    const outcome = resolveRef(ref.printer, context, byId)
    if (!outcome.ok) return outcome.execution
    const printer = await data.getPrinter(outcome.summary.id)
    if (!printer) {
      return { kind: "error", state: "ERROR", retryQuery: `which printers use the same driver as ${printerName(outcome.summary)}` }
    }
    const recommended = (printer.recommended_driver ?? "").trim()
    if (!recommended) {
      return {
        kind: "insufficient",
        state: "INSUFFICIENT_DATA",
        message: {
          topic: "field-unrecorded",
          printerName: printerName(outcome.summary),
          fieldLabel: "recommended driver",
        },
      }
    }
    const driverId = normalizeDriverId(recommended)
    const driver = await data.getDriver(driverId)
    if (!driver) {
      return { kind: "error", state: "ERROR", retryQuery: `which printers use ${driverId}` }
    }
    return {
      kind: "driver-search",
      state: "SUCCESS",
      driver,
      anchor: outcome.summary,
      anchorDriverName: driverId,
    }
  }

  const driver = await data.getDriver(ref.id)
  if (!driver) {
    return {
      kind: "clarify",
      state: "AMBIGUOUS",
      question: { topic: "driver-unresolved", text: ref.id, suggestions: [] },
    }
  }
  return { kind: "driver-search", state: "SUCCESS", driver, anchor: null, anchorDriverName: null }
}
