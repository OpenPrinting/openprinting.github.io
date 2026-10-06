# Foomatic Pipeline — Regeneration Guide

This is the operational reference for re-running the printer recommendation pipeline described in [foomatic-pipeline-architecture.md](./foomatic-pipeline-architecture.md). There is no "training" in the machine-learning-model sense — the pipeline deterministically regenerates static artifacts from upstream `foomatic-db` XML and engineered feature weights. "Retraining" here means re-running the pipeline end-to-end after either the upstream database or the feature/weight logic has changed.

---

## Prerequisites

The full pipeline (including PPD compilation) requires the same system packages installed in CI (`.github/workflows/build.yml` / `deploy.yml`):

```
foomatic-db-engine foomatic-db-compressed-ppds cups-filters ghostscript bsdmainutils libxml2-utils xsltproc
```

On Windows (or any environment without `foomatic-compiledb`), PPD compilation is automatically skipped — `data-generate.ts` skips it whenever `process.platform === "win32"`, and `generate-ppds.sh` itself exits early if the `foomatic-compiledb` binary isn't found. The rest of the pipeline runs identically either way; printers simply get `hasPpd: false`.

Node dependencies are managed with `yarn` (`yarn.lock` is the lockfile of record).

---

## Running the full pipeline

```bash
yarn foomatic:pipeline
```

This runs `scripts/foomatic/data-generate.ts`, which executes every stage in order and stops immediately if any stage fails:

1. `generate-from-xml.ts` — clones/pulls `OpenPrinting/foomatic-db` into `cache/foomatic-db`, converts XML to JSON
2. `generate-ppds.sh` — compiles PPDs (skipped on Windows or with `--skip-ppd`)
3. `combine-data.ts` — produces `printers.json`
4. `split-printers.ts` — produces `printersMap.json` and `printers/<id>.json`
5. `vectorize.ts` — produces `feature-matrix.json` (skipped with `--skip-similarity`)
6. `compute-similarity.ts` — produces `recommendations.json` and `recommendations/<id>.json` (skipped with `--skip-similarity`)

This also runs automatically before every `next build`: the `build` script is `yarn generate && next build && ...`, and `yarn generate` invokes this pipeline first.

### Flags / environment variables

| Flag | Env var equivalent | Effect |
|---|---|---|
| `--skip-ppd` | n/a (Windows always skips) | Skip PPD compilation (stage 2) |
| `--skip-similarity` | `FOOMATIC_SKIP_SIMILARITY=1` | Skip stages 6–7 (vectorize + compute-similarity) |
| `--force` (forwarded to `generate-ppds.sh` only) | `FORCE_PPD_GEN=true` | Force PPD recompilation even if the cached `foomatic-db` git revision hasn't changed |

Example — fast local iteration on UI changes without recomputing recommendations:

```bash
yarn foomatic:pipeline --skip-similarity
```

---

## Running individual stages

Each stage can be run independently via its own `package.json` script — useful when iterating on one stage without re-running the whole pipeline:

```bash
yarn foomatic:generate:xml      # stage 1: XML → JSON
yarn foomatic:generate:ppds     # stage 2: PPD compilation (Linux/macOS only)
yarn foomatic:data:combine      # stage 3: normalization → printers.json
yarn foomatic:data:split        # stages 4-5: printersMap.json + printers/<id>.json,
                                #             driversMap.json + drivers/<id>.json
yarn foomatic:data:vectorize    # stage 6: feature-matrix.json
yarn foomatic:data:similarity   # stage 7: recommendations.json + recommendations/<id>.json
```

Stages 3–7 each read their input from a fixed path under `public/foomatic-db/` (see [foomatic-data-formats.md](./foomatic-data-formats.md)) rather than from in-memory state, so they can be re-run independently as long as the upstream artifact they depend on already exists. Running `yarn foomatic:data:vectorize` without first running `yarn foomatic:data:combine` will fail fast with a message telling you which earlier command to run.

---

## When to re-run which stage

| Change | Stages to re-run |
|---|---|
| Upstream `foomatic-db` content changed (new printers/drivers) | All stages (`yarn foomatic:pipeline`) |
| Editing normalization logic in `lib/foomatic/printer-attributes.ts` (e.g. a new commandset token mapping) | `combine-data` onward (3–6) |
| Editing feature weights or adding a new feature in `vectorize.ts` | `vectorize` onward (5–6) — `combine-data`/`split-printers` output is unaffected |
| Editing similarity scoring/explanation logic in `compute-similarity.ts` | `compute-similarity` only (6) |
| UI-only changes (components, pages) | No pipeline re-run needed — just `next dev` / `next build` against existing `public/foomatic-db/` artifacts |

---

## CI automation

You do not need to run the pipeline manually for production — it runs automatically:

- **Every PR / push to `master`:** `build.yml` runs the full pipeline with `FOOMATIC_SKIP_SIMILARITY=1`, so PR checks validate ingestion/normalization/UI without paying the cost of the O(n²) similarity computation.
- **Every push to `master`, plus a weekly cron (`0 2 * * 1`, Mondays 02:00 UTC):** `deploy.yml` runs the full pipeline including similarity computation, then deploys the static export to GitHub Pages. This is what keeps recommendations fresh as `foomatic-db` evolves upstream, without anyone needing to remember to trigger it.

To manually trigger a full regeneration in CI without waiting for the weekly cron, use the `workflow_dispatch` trigger on `deploy.yml` from the Actions tab.

---

## Verifying a regeneration was a no-op (regression check)

If you've changed code but expect output to be unchanged (e.g. a refactor with no behavior change), diff the artifacts before and after:

```bash
cp public/foomatic-db/printers.json /tmp/printers.before.json
yarn foomatic:data:combine
diff -q /tmp/printers.before.json public/foomatic-db/printers.json
```

Repeat the same pattern for `feature-matrix.json` (after `yarn foomatic:data:vectorize`) and `recommendations.json` (after `yarn foomatic:data:similarity`). This is how the `lib/foomatic/*` extraction refactor (see the test suite under `lib/foomatic/__tests__/`) was verified to be behavior-preserving before being merged.

---

## Adding a new similarity feature

See [foomatic-ui-extending.md](./foomatic-ui-extending.md#adding-a-new-recommendation-signal) for the step-by-step process — it touches `combine-data.ts` (derive the attribute), `vectorize.ts` (encode it with a weight), and `compute-similarity.ts` (optionally add it to `computeSharedFeatures()` for the "why this printer?" explanation).
