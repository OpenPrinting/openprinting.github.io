"use client"

// The assistant chat panel.
//
// Responsive tiers:
// - mobile (<640px): full-height modal sheet over a backdrop - aria-modal,
//   focus-trapped, body scroll locked, safe-area padded, keyboard-aware
//   (dvh sizing plus a visualViewport listener that keeps the newest message
//   and the input visible while the on-screen keyboard is up);
// - tablet/desktop (>=640px): a compact anchored surface (400px, 420px from
//   md up) whose height is capped against the fixed 4rem navbar
//   (min(600px, 100dvh - 10.5rem)), non-modal so the page stays readable.
//
// Stacking: backdrop z-[65] / panel z-[70] - above the navbar (z-50) and the
// z-40 launcher, below the search modal (z-[100]) and TopLoader (z-[9999]).
//
// Accessibility: role="dialog", Escape closes, focus moves to the input on
// open and returns to the launcher on close, the conversation is a polite
// live region, and every animation collapses under prefers-reduced-motion.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Loader2, Printer, Send, X } from "lucide-react"

import { parsePageContext } from "@/lib/assistant/context"
import { createBrowserData } from "@/lib/assistant/data"
import { runAssistant } from "@/lib/assistant/engine"
import { contextSuggestions } from "@/lib/assistant/respond"
import type { ResponsePlan } from "@/lib/assistant/types"
import { AssistantBlock } from "./AssistantBlocks"

interface Message {
  id: number
  role: "user" | "assistant"
  text?: string
  plan?: ResponsePlan
}

interface AssistantPanelProps {
  open: boolean
  onClose: () => void
  launcherId: string
}

// One data source per tab: all fetches are cached and shared across turns.
const data = createBrowserData()

let nextMessageId = 1

export default function AssistantPanel({ open, onClose, launcherId }: AssistantPanelProps) {
  const pathname = usePathname()
  const context = useMemo(() => parsePageContext(pathname ?? "/"), [pathname])
  // Latest context for the ask callback: usePathname already excludes any
  // configured basePath, unlike window.location.pathname.
  const contextRef = useRef(context)
  useEffect(() => {
    contextRef.current = context
  }, [context])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)")
    const update = () => setIsMobile(query.matches)
    update()
    // The resize fallback covers environments where matchMedia change events
    // are unreliable; polling `matches` is cheap and setState is a no-op when
    // the value is unchanged.
    query.addEventListener("change", update)
    window.addEventListener("resize", update)
    return () => {
      query.removeEventListener("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  // Warm the catalogue while the user types their first question; failures
  // are ignored here because every query retries through the cache.
  useEffect(() => {
    if (open) {
      data.getCatalog().catch(() => {})
      data.getDriversMap().catch(() => {})
    }
  }, [open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // Escape closes; guard on our own open state (same window-listener idiom as
  // the navbar and search modal).
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  // Mobile is modal: lock body scroll and trap Tab inside the sheet.
  useEffect(() => {
    if (!open || !isMobile) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], textarea, input, [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", trap)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", trap)
    }
  }, [open, isMobile])

  // When the on-screen keyboard opens/closes the visual viewport resizes;
  // keep the newest message (and therefore the input above it) in view.
  useEffect(() => {
    if (!open || !isMobile) return
    const viewport = window.visualViewport
    if (!viewport) return
    const onResize = () => {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
    }
    viewport.addEventListener("resize", onResize)
    return () => viewport.removeEventListener("resize", onResize)
  }, [open, isMobile])

  // Return focus to the launcher when the panel closes.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open) {
      document.getElementById(launcherId)?.focus()
    }
    wasOpen.current = open
  }, [open, launcherId])

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    })
  }, [messages, busy, reducedMotion])

  const ask = useCallback(
    async (query: string) => {
      const trimmed = query.trim()
      if (!trimmed || busy) return
      setInput("")
      setMessages(current => [...current, { id: nextMessageId++, role: "user", text: trimmed }])
      setBusy(true)
      try {
        const turn = await runAssistant(trimmed, contextRef.current, data)
        setMessages(current => [...current, { id: nextMessageId++, role: "assistant", plan: turn.plan }])
      } finally {
        setBusy(false)
        inputRef.current?.focus()
      }
    },
    [busy]
  )

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void ask(input)
    }
  }

  const suggestions = useMemo(() => contextSuggestions(context), [context])

  const panelMotion = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.97 },
        transition: { duration: 0.2, ease: "easeOut" as const },
      }

  const messageMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.15, ease: "easeOut" as const },
      }

  return (
    <AnimatePresence>
      {open && (
        <>
          {isMobile && (
            <motion.div
              key="assistant-backdrop"
              className="fixed inset-0 z-[65] bg-black/50"
              aria-hidden="true"
              onClick={onClose}
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
            />
          )}
          <motion.div
            key="assistant-panel"
            id="assistant-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Printer assistant"
            aria-modal={isMobile || undefined}
            className="fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden bg-card shadow-2xl ring-1 ring-black/5 dark:ring-white/10 sm:inset-auto sm:bottom-[5.75rem] sm:right-6 sm:h-[min(37.5rem,calc(100dvh-10.5rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-border md:w-[420px]"
            {...panelMotion}
          >
            <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm"
                  aria-hidden="true"
                >
                  <Printer className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold tracking-tight text-foreground">
                    Printer assistant
                  </h2>
                  <p className="truncate text-xs text-muted-foreground">
                    Answers from the Foomatic printer database
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close assistant"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-busy={busy}
              aria-label="Conversation"
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.length === 0 && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-foreground">
                      Hi - I answer questions from OpenPrinting&apos;s Foomatic printer database.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Ask about printers, Linux support, drivers, or similar models - or start with one
                      of these:
                    </p>
                  </div>
                  <AssistantBlock block={{ kind: "chips", chips: suggestions }} onAsk={ask} busy={busy} />
                </div>
              )}
              {messages.map(message =>
                message.role === "user" ? (
                  <motion.div key={message.id} className="flex justify-end" {...messageMotion}>
                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-blue-600 px-3.5 py-2 text-sm leading-relaxed text-white">
                      {message.text}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key={message.id} className="space-y-2.5" {...messageMotion}>
                    {message.plan?.blocks.map((block, index) => (
                      <AssistantBlock key={index} block={block} onAsk={ask} busy={busy} />
                    ))}
                  </motion.div>
                )
              )}
              {busy && (
                <p className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
                  <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Looking that up…
                </p>
              )}
            </div>

            <form
              className="border-t border-border bg-card px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              onSubmit={event => {
                event.preventDefault()
                void ask(input)
              }}
            >
              <div className="flex items-end gap-2">
                <label htmlFor="assistant-input" className="sr-only">
                  Ask about printers
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  rows={1}
                  maxLength={300}
                  placeholder="e.g. find a colour laser printer"
                  className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  disabled={busy || input.trim().length === 0}
                  aria-label="Send question"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
