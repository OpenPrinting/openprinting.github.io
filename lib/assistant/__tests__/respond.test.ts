import { describe, expect, it } from "vitest"
import { runAssistant } from "../engine"
import { buildResponse } from "../respond"
import type { AssistantPageContext, Execution, ResponsePlan } from "../types"
import { CORPUS } from "./corpus"
import { CATALOG, fixtureData, HOME_CONTEXT, LJ4_CONTEXT, RECOMMENDATIONS } from "./fixtures"

const data = fixtureData()

// Terminology that PR #224 banned for recommendation language
// (tools/eval/check-docs.mjs) plus assistant-specific equivalents. No
// response, for any corpus utterance, may ever produce these.
const BANNED_PATTERNS = [
  /exact match/i,
  /% match\b/i,
  /% compatible/i,
  /compatibility (probability|percentage|score)/i,
  /guaranteed to work/i,
  /\bbest printer overall\b/i,
]

function allText(plan: ResponsePlan): string {
  return plan.blocks
    .map(block => {
      switch (block.kind) {
        case "text":
          return block.text
        case "chips":
          return block.chips.map(chip => chip.label).join(" ")
        case "comparison":
          return block.rows.map(row => `${row.label} ${row.a} ${row.b}`).join(" ")
        default:
          return ""
      }
    })
    .join(" ")
}

function contextFor(ctx?: "home" | "printer" | "driver"): AssistantPageContext {
  if (ctx === "printer") return LJ4_CONTEXT
  if (ctx === "driver") return { pageType: "driver", route: "/foomatic/driver/hplip", driverId: "hplip" }
  return HOME_CONTEXT
}

describe("grounding: every rendered claim traces to fixture data", () => {
  const knownIds = new Set(CATALOG.map(printer => printer.id))
  const knownScores = new Set(
    Object.values(RECOMMENDATIONS).flat().map(entry => Math.round(entry.score * 100))
  )

  it("full corpus sweep: cards reference real printers, similarity percentages match shard scores, no banned wording", async () => {
    for (const testCase of CORPUS) {
      const turn = await runAssistant(testCase.q, contextFor(testCase.ctx), data)
      const text = allText(turn.plan)

      for (const pattern of BANNED_PATTERNS) {
        expect(pattern.test(text), `"${testCase.q}" produced banned wording (${pattern})`).toBe(false)
      }

      for (const block of turn.plan.blocks) {
        if (block.kind === "printer-cards") {
          for (const card of block.printers) {
            expect(knownIds.has(card.id), `"${testCase.q}" rendered unknown printer ${card.id}`).toBe(true)
            if (card.score !== undefined) {
              expect(
                knownScores.has(Math.round(card.score * 100)),
                `"${testCase.q}" rendered a similarity score not present in any shard`
              ).toBe(true)
            }
          }
        }
      }

      const percentages = [...text.matchAll(/(\d+)% similarity/g)].map(match => Number(match[1]))
      for (const percent of percentages) {
        expect(knownScores.has(percent), `"${testCase.q}" stated ${percent}% similarity, not in any shard`).toBe(true)
      }
    }
  })

  it("every suggestion chip re-parses through the normal pipeline without throwing", async () => {
    for (const testCase of CORPUS.slice(0, 60)) {
      const turn = await runAssistant(testCase.q, contextFor(testCase.ctx), data)
      for (const block of turn.plan.blocks) {
        if (block.kind === "chips") {
          for (const chip of block.chips) {
            await expect(runAssistant(chip.query, contextFor(testCase.ctx), data)).resolves.toBeTruthy()
          }
        }
      }
    }
  })
})

