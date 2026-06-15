"use client"

import { useEffect, useState } from "react"

import { withBasePath } from "@/lib/foomatic/base-path"
import { resolveQuery, type QueryFormat } from "@/lib/foomatic/query-locator"

interface IndexPrinter {
  id: string
  make: string
  model: string
  commandsets: string[]
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function parseDeviceId(term: string): { mfg?: string; mdl?: string } {
  const mfg = /(?:MFG|MANUFACTURER):([^;]+)/i.exec(term)?.[1]?.trim()
  const mdl = /(?:MDL|MODEL):([^;]+)/i.exec(term)?.[1]?.trim()
  return { mfg, mdl }
}

function matchPrinters(index: IndexPrinter[], term: string): IndexPrinter[] {
  const { mfg, mdl } = parseDeviceId(term)
  if (mfg || mdl) {
    const nMfg = mfg ? normalize(mfg) : ""
    const nMdl = mdl ? normalize(mdl) : ""
    return index.filter((p) => {
      const okMake = !nMfg || normalize(p.make).includes(nMfg) || nMfg.includes(normalize(p.make))
      const okModel = !nMdl || normalize(`${p.make} ${p.model}`).includes(nMdl) || normalize(p.model).includes(nMdl)
      return okMake && okModel
    })
  }
  const nTerm = normalize(term)
  if (!nTerm) return []
  return index.filter((p) => normalize(`${p.make} ${p.model}`).includes(nTerm))
}

function printersToText(list: IndexPrinter[]): string {
  return list.map((p) => `printer/${p.id}`).join("\n") + "\n"
}

function printersToXml(list: IndexPrinter[]): string {
  const esc = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return (
    "<printers>\n" +
    list
      .map(
        (p) =>
          `  <printer id="printer/${esc(p.id)}">\n    <make>${esc(p.make)}</make>\n    <model>${esc(p.model)}</model>\n  </printer>`
      )
      .join("\n") +
    "\n</printers>\n"
  )
}

export default function QueryApiClient() {
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<string | null>(null)
  const [format, setFormat] = useState<QueryFormat>("text")

  useEffect(() => {
    let cancelled = false

    async function run() {
      const params = new URLSearchParams(window.location.search)
      const plan = resolveQuery(params)
      setFormat(plan.kind === "file" || plan.kind === "match" ? plan.format : "text")

      try {
        if (plan.kind === "papps") {
          setNotice(
            "The printer-applications query (papps=true) depends on live Printer Application output and is not available from the static database export."
          )
          setLoading(false)
          return
        }

        if (plan.kind === "unsupported") {
          setNotice(plan.message)
          setLoading(false)
          return
        }

        if (plan.kind === "file") {
          const res = await fetch(withBasePath(plan.url))
          if (!res.ok) throw new Error(`No results (${res.status}).`)
          const text = await res.text()
          if (!cancelled) {
            setBody(text)
            setLoading(false)
          }
          return
        }

        const indexRes = await fetch(withBasePath("/query/index.json"))
        if (!indexRes.ok) throw new Error("Query index unavailable.")
        const index = (await indexRes.json()).printers as IndexPrinter[]
        const matches = matchPrinters(index, plan.term)

        if (plan.target === "printers") {
          if (!cancelled) {
            setBody(plan.format === "xml" ? printersToXml(matches) : printersToText(matches))
            setLoading(false)
          }
          return
        }

        if (matches.length === 0) {
          if (!cancelled) {
            setBody(plan.format === "xml" ? "<drivers>\n</drivers>\n" : "\n")
            setLoading(false)
          }
          return
        }

        const best = matches[0]
        const driversRes = await fetch(
          withBasePath(`/query/drivers/${encodeURIComponent(best.id)}.${plan.format === "xml" ? "xml" : "txt"}`)
        )
        if (!driversRes.ok) throw new Error("No drivers found for the matched printer.")
        const text = await driversRes.text()
        if (!cancelled) {
          setBody(text)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setNotice(err instanceof Error ? err.message : "The query could not be processed.")
          setLoading(false)
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">OpenPrinting query</h1>
        <p className="text-sm text-muted-foreground">
          Machine-readable database query ({format === "xml" ? "XML" : "text"}). For
          scripts and automation, fetch the static endpoints under{" "}
          <code className="rounded bg-muted px-1">/query/</code> directly.
        </p>
        {loading ? (
          <p className="text-sm text-muted-foreground">Running query…</p>
        ) : notice ? (
          <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">{notice}</div>
        ) : (
          <pre className="max-h-[70vh] overflow-auto rounded-lg border border-border bg-muted/60 p-4 text-xs leading-5">
            {body}
          </pre>
        )}
      </div>
    </main>
  )
}
