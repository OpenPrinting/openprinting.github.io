"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Info,
  PrinterIcon,
  Wrench,
} from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticPageSection,
  FoomaticStatusBadge,
} from "@/components/foomatic/shared"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/foomatic/base-path"
import { driverHref, printerHref } from "@/lib/foomatic/routes"
import type { DriverRecord } from "@/lib/foomatic/types"

interface DriverPageClientProps {
  driverId: string
}

function LoadingState() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]" role="status" aria-label="Loading driver details">
      <FoomaticCard className="space-y-4 p-6">
        <div className="h-8 w-36 animate-pulse rounded bg-muted" />
        <div className="h-5 w-28 animate-pulse rounded bg-muted" />
        <div className="h-20 animate-pulse rounded-xl bg-muted" />
      </FoomaticCard>
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <FoomaticCard key={index} className="space-y-4 p-6">
            <div className="h-7 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-56 animate-pulse rounded bg-muted" />
            <div className="h-20 animate-pulse rounded-xl bg-muted" />
          </FoomaticCard>
        ))}
      </div>
    </div>
  )
}

const PRINTERS_PER_PAGE = 60

const QUALITY_METRICS: { key: "text" | "lineart" | "graphics" | "photo" | "speed"; label: string }[] = [
  { key: "text", label: "Text" },
  { key: "lineart", label: "Line art" },
  { key: "graphics", label: "Graphics" },
  { key: "photo", label: "Photo" },
  { key: "speed", label: "Speed" },
]

function QualityBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-xs text-muted-foreground">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${clamped}%` }} />
      </div>
      <span className="w-8 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{clamped}</span>
    </div>
  )
}

