import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site.config";
import { getBasePath } from "@/lib/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(src: string): string {
  if (/^(https?:)?\/\//.test(src)) return src;

  const normalizedSrc = src.startsWith("../")
    ? src.replace(/^\.\.\//, "/")
    : src;

  return `${getBasePath()}${
    normalizedSrc.startsWith("/") ? normalizedSrc : `/${normalizedSrc}`
  }`;
}

export function getImageSrc(src: string): string {
  return getAssetPath(src);
}

export function getAuthorImageSrc(image?: string | null): string {
  const fallback = siteConfig.brand.authorPlaceholderPath;
  const source = image && image !== "NA" ? image : fallback;
  return getAssetPath(source);
}
