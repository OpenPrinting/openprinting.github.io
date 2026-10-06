// Natural-language test corpus for the assistant parser. Shared between the
// unit tests (lib/assistant/__tests__/parse.test.ts, run against the fixture
// catalogue) and the eval harness (tools/assistant-eval/run.ts, run against
// the real generated artifacts).
//
// Each case pins the expected intent; `check` adds deeper assertions and
// returns an error string (or null). Checks marked fixtureOnly depend on the
// fixture catalogue's exact contents and are skipped by the harness.

import type { AssistantQuery } from "../types"

export interface CorpusCase {
  q: string
  // Page context: "home" (default), "printer" (an HP LaserJet 4 page), or
  // "driver" (the hplip driver page).
  ctx?: "home" | "printer" | "driver"
  intent: AssistantQuery["intent"]
  check?: (query: AssistantQuery) => string | null
  fixtureOnly?: boolean
}

function err(condition: boolean, message: string): string | null {
  return condition ? null : message
}

const resolvedPrinter = (id: string) => (query: AssistantQuery): string | null => {
  if (!("printer" in query)) return "no printer ref"
  const ref = query.printer
  return err(ref.kind === "resolved" && ref.id === id, `expected resolved ${id}, got ${JSON.stringify(ref)}`)
}

const contextPrinter = (query: AssistantQuery): string | null => {
  if (!("printer" in query)) return "no printer ref"
  return err(query.printer.kind === "context", `expected context ref, got ${query.printer.kind}`)
}

const hasFilter = (key: string, value?: unknown) => (query: AssistantQuery): string | null => {
  if (!("filters" in query) || !query.filters) return "no filters"
  const filters = query.filters as Record<string, unknown>
  if (!(key in filters)) return `missing filter ${key} in ${JSON.stringify(filters)}`
  if (value !== undefined && JSON.stringify(filters[key]) !== JSON.stringify(value)) {
    return `filter ${key}=${JSON.stringify(filters[key])}, expected ${JSON.stringify(value)}`
  }
  return null
}

const all = (...checks: ((query: AssistantQuery) => string | null)[]) => (query: AssistantQuery) => {
  for (const check of checks) {
    const failure = check(query)
    if (failure) return failure
  }
  return null
}

const better = (value: string | undefined) => (query: AssistantQuery): string | null => {
  if (query.intent !== "SIMILAR_PRINTERS") return "not SIMILAR_PRINTERS"
  return err(query.better === value, `better=${String(query.better)}, expected ${String(value)}`)
}

const unappliedIncludes = (word: string) => (query: AssistantQuery): string | null => {
  if (!("unapplied" in query)) return "no unapplied list"
  return err(query.unapplied.includes(word), `unapplied=${JSON.stringify(query.unapplied)} missing ${word}`)
}

