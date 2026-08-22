// Deterministic stratified sample for qualitative recommendation review.
// Strategy: define disjoint-ish strata by technology / form-factor / rarity,
// sort each stratum by id (stable), take evenly-spaced picks. No randomness,
// no cherry-picking: the same input data always yields the same sample.
import fs from "fs"

const P = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/printers.json`, "utf8")).printers
const R = JSON.parse(fs.readFileSync(`${process.cwd()}/public/foomatic-db/recommendations.json`, "utf8")).recommendations

const nameOf = (p) => `${p.manufacturer} ${p.model}`
const drvNames = (p) => (p.drivers || []).map((d) => d.name).join(" ").toLowerCase()

const STRATA = {
  laser: (p) => p.type === "laser",
  inkjet: (p) => p.type === "inkjet",
  dotmatrix: (p) => p.type === "dot-matrix",
  labelThermal: (p) => /label|dymo|costar|slp|zebra|brother.*ql|thermal/i.test(nameOf(p)) || /pbm2lwxl|slap|ptouch/.test(drvNames(p)),
  dyeSub: (p) => /printiva|dye|md-\d|p-\d{3}|cp\d{2}|selphy|picturemate/i.test(nameOf(p)) || /ppmtomd|md2k/.test(drvNames(p)),
  mfp: (p) => /mfp|mfc|bizhub|ir-adv|imagerunner|workcentre|laserjet.*m\d|aficio|im\d/i.test(nameOf(p)),
  industrial: (p) => /digimaster|production|nuvera|docutech|varioprint|indigo|press/i.test(nameOf(p)),
  color: (p) => p.color === true,
  mono: (p) => p.color === false,
  highRes: (p) => p.maxDpi != null && p.maxDpi >= 2400,
  lowRes: (p) => p.maxDpi != null && p.maxDpi <= 300,
  postscript: (p) => p.psLevel != null,
  // rarity by how many printers share the same recommended driver
}
const NORM = [[/^Postscript/i, "postscript"], [/^PDF/i, "pdf"], [/^pxlmono/i, "pxlmono"], [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"], [/^foo2hp/i, "foo2hp"], [/^foo2qpdl/i, "foo2qpdl"], [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"], [/^gimp-print/i, "gutenprint"], [/^hplip/i, "hplip"], [/^ljet/i, "laserjet"], [/^lj/i, "laserjet"]]
const fam = (n) => { const s = (n || "").trim().replace(/^driver\//i, ""); for (const [re, f] of NORM) if (re.test(s)) return f; return s.toLowerCase() }
const recFam = (p) => { const d = (p.recommended_driver || "").trim(); return d ? fam(d) : null }
const cluster = {}
for (const p of P) { const f = recFam(p); if (f) cluster[f] = (cluster[f] || 0) + 1 }
STRATA.commonDriver = (p) => (cluster[recFam(p)] || 0) >= 500
STRATA.rareDriver = (p) => { const c = cluster[recFam(p)] || 0; return c > 0 && c <= 3 }

const PER_STRATUM = 4
const picked = new Map()
for (const [name, pred] of Object.entries(STRATA)) {
  const pool = P.filter((p) => pred(p) && (R[p.id] || []).length > 0).sort((a, b) => a.id.localeCompare(b.id))
  if (!pool.length) continue
  const step = Math.max(1, Math.floor(pool.length / PER_STRATUM))
  for (let i = 0, taken = 0; i < pool.length && taken < PER_STRATUM; i += step, taken++) {
    const p = pool[i]
    if (!picked.has(p.id)) picked.set(p.id, [])
    picked.get(p.id).push(name)
  }
}
// manufacturer breadth: one printer from each of 20 evenly-spaced manufacturers
const mfrs = [...new Set(P.map((p) => p.manufacturer))].sort()
const mstep = Math.max(1, Math.floor(mfrs.length / 20))
for (let i = 0, t = 0; i < mfrs.length && t < 20; i += mstep, t++) {
  const pool = P.filter((p) => p.manufacturer === mfrs[i] && (R[p.id] || []).length > 0).sort((a, b) => a.id.localeCompare(b.id))
  if (!pool.length) continue
  const p = pool[Math.floor(pool.length / 2)]
  if (!picked.has(p.id)) picked.set(p.id, [])
  picked.get(p.id).push(`mfr:${mfrs[i]}`)
}

const out = [...picked.entries()].map(([id, strata]) => ({ id, strata })).sort((a, b) => a.id.localeCompare(b.id))

// Importable for grade.mjs / pairs.mjs; prints JSON when run directly.
export const sample = out

import { pathToFileURL } from "url"
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(out, null, 1))
}
