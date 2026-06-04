import Link from "next/link"
import { ArrowRight, PrinterIcon } from "lucide-react"

import {
  FoomaticBadge,
  FoomaticCard,
  FoomaticStatusBadge,
} from "@/components/foomatic/shared"
import type { PrinterSummary } from "@/lib/foomatic/types"
import { calculateAccurateStatus } from "@/lib/foomatic/utils"

interface PrinterCardProps {
  printer: PrinterSummary
}

export default function PrinterCard({ printer }: PrinterCardProps) {
  const printerId = printer.id.replace("printer/", "")
  const accurateStatus = calculateAccurateStatus(printer)
  const driverCount = printer.driverCount ?? 0

  return (
    <Link href={`/foomatic/printer/${printerId}`} className="group block h-full" aria-label={`View ${printer.manufacturer} ${printer.model}`}>
      <FoomaticCard className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-border/80 hover:bg-accent/50 card-glow">
        <div className="border-b border-border/60 bg-accent/30 p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-lg border border-border bg-muted p-3 text-primary transition-colors group-hover:border-border/80">
              <PrinterIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">{printer.manufacturer}</p>
              <h3 className="mt-1 line-clamp-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {printer.model}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <FoomaticStatusBadge status={accurateStatus} />
              {printer.type ? (
                <FoomaticBadge className="border-border bg-accent/50 text-muted-foreground">
                  {printer.type}
                </FoomaticBadge>
              ) : null}
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {driverCount > 0
                ? `${driverCount} driver${driverCount === 1 ? "" : "s"} listed for this printer model.`
                : "No drivers are currently listed for this printer model."}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <FoomaticBadge className="border-border/70 bg-accent/60 text-muted-foreground">
              {driverCount} driver{driverCount === 1 ? "" : "s"}
            </FoomaticBadge>
            <span className="inline-flex items-center gap-1 font-medium text-primary transition-colors group-hover:text-primary/80">
              View details
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </FoomaticCard>
    </Link>
  )
}
