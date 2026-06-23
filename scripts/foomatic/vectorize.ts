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
  manufacturers: string[];
  types: string[];
  connectivity: string[];
}

interface FeatureMatrix {
  printerCount: number;
  featureCount: number;
  featureNames: string[];
  vocab: Vocabulary;
  ids: string[];
  matrix: number[][];
}

function encodeBool(value: boolean | string | undefined): number {
  if (value === true) return 1.0;
  if (value === false) return 0.0;

  // Unknown values stay neutral instead of biasing similarity.
  return 0.5;
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

function trim(value: string | undefined): string {
  return (value ?? "").trim();
}

function buildVocabularies(printers: Printer[]): Vocabulary {
  const manufacturers = new Set<string>();
  const types = new Set<string>();
  const connectivityOpts = new Set<string>();

  for (const p of printers) {
    const make = trim(p.manufacturer);
    if (make) manufacturers.add(make);

    const type = trim(p.type);
    if (type && type !== "unknown") types.add(type);

    for (const c of p.connectivity ?? []) {
      const conn = trim(c);
      if (conn) connectivityOpts.add(conn);
    }
  }

  return {
    manufacturers: [...manufacturers].sort(),
    types: [...types].sort(),
    connectivity: [...connectivityOpts].sort(),
  };
}

function buildFeatureNames(vocab: Vocabulary): string[] {
  return [
    ...vocab.manufacturers.map((m) => `manufacturer:${m}`),
    ...vocab.types.map((t) => `type:${t}`),
    ...vocab.connectivity.map((c) => `connectivity:${c}`),
    "color",
    "duplex",
    "functionality",
  ];
}

/*
 * Feature extraction intentionally stays unweighted.
 * Similarity weighting belongs in compute-similarity.ts.
 */
function encodePrinter(printer: Printer, vocab: Vocabulary): number[] {
  const make = trim(printer.manufacturer);
  const type = trim(printer.type);
  const conns = new Set((printer.connectivity ?? []).map(trim));

  return [
    ...vocab.manufacturers.map((m) => (m === make ? 1.0 : 0.0)),
    ...vocab.types.map((t) => (t === type ? 1.0 : 0.0)),
    ...vocab.connectivity.map((c) => (conns.has(c) ? 1.0 : 0.0)),
    encodeBool(printer.color),
    encodeBool(printer.duplex),
    encodeFunctionality(printer.functionality),
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

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✓ Feature matrix → ${OUTPUT_FILE}`);
}

main();
