"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function TopLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(0)

  const loadingRef = useRef(false)
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const firstRender = useRef(true)

  function clearTimers() {
    if (trickle.current) {
      clearInterval(trickle.current)
      trickle.current = null
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  function start() {
    if (loadingRef.current) return
    loadingRef.current = true
    clearTimers()
    setLoading(true)
    setWidth(8)
    trickle.current = setInterval(() => {
      setWidth((w) => (w >= 90 ? w : w + Math.max(0.5, (90 - w) * 0.08)))
    }, 200)
  }

  function done() {
    if (!loadingRef.current) return
    loadingRef.current = false
    clearTimers()
    setWidth(100)
    hideTimer.current = setTimeout(() => {
      setLoading(false)
      setWidth(0)
    }, 250)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    done()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const target = event.target as Element | null
      const anchor = target?.closest?.("a")
      if (!anchor) return
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("#")) return

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return

      start()
    }

    function onPopState() {
      start()
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("popstate", onPopState)
    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("popstate", onPopState)
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!loading) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5"
      role="progressbar"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.7)] transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
