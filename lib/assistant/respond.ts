// Execution -> ResponsePlan. Pure templates over typed retrieved data: every
// dynamic value interpolated here comes from an Execution field, which in turn
// came from the local artifacts. This module performs no I/O and never
// receives raw user text (entity/constraint echoes travel through the typed
// Execution).
//
// Language rules (mirrors PR #224's conventions in lib/foomatic/scoring.ts):
// - the score is "N% similarity", never a match percentage or probability;
// - the confidence tier describes evidence alignment, not compatibility;
// - a printer's Foomatic status is its own Linux support grade, stated
//   separately from similarity;
// - unknown data is "not recorded", never a negative claim.

import { confidenceTier } from "@/lib/foomatic/scoring"
import type { Printer, PrinterSummary } from "@/lib/foomatic/types"
import { MAX_RESULT_CARDS, UNKNOWN_REPORT_RATIO } from "./constants"
import { printerName } from "./execute"
import type {
  AssistantPageContext,
  Chip,
  ComparisonRow,
  Execution,
  PrinterCardData,
  RecommendationEntry,
  ResponseBlock,
  ResponsePlan,
  SearchDiagnostics,
} from "./types"

// Suggestion rule: a chip is a product promise. Its query is the exact text
// of its label (modulo casing/punctuation), it must parse to a supported
// intent, and it must never smuggle current-page values into the question.
const EXAMPLE_CHIPS: Chip[] = [
  { label: "Find a colour laser printer", query: "find a colour laser printer" },
  { label: "Find printers with good Linux support", query: "find printers with good linux support" },
  { label: "What can you do?", query: "what can you do" },
]

function text(value: string): ResponseBlock {
  return { kind: "text", text: value }
}

function chips(items: Chip[]): ResponseBlock {
  return { kind: "chips", chips: items }
}

function summaryCard(summary: PrinterSummary): PrinterCardData {
  return {
    id: summary.id,
    manufacturer: summary.manufacturer,
    model: summary.model,
    status: summary.status ?? "Unknown",
    type: summary.type !== "unknown" ? summary.type : undefined,
    driverCount: summary.driverCount,
    features: summaryFeatures(summary),
  }
}

// Capability chips show established values only; unknown fields are simply
// absent (detail views spell out "not recorded").
function summaryFeatures(summary: PrinterSummary): string[] {
  const features: string[] = []
  if (summary.color === true) features.push("Colour")
  if (summary.color === false) features.push("Monochrome")
  if (typeof summary.maxDpi === "number") features.push(`${summary.maxDpi} dpi`)
  if (typeof summary.psLevel === "number" && summary.psLevel > 0) features.push(`PostScript ${summary.psLevel}`)
  if (typeof summary.pclLevel === "number" && summary.pclLevel > 0) features.push(`PCL ${summary.pclLevel}`)
  return features
}

function recommendationCard(entry: RecommendationEntry): PrinterCardData {
  const tier = confidenceTier(entry.score)
  return {
    id: entry.id,
    manufacturer: entry.manufacturer ?? "",
    model: entry.model ?? entry.id,
    status: entry.status,
    type: entry.type !== "unknown" ? entry.type : undefined,
    driverCount: entry.driverCount,
    score: entry.score,
    tierLabel: tier.label,
    tierTone: tier.tone,
  }
}

function similarityPercent(score: number): string {
  return `${Math.round(score * 100)}% similarity`
}

function unknownNotes(diagnostics: SearchDiagnostics): string[] {
  const notes: string[] = []
  for (const filter of diagnostics.filters) {
    const pool = filter.matched + filter.excludedKnown + filter.excludedUnknown
    if (pool > 0 && filter.excludedUnknown / pool >= UNKNOWN_REPORT_RATIO) {
      notes.push(
        `${filter.excludedUnknown} more printers don't record the data needed for the "${filter.label}" requirement, so they are not shown - that is missing data, not a "no".`
      )
    }
  }
  return notes
}

