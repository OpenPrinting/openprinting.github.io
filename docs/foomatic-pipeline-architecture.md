# Foomatic Recommendation Pipeline — Architecture

## Overview

This document describes the offline, reproducible machine-learning pipeline that turns the upstream [OpenPrinting/foomatic-db](https://github.com/OpenPrinting/foomatic-db) XML dataset into the static printer directory, printer detail pages, and "similar printers" recommendations served from `openprinting.github.io/foomatic`.

The pipeline is designed to:

- Run entirely offline, with no server-side inference at request time
- Produce static, versioned JSON artifacts consumable by a static-exported Next.js site (no backend)
- Be fully reproducible from upstream Foomatic XML on every run
- Refresh automatically via GitHub Actions as the upstream database changes

This is the GSoC "Track A" deliverable: *an offline ML pipeline for printer similarity and compatibility analysis, exported as static artifacts for static-site consumption.*

---

## High-Level Architecture

The pipeline is divided into seven sequential stages, each implemented as an independent `tsx` script under `scripts/foomatic/`, orchestrated by `scripts/foomatic/data-generate.ts`:

```
1. generate-from-xml.ts   XML → JSON ingestion
2. generate-ppds.sh       PPD compilation (Linux only)
3. combine-data.ts        Normalization + enrichment
4. split-printers.ts      Performance: per-printer artifact split
5. split-drivers.ts       Performance: per-driver artifact split
6. vectorize.ts           Feature engineering
7. compute-similarity.ts  Similarity computation + recommendations
```

Each stage reads the previous stage's output from `public/foomatic-db/` and writes its own output back to the same directory, so the pipeline can be re-run incrementally or in full. Stage failure is fail-fast: if any step exits non-zero, the orchestrator stops immediately rather than continuing with stale or partial data.

---

## Pipeline Flow

```
                         OpenPrinting/foomatic-db (git, upstream)
                                       │
                                       │  git clone / pull
                                       ▼
                  cache/foomatic-db/db/source/{printer,driver}/*.xml
                                       │
                         ┌─────────────┴─────────────┐
                         │   generate-from-xml.ts     │  fast-xml-parser
                         └─────────────┬─────────────┘
                                       ▼
              public/foomatic-db/printer/*.json   driver/*.json
                                       │
                         ┌─────────────┴─────────────┐
                         │     generate-ppds.sh       │  foomatic-compiledb
                         │  (skipped on Windows /     │  (cached by git revision)
                         │   --skip-ppd)              │
                         └─────────────┬─────────────┘
                                       ▼
                              public/ppds/*.ppd
                                       │
                         ┌─────────────┴─────────────┐
                         │      combine-data.ts       │  joins printer ⇄ driver
                         │                             │  graphs, derives all
                         │                             │  normalized attributes
                         └─────────────┬─────────────┘
                                       ▼
                       public/foomatic-db/printers.json
                       (the "unified and normalized printer
                        metadata dataset" deliverable)
                                       │
                         ┌─────────────┴─────────────┐
                         │      split-printers.ts     │  performance split
                         └─────────────┬─────────────┘
                                       ▼
       public/foomatic-db/printersMap.json   printers/<id>.json
                                       │
                         ┌─────────────┴─────────────┐
                         │        vectorize.ts        │  builds vocabularies,
                         │                             │  encodes weighted
                         │                             │  feature vectors
                         └─────────────┬─────────────┘
                                       ▼
                   public/foomatic-db/feature-matrix.json
                                       │
                         ┌─────────────┴─────────────┐
                         │   compute-similarity.ts    │  pairwise cosine
                         │                             │  similarity, top-10,
                         │                             │  explanations
                         └─────────────┬─────────────┘
                                       ▼
        public/foomatic-db/recommendations.json (full map)
        public/foomatic-db/recommendations/<id>.json (per-printer)
                                       │
                                       ▼
                    Next.js static export (output: "export")
    app/foomatic/printers/page.tsx · app/foomatic/printer/[make]/[id]/page.tsx
                  (fetched client-side, zero backend, per the
                   Track B static-site requirement)
```

---

## Stage Details

### 1. XML Ingestion — `generate-from-xml.ts`

- Clones `OpenPrinting/foomatic-db` into `cache/foomatic-db` on first run, or `git pull`s it on subsequent runs (a failed pull is logged but non-fatal, so a stale local cache doesn't block the rest of the pipeline).
- Parses every `printer/*.xml` and `driver/*.xml` file with `fast-xml-parser`, configured to preserve XML attributes (`@`-prefixed) and rename the `<prototype>` tag to `driverPrototype` to avoid colliding with the reserved JavaScript identifier.
- Normalizes driver `<printers><printer>` references (which appear as either bare strings or `{id, ...}` objects in the source XML) into a single object shape with a `.id` field, so downstream code does not need to special-case both forms.
- Output: one JSON file per printer/driver, mirroring the XML structure, under `public/foomatic-db/printer/` and `public/foomatic-db/driver/`.

### 2. PPD Compilation — `generate-ppds.sh`

- Invokes `foomatic-compiledb` (from the `foomatic-db-engine` system package) to generate one `.ppd` file per supported printer/driver pair, used for the "Download PPD" / "Preview PPD" features on the printer detail page.
- **Linux/CI only.** On Windows, or when `--skip-ppd` / `SKIP_PPD_GEN=true` is set, this stage is skipped entirely and the pipeline continues without PPDs — `combine-data.ts` simply records `hasPpd: false` for every driver in that case.
- Caches by the foomatic-db git revision: it records the upstream HEAD SHA in `public/ppds/.foomatic-db-revision` and skips regeneration if the SHA hasn't changed and PPDs already exist (unless `--force`/`FORCE_PPD_GEN=true`), avoiding an expensive full recompilation on every CI run when the upstream database hasn't moved.

### 3. Normalization + Enrichment — `combine-data.ts`

This is the core data-unification stage. For every printer it:

- Joins the printer and driver JSON graphs bidirectionally — a printer's `drivers` list and a driver's `printers` list are cross-referenced so each side knows about the other, even when only one side declares the relationship in the source XML. If a driver references a printer ID that has no printer JSON file of its own, a minimal stub printer record is synthesized from the ID (split on `-` into manufacturer/model) rather than silently dropping the driver.
- Derives normalized attributes via pure helper functions (now shared with the test suite in `lib/foomatic/printer-attributes.ts`):
  - `getFunctionalityStatus` — maps the raw Foomatic functionality grade (`A`/`B`/`C`/`?`) to a human-readable status (`Perfect`/`Mostly`/`Unknown`/`Unsupported`).
  - `getPrinterType` — inspects `<mechanism>` to classify a printer as `inkjet`, `laser`, `dot-matrix`, or `unknown`.
  - `getCommandsetTokens` / `normalizeCommandsetToken` — extracts page-description-language tokens from `<autodetect>` (including IEEE1284 `CMD:` device-ID strings) and folds dozens of upstream spelling variants (`PostScript`, `PS2`, `Adobe PostScript`, …) into a small set of canonical tokens (`POSTSCRIPT`, `PCLXL`, `PCL5E`, `PCL`, …).
  - `getColorCapability` / `getBooleanCapability` — resolves color support from `<mechanism>` first, falling back to free-text capability fields.
  - `getPSLevel` / `getPCLLevel` — parses PostScript/PCL language-level strings into normalized integer tiers.
  - `getMaxDpi` — resolves maximum print resolution from `<mechanism><resolution><dpi>`.
- Resolves each printer's `recommended_driver` (the printer's own declared driver if present, otherwise the first known supporting driver) and builds full driver detail records, including whether a compiled PPD exists for that driver (`hasPpd`/`ppdPath`).
- Output: `public/foomatic-db/printers.json` — the single unified, normalized dataset that every later stage and the frontend both read from.

### 4. Performance Split — `split-printers.ts`

`printers.json` contains every printer's full driver/PPD/option detail and is too large to ship to every page. This stage splits it into:

- `printersMap.json` — a lightweight per-printer projection (`id`, `manufacturer`, `model`, `type`, `status`, `functionality`, `driverCount`, `color`) used by the directory listing page and to drive Next.js's `generateStaticParams()` for static export.
- `printers/<id>.json` — one full-detail file per printer, fetched only when a user visits that printer's detail page.

### 5. Performance Split — `split-drivers.ts`

Applies the same treatment to the driver graph, producing `drivers.json`, a lightweight `driversMap.json` index, and one `drivers/<id>.json` per driver for the driver detail pages.

### 6. Feature Engineering — `vectorize.ts`

Builds a weighted numeric feature vector for every printer. See [foomatic-recommendation-quality.md](./foomatic-recommendation-quality.md) for the full feature list, weights, and the rationale/timeline behind each one. Output: `public/foomatic-db/feature-matrix.json`.

### 7. Similarity Computation — `compute-similarity.ts`

For every printer, computes cosine similarity against every other printer's feature vector, keeps the top 10 candidates scoring at or above a minimum threshold, and generates human-readable "why this printer?" explanations. See [foomatic-data-formats.md](./foomatic-data-formats.md) for the exact output schema and methodology details.

---

## Similarity Methodology Summary

The recommendation engine is a **hand-rolled weighted cosine similarity** over engineered features — not a trained/learned model and not an embedding model. This was a deliberate scope choice: the feature space (driver compatibility, page-description-language support, color, resolution tier) is small, well-understood, and directly interpretable, which is what makes the "why this printer?" explanation feature possible. There is no `scikit-learn`-equivalent or embedding library dependency in this pipeline; the only data-processing dependency is `fast-xml-parser` for stage 1.

Computation is brute-force O(n²) — every printer is compared against every other printer. At the current scale of the Foomatic database (several thousand printers), this completes in well under a minute (see `compute-similarity.ts` runtime logging). This is a known, accepted scaling limit; see the **Production Readiness** notes in the project's GSoC midterm audit for the documented ceiling and mitigation options if the dataset grows substantially.

---

## CI/CD Automation

Two GitHub Actions workflows run the pipeline:

| Workflow | Trigger | Similarity computation |
|---|---|---|
| `.github/workflows/build.yml` | `pull_request`, `push` to `master`, `workflow_dispatch` | **Skipped** (`FOOMATIC_SKIP_SIMILARITY=1`) — keeps PR checks fast |
| `.github/workflows/deploy.yml` | `push` to `master`, weekly `schedule` (`0 2 * * 1`, Mondays 02:00 UTC), `workflow_dispatch` | **Runs in full** |

The full pipeline runs automatically as the first half of the `build` script (`yarn generate && next build && ...`), where `yarn generate` invokes `scripts/foomatic/data-generate.ts` before Next.js compiles. Both workflows reach it by running `yarn build`. The weekly cron in `deploy.yml` is what keeps recommendations fresh as the upstream `foomatic-db` repository evolves, without requiring a manual trigger — this satisfies the proposal's "automated GitHub Actions workflows for scheduled data refresh and retraining" deliverable.

Both workflows install the same system dependencies needed for XML/PPD processing: `foomatic-db-engine`, `foomatic-db-compressed-ppds`, `cups-filters`, `ghostscript`, `bsdmainutils`, `libxml2-utils`, `xsltproc`.

For the exact commands to reproduce this locally, see [foomatic-retraining.md](./foomatic-retraining.md).
