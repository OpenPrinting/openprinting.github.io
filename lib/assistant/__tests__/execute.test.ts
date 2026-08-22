import { describe, expect, it } from "vitest"
import { executeQuery } from "../execute"
import type { AssistantQuery, CapabilityFilters } from "../types"
import { BJC_CONTEXT, fixtureData, HOME_CONTEXT, LJ4_CONTEXT } from "./fixtures"

const data = fixtureData()

function search(filters: CapabilityFilters, unapplied: string[] = [], recommend = false): AssistantQuery {
  return { intent: "CAPABILITY_SEARCH", filters, unapplied, recommend }
}

describe("capability search execution", () => {
  it("filters on known values and orders by the documented default", async () => {
    const execution = await executeQuery(search({ type: "laser", support: "good" }), HOME_CONTEXT, data)
    expect(execution.kind).toBe("search-results")
    if (execution.kind !== "search-results") return
    expect(execution.state).toBe("SUCCESS")
    // Perfect before Mostly, more drivers first, id ascending on full ties.
    expect(execution.matches[0].id).toBe("HP-LaserJet_5")
    expect(execution.matches[1].id).toBe("HP-LaserJet_4")
    expect(execution.matches[2].id).toBe("HP-LaserJet_4P")
    expect(execution.matches[execution.matches.length - 1].id).toBe("Okidata-OL400")
    // IBM-4019 has status Unknown: excluded but counted as unknown, not "no".
    const supportDiag = execution.diagnostics.filters.find(f => f.label.includes("Linux support"))
    expect(supportDiag?.excludedUnknown).toBe(1)
    expect(execution.diagnostics.orderingLabel).toBe("Linux support status, then number of listed drivers")
  })

  it("never turns unknown colour into a negative: unknowns are excluded from both polarities", async () => {
    const colour = await executeQuery(search({ color: true }), HOME_CONTEXT, data)
    const mono = await executeQuery(search({ color: false }), HOME_CONTEXT, data)
    if (colour.kind !== "search-results" || mono.kind !== "search-results") throw new Error("wrong kind")
    const colourIds = colour.matches.map(m => m.id)
    const monoIds = mono.matches.map(m => m.id)
    // IBM-4019's colour is unrecorded: it must appear in neither result...
    expect(colourIds).not.toContain("IBM-4019")
    expect(monoIds).not.toContain("IBM-4019")
    // ...and must be counted as unknown-excluded in both.
    expect(colour.diagnostics.filters[0].excludedUnknown).toBe(1)
    expect(mono.diagnostics.filters[0].excludedUnknown).toBe(1)
  })

  it("requested resolution becomes the leading ordering key", async () => {
    const execution = await executeQuery(search({ minDpi: 600 }), HOME_CONTEXT, data)
    if (execution.kind !== "search-results") throw new Error("wrong kind")
    expect(execution.matches[0].id).toBe("Xerox-Phaser_6100") // 1200 dpi
    expect(execution.matches[1].id).toBe("Epson-Stylus_Color") // 720 dpi
    expect(execution.diagnostics.orderingLabel).toContain("recorded maximum resolution")
  })

  it("evidences PostScript positively and never claims absence", async () => {
    const execution = await executeQuery(search({ postscript: {} }), HOME_CONTEXT, data)
    if (execution.kind !== "search-results") throw new Error("wrong kind")
    const ids = execution.matches.map(m => m.id)
    expect(ids).toContain("Apple-LaserWriter")
    expect(ids).toContain("Xerox-Phaser_6100")
    // Everything else is unknown-excluded: there is no known-negative for PDLs
    // without a level constraint.
    expect(execution.diagnostics.filters[0].excludedKnown).toBe(0)
  })

  it("applies PostScript level constraints on recorded levels", async () => {
    const execution = await executeQuery(search({ postscript: { minLevel: 3 } }), HOME_CONTEXT, data)
    if (execution.kind !== "search-results") throw new Error("wrong kind")
    expect(execution.matches.map(m => m.id)).toEqual(["Xerox-Phaser_6100"])
  })

  it("reports duplex as insufficient data instead of filtering", async () => {
    const duplexOnly = await executeQuery(search({ duplex: true }), HOME_CONTEXT, data)
    expect(duplexOnly.kind).toBe("insufficient")
    if (duplexOnly.kind === "insufficient" && duplexOnly.message.topic === "duplex") {
      expect(duplexOnly.message.catalogSize).toBe(13)
    }

    const mixed = await executeQuery(search({ duplex: true, color: true, type: "laser" }), HOME_CONTEXT, data)
    expect(mixed.kind).toBe("search-results")
    if (mixed.kind === "search-results") {
      expect(mixed.diagnostics.insufficient).toEqual(["duplex"])
      expect(mixed.matches.map(m => m.id)).toEqual(["Xerox-Phaser_6100"])
    }
  })

  it("clarifies criteria-free recommendation requests instead of ranking", async () => {
    const execution = await executeQuery(search({}, [], true), HOME_CONTEXT, data)
    expect(execution.kind).toBe("clarify")
    if (execution.kind === "clarify") {
      expect(execution.question.topic).toBe("criteria-needed")
    }
  })

  it("surfaces unrecognized-only constraints as unsupported, not as no-matches", async () => {
    const execution = await executeQuery(search({}, ["purple"]), HOME_CONTEXT, data)
    expect(execution.kind).toBe("search-results")
    if (execution.kind === "search-results") {
      expect(execution.state).toBe("UNSUPPORTED")
      expect(execution.diagnostics.unapplied).toEqual(["purple"])
    }
  })

  it("offers one-filter relaxations when nothing matches, each labelled with its own filter", async () => {
    const execution = await executeQuery(
      search({ color: true, type: "laser", minDpi: 2400 }),
      HOME_CONTEXT,
      data
    )
    if (execution.kind !== "search-results") throw new Error("wrong kind")
    expect(execution.state).toBe("NO_MATCHES")
    const dropped = execution.diagnostics.relaxations.map(r => r.droppedLabel)
    expect(dropped).toContain("at least 2400 dpi")
    // Labels must correspond to the dropped filter, not another one: dropping
    // "colour" from {colour, laser, 2400dpi} leaves laser+2400dpi (0 matches),
    // so no "colour" relaxation exists; dropping the dpi leaves colour lasers.
    expect(dropped).not.toContain("colour")
    for (const relaxation of execution.diagnostics.relaxations) {
      expect(relaxation.resultCount).toBeGreaterThan(0)
    }
  })

  it("surfaces both the duplex gap and unrecognized constraints together", async () => {
    const execution = await executeQuery(search({ duplex: true }, ["purple"]), HOME_CONTEXT, data)
    expect(execution.kind).toBe("search-results")
    if (execution.kind === "search-results") {
      expect(execution.diagnostics.insufficient).toEqual(["duplex"])
      expect(execution.diagnostics.unapplied).toEqual(["purple"])
    }
  })
})

