"use client"

import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils"
import Link from "next/link"
import { Github, Linkedin, Rss } from "lucide-react"

function MastodonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.536-.766 3.536-.766l-.072-1.574s-1.619.511-3.338.449c-1.693-.063-3.476-.194-3.752-2.448a4.198 4.198 0 0 1-.037-.575s1.661.406 3.764.502c1.287.059 2.495-.075 3.724-.221 2.354-.28 4.405-1.724 4.663-3.043.405-2.089.372-5.098.372-5.098l-.001-.002zm-3.809 5.447h-2.494V8.818c0-1.143-.48-1.723-1.443-1.723-1.063 0-1.596.688-1.596 2.047v2.964h-2.48V9.142c0-1.359-.534-2.047-1.596-2.047-.962 0-1.443.58-1.443 1.723v5.195H4.972V8.648c0-1.142.291-2.048.875-2.717.601-.67 1.389-1.013 2.368-1.013 1.132 0 1.989.435 2.556 1.305l.551.924.551-.924c.568-.87 1.425-1.305 2.556-1.305.979 0 1.767.344 2.368 1.013.583.669.875 1.575.875 2.717v5.365z"/>
    </svg>
  )
}

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
          {/* Brand */}
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

          {/* Link Columns */}
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

      {/* Bottom bar */}
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
