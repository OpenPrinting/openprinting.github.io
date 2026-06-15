"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath;

interface PrinterEntry {
  model: string
  airprt: string
  ippeve: string
}

function getMake(model: string) {
  return model.split(" ")[0]
}

const PAGE_SIZE = 25

export default function PrintersPage() {
  const [printers, setPrinters] = useState<PrinterEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`${basePath}/assets/json/driverless.json`)
      .then((r) => r.json())
      .then((data: PrinterEntry[]) => {
        setPrinters(data.filter((p) => p.model !== "_dummy_"))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const makes = useMemo(() => {
    const set = new Set(printers.map((p) => getMake(p.model)))
    return Array.from(set).sort()
  }, [printers])

  const filtered = useMemo(() => {
    return printers.filter((p) => {
      const matchesQuery = !query.trim() || p.model.toLowerCase().includes(query.toLowerCase())
      const matchesMake = !selectedMake || getMake(p.model) === selectedMake
      return matchesQuery && matchesMake
    })
  }, [printers, query, selectedMake])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setPage(1)
  }

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMake(e.target.value)
    setPage(1)
  }

  const pageNumbers = useMemo(() => {
    const delta = 2
    const range: (number | "...")[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i)
      } else if (range[range.length - 1] !== "...") {
        range.push("...")
      }
    }
    return range
  }, [totalPages, currentPage])

  return (
    <>
      <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('${basePath}/ipp-everywhere.png')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-zinc-900/90" aria-hidden />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Driverless Printer</h1>
          <p className="text-xl text-white/80">
            Browse printers that work out of the box with AirPrint™ and IPP Everywhere™.
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-background text-foreground pt-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground mb-8 max-w-3xl">
            This page shows printers that will work without any additional software because they
            support the{" "}
            <a href="https://support.apple.com/en-us/HT201311" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              AirPrint™
            </a>{" "}
            and/or{" "}
            <a href="https://www.pwg.org/ipp/everywhere.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              IPP Everywhere™
            </a>{" "}
            standards for driverless printing. These printers also often support{" "}
            <a href="https://mopria.org/certified-products" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Mopria®
            </a>{" "}
            as used on Android OS and Microsoft Windows®, and{" "}
            <a href="https://www.wi-fi.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Wi-Fi Direct Print Services
            </a>{" "}
            for printing directly via Wi-Fi.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search by model name…"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={selectedMake}
              onChange={handleMakeChange}
              className="py-2 pl-3 pr-8 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All Makes</option>
              {makes.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {loading ? "Loading…" : `${filtered.length.toLocaleString()} result${filtered.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Model</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Standards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-10 text-center text-muted-foreground">
                      Loading printer list…
                    </td>
                  </tr>
                ) : pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-10 text-center text-muted-foreground">
                      No printers found matching &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((printer, i) => {
                    const standards = [
                      printer.airprt === "1" && "AirPrint",
                      printer.ippeve === "1" && "IPP Everywhere",
                    ].filter(Boolean).join(", ")
                    return (
                      <tr key={i} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3">{printer.model}</td>
                        <td className="px-4 py-3 text-muted-foreground">{standards || "—"}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {pageNumbers.map((n, i) =>
                n === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1 text-muted-foreground select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`min-w-[2.25rem] px-3 py-1.5 rounded-md border text-sm transition-colors ${
                      n === currentPage
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()} printers
            </p>
          )}
        </div>
      </main>
    </>
  )
}
