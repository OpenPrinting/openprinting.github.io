"use client"

import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import Image from "next/image"
import { getImageSrc } from "@/lib/utils"
import TeaserImage from "@/components/teaser-image"

export type NewsCardPost = {
  title: string
  author: string
  authorImage?: string
  date: string
  excerpt: string
  slug: string
  teaserImage?: string
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function NewsCard({ item }: { item: NewsCardPost }) {
  return (
    <Link
      href={item.slug}
      prefetch={false}
      className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
    >
      <div className="relative h-32 overflow-hidden border-b border-border/60 bg-accent/30 sm:h-36">
        {item.teaserImage ? (
          <TeaserImage
            src={getImageSrc(item.teaserImage)}
            alt={item.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200/35 dark:bg-slate-900/35">
            <div className="relative h-12 w-12 opacity-20 dark:opacity-25">
              <Image
                src={getImageSrc(`/openprinting.png`)}
                alt=""
                fill
                aria-hidden="true"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            {item.authorImage ? (
              <div className="rounded-full overflow-hidden w-4 h-4 border border-border/50">
                <Image
                  src={getImageSrc(item.authorImage)}
                  alt={item.author}
                  width={16}
                  height={16}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <User className="w-3 h-3" />
            )}
            {item.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(item.date)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read more
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  )
}
