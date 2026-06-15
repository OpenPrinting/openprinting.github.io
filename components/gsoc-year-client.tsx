"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  ExternalLink,
  Newspaper,
  Quote,
  FileText,
} from "lucide-react";
import type { GsocContributor } from "@/data/gsoc-contributors";
import { getContributorImageSrc, mentorImages } from "@/data/gsoc-contributors";
import type { GsocWorkSummary } from "@/data/gsoc-work-summaries";
import type { GsocProjectSummary } from "@/lib/gsoc";
import { getMentorsByYear } from "@/data/gsoc-mentors";
import { GsocContributorHoverChip } from "@/components/gsoc-contributor-socials";
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath;

type RelatedPost = {
  title: string;
  url: string;
  snippet: string;
};

export function GsocYearClient({
  year,
  yearTitle,
  projects,
  contributors,
  orgUrl,
  relatedPosts,
  workSummaries,
}: {
  year: string;
  yearTitle: string;
  yearContent: string;
  projects: GsocProjectSummary[];
  contributors: GsocContributor[];
  orgUrl: string;
  relatedPosts: RelatedPost[];
  workSummaries: GsocWorkSummary[];
}) {
  const getSummary = (name: string) =>
    workSummaries.find((s) => s.name === name);

  const contributorBySlug = new Map<string, GsocContributor>();
  for (const c of contributors) {
    contributorBySlug.set(c.slug, c);
  }

  const hasContributors = contributors.length > 0;

  const projectMentors = new Map<string, string[]>();
  if (!hasContributors) {
    for (const pm of getMentorsByYear(Number(year))) {
      projectMentors.set(pm.slug, pm.mentors);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="hero-glow-blue opacity-30" />
        <div className="grid-pattern absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link
            href="/gsoc"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All GSoC years
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient-foreground">{yearTitle}</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">
            {hasContributors
              ? `Contributors, completed projects, and mentoring details for GSoC ${year}.`
              : `Project ideas and proposals for GSoC ${year}.`}
          </p>
          {orgUrl && (
            <Link
              href={orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on GSoC Archive
            </Link>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <div className="section-divider" />

        {contributors.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                    Completed Work
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    GSoC {year} Projects
                  </h2>
                </div>
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {contributors.length} project
                  {contributors.length === 1 ? "" : "s"}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {contributors.map((contributor, index) => {
                const contribSummary = getSummary(contributor.name);
                const contributorImage = getContributorImageSrc(contributor);
                return (
                  <motion.div
                    key={`contrib-${contributor.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                  >
                    <Link
                      href={`/gsoc/${year}/${contributor.slug}`}
                      className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                    >
                      <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {contributor.project}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {contribSummary?.summary ||
                          "View project details on the GSoC archive."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <GsocContributorHoverChip
                          contributor={contributor}
                          avatar={
                            contributorImage ? (
                              <Image
                                src={contributorImage}
                                alt={contributor.name}
                                width={16}
                                height={16}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20">
                                <User className="w-2.5 h-2.5" />
                              </span>
                            )
                          }
                        />
                      </div>

                      {contributor.mentors.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-muted-foreground mr-0.5">
                            Mentors:
                          </span>
                          {contributor.mentors.slice(0, 3).map((mentor) => (
                            <span
                              key={mentor}
                              className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {mentorImages[mentor] ? (
                                <Image
                                  src={`${basePath}${mentorImages[mentor]}`}
                                  alt={mentor}
                                  width={14}
                                  height={14}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-3 h-3 text-muted-foreground/60" />
                              )}
                              {mentor.split(" ")[0]}
                            </span>
                          ))}
                          {contributor.mentors.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{contributor.mentors.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FileText className="w-3 h-3" />
                        View project
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {!hasContributors && projects.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                    Project Ideas
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    GSoC {year} Proposals
                  </h2>
                </div>
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {projects.length} project{projects.length === 1 ? "" : "s"}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, index) => (
                <motion.div
                  key={`project-${project.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link
                    href={`/gsoc/${year}/${project.slug}`}
                    className="group flex flex-col h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                  >
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {project.excerpt}
                    </p>

                    {(projectMentors.get(project.slug) ?? []).length > 0 && (
                      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-muted-foreground mr-0.5">
                          Mentors:
                        </span>
                        {(projectMentors.get(project.slug) ?? [])
                          .slice(0, 3)
                          .map((mentor) => (
                            <span
                              key={mentor}
                              className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {mentorImages[mentor] ? (
                                <Image
                                  src={`${basePath}${mentorImages[mentor]}`}
                                  alt={mentor}
                                  width={14}
                                  height={14}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-3 h-3 text-muted-foreground/60" />
                              )}
                              {mentor.split(" ")[0]}
                            </span>
                          ))}
                        {(projectMentors.get(project.slug) ?? []).length >
                          3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +
                            {(projectMentors.get(project.slug) ?? []).length -
                              3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FileText className="w-3 h-3" />
                      Read more
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {workSummaries.filter((s) => s.quote).length > 0 && (
          <>
            <div className="section-divider" />
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                  In Their Words
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Contributor Highlights
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workSummaries
                  .filter((s) => s.quote)
                  .map((s, index) => (
                    <motion.div
                      key={`quote-${s.name}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <Quote className="w-4 h-4 text-blue-400/40 mb-2" />
                      <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-4">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-border">
                          <User className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[11px] font-medium text-foreground">
                          {s.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>
          </>
        )}

        {relatedPosts.length > 0 && (
          <>
            <div className="section-divider" />
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 tracking-wide uppercase">
                  From the Blog
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  News &amp; Updates
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Blog posts related to GSoC {year}.
                </p>
              </motion.div>

              <div className="space-y-3">
                {relatedPosts.map((post, index) => (
                  <motion.div
                    key={post.url}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <Link
                      href={post.url}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-border/80 hover:bg-accent"
                    >
                      <Newspaper className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        {post.snippet && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {post.snippet}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
