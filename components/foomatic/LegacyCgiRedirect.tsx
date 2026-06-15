"use client"

import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import LoadingScreen from "@/components/foomatic/LoadingScreen"
import { resolveLegacyCgi } from "@/lib/foomatic/legacy-cgi"

interface LegacyCgiRedirectProps {
  endpoint: string
}

export default function LegacyCgiRedirect({ endpoint }: LegacyCgiRedirectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const resolution = useMemo(
    () => resolveLegacyCgi(endpoint, searchParams),
    [endpoint, searchParams]
  )

  useEffect(() => {
    if (resolution.external) {
      window.location.replace(resolution.href)
      return
    }

    router.replace(resolution.href)
  }, [resolution, router])

  return <LoadingScreen />
}
