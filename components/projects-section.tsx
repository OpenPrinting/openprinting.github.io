"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site.config"
import { getAssetPath } from "@/lib/utils";

type SoftwareItem = {
  title: string
  description: string
  image: string
  href: string
  delay: number
  isExternal?: boolean
}

type ProjectItem = {
  title: string
  description: string
  image: string
  href: string
  delay: number
  isExternal?: boolean
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const softwares: SoftwareItem[] = [
    {
      title: "Driverless Printers",
      description:
        "Most modern printers work 'out of the box' with OpenPrinting software. Browse the thousands of driverless printers.",
      image: getAssetPath("/ipp-everywhere.png"),
      href: "/printers",
      delay: 0.1,
    },
    {
      title: "Legacy Printers",
      description:
        "The Foomatic printer database lists all of the printers that are supported by free software printer drivers.",
      image: getAssetPath("/printer.png"),
      delay: 0.2,
      href: siteConfig.destinations.legacyPrinters,
      isExternal: true,
    },
    {
      title: "Windows?!",
      description:
        "Our Printer Applications revive old printers under current Windows, any model which works under Linux.",
      image: getAssetPath("/wsl-printing-icon.png"),
      delay: 0.3,
      href: "/wsl-printer-app",
    },
  ]

  const projects: ProjectItem[] = [
    {
      title: "Printer Working Group",
      description:
        "OpenPrinting collaborates with the PWG's Internet Printing Protocol workgroup to support this ubiquitous printing standard.",
      image: getAssetPath("/pwg.png"),
      href: siteConfig.destinations.printerWorkingGroup,
      delay: 0.1,
      isExternal: true,
    },
    {
      title: "GSoC - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoC program under its umbrella organization The Linux Foundation.",
      image: getAssetPath("/gsoc.jpeg"),
      delay: 0.2,
      href: "/gsoc",
    },
    {
      title: "GSoD - OpenPrinting",
      description:
        "OpenPrinting participates in the GSoD program under its umbrella organization The Linux Foundation.",
      image: getAssetPath("/gsod.jpg"),
      delay: 0.3,
      href: "/gsod",
    },
  ]

  return (
    <section ref={ref} className="relative py-24 bg-background" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        {/* Find Your Printer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">Find Your Printer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Printer Compatibility
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl mb-12 leading-relaxed"
        >
          Most modern printers work using OpenPrinting software without additional drivers. We also host a compatibility database for legacy printers supported by free software drivers.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {softwares.map((software, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: software.delay }}
              className="group"
            >
              <Link
                href={software.href}
                prefetch={false}
                className="block h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
              >
                <div className="p-4 bg-muted border-b border-border flex items-center justify-center">
                  <Image
                    src={software.image || getAssetPath("/placeholder.svg")}
                    alt={software.title}
                    width={200}
                    height={120}
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                    {software.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {software.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                    {software.title === "Windows?!" ? "Read More" : "Browse"}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="section-divider mb-24" />

        {/* Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">Community</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Collaborations & Programs
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
            OpenPrinting collaborates with standards groups and participates in coding and documentation programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: project.delay + 0.3 }}
              className="group"
            >
              {project.isExternal ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
                >
                  <div className="p-4 bg-muted border-b border-border flex items-center justify-center">
                    <Image
                      src={project.image || getAssetPath("/placeholder.svg")}
                      alt={project.title}
                      width={200}
                      height={120}
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              ) : (
                <Link
                  href={project.href}
                  prefetch={false}
                  className="block h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow"
                >
                  <div className="p-4 bg-muted border-b border-border flex items-center justify-center">
                    <Image
                      src={project.image || getAssetPath("/placeholder.svg")}
                      alt={project.title}
                      width={200}
                      height={120}
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24 mx-auto max-w-6xl" />
    </section>
  )
}
