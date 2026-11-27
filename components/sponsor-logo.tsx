import Image from "next/image"

import type { Sponsor } from "@/lib/sponsors"
import { cn, getAssetPath } from "@/lib/utils"

interface Props {
  sponsor: Sponsor
  /** Rendered logo height in pixels; width follows the image's aspect ratio. */
  height: number
  /** Cap on the rendered width, so very wide logos don't dominate. */
  maxWidth?: number | string
  className?: string
}

/**
 * A sponsor's logo, with its dark-mode variant (another image, or the same one
 * inverted). Falls back to the sponsor's name when there is no logo.
 */
export default function SponsorLogo({ sponsor, height, maxWidth = "100%", className }: Props) {
  if (!sponsor.logo) {
    return (
      <span
        className={cn("font-semibold text-foreground", className)}
        style={{ fontSize: Math.max(14, Math.round(height * 0.45)) }}
      >
        {sponsor.name}
      </span>
    )
  }

  // width/height 0 + CSS lets the browser keep the logo's own aspect ratio;
  // images are unoptimized in this static export anyway.
  const style = { height, width: "auto", maxWidth }
  const common = "object-contain"

  if (sponsor.logoDark) {
    return (
      <>
        <Image
          src={getAssetPath(sponsor.logo)}
          alt={sponsor.name}
          width={0}
          height={0}
          className={cn(common, "dark:hidden", className)}
          style={style}
        />
        <Image
          src={getAssetPath(sponsor.logoDark)}
          alt={sponsor.name}
          width={0}
          height={0}
          className={cn(common, "hidden dark:block", className)}
          style={style}
        />
      </>
    )
  }

  return (
    <Image
      src={getAssetPath(sponsor.logo)}
      alt={sponsor.name}
      width={0}
      height={0}
      className={cn(common, sponsor.invertInDark && "dark:brightness-0 dark:invert", className)}
      style={style}
    />
  )
}
