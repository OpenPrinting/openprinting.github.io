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

  it("returns an empty array when the printer has no drivers", () => {
    expect(getSupportedDriverFamilies({} as Printer)).toEqual([])
  })
})
