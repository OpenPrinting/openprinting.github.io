import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { getAssetPath } from "@/lib/utils";

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "driverless.md"
)

const driverlessNavItems = [
  { name: "Introduction to Driverless Printing", href: "#introduction" },
  { name: "Standards And their PDLS", href: "#standards" },
  { name: "Workflow of Driverless Printing", href: "#workflow" },
]

export default async function DriverlessPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data, content } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Driverless Printing"

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg overflow-hidden border border-border">
              <div className="relative w-full h-48">
                <Image
                  src={getAssetPath("/assets/images/ipp-everywhere.png")}
                  alt="Driverless Printing"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-6 text-card-foreground">
                  DRIVERLESS PRINTING
                </h3>
                <nav className="space-y-4">
                  {driverlessNavItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              {title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <MarkdownRenderer content={content} showMeta={false} noCard={true} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
