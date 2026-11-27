"use client"

import SponsorAbout from "@/components/sponsor-about"
import SponsorLogo from "@/components/sponsor-logo"
import { useActiveSponsors } from "@/components/use-active-sponsors"
import type { Sponsor, Tier } from "@/lib/sponsors"

interface Props {
  tiers: Tier[]
  /** Ranked, highest first. */
  sponsors: Sponsor[]
}

/** All current sponsors on /sponsors, one section per tier, bigger logos for higher tiers. */
export default function SponsorsDirectory({ tiers, sponsors }: Props) {
  const active = useActiveSponsors(sponsors)

  const sections = tiers
    .map((tier) => ({ tier, members: active.filter((s) => s.tier === tier.key) }))
    .filter((section) => section.members.length > 0)

  if (sections.length === 0) {
    return (
      <p className="text-muted-foreground">
        We don&apos;t have any sponsors listed yet. Yours could be the first!
      </p>
    )
  }

  let lastGroup: string | undefined

  return (
    <div className="space-y-12">
      {sections.map(({ tier, members }) => {
        const showGroup = tier.group !== lastGroup
        lastGroup = tier.group
        const compact = tier.logoHeight < 48
        return (
          <section key={tier.key} aria-labelledby={`tier-${tier.key}`}>
            {showGroup && (
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {tier.group}
              </p>
            )}
            <h3 id={`tier-${tier.key}`} className="mb-5 text-2xl font-bold tracking-tight">
              {tier.name}
            </h3>
            <ul className={compact ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-6 md:grid-cols-2"}>
              {members.map((sponsor) => {
                const logo = (
                  <SponsorLogo
                    sponsor={sponsor}
                    height={tier.logoHeight}
                    maxWidth={`min(100%, ${tier.logoHeight * 5}px)`}
                  />
                )
                return (
                  <li
                    key={sponsor.name}
                    className={`flex flex-col rounded-xl border border-border bg-card ${compact ? "p-4" : "p-6"} ${
                      !compact && members.length === 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="flex min-h-[1px] items-center">
                      {sponsor.url ? (
                        <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                    </div>
                    {sponsor.logo && !sponsor.logoHasName && (
                      <p className="mt-3 font-semibold text-foreground">{sponsor.name}</p>
                    )}
                    {sponsor.about && (
                      <SponsorAbout markdown={sponsor.about} className="mt-1 text-muted-foreground" />
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