function duplexNote(catalogSize: number): string {
  return (
    `The Foomatic database doesn't record duplex (two-sided printing) capability for any of its ` +
    `${catalogSize} printers, so I can't filter by duplex - please check the manufacturer's specifications for that.`
  )
}

const FILTERABLE_SUMMARY =
  "I can filter by colour vs monochrome, printer type (laser, inkjet, dot-matrix), resolution, PostScript/PCL, manufacturer, and Linux support grade."

export function buildResponse(execution: Execution): ResponsePlan {
  switch (execution.kind) {
    case "unsupported": {
      if (execution.reason === "empty") {
        return { blocks: [text("Type a question about printers, drivers, or Linux support to get started."), chips(EXAMPLE_CHIPS)] }
      }
      if (execution.reason === "unclear") {
        return {
          blocks: [
            text(`I didn't catch what you're looking for. ${FILTERABLE_SUMMARY}`),
            chips(EXAMPLE_CHIPS),
          ],
        }
      }
      return {
        blocks: [
          text(
            "I can only answer questions about the printers, drivers, and Linux support information in OpenPrinting's Foomatic database - that one is outside my data."
          ),
          chips(EXAMPLE_CHIPS),
        ],
      }
    }

    case "info":
      return buildInfo(execution.topic)

    case "error":
      return {
        blocks: [
          text("I couldn't load the data needed to answer that - the request failed. Please try again."),
          chips([{ label: "Try again", query: execution.retryQuery }]),
        ],
      }

    case "clarify":
      return buildClarify(execution)

    case "insufficient": {
      const message = execution.message
      if (message.topic === "duplex") {
        return { blocks: [text(duplexNote(message.catalogSize)), chips(EXAMPLE_CHIPS)] }
      }
      if (message.topic === "no-recommendation-data") {
        return {
          blocks: [text(`No similarity data is available for ${message.printerName}, so I can't list similar printers for it.`)],
        }
      }
      return {
        blocks: [
          text(
            `The Foomatic data doesn't record ${message.fieldLabel} for ${message.printerName}, so I can't answer that from the available data.`
          ),
        ],
      }
    }

    case "entity-miss": {
      const blocks: ResponseBlock[] = [
        text(`I couldn't find a printer matching "${execution.text}" in the OpenPrinting database.`),
      ]
      if (execution.suggestions.length > 0) {
        blocks.push(text("Closest model names in the catalogue:"))
        blocks.push({
          kind: "printer-cards",
          printers: execution.suggestions.map(candidate => ({
            id: candidate.id,
            manufacturer: candidate.manufacturer,
            model: candidate.model,
            status: "Unknown",
          })),
        })
        blocks.push(
          chips(
            execution.suggestions.map(candidate => ({
              label: `Tell me about ${candidate.manufacturer} ${candidate.model}`,
              query: `tell me about ${candidate.manufacturer} ${candidate.model}`,
            }))
          )
        )
      }
      return { blocks }
    }

    case "printer-details":
      return buildPrinterDetails(execution.summary, execution.printer)

    case "support":
      return buildSupport(execution.summary, execution.printer)

    case "driver-lookup":
      return buildDriverLookup(execution.summary, execution.printer)

    case "driver-search": {
      const driver = execution.driver
      const blocks: ResponseBlock[] = []
      if (execution.anchor && execution.anchorDriverName) {
        blocks.push(
          text(
            `${printerName(execution.anchor)}'s recommended driver is ${execution.anchorDriverName}. ` +
              `Printers that also list ${execution.anchorDriverName}:`
          )
        )
      } else {
        blocks.push(text(`${driver.printers.length} printers in the database list the ${driver.name} driver:`))
      }
      blocks.push({
        kind: "driver-card",
        driver: {
          id: driver.id,
          name: driver.name,
          supplier: driver.supplier,
          type: driver.type,
          printerCount: driver.printerCount,
        },
      })
      const shown = driver.printers.slice(0, MAX_RESULT_CARDS)
      blocks.push({
        kind: "printer-cards",
        printers: shown.map(printer => ({
          id: printer.id,
          manufacturer: printer.manufacturer,
          model: printer.model,
          status: printer.status ?? "Unknown",
        })),
      })
      if (driver.printers.length > shown.length) {
        blocks.push(
          text(`Showing ${shown.length} of ${driver.printers.length} - the full list is on the driver page.`)
        )
      }
      return { blocks }
    }

    case "comparison":
      return buildComparison(execution.a, execution.b)

    case "explanation":
      return buildExplanation(execution.source, execution.entry)

    case "explanation-none":
      return {
        blocks: [
          text(
            `${execution.candidateName} is not in ${printerName(execution.source)}'s similar-printers list, so there is no recommendation to explain for that pair.`
          ),
          chips([
            {
              label: `Printers similar to ${printerName(execution.source)}`,
              query: `printers similar to ${printerName(execution.source)}`,
            },
          ]),
        ],
      }

    case "similar":
      return buildSimilar(execution)

    case "search-results":
      return buildSearch(execution)
  }
}

