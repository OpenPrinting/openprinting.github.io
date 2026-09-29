// Maintainer-facing inspection of real recommendation pairs.
//
// Usage: node tools/eval/pairs.mjs [sample.json]
// With no argument the deterministic sample is generated in-process.
//
// For every recommendation of every sampled printer it prints the full source
// and target attributes next to the user-visible explanation, then buckets the
// pair into one of four defensibility categories:
//
//   good        multiple independent discriminative signals agree
//   low-value   technically correct but a rebadge / same-series sibling,
//               so it offers the user little new information
//   weak        rests on a single signal or a generic catch-all driver
//   problematic capability conflict or unexplained pairing survives
//
// The bucketing is deterministic so the same artifacts always produce the
// same report. It is a lens for human review, not a ground-truth label.
import fs from "fs"

const P = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/printers.json`, "utf8")).printers
const R = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/recommendations.json`, "utf8")).recommendations
const byId = new Map(P.map((p) => [p.id, p]))
const sampleArg = process.argv.find((a) => a.endsWith(".json"))
const sample = sampleArg
  ? JSON.parse(fs.readFileSync(sampleArg, "utf8"))
  : (await import("./sample.mjs")).sample

const REBADGE = new Set(["Ricoh", "Lanier", "NRG", "Gestetner", "Savin", "Infotec", "Rex-Rotary", "Nashuatec"])
const GENERIC = new Set(["postscript", "pdf", "omni", "gutenprint", "laserjet", "hpijs", "pxlmono", "pxlcolor", "gdi"])
const NORM = [[/^Postscript/i, "postscript"], [/^PDF/i, "pdf"], [/^pxlmono/i, "pxlmono"], [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"], [/^foo2hp/i, "foo2hp"], [/^foo2qpdl/i, "foo2qpdl"], [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"], [/^gimp-print/i, "gutenprint"], [/^hplip/i, "hplip"], [/^ljet/i, "laserjet"], [/^lj/i, "laserjet"]]
const fam = (n) => { const s = (n || "").trim().replace(/^driver\//i, ""); for (const [re, f] of NORM) if (re.test(s)) return f; return s.toLowerCase() }
const recFam = (p) => { const d = (p.recommended_driver || "").trim(); return d ? fam(d) : null }
const series = (p) => `${p.manufacturer}|${(p.model || "").replace(/[\d_\-].*$/, "")}`

const cap = (p) =>
  `type=${p.type ?? "?"} color=${p.color} dpi=${p.maxDpi ?? "?"} ps=${p.psLevel ?? "-"} pcl=${p.pclLevel ?? "-"} ` +
  `func=${p.functionality ?? "?"} drv=${recFam(p) ?? "none"} cmds=[${(p.commandsetTokens ?? []).join(",")}] drivers=${(p.drivers ?? []).length}`

function bucket(a, b, r) {
  const n = r.sharedFeatures.length
  if (n === 0) return "problematic"
  if (a.type && b.type && a.type !== "unknown" && b.type !== "unknown" && a.type !== b.type) return "problematic"
  if ((a.color === true && b.color === false) || (a.color === false && b.color === true)) return "problematic"
  if (a.maxDpi != null && b.maxDpi != null && Math.max(a.maxDpi, b.maxDpi) / Math.min(a.maxDpi, b.maxDpi) >= 4) return "problematic"
  const rf = recFam(a)
  if (n === 1 || (rf && GENERIC.has(rf) && n <= 3)) return "weak"
  const rebadge = REBADGE.has(a.manufacturer) && REBADGE.has(b.manufacturer)
  if (rebadge || series(a) === series(b)) return "low-value"
  return "good"
}

const buckets = { good: [], "low-value": [], weak: [], problematic: [] }
for (const { id } of sample) {
  const a = byId.get(id)
  for (const [i, r] of (R[id] || []).slice(0, 3).entries()) {
    const b = byId.get(r.id)
    buckets[bucket(a, b, r)].push({ a, b, r, rank: i + 1 })
  }
}

const PER = Number(process.env.PAIRS_PER_BUCKET ?? 4)
for (const [name, list] of Object.entries(buckets)) {
  console.log(`\n===== ${name.toUpperCase()} (${list.length} in sample, showing first ${Math.min(PER, list.length)}) =====`)
  for (const { a, b, r, rank } of list.slice(0, PER)) {
    console.log(`\n${a.id}  ->  #${rank} ${b.id}   score=${r.score}`)
    console.log(`  source : ${cap(a)}`)
    console.log(`  target : ${cap(b)}`)
    console.log(`  shown  : ${r.sharedFeatures.join("; ") || "(none)"}`)
  }
}
console.log("\nBucket totals:", Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])))
