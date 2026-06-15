import { siteConfig } from "@/config/site.config"
import { driverHref, printerHref } from "@/lib/foomatic/routes"

export interface LegacyCgiResolution {
  href: string
  external: boolean
}

function recnumToPrinter(recnum: string): { make: string; id: string } {
  const id = recnum.replace(/^printer:/, "")
  const make = id.split("-")[0]
  return { make, id }
}

export function resolveLegacyCgi(
  endpoint: string,
  params: URLSearchParams
): LegacyCgiResolution {
  const internal = (href: string): LegacyCgiResolution => ({ href, external: false })
  const external = (href: string): LegacyCgiResolution => ({ href, external: true })

  switch (endpoint) {
    case "show_driver":
    case "execution": {
      const driver = params.get("driver")
      return internal(driver ? driverHref(driver) : "/foomatic/drivers")
    }
    case "show_license": {
      const driver = params.get("driver")
      return internal(driver ? `${driverHref(driver)}#license` : "/foomatic/drivers")
    }
    case "show_printer": {
      const recnum = params.get("recnum")
      if (!recnum) return internal("/foomatic/printers")
      const { make, id } = recnumToPrinter(recnum)
      return internal(printerHref(id, make))
    }
    case "wikish_history": {
      const id = params.get("id")
      if (!id) return internal("/foomatic/printers")
      const printer = recnumToPrinter(id)
      return internal(printerHref(printer.id, printer.make))
    }
    case "printer_list": {
      const make = params.get("make")
      return internal(
        make
          ? `/foomatic/printers?manufacturer=${encodeURIComponent(make)}`
          : "/foomatic/printers"
      )
    }
    case "driver_list":
      return internal("/foomatic/drivers")
    case "download": {
      const filename = params.get("filename")
      const origin = siteConfig.destinations.legacyPrinters.replace(/\/printers\/?$/, "")
      return external(
        filename ? `${origin}/download/files/${filename}` : `${origin}/download/`
      )
    }
    default:
      return internal("/foomatic/printers")
  }
}
