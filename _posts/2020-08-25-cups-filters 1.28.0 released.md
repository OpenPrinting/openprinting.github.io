---
title: cups-filters 1.28.0 released!
layout: single
author: Till
excerpt: IPPS and IPP Fax Out support in driverless, log file size limitation and more options for cups-browsed, tons of bug fixes
---
Feature release (probably the last one before 2.0.0) which adds IPP Fax Out support, IPPS support, and a command line option to reveal satndard IPP URIs to the "driverless" utility, added log file size limitation and command line options to control what happens to generated queues on shutdown to cups-browsed, fixed several bugs when printing PostScript input files, several bugs and memory leaks in cups-browsed, crashes on the presence of certain fonts, and many more fixes.

- driverless, driverless-fax, libcupsfilters: Added IPP Fax Out support. Now printer setup tools list an additional fax "driver".  A fax queue is created by selecting this driver. Jobs have to be sent with "-o phone=12345" to supply the destination phone number (Pull request #280).
- libfontembed: Silenced warning with gcc 10.x (Pull request #287).
- cups-browsed: Added ./configure options --enable-saving-created-queues and --with-remote-cups-local-queue-naming (Pull request: #253, #285).
- cups-browsed: Fixed several memory leaks, mainly from the code to merge printer IPP attributes for clusters (Pull request #281, #283).
- driverless: Added "--std-ipp-uris" command line option to show listed URIs in standard hostname-based form (not the CUPS DNS-SD-service-name-based form. Only for manual call of the utility, for debugging purposes (Pull request #277).
- libfontembed: Removed assert() calls which cause crashes when unsupported emoji fonts are installed (Issue #254, Pull request #276).
- driverless: Added support for IPPS (use "ipps://..." URIs if possible, Issue #251, Pull request #270, #273).
- gstoraster, gstopdf: When converting PostScript to PDF use the "pdfwrite" output device with "-dPDFSETTINGS=/default" instead of with "-dPDFSETTINGS=/printer". This reproduces bitmaps in the PostScript file with their original image quality (Issue #272).
- cups-browsed: Limit log file size and add backup file for previous log entries. Introduced the configuration option DebugLogFileSize in cups-browsed.conf to set the actual limit in kilobytes or 0 to get the old behavior of an unlimited size for the log file (Issue #260, Pull request #267).
- gstoraster, gstopdf: Do not apply margins when output format is PDF, as then we convert an incoming PostScript file to PDF (pre-pdftopdf) and do not prepare the pages for the printer (post-pdftopdf, Issue #250).
- cups-browsed: Do not write any log messages directly to stderr, there were some concerning timeouts on queue creation (Issue #260).
- Build system: Fix cross-compilation without DejaVu test font in configure.ac (Issue #262, Pull request #263).
- libcupsfilters: Respect the fact that PPD keywords are case-sensitive when adding "*cupsManualCopies: True" in PPD file (Issue #242).
- libcupsfilters: Older versions of libcups (< 2.3.1) had the enum name for fold-accordion finishings mistyped. Added a workaround.
- cups-browsed: Remove left-over local queues from the previous session more quickly when CUPS legacy browsing is turned on.
- cups-browsed: Left-over local queues from the previous session for which the corresponding remote printer did not appear again did not get removed as they were considered externally overwritten.
- gstoraster, gstopdf: Add option "-dDoNumCopies" to Ghostscript command line if we are outputting PDF (called via gstopdf wrapper) and the number of copies supplied to CUPS is 1 (4th command line argument). In this case we convert incoming PostScript to PDF and need to respect embedded PostScript commands to implement the number of copies (Issue #255, CUPS Issue #5796, OpenSUSE bug #1173345).
- imagetoraster: Potential null dereference fix (when no valid PPD is supplied, Pull request #256).
- cups-browsed: Call cupsGetNamedDest() only if "OnlyUnsupportedByCUPS No"
- Sample PPDs: Corrected ColorModel default for Generic PWG Raster PPD to Color (Pull request #247).
- cups-browsed: Mark the temp queue as cups-browsed-generated during setting printer-is-shared (Pull request #246).
- cups-browsed: Remove mentions of README and AUTHORS files in the man page (Pull request #244).
- Sample PPDs: In Generic-PDF_Printer-PDF.ppd add option to switch between color and grayscale printing (Pull request #237).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.0)
