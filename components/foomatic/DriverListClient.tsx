"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Search, Wrench } from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticPageSection,
  FoomaticSelect,
} from "@/components/foomatic/shared"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/foomatic/base-path"
import { driverHref } from "@/lib/foomatic/routes"
import type { DriverSummary } from "@/lib/foomatic/types"

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100, 200, -1] as const

export default function DriverListClient() {
  const [drivers, setDrivers] = useState<DriverSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [hideObsolete, setHideObsolete] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [query, hideObsolete])

  const totalPages = useMemo(() => {
    if (itemsPerPage === -1) return 1
    return Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  }, [filtered.length, itemsPerPage])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(Math.max(1, totalPages))
  }, [currentPage, totalPages])

  const startIndex = itemsPerPage === -1 ? 0 : (currentPage - 1) * itemsPerPage
  const endIndex =
    itemsPerPage === -1 ? filtered.length : Math.min(startIndex + itemsPerPage, filtered.length)
  const visible = itemsPerPage === -1 ? filtered : filtered.slice(startIndex, endIndex)

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page)
    },
    [totalPages]
  )

  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 7

    if (totalPages <= maxVisiblePages) {
      for (let index = 1; index <= totalPages; index += 1) pages.push(index)
      return pages
    }

    if (currentPage <= 4) {
      for (let index = 1; index <= 5; index += 1) pages.push(index)
      pages.push("...", totalPages)
      return pages
    }

    if (currentPage >= totalPages - 3) {
      pages.push(1, "...")
      for (let index = totalPages - 4; index <= totalPages; index += 1) pages.push(index)
      return pages
    }

    pages.push(1, "...")
    for (let index = currentPage - 1; index <= currentPage + 1; index += 1) pages.push(index)
    pages.push("...", totalPages)
    return pages
  }, [currentPage, totalPages])

  const displayStart = filtered.length === 0 ? 0 : startIndex + 1
  const displayEnd = filtered.length === 0 ? 0 : endIndex

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
              onChange={(event) => setQuery(event.target.value)}
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
        ) : filtered.length > 0 ? (
          <div className="space-y-8">
            <FoomaticCard className="p-4 sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="text-sm font-medium text-foreground">Results per page</span>
                  <FoomaticSelect
                    value={itemsPerPage}
                    onChange={(event) => {
                      setItemsPerPage(parseInt(event.target.value, 10))
                      setCurrentPage(1)
                    }}
                    className="w-full sm:w-40"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option === -1 ? "All results" : option}
                      </option>
                    ))}
                  </FoomaticSelect>
                </div>

                <p className="text-sm text-muted-foreground" aria-live="polite">
                  Showing {displayStart}-{displayEnd} of {filtered.length} driver
                  {filtered.length === 1 ? "" : "s"}
                </p>
              </div>
            </FoomaticCard>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((driver) => (
                <Link key={driver.id} href={driverHref(driver.id)} className="group block h-full">
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

            {totalPages > 1 ? (
              <FoomaticCard className="space-y-6 p-6" role="navigation" aria-label="Pagination">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    variant="outline"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-2"
                    aria-label="Go to previous page"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {getPageNumbers().map((page, index) =>
                      typeof page !== "number" ? (
                        <span key={`${page}-${index}`} className="px-2 text-sm text-muted-foreground">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className="min-w-9"
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                    aria-label="Go to next page"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </FoomaticCard>
            ) : null}
          </div>
        ) : (
          <FoomaticCard className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
              <Wrench className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">No matching drivers found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Try a different search term or clear the filters to see more results.
            </p>
          </FoomaticCard>
        )}
      </FoomaticPageSection>
    </main>
  )
}
