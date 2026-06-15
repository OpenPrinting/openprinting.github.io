import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getGsocProject,
  getGsocProjectsByYear,
  getGsocYears,
} from "@/lib/gsoc";
import {
  getContributorImageSrc,
  getContributorsBySlug,
  mentorImages,
} from "@/data/gsoc-contributors";
import { getWorkSummary } from "@/data/gsoc-work-summaries";
import { getMentorsBySlug } from "@/data/gsoc-mentors";
import { GsocContributorInlineSocials } from "@/components/gsoc-contributor-socials";
import {
  ArrowLeft,
  User,
  ExternalLink,
  FileText,
  Quote,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Lightbulb,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath;

export async function generateStaticParams() {
  const years = await getGsocYears();
  const allParams: Array<{ year: string; project: string }> = [];

  for (const year of years) {
    const projects = await getGsocProjectsByYear(year);
    for (const project of projects) {
      allParams.push({ year, project: project.slug });
    }
  }

  return allParams;
}

/* ---------- small helpers ---------- */

function StatusBadge({
  status,
}: {
  status: "passed" | "failed" | "withdrawn";
}) {
  const cfg = {
    passed: {
      icon: CheckCircle2,
      label: "Passed",
      cls: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
    },
    failed: {
      icon: XCircle,
      label: "Failed",
      cls: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
    },
    withdrawn: {
      icon: AlertCircle,
      label: "Withdrawn",
      cls: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    },
  }[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.cls}`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

/* ---------- page ---------- */

export default async function GsocProjectPage({
  params,
}: {
  params: Promise<{ year: string; project: string }>;
}) {
  const { year, project } = await params;
  const post = await getGsocProject(year, decodeURIComponent(project));
  const yearProjects = await getGsocProjectsByYear(year);
  const currentSlug = decodeURIComponent(project);
  const contributors = getContributorsBySlug(Number(year), currentSlug);

  // gather work summaries for each contributor
  const workSummaries = contributors
    .map((c) => ({
      contributor: c,
      summary: getWorkSummary(c.name, Number(year)),
    }))
    .filter(
      (
        ws,
      ): ws is {
        contributor: (typeof contributors)[0];
        summary: NonNullable<ReturnType<typeof getWorkSummary>>;
      } => !!ws.summary,
    );

  const isCompleted = contributors.length > 0;
  const mentors = isCompleted
    ? [...new Set(contributors.flatMap((c) => c.mentors))]
    : getMentorsBySlug(Number(year), currentSlug);
  const skills = [...new Set(contributors.flatMap((c) => c.desiredKnowledge))];
  const license = contributors.find((c) => c.codeLicense)?.codeLicense;

  return (
    <main className="w-full min-h-screen pt-24 pb-16 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 w-full">
        {/* Back link */}
        <Link
          href={`/gsoc/${year}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to GSoC {year}
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── Left sidebar (desktop) ── */}
          {(isCompleted || mentors.length > 0) && (
            <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-24 self-start">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                {/* Contributor header — only for completed projects */}
                {isCompleted && (
                  <>
                    <div className="p-5 space-y-3">
                      {contributors.map((contributor, idx) => {
                        const contributorImage = getContributorImageSrc(contributor);
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-border/70 bg-accent/30 p-3"
                          >
                            <div className="flex items-center gap-3">
                              {contributorImage ? (
                                <Image
                                  src={contributorImage}
                                  alt={contributor.name}
                                  width={44}
                                  height={44}
                                  className="rounded-full object-cover border border-blue-500/20"
                                />
                              ) : (
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </span>
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                  {contributor.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                  Contributor
                                </p>
                              </div>
                            </div>
                            <GsocContributorInlineSocials contributor={contributor} />
                          </div>
                        );
                      })}

                      {workSummaries.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {workSummaries.map((ws, idx) => (
                            <StatusBadge key={idx} status={ws.summary.status} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border" />
                  </>
                )}

                {/* Mentors — always shown */}
                {mentors.length > 0 && (
                  <div className="p-5 space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {mentors.length === 1 ? "Mentor" : "Mentors"}
                    </p>
                    <div className="space-y-2">
                      {mentors.map((mentor) => (
                        <div key={mentor} className="flex items-center gap-2">
                          {mentorImages[mentor] ? (
                            <Image
                              src={`${basePath}${mentorImages[mentor]}`}
                              alt={mentor}
                              width={24}
                              height={24}
                              className="rounded-full object-cover border border-purple-500/20"
                            />
                          ) : (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                              <User className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            </span>
                          )}
                          <span className="text-xs text-foreground">
                            {mentor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills — completed projects only */}
                {skills.length > 0 && (
                  <>
                    <div className="border-t border-border" />
                    <div className="p-5 space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* License */}
                {license && (
                  <>
                    <div className="border-t border-border" />
                    <div className="px-5 py-3 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground">
                        {license}
                      </span>
                    </div>
                  </>
                )}

                {/* Links — completed projects only */}
                {isCompleted &&
                  (() => {
                    const links: {
                      label: string;
                      href: string;
                      icon: typeof ExternalLink;
                    }[] = [];

                    for (const c of contributors) {
                      if (c.projectUrl)
                        links.push({
                          label: "GSoC Archive",
                          href: c.projectUrl,
                          icon: ExternalLink,
                        });
                    }
                    for (const ws of workSummaries) {
                      if (ws.summary.workProductUrl)
                        links.push({
                          label: "Final Report",
                          href: ws.summary.workProductUrl,
                          icon: FileText,
                        });
                    }

                    const unique = links.filter(
                      (l, i, arr) =>
                        arr.findIndex((x) => x.href === l.href) === i,
                    );

                    if (unique.length === 0) return null;

                    return (
                      <>
                        <div className="border-t border-border" />
                        <div className="p-5 space-y-1.5">
                          {unique.map((link) => {
                            const Icon = link.icon;
                            return (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                              >
                                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="truncate">{link.label}</span>
                              </a>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}
              </div>
            </aside>
          )}

          {/* ── Mobile info ── */}
          {(isCompleted || mentors.length > 0) && (
            <div className="lg:hidden w-full rounded-xl border border-border bg-card p-4 space-y-3">
              {/* Contributors (completed only) */}
              {isCompleted && (
                <div className="space-y-3">
                  {contributors.map((contributor, idx) => {
                    const contributorImage = getContributorImageSrc(contributor);
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-border/70 bg-accent/30 p-3"
                      >
                        <div className="flex items-center gap-2.5">
                          {contributorImage ? (
                            <Image
                              src={contributorImage}
                              alt={contributor.name}
                              width={34}
                              height={34}
                              className="rounded-full object-cover border border-blue-500/20"
                            />
                          ) : (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </span>
                          )}
                          <span className="text-sm font-medium text-foreground">
                            {contributor.name}
                          </span>
                        </div>
                        <GsocContributorInlineSocials contributor={contributor} />
                      </div>
                    );
                  })}
                  <div className="flex flex-wrap gap-1.5">
                    {workSummaries.map((ws, idx) => (
                      <StatusBadge key={idx} status={ws.summary.status} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors — always */}
              {mentors.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {mentors.length === 1 ? "Mentor" : "Mentors"}:
                  </span>
                  {mentors.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[11px] font-medium text-purple-700 dark:text-purple-300"
                    >
                      {mentorImages[m] ? (
                        <Image
                          src={`${basePath}${mentorImages[m]}`}
                          alt={m}
                          width={14}
                          height={14}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-2.5 h-2.5" />
                      )}
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile links (completed only) */}
              {isCompleted &&
                (() => {
                  const links: { label: string; href: string }[] = [];
                  for (const ws of workSummaries) {
                    if (ws.summary.workProductUrl)
                      links.push({
                        label: "Final Report",
                        href: ws.summary.workProductUrl,
                      });
                  }
                  for (const c of contributors) {
                    if (c.projectUrl)
                      links.push({
                        label: "GSoC Archive",
                        href: c.projectUrl,
                      });
                    if (c.codeUrl)
                      links.push({ label: "Code", href: c.codeUrl });
                  }
                  const unique = links.filter(
                    (l, i, arr) =>
                      arr.findIndex((x) => x.href === l.href) === i,
                  );
                  if (unique.length === 0) return null;
                  return (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {unique.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  );
                })()}

              {/* Mobile ToC */}
              <div className="pt-2">
                <TableOfContents content={post.content} />
              </div>
            </div>
          )}

          {/* ── Main content column ── */}
          <section className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[720px]">
            {/* Title area */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                  GSoC {year}
                </span>
                {!isCompleted && (
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                    Project Idea
                  </span>
                )}
              </div>
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-3">
                {post.title}
              </h1>
              <div className="section-divider mt-6" />
            </div>

            {/* Work summary card (for completed projects) */}
            {workSummaries.length > 0 && (
              <div className="mb-8 space-y-4">
                {workSummaries.map((ws, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card p-5 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 border border-green-500/20 flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-foreground mb-1">
                          Work Summary
                          {contributors.length > 1 && (
                            <span className="text-muted-foreground font-normal">
                              {" "}
                              — {ws.contributor.name}
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ws.summary.summary}
                        </p>
                      </div>
                    </div>

                    {ws.summary.quote && (
                      <blockquote className="border-l-2 border-blue-500/30 pl-4 py-1">
                        <div className="flex items-start gap-2">
                          <Quote className="w-4 h-4 text-blue-500/50 flex-shrink-0 mt-0.5" />
                          <p className="text-sm italic text-muted-foreground leading-relaxed">
                            &ldquo;{ws.summary.quote}&rdquo;
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 pl-6">
                          — {ws.contributor.name}
                        </p>
                      </blockquote>
                    )}

                    {ws.summary.workProductUrl && (
                      <div className="pt-1">
                        <a
                          href={ws.summary.workProductUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-accent/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Final Report
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Markdown content */}
            <div className="w-full">
              <div className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-code:text-foreground/80">
                <MarkdownRenderer content={post.content} />
              </div>
            </div>
          </section>

          {/* ── Right sidebar ── */}
          <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-24 self-start">
            <div className="space-y-5">
              <TableOfContents content={post.content} />

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  More in GSoC {year}
                </h2>
                <ul className="space-y-1 max-h-[50vh] overflow-y-auto">
                  {yearProjects.map((item) => {
                    const href = `/gsoc/${year}/${encodeURIComponent(item.slug)}`;
                    const isCurrent = item.slug === currentSlug;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          className={
                            isCurrent
                              ? "block rounded-lg bg-blue-500/10 border border-blue-500/20 dark:border-blue-400/20 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300"
                              : "block rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                          }
                        >
                          <span className="line-clamp-2">{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
