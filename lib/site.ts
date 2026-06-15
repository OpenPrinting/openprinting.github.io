import { siteConfig } from "@/config/site.config";

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
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
