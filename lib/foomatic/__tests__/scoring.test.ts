import { describe, expect, it } from "vitest"
import {
  COLOR_CONFLICT_PENALTY,
  CONFIDENCE_GOOD_THRESHOLD,
  CONFIDENCE_HIGH_THRESHOLD,
  CONFIDENCE_MODERATE_THRESHOLD,
  EVIDENCE_TAU,
  MIN_SIMILARITY_SCORE,
  RESOLUTION_CONFLICT_PENALTY,
  RESOLUTION_CONFLICT_RATIO,
  TYPE_CONFLICT_PENALTY,
  confidenceTier,
  conflictPenalty,
  evidenceWeight,
  overlapCount,
  resolutionTier,
  scoreThenIdComparator,
} from "../scoring"
import type { Printer } from "../types"

const printer = (overrides: Partial<Printer>): Printer =>
  ({ id: "test", manufacturer: "Test", model: "T", ...overrides }) as Printer

describe("evidenceWeight", () => {
  it("gives zero confidence to zero overlap", () => {
    expect(evidenceWeight(0)).toBe(0)
  })

  it("is strictly monotonic in the amount of evidence", () => {
    let prev = evidenceWeight(0)
    for (let k = 1; k <= 20; k++) {
      const w = evidenceWeight(k)
      expect(w).toBeGreaterThan(prev)
      prev = w
    }
  })

  it("never exceeds 1, and stays below 1 across the realistic evidence range", () => {
    // In exact arithmetic 1 - exp(-k/tau) < 1 for all finite k, but in float64
    // the difference underflows to exactly 1 once exp(-k/tau) < 2^-53. The
    // guarantee that matters is: <= 1 always, and strictly < 1 for overlaps a
    // real printer pair can produce (well past the 463-feature space).
    expect(evidenceWeight(50)).toBeLessThan(1)
    expect(evidenceWeight(10000)).toBeLessThanOrEqual(1)
  })

  it("matches the documented damping curve for tau", () => {
    expect(evidenceWeight(EVIDENCE_TAU)).toBeCloseTo(1 - Math.exp(-1), 10)
  })

  it("keeps a single-signal pair below the score floor even at perfect cosine", () => {
    // The invariant that removes "recommended because both use a catch-all
    // driver": cosine can be at most 1, so a one-dimension overlap can never
    // clear MIN_SIMILARITY_SCORE.
    expect(1.0 * evidenceWeight(1)).toBeLessThan(MIN_SIMILARITY_SCORE)
  })

  it("ranks a well-evidenced match above a thin one at equal cosine", () => {
    expect(0.9 * evidenceWeight(8)).toBeGreaterThan(1.0 * evidenceWeight(1))
  })
})

describe("overlapCount", () => {
  it("returns zero when the vectors share no active dimension", () => {
    expect(overlapCount([1, 0, 2], [0, 3, 0])).toBe(0)
  })

  it("counts only dimensions active in both vectors", () => {
    expect(overlapCount([1, 2, 0, 4], [5, 0, 6, 7])).toBe(2)
  })

  it("ignores the magnitude of the weights", () => {
    expect(overlapCount([0.001, 9], [100, 0.5])).toBe(2)
  })
})

describe("conflictPenalty", () => {
  it("is neutral when nothing conflicts", () => {
    const a = printer({ type: "laser", color: true, maxDpi: 600 })
    const b = printer({ type: "laser", color: true, maxDpi: 1200 })
    expect(conflictPenalty(a, b)).toBe(1)
  })

  it("penalizes a known mechanism-type conflict", () => {
    const a = printer({ type: "inkjet" })
    const b = printer({ type: "laser" })
    expect(conflictPenalty(a, b)).toBe(TYPE_CONFLICT_PENALTY)
  })

  it("does not penalize when either type is unknown", () => {
    expect(conflictPenalty(printer({ type: "unknown" }), printer({ type: "laser" }))).toBe(1)
    expect(conflictPenalty(printer({}), printer({ type: "laser" }))).toBe(1)
  })

  it("penalizes colour vs monochrome in both directions", () => {
    expect(conflictPenalty(printer({ color: true }), printer({ color: false }))).toBe(
      COLOR_CONFLICT_PENALTY
    )
    expect(conflictPenalty(printer({ color: false }), printer({ color: true }))).toBe(
      COLOR_CONFLICT_PENALTY
    )
  })

  it("treats unknown colour as no evidence, not as a conflict", () => {
    expect(conflictPenalty(printer({ color: "unknown" }), printer({ color: true }))).toBe(1)
  })

  it("penalizes an extreme resolution gap but not a moderate one", () => {
    const ratio = RESOLUTION_CONFLICT_RATIO
    expect(conflictPenalty(printer({ maxDpi: 300 }), printer({ maxDpi: 300 * ratio }))).toBe(
      RESOLUTION_CONFLICT_PENALTY
    )
    expect(
      conflictPenalty(printer({ maxDpi: 300 }), printer({ maxDpi: 300 * ratio - 1 }))
    ).toBe(1)
  })

  it("stacks independent conflicts multiplicatively", () => {
    const a = printer({ type: "inkjet", color: true, maxDpi: 4800 })
    const b = printer({ type: "laser", color: false, maxDpi: 300 })
    expect(conflictPenalty(a, b)).toBeCloseTo(
      TYPE_CONFLICT_PENALTY * COLOR_CONFLICT_PENALTY * RESOLUTION_CONFLICT_PENALTY,
      10
    )
  })

  it("keeps the combined score inside [0, 1)", () => {
    const a = printer({ type: "inkjet", color: true, maxDpi: 4800 })
    const b = printer({ type: "laser", color: false, maxDpi: 300 })
    const worst = 1.0 * evidenceWeight(500) * conflictPenalty(a, b)
    expect(worst).toBeGreaterThan(0)
    expect(worst).toBeLessThan(1)
  })
})

