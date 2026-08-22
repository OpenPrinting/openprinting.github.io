// Shared types for the printer assistant.
//
// The pipeline is: free text -> parse (nlu) -> AssistantQuery (typed IR)
// -> execute (the only layer that touches data) -> Execution (typed result)
// -> respond (pure templates) -> ResponsePlan (typed blocks) -> React.
// Natural language never controls execution directly, and rendered output is
// always assembled from typed fields of retrieved records - the assistant has
// no way to state a fact that is not present in the local Foomatic artifacts.

import type { Printer, PrinterSummary, DriverSummary, DriverRecord } from "@/lib/foomatic/types"

// ---------------------------------------------------------------------------
// Page context

export type AssistantPageContext =
  | { pageType: "printer"; route: string; printerId: string }
  | { pageType: "driver"; route: string; driverId: string }
  | { pageType: "printer-directory"; route: string }
  | { pageType: "driver-directory"; route: string }
  | { pageType: "home"; route: string }
  | { pageType: "other"; route: string }

// ---------------------------------------------------------------------------
// Entity references

export interface PrinterCandidate {
  id: string
  manufacturer: string
  model: string
  score: number
}

export type PrinterRef =
  | { kind: "resolved"; id: string }
  | { kind: "context" }
  | { kind: "ambiguous"; text: string; candidates: PrinterCandidate[]; total: number }
  | { kind: "unresolved"; text: string; suggestions: PrinterCandidate[] }

export type DriverRef =
  | { kind: "resolved"; id: string }
  | { kind: "context" }
  | { kind: "same-as"; printer: PrinterRef }
  | { kind: "family"; family: string; members: string[] }
  | { kind: "unresolved"; text: string; suggestions: string[] }

// ---------------------------------------------------------------------------
// Capability filters
//
// Unknown never means false: every filter selects on known-positive (or
// known-negative, for mono) values only. Records whose field is unrecorded
// are excluded from the result AND counted separately, so responses can say
// "N more printers don't record this" instead of implying absence.

export interface PdlFilter {
  // Minimum language level when the user named one ("PostScript 3", "PCL 6").
  minLevel?: number
}

export interface CapabilityFilters {
  color?: boolean
  type?: "laser" | "inkjet" | "dot-matrix"
  minDpi?: number
  postscript?: PdlFilter
  pcl?: PdlFilter
  support?: "perfect" | "good"
  manufacturer?: string
  // Recognized so duplex queries are understood, but the current dataset
  // records duplex for zero printers - execution reports INSUFFICIENT_DATA
  // instead of pretending an empty result means "no duplex printers exist".
  duplex?: true
}

export type BetterDimension = "support" | "similarity" | "resolution" | "drivers"

// ---------------------------------------------------------------------------
// Typed query IR

export type GeneralInfoTopic = "support-grades" | "similarity" | "assistant-help"

export type AssistantQuery =
  | { intent: "PRINTER_LOOKUP"; printer: PrinterRef }
  | {
      intent: "CAPABILITY_SEARCH"
      filters: CapabilityFilters
      // Constraint words the parser recognized as constraints but cannot map
      // to any catalogue field ("purple", "wireless"). Never dropped silently.
      unapplied: string[]
      // True when phrased as a recommendation request ("recommend", "best").
      // With no filters this must clarify, never rank.
      recommend: boolean
    }
  | {
      intent: "SIMILAR_PRINTERS"
      printer: PrinterRef
      filters: CapabilityFilters
      unapplied: string[]
      // "better alternatives": undefined = plain similarity request;
      // "unspecified" = user said better without a dimension -> clarify.
      better?: BetterDimension | "unspecified"
    }
  | { intent: "EXPLANATION"; source: PrinterRef; candidate: PrinterRef | null }
  | { intent: "SUPPORT_QUERY"; printer: PrinterRef }
  | { intent: "DRIVER_LOOKUP"; printer: PrinterRef }
  | { intent: "DRIVER_SEARCH"; driver: DriverRef }
  | { intent: "COMPARISON"; printers: [PrinterRef, PrinterRef] }
  | { intent: "GENERAL_INFO"; topic: GeneralInfoTopic }
  | { intent: "UNSUPPORTED"; reason: "out-of-domain" | "empty" | "unclear" }

// ---------------------------------------------------------------------------
// Execution results

export type ResultState =
  | "SUCCESS"
  | "NO_MATCHES"
  | "AMBIGUOUS"
  | "INSUFFICIENT_DATA"
  | "UNSUPPORTED"
  | "ERROR"

export interface FilterDiagnostics {
  // Human-readable name of the constraint ("colour", "laser", "600+ dpi").
  label: string
  matched: number
  excludedKnown: number
  excludedUnknown: number
}

export interface Relaxation {
  droppedLabel: string
  resultCount: number
  query: string
}

