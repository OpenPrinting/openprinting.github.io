"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white/10 dark:bg-black/80" />
      <div
        className="absolute inset-0 bg-cover bg-[position:80%_0] opacity-100 mix-blend-normal pointer-events-none dark:hidden"
        style={{
          backgroundImage: `url(${getAssetPath(siteConfig.brand.heroTexturePath)})`,
        }}
      />
      <div
        className="hero-banner-image hidden dark:block"
        style={{
          backgroundImage: `url(${getAssetPath(siteConfig.brand.heroTexturePath)})`,
        }}
      />
      <div className="hero-glow hidden dark:block" />
      <div className="hero-glow-blue hidden dark:block" />
      <div className="grid-pattern absolute inset-0" />

      <div className="absolute top-0 left-1/2 hidden h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/[0.07] via-transparent to-transparent blur-3xl dark:block" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12 text-left">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 mt-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/[0.15] dark:border-white/[0.08] bg-black/[0.05] dark:bg-white/[0.03] text-xs text-neutral-700 dark:text-neutral-400 font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-glow-pulse" />
              Open Source Printing Infrastructure
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-neutral-950 dark:hidden">Open</span>
            <span className="hidden text-gradient dark:inline">Open</span>
            <span className="text-gradient-blue">Printing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-neutral-700 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          >
            We make printing just work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-black text-white border border-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:border-white dark:hover:bg-neutral-200 font-medium h-11 px-8 rounded-full text-sm transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Link href="/about-us" prefetch={false} className="flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black/[0.2] dark:border-white/[0.12] text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.04] hover:text-black dark:hover:text-white font-medium h-11 px-8 rounded-full text-sm bg-transparent transition-all duration-200"
            >
              <Link href="/printers" prefetch={false}>Find a Printer</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-600 dark:text-neutral-500 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-neutral-700 dark:text-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
