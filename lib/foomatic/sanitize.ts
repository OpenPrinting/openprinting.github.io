"use client"

import DOMPurify from "dompurify"

// foomatic-db XML accepts external contributions and intentionally embeds
// HTML in comments/notes fields, so it must be sanitized before rendering.
const ALLOWED_TAGS = [
  "a",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "code",
  "span",
]

const ALLOWED_ATTR = ["href", "title", "target", "rel"]

export function sanitizeFoomaticHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })
}
