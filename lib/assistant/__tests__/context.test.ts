import { describe, expect, it } from "vitest"
import { driverHref, printerHref } from "@/lib/foomatic/routes"
import { parsePageContext } from "../context"

describe("parsePageContext", () => {
  it("round-trips the canonical printer URL builder", () => {
    const href = printerHref("HP-LaserJet_4", "HP")
    const context = parsePageContext(href)
    expect(context).toEqual({ pageType: "printer", route: href, printerId: "HP-LaserJet_4" })
  })

  it("round-trips a multi-word manufacturer", () => {
    const href = printerHref("Kyocera_Mita-FS-600", "Kyocera Mita")
    const context = parsePageContext(`${href}/`)
    expect(context.pageType).toBe("printer")
    if (context.pageType === "printer") {
      expect(context.printerId).toBe("Kyocera_Mita-FS-600")
    }
  })

  it("round-trips the canonical driver URL builder", () => {
    const href = driverHref("driver/hplip")
    expect(parsePageContext(href)).toEqual({ pageType: "driver", route: href, driverId: "hplip" })
  })

  it("decodes encoded id segments", () => {
    const context = parsePageContext("/foomatic/printer/HP/HP-2500C%20Plus/")
    expect(context.pageType).toBe("printer")
    if (context.pageType === "printer") {
      expect(context.printerId).toBe("HP-2500C Plus")
    }
  })

  it("classifies directories, home, and other routes", () => {
    expect(parsePageContext("/foomatic/printers/").pageType).toBe("printer-directory")
    expect(parsePageContext("/foomatic/drivers").pageType).toBe("driver-directory")
    expect(parsePageContext("/").pageType).toBe("home")
    expect(parsePageContext("").pageType).toBe("home")
    expect(parsePageContext("/documentation/abc").pageType).toBe("other")
    expect(parsePageContext("/foomatic/printer/HP").pageType).toBe("other")
  })
})
