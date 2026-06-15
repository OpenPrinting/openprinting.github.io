import { ppdFilePath, ppdViewHref } from "@/lib/foomatic/routes"

export interface LegacyResolution {
  internalHref?: string
  assetPath?: string
  fallbackHref: string
}

export function resolveLegacyPpdMatic(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): LegacyResolution {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return params.get(key)
    }
    const value = params[key]
    if (Array.isArray(value)) return value[0] ?? null
    return value ?? null
  }

  const driver = get("driver")
  const printer = get("printer")
  const wantsPreview = get("show") === "1"

  const fallbackHref = "/foomatic/printers"

  if (!driver || !printer) {
    return { fallbackHref }
  }

  if (wantsPreview) {
    return { internalHref: ppdViewHref(printer, driver), fallbackHref }
  }

  return { assetPath: ppdFilePath(printer, driver), fallbackHref }
}
