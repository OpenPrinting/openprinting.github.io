import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Node } from "unist";
export interface NormalizedMarkdown {
  headings: string[];
  text: string;
  snippet: string;
}

function generateSnippet(text: string, maxLength = 180): string {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");

  return trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
}

export function normalizeMarkdown(markdown: string): NormalizedMarkdown {
  const tree = unified().use(remarkParse).parse(markdown);

  const headings: string[] = [];
  const textParts: string[] = [];

  visit(tree, (node: Node) => {
    if (node.type === "heading" && "depth" in node && (node.depth as number) <= 3) {
      const headingText = toString(node).trim();
      if (headingText) {
        headings.push(headingText);
      }
    }

    if (node.type === "code" || node.type === "inlineCode") {
      return;
    }

    if (node.type === "paragraph") {
      const paragraphText = toString(node).trim();
      if (paragraphText) {
        textParts.push(paragraphText);
      }
    }
  });

  const normalizedText = textParts
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const snippet = generateSnippet(normalizedText);

  return {
    headings,
    text: normalizedText,
    snippet,
  };
}