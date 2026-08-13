import { describe, expect, it } from "vitest"
import {
  normalizeDriverFamily,
  getRecommendedDriverFamily,
  getSupportedDriverFamilies,
} from "../driver-family"
import type { Printer } from "../types"

describe("normalizeDriverFamily", () => {
  it("collapses known driver name prefixes into families", () => {
    expect(normalizeDriverFamily("Postscript-hp")).toBe("postscript")
    expect(normalizeDriverFamily("hpijs-pcl5")).toBe("hpijs")
    expect(normalizeDriverFamily("gimp-print-ijs")).toBe("gutenprint")
    expect(normalizeDriverFamily("ljet4")).toBe("laserjet")
  })

  it("collapses the Ghostscript PCL variants onto one family", () => {
    // Till Kamppeter's point that a PCL printer accumulates many near-identical
    // Ghostscript entries: they must not read as four independent signals.
    for (const name of ["ljet4", "ljet4d", "lj4dith", "lj5gray"]) {
      expect(normalizeDriverFamily(name)).toBe("laserjet")
    }
  })

  it("strips a driver/ id prefix before matching", () => {
    expect(normalizeDriverFamily("driver/Postscript")).toBe("postscript")
  })

  it("lowercases unrecognized driver names instead of dropping them", () => {
    expect(normalizeDriverFamily("SomeNewDriver")).toBe("somenewdriver")
  })
})

describe("getRecommendedDriverFamily", () => {
  it("normalizes the printer's recommended driver", () => {
    const printer = { recommended_driver: "driver/hpijs-pcl5" } as Printer
    expect(getRecommendedDriverFamily(printer)).toBe("hpijs")
  })

  it("returns null when there is no recommended driver", () => {
    expect(getRecommendedDriverFamily({} as Printer)).toBeNull()
  })

  it("resolves an obsolete recommended driver to its declared replacement", () => {
    // Canon-S200 and HP-DeskJet_400C in the real database: the recommended
    // driver is gimp-print, which upstream marks obsolete in favour of
    // gutenprint.
    const printer = {
      recommended_driver: "driver/gimp-print",
      drivers: [
        { id: "driver/gimp-print", name: "gimp-print", obsolete: true, replacedBy: "gutenprint" },
      ],
    } as Printer

    expect(getRecommendedDriverFamily(printer)).toBe("gutenprint")
  })

  it("never returns the obsolete family itself when a replacement exists", () => {
    const printer = {
      recommended_driver: "driver/hpdj",
      drivers: [{ id: "driver/hpdj", name: "hpdj", obsolete: true, replacedBy: "pcl3" }],
    } as Printer

    expect(getRecommendedDriverFamily(printer)).not.toBe("hpdj")
    expect(getRecommendedDriverFamily(printer)).toBe("pcl3")
  })

  it("contributes no preferred-driver evidence when an obsolete driver names no replacement", () => {
    // Defensive: every obsolete entry in the current database names a
    // replacement, but an unreplaced one must not be cited as current evidence.
    const printer = {
      recommended_driver: "driver/hpdj",
      drivers: [{ id: "driver/hpdj", name: "hpdj", obsolete: true, replacedBy: null }],
    } as Printer

    expect(getRecommendedDriverFamily(printer)).toBeNull()
  })

  it("keeps a current recommended driver untouched", () => {
    const printer = {
      recommended_driver: "driver/gutenprint",
      drivers: [
        { id: "driver/gimp-print", name: "gimp-print", obsolete: true, replacedBy: "gutenprint" },
        { id: "driver/gutenprint", name: "gutenprint", obsolete: false, replacedBy: null },
      ],
    } as Printer

    expect(getRecommendedDriverFamily(printer)).toBe("gutenprint")
  })

  it("falls back to normalizing the id when the driver has no entry in the list", () => {
    // 579 printers reference a recommended driver whose own XML record is
    // absent, so obsolescence cannot be determined; the reference still stands.
    const printer = {
      recommended_driver: "driver/Postscript",
      drivers: [{ id: "driver/other", name: "other", obsolete: false }],
    } as Printer

    expect(getRecommendedDriverFamily(printer)).toBe("postscript")
  })
})

describe("getSupportedDriverFamilies", () => {
  it("de-dupes driver families across the printer's driver list", () => {
    const printer = {
      drivers: [
        { id: "driver/a", name: "Postscript-a" },
        { id: "driver/b", name: "Postscript-b" },
        { id: "driver/c", name: "hpijs" },
      ],
    } as Printer

    expect(getSupportedDriverFamilies(printer).sort()).toEqual(["hpijs", "postscript"])
  })

  it("contributes the family of a current driver", () => {
    const printer = {
      drivers: [{ id: "driver/pcl3", name: "pcl3", obsolete: false }],
    } as Printer

    expect(getSupportedDriverFamilies(printer)).toEqual(["pcl3"])
  })

  it("excludes a family that is only reachable through an obsolete driver", () => {
    // HP-2000C in the real database: hpdj is obsolete (replaced by pcl3), yet
    // it was previously surfaced as "Shared driver family: hpdj".
    const printer = {
      drivers: [
        { id: "driver/hpdj", name: "hpdj", obsolete: true, replacedBy: "pcl3" },
        { id: "driver/hplip", name: "hplip", obsolete: false },
      ],
    } as Printer

    expect(getSupportedDriverFamilies(printer)).toEqual(["hplip"])
  })

  it("keeps a family carried by both an obsolete and a current driver", () => {
    const printer = {
      drivers: [
        { id: "driver/gimp-print", name: "gimp-print", obsolete: true, replacedBy: "gutenprint" },
        { id: "driver/gutenprint", name: "gutenprint", obsolete: false },
      ],
    } as Printer

    expect(getSupportedDriverFamilies(printer)).toEqual(["gutenprint"])
  })

  it("does not substitute the replacement driver into the supported set", () => {
    // foomatic-db records that hpdj is superseded by pcl3, not that pcl3
    // supports this printer, so pcl3 must not be invented here.
    const printer = {
      drivers: [{ id: "driver/hpdj", name: "hpdj", obsolete: true, replacedBy: "pcl3" }],
    } as Printer

    expect(getSupportedDriverFamilies(printer)).toEqual([])
  })

  it("returns an empty array when the printer has no drivers", () => {
    expect(getSupportedDriverFamilies({} as Printer)).toEqual([])
  })
})
