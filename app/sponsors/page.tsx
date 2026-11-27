import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import { ContentWithToc } from "@/components/content-with-toc"
import { PageHero } from "@/components/page-hero"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import SponsorsDirectory from "@/components/sponsors-directory"
import SponsorshipTiers from "@/components/sponsorship-tiers"
import { siteConfig } from "@/config/site.config"
import { getSponsorData } from "@/lib/load-sponsors"
import { getSiteUrl } from "@/lib/site"

const FILE_PATH = path.join(process.cwd(), "contents", "pages", "sponsors.md")

export const metadata: Metadata = {
  title: "Sponsors & Supporters | OpenPrinting",
  description:
    "The organizations and supporters who sponsor OpenPrinting, and how to become a sponsor or make a donation.",
  alternates: { canonical: getSiteUrl("/sponsors") },
  openGraph: {
    title: "Sponsors & Supporters | OpenPrinting",
    description:
      "The organizations and supporters who sponsor OpenPrinting, and how to become a sponsor or make a donation.",
    url: getSiteUrl("/sponsors"),
    type: "website",
  },
}

export default async function SponsorsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title = typeof data.title === "string" ? data.title : "Sponsors & Supporters"
  const intro = typeof data.intro === "string" ? data.intro : ""
  const { tiers, sponsors } = getSponsorData()

  return (
    <>
      <PageHero title={title} />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {intro && <MarkdownRenderer content={intro} showMeta={false} noCard />}

          <section aria-labelledby="current-sponsors" className="mt-10">
            <h2 id="current-sponsors" className="mb-8 text-3xl font-bold tracking-tight">
              Current Sponsors
            </h2>
            <SponsorsDirectory tiers={tiers} sponsors={sponsors} />
          </section>

          <section aria-labelledby="sponsorship-tiers" className="mt-16">
            <h2 id="sponsorship-tiers" className="mb-6 text-3xl font-bold tracking-tight">
              Sponsorship Tiers
            </h2>
            <SponsorshipTiers tiers={tiers} signupUrl={siteConfig.destinations.openCollective} />
          </section>

          <div className="mt-16">
            <ContentWithToc content={content} data={data} />
          </div>
        </div>
      </main>
    </>
  )
}
