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

export default function RecommendedPrintersSection({
  printerId,
}: RecommendedPrintersSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [printerMap, setPrinterMap] = useState<Map<string, PrinterSummary>>(new Map())

  useEffect(() => {
    async function loadData() {
      try {
        const [recommendationsResponse, printersMapResponse] =
          await Promise.all([
            fetch(
              withBasePath(`/foomatic-db/recommendations/${printerId}.json`)
            ),
            fetch(withBasePath("/foomatic-db/printersMap.json")),
          ])

        if (!printersMapResponse.ok) {
          return
        }

        const printersMapData: PrintersMapData =
          await printersMapResponse.json()

        if (recommendationsResponse.ok) {
          const recs: Recommendation[] = await recommendationsResponse.json()
          setRecommendations(recs.slice(0, 3))
        }

        setPrinterMap(
          new Map(
            printersMapData.printers.map((printer) => [
              printer.id,
              printer,
            ])
          )
        )
      } catch (error) {
        console.error("Failed to load recommendations:", error)
      }
    }

    loadData()
  }, [printerId])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Recommended alternative printers
        </h2>
        <p className="text-sm text-muted-foreground">
          Similar printers based on Linux driver compatibility and shared
          capabilities.
        </p>
      </div>

      <div className="grid gap-4">
        {recommendations.map((recommendation) => {
          const printer = printerMap.get(recommendation.id)

          if (!printer) {
            return null
          }

          return (
            <FoomaticCard key={recommendation.id} className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {printer.manufacturer}
                    </p>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {printer.model}
                    </h3>
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

                  <div className="flex flex-wrap gap-2">
                    {recommendation.sharedFeatures.map((feature) => (
                      <FoomaticBadge
                        key={feature}
                        className="border-primary/20 bg-primary/5 text-primary"
                      >
                        {feature}
                      </FoomaticBadge>
                    ))}
                  </div>
                </div>

                <Link
                  href={printerHref(printer.id, printer.manufacturer)}
                  className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  View printer
                </Link>
              </div>
            </FoomaticCard>
          )
        })}
      </div>
    </section>
  )
}
