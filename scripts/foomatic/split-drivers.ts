// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..", "..");

const RAW_DRIVERS_DIR = path.join(ROOT_DIR, "public", "foomatic-db", "driver");
const PRINTERS_JSON = path.join(ROOT_DIR, "public", "foomatic-db", "printers.json");
const OUTPUT_DRIVERS_DIR = path.join(ROOT_DIR, "public", "foomatic-db", "drivers");
const OUTPUT_FULL = path.join(ROOT_DIR, "public", "foomatic-db", "drivers.json");
const OUTPUT_MAP = path.join(ROOT_DIR, "public", "foomatic-db", "driversMap.json");

function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function getText(value) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const text = value.map(getText).filter(Boolean).join(", ").trim();
    return text || undefined;
  }
  if (typeof value === "object") {
    if (typeof value.en === "string") return value.en.trim() || undefined;
    if (typeof value["#text"] === "string") return value["#text"].trim() || undefined;
    for (const key of Object.keys(value)) {
      const nested = getText(value[key]);
      if (nested) return nested;
    }
  }
  return undefined;
}

function stripDriverPrefix(id) {
  return String(id || "").replace(/^driver\//, "");
}

function getDriverType(execution) {
  if (!execution || typeof execution !== "object") return undefined;
  if ("cups" in execution) return "CUPS Raster";
  if ("filter" in execution) return "Ghostscript with filter";
  if ("uniprint" in execution) return "Ghostscript Uniprint";
  if ("ijs" in execution) return "IJS";
  if ("postscript" in execution) return "PostScript";
  if ("pdf" in execution || "prototype_pdf" in execution) return "PDF";
  if ("ghostscript" in execution || "driverPrototype" in execution)
    return "Ghostscript built-in";
  return undefined;
}

function getFunctionality(driver) {
  const f = driver.functionality;
  if (!f || typeof f !== "object") return null;

  const num = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  };

  let color;
  if ("color" in f) color = true;
  else if ("monochrome" in f) color = false;

  let maxResolution;
  const x = num(f.maxresx);
  const y = num(f.maxresy);
  if (x && y) maxResolution = `${x}x${y}dpi`;
  else if (x) maxResolution = `${x}dpi`;

  const result = {
    color,
    maxResolution,
    text: num(f.text),
    lineart: num(f.lineart),
    graphics: num(f.graphics),
    photo: num(f.photo),
    speed: num(f.speed),
  };

  const hasAny = Object.values(result).some((v) => v !== undefined);
  return hasAny ? result : null;
}

const FREE_LICENSE = /\b(gpl|lgpl|agpl|bsd|mit|artistic|mpl|apache|zlib|public domain|free)\b/i;

function getFreeSoftware(license, manufacturerSupplied) {
  if (license && FREE_LICENSE.test(license)) return true;
  if (license) return false;
  if (!manufacturerSupplied) return true;
  return undefined;
}

function getSupportContacts(driver) {
  const node = driver.supportcontacts || driver.supportContacts;
  const contacts = node?.supportcontact || node?.contact || node;
  return toArray(contacts)
    .map((contact) => {
      if (typeof contact === "string") return { text: contact };
      if (!contact || typeof contact !== "object") return null;
      return {
        text: getText(contact["#text"] || contact.description || contact.name || contact),
        url: getText(contact["@url"] || contact.url),
        level: getText(contact["@level"] || contact.level),
      };
    })
    .filter(Boolean);
}

function buildPrinterIndex() {
  const data = JSON.parse(fs.readFileSync(PRINTERS_JSON, "utf-8"));
  const driverToPrinters = new Map();

  for (const printer of data.printers) {
    const printerInfo = {
      id: printer.id,
      manufacturer: printer.manufacturer,
      model: printer.model,
      status: printer.status,
    };
    const driverIds = new Set();
    for (const driver of printer.drivers || []) {
      if (driver?.id) driverIds.add(stripDriverPrefix(driver.id));
    }
    if (printer.recommended_driver) {
      driverIds.add(stripDriverPrefix(printer.recommended_driver));
    }
    for (const driverId of driverIds) {
      if (!driverToPrinters.has(driverId)) driverToPrinters.set(driverId, []);
      driverToPrinters.get(driverId).push({
        ...printerInfo,
        recommended: stripDriverPrefix(printer.recommended_driver) === driverId,
      });
    }
  }

  for (const list of driverToPrinters.values()) {
    list.sort((a, b) => {
      const m = String(a.manufacturer || "").localeCompare(String(b.manufacturer || ""));
      return m !== 0 ? m : String(a.model || "").localeCompare(String(b.model || ""));
    });
  }

  return driverToPrinters;
}

