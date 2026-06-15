import fs from "fs"
import path from "path"
import matter from "gray-matter"
import authors from "@/data/authors"

const postsDirectory = path.join(process.cwd(), "contents/post")

export type PostMeta = {
  title: string
  author: string
  authorImage?: string
  date: string
  excerpt: string
  slug: string
  teaserImage?: string
}

type PostFrontmatter = Record<string, unknown> & {
  teaser_image?: string
}

export function getTeaserImage(meta: PostFrontmatter, content: string): string | undefined {

  if (meta.teaser_image) return meta.teaser_image

  const marked = content.match(/!\[.*?\]\((.*?)\).*?\{.*?teaser.*?\}/)
  if (marked) return marked[1]


  const firstImage = content.match(/!\[.*?\]\((.*?)\)/)
  if (firstImage) return firstImage[1]

  const yt = content.match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/)
  if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`

  return undefined;
}

export function getLatestPosts(limit = 3): PostMeta[] {
  const files = fs.readdirSync(postsDirectory)

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      const authorKey = typeof data.author === "string" ? data.author.trim() : undefined
      const authorDef = authorKey ? authors.find(a => a.key === authorKey) : undefined
      const authorImage = authorDef?.image
      const teaserImage = getTeaserImage(data, content)


      return {
        title: (data.title||"").replace(/\\/g,""),
        author: authorDef ? authorDef.name : data.author,
        authorImage,
        date: data.date,
        excerpt: data.excerpt,
        slug,
        teaserImage
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts.slice(0, limit)
}
