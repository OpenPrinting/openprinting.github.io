// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..", "..");

const PRINTERS_DIR = path.join(ROOT_DIR, "public", "foomatic-db", "printer");
const DRIVERS_DIR = path.join(ROOT_DIR, "public", "foomatic-db", "driver");
const OUTPUT_FILE = path.join(ROOT_DIR, "public", "foomatic-db", "printers.json");
const PPD_OUTPUT_DIR = path.join(ROOT_DIR, "public", "ppds");

function toArray(value) {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getText(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const text = value.map(getText).filter(Boolean).join(", ").trim();
    return text || undefined;
  }

  if (typeof value === "object") {
    if (typeof value.en === "string") {
      return value.en.trim() || undefined;
    }

    if (typeof value["#text"] === "string") {
      return value["#text"].trim() || undefined;
    }

    for (const key of Object.keys(value)) {
      const nested = getText(value[key]);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

function getFunctionalityStatus(func) {
  if (!func || func === "?") {
    return "Unknown";
  }

  switch (func) {
    case "A":
      return "Perfect";
    case "B":
    case "C":
      return "Mostly";
    default:
      return "Unsupported";
  }
}

function getPrinterType(printer) {
  if (!printer.mechanism) {
    return "unknown";
  }

  const mechanism = printer.mechanism;

  if (mechanism.inkjet !== undefined) {
    return "inkjet";
  }

  if (mechanism.laser !== undefined) {
    return "laser";
  }

  if (mechanism.dotmatrix !== undefined) {
    return "dot-matrix";
  }

  if (mechanism.transfer === "i") {
    return "inkjet";
  }

  if (mechanism.transfer === "t") {
    return "laser";
  }

  return "unknown";
}

function parseConnectivity(printer) {
  const connectivity = [];
  if (!printer.autodetect) {
    return connectivity;
  }

  if (printer.autodetect.usb) {
    connectivity.push("USB");
  }

  if (printer.autodetect.parallel) {
    connectivity.push("Parallel");
  }

  if (printer.autodetect.serial) {
    connectivity.push("Serial");
  }

  if (printer.autodetect.network) {
    connectivity.push("Network");
  }

  return connectivity;
}

function normalizePrinterId(printerId) {
  return printerId.replace(/^printer\//, "");
}

function getDriverId(driverRef) {
  if (typeof driverRef === "string") {
    return driverRef.startsWith("driver/") ? driverRef : `driver/${driverRef}`;
  }

  if (driverRef && typeof driverRef === "object") {
    const id = driverRef.id || driverRef["@id"] || driverRef["#text"];
    if (id) {
      return String(id).startsWith("driver/") ? String(id) : `driver/${id}`;
    }
  }

  return null;
}

function getPrinterRefId(printerRef) {
  if (typeof printerRef === "string") {
    return printerRef.startsWith("printer/") ? printerRef : `printer/${printerRef}`;
  }

  if (printerRef && typeof printerRef === "object") {
    const id = printerRef.id || printerRef["@id"] || printerRef["#text"];
    if (id) {
      return String(id).startsWith("printer/") ? String(id) : `printer/${id}`;
    }
  }

  return null;
}

function getCommandsets(printer) {
  const commandsetNode = printer.commandsets || printer.commandset;
  const commandsetValues =
    commandsetNode?.commandset ??
    commandsetNode?.command ??
    commandsetNode ??
    [];

  return toArray(commandsetValues)
    .map(getText)
    .filter(Boolean);
}

function getPpdOptions(printer) {
  const ppdNode =
    printer.ppdOptions ||
    printer.ppdoptions ||
    printer.ppdentrys ||
    printer.ppdentries ||
    printer.ppdentry ||
    [];

  const optionValues =
    ppdNode.option ||
    ppdNode.ppdoption ||
    ppdNode.ppdentry ||
    ppdNode.entry ||
    ppdNode;

  return toArray(optionValues)
    .map((option) => {
      if (typeof option === "string") {
        return { text: option };
      }

      if (!option || typeof option !== "object") {
        return null;
      }

      return {
        name: getText(option.name || option["@name"]),
        text: getText(option.text || option.description || option),
        value: getText(option.value || option["@value"]),
      };
    })
    .filter(Boolean);
}

function getSupportContacts(printer) {
  const supportNode =
    printer.supportContacts ||
    printer.supportcontacts ||
    printer.contacts ||
    printer.contact;

  const contacts =
    supportNode?.contact ||
    supportNode?.supportcontact ||
    supportNode;

  return toArray(contacts)
    .map((contact) => {
      if (typeof contact === "string") {
        return { text: contact };
      }

      if (!contact || typeof contact !== "object") {
        return null;
      }

      return {
        name: getText(contact.name),
        url: getText(contact.url || contact.web || contact.homepage),
        email: getText(contact.email),
        phone: getText(contact.phone),
        text: getText(contact.description || contact.comments || contact),
      };
    })
    .filter(Boolean);
}

function getBooleanCapability(value) {
  if (value === undefined || value === null) {
    return "unknown";
  }

  if (typeof value === "boolean") {
    return value;
  }

  const text = getText(value)?.toLowerCase();
  if (!text) {
    return "unknown";
  }

  if (["1", "true", "yes", "y", "color", "duplex"].includes(text)) {
    return true;
  }

  if (["0", "false", "no", "n", "mono", "monochrome", "simplex"].includes(text)) {
    return false;
  }

  return "unknown";
}

function getColorCapability(printer) {
  return getBooleanCapability(
    printer.color ??
      printer.colors ??
      printer.colorDevice ??
      printer.capabilities?.color
  );
}

function getDuplexCapability(printer) {
  return getBooleanCapability(
    printer.duplex ??
      printer.duplexer ??
      printer.capabilities?.duplex
  );
}

function buildPpdFileName(printerId, driverId) {
  return `${normalizePrinterId(printerId)}-${driverId.replace(/^driver\//, "")}.ppd`;
}

function getGeneratedPpdPaths() {
  const ppdPaths = new Set();

  if (!fs.existsSync(PPD_OUTPUT_DIR)) {
    return ppdPaths;
  }

  for (const fileName of fs.readdirSync(PPD_OUTPUT_DIR)) {
    if (fileName.endsWith(".ppd")) {
      ppdPaths.add(`/ppds/${fileName}`);
    }
  }

  return ppdPaths;
}

function loadPrinterData() {
  const printers = new Map();
  const printerToDrivers = new Map();

  const printerFiles = fs.readdirSync(PRINTERS_DIR);
  for (const file of printerFiles) {
    if (!file.endsWith(".json")) {
      continue;
    }

    try {
      const printerData = JSON.parse(fs.readFileSync(path.join(PRINTERS_DIR, file), "utf-8"));
      const printer = printerData.printer;

      if (!printer || !printer["@id"]) {
        continue;
      }

      const printerId = printer["@id"];
      printers.set(printerId, printer);
      printerToDrivers.set(printerId, new Set());

      const driverRefs = toArray(printer.drivers?.driver);
      for (const driverRef of driverRefs) {
        const driverId = getDriverId(driverRef);
        if (driverId) {
          printerToDrivers.get(printerId).add(driverId);
        }
      }
    } catch (error) {
      console.error(`Error loading printer file ${file}:`, error.message);
    }
  }

  return { printers, printerToDrivers };
}

function loadDriverData(printers, printerToDrivers) {
  const drivers = new Map();
  const driverFiles = fs.readdirSync(DRIVERS_DIR);

  for (const file of driverFiles) {
    if (!file.endsWith(".json")) {
      continue;
    }

    try {
      const driverData = JSON.parse(fs.readFileSync(path.join(DRIVERS_DIR, file), "utf-8"));
      const driver = driverData.driver;
      if (!driver || !driver["@id"]) {
        continue;
      }

      drivers.set(driver["@id"], driver);

      const printerRefs = toArray(driver.printers?.printer);
      for (const printerRef of printerRefs) {
        const printerId = getPrinterRefId(printerRef);
        if (!printerId) {
          continue;
        }

        if (!printerToDrivers.has(printerId)) {
          printerToDrivers.set(printerId, new Set());
        }

        printerToDrivers.get(printerId).add(driver["@id"]);

        if (!printers.has(printerId)) {
          const parts = normalizePrinterId(printerId).split("-");
          printers.set(printerId, {
            "@id": printerId,
            make: parts[0]?.replace(/_/g, " ") || "Unknown",
            model: parts.slice(1).join("-").replace(/_/g, " ") || "Unknown",
            mechanism: {},
            functionality: "?",
            comments: printerRef?.comments,
          });
        }
      }
    } catch (error) {
      console.error(`Error loading driver file ${file}:`, error.message);
    }
  }

  return drivers;
}

function buildDriverDetails(printerId, driverIds, drivers, generatedPpdPaths) {
  return driverIds
    .map((driverId) => drivers.get(driverId))
    .filter(Boolean)
    .map((driver) => {
      const ppdPath = `/ppds/${buildPpdFileName(printerId, driver["@id"])}`;
      const execution = driver.execution
        ? {
            ...driver.execution,
            prototype:
              driver.execution.prototype ??
              driver.execution.driverPrototype ??
              null,
          }
        : null;

      return {
        id: driver["@id"],
        name: driver.name,
        url: driver.url || null,
        comments: driver.comments ? getText(driver.comments) || "" : "",
        hasPpd: generatedPpdPaths.has(ppdPath),
        ...(generatedPpdPaths.has(ppdPath) ? { ppdPath } : {}),
        execution,
      };
    });
}

async function combineData() {
  const { printers, printerToDrivers } = loadPrinterData();
  const drivers = loadDriverData(printers, printerToDrivers);
  const generatedPpdPaths = getGeneratedPpdPaths();

  console.log(`Loaded ${printers.size} printers and ${drivers.size} drivers`);
  console.log(`Detected ${generatedPpdPaths.size} generated PPD files in ${PPD_OUTPUT_DIR}`);

  const combinedPrinters = [];

  for (const [printerId, printer] of printers.entries()) {
    const driverIdSet = printerToDrivers.get(printerId) || new Set();
    const driverIds = Array.from(driverIdSet);

    let recommendedDriverId = null;
    if (printer.driver) {
      recommendedDriverId = `driver/${printer.driver}`;
      if (!driverIdSet.has(recommendedDriverId)) {
        driverIdSet.add(recommendedDriverId);
        driverIds.push(recommendedDriverId);
      }
    } else if (driverIds.length > 0) {
      recommendedDriverId = driverIds[0];
    }

    const manufacturer = getText(printer.make) || "Unknown";
    const model = getText(printer.model) || "Unknown";
    const functionality = getText(printer.functionality) || "?";
    const driverDetails = buildDriverDetails(printerId, driverIds, drivers, generatedPpdPaths);
    const status = getFunctionalityStatus(functionality);
    const finalStatus = driverDetails.length === 0 && status === "Unknown" ? "Unsupported" : status;
    const recommendedDriverWithPpd =
      driverDetails.find((driver) => driver.id === recommendedDriverId && driver.hasPpd) ||
      driverDetails.find((driver) => driver.hasPpd);

    combinedPrinters.push({
      id: normalizePrinterId(printerId),
      manufacturer,
      model,
      series: getText(printer.series) || "",
      connectivity: parseConnectivity(printer),
      recommended_driver: recommendedDriverId,
      drivers: driverDetails,
      type: getPrinterType(printer),
      status: finalStatus,
      functionality,
      notes: getText(printer.comments) || "",
      hasPpd: Boolean(recommendedDriverWithPpd),
      ...(recommendedDriverWithPpd?.ppdPath ? { ppdPath: recommendedDriverWithPpd.ppdPath } : {}),
      supportContacts: getSupportContacts(printer),
      commandsets: getCommandsets(printer),
      ppdOptions: getPpdOptions(printer),
      color: getColorCapability(printer),
      duplex: getDuplexCapability(printer),
      recommended: Boolean(printer.driver || recommendedDriverId),
    });
  }

  combinedPrinters.sort((left, right) => {
    const manufacturerComparison = String(left.manufacturer || "").localeCompare(String(right.manufacturer || ""));
    if (manufacturerComparison !== 0) {
      return manufacturerComparison;
    }

    return String(left.model || "").localeCompare(String(right.model || ""));
  });

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ printers: combinedPrinters }, null, 2));

  console.log(`Combined data written to ${OUTPUT_FILE}`);
  console.log(`Total printers: ${combinedPrinters.length}`);
}

combineData().catch((error) => {
  console.error("Failed to combine printer data:", error);
  process.exit(1);
});
