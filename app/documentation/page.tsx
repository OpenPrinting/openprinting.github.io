import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { ContentWithToc } from "@/components/content-with-toc"
import { ArrowRight, BookOpen, FileText, Package, Printer, ScanLine, Settings } from "lucide-react"

const PAGE_MD = path.join(process.cwd(), "contents", "pages", "documentation.md")
const DOCS_DIR = path.join(process.cwd(), "contents", "documentation")

const iconsMap = {
  "01-printer-application": Printer,
  "02-designing-printer-drivers": Settings,
  "03-designing-scanner-drivers": ScanLine,
  "04-packaging-drivers": Package,
  "05-User-Manual": BookOpen
} as const

const descriptionMap = {
  "01-printer-application":"Learn how printer applications work, why they replace traditional CUPS drivers and how they simplify Linux printing",
  "02-designing-printer-drivers": "A step-by-step tutorial to build, run, and test a basic printer driver",
  "03-designing-scanner-drivers": "Best practices and key steps for implementing SANE-compatible scanner drivers",
  "04-packaging-drivers": "Package your driver as a Snap and publish it to the Snap Store",
  "05-User-Manual": "Technical specifications, configuration keys, and command-line options for Printer Applications",
} as const

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
  <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-24">

      {/* Documentation header */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-black/5 bg-gray-50 dark:border-white/10 dark:bg-white/[0.02]">
            <FileText
              size={32}
              strokeWidth={1.5}
              className="text-[#03A9F4]"
            />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {typeof data.title === "string"
              ? data.title
              : "Documentation"}
          </h1>
        </div>

        {hasContent && (
          <div className="max-w-3xl text-muted-foreground">
            <ContentWithToc
              content={content}
              data={data}
              showMeta={false}
              noCard={false}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {docs.map((doc) => {
          const Icon =
            iconsMap[doc.slug as keyof typeof iconsMap] ?? FileText;

          const description =
            descriptionMap[
              doc.slug as keyof typeof descriptionMap
            ];

          return (
            <Link
              key={doc.slug}
              href={`/documentation/${doc.slug}`}
              prefetch={false}
              className="group flex min-h-[105px] items-center gap-6 rounded-2xl border border-black/5 bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-[#03A9F4]/30 hover:shadow-md dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none dark:hover:border-[#03A9F4]/30 dark:hover:bg-white/[0.035]"
            >
          
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-black/[0.06] transition-all duration-300 group-hover:border-[#03A9F4]/30 group-hover:bg-[#03A9F4]/5 dark:border-white/10 dark:bg-white/[0.04]">
                <Icon
                  size={27}
                  strokeWidth={1.6}
                  className="text-[#03A9F4] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {doc.title}
                </h2>

                {description && (
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/50 md:text-[15px]">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-[#03A9F4] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#03A9F4]/10 dark:bg-white/[0.05]">
                <ArrowRight size={20} />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  </main>
)
};