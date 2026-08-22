import { describe, expect, it } from "vitest"
import {
  getFunctionalityStatus,
  getPrinterType,
  normalizeCommandsetToken,
  getCommandsetTokens,
  getBooleanCapability,
  getColorCapability,
  getMaxDpi,
  getPSLevel,
  getPCLLevel,
  encodeFunctionality,
} from "../printer-attributes"

describe("getFunctionalityStatus", () => {
  it("maps A to Perfect", () => {
    expect(getFunctionalityStatus("A")).toBe("Perfect")
  })

  it("maps B and C to Mostly", () => {
    expect(getFunctionalityStatus("B")).toBe("Mostly")
    expect(getFunctionalityStatus("C")).toBe("Mostly")
  })

  it("maps missing or '?' functionality to Unknown", () => {
    expect(getFunctionalityStatus(undefined)).toBe("Unknown")
    expect(getFunctionalityStatus("?")).toBe("Unknown")
  })

  it("maps any other code to Unsupported", () => {
    expect(getFunctionalityStatus("D")).toBe("Unsupported")
    expect(getFunctionalityStatus("")).toBe("Unknown")
  })
})

describe("encodeFunctionality", () => {
  it("encodes the four functionality grades to their documented weights", () => {
    expect(encodeFunctionality("A")).toBe(1.0)
    expect(encodeFunctionality("B")).toBe(0.66)
    expect(encodeFunctionality("C")).toBe(0.33)
    expect(encodeFunctionality("D")).toBe(0.0)
  })

  it("is case-insensitive", () => {
    expect(encodeFunctionality("a")).toBe(1.0)
  })

  it("defaults to 0 for missing values", () => {
    expect(encodeFunctionality(undefined)).toBe(0.0)
  })
})

describe("getPrinterType", () => {
  it("detects inkjet from the mechanism.inkjet key", () => {
    expect(getPrinterType({ mechanism: { inkjet: {} } })).toBe("inkjet")
  })

  it("detects laser from the mechanism.laser key", () => {
    expect(getPrinterType({ mechanism: { laser: {} } })).toBe("laser")
  })

  it("detects dot-matrix from the mechanism.dotmatrix key", () => {
    expect(getPrinterType({ mechanism: { dotmatrix: {} } })).toBe("dot-matrix")
  })

  it("falls back to transfer code 'i' for inkjet and 't' for laser", () => {
    expect(getPrinterType({ mechanism: { transfer: "i" } })).toBe("inkjet")
    expect(getPrinterType({ mechanism: { transfer: "t" } })).toBe("laser")
  })

  it("returns unknown when there is no mechanism data", () => {
    expect(getPrinterType({})).toBe("unknown")
    expect(getPrinterType({ mechanism: { transfer: "x" } })).toBe("unknown")
  })
})

describe("normalizeCommandsetToken", () => {
  it("folds PostScript variants to a single canonical token", () => {
    expect(normalizeCommandsetToken("PostScript")).toBe("POSTSCRIPT")
    expect(normalizeCommandsetToken("PS2")).toBe("POSTSCRIPT")
    expect(normalizeCommandsetToken("Adobe PostScript")).toBe("POSTSCRIPT")
  })

  it("folds PCLXL variants to PCLXL", () => {
    expect(normalizeCommandsetToken("PCL-XL")).toBe("PCLXL")
    expect(normalizeCommandsetToken("PCL6")).toBe("PCLXL")
    expect(normalizeCommandsetToken("HP ENHANCED PCL6")).toBe("PCLXL")
  })

  it("folds PCL5 variants to PCL5E", () => {
    expect(normalizeCommandsetToken("PCL5e")).toBe("PCL5E")
    expect(normalizeCommandsetToken("ENHANCED PCL5")).toBe("PCL5E")
  })

  it("discards noise tokens", () => {
    expect(normalizeCommandsetToken("NONE")).toBeNull()
    expect(normalizeCommandsetToken("RASTER")).toBeNull()
    expect(normalizeCommandsetToken("")).toBeNull()
    expect(normalizeCommandsetToken("   ")).toBeNull()
  })

  it("passes through unrecognized tokens uppercased", () => {
    expect(normalizeCommandsetToken("escp2")).toBe("ESCP2")
  })
})

