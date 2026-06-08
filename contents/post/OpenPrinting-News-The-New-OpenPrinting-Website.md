---
title: "OpenPrinting News - The New OpenPrinting Website"
layout: single
toc: true
toc_sticky: true
author: Rudra
excerpt: "We rebuilt the OpenPrinting website from the ground up — a fast, fully static Next.js site. Here is how it works, who built it, and how you can help by testing it."
date: '2026-06-07'
teaser_image: /rotation_pantone.jpg
---

<img src="/rotation_pantone.jpg" alt="The new OpenPrinting website" style="width:100%;height:auto;border-radius:12px;border:1px solid rgba(127,127,127,0.2)" />

We are excited to share that the OpenPrinting website has been **rebuilt from the ground up**. The old Jekyll site has been replaced by a modern, fully static site that is faster, easier to contribute to, and now hosts the printer/driver database lookup directly on the site.

This post explains the new architecture, credits the people who built it, and invites you to try it out and report anything that looks off.

## What's new at a glance

- **Printer & driver database, on-site** — browse [printers](/foomatic/printers) and [drivers](/foomatic/drivers) directly here.
- **Site-wide search** — press the search button in the header to search posts, docs, projects, printers and drivers.
- **Sponsors & supporters** — see who supports OpenPrinting on the [Sponsors](/sponsors) page.
- **Opportunity Open Source** — our annual FOSS conference in India now has a [home page](/opportunity-open-source).
- **Light / dark / system theme**, a responsive design, comments on posts, and an [RSS feed](/feed.xml).

## A new architecture

The guiding idea was simple: **everything is generated at build time, and the deployed site is 100% static** — no application server, no database, and no runtime backend. That makes it cheap to host on GitHub Pages, fast for visitors, and robust.

The main pieces:

- **Next.js (App Router) with static export.** The whole site is pre-rendered to static HTML/JS and served from GitHub Pages. There is nothing to run on the server.
- **Content as Markdown.** All pages, news posts, project descriptions and documentation live as Markdown files in the repository. Contributors only have to learn one single format to add or edit content — no templating or code required.
- **A reusable author system.** Posts reference an author, and the matching profile (avatar, role, and social links such as Mastodon and LinkedIn) is rendered automatically.
- **The Foomatic printer/driver database, on-site.** The printer and driver lookup is generated at build time from the upstream `foomatic-db` data: the XML is converted to JSON, and a page is statically generated for every printer and every driver. Browse printers at **/foomatic/printers** and drivers at **/foomatic/drivers**, with the original `/printer/show/...` and `/driver/...` URLs preserved via redirects so old links keep working.
- **Client-side search.** A search index is built at compile time and shipped as a static file, so the search box works entirely in the browser across posts, documentation, projects, pages, printers and drivers — again, no server needed.
- **Comments via Giscus.** Discussion on posts is powered by GitHub Discussions, so there is no third-party comment service to maintain.
- **Theming and design.** A light/dark/system theme toggle and a clean, responsive design built with Tailwind CSS.
- **RSS, sitemap and SEO.** A build-time RSS feed, a generated sitemap covering all pages (including every printer and driver), canonical URLs and Open Graph metadata.
- **Continuous deployment.** Every change is built and published to GitHub Pages automatically.

The result is a site that is reproducible (the same input always produces the same output), easy to extend, and pleasant to contribute to.

## Thanks to the contributors

This rebuild was a team effort by the OpenPrinting contributor community. Huge thanks to everyone who made it happen — you can also find them on the [Hall of Fame](/hall-of-fame) page:

<p>
  <img src="/authors/rudra-singh.jpg" alt="Rudra Pratap Singh" width="56" height="56" style="border-radius:9999px;display:inline-block;vertical-align:middle;margin:0 0.6rem 0 0;object-fit:cover" />
  <strong>Rudra Pratap Singh (<a href="https://github.com/rudra-iitm">@rudra-iitm</a>)</strong> — as the <strong>core mentor</strong> of this website rebuild, I guided and coordinated the contributors throughout the project. I also worked on the overall UI revamp, the light/dark/system theme toggle, replacing the old comment system with Giscus, the portable static-deployment configuration, hard-refresh internal navigation, the on-site Foomatic printer/driver lookup migration, the sponsors/supporters section, and the Opportunity Open Source page.
</p>

<p>
  <img src="/authors/gati-varshney.jpg" alt="Gati Varshney" width="56" height="56" style="border-radius:9999px;display:inline-block;vertical-align:middle;margin:0 0.6rem 0 0;object-fit:cover" />
  <strong>Gati Varshney (<a href="https://github.com/gativarshney">@gativarshney</a>)</strong> — the reusable author component, migrating all of the existing posts from the old Jekyll site into the new setup, the homepage, the build-time client-side search system, automatic redirects for renamed posts, publication dates on articles, author avatars on the news boxes, the light-theme hero banner, and the Google Season of Docs page.
</p>

<p>
  <img src="/authors/sam-shubham.jpg" alt="Sam Shubham" width="56" height="56" style="border-radius:9999px;display:inline-block;vertical-align:middle;margin:0 0.6rem 0 0;object-fit:cover" />
  <strong>Sam Shubham (<a href="https://github.com/sam-shubham">@sam-shubham</a>)</strong> — the Google Summer of Code experience (year and project pages), teaser-image support for posts and pages, the production base-path fix for images, and the title-escaping fix for post metadata and the search index.
</p>

<p>
  <img src="/authors/harsh-upadhyay.jpg" alt="Harsh Upadhyay" width="56" height="56" style="border-radius:9999px;display:inline-block;vertical-align:middle;margin:0 0.6rem 0 0;object-fit:cover" />
  <strong>Harsh Upadhyay (<a href="https://github.com/harshvns">@harshvns</a>)</strong> — extending the search index to cover documentation, projects and pages.
</p>

<p>
  <img src="/authors/ishpreet-singh.jpg" alt="Ishpreet Singh" width="56" height="56" style="border-radius:9999px;display:inline-block;vertical-align:middle;margin:0 0.6rem 0 0;object-fit:cover" />
  <strong>Ishpreet Singh (<a href="https://github.com/ishpreet404">@ishpreet404</a>)</strong> — fixing missing routes, assets and data inconsistencies, and improving blog navigation.
</p>

Additional improvements — including the smart 404 page with trailing-slash handling for GitHub Pages and the RSS 2.0 feed — were contributed along the way as well.

If you contributed and are not mentioned here, please reach out — we want to make sure everyone gets credit.

## Please help us test it

The new site is live, and we would love your help making it rock-solid.

**You are very welcome to explore the site and report any bugs you find.** Things that are especially useful to check:

- Broken links, missing pages, or content that does not look right
- Printer and driver pages in the database lookup
- Search results
- Light and dark mode, and the layout on mobile devices

If you spot a problem, please open an issue on our GitHub repository at [OpenPrinting/openprinting.github.io](https://github.com/OpenPrinting/openprinting.github.io/issues) with a short description and, if possible, the page URL and a screenshot. Bug reports, suggestions and contributions are all very welcome.

Thank you for helping make printing — and now the OpenPrinting website — just work!
