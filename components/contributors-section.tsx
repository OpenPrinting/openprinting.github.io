"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Github, Globe, Linkedin } from "lucide-react"

import websiteContributors from "@/data/website-contributors"
import { getAssetPath } from "@/lib/utils"

export default function ContributorsSection({
  showHeading = true,
  revealImmediately = false,
}: {
  showHeading?: boolean
  revealImmediately?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const isInView = revealImmediately || inView

  if (websiteContributors.length === 0) return null

  return (
    <section ref={ref} className="relative pb-12 bg-background" id="contributors">
      <div className="max-w-6xl mx-auto px-6">
        {showHeading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">This Website's Hall of Fame</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Contributors
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
              Meet the people who built the new OpenPrinting website.
            </p>
          </motion.div>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {websiteContributors.map((contributor, index) => {
            const displayName = contributor.name
            const featured = Boolean(contributor.featured)
            return (
              <motion.div
                key={contributor.github}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group flex h-full flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
              >
                <span
                  className={`mb-3 inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-semibold ${
                    featured
                      ? "border-blue-500/40 bg-blue-500/15 text-blue-600 dark:text-blue-300"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {featured ? "Lead Developer and Mentor" : "Contributor"}
                </span>
                <Link
                  href={`https://github.com/${contributor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${displayName} on GitHub`}
                >
                  <Image
                    src={getAssetPath(contributor.image)}
                    alt={displayName}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <h3 className="mt-4 text-sm font-semibold text-foreground tracking-tight">
                  {displayName}
                </h3>
                {contributor.role ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{contributor.role}</p>
                ) : null}

                <div className="mt-auto flex items-center justify-center gap-1.5 pt-4">
                  <Link
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${displayName} on GitHub`}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                  {contributor.linkedin ? (
                    <Link
                      href={contributor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${displayName} on LinkedIn`}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  ) : null}
                  {contributor.website ? (
                    <Link
                      href={contributor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${displayName}'s website`}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Globe className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="section-divider mt-12 mx-auto max-w-6xl" />
    </section>
  )
}
