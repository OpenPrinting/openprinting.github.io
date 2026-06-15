import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ArrowRight, FolderOpen, Users } from "lucide-react"
import { GsodHero } from "@/components/gsod-hero"

const FILE_PATH = path.join(process.cwd(), "contents", "pages", "gsod.md")

type SectionItem = {
  title: string
  href: string
}

type Section = {
  title: string
  items: SectionItem[]
}

function parseSections(content: string): Section[] {
  const lines = content.split(/\r?\n/)
  const sections: Section[] = []
  let currentSection: Section | null = null

  for (const line of lines) {
    const sectionMatch = /^##\s+(.*)$/.exec(line.trim())

    if (sectionMatch) {
      currentSection = {
        title: sectionMatch[1].trim(),
        items: [],
      }
      sections.push(currentSection)
      continue
    }

    const itemMatch = /^###\s+(?:\d+\.\s+)?\[(.+)\]\((.+)\)$/.exec(line.trim())

    if (itemMatch && currentSection) {
      currentSection.items.push({
        title: itemMatch[1].trim(),
        href: itemMatch[2].trim(),
      })
    }
  }

  return sections
}

function getSectionMeta(title: string) {
  if (title.toLowerCase().includes("students")) {
    return {
      eyebrow: "Browse Students",
      icon: Users,
      badge: "Students",
      action: "View page",
    }
  }

  return {
    eyebrow: "Browse Projects",
    icon: FolderOpen,
    badge: "Projects",
    action: "View page",
  }
}

export default async function GSoDPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "GSoD - OpenPrinting"
  const sections = parseSections(content)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <GsodHero
        eyebrow="Open Source Contributions"
        titlePrimary="Google Season"
        titleAccent="of Docs"
        subtitle={title}
      />

      <div className="section-divider mx-auto max-w-6xl" />

      {sections.map((section, index) => {
        const meta = getSectionMeta(section.title)
        const Icon = meta.icon

        return (
          <div key={section.title}>
            <section className="py-16">
              <div className="mx-auto max-w-6xl px-6">
                <div className="mb-10">
                  <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {meta.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {section.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {section.items.map((item) => (
                    <Link
                      key={`${section.title}-${item.href}`}
                      href={item.href}
                      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-blue-600 dark:text-blue-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {meta.badge}
                        </span>
                      </div>

                      <h3 className="mb-5 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-blue-400">
                        {meta.action}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {index < sections.length - 1 ? (
              <div className="section-divider mx-auto max-w-6xl" />
            ) : null}
          </div>
        )
      })}
    </main>
  )
}
