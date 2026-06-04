import Image from "next/image"
import { notFound } from "next/navigation"
import { GsodHero } from "@/components/gsod-hero"
import { getGsodContributorBySlug } from "@/data/gsod-contributors"
import { siteConfig } from "@/config/site.config";

const basePath = siteConfig.urls.basePath

export default function GSoD2020StudentsPage() {
  const contributor = getGsodContributorBySlug("gsod-2020-students")

  if (!contributor) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <GsodHero
        eyebrow="Contributors"
        titlePrimary="GSoD 2020"
        titleAccent="Students"
        subtitle="Contributors listed for OpenPrinting's Google Season of Docs 2020 participation."
      />

      <div className="section-divider mx-auto max-w-6xl" />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-center">
            <article className="w-full max-w-sm rounded-xl border border-border bg-card p-8 text-center card-glow">
              <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border border-border bg-muted">
                <Image
                  src={`${basePath}${contributor.image}`}
                  alt={contributor.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight">{contributor.name}</h2>
              <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                {contributor.title}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
