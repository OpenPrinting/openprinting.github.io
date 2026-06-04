import type { PrinterSummary, Printer, PrinterStatus } from "./types"

export function calculateAccurateStatus(
  printer: PrinterSummary | Printer
): PrinterStatus {
  const rawFunctionality =
  typeof (printer as PrinterSummary).functionality === "string"
    ? (printer as PrinterSummary).functionality
    : typeof (printer as Printer).status === "string"
    ? (printer as Printer).status
    : undefined

  const functionality = typeof rawFunctionality === "string" ? rawFunctionality : undefined

  const driverCount =
  "driverCount" in printer
    ? (printer as PrinterSummary).driverCount
    : "drivers" in printer
    ? Array.isArray((printer as Printer).drivers)
      ? (printer as Printer).drivers!.length
      : 0
    : 0


  if (!functionality || functionality === "?" || functionality === "unknown") {
    if (driverCount === 0) {
      return "Unsupported"
    }
    return "Unknown"
  }

  const func =
    typeof functionality === "string"
      ? functionality.toUpperCase()
      : functionality

  switch (func) {
    case "A":
    case "PERFECT":
      return "Perfect"

    case "B":
    case "GOOD":
    case "C":
    case "PARTIAL":
      return "Mostly"

    case "UNSUPPORTED":
      return "Unsupported"

    default:
      if (driverCount === 0) {
        return "Unsupported"
      }
      return "Unknown"
  }
}