function buildInfo(topic: "support-grades" | "similarity" | "assistant-help"): ResponsePlan {
  if (topic === "support-grades") {
    return {
      blocks: [
        text(
          "Foomatic grades how well a printer works with the free Linux drivers it lists: " +
            '"Perfect" means the upstream functionality grade A (everything works), "Mostly" covers grades B and C ' +
            '(works with some limitations), "Unsupported" means no working driver is known, and "Unknown" means ' +
            "the database simply has no grade recorded. The grade describes the printer's own driver situation - " +
            "it is separate from any similarity score."
        ),
        chips(EXAMPLE_CHIPS),
      ],
    }
  }
  if (topic === "similarity") {
    return {
      blocks: [
        text(
          "The similarity score compares two printers' recorded features - shared driver families, mechanism type, " +
            "colour capability, command sets, and resolution. It is a deterministic feature comparison, not a " +
            "probability and not a compatibility promise. The tiers (High confidence, Good match, Moderate match, " +
            "Limited evidence) describe how much recorded evidence supports the similarity, and each recommended " +
            "printer's own Linux support grade is always shown separately."
        ),
        chips(EXAMPLE_CHIPS),
      ],
    }
  }
  return {
    blocks: [
      text(
        "I answer questions from OpenPrinting's Foomatic printer database: look up printers, filter by capabilities, " +
          "list similar printers, explain recommendations, compare two models, and find drivers. " +
          FILTERABLE_SUMMARY
      ),
      chips(EXAMPLE_CHIPS),
    ],
  }
}