describe("similarity execution (PR #224 shards, consumed verbatim)", () => {
  const similar = (overrides: Partial<Extract<AssistantQuery, { intent: "SIMILAR_PRINTERS" }>> = {}): AssistantQuery => ({
    intent: "SIMILAR_PRINTERS",
    printer: { kind: "context" },
    filters: {},
    unapplied: [],
    ...overrides,
  })

  it("preserves shard order and scores exactly", async () => {
    const execution = await executeQuery(similar(), LJ4_CONTEXT, data)
    if (execution.kind !== "similar") throw new Error(`wrong kind ${execution.kind}`)
    expect(execution.entries.map(e => e.id)).toEqual([
      "HP-LaserJet_4P", "HP-LaserJet_5", "Okidata-OL400", "Xerox-Phaser_6100",
    ])
    expect(execution.entries.map(e => e.score)).toEqual([0.895, 0.885, 0.61, 0.52])
  })

  it("post-filters the shard without re-ranking", async () => {
    const execution = await executeQuery(similar({ filters: { color: true } }), LJ4_CONTEXT, data)
    if (execution.kind !== "similar") throw new Error("wrong kind")
    expect(execution.entries.map(e => e.id)).toEqual(["Xerox-Phaser_6100"])
    expect(execution.totalBeforeFilters).toBe(4)
  })

  it("reports the whole catalogue's size in the duplex caveat, not the shard's", async () => {
    const execution = await executeQuery(
      similar({ filters: { duplex: true, color: true } }),
      LJ4_CONTEXT,
      data
    )
    if (execution.kind !== "similar") throw new Error("wrong kind")
    expect(execution.diagnostics?.insufficient).toEqual(["duplex"])
    expect(execution.diagnostics?.catalogSize).toBe(13)
  })

  it("clarifies the dimension for unspecified 'better'", async () => {
    const execution = await executeQuery(similar({ better: "unspecified" }), LJ4_CONTEXT, data)
    expect(execution.kind).toBe("clarify")
    if (execution.kind === "clarify" && execution.question.topic === "better-dimension") {
      expect(execution.question.anchorName).toBe("HP LaserJet 4")
    }
  })

  it("better:support keeps shard order, excludes Unknown grades, and compares grades only", async () => {
    const execution = await executeQuery(
      { intent: "SIMILAR_PRINTERS", printer: { kind: "context" }, filters: {}, unapplied: [], better: "support" },
      BJC_CONTEXT,
      data
    )
    if (execution.kind !== "similar") throw new Error("wrong kind")
    // Canon BJC-210 is Mostly; Epson and DeskJet are Perfect; IBM-4019 is
    // Unknown and must be excluded, never treated as lower.
    expect(execution.entries.map(e => e.id)).toEqual(["Epson-Stylus_Color", "HP-DeskJet_560C"])
  })

  it("better:support from a Perfect anchor returns an empty comparison, not a downgrade", async () => {
    const execution = await executeQuery(similar({ better: "support" }), LJ4_CONTEXT, data)
    if (execution.kind !== "similar") throw new Error("wrong kind")
    expect(execution.entries).toEqual([])
    expect(execution.state).toBe("SUCCESS")
  })

  it("better:resolution compares recorded values only", async () => {
    const execution = await executeQuery(similar({ better: "resolution" }), LJ4_CONTEXT, data)
    if (execution.kind !== "similar") throw new Error("wrong kind")
    expect(execution.entries.map(e => e.id)).toEqual(["Xerox-Phaser_6100"])
    expect(execution.sourceMaxDpi).toBe(600)
  })

  it("better:drivers compares listed driver counts", async () => {
    const execution = await executeQuery(similar({ better: "drivers" }), LJ4_CONTEXT, data)
    if (execution.kind !== "similar") throw new Error("wrong kind")
    expect(execution.entries.map(e => e.id)).toEqual(["HP-LaserJet_5"])
  })

  it("reports missing similarity data honestly", async () => {
    const execution = await executeQuery(
      similar({ printer: { kind: "resolved", id: "HP-2500C" } }),
      HOME_CONTEXT,
      data
    )
    expect(execution.kind).toBe("insufficient")
    if (execution.kind === "insufficient" && execution.message.topic === "no-recommendation-data") {
      expect(execution.message.printerName).toBe("HP 2500C")
    }
  })

  it("asks for context when 'this printer' has none", async () => {
    const execution = await executeQuery(similar(), HOME_CONTEXT, data)
    expect(execution.kind).toBe("clarify")
    if (execution.kind === "clarify") {
      expect(execution.question.topic).toBe("context-needed")
    }
  })
})

