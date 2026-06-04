import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { GsodHero } from "@/components/gsod-hero"

const IDEAS_DIR = path.join(process.cwd(), "contents", "gsod", "gsod2020")

async function getIdeaBySlug(slug: string) {
  const filePath = path.join(IDEAS_DIR, `${slug}.md`)

  try {
    const raw = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(raw)
    const title =
      typeof data.title === "string" ? data.title : slug.replace(/-/g, " ")

    return { title, content }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const files = await fs.readdir(IDEAS_DIR)
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }))
}

export default async function GSoD2020IdeaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const idea = await getIdeaBySlug(slug)

  if (!idea) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <GsodHero
        eyebrow="GSoD 2020"
        titlePrimary={idea.title}
        titleClassName="text-3xl font-bold tracking-tight leading-[1.1] md:text-4xl lg:text-5xl"
      />

      <div className="section-divider mx-auto max-w-6xl" />

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/gsod2020/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to GSoD 2020
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <MarkdownRenderer content={idea.content} showMeta={false} noCard={true} />
          </div>
        </div>
      </section>
    </main>
  )
}

