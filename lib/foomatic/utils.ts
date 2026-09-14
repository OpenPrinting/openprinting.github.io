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

  // A driver the database marks obsolete cannot be used, so it is not driver
  // support. Full printer records carry the driver list and can be counted
  // directly; the summary projection only carries a total and cannot tell the
  // two apart, which is why its precomputed status is preferred below.
  const drivers = (printer as Printer).drivers

  const usableDriverCount = Array.isArray(drivers)
    ? drivers.filter((driver) => !driver.obsolete).length
    : ((printer as PrinterSummary).driverCount ?? 0)

  const noUsableDrivers = (): boolean =>
    usableDriverCount === 0 ||
    (!Array.isArray(drivers) && (printer as PrinterSummary).status === "Unsupported")

  if (!functionality || functionality === "?" || functionality === "unknown") {
    if (noUsableDrivers()) {
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
      if (noUsableDrivers()) {
        return "Unsupported"
      }
      return "Unknown"
  }
}