function buildClarify(execution: Extract<Execution, { kind: "clarify" }>): ResponsePlan {
  const question = execution.question
  switch (question.topic) {
    case "printer-ambiguous": {
      const blocks: ResponseBlock[] = [
        text(
          question.total > question.candidates.length
            ? `"${question.text}" matches ${question.total} printers in the database. Did you mean one of these?`
            : `"${question.text}" matches more than one printer. Did you mean one of these?`
        ),
        {
          kind: "printer-cards",
          printers: question.candidates.map(candidate => ({
            id: candidate.id,
            manufacturer: candidate.manufacturer,
            model: candidate.model,
            status: "Unknown",
          })),
        },
        chips(
          question.candidates.map(candidate => ({
            label: `Tell me about ${candidate.manufacturer} ${candidate.model}`,
            query: `tell me about ${candidate.manufacturer} ${candidate.model}`,
          }))
        ),
      ]
      return { blocks }
    }
    case "criteria-needed":
      return {
        blocks: [
          text(
            "The database doesn't rank printers overall, so there is no single \"best\" printer to point to. " +
              "Tell me what you need and I can filter the catalogue."
          ),
          chips([
            { label: "Find colour laser printers", query: "find colour laser printers" },
            { label: "Find printers with good Linux support", query: "find printers with good linux support" },
            { label: "Find printers with PostScript", query: "find printers with postscript" },
            { label: "Find inkjet printers", query: "find inkjet printers" },
          ]),
        ],
      }
    case "better-dimension":
      return {
        blocks: [
          text(
            `Better in what way? The database can compare these dimensions for printers similar to ${question.anchorName}:`
          ),
          chips([
            { label: "Linux support", query: `alternatives to ${question.anchorName} with better linux support` },
            { label: "Overall similarity", query: `printers similar to ${question.anchorName}` },
            { label: "Resolution", query: `alternatives to ${question.anchorName} with higher resolution` },
            { label: "Driver options", query: `alternatives to ${question.anchorName} with more driver options` },
          ]),
        ],
      }
    case "driver-family":
      return {
        blocks: [
          text(
            `"${question.family}" is a driver family, not a single driver. Which of these drivers do you mean?`
          ),
          chips(question.members.map(member => ({ label: member, query: `which printers use ${member}` }))),
        ],
      }
    case "driver-unresolved": {
      const blocks: ResponseBlock[] = [
        text(`I couldn't find a driver named "${question.text}" in the OpenPrinting database.`),
      ]
      if (question.suggestions.length > 0) {
        blocks.push(text("Did you mean:"))
        blocks.push(
          chips(question.suggestions.map(id => ({ label: id, query: `which printers use ${id}` })))
        )
      }
      return { blocks }
    }
    case "context-needed": {
      const blocks: ResponseBlock[] = [
        text(
          question.subject === "printer"
            ? "I can't tell which printer you mean from this page - which model are you asking about?"
            : "I can't tell which driver you mean from this page - which driver are you asking about?"
        ),
      ]
      if (question.alternative) {
        blocks.push(chips([question.alternative]))
      }
      return { blocks }
    }
    case "explanation-candidate":
      return {
        blocks: [
          text(`Which of ${question.sourceName}'s recommendations should I explain?`),
          chips(
            question.topRecommendations.map(entry => {
              const name = `${entry.manufacturer ?? ""} ${entry.model ?? entry.id}`.trim()
              return { label: `Why was ${name} recommended?`, query: `why was ${name} recommended` }
            })
          ),
        ],
      }
  }
}

function describeTriState(value: boolean | "unknown" | undefined, yes: string, no: string): string {
  if (value === true) return yes
  if (value === false) return no
  return "not recorded"
}

function buildPrinterDetails(summary: PrinterSummary, printer: Printer | null): ResponsePlan {
  const name = printerName(summary)
  const facts: string[] = []
  facts.push(
    summary.type && summary.type !== "unknown"
      ? `${name} is a ${summary.type === "dot-matrix" ? "dot-matrix" : summary.type} printer`
      : `${name}'s mechanism type is not recorded`
  )
  facts.push(`its Foomatic Linux support grade is ${summary.status ?? "Unknown"}`)
  facts.push(`colour printing: ${describeTriState(summary.color, "yes", "no (monochrome)")}`)
  if (typeof summary.maxDpi === "number") {
    facts.push(`maximum recorded resolution ${summary.maxDpi} dpi`)
  }
  facts.push(`${summary.driverCount ?? 0} drivers are listed`)
  const recommended = (printer?.recommended_driver ?? "").trim()
  if (recommended) {
    facts.push(`the recommended driver is ${recommended.replace(/^driver\//, "")}`)
  }

  return {
    blocks: [
      text(`${facts.join("; ")}.`),
      { kind: "printer-cards", printers: [summaryCard(summary)] },
      chips([
        { label: `Printers similar to ${name}`, query: `printers similar to ${name}` },
        { label: `Linux support for ${name}`, query: `linux support for ${name}` },
        { label: `Which driver does ${name} use?`, query: `which driver does ${name} use` },
      ]),
    ],
  }
}

