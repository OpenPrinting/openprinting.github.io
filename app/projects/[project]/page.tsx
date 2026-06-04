import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export const dynamic = "force-static"
export const dynamicParams = false

const PROJECTS_DIR = path.join(process.cwd(), "contents", "projects")

export async function generateStaticParams() {
  const files = await fs.readdir(PROJECTS_DIR)
  return files
    .filter((f) => f.endsWith(".md"))
    .map((file) => ({
      project: file.replace(/\.md$/, ""),
    }))
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params

  const filePath = path.join(PROJECTS_DIR, `${project}.md`)
  const raw = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(raw)

  if (typeof data.redirect === "string") {
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`0; url=${data.redirect}`} />
          <link rel="canonical" href={data.redirect} />
        </head>
        <body className="bg-background text-foreground flex items-center justify-center min-h-screen">
          <p>
            Redirecting to{" "}
            <a href={data.redirect} className="text-primary underline">
              {data.redirect}
            </a>
            …
          </p>
        </body>
      </html>
    )
  }

  const title =
    typeof data.title === "string"
      ? data.title
      : project.replace(/^\d+-/, "").replace(/-/g, " ")

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
