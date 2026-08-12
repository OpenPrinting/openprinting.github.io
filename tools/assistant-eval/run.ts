// Assistant evaluation harness. Runs the natural-language corpus and the
// approved end-to-end flows against the REAL generated artifacts, validates
// grounding (every rendered claim traceable to local data), measures latency
// and artifact sizes, and gates documentation drift for the assistant's
// tunable constants (same conventions as tools/eval/*.mjs for the
// recommendation pipeline).
//
// Run: yarn assistant:eval   (requires `yarn generate` output to exist)
// Exits non-zero on any failure.

import fs from "node:fs"
import path from "node:path"
import { performance } from "node:perf_hooks"
import zlib from "node:zlib"
import { CORPUS } from "../../lib/assistant/__tests__/corpus"
import { parsePageContext } from "../../lib/assistant/context"
import { buildDriverIndex, buildPrinterIndex } from "../../lib/assistant/entities"
import { runAssistant } from "../../lib/assistant/engine"
import { parseQuery } from "../../lib/assistant/parse"
import type { AssistantPageContext, ResponsePlan } from "../../lib/assistant/types"
import { printerHref } from "../../lib/foomatic/routes"
import { artifactsPresent, nodeData } from "./node-data"

const ROOT = process.cwd()
const failures: string[] = []
const fail = (message: string) => failures.push(message)

const BANNED_PATTERNS = [
  /exact match/i,
  /% match\b/i,
  /% compatible/i,
  /compatibility (probability|percentage|score)/i,
  /guaranteed to work/i,
]

function planText(plan: ResponsePlan): string {
  return plan.blocks
    .map(block => {
      if (block.kind === "text") return block.text
      if (block.kind === "chips") return block.chips.map(chip => chip.label).join(" ")
      if (block.kind === "comparison") return block.rows.map(row => `${row.label} ${row.a} ${row.b}`).join(" ")
      return ""
    })
    .join(" ")
}

function gzipSize(file: string): { raw: number; gz: number } | null {
  try {
    const buffer = fs.readFileSync(file)
    return { raw: buffer.length, gz: zlib.gzipSync(buffer).length }
  } catch {
    return null
  }
}

