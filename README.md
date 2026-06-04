# OpenPrinting Website

The official website for [OpenPrinting](https://openprinting.github.io/), built with Next.js, Tailwind CSS, and Framer Motion.

OpenPrinting is a Linux Foundation workgroup that manages the printing architecture for Linux and UNIX-like operating systems.

## Getting Started

First, make sure you have [Node.js](https://nodejs.org/) installed, and then install the dependencies using Yarn:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router containing pages and layouts.
- `components/` - Reusable UI components.
- `contents/` - Markdown content representing news, blogs, and documentation.
- `lib/` - Utility functions and shared library code.
- `scripts/` - Build scripts, such as search index generation.
- `public/` - Static files and assets.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find a bug or want to propose an enhancement.

When making UI changes, please follow the existing Tailwind CSS design patterns.

## Deployment

This project is meant to be deployed statically on GitHub Pages. Note that Next.js is configured for static export in this repository.

To build the static export locally:

```bash
yarn build
```

This will generate an `out/` directory containing the static HTML/CSS/JS files which are then hosted on GitHub Pages.

## Migration Notes

Deployment-owned values are centralized in [`config/site.config.ts`](./config/site.config.ts). When migrating this repository, update that file first for:

- repository owner/name and base path behavior
- canonical site origin and RSS path
- GitHub, CUPS, drivers, and other deployment-owned external destinations
- brand metadata used by layout, cards, and social links
- Giscus discussion settings

Generated outputs should only be committed when source changes require regeneration:

- `public/feed.xml`
- `public/search/static-index.json`
- `public/search/foomatic-index.json`
- generated Foomatic data under `public/foomatic-db/`

## Naming Conventions

- Route files follow Next.js App Router conventions.
- Reusable React component filenames should converge on a single convention over time.
- In this pass, existing mixed naming is preserved unless a touched area needs cleanup to stay consistent.
