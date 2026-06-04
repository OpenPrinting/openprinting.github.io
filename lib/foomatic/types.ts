export interface Driver {
  id: string
  name: string
  url?: string
  comments?: string
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
