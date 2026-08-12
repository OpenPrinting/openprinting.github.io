// Guards against documentation drift: every tunable listed in
// docs/foomatic-recommendation-quality.md must exist in the source with the
// documented value, and every scoring constant in the source must be listed.
// Exits non-zero on any mismatch so it can run as part of `yarn foomatic:eval`.
import fs from "fs"

const SOURCES = [
  "scripts/foomatic/vectorize.ts",
  "scripts/foomatic/compute-similarity.ts",
  "lib/foomatic/scoring.ts",
]
const DOC = "docs/foomatic-recommendation-quality.md"

// The constants that define pipeline behaviour. Add new tunables here so the
// check fails loudly until they are documented.
const TRACKED = [
  "RECOMMENDED_DRIVER_WEIGHT", "COMMANDSET_WEIGHT", "SUPPORTED_DRIVER_WEIGHT",
  "COLOR_WEIGHT", "LANG_WEIGHT", "RESOLUTION_WEIGHT", "TYPE_WEIGHT",
  "LANG_LEVEL_WEIGHT", "FUNCTIONALITY_WEIGHT", "MIN_COMMANDSET_FREQUENCY",
  "TOP_K", "MIN_SIMILARITY_SCORE", "EVIDENCE_TAU",
  "TYPE_CONFLICT_PENALTY", "COLOR_CONFLICT_PENALTY",
  "RESOLUTION_CONFLICT_PENALTY", "RESOLUTION_CONFLICT_RATIO",
  "CONFIDENCE_HIGH_THRESHOLD", "CONFIDENCE_GOOD_THRESHOLD",
  "CONFIDENCE_MODERATE_THRESHOLD",
]

const src = SOURCES.map((f) => fs.readFileSync(f, "utf8")).join("\n")
const doc = fs.readFileSync(DOC, "utf8")

let failures = 0
for (const name of TRACKED) {
  const inCode = new RegExp(`const ${name} = ([0-9.]+)`).exec(src)
  const inDoc = new RegExp(`\\| \`${name}\`\\s*\\|\\s*([0-9.]+)`).exec(doc)

  if (!inCode) {
    console.error(`MISSING IN CODE : ${name} (tracked but not defined in any source file)`)
    failures++
  } else if (!inDoc) {
    console.error(`UNDOCUMENTED    : ${name} = ${inCode[1]} (not in ${DOC})`)
    failures++
  } else if (Number(inCode[1]) !== Number(inDoc[1])) {
    console.error(`VALUE MISMATCH  : ${name} code=${inCode[1]} doc=${inDoc[1]}`)
    failures++
  }
}

// Terminology that must not reappear anywhere in the docs.
const BANNED = [/Exact match/, /% match\b/, /EXACT_MATCH_THRESHOLD/, /STRONG_MATCH_PERCENT/, /MODERATE_MATCH_PERCENT/]
for (const file of fs.readdirSync("docs").filter((f) => f.startsWith("foomatic-"))) {
  const text = fs.readFileSync(`docs/${file}`, "utf8")
  for (const re of BANNED) {
    if (re.test(text)) {
      console.error(`STALE TERM      : ${re} in docs/${file}`)
      failures++
    }
  }
}

if (failures > 0) {
  console.error(`\ndoc-drift check FAILED: ${failures} problem(s)`)
  process.exit(1)
}
console.log(`doc-drift check OK: ${TRACKED.length} tunables match ${DOC}; no stale terminology`)
