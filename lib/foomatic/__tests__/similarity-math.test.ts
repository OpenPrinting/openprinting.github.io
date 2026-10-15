import { describe, expect, it } from "vitest"
import { cosineSimilarity, dotProduct, magnitude, insertTopK } from "../similarity-math"
import type { ScoredCandidate } from "../similarity-math"

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors", () => {
    const a = [1, 2, 3]
    expect(cosineSimilarity(a, a, magnitude(a), magnitude(a))).toBeCloseTo(1)
  })

  it("returns 0 for orthogonal vectors", () => {
    const a = [1, 0]
    const b = [0, 1]
    expect(cosineSimilarity(a, b, magnitude(a), magnitude(b))).toBe(0)
  })

  it("returns 0 when either magnitude is 0, instead of dividing by zero", () => {
    const a = [0, 0]
    const b = [1, 1]
    expect(cosineSimilarity(a, b, magnitude(a), magnitude(b))).toBe(0)
  })

  it("scales with the angle between two non-identical vectors", () => {
    const a = [1, 1]
    const b = [1, 0]
    const score = cosineSimilarity(a, b, magnitude(a), magnitude(b))
    expect(score).toBeGreaterThan(0)
    expect(score).toBeLessThan(1)
  })
})

describe("dotProduct / magnitude", () => {
  it("computes the dot product element-wise", () => {
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(32)
  })

  it("computes the Euclidean magnitude", () => {
    expect(magnitude([3, 4])).toBe(5)
  })
})

describe("insertTopK", () => {
  it("keeps the list sorted ascending by score while under capacity", () => {
    const topK: ScoredCandidate[] = []
    insertTopK(topK, { index: 0, score: 0.5 }, 3)
    insertTopK(topK, { index: 1, score: 0.2 }, 3)
    insertTopK(topK, { index: 2, score: 0.8 }, 3)

    expect(topK.map((c) => c.score)).toEqual([0.2, 0.5, 0.8])
  })

  it("evicts the lowest-scoring candidate once at capacity", () => {
    const topK: ScoredCandidate[] = [
      { index: 0, score: 0.1 },
      { index: 1, score: 0.5 },
    ]

    insertTopK(topK, { index: 2, score: 0.9 }, 2)

    expect(topK.map((c) => c.index)).toEqual([1, 2])
  })

  it("does not insert a candidate that scores below the current minimum once at capacity", () => {
    const topK: ScoredCandidate[] = [
      { index: 0, score: 0.4 },
      { index: 1, score: 0.6 },
    ]

    insertTopK(topK, { index: 2, score: 0.1 }, 2)

    expect(topK.map((c) => c.index)).toEqual([0, 1])
  })
})
