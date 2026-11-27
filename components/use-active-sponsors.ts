"use client"

import { useEffect, useState } from "react"

import { isActive, type Sponsor } from "@/lib/sponsors"

/**
 * The site is a static export and is rebuilt only on pushes and once a week,
 * so the build-time expiry filter can be up to a week stale. This re-checks
 * the expiry dates in the browser after hydration.
 */
export function useActiveSponsors(sponsors: Sponsor[]): Sponsor[] {
  const [active, setActive] = useState(sponsors)
  useEffect(() => {
    const filtered = sponsors.filter((s) => isActive(s))
    if (filtered.length !== sponsors.length) setActive(filtered)
  }, [sponsors])
  return active
}
