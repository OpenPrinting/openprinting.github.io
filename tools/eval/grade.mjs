// Applies a fixed rubric to every top-3 recommendation of the sampled printers.
// Rubric (deterministic, applied uniformly — no per-case judgement):
//   Incorrect : 0 reasons, OR type contradiction, OR colour contradiction, OR >=4x dpi gap
//   Weak      : only 1 reason, OR the sole substantive reason is a generic/catch-all driver
//   Acceptable: 2-3 reasons and no contradiction
//   Good      : 4-6 reasons, or same product series
//   Excellent : >=7 reasons, or a specific (non-generic) shared preferred driver + >=4 reasons
import fs from "fs"

const P = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/printers.json`, "utf8")).printers
const R = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/recommendations.json`, "utf8")).recommendations
const byId = new Map(P.map((p) => [p.id, p]))
const sample = JSON.parse(fs.readFileSync(process.argv[2], "utf8"))

const GENERIC = new Set(["postscript", "pdf", "omni", "gutenprint", "laserjet", "hpijs", "pxlmono", "pxlcolor", "gdi"])
const NORM = [[/^Postscript/i, "postscript"], [/^PDF/i, "pdf"], [/^pxlmono/i, "pxlmono"], [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"], [/^foo2hp/i, "foo2hp"], [/^foo2qpdl/i, "foo2qpdl"], [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"], [/^gimp-print/i, "gutenprint"], [/^hplip/i, "hplip"], [/^ljet/i, "laserjet"], [/^lj/i, "laserjet"]]
const fam = (n) => { const s = (n || "").trim().replace(/^driver\//i, ""); for (const [re, f] of NORM) if (re.test(s)) return f; return s.toLowerCase() }
const recFam = (p) => { const d = (p.recommended_driver || "").trim(); return d ? fam(d) : null }
const series = (p) => `${p.manufacturer}|${(p.model || "").replace(/[\d_\-].*$/, "")}`

function grade(a, b, r) {
  const n = r.sharedFeatures.length
  if (n === 0) return ["Incorrect", "no stated reason at all"]
  if (a.type && b.type && a.type !== "unknown" && b.type !== "unknown" && a.type !== b.type) return ["Incorrect", `type contradiction ${a.type} vs ${b.type}`]
  if (a.color === true && b.color === false) return ["Incorrect", "colour contradiction: colour vs mono"]
  if (a.color === false && b.color === true) return ["Incorrect", "colour contradiction: mono vs colour"]
  if (a.maxDpi != null && b.maxDpi != null) {
    const hi = Math.max(a.maxDpi, b.maxDpi), lo = Math.min(a.maxDpi, b.maxDpi)
    if (hi / lo >= 4) return ["Incorrect", `dpi gap ${a.maxDpi} vs ${b.maxDpi}`]
  }
  const rf = recFam(a)
  const specificDriver = rf && rf === recFam(b) && !GENERIC.has(rf)
  if (n === 1) return ["Weak", `single reason: ${r.sharedFeatures[0]}`]
  if (rf && GENERIC.has(rf) && n <= 3) return ["Weak", `generic driver (${rf}) + only ${n} reasons`]
  if (n >= 7 || (specificDriver && n >= 4)) return ["Excellent", specificDriver ? `specific driver ${rf}, ${n} reasons` : `${n} corroborating reasons`]
  if (n >= 4 || series(a) === series(b)) return ["Good", series(a) === series(b) ? "same product series" : `${n} reasons`]
  return ["Acceptable", `${n} reasons`]
}

const tally = {}
const rows = []
for (const { id, strata } of sample) {
  const a = byId.get(id)
  for (const [i, r] of (R[id] || []).slice(0, 3).entries()) {
    const b = byId.get(r.id)
    const [g, why] = grade(a, b, r)
    tally[g] = (tally[g] || 0) + 1
    rows.push({ id, strata: strata.join(","), rank: i + 1, rec: r.id, score: r.score, n: r.sharedFeatures.length, grade: g, why,
      sameMfr: a.manufacturer === b.manufacturer })
  }
}
if (process.argv[3] === "--rows") {
  for (const r of rows) console.log(`${r.id.padEnd(34)} #${r.rank} -> ${r.rec.padEnd(34)} s=${String(r.score).padEnd(5)} n=${String(r.n).padStart(2)} ${r.sameMfr ? "SAME" : "    "} ${r.grade.padEnd(10)} ${r.why}`)
}
const total = Object.values(tally).reduce((a, b) => a + b, 0)
console.log("\nGRADE DISTRIBUTION over", total, "sampled recommendations")
for (const g of ["Excellent", "Good", "Acceptable", "Weak", "Incorrect"]) {
  const c = tally[g] || 0
  console.log(`  ${g.padEnd(11)} ${String(c).padStart(4)}  ${(c / total * 100).toFixed(1)}%`)
}
const goodish = (tally.Excellent || 0) + (tally.Good || 0)
console.log(`  => usable (Excellent+Good): ${(goodish / total * 100).toFixed(1)}%`)
console.log(`  => problematic (Weak+Incorrect): ${(((tally.Weak || 0) + (tally.Incorrect || 0)) / total * 100).toFixed(1)}%`)
