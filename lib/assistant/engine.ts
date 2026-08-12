// Orchestrates one assistant turn: text + page context -> ResponsePlan.
// Pure composition of the pipeline stages; the UI, the tests, and the eval
// harness all call this same function with different AssistantData sources,
// so what is tested is exactly what ships.

import { buildDriverIndex, buildPrinterIndex, type DriverIndex, type PrinterIndex } from "./entities"
import { executeQuery } from "./execute"
import { parseQuery } from "./parse"
import { buildResponse } from "./respond"
import type { AssistantData, AssistantPageContext, AssistantQuery, Execution, ResponsePlan } from "./types"

export interface AssistantTurn {
  query: AssistantQuery
  execution: Execution
  plan: ResponsePlan
}

interface IndexCacheEntry {
  printers: PrinterIndex
  drivers: DriverIndex
}

// Indexes are derived from the catalogue/driversMap once per data source
// (i.e. once per tab in the browser) and reused across turns.
const indexCache = new WeakMap<AssistantData, Promise<IndexCacheEntry>>()

async function getIndexes(data: AssistantData): Promise<IndexCacheEntry> {
  let cached = indexCache.get(data)
  if (!cached) {
    cached = Promise.all([data.getCatalog(), data.getDriversMap()]).then(([catalog, drivers]) => ({
      printers: buildPrinterIndex(catalog),
      drivers: buildDriverIndex(drivers),
    }))
    indexCache.set(data, cached)
  }
  return cached
}

export async function runAssistant(
  input: string,
  context: AssistantPageContext,
  data: AssistantData
): Promise<AssistantTurn> {
  // Any data failure (including the initial catalogue load) becomes a
  // retryable error response; the failed index promise is evicted so the
  // retry actually refetches instead of replaying a rejected promise.
  let query: AssistantQuery = { intent: "UNSUPPORTED", reason: "empty" }
  let execution: Execution
  try {
    const indexes = await getIndexes(data)
    query = parseQuery(input, context, indexes)
    execution = await executeQuery(query, context, data)
  } catch {
    indexCache.delete(data)
    execution = { kind: "error", state: "ERROR", retryQuery: input }
  }
  return { query, execution, plan: buildResponse(execution) }
}
