// Route -> typed page context. This module is the only place the assistant
// inspects URL strings; everything downstream consumes AssistantPageContext.
// The parsing inverts printerHref()/driverHref() from lib/foomatic/routes.ts
// and is round-trip tested against them, so context stays correct if the
// canonical URL builders ever change shape (the test will fail loudly).

import type { AssistantPageContext } from "./types"

export function parsePageContext(pathname: string): AssistantPageContext {
  const route = pathname || "/"
  const segments = route.split("/").map(decodeSegment).filter(Boolean)

  if (segments.length === 0) {
    return { pageType: "home", route }
  }

  if (segments[0] === "foomatic") {
    if (segments[1] === "printer" && segments.length === 4) {
      return { pageType: "printer", route, printerId: segments[3] }
    }
    if (segments[1] === "driver" && segments.length === 3) {
      return { pageType: "driver", route, driverId: segments[2] }
    }
    if (segments[1] === "printers" && segments.length === 2) {
      return { pageType: "printer-directory", route }
    }
    if (segments[1] === "drivers" && segments.length === 2) {
      return { pageType: "driver-directory", route }
    }
  }

  return { pageType: "other", route }
}

function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}
