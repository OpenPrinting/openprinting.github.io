import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import { getAssetPath } from "@/lib/utils";

type FeatureItem = {
  image_path: string
  alt: string
  title: string
  url: string
  btn_label?: string
}

const FILE_PATH = path.join(
  process.cwd(),
  "contents",
  "pages",
  "downloads.md"
)

export default async function DownloadsPage() {
  const raw = await fs.readFile(FILE_PATH, "utf8")
  const { data } = matter(raw)

  const title =
    typeof data.title === "string" ? data.title : "Downloads"

  const features: FeatureItem[] = Array.isArray(data.feature_row)
    ? data.feature_row
    : []

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-14">
          {title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((item, idx) => (
            <div key={idx}>
              <div className="bg-muted rounded-xl w-full h-[260px] flex items-center justify-center mb-6">
                <Image
                  src={getAssetPath(item.image_path)}
                  alt={item.alt}
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-sky-500 text-sky-600 dark:text-sky-400 px-6 py-2 rounded-md hover:bg-sky-500 hover:text-white transition"
              >
                {item.btn_label ?? "Download"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
