import fs from "fs/promises"
import path from "path"
import type { PrinterSummary } from "@/lib/foomatic/types"
import PrinterPageClient from "@/components/foomatic/PrinterPageClient"

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
    id: printer.id,
  }))
}

interface PrinterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PrinterPage({ params }: PrinterPageProps) {
  const { id } = await params

  return <PrinterPageClient printerId={id} />
}
