"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type StatusVariant = "Perfect" | "Mostly" | "Unsupported" | "Unknown"

const statusClasses: Record<StatusVariant, string> = {
  Perfect:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Mostly:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Unsupported:
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  Unknown:
    "border-border bg-muted text-muted-foreground",
}

export function FoomaticPageSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("max-w-6xl mx-auto px-6", className)} {...props} />
}

export function FoomaticCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export function FoomaticBadge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        className
      )}
      {...props}
    />
  )
}

export function FoomaticStatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const normalized = (status || "Unknown").toLowerCase()
  const variant: StatusVariant =
    normalized === "perfect"
      ? "Perfect"
      : normalized === "mostly" || normalized === "partial"
        ? "Mostly"
        : normalized === "unsupported"
          ? "Unsupported"
          : "Unknown"

  return (
    <FoomaticBadge
      className={cn(statusClasses[variant], className)}
      aria-label={`Support status: ${variant}`}
    >
      {variant}
    </FoomaticBadge>
  )
}

export function FoomaticSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export function FoomaticHeroPill({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-black/[0.15] dark:border-white/[0.08] bg-black/[0.05] dark:bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-400 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-glow-pulse" />
      {children}
    </div>
  )
}
