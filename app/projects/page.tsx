import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const PAGE_MD = path.join(process.cwd(), "contents", "pages", "projects.md")
const PROJECTS_DIR = path.join(process.cwd(), "contents", "projects")

export default async function ProjectsPage() {
  const raw = await fs.readFile(PAGE_MD, "utf8")
  const { data, content } = matter(raw)

  const files = (await fs.readdir(PROJECTS_DIR))
    .filter((f) => f.endsWith(".md"))
    .sort()

  const projects = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8")
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

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {typeof data.title === "string" ? data.title : "Projects"}
        </h1>

        <div className="prose max-w-none mb-10">
          <MarkdownRenderer content={content} showMeta={false} />
        </div>

        <h2 className="text-2xl font-bold mb-6">Project List</h2>

        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                prefetch={false}
                className="text-[#03A9F4] underline text-xl font-semibold hover:text-[#4dd0e1]"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
