import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PageHero } from "@/components/page-hero"
import { getSiteUrl } from "@/lib/site"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "opportunity-open-source.md"
)

export const metadata: Metadata = {
  title: "Opportunity Open Source | OpenPrinting",
  description:
    "OpenPrinting's annual free and open source software conference in India — the mission, past editions, and the upcoming one.",
  alternates: { canonical: getSiteUrl("/opportunity-open-source/") },
  openGraph: {
    title: "Opportunity Open Source | OpenPrinting",
    description:
      "OpenPrinting's annual free and open source software conference in India.",
    url: getSiteUrl("/opportunity-open-source/"),
    type: "website",
  },
}

export default async function OpportunityOpenSourcePage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Opportunity Open Source"

  return (
    <>
      <PageHero
        title={title}
        description="OpenPrinting's annual free and open source software conference in India."
        image="/assets/images/oosc/oosc1.0/group-photo.jpg"
        imagePosition="center 30%"
        logo="/assets/images/oosc/oosc-logo.png"
      />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
        </div>
      </main>
    </>
  )
}
