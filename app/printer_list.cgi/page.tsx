import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import LegacyCgiRedirect from "@/components/foomatic/LegacyCgiRedirect"

export default function Legacyprinter_listCgiPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LegacyCgiRedirect endpoint="printer_list" />
    </Suspense>
  )
}
