"use client"

// The assistant chat panel: a compact anchored card on desktop, a full-height
// modal sheet on mobile. Lazy-loaded by AssistantLauncher, so none of this
// code or its data is part of the initial page load.
//
// Accessibility: role="dialog" (aria-modal + focus trap on mobile only -
// desktop keeps the page interactive, which is why the backdrop exists only
// on mobile), Escape closes, focus moves to the input on open and returns to
// the launcher on close, the message list is a polite live region, and all
// animation collapses under prefers-reduced-motion.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Send, X } from "lucide-react"

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
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
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

  // Return focus to the launcher when the panel closes.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (wasOpen.current && !open) {
      document.getElementById(launcherId)?.focus()
    }
    wasOpen.current = open
  }, [open, launcherId])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [messages, busy])

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

  const motionProps = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.2 },
      }

  return (
    <AnimatePresence>
      {open && (
        <>
          {isMobile && (
            <motion.div
              key="assistant-backdrop"
              className="fixed inset-0 z-[85] bg-black/40"
              aria-hidden="true"
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
            />
          )}
          <motion.div
            key="assistant-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Printer assistant"
            aria-modal={isMobile || undefined}
            className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col border-border bg-card shadow-xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[560px] sm:max-h-[calc(100dvh-7rem)] sm:w-[380px] sm:rounded-xl sm:border"
            {...motionProps}
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Printer assistant</h2>
                <p className="text-xs text-muted-foreground">Answers from the Foomatic printer database</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close assistant"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3"
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-foreground">
                    Ask me about the printers, drivers, and Linux support information in OpenPrinting&apos;s
                    Foomatic database.
                  </p>
                  <AssistantBlock block={{ kind: "chips", chips: suggestions }} onAsk={ask} busy={busy} />
                </div>
              )}
              {messages.map(message =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-lg bg-primary/10 px-3 py-2 text-sm text-foreground">
                      {message.text}
                    </p>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-2">
                    {message.plan?.blocks.map((block, index) => (
                      <AssistantBlock key={index} block={block} onAsk={ask} busy={busy} />
                    ))}
                  </div>
                )
              )}
              {busy && (
                <p className="text-xs text-muted-foreground" role="status">
                  Looking that up…
                </p>
              )}
            </div>

            <form
              className="border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
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
                  className="max-h-24 min-h-[2.25rem] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  disabled={busy || input.trim().length === 0}
                  aria-label="Send question"
                  className="rounded-md bg-primary p-2 text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
