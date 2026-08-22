import { describe, expect, it } from "vitest"
import { calculateAccurateStatus } from "../utils"
import type { Printer, PrinterSummary } from "../types"

describe("calculateAccurateStatus", () => {
  it("maps grade A/Perfect to Perfect", () => {
    expect(calculateAccurateStatus({ functionality: "A" } as PrinterSummary)).toBe("Perfect")
    expect(calculateAccurateStatus({ functionality: "Perfect" } as PrinterSummary)).toBe("Perfect")
  })

  it("maps grades B/C/Good/Partial to Mostly", () => {
    expect(calculateAccurateStatus({ functionality: "B" } as PrinterSummary)).toBe("Mostly")
    expect(calculateAccurateStatus({ functionality: "C" } as PrinterSummary)).toBe("Mostly")
    expect(calculateAccurateStatus({ functionality: "Good" } as PrinterSummary)).toBe("Mostly")
    expect(calculateAccurateStatus({ functionality: "Partial" } as PrinterSummary)).toBe("Mostly")
  })

  it("is case-insensitive on the functionality grade", () => {
    expect(calculateAccurateStatus({ functionality: "a" } as PrinterSummary)).toBe("Perfect")
  })

  it("treats missing/unknown functionality with no drivers as Unsupported", () => {
    expect(calculateAccurateStatus({ functionality: "?", driverCount: 0 } as PrinterSummary)).toBe(
      "Unsupported"
    )
    expect(
      calculateAccurateStatus({ functionality: "unknown", driverCount: 0 } as PrinterSummary)
    ).toBe("Unsupported")
  })

  it("treats missing/unknown functionality with drivers present as Unknown", () => {
    expect(calculateAccurateStatus({ functionality: "?", driverCount: 2 } as PrinterSummary)).toBe(
      "Unknown"
    )
  })

  it("falls back to driver count when the functionality grade is unrecognized", () => {
    expect(calculateAccurateStatus({ functionality: "X", driverCount: 0 } as PrinterSummary)).toBe(
      "Unsupported"
    )
    expect(calculateAccurateStatus({ functionality: "X", driverCount: 1 } as PrinterSummary)).toBe(
      "Unknown"
    )
  })

  it("derives driver count from the full Printer.drivers array when driverCount is absent", () => {
    const printer = {
      status: "?",
      drivers: [{ id: "driver/a", name: "a" }],
    } as unknown as Printer

    expect(calculateAccurateStatus(printer)).toBe("Unknown")
  })

  it("falls back to the Printer.status field when functionality is absent", () => {
    const printer = { status: "A", drivers: [] } as unknown as Printer
    expect(calculateAccurateStatus(printer)).toBe("Perfect")
  })
})
