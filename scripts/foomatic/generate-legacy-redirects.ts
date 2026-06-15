// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { printerMakeSegment } from "../../lib/foomatic/routes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..", "..");

const OUT_DIR = path.join(ROOT_DIR, "out");
const FDB_DIR = path.join(ROOT_DIR, "public", "foomatic-db");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function redirectHtml(target: string): string {
  const escaped = target.replace(/"/g, "&quot;");
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${escaped}" />
    <link rel="canonical" href="${escaped}" />
    <meta name="robots" content="noindex, follow" />
    <title>Redirecting…</title>
    <script>window.location.replace("${escaped}");</script>
  </head>
  <body>
    <p>This page has moved. If you are not redirected automatically, follow
      <a href="${escaped}">this link</a>.</p>
  </body>
</html>
`;
}

function writeStub(relativePath: string, target: string) {
  const dir = path.join(OUT_DIR, relativePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), redirectHtml(target));
}

function readMap(file: string, key: string): { id: string }[] {
  const full = path.join(FDB_DIR, file);
  if (!fs.existsSync(full)) return [];
  const data = JSON.parse(fs.readFileSync(full, "utf8"));
  return data[key] ?? [];
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.warn(`Export directory ${OUT_DIR} not found; skipping legacy redirects.`);
    return;
  }

  let printerCount = 0;
  const manufacturers = new Set<string>();
  for (const printer of readMap("printersMap.json", "printers")) {
    const id = printer.id.replace(/^printer\//, "");
    const make = printerMakeSegment(id, printer.manufacturer ?? "");
    const target = `${BASE_PATH}/foomatic/printer/${make}/${id}/`;
    writeStub(path.join("printer", make, id), target);
    writeStub(path.join("printer", "show", id), target);
    if (printer.manufacturer) manufacturers.add(printer.manufacturer);
    printerCount += 1;
  }

  let manufacturerCount = 0;
  for (const manufacturer of manufacturers) {
    const target = `${BASE_PATH}/foomatic/printers/?manufacturer=${encodeURIComponent(manufacturer)}`;
    writeStub(path.join("printers", "manufacturer", manufacturer), target);
    manufacturerCount += 1;
  }

  let driverCount = 0;
  for (const driver of readMap("driversMap.json", "drivers")) {
    const id = driver.id.replace(/^driver\//, "");
    const target = `${BASE_PATH}/foomatic/driver/${id}/`;
    writeStub(path.join("driver", id), target);
    writeStub(path.join("driver", id, "license"), `${BASE_PATH}/foomatic/driver/${id}/#license`);
    driverCount += 1;
  }

  console.log(
    `Wrote legacy redirect stubs: ${printerCount} printers ` +
      `(/printer/<make>/<id> and /printer/show/<id>), ` +
      `${manufacturerCount} manufacturers (/printers/manufacturer/<make>), ` +
      `${driverCount} drivers (/driver/<name> and /driver/<name>/license)`,
  );
}

main();
