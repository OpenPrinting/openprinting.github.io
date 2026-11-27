"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import SponsorLogo from "@/components/sponsor-logo"
import { useActiveSponsors } from "@/components/use-active-sponsors"
import type { Sponsor } from "@/lib/sponsors"

interface Props {
  /** Ranked, highest first. */
  sponsors: Sponsor[]
  max: number
}

export default function SponsorsStripList({ sponsors, max }: Props) {
  const shown = useActiveSponsors(sponsors).slice(0, max)

  if (shown.length === 0) return null

  return (
    <section aria-label="Sponsors" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
        <Link
          href="/sponsors"
          className="group flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left"
          aria-label="Our sponsors, and how to become one"
        >
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-8">
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              Sponsored by
            </span>

            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {shown.map((sponsor) => (
                <li key={sponsor.name} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                  <SponsorLogo
                    sponsor={sponsor}
                    height={32}
                    maxWidth="min(220px, 72vw)"
                    className="opacity-90 transition-opacity group-hover:opacity-100"
                  />
                  <span className="flex flex-col items-center gap-0.5 sm:items-start">
                    {sponsor.logo && !sponsor.logoHasName && (
                      <span className="text-xs font-medium text-foreground">{sponsor.name}</span>
                    )}
                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {sponsor.tierName}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            Become a sponsor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  )
}
