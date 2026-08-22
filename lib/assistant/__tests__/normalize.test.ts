import { describe, expect, it } from "vitest"
import { MAX_QUERY_LENGTH } from "../constants"
import { fuseText, normalizeText, tokenize } from "../normalize"

describe("normalizeText", () => {
  it("lowercases and collapses punctuation to single spaces", () => {
    expect(normalizeText("Brother HL-1050!")).toBe("brother hl 1050")
    expect(normalizeText("  Colour,  laser??  ")).toBe("colour laser")
  })

  it("caps input length", () => {
    const long = "a".repeat(MAX_QUERY_LENGTH * 2)
    expect(normalizeText(long).length).toBe(MAX_QUERY_LENGTH)
  })
})

describe("fuseText", () => {
  it("unifies punctuation and spacing variants of model numbers", () => {
    expect(fuseText("HL-1050")).toBe("hl1050")
    expect(fuseText("HL 1050")).toBe("hl1050")
    expect(fuseText("hl1050")).toBe("hl1050")
    expect(fuseText("LaserJet 4")).toBe("laserjet4")
  })
})

describe("tokenize", () => {
  it("splits on the normalized form", () => {
    expect(tokenize("find a colour laser printer")).toEqual(["find", "a", "colour", "laser", "printer"])
  })

  it("returns an empty array for empty or punctuation-only input", () => {
    expect(tokenize("")).toEqual([])
    expect(tokenize("?!.")).toEqual([])
  })
})
