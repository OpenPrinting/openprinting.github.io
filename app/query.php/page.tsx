import { Suspense } from "react"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

import QueryApiClient from "@/components/foomatic/QueryApiClient"

export default function QueryApiPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <QueryApiClient />
    </Suspense>
  )
}
