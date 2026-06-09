import { Suspense } from "react"

import PpdViewerClient from "@/components/foomatic/PpdViewerClient"

export default function ViewPpdPage() {
  return (
    <Suspense fallback={null}>
      <PpdViewerClient />
    </Suspense>
  )
}
