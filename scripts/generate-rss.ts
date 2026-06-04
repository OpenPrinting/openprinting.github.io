import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "../config/site.config.ts";

const POSTS_DIR = path.join(process.cwd(), "contents", "post");
const OUTPUT_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "feed.xml");

const SITE_URL = siteConfig.urls.canonicalOrigin;
const SITE_TITLE = `${siteConfig.brand.name} News`;
const SITE_DESCRIPTION =
  "Latest news and updates from the OpenPrinting project";
const MAX_ITEMS = 20;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

async function generateRss() {
  console.log("Generating RSS feed...");

  const files = await fs.readdir(POSTS_DIR);
  const posts: PostMeta[] = [];

  for (const file of files.filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);

    posts.push({
      slug,
      title:
        typeof data.title === "string"
          ? data.title.trim().replace(/\\/g, "")
          : slug,
      date: typeof data.date === "string" ? data.date : "",
      excerpt: typeof data.excerpt === "string" ? data.excerpt.trim() : "",
      author: typeof data.author === "string" ? data.author.trim() : "",
    });
  }

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = posts
    .slice(0, MAX_ITEMS)
    .map((post) => {
      const url = `${SITE_URL}/${post.slug}/`;
      const lines = [
        `    <item>`,
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
      ];
      if (post.date) lines.push(`      <pubDate>${toRfc822(post.date)}</pubDate>`);
      if (post.author) lines.push(`      <author>${escapeXml(post.author)}</author>`);
      if (post.excerpt)
        lines.push(`      <description>${escapeXml(post.excerpt)}</description>`);
      lines.push(`    </item>`);
      return lines.join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}${siteConfig.urls.rssPath}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, xml, "utf8");

  console.log(
    `RSS feed generated with ${Math.min(posts.length, MAX_ITEMS)} items → ${OUTPUT_FILE}`
  );
}

generateRss().catch((err) => {
  console.error("Failed to generate RSS feed:", err);
  process.exit(1);
});
