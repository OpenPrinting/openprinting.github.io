import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

/**
 * Renders the short Markdown blurbs from data/sponsors/*.yaml. Raw HTML is not
 * enabled here (unlike the page renderer), since these texts may come from
 * sponsors themselves.
 */
export default function SponsorAbout({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-a:text-blue-600 dark:prose-a:text-blue-400",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
