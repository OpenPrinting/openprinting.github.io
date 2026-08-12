# Foomatic Printer Assistant — Architecture

The assistant is a site-wide, fully client-side natural-language interface to the Foomatic data this site already generates. There is no external service, no machine-learning model, and no server: every answer is computed in the browser from the same static JSON artifacts the rest of the site fetches, so every claim the assistant makes is traceable to a record in `public/foomatic-db/`.

Related docs: [foomatic-assistant-queries.md](./foomatic-assistant-queries.md) (supported query shapes), [foomatic-data-formats.md](./foomatic-data-formats.md) (artifact schemas), [foomatic-recommendation-quality.md](./foomatic-recommendation-quality.md) (similarity score semantics).

## Pipeline

```
free text
  → normalize.ts     lowercase / punctuation-fold / fused forms ("HL-1050" ≡ "hl 1050")
  → entities.ts      printer & driver references from the real catalogue
  → lexicon.ts       capability phrases → typed filters
  → parse.ts         ordered rule cascade → typed AssistantQuery
  → execute.ts       the only I/O layer: catalogue filter / shard fetch
  → respond.ts       typed ResponsePlan blocks (pure templates)
  → components/assistant/  React rendering (no HTML strings anywhere)
```

`engine.ts` composes the stages; the UI, the unit tests, and the eval harness all call the same `runAssistant()`, so what is tested is exactly what ships. Natural language never reaches execution: the executor operates only on the typed `AssistantQuery` produced by the parser.

## Intent precedence

Classification is an ordered deterministic rule cascade (`parse.ts`); earlier rules are more specific so they can never be swallowed by generic vocabulary:

1. COMPARISON — two printer refs + compare/vs/difference
2. EXPLANATION — "why" + recommendation vocabulary
3. SIMILAR_PRINTERS — similar/alternatives/"better …"
4. DRIVER_SEARCH — printers-for-driver phrasing, "same driver"
5. DRIVER_LOOKUP — driver-of-printer phrasing
6. SUPPORT_QUERY — support question about one specific printer
7. GENERAL_INFO — closed topics: support grades, similarity, help
8. CAPABILITY_SEARCH — recommend/best or any capability filters
9. PRINTER_LOOKUP — a printer reference and nothing more specific
10. UNSUPPORTED — unclear-but-domain, or out-of-domain

## Semantics that must not regress

- **Unknown never means false.** Filters select on recorded values only. A printer whose `color` is `"unknown"` matches neither "colour" nor "monochrome", and is counted separately (`excludedUnknown`) so responses can say "N more printers don't record this" instead of implying absence. PDL evidence is positive-only: no recorded PostScript level or token means *unknown*, never "no PostScript".
- **Duplex.** The current dataset records duplex for zero printers. The lexicon understands duplex vocabulary, but execution reports `INSUFFICIENT_DATA` (and still answers any other constraints in the query). No result may ever imply a printer does or does not support duplex.
- **Similarity is PR #224's, verbatim.** SIMILAR_PRINTERS/EXPLANATION read `recommendations/<id>.json` shards: shard order is preserved, scores are never recomputed or re-ranked, tiers come from the imported `confidenceTier()` in `lib/foomatic/scoring.ts`, and `sharedFeatures` strings are quoted verbatim. The score is described as "N% similarity", never as a probability or a compatibility promise, and the candidate's own Foomatic Linux support grade is always stated separately.
- **"Best" never ranks.** A criteria-free "best printer"/"recommend a printer" produces a clarification — the database ranks nothing overall, and no hidden default score exists.
- **"Better" never assumes a dimension.** "Better alternatives" without a named dimension asks "Better in what way?" with four defined dimensions (Linux support, overall similarity, resolution, driver options). Each dimension is a disclosed predicate over the existing recommendation shard (grade rank strictly higher with Unknown excluded; recorded `maxDpi` strictly higher; `driverCount` strictly higher; or the plain shard). Shard order is preserved in all cases.
- **Search ordering is disclosed, not scored.** Results are ordered by explicitly requested gradable criteria first (resolution when a dpi constraint was given), then the documented default: support-status rank, then listed-driver count, then id (the same deterministic tie-break convention as `scoreThenIdComparator`). Every search response states its ordering.
- **Unrecognized constraints are surfaced.** "purple laser printer" runs the laser filter and explicitly says that "purple" cannot be filtered — constraints are never silently dropped, and an unanswerable constraint never fabricates a NO_MATCHES claim.

## Data access

