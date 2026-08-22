// Driver-name normalization shared by the vectorization and similarity stages.
// Upstream driver entries name the same underlying driver family in many ways
// (Postscript-hp, gimp-print-ijs, ljet4, ...), so names are collapsed onto a
// canonical family before they are used as similarity features.

import type { Printer } from "./types"

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

export function getRecommendedDriverFamily(printer: Printer): string | null {
  const driver = trim(printer.recommended_driver)

  if (!driver) {
    return null
  }

  return normalizeDriverFamily(driver)
}

export function getSupportedDriverFamilies(printer: Printer): string[] {
  const families = new Set<string>()

  for (const driver of printer.drivers ?? []) {
    const family = normalizeDriverFamily(driver.name)

    if (family) {
      families.add(family)
    }
  }

  return [...families]
}
