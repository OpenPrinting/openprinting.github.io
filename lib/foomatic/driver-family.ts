// Driver-name normalization shared by the vectorization and similarity stages.
// Upstream driver entries name the same underlying driver family in many ways
// (Postscript-hp, gimp-print-ijs, ljet4, ...), so names are collapsed onto a
// canonical family before they are used as similarity features.
//
// A shared family is compatibility evidence; the number of entries a printer
// accumulates is not, and is never used as a signal.

import type { Driver, Printer } from "./types"

// Add new entries here to fold another upstream driver naming variant onto an
// existing family. Order matters: the first matching pattern wins.
const DRIVER_PREFIX_NORMALIZERS: Array<[RegExp, string]> = [
  [/^Postscript/i, "postscript"],
  [/^PDF/i, "pdf"],
  [/^pxlmono/i, "pxlmono"],
  [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"],
  [/^foo2hp/i, "foo2hp"],
  [/^foo2qpdl/i, "foo2qpdl"],
  [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"],
  [/^gimp-print/i, "gutenprint"],
  [/^hplip/i, "hplip"],
  [/^ljet/i, "laserjet"],
  [/^lj/i, "laserjet"],
]

export function trim(value: string | undefined): string {
  return (value ?? "").trim()
}

export function normalizeDriverFamily(driverName: string): string {
  const normalized = trim(driverName).replace(/^driver\//i, "")

  for (const [pattern, family] of DRIVER_PREFIX_NORMALIZERS) {
    if (pattern.test(normalized)) {
      return family
    }
  }

  return normalized.toLowerCase()
}

// foomatic-db marks superseded drivers `<obsolete replace="..."/>`. Such entries
// are still listed on the printer and driver pages, but must not count as
// evidence that two printers are currently compatible.
function isObsolete(driver: Driver): boolean {
  return driver.obsolete === true
}

export function getRecommendedDriverFamily(printer: Printer): string | null {
  const recommended = trim(printer.recommended_driver)

  if (!recommended) {
    return null
  }

  const entry = (printer.drivers ?? []).find((driver) => driver.id === recommended)

  if (entry && isObsolete(entry)) {
    // Only the replacement named in `replacedBy` is substituted; none is ever
    // inferred. Without a named successor there is nothing to fall back to, so
    // the printer contributes no preferred-driver evidence rather than an
    // obsolete one.
    const replacement = trim(entry.replacedBy ?? undefined)

    return replacement ? normalizeDriverFamily(replacement) : null
  }

  return normalizeDriverFamily(recommended)
}

// Families reachable through at least one current driver entry; a family
// carried by both an obsolete and a current driver survives. Replacements are
// not added here: foomatic-db records that a driver is superseded, not that the
// successor supports this particular printer.
export function getSupportedDriverFamilies(printer: Printer): string[] {
  const families = new Set<string>()

  for (const driver of printer.drivers ?? []) {
    if (isObsolete(driver)) {
      continue
    }

    const family = normalizeDriverFamily(driver.name)

    if (family) {
      families.add(family)
    }
  }

  return [...families]
}
