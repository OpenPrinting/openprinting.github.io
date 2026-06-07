"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  PrinterIcon,
} from "lucide-react"

import PrinterSearch from "@/components/foomatic/PrinterSearch"
import Printers from "@/components/foomatic/Printers"
import {
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticPageSection,
  FoomaticSelect,
} from "@/components/foomatic/shared"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/foomatic/base-path"
import type { PrinterSummary } from "@/lib/foomatic/types"
import { calculateAccurateStatus } from "@/lib/foomatic/utils"

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100, 200, -1] as const

const STORAGE_KEYS = {
  SEARCH: "printer_search",
  MANUFACTURER: "printer_manufacturer",
  DRIVER_TYPE: "printer_driver_type",
  MECHANISM_TYPE: "printer_mechanism_type",
  SUPPORT_LEVEL: "printer_support_level",
  COLOR_CAPABILITY: "printer_color_capability",
  PAGE: "printer_page",
  ITEMS_PER_PAGE: "printer_items_per_page",
} as const

function LoadingCard() {
  return (
    <FoomaticCard className="overflow-hidden">
      <div className="h-28 animate-pulse border-b border-border/60 bg-muted/70" />
      <div className="space-y-4 p-6">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
      </div>
    </FoomaticCard>
  )
}

function PaginationControls({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  startIndex,
  endIndex,
  filteredLength,
}: {
  itemsPerPage: number
  setItemsPerPage: (n: number) => void
  setCurrentPage: (n: number) => void
  startIndex: number
  endIndex: number
  filteredLength: number
}) {
  const displayStart = filteredLength === 0 ? 0 : startIndex + 1
  const displayEnd = filteredLength === 0 ? 0 : endIndex

  return (
    <FoomaticCard className="mb-8 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="text-sm font-medium text-foreground">Results per page</span>
          <FoomaticSelect
            value={itemsPerPage}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10)
              setItemsPerPage(value)
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
          Showing {displayStart}-{displayEnd} of {filteredLength} printer models
        </p>
      </div>
    </FoomaticCard>
  )
}

