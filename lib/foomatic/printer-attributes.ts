// Pure helpers for deriving normalized printer attributes from raw
// foomatic-db XML (already parsed to JSON). Shared between
// scripts/foomatic/combine-data.ts, the vectorization stage, and their tests.

// Raw printer XML, already parsed to JSON by fast-xml-parser. Shape varies
// freely per upstream entry and is accessed via deep optional-chained
// property paths below, so it is intentionally untyped at this boundary.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawXmlNode = any

export function getText(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value === "string") {
    return value.trim() || undefined
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  if (Array.isArray(value)) {
    const text = value.map(getText).filter(Boolean).join(", ").trim()
    return text || undefined
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>

    if (typeof obj.en === "string") {
      return obj.en.trim() || undefined
    }

    if (typeof obj["#text"] === "string") {
      return obj["#text"].trim() || undefined
    }

    for (const key of Object.keys(obj)) {
      const nested = getText(obj[key])
      if (nested) {
        return nested
      }
    }
  }

  return undefined
}

export function getFunctionalityStatus(func: string | undefined): string {
  if (!func || func === "?") {
    return "Unknown"
  }

  switch (func) {
    case "A":
      return "Perfect"
    case "B":
    case "C":
      return "Mostly"
    default:
      return "Unsupported"
  }
}

export function getPrinterType(printer: RawXmlNode): string {
  if (!printer.mechanism) {
    return "unknown"
  }

  const mechanism = printer.mechanism

  if (mechanism.inkjet !== undefined) {
    return "inkjet"
  }

  if (mechanism.laser !== undefined) {
    return "laser"
  }

  if (mechanism.dotmatrix !== undefined) {
    return "dot-matrix"
  }

  if (mechanism.transfer === "i") {
    return "inkjet"
  }

  if (mechanism.transfer === "t") {
    return "laser"
  }

  return "unknown"
}

export function normalizeCommandsetToken(raw: string): string | null {
  const t = raw.trim()
  if (!t) return null
  const u = t.toUpperCase()
  if (
    /^(POSTSCRIPT\d*|ADOBE\s+POSTSCRIPT|ADOBE\s+LEVEL\s+\d+\s+POSTSCRIPT|PS\d?|POSTS$|POSTSCRIP$|POSTSCRI$|POSTSCRIPT\s+EMULATION|POSTSCRIPT\s+LEVEL|POSTSCRIPT\s+LE$|POSTSCRIPT\s+LEV$)/.test(
      u
    )
  )
    return "POSTSCRIPT"
  if (/^(PCLXL|PCXL|PCL-XL|PCL6|PCL 6 EMULATION|HP ENHANCED PCL6)$/.test(u)) return "PCLXL"
  if (/^(PCL5[CE]?\d*|HP ENHANCED PCL5[E]?|ENHANCED PCL5|PCL 5 EMULATION)$/.test(u))
    return "PCL5E"
  if (/^(DW-PCL)$/.test(u)) return "PCL"
  if (
    /^(NONE|NA|P$|LPT1|1284\.4|DW-$|AUTOMATIC|DOWNLOAD|RASTER|GDI;MDL|PRINTGEAR;PCL;PLJ)$/.test(
      u
    )
  )
    return null
  return u
}

// Normalized autodetect command-set tokens (POSTSCRIPT, PCLXL, ...). These are
// the machine-comparable tokens used as similarity features, as opposed to the
// human-readable `commandsets` labels shown in the UI.
export function getCommandsetTokens(printer: RawXmlNode): string[] {
  const a = printer.autodetect
  if (!a) return []

  const rawTokens: string[] = []

  const pushCommaSplit = (val: unknown) => {
    if (!val) return
    for (const t of String(val).split(",")) rawTokens.push(t.trim())
  }

  pushCommaSplit(a.general?.commandset)
  pushCommaSplit(a.usb?.commandset)
  pushCommaSplit(a.parallel?.commandset)

  if (a.general?.ieee1284) {
    const m = String(a.general.ieee1284).match(/CMD:([^;]+)/i)
    if (m) pushCommaSplit(m[1])
  }

  const seen = new Set<string>()
  const result: string[] = []
  for (const raw of rawTokens) {
    const norm = normalizeCommandsetToken(raw)
    if (norm && !seen.has(norm)) {
      seen.add(norm)
      result.push(norm)
    }
  }
  return result.sort()
}

export function getBooleanCapability(value: unknown): boolean | "unknown" {
  if (value === undefined || value === null) {
    return "unknown"
  }

  if (typeof value === "boolean") {
    return value
  }

  const text = getText(value)?.toLowerCase()
  if (!text) {
    return "unknown"
  }

  if (["1", "true", "yes", "y", "color", "duplex"].includes(text)) {
    return true
  }

  if (["0", "false", "no", "n", "mono", "monochrome", "simplex"].includes(text)) {
    return false
  }

  return "unknown"
}

export function getColorCapability(printer: RawXmlNode): boolean | "unknown" {
  if (printer.mechanism && "color" in printer.mechanism) {
    return true
  }

  if (printer.mechanism && Object.keys(printer.mechanism).length > 0) {
    return false
  }

  return getBooleanCapability(
    printer.color ?? printer.colors ?? printer.colorDevice ?? printer.capabilities?.color
  )
}

export function getDuplexCapability(printer: RawXmlNode): boolean | "unknown" {
  return getBooleanCapability(
    printer.duplex ?? printer.duplexer ?? printer.capabilities?.duplex
  )
}

export function getMaxDpi(printer: RawXmlNode): number | null {
  const dpi = printer.mechanism?.resolution?.dpi
  if (!dpi) return null
  const x = Number(dpi.x ?? dpi["@x"] ?? 0)
  const y = Number(dpi.y ?? dpi["@y"] ?? 0)
  const max = Math.max(x, y)
  return max > 0 ? max : null
}

export function getPSLevel(printer: RawXmlNode): number | null {
  const ps = printer.lang?.postscript
  if (ps === undefined) return null
  const raw = typeof ps === "object" && ps !== null ? ps["@level"] ?? ps.level ?? "" : String(ps)
  const s = String(raw).trim()
  if (!s || s === "?") return null
  if (["3", "III", "3.0"].includes(s)) return 3
  if (["2", "II"].includes(s)) return 2
  if (["1", "I"].includes(s)) return 1
  return 0
}

export function getPCLLevel(printer: RawXmlNode): number | null {
  const pcl = printer.lang?.pcl
  if (pcl === undefined) return null
  const raw =
    typeof pcl === "object" && pcl !== null ? pcl["@level"] ?? pcl.level ?? "" : String(pcl)
  const s = String(raw).trim()
  if (!s || s === "?") return null
  if (/^6|\/6$|,\s*6$|^6\//i.test(s)) return 6
  if (/5[eEcC]/.test(s) || /^5/.test(s)) return 5
  if (/^4/.test(s)) return 4
  if (/^3/.test(s)) return 3
  return 0
}

export function encodeFunctionality(value: string | undefined): number {
  switch ((value ?? "").toUpperCase()) {
    case "A":
      return 1.0
    case "B":
      return 0.66
    case "C":
      return 0.33
    default:
      return 0.0
  }
}
