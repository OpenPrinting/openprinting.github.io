import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays, ExternalLink, MapPin } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { Linkedin } from "lucide-react"
import { getSiteUrl } from "@/lib/site"
import {
  editions,
  opportunityOpenSource as oos,
  type ConferenceEdition,
} from "@/data/opportunity-open-source"

export const metadata: Metadata = {
  title: "Opportunity Open Source | OpenPrinting",
  description:
    "Opportunity Open Source is OpenPrinting's annual FOSS conference in India — talks, workshops and hackathons that bring students into open source. See past editions and the next one.",
  alternates: { canonical: getSiteUrl("/opportunity-open-source/") },
  openGraph: {
    title: "Opportunity Open Source | OpenPrinting",
    description:
      "OpenPrinting's annual free and open source software conference in India. Past editions and the upcoming one.",
    url: getSiteUrl("/opportunity-open-source/"),
    type: "website",
  },
}

function EditionCard({ edition }: { edition: ConferenceEdition }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {oos.shortName} {edition.edition}
        </span>
        {edition.upcoming ? (
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Upcoming
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">{edition.year}</span>
        )}
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>
            {edition.venue} <span className="text-muted-foreground">· {edition.location}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>{edition.dates}</span>
        </div>
      </dl>

      {edition.summary ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{edition.summary}</p>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm">
        {edition.recapUrl ? (
          <Link
            href={edition.recapUrl}
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            {edition.upcoming ? "Announcement" : "Read the recap"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
        {edition.scheduleUrl ? (
          <a
            href={edition.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
          >
            Schedule
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default function OpportunityOpenSourcePage() {
  const next = editions.find((e) => e.upcoming)
  const past = editions.filter((e) => !e.upcoming)

  return (
    <>
      <PageHero
        title="Opportunity Open Source"
        description="OpenPrinting's annual free and open source software conference in India."
      />

      <main className="min-h-screen bg-background text-foreground pt-16 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          <section className="space-y-4">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">{oos.mission}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{oos.origin}</p>
            <a
              href={oos.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Linkedin className="h-4 w-4" />
              Follow Opportunity Open Source on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </section>

          {next ? (
            <section>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Next edition
              </h2>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-3xl font-bold tracking-tight">
                      {oos.shortName} {next.edition}
                    </h3>
                    <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Upcoming
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {next.venue} · {next.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {next.dates}
                    </span>
                  </div>
                  {next.summary ? (
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {next.summary}
                    </p>
                  ) : null}
                  {next.recapUrl ? (
                    <Link
                      href={next.recapUrl}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read the announcement
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Past editions</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((edition) => (
                <EditionCard key={edition.edition} edition={edition} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-muted/30 p-8">
            <h2 className="text-2xl font-bold tracking-tight">Get involved</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Want to speak, host a future edition, sponsor the conference, or just attend? Follow the
              conference on LinkedIn for announcements and calls for proposals, or get in touch with the
              OpenPrinting team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href={oos.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-accent"
              >
                Contact us
              </Link>
              <Link
                href="/gsoc"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-accent"
              >
                Google Summer of Code
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium text-foreground hover:bg-accent"
              >
                Sponsors &amp; donations
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
