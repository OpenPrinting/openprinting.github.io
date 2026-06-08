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
  const photoBanner = Boolean(logo);

  return (
    <div className="relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-28 md:py-32 min-h-[340px] flex items-center overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-no-repeat ${photoBanner ? "opacity-100" : "opacity-100 dark:opacity-40"}`}
        style={{ backgroundImage: `url(${getAssetPath(image)})`, backgroundPosition: imagePosition }}
        aria-hidden
      />
      {photoBanner ? (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25"
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 bg-white/65 dark:bg-zinc-900/90" aria-hidden />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {logo ? (
          <div className="mb-6 inline-block overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <Image
              src={getAssetPath(logo)}
              alt={title}
              width={120}
              height={120}
              className="h-20 w-20 object-cover sm:h-28 sm:w-28"
              priority
            />
          </div>
        ) : null}
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            photoBanner ? "text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={
              photoBanner
                ? "text-xl text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
                : "text-xl text-zinc-700 dark:text-white/80"
            }
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
