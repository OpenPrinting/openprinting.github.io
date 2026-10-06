import { describe, expect, it } from "vitest"
import { tokenize } from "../normalize"
import { findNearMissPrinter, resolveDriverInText, resolvePrintersInText } from "../entities"
import { INDEXES } from "./fixtures"

const resolve = (text: string) => resolvePrintersInText(tokenize(text), INDEXES.printers)

describe("printer entity resolution", () => {
  it("resolves an exact catalogue id", () => {
    expect(resolve("hp-2500c").refs).toEqual([{ kind: "resolved", id: "HP-2500C" }])
  })

  it("resolves an exact manufacturer + model name", () => {
    expect(resolve("HP LaserJet 4").refs).toEqual([{ kind: "resolved", id: "HP-LaserJet_4" }])
  })

  it("resolves punctuation, spacing, and casing variants to the same printer", () => {
    for (const variant of ["HL-1050", "HL 1050", "hl1050", "Brother HL-1050", "brother hl 1050"]) {
      expect(resolve(variant).refs, variant).toEqual([{ kind: "resolved", id: "Brother-HL-1050" }])
    }
  })

  it("resolves a unique model without the manufacturer", () => {
    expect(resolve("deskjet 560c").refs).toEqual([{ kind: "resolved", id: "HP-DeskJet_560C" }])
  })

  it("resolves manufacturer aliases", () => {
    expect(resolve("hewlett packard 2500c").refs).toEqual([{ kind: "resolved", id: "HP-2500C" }])
    expect(resolve("hewlett-packard 2500c").refs).toEqual([{ kind: "resolved", id: "HP-2500C" }])
  })

  it("does not confuse 2500C with 2500CM", () => {
    expect(resolve("hp 2500c").refs).toEqual([{ kind: "resolved", id: "HP-2500C" }])
    expect(resolve("hp 2500cm").refs).toEqual([{ kind: "resolved", id: "HP-2500CM" }])
  })

  it("returns an ambiguity with candidates for a partial family name", () => {
    const refs = resolve("hp laserjet").refs
    expect(refs).toHaveLength(1)
    expect(refs[0].kind).toBe("ambiguous")
    if (refs[0].kind === "ambiguous") {
      expect(refs[0].total).toBeGreaterThan(1)
      const ids = refs[0].candidates.map(candidate => candidate.id)
      expect(ids).toContain("HP-LaserJet_4")
      // Deterministic candidate order: sorted by id.
      expect(ids).toEqual([...ids].sort((a, b) => a.localeCompare(b)))
    }
  })

  it("never resolves a bare capability word as an entity", () => {
    // "laser" must not prefix-match the LaserJet family.
    expect(resolve("colour laser printer").refs).toEqual([])
    expect(resolve("laser").refs).toEqual([])
  })

  it("finds two printers for comparison phrasing", () => {
    const refs = resolve("compare hp 2500c and deskjet 560c").refs
    expect(refs).toEqual([
      { kind: "resolved", id: "HP-2500C" },
      { kind: "resolved", id: "HP-DeskJet_560C" },
    ])
  })

  it("reports a standalone manufacturer mention without inventing an entity", () => {
    const result = resolve("show me canon printers")
    expect(result.refs).toEqual([])
    expect(result.makeOnly).toBe("Canon")
  })

  it("does not fabricate a match for a model that is not in the data", () => {
    // "Brother HL-2270DW" is deliberately absent from the catalogue: the scan
    // must yield no resolved ref (the near-miss handling in parse.ts turns
    // this into an unresolved ref with suggestions).
    const result = resolve("brother hl 2270dw")
    expect(result.refs).toEqual([])
    expect(result.makeOnly).toBe("Brother")
  })

  it("builds an unresolved near-miss ref with real-catalogue suggestions", () => {
    const tokens = tokenize("brother hl 2270dw")
    const scan = resolvePrintersInText(tokens, INDEXES.printers)
    const nearMiss = findNearMissPrinter(tokens, scan.consumed, INDEXES.printers, scan.makeOnly, () => false)
    expect(nearMiss).not.toBeNull()
    if (nearMiss) {
      expect(nearMiss.ref.kind).toBe("unresolved")
      if (nearMiss.ref.kind === "unresolved") {
        expect(nearMiss.ref.text).toContain("hl 2270dw")
        expect(nearMiss.ref.suggestions.length).toBeGreaterThan(0)
        // Suggestions are real catalogue entries, never invented.
        for (const suggestion of nearMiss.ref.suggestions) {
          expect(INDEXES.printers.byId.has(suggestion.id)).toBe(true)
        }
      }
    }
  })

  it("is deterministic for repeated calls", () => {
    const a = JSON.stringify(resolve("hp laserjet"))
    const b = JSON.stringify(resolve("hp laserjet"))
    expect(a).toBe(b)
  })
})

describe("driver entity resolution", () => {
  const resolveDriver = (text: string, required = true) => {
    const tokens = tokenize(text)
    return resolveDriverInText(tokens, new Set(), INDEXES.drivers, required)
  }

  it("resolves an exact driver id", () => {
    expect(resolveDriver("which printers use hpijs")).toEqual({ kind: "resolved", id: "hpijs" })
  })

  it("treats a driver family as a clarification, never a silent expansion", () => {
    const ref = resolveDriver("which printers use the laserjet driver")
    expect(ref).toEqual({ kind: "family", family: "laserjet", members: ["lj4dith", "ljet4"] })
  })

  it("suggests near names for an unknown driver when one is required", () => {
    const ref = resolveDriver("which printers use hpcups")
    expect(ref?.kind).toBe("unresolved")
    if (ref?.kind === "unresolved") {
      expect(ref.suggestions).toContain("hpijs")
      expect(ref.suggestions).toContain("hplip")
    }
  })

  it("returns null when no driver is mentioned and none is required", () => {
    expect(resolveDriver("which printers are fast", false)).toBeNull()
  })
})
