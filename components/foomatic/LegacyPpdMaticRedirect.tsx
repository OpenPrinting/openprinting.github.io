"use client"

import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import LoadingScreen from "@/components/foomatic/LoadingScreen"
import { withBasePath } from "@/lib/foomatic/base-path"
import { resolveLegacyPpdMatic } from "@/lib/foomatic/legacy-php"

export default function LegacyPpdMaticRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const resolution = useMemo(
    () => resolveLegacyPpdMatic(searchParams),
    [searchParams]
  )

  useEffect(() => {
    if (resolution.assetPath) {
      window.location.replace(withBasePath(resolution.assetPath))
      return
    }

    router.replace(resolution.internalHref ?? resolution.fallbackHref)
  }, [resolution, router])

  return <LoadingScreen />
}
