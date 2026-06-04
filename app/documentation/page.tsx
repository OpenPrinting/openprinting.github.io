import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const PAGE_MD = path.join(process.cwd(), "contents", "pages", "documentation.md")
const DOCS_DIR = path.join(process.cwd(), "contents", "documentation")

export default async function DocumentationPage() {
  const raw = await fs.readFile(PAGE_MD, "utf8")
  const { data, content } = matter(raw)

  const files = (await fs.readdir(DOCS_DIR))
    .filter((f) => f.endsWith(".md"))
    .sort()

  const docs = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DOCS_DIR, file), "utf8")
      const { data } = matter(raw)

      return {
        slug: file.replace(/\.md$/, ""),
        title:
          typeof data.title === "string"
            ? data.title
            : file.replace(/\.md$/, ""),
      }
    })
  )

  const hasContent = content != null && content.trim().length > 0

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {typeof data.title === "string" ? data.title : "Documentation"}
        </h1>

        {hasContent && (
          <div className="prose max-w-none mb-10">
            <MarkdownRenderer content={content} showMeta={false} />
          </div>
        )}

        <ul className="space-y-4">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/documentation/${doc.slug}`}
                prefetch={false}
                className="text-[#03A9F4] underline text-xl font-semibold hover:text-[#4dd0e1]"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
