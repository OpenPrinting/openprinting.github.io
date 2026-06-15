import fs from "fs/promises"
import path from "path"
import type { Metadata } from "next"
import type { Printer, PrinterSummary } from "@/lib/foomatic/types"
import PrinterPageClient from "@/components/foomatic/PrinterPageClient"
import { printerMakeSegment } from "@/lib/foomatic/routes"
import { getSiteUrl } from "@/lib/site"

async function getPrinterSummaries(): Promise<PrinterSummary[]> {
  const filePath = path.join(process.cwd(), "public", "foomatic-db", "printersMap.json")
  try {
    const data = await fs.readFile(filePath, "utf-8")
    const json = JSON.parse(data)
    return json.printers
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }

    throw error
  }
}

export async function generateStaticParams() {
  const printers = await getPrinterSummaries()
  return printers.map((printer) => ({
    make: printerMakeSegment(printer.id, printer.manufacturer),
    id: printer.id.replace(/^printer\//, ""),
  }))
}

interface PrinterPageProps {
  params: Promise<{
    make: string
    id: string
  }>
}

async function getPrinter(id: string): Promise<Printer | null> {
  const filePath = path.join(process.cwd(), "public", "foomatic-db", "printers", `${id}.json`)
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8")) as Printer
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PrinterPageProps): Promise<Metadata> {
  const { make, id } = await params
  const printer = await getPrinter(id)
  const name = printer ? `${printer.manufacturer} ${printer.model}` : id
  const driverCount = printer?.drivers?.length ?? 0
  const title = `${name} — Printer support & drivers | OpenPrinting`
  const description = printer
    ? `Support information, recommended driver, and ${driverCount} available driver${driverCount === 1 ? "" : "s"} for the ${name} on Linux and Unix via OpenPrinting.`
    : `Printer support information for ${id} from the OpenPrinting database.`
  const canonical = getSiteUrl(`/foomatic/printer/${make}/${id}/`)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  }
}

export default async function PrinterPage({ params }: PrinterPageProps) {
  const { id } = await params

  return <PrinterPageClient printerId={id} />
}
