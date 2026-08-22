import { beforeAll, describe, expect, it } from "vitest"
import { normalizeDriverId, printerHref } from "@/lib/foomatic/routes"
import type { PrinterSummary } from "@/lib/foomatic/types"
import { artifactsPresent, nodeData } from "../../../tools/assistant-eval/node-data"
import { parsePageContext } from "../context"
import { buildDriverIndex, buildPrinterIndex, type PrinterIndex } from "../entities"
import { runAssistant } from "../engine"
import { MANUFACTURER_ALIASES } from "../entities"
import { fuseText } from "../normalize"
import { parseQuery } from "../parse"
import type { AssistantData, AssistantPageContext, ResponsePlan } from "../types"

// End-to-end validation against the REAL generated artifacts (the exact data
// the site ships). Skipped when the artifacts are absent - CI runs `yarn test`
// before `yarn generate`; run `yarn generate` (or the split/similarity stages)
// locally first. The always-run fixture suites pin the engine's behavior.

const present = artifactsPresent()

describe.skipIf(!present)("assistant against real foomatic artifacts", () => {
  let data: AssistantData
  let catalog: PrinterSummary[]
  let byId: Map<string, PrinterSummary>
  let printerIndex: PrinterIndex
  let indexes: Parameters<typeof parseQuery>[2]
  let lj4Context: AssistantPageContext

  const cardIds = (plan: ResponsePlan): string[] =>
    plan.blocks.flatMap(block => (block.kind === "printer-cards" ? block.printers.map(card => card.id) : []))

  const planText = (plan: ResponsePlan): string =>
    plan.blocks
      .map(block => {
        if (block.kind === "text") return block.text
        if (block.kind === "list") return `${block.title} ${block.items.join(" ")}`
        return ""
      })
      .join(" ")

  beforeAll(async () => {
    data = nodeData()
    catalog = await data.getCatalog()
    byId = new Map(catalog.map(printer => [printer.id, printer]))
    printerIndex = buildPrinterIndex(catalog)
    indexes = { printers: printerIndex, drivers: buildDriverIndex(await data.getDriversMap()) }
    lj4Context = parsePageContext(printerHref("HP-LaserJet_4", "HP"))
  })

  it("resolves real printer names, aliases, and punctuation variants", () => {
    const home = parsePageContext("/")
    for (const [input, id] of [
      ["HP 2500C", "HP-2500C"],
      ["hp 2500cm", "HP-2500CM"],
      ["Hewlett Packard 2500C", "HP-2500C"],
      ["HP DeskJet 560C", "HP-DeskJet_560C"],
      ["hp laserjet 4", "HP-LaserJet_4"],
    ] as const) {
      const query = parseQuery(input, home, indexes)
      expect(query.intent, input).toBe("PRINTER_LOOKUP")
      if (query.intent === "PRINTER_LOOKUP") {
        expect(query.printer, input).toEqual({ kind: "resolved", id })
      }
    }
  })

  it("resolves 'HP LaserJet' to the literal HP-LaserJet record (it really exists upstream)", () => {
    // The upstream database contains plain family-name printers (HP-LaserJet,
    // HP-DeskJet, Epson-Stylus), so an exact name match is the honest answer
    // here - ambiguity handling applies only when no exact record exists.
    const query = parseQuery("HP LaserJet", parsePageContext("/"), indexes)
    expect(query.intent).toBe("PRINTER_LOOKUP")
    if (query.intent === "PRINTER_LOOKUP") {
      expect(query.printer).toEqual({ kind: "resolved", id: "HP-LaserJet" })
    }
  })

  it("treats a partial model prefix as ambiguous across the real family", () => {
    // No printer is literally named "HP DeskJet 5", but 21 DeskJet 5xx models
    // exist: this must surface as an ambiguity with real candidates.
    const query = parseQuery("hp deskjet 5", parsePageContext("/"), indexes)
    expect(query.intent).toBe("PRINTER_LOOKUP")
    if (query.intent === "PRINTER_LOOKUP") {
      expect(query.printer.kind).toBe("ambiguous")
      if (query.printer.kind === "ambiguous") {
        expect(query.printer.total).toBeGreaterThan(5)
        for (const candidate of query.printer.candidates) {
          expect(byId.has(candidate.id)).toBe(true)
        }
      }
    }
  })

  it("does not resolve Brother HL-2270DW (absent from the dataset) and only suggests real models", () => {
    const query = parseQuery("Brother HL-2270DW", parsePageContext("/"), indexes)
    expect(query.intent).toBe("PRINTER_LOOKUP")
    if (query.intent === "PRINTER_LOOKUP") {
      expect(query.printer.kind).toBe("unresolved")
      if (query.printer.kind === "unresolved") {
        for (const suggestion of query.printer.suggestions) {
          expect(byId.has(suggestion.id)).toBe(true)
        }
      }
    }
  })

  it("keeps every manufacturer alias pointing at a real catalogue make", () => {
    const makes = new Set(catalog.map(printer => fuseText(printer.manufacturer)))
    for (const make of Object.values(MANUFACTURER_ALIASES)) {
      expect(makes.has(fuseText(make)), make).toBe(true)
    }
  })

  it("capability search returns only printers whose recorded fields match", async () => {
    const turn = await runAssistant("find a colour laser printer with good linux support", parsePageContext("/"), data)
    expect(turn.execution.kind).toBe("search-results")
    if (turn.execution.kind === "search-results") {
      expect(turn.execution.total).toBeGreaterThan(0)
      for (const match of turn.execution.matches) {
        expect(match.color).toBe(true)
        expect(match.type).toBe("laser")
        expect(["Perfect", "Mostly"]).toContain(match.status)
      }
    }
  })

  it("similar-printers answers come from the real recommendation shard, order and scores intact", async () => {
    const shard = await data.getRecommendations("HP-LaserJet_4")
    expect(shard.length).toBeGreaterThan(0)
    const turn = await runAssistant("what printers are similar to this?", lj4Context, data)
    expect(turn.execution.kind).toBe("similar")
    if (turn.execution.kind === "similar") {
      expect(turn.execution.entries).toEqual(shard)
    }
    const ids = cardIds(turn.plan)
    expect(ids.length).toBeGreaterThan(0)
    for (const [position, id] of ids.entries()) {
      expect(id).toBe(shard[position].id)
    }
  })

  it("explanations quote the real shard's sharedFeatures verbatim", async () => {
    const shard = await data.getRecommendations("HP-LaserJet_4")
    const top = shard[0]
    const name = `${top.manufacturer ?? ""} ${top.model ?? top.id}`.trim()
    const turn = await runAssistant(`why was ${name} recommended`, lj4Context, data)
    expect(turn.execution.kind).toBe("explanation")
    const text = planText(turn.plan)
    for (const feature of top.sharedFeatures) {
      expect(text).toContain(feature)
    }
    expect(text).toContain(`${Math.round(top.score * 100)}% similarity`)
    expect(text).toContain(top.status)
  })

  it("comparison rows reflect the real printer records", async () => {
    const turn = await runAssistant("compare HP 2500C and HP DeskJet 560C", parsePageContext("/"), data)
    expect(turn.execution.kind).toBe("comparison")
    if (turn.execution.kind !== "comparison") return
    const [a, b] = await Promise.all([data.getPrinter("HP-2500C"), data.getPrinter("HP-DeskJet_560C")])
    const comparison = turn.plan.blocks.find(block => block.kind === "comparison")
    expect(comparison).toBeDefined()
    if (comparison && comparison.kind === "comparison" && a && b) {
      const resolution = comparison.rows.find(row => row.label === "Max resolution")
      expect(resolution?.a).toBe(typeof a.maxDpi === "number" ? `${a.maxDpi} dpi` : "Not recorded")
      expect(resolution?.b).toBe(typeof b.maxDpi === "number" ? `${b.maxDpi} dpi` : "Not recorded")
    }
  })

  it("'same driver' uses the real recommended driver and its real reverse index", async () => {
    const printer = await data.getPrinter("HP-LaserJet_4")
    const recommended = normalizeDriverId(printer?.recommended_driver ?? "")
    expect(recommended.length).toBeGreaterThan(0)
    const turn = await runAssistant("which printers use the same driver?", lj4Context, data)
    expect(turn.execution.kind).toBe("driver-search")
    if (turn.execution.kind === "driver-search") {
      expect(turn.execution.anchorDriverName).toBe(recommended)
      const record = await data.getDriver(recommended)
      const listed = new Set(record?.printers.map(p => p.id))
      for (const id of cardIds(turn.plan)) {
        expect(listed.has(id)).toBe(true)
      }
    }
  })

  it("duplex is answered as missing data across the whole real catalogue", async () => {
    const turn = await runAssistant("duplex printer", parsePageContext("/"), data)
    expect(turn.execution.kind).toBe("insufficient")
    const text = planText(turn.plan)
    expect(text).toContain(String(catalog.length))
    expect(cardIds(turn.plan)).toEqual([])
  })

  it("'purple laser printer' surfaces the unapplied constraint and filters the rest", async () => {
    const turn = await runAssistant("purple laser printer", parsePageContext("/"), data)
    const text = planText(turn.plan)
    expect(text).toContain('"purple"')
    for (const id of cardIds(turn.plan)) {
      expect(byId.get(id)?.type).toBe("laser")
    }
  })

  it("criteria-free best and dimension-free better both clarify on real data", async () => {
    const best = await runAssistant("what is the best printer?", parsePageContext("/"), data)
    expect(best.execution.kind).toBe("clarify")
    const better = await runAssistant("what are better alternatives?", lj4Context, data)
    expect(better.execution.kind).toBe("clarify")
  })

  it("every similarity percentage rendered anywhere matches a real shard score", async () => {
    const shard = await data.getRecommendations("HP-LaserJet_4")
    const scores = new Set(shard.map(entry => Math.round(entry.score * 100)))
    const turn = await runAssistant("what printers are similar to this?", lj4Context, data)
    for (const block of turn.plan.blocks) {
      if (block.kind === "printer-cards") {
        for (const card of block.printers) {
          if (card.score !== undefined) {
            expect(scores.has(Math.round(card.score * 100))).toBe(true)
          }
        }
      }
    }
  })
})
