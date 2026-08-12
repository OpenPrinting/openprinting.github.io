// Filesystem-backed AssistantData for Node contexts (the eval harness and the
// real-artifact test suite). Reads the same generated artifacts the browser
// fetches, so evaluation exercises exactly the data that ships.

import fs from "node:fs"
import path from "node:path"
import type { DriverRecord, DriverSummary, Printer, PrinterSummary } from "../../lib/foomatic/types"
import type { AssistantData, RecommendationEntry } from "../../lib/assistant/types"

const DB = (root: string) => path.join(root, "public", "foomatic-db")

export function artifactsPresent(root: string = process.cwd()): boolean {
  return (
    fs.existsSync(path.join(DB(root), "printersMap.json")) &&
    fs.existsSync(path.join(DB(root), "driversMap.json")) &&
    fs.existsSync(path.join(DB(root), "printers")) &&
    fs.existsSync(path.join(DB(root), "recommendations"))
  )
}

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T
  } catch {
    return null
  }
}

export function nodeData(root: string = process.cwd()): AssistantData {
  const db = DB(root)
  const cache = new Map<string, unknown>()

  const cached = <T>(key: string, load: () => T): T => {
    if (!cache.has(key)) cache.set(key, load())
    return cache.get(key) as T
  }

  return {
    async getCatalog() {
      return cached("catalog", () => {
        const payload = readJson<{ printers: PrinterSummary[] }>(path.join(db, "printersMap.json"))
        return payload?.printers ?? []
      })
    },
    async getPrinter(id: string) {
      return cached(`printer:${id}`, () => readJson<Printer>(path.join(db, "printers", `${id}.json`)))
    },
    async getRecommendations(id: string) {
      return cached(`recs:${id}`, () => {
        return readJson<RecommendationEntry[]>(path.join(db, "recommendations", `${id}.json`)) ?? []
      })
    },
    async getDriversMap() {
      return cached("drivers", () => {
        const payload = readJson<{ drivers: DriverSummary[] }>(path.join(db, "driversMap.json"))
        return payload?.drivers ?? []
      })
    },
    async getDriver(id: string) {
      return cached(`driver:${id}`, () => readJson<DriverRecord>(path.join(db, "drivers", `${id}.json`)))
    },
  }
}
