import SponsorsStripList from "@/components/sponsors-strip-list"
import { getSponsorData } from "@/lib/load-sponsors"

/** How many sponsors the front page strip shows at most. */
const STRIP_SIZE = 4

export default function SponsorsStrip() {
  const { tiers, sponsors } = getSponsorData()
  const frontPageTiers = new Set(tiers.filter((t) => t.frontPage).map((t) => t.key))
  const eligible = sponsors.filter((s) => frontPageTiers.has(s.tier))

  if (eligible.length === 0) return null

  return <SponsorsStripList sponsors={eligible} max={STRIP_SIZE} />
}