describe("explanation execution", () => {
  it("returns the shard entry for a named candidate", async () => {
    const execution = await executeQuery(
      { intent: "EXPLANATION", source: { kind: "context" }, candidate: { kind: "resolved", id: "HP-LaserJet_4P" } },
      LJ4_CONTEXT,
      data
    )
    if (execution.kind !== "explanation") throw new Error(`wrong kind ${execution.kind}`)
    expect(execution.entry.score).toBe(0.895)
    expect(execution.entry.sharedFeatures).toContain("Preferred Linux driver: hplip")
  })

  it("is honest when the candidate is not in the recommendation list", async () => {
    const execution = await executeQuery(
      { intent: "EXPLANATION", source: { kind: "context" }, candidate: { kind: "resolved", id: "Brother-HL-1050" } },
      LJ4_CONTEXT,
      data
    )
    expect(execution.kind).toBe("explanation-none")
  })

  it("asks which recommendation to explain when none was named", async () => {
    const execution = await executeQuery(
      { intent: "EXPLANATION", source: { kind: "context" }, candidate: null },
      LJ4_CONTEXT,
      data
    )
    expect(execution.kind).toBe("clarify")
    if (execution.kind === "clarify" && execution.question.topic === "explanation-candidate") {
      expect(execution.question.topRecommendations).toHaveLength(3)
    }
  })
})