describe("resolutionTier", () => {
  it("returns null when resolution is unknown", () => {
    expect(resolutionTier(null)).toBeNull()
    expect(resolutionTier(undefined)).toBeNull()
  })

  it("assigns tier boundaries inclusively at the top of each range", () => {
    expect(resolutionTier(300)).toBe("up to 300 dpi")
    expect(resolutionTier(301)).toBe("300-600 dpi")
    expect(resolutionTier(600)).toBe("300-600 dpi")
    expect(resolutionTier(601)).toBe("600-1200 dpi")
    expect(resolutionTier(1200)).toBe("600-1200 dpi")
    expect(resolutionTier(1201)).toBe("over 1200 dpi")
  })

  it("never labels a tier with a bare exact figure", () => {
    // 720 dpi printers were previously labelled "1200 dpi resolution". Tier
    // labels must always read as ranges, not as a specific capability claim.
    for (const dpi of [120, 306, 720, 1440, 5760]) {
      expect(resolutionTier(dpi)).toMatch(/^(up to|over|\d+-)/)
    }
  })
})

describe("confidenceTier", () => {
  const LABELS = ["High confidence", "Good match", "Moderate match", "Limited evidence"]

  it("assigns every representable score to exactly one tier", () => {
    // Scores are rounded to 3 decimals upstream, so sweep that whole domain.
    for (let i = 0; i <= 1000; i++) {
      const tier = confidenceTier(i / 1000)
      expect(LABELS).toContain(tier.label)
    }
  })

  it("maps tier boundaries inclusively at the lower edge", () => {
    expect(confidenceTier(CONFIDENCE_HIGH_THRESHOLD).label).toBe("High confidence")
    expect(confidenceTier(CONFIDENCE_HIGH_THRESHOLD - 0.001).label).toBe("Good match")
    expect(confidenceTier(CONFIDENCE_GOOD_THRESHOLD).label).toBe("Good match")
    expect(confidenceTier(CONFIDENCE_GOOD_THRESHOLD - 0.001).label).toBe("Moderate match")
    expect(confidenceTier(CONFIDENCE_MODERATE_THRESHOLD).label).toBe("Moderate match")
    expect(confidenceTier(CONFIDENCE_MODERATE_THRESHOLD - 0.001).label).toBe("Limited evidence")
  })

  it("covers the observed score range without an unreachable tier", () => {
    // Measured bounds of the generated artifacts: min 0.351, max 0.991.
    expect(confidenceTier(0.351).label).toBe("Limited evidence")
    expect(confidenceTier(0.991).label).toBe("High confidence")
    // Even a hypothetical perfect score gets similarity wording, never a
    // claim of exactness: the model measures similarity, not identity.
    expect(confidenceTier(1.0).label).toBe("High confidence")
  })

  it("never labels any score as an exact match", () => {
    for (let i = 0; i <= 1000; i++) {
      expect(confidenceTier(i / 1000).label).not.toMatch(/exact/i)
    }
  })

  it("keeps a single-signal pair out of every tier above Limited evidence", () => {
    // evidenceWeight(1) caps a one-dimension overlap at ~0.22 even at perfect
    // cosine, which is below the Moderate threshold.
    expect(1.0 * evidenceWeight(1)).toBeLessThan(CONFIDENCE_MODERATE_THRESHOLD)
    expect(confidenceTier(1.0 * evidenceWeight(1)).label).toBe("Limited evidence")
  })

  it("is deterministic", () => {
    for (const s of [0, 0.393, 0.5, 0.7, 0.85, 0.991]) {
      expect(confidenceTier(s)).toEqual(confidenceTier(s))
    }
  })
})

describe("scoreThenIdComparator", () => {
  const ids = ["Alps-MD-1000", "Canon-BJC-50", "Epson-LQ-570"]
  const cmp = scoreThenIdComparator<{ index: number; score: number }>((i) => ids[i])

  it("orders by score descending first", () => {
    const sorted = [
      { index: 0, score: 0.5 },
      { index: 1, score: 0.9 },
    ].sort(cmp)
    expect(sorted.map((c) => c.index)).toEqual([1, 0])
  })

  it("breaks exact ties by id ascending, independent of input order", () => {
    const a = [
      { index: 2, score: 0.7 },
      { index: 0, score: 0.7 },
      { index: 1, score: 0.7 },
    ].sort(cmp)
    const b = [
      { index: 1, score: 0.7 },
      { index: 2, score: 0.7 },
      { index: 0, score: 0.7 },
    ].sort(cmp)
    expect(a.map((c) => c.index)).toEqual([0, 1, 2])
    expect(b.map((c) => c.index)).toEqual([0, 1, 2])
  })
})
