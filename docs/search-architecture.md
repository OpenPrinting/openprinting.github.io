# OpenPrinting Website – Search Architecture

## Overview

This document describes the architecture and implementation of the fully client-side search system developed during Winter of Code 5.0.

The search system is designed to:

- Operate entirely client-side (no backend dependency)
- Remain compatible with Next.js static export (`output: export`)
- Automatically index markdown content at build time
- Scale to hundreds of documents
- Support future integration with additional search sources (e.g., Foomatic driver lookup)

---

## High-Level Architecture

The system is divided into two layers:

1. **Build-Time Indexing Layer**
2. **Client-Side Runtime Search Layer**

This separation ensures performance, scalability, and maintainability.

---

# 1. Build-Time Indexing

## Content Source

Markdown posts are located in:

```

contents/post/

````

Currently supports 200+ posts.

---

## Markdown Processing (AST-Based)

Markdown is parsed using:

- `unified`
- `remark-parse`
- `unist-util-visit`
- `mdast-util-to-string`

This avoids fragile regex-based parsing and ensures structured extraction.

### Processing Steps

- Parse markdown into AST
- Extract headings (h1–h3)
- Remove code blocks from searchable content
- Strip formatting while preserving meaningful text
- Preserve link text while removing URLs
- Normalize whitespace
- Generate snippet if no excerpt is provided

---

## Search Document Schema

Each indexed document follows:

```ts
interface SearchDocument {
  id: string;
  source: "static";
  type: "post";
  title: string;
  url: string;
  headings: string[];
  tags: string[];
  snippet: string;
  content: string;
}
````

---

## Static Index Output

The generated index is stored at:

```
public/search/static-index.json
```

Structure:

```json
{
  "version": "1.0",
  "generatedAt": "...",
  "documents": [...]
}
```

The file is generated automatically during build.

---

## Build Integration

Index generation is automated via:

```json
"prebuild": "tsx scripts/search/build-index.ts"
```

This ensures:

* The index is regenerated on every production build
* No manual intervention is required
* Static export compatibility is preserved

---

# 2. Client-Side Runtime Search

## Search Engine

Runtime search is powered by:

**MiniSearch**

Configuration:

* Indexed fields:

  * title
  * content
  * headings
* Boosting:

  * title: 3x
  * headings: 2x
* Fuzzy matching enabled (0.2 threshold)
* Results limited to top 8

All search execution occurs in-browser.

---

## Performance Optimizations

* 200ms input debounce
* Top-N result limiting (8 results)
* Lazy initialization of search engine
* No backend API calls
* BasePath-aware index fetch for GitHub Pages compatibility

---

# 3. Search UI

Search is implemented as a modal overlay:

* Responsive layout (desktop and mobile)
* Auto-focused input
* Real-time result rendering
* Loading state during initialization
* Graceful "No results found" state

---

## Keyboard Accessibility

* `Ctrl + K` (Windows/Linux)
* `Cmd + K` (Mac)
* `Escape` closes the modal

---

# Static Export Compatibility

The website uses:

```
output: export
```

The search system:

* Fetches index from `/search/static-index.json`
* Respects production `basePath`
* Requires no server-side rendering
* Works with GitHub Pages static hosting

---

# Extensibility & Future Integration

The search schema and architecture are designed to support multiple independent indexes.

Future extension plan:

* Integrate Foomatic driver database search
* Merge static and Foomatic results under a unified interface
* Maintain modular separation between content sources

---

# Summary

The implemented search system provides:

* Automated build-time indexing
* AST-based markdown normalization
* Fully client-side search execution
* Weighted relevance scoring and fuzzy matching
* Static export compatibility
* Scalable and extensible architecture

This approach eliminates backend dependency while ensuring performance, maintainability, and production readiness.
