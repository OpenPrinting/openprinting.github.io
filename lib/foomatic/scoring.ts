// Scoring model for the recommendation engine, shared between
// scripts/foomatic/compute-similarity.ts and its test suite.
//
// The published score is not a bare cosine:
//
//   score(a, b) = cos(a, b) * (1 - exp(-k / EVIDENCE_TAU)) * conflictPenalty(a, b)
//
// where k counts feature dimensions on which both printers are non-zero.
// Each factor exists because a measured failure mode demanded it — see
// docs/foomatic-recommendation-quality.md for the evidence.

import type { Printer } from "./types"

// Cosine on sparse one-hot vectors saturates at 1.0 whenever both vectors are
// nearly empty: two printers that share a single dimension and have no other
// known attributes are geometrically identical, yet that is almost no evidence.
// tau = 4 maps overlap 1 -> 0.22, 4 -> 0.63, 8 -> 0.86, 12 -> 0.95.
export const EVIDENCE_TAU = 4

// Floor applied to the fully-damped score. Because evidenceWeight(1) ~= 0.22,
// any pair resting on a single shared dimension falls below this automatically,
// which is what removes "recommended because both use a catch-all driver".
export const MIN_SIMILARITY_SCORE = 0.35

// The feature vector only rewards agreement; it has no way to express that two
// capabilities actively conflict. A mono printer sharing a driver family with a
// colour one still scored well, even though it cannot substitute for it. These
// multiplicative penalties encode hard substitution barriers.
export const TYPE_CONFLICT_PENALTY = 0.5
export const COLOR_CONFLICT_PENALTY = 0.6
export const RESOLUTION_CONFLICT_PENALTY = 0.7
export const RESOLUTION_CONFLICT_RATIO = 4

export function evidenceWeight(overlap: number): number {
  return 1 - Math.exp(-overlap / EVIDENCE_TAU)
}

// Count dimensions where both vectors carry a non-zero weight.
export function overlapCount(a: number[], b: number[]): number {
  let n = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== 0 && b[i] !== 0) n++
  }
  return n
}

export function conflictPenalty(a: Printer, b: Printer): number {
  let penalty = 1

  if (
    a.type &&
    b.type &&
    a.type !== "unknown" &&
    b.type !== "unknown" &&
    a.type !== b.type
  ) {
    penalty *= TYPE_CONFLICT_PENALTY
  }

  if (
    (a.color === true && b.color === false) ||
    (a.color === false && b.color === true)
  ) {
    penalty *= COLOR_CONFLICT_PENALTY
  }

  if (a.maxDpi != null && b.maxDpi != null && a.maxDpi > 0 && b.maxDpi > 0) {
    const ratio = Math.max(a.maxDpi, b.maxDpi) / Math.min(a.maxDpi, b.maxDpi)

    if (ratio >= RESOLUTION_CONFLICT_RATIO) {
      penalty *= RESOLUTION_CONFLICT_PENALTY
    }
  }

  return penalty
}

// Resolution explanations name the tier's range, never a specific figure, so
// the UI cannot claim a DPI that neither printer actually has.
export function resolutionTier(dpi: number | null | undefined): string | null {
  if (dpi == null) return null
  if (dpi <= 300) return "up to 300 dpi"
  if (dpi <= 600) return "300-600 dpi"
  if (dpi <= 1200) return "600-1200 dpi"
  return "over 1200 dpi"
}

// Candidates with byte-identical feature vectors are genuinely
// indistinguishable given the recorded data, so ties are broken by id to keep
// output deterministic across runs and platforms rather than pretending to a
// ranking the data cannot support.
export function scoreThenIdComparator<T extends { index: number; score: number }>(
  idOf: (index: number) => string
): (x: T, y: T) => number {
  return (x, y) => y.score - x.score || idOf(x.index).localeCompare(idOf(y.index))
}
