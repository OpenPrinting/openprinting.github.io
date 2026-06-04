import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import GiscusComments from "@/components/giscus-comment";
import AuthorCard from "@/components/AuthorCard";
import authors from "@/data/authors";
import { getAuthorImageSrc, getImageSrc } from "@/lib/utils";
import { getTeaserImage } from "@/lib/get-latest-posts";
import { siteConfig } from "@/config/site.config";
import { getSiteUrl } from "@/lib/site";

const defaultOgImageUrl = getSiteUrl(siteConfig.brand.defaultOgImagePath);

const POSTS_DIR = path.join(process.cwd(), "contents", "post");

async function getPost(slug: string) {
    const decodedSlug = decodeURIComponent(slug);
    const filePath = path.join(POSTS_DIR, `${decodedSlug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
        frontmatter: data as Record<string, unknown>,
        content: content ?? "",
    };
}

async function getAllPostsMetadata() {
    const entries = await fs.readdir(POSTS_DIR);

    const posts = await Promise.all(
        entries
            .filter((name) => name.endsWith(".md"))
            .map(async (name) => {
                const filePath = path.join(POSTS_DIR, name);
                const raw = await fs.readFile(filePath, "utf8");
                const { data } = matter(raw);

                return {
                    slug: name.replace(/\.md$/, ""),
                    title: typeof data.title === "string" ? data.title.trim().replace(/\\/g,"") : name.replace(/\.md$/, ""),
                    date: typeof data.date === "string" ? data.date : "",
                    author: typeof data.author === "string" ? data.author.trim() : "",
                    excerpt: typeof data.excerpt === "string" ? data.excerpt.trim() : "",
                    previousSlugs: Array.isArray(data.previousSlugs)
                        ? data.previousSlugs
                        : [],
                };
            })
    );

    posts.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
    });

    return posts;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    if (decodedSlug === "cups") {
        return {
            title: "CUPS",
            alternates: {
                canonical: siteConfig.destinations.cups,
            },
        };
    }

    const allPosts = await getAllPostsMetadata();
    const directMatch = allPosts.find((post) => post.slug === decodedSlug);
    const redirectMatch = directMatch
        ? null
        : allPosts.find((post) => post.previousSlugs.includes(decodedSlug));

    const matchedPost = directMatch ?? redirectMatch;
    if (!matchedPost) return {};

    const resolvedSlug = matchedPost.slug;
    const { frontmatter, content } = await getPost(resolvedSlug);

    const title =
        typeof frontmatter.title === "string" && frontmatter.title.trim() !== ""
            ? frontmatter.title.trim()
            : matchedPost.title;
    const description =
        typeof frontmatter.excerpt === "string" && frontmatter.excerpt.trim() !== ""
            ? frontmatter.excerpt.trim()
            : matchedPost.excerpt;
    const teaserImage = getTeaserImage(frontmatter, content);
    const resolvedTeaserImage = teaserImage
        ? getImageSrc(teaserImage)
        : undefined;
    const imageUrl = resolvedTeaserImage
        ? /^https?:\/\//.test(resolvedTeaserImage)
            ? resolvedTeaserImage
            : getSiteUrl(resolvedTeaserImage)
        : defaultOgImageUrl;
    const canonicalPath = resolvedSlug === decodedSlug ? `/${resolvedSlug}` : `/${decodedSlug}`;
    const canonicalUrl = getSiteUrl(canonicalPath);

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "article",
            images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

export async function generateStaticParams() {
    const entries = await fs.readdir(POSTS_DIR);

    const params: { slug: string[] }[] = [];

    for (const name of entries) {
        if (!name.endsWith(".md")) continue;

        const slug = name.replace(/\.md$/, "");
        params.push({ slug: [slug] });

        const filePath = path.join(POSTS_DIR, name);
        const raw = await fs.readFile(filePath, "utf8");
        const { data } = matter(raw);

        if (Array.isArray(data.previousSlugs)) {
            for (const prevSlug of data.previousSlugs) {
                params.push({ slug: [prevSlug] });
            }
        }
    }

    params.push({ slug: ["cups"] });

    return params;
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;

    const slugString = Array.isArray(slug) ? slug.join("/") : slug;
    const decodedSlug = decodeURIComponent(slugString);

    if (decodedSlug === "cups") {
        redirect(siteConfig.destinations.cups);
    }

    const allPosts = await getAllPostsMetadata();

    const directMatch = allPosts.find((post) => post.slug === decodedSlug);

    if (!directMatch) {
        const redirectMatch = allPosts.find((post) =>
            post.previousSlugs.includes(decodedSlug)
        );

        if (redirectMatch) {
            redirect(`/${redirectMatch.slug}`);
        }

        notFound();
    }

    const currentIndex = allPosts.findIndex((post) => post.slug === decodedSlug);
    const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const relatedPosts = allPosts
        .filter((post) => post.slug !== decodedSlug)
        .slice(0, 3);

    const { frontmatter, content: markdownContent } = await getPost(decodedSlug);

    const rawAuthor =
        typeof frontmatter.author === "string" ? frontmatter.author.trim() : "";
    const authorKey = rawAuthor !== "" ? rawAuthor : undefined;

    const title =
        typeof frontmatter.title === "string" && frontmatter.title.trim() !== ""
            ? frontmatter.title.trim().replace(/\\/g,"")
            : "Untitled Article";

    let formattedDate = "";
    if (typeof frontmatter.date === "string" && frontmatter.date.trim() !== "") {
        const parsedDate = new Date(frontmatter.date);
        formattedDate = parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const readTime =
        typeof frontmatter.readTime === "string" &&
            frontmatter.readTime.trim() !== ""
            ? frontmatter.readTime.trim()
            : "";

    const showToc =
        !!frontmatter &&
        (frontmatter.toc === true || String(frontmatter.toc) === "true");

    return (
        <main className="w-full min-h-screen pt-24 pb-16 bg-background text-foreground">
            <div className="max-w-[1400px] mx-auto px-6 lg:pl-8 lg:pr-4 py-8 w-full">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {authorKey && (
                        <aside className="w-full lg:w-[260px] flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                            <AuthorCard authorKey={authorKey} />
                        </aside>
                    )}

                    <section className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[720px]">
                        <div className="mb-8 px-4">
                            <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-3">
                                {title}
                            </h1>
                            {formattedDate && (
                                <div className="text-muted-foreground text-sm mb-2">
                                    {formattedDate}
                                </div>
                            )}
                            {readTime && (
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <path strokeWidth="2" d="M12 6v6l4 2" />
                                    </svg>
                                    <span>{readTime}</span>
                                </div>
                            )}
                            <div className="section-divider mt-8" />
                        </div>

                        {showToc && (<div className="pb-6 px-4 lg:hidden">
                            <TableOfContents content={markdownContent} />
                        </div>)}

                        <div className="w-full px-4 lg:px-0">
                            <div className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300">
                                <MarkdownRenderer content={markdownContent} />
                            </div>

                            <div className="mt-12">
                                <GiscusComments />
                            </div>

                            <nav className="mt-12 flex flex-col sm:flex-row justify-between gap-4" aria-label="Post navigation">
                                {olderPost ? (
                                    <Link
                                        href={`/${olderPost.slug}`}
                                        className="group flex-1 rounded-lg border border-border p-4 hover:border-foreground/30 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                            <ChevronLeft className="w-3 h-3" />
                                            <span>Older post</span>
                                        </div>
                                        <div className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">{olderPost.title}</div>
                                    </Link>
                                ) : <div className="flex-1" />}
                                {newerPost ? (
                                    <Link
                                        href={`/${newerPost.slug}`}
                                        className="group flex-1 rounded-lg border border-border p-4 text-right hover:border-foreground/30 transition-colors duration-200"
                                    >
                                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                                            <span>Newer post</span>
                                            <ChevronRight className="w-3 h-3" />
                                        </div>
                                        <div className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">{newerPost.title}</div>
                                    </Link>
                                ) : <div className="flex-1" />}
                            </nav>

                            {relatedPosts.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-lg font-semibold mb-6">You may also enjoy</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {relatedPosts.map((post) => {
                                            const postAuthor = post.author ? authors.find((a) => a.key === post.author) : null;
                                            const imgSrc = getAuthorImageSrc(postAuthor?.image);
                                            return (
                                                <Link
                                                    key={post.slug}
                                                    href={`/${post.slug}`}
                                                    className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
                                                >
                                                    <div className="flex flex-col flex-1">
                                                        <h3 className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-snug mb-3">{post.title}</h3>

                                                        {postAuthor && (
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                                                                    <Image src={imgSrc} alt={postAuthor.name} fill className="object-cover" />
                                                                </div>
                                                                <span className="text-xs text-muted-foreground">{postAuthor.name}</span>
                                                            </div>
                                                        )}

                                                        {post.date && (
                                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                                                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                                            </div>
                                                        )}

                                                        {post.excerpt && (
                                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">{post.excerpt}</p>
                                                        )}

                                                        <div className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            Read more
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {showToc && (<aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-24 self-start">
                        <TableOfContents content={markdownContent} />
                    </aside>)}
                </div>
            </div>
        </main>
    );
}
