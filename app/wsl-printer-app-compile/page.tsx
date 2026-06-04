import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import AuthorCard from "@/components/AuthorCard"
import { PageHero } from "@/components/page-hero"

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "wsl-printer-app-compile.md"
)

export default async function WSLPrinterAppCompilePage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Reviving an older printer with Ubuntu WSL and Printer Applications"
  
  const author = typeof data.author === "string" ? data.author : null

  return (
    <>
      <PageHero title={title} />

      <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {author && (
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <AuthorCard authorKey={author} />
                </div>
              </aside>
            )}
            
            <div className={author ? "lg:col-span-3" : "lg:col-span-4"}>
              <MarkdownRenderer content={raw} showMeta={false} noCard={true} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
