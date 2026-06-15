export type GsodContributor = {
  slug: string
  name: string
  title: string
  image: string
}

export const gsodContributors: GsodContributor[] = [
  {
    slug: "gsod-2020-students",
    name: "Piyush Goyal",
    title:
      "Tutorial and Design Guidelines for Printer/Scanner drivers in Printer Applications",
    image: "/assets/images/piyush.jpg",
  },
]

export function getGsodContributorBySlug(slug: string) {
  return gsodContributors.find((contributor) => contributor.slug === slug)
}
