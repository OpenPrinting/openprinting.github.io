import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeRaw from 'rehype-raw'
import readingTime from "reading-time"
import "highlight.js/styles/github-dark.css"
import bash from "highlight.js/lib/languages/bash"
import matter from "gray-matter"
import { Clock } from 'lucide-react';

interface MarkdownRendererProps {
  content: string,
  showMeta?: boolean
  /** When true, no card wrapper (flat on page background, e.g. About Us) */
  noCard?: boolean
}

export interface Metadata {
  title?: string
  layout?: string
  toc?: boolean
  toc_sticky?: boolean
  author?: string
  excerpt?: string
  [key: string]: unknown
}

export function MarkdownRenderer({ content, showMeta = true, noCard = false }: MarkdownRendererProps) {
  const { data, content: markdownContent } = matter(content)
  const metadata: Metadata = data
  const stats = readingTime(markdownContent)

  return (
    <div className={noCard ? "max-w-4xl mx-auto" : "p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto bg-card border border-border"}>
      {showMeta && (
        <div className="mb-4 md:mb-6">
          {metadata.title && (
            <h1 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 text-card-foreground">
              {metadata.title}
            </h1>
          )}
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            <Clock size={16} />
            <span>{Math.ceil(stats.minutes)} minute read</span>
          </div>
        </div>
      )}
      <div className="flex">
        <div className={`prose prose-neutral dark:prose-invert max-w-none w-full ${noCard ? "text-foreground" : "text-card-foreground"}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              [rehypeHighlight, { languages: { bash }, detect: true, ignoreMissing: true }],
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              // @ts-expect-error: TypeScript does not recognize the code component props
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline ? (
                  <code className={`${className || ""} ${!match ? "language-bash" : ""} rounded-md`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
