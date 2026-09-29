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

  it("does not count an obsolete driver as driver support", () => {
    const printer = {
      functionality: "?",
      drivers: [
        { id: "driver/legacy-driver", name: "legacy-driver", obsolete: true, replacedBy: null },
      ],
    } as unknown as Printer

    expect(calculateAccurateStatus(printer)).toBe("Unsupported")
  })

  it("keeps a printer out of Unsupported while one current driver remains", () => {
    const printer = {
      functionality: "?",
      drivers: [
        { id: "driver/legacy-driver", name: "legacy-driver", obsolete: true, replacedBy: null },
        { id: "driver/live-driver", name: "live-driver", obsolete: false },
      ],
    } as unknown as Printer

    expect(calculateAccurateStatus(printer)).toBe("Unknown")
  })

  it("never overwrites a recorded functionality grade when every driver is obsolete", () => {
    const drivers = [
      { id: "driver/legacy-driver", name: "legacy-driver", obsolete: true, replacedBy: null },
    ]

    expect(calculateAccurateStatus({ functionality: "A", drivers } as unknown as Printer)).toBe(
      "Perfect"
    )
    expect(calculateAccurateStatus({ functionality: "B", drivers } as unknown as Printer)).toBe(
      "Mostly"
    )
  })

  it("honours the stored status for summaries, which cannot see obsolescence", () => {
    // printersMap.json carries a driver total but not each driver's obsolete
    // flag, so a summary defers to the status the pipeline already derived.
    const summary = {
      functionality: "?",
      driverCount: 1,
      status: "Unsupported",
    } as PrinterSummary

    expect(calculateAccurateStatus(summary)).toBe("Unsupported")
  })

  it("still reports Unknown for a summary the pipeline did not mark unsupported", () => {
    const summary = { functionality: "?", driverCount: 1, status: "Unknown" } as PrinterSummary

    expect(calculateAccurateStatus(summary)).toBe("Unknown")
  })
})
