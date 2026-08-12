# Foomatic Pipeline — Data Formats

This document is the schema reference for every JSON artifact produced by the pipeline described in [foomatic-pipeline-architecture.md](./foomatic-pipeline-architecture.md). All artifacts live under `public/foomatic-db/` and are served as static files — none require a backend to read.

The canonical TypeScript types are defined in [`lib/foomatic/types.ts`](../lib/foomatic/types.ts); this document explains what each field means and which pipeline stage produces it.

---

## `public/foomatic-db/printer/*.json`, `driver/*.json`

**Produced by:** `generate-from-xml.ts`
**Consumed by:** `combine-data.ts`

A 1:1 JSON mirror of the upstream Foomatic XML, one file per `<printer>` or `<driver>` element. Shape is whatever `fast-xml-parser` produces from the source XML (attributes prefixed with `@`, text nodes under `#text`), with one normalization: the `<prototype>` tag is renamed to `driverPrototype`. These are intermediate artifacts — nothing in the frontend reads them directly.

---

## `public/foomatic-db/printers.json`

**Produced by:** `combine-data.ts`
**Consumed by:** `split-printers.ts`, `vectorize.ts`, `compute-similarity.ts`

The unified, normalized dataset — one record per printer, each conforming to the `Printer` interface:

```ts
interface Printer {
  id: string                          // normalized id, e.g. "HP-LaserJet-4"
  manufacturer: string
  model: string
  series?: string
  connectivity?: string[]             // ["USB", "Network", ...]
  recommended_driver?: string         // e.g. "driver/Postscript-hp"
  drivers?: Driver[]
  type?: string                       // "inkjet" | "laser" | "dot-matrix" | "unknown"
  status?: string                     // "Perfect" | "Mostly" | "Unsupported" | "Unknown"
  notes?: string                      // HTML from upstream XML — sanitize before rendering
  functionality?: string              // raw Foomatic grade: "A" | "B" | "C" | "?"
  commandsets?: string[]              // normalized PDL tokens, e.g. ["PCLXL", "POSTSCRIPT"]
  ppdOptions?: PpdOption[]
  color?: boolean | "unknown"
  duplex?: boolean | "unknown"
  recommended?: boolean
  psLevel?: number | null             // 0–3
  pclLevel?: number | null            // 0, 3, 4, 5, or 6
  maxDpi?: number | null
}

interface Driver {
  id: string
  name: string
  url?: string
  comments?: string                   // HTML from upstream XML — sanitize before rendering
  hasPpd?: boolean
  ppdPath?: string
  execution?: { ghostscript?: string | null; filter?: string | null; prototype: string }
}
```

`notes` and `driver.comments` are sourced from upstream contributor-editable XML and **must** be passed through `sanitizeFoomaticHtml()` (`lib/foomatic/sanitize.ts`) before being rendered with `dangerouslySetInnerHTML` — see that file's usage in `components/foomatic/PrinterPageClient.tsx`.

---

## `public/foomatic-db/printersMap.json`

**Produced by:** `split-printers.ts`
**Consumed by:** the directory listing page (`app/foomatic/printers/page.tsx`) and `generateStaticParams()` in `app/foomatic/printer/[make]/[id]/page.tsx`

A lightweight projection of `printers.json`, one entry per printer, used so a list/filter view doesn't need to download every printer's full driver/PPD detail. Records are built by `toPrinterSummary()` in [`lib/foomatic/catalog.ts`](../lib/foomatic/catalog.ts) — the single source of truth for this schema — and the file is written **minified** (it is fetched by the browser; pretty-printing cost ~490 KB of raw payload for no consumer benefit).

```ts
interface PrinterSummary {
  id: string
  manufacturer: string
  model: string
  type?: string                // "laser" | "inkjet" | "dot-matrix" | "unknown"
  status?: string              // "Perfect" | "Mostly" | "Unsupported" | "Unknown"
  driverCount?: number
  functionality?: string       // raw Foomatic grade: "A" | "B" | "C" | "?"
  color?: boolean | "unknown"  // tri-state preserved from the full record

  // Capability fields. Each is OMITTED when the source data does not
  // establish it — an absent key means "not recorded in Foomatic",
  // never "the printer lacks this capability".
  maxDpi?: number              // from Printer.maxDpi (when a number)
  psLevel?: number             // from Printer.psLevel (when a number)
  pclLevel?: number            // from Printer.pclLevel (when a number)
  cs?: string[]                // Printer.commandsetTokens (when non-empty)
  rd?: string                  // recommended driver family: Printer.recommended_driver
                               // collapsed via normalizeDriverFamily() (when present)
}
```

`driverCount` is `drivers.length` from the full record; `type`/`status`/`functionality`/`color` default to `"unknown"`/`"Unknown"`/`"?"`/`"unknown"` respectively if absent.

Two capability notes:

