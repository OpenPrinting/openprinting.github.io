// Shared in-memory fixtures for the assistant tests. The catalogue slice is
// modelled on real records (ids, statuses, capability fields all follow the
// shapes produced by lib/foomatic/catalog.ts) so tests exercise realistic
// data without depending on the generated artifacts.

import type { DriverRecord, DriverSummary, Printer, PrinterSummary } from "@/lib/foomatic/types"
import { buildDriverIndex, buildPrinterIndex } from "../entities"
import type { AssistantData, RecommendationEntry } from "../types"

export const CATALOG: PrinterSummary[] = [
  { id: "HP-2500C", manufacturer: "HP", model: "2500C", type: "inkjet", status: "Perfect", functionality: "A", driverCount: 5, color: true, maxDpi: 600, cs: ["PCL"], rd: "hplip" },
  { id: "HP-2500CM", manufacturer: "HP", model: "2500CM", type: "inkjet", status: "Mostly", functionality: "B", driverCount: 4, color: true, maxDpi: 600 },
  { id: "HP-DeskJet_560C", manufacturer: "HP", model: "DeskJet 560C", type: "inkjet", status: "Perfect", functionality: "A", driverCount: 6, color: true, maxDpi: 300, rd: "hpijs" },
  { id: "HP-LaserJet_4", manufacturer: "HP", model: "LaserJet 4", type: "laser", status: "Perfect", functionality: "A", driverCount: 6, color: false, maxDpi: 600, pclLevel: 5, cs: ["PCL5E", "PJL"], rd: "hplip" },
  { id: "HP-LaserJet_4P", manufacturer: "HP", model: "LaserJet 4P", type: "laser", status: "Perfect", functionality: "A", driverCount: 6, color: false, maxDpi: 600, pclLevel: 5, rd: "hplip" },
  { id: "HP-LaserJet_5", manufacturer: "HP", model: "LaserJet 5", type: "laser", status: "Perfect", functionality: "A", driverCount: 8, color: false, maxDpi: 600, pclLevel: 5, rd: "hplip" },
  { id: "Brother-HL-1050", manufacturer: "Brother", model: "HL-1050", type: "laser", status: "Perfect", functionality: "A", driverCount: 4, color: false, maxDpi: 600, rd: "laserjet" },
  { id: "Canon-BJC-210", manufacturer: "Canon", model: "BJC-210", type: "inkjet", status: "Mostly", functionality: "B", driverCount: 3, color: true, maxDpi: 360 },
  { id: "Epson-Stylus_Color", manufacturer: "Epson", model: "Stylus Color", type: "inkjet", status: "Perfect", functionality: "A", driverCount: 5, color: true, maxDpi: 720 },
  { id: "Apple-LaserWriter", manufacturer: "Apple", model: "LaserWriter", type: "laser", status: "Perfect", functionality: "A", driverCount: 3, color: false, maxDpi: 300, psLevel: 2, cs: ["POSTSCRIPT"] },
  { id: "IBM-4019", manufacturer: "IBM", model: "4019", type: "laser", status: "Unknown", functionality: "?", driverCount: 2, color: "unknown" },
  { id: "Xerox-Phaser_6100", manufacturer: "Xerox", model: "Phaser 6100", type: "laser", status: "Perfect", functionality: "A", driverCount: 4, color: true, maxDpi: 1200, psLevel: 3, cs: ["POSTSCRIPT"], rd: "postscript" },
  { id: "Okidata-OL400", manufacturer: "Okidata", model: "OL400", type: "laser", status: "Mostly", functionality: "B", driverCount: 2, color: false, maxDpi: 300, pclLevel: 4 },
]

export const DRIVERS: DriverSummary[] = [
  { id: "hplip", name: "hplip", supplier: "HP", type: "Filter", obsolete: false, shortDescription: "HPLIP", printerCount: 4 },
  { id: "hpijs", name: "hpijs", supplier: "HP", type: "IJS", obsolete: false, shortDescription: "HPIJS", printerCount: 3 },
  { id: "ljet4", name: "ljet4", supplier: "GPL Ghostscript", type: "Ghostscript built-in", obsolete: false, shortDescription: "PCL5e laser", printerCount: 2 },
  { id: "lj4dith", name: "lj4dith", supplier: "GPL Ghostscript", type: "Ghostscript built-in", obsolete: false, shortDescription: "Dithered", printerCount: 1 },
  { id: "gutenprint", name: "gutenprint", supplier: "Gutenprint", type: "CUPS raster", obsolete: false, shortDescription: "Gutenprint", printerCount: 5 },
  { id: "epson", name: "epson", supplier: "GPL Ghostscript", type: "Ghostscript built-in", obsolete: false, shortDescription: "Epson", printerCount: 2 },
]

const summaryById = new Map(CATALOG.map(printer => [printer.id, printer]))

