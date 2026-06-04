import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Image from "next/image"
import { Rss } from "lucide-react"
import OpenPrintingCard from "@/components/OpenPrintingCard"
import TeaserImage from "@/components/teaser-image"
import authors from "@/data/authors"
import { getAuthorImageSrc, getImageSrc } from "@/lib/utils"
import { getTeaserImage } from "@/lib/get-latest-posts"
import { siteConfig } from "@/config/site.config";

type Post = {
  slug: string
  title: string
  excerpt: string
  date: Date
  year: number
  readTime: string
  authorKey?: string
  authorName?: string
  authorImage?: string
  teaserImage?: string
  formattedDate: string
}

const POSTS_DIR = path.join(process.cwd(), "contents", "post")

export default async function NewsPage() {
  const files = await fs.readdir(POSTS_DIR)

  const posts: Post[] = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(
          path.join(POSTS_DIR, file),
          "utf8"
        )
        const { data, content } = matter(raw)
        const date = new Date(data.date ?? "1970-01-01")

        const authorKeyRaw = typeof data.author === "string" ? data.author.trim() : undefined;
        const authorDef = authorKeyRaw ? authors.find(a => a.key === authorKeyRaw) : undefined;

        let authorImage;
        if (authorDef) {
          authorImage = getAuthorImageSrc(authorDef.image);
        }

        return {
          slug: file.replace(/\.md$/, ""),
          title: typeof data.title === "string" ? data.title.replace(/\\/g, ""): file.replace(/\.md$/, ""),
          excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
          date,
          year: date.getFullYear(),
          readTime: typeof data.readTime === "string" ? data.readTime : "less than 1 minute read",
          authorKey: authorKeyRaw,
          authorName: authorDef ? authorDef.name : authorKeyRaw,
          authorImage,
          teaserImage: getTeaserImage(data, content),
          formattedDate: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }
      })
  )

  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  const postsByYear = posts.reduce<Record<number, Post[]>>(
    (acc, post) => {
      acc[post.year] = acc[post.year] || []
      acc[post.year].push(post)
      return acc
    },
    {}
  )

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main className="w-full min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-4 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-12 gap-6 sm:gap-10 items-start">
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-20 sm:top-24">
              <OpenPrintingCard />
            </div>
          </aside>

          <section className="col-span-12 lg:col-span-6">
            <div className="mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                News and Events
              </h1>
              <a
                href={siteConfig.destinations.monthlyCallMinutes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors break-all sm:break-normal"
              >
                Monthly Call Minutes
              </a>
              <a
                href={getImageSrc(siteConfig.urls.rssPath)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors ml-4"
                title="Subscribe via RSS"
              >
                <Rss className="w-4 h-4" aria-hidden="true" />
                RSS Feed
              </a>
              <div className="section-divider mt-6 sm:mt-8" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-3 sm:gap-y-4 mb-10 sm:mb-14">
              {years.map((year) => (
                <a
                  key={year}
                  href={`#year-${year}`}
                  className="flex justify-between items-center border-b border-border/60 pb-1 text-sm text-muted-foreground hover:text-foreground transition-colors min-w-0"
                >
                  <span>{year}</span>
                  <span className="text-xs text-muted-foreground">
                    {postsByYear[year].length}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-10 sm:space-y-16">
              {years.map((year) => (
                <section key={year} id={`year-${year}`} className="scroll-mt-20 sm:scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-muted-foreground">
                    {year}
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {postsByYear[year].map((post) => (
                      <article
                        key={post.slug}
                        className="rounded-xl border border-border/90 bg-card/50 transition-all duration-300 hover:border-foreground/20 card-glow"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {post.teaserImage && (
                            <div className="relative aspect-video overflow-hidden rounded-t-xl bg-accent/30 sm:mt-4 sm:ml-4 sm:w-56 sm:shrink-0 sm:self-start sm:rounded-xl md:w-64">
                              <TeaserImage
                                src={getImageSrc(post.teaserImage)}
                                alt={post.title}
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="min-w-0 flex-1 p-4 sm:p-6">
                            <Link
                              href={`/${post.slug}`}
                              prefetch={false}
                              className="text-base sm:text-lg md:text-xl font-semibold text-foreground hover:text-blue-400 transition-colors block break-words"
                            >
                              {post.title}
                            </Link>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 sm:mt-2.5 mb-2.5 sm:mb-3 flex-wrap">
                              {post.authorName && (
                                <>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {post.authorImage && (
                                      <div className="rounded-full overflow-hidden w-5 h-5 border border-border/50 shrink-0">
                                        <Image
                                          src={post.authorImage}
                                          alt={post.authorName}
                                          width={20}
                                          height={20}
                                          className="object-cover w-full h-full"
                                        />
                                      </div>
                                    )}
                                    <span className="font-medium text-foreground/80">{post.authorName}</span>
                                  </div>
                                  <span className="text-border/60 shrink-0">•</span>
                                </>
                              )}
                              <span className="shrink-0">{post.formattedDate}</span>
                              <span className="text-border/60 shrink-0">•</span>
                              <span className="flex items-center gap-1 shrink-0">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                  <path strokeWidth="2" d="M12 6v6l4 2" />
                                </svg>
                                {post.readTime}
                              </span>
                            </div>

                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <div className="hidden lg:block lg:col-span-3" />
        </div>
      </div>
    </main>
  )
}
