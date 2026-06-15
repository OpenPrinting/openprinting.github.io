import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="sr-only">Loading…</span>
    </main>
  )
}
