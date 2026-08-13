// Driver-name normalization shared by the vectorization and similarity stages.
// Upstream driver entries name the same underlying driver family in many ways
// (Postscript-hp, gimp-print-ijs, ljet4, ...), so names are collapsed onto a
// canonical family before they are used as similarity features.
//
// Driver families answer "can these two printers be driven the same way?".
// They are deliberately not a count: how many entries a printer accumulates in
// the Foomatic database says nothing about how well it is supported, whereas
// sharing a family with another printer is real compatibility evidence.

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

// `<obsolete replace="..."/>` in foomatic-db is upstream stating that a driver
// should no longer be used. Such an entry is still worth showing on the printer
// and driver pages (where it carries an "Obsolete" badge), but it must not act
// as evidence that two printers are currently compatible — otherwise the
// recommendation UI presents dead support as live support.
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
    // Only the replacement upstream names explicitly is substituted; no
    // replacement is ever inferred. Where foomatic-db marks a driver obsolete
    // without naming a successor there is nothing to fall back to, so the
    // printer contributes no preferred-driver evidence at all rather than an
    // obsolete one. (Every obsolete entry in the current database names a
    // replacement, so that branch is defensive.)
    const replacement = trim(entry.replacedBy ?? undefined)

    return replacement ? normalizeDriverFamily(replacement) : null
  }

  return normalizeDriverFamily(recommended)
}

// Families reachable through at least one non-obsolete driver entry. A family
// carried by both an obsolete and a current driver survives, because the
// current driver alone justifies it. Replacement drivers are deliberately not
// added here: foomatic-db records that a driver is superseded, not that the
// successor supports this particular printer, and claiming otherwise would
// invent support the database does not assert.
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