- The tri-state fields (`color`, `type`) keep an explicit `"unknown"` value because existing consumers branch on it; the newer optional fields use key omission instead, which is cheaper across ~6.6k records. Both conventions mean the same thing: absence of evidence, not evidence of absence.
- `duplex` is deliberately **not** part of this projection: upstream Foomatic data records duplex capability for zero printers at the current snapshot, so there is nothing to store or filter on. If upstream ever starts recording it, adding it here is a deliberate schema decision (see `lib/foomatic/__tests__/catalog.test.ts`).

The generated artifact is validated record-by-record against `printers.json` by `lib/foomatic/__tests__/catalog-artifact.test.ts` (skipped automatically when the generated data is absent, e.g. in CI's pre-generate test run).

---

## `public/foomatic-db/printers/<id>.json`

**Produced by:** `split-printers.ts`
**Consumed by:** the printer detail page (`PrinterPageClient.tsx`)

One full `Printer` record per printer (same shape as an entry in `printers.json`), written individually so a detail-page visit only fetches data for that one printer.

---

## `public/foomatic-db/feature-matrix.json`

**Produced by:** `vectorize.ts`
**Consumed by:** `compute-similarity.ts`

```ts
interface FeatureMatrix {
  printerCount: number
  featureCount: number
  featureNames: string[]   // e.g. ["recommended_driver:postscript", ..., "res:2400plus"]
  vocab: {
    recommendedDrivers: string[]
    supportedDrivers: string[]
    types: string[]
    commandsets: string[]  // only commandsets meeting MIN_COMMANDSET_FREQUENCY (20)
  }
  ids: string[]             // printer ids, parallel-indexed with matrix rows
  matrix: number[][]        // one weighted feature vector per printer
}
```

`matrix[i]` corresponds to `ids[i]` and is encoded in the exact order of `featureNames`. See [foomatic-recommendation-quality.md](./foomatic-recommendation-quality.md) for what each feature means and its weight.

---

## `public/foomatic-db/recommendations.json`

**Produced by:** `compute-similarity.ts`
**Consumed by:** dev/debug tooling and as the source for the per-printer split below (not fetched directly by the frontend — see `recommendations/<id>.json`)

```ts
interface Output {
  version: string                    // "2.0.0"
  printerCount: number
  topK: number                       // 10
  recommendations: {
    [printerId: string]: Array<{
      id: string                     // recommended printer's id
      score: number                  // engineered similarity in [0, 1): IDF-weighted
                                     // cosine x evidence damping x conflict penalties,
                                     // rounded to 3 decimals — see the Scoring Model
                                     // section of foomatic-recommendation-quality.md
      sharedFeatures: string[]       // human-readable explanation strings
    }>
  }
}
```

The score is deterministic and bounded. It is **not** a probability, not a
guarantee that a printer will work, and not a human-validated accuracy figure —
it summarizes how much recorded Foomatic evidence two printers share, minus
penalties for conflicting capabilities. The UI maps it onto four tiers defined
in `lib/foomatic/scoring.ts` (`confidenceTier()`).

`sharedFeatures` entries are generated by `computeSharedFeatures()` and look like `"Shared command set: PostScript"`, `"Color printing"`, `"1200 dpi resolution"`, `"Excellent Linux driver support"` — these are rendered directly as the "why this printer?" list on the printer detail page.

---

## `public/foomatic-db/recommendations/<id>.json`

**Produced by:** `compute-similarity.ts` (same run as above, written per-printer for fetch efficiency)
**Consumed by:** `RecommendedPrintersSection.tsx`

A single printer's recommendation array — `recommendations.json`'s `recommendations[id]` value, plus the display fields each card needs:

```ts
type RecommendationsForPrinter = Array<{
  id: string
  score: number
  sharedFeatures: string[]
  // Denormalized from printers.json so the printer page can render the
  // recommendation cards from this one file alone. Defaults mirror the
  // printersMap.json projection exactly.
  manufacturer?: string
  model?: string
  status: string                     // "Perfect" | "Mostly" | ... | "Unknown"
  type: string                       // "laser" | "inkjet" | "dot-matrix" | "unknown"
  driverCount: number
}>
```

The detail page only ever needs the current printer's own recommendations, so fetching this file instead of the ~23 MB combined `recommendations.json` is what keeps the printer detail page's initial load small (see commit `perf(recommendations): split recommendation data per printer`).

The denormalized display fields cost roughly 0.9 KB per shard (median 3.3 KB at the current snapshot) but remove a second ~1.5 MB `printersMap.json` fetch that the section previously needed purely to resolve manufacturer/model/status for the three cards it renders — a net reduction from ~1,495 KB to ~3 KB per printer-page visit. They are intentionally *not* added to the combined `recommendations.json`, which stays a compact diagnostic artifact.

---

## Versioning

`recommendations.json` carries an explicit `version` field (`"2.0.0"` as of the resolution-aware similarity feature addition). There is no compatibility-checking consumer of this field today — it exists as a marker for pipeline output changes across the feature-addition history documented in [foomatic-recommendation-quality.md](./foomatic-recommendation-quality.md). If the feature vector schema changes again (a new weighted dimension, a changed weight, or a different scoring formula), bump this version so it's traceable in the artifact itself.
