"use client";

import React, { useMemo, MouseEvent } from "react";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Node } from "unist";

interface TocEntry {
  value: string;
  url: string;
  depth: number;
}

interface TableOfContentsProps {
  content: string;
  isSticky?: boolean;
}

interface MdastNode extends Node {
  value?: string;
  depth?: number;
  children?: MdastNode[];
}

// Matches either a complete <hN ..>...</hN> pair or a lone opening/closing tag
const HEADING_PAIR_OR_TAG_REGEX =
  /<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>|<(\/?)h([1-6])\b([^>]*)>/gi;
const ID_ATTR_REGEX = /\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const TAG_REGEX = /<[^>]+>/g;

function stripTags(html: string): string {
  return html
    .replace(TAG_REGEX, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractId(attrs: string): string | undefined {
  const match = ID_ATTR_REGEX.exec(attrs);
  if (!match) return undefined;
  const id = (match[1] ?? match[2] ?? match[3] ?? "").trim();
  return id === "" ? undefined : id;
}

export function TableOfContents({ content, isSticky = false }: TableOfContentsProps) {
  const toc = useMemo(() => {
    const slugger = new GithubSlugger();
    const tocEntries: TocEntry[] = [];

    const tree = unified().use(remarkParse).parse(content) as MdastNode;

    // Raw HTML headings (e.g. <h2 id="introduction">) are mdast "html" nodes,
    // not "heading" nodes, and inline ones inside lists/paragraphs are split
    // into separate open-tag / text / close-tag siblings. Track a dangling
    // opening tag so both forms are captured in document order.
    let openHeading: { depth: number; id?: string; parts: string[] } | null =
      null;

    const flushOpenHeading = () => {
      if (!openHeading) return;
      const text = stripTags(openHeading.parts.join(" "));
      if (text !== "") {
        tocEntries.push({
          value: text,
          url: openHeading.id ?? slugger.slug(text),
          depth: openHeading.depth,
        });
      }
      openHeading = null;
    };

    const handleHtml = (html: string) => {
      HEADING_PAIR_OR_TAG_REGEX.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = HEADING_PAIR_OR_TAG_REGEX.exec(html)) !== null) {
        if (match[1]) {
          // complete pair
          flushOpenHeading();
          const text = stripTags(match[3]);
          if (text === "") continue;
          tocEntries.push({
            value: text,
            url: extractId(match[2]) ?? slugger.slug(text),
            depth: Number(match[1]),
          });
        } else {
          const isClosingTag = match[4] === "/";
          const depth = Number(match[5]);
          if (isClosingTag) {
            if (openHeading && openHeading.depth === depth) {
              flushOpenHeading();
            }
          } else {
            flushOpenHeading();
            openHeading = { depth, id: extractId(match[6]), parts: [] };
          }
        }
      }
    };

    const walk = (node: MdastNode) => {
      if (node.type === "heading") {
        flushOpenHeading();
        const text = toString(node);
        tocEntries.push({
          value: text,
          url: slugger.slug(text),
          depth: node.depth ?? 1,
        });
        return;
      }

      if (node.type === "html") {
        handleHtml(node.value ?? "");
        return;
      }

      if (!node.children) return;

      for (const child of node.children) {
        if (openHeading && child.type !== "html" && child.type !== "heading") {
          // text node between a split <hN> ... </hN>
          const text = toString(child).trim();
          if (text !== "") openHeading.parts.push(text);
          continue;
        }
        walk(child);
      }

      flushOpenHeading();
    };

    walk(tree);

    return tocEntries;
  }, [content]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault();

    if (typeof document === "undefined") return;

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(`[id="${url}"]`)
    );

    const target = candidates.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    if (!target) return;

    const yOffset = 80;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top - yOffset;

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    if (typeof window.history?.pushState === "function") {
      window.history.pushState(null, "", `#${url}`);
    } else {
      window.location.hash = url;
    }
  };

  const containerClasses = `w-full rounded-xl border border-border bg-card p-5 max-h-[calc(100vh-8rem)] overflow-y-auto ${isSticky ? "sticky top-4 self-start" : ""}`;

  return (
    <nav className={containerClasses}>
      <h2 className="text-xs font-semibold rounded-md text-neutral-900 dark:text-white uppercase tracking-wider mb-4 sticky top-0 bg-inherit p-2 px-4">
        On This Page
      </h2>
      <ul className="space-y-1">
        {toc.map((entry, index) => (
          <li
            key={index}
            className={`${entry.depth > 2 ? "ml-4" : ""}`}
          >
            <a
              href={`#${entry.url}`}
              onClick={(event) => handleClick(event, entry.url)}
              className="block py-1.5 px-3 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-all duration-200 border-l-2 border-transparent hover:border-blue-400"
            >
              {entry.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
