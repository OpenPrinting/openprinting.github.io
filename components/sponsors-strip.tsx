import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import sponsors from "@/data/sponsors"
import { getAssetPath } from "@/lib/utils"

const LOGO_ASPECT = 5754 / 548

export default function SponsorsStrip() {
  if (sponsors.length === 0) return null

  return (
    <section aria-label="Sponsors and supporters" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
        <Link
          href="/sponsors"
          className="group flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
          aria-label="Learn more about OpenPrinting sponsors and donations"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              Supported by
            </span>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {sponsors.map((sponsor) => {
                const width = sponsor.width ?? 180
                const height = Math.round(width / LOGO_ASPECT)
                return (
                  <li
                    key={sponsor.name}
                    className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
                  >
                    <Image
                      src={getAssetPath(sponsor.logo)}
                      alt={sponsor.name}
                      width={width}
                      height={height}
                      className="h-auto object-contain opacity-90 transition-opacity group-hover:opacity-100 dark:brightness-0 dark:invert"
                      style={{ width, maxWidth: "72vw" }}
                    />
                    {sponsor.level && (
                      <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {sponsor.level}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
            Sponsors &amp; donations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  )
}
