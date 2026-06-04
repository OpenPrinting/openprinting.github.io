import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"

const PAGE_MD = path.join(
  process.cwd(),
  "contents",
  "pages",
  "upcoming-technologies.md"
)
const TECH_DIR = path.join(process.cwd(), "contents", "upcoming-technologies")

export default async function UpcomingTechnologiesPage() {
  const raw = await fs.readFile(PAGE_MD, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string"
      ? data.title
      : "Upcoming Technologies in Printing from Linux"

  const files = (await fs.readdir(TECH_DIR))
    .filter((f) => f.endsWith(".md"))
    .sort()

  const technologies = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(TECH_DIR, file), "utf8")
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
    <>
      <PageHero title={title} />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Technologies</h2>

          <ul className="space-y-4">
            {technologies.map((tech) => (
              <li key={tech.slug}>
                <Link
                  href={`/upcoming-technologies/${tech.slug}`}
                  prefetch={false}
                  className="text-[#03A9F4] underline text-xl font-semibold hover:text-[#4dd0e1]"
                >
                  {tech.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
