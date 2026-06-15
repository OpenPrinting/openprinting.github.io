"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils";

type TeaserImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function TeaserImage({
  src,
  alt,
  className,
  priority,
}: TeaserImageProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200/35 dark:bg-slate-900/35">
        <div className="relative h-12 w-12 opacity-20 dark:opacity-25">
          <Image
            src={getAssetPath(siteConfig.brand.logoPath)}
            alt=""
            fill
            aria-hidden="true"
            className="object-contain"
          />
        </div>
      </div>

      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          className={`${className ?? ""} transition-opacity duration-300 ${hasLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : null}
    </>
  );
}
