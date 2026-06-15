import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

export function jekyllSlug(input: string): string {
  return input
    .replace(/[^\p{M}\p{L}\p{Nd}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export interface PostRecord {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  aliases: string[];
}

let cache: PostRecord[] | null = null;

export function getAllPostRecords(): PostRecord[] {
  if (cache) return cache;

  const names = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"));

  const records: PostRecord[] = names.map((name) => {
    const slug = name.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, name), "utf8");
    const { data } = matter(raw);

    const title =
      typeof data.title === "string" && data.title.trim() !== ""
        ? data.title.trim().replace(/\\/g, "")
        : slug;
    const explicit = Array.isArray(data.previousSlugs)
      ? data.previousSlugs.map((s) => String(s))
      : [];

    return {
      slug,
      title,
      date: typeof data.date === "string" ? data.date : "",
      author: typeof data.author === "string" ? data.author.trim() : "",
      excerpt: typeof data.excerpt === "string" ? data.excerpt.trim() : "",
      aliases: explicit,
    };
  });

  const canonical = new Set(records.map((r) => r.slug));
  const aliasOwner = new Map<string, string>();

  for (const r of records) {
    const candidates = new Set<string>([
      jekyllSlug(r.slug),
      jekyllSlug(r.title),
      ...r.aliases,
    ]);

    const aliases: string[] = [];
    for (const candidate of candidates) {
      if (!candidate || candidate === r.slug) continue;
      if (canonical.has(candidate)) continue;
      if (aliasOwner.has(candidate)) continue;
      aliasOwner.set(candidate, r.slug);
      aliases.push(candidate);
    }
    r.aliases = aliases;
  }

  cache = records;
  return records;
}
