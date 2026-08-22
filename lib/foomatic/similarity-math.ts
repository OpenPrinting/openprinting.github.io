// Pure vector maths shared by the vectorization and similarity stages of the
// recommendation pipeline. Kept dependency-free so it can be unit tested
// without touching the filesystem or generated artifacts.

export function dotProduct(a: number[], b: number[]): number {
  let sum = 0

  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }

  return sum
}

export function magnitude(vec: number[]): number {
  return Math.sqrt(dotProduct(vec, vec))
}

export function cosineSimilarity(
  a: number[],
  b: number[],
  magA: number,
  magB: number
): number {
  if (magA === 0 || magB === 0) {
    return 0
  }

  return dotProduct(a, b) / (magA * magB)
}

export interface ScoredCandidate {
  index: number
  score: number
}

// Maintains `topK` as a min-heap-like array sorted ascending by score, so the
// weakest surviving candidate is always at index 0 and cheap to evict.
export function insertTopK(
  topK: ScoredCandidate[],
  candidate: ScoredCandidate,
  k: number
): void {
  if (topK.length < k) {
    topK.push(candidate)
    topK.sort((a, b) => a.score - b.score)
    return
  }

  if (candidate.score > topK[0].score) {
    topK[0] = candidate
    topK.sort((a, b) => a.score - b.score)
  }
}
