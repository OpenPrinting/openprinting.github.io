"use client"

import { useEffect } from "react"
import { siteConfig } from "@/config/site.config";

export default function DriversPage() {
  useEffect(() => {
    window.location.href = siteConfig.destinations.drivers
  }, [])
  
  return (
    <main className="min-h-screen bg-background text-foreground container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
      <p className="text-muted-foreground">
        Redirecting to OpenPrinting Drivers database...
      </p>
    </main>
  );
}
