// Capability lexicon: maps natural-language phrases onto typed catalogue
// filters. The table is data - contributors add a row, not logic - and every
// row is grounded in a real catalogue field (see docs/foomatic-assistant.md).
//
// Matching is token-based with consumption: each matched phrase marks its
// tokens as consumed so that leftover content words can be surfaced as
// unapplied constraints ("purple") instead of being silently ignored.

import { HIGH_RES_MIN_DPI } from "./constants"
import type { CapabilityFilters } from "./types"

interface LexiconRule {
  phrase: string[]
  apply: (filters: CapabilityFilters) => void
}

// Longest phrases are matched first so "good linux support" is consumed as a
// support filter before "linux" or "good" could be misread individually.
const RULES: LexiconRule[] = [
  // Linux support grade. "good" maps to Perfect|Mostly, the two grades the
  // site itself presents as working; "perfect"-class wording maps to Perfect.
  { phrase: ["good", "linux", "support"], apply: f => { f.support = "good" } },
  { phrase: ["great", "linux", "support"], apply: f => { f.support = "good" } },
  { phrase: ["solid", "linux", "support"], apply: f => { f.support = "good" } },
  { phrase: ["good", "support"], apply: f => { f.support = "good" } },
  { phrase: ["works", "well", "on", "linux"], apply: f => { f.support = "good" } },
  { phrase: ["work", "well", "on", "linux"], apply: f => { f.support = "good" } },
  { phrase: ["works", "well", "with", "linux"], apply: f => { f.support = "good" } },
  { phrase: ["works", "on", "linux"], apply: f => { f.support = "good" } },
  { phrase: ["works", "well"], apply: f => { f.support = "good" } },
  { phrase: ["well", "supported"], apply: f => { f.support = "good" } },
  { phrase: ["perfect", "linux", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["excellent", "linux", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["best", "linux", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["better", "linux", "support"], apply: f => { f.support = "good" } },
  { phrase: ["better", "support"], apply: f => { f.support = "good" } },
  { phrase: ["perfect", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["excellent", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["best", "support"], apply: f => { f.support = "perfect" } },
  { phrase: ["fully", "supported"], apply: f => { f.support = "perfect" } },

  // Colour capability (tri-state color field; mono selects known-false).
  { phrase: ["black", "and", "white"], apply: f => { f.color = false } },
  { phrase: ["black", "white"], apply: f => { f.color = false } },
  { phrase: ["monochrome"], apply: f => { f.color = false } },
  { phrase: ["mono"], apply: f => { f.color = false } },
  { phrase: ["b", "w"], apply: f => { f.color = false } },
  { phrase: ["colour"], apply: f => { f.color = true } },
  { phrase: ["color"], apply: f => { f.color = true } },
  { phrase: ["coloured"], apply: f => { f.color = true } },
  { phrase: ["colored"], apply: f => { f.color = true } },

  // Mechanism type.
  { phrase: ["laser"], apply: f => { f.type = "laser" } },
  { phrase: ["inkjet"], apply: f => { f.type = "inkjet" } },
  { phrase: ["ink", "jet"], apply: f => { f.type = "inkjet" } },
  { phrase: ["dot", "matrix"], apply: f => { f.type = "dot-matrix" } },
  { phrase: ["dotmatrix"], apply: f => { f.type = "dot-matrix" } },
  { phrase: ["impact"], apply: f => { f.type = "dot-matrix" } },

  // Duplex terminology is understood, but the dataset records duplex for zero
  // printers - execution answers honestly instead of filtering.
  { phrase: ["duplex"], apply: f => { f.duplex = true } },
  { phrase: ["two", "sided"], apply: f => { f.duplex = true } },
  { phrase: ["double", "sided"], apply: f => { f.duplex = true } },
  { phrase: ["2", "sided"], apply: f => { f.duplex = true } },

  // Page description languages. Levels come from psLevel/pclLevel; presence
  // may also be established by commandset tokens (see execute.ts).
  { phrase: ["postscript", "level", "3"], apply: f => { f.postscript = { minLevel: 3 } } },
  { phrase: ["postscript", "level", "2"], apply: f => { f.postscript = { minLevel: 2 } } },
  { phrase: ["postscript", "3"], apply: f => { f.postscript = { minLevel: 3 } } },
  { phrase: ["postscript", "2"], apply: f => { f.postscript = { minLevel: 2 } } },
  { phrase: ["ps3"], apply: f => { f.postscript = { minLevel: 3 } } },
  { phrase: ["ps2"], apply: f => { f.postscript = { minLevel: 2 } } },
  { phrase: ["postscript"], apply: f => { f.postscript = f.postscript ?? {} } },
  { phrase: ["post", "script"], apply: f => { f.postscript = f.postscript ?? {} } },
  { phrase: ["pcl", "xl"], apply: f => { f.pcl = { minLevel: 6 } } },
  { phrase: ["pclxl"], apply: f => { f.pcl = { minLevel: 6 } } },
  { phrase: ["pcl", "6"], apply: f => { f.pcl = { minLevel: 6 } } },
  { phrase: ["pcl6"], apply: f => { f.pcl = { minLevel: 6 } } },
  { phrase: ["pcl", "5e"], apply: f => { f.pcl = { minLevel: 5 } } },
  { phrase: ["pcl5e"], apply: f => { f.pcl = { minLevel: 5 } } },
  { phrase: ["pcl", "5"], apply: f => { f.pcl = { minLevel: 5 } } },
  { phrase: ["pcl5"], apply: f => { f.pcl = { minLevel: 5 } } },
  { phrase: ["pcl"], apply: f => { f.pcl = f.pcl ?? {} } },

  // Resolution. Vague wording maps to a disclosed threshold.
  { phrase: ["high", "resolution"], apply: f => { f.minDpi = HIGH_RES_MIN_DPI } },
  { phrase: ["high", "res"], apply: f => { f.minDpi = HIGH_RES_MIN_DPI } },
]

export interface LexiconResult {
  filters: CapabilityFilters
  consumed: Set<number>
}

export function extractFilters(tokens: string[]): LexiconResult {
  const filters: CapabilityFilters = {}
  const consumed = new Set<number>()

  for (const rule of [...RULES].sort((a, b) => b.phrase.length - a.phrase.length)) {
    for (let i = 0; i + rule.phrase.length <= tokens.length; i++) {
      let matches = true
      for (let j = 0; j < rule.phrase.length; j++) {
        if (tokens[i + j] !== rule.phrase[j] || consumed.has(i + j)) {
          matches = false
          break
        }
      }
      if (matches) {
        rule.apply(filters)
        for (let j = 0; j < rule.phrase.length; j++) consumed.add(i + j)
      }
    }
  }

  // "600 dpi" / "at least 600 dpi": a number token directly before "dpi".
  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i] === "dpi" && !consumed.has(i) && /^\d{2,4}$/.test(tokens[i - 1]) && !consumed.has(i - 1)) {
      filters.minDpi = Number(tokens[i - 1])
      consumed.add(i)
      consumed.add(i - 1)
    }
  }

  return { filters, consumed }
}

export function countFilters(filters: CapabilityFilters): number {
  return Object.keys(filters).length
}
