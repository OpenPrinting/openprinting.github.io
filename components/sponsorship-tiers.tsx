import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import SponsorAbout from "@/components/sponsor-about"
import type { Tier } from "@/lib/sponsors"
import { getAssetPath } from "@/lib/utils"

const fmt = new Intl.NumberFormat("en-US")

/** The tier table from data/sponsors/tiers.yaml, with a link to sign up. */
export default function SponsorshipTiers({ tiers, signupUrl }: { tiers: Tier[]; signupUrl: string }) {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <li key={tier.key} className="flex flex-col rounded-xl border border-border bg-card p-5">
            {tier.image && (
              <Image
                src={getAssetPath(tier.image)}
                alt=""
                width={0}
                height={0}
                className="mb-3 object-contain"
                style={{ height: 48, width: "auto" }}
              />
            )}
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {tier.group}
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight">{tier.name}</h3>
            <p className="mt-2 text-sm text-foreground">
              from <span className="font-semibold">{fmt.format(tier.annual)}</span> per year
              <span className="text-muted-foreground"> or {fmt.format(tier.monthly)} per month</span>
            </p>
            <p className="text-xs text-muted-foreground">EUR or USD</p>
            {tier.info && <SponsorAbout markdown={tier.info} className="mt-2 text-muted-foreground" />}
          </li>
        ))}
      </ul>

      <a
        href={signupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Sponsor us on Open Collective
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  )
}
