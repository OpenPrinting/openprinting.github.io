"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticStatusBadge,
} from "@/components/foomatic/shared"
import { withBasePath } from "@/lib/foomatic/base-path"
import { printerHref } from "@/lib/foomatic/routes"

interface Recommendation {
  id: string
  score: number
  sharedFeatures: string[]
}

interface PrinterSummary {
  id: string
  manufacturer: string
  model: string
  status: string
  type: string
  functionality: string
  driverCount: number
}

interface PrintersMapData {
  printers: PrinterSummary[]
}

interface RecommendedPrintersSectionProps {
  printerId: string
}

// printersMap.json is ~1.5 MB and shared by every printer page, so the parsed
// map is memoised for the lifetime of the tab. A failed fetch clears the cache
// so the next mount retries instead of reusing a rejected promise.
let printersMapCache: Promise<Map<string, PrinterSummary>> | null = null

function getPrintersMap(): Promise<Map<string, PrinterSummary>> {
  if (!printersMapCache) {
    printersMapCache = fetch(withBasePath("/foomatic-db/printersMap.json"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("printersMap fetch failed")
        }
        return response.json() as Promise<PrintersMapData>
      })
      .then((data) => new Map(data.printers.map((printer) => [printer.id, printer])))
      .catch((error) => {
        printersMapCache = null
        throw error
      })
  }

  return printersMapCache
}

function ConfidenceBadge({ score }: { score: number }) {
  if (score >= 0.9995) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        Exact match
      </span>
    )
  }

  const percentage = Math.round(score * 100)
  const toneClass =
    percentage >= 85
      ? "text-emerald-600 dark:text-emerald-400"
      : percentage >= 70
        ? "text-amber-600 dark:text-amber-400"
        : "text-muted-foreground"

  return <span className={`text-sm font-medium ${toneClass}`}>{percentage}% match</span>
}

function RecommendationSkeleton() {
  return (
    <FoomaticCard className="p-6" aria-hidden="true">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-3">
          <div>
            <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-48 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </FoomaticCard>
  )
}

export default function RecommendedPrintersSection({
  printerId,
}: RecommendedPrintersSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [printerMap, setPrinterMap] = useState<Map<string, PrinterSummary>>(new Map())
  const [loading, setLoading] = useState(true)
  const [hasRecommendations, setHasRecommendations] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)

      try {
        const [recommendationsResponse, map] = await Promise.all([
          fetch(withBasePath(`/foomatic-db/recommendations/${printerId}.json`)),
          getPrintersMap(),
        ])

        if (cancelled) {
          return
        }

        setPrinterMap(map)

        if (!recommendationsResponse.ok) {
          setHasRecommendations(false)
          return
        }

        const recs: Recommendation[] = await recommendationsResponse.json()

        if (cancelled) {
          return
        }

        setRecommendations(recs.slice(0, 3))
        setHasRecommendations(recs.length > 0)
      } catch {
        if (!cancelled) {
          setHasRecommendations(false)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [printerId])

  return (
    <section aria-labelledby="recommendations-heading" className="space-y-4">
      <div>
        <h2 id="recommendations-heading" className="text-2xl font-semibold tracking-tight">
          Similar printers
        </h2>
        <p className="text-sm text-muted-foreground">
          Matched by Linux driver compatibility and shared hardware capabilities.
        </p>
      </div>

      <div className="grid gap-4" aria-live="polite" aria-busy={loading}>
        {loading ? (
          <>
            <RecommendationSkeleton />
            <RecommendationSkeleton />
            <RecommendationSkeleton />
          </>
        ) : !hasRecommendations ? (
          <FoomaticCard className="p-6">
            <p className="text-sm text-muted-foreground">
              No similar printers found in the database for this entry.
            </p>
          </FoomaticCard>
        ) : (
          recommendations.map((recommendation) => {
            const printer = printerMap.get(recommendation.id)

            if (!printer) {
              return null
            }

            return (
              <FoomaticCard key={recommendation.id} className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{printer.manufacturer}</p>
                      <h3 className="text-xl font-semibold tracking-tight">{printer.model}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <FoomaticStatusBadge status={printer.status} />

                      <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                        {printer.driverCount} driver
                        {printer.driverCount === 1 ? "" : "s"}
                      </FoomaticBadge>

                      {printer.type !== "unknown" ? (
                        <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                          {printer.type}
                        </FoomaticBadge>
                      ) : null}
                    </div>

                    {recommendation.sharedFeatures.length > 0 ? (
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                          Why this printer?
                        </p>
                        <ul
                          className="flex flex-wrap gap-2"
                          aria-label={`Reasons ${printer.manufacturer} ${printer.model} was recommended`}
                        >
                          {recommendation.sharedFeatures.map((feature) => (
                            <li key={feature}>
                              <FoomaticBadge className="border-primary/20 bg-primary/5 text-primary">
                                {feature}
                              </FoomaticBadge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <ConfidenceBadge score={recommendation.score} />

                    <Link
                      href={printerHref(printer.id, printer.manufacturer)}
                      className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
                      aria-label={`View ${printer.manufacturer} ${printer.model}`}
                    >
                      View printer
                    </Link>
                  </div>
                </div>
              </FoomaticCard>
            )
          })
        )}
      </div>
    </section>
  )
}