function buildDrivers() {
  const driverToPrinters = buildPrinterIndex();
  const records = [];

  const seen = new Set();

  for (const file of fs.readdirSync(RAW_DRIVERS_DIR)) {
    if (!file.endsWith(".json")) continue;
    let raw;
    try {
      raw = JSON.parse(fs.readFileSync(path.join(RAW_DRIVERS_DIR, file), "utf-8"));
    } catch (error) {
      console.error(`Skipping unreadable driver ${file}: ${error.message}`);
      continue;
    }
    const driver = raw.driver;
    if (!driver || !driver["@id"]) continue;

    const id = stripDriverPrefix(driver["@id"]);
    seen.add(id);
    const printers = driverToPrinters.get(id) || [];
    const license = getText(driver.license) || null;
    const manufacturerSupplied = driver.manufacturersupplied !== undefined;
    const thirdParty = driver.thirdpartysupplied !== undefined;

    records.push({
      id,
      name: getText(driver.name) || id,
      url: getText(driver.url) || null,
      supplier: getText(driver.supplier) || null,
      license,
      freeSoftware: getFreeSoftware(license, manufacturerSupplied),
      manufacturerSupplied,
      thirdParty,
      shortDescription: getText(driver.shortdescription) || null,
      comments: getText(driver.comments) || "",
      type: getDriverType(driver.execution) || null,
      functionality: getFunctionality(driver),
      obsolete: driver.obsolete !== undefined,
      replacedBy: driver.obsolete?.["@replace"]
        ? stripDriverPrefix(driver.obsolete["@replace"])
        : null,
      supportContacts: getSupportContacts(driver),
      printers,
      printerCount: printers.length,
    });
  }

  for (const [id, printers] of driverToPrinters.entries()) {
    if (seen.has(id)) continue;
    records.push({
      id,
      name: id,
      url: null,
      supplier: null,
      license: null,
      freeSoftware: undefined,
      manufacturerSupplied: false,
      thirdParty: false,
      shortDescription: null,
      comments: "",
      type: null,
      functionality: null,
      obsolete: false,
      replacedBy: null,
      supportContacts: [],
      printers,
      printerCount: printers.length,
    });
  }

  records.sort((a, b) => a.name.localeCompare(b.name));
  return records;
}

function main() {
  if (!fs.existsSync(PRINTERS_JSON)) {
    console.error(`Missing ${PRINTERS_JSON}; run combine-data first.`);
    process.exit(1);
  }

  const drivers = buildDrivers();
  fs.mkdirSync(OUTPUT_DRIVERS_DIR, { recursive: true });

  fs.writeFileSync(OUTPUT_FULL, JSON.stringify({ drivers }, null, 2));

  const map = {
    drivers: drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      supplier: driver.supplier,
      license: driver.license,
      type: driver.type,
      obsolete: driver.obsolete,
      shortDescription: driver.shortDescription,
      printerCount: driver.printerCount,
    })),
  };
  fs.writeFileSync(OUTPUT_MAP, JSON.stringify(map, null, 2));

  for (const driver of drivers) {
    fs.writeFileSync(
      path.join(OUTPUT_DRIVERS_DIR, `${driver.id}.json`),
      JSON.stringify(driver, null, 2),
    );
  }

  console.log(`Wrote ${drivers.length} driver records`);
  console.log(`  full:  ${OUTPUT_FULL}`);
  console.log(`  map:   ${OUTPUT_MAP}`);
  console.log(`  split: ${OUTPUT_DRIVERS_DIR}/<id>.json`);
}

main();
