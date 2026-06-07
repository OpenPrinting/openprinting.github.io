"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, Wrench } from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticPageSection,
} from "@/components/foomatic/shared"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/foomatic/base-path"
import type { DriverSummary } from "@/lib/foomatic/types"

const ITEMS_PER_PAGE = 60

export default function DriverListClient() {
  const [drivers, setDrivers] = useState<DriverSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [hideObsolete, setHideObsolete] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(withBasePath("/foomatic-db/driversMap.json"))
        if (!response.ok) {
          throw new Error("The driver directory is temporarily unavailable.")
        }
        const data = await response.json()
        setDrivers(data.drivers)
      } catch (err) {
        console.error("Failed to load driver data:", err)
        setError(err instanceof Error ? err.message : "The driver directory could not be loaded.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return drivers.filter((driver) => {
      if (hideObsolete && driver.obsolete) return false
      if (!q) return true
      return (
        driver.name.toLowerCase().includes(q) ||
        (driver.supplier || "").toLowerCase().includes(q) ||
        (driver.shortDescription || "").toLowerCase().includes(q)
      )
    })
  }, [drivers, query, hideObsolete])

  const visible = filtered.slice(0, visibleCount)

  return (
    <main className="min-h-screen bg-background pt-6 text-foreground">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/80" />
        <div className="grid-pattern absolute inset-0" />
        <FoomaticPageSection className="relative py-14 sm:py-16">
          <FoomaticHeroPill>OpenPrinting Foomatic database</FoomaticHeroPill>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Printer Drivers</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Browse the drivers in the Foomatic database, see which printers each one supports, and
            open the matching printer pages.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" size="sm">
              <Link href="/foomatic/printers">Browse printers instead</Link>
            </Button>
          </div>
        </FoomaticPageSection>
      </section>

      <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
        <FoomaticCard className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setVisibleCount(ITEMS_PER_PAGE)
              }}
              placeholder="Search drivers by name, supplier, or description…"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Search drivers"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={hideObsolete}
              onChange={(event) => setHideObsolete(event.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            Hide obsolete drivers
          </label>
        </FoomaticCard>

        {error ? (
          <FoomaticCard className="p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold tracking-tight">Unable to load drivers</h2>
            <p className="mt-3 text-sm text-muted-foreground">{error}</p>
          </FoomaticCard>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <FoomaticCard key={index} className="h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {filtered.length} driver{filtered.length === 1 ? "" : "s"}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((driver) => (
                <Link key={driver.id} href={`/foomatic/driver/${driver.id}`} className="group block h-full">
                  <FoomaticCard className="flex h-full flex-col p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg border border-border bg-muted p-2.5 text-primary">
                        <Wrench className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {driver.name}
                        </h3>
                        {driver.supplier ? (
                          <p className="truncate text-sm text-muted-foreground">{driver.supplier}</p>
                        ) : null}
                      </div>
                    </div>

                    {driver.shortDescription ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {driver.shortDescription}
                      </p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap items-center gap-2">
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
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                      <FoomaticBadge className="border-border/70 bg-accent/60 text-muted-foreground">
                        {driver.printerCount} printer{driver.printerCount === 1 ? "" : "s"}
                      </FoomaticBadge>
                      <span className="inline-flex items-center gap-1 font-medium text-primary">
                        View driver
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </FoomaticCard>
                </Link>
              ))}
            </div>

            {visibleCount < filtered.length ? (
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}>
                  Show more drivers
                </Button>
              </div>
            ) : null}
          </>
        )}
      </FoomaticPageSection>
    </main>
  )
}
