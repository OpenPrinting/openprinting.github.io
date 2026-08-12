"use client"

// Site-wide assistant entry point, mounted once in app/layout.tsx. The
// launcher itself is the only assistant code in the shared bundle; the panel
// (and the engine it imports) lives in a lazy chunk that loads on first open,
// and no assistant data is fetched until then.

import { useState } from "react"
import dynamic from "next/dynamic"
import { MessageCircle } from "lucide-react"

const AssistantPanel = dynamic(() => import("./AssistantPanel"), { ssr: false })

const LAUNCHER_ID = "assistant-launcher"

export default function AssistantLauncher() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <button
        id={LAUNCHER_ID}
        type="button"
        aria-label={open ? "Close printer assistant" : "Open printer assistant"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          setLoaded(true)
          setOpen(current => !current)
        }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 print:hidden"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </button>
      {loaded && <AssistantPanel open={open} onClose={() => setOpen(false)} launcherId={LAUNCHER_ID} />}
    </>
  )
}
