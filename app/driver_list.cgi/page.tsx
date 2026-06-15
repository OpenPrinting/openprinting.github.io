import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import LegacyCgiRedirect from "@/components/foomatic/LegacyCgiRedirect"

export default function Legacydriver_listCgiPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LegacyCgiRedirect endpoint="driver_list" />
    </Suspense>
  )
}
