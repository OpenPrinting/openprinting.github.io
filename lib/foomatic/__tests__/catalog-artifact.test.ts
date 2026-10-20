import fs from "node:fs"
import path from "node:path"
import { beforeAll, describe, expect, it } from "vitest"
import { toPrinterSummary } from "../catalog"
import type { Printer, PrinterSummary } from "../types"

// Validates the generated printersMap.json artifact against its source of
// truth (printers.json) via the same builder the pipeline uses.
//
// These artifacts are gitignored build outputs, so this suite skips when they
// are absent (e.g. CI runs `yarn test` before `yarn generate`, and a fresh
// checkout has no generated data). Locally, run the pipeline first:
//   yarn tsx scripts/foomatic/split-printers.ts
// Skipping is not a pass for the artifact itself — the unit tests in
// catalog.test.ts always run and pin the builder's behavior.

const DB_DIR = path.join(process.cwd(), "public", "foomatic-db")
const PRINTERS_PATH = path.join(DB_DIR, "printers.json")
const MAP_PATH = path.join(DB_DIR, "printersMap.json")

const artifactsPresent = fs.existsSync(PRINTERS_PATH) && fs.existsSync(MAP_PATH)

const KNOWN_TYPES = new Set(["laser", "inkjet", "dot-matrix", "unknown"])
const KNOWN_STATUSES = new Set(["Perfect", "Mostly", "Unsupported", "Unknown"])

describe.skipIf(!artifactsPresent)("generated printersMap.json artifact", () => {
  let source: Printer[]
  let rawMap: string
  let records: PrinterSummary[]

  beforeAll(() => {
    source = (JSON.parse(fs.readFileSync(PRINTERS_PATH, "utf8")) as { printers: Printer[] }).printers
    rawMap = fs.readFileSync(MAP_PATH, "utf8")
    records = (JSON.parse(rawMap) as { printers: PrinterSummary[] }).printers
  })

  it("is minified", () => {
    expect(rawMap.startsWith('{"printers":[{')).toBe(true)
  })

  it("has exactly one record per source printer, with unique ids", () => {
    expect(records.length).toBe(source.length)
    const ids = new Set(records.map(record => record.id))
    expect(ids.size).toBe(records.length)
    for (const record of records) {
      expect(record.id.length).toBeGreaterThan(0)
    }
  })

  it("matches the builder output for every source record, byte for byte", () => {
    const mismatches: string[] = []
    for (let i = 0; i < source.length; i++) {
      const expected = JSON.stringify(toPrinterSummary(source[i]))
      const actual = JSON.stringify(records[i])
      if (expected !== actual) {
        mismatches.push(source[i].id)
      }
    }
    expect(mismatches).toEqual([])
  })

  it("preserves tri-state and enum domains", () => {
    for (const record of records) {
      expect([true, false, "unknown"]).toContain(record.color)
      expect(KNOWN_TYPES.has(record.type ?? ""), `type ${record.type} (${record.id})`).toBe(true)
      expect(KNOWN_STATUSES.has(record.status ?? ""), `status ${record.status} (${record.id})`).toBe(true)
    }
  })

  it("emits capability fields only with established values, and never duplex", () => {
    for (const record of records) {
      expect("duplex" in record).toBe(false)
      if ("maxDpi" in record) {
        // getMaxDpi() returns null for non-positive resolutions, so a stored
        // maxDpi is always a positive number.
        expect(Number.isFinite(record.maxDpi), `maxDpi ${record.maxDpi} (${record.id})`).toBe(true)
        expect(record.maxDpi!).toBeGreaterThan(0)
      }
      for (const field of ["psLevel", "pclLevel"] as const) {
        // 0 is a real domain value here: the printer declares the language
        // node but its level string did not resolve (getPSLevel/getPCLLevel).
        if (field in record) {
          const value = record[field] as number
          expect(Number.isFinite(value), `${field} ${value} (${record.id})`).toBe(true)
          expect(value).toBeGreaterThanOrEqual(0)
        }
      }
      if ("cs" in record) {
        expect(Array.isArray(record.cs)).toBe(true)
        expect(record.cs!.length).toBeGreaterThan(0)
        for (const token of record.cs!) {
          expect(typeof token).toBe("string")
          expect(token.length).toBeGreaterThan(0)
        }
      }
      if ("rd" in record) {
        expect(typeof record.rd).toBe("string")
        expect(record.rd!.length).toBeGreaterThan(0)
        expect(record.rd!.startsWith("driver/")).toBe(false)
      }
    }
  })

  it("has real coverage for every capability field", () => {
    const coverage = {
      maxDpi: records.filter(record => "maxDpi" in record).length,
      psLevel: records.filter(record => "psLevel" in record).length,
      pclLevel: records.filter(record => "pclLevel" in record).length,
      cs: records.filter(record => "cs" in record).length,
      rd: records.filter(record => "rd" in record).length,
    }
    // Logged so pipeline runs leave a coverage trail in test output.
    console.log(`printersMap capability coverage (${records.length} records):`, coverage)
    for (const [field, count] of Object.entries(coverage)) {
      expect(count, `expected some coverage for ${field}`).toBeGreaterThan(0)
      expect(count).toBeLessThanOrEqual(records.length)
    }
  })
})
