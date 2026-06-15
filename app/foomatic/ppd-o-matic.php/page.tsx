import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import LegacyPpdMaticRedirect from "@/components/foomatic/LegacyPpdMaticRedirect"

export default function LegacyPpdMaticPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LegacyPpdMaticRedirect />
    </Suspense>
  )
}
