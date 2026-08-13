import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Printer } from "../../lib/foomatic/types";
import {
  getRecommendedDriverFamily,
  getSupportedDriverFamilies,
} from "../../lib/foomatic/driver-family";
import {
  cosineSimilarity,
  magnitude,
  insertTopK,
} from "../../lib/foomatic/similarity-math";
import type { ScoredCandidate } from "../../lib/foomatic/similarity-math";
import {
  MIN_SIMILARITY_SCORE,
  conflictPenalty,
  evidenceWeight,
  overlapCount,
  resolutionTier,
  scoreThenIdComparator,
} from "../../lib/foomatic/scoring";

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

const RECOMMENDATIONS_DIR = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "recommendations",
);

const TOP_K = 10;

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

  const aCommandsets = new Set(a.commandsetTokens ?? []);
  const COMMANDSET_LABELS: Record<string, string> = {
    POSTSCRIPT: "PostScript",
    PCLXL: "PCL XL (PCL6)",
    PCL5E: "PCL5e",
    PCL: "PCL",
    PDF: "PDF printing",
    ESCPL2: "Epson ESC/P2",
    ESCPR2: "Epson ESC/P-R",
    BDC: "Epson BDC",
    D4: "Epson D4",
    D4PX: "Epson D4PX",
    PJL: "PJL",
    MLC: "MLC",
  };
  for (const cs of (b.commandsetTokens ?? [])) {
    if (aCommandsets.has(cs)) {
      const label = COMMANDSET_LABELS[cs] ?? cs;
      shared.push(`Shared command set: ${label}`);
    }
  }

  if (a.psLevel != null && b.psLevel != null && a.psLevel === b.psLevel) {
    const psLabel: Record<number, string> = { 3: "PostScript 3", 2: "PostScript 2", 1: "PostScript 1" };
    shared.push(psLabel[a.psLevel] ?? "PostScript");
  }

  if (a.pclLevel != null && b.pclLevel != null && a.pclLevel === b.pclLevel) {
    const pclLabel: Record<number, string> = { 6: "PCL 6 / PCL XL", 5: "PCL 5e", 4: "PCL 4", 3: "PCL 3" };
    shared.push(pclLabel[a.pclLevel] ?? "PCL");
  }

  const aTier = resolutionTier(a.maxDpi);
  const bTier = resolutionTier(b.maxDpi);
  if (aTier != null && aTier === bTier) {
    shared.push(`Similar resolution (${aTier})`);
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

// A handful of upstream printer ids differ only by letter case. On a
// case-insensitive filesystem (Windows, and macOS by default) the later shard
// overwrites the earlier one, so those printers would show the wrong
// recommendations locally. CI builds on Linux, where every id gets its own
// file, so this is a local-development caveat rather than a production bug.
function warnOnCaseInsensitiveCollisions(printerIds: string[]): void {
  const seen = new Map<string, string>();
  const collisions: Array<[string, string]> = [];

  for (const id of printerIds) {
    const key = id.toLowerCase();
    const previous = seen.get(key);

    if (previous) {
      collisions.push([previous, id]);
    } else {
      seen.set(key, id);
    }
  }

  if (collisions.length === 0) {
    return;
  }

  const written = fs.readdirSync(RECOMMENDATIONS_DIR).length;

  if (written === printerIds.length) {
    return;
  }

  console.warn(
    `\n! ${collisions.length} printer id(s) differ only by case and collapsed on this filesystem:`,
  );

  for (const [a, b] of collisions) {
    console.warn(`    ${a}  <->  ${b}`);
  }

  console.warn(
    `  ${written}/${printerIds.length} shards written. Linux/CI builds are unaffected.`,
  );
}

function loadFeatureMatrix(): FeatureMatrix {
  if (!fs.existsSync(MATRIX_FILE)) {
    throw new Error(
      `Missing feature matrix: ${MATRIX_FILE}\n` +
        `Run: yarn foomatic:data:vectorize`,
    );
  }

  return JSON.parse(fs.readFileSync(MATRIX_FILE, "utf-8"));
}

function loadPrinters(): Printer[] {
  if (!fs.existsSync(PRINTERS_FILE)) {
    throw new Error(
      `Missing printers.json: ${PRINTERS_FILE}\n` +
        `Run: yarn foomatic:generate:xml && yarn foomatic:data:combine`,
    );
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

    const topK: ScoredCandidate[] = [];

    for (let j = 0; j < matrixData.printerCount; j++) {
      if (i === j) {
        continue;
      }

      const vecB = matrixData.matrix[j];
      const magB = magnitudes[j];

      const cosine = cosineSimilarity(vecA, vecB, magA, magB);

      if (cosine < MIN_SIMILARITY_SCORE) {
        continue;
      }

      const targetPrinter = printerMap.get(matrixData.ids[i]);
      const candidatePrinter = printerMap.get(matrixData.ids[j]);

      const penalty =
        targetPrinter && candidatePrinter
          ? conflictPenalty(targetPrinter, candidatePrinter)
          : 1;

      const score =
        cosine * evidenceWeight(overlapCount(vecA, vecB)) * penalty;

      if (score < MIN_SIMILARITY_SCORE) {
        continue;
      }

      insertTopK(
        topK,
        {
          index: j,
          score,
        },
        TOP_K,
      );
    }

    topK.sort(scoreThenIdComparator((index) => matrixData.ids[index]));

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

  fs.mkdirSync(RECOMMENDATIONS_DIR, { recursive: true });

  // Each per-printer shard embeds the handful of display fields the UI needs
  // for its cards, so the printer page renders recommendations without also
  // downloading the much larger printersMap.json.
  for (const [printerId, recs] of Object.entries(output.recommendations)) {
    const enriched = recs.map((rec) => {
      const candidate = printerMap.get(rec.id);

      // Status and type defaults mirror split-printers.ts. A driver count is
      // deliberately not carried: the number of entries is not a measure of
      // support quality, so the cards cannot present it as one.
      return {
        ...rec,
        manufacturer: candidate?.manufacturer,
        model: candidate?.model,
        status: candidate?.status || "Unknown",
        type: candidate?.type || "unknown",
      };
    });

    fs.writeFileSync(
      path.join(RECOMMENDATIONS_DIR, `${printerId}.json`),
      JSON.stringify(enriched),
    );
  }

  warnOnCaseInsensitiveCollisions(Object.keys(output.recommendations));

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
