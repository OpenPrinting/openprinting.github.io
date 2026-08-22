import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Printer } from "../../lib/foomatic/types";
import {
  trim,
  getRecommendedDriverFamily,
  getSupportedDriverFamilies,
} from "../../lib/foomatic/driver-family";
import { encodeFunctionality } from "../../lib/foomatic/printer-attributes";

const ROOT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const INPUT_FILE = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "printers.json",
);

const OUTPUT_FILE = path.join(
  ROOT_DIR,
  "public",
  "foomatic-db",
  "feature-matrix.json",
);

interface Vocabulary {
  recommendedDrivers: string[];
  supportedDrivers: string[];
  types: string[];
  commandsets: string[];
  // Inverse-document-frequency scale per vocabulary term, normalized to mean 1
  // so overall feature-group balance is preserved while rare terms outweigh
  // ubiquitous ones. Sharing "postscript" (1746 printers) is weak evidence;
  // sharing "necp6" (8 printers) is strong evidence.
  idf: {
    recommendedDrivers: number[];
    supportedDrivers: number[];
    commandsets: number[];
  };
}

// idf(t) = ln(1 + N / df(t)), rescaled so the mean across the vocabulary is 1.
function idfScale(terms: string[], df: Map<string, number>, total: number): number[] {
  const raw = terms.map((t) => Math.log(1 + total / Math.max(1, df.get(t) ?? 1)));
  const mean = raw.reduce((a, b) => a + b, 0) / (raw.length || 1);
  return mean > 0 ? raw.map((v) => v / mean) : raw.map(() => 1);
}

interface FeatureMatrix {
  printerCount: number;
  featureCount: number;
  featureNames: string[];
  vocab: Vocabulary;
  ids: string[];
  matrix: number[][];
}

const RECOMMENDED_DRIVER_WEIGHT = 3.0;
const SUPPORTED_DRIVER_WEIGHT = 1.0;
const TYPE_WEIGHT = 0.5;
const FUNCTIONALITY_WEIGHT = 0.25;
const COLOR_WEIGHT = 1.0;
const COMMANDSET_WEIGHT = 1.5;
const MIN_COMMANDSET_FREQUENCY = 20;
const LANG_WEIGHT = 1.0;
const LANG_LEVEL_WEIGHT = 0.5;
const RESOLUTION_WEIGHT = 0.75;

function buildVocabularies(printers: Printer[]): Vocabulary {
  const recommendedDrivers = new Set<string>();

  const supportedDrivers = new Set<string>();

  const types = new Set<string>();

  const commandsetFreq = new Map<string, number>();

  const recommendedFreq = new Map<string, number>();

  const supportedFreq = new Map<string, number>();

  for (const printer of printers) {
    const recommended = getRecommendedDriverFamily(printer);

    if (recommended) {
      recommendedDrivers.add(recommended);
      recommendedFreq.set(recommended, (recommendedFreq.get(recommended) ?? 0) + 1);
    }

    for (const family of getSupportedDriverFamilies(printer)) {
      supportedDrivers.add(family);
      supportedFreq.set(family, (supportedFreq.get(family) ?? 0) + 1);
    }

    const type = trim(printer.type);

    if (type && type !== "unknown") {
      types.add(type);
    }

    for (const cs of printer.commandsetTokens ?? []) {
      commandsetFreq.set(cs, (commandsetFreq.get(cs) ?? 0) + 1);
    }
  }

  const commandsets = [...commandsetFreq.entries()]
    .filter(([, count]) => count >= MIN_COMMANDSET_FREQUENCY)
    .map(([cs]) => cs)
    .sort();

  const recommendedList = [...recommendedDrivers].sort();
  const supportedList = [...supportedDrivers].sort();
  const total = printers.length;

  return {
    recommendedDrivers: recommendedList,
    supportedDrivers: supportedList,
    types: [...types].sort(),
    commandsets,
    idf: {
      recommendedDrivers: idfScale(recommendedList, recommendedFreq, total),
      supportedDrivers: idfScale(supportedList, supportedFreq, total),
      commandsets: idfScale(commandsets, commandsetFreq, total),
    },
  };
}

