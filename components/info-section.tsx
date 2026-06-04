"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils";

type InfoItem = {
  title: string
  description: string
  icon: string
  href: string
  delay: number
}

export default function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const items: InfoItem[] = [
    {
      title: "About Us",
      description:
        "Learn more about OpenPrinting, how it works, the people involved, and the projects maintained by it",
      icon: getAssetPath("/OpenPrintingBox.png"),
      href: "/about-us",
      delay: 0.1,
    },
    {
      title: "Contribute",
      description:
        "Know how you can be part of an excellent community and help improve printing experience for millions of users",
      icon: getAssetPath("/contribute.png"),
      href: "/contribute",
      delay: 0.2,
    },
    {
      title: "CUPS",
      description:
        "CUPS is the standards-based, open source printing system that is used on Linux® and other operating systems.",
      icon: getAssetPath("/cups.png"),
      href: siteConfig.destinations.cups,
      delay: 0.3,
    },
  ]

  return (
    <section ref={ref} className="relative bg-background" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            About OpenPrinting
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="group"
            >
              <Link
                href={item.href}
                prefetch={false}
                className="block h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
              >
                <div className="mb-5 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden p-4 h-40">
                  <Image
                    src={item.icon || getAssetPath("/placeholder.svg")}
                    alt={item.title}
                    width={160}
                    height={120}
                    className="object-contain max-h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </div>

      <div className="section-divider mt-24 mx-auto max-w-6xl" />
    </section>
  )
}
