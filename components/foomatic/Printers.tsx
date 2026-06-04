import type { PrinterSummary } from "@/lib/foomatic/types"

import PrinterCard from "./PrinterCard"

interface PrintersProps {
  printers: PrinterSummary[]
}

export default function Printers({ printers }: PrintersProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {printers.map((printer) => (
        <PrinterCard key={printer.id} printer={printer} />
      ))}
    </div>
  )
}