function buildFeatureNames(vocab: Vocabulary): string[] {
  return [
    ...vocab.recommendedDrivers.map((driver) => `recommended_driver:${driver}`),

    ...vocab.supportedDrivers.map((driver) => `supported_driver:${driver}`),

    ...vocab.types.map((type) => `type:${type}`),

    "functionality",

    "color",

    ...vocab.commandsets.map((cs) => `commandset:${cs}`),

    "lang:postscript",
    "lang:postscript_3",
    "lang:pcl",
    "lang:pcl_6",

    "res:300",
    "res:600",
    "res:1200",
    "res:2400plus",
  ];
}

function encodePrinter(printer: Printer, vocab: Vocabulary): number[] {
  const recommended = getRecommendedDriverFamily(printer);

  const supported = new Set(getSupportedDriverFamilies(printer));

  const type = trim(printer.type);

  return [
    ...vocab.recommendedDrivers.map((driver, i) =>
      driver === recommended
        ? RECOMMENDED_DRIVER_WEIGHT * vocab.idf.recommendedDrivers[i]
        : 0,
    ),

    ...vocab.supportedDrivers.map((driver, i) =>
      supported.has(driver)
        ? SUPPORTED_DRIVER_WEIGHT * vocab.idf.supportedDrivers[i]
        : 0,
    ),

    ...vocab.types.map((t) => (t === type ? TYPE_WEIGHT : 0)),

    encodeFunctionality(printer.functionality) * FUNCTIONALITY_WEIGHT,

    printer.color === true ? COLOR_WEIGHT : 0,

    ...vocab.commandsets.map((cs, i) =>
      (printer.commandsetTokens ?? []).includes(cs)
        ? COMMANDSET_WEIGHT * vocab.idf.commandsets[i]
        : 0,
    ),

    printer.psLevel != null ? LANG_WEIGHT : 0,
    printer.psLevel === 3 ? LANG_LEVEL_WEIGHT : 0,
    printer.pclLevel != null ? LANG_WEIGHT : 0,
    printer.pclLevel === 6 ? LANG_LEVEL_WEIGHT : 0,

    printer.maxDpi != null && printer.maxDpi <= 300 ? RESOLUTION_WEIGHT : 0,
    printer.maxDpi != null && printer.maxDpi > 300 && printer.maxDpi <= 600 ? RESOLUTION_WEIGHT : 0,
    printer.maxDpi != null && printer.maxDpi > 600 && printer.maxDpi <= 1200 ? RESOLUTION_WEIGHT : 0,
    printer.maxDpi != null && printer.maxDpi > 1200 ? RESOLUTION_WEIGHT : 0,
  ];
}

function loadAndValidate(): Printer[] {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(
      `Input not found: ${INPUT_FILE}\n` +
        `Run: yarn foomatic:generate:xml && yarn foomatic:data:combine`,
    );
  }

  const raw: unknown = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));

  if (
    typeof raw !== "object" ||
    raw === null ||
    !Array.isArray((raw as Record<string, unknown>).printers)
  ) {
    throw new Error("Invalid printers.json: expected { printers: Printer[] }");
  }

  const printers = (raw as { printers: Printer[] }).printers;

  if (printers.length === 0) {
    throw new Error("printers.json is empty. Re-run the pipeline.");
  }

  return printers;
}

function main(): void {
  console.log("Loading printers.json...");

  const printers = loadAndValidate();

  console.log(`Loaded ${printers.length} printers`);

  const vocab = buildVocabularies(printers);

  const featureNames = buildFeatureNames(vocab);

  const ids: string[] = [];

  const matrix: number[][] = [];

  for (const printer of printers) {
    ids.push(printer.id);

    matrix.push(encodePrinter(printer, vocab));
  }

  const output: FeatureMatrix = {
    printerCount: printers.length,
    featureCount: featureNames.length,
    featureNames,
    vocab,
    ids,
    matrix,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), {
    recursive: true,
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✓ Feature matrix generated: ${OUTPUT_FILE}`);

  console.log(`Features: ${output.featureCount}`);

  console.log(`Recommended drivers: ${vocab.recommendedDrivers.length}`);

  console.log(`Supported drivers: ${vocab.supportedDrivers.length}`);

  console.log(`Printer types: ${vocab.types.length}`);

  console.log(`Commandset tokens: ${vocab.commandsets.length}`);
}

main();
