---
title: cups-filters 1.28.10 released!
layout: single
author: Till
excerpt: Bug fix release, more reliable CUPS browsing in cups-browsed, improved PDF printer PPDs, minor fixes
---
Bug fix release: More reliable legacy CUPS browsing in cups-browsed, improved PDF printer sample PPDs, with borderless page sizes, eliminated unneeded dependency on DjVu font, minor fixes
- Sample PPDs: Add borderless page size definitions to Generic PDF Printer, HP Color LaserJet CM3530 MFP PDF, and Ricoh PDF Printer PPD files.
- Sample PPDs: From the PDF PPD files removed the unneeded "*cupsFilters2: ..." line. For CUPS it does not make any difference.
- libcupsfilters: Fixed pdftopdf filter to correctly support page ranges without upper limit, like "10-" (Pull request #399).
- libcupsfilters: Use wildcard tag (IPP_TAG_ZERO) search for "media-type" and "media-type-supported" in the PPD generator (Pull request #398).
- implicitclass, parallel: Added missing newlines at error messages.
- libfontembed: Removed unneeded fontembed/main.c and ttfread executable. Eliminates the dependency on DejaVuSans.ttf (Issue #386).
- gstoraster: Refactor the filter a little to clarify handling of page counts and set job-impressions for TotalPageCount in PWG-Raster header (Pull request #394).
- cups-browsed: Make NotifLeaseDuration configurable and renew after half the lease duration not 60 sec before end. The early renewal improves reliability on busy systems a lot. For easier development and debugging short durations from 300 sec on can get selected (Pull request #378).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10)
