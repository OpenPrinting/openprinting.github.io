import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface RawPost {
  slug: string;
  frontmatter: Record<string, unknown>;
  teaserImage?: string,
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

function getTeaserImage(
  meta: Record<string, unknown> & { teaser_image?: string },
  content: string
): string | undefined {
  if (meta.teaser_image) return meta.teaser_image;

  const marked = content.match(/!\[.*?\]\((.*?)\).*?\{.*?teaser.*?\}/);
  if (marked) return marked[1];

  const firstImage = content.match(/!\[.*?\]\((.*?)\)/);
  if (firstImage) return firstImage[1];

  const yt = content.match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/);
  if (yt) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;

  return undefined;
}

export async function extractPosts(): Promise<RawPost[]> {
  const files = await fs.readdir(POSTS_DIR);

  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts: RawPost[] = [];

  for (const file of markdownFiles) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);

    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const teaserImage = getTeaserImage(data, content);

    posts.push({
      slug,
      frontmatter: data as Record<string, unknown>,
      teaserImage,
      content: content ?? "",
    });
  }

  return posts;
}
