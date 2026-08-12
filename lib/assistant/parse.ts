// Free text -> typed AssistantQuery.
//
// Intent classification is an ordered, deterministic rule cascade. The
// precedence is deliberate and documented in docs/foomatic-assistant.md:
//
//   1. COMPARISON        (two printer refs + compare marker)
//   2. EXPLANATION       (why + recommendation vocabulary)
//   3. SIMILAR_PRINTERS  (similar/alternatives/better vocabulary)
//   4. DRIVER_SEARCH     (printers-for-driver phrasing, "same driver")
//   5. DRIVER_LOOKUP     (driver-of-printer phrasing)
//   6. SUPPORT_QUERY     (support question about one specific printer)
//   7. GENERAL_INFO      (meta questions about grades/similarity/help)
//   8. CAPABILITY_SEARCH (recommend/best or any capability filters)
//   9. PRINTER_LOOKUP    (a printer reference and nothing more specific)
//  10. UNSUPPORTED       (unclear-but-domain or out-of-domain)
//
// Specific rules sit above generic ones so "why was this recommended?" can
// never be swallowed by the recommendation rule, and "compare X and Y" can
// never be read as a lookup of X.

import type { DriverIndex, PrinterIndex } from "./entities"
import { findNearMissPrinter, resolveDriverInText, resolvePrintersInText } from "./entities"
import { countFilters, extractFilters } from "./lexicon"
import { tokenize } from "./normalize"
import type { AssistantPageContext, AssistantQuery, BetterDimension, PrinterRef } from "./types"

// Words that are query mechanics, not constraints: leftovers on this list are
// ignored; anything else left over surfaces as an unapplied constraint.
const STOPWORDS = new Set([
  "a", "an", "the", "i", "me", "my", "we", "you", "it", "they", "them", "please",
  "find", "show", "search", "list", "give", "get", "need", "want", "looking",
  "buy", "tell", "about", "suggest", "recommend", "recommended", "recommendation",
  "recommendations", "best", "better", "good", "great", "top",
  "printer", "printers", "device", "machine", "model", "models", "driver", "drivers",
  "with", "and", "or", "that", "which", "what", "who", "why", "how", "when",
  "is", "are", "was", "were", "be", "been", "does", "do", "did", "has", "have",
  "can", "could", "would", "should", "will",
  "in", "on", "to", "of", "for", "at", "by", "from", "as",
  "this", "one", "some", "any", "all", "more", "most", "very",
  "similar", "like", "alternative", "alternatives", "replacement", "instead",
  "compare", "comparison", "versus", "vs",
  "support", "supported", "supports", "supporting", "linux",
  "works", "work", "well", "use", "uses", "using", "used", "same",
  "prints", "printing", "print", "there", "than", "no", "not", "if",
  "higher", "lower", "level", "so", "just", "really", "am", "s", "least",
  "resolution", "res", "options", "similarity",
])

const CONTEXT_PHRASES: string[][] = [
  ["this", "printer"],
  ["this", "driver"],
  ["this", "one"],
  ["this", "model"],
  ["this", "device"],
]

export interface ParseInputs {
  printers: PrinterIndex
  drivers: DriverIndex
}

