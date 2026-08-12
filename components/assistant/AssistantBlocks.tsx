"use client"

// Renders the assistant's typed ResponsePlan blocks. Everything here is plain
// React over typed data - user text and data fields are rendered as text
// nodes (React escapes them), links are built exclusively by the canonical
// printerHref/driverHref helpers, and no HTML string is ever injected.
//
// Link/accent colour inside the assistant is the site's blue family
// (text-gradient-blue et al.) rather than --primary, which is near-white in
// dark mode and would not read as a link there.

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FoomaticBadge, FoomaticCard, FoomaticStatusBadge } from "@/components/foomatic/shared"
import { driverHref, printerHref } from "@/lib/foomatic/routes"
import type { ResponseBlock } from "@/lib/assistant/types"

// Same tone mapping as RecommendedPrintersSection.tsx: tier wording and
// thresholds live in lib/foomatic/scoring.ts next to the model they describe.
const TONE_CLASSES: Record<string, string> = {
  high: "text-emerald-700 dark:text-emerald-400",
  good: "text-sky-700 dark:text-sky-400",
  moderate: "text-amber-700 dark:text-amber-400",
  limited: "text-muted-foreground",
}

const LINK_CLASSES =
  "inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-blue-400"

interface BlockProps {
  block: ResponseBlock
  onAsk: (query: string) => void
  busy: boolean
}

export function AssistantBlock({ block, onAsk, busy }: BlockProps) {
  switch (block.kind) {
    case "text":
      return <p className="text-sm leading-relaxed text-foreground">{block.text}</p>

    case "list":
      return (
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{block.title}</p>
          <ul className="list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-foreground">
            {block.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )

    case "chips":
      return (
        <div className="flex flex-wrap gap-1.5">
          {block.chips.map(chip => (
            <button
              key={chip.label + chip.query}
              type="button"
              disabled={busy}
              onClick={() => onAsk(chip.query)}
              className="min-h-[2.25rem] max-w-full rounded-full border border-border bg-background px-3.5 py-1.5 text-left text-xs font-medium leading-snug text-foreground transition-colors hover:border-blue-500/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )

    case "printer-cards":
      return (
        <ul className="space-y-2" aria-label="Printer results">
          {block.printers.map(card => {
            const name = `${card.manufacturer} ${card.model}`.trim() || card.id
            return (
              <li key={card.id}>
                <FoomaticCard className="p-3 transition-colors hover:border-blue-500/40">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {card.manufacturer && (
                        <p className="text-xs text-muted-foreground">{card.manufacturer}</p>
                      )}
                      <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                        {card.model || card.id}
                      </p>
                    </div>
                    {card.score !== undefined && card.tierLabel && (
                      <div className="shrink-0 text-right">
                        <p className={`text-xs font-medium ${TONE_CLASSES[card.tierTone ?? "limited"]}`}>
                          {card.tierLabel}
                        </p>
                        <p className="text-xs text-muted-foreground">{Math.round(card.score * 100)}% similarity</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <FoomaticStatusBadge status={card.status} />
                    {card.type && (
                      <FoomaticBadge className="border-border text-muted-foreground">{card.type}</FoomaticBadge>
                    )}
                    {typeof card.driverCount === "number" && (
                      <FoomaticBadge className="border-border text-muted-foreground">
                        {card.driverCount} {card.driverCount === 1 ? "driver" : "drivers"}
                      </FoomaticBadge>
                    )}
                    {card.features?.map(feature => (
                      <FoomaticBadge
                        key={feature}
                        className="border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300"
                      >
                        {feature}
                      </FoomaticBadge>
                    ))}
                  </div>
                  <div className="mt-2.5">
                    <Link
                      href={printerHref(card.id, card.manufacturer)}
                      aria-label={`View ${name} printer page`}
                      className={LINK_CLASSES}
                    >
                      View printer
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </FoomaticCard>
              </li>
            )
          })}
        </ul>
      )

    case "driver-card": {
      const driver = block.driver
      return (
        <FoomaticCard className="p-3 transition-colors hover:border-blue-500/40">
          <p className="text-sm font-semibold tracking-tight text-foreground">{driver.name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {driver.supplier && (
              <FoomaticBadge className="border-border text-muted-foreground">{driver.supplier}</FoomaticBadge>
            )}
            {driver.type && (
              <FoomaticBadge className="border-border text-muted-foreground">{driver.type}</FoomaticBadge>
            )}
            <FoomaticBadge className="border-border text-muted-foreground">
              {driver.printerCount} {driver.printerCount === 1 ? "printer" : "printers"}
            </FoomaticBadge>
          </div>
          <div className="mt-2.5">
            <Link
              href={driverHref(driver.id)}
              aria-label={`View ${driver.name} driver page`}
              className={LINK_CLASSES}
            >
              View driver
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </FoomaticCard>
      )
    }

    case "comparison":
      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-xs">
            <caption className="sr-only">
              Comparison of {block.aName} and {block.bName}
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <th scope="col" className="px-2.5 py-2 font-medium text-muted-foreground" />
                <th scope="col" className="px-2.5 py-2 font-semibold text-foreground">{block.aName}</th>
                <th scope="col" className="px-2.5 py-2 font-semibold text-foreground">{block.bName}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={row.label} className={index < block.rows.length - 1 ? "border-b border-border/60" : ""}>
                  <th scope="row" className="px-2.5 py-2 text-left font-medium text-muted-foreground">
                    {row.label}
                  </th>
                  <td className="px-2.5 py-2 text-foreground">{row.a}</td>
                  <td className="px-2.5 py-2 text-foreground">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}
