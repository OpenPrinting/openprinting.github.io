"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Loader2 } from "lucide-react"

import {
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticPageSection,
} from "@/components/foomatic/shared"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/foomatic/base-path"

function isValidPpdPath(path: string | null) {
  return Boolean(path && (path.startsWith("/ppd/") || path.startsWith("/ppds/")) && !path.includes(".."))
}

function getDownloadName(path: string) {
  const fileName = path.split("/").pop() ?? "printer.ppd"
  return fileName.endsWith(".ppd") ? fileName : `${fileName}.ppd`
}

export default function PpdViewerClient() {
  const searchParams = useSearchParams()
  const requestedPath = searchParams.get("path")
  const normalizedPath = useMemo(
    () => (isValidPpdPath(requestedPath) ? requestedPath : null),
    [requestedPath]
  )

  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPpd() {
      if (!normalizedPath) {
        setError("The selected PPD file could not be opened.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(withBasePath(normalizedPath))
        if (!response.ok) {
          throw new Error("The PPD file could not be loaded.")
        }

        const text = await response.text()
        setContent(text)
      } catch (err) {
        console.error("Failed to load PPD file:", err)
        setError(err instanceof Error ? err.message : "The PPD file could not be loaded.")
      } finally {
        setLoading(false)
      }
    }

    loadPpd()
  }, [normalizedPath])

  const downloadHref = normalizedPath ? withBasePath(normalizedPath) : "#"

  return (
    <main className="min-h-screen bg-background pt-24 text-foreground">
      <FoomaticPageSection className="space-y-8 py-10 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline" size="sm" className="gap-2" aria-label="Back to printer directory">
            <Link href="/foomatic">
              <ArrowLeft className="h-4 w-4" />
              Back to directory
            </Link>
          </Button>

          {normalizedPath && !loading && !error ? (
            <Button asChild className="gap-2" aria-label="Download PPD file">
              <a href={downloadHref} download={getDownloadName(normalizedPath)}>
                <Download className="h-4 w-4" />
                Download file
              </a>
            </Button>
          ) : null}
        </div>

        <section className="space-y-4">
          <FoomaticHeroPill>
            PPD file preview
          </FoomaticHeroPill>

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Review PPD contents</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              View the printer description file associated with this entry before downloading or using it.
            </p>
          </div>
        </section>

        <FoomaticCard className="overflow-hidden">
          <div className="border-b border-border/60 bg-accent/20 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Selected file
            </p>
            <p className="mt-2 break-all font-mono text-sm text-foreground">
              <code>{normalizedPath ?? requestedPath ?? "No PPD file selected"}</code>
            </p>
          </div>

          <div className="p-6" role="status" aria-live="polite">
            {loading ? (
              <div className="flex min-h-64 items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>Loading file preview...</span>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            ) : (
              <pre className="max-h-[70vh] overflow-auto rounded-xl border border-border bg-muted/70 p-4 text-sm leading-6 text-foreground">
                {content}
              </pre>
            )}
          </div>
        </FoomaticCard>
      </FoomaticPageSection>
    </main>
  )
}
