import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import LegacyCgiRedirect from "@/components/foomatic/LegacyCgiRedirect"

export default function LegacydownloadCgiPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LegacyCgiRedirect endpoint="download" />
    </Suspense>
  )
}
