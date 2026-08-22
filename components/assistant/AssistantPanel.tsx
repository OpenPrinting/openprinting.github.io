"use client"

// The assistant chat panel.
//
// Responsive tiers (JS-driven - the panel never server-renders, so the tier
// has a single source of truth instead of parallel CSS breakpoints):
// - compact (width < 640px OR height < 480px, i.e. phones in either
//   orientation): full-height modal sheet over a backdrop - aria-modal,
//   focus-trapped, body scroll locked, safe-area padded, keyboard-aware
//   (dvh sizing plus a visualViewport listener that keeps the newest message
//   and the input visible while the on-screen keyboard is up);
// - anchored (everything else): a compact surface (400px, 420px from md up)
//   whose height is capped against the fixed 4rem navbar
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
import { motion, useReducedMotion } from "framer-motion"
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
  // Compact tier = the full-height sheet. Applies below the sm breakpoint OR
  // on short viewports (phone landscape: an anchored card capped against the
  // navbar would leave a ~200px panel there).
  const [isCompact, setIsCompact] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // Derived from innerWidth/innerHeight rather than MediaQueryList.matches:
    // MQL updates ride the rendering pipeline and can lag (or never fire
    // change events) in throttled/background documents, while the window
    // dimensions are always current. The panel never server-renders
    // (dynamic ssr:false), so the layout tier can safely live in JS state.
    const update = () => setIsCompact(window.innerWidth < 640 || window.innerHeight < 480)
    update()
    const query = window.matchMedia("(max-width: 639px)")
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
    if (!open || !isCompact) return
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
  }, [open, isCompact])

  // When the on-screen keyboard opens/closes the visual viewport resizes;
  // keep the newest message (and therefore the input above it) in view.
  useEffect(() => {
    if (!open || !isCompact) return
    const viewport = window.visualViewport
    if (!viewport) return
    const onResize = () => {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
    }
    viewport.addEventListener("resize", onResize)
    return () => viewport.removeEventListener("resize", onResize)
  }, [open, isCompact])

  // Return focus to the launcher when the panel closes.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open) {
      document.getElementById(launcherId)?.focus()
    }
    wasOpen.current = open
  }, [open, launcherId])

  // Scroll policy: a newly completed assistant response is revealed from its
  // TOP, so the user reads the introduction and any caveats before the result
  // cards - a ten-card answer must not dump them at the last card. For short
  // responses the scroll clamps to the bottom naturally (the target sits past
  // the maximum scroll offset), so nothing jumps. User messages and the busy
  // indicator still track the bottom so "what you just sent" stays visible.
  // Only message arrival triggers auto-scroll; manual scrolling is untouched.
  useEffect(() => {
    const log = logRef.current
    if (!log) return
    const behavior = reducedMotion ? ("auto" as const) : ("smooth" as const)
    const last = messages[messages.length - 1]
    if (last?.role === "assistant") {
      const element = log.querySelector<HTMLElement>(`[data-message-id="${last.id}"]`)
      if (element) {
        const top = element.getBoundingClientRect().top - log.getBoundingClientRect().top + log.scrollTop
        log.scrollTo({ top: Math.max(0, top - 8), behavior })
        return
      }
    }
    log.scrollTo({ top: log.scrollHeight, behavior })
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

  const messageMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.15, ease: "easeOut" as const },
      }

  // The open/close presentation is deliberately plain CSS driven by `open`:
  // the closed panel is visibility-hidden and pointer-events-none IMMEDIATELY,
  // never gated on an animation finishing. (An animation-gated unmount left
  // the closed sheet invisibly mounted over the page - covering the launcher
  // and swallowing every tap - whenever exit completion stalled.) Opening
  // still eases in via a CSS transition; closing is instant, which reduced
  // motion requires anyway. CSS transitions always settle at their final
  // state, so no environment can strand the panel half-closed.
  return (
    <>
      {isCompact && (
        <div
          className={`fixed inset-0 z-[65] bg-black/50 transition-opacity duration-200 motion-reduce:transition-none ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={open ? onClose : undefined}
        />
      )}
      <div
            id="assistant-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Printer assistant"
            aria-modal={isCompact && open ? true : undefined}
            className={`fixed z-[70] flex flex-col overflow-hidden bg-card shadow-2xl ring-1 ring-black/5 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none dark:ring-white/10 ${
              isCompact
                ? "inset-0 h-[100dvh] w-full"
                : "bottom-[5.75rem] right-6 h-[min(37.5rem,calc(100dvh-10.5rem))] w-[400px] rounded-2xl border border-border md:w-[420px]"
            } ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0 pointer-events-none"}`}
          >
            <header
              className={`flex items-center justify-between gap-3 border-b border-border bg-card px-4 pb-3 ${
                isCompact ? "pt-[max(0.75rem,env(safe-area-inset-top))]" : "pt-3"
              }`}
            >
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
              {/* Sheet-only: the sheet covers the launcher and Escape has no
                  touch equivalent. In the anchored tier the launcher itself
                  morphs into the close control, so a second X would be
                  redundant - exactly one close affordance is visible at any
                  time. */}
              {isCompact && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close assistant"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
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
                  <motion.div
                    key={message.id}
                    data-message-id={message.id}
                    className="space-y-2.5"
                    {...messageMotion}
                  >
                    {message.plan?.blocks.map((block, index) => (
                      <AssistantBlock key={index} block={block} onAsk={ask} busy={busy} />
                    ))}
                  </motion.div>
                )
              )}
              {busy && (
                <p className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
                  <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Looking that upâ€¦
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
      </div>
    </>
  )
}