describe("getCommandsetTokens", () => {
  it("returns an empty array when there is no autodetect data", () => {
    expect(getCommandsetTokens({})).toEqual([])
  })

  it("merges, normalizes, de-dupes, and sorts commandsets from multiple sources", () => {
    const printer = {
      autodetect: {
        general: { commandset: "PostScript,PCL6" },
        usb: { commandset: "PS2" },
        parallel: { commandset: "PCL-XL" },
      },
    }

    expect(getCommandsetTokens(printer)).toEqual(["PCLXL", "POSTSCRIPT"])
  })

  it("extracts commandsets embedded in an IEEE1284 device ID", () => {
    const printer = {
      autodetect: {
        general: { ieee1284: "MFG:HP;MDL:LaserJet;CMD:PCL,PJL;" },
      },
    }

    expect(getCommandsetTokens(printer)).toEqual(["PCL", "PJL"])
  })
})

describe("getBooleanCapability", () => {
  it("recognizes common truthy and falsy text values", () => {
    expect(getBooleanCapability("yes")).toBe(true)
    expect(getBooleanCapability("color")).toBe(true)
    expect(getBooleanCapability("no")).toBe(false)
    expect(getBooleanCapability("monochrome")).toBe(false)
  })

  it("passes through native booleans", () => {
    expect(getBooleanCapability(true)).toBe(true)
    expect(getBooleanCapability(false)).toBe(false)
  })

  it("returns 'unknown' for missing or unrecognized values", () => {
    expect(getBooleanCapability(undefined)).toBe("unknown")
    expect(getBooleanCapability("maybe")).toBe("unknown")
  })
})

describe("getColorCapability", () => {
  it("returns true when mechanism has a color key", () => {
    expect(getColorCapability({ mechanism: { color: {} } })).toBe(true)
  })

  it("returns false when mechanism exists but has no color key", () => {
    expect(getColorCapability({ mechanism: { laser: {} } })).toBe(false)
  })

  it("falls back to top-level color fields when there is no mechanism data", () => {
    expect(getColorCapability({ color: "yes" })).toBe(true)
    expect(getColorCapability({ colors: "no" })).toBe(false)
    expect(getColorCapability({})).toBe("unknown")
  })
})

describe("getMaxDpi", () => {
  it("returns the larger of x/y resolution", () => {
    expect(getMaxDpi({ mechanism: { resolution: { dpi: { x: 600, y: 1200 } } } })).toBe(1200)
  })

  it("returns null when there is no resolution data", () => {
    expect(getMaxDpi({})).toBeNull()
  })

  it("returns null when resolution is zero", () => {
    expect(getMaxDpi({ mechanism: { resolution: { dpi: { x: 0, y: 0 } } } })).toBeNull()
  })
})

describe("getPSLevel", () => {
  it("parses numeric and roman-numeral PostScript levels", () => {
    expect(getPSLevel({ lang: { postscript: "3" } })).toBe(3)
    expect(getPSLevel({ lang: { postscript: "II" } })).toBe(2)
    expect(getPSLevel({ lang: { postscript: { level: "1" } } })).toBe(1)
  })

  it("returns 0 for unrecognized non-empty levels", () => {
    expect(getPSLevel({ lang: { postscript: "weird" } })).toBe(0)
  })

  it("returns null when PostScript is not supported at all", () => {
    expect(getPSLevel({})).toBeNull()
    expect(getPSLevel({ lang: { postscript: "?" } })).toBeNull()
  })
})

describe("getPCLLevel", () => {
  it("detects PCL6", () => {
    expect(getPCLLevel({ lang: { pcl: "6" } })).toBe(6)
  })

  it("detects PCL5 variants", () => {
    expect(getPCLLevel({ lang: { pcl: "5e" } })).toBe(5)
  })

  it("returns null when PCL is not supported at all", () => {
    expect(getPCLLevel({})).toBeNull()
  })
})
