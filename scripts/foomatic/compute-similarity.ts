import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Printer } from "../../lib/foomatic/types";

const ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const MATRIX_FILE = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "feature-matrix.json",
);

const PRINTERS_FILE = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "printers.json",
);

const OUTPUT_FILE = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "recommendations.json",
);

const TOP_K = 10;
const MIN_SIMILARITY_SCORE = 0.25;

interface FeatureMatrix {
  printerCount: number;
  featureCount: number;
  featureNames: string[];
  ids: string[];
  matrix: number[][];
}

interface Recommendation {
  id: string;
  score: number;
  sharedFeatures: string[];
}

interface RecommendationMap {
  [printerId: string]: Recommendation[];
}

interface Output {
  version: string;
  printerCount: number;
  topK: number;
  recommendations: RecommendationMap;
}

interface Candidate {
  index: number;
  score: number;
}

const DRIVER_PREFIX_NORMALIZERS: Array<[RegExp, string]> = [
  [/^Postscript/i, "postscript"],
  [/^PDF/i, "pdf"],
  [/^pxlmono/i, "pxlmono"],
  [/^pxlcolor/i, "pxlcolor"],
  [/^foo2zjs/i, "foo2zjs"],
  [/^foo2hp/i, "foo2hp"],
  [/^foo2qpdl/i, "foo2qpdl"],
  [/^hpijs/i, "hpijs"],
  [/^gutenprint/i, "gutenprint"],
  [/^gimp-print/i, "gutenprint"],
  [/^hplip/i, "hplip"],
  [/^ljet/i, "laserjet"],
  [/^lj/i, "laserjet"],
];

function trim(value: string | undefined): string {
  return (value ?? "").trim();
}

function normalizeDriverFamily(driverName: string): string {
  const normalized = trim(driverName).replace(/^driver\//i, "");

  for (const [pattern, family] of DRIVER_PREFIX_NORMALIZERS) {
    if (pattern.test(normalized)) {
      return family;
    }
  }

  return normalized.toLowerCase();
}

function getRecommendedDriverFamily(printer: Printer): string | null {
  const driver = trim(printer.recommended_driver);

  if (!driver) {
    return null;
  }

  return normalizeDriverFamily(driver);
}

function getSupportedDriverFamilies(printer: Printer): string[] {
  const families = new Set<string>();

  for (const driver of printer.drivers ?? []) {
    const family = normalizeDriverFamily(driver.name);

    if (family) {
      families.add(family);
    }
  }

  return [...families];
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;

  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }

  return sum;
}

function magnitude(vec: number[]): number {
  return Math.sqrt(dotProduct(vec, vec));
}

function cosineSimilarity(
  a: number[],
  b: number[],
  magA: number,
  magB: number,
): number {
  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dotProduct(a, b) / (magA * magB);
}

function insertTopK(topK: Candidate[], candidate: Candidate): void {
  if (topK.length < TOP_K) {
    topK.push(candidate);
    topK.sort((a, b) => a.score - b.score);
    return;
  }

  if (candidate.score > topK[0].score) {
    topK[0] = candidate;
    topK.sort((a, b) => a.score - b.score);
  }
}

function computeSharedFeatures(a: Printer, b: Printer): string[] {
  const shared: string[] = [];

  const aRecommended = getRecommendedDriverFamily(a);
  const bRecommended = getRecommendedDriverFamily(b);

  if (aRecommended && bRecommended && aRecommended === bRecommended) {
    shared.push(`Preferred Linux driver: ${aRecommended}`);
  }

  const aSupported = new Set(getSupportedDriverFamilies(a));

  const commonDrivers = getSupportedDriverFamilies(b)
    .filter((driver) => aSupported.has(driver))
    .slice(0, 3);

  for (const driver of commonDrivers) {
    if (driver !== aRecommended) {
      shared.push(`Shared driver family: ${driver}`);
    }
  }

  if (a.type && b.type && a.type !== "unknown" && a.type === b.type) {
    const label: Record<string, string> = {
      laser: "Laser printer",
      inkjet: "Inkjet printer",
      "dot-matrix": "Dot-matrix printer",
    };

    shared.push(label[a.type] ?? a.type);
  }

  if (a.color === true && b.color === true) {
    shared.push("Color printing");
  }

  if (
    a.functionality &&
    b.functionality &&
    a.functionality === b.functionality
  ) {
    const label: Record<string, string> = {
      A: "Excellent Linux driver support",
      B: "Good Linux driver support",
      C: "Basic Linux driver support",
    };

    if (label[a.functionality]) {
      shared.push(label[a.functionality]);
    }
  }

  return [...new Set(shared)];
}

function buildRecommendation(
  target: Printer,
  candidate: Printer,
  score: number,
): Recommendation {
  return {
    id: candidate.id,
    score: Number(score.toFixed(3)),
    sharedFeatures: computeSharedFeatures(target, candidate),
  };
}

