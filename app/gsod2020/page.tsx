import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowRight, Lightbulb } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { GsodHero } from "@/components/gsod-hero"

const MAIN_FILE = path.join(process.cwd(), "contents", "pages", "gsod2020.md")
const IDEAS_DIR = path.join(process.cwd(), "contents", "gsod", "gsod2020")

type Idea = {
  title: string
  slug: string
}

export default async function GSoD2020Page() {
  const raw = await fs.readFile(MAIN_FILE, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string"
      ? data.title
      : "Google Season of Docs 2020"

  const cleanedContent = content
    .replace(/<h1>\s*Project Ideas\s*<\/h1>\s*<div>\s*<\/div>\s*/gi, "")
    .replace(/^\s*#\s*Project Ideas\s*$/gim, "")

  const files = await fs.readdir(IDEAS_DIR)

  const ideas: Idea[] = []

  for (const file of files.sort()) {
    if (!file.endsWith(".md")) continue

    const filePath = path.join(IDEAS_DIR, file)
    const fileContent = await fs.readFile(filePath, "utf8")
    const { data } = matter(fileContent)

    ideas.push({
      title: typeof data.title === "string" ? data.title : file.replace(".md", ""),
      slug: file.replace(/\.md$/, ""),
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <GsodHero
        eyebrow="Program Archive"
        titlePrimary="GSoD"
        titleAccent="2020"
        subtitle={title}
      />

      <div className="section-divider mx-auto max-w-6xl" />

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <MarkdownRenderer content={cleanedContent} showMeta={false} noCard={true} />
          </div>
        </div>
      </section>

      {ideas.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">Project Ideas</h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {ideas.map((idea) => (
                <Link
                  key={idea.slug}
                  href={`/gsod2020/${idea.slug}/`}
                  className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-blue-600 dark:text-blue-400">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      Idea
                    </span>
                  </div>

                  <h3 className="mb-5 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {idea.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                    Open idea
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}