# OpenPrinting Website

The official website for [OpenPrinting](https://openprinting.github.io/), built with Next.js, Tailwind CSS, and Framer Motion.

OpenPrinting is a Linux Foundation workgroup that manages the printing architecture for Linux and UNIX-like operating systems.

## Getting Started

You need [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/). Note that the
Yarn command-line tool is packaged under two different names depending on your
distribution: it is sometimes called `yarn` and sometimes `yarnpkg` (for example on
Debian/Ubuntu, where the `yarn` name historically belonged to an unrelated package). If
`yarn` is not found, try `yarnpkg` instead — wherever this README uses `yarn`, substitute
`yarnpkg` if that is how it is installed on your system.

### Debian / Ubuntu

Install Node.js and Yarn from the distribution repositories:

```bash
sudo apt update
sudo apt install nodejs npm yarnpkg
```

On Debian/Ubuntu the Yarn binary is installed as `yarnpkg` (the `yarn` name is used by a
different package), so use `yarnpkg` in place of `yarn` in the commands below.

This project pins Yarn 4 via the `packageManager` field in `package.json`. The distribution
package is the older Yarn 1, which is only used to bootstrap; the pinned version is fetched
automatically on first use. If you prefer to enable the modern Yarn directly, run
`corepack enable` (Corepack ships with Node.js).

### Install and run

Install the dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Important:** `yarn dev` does **not** generate the build-time data. The Foomatic
> printer/driver database (under `public/foomatic-db/`) and the search indexes are produced by
> `yarn build` (which runs `yarn generate`). Run `yarn build` — or just `yarn generate` — at
> least once so that the printer/driver lookup and site search work locally. See
> [Generating build-time data](#generating-build-time-data) below.

> **Note:** running `yarn install` (especially when bootstrapping with the system's Yarn 1)
> may modify `yarn.lock`. See [A note on `yarn.lock`](#a-note-on-yarnlock) below before you
> run further git commands.

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

## Generating build-time data

Several parts of the site are **generated data, not source**, and `yarn build` is required to
produce them. The build runs `yarn generate` first, which:

- converts the upstream `foomatic-db` data into JSON and statically generates a page for every
  printer and driver (output under `public/foomatic-db/`),
- generates the machine-readable query API and PPD files (output under `public/query/` and
  `public/ppds/`; see [Machine-readable query API](#machine-readable-query-api-and-ppd-downloads)),
- builds the client-side search indexes (`public/search/static-index.json` and
  `public/search/foomatic-index.json`), and
- generates the RSS feed (`public/feed.xml`).

`yarn dev` / `next dev` alone does **not** produce any of this. So if you want the Foomatic
printer/driver lookup and the site search to work locally, you must run `yarn build` — or just
the data step on its own:

```bash
yarn generate
```

at least once. These outputs are git-ignored and regenerated on every build (see
[Deployment](#deployment)), so you do not commit them.

## Machine-readable query API and PPD downloads

The legacy OpenPrinting site exposed two machine interfaces: `query.php` (database lookups)
and `ppd-o-matic.php` (PPD downloads). The site is now a **fully static export hosted on
GitHub Pages** — there is no PHP/CGI or any other server-side code. This has one hard
consequence worth understanding:

> A static host serves the **same file for a URL regardless of its query string**. So
> `query.php?type=printer&make=HP` and `query.php?type=printer&make=Canon` are the *same*
> request as far as the host is concerned. The legacy `*.php?…` pages therefore resolve the
> query **in the browser with JavaScript** and work when opened in a browser, but a client
> that does not run JavaScript (`wget`, `curl`, and printer-setup tools such as CUPS or the
> GNOME Control Center) cannot get query-dependent output from them.

For all non-browser/automation use, fetch the **static endpoints** below directly. They are
plain files, so they work with `wget`/`curl` and any HTTP client, and they carry the correct
content type. Append `.xml` instead of `.txt` for XML; the PPD files are served as
`application/vnd.cups-ppd`.

| Legacy URL (browser only) | Static endpoint (works everywhere) |
| --- | --- |
| `query.php?type=makes` | `/query/makes.txt` |
| `query.php?type=printer` | `/query/printers.txt` |
| `query.php?type=printer&make=HP` | `/query/printers/HP.txt` |
| `query.php?type=driver` | `/query/drivers.txt` |
| `query.php?type=driver&printer=printer/HP-LaserJet_4050`<br>`query.php?type=driver&make=HP&model=HP-LaserJet_4050` | `/query/drivers/HP-LaserJet_4050.txt` |
| `ppd-o-matic.php?printer=Alps-MD-2010&driver=ppmtomd` | `/ppds/Alps-MD-2010-ppmtomd.ppd` |

The driver lists are keyed by **printer id** (`<make>-<model>` with spaces as underscores,
e.g. `HP-LaserJet_4050`), and PPD files are named `<printer-id>-<driver>.ppd`. A machine-
readable index of all printers (id, make, model, command sets) is at `/query/index.json`.

Example:

```bash
wget -O HP.txt        'https://openprinting.github.io/query/printers/HP.txt'
wget -O 4050.txt      'https://openprinting.github.io/query/drivers/HP-LaserJet_4050.txt'
wget -O printer.ppd   'https://openprinting.github.io/ppds/Alps-MD-2010-ppmtomd.ppd'
```

Two original `query.php` features have **no static equivalent** because they require
computation at request time and cannot be precomputed into files:

- **Fuzzy device-ID matching** (`printer=MFG:…;MDL:…;`) — works in the browser only.
- **`papps=true`** (the Printer-Application look-up) — depended on live Printer Application
  Snaps running on the old server; it is not part of the static database export.

## A note on `yarn.lock`

Installing dependencies or building can modify `yarn.lock` (for instance when the system's
Yarn 1 is used to bootstrap the pinned Yarn 4). These local changes are not meant to be
committed. Before running further git actions (`git pull`, `git commit`, `git checkout`, ...),
discard them.

To reset just this one file to the committed version:

```bash
git checkout -- yarn.lock
```

Or, if you have other local changes you want to keep temporarily, stash everything first:

```bash
git stash
```

## Naming Conventions

- Route files follow Next.js App Router conventions.
- Reusable React component filenames should converge on a single convention over time.
- In this pass, existing mixed naming is preserved unless a touched area needs cleanup to stay consistent.
