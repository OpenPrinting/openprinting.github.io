import { Suspense } from "react"

import DriverListClient from "@/components/foomatic/DriverListClient"

export const metadata = {
  title: "Printer Drivers | OpenPrinting Foomatic",
  description:
    "Browse the OpenPrinting Foomatic driver database. Find printer drivers, their supported printers, licenses, and project home pages.",
}

export default function DriverIndexPage() {
  return (
    <Suspense fallback={null}>
      <DriverListClient />
    </Suspense>
  )
}