function fullPrinter(id: string, overrides: Partial<Printer> = {}): Printer {
  const summary = summaryById.get(id)
  if (!summary) throw new Error(`fixture printer missing: ${id}`)
  return {
    id: summary.id,
    manufacturer: summary.manufacturer,
    model: summary.model,
    type: summary.type,
    status: summary.status,
    functionality: summary.functionality,
    color: summary.color,
    duplex: "unknown",
    maxDpi: summary.maxDpi ?? null,
    psLevel: summary.psLevel ?? null,
    pclLevel: summary.pclLevel ?? null,
    commandsets: [],
    commandsetTokens: summary.cs ?? [],
    recommended_driver: summary.rd ? `driver/${summary.rd === "laserjet" ? "ljet4" : summary.rd}` : undefined,
    drivers: Array.from({ length: summary.driverCount ?? 0 }, (_, i) => ({
      id: `driver/fixture-${i}`,
      name: i === 0 && summary.rd ? (summary.rd === "laserjet" ? "ljet4" : summary.rd) : `fixture-${i}`,
    })),
    ...overrides,
  }
}

export const RECOMMENDATIONS: Record<string, RecommendationEntry[]> = {
  "HP-LaserJet_4": [
    {
      id: "HP-LaserJet_4P", score: 0.895, manufacturer: "HP", model: "LaserJet 4P",
      status: "Perfect", type: "laser", driverCount: 6,
      sharedFeatures: ["Preferred Linux driver: hplip", "Laser printer", "PCL 5e", "Similar resolution (300-600 dpi)", "Excellent Linux driver support"],
    },
    {
      id: "HP-LaserJet_5", score: 0.885, manufacturer: "HP", model: "LaserJet 5",
      status: "Perfect", type: "laser", driverCount: 8,
      sharedFeatures: ["Preferred Linux driver: hplip", "Laser printer", "PCL 5e"],
    },
    {
      id: "Okidata-OL400", score: 0.61, manufacturer: "Okidata", model: "OL400",
      status: "Mostly", type: "laser", driverCount: 2,
      sharedFeatures: ["Laser printer"],
    },
    {
      id: "Xerox-Phaser_6100", score: 0.52, manufacturer: "Xerox", model: "Phaser 6100",
      status: "Perfect", type: "laser", driverCount: 4,
      sharedFeatures: ["Laser printer"],
    },
  ],
  "Canon-BJC-210": [
    {
      id: "Epson-Stylus_Color", score: 0.71, manufacturer: "Epson", model: "Stylus Color",
      status: "Perfect", type: "inkjet", driverCount: 5,
      sharedFeatures: ["Inkjet printer", "Color printing"],
    },
    {
      id: "HP-DeskJet_560C", score: 0.55, manufacturer: "HP", model: "DeskJet 560C",
      status: "Perfect", type: "inkjet", driverCount: 6,
      sharedFeatures: ["Inkjet printer", "Color printing"],
    },
    {
      id: "IBM-4019", score: 0.4, manufacturer: "IBM", model: "4019",
      status: "Unknown", type: "laser", driverCount: 2,
      sharedFeatures: [],
    },
  ],
}

export const DRIVER_RECORDS: Record<string, DriverRecord> = {
  hplip: {
    id: "hplip", name: "hplip", supplier: "HP", printerCount: 4,
    printers: [
      { id: "HP-2500C", manufacturer: "HP", model: "2500C", status: "Perfect", recommended: true },
      { id: "HP-LaserJet_4", manufacturer: "HP", model: "LaserJet 4", status: "Perfect", recommended: true },
      { id: "HP-LaserJet_4P", manufacturer: "HP", model: "LaserJet 4P", status: "Perfect", recommended: true },
      { id: "HP-LaserJet_5", manufacturer: "HP", model: "LaserJet 5", status: "Perfect", recommended: true },
    ],
  },
  hpijs: {
    id: "hpijs", name: "hpijs", supplier: "HP", printerCount: 1,
    printers: [{ id: "HP-DeskJet_560C", manufacturer: "HP", model: "DeskJet 560C", status: "Perfect", recommended: true }],
  },
  ljet4: {
    id: "ljet4", name: "ljet4", supplier: "GPL Ghostscript", printerCount: 2,
    printers: [
      { id: "Brother-HL-1050", manufacturer: "Brother", model: "HL-1050", status: "Perfect", recommended: true },
      { id: "HP-LaserJet_4", manufacturer: "HP", model: "LaserJet 4", status: "Perfect", recommended: false },
    ],
  },
}

export function fixtureData(): AssistantData {
  return {
    getCatalog: async () => CATALOG,
    getPrinter: async id => (summaryById.has(id) ? fullPrinter(id) : null),
    getRecommendations: async id => RECOMMENDATIONS[id] ?? [],
    getDriversMap: async () => DRIVERS,
    getDriver: async id => DRIVER_RECORDS[id] ?? null,
  }
}

export const INDEXES = {
  printers: buildPrinterIndex(CATALOG),
  drivers: buildDriverIndex(DRIVERS),
}

export const HOME_CONTEXT = { pageType: "home", route: "/" } as const
export const LJ4_CONTEXT = {
  pageType: "printer",
  route: "/foomatic/printer/HP/HP-LaserJet_4",
  printerId: "HP-LaserJet_4",
} as const
export const BJC_CONTEXT = {
  pageType: "printer",
  route: "/foomatic/printer/Canon/Canon-BJC-210",
  printerId: "Canon-BJC-210",
} as const
