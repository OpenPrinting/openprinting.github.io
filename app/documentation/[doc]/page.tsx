import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export const dynamic = "force-static"
export const dynamicParams = false

const DOCS_DIR = path.join(process.cwd(), "contents", "documentation")

export async function generateStaticParams() {
  const files = await fs.readdir(DOCS_DIR)
  return files
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({
      doc: file.replace(/\.md$/, ""),
    }))
}

export default async function DocumentationDetail({
  params,
}: {
  params: Promise<{ doc: string }>
}) {
  const { doc } = await params

  const filePath = path.join(DOCS_DIR, `${doc}.md`)
  const raw = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string"
      ? data.title
      : doc.replace(/^\d+-/, "").replace(/-/g, " ")

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {title}
        </h1>

        <div className="prose max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </main>
  )
}
