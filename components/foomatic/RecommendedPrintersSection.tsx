"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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
  driverCount: number
}

interface RecommendedPrintersSectionProps {
  printerId: string
}

// Tier wording and thresholds live in lib/foomatic/scoring.ts next to the
// scoring model they interpret. The percentage is labelled "similarity", not
// "match", because the score is an engineered similarity value — it is not a
// probability that the printer will work.
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
        const recommendationsResponse = await fetch(
          withBasePath(`/foomatic-db/recommendations/${encodeURIComponent(printerId)}.json`)
        )

        if (cancelled) {
          return
        }

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

                    <div className="flex flex-wrap gap-2">
                      <FoomaticStatusBadge status={recommendation.status} />

                      <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                        {recommendation.driverCount} driver
                        {recommendation.driverCount === 1 ? "" : "s"}
                      </FoomaticBadge>

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
