"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Mail, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import authors from "@/data/authors";
import { getAuthorImageSrc } from "@/lib/utils";

interface Props {
  authorKey: string;
  className?: string;
}

export default function AuthorCard({ authorKey, className }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: globalThis.MouseEvent | globalThis.TouchEvent) {
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

  const author = authors.find((a) => a.key === authorKey);

  if (!author) return null;

  const imgSrc = getAuthorImageSrc(author.image);

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 py-4">
        <div className="rounded-full overflow-hidden w-[52px] h-[52px] border border-border">
          <Image
            src={imgSrc}
            alt={author.name}
            width={52}
            height={52}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-foreground leading-tight tracking-tight">
            {author.name}
          </h2>
          {author.role && (
            <p className="text-[13px] text-muted-foreground mt-0.5">{author.role}</p>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-1.5 text-xs font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200"
          >
            Follow
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover rounded-lg shadow-xl border border-border py-1 z-50">
              {author.location && (
                <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-sm">{author.location}</span>
                </div>
              )}

              {author.email && (
                <a
                  href={author.email}
                  className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Mail size={14} className="text-muted-foreground" />
                  <span className="text-sm">Email</span>
                </a>
              )}

              {author.github && (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Github size={14} className="text-muted-foreground" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:block bg-inherit text-neutral-300 pt-2 px-6 pb-6 w-full max-w-[260px]",
          className
        )}
      >
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-center mb-6 w-[135px] h-[135px] relative">
            <div
              aria-hidden
              className="absolute rounded-full w-full h-full border-[0.5px] border-border [box-shadow:0_0_0_1px_rgba(255,255,255,0.05)]"
            />
            <div className="rounded-full overflow-hidden w-[120px] h-[120px] border border-border">
              <Image
                src={imgSrc}
                alt={author.name}
                width={120}
                height={120}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-foreground mb-2 pl-2">
            {author.name}
          </h2>

          {author.role && (
            <p className="text-sm text-muted-foreground mb-5 pl-2">
              {author.role}
            </p>
          )}

          {author.location && (
            <div className="flex items-center gap-3 text-muted-foreground mb-4 pl-2">
              <MapPin size={14} />
              <span className="text-sm">{author.location}</span>
            </div>
          )}

          <div className="flex flex-col items-start pl-2 gap-3">
            {author.email && (
              <a
                href={author.email}
                className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Mail size={16} />
                <span className="text-sm">Email</span>
              </a>
            )}

            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github size={16} />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