export interface SearchDiagnostics {
  filters: FilterDiagnostics[]
  unapplied: string[]
  // Filters that could not be evaluated because the catalogue records the
  // field for (almost) no printers - currently only duplex.
  insufficient: string[]
  relaxations: Relaxation[]
  orderingLabel: string | null
  catalogSize: number
}

export interface RecommendationEntry {
  // Schema of public/foomatic-db/recommendations/<id>.json entries
  // (docs/foomatic-data-formats.md). Produced by PR #224's pipeline;
  // consumed verbatim - never re-scored or re-ranked here.
  id: string
  score: number
  sharedFeatures: string[]
  manufacturer?: string
  model?: string
  status: string
  type: string
  driverCount: number
}

export type Execution =
  | { kind: "printer-details"; state: ResultState; summary: PrinterSummary; printer: Printer | null }
  | {
      kind: "search-results"
      state: ResultState
      matches: PrinterSummary[]
      total: number
      diagnostics: SearchDiagnostics
      recommend: boolean
    }
  | {
      kind: "similar"
      state: ResultState
      source: PrinterSummary
      entries: RecommendationEntry[]
      totalBeforeFilters: number
      diagnostics: SearchDiagnostics | null
      better: BetterDimension | null
      // For the resolution dimension: the anchor's own recorded maxDpi.
      sourceMaxDpi: number | null
    }
  | { kind: "explanation"; state: ResultState; source: PrinterSummary; entry: RecommendationEntry }
  | { kind: "explanation-none"; state: "NO_MATCHES"; source: PrinterSummary; candidateName: string }
  | { kind: "support"; state: ResultState; summary: PrinterSummary; printer: Printer | null }
  | { kind: "driver-lookup"; state: ResultState; summary: PrinterSummary; printer: Printer }
  | {
      kind: "driver-search"
      state: ResultState
      driver: DriverRecord
      // Present for "same driver as X": names the interpretation used.
      anchor: PrinterSummary | null
      anchorDriverName: string | null
    }
  | { kind: "comparison"; state: ResultState; a: Printer; b: Printer }
  | { kind: "clarify"; state: "AMBIGUOUS"; question: ClarifyQuestion }
  | { kind: "info"; state: "SUCCESS"; topic: GeneralInfoTopic }
  | { kind: "insufficient"; state: "INSUFFICIENT_DATA"; message: InsufficientReason }
  | { kind: "entity-miss"; state: "NO_MATCHES"; text: string; suggestions: PrinterCandidate[]; driverSuggestions: string[] }
  | { kind: "unsupported"; state: "UNSUPPORTED"; reason: "out-of-domain" | "empty" | "unclear" }
  | { kind: "error"; state: "ERROR"; retryQuery: string }

export type InsufficientReason =
  | { topic: "duplex"; catalogSize: number }
  | { topic: "no-recommendation-data"; printerName: string }
  | { topic: "field-unrecorded"; printerName: string; fieldLabel: string }

export type ClarifyQuestion =
  | { topic: "printer-ambiguous"; text: string; candidates: PrinterCandidate[]; total: number }
  | { topic: "criteria-needed" }
  | { topic: "better-dimension"; anchorName: string }
  | { topic: "driver-family"; family: string; members: string[] }
  | { topic: "driver-unresolved"; text: string; suggestions: string[] }
  | { topic: "context-needed"; subject: "printer" | "driver"; alternative?: Chip }
  | { topic: "explanation-candidate"; sourceName: string; topRecommendations: RecommendationEntry[] }

// ---------------------------------------------------------------------------
// Response plan (typed blocks; the UI renders these with React only)

export interface PrinterCardData {
  id: string
  manufacturer: string
  model: string
  status: string
  type?: string
  driverCount?: number
  // Present only for recommendation-backed cards.
  score?: number
  tierLabel?: string
  tierTone?: "high" | "good" | "moderate" | "limited"
  // Known capability chips ("Colour", "600 dpi") - only rendered for
  // established values, never for unknowns.
  features?: string[]
}

export interface DriverCardData {
  id: string
  name: string
  supplier?: string | null
  type?: string | null
  printerCount: number
}

export interface ComparisonRow {
  label: string
  a: string
  b: string
}

export interface Chip {
  label: string
  query: string
}

export type ResponseBlock =
  | { kind: "text"; text: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "printer-cards"; printers: PrinterCardData[] }
  | { kind: "driver-card"; driver: DriverCardData }
  | { kind: "comparison"; aName: string; bName: string; rows: ComparisonRow[] }
  | { kind: "chips"; chips: Chip[] }

export interface ResponsePlan {
  blocks: ResponseBlock[]
}

// ---------------------------------------------------------------------------
// Data access

export interface AssistantData {
  getCatalog(): Promise<PrinterSummary[]>
  getPrinter(id: string): Promise<Printer | null>
  getRecommendations(id: string): Promise<RecommendationEntry[]>
  getDriversMap(): Promise<DriverSummary[]>
  getDriver(id: string): Promise<DriverRecord | null>
}
