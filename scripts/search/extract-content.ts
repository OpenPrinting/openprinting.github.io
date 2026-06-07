import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

import type { RawPost } from "./extract-posts.ts";
import type { StaticContentType } from "../../lib/search/types.ts";

type ContentDirConfig = {
  type: StaticContentType;
  url: (slug: string) => string;
};

const CONTENT_DIRS: Record<string, ContentDirConfig> = {
  documentation: {
    type: "documentation",
    url: (slug) => `/documentation/${slug}`,
  },
  projects: { type: "project", url: (slug) => `/projects/${slug}` },
  pages: { type: "page", url: (slug) => `/${slug}` },
  "upcoming-technologies": {
    type: "page",
    url: (slug) => `/upcoming-technologies/${slug}`,
  },
};

export type RawStaticContent = RawPost & {
  type: StaticContentType;
  url: string;
};

export async function extractContent(): Promise<RawStaticContent[]> {
  const items: RawStaticContent[] = [];

  for (const [dir, config] of Object.entries(CONTENT_DIRS)) {
    const fullDirPath = path.join(process.cwd(), "contents", dir);
    const files = await fs.readdir(fullDirPath);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    for (const file of markdownFiles) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(fullDirPath, file);

      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);

      if (typeof data.redirect === "string") continue;

      const permalink =
        typeof data.permalink === "string" ? data.permalink.trim() : "";
      const url =
        permalink !== ""
          ? "/" + permalink.replace(/^\/+|\/+$/g, "")
          : config.url(slug);

      items.push({
        slug,
        frontmatter: data as Record<string, unknown>,
        content: content ?? "",
        type: config.type,
        url,
      });
    }
  }

  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}
