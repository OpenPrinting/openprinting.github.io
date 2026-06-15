// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..", "..");
const FDB_DIR = path.join(ROOT_DIR, "public", "foomatic-db");
const OUT_DIR = path.join(ROOT_DIR, "public", "query");

function readJson(file) {
  const full = path.join(FDB_DIR, file);
  if (!fs.existsSync(full)) return null;
  return JSON.parse(fs.readFileSync(full, "utf8"));
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sanitizeSegment(value) {
  return String(value).replace(/[\\/]+/g, "_");
}

function write(relPath, content) {
  const full = path.join(OUT_DIR, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function normalizePrinterId(id) {
  return String(id).replace(/^printer\//, "");
}

function normalizeDriverId(id) {
  return String(id).replace(/^driver\//, "");
}

function main() {
  const printersData = readJson("printers.json");
  const driversData = readJson("driversMap.json");

  if (!printersData || !driversData) {
    console.warn("Foomatic DB JSON not found; skipping query API generation.");
    return;
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const printerList = Array.isArray(printersData)
    ? printersData
    : printersData.printers ?? Object.values(printersData);
  const printers = [...printerList].sort((a, b) => a.id.localeCompare(b.id));
  const drivers = [...driversData.drivers].sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  const makes = Array.from(
    new Set(printers.map((p) => p.manufacturer).filter(Boolean))
  ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  write("makes.txt", makes.join("\n") + "\n");
  write(
    "makes.xml",
    "<makes>\n" +
      makes.map((m) => `  <make>${escapeXml(m)}</make>`).join("\n") +
      "\n</makes>\n"
  );

  function printersText(list) {
    return list.map((p) => `printer/${normalizePrinterId(p.id)}`).join("\n") + "\n";
  }
  function printersXml(list) {
    return (
      "<printers>\n" +
      list
        .map(
          (p) =>
            `  <printer id="printer/${escapeXml(normalizePrinterId(p.id))}">\n` +
            `    <make>${escapeXml(p.manufacturer)}</make>\n` +
            `    <model>${escapeXml(p.model)}</model>\n` +
            `  </printer>`
        )
        .join("\n") +
      "\n</printers>\n"
    );
  }

  write("printers.txt", printersText(printers));
  write("printers.xml", printersXml(printers));

  const byMake = new Map();
  for (const p of printers) {
    if (!p.manufacturer) continue;
    if (!byMake.has(p.manufacturer)) byMake.set(p.manufacturer, []);
    byMake.get(p.manufacturer).push(p);
  }
  for (const [make, list] of byMake) {
    write(path.join("printers", `${sanitizeSegment(make)}.txt`), printersText(list));
    write(path.join("printers", `${sanitizeSegment(make)}.xml`), printersXml(list));
  }

  function driversText(list) {
    return list.map((d) => `driver/${normalizeDriverId(d.id)}`).join("\n") + "\n";
  }
  function driversXml(list, printerId) {
    const header = printerId
      ? `<drivers printer="printer/${escapeXml(printerId)}">\n`
      : "<drivers>\n";
    return (
      header +
      list
        .map(
          (d) =>
            `  <driver id="driver/${escapeXml(normalizeDriverId(d.id))}">\n` +
            `    <name>${escapeXml(d.name ?? normalizeDriverId(d.id))}</name>\n` +
            (d.recommended ? "    <recommended />\n" : "") +
            `  </driver>`
        )
        .join("\n") +
      "\n</drivers>\n"
    );
  }

  write("drivers.txt", driversText(drivers));
  write("drivers.xml", driversXml(drivers));

  let perPrinterDriverFiles = 0;
  for (const p of printers) {
    const id = normalizePrinterId(p.id);
    const list = (p.drivers ?? [])
      .map((d) => ({
        id: normalizeDriverId(d.id),
        name: d.name ?? normalizeDriverId(d.id),
        recommended:
          normalizeDriverId(d.id) ===
          normalizeDriverId(p.recommended_driver ?? ""),
      }))
      .sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
    write(path.join("drivers", `${sanitizeSegment(id)}.txt`), driversText(list));
    write(path.join("drivers", `${sanitizeSegment(id)}.xml`), driversXml(list, id));
    perPrinterDriverFiles += 1;
  }

  const index = {
    printers: printers.map((p) => ({
      id: normalizePrinterId(p.id),
      make: p.manufacturer ?? "",
      model: p.model ?? "",
      commandsets: p.commandsets ?? [],
    })),
  };
  write("index.json", JSON.stringify(index));

  console.log(
    `Generated static query API: ${makes.length} makes, ${printers.length} printers ` +
      `(+${byMake.size} by-make lists), ${drivers.length} drivers, ` +
      `${perPrinterDriverFiles} per-printer driver lists.`
  );
}

main();
