"use client"

// Site-wide assistant entry point, mounted once in app/layout.tsx. The
// launcher is the only assistant code in the shared bundle; the panel (and
// the engine it imports) lives in a lazy chunk loaded on first open, and no
// assistant data is fetched until then.
//
// Visual identity: the site's blue accent family (hero gradients,
// text-gradient-blue) rather than --primary, which flips to near-white in
// dark mode and would make the launcher vanish against light content. White
// iconography on blue-500..700 keeps ≥3:1 contrast in both themes.

import { useState } from "react"
import dynamic from "next/dynamic"
import { MessageCircleMore, X } from "lucide-react"

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
        aria-controls="assistant-panel"
        onClick={() => {
          setLoaded(true)
          setOpen(current => !current)
        }}
        className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25 ring-1 ring-white/20 transition-[box-shadow,transform] duration-200 hover:shadow-xl hover:shadow-blue-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:scale-105 motion-safe:active:scale-95 print:hidden sm:bottom-6 sm:right-6"
      >
        <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden="true">
          <MessageCircleMore
            className={`absolute h-6 w-6 transition-all duration-200 motion-reduce:transition-none ${
              open ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-200 motion-reduce:transition-none ${
              open ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </span>
      </button>
      {loaded && <AssistantPanel open={open} onClose={() => setOpen(false)} launcherId={LAUNCHER_ID} />}
    </>
  )
}