function logScoreDistribution(recommendations: RecommendationMap): void {
  const allScores = Object.values(recommendations)
    .flat()
    .map((r) => r.score)
    .sort((a, b) => a - b);

  const p = (pct: number): string =>
    allScores[Math.floor(allScores.length * pct)].toFixed(3);

  console.log("\nScore distribution across all recommendations:");
  console.log(`  min : ${allScores[0].toFixed(3)}`);
  console.log(`  p10 : ${p(0.1)}`);
  console.log(`  p25 : ${p(0.25)}`);
  console.log(`  p50 : ${p(0.5)}`);
  console.log(`  p75 : ${p(0.75)}`);
  console.log(`  p90 : ${p(0.9)}`);
  console.log(`  max : ${allScores[allScores.length - 1].toFixed(3)}`);
}

function logSpotCheck(
  recommendations: RecommendationMap,
  printerMap: Map<string, Printer>,
): void {
  const targets = [
    "HP-2000C",
    "Canon-i560",
    "Gestetner-DSc445",
    "Epson-LQ-570",
  ];

  console.log("\nSpot-checks:");

  for (const id of targets) {
    const printer = printerMap.get(id);

    if (!printer) {
      continue;
    }

    console.log(`\n  ${printer.id} — ${printer.manufacturer} ${printer.type}`);

    const recs = recommendations[id] ?? [];

    for (const [index, rec] of recs.slice(0, 3).entries()) {
      const candidate = printerMap.get(rec.id);

      console.log(`    ${index + 1}. ${rec.id}`);

      console.log(`       score  : ${rec.score}`);

      console.log(
        `       type   : ${candidate?.type ?? "unknown"} | manufacturer: ${candidate?.manufacturer ?? "unknown"}`,
      );

      console.log(
        `       shared : ${rec.sharedFeatures.length > 0 ? rec.sharedFeatures.join(", ") : "none"}`,
      );
    }
  }
}

function loadFeatureMatrix(): FeatureMatrix {
  if (!fs.existsSync(MATRIX_FILE)) {
    throw new Error(`Missing feature matrix: ${MATRIX_FILE}`);
  }

  return JSON.parse(fs.readFileSync(MATRIX_FILE, "utf-8"));
}

function loadPrinters(): Printer[] {
  if (!fs.existsSync(PRINTERS_FILE)) {
    throw new Error(`Missing printers.json: ${PRINTERS_FILE}`);
  }

  const raw = JSON.parse(fs.readFileSync(PRINTERS_FILE, "utf-8"));

  return raw.printers;
}

function main(): void {
  const start = performance.now();

  console.log("Loading feature matrix...");

  const matrixData = loadFeatureMatrix();

  console.log(`  Printers : ${matrixData.printerCount}`);

  console.log(`  Features : ${matrixData.featureCount}`);

  console.log("Loading printer metadata...");

  const printers = loadPrinters();

  const printerMap = new Map(printers.map((p) => [p.id, p]));

  console.log("Pre-computing magnitudes...");

  const magnitudes = matrixData.matrix.map(magnitude);

  const recommendations: RecommendationMap = {};

  console.log(`Computing top-${TOP_K} similarities...`);

  for (let i = 0; i < matrixData.printerCount; i++) {
    const vecA = matrixData.matrix[i];
    const magA = magnitudes[i];

    const topK: Candidate[] = [];

    for (let j = 0; j < matrixData.printerCount; j++) {
      if (i === j) {
        continue;
      }

      const vecB = matrixData.matrix[j];
      const magB = magnitudes[j];

      const score = cosineSimilarity(vecA, vecB, magA, magB);

      if (score < MIN_SIMILARITY_SCORE) {
        continue;
      }

      insertTopK(topK, {
        index: j,
        score,
      });
    }

    topK.sort((a, b) => b.score - a.score);

    const printerId = matrixData.ids[i];

    recommendations[printerId] = topK.map(({ index, score }) => {
      const target = printerMap.get(printerId);

      const candidate = printerMap.get(matrixData.ids[index]);

      if (!target || !candidate) {
        throw new Error(
          "Printer lookup failed during recommendation generation",
        );
      }

      return buildRecommendation(target, candidate, score);
    });

    if ((i + 1) % 1000 === 0) {
      const elapsed = ((performance.now() - start) / 1000).toFixed(1);

      console.log(
        `  ${i + 1}/${matrixData.printerCount} — ${elapsed}s elapsed`,
      );
    }
  }

  const output: Output = {
    version: "2.0.0",
    printerCount: matrixData.printerCount,
    topK: TOP_K,
    recommendations,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), {
    recursive: true,
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  logScoreDistribution(recommendations);

  logSpotCheck(recommendations, printerMap);

  const runtime = ((performance.now() - start) / 1000).toFixed(1);

  console.log(`\n✓ Recommendations written to ${OUTPUT_FILE}`);

  console.log(
    `  File size : ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`,
  );

  console.log(`  Runtime   : ${runtime}s`);
  console.log(`  Printers  : ${matrixData.printerCount}`);
  console.log(`  Top-K     : ${TOP_K}`);
}

main();
