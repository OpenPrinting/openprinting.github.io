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
const DRIVERS_INPUT_FILE = path.join(
  process.cwd(),
  "public",
  "foomatic-db",
  "driversMap.json",
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

interface DriverMapEntry {
  id: string;
  name: string;
  supplier?: string | null;
  license?: string | null;
  type?: string | null;
  obsolete?: boolean;
  shortDescription?: string | null;
  printerCount?: number;
}

interface DriverMapFile {
  drivers: DriverMapEntry[];
}

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toPrinterUrl(id: string): string {
  const normalizedId = id.replace(/^printer\//, "");
  return `/foomatic/printer/${normalizedId}`;
}

function toDriverUrl(id: string): string {
  const normalizedId = id.replace(/^driver\//, "");
  return `/foomatic/driver/${normalizedId}`;
}

function createDriverSnippet(driver: DriverMapEntry): string {
  const parts: string[] = [];
  const printerCount = Number.isFinite(driver.printerCount)
    ? Number(driver.printerCount)
    : 0;

  parts.push("Driver");
  if (driver.type) parts.push(safeString(driver.type));
  if (driver.license) parts.push(safeString(driver.license));
  if (driver.obsolete) parts.push("obsolete");
  parts.push(`${printerCount} printer${printerCount === 1 ? "" : "s"} supported`);

  return parts.filter(Boolean).join(" • ");
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

  const printerDocuments: FoomaticSearchDocument[] = printerMap.printers.map(
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

  let driverDocuments: FoomaticSearchDocument[] = [];
  try {
    const driverRaw = await fs.readFile(DRIVERS_INPUT_FILE, "utf8");
    const driverMap = JSON.parse(driverRaw) as DriverMapFile;
    driverDocuments = driverMap.drivers.map((driver) => ({
      id: `foomatic:driver/${driver.id}`,
      source: "foomatic",
      type: "driver",
      title: driver.name,
      url: toDriverUrl(driver.id),
      headings: [],
      tags: [],
      snippet: createDriverSnippet(driver),
      content: [
        safeString(driver.name),
        safeString(driver.supplier),
        safeString(driver.license),
        safeString(driver.type),
        safeString(driver.shortDescription),
      ]
        .filter(Boolean)
        .join(" "),
      supplier: safeString(driver.supplier) || undefined,
      printerCount: Number.isFinite(driver.printerCount)
        ? Number(driver.printerCount)
        : 0,
    }));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    console.warn("driversMap.json not found; building index without drivers.");
  }

  const documents = [...printerDocuments, ...driverDocuments];

  const index: SearchIndex<FoomaticSearchDocument> = {
    version: "1.0",
    documents,
    metadata: {
      documentCount: documents.length,
      contentTypes: driverDocuments.length ? ["printer", "driver"] : ["printer"],
    },
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), "utf8");

  console.log(
    `Foomatic search index generated with ${documents.length} documents ` +
      `(${printerDocuments.length} printers, ${driverDocuments.length} drivers)`,
  );
}

buildFoomaticIndex().catch((error) => {
  console.error("Failed to build Foomatic search index:", error);
  process.exit(1);
});
