import Link from "next/link";
import { getGsocYearSummaries } from "@/lib/gsoc";
import { getContributorsByYear } from "@/data/gsoc-contributors";
import { ArrowRight, Users, FolderOpen } from "lucide-react";
import { GsocOrgBanner } from "@/components/gsoc-org-banner";

export default async function GsocIndexPage() {
  const years = await getGsocYearSummaries();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="hero-glow-blue opacity-40" />
        <div className="grid-pattern absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 tracking-wide uppercase">
            Open Source Contributions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-gradient-foreground">Google Summer</span>{" "}
            <span className="text-gradient-blue">of Code</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            OpenPrinting participates in GSoC under The Linux Foundation,
            mentoring contributors on printing infrastructure, desktop
            integration, and open-source development.
          </p>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Org info banner */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <GsocOrgBanner />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Year cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 tracking-wide uppercase">
              Browse by Year
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              All Editions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {years.map((item) => {
              const contributors = getContributorsByYear(Number(item.year));
              return (
                <Link
                  key={item.year}
                  href={`/gsoc/${item.year}`}
                  className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-border/80 hover:bg-accent card-glow"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.year}
                    </h3>
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      GSoC
                    </span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FolderOpen className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>
                        {item.projectCount} project{" "}
                        {item.projectCount === 1 ? "idea" : "ideas"}
                      </span>
                    </div>
                    {contributors.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>
                          {contributors.length} contributor
                          {contributors.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View projects
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
