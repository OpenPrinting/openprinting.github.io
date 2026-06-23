import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Printer } from "../../lib/foomatic/types";

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
}

interface FeatureMatrix {
  printerCount: number;
  featureCount: number;
  featureNames: string[];
  vocab: Vocabulary;
  ids: string[];
  matrix: number[][];
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

const RECOMMENDED_DRIVER_WEIGHT = 3.0;
const SUPPORTED_DRIVER_WEIGHT = 1.0;
const TYPE_WEIGHT = 0.5;
const FUNCTIONALITY_WEIGHT = 0.25;
const COLOR_WEIGHT = 1.0;
const COMMANDSET_WEIGHT = 1.5;
const MIN_COMMANDSET_FREQUENCY = 20;

function trim(value: string | undefined): string {
  return (value ?? "").trim();
}

function encodeFunctionality(value: string | undefined): number {
  switch ((value ?? "").toUpperCase()) {
    case "A":
      return 1.0;
    case "B":
      return 0.66;
    case "C":
      return 0.33;
    default:
      return 0.0;
  }
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

function getRecommendedDriverFamily(printer: Printer): string | null {
  const driver = trim(printer.recommended_driver);

  if (!driver) {
    return null;
  }

  return normalizeDriverFamily(driver);
}

function buildVocabularies(printers: Printer[]): Vocabulary {
  const recommendedDrivers = new Set<string>();

  const supportedDrivers = new Set<string>();

  const types = new Set<string>();

  const commandsetFreq = new Map<string, number>();

  for (const printer of printers) {
    const recommended = getRecommendedDriverFamily(printer);

    if (recommended) {
      recommendedDrivers.add(recommended);
    }

    for (const family of getSupportedDriverFamilies(printer)) {
      supportedDrivers.add(family);
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

  return {
    recommendedDrivers: [...recommendedDrivers].sort(),
    supportedDrivers: [...supportedDrivers].sort(),
    types: [...types].sort(),
    commandsets,
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
  ];
}

function encodePrinter(printer: Printer, vocab: Vocabulary): number[] {
  const recommended = getRecommendedDriverFamily(printer);

  const supported = new Set(getSupportedDriverFamilies(printer));

  const type = trim(printer.type);

  return [
    ...vocab.recommendedDrivers.map((driver) =>
      driver === recommended ? RECOMMENDED_DRIVER_WEIGHT : 0,
    ),

    ...vocab.supportedDrivers.map((driver) =>
      supported.has(driver) ? SUPPORTED_DRIVER_WEIGHT : 0,
    ),

    ...vocab.types.map((t) => (t === type ? TYPE_WEIGHT : 0)),

    encodeFunctionality(printer.functionality) * FUNCTIONALITY_WEIGHT,

    printer.color === true ? COLOR_WEIGHT : 0,

    ...vocab.commandsets.map((cs) =>
      (printer.commandsetTokens ?? []).includes(cs) ? COMMANDSET_WEIGHT : 0,
    ),
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
