import fs from "fs/promises"
import path from "path"
import type { Metadata } from "next"
import type { DriverRecord, DriverSummary } from "@/lib/foomatic/types"
import DriverPageClient from "@/components/foomatic/DriverPageClient"
import { getSiteUrl } from "@/lib/site"

async function getDriverSummaries(): Promise<DriverSummary[]> {
  const filePath = path.join(process.cwd(), "public", "foomatic-db", "driversMap.json")
  try {
    const data = await fs.readFile(filePath, "utf-8")
    const json = JSON.parse(data)
    return json.drivers
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }

    throw error
  }
}

export async function generateStaticParams() {
  const drivers = await getDriverSummaries()
  return drivers.map((driver) => ({
    id: driver.id,
  }))
}

interface DriverPageProps {
  params: Promise<{
    id: string
  }>
}

async function getDriver(id: string): Promise<DriverRecord | null> {
  const filePath = path.join(process.cwd(), "public", "foomatic-db", "drivers", `${id}.json`)
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8")) as DriverRecord
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: DriverPageProps): Promise<Metadata> {
  const { id } = await params
  const driver = await getDriver(id)
  const name = driver?.name ?? id
  const printerCount = driver?.printerCount ?? 0
  const title = `${name} — Printer driver | OpenPrinting`
  const description =
    driver?.shortDescription ||
    `The ${name} printer driver in the OpenPrinting database` +
      (printerCount ? `, supporting ${printerCount} printer model${printerCount === 1 ? "" : "s"}.` : ".")
  const canonical = getSiteUrl(`/foomatic/driver/${id}/`)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  }
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { id } = await params

  return <DriverPageClient driverId={id} />
}
