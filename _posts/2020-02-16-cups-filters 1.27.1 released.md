---
title: cups-filters 1.27.1 released!
layout: single
author: Till
excerpt: Bug fix release - All filters support zero-page jobs now, option and choice names in PPDs are changed to work around a bug in CUPS when generating IPP attributes, cups-browsed creates queues for all emote IPP printers by default, and several smaller fixes in the filters
---
Bug fix release: All filters support zero-page jobs now, option and choice names in PPDs are changed to work around a bug in CUPS when generating IPP attributes, cups-browsed creates queues for all emote IPP printers by default, and several smaller fixes in the filters
- libcupsfilters: Let the PPD generator not put any dashes into the PPD option and choice names when translating them from IPP attribute names, to avoid that on the back-translation by CUPS no double-dashes are generated. This broke paper tray selections with tray names like "tray-1", "tray-2", ... (Issue #192, Issue #201, Debian bug #949315).
- foomatic-rip: Fixed segfault when PRINTER environment variable is not supplied.
- pdftopdf, pdftops, gstoraster, gstopdf, gstopxl, rastertoescpx, rastertopclx, foomatic-rip: Handle zero-page jobs (Issue #117, Pull request #196, Pull request #197, Pull request #198, Pull request #200).
- texttopdf: Added support for CJK (double-width) fonts (Issue #135, Pull request #199).
- cups-browsed: Switched default for "CreateIPPPrinterQueues" from "local-only" to "All". The configure script options "--enable-auto-setup-local-only" and "--enable-auto-setup-driverless-only" can be used to change this default (Debian bug #921252).
- rastertoescpx: Fixed wrong freeing of a buffer.
- pdftops: Added options "crop-to-fit" and "fill" to the pdftopdf options which the pstops called by pdftops should not apply a second time.
- pdftops: Added missing "-sstdout=%stderr" to Ghostscript command line, to assure that all messages are redirected to stderr and do not mix up with the output data.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-1)