export const CORPUS: CorpusCase[] = [
  // --- exact printer lookup -------------------------------------------------
  { q: "HP 2500C", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "hp 2500c", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "HP-2500C", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "tell me about HP 2500C", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "tell me about the HP LaserJet 4", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-LaserJet_4") },
  { q: "HP DeskJet 560C", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-DeskJet_560C") },
  { q: "deskjet 560c", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-DeskJet_560C"), fixtureOnly: true },
  { q: "info on hp laserjet 4p", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-LaserJet_4P") },
  { q: "hp 2500cm", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500CM") },
  { q: "what is the hp 2500c", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },

  // --- fuzzy / punctuation / casing / alias lookup --------------------------
  { q: "Brother HL-1050", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Brother-HL-1050") },
  { q: "brother hl 1050", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Brother-HL-1050") },
  { q: "BROTHER HL1050", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Brother-HL-1050") },
  { q: "hl-1050", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Brother-HL-1050"), fixtureOnly: true },
  { q: "Hewlett Packard 2500C", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "hewlett-packard 2500c", intent: "PRINTER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "epson stylus color", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Epson-Stylus_Color") },
  { q: "apple laserwriter", intent: "PRINTER_LOOKUP", check: resolvedPrinter("Apple-LaserWriter"), fixtureOnly: true },

  // --- ambiguous printer names ----------------------------------------------
  {
    q: "HP LaserJet",
    intent: "PRINTER_LOOKUP",
    // fixtureOnly: the real database has a printer literally named
    // "HP LaserJet", so this resolves exactly there.
    check: query => {
      if (query.intent !== "PRINTER_LOOKUP") return "wrong intent"
      return err(query.printer.kind === "ambiguous", `expected ambiguous, got ${query.printer.kind}`)
    },
    fixtureOnly: true,
  },
  {
    q: "tell me about the laserjet",
    intent: "PRINTER_LOOKUP",
    // fixtureOnly: the real database contains a printer literally named
    // "HP LaserJet", which is then a legitimate exact match.
    check: query => {
      if (query.intent !== "PRINTER_LOOKUP") return "wrong intent"
      return err(query.printer.kind !== "resolved", "a family name must not silently resolve")
    },
    fixtureOnly: true,
  },

  // --- no-match entities ------------------------------------------------------
  {
    q: "Brother HL-2270DW",
    intent: "PRINTER_LOOKUP",
    check: query => {
      if (query.intent !== "PRINTER_LOOKUP") return "wrong intent"
      return err(query.printer.kind === "unresolved", `expected unresolved, got ${query.printer.kind}`)
    },
  },
  {
    q: "hp color laserjet 9999",
    intent: "PRINTER_LOOKUP",
    check: query => {
      if (query.intent !== "PRINTER_LOOKUP") return "wrong intent"
      return err(query.printer.kind !== "resolved", "an unknown model must not resolve")
    },
    fixtureOnly: true,
  },

  // --- capability search: colour/type ---------------------------------------
  { q: "find a colour laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser")) },
  { q: "find a color laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser")) },
  { q: "colour laser", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser")) },
  { q: "laser printer in colour", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser")) },
  { q: "printer that prints in colour", intent: "CAPABILITY_SEARCH", check: hasFilter("color", true) },
  { q: "colored printers", intent: "CAPABILITY_SEARCH", check: hasFilter("color", true) },
  { q: "black and white laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", false), hasFilter("type", "laser")) },
  { q: "monochrome laser", intent: "CAPABILITY_SEARCH", check: hasFilter("color", false) },
  { q: "mono printers", intent: "CAPABILITY_SEARCH", check: hasFilter("color", false) },
  { q: "show me inkjet printers", intent: "CAPABILITY_SEARCH", check: hasFilter("type", "inkjet") },
  { q: "ink jet printer", intent: "CAPABILITY_SEARCH", check: hasFilter("type", "inkjet") },
  { q: "dot matrix printers", intent: "CAPABILITY_SEARCH", check: hasFilter("type", "dot-matrix") },
  { q: "impact printer", intent: "CAPABILITY_SEARCH", check: hasFilter("type", "dot-matrix") },

  // --- capability search: manufacturer --------------------------------------
  { q: "show me Canon printers", intent: "CAPABILITY_SEARCH", check: hasFilter("manufacturer", "Canon") },
  { q: "show me HP printers", intent: "CAPABILITY_SEARCH", check: hasFilter("manufacturer", "HP") },
  { q: "epson printers", intent: "CAPABILITY_SEARCH", check: hasFilter("manufacturer", "Epson") },
  { q: "list brother printers", intent: "CAPABILITY_SEARCH", check: hasFilter("manufacturer", "Brother") },
  { q: "canon inkjet printers", intent: "CAPABILITY_SEARCH", check: all(hasFilter("manufacturer", "Canon"), hasFilter("type", "inkjet")) },

  // --- capability search: PDLs -----------------------------------------------
  { q: "printers supporting PCL", intent: "CAPABILITY_SEARCH", check: hasFilter("pcl") },
  { q: "which printers support postscript", intent: "CAPABILITY_SEARCH", check: hasFilter("postscript") },
  { q: "postscript printers", intent: "CAPABILITY_SEARCH", check: hasFilter("postscript") },
  { q: "postscript 3 printers", intent: "CAPABILITY_SEARCH", check: hasFilter("postscript", { minLevel: 3 }) },
  { q: "postscript level 2 printer", intent: "CAPABILITY_SEARCH", check: hasFilter("postscript", { minLevel: 2 }) },
  { q: "pcl 6 printers", intent: "CAPABILITY_SEARCH", check: hasFilter("pcl", { minLevel: 6 }) },
  { q: "pclxl printer", intent: "CAPABILITY_SEARCH", check: hasFilter("pcl", { minLevel: 6 }) },
  { q: "pcl5e laser", intent: "CAPABILITY_SEARCH", check: all(hasFilter("pcl", { minLevel: 5 }), hasFilter("type", "laser")) },
  { q: "colour laser with PostScript", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser"), hasFilter("postscript")) },

  // --- capability search: resolution ----------------------------------------
  { q: "600 dpi laser printers", intent: "CAPABILITY_SEARCH", check: all(hasFilter("minDpi", 600), hasFilter("type", "laser")) },
  { q: "printers with at least 1200 dpi", intent: "CAPABILITY_SEARCH", check: hasFilter("minDpi", 1200) },
  { q: "high resolution printer", intent: "CAPABILITY_SEARCH", check: hasFilter("minDpi", 1200) },
  { q: "high res inkjet", intent: "CAPABILITY_SEARCH", check: all(hasFilter("minDpi", 1200), hasFilter("type", "inkjet")) },

  // --- capability search: Linux support --------------------------------------
  { q: "find printers with good linux support", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "good") },
  { q: "printer with good Linux support", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "good") },
  { q: "printers that work well on linux", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "good") },
  { q: "well supported printers", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "good") },
  { q: "printers with perfect linux support", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "perfect") },
  { q: "fully supported printers", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "perfect") },
  { q: "show me printers with excellent support", intent: "CAPABILITY_SEARCH", check: hasFilter("support", "perfect") },

  // --- multi-constraint search ------------------------------------------------
  {
    q: "find a colour laser printer with good linux support",
    intent: "CAPABILITY_SEARCH",
    check: all(hasFilter("color", true), hasFilter("type", "laser"), hasFilter("support", "good")),
  },
  {
    q: "colour laser printer with duplex and PCL",
    intent: "CAPABILITY_SEARCH",
    check: all(hasFilter("color", true), hasFilter("type", "laser"), hasFilter("duplex", true), hasFilter("pcl")),
  },
  {
    q: "monochrome laser with pcl 5 and 600 dpi",
    intent: "CAPABILITY_SEARCH",
    check: all(hasFilter("color", false), hasFilter("pcl", { minLevel: 5 }), hasFilter("minDpi", 600)),
  },
  {
    q: "canon colour inkjet with good linux support",
    intent: "CAPABILITY_SEARCH",
    check: all(hasFilter("manufacturer", "Canon"), hasFilter("color", true), hasFilter("support", "good")),
  },
  {
    q: "i need a colour printer with postscript 3 and at least 600 dpi",
    intent: "CAPABILITY_SEARCH",
    check: all(hasFilter("color", true), hasFilter("postscript", { minLevel: 3 }), hasFilter("minDpi", 600)),
  },

  // --- duplex (insufficient data downstream) ---------------------------------
  // Even with a specific printer in scope, a duplex question gets the duplex
  // data-gap answer - never a redirect to the printer's support grade.
  { q: "does this printer support duplex", ctx: "printer", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "does the hp laserjet 4 support duplex", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "duplex printer", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "find a duplex printer", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "printer with two sided printing", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "double sided printing", intent: "CAPABILITY_SEARCH", check: hasFilter("duplex", true) },
  { q: "double-sided laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("duplex", true), hasFilter("type", "laser")) },
  { q: "i want a colour laser printer with duplex", intent: "CAPABILITY_SEARCH", check: all(hasFilter("duplex", true), hasFilter("color", true)) },

  // --- unsupported constraints -------------------------------------------------
  { q: "purple laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("type", "laser"), unappliedIncludes("purple")) },
  { q: "purple printer", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("purple") },
  { q: "cheap colour laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), unappliedIncludes("cheap")) },
  { q: "wireless printer", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("wireless") },
  { q: "fast laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("type", "laser"), unappliedIncludes("fast")) },

  // --- similar printers --------------------------------------------------------
  { q: "printers similar to HP 2500C", intent: "SIMILAR_PRINTERS", check: all(resolvedPrinter("HP-2500C"), better(undefined)) },
  { q: "what printers are similar to hp laserjet 4", intent: "SIMILAR_PRINTERS", check: resolvedPrinter("HP-LaserJet_4") },
  { q: "similar printers to brother hl-1050", intent: "SIMILAR_PRINTERS", check: resolvedPrinter("Brother-HL-1050") },
  { q: "alternatives to hp 2500c", intent: "SIMILAR_PRINTERS", check: resolvedPrinter("HP-2500C") },
  { q: "what printers are similar to this?", ctx: "printer", intent: "SIMILAR_PRINTERS", check: contextPrinter },
  { q: "what printers are similar to this one", ctx: "printer", intent: "SIMILAR_PRINTERS", check: contextPrinter },
  { q: "similar printers", ctx: "printer", intent: "SIMILAR_PRINTERS", check: contextPrinter },
  { q: "show me something like this", ctx: "printer", intent: "SIMILAR_PRINTERS", check: contextPrinter },
  { q: "replacement for hp laserjet 4", intent: "SIMILAR_PRINTERS", check: resolvedPrinter("HP-LaserJet_4") },
  { q: "similar printers", ctx: "home", intent: "SIMILAR_PRINTERS", check: contextPrinter },
  {
    q: "show me printers similar to this one with colour support",
    ctx: "printer",
    intent: "SIMILAR_PRINTERS",
    check: all(contextPrinter, hasFilter("color", true)),
  },

  // --- best / recommend --------------------------------------------------------
  { q: "what is the best printer?", intent: "CAPABILITY_SEARCH", check: query => err(query.intent === "CAPABILITY_SEARCH" && query.recommend && Object.keys(query.filters).length === 0, "expected criteria-free recommend") },
  { q: "recommend a printer", intent: "CAPABILITY_SEARCH", check: query => err(query.intent === "CAPABILITY_SEARCH" && query.recommend, "expected recommend flag") },
  { q: "which printer should i buy", intent: "CAPABILITY_SEARCH", check: query => err(query.intent === "CAPABILITY_SEARCH" && query.recommend, "expected recommend flag") },
  { q: "find me a good printer", intent: "CAPABILITY_SEARCH", check: query => err(query.intent === "CAPABILITY_SEARCH" && query.recommend && Object.keys(query.filters).length === 0, "expected criteria clarification path") },
  { q: "recommend a colour laser with good linux support", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser"), hasFilter("support", "good")) },
  { q: "what printer would you recommend if i need colour and duplex", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("duplex", true)) },
  { q: "best colour laser printer", intent: "CAPABILITY_SEARCH", check: all(hasFilter("color", true), hasFilter("type", "laser")) },

  // --- better alternatives -------------------------------------------------------
  { q: "what are better alternatives?", ctx: "printer", intent: "SIMILAR_PRINTERS", check: all(contextPrinter, better("unspecified")) },
  { q: "better alternatives to hp laserjet 4", intent: "SIMILAR_PRINTERS", check: all(resolvedPrinter("HP-LaserJet_4"), better("unspecified")) },
  { q: "what are the best alternatives to this printer", ctx: "printer", intent: "SIMILAR_PRINTERS", check: all(contextPrinter, better("unspecified")) },
  { q: "alternatives to hp laserjet 4 with better linux support", intent: "SIMILAR_PRINTERS", check: all(resolvedPrinter("HP-LaserJet_4"), better("support")) },
  { q: "find a printer with better linux support", ctx: "printer", intent: "SIMILAR_PRINTERS", check: all(contextPrinter, better("support")) },
  { q: "alternatives to hp laserjet 4 with higher resolution", intent: "SIMILAR_PRINTERS", check: all(resolvedPrinter("HP-LaserJet_4"), better("resolution")) },
  { q: "alternatives to hp laserjet 4 with more driver options", intent: "SIMILAR_PRINTERS", check: all(resolvedPrinter("HP-LaserJet_4"), better("drivers")) },
  { q: "better alternatives with more drivers", ctx: "printer", intent: "SIMILAR_PRINTERS", check: all(contextPrinter, better("drivers")) },

  // --- explanation -----------------------------------------------------------------
  { q: "why was this recommended?", ctx: "printer", intent: "EXPLANATION", check: query => err(query.intent === "EXPLANATION" && query.candidate === null, "expected null candidate") },
  { q: "why was hp laserjet 4p recommended", ctx: "printer", intent: "EXPLANATION", check: query => {
      if (query.intent !== "EXPLANATION") return "wrong intent"
      return err(query.candidate?.kind === "resolved" && query.candidate.id === "HP-LaserJet_4P", "expected resolved candidate")
    } },
  { q: "why is hp laserjet 5 recommended here", ctx: "printer", intent: "EXPLANATION" },
  { q: "why do you suggest the okidata ol400", ctx: "printer", intent: "EXPLANATION" },
  { q: "why was this printer suggested", ctx: "printer", intent: "EXPLANATION" },

  // --- support queries ----------------------------------------------------------
  { q: "what linux support does hp 2500c have", intent: "SUPPORT_QUERY", check: resolvedPrinter("HP-2500C") },
  { q: "how good is the linux support", ctx: "printer", intent: "SUPPORT_QUERY", check: contextPrinter },
  { q: "how good is the linux support for this printer", ctx: "printer", intent: "SUPPORT_QUERY", check: contextPrinter },
  { q: "does hp laserjet 4 work on linux", intent: "SUPPORT_QUERY", check: resolvedPrinter("HP-LaserJet_4") },
  { q: "is the brother hl-1050 supported", intent: "SUPPORT_QUERY", check: resolvedPrinter("Brother-HL-1050") },
  { q: "is this printer supported on linux", ctx: "printer", intent: "SUPPORT_QUERY", check: contextPrinter },
  { q: "linux support for epson stylus color", intent: "SUPPORT_QUERY", check: resolvedPrinter("Epson-Stylus_Color") },

  // --- driver lookup ---------------------------------------------------------------
  { q: "which driver does HP 2500C use?", intent: "DRIVER_LOOKUP", check: resolvedPrinter("HP-2500C") },
  { q: "what driver does the hp laserjet 4 use", intent: "DRIVER_LOOKUP", check: resolvedPrinter("HP-LaserJet_4") },
  { q: "which driver does this printer use", ctx: "printer", intent: "DRIVER_LOOKUP", check: contextPrinter },
  { q: "recommended driver for this printer", ctx: "printer", intent: "DRIVER_LOOKUP", check: contextPrinter },
  { q: "driver for brother hl-1050", intent: "DRIVER_LOOKUP", check: resolvedPrinter("Brother-HL-1050") },
  { q: "drivers for hp deskjet 560c", intent: "DRIVER_LOOKUP", check: resolvedPrinter("HP-DeskJet_560C") },
  { q: "what driver should i use", ctx: "printer", intent: "DRIVER_LOOKUP", check: contextPrinter },

  // --- driver search -----------------------------------------------------------------
  { q: "which printers use hplip", intent: "DRIVER_SEARCH", check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "resolved" && query.driver.id === "hplip", `expected hplip, got ${JSON.stringify(query.driver)}`)
    } },
  { q: "which printers use hpijs?", intent: "DRIVER_SEARCH" },
  { q: "what printers work with gutenprint", intent: "DRIVER_SEARCH" },
  { q: "printers using ljet4", intent: "DRIVER_SEARCH" },
  { q: "which printers use the same driver?", ctx: "printer", intent: "DRIVER_SEARCH", check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      if (query.driver.kind !== "same-as") return `expected same-as, got ${query.driver.kind}`
      return err(query.driver.printer.kind === "context", "expected context anchor")
    } },
  { q: "which printers use the same driver as hp laserjet 4", intent: "DRIVER_SEARCH", check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "same-as", `expected same-as, got ${query.driver.kind}`)
    } },
  { q: "which printers use the laserjet driver", intent: "DRIVER_SEARCH", check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "family", `family must clarify, got ${query.driver.kind}`)
    }, fixtureOnly: true },
  { q: "which printers use hpcups", intent: "DRIVER_SEARCH", check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind !== "resolved" || query.driver.id !== "hpcups", "hpcups must not silently resolve")
    }, fixtureOnly: true },

  // --- comparison -----------------------------------------------------------------------
  { q: "compare HP 2500C and HP DeskJet 560C", intent: "COMPARISON" },
  { q: "compare hp 2500c and deskjet 560c", intent: "COMPARISON" },
  { q: "hp laserjet 4 vs hp laserjet 4p", intent: "COMPARISON" },
  { q: "hp 2500c versus hp 2500cm", intent: "COMPARISON" },
  { q: "compare this and hp laserjet 4p", ctx: "printer", intent: "COMPARISON" },
  { q: "compare hp laserjet 4 with hp laserjet 5", intent: "COMPARISON" },
  { q: "what is the difference between hp 2500c and hp 2500cm", intent: "COMPARISON", check: query => err(query.intent === "COMPARISON", "expected comparison") },

  // --- general info -----------------------------------------------------------------------
  // Meaning-questions must answer generally even on a printer page: the page
  // context must never capture them and answer with the printer's own values.
  { q: "what do the grades mean", ctx: "printer", intent: "GENERAL_INFO" },
  { q: "what do the support grades mean", ctx: "printer", intent: "GENERAL_INFO" },
  { q: "what does perfect support mean", ctx: "printer", intent: "GENERAL_INFO" },
  { q: "what does this printer's support grade mean", ctx: "printer", intent: "GENERAL_INFO" },
  { q: "what are the grades", intent: "GENERAL_INFO" },
  { q: "what does perfect mean", intent: "GENERAL_INFO" },
  { q: "what do the support grades mean", intent: "GENERAL_INFO" },
  { q: "what does mostly mean", intent: "GENERAL_INFO" },
  { q: "what does the similarity score mean", intent: "GENERAL_INFO" },
  { q: "what does 81 similarity mean", intent: "GENERAL_INFO" },
  { q: "what does high confidence mean", intent: "GENERAL_INFO" },
  { q: "what can you do", intent: "GENERAL_INFO" },
  { q: "help", intent: "GENERAL_INFO" },

  // --- contextual bare queries ---------------------------------------------------------------
  // These DO carry a contextual reference, so page context is the right
  // resolution - unlike the general grade questions above.
  { q: "what is the support status of this printer", ctx: "printer", intent: "SUPPORT_QUERY", check: contextPrinter },
  { q: "what are the grades for this printer", ctx: "printer", intent: "PRINTER_LOOKUP", check: contextPrinter },
  {
    q: "which printers use this driver",
    ctx: "driver",
    intent: "DRIVER_SEARCH",
    check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "context", `expected context driver ref, got ${query.driver.kind}`)
    },
  },
  { q: "what about this printer?", ctx: "printer", intent: "PRINTER_LOOKUP", check: contextPrinter },
  { q: "tell me about this one", ctx: "printer", intent: "PRINTER_LOOKUP", check: contextPrinter },
  { q: "is this printer colour", ctx: "printer", intent: "PRINTER_LOOKUP", check: contextPrinter },

  // --- definition questions stay general (and are never answered with a
  // printer list or captured by page context) --------------------------------
  { q: "what is postscript", ctx: "printer", intent: "UNSUPPORTED" },
  { q: "what is pcl", ctx: "printer", intent: "UNSUPPORTED" },
  { q: "what is a printer driver", ctx: "printer", intent: "UNSUPPORTED" },
  { q: "what is linux support", ctx: "printer", intent: "GENERAL_INFO" },
  { q: "what does linux support mean", ctx: "printer", intent: "GENERAL_INFO" },
  // ...while explicit references still resolve through context:
  { q: "what drivers does this printer use", ctx: "printer", intent: "DRIVER_LOOKUP", check: contextPrinter },
  { q: "what does this printer support", ctx: "printer", intent: "SUPPORT_QUERY", check: contextPrinter },
  {
    q: "what does this driver do",
    ctx: "driver",
    intent: "DRIVER_SEARCH",
    check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "context", `expected context driver ref, got ${query.driver.kind}`)
    },
  },
  {
    q: "what about this?",
    ctx: "driver",
    intent: "DRIVER_SEARCH",
    check: query => {
      if (query.intent !== "DRIVER_SEARCH") return "wrong intent"
      return err(query.driver.kind === "context", `expected context driver ref, got ${query.driver.kind}`)
    },
  },

  // --- adversarial wording ----------------------------------------------------
  { q: "printer that definitely works", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("definitely") },
  { q: "printer guaranteed to work", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("guaranteed") },
  { q: "printer with 100 percent compatibility", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("compatibility") },
  { q: "which printer has the highest quality", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("quality") },
  { q: "which printer is perfect", intent: "CAPABILITY_SEARCH", check: unappliedIncludes("perfect") },
  { q: "4019", intent: "UNSUPPORTED" },
  { q: "123456789", intent: "UNSUPPORTED" },
  { q: "hello", intent: "UNSUPPORTED" },
  { q: "thanks", intent: "UNSUPPORTED" },
  { q: "tell me a joke", intent: "UNSUPPORTED" },
  { q: "write python code", intent: "UNSUPPORTED" },
  { q: "what is the stock price", intent: "UNSUPPORTED" },

  // --- unsupported / out-of-domain -------------------------------------------------------------
  { q: "what's the weather?", intent: "UNSUPPORTED" },
  { q: "who won the football game", intent: "UNSUPPORTED" },
  { q: "write me a poem", intent: "UNSUPPORTED" },
  { q: "how do i install ubuntu", intent: "UNSUPPORTED" },
  { q: "asdfghjkl", intent: "UNSUPPORTED" },
  { q: "printer", intent: "UNSUPPORTED", check: query => err(query.intent === "UNSUPPORTED" && query.reason === "unclear", "expected unclear") },
  { q: "", intent: "UNSUPPORTED", check: query => err(query.intent === "UNSUPPORTED" && query.reason === "empty", "expected empty") },
  { q: "   ", intent: "UNSUPPORTED" },
  { q: "?!", intent: "UNSUPPORTED" },
]
