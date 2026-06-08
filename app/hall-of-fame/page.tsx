import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"

import ContributorsSection from "@/components/contributors-section"
import { PageHero } from "@/components/page-hero"
import { siteConfig } from "@/config/site.config"
import { getSiteUrl } from "@/lib/site"

const title = "Hall of Fame | OpenPrinting"
const description =
  "The people who rebuilt the OpenPrinting website — the contributors behind the new static Next.js site."

const ANNOUNCEMENT_PATH = "/OpenPrinting-News-The-New-OpenPrinting-Website"

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: getSiteUrl("/hall-of-fame/") },
  openGraph: {
    title,
    description,
    url: getSiteUrl("/hall-of-fame/"),
    type: "website",
  },
}

export default function HallOfFamePage() {
  return (
    <>
      <PageHero
        title="Hall of Fame"
        description="The people who rebuilt the OpenPrinting website."
      />

      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-400">
              Website Contributors
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Built from the ground up by the community
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The OpenPrinting website was rebuilt from scratch as a fast, fully static
              site that is easier to contribute to and now hosts the printer and driver
              database directly. This page recognizes the contributors who made that
              rebuild happen — read the full story in the announcement post.
            </p>
            <div className="mt-8">
              <Link
                href={ANNOUNCEMENT_PATH}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Read the announcement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="pt-16 pb-4">
          <ContributorsSection showHeading={false} revealImmediately />
        </div>

        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Want to join them?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              OpenPrinting is an open-source community, and there is always more to do.
              Find out how to get involved, or browse the source on GitHub.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contribute"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                How to contribute
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.repo.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
