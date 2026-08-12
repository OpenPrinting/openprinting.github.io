import { describe, expect, it } from "vitest"
import type { AssistantPageContext } from "../types"
import { parseQuery } from "../parse"
import { CORPUS } from "./corpus"
import { HOME_CONTEXT, INDEXES, LJ4_CONTEXT } from "./fixtures"

const DRIVER_CONTEXT: AssistantPageContext = {
  pageType: "driver",
  route: "/foomatic/driver/hplip",
  driverId: "hplip",
}

function contextFor(ctx?: "home" | "printer" | "driver"): AssistantPageContext {
  if (ctx === "printer") return LJ4_CONTEXT
  if (ctx === "driver") return DRIVER_CONTEXT
  return HOME_CONTEXT
}

describe("natural-language corpus", () => {
  for (const testCase of CORPUS) {
    it(`[${testCase.intent}] "${testCase.q}"${testCase.ctx ? ` (on ${testCase.ctx} page)` : ""}`, () => {
      const query = parseQuery(testCase.q, contextFor(testCase.ctx), INDEXES)
      expect(query.intent).toBe(testCase.intent)
      if (testCase.check) {
        expect(testCase.check(query)).toBeNull()
      }
    })
  }
})

describe("parser determinism", () => {
  it("returns identical output for identical input", () => {
    for (const input of ["find a colour laser printer", "printers similar to hp 2500c", "hp laserjet"]) {
      const a = parseQuery(input, HOME_CONTEXT, INDEXES)
      const b = parseQuery(input, HOME_CONTEXT, INDEXES)
      expect(JSON.stringify(a)).toBe(JSON.stringify(b))
    }
  })

  it("caps hostile input without throwing", () => {
    const noisy = "colour ".repeat(500) + "<script>alert(1)</script>"
    expect(() => parseQuery(noisy, HOME_CONTEXT, INDEXES)).not.toThrow()
  })
})
