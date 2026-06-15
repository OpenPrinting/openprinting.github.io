import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PageHero } from "@/components/page-hero"
import { getSiteUrl } from "@/lib/site"

const FILE_PATH = path.join(process.cwd(), "contents", "pages", "sponsors.md")

export const metadata: Metadata = {
  title: "Sponsors & Supporters | OpenPrinting",
  description:
    "The organizations and supporters who sponsor OpenPrinting, and how to become a sponsor or make a donation.",
  alternates: { canonical: getSiteUrl("/sponsors/") },
  openGraph: {
    title: "Sponsors & Supporters | OpenPrinting",
    description:
      "The organizations and supporters who sponsor OpenPrinting, and how to become a sponsor or make a donation.",
    url: getSiteUrl("/sponsors/"),
    type: "website",
  },
}

export default async function SponsorsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title = typeof data.title === "string" ? data.title : "Sponsors & Supporters"

  return (
    <>
      <PageHero title={title} />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
        </div>
      </main>
    </>
  )
}
