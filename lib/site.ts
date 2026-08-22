import { siteConfig } from "@/config/site.config";

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  const absolute = path.startsWith("/") ? path : `/${path}`;

  // Canonical URLs carry no trailing slash, so callers may pass either form
  // (#207). The site root itself stays "/".
  const [pathname, suffix = ""] = splitSuffix(absolute);
  const trimmed = pathname.replace(/\/+$/, "");

  return `${trimmed === "" ? "/" : trimmed}${suffix}`;
}

// Keeps any query and fragment out of the trailing-slash normalization.
function splitSuffix(url: string): [string, string] {
  const index = url.search(/[?#]/);
  return index === -1 ? [url, ""] : [url.slice(0, index), url.slice(index)];
}

export function getBasePath(): string {
  return siteConfig.urls.basePath;
}

export function getSiteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteConfig.urls.canonicalOrigin}${normalizePath(path)}`;
}

export function getExternalLinks() {
  return siteConfig.destinations;
}
