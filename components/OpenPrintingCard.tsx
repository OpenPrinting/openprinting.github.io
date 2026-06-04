"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Github, Globe } from "lucide-react";
import Image from "next/image";
import { cn, getAssetPath } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";

interface Props {
  className?: string;
}

export default function OpenPrintingCard({ className }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 py-4">
        <div className="flex-1 min-w-0 flex flex-col items-center text-center">
          <div className="mb-3">
            <Image
              src={getAssetPath(siteConfig.brand.logoPath)}
              alt={`${siteConfig.brand.name} Logo`}
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-base font-semibold text-foreground leading-tight">
            {siteConfig.brand.name}
          </h2>
          <p className="text-[15px] text-muted-foreground mt-0.5">
            {siteConfig.brand.tagline}
          </p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded shadow-xl border border-border py-1 z-50">
              <div className="flex items-center gap-2 px-3 py-2 text-foreground">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm">{siteConfig.brand.organization}</span>
              </div>

              <a
                href={siteConfig.urls.canonicalOrigin}
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <Globe size={16} className="text-muted-foreground" />
                <span className="text-sm">Website</span>
              </a>

              <a
                href={siteConfig.destinations.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-muted"
              >
                <Github size={16} className="text-muted-foreground" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:block bg-card text-foreground pt-2 px-6 pb-6 w-full max-w-[260px] rounded-lg border border-border",
          className
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Image
              src={getAssetPath(siteConfig.brand.logoPath)}
              alt={`${siteConfig.brand.name} Logo`}
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-3">
            {siteConfig.brand.name}
          </h2>

          <p className="text-[15px] text-muted-foreground mb-5 pl-2">
            {siteConfig.brand.tagline}
          </p>

          <div className="flex items-center gap-3 text-muted-foreground mb-4 pl-2 self-start">
            <MapPin size={16} />
            <span className="text-sm">{siteConfig.brand.organization}</span>
          </div>

          <div className="flex flex-col items-start pl-2 gap-3 self-start">
            <a
              href={siteConfig.urls.canonicalOrigin}
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <Globe size={18} />
              <span className="text-sm">Website</span>
            </a>

            <a
              href={siteConfig.destinations.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
