import { MarkdownRenderer } from "./markdown-renderer"
import { TableOfContents } from "./table-of-contents"

export function shouldShowToc(data: Record<string, unknown>): boolean {
  return data.toc === true || String(data.toc) === "true"
}

interface ContentWithTocProps {
  content: string
  data: Record<string, unknown>
  showMeta?: boolean
  noCard?: boolean
}

export function ContentWithToc({
  content,
  data,
  showMeta = false,
  noCard = true,
}: ContentWithTocProps) {
  if (!shouldShowToc(data)) {
    return <MarkdownRenderer content={content} showMeta={showMeta} noCard={noCard} />
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <div className="lg:hidden w-full">
        <TableOfContents content={content} />
      </div>
      <div className="w-full lg:flex-1 lg:min-w-0">
        <MarkdownRenderer content={content} showMeta={showMeta} noCard={noCard} />
      </div>
      <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-24 self-start">
        <TableOfContents content={content} />
      </aside>
    </div>
  )
}
