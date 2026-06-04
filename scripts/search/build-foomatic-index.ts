import fs from "fs/promises";
import path from "path";
import {
  type FoomaticSearchDocument,
  type SearchIndex,
} from "../../lib/search/types.ts";

const INPUT_FILE = path.join(
  process.cwd(),
  "public",
  "foomatic-db",
  "printersMap.json",
);
const OUTPUT_DIR = path.join(process.cwd(), "public", "search");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "foomatic-index.json");

interface PrinterMapEntry {
  id: string;
  manufacturer: string;
  model: string;
  type?: string;
  status?: string;
  functionality?: string;
  driverCount?: number;
}

interface PrinterMapFile {
  printers: PrinterMapEntry[];
}

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toPrinterUrl(id: string): string {
  const normalizedId = id.replace(/^printer\//, "");
  return `/foomatic/printer/${normalizedId}`;
}

function createSnippet(printer: PrinterMapEntry): string {
  const parts: string[] = [];
  const status = safeString(printer.status);
  const type = safeString(printer.type);
  const driverCount = Number.isFinite(printer.driverCount)
    ? Number(printer.driverCount)
    : 0;

  if (status && status.toLowerCase() !== "unknown") {
    parts.push(`${status} support`);
  }

  if (type && type.toLowerCase() !== "unknown") {
    parts.push(type);
  }

  parts.push(
    `${driverCount} driver${driverCount === 1 ? "" : "s"} listed`,
  );

  return parts.join(" • ");
}

async function buildFoomaticIndex() {
  console.log("Building Foomatic search index...");

  const raw = await fs.readFile(INPUT_FILE, "utf8");
  const printerMap = JSON.parse(raw) as PrinterMapFile;

  const documents: FoomaticSearchDocument[] = printerMap.printers.map(
    (printer) => ({
      id: `foomatic:${printer.id}`,
      source: "foomatic",
      type: "printer",
      title: `${safeString(printer.manufacturer)} ${safeString(printer.model)}`.trim(),
      url: toPrinterUrl(printer.id),
      headings: [],
      tags: [],
      snippet: createSnippet(printer),
      content: [
        safeString(printer.manufacturer),
        safeString(printer.model),
        safeString(printer.type),
        safeString(printer.status),
        safeString(printer.functionality),
      ]
        .filter(Boolean)
        .join(" "),
      manufacturer: safeString(printer.manufacturer),
      model: safeString(printer.model),
      status: safeString(printer.status) || undefined,
      driverCount: Number.isFinite(printer.driverCount)
        ? Number(printer.driverCount)
        : 0,
    }),
  );

  const index: SearchIndex<FoomaticSearchDocument> = {
    version: "1.0",
    documents,
    metadata: {
      documentCount: documents.length,
      contentTypes: ["printer"],
    },
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), "utf8");

  console.log(`Foomatic search index generated with ${documents.length} documents`);
}

buildFoomaticIndex().catch((error) => {
  console.error("Failed to build Foomatic search index:", error);
  process.exit(1);
});
