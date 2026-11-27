"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import SponsorAbout from "@/components/sponsor-about"
import SponsorLogo from "@/components/sponsor-logo"
import { isActive, pickWeighted, type Sponsor, type Tier } from "@/lib/sponsors"
import { cn } from "@/lib/utils"

interface Props {
  sponsors: Sponsor[]
  tiers: Pick<Tier, "key" | "weight">[]
  className?: string
}

/**
 * One randomly chosen sponsor, shown under the author box on blog posts.
 * The pick happens in the browser (on every page view, not once per build),
 * with each sponsor's chance proportional to its tier's weight.
 */
export default function SponsorBox({ sponsors, tiers, className }: Props) {
  const [sponsor, setSponsor] = useState<Sponsor>()

  useEffect(() => {
    setSponsor(pickWeighted(sponsors.filter((s) => isActive(s)), tiers))
  }, [sponsors, tiers])

  if (!sponsor) return null

  const logo = <SponsorLogo sponsor={sponsor} height={40} maxWidth={200} />

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Sponsor
        </span>
        <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {sponsor.tierName}
        </span>
      </div>

      {sponsor.url ? (
        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="inline-block">
          {logo}
        </a>
      ) : (
        logo
      )}

      {sponsor.logo && !sponsor.logoHasName && <p className="mt-2 text-sm font-medium text-foreground">{sponsor.name}</p>}

      {sponsor.about && (
        <SponsorAbout markdown={sponsor.about} className="mt-1 text-muted-foreground [&_p]:line-clamp-4" />
      )}

      <Link href="/sponsors" className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
        Become a sponsor →
      </Link>
    </div>
  )
}
