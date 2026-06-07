type NavigationItem = {
  name: string;
  href: string;
};

type FooterLinkSection = {
  title: string;
  links: NavigationItem[];
};

export interface SiteConfig {
  repo: {
    owner: string;
    name: string;
    slug: `${string}/${string}`;
    organizationUrl: string;
  };
  brand: {
    name: string;
    title: string;
    tagline: string;
    organization: string;
    description: string;
    logoPath: string;
    defaultOgImagePath: string;
    heroTexturePath: string;
    authorPlaceholderPath: string;
  };
  urls: {
    canonicalOrigin: string;
    basePath: string;
    assetPrefix: string;
    rssPath: string;
  };
  destinations: {
    github: string;
    cups: string;
    drivers: string;
    legacyPrinters: string;
    monthlyCallMinutes: string;
    printerWorkingGroup: string;
    linuxFoundationGsocWiki: string;
    mailingList: string;
    mastodon: string;
    linkedin: string;
  };
  navigation: {
    primary: NavigationItem[];
    secondary: NavigationItem[];
    footer: FooterLinkSection[];
  };
  discussion: {
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    term: string;
  };
}

const repoOwner = "OpenPrinting";
const repoName = "openprinting.github.io";
const repoSlug = `${repoOwner}/${repoName}` as const;
const canonicalOrigin =
  process.env.NEXT_PUBLIC_BASE_URL || "https://openprinting.github.io";
// This deploys to the OpenPrinting organization *root* Pages site
// (https://openprinting.github.io/), so the site is served from the domain
// root and basePath must be empty. `??` (not `||`) so an explicit empty
// override is honored; set NEXT_PUBLIC_BASE_PATH only for project-subpath previews.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPrefix = basePath ? `${basePath}/` : "";

export const siteConfig: SiteConfig = {
  repo: {
    owner: repoOwner,
    name: repoName,
    slug: repoSlug,
    organizationUrl: "https://github.com/OpenPrinting",
  },
  brand: {
    name: "OpenPrinting",
    title: "OpenPrinting - OpenPrinting",
    tagline: "Making Printing Just Work!",
    organization: "Linux Foundation",
    description:
      "OpenPrinting is dedicated to providing open-source printing solutions for Linux, Unix, and other operating systems. Explore drivers, tools, and resources to enhance your printing experience.",
    logoPath: "/openprinting.png",
    defaultOgImagePath: "/OpenPrintingBox.png",
    heroTexturePath: "/rotation_pantone.jpg",
    authorPlaceholderPath: "/authors/placeholder.jpg",
  },
  urls: {
    canonicalOrigin,
    basePath,
    assetPrefix,
    rssPath: "/feed.xml",
  },
  destinations: {
    github: "https://github.com/OpenPrinting",
    cups: "https://openprinting.github.io/cups/",
    drivers: "https://openprinting.org/drivers",
    legacyPrinters: "https://openprinting.org/printers",
    monthlyCallMinutes: "http://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/",
    printerWorkingGroup: "https://www.pwg.org/ipp/",
    linuxFoundationGsocWiki: "https://wiki.linuxfoundation.org/gsoc/",
    mailingList: "mailto:printing-architecture@lists.linux-foundation.org",
    mastodon: "https://ubuntu.social/tags/OpenPrinting",
    linkedin: "https://www.linkedin.com/company/openprinting/posts/",
  },
  navigation: {
    primary: [
      { name: "About Us", href: "/about-us" },
      { name: "News and Events", href: "/news" },
      { name: "Projects", href: "/projects" },
      { name: "Downloads", href: "/downloads" },
      { name: "Documentation", href: "/documentation" },
    ],
    secondary: [
      { name: "Upcoming Technologies", href: "/upcoming-technologies" },
      { name: "Driverless Printing", href: "/driverless" },
      { name: "Printers", href: "/foomatic" },
      { name: "Printer Drivers", href: "/foomatic/driver/" },
      { name: "Legacy Printers under Windows", href: "/wsl-printer-app" },
      { name: "Contact Us", href: "/contact" },
      { name: "Donations", href: "/donations" },
    ],
    footer: [
      {
        title: "Quick Links",
        links: [
          { name: "About Us", href: "/about-us" },
          { name: "Projects", href: "/projects" },
          { name: "News and Events", href: "/news" },
          { name: "Downloads", href: "/downloads" },
          { name: "Documentation", href: "/documentation" },
        ],
      },
      {
        title: "Community",
        links: [
          { name: "GitHub", href: "https://github.com/OpenPrinting" },
          { name: "Google Summer of Code", href: "/gsoc" },
          { name: "Google Season of Docs", href: "/gsod" },
          { name: "Contribute", href: "/contribute" },
          { name: "Sponsors", href: "/sponsors" },
          { name: "Opportunity Open Source", href: "/opportunity-open-source" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "CUPS", href: "https://openprinting.github.io/cups/" },
          { name: "Printer Database", href: "/printers" },
          { name: "Printer Working Group", href: "https://www.pwg.org/ipp/" },
        ],
      },
    ],
  },
  discussion: {
    repo: repoSlug,
    // Node IDs for OpenPrinting/openprinting.github.io. The repo currently has
    // no dedicated "Blog Comments" discussion category, so comments map to
    // "General". A maintainer may create an Announcements-type "Blog Comments"
    // category and update categoryId here (see migration report).
    repoId: "MDEwOlJlcG9zaXRvcnk2MzgyODkxMA==",
    category: "General",
    categoryId: "MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDg1ODU5",
    term: "Welcome to OpenPrinting Blog",
  },
};