export default function DriverPageClient({ driverId }: DriverPageClientProps) {
  const [driver, setDriver] = useState<DriverRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PRINTERS_PER_PAGE)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    async function fetchDriver() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(withBasePath(`/foomatic-db/drivers/${driverId}.json`))
        if (!response.ok) {
          throw new Error("This driver entry could not be loaded.")
        }

        const data = await response.json()
        setDriver(data)
      } catch (err) {
        console.error("Failed to load driver:", err)
        setError(err instanceof Error ? err.message : "This driver entry could not be loaded.")
      } finally {
        setLoading(false)
      }
    }

    fetchDriver()
  }, [driverId])

  const filteredPrinters = useMemo(() => {
    if (!driver) return []
    const query = filter.trim().toLowerCase()
    if (!query) return driver.printers
    return driver.printers.filter(
      (printer) =>
        printer.manufacturer.toLowerCase().includes(query) ||
        printer.model.toLowerCase().includes(query)
    )
  }, [driver, filter])

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-6 text-foreground">
        <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
          <Button asChild variant="outline" size="sm" className="gap-2" aria-label="Back to printer directory">
            <Link href="/foomatic/drivers">
              <ArrowLeft className="h-4 w-4" />
              Back to directory
            </Link>
          </Button>
          <LoadingState />
        </FoomaticPageSection>
      </main>
    )
  }

  if (error || !driver) {
    return (
      <main className="min-h-screen bg-background pb-20 pt-24 text-foreground">
        <FoomaticPageSection className="py-10 sm:py-12">
          <FoomaticCard className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive">
              <Wrench className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Driver not found</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {error || "The requested driver entry could not be found in the OpenPrinting database."}
            </p>
            <Button asChild className="mt-8 gap-2">
              <Link href="/foomatic/drivers">
                <ArrowLeft className="h-4 w-4" />
                Return to directory
              </Link>
            </Button>
          </FoomaticCard>
        </FoomaticPageSection>
      </main>
    )
  }

  const visiblePrinters = filteredPrinters.slice(0, visibleCount)

  return (
    <main className="min-h-screen bg-background pb-20 pt-24 text-foreground">
      <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" size="sm" className="gap-2" aria-label="Back to printer directory">
            <Link href="/foomatic/drivers">
              <ArrowLeft className="h-4 w-4" />
              Back to directory
            </Link>
          </Button>
          <FoomaticHeroPill className="w-fit">Driver details</FoomaticHeroPill>
        </div>

        <section className="relative overflow-hidden rounded-xl border border-border bg-card">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute inset-0 bg-white/10 dark:bg-black/50" />
          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-accent/50 text-primary">
                  <Wrench className="h-7 w-7" />
                </div>
                <div>
                  {driver.supplier ? (
                    <p className="text-sm text-muted-foreground">{driver.supplier}</p>
                  ) : null}
                  <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{driver.name}</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  {driver.type ? (
                    <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                      {driver.type}
                    </FoomaticBadge>
                  ) : null}
                  {driver.license ? (
                    <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                      {driver.license}
                    </FoomaticBadge>
                  ) : null}
                  {driver.obsolete ? (
                    <FoomaticBadge className="border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300">
                      Obsolete
                    </FoomaticBadge>
                  ) : null}
                  <FoomaticBadge className="border-border/70 bg-accent/60 text-muted-foreground">
                    {driver.printerCount} printer{driver.printerCount === 1 ? "" : "s"}
                  </FoomaticBadge>
                </div>
              </div>

              {driver.url ? (
                <FoomaticCard className="max-w-sm p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Driver home page
                  </p>
                  <Link
                    href={driver.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Visit project site
                  </Link>
                </FoomaticCard>
              ) : null}
            </div>
          </div>
        </section>

        {driver.obsolete && driver.replacedBy ? (
          <FoomaticCard className="border-amber-500/30 bg-amber-500/5 p-5">
            <p className="text-sm text-foreground">
              This driver is obsolete. Recommended replacement:{" "}
              <Link href={driverHref(driver.replacedBy)} className="font-medium text-primary hover:underline">
                {driver.replacedBy}
              </Link>
              .
            </p>
          </FoomaticCard>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
          <aside className="space-y-6">
            <FoomaticCard className="p-6">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Driver information</h2>
              </div>

              <dl className="mt-6 space-y-5">
                {driver.supplier ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Supplier</dt>
                    <dd className="mt-2 text-sm text-foreground">{driver.supplier}</dd>
                  </div>
                ) : null}
                {driver.license || driver.freeSoftware !== undefined ? (
                  <div id="license" className="scroll-mt-24">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">License</dt>
                    <dd className="mt-2 text-sm text-foreground">
                      {driver.license || (driver.freeSoftware ? "Free software" : "Not specified")}
                      {driver.license && driver.freeSoftware ? (
                        <span className="text-muted-foreground"> (free software)</span>
                      ) : null}
                    </dd>
                  </div>
                ) : null}
                {driver.type ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Type</dt>
                    <dd className="mt-2 text-sm text-foreground">{driver.type}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Origin</dt>
                  <dd className="mt-2 text-sm text-foreground">
                    {driver.thirdParty ? "Third-party supplied" : "OpenPrinting / bundled"}
                  </dd>
                </div>
              </dl>

              {driver.supportContacts && driver.supportContacts.length > 0 ? (
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Support</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {driver.supportContacts.map((contact, index) => (
                      <li key={index}>
                        {contact.url ? (
                          <Link href={contact.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {contact.text || contact.url}
                          </Link>
                        ) : (
                          <span className="text-foreground">{contact.text}</span>
                        )}
                        {contact.level ? (
                          <span className="ml-1 text-xs text-muted-foreground">({contact.level})</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </FoomaticCard>

            {driver.functionality &&
            (driver.functionality.color !== undefined ||
              driver.functionality.maxResolution ||
              QUALITY_METRICS.some((metric) => typeof driver.functionality?.[metric.key] === "number")) ? (
              <FoomaticCard className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Capabilities
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {driver.functionality.color !== undefined ? (
                    <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                      {driver.functionality.color ? "Color output" : "Monochrome only"}
                    </FoomaticBadge>
                  ) : null}
                  {driver.functionality.maxResolution ? (
                    <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                      Max resolution {driver.functionality.maxResolution}
                    </FoomaticBadge>
                  ) : null}
                </div>
                {QUALITY_METRICS.some((metric) => typeof driver.functionality?.[metric.key] === "number") ? (
                  <div className="mt-5 space-y-3">
                    {QUALITY_METRICS.map((metric) => {
                      const value = driver.functionality?.[metric.key]
                      if (typeof value !== "number") return null
                      return <QualityBar key={metric.key} label={metric.label} value={value} />
                    })}
                  </div>
                ) : null}
                <p className="mt-4 text-xs text-muted-foreground">
                  Output-quality ratings (0–100) as reported by the OpenPrinting database.
                </p>
              </FoomaticCard>
            ) : null}

            {driver.comments ? (
              <FoomaticCard className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Description</h3>
                <div
                  className="prose prose-sm mt-4 max-w-none text-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: driver.comments }}
                />
              </FoomaticCard>
            ) : driver.shortDescription ? (
              <FoomaticCard className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Description</h3>
                <p className="mt-4 text-sm leading-6 text-foreground">{driver.shortDescription}</p>
              </FoomaticCard>
            ) : null}
          </aside>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Supported printers</h2>
                <p className="text-sm text-muted-foreground">
                  {driver.printerCount} printer model{driver.printerCount === 1 ? "" : "s"} are known to work with this driver.
                </p>
              </div>
            </div>

            {driver.printers.length > 0 ? (
              <>
                <input
                  type="search"
                  value={filter}
                  onChange={(event) => {
                    setFilter(event.target.value)
                    setVisibleCount(PRINTERS_PER_PAGE)
                  }}
                  placeholder="Filter supported printers…"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Filter supported printers"
                />

                <FoomaticCard className="divide-y divide-border/60">
                  {visiblePrinters.map((printer) => (
                    <Link
                      key={printer.id}
                      href={printerHref(printer.id, printer.manufacturer)}
                      className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent/50"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <PrinterIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate text-sm text-foreground">
                          <span className="text-muted-foreground">{printer.manufacturer}</span> {printer.model}
                        </span>
                        {printer.recommended ? (
                          <FoomaticBadge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                            Recommended
                          </FoomaticBadge>
                        ) : null}
                      </span>
                      {printer.status ? <FoomaticStatusBadge status={printer.status} /> : null}
                    </Link>
                  ))}
                </FoomaticCard>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Showing {Math.min(visibleCount, filteredPrinters.length)} of {filteredPrinters.length}
                    {filter ? " matching" : ""} printers
                  </span>
                  {visibleCount < filteredPrinters.length ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVisibleCount((count) => count + PRINTERS_PER_PAGE)}
                    >
                      Show more
                    </Button>
                  ) : null}
                </div>
              </>
            ) : (
              <FoomaticCard className="p-6 text-sm text-muted-foreground">
                No printers are currently associated with this driver in the database.
              </FoomaticCard>
            )}
          </section>
        </div>
      </FoomaticPageSection>
    </main>
  )
}
