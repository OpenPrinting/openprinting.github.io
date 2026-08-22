import { describe, expect, it } from "vitest"
import { toPrinterSummary } from "../catalog"
import type { Driver, Printer } from "../types"

// Minimal factory mirroring the style of printer-attributes.test.ts: every test
// states only the fields it cares about.
const printer = (overrides: Partial<Printer> = {}): Printer => ({
  id: "Test-Printer",
  manufacturer: "Test",
  model: "Printer",
  ...overrides,
})

const drivers = (count: number): Driver[] =>
  Array.from({ length: count }, (_, i) => ({ id: `driver/d${i}`, name: `d${i}` }))

// Keys the projection may ever emit. The artifact test cross-checks the real
// generated file against this same builder, so a new key added here without a
// deliberate schema decision should fail review, not slip through.
const ALLOWED_KEYS = new Set([
  "id", "manufacturer", "model", "type", "status", "functionality",
  "driverCount", "color", "maxDpi", "psLevel", "pclLevel", "cs", "rd",
])

describe("toPrinterSummary base fields (legacy printersMap projection)", () => {
  it("preserves the original projection defaults for a bare record", () => {
    // These defaults are what split-printers.ts emitted before the capability
    // extension; existing consumers (directory page, static params, search
    // index builder) rely on them.
    expect(toPrinterSummary(printer())).toEqual({
      id: "Test-Printer",
      manufacturer: "Test",
      model: "Printer",
      type: "unknown",
      status: "Unknown",
      functionality: "?",
      driverCount: 0,
      color: "unknown",
    })
  })

  it("copies known base fields verbatim", () => {
    const summary = toPrinterSummary(printer({
      type: "laser",
      status: "Perfect",
      functionality: "A",
      drivers: drivers(3),
      color: false,
    }))
    expect(summary.type).toBe("laser")
    expect(summary.status).toBe("Perfect")
    expect(summary.functionality).toBe("A")
    expect(summary.driverCount).toBe(3)
    expect(summary.color).toBe(false)
  })

  it("preserves the color tri-state without collapsing unknown", () => {
    expect(toPrinterSummary(printer({ color: true })).color).toBe(true)
    expect(toPrinterSummary(printer({ color: false })).color).toBe(false)
    expect(toPrinterSummary(printer({ color: "unknown" })).color).toBe("unknown")
    expect(toPrinterSummary(printer({})).color).toBe("unknown")
  })
})

describe("toPrinterSummary capability fields (omit-when-unknown)", () => {
  it("copies numeric capability fields when the source records them", () => {
    const summary = toPrinterSummary(printer({ maxDpi: 600, psLevel: 2, pclLevel: 5 }))
    expect(summary.maxDpi).toBe(600)
    expect(summary.psLevel).toBe(2)
    expect(summary.pclLevel).toBe(5)
  })

  it("omits numeric capability fields for null and undefined, not emitting null", () => {
    for (const summary of [
      toPrinterSummary(printer({ maxDpi: null, psLevel: null, pclLevel: null })),
      toPrinterSummary(printer({})),
    ]) {
      expect("maxDpi" in summary).toBe(false)
      expect("psLevel" in summary).toBe(false)
      expect("pclLevel" in summary).toBe(false)
    }
  })

  it("copies commandset tokens only when non-empty, as an independent array", () => {
    const tokens = ["POSTSCRIPT", "PCL5E"]
    const summary = toPrinterSummary(printer({ commandsetTokens: tokens }))
    expect(summary.cs).toEqual(["POSTSCRIPT", "PCL5E"])
    expect(summary.cs).not.toBe(tokens)

    expect("cs" in toPrinterSummary(printer({ commandsetTokens: [] }))).toBe(false)
    expect("cs" in toPrinterSummary(printer({}))).toBe(false)
  })

  it("normalizes the recommended driver onto its family for rd", () => {
    // Same normalization the similarity features use (driver-family.ts):
    // the "driver/" prefix is stripped and prefix rules collapse variants.
    expect(toPrinterSummary(printer({ recommended_driver: "driver/ljet4" })).rd).toBe("laserjet")
    expect(toPrinterSummary(printer({ recommended_driver: "driver/gimp-print-ijs" })).rd).toBe("gutenprint")
    expect(toPrinterSummary(printer({ recommended_driver: "driver/Postscript-hp" })).rd).toBe("postscript")
    expect(toPrinterSummary(printer({ recommended_driver: "driver/epson" })).rd).toBe("epson")
  })

  it("omits rd when no recommended driver is recorded", () => {
    expect("rd" in toPrinterSummary(printer({}))).toBe(false)
    expect("rd" in toPrinterSummary(printer({ recommended_driver: "" }))).toBe(false)
    expect("rd" in toPrinterSummary(printer({ recommended_driver: "   " }))).toBe(false)
  })
})

describe("toPrinterSummary exclusions and determinism", () => {
  it("never emits duplex, even if the source were to record it", () => {
    // Approved design decision: duplex is recorded for zero printers upstream,
    // so it is not part of the catalogue and must not leak in if upstream data
    // ever starts carrying it without a deliberate schema decision here.
    const summary = toPrinterSummary(printer({ duplex: true }))
    expect("duplex" in summary).toBe(false)
  })

  it("emits no keys outside the documented schema", () => {
    const summary = toPrinterSummary(printer({
      maxDpi: 1200,
      psLevel: 3,
      pclLevel: 6,
      commandsetTokens: ["PCLXL"],
      recommended_driver: "driver/hplip",
      duplex: "unknown",
      notes: "<b>html</b>",
      hasOwnEntry: false,
    }))
    for (const key of Object.keys(summary)) {
      expect(ALLOWED_KEYS.has(key), `unexpected key ${key}`).toBe(true)
    }
  })

  it("is deterministic, including key order", () => {
    const input = printer({
      maxDpi: 600,
      psLevel: 2,
      commandsetTokens: ["POSTSCRIPT"],
      recommended_driver: "driver/hplip",
    })
    expect(JSON.stringify(toPrinterSummary(input))).toBe(JSON.stringify(toPrinterSummary(input)))
  })
})
