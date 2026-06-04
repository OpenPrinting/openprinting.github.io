import { getAssetPath } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-28 md:py-32 min-h-[340px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-100 dark:opacity-40"
        style={{ backgroundImage: `url(${getAssetPath("/rotation_pantone.jpg")})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-white/65 dark:bg-zinc-900/90"
        aria-hidden
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {description ? (
          <p className="text-xl text-zinc-700 dark:text-white/80">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