async function main() {
  if (!artifactsPresent(ROOT)) {
    console.error(
      "assistant-eval: generated artifacts not found under public/foomatic-db.\n" +
        "Run `yarn generate` (or at least the combine/split stages) first."
    )
    process.exit(1)
  }

  const data = nodeData(ROOT)
  const catalog = await data.getCatalog()
  const byId = new Map(catalog.map(printer => [printer.id, printer]))
  const indexes = {
    printers: buildPrinterIndex(catalog),
    drivers: buildDriverIndex(await data.getDriversMap()),
  }

  const printerContext = parsePageContext(printerHref("HP-LaserJet_4", "HP"))
  const driverContext = parsePageContext("/foomatic/driver/hplip")
  const homeContext = parsePageContext("/")
  const contextFor = (ctx?: "home" | "printer" | "driver"): AssistantPageContext =>
    ctx === "printer" ? printerContext : ctx === "driver" ? driverContext : homeContext

  // ---- 1. corpus intent accuracy on real data -----------------------------
  let intentPasses = 0
  let checkPasses = 0
  let checksRun = 0
  for (const testCase of CORPUS) {
    const query = parseQuery(testCase.q, contextFor(testCase.ctx), indexes)
    if (query.intent === testCase.intent) {
      intentPasses++
    } else {
      fail(`intent: "${testCase.q}" -> ${query.intent}, expected ${testCase.intent}`)
    }
    if (testCase.check && !testCase.fixtureOnly) {
      checksRun++
      const problem = testCase.check(query)
      if (problem === null) checkPasses++
      else fail(`check: "${testCase.q}": ${problem}`)
    }
  }

  // ---- 2. grounding sweep: run every utterance end-to-end -----------------
  let groundedResponses = 0
  for (const testCase of CORPUS) {
    const turn = await runAssistant(testCase.q, contextFor(testCase.ctx), data)
    const text = planText(turn.plan)

    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(text)) fail(`banned wording for "${testCase.q}": ${pattern}`)
    }

    // Every similarity percentage must equal a score in the execution's own
    // shard entries - the response layer cannot invent or reinterpret scores.
    const allowedScores = new Set<number>()
    if (turn.execution.kind === "similar") {
      for (const entry of turn.execution.entries) allowedScores.add(Math.round(entry.score * 100))
    }
    if (turn.execution.kind === "explanation") {
      allowedScores.add(Math.round(turn.execution.entry.score * 100))
    }
    if (turn.execution.kind === "clarify" && turn.execution.question.topic === "explanation-candidate") {
      for (const entry of turn.execution.question.topRecommendations) {
        allowedScores.add(Math.round(entry.score * 100))
      }
    }
    for (const match of text.matchAll(/(\d+)% similarity/g)) {
      if (!allowedScores.has(Number(match[1]))) {
        fail(`ungrounded similarity % for "${testCase.q}": ${match[1]}`)
      }
    }

    // Every printer card must reference a real catalogue record.
    for (const block of turn.plan.blocks) {
      if (block.kind === "printer-cards") {
        for (const card of block.printers) {
          if (!byId.has(card.id)) fail(`unknown printer id rendered for "${testCase.q}": ${card.id}`)
        }
      }
    }
    groundedResponses++
  }

  // ---- 3. approved end-to-end flows ---------------------------------------
  const flows: { q: string; ctx?: "printer"; expectKind: string }[] = [
    { q: "find a colour laser printer", expectKind: "search-results" },
    { q: "find a colour laser printer with good linux support", expectKind: "search-results" },
    { q: "what printers are similar to this?", ctx: "printer", expectKind: "similar" },
    { q: "what is the best printer?", expectKind: "clarify" },
    { q: "what are better alternatives?", ctx: "printer", expectKind: "clarify" },
    { q: "find a printer with better linux support", ctx: "printer", expectKind: "similar" },
    { q: "compare HP 2500C and HP DeskJet 560C", expectKind: "comparison" },
    { q: "which printers use the same driver?", ctx: "printer", expectKind: "driver-search" },
    { q: "duplex printer", expectKind: "insufficient" },
    { q: "purple laser printer", expectKind: "search-results" },
    { q: "Brother HL-2270DW", expectKind: "entity-miss" },
  ]
  for (const flow of flows) {
    const turn = await runAssistant(flow.q, contextFor(flow.ctx), data)
    if (turn.execution.kind !== flow.expectKind) {
      fail(`flow "${flow.q}": execution ${turn.execution.kind}, expected ${flow.expectKind}`)
    }
  }
  // "why was X recommended" needs the real top recommendation's name.
  const shard = await data.getRecommendations("HP-LaserJet_4")
  if (shard.length > 0) {
    const top = shard[0]
    const name = `${top.manufacturer ?? ""} ${top.model ?? top.id}`.trim()
    const turn = await runAssistant(`why was ${name} recommended`, printerContext, data)
    if (turn.execution.kind !== "explanation") {
      fail(`flow "why was ${name} recommended": ${turn.execution.kind}`)
    } else {
      const text = planText(turn.plan)
      for (const feature of top.sharedFeatures) {
        if (!text.includes(feature)) fail(`explanation missing shard feature: ${feature}`)
      }
    }
  } else {
    fail("HP-LaserJet_4 recommendation shard is empty; cannot validate explanation flow")
  }

  // ---- 4. latency (warm data source) --------------------------------------
  const durations: number[] = []
  for (let round = 0; round < 3; round++) {
    for (const testCase of CORPUS) {
      const start = performance.now()
      await runAssistant(testCase.q, contextFor(testCase.ctx), data)
      durations.push(performance.now() - start)
    }
  }
  durations.sort((a, b) => a - b)
  const median = durations[Math.floor(durations.length / 2)]
  const p95 = durations[Math.floor(durations.length * 0.95)]

  // ---- 5. artifact sizes ---------------------------------------------------
  const db = path.join(ROOT, "public", "foomatic-db")
  const sizes = {
    printersMap: gzipSize(path.join(db, "printersMap.json")),
    driversMap: gzipSize(path.join(db, "driversMap.json")),
    samplePrinterShard: gzipSize(path.join(db, "printers", "HP-LaserJet_4.json")),
    sampleRecommendationShard: gzipSize(path.join(db, "recommendations", "HP-LaserJet_4.json")),
  }

  // ---- 6. tunables documentation drift ------------------------------------
  const constantsSource = fs.readFileSync(path.join(ROOT, "lib", "assistant", "constants.ts"), "utf8")
  const codeConstants = new Map<string, string>()
  for (const match of constantsSource.matchAll(/export const (\w+) = ([\d.]+)/g)) {
    codeConstants.set(match[1], match[2])
  }
  const docPath = path.join(ROOT, "docs", "foomatic-assistant.md")
  if (!fs.existsSync(docPath)) {
    fail("docs/foomatic-assistant.md is missing")
  } else {
    const doc = fs.readFileSync(docPath, "utf8")
    const documented = new Map<string, string>()
    for (const match of doc.matchAll(/\| `(\w+)` \| ([\d.]+) \|/g)) {
      documented.set(match[1], match[2])
    }
    for (const [name, value] of codeConstants) {
      if (!documented.has(name)) fail(`tunable ${name} is not documented in foomatic-assistant.md`)
      else if (documented.get(name) !== value) {
        fail(`tunable ${name}: code=${value}, documented=${documented.get(name)}`)
      }
    }
    for (const name of documented.keys()) {
      if (!codeConstants.has(name)) fail(`documented tunable ${name} no longer exists in constants.ts`)
    }
    for (const file of ["foomatic-assistant.md", "foomatic-assistant-queries.md"]) {
      const full = path.join(ROOT, "docs", file)
      if (fs.existsSync(full)) {
        const content = fs.readFileSync(full, "utf8")
        for (const pattern of BANNED_PATTERNS) {
          if (pattern.test(content)) fail(`banned wording in docs/${file}: ${pattern}`)
        }
      }
    }
  }

  // ---- summary -------------------------------------------------------------
  console.log(
    JSON.stringify(
      {
        corpus: { cases: CORPUS.length, intentPasses, checksRun, checkPasses },
        grounding: { responsesSwept: groundedResponses },
        latencyMs: { median: Number(median.toFixed(2)), p95: Number(p95.toFixed(2)), samples: durations.length },
        artifactBytes: sizes,
        catalogSize: catalog.length,
        failures: failures.length,
      },
      null,
      2
    )
  )
  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s):`)
    for (const failure of failures) console.error(` - ${failure}`)
    process.exit(1)
  }
  console.log("\nassistant-eval: all checks passed")
}

main().catch(error => {
  console.error("assistant-eval crashed:", error)
  process.exit(1)
})
