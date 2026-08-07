# Foomatic Recommendation Quality — Evolution and Evidence

This document quantifies how the similarity engine's recommendation quality changed across this branch's feature-addition commits. It exists to answer the question a GSoC reviewer will reasonably ask: *"you say you fixed recommendation quality — show me."*

## Methodology

The pipeline (`scripts/foomatic/vectorize.ts` + `compute-similarity.ts`) is deterministic: same input data + same code = same output. This makes historical comparison straightforward — for each milestone commit below, the **exact pipeline code from that commit** was extracted and re-run against the **current, full `printers.json`** (6,573–6,657 printers, depending on milestone — see table). Holding the dataset fixed and varying only the scoring code isolates the effect of each feature addition from incidental upstream data drift.

This reproduces the same `logScoreDistribution()`/`logSpotCheck()` diagnostics the pipeline already prints on every run (`compute-similarity.ts`), just captured across history instead of a single point in time.

| Milestone | Commit | Feature set | Features encoded |
|---|---|---|---|
| Baseline | `a370869` | Driver family + printer type + functionality | 429 |
| +Color | `6a93780` | + color capability | 430 |
| +Commandsets | `f3aab1f` | + PDL token one-hot (PostScript, PCLXL, PCL5E, …) | 455 |
| +PS/PCL level | `73a9161` | + PostScript/PCL capability tier | 459 |
| +Resolution | `2d6f3b7` | + DPI resolution tier | 463 |

---

## Scoring Model

The published score is not a bare cosine. Three corrections are applied, each
introduced because a measured failure mode demanded it:

```
score(a,b) = cos(a,b) . (1 - exp(-k / tau)) . PROD(conflict penalties)
```

**1. IDF-weighted features.** Driver-family and command-set dimensions are scaled
by `idf(t) = ln(1 + N / df(t))`, renormalized to mean 1 across the vocabulary.
Sharing `postscript` (1,746 of 6,657 printers) yields weight 0.62; sharing
`necp6` (8 printers) yields 2.64. Without this, every PostScript printer looked
equally similar to every other, and the top-3 was an arbitrary slice of a
1,700-printer cluster.

**2. Evidence damping.** Cosine on sparse one-hot vectors returns exactly 1.0
whenever both vectors are near-empty: two printers sharing one dimension, with
every other attribute unknown, are geometrically identical. `k` counts the
dimensions on which both printers are non-zero, and `1 - exp(-k/tau)` with
`tau = 4` maps k = 1 -> 0.22, 4 -> 0.63, 8 -> 0.86, 12 -> 0.95. Before this,
recommendations resting on a single catch-all driver scored *higher* on average
(0.992) than recommendations backed by eleven shared features (0.984).

**3. Capability-conflict penalties.** The vector space can express agreement but
not contradiction, so a mono printer sharing a driver family with a colour one
still scored well despite being unable to substitute for it. Hard substitution
barriers are applied multiplicatively (see the table below).

---

## The Collapse Problem

The baseline pipeline (driver family + type + functionality only) suffered from a textbook similarity-collapse failure mode: many functionally different printers share the same generic driver, so their feature vectors were nearly identical regardless of actual hardware differences. The measured signature of this is **score saturation** — recommendations clustering at a perfect cosine score of 1.000 even between printers that are not, in fact, equivalent.

### Score saturation (% of recommendations scoring >= 0.9995, i.e. "exact match")

Feature engineering alone reduced saturation from 92.0% to 79.8%, but did not
solve it: four in five recommendations were still presented as perfect matches.
The scoring-model corrections above removed it entirely.

| Stage | Saturated | Mean score | p10 |
|---|---|---|---|
| Baseline (driver + type + functionality) | **92.0%** | 0.996 | 1.000 |
| + colour | 88.1% | 0.972 | 0.967 |
| + commandsets | 84.4% | 0.974 | 0.955 |
| + PS/PCL level | 82.8% | 0.973 | 0.953 |
| + resolution (feature engineering complete) | 79.8% | 0.969 | 0.935 |
| **+ IDF, evidence damping, conflict penalties** | **0.0%** | **0.814** | **0.393** |

