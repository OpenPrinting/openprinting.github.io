// Ranking-quality metrics for the Foomatic recommendation engine.
// Reads the generated artifacts, computes, prints JSON, then enforces the hard
// invariants listed at the bottom of the file (exits non-zero on violation).
import fs from "fs"

const ROOT = process.cwd()
const P = JSON.parse(fs.readFileSync(`${ROOT}/public/foomatic-db/printers.json`, "utf8")).printers
const R = JSON.parse(fs.readFileSync(`${ROOT}/public/foomatic-db/recommendations.json`, "utf8")).recommendations
const byId = new Map(P.map((p) => [p.id, p]))

const NORM = [[/^Postscript/i, "postscript"], [/^PDF/i, "pdf"], [/^pxlmono/i, "pxlmono"], [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"], [/^foo2hp/i, "foo2hp"], [/^foo2qpdl/i, "foo2qpdl"], [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"], [/^gimp-print/i, "gutenprint"], [/^hplip/i, "hplip"], [/^ljet/i, "laserjet"], [/^lj/i, "laserjet"]]
const fam = (n) => { const s = (n || "").trim().replace(/^driver\//i, ""); for (const [re, f] of NORM) if (re.test(s)) return f; return s.toLowerCase() }
// Mirrors lib/foomatic/driver-family.ts deliberately (an independent
// re-implementation, so a drift between the two shows up as a failed claim):
// obsolete drivers are not compatibility evidence, and an obsolete recommended
// driver resolves to the replacement foomatic-db names explicitly.
const liveFams = (p) => new Set((p.drivers || []).filter((d) => !d.obsolete).map((d) => fam(d.name)))
const recFam = (p) => {
  const d = (p.recommended_driver || "").trim()
  if (!d) return null
  const entry = (p.drivers || []).find((x) => x.id === d)
  if (entry && entry.obsolete) return entry.replacedBy ? fam(entry.replacedBy) : null
  return fam(d)
}
const REBADGE = new Set(["Ricoh", "Lanier", "NRG", "Gestetner", "Savin", "Infotec", "Rex-Rotary", "Nashuatec"])

const clusterOf = {}
for (const p of P) { const f = recFam(p); if (f) clusterOf[f] = (clusterOf[f] || 0) + 1 }

const top3 = []
for (const [pid, recs] of Object.entries(R)) for (const r of recs.slice(0, 3)) top3.push([pid, r])

const m = {}
m.printers = P.length
m.printersWithRecs = Object.values(R).filter((r) => r.length > 0).length
m.printersWithZeroRecs = Object.values(R).filter((r) => r.length === 0).length
m.top3Count = top3.length

const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0)

// --- score distribution ---
const scores = top3.map(([, r]) => r.score).sort((a, b) => a - b)
const q = (f) => scores[Math.min(scores.length - 1, Math.floor(scores.length * f))]
m.scoreMean = +avg(scores).toFixed(4)
m.scoreP10 = q(0.10); m.scoreP50 = q(0.50); m.scoreP90 = q(0.90)
m.saturationPct = +(scores.filter((s) => s >= 0.9995).length / scores.length * 100).toFixed(2)
m.perfectMatches = scores.filter((s) => s >= 0.9995).length
const hist = {}
for (const s of scores) { const b = (Math.floor(s * 10) / 10).toFixed(1); hist[b] = (hist[b] || 0) + 1 }
m.scoreHistogram = hist

// --- ties / arbitrariness ---
let tieSum = 0, allTie = 0, nWith = 0
for (const recs of Object.values(R)) {
  if (!recs.length) continue
  nWith++
  const t = recs[0].score
  const c = recs.filter((r) => r.score === t).length
  tieSum += c
  if (c === recs.length && recs.length >= 3) allTie++
}
m.avgTiedAtTopScore = +(tieSum / nWith).toFixed(2)
m.pctAllRetainedTied = +(allTie / nWith * 100).toFixed(2)

// --- evidence quality ---
const featCounts = top3.map(([, r]) => r.sharedFeatures.length)
m.avgSharedFeatures = +avg(featCounts).toFixed(2)
m.pctZeroExplanation = +(featCounts.filter((c) => c === 0).length / featCounts.length * 100).toFixed(2)
m.pctSingleFeature = +(featCounts.filter((c) => c === 1).length / featCounts.length * 100).toFixed(2)
const GENERIC = new Set(["postscript", "pdf", "omni", "gutenprint", "laserjet", "hpijs", "pxlmono", "pxlcolor"])
let genericOnly = 0
for (const [, r] of top3) {
  if (r.sharedFeatures.length !== 1) continue
  const mm = /^Preferred Linux driver: (.+)$/.exec(r.sharedFeatures[0])
  if (mm && GENERIC.has(mm[1])) genericOnly++
}
m.pctGenericDriverOnly = +(genericOnly / top3.length * 100).toFixed(2)
m.pctFromLargeCluster = +(top3.filter(([pid]) => { const f = recFam(byId.get(pid)); return f && (clusterOf[f] || 0) >= 200 }).length / top3.length * 100).toFixed(2)

// --- confidence/evidence correlation ---
const weak = top3.filter(([, r]) => r.sharedFeatures.length <= 1).map(([, r]) => r.score)
const strong = top3.filter(([, r]) => r.sharedFeatures.length >= 2).map(([, r]) => r.score)
m.meanScoreWeakEvidence = +avg(weak).toFixed(4)
m.meanScoreStrongEvidence = +avg(strong).toFixed(4)
m.confidenceInversion = +(m.meanScoreWeakEvidence - m.meanScoreStrongEvidence).toFixed(4) // > 0 means broken
{
  const xs = featCounts, ys = top3.map(([, r]) => r.score)
  const mx = avg(xs), my = avg(ys)
  let num = 0, dx = 0, dy = 0
  for (let i = 0; i < xs.length; i++) { const a = xs[i] - mx, b = ys[i] - my; num += a * b; dx += a * a; dy += b * b }
  m.corrEvidenceScore = +(num / Math.sqrt(dx * dy)).toFixed(4) // expected strongly positive
}

// --- diversity ---
let sameMfr = 0, cross = 0, rebadge = 0, allSameMfr = 0, full = 0
const recCounts = {}
for (const [pid, recs] of Object.entries(R)) {
  const t = recs.slice(0, 3)
  if (t.length === 3) {
    full++
    const a = byId.get(pid)
    const set = new Set(t.map((r) => byId.get(r.id).manufacturer))
    if (set.size === 1 && set.has(a.manufacturer)) allSameMfr++
  }
  for (const r of t) {
    const a = byId.get(pid), b = byId.get(r.id)
    recCounts[r.id] = (recCounts[r.id] || 0) + 1
    if (a.manufacturer === b.manufacturer) sameMfr++
    else { cross++; if (REBADGE.has(a.manufacturer) && REBADGE.has(b.manufacturer)) rebadge++ }
  }
}
m.pctSameManufacturer = +(sameMfr / top3.length * 100).toFixed(2)
m.pctCrossVendor = +(cross / top3.length * 100).toFixed(2)
m.pctRebadgeOfCross = +(rebadge / cross * 100).toFixed(2)
m.pctGenuinelyNovelVendor = +((cross - rebadge) / top3.length * 100).toFixed(2)
m.pctAll3SameManufacturer = +(allSameMfr / full * 100).toFixed(2)

// catalogue coverage + exposure concentration
const counts = Object.values(recCounts)
m.distinctPrintersRecommended = counts.length
m.catalogueCoveragePct = +(counts.length / P.length * 100).toFixed(2)
{
  const tot = counts.reduce((a, b) => a + b, 0)
  let H = 0
  for (const c of counts) { const p = c / tot; H -= p * Math.log2(p) }
  m.recommendationEntropyBits = +H.toFixed(3)
  m.maxEntropyBits = +Math.log2(P.length).toFixed(3)
  m.entropyRatio = +(H / Math.log2(P.length)).toFixed(4)
  const s = counts.slice().sort((a, b) => a - b)
  let cum = 0, g = 0
  const n = s.length, t = s.reduce((a, b) => a + b, 0)
  for (let i = 0; i < n; i++) { cum += s[i]; g += cum / t }
  m.giniConcentration = +(1 - 2 * g / n + 1 / n).toFixed(4)
}
let mixedDriver = 0
for (const [, recs] of Object.entries(R)) {
  const t = recs.slice(0, 3); if (t.length < 3) continue
  const s = new Set(t.map((r) => recFam(byId.get(r.id))))
  if (s.size > 1) mixedDriver++
}
m.pctTop3WithMixedDrivers = +(mixedDriver / full * 100).toFixed(2)

// --- contradictions ---
let typeBad = 0, typeBoth = 0, colorBad = 0, colorBoth = 0, dpiFar = 0, dpiBoth = 0
for (const [pid, r] of top3) {
  const a = byId.get(pid), b = byId.get(r.id)
  if (a.type && b.type && a.type !== "unknown" && b.type !== "unknown") { typeBoth++; if (a.type !== b.type) typeBad++ }
  if (a.color != null && b.color != null && a.color !== "unknown" && b.color !== "unknown") { colorBoth++; if (a.color !== b.color) colorBad++ }
  if (a.maxDpi != null && b.maxDpi != null) { dpiBoth++; const hi = Math.max(a.maxDpi, b.maxDpi), lo = Math.min(a.maxDpi, b.maxDpi); if (hi / lo >= 4) dpiFar++ }
}
m.pctTypeContradiction = +(typeBad / typeBoth * 100).toFixed(2)
m.pctColorContradiction = +(colorBad / colorBoth * 100).toFixed(2)
m.pctDpiContradiction4x = +(dpiFar / dpiBoth * 100).toFixed(2)

// --- explanation truthfulness: validate every user-visible claim ---
let claims = 0, falseClaims = 0
const falseBy = {}
const bump = (k) => { falseBy[k] = (falseBy[k] || 0) + 1; falseClaims++ }
for (const [pid, r] of top3) {
  const a = byId.get(pid), b = byId.get(r.id)
  const aFams = liveFams(a)
  const bFams = liveFams(b)
  const aCmd = new Set(a.commandsetTokens || []), bCmd = new Set(b.commandsetTokens || [])
  for (const f of r.sharedFeatures) {
    claims++
    let mm
    if ((mm = /^Preferred Linux driver: (.+)$/.exec(f))) {
      if (!(recFam(a) === mm[1] && recFam(b) === mm[1])) bump("preferredDriver")
    } else if ((mm = /^Shared driver family: (.+)$/.exec(f))) {
      if (!(aFams.has(mm[1]) && bFams.has(mm[1]))) bump("sharedDriverFamily")
    } else if (/^(Laser|Inkjet|Dot-matrix) printer$/.test(f)) {
      const want = { "Laser printer": "laser", "Inkjet printer": "inkjet", "Dot-matrix printer": "dot-matrix" }[f]
      if (!(a.type === want && b.type === want)) bump("printerType")
    } else if (f === "Color printing") {
      if (!(a.color === true && b.color === true)) bump("colorPrinting")
    } else if ((mm = /^Shared command set: (.+)$/.exec(f))) {
      const LAB = { "PostScript": "POSTSCRIPT", "PCL XL (PCL6)": "PCLXL", "PCL5e": "PCL5E", "PCL": "PCL", "PDF printing": "PDF",
        "Epson ESC/P2": "ESCPL2", "Epson ESC/P-R": "ESCPR2", "Epson BDC": "BDC", "Epson D4": "D4", "Epson D4PX": "D4PX", "PJL": "PJL", "MLC": "MLC" }
      const tok = LAB[mm[1]] ?? mm[1]
      if (!(aCmd.has(tok) && bCmd.has(tok))) bump("commandSet")
    } else if ((mm = /^PostScript (\d)$/.exec(f))) {
      if (!(a.psLevel === +mm[1] && b.psLevel === +mm[1])) bump("postscriptLevel")
    } else if (/^PCL (6 \/ PCL XL|5e|\d)$/.test(f)) {
      const lv = f === "PCL 6 / PCL XL" ? 6 : f === "PCL 5e" ? 5 : +f.slice(4)
      if (!(a.pclLevel === lv && b.pclLevel === lv)) bump("pclLevel")
    } else if ((mm = /^(\d+)(\+?) dpi resolution$/.exec(f))) {
      const stated = +mm[1], plus = mm[2] === "+"
      const ok = plus ? (a.maxDpi > stated && b.maxDpi > stated) : (a.maxDpi === stated && b.maxDpi === stated)
      if (!ok) bump(plus ? "dpiTierPlus" : "dpiExact")
    } else if (/^(Similar resolution|Excellent|Good|Basic) /.test(f)) {
      // range-style or support-grade labels: verified elsewhere
    }
  }
}
m.totalClaims = claims
m.falseOrMisleadingClaims = falseClaims
m.pctClaimsFalseOrMisleading = +(falseClaims / claims * 100).toFixed(2)
m.falseClaimBreakdown = falseBy

// --- obsolete drivers must never be cited as current compatibility evidence ---
// foomatic-db marks some drivers `<obsolete replace="..."/>`. Those entries are
// excluded from the similarity features, so no explanation may rest on a family
// a printer reaches only through an obsolete driver.
const obsoleteOnlyFamilies = new Map()
for (const p of P) {
  const live = new Set((p.drivers || []).filter((d) => !d.obsolete).map((d) => fam(d.name)))
  const dead = new Set()
  for (const d of p.drivers || []) {
    if (d.obsolete && !live.has(fam(d.name))) dead.add(fam(d.name))
  }
  obsoleteOnlyFamilies.set(p.id, dead)
}
let driverClaims = 0, obsoleteClaims = 0
const obsoleteExamples = []
for (const [pid, r] of top3) {
  for (const f of r.sharedFeatures) {
    const mm = /^(?:Shared driver family|Preferred Linux driver): (.+)$/.exec(f)
    if (!mm) continue
    driverClaims++
    if (obsoleteOnlyFamilies.get(pid)?.has(mm[1]) || obsoleteOnlyFamilies.get(r.id)?.has(mm[1])) {
      obsoleteClaims++
      if (obsoleteExamples.length < 5) obsoleteExamples.push(`${pid} -> ${r.id}: ${f}`)
    }
  }
}
m.driverFamilyClaims = driverClaims
m.claimsCitingObsoleteOnlyFamily = obsoleteClaims
m.obsoleteClaimExamples = obsoleteExamples

// Reported so the relationship between driver-list size and score stays
// visible. It is a property of evidence damping, not a support-quality signal;
// nothing in the pipeline consumes a driver count.
{
  const rows = []
  for (const [pid, recs] of Object.entries(R)) {
    const p = byId.get(pid)
    if (!p || !recs.length) continue
    rows.push([(p.drivers || []).length, avg(recs.slice(0, 3).map((r) => r.score))])
  }
  const xs = rows.map((r) => r[0]), ys = rows.map((r) => r[1])
  const mx = avg(xs), my = avg(ys)
  let num = 0, dx = 0, dy = 0
  for (let i = 0; i < xs.length; i++) { const a = xs[i] - mx, b = ys[i] - my; num += a * b; dx += a * a; dy += b * b }
  m.corrDriverCountScore = +(num / Math.sqrt(dx * dy)).toFixed(4)
}

console.log(JSON.stringify(m, null, 1))

// Hard invariants. Everything above is measurement; these two properties the
// user-facing explanations depend on must fail `yarn foomatic:eval` when broken.
const INVARIANTS = [
  ["claimsCitingObsoleteOnlyFamily", m.claimsCitingObsoleteOnlyFamily, 0],
  ["falseOrMisleadingClaims", m.falseOrMisleadingClaims, 0],
]
let broken = 0
for (const [name, actual, expected] of INVARIANTS) {
  if (actual !== expected) {
    console.error(`INVARIANT FAILED: ${name} = ${actual}, expected ${expected}`)
    broken++
  }
}
if (broken > 0) {
  if (m.obsoleteClaimExamples.length) console.error(`examples: ${m.obsoleteClaimExamples.join(" | ")}`)
  process.exit(1)
}
