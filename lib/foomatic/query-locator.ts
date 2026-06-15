export type QueryFormat = "text" | "xml"

export type QueryPlan =
  | { kind: "file"; url: string; format: QueryFormat }
  | {
      kind: "match"
      target: "printers" | "drivers"
      make?: string
      model?: string
      printer?: string
      format: QueryFormat
    }
  | { kind: "papps" }
  | { kind: "unsupported"; message: string }

function sanitizeSegment(value: string): string {
  return value.replace(/[\\/]+/g, "_")
}

function fileUrl(name: string, format: QueryFormat): string {
  return `/query/${name}.${format === "xml" ? "xml" : "txt"}`
}

function isDeviceIdOrSearch(value: string): boolean {
  return /(MFG|MANUFACTURER|MDL|MODEL|DES|DESCRIPTION|CMD|COMMAND\s*SET):/i.test(value) ||
    /\s/.test(value)
}

export function resolveQuery(params: URLSearchParams): QueryPlan {
  if (params.get("papps") === "true") {
    return { kind: "papps" }
  }

  const rawFormat = (params.get("format") ?? "text").toLowerCase()
  const format: QueryFormat = rawFormat === "xml" ? "xml" : "text"

  const type = (params.get("type") ?? "").toLowerCase()
  const make = params.get("make") ?? ""
  const model = params.get("model") ?? ""
  const printer = params.get("printer") ?? ""

  if (/^(makes?|manufacturers?)$/.test(type)) {
    return { kind: "file", url: fileUrl("makes", format), format }
  }

  if (/^printers?$/.test(type)) {
    if (printer || model) {
      return { kind: "match", target: "printers", make, model, printer, format }
    }
    if (make) {
      return { kind: "file", url: fileUrl(`printers/${encodeURIComponent(sanitizeSegment(make))}`, format), format }
    }
    return { kind: "file", url: fileUrl("printers", format), format }
  }

  if (/^drivers?$/.test(type)) {
    if (printer && !isDeviceIdOrSearch(printer)) {
      const id = printer.replace(/^printer\//, "")
      return { kind: "file", url: fileUrl(`drivers/${encodeURIComponent(sanitizeSegment(id))}`, format), format }
    }
    if (printer || model) {
      return { kind: "match", target: "drivers", make, model, printer, format }
    }
    return { kind: "file", url: fileUrl("drivers", format), format }
  }

  if (printer) {
    if (!isDeviceIdOrSearch(printer)) {
      const id = printer.replace(/^printer\//, "")
      return { kind: "file", url: fileUrl(`drivers/${encodeURIComponent(sanitizeSegment(id))}`, format), format }
    }
    return { kind: "match", target: "drivers", printer, format }
  }

  return {
    kind: "unsupported",
    message:
      "Unsupported query. Use type=makes, type=printers (optionally make=), or type=drivers (printer=<id>). Append format=xml for XML.",
  }
}
