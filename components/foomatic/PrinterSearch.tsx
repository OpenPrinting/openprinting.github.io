"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FoomaticCard,
  FoomaticHeroPill,
  FoomaticSelect,
} from "@/components/foomatic/shared"
import { useDebounce } from "@/lib/foomatic/hooks/use-debounce"

interface PrinterSearchProps {
  manufacturers: string[]
  driverTypes: string[]
  mechanismTypes: string[]
  supportLevels: string[]
  colorCapabilities: string[]
  searchQuery: string
  onSearch: (query: string) => void
  onFilterManufacturer: (manufacturer: string) => void
  onFilterDriverType: (driverType: string) => void
  onFilterMechanismType: (mechanismType: string) => void
  onFilterSupportLevel: (supportLevel: string) => void
  onFilterColorCapability: (colorCapability: string) => void
  selectedManufacturer: string
  selectedDriverType: string
  selectedMechanismType: string
  selectedSupportLevel: string
  selectedColorCapability: string
  onReset: () => void
}

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  const fieldId = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <FoomaticSelect id={fieldId} value={value} onChange={(event) => onChange(event.target.value)} aria-label={`Filter by ${label.toLowerCase()}`}>
        <option value="all">Any {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </FoomaticSelect>
    </div>
  )
}

export default function PrinterSearch({
  manufacturers,
  driverTypes,
  mechanismTypes,
  supportLevels,
  colorCapabilities,
  searchQuery,
  onSearch,
  onFilterManufacturer,
  onFilterDriverType,
  onFilterMechanismType,
  onFilterSupportLevel,
  onFilterColorCapability,
  selectedManufacturer,
  selectedDriverType,
  selectedMechanismType,
  selectedSupportLevel,
  selectedColorCapability,
  onReset,
}: PrinterSearchProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300)

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    onSearch(debouncedSearchQuery)
  }, [debouncedSearchQuery, onSearch])

  const hasActiveFilters =
    selectedManufacturer !== "all" ||
    selectedDriverType !== "all" ||
    selectedMechanismType !== "all" ||
    selectedSupportLevel !== "all" ||
    selectedColorCapability !== "all" ||
    localSearchQuery !== ""

  return (
    <FoomaticCard className="overflow-hidden">
      <div className="border-b border-border/60 bg-accent/30 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <FoomaticHeroPill className="w-fit">
              Refine results
            </FoomaticHeroPill>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Find the right printer
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Filter by manufacturer, support level, printer type, and color capability to narrow the directory quickly.
              </p>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              onClick={() => {
                setLocalSearchQuery("")
                onReset()
              }}
              variant="outline"
              size="sm"
              className="gap-2 self-start lg:self-auto"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Search directory
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by printer model or manufacturer"
              value={localSearchQuery}
              onChange={(event) => setLocalSearchQuery(event.target.value)}
              className="h-11 bg-background pl-10"
              aria-label="Search by printer model or manufacturer"
            />
          </div>
        </label>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <FilterField
            label="Manufacturer"
            value={selectedManufacturer}
            onChange={onFilterManufacturer}
            options={manufacturers}
          />
          <FilterField
            label="Driver availability"
            value={selectedDriverType}
            onChange={onFilterDriverType}
            options={driverTypes}
          />
          <FilterField
            label="Printer type"
            value={selectedMechanismType}
            onChange={onFilterMechanismType}
            options={mechanismTypes}
          />
          <FilterField
            label="Support status"
            value={selectedSupportLevel}
            onChange={onFilterSupportLevel}
            options={supportLevels}
          />
          <FilterField
            label="Color capability"
            value={selectedColorCapability}
            onChange={onFilterColorCapability}
            options={colorCapabilities}
          />
        </div>
      </div>
    </FoomaticCard>
  )
}
