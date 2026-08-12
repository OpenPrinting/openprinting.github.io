// Named tunables for the assistant. Every value here is documented in the
// table in docs/foomatic-assistant.md, and tools/assistant-eval/run.ts fails
// when the documented values drift from these (same convention as
// tools/eval/check-docs.mjs for the recommendation pipeline).

// Queries longer than this are truncated before parsing; no realistic printer
// question needs more, and it bounds parser work on hostile input.
export const MAX_QUERY_LENGTH = 300

// Entity resolution: candidate scores. Exact id / exact "make model" name
// matches resolve immediately; an exact model match resolves only when unique.
export const SCORE_EXACT = 4
export const SCORE_MODEL_EXACT = 3
export const SCORE_MODEL_PREFIX = 1

// A span resolves silently only at or above this score AND with a unique top
// candidate; everything else surfaces as an ambiguity with candidates.
export const RESOLVE_MIN_SCORE = 3

// How many candidates an ambiguity/clarification response carries.
export const MAX_CANDIDATES = 5

// How many result cards a search response renders (total count is stated).
export const MAX_RESULT_CARDS = 5

// "high resolution" is interpreted as at least this many dpi; the response
// discloses the interpretation.
export const HIGH_RES_MIN_DPI = 1200

// When a filter excludes at least this fraction of the pre-filter candidates
// because the field is unrecorded, the response must say so.
export const UNKNOWN_REPORT_RATIO = 0.25

// When a search yields fewer results than this, one-filter relaxations are
// offered (never auto-applied).
export const MIN_COMFORTABLE_RESULTS = 3
