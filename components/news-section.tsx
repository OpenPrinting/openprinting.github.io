"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import NewsCard, { type NewsCardPost } from "@/components/news-card"

export default function NewsSection({ posts }: { posts: NewsCardPost[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-24 bg-background" id="news">
      <div className="hero-glow-blue opacity-30" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">What&apos;s New</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Latest News
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24 mx-auto max-w-6xl" />
    </section>
  )
}
