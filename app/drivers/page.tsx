"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import LoadingScreen from "@/components/foomatic/LoadingScreen"

export default function DriversPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/foomatic/drivers")
  }, [router])

  return <LoadingScreen />
}