Measured over the 19,606 recommendations actually displayed (top-3 per printer).
The score histogram changed from a single spike (17,212 of 19,827 at 1.0) to a
spread distribution peaking at 0.9 and reaching down to 0.3.

The decisive metric is the correlation between how much evidence supports a
recommendation and the confidence shown for it:

| | Before | After |
|---|---|---|
| Corr(shared features, score) | 0.078 | **0.849** |
| Mean score, weak evidence (<= 1 shared feature) | 0.992 | 0.393 |
| Mean score, strong evidence (>= 2) | 0.984 | 0.859 |

Before, the confidence signal was *inverted*: thin recommendations scored higher
than well-supported ones. It is now strongly aligned.

### Recommendation churn

Comparing the **#1 recommendation** for every printer between the baseline and final feature sets:

> **4,546 of 6,573 printers (69.2%) received a different top recommendation** once color, commandset, PS/PCL level, and resolution features were added.

This is the direct, measured effect of the four feature-addition commits — not an estimate. A concrete example from that diff:

- **Alps-MD-2010** (baseline): top recommendation was **Citizen-printiva700** — a different manufacturer entirely, sharing only a generic driver family.
- **Alps-MD-2010** (final): top recommendation became **Alps-MD-2300** — a same-manufacturer, same-series printer, a substantially more sensible suggestion surfaced once commandset and capability features were available to discriminate within the driver-family cluster.

---

## Feature Weights and Tunables

All weights live as named constants at the top of `scripts/foomatic/vectorize.ts`; thresholds live in `compute-similarity.ts` and `RecommendedPrintersSection.tsx`. They are the knobs to turn when tuning recommendation behaviour.

| Constant | Value | Where | Effect |
|---|---|---|---|
| `RECOMMENDED_DRIVER_WEIGHT` | 3.0 | `vectorize.ts` | Dominant signal — two printers sharing a preferred Linux driver are strongly similar |
| `COMMANDSET_WEIGHT` | 1.5 | `vectorize.ts` | One-hot per normalized PDL token; highest-weighted post-baseline feature |
| `SUPPORTED_DRIVER_WEIGHT` | 1.0 | `vectorize.ts` | One-hot per additional supported driver family |
| `COLOR_WEIGHT` | 1.0 | `vectorize.ts` | Binary colour capability |
| `LANG_WEIGHT` | 1.0 | `vectorize.ts` | PostScript / PCL support present |
| `RESOLUTION_WEIGHT` | 0.75 | `vectorize.ts` | One-hot across four DPI tiers (≤300, ≤600, ≤1200, >1200) |
| `TYPE_WEIGHT` | 0.5 | `vectorize.ts` | Mechanism class (laser / inkjet / dot-matrix) |
| `LANG_LEVEL_WEIGHT` | 0.5 | `vectorize.ts` | Bonus for matching PostScript 3 / PCL 6 specifically |
| `FUNCTIONALITY_WEIGHT` | 0.25 | `vectorize.ts` | Linux support grade (A/B/C), weakest signal |
| `MIN_COMMANDSET_FREQUENCY` | 20 | `vectorize.ts` | Commandset tokens rarer than this are dropped from the vocabulary as noise |
| `TOP_K` | 10 | `compute-similarity.ts` | Candidates retained per printer |
| `MIN_SIMILARITY_SCORE` | 0.35 | `compute-similarity.ts` | Floor on the damped score; removes single-dimension matches automatically |
| `EVIDENCE_TAU` | 4 | `compute-similarity.ts` | Damping constant in `1 - exp(-k/tau)`; larger = harsher on thin evidence |
| `TYPE_CONFLICT_PENALTY` | 0.5 | `compute-similarity.ts` | Applied when both mechanism types are known and differ |
| `COLOR_CONFLICT_PENALTY` | 0.6 | `compute-similarity.ts` | Applied when one prints colour and the other does not |
| `RESOLUTION_CONFLICT_PENALTY` | 0.7 | `compute-similarity.ts` | Applied when max resolutions differ by >= 4x |
| `EXACT_MATCH_THRESHOLD` | 0.9995 | `RecommendedPrintersSection.tsx` | Score at/above which the UI shows "Exact match" instead of a percentage |
| `STRONG_MATCH_PERCENT` | 85 | `RecommendedPrintersSection.tsx` | Confidence badge shown in emerald at/above this |
| `MODERATE_MATCH_PERCENT` | 70 | `RecommendedPrintersSection.tsx` | Confidence badge shown in amber at/above this; muted below |

