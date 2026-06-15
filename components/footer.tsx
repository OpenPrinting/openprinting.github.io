"use client"

import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils"
import Link from "next/link"
import { Github, Linkedin, Rss } from "lucide-react"
import { MastodonIcon } from "@/components/icons"

const socialLinks = [
  { icon: Github, href: siteConfig.destinations.github, label: "GitHub" },
  { icon: MastodonIcon, href: siteConfig.destinations.mastodon, label: "Mastodon" },
  { icon: Linkedin, href: siteConfig.destinations.linkedin, label: "LinkedIn" },
  { icon: Rss, href: siteConfig.urls.rssPath, label: "RSS Feed" },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-black border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">{siteConfig.brand.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              {siteConfig.brand.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.label === "RSS Feed" ? getAssetPath(social.href) : social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {siteConfig.navigation.footer.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
