import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import LegacyCgiRedirect from "@/components/foomatic/LegacyCgiRedirect"

export default function Legacyshow_printerCgiPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LegacyCgiRedirect endpoint="show_printer" />
    </Suspense>
  )
}
