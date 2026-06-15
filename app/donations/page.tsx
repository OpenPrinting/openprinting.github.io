import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PageHero } from "@/components/page-hero"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "donations.md"
)

export default async function DonationsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Donations"

  return (
    <>
      <PageHero title={title} />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
        </div>
      </main>
    </>
  );
}
