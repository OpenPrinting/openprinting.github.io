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
  // Only for the trusted Snapcraft store embeds; every other iframe is
  // removed by the uponSanitizeElement hook below.
  "iframe",
]

// width/height/frameborder are inert on the non-iframe elements above. The
// upstream embeds' cosmetic `style` attribute is deliberately NOT allowed:
// a global style allowance would weaken sanitization of every element.
const ALLOWED_ATTR = ["href", "title", "target", "rel", "src", "width", "height", "frameborder"]

// Upstream driver comments embed Snapcraft store cards for the printer
// applications (e.g. https://snapcraft.io/ghostscript-printer-app/embedded),
// the only iframes allowed to survive sanitization.
//
// Security invariant: only HTTPS URLs with the exact snapcraft.io hostname are
// allowed. WHATWG URL parsing fails closed on everything else (see the bypass
// cases in sanitize.test.ts).
export function isTrustedEmbedSrc(src: string): boolean {
  let url: URL

  try {
    url = new URL(src)
  } catch {
    return false
  }

  return url.protocol === "https:" && url.hostname === "snapcraft.io"
}

let hooksRegistered = false

function registerHooks(): void {
  if (hooksRegistered) return
  hooksRegistered = true

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName !== "iframe") return

    const element = node as Element
    const src =
      typeof element.getAttribute === "function" ? element.getAttribute("src") : null

    if (!src || !isTrustedEmbedSrc(src)) {
      node.parentNode?.removeChild(node)
    }
  })

  // Harden the surviving trusted embeds beyond what upstream ships.
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "IFRAME") {
      node.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups")
      node.setAttribute("loading", "lazy")
      node.setAttribute("referrerpolicy", "no-referrer")
    }
  })
}

export function sanitizeFoomaticHtml(html: string): string {
  registerHooks()

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })
}