describe("honest language for key flows", () => {
  it("explanations quote the shard verbatim and keep similarity separate from the support grade", async () => {
    const turn = await runAssistant("why was hp laserjet 4p recommended", LJ4_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain("90% similarity")
    expect(text).toContain("High confidence")
    expect(text).toContain("Preferred Linux driver: hplip")
    expect(text).toContain("Linux support grade is Perfect")
    expect(text).toContain("not a promise")
  })

  it("similar-printers responses state that similarity is not a compatibility promise", async () => {
    const turn = await runAssistant("what printers are similar to this?", LJ4_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain("similarity is not a compatibility promise")
  })

  it("criteria-free 'best' clarifies and never ranks", async () => {
    const turn = await runAssistant("what is the best printer?", HOME_CONTEXT, data)
    expect(turn.execution.kind).toBe("clarify")
    expect(allText(turn.plan)).toContain("doesn't rank printers overall")
    expect(turn.plan.blocks.some(block => block.kind === "printer-cards")).toBe(false)
  })

  it("'better alternatives' asks for the dimension", async () => {
    const turn = await runAssistant("what are better alternatives?", LJ4_CONTEXT, data)
    expect(allText(turn.plan)).toContain("Better in what way?")
  })

  it("duplex answers state the data gap and never fabricate results", async () => {
    const turn = await runAssistant("find a duplex printer", HOME_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain("doesn't record duplex")
    expect(text).toContain("13 printers")
    expect(turn.plan.blocks.some(block => block.kind === "printer-cards")).toBe(false)
  })

  it("duplex combined with real filters still answers the real part", async () => {
    const turn = await runAssistant("colour laser printer with duplex", HOME_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain("doesn't record duplex")
    const cards = turn.plan.blocks.find(block => block.kind === "printer-cards")
    expect(cards).toBeDefined()
    if (cards && cards.kind === "printer-cards") {
      expect(cards.printers.map(card => card.id)).toEqual(["Xerox-Phaser_6100"])
    }
  })

  it("unsupported constraints are surfaced, not silently dropped", async () => {
    const turn = await runAssistant("purple laser printer", HOME_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain('"purple"')
    expect(text).toContain("doesn't record that")
  })

  it("out-of-domain questions get a scope statement", async () => {
    const turn = await runAssistant("what's the weather?", HOME_CONTEXT, data)
    expect(allText(turn.plan)).toContain("outside my data")
  })

  it("unknown fields render as 'Not recorded' in comparisons, never as absence", async () => {
    const turn = await runAssistant("compare hp 2500c and ibm 4019", HOME_CONTEXT, data)
    expect(turn.execution.kind).toBe("comparison")
    const comparison = turn.plan.blocks.find(block => block.kind === "comparison")
    expect(comparison).toBeDefined()
    if (comparison && comparison.kind === "comparison") {
      const colourRow = comparison.rows.find(row => row.label === "Colour")
      expect(colourRow?.b).toBe("Not recorded")
    }
    const text = allText(turn.plan)
    expect(text).not.toMatch(/does not support/i)
  })

  it("no-match entities are reported with catalogue-backed suggestions", async () => {
    const turn = await runAssistant("Brother HL-2270DW", HOME_CONTEXT, data)
    const text = allText(turn.plan)
    expect(text).toContain("couldn't find a printer matching")
    const cards = turn.plan.blocks.find(block => block.kind === "printer-cards")
    if (cards && cards.kind === "printer-cards") {
      for (const card of cards.printers) {
        expect(CATALOG.some(printer => printer.id === card.id)).toBe(true)
      }
    }
  })
})

describe("synthetic diagnostics rendering", () => {
  it("reports materially unknown-excluded populations", () => {
    const execution: Execution = {
      kind: "search-results",
      state: "SUCCESS",
      recommend: false,
      matches: CATALOG.slice(0, 2),
      total: 2,
      diagnostics: {
        filters: [{ label: "colour", matched: 2, excludedKnown: 2, excludedUnknown: 4 }],
        unapplied: [],
        insufficient: [],
        relaxations: [],
        orderingLabel: "Linux support status, then number of listed drivers",
        catalogSize: 8,
      },
    }
    const text = allText(buildResponse(execution))
    expect(text).toContain("4 more printers don't record")
    expect(text).toContain("missing data")
  })

  it("renders relaxation chips with counts", () => {
    const execution: Execution = {
      kind: "search-results",
      state: "NO_MATCHES",
      recommend: false,
      matches: [],
      total: 0,
      diagnostics: {
        filters: [
          { label: "colour", matched: 0, excludedKnown: 5, excludedUnknown: 0 },
          { label: "at least 2400 dpi", matched: 0, excludedKnown: 5, excludedUnknown: 0 },
        ],
        unapplied: [],
        insufficient: [],
        relaxations: [{ droppedLabel: "at least 2400 dpi", resultCount: 6, query: "find colour printers" }],
        orderingLabel: null,
        catalogSize: 13,
      },
    }
    const plan = buildResponse(execution)
    const chips = plan.blocks.find(block => block.kind === "chips")
    expect(chips).toBeDefined()
    if (chips && chips.kind === "chips") {
      expect(chips.chips[0].label).toContain("6 printers")
    }
  })
})

describe("error handling", () => {
  it("wraps data failures into a retryable error response", async () => {
    const failing = {
      ...fixtureData(),
      getCatalog: async () => {
        throw new Error("network down")
      },
    }
    const turn = await runAssistant("find a colour laser printer", HOME_CONTEXT, failing)
    expect(turn.execution.kind).toBe("error")
    const chips = turn.plan.blocks.find(block => block.kind === "chips")
    expect(chips && chips.kind === "chips" && chips.chips[0].label).toBe("Try again")
  })
})
