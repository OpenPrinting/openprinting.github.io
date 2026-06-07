import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
  imagePosition?: string;
  logo?: string;
};

export function PageHero({
  title,
  description,
  image = "/rotation_pantone.jpg",
  imagePosition = "right center",
  logo,
}: PageHeroProps) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-28 md:py-32 min-h-[340px] flex items-center overflow-hidden">
      {logo ? (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-black"
            aria-hidden
          />
          <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-100 dark:opacity-40"
            style={{ backgroundImage: `url(${getAssetPath(image)})`, backgroundPosition: imagePosition }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/65 dark:bg-zinc-900/90" aria-hidden />
        </>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {logo ? (
          <div className="mb-6 inline-flex items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
            <Image
              src={getAssetPath(logo)}
              alt={title}
              width={320}
              height={136}
              className="h-12 w-auto object-contain sm:h-16"
              priority
            />
          </div>
        ) : null}
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
