"use client"

import { Search as SearchIcon } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn, getAssetPath } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/config/site.config"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (
        (isMac && event.metaKey && event.key.toLowerCase() === "k") ||
        (!isMac && event.ctrlKey && event.key.toLowerCase() === "k")
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        "bg-white/70 dark:bg-black/70 backdrop-blur-lg",
        scrolled
          ? "border-b border-border shadow-sm dark:shadow-[0_1px_0_0_rgba(255,255,255,0.02)]"
          : "border-b border-transparent",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <Image
                src={getAssetPath(siteConfig.brand.logoPath)}
                alt={`${siteConfig.brand.name} Logo`}
                width={32}
                height={32}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">
              {siteConfig.brand.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.primary.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  prefetch={false}
                  className="relative px-3 py-2 text-sm text-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-accent"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="ml-2"
            >
              <Button
                onClick={() => setSearchOpen(true)}
                variant="outline"
                size="sm"
                className="rounded-full text-foreground border-border bg-transparent h-8 px-4 font-medium hover:bg-accent hover:border-foreground/20 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring transition-colors flex items-center"
              >
                <SearchIcon className="w-4 h-4" />
                <span className="ml-2 text-xs">Search</span>
                <span className="ml-3 hidden lg:flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground/60">
                  <kbd className="font-sans">Cmd/Ctrl</kbd>
                  <kbd className="font-sans">+</kbd>
                  <kbd className="font-sans">K</kbd>
                </span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.45 }}
              className="ml-1"
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="ml-1"
            >
              <Button
                asChild
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 text-xs font-medium h-8 px-4 rounded-full transition-all duration-200"
              >
                <Link href={siteConfig.destinations.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="ml-1"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 rounded-full"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </motion.div>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground hover:bg-accent h-9 w-9"
              aria-label="Open search"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-accent h-9 w-9"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Menu Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block absolute top-[3.5rem] right-6 w-[260px] z-50"
            >
              <div className="absolute -top-[0.4rem] right-[0.625rem] w-3 h-3 bg-background border-t border-l border-border transform rotate-45 z-0" />
              <div className="relative bg-background border border-border shadow-xl rounded-xl overflow-hidden z-10 flex flex-col py-1">
                {siteConfig.navigation.secondary.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="block px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 border-b border-border/40 last:border-0"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {[...siteConfig.navigation.primary, ...siteConfig.navigation.secondary].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                >
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: (siteConfig.navigation.primary.length + siteConfig.navigation.secondary.length) * 0.03 }}
                className="pt-3"
              >
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs font-medium rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={siteConfig.destinations.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  )
}
