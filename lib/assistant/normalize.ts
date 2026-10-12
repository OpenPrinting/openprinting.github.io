// Text normalization for the assistant's NLU. Two canonical forms:
// - normalized: lowercased, punctuation collapsed to single spaces
//   ("Brother HL-1050!" -> "brother hl 1050")
// - fused: alphanumerics only ("HL-1050" and "HL 1050" both -> "hl1050")
// Model numbers are the dominant query shape, and punctuation/spacing variants
// must unify by construction rather than by enumeration.

import { MAX_QUERY_LENGTH } from "./constants"

export function normalizeText(input: string): string {
  return input
    .slice(0, MAX_QUERY_LENGTH)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function fuseText(input: string): string {
  return input.slice(0, MAX_QUERY_LENGTH).toLowerCase().replace(/[^a-z0-9]+/g, "")
}

export function tokenize(input: string): string[] {
  const normalized = normalizeText(input)
  return normalized ? normalized.split(" ") : []
}