export default function HomePage() {
  const [printers, setPrinters] = useState<PrinterSummary[]>([])
  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedManufacturer, setSelectedManufacturer] = useState("all")
  const [selectedDriverType, setSelectedDriverType] = useState("all")
  const [selectedMechanismType, setSelectedMechanismType] = useState("all")
  const [selectedSupportLevel, setSelectedSupportLevel] = useState("all")
  const [selectedColorCapability, setSelectedColorCapability] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const savedSearch = localStorage.getItem(STORAGE_KEYS.SEARCH)
    const savedManufacturer = localStorage.getItem(STORAGE_KEYS.MANUFACTURER)
    const savedDriverType = localStorage.getItem(STORAGE_KEYS.DRIVER_TYPE)
    const savedMechanismType = localStorage.getItem(STORAGE_KEYS.MECHANISM_TYPE)
    const savedSupportLevel = localStorage.getItem(STORAGE_KEYS.SUPPORT_LEVEL)
    const savedColorCapability = localStorage.getItem(STORAGE_KEYS.COLOR_CAPABILITY)
    const savedPage = localStorage.getItem(STORAGE_KEYS.PAGE)
    const savedItemsPerPage = localStorage.getItem(STORAGE_KEYS.ITEMS_PER_PAGE)

    if (savedSearch) setSearchQuery(String(savedSearch))
    if (savedManufacturer) setSelectedManufacturer(String(savedManufacturer))
    if (savedDriverType) setSelectedDriverType(String(savedDriverType))
    if (savedMechanismType) setSelectedMechanismType(String(savedMechanismType))
    if (savedSupportLevel) setSelectedSupportLevel(String(savedSupportLevel))
    if (savedColorCapability) setSelectedColorCapability(String(savedColorCapability))
    if (savedPage) {
      const page = parseInt(savedPage, 10)
      setCurrentPage(Number.isFinite(page) && page > 0 ? page : 1)
    }
    if (savedItemsPerPage) {
      const savedValue = parseInt(savedItemsPerPage, 10)
      setItemsPerPage(Number.isFinite(savedValue) ? savedValue : 20)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(withBasePath("/foomatic-db/printersMap.json"))

        if (!response.ok) {
          throw new Error("The printer directory is temporarily unavailable.")
        }

        const data = await response.json()
        const printersWithStatus: PrinterSummary[] = []
        const manufacturerSet = new Set<string>()

        for (const printer of data.printers) {
          let status = (printer.status || calculateAccurateStatus(printer)) as string
          if (typeof status === "string" && status.toLowerCase() === "partial") {
            status = "Mostly"
          }

          printersWithStatus.push({
            ...printer,
            status,
          })

          if (printer.manufacturer) {
            manufacturerSet.add(printer.manufacturer)
          }
        }

        setPrinters(printersWithStatus)
        setManufacturers(Array.from(manufacturerSet).sort())
      } catch (err) {
        console.error("Failed to load printer data:", err)
        setError(
          err instanceof Error ? err.message : "The printer directory could not be loaded right now."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const driverTypes = useMemo(() => {
    const types = new Set<string>()
    printers.forEach((printer) => {
      types.add((printer.driverCount ?? 0) > 0 ? "Drivers available" : "No listed drivers")
    })
    return Array.from(types).sort()
  }, [printers])

  const mechanismTypes = useMemo(() => {
    const types = new Set<string>()
    printers.forEach((printer) => {
      if (printer.type) {
        types.add(printer.type)
      }
    })
    return Array.from(types).sort()
  }, [printers])

  const supportLevels = useMemo(
    () => ["Perfect", "Mostly", "Unsupported", "Unknown"],
    []
  )

  const colorCapabilities = useMemo(
    () => ["color", "monochrome", "unknown"],
    []
  )

  const filteredPrinters = useMemo(() => {
    let result = printers

    if (selectedManufacturer !== "all") {
      result = result.filter((printer) => printer.manufacturer === selectedManufacturer)
    }

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase()
      result = result.filter(
        (printer) =>
          (printer.model && String(printer.model).toLowerCase().includes(queryLower)) ||
          (printer.manufacturer &&
            String(printer.manufacturer).toLowerCase().includes(queryLower))
      )
    }

    if (selectedDriverType !== "all") {
      result = result.filter((printer) =>
        selectedDriverType === "Drivers available"
          ? (printer.driverCount ?? 0) > 0
          : (printer.driverCount ?? 0) === 0
      )
    }

    if (selectedMechanismType !== "all") {
      result = result.filter((printer) => printer.type === selectedMechanismType)
    }

    if (selectedSupportLevel !== "all") {
      result = result.filter((printer) => printer.status === selectedSupportLevel)
    }

    if (selectedColorCapability !== "all") {
      result = result.filter((printer) => {
        const type = printer.type?.toLowerCase() || ""
        const model = typeof printer.model === "string" ? printer.model.toLowerCase() : ""

        if (selectedColorCapability === "color") {
          return type.includes("color") || model.includes("color")
        }

        if (selectedColorCapability === "monochrome") {
          return type.includes("mono") || type.includes("dot-matrix") || model.includes("mono")
        }

        return true
      })
    }

    return result
  }, [
    printers,
    searchQuery,
    selectedManufacturer,
    selectedDriverType,
    selectedMechanismType,
    selectedSupportLevel,
    selectedColorCapability,
  ])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredPrinters])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    localStorage.setItem(STORAGE_KEYS.SEARCH, String(searchQuery).trim())
    localStorage.setItem(STORAGE_KEYS.MANUFACTURER, selectedManufacturer)
    localStorage.setItem(STORAGE_KEYS.DRIVER_TYPE, selectedDriverType)
    localStorage.setItem(STORAGE_KEYS.MECHANISM_TYPE, selectedMechanismType)
    localStorage.setItem(STORAGE_KEYS.SUPPORT_LEVEL, selectedSupportLevel)
    localStorage.setItem(STORAGE_KEYS.COLOR_CAPABILITY, selectedColorCapability)
    localStorage.setItem(STORAGE_KEYS.PAGE, currentPage.toString())
    localStorage.setItem(STORAGE_KEYS.ITEMS_PER_PAGE, itemsPerPage.toString())
  }, [
    searchQuery,
    selectedManufacturer,
    selectedDriverType,
    selectedMechanismType,
    selectedSupportLevel,
    selectedColorCapability,
    currentPage,
    itemsPerPage,
  ])

  const resetFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedManufacturer("all")
    setSelectedDriverType("all")
    setSelectedMechanismType("all")
    setSelectedSupportLevel("all")
    setSelectedColorCapability("all")
    setCurrentPage(1)
    setItemsPerPage(20)

    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key)
      })
    }
  }, [])

  const totalPages = useMemo(() => {
    if (itemsPerPage === -1) {
      return 1
    }
    return Math.ceil(filteredPrinters.length / itemsPerPage)
  }, [filteredPrinters.length, itemsPerPage])

  const displayedPrinters = useMemo(() => {
    if (itemsPerPage === -1) {
      return filteredPrinters
    }

    const startIndex = Math.max(0, (currentPage - 1) * itemsPerPage)
    const endIndex = startIndex + itemsPerPage
    return filteredPrinters.slice(startIndex, endIndex)
  }, [filteredPrinters, currentPage, itemsPerPage])

  const startIndex = useMemo(
    () => (itemsPerPage === -1 ? 0 : Math.max(0, (currentPage - 1) * itemsPerPage)),
    [currentPage, itemsPerPage]
  )

  const endIndex = useMemo(
    () =>
      itemsPerPage === -1
        ? filteredPrinters.length
        : Math.min(startIndex + itemsPerPage, filteredPrinters.length),
    [filteredPrinters.length, itemsPerPage, startIndex]
  )

  useEffect(() => {
    if (itemsPerPage === -1) {
      setCurrentPage(1)
      return
    }

    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [currentPage, itemsPerPage, totalPages])

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages]
  )

  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 7

    if (totalPages <= maxVisiblePages) {
      for (let index = 1; index <= totalPages; index += 1) {
        pages.push(index)
      }
      return pages
    }

    if (currentPage <= 4) {
      for (let index = 1; index <= 5; index += 1) {
        pages.push(index)
      }
      pages.push("...", totalPages)
      return pages
    }

    if (currentPage >= totalPages - 3) {
      pages.push(1, "...")
      for (let index = totalPages - 4; index <= totalPages; index += 1) {
        pages.push(index)
      }
      return pages
    }

    pages.push(1, "...")
    for (let index = currentPage - 1; index <= currentPage + 1; index += 1) {
      pages.push(index)
    }
    pages.push("...", totalPages)
    return pages
  }, [currentPage, totalPages])

  return (
    <main className="min-h-screen bg-background pt-6 text-foreground">
      <section className="relative min-h-[48vh] overflow-hidden border-b border-border/60 flex items-center">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/80" />
        <div className="hero-glow hidden dark:block" />
        <div className="hero-glow-blue hidden dark:block" />
        <div className="grid-pattern absolute inset-0" />

        <FoomaticPageSection className="relative py-16 sm:py-20">
          <div className="max-w-4xl">
            <FoomaticHeroPill>
              OpenPrinting Foomatic database
            </FoomaticHeroPill>

            <h1 className="mt-6 text-5xl font-bold tracking-tight leading-[0.98] sm:text-6xl lg:text-7xl">
              <span className="text-neutral-950 dark:hidden">Foomatic</span>
              <span className="hidden text-gradient-foreground dark:inline">Foomatic</span>
              <span className="block text-gradient-blue">Printer Lookup</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 dark:text-neutral-400 md:text-lg">
              Find support information for legacy printers, review available drivers, and open PPD
              files for closer inspection.
            </p>
          </div>
        </FoomaticPageSection>
      </section>

      <FoomaticPageSection className="space-y-10 py-10 sm:py-12">
        <PrinterSearch
          manufacturers={manufacturers}
          driverTypes={driverTypes}
          mechanismTypes={mechanismTypes}
          supportLevels={supportLevels}
          colorCapabilities={colorCapabilities}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onFilterManufacturer={setSelectedManufacturer}
          onFilterDriverType={setSelectedDriverType}
          onFilterMechanismType={setSelectedMechanismType}
          onFilterSupportLevel={setSelectedSupportLevel}
          onFilterColorCapability={setSelectedColorCapability}
          selectedManufacturer={selectedManufacturer}
          selectedDriverType={selectedDriverType}
          selectedMechanismType={selectedMechanismType}
          selectedSupportLevel={selectedSupportLevel}
          selectedColorCapability={selectedColorCapability}
          onReset={resetFilters}
        />

        {error ? (
          <FoomaticCard className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-destructive">
              <PrinterIcon className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">Unable to load the printer directory</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {error || "Please try again in a moment."}
            </p>
          </FoomaticCard>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : displayedPrinters.length > 0 ? (
          <div className="space-y-8">
            <PaginationControls
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              filteredLength={filteredPrinters.length}
            />

            <Printers printers={displayedPrinters} />

            {totalPages > 1 ? (
              <FoomaticCard className="space-y-6 p-6" role="navigation" aria-label="Pagination">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? `Results for "${searchQuery}"` : "Browsing all printer models"}
                    {selectedManufacturer !== "all" ? ` in ${selectedManufacturer}` : ""}
                  </p>
                </div>

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
                        <span
                          key={`${page}-${index}`}
                          className="px-2 text-sm text-muted-foreground"
                        >
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
              <PrinterIcon className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">No matching printers found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Try a different model name, broaden your filters, or clear the current search to see more results.
            </p>
          </FoomaticCard>
        )}
      </FoomaticPageSection>
      <div className="section-divider mx-auto mt-8 max-w-6xl" />
    </main>
  )
}
