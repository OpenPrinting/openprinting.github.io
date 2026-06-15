import type { ReactNode } from "react";
import type { GsocContributor, GsocContributorSocials } from "@/data/gsoc-contributors";
import {
  AtSign,
  Facebook,
  Github,
  Globe,
  Linkedin,
  Twitter,
} from "lucide-react";

type SocialEntry = {
  key: string;
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

function trimUrl(value: string): string {
  return value
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function getDisplayValue(key: string, value: string): string {
  const trimmed = trimUrl(value);

  if (key === "website" || key === "githubPages") {
    return trimmed.split("/")[0] ?? trimmed;
  }

  if (key === "mastodon") {
    const match = trimmed.match(/@[^/]+$/);
    return match ? match[0] : trimmed;
  }

  const parts = trimmed.split("/").filter(Boolean);
  const last = parts[parts.length - 1];

  if (!last) return trimmed;

  if (key === "linkedin") {
    return `@${last}`;
  }

  if (key === "x" || key === "twitter" || key === "medium" || key === "devto" || key === "facebook") {
    return last.startsWith("@") ? last : `@${last}`;
  }

  return trimmed;
}

function getSocialEntries(socials?: GsocContributorSocials): SocialEntry[] {
  if (!socials) return [];

  const entries: SocialEntry[] = [];

  if (socials.github) {
    entries.push({
      key: "github",
      label: "GitHub",
      value: `@${socials.github}`,
      href: `https://github.com/${socials.github}`,
      icon: <Github className="h-3 w-3" />,
    });
  }

  if (socials.website) {
    entries.push({
      key: "website",
      label: "Website",
      value: getDisplayValue("website", socials.website),
      href: socials.website,
      icon: <Globe className="h-3 w-3" />,
    });
  }

  if (socials.githubPages) {
    entries.push({
      key: "githubPages",
      label: "GitHub Pages",
      value: getDisplayValue("githubPages", socials.githubPages),
      href: socials.githubPages,
      icon: <Globe className="h-3 w-3" />,
    });
  }

  if (socials.linkedin) {
    entries.push({
      key: "linkedin",
      label: "LinkedIn",
      value: getDisplayValue("linkedin", socials.linkedin),
      href: socials.linkedin,
      icon: <Linkedin className="h-3 w-3" />,
    });
  }

  if (socials.x) {
    entries.push({
      key: "x",
      label: "X",
      value: getDisplayValue("x", socials.x),
      href: socials.x,
      icon: <Twitter className="h-3 w-3" />,
    });
  }

  if (socials.mastodon) {
    entries.push({
      key: "mastodon",
      label: "Mastodon",
      value: getDisplayValue("mastodon", socials.mastodon),
      href: socials.mastodon,
      icon: <AtSign className="h-3 w-3" />,
    });
  }

  if (socials.medium) {
    entries.push({
      key: "medium",
      label: "Medium",
      value: getDisplayValue("medium", socials.medium),
      href: socials.medium,
      icon: <Globe className="h-3 w-3" />,
    });
  }

  if (socials.devto) {
    entries.push({
      key: "devto",
      label: "dev.to",
      value: getDisplayValue("devto", socials.devto),
      href: socials.devto,
      icon: <Globe className="h-3 w-3" />,
    });
  }

  if (socials.twitter) {
    entries.push({
      key: "twitter",
      label: "Twitter",
      value: getDisplayValue("twitter", socials.twitter),
      href: socials.twitter,
      icon: <Twitter className="h-3 w-3" />,
    });
  }

  if (socials.facebook) {
    entries.push({
      key: "facebook",
      label: "Facebook",
      value: getDisplayValue("facebook", socials.facebook),
      href: socials.facebook,
      icon: <Facebook className="h-3 w-3" />,
    });
  }

  return entries;
}

export function GsocContributorHoverChip({
  contributor,
  avatar,
}: {
  contributor: GsocContributor;
  avatar: ReactNode;
}) {
  const entries = getSocialEntries(contributor.socials);

  return (
    <span className="relative inline-flex group/contributor">
      <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/10 pl-0.5 pr-2 py-0.5 text-[10px] font-medium text-blue-700 transition-colors dark:text-blue-300 group-hover/contributor:border-blue-500/35 group-hover/contributor:bg-blue-500/15">
        {avatar}
        {contributor.name}
      </span>

      {entries.length > 0 && (
        <span className="pointer-events-none absolute left-0 top-full z-20 mt-3 hidden w-[260px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-popover/95 text-popover-foreground shadow-2xl backdrop-blur-md group-hover/contributor:flex group-focus-within/contributor:flex">
          <span className="flex items-start gap-3 border-b border-border/70 px-3 py-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/10 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
              {avatar}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">
                {contributor.name}
              </span>
              <span className="mt-0.5 block line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {contributor.project}
              </span>
            </span>
          </span>
          <span className="px-3 py-2">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Profiles
            </span>
            <span className="flex flex-col gap-1.5">
              {entries.map((entry) => (
                <span
                  key={entry.key}
                  className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-x-2 rounded-lg bg-accent/50 px-2.5 py-2 text-[11px]"
                >
                  <span className="text-foreground/80">{entry.icon}</span>
                  <span className="font-medium text-foreground">
                    {entry.label}
                  </span>
                  <span
                    className="min-w-0 truncate text-right text-muted-foreground"
                    title={entry.value}
                  >
                    {entry.value}
                  </span>
                </span>
              ))}
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

export function GsocContributorInlineSocials({
  contributor,
}: {
  contributor: GsocContributor;
}) {
  const entries = getSocialEntries(contributor.socials);

  if (entries.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {entries.map((entry) => (
        <a
          key={entry.key}
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-accent/60 px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:border-blue-500/20 hover:text-foreground"
        >
          {entry.icon}
          <span>{entry.label}</span>
        </a>
      ))}
    </div>
  );
}