function buildSupport(summary: PrinterSummary, printer: Printer | null): ResponsePlan {
  const name = printerName(summary)
  const status = summary.status ?? "Unknown"
  const grade = summary.functionality && summary.functionality !== "?" ? summary.functionality : null
  const parts: string[] = []
  if (status === "Unknown") {
    parts.push(`The Foomatic database has no Linux support grade recorded for ${name}.`)
  } else {
    parts.push(
      `${name}'s Foomatic Linux support status is ${status}` +
        (grade ? ` (upstream functionality grade ${grade})` : "") +
        "."
    )
  }
  parts.push(`${summary.driverCount ?? 0} drivers are listed for it.`)
  const recommended = (printer?.recommended_driver ?? "").trim()
  if (recommended) {
    parts.push(`The recommended driver is ${recommended.replace(/^driver\//, "")}.`)
  }
  return {
    blocks: [
      text(parts.join(" ")),
      { kind: "printer-cards", printers: [summaryCard(summary)] },
      chips([{ label: "What do the support grades mean?", query: "what do the support grades mean" }]),
    ],
  }
}

function buildDriverLookup(summary: PrinterSummary, printer: Printer): ResponsePlan {
  const name = printerName(summary)
  const recommended = (printer.recommended_driver ?? "").trim().replace(/^driver\//, "")
  const others = (printer.drivers ?? [])
    .map(driver => driver.name)
    .filter(driverName => driverName && driverName !== recommended)

  const blocks: ResponseBlock[] = []
  if (recommended) {
    blocks.push(text(`${name}'s recommended driver is ${recommended}.`))
  } else if (others.length > 0) {
    blocks.push(text(`The database records no recommended driver for ${name}.`))
  } else {
    blocks.push(text(`The database lists no drivers for ${name}.`))
  }
  if (others.length > 0) {
    blocks.push(text(`Also listed: ${others.slice(0, 8).join(", ")}${others.length > 8 ? ` and ${others.length - 8} more` : ""}.`))
  }
  if (recommended) {
    blocks.push(
      chips([
        { label: `Printers using ${recommended}`, query: `which printers use ${recommended}` },
      ])
    )
  }
  return { blocks }
}

function comparisonValue(printer: Printer, field: "type" | "color" | "maxDpi" | "psLevel" | "pclLevel"): string {
  switch (field) {
    case "type":
      return printer.type && printer.type !== "unknown" ? printer.type : "Not recorded"
    case "color":
      return printer.color === true ? "Colour" : printer.color === false ? "Monochrome" : "Not recorded"
    case "maxDpi":
      return typeof printer.maxDpi === "number" ? `${printer.maxDpi} dpi` : "Not recorded"
    case "psLevel":
      return typeof printer.psLevel === "number" && printer.psLevel > 0 ? `Level ${printer.psLevel}` : "Not recorded"
    case "pclLevel":
      return typeof printer.pclLevel === "number" && printer.pclLevel > 0 ? `Level ${printer.pclLevel}` : "Not recorded"
  }
}

function buildComparison(a: Printer, b: Printer): ResponsePlan {
  const aName = printerName(a)
  const bName = printerName(b)
  const rows: ComparisonRow[] = [
    { label: "Linux support", a: a.status ?? "Unknown", b: b.status ?? "Unknown" },
    { label: "Type", a: comparisonValue(a, "type"), b: comparisonValue(b, "type") },
    { label: "Colour", a: comparisonValue(a, "color"), b: comparisonValue(b, "color") },
    { label: "Max resolution", a: comparisonValue(a, "maxDpi"), b: comparisonValue(b, "maxDpi") },
    { label: "PostScript", a: comparisonValue(a, "psLevel"), b: comparisonValue(b, "psLevel") },
    { label: "PCL", a: comparisonValue(a, "pclLevel"), b: comparisonValue(b, "pclLevel") },
    { label: "Listed drivers", a: String((a.drivers ?? []).length), b: String((b.drivers ?? []).length) },
    {
      label: "Recommended driver",
      a: (a.recommended_driver ?? "").replace(/^driver\//, "") || "Not recorded",
      b: (b.recommended_driver ?? "").replace(/^driver\//, "") || "Not recorded",
    },
  ]
  return {
    blocks: [
      text(
        `Here is what the Foomatic data records for ${aName} and ${bName}. "Not recorded" means the database has no ` +
          `data for that field - the data doesn't rank one printer above the other overall.`
      ),
      { kind: "comparison", aName, bName, rows },
    ],
  }
}

function buildExplanation(source: PrinterSummary, entry: RecommendationEntry): ResponsePlan {
  const sourceName = printerName(source)
  const entryName = `${entry.manufacturer ?? ""} ${entry.model ?? entry.id}`.trim()
  const tier = confidenceTier(entry.score)
  const blocks: ResponseBlock[] = [
    text(
      `${entryName} appears in ${sourceName}'s similar-printers list with a ${similarityPercent(entry.score)} score, ` +
        `in the "${tier.label}" tier. The score is a comparison of recorded printer features - it is not a promise that ` +
        `one printer can replace the other. ${entryName}'s own Foomatic Linux support grade is ${entry.status}, with ` +
        `${entry.driverCount} listed drivers.`
    ),
  ]
  if (entry.sharedFeatures.length > 0) {
    // The shard's own explanation strings, verbatim, one per line.
    blocks.push({ kind: "list", title: "Why it's similar:", items: entry.sharedFeatures })
  } else {
    blocks.push(text("The recommendation lists no individual shared features for this pair."))
  }
  blocks.push({ kind: "printer-cards", printers: [recommendationCard(entry)] })
  return { blocks }
}

function buildSimilar(execution: Extract<Execution, { kind: "similar" }>): ResponsePlan {
  const sourceName = printerName(execution.source)
  const blocks: ResponseBlock[] = []
  const shown = execution.entries.slice(0, MAX_RESULT_CARDS)

  if (execution.better === "support") {
    const sourceStatus = execution.source.status ?? "Unknown"
    if (execution.entries.length === 0) {
      blocks.push(
        text(
          sourceStatus === "Perfect"
            ? `${sourceName}'s own Linux support grade is already Perfect - none of its most similar printers have a higher grade.`
            : `Comparing Foomatic Linux support grades only: none of the ${execution.totalBeforeFilters} printers most similar to ${sourceName} have a grade above ${sourceStatus}. (Printers with an Unknown grade are excluded - unknown is not comparable.)`
        )
      )
    } else {
      blocks.push(
        text(
          `Comparing Foomatic Linux support grades only: ${execution.entries.length} of the ${execution.totalBeforeFilters} printers most similar to ${sourceName} have a higher grade than its ${sourceStatus}. This compares support grades, not overall quality.`
        )
      )
    }
  } else if (execution.better === "resolution") {
    blocks.push(
      text(
        `Comparing recorded maximum resolution only: ${execution.entries.length} of the ${execution.totalBeforeFilters} printers most similar to ${sourceName} record a higher resolution than its ${execution.sourceMaxDpi} dpi. Printers without recorded resolution are excluded - that is missing data, not a lower resolution.`
      )
    )
  } else if (execution.better === "drivers") {
    blocks.push(
      text(
        `Comparing the number of listed drivers only: ${execution.entries.length} of the ${execution.totalBeforeFilters} printers most similar to ${sourceName} list more drivers than its ${execution.source.driverCount ?? 0}.`
      )
    )
  } else if (execution.diagnostics && execution.diagnostics.filters.length > 0) {
    blocks.push(
      text(
        `${execution.entries.length} of the ${execution.totalBeforeFilters} printers most similar to ${sourceName} match your requirements:`
      )
    )
  } else {
    blocks.push(
      text(
        `These are the printers most similar to ${sourceName}, by shared recorded features. Each one's own Linux support grade is shown - similarity is not a compatibility promise.`
      )
    )
  }

  if (execution.diagnostics?.insufficient.includes("duplex")) {
    blocks.push(text(duplexNote(execution.diagnostics.catalogSize)))
  }

  if (shown.length > 0) {
    blocks.push({ kind: "printer-cards", printers: shown.map(recommendationCard) })
  }
  if (execution.entries.length > shown.length) {
    blocks.push(text(`Showing ${shown.length} of ${execution.entries.length}.`))
  }
  if (execution.entries.length === 0 && execution.better === null) {
    blocks.push(
      text(
        `None of the ${execution.totalBeforeFilters} most similar printers match those requirements on recorded data.`
      )
    )
  }
  if (shown.length > 0) {
    const top = shown[0]
    const topName = `${top.manufacturer ?? ""} ${top.model ?? top.id}`.trim()
    blocks.push(
      chips([
        { label: `Why was ${topName} recommended?`, query: `why was ${topName} recommended` },
        { label: `Compare ${sourceName} and ${topName}`, query: `compare ${sourceName} and ${topName}` },
      ])
    )
  }
  return { blocks }
}

function buildSearch(execution: Extract<Execution, { kind: "search-results" }>): ResponsePlan {
  const diagnostics = execution.diagnostics
  const blocks: ResponseBlock[] = []

  for (const unappliedNote of buildUnappliedNotes(diagnostics.unapplied)) {
    blocks.push(text(unappliedNote))
  }
  if (diagnostics.insufficient.includes("duplex")) {
    blocks.push(text(duplexNote(diagnostics.catalogSize)))
  }

  if (execution.state === "UNSUPPORTED") {
    blocks.push(chips(EXAMPLE_CHIPS))
    return { blocks }
  }

  const requirements = diagnostics.filters.map(filter => filter.label).join(", ")

  if (execution.state === "NO_MATCHES") {
    const narrowing = [...diagnostics.filters].sort((a, b) => a.matched - b.matched)[0]
    blocks.push(
      text(
        `No printers in the catalogue match ${requirements} on recorded data.` +
          (narrowing ? ` The "${narrowing.label}" requirement narrowed it furthest.` : "")
      )
    )
  } else {
    const shown = execution.matches.slice(0, MAX_RESULT_CARDS)
    blocks.push(
      text(
        `${execution.total} printers match ${requirements}. Showing the first ${shown.length}, ordered by ${diagnostics.orderingLabel}.`
      )
    )
    blocks.push({ kind: "printer-cards", printers: shown.map(summaryCard) })
  }

  for (const note of unknownNotes(diagnostics)) {
    blocks.push(text(note))
  }

  if (diagnostics.relaxations.length > 0) {
    blocks.push(text("Without one of the requirements:"))
    blocks.push(
      chips(
        diagnostics.relaxations.map(relaxation => ({
          label: `Drop "${relaxation.droppedLabel}" (${relaxation.resultCount} printers)`,
          query: relaxation.query,
        }))
      )
    )
  }

  return { blocks }
}

function buildUnappliedNotes(unapplied: string[]): string[] {
  if (unapplied.length === 0) return []
  const list = unapplied.map(word => `"${word}"`).join(", ")
  return [
    `I can't filter by ${list} - the database doesn't record that about printers. ${FILTERABLE_SUMMARY}`,
  ]
}

// Same suggestion rule as EXAMPLE_CHIPS: the query IS the label text.
// Contextual phrasing ("this printer"/"this driver") stays in the submitted
// message and resolves through the page-context provider - current-page
// values are never substituted into the question.
export function contextSuggestions(context: AssistantPageContext): Chip[] {
  if (context.pageType === "printer") {
    return [
      { label: "What printers are similar to this one?", query: "what printers are similar to this one" },
      { label: "How good is the Linux support?", query: "how good is the linux support" },
      { label: "Which driver does this printer use?", query: "which driver does this printer use" },
    ]
  }
  if (context.pageType === "driver") {
    return [
      { label: "Which printers use this driver?", query: "which printers use this driver" },
      { label: "Find a colour laser printer", query: "find a colour laser printer" },
    ]
  }
  return [
    { label: "Find a colour laser printer", query: "find a colour laser printer" },
    { label: "Find printers with good Linux support", query: "find printers with good linux support" },
    { label: "Compare HP 2500C and HP DeskJet 560C", query: "compare HP 2500C and HP DeskJet 560C" },
  ]
}
