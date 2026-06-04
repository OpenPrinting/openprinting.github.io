"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, MessageCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function GsocOrgBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 md:p-8 card-glow"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2">
            About Us
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            {siteConfig.brand.name} — The {siteConfig.brand.organization}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            We develop the printing infrastructure for Linux and similar
            operating systems under The Linux Foundation. Every year we
            participate in Google Summer of Code, mentoring contributors on
            printing, scanning, CUPS, and related projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
          <Link
            href={siteConfig.destinations.linuxFoundationGsocWiki}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            LF GSoC Wiki
          </Link>
          <Link
            href={siteConfig.destinations.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <Github className="w-3 h-3" />
            GitHub
          </Link>
          <Link
            href={siteConfig.destinations.mailingList}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <Mail className="w-3 h-3" />
            Mailing List
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
            <MessageCircle className="w-3 h-3" />
            #openprinting on IRC
          </span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">Admins:</span> Till
          Kamppeter &amp; Aveek Basu
          <span className="mx-2 text-muted-foreground/50">·</span>
          <span className="font-medium text-foreground/80">
            Technologies:
          </span>{" "}
          C, C++, CUPS, IPP, Python
          <span className="mx-2 text-muted-foreground/50">·</span>
          <span className="font-medium text-foreground/80">Topics:</span>{" "}
          Printing, Scanning, Desktop Integration
        </p>
      </div>
    </motion.section>
  );
}
