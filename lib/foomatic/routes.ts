export function normalizePrinterId(id: string): string {
  return id.replace(/^printer\//, "")
}

export function normalizeDriverId(id: string): string {
  return id.replace(/^driver\//, "")
}

export function printerMakeSegment(id: string, manufacturer: string): string {
  const normalizedId = normalizePrinterId(id)
  const seg = manufacturer.replace(/ /g, "_")
  if (seg && normalizedId.startsWith(`${seg}-`)) {
    return seg
  }
  return normalizedId.split("-")[0]
}

export function printerHref(id: string, manufacturer: string): string {
  const normalizedId = normalizePrinterId(id)
  const make = printerMakeSegment(normalizedId, manufacturer)
  return `/foomatic/printer/${make}/${normalizedId}`
}

export function driverHref(id: string): string {
  return `/foomatic/driver/${normalizeDriverId(id)}`
}

export function ppdViewHref(printerId: string, driverId: string): string {
  const printer = normalizePrinterId(printerId)
  const driver = normalizeDriverId(driverId)
  const params = new URLSearchParams({ driver, printer, show: "1" })
  return `/foomatic/ppd-o-matic?${params.toString()}`
}

export function ppdFilePath(printerId: string, driverId: string): string {
  const printer = normalizePrinterId(printerId)
  const driver = normalizeDriverId(driverId)
  return `/ppds/${printer}-${driver}.ppd`
}
