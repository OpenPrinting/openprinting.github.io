// Browser data source for the assistant. Every artifact is a static JSON file
// under public/, fetched via withBasePath() and cached per tab with the same
// promise-cache pattern as RecommendedPrintersSection.tsx: concurrent callers
// share one request, a 404 resolves to the empty value (missing shards are
// "no data", not an error - PR CI builds skip the similarity stage entirely),
// and a network failure clears the cache entry so the next call retries
// instead of reusing a rejected promise forever.
//
// Sizes (measured, gzip over the wire): catalogue ~70 KB once per tab,
// driversMap ~5.5 KB once per tab, printer shards 0.8-10 KB and
// recommendation shards ~0.5 KB per printer asked about.

import { withBasePath } from "@/lib/foomatic/base-path"
import type { DriverRecord, DriverSummary, Printer, PrinterSummary } from "@/lib/foomatic/types"
import type { AssistantData, RecommendationEntry } from "./types"

const cache = new Map<string, Promise<unknown>>()

function cachedFetch<T>(path: string, onMissing: () => T): Promise<T> {
  let entry = cache.get(path) as Promise<T> | undefined
  if (!entry) {
    entry = fetch(withBasePath(path))
      .then(response => {
        if (response.status === 404) return onMissing()
        if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`)
        return response.json() as Promise<T>
      })
      .catch(error => {
        cache.delete(path)
        throw error
      })
    cache.set(path, entry)
  }
  return entry
}

export function createBrowserData(): AssistantData {
  return {
    async getCatalog() {
      const payload = await cachedFetch<{ printers: PrinterSummary[] }>(
        "/foomatic-db/printersMap.json",
        () => ({ printers: [] })
      )
      return payload.printers
    },
    getPrinter(id: string) {
      return cachedFetch<Printer | null>(
        `/foomatic-db/printers/${encodeURIComponent(id)}.json`,
        () => null
      )
    },
    getRecommendations(id: string) {
      return cachedFetch<RecommendationEntry[]>(
        `/foomatic-db/recommendations/${encodeURIComponent(id)}.json`,
        () => []
      )
    },
    async getDriversMap() {
      const payload = await cachedFetch<{ drivers: DriverSummary[] }>(
        "/foomatic-db/driversMap.json",
        () => ({ drivers: [] })
      )
      return payload.drivers
    },
    getDriver(id: string) {
      return cachedFetch<DriverRecord | null>(
        `/foomatic-db/drivers/${encodeURIComponent(id)}.json`,
        () => null
      )
    },
  }
}
