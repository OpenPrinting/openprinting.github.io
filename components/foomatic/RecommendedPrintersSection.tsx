"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticStatusBadge,
} from "@/components/foomatic/shared"
import { withBasePath } from "@/lib/foomatic/base-path"
import { printerHref } from "@/lib/foomatic/routes"
import { confidenceTier } from "@/lib/foomatic/scoring"
import type { ConfidenceTone } from "@/lib/foomatic/scoring"

// Display fields are embedded in each per-printer recommendation shard by
// compute-similarity.ts, so this section needs exactly one small fetch.
interface Recommendation {
  id: string
  score: number
  sharedFeatures: string[]
  manufacturer?: string
  model?: string
  status: string
  type: string
}

interface RecommendedPrintersSectionProps {
  printerId: string
}

// One shard fetch per printer id, shared between the hero teaser and the full
// section below so mounting both costs a single network request. A missing
// shard (404) resolves to an empty list; network failures clear the cache so
// the next mount retries instead of reusing a rejected promise.
const shardCache = new Map<string, Promise<Recommendation[]>>()

function getRecommendations(printerId: string): Promise<Recommendation[]> {
  let cached = shardCache.get(printerId)

  if (!cached) {
    cached = fetch(
      withBasePath(`/foomatic-db/recommendations/${encodeURIComponent(printerId)}.json`)
    )
      .then((response) => (response.ok ? (response.json() as Promise<Recommendation[]>) : []))
      .catch((error) => {
        shardCache.delete(printerId)
        throw error
      })

    shardCache.set(printerId, cached)
  }

  return cached
}

// Tier wording and thresholds live in lib/foomatic/scoring.ts next to the
// scoring model they interpret. The percentage is labelled "similarity": the
// score is not a probability that the printer will work.
const TONE_CLASSES: Record<ConfidenceTone, string> = {
  high: "text-emerald-700 dark:text-emerald-400",
  good: "text-sky-700 dark:text-sky-400",
  moderate: "text-amber-700 dark:text-amber-400",
  limited: "text-muted-foreground",
}

function ConfidenceBadge({ score }: { score: number }) {
  const tier = confidenceTier(score)

  return (
    <span className="flex flex-col items-end">
      <span className={`text-sm font-medium ${TONE_CLASSES[tier.tone]}`}>{tier.label}</span>
      <span className="text-xs text-muted-foreground">
        {Math.round(score * 100)}% similarity
      </span>
    </span>
  )
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

// Compact hero teaser: the top similar printer plus a link to the full section.
// Renders nothing while loading or when the printer has no recommendations.
export function SimilarPrintersTeaser({ printerId }: RecommendedPrintersSectionProps) {
  const [top, setTop] = useState<Recommendation | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    getRecommendations(printerId)
      .then((recs) => {
        if (cancelled) return
        setTop(recs[0] ?? null)
        setCount(Math.min(recs.length, 3))
      })
      .catch(() => {
        // Network failure: the full section reports it; the teaser stays hidden.
      })

    return () => {
      cancelled = true
    }
  }, [printerId])

  if (!top) {
    return null
  }

  const tier = confidenceTier(top.score)

  return (
    <FoomaticCard className="p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Similar printers
      </p>

      <p className="mt-2 text-sm font-medium text-foreground">
        {top.manufacturer ?? ""} {top.model ?? top.id}
      </p>

      <p className="mt-0.5 text-xs text-muted-foreground">
        {Math.round(top.score * 100)}% similarity ·{" "}
        <span className={TONE_CLASSES[tier.tone]}>{tier.label}</span>
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {count === 1
          ? "1 printer with similar Linux driver support and hardware capabilities."
          : `${count} printers with similar Linux driver support and hardware capabilities.`}
      </p>

      <a
        href="#similar-printers"
        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        View all similar printers
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </FoomaticCard>
  )
}

export default function RecommendedPrintersSection({
  printerId,
}: RecommendedPrintersSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [hasRecommendations, setHasRecommendations] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)

      try {
        const recs = await getRecommendations(printerId)

        if (cancelled) {
          return
        }

        setRecommendations(recs.slice(0, 3))
        setHasRecommendations(recs.length > 0)
      } catch (err) {
        // A missing shard is handled by the !ok branch above, so reaching here
        // means a network or parse failure worth surfacing to the console.
        if (!cancelled) {
          console.error("Failed to load recommendations:", err)
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
    <section
      id="similar-printers"
      aria-labelledby="recommendations-heading"
      className="scroll-mt-20 space-y-4 sm:scroll-mt-24"
    >
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
            const model = recommendation.model ?? recommendation.id
            const manufacturer = recommendation.manufacturer ?? ""

            return (
              <FoomaticCard key={recommendation.id} className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{manufacturer}</p>
                      <h3 className="text-xl font-semibold tracking-tight">{model}</h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* The candidate printer's own Foomatic support grade — independent
                          of the similarity result shown on the right. */}
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">Linux support:</span>
                        <FoomaticStatusBadge status={recommendation.status} />
                      </span>

                      {recommendation.type !== "unknown" ? (
                        <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                          {recommendation.type}
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
                          aria-label={`Reasons ${manufacturer} ${model} was recommended`}
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
                      href={printerHref(recommendation.id, manufacturer)}
                      className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
                      aria-label={`View ${manufacturer} ${model}`}
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
