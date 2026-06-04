import { siteConfig } from "@/config/site.config"

export function getBasePath() {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  if (configuredBasePath) {
    return configuredBasePath
  }

  if (
    typeof window !== "undefined" &&
    siteConfig.urls.basePath &&
    window.location.pathname.startsWith(siteConfig.urls.basePath)
  ) {
    return siteConfig.urls.basePath
  }

  return ""
}

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${getBasePath()}${normalizedPath}`
}
