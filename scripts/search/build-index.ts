import fs from "fs/promises";
import path from "path";
import { siteConfig } from "../../config/site.config.ts";
import { extractPosts } from "./extract-posts.ts";
import { extractContent, type RawStaticContent } from "./extract-content.ts";
import { normalizeMarkdown } from "./normalize-markdown.ts";
import { type SearchDocument, type StaticSearchIndex } from "../../lib/search/types.ts";

const OUTPUT_DIR = path.join(process.cwd(), "public", "search");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "static-index.json");

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\\/g, "") : "";
}

function getImageSrc(src: string): string {
  if (/^(https?:)?\/\//.test(src)) {
    return src;
  }

  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return `${siteConfig.urls.basePath}${
    normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`
  }`;
}

async function buildIndex() {
  console.log("Building static search index...");

  const rawPosts = await extractPosts();
  const rawContent: RawStaticContent[] = await extractContent();

  const postDocuments: SearchDocument[] = rawPosts.map((post) => {
    const title =
      safeString(post.frontmatter.title) || "Untitled Article";

    const excerpt = safeString(post.frontmatter.excerpt);

    const { headings, text, snippet } = normalizeMarkdown(post.content);

    return {
      id: `post:${post.slug}`,
      source: "static",
      type: "post",

      title,
      url: `/${post.slug}`,

      headings,
      tags: [],
      teaserImage: post.teaserImage
        ? getImageSrc(post.teaserImage)
        : undefined,
      snippet: excerpt || snippet,
      content: text,
    };
  });

  const contentDocuments: SearchDocument[] = rawContent.map((post) => {
    const title = safeString(post.frontmatter.title) || "Untitled Article";
    const excerpt = safeString(post.frontmatter.excerpt);

    const { headings, text, snippet } = normalizeMarkdown(post.content);

    let url: string;
    if (post.type === "documentation" || post.type === "project") {
      url = `/${post.type}/${post.slug}`;
    } else if (post.type === "page") {
      url = `/${post.slug}`;
    } else {
      url = `/${post.slug}`;
    }

    return {
      id: `${post.type}:${post.slug}`,
      source: "static",
      type: post.type,

      title,
      url,

      headings,
      tags: [],

      snippet: excerpt || snippet,
      content: text,
    };
  });

  const documents: SearchDocument[] = [...postDocuments, ...contentDocuments];

  const index: StaticSearchIndex = {
    version: "1.0",
    documents,
    metadata: {
      documentCount: documents.length,
      contentTypes: ["post", "documentation", "project", "page"],
    },
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(index, null, 2),
    "utf8"
  );

  console.log(`Search index generated with ${documents.length} documents`);
}

buildIndex().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
