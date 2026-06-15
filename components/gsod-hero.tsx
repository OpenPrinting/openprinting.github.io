type GsodHeroProps = {
  eyebrow: string
  titlePrimary: string
  titleAccent?: string
  subtitle?: string
  titleClassName?: string
}

export function GsodHero({
  eyebrow,
  titlePrimary,
  titleAccent,
  subtitle,
  titleClassName,
}: GsodHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      <div className="hero-glow-blue opacity-40" />
      <div className="grid-pattern absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
        <h1
          className={
            titleClassName ??
            "text-4xl font-bold tracking-tight leading-[1.1] md:text-5xl lg:text-6xl"
          }
        >
          <span className="text-gradient-foreground">{titlePrimary}</span>
          {titleAccent ? (
            <>
              {" "}
              <span className="text-gradient-blue">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