All artifacts are static JSON under `public/`, fetched with `withBasePath()` and cached per tab with the promise-cache pattern from `RecommendedPrintersSection.tsx` (404 ⇒ empty, network error ⇒ cache eviction so retries refetch). Measured sizes at the current snapshot (raw / gzip):

| Artifact | When loaded | Size |
|---|---|---|
| `printersMap.json` (catalogue) | first assistant query | 1,396,087 B / 71,147 B |
| `driversMap.json` | first assistant query | 85,064 B / 5,519 B |
| `printers/<id>.json` | per printer asked about | e.g. HP-LaserJet_4: 21,318 B / 5,901 B |
| `recommendations/<id>.json` | per similarity question | e.g. HP-LaserJet_4: 3,342 B / 402 B |
| `drivers/<id>.json` | per driver question | 0.5–268 KB raw |

Nothing loads until the assistant is opened; the launcher itself carries no data. The 44 MB `printers.json`, the feature matrix, and the combined recommendations file are never fetched. Query latency measured by the harness (Node, warm caches, 468 samples): median 0.08 ms, p95 4.46 ms — network transfer of the lazy artifacts dominates, not computation.

JavaScript cost (measured on a clean `next build`): the shared First Load JS is unchanged by the assistant (103 kB before and after — the launcher's increment is below the build output's rounding, inside the 9.1 KB-gzip layout chunk), and the entire lazy assistant chunk (panel UI + engine) is 60,715 B raw / 17,578 B gzip, loaded only on first open.

## Tunables

Values live in `lib/assistant/constants.ts`; `yarn assistant:eval` fails if this table drifts from the code.

| Constant | Value | Meaning |
|---|---|---|
| `MAX_QUERY_LENGTH` | 300 | input truncation bound before parsing |
| `SCORE_EXACT` | 4 | entity score: exact id / exact "make model" match |
| `SCORE_MODEL_EXACT` | 3 | entity score: exact model match (resolves only when unique) |
| `SCORE_MODEL_PREFIX` | 1 | entity score: prefix match (always surfaces as ambiguity) |
| `RESOLVE_MIN_SCORE` | 3 | minimum score for silent resolution |
| `MAX_CANDIDATES` | 5 | candidates carried by an ambiguity/clarification |
| `MAX_RESULT_CARDS` | 5 | result cards per response (totals are stated) |
| `HIGH_RES_MIN_DPI` | 1200 | disclosed interpretation of "high resolution" |
| `UNKNOWN_REPORT_RATIO` | 0.25 | unknown-excluded share that must be reported |
| `MIN_COMFORTABLE_RESULTS` | 3 | below this, one-filter relaxations are offered |

## Testing

- `lib/assistant/__tests__/` — always-run fixture suites: a 156-utterance natural-language corpus (`corpus.ts`) pinning intents and parse details, entity-resolution cases, execution-state semantics (unknown-never-false, duplex, relaxations, better-dimensions), and grounding property tests over rendered responses (every card id and similarity percentage must trace to input data; banned terminology can never appear).
- `lib/assistant/__tests__/assistant-artifact.test.ts` — the same engine against the real generated artifacts (skipped automatically when they are absent, e.g. CI's pre-generate test run).
- `tools/assistant-eval/run.ts` (`yarn assistant:eval`) — corpus accuracy, a full grounding sweep, the approved end-to-end flows, latency and artifact-size measurement, and the tunables/wording drift gates. Requires generated data, like `tools/eval/`.

## Extending the assistant

- **New capability filter:** add the field to the catalogue projection (`lib/foomatic/catalog.ts` + docs), a lexicon row (`lexicon.ts`), a filter spec (`execute.ts` `buildSpecs`), and corpus cases. Preserve known/pass separation so unknowns stay countable.
- **New intent:** add a cascade rule in `parse.ts` (mind the precedence list above), an executor arm, a response builder, and corpus cases.
- **New synonym:** one lexicon row plus a corpus case. Only add vocabulary grounded in the data's own terminology or clearly common phrasing.

## Known limitations

- Understanding is bounded by the lexicon and rule cascade; unanticipated phrasing falls back to a clarification with examples rather than a guess.
- Clarifications resolve through suggestion chips (each chip is a complete query); free-text follow-ups like "the second one" are not interpreted against prior candidates.
- Purely numeric model queries ("4019") need the manufacturer ("IBM 4019") — bare numbers are treated as capability values, not names.
- English-only vocabulary.
- Data limitations pass through honestly: duplex is unrecorded, `connectivity` is empty upstream, and 634 printers synthesized from driver back-references have thin records.
