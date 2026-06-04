import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PageHero } from "@/components/page-hero"

const FILE_PATH = path.join(process.cwd(), "contents", "pages", "current.md")

export default async function CurrentPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Current Work"

  return (
    <>
      <PageHero title={title} description="What we are working on right now" />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 about-us-content">
          <MarkdownRenderer content={content} showMeta={false} noCard />
        </div>
      </main>
    </>
  )
}
