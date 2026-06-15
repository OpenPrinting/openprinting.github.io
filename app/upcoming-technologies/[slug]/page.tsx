import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import type { Metadata } from "next"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { getSiteUrl } from "@/lib/site"

export const dynamic = "force-static"
export const dynamicParams = false

const TECH_DIR = path.join(process.cwd(), "contents", "upcoming-technologies")

export async function generateStaticParams() {
  const files = await fs.readdir(TECH_DIR)
  return files
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }))
}

async function getDoc(slug: string) {
  const filePath = path.join(TECH_DIR, `${slug}.md`)
  const raw = await fs.readFile(filePath, "utf8")
  return matter(raw)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data, content } = await getDoc(slug)

  const title =
    typeof data.title === "string"
      ? data.title
      : slug.replace(/^\d+-/, "").replace(/-/g, " ")
  const description =
    typeof data.excerpt === "string" && data.excerpt.trim() !== ""
      ? data.excerpt.trim()
      : content.trim().split("\n")[0]?.slice(0, 200)
  const canonicalUrl = getSiteUrl(`/upcoming-technologies/${slug}`)

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
  }
}

export default async function UpcomingTechnologyDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data, content } = await getDoc(slug)

  const title =
    typeof data.title === "string"
      ? data.title
      : slug.replace(/^\d+-/, "").replace(/-/g, " ")

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>

        <div className="prose max-w-none">
          <MarkdownRenderer content={content} showMeta={false} />
        </div>
      </div>
    </main>
  )
}
