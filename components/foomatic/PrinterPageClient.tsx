"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Eye,
  Info,
  PrinterIcon,
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
import type { Printer } from "@/lib/foomatic/types"
import { calculateAccurateStatus } from "@/lib/foomatic/utils"

interface PrinterPageClientProps {
  printerId: string
}

function LoadingState() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]" role="status" aria-label="Loading printer details">
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

export default function PrinterPageClient({ printerId }: PrinterPageClientProps) {
  const [printer, setPrinter] = useState<Printer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrinter() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(withBasePath(`/foomatic-db/printers/${printerId}.json`))
        if (!response.ok) {
          throw new Error("This printer entry could not be loaded.")
        }

        const data = await response.json()
        setPrinter(data)
      } catch (err) {
        console.error("Failed to load printer:", err)
        setError(err instanceof Error ? err.message : "This printer entry could not be loaded.")
      } finally {
        setLoading(false)
      }
    }

    fetchPrinter()
  }, [printerId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-6 text-foreground">
        <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
          <Button asChild variant="outline" size="sm" className="gap-2" aria-label="Back to printer directory">
            <Link href="/foomatic">
              <ArrowLeft className="h-4 w-4" />
              Back to directory
            </Link>
          </Button>
          <LoadingState />
        </FoomaticPageSection>
      </main>
    )
  }

  if (error || !printer) {
    return (
      <main className="min-h-screen bg-background pb-20 pt-24 text-foreground">
        <FoomaticPageSection className="py-10 sm:py-12">
          <FoomaticCard className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive">
              <PrinterIcon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Printer not found</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {error || "The requested printer entry could not be found in the OpenPrinting database."}
            </p>
            <Button asChild className="mt-8 gap-2">
              <Link href="/foomatic">
                <ArrowLeft className="h-4 w-4" />
                Return to directory
              </Link>
            </Button>
          </FoomaticCard>
        </FoomaticPageSection>
      </main>
    )
  }

  const status = calculateAccurateStatus(printer)
  const drivers = [...(printer.drivers ?? [])].sort((left, right) => {
    if (left.id === printer.recommended_driver) return -1
    if (right.id === printer.recommended_driver) return 1
    return 0
  })

  return (
    <main className="min-h-screen bg-background pb-20 pt-24 text-foreground">
      <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" size="sm" className="gap-2" aria-label="Back to printer directory">
            <Link href="/foomatic">
              <ArrowLeft className="h-4 w-4" />
              Back to directory
            </Link>
          </Button>

          <FoomaticHeroPill className="w-fit">
            Printer details
          </FoomaticHeroPill>
        </div>

        <section className="relative overflow-hidden rounded-xl border border-border bg-card">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute inset-0 bg-white/10 dark:bg-black/50" />
          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-accent/50 text-primary">
                  <PrinterIcon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{printer.manufacturer}</p>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                    {printer.model}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  <FoomaticStatusBadge status={status} />
                  {printer.type ? (
                    <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                      {printer.type}
                    </FoomaticBadge>
                  ) : null}
                  <FoomaticBadge className="border-border/70 bg-accent/60 text-muted-foreground">
                    {drivers.length} driver{drivers.length === 1 ? "" : "s"}
                  </FoomaticBadge>
                </div>
              </div>

              {printer.recommended_driver ? (
                <FoomaticCard className="max-w-sm p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Recommended driver
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {printer.recommended_driver.replace(/^driver\//, "")}
                  </p>
                </FoomaticCard>
              ) : null}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
          <aside>
            <FoomaticCard className="p-6">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Printer information</h2>
              </div>

              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Manufacturer
                  </dt>
                  <dd className="mt-2 text-sm text-foreground">{printer.manufacturer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Type
                  </dt>
                  <dd className="mt-2 text-sm text-foreground">{printer.type || "Not specified"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Support level
                  </dt>
                  <dd className="mt-2">
                    <FoomaticStatusBadge status={status} />
                  </dd>
                </div>
              </dl>

              {printer.notes ? (
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Notes
                  </h3>
                  <div
                    className="prose prose-sm mt-4 max-w-none text-foreground dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: printer.notes }}
                  />
                </div>
              ) : null}
            </FoomaticCard>
          </aside>

          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Available drivers</h2>
                <p className="text-sm text-muted-foreground">
                  Explore the drivers associated with this printer, including notes, upstream links, and PPD downloads where available.
                </p>
              </div>
              {!drivers.some((driver) => driver.hasPpd && driver.ppdPath) ? (
                <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                  No PPD files listed
                </FoomaticBadge>
              ) : null}
            </div>

            {drivers.map((driver) => (
              <FoomaticCard key={driver.id} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight">{driver.name}</h3>
                      {driver.id === printer.recommended_driver ? (
                        <FoomaticBadge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" aria-label="Recommended driver">
                          Recommended
                        </FoomaticBadge>
                      ) : null}
                    </div>

                    {driver.url ? (
                      <Link
                        href={driver.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit driver source
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div
                  className="prose prose-sm mt-5 max-w-none text-foreground dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: driver.comments || "No additional notes are available for this driver.",
                  }}
                />

                {driver.hasPpd && driver.ppdPath ? (
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                    <Button asChild className="gap-2">
                      <a
                        href={withBasePath(driver.ppdPath)}
                        download={`${printer.id}-${driver.id.replace(/^driver\//, "")}.ppd`}
                      >
                        <Download className="h-4 w-4" />
                        Download PPD file
                      </a>
                    </Button>

                    <Button asChild variant="outline" className="gap-2">
                      <Link href={`/foomatic/view-ppd?path=${encodeURIComponent(driver.ppdPath)}`}>
                        <Eye className="h-4 w-4" />
                        Preview PPD
                      </Link>
                    </Button>
                  </div>
                ) : null}
              </FoomaticCard>
            ))}
          </section>
        </div>
      </FoomaticPageSection>
    </main>
  )
}