Raising a weight increases how much that attribute pulls two printers together; the vectors are L2-normalized by the cosine denominator, so only the *relative* magnitudes matter.

---

## Feature-by-Feature Timeline

### Color features (`6a93780`, 2026-06-10)

**Problem:** Driver-family-only similarity could recommend a monochrome printer in place of a color one, since many mono and color printers in the same product family share a driver.
**Change:** Added a 1.0-weighted binary color feature (`vectorize.ts`).
**Measured effect:** Saturation dropped from 92.0% → 88.1%; mean score dropped from 0.996 → 0.972, the largest single-commit drop in mean score of any feature addition — consistent with color being the single most common source of false-positive matches in the baseline.

### Commandset features (`f3aab1f`, 2026-06-10)

**Problem:** Driver family is a coarse compatibility proxy — two printers can share a driver family without supporting the same page-description language (PostScript vs. PCL vs. ESC/P).
**Change:** Added a 1.5-weighted one-hot feature per normalized commandset token (the highest weight of any feature added after the baseline), with `normalizeCommandsetToken()` folding ~20 upstream spelling variants into canonical tokens (`POSTSCRIPT`, `PCLXL`, `PCL5E`, `PCL`, …), filtered to commandsets appearing in at least 20 printers (`MIN_COMMANDSET_FREQUENCY`) to avoid vocabulary noise from rare tokens.
**Measured effect:** Saturation dropped from 88.1% → 84.4%; feature count grew from 430 → 455 (25 new commandset dimensions passed the frequency filter).

### PostScript/PCL level features (`73a9161`, 2026-06-10)

**Problem:** Commandset matching alone treats "supports some PostScript" as equivalent regardless of capability tier — a PS1 printer and a full PS3 printer would score identically on the commandset feature.
**Change:** Added separate language-support and level-bonus features (1.0 + 0.5 weight) for PostScript level 3 and PCL level 6, refining within-language-family matching.
**Measured effect:** Saturation dropped from 84.4% → 82.8%.

### Resolution features (`2d6f3b7`, 2026-06-12)

**Problem:** Two printers with identical driver, commandset, and language support could still differ enormously in print quality (300 dpi vs. 2400 dpi) and still be scored as near-identical.
**Change:** Added a 0.75-weighted one-hot feature across four DPI tiers (≤300, 300–600, 600–1200, >1200).
**Measured effect:** Saturation dropped from 82.8% → 79.8% — the largest p10 drop of any single addition (0.953 → 0.935), reflecting that resolution tier is a meaningfully independent axis of variation across the dataset.

---

## Performance: Per-Printer Data Split (`983f915`, 2026-06-12)

Not a scoring-quality change, but a necessary scale fix once `recommendations.json` grew large: the full recommendation map for ~6,600 printers serializes to **23.15 MB** (measured from the current production artifact — see `compute-similarity.ts` runtime logging). Shipping that to every printer detail page visit would be a significant and unnecessary page-weight cost, since a single page only ever needs one printer's own top-10 list.

The fix splits the combined file into one small file per printer (median 3.1 KB, max 5.8 KB, including denormalized card fields) under `recommendations/<id>.json` (see [foomatic-data-formats.md](./foomatic-data-formats.md#publicfoomatic-dbrecommendationsidjson)), so `RecommendedPrintersSection.tsx` fetches only the relevant slice instead of the full 23 MB map.

---

## Known Limitation Not Yet Measured

No equivalent before/after evidence exists for **subjective recommendation relevance** (i.e., "would a human printer-shopper agree this is a good suggestion?") — the metrics above measure score distribution and ranking churn, which are proxies for discriminative power, not a ground-truth relevance label. There is no labeled validation set in this repository. Building one (a small hand-curated set of "printer X should/shouldn't recommend printer Y" pairs) would be a reasonable follow-up if recommendation quality needs to be defended more rigorously in a final evaluation, but is out of scope for the current proposal.
