# Contributing to the OpenPrinting website

This repository is the source of [openprinting.github.io](https://openprinting.github.io). It is a Next.js site that is exported as static files and hosted on GitHub Pages. Most of the content is plain Markdown, so you can fix a page or write a news post without touching any code.

Two things this repository is not for:

- Printing problems. Please ask in [OpenPrinting's Q&A forum](https://github.com/OpenPrinting/cups/discussions/categories/q-a) instead.
- Bugs in CUPS, cups-filters or other OpenPrinting software. Report those in the project's own repository.

For all the other ways to help OpenPrinting, see the [Contribute](https://openprinting.github.io/contribute) page.

## Where things live

| Folder | What's in it |
| --- | --- |
| `contents/post/` | News and release posts. The file name becomes the URL, so `contents/post/cups-2.4.20.md` is published at `/cups-2.4.20`. |
| `contents/pages/` | Single pages such as About Us, Contact Us and Contribute. |
| `contents/documentation/` | The Documentation section. |
| `contents/projects/` | The Projects section. |
| `contents/upcoming-technologies/` | The Upcoming Technologies section. |
| `contents/gsoc/` | Google Summer of Code project ideas, one folder per year. |
| `data/` | Structured data, for example post authors in `data/authors.ts`. |
| `public/` | Images and other static files. A file in `public/assets/images/` is linked as `/assets/images/...`. |
| `app/`, `components/`, `lib/` | The Next.js pages, React components and helper code. |
| `config/site.config.ts` | Navigation, footer links and other site-wide settings. |

## Writing a news post

Add a Markdown file to `contents/post/`. Its frontmatter looks like this:

```markdown
---
title: CUPS 2.4.20
author: Zdenek
excerpt: CUPS 2.4.20 provides a number of bug and security fixes.
date: '2026-10-05'
---
```

- `author` should be a `key` from `data/authors.ts`, so the post shows your full name and photo. Add yourself there if you're not listed yet.
- `date` decides where the post appears on the news page, newest first.
- `excerpt` is shown in the post lists and in search results.
- Add `toc: true` for a table of contents on long posts.

## Setting up the site locally

You need [Node.js](https://nodejs.org/) 20 (the version CI uses) and Yarn.

To install Node.js, download it from [nodejs.org](https://nodejs.org/). On Debian and Ubuntu you can also use `sudo apt install nodejs npm`, but that package can be older than version 20, so check it with `node --version`. Yarn comes with Node.js through Corepack, so you don't have to install it separately. `corepack enable` below turns it on, and the exact Yarn version is pinned in `package.json`. Check your setup with `node --version` and `yarn --version`.

Then clone your fork and start the site:

```bash
git clone https://github.com/<your-username>/openprinting.github.io.git
cd openprinting.github.io
corepack enable
yarn install
yarn dev
```

Then open http://localhost:3000. On Debian and Ubuntu the Yarn command may be called `yarnpkg`; the [README](README.md) explains this.

`yarn dev` does not build the printer database or the search index. Run `yarn generate` once if you need the printer and driver pages or the site search locally. The PPD files it creates need Foomatic tools that only exist on Linux, so on macOS run `SKIP_PPD_GEN=true yarn generate` instead. Everything else is still generated. For a full `yarn build` outside Linux, use the dev container in `.devcontainer/`. See [Before you open a pull request](#before-you-open-a-pull-request).

## Before you open a pull request

Run these checks. CI runs them too on every pull request, but it's better to catch problems before you push:

```bash
yarn lint
yarn build
yarn verify:urls
```

`yarn build` generates the printer database and builds the whole site, so it shows you problems that `yarn dev` doesn't. It needs the Foomatic tools that only exist on Linux. On macOS or Windows, run it in the dev container in `.devcontainer/`, and if you can't, say so in your pull request so CI's result is the first full build.

A few rules that are easy to miss:

- Internal links have no trailing slash: `/contact`, not `/contact/`. `yarn verify:urls` checks this (see [#207](https://github.com/OpenPrinting/openprinting.github.io/issues/207)).
- Don't hardcode the site URL or the repository name. Use `siteConfig` from `config/site.config.ts`.
- In code, pass image paths through `getAssetPath()` or `getImageSrc()` from `lib/utils.ts`.
- Don't commit generated files. `public/search/`, `public/foomatic-db/`, `public/query/`, `public/ppds/` and `public/feed.xml` are rebuilt on every build and are in `.gitignore`.
- If `yarn install` changed `yarn.lock` and you didn't change any dependencies on purpose, undo that with `git checkout -- yarn.lock` before you commit. Only commit `yarn.lock` when your pull request really adds or updates a dependency.
- For visual changes, check light and dark mode on both a phone and a desktop width.

## Working with issues

- Search the existing issues before opening a new one.
- For a bug, include the page URL, what is wrong, and your browser and its version, since pages can look different across browsers.
- For an idea, explain how it would help people who visit the site.
- If you want to work on an issue, comment on it first so others know. For a bigger change, describe your plan there and wait for a maintainer to agree.

## Making a pull request

1. Fork the repository and create a branch from the latest `master`.
2. Keep each pull request to one topic.
3. Explain what you changed and why, and link the issue (for example `Fixes #202`).
4. Add media (screenshots or a short screen recording) if the change is visible.
5. Reviewers may ask for changes. Push them to the same branch and the pull request updates itself.

If your pull request hasn't had any review after a week, feel free to ask in the pull request or in the [Telegram chat](https://t.me/+RizBbjXz4uU2ZWM1).

## Style guide

- Use US spelling.
- Write content in Markdown. Use raw HTML only when Markdown can't do it.
- Use sentence case for headings: "Report bugs", not "Report Bugs".
- Run a spellchecker before you submit.

Everyone taking part is expected to follow our [Code of Conduct](https://openprinting.github.io/codeofconduct).
