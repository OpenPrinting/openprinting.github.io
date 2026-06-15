"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBasePath } from "@/lib/site";

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const basePath = getBasePath();

    const normalizedPath = basePath
      ? path.startsWith(basePath)
        ? path.slice(basePath.length) || "/"
        : path
      : path;

    // If the URL lacks a trailing slash, try adding one
    if (normalizedPath !== "/" && !normalizedPath.endsWith("/")) {
      const redirectTarget = path + "/";
      setRedirecting(true);
      window.location.replace(redirectTarget);
    }
  }, []);

  if (redirecting) {
    return null;
  }

  return (
    <main className="w-full min-h-screen pt-24 pb-16 bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Browse News
          </Link>
        </div>
      </div>
    </main>
  );
}
