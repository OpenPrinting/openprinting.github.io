export interface Driver {
  id: string
  name: string
  url?: string
  comments?: string
  type?: string | null
  obsolete?: boolean
  replacedBy?: string | null
  hasPpd?: boolean
  ppdPath?: string
  execution?: {
    ghostscript?: string | null
    filter?: string | null
    prototype: string
  }
}

export interface SupportContact {
  name?: string
  url?: string
  email?: string
  phone?: string
  text?: string
}

export interface PpdOption {
  name?: string
  text?: string
  value?: string
}

export interface Printer {
  id: string
  manufacturer: string
  model: string
  series?: string
  connectivity?: string[]
  recommended_driver?: string
  drivers?: Driver[]
  type?: string
  status?: string
  notes?: string
  functionality?: string
  hasPpd?: boolean
  ppdPath?: string
  supportContacts?: SupportContact[]
  commandsets?: string[]
  ppdOptions?: PpdOption[]
  color?: boolean | "unknown"
  duplex?: boolean | "unknown"
  recommended?: boolean
  hasOwnEntry?: boolean
}

export type PrinterStatus = 'Perfect' | 'Mostly' | 'Unsupported' | 'Unknown'
export type DriverType = string
export type MechanismType = 'inkjet' | 'laser' | 'dot-matrix' | 'unknown'
export type SupportLevel = 'Perfect' | 'Mostly' | 'Unsupported' | 'Unknown'
export type ColorCapability = 'color' | 'monochrome' | 'unknown'

export interface PrinterSummary {
  id: string
  manufacturer: string
  model: string
  type?: string
  status?: string
  driverCount?: number
  functionality?: string
}

export interface DriverPrinterRef {
  id: string
  manufacturer: string
  model: string
  status?: string
  recommended?: boolean
}

export interface DriverSupportContact {
  text?: string
  url?: string
  level?: string
}

export interface DriverFunctionality {
  color?: boolean
  maxResolution?: string
  text?: number
  lineart?: number
  graphics?: number
  photo?: number
  speed?: number
}

export interface DriverRecord {
  id: string
  name: string
  url?: string | null
  supplier?: string | null
  license?: string | null
  freeSoftware?: boolean
  manufacturerSupplied?: boolean
  thirdParty?: boolean
  shortDescription?: string | null
  comments?: string
  type?: string | null
  functionality?: DriverFunctionality | null
  obsolete?: boolean
  replacedBy?: string | null
  supportContacts?: DriverSupportContact[]
  printers: DriverPrinterRef[]
  printerCount: number
}

export interface DriverSummary {
  id: string
  name: string
  supplier?: string | null
  license?: string | null
  type?: string | null
  obsolete?: boolean
  shortDescription?: string | null
  printerCount: number
}