describe("driver execution", () => {
  it("looks up a printer's drivers", async () => {
    const execution = await executeQuery(
      { intent: "DRIVER_LOOKUP", printer: { kind: "resolved", id: "HP-2500C" } },
      HOME_CONTEXT,
      data
    )
    if (execution.kind !== "driver-lookup") throw new Error("wrong kind")
    expect(execution.printer.recommended_driver).toBe("driver/hplip")
  })

  it("resolves 'same driver as this' through the recommended driver, disclosed", async () => {
    const execution = await executeQuery(
      { intent: "DRIVER_SEARCH", driver: { kind: "same-as", printer: { kind: "context" } } },
      LJ4_CONTEXT,
      data
    )
    if (execution.kind !== "driver-search") throw new Error(`wrong kind ${execution.kind}`)
    expect(execution.anchorDriverName).toBe("hplip")
    expect(execution.driver.printers.map(p => p.id)).toContain("HP-LaserJet_4P")
  })

  it("returns the reverse index for a resolved driver", async () => {
    const execution = await executeQuery(
      { intent: "DRIVER_SEARCH", driver: { kind: "resolved", id: "hplip" } },
      HOME_CONTEXT,
      data
    )
    if (execution.kind !== "driver-search") throw new Error("wrong kind")
    expect(execution.driver.printerCount).toBe(4)
  })

  it("clarifies driver families instead of expanding them silently", async () => {
    const execution = await executeQuery(
      { intent: "DRIVER_SEARCH", driver: { kind: "family", family: "laserjet", members: ["lj4dith", "ljet4"] } },
      HOME_CONTEXT,
      data
    )
    expect(execution.kind).toBe("clarify")
  })
})

describe("comparison and reference handling", () => {
  it("compares two resolved printers from their full records", async () => {
    const execution = await executeQuery(
      {
        intent: "COMPARISON",
        printers: [
          { kind: "resolved", id: "HP-2500C" },
          { kind: "resolved", id: "HP-DeskJet_560C" },
        ],
      },
      HOME_CONTEXT,
      data
    )
    if (execution.kind !== "comparison") throw new Error("wrong kind")
    expect(execution.a.id).toBe("HP-2500C")
    expect(execution.b.id).toBe("HP-DeskJet_560C")
  })

  it("clarifies ambiguous references with their candidates", async () => {
    const execution = await executeQuery(
      {
        intent: "PRINTER_LOOKUP",
        printer: {
          kind: "ambiguous",
          text: "hp laserjet",
          candidates: [
            { id: "HP-LaserJet_4", manufacturer: "HP", model: "LaserJet 4", score: 1 },
            { id: "HP-LaserJet_4P", manufacturer: "HP", model: "LaserJet 4P", score: 1 },
          ],
          total: 3,
        },
      },
      HOME_CONTEXT,
      data
    )
    expect(execution.kind).toBe("clarify")
  })

  it("reports unresolved references as entity misses with suggestions", async () => {
    const execution = await executeQuery(
      {
        intent: "PRINTER_LOOKUP",
        printer: { kind: "unresolved", text: "Brother hl 2270dw", suggestions: [] },
      },
      HOME_CONTEXT,
      data
    )
    expect(execution.kind).toBe("entity-miss")
  })
})