export function parseQuery(
  input: string,
  context: AssistantPageContext,
  indexes: ParseInputs
): AssistantQuery {
  const tokens = tokenize(input)
  if (tokens.length === 0) {
    return { intent: "UNSUPPORTED", reason: "empty" }
  }

  const has = (word: string) => tokens.includes(word)
  const hasPhrase = (phrase: string[]) =>
    tokens.some((_, i) => phrase.every((word, j) => tokens[i + j] === word))

  // --- signals (read from the raw token stream, independent of consumption)
  const compareSignal =
    has("compare") || has("comparison") || has("versus") || has("vs") ||
    has("difference") || has("differences")
  const whySignal = has("why")
  const recommendSignal =
    has("recommend") || has("recommended") || has("recommendation") ||
    has("recommendations") || has("suggest") || has("suggested") || has("suggests") ||
    hasPhrase(["should", "i"])
  const similarSignal =
    has("similar") || has("alternative") || has("alternatives") ||
    has("replacement") || hasPhrase(["like", "this"]) || hasPhrase(["instead", "of"])
  const betterSignal = has("better") || hasPhrase(["best", "alternatives"]) || hasPhrase(["best", "alternative"])
  const bestSignal = has("best")
  const driverWord = has("driver") || has("drivers")
  const printersPlural = has("printers")
  const supportSignal = has("support") || has("supported") || has("linux")
  const listVerb =
    has("find") || has("show") || has("search") || has("list") ||
    has("need") || has("want") || has("looking") || has("get") || has("give")
  const meaningSignal = has("mean") || has("means") || has("meaning") || has("meant")
  const helpSignal =
    hasPhrase(["what", "can", "you", "do"]) || hasPhrase(["who", "are", "you"]) ||
    (tokens.length <= 2 && has("help"))

  // --- context references ("this printer", bare "this"/"it" in short queries)
  const contextRef =
    CONTEXT_PHRASES.some(hasPhrase) ||
    has("this") ||
    (has("it") && tokens.length <= 7)

  // --- entity resolution (before the lexicon: model names such as
  // "Color LaserJet 4500" contain capability words that must not be eaten)
  const printerScan = resolvePrintersInText(tokens, indexes.printers)
  const refs = printerScan.refs
  const consumed = printerScan.consumed

  const printerRef = (): PrinterRef => refs[0] ?? { kind: "context" }

  // --- capability filters on what remains
  const lexicon = extractFilters(tokens.map((token, i) => (consumed.has(i) ? "" : token)))
  const filters = lexicon.filters
  for (const i of lexicon.consumed) consumed.add(i)
  if (printerScan.makeOnly) {
    filters.manufacturer = printerScan.makeOnly
  }

  // --- near-miss models ("brother hl 2270dw"): after the lexicon, so
  // capability tokens can never be misread as model numbers. Skipped for
  // driver-shaped queries, whose leftover token is a driver name.
  const driverShaped =
    driverWord || hasPhrase(["same", "driver"]) || hasPhrase(["same", "drivers"]) ||
    (printersPlural && (has("use") || has("uses") || has("using") || has("work") || has("works")))
  if (refs.length === 0 && !driverShaped) {
    const nearMiss = findNearMissPrinter(
      tokens,
      consumed,
      indexes.printers,
      printerScan.makeOnly,
      token => STOPWORDS.has(token)
    )
    if (nearMiss) {
      refs.push(nearMiss.ref)
      for (const i of nearMiss.used) consumed.add(i)
      delete filters.manufacturer
    }
  }

  // --- unapplied constraints: leftover content words
  const unapplied: string[] = []
  for (let i = 0; i < tokens.length; i++) {
    if (!consumed.has(i) && !STOPWORDS.has(tokens[i]) && !/^\d+$/.test(tokens[i])) {
      unapplied.push(tokens[i])
    }
  }

  // --- "better" comparison dimension, when one was named
  const wantsBetter = betterSignal || (bestSignal && similarSignal)
  const betterDimension = ((): BetterDimension | null => {
    if (!wantsBetter && !similarSignal) return null
    if (wantsBetter && filters.support) return "support"
    if ((wantsBetter || has("higher")) && (has("resolution") || has("res"))) return "resolution"
    if (hasPhrase(["driver", "options"]) || hasPhrase(["more", "drivers"]) || (wantsBetter && driverWord)) return "drivers"
    if (wantsBetter && has("similarity")) return "similarity"
    return null
  })()

  // ------------------------------------------------------------- cascade

  // 1. COMPARISON
  if (compareSignal) {
    if (refs.length === 2) {
      return { intent: "COMPARISON", printers: [refs[0], refs[1]] }
    }
    if (refs.length === 1 && (contextRef || context.pageType === "printer")) {
      return { intent: "COMPARISON", printers: [{ kind: "context" }, refs[0]] }
    }
    return { intent: "UNSUPPORTED", reason: "unclear" }
  }

  // 2. EXPLANATION
  if (whySignal && (recommendSignal || similarSignal)) {
    // "why was X recommended?" reads X as the recommended candidate and the
    // current page's printer as the recommendation source.
    const candidate = refs[0] ?? null
    return { intent: "EXPLANATION", source: { kind: "context" }, candidate }
  }

  // 3. SIMILAR_PRINTERS (including "better alternatives")
  if (similarSignal || wantsBetter) {
    const better = betterDimension ?? (wantsBetter ? "unspecified" : undefined)
    if (better) {
      // The support filter extracted from "better linux support" is the
      // comparison dimension here, not a result filter.
      if (betterDimension === "support") delete filters.support
      return { intent: "SIMILAR_PRINTERS", printer: printerRef(), filters, unapplied, better }
    }
    return { intent: "SIMILAR_PRINTERS", printer: printerRef(), filters, unapplied }
  }

  // 4. DRIVER_SEARCH ("which printers use ...", "same driver as this")
  if (hasPhrase(["same", "driver"]) || hasPhrase(["same", "drivers"])) {
    return { intent: "DRIVER_SEARCH", driver: { kind: "same-as", printer: printerRef() } }
  }
  if (printersPlural && (driverWord || has("use") || has("uses") || has("using") || has("work") || has("works"))) {
    // Fresh consumption set: in a printers-for-driver query, the driver name
    // may have been speculatively claimed by the printer scan ("laserjet").
    const driverRef = resolveDriverInText(tokens, new Set(), indexes.drivers, true)
    if (driverRef) {
      return { intent: "DRIVER_SEARCH", driver: driverRef }
    }
  }

  // 5. DRIVER_LOOKUP ("which driver does X use", "driver for this printer")
  if (driverWord && !printersPlural && (refs.length > 0 || contextRef || context.pageType === "printer")) {
    // A resolved driver mention plus a printer would be ambiguous phrasing;
    // prefer the printer's driver question, which is the common ask.
    return { intent: "DRIVER_LOOKUP", printer: printerRef() }
  }

  // 6. SUPPORT_QUERY (about one specific printer, not a filtered list)
  if (
    supportSignal &&
    !printersPlural &&
    !listVerb &&
    !recommendSignal &&
    (refs.length > 0 || contextRef || context.pageType === "printer")
  ) {
    return { intent: "SUPPORT_QUERY", printer: printerRef() }
  }

  // 7. GENERAL_INFO (closed topics only)
  if (helpSignal) {
    return { intent: "GENERAL_INFO", topic: "assistant-help" }
  }
  if (meaningSignal || hasPhrase(["how", "does"]) || has("explain")) {
    if (has("perfect") || has("mostly") || has("unsupported") || has("grade") || has("grades") || has("functionality")) {
      return { intent: "GENERAL_INFO", topic: "support-grades" }
    }
    if (has("similarity") || has("score") || has("confidence") || has("tier") || has("recommendation") || has("recommendations")) {
      return { intent: "GENERAL_INFO", topic: "similarity" }
    }
  }

  // 8. CAPABILITY_SEARCH / recommendation requests
  const hasFilters = countFilters(filters) > 0
  const domainWord = has("printer") || has("printers") || driverWord || supportSignal
  if (recommendSignal || bestSignal) {
    return { intent: "CAPABILITY_SEARCH", filters, unapplied, recommend: true }
  }

  // 9. PRINTER_LOOKUP
  if (refs.length > 0) {
    return { intent: "PRINTER_LOOKUP", printer: refs[0] }
  }
  if (contextRef && (context.pageType === "printer" || context.pageType === "driver")) {
    return { intent: "PRINTER_LOOKUP", printer: { kind: "context" } }
  }

  if (hasFilters || (unapplied.length > 0 && domainWord)) {
    return { intent: "CAPABILITY_SEARCH", filters, unapplied, recommend: false }
  }

  // "find me a good printer": a list request with no usable criteria asks for
  // criteria instead of dead-ending.
  if (domainWord && listVerb && unapplied.length === 0) {
    return { intent: "CAPABILITY_SEARCH", filters, unapplied, recommend: true }
  }

  // 10. UNSUPPORTED
  return { intent: "UNSUPPORTED", reason: domainWord ? "unclear" : "out-of-domain" }
}
