# Foomatic Printer Assistant — Supported Queries

What the assistant can answer, with representative phrasings. Architecture and semantics: [foomatic-assistant.md](./foomatic-assistant.md).

## Look up a printer

> "HP 2500C" · "tell me about the HP LaserJet 4" · "Brother HL-1050" · "hl 1050"

Punctuation, spacing, and casing variants unify; "Hewlett Packard" is understood as HP. Partial names ("hp deskjet 5") list candidates to choose from; models that are not in the database ("Brother HL-2270DW") get an honest not-found answer with the closest real models.

## Filter by capabilities

> "find a colour laser printer" · "monochrome laser with PCL 5" · "printers with good Linux support" · "600 dpi inkjet" · "postscript 3 printers" · "show me Canon printers" · "colour laser with duplex and PCL"

Filterable: colour vs monochrome, mechanism type (laser / inkjet / dot-matrix), resolution ("600 dpi", "high resolution" = at least 1200 dpi, disclosed), PostScript / PCL (with optional levels), manufacturer, and Linux support grade ("good" = Perfect or Mostly; "perfect" = Perfect only). Results state their ordering and totals. Fields the database doesn't record for a printer exclude it from matches but are reported as missing data, never as a "no". Duplex is recorded for zero printers, so duplex requests are answered with that fact instead of fake results. Constraints outside the data model ("purple", "cheap", "wireless") are named as unfilterable, never silently dropped.

## Similar printers and explanations

> "what printers are similar to this?" (on a printer page) · "printers similar to HP 2500C" · "why was HP LaserJet 4P recommended?" · "what are better alternatives?"

Similarity answers come from the site's precomputed recommendation data, in its original order, with each candidate's similarity percentage, confidence tier, and its own Linux support grade. "Better alternatives" asks which dimension to compare (Linux support, overall similarity, resolution, driver options) unless one was named.

## Support, drivers, comparison

> "how good is the Linux support?" (on a printer page) · "does the HP LaserJet 4 work on Linux?" · "which driver does this printer use?" · "which printers use hplip?" · "which printers use the same driver?" · "compare HP 2500C and HP DeskJet 560C"

Driver questions distinguish the recommended driver from the full listed set; "same driver" uses the recommended driver and says so. Comparisons show recorded fields side by side, with "Not recorded" for gaps, and never declare an overall winner.

## Meta

> "what does Perfect mean?" · "what does the similarity score mean?" · "what can you do?"

These three topics are answered from fixed text grounded in the site's own definitions. Definition questions the database cannot answer ("what is PostScript?") get an honest scope statement rather than a printer list — the data records which printers support such things, not what they are. Anything else outside the printer database — weather, general Linux help, documentation content — gets a clear scope statement; the assistant is not a general documentation chatbot.
