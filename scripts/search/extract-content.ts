import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

import type { RawPost } from "./extract-posts.ts";
import type { StaticContentType } from "../../lib/search/types.ts";

const CONTENT_DIRS: Record<string, StaticContentType> = {
  documentation: "documentation",
  projects: "project",
  pages: "page",
  "upcoming-technologies": "page",
};

export type RawStaticContent = RawPost & { type: StaticContentType };

export async function extractContent(): Promise<RawStaticContent[]> {
  const items: RawStaticContent[] = [];

  for (const [dir, type] of Object.entries(CONTENT_DIRS)) {
    const fullDirPath = path.join(process.cwd(), "contents", dir);
    const files = await fs.readdir(fullDirPath);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    for (const file of markdownFiles) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(fullDirPath, file);

      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);

      items.push({
        slug,
        frontmatter: data as Record<string, unknown>,
        content: content ?? "",
        type,
      });
    }
  }

  return items;
}
