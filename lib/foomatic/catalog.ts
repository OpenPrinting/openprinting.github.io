// Builder for the printersMap.json catalogue projection.
//
// This module is the single source of truth for the shape of a catalogue
// record: split-printers.ts calls it for every printer, and the tests in
// __tests__/catalog.test.ts and __tests__/catalog-artifact.test.ts validate
// both the builder and the generated artifact against it.
//
// Field semantics: the capability fields (maxDpi, psLevel, pclLevel, cs, rd)
// are OMITTED when the source data does not establish them, instead of being
// emitted as null/"unknown"/[]. An absent key always means "not recorded in
// Foomatic", never "the printer lacks this capability". The tri-state fields
// carried over from the original projection (color, type) keep their explicit
// "unknown" values because existing consumers already branch on them.
//
// duplex is deliberately NOT part of this projection: the upstream data
// records it for zero printers, so there is nothing to store or filter on.

import { getRecommendedDriverFamily } from "./driver-family"
import type { Printer, PrinterSummary } from "./types"

export function toPrinterSummary(printer: Printer): PrinterSummary {
  const summary: PrinterSummary = {
    id: printer.id,
    manufacturer: printer.manufacturer,
    model: printer.model,
    type: printer.type || "unknown",
    status: printer.status || "Unknown",
    functionality: printer.functionality || "?",
    driverCount: printer.drivers ? printer.drivers.length : 0,
    color: printer.color ?? "unknown",
  }

  if (typeof printer.maxDpi === "number") {
    summary.maxDpi = printer.maxDpi
  }

  if (typeof printer.psLevel === "number") {
    summary.psLevel = printer.psLevel
  }

  if (typeof printer.pclLevel === "number") {
    summary.pclLevel = printer.pclLevel
  }

  if (printer.commandsetTokens && printer.commandsetTokens.length > 0) {
    summary.cs = [...printer.commandsetTokens]
  }

  const family = getRecommendedDriverFamily(printer)
  if (family) {
    summary.rd = family
  }

  return summary
}
