---
title: cups-filters 1.25.13 released!
layout: single
author: Till
excerpt: Bug fix release, mainly to solve problems of cups-browsed, mainly for compatibility problems with some printers, leaks, and crashes. Also updated the PPD generator to catch up with the one of CUPS. Prefer Apple Raster instead of PWG Raster as some printers have bugs in their PWG Raster implementation.
---
Bug fix release, mainly to solve problems of cups-browsed, mainly for compatibility problems with some printers, leaks, and crashes. Also updated the PPD generator to catch up with the one of CUPS. Prefer Apple Raster instead of PWG Raster as some printers have bugs in their PWG Raster implementation.
- implicitclass: When passing on the job via the "ipp" CUPS backend, set argv[0] to the destination printer URI (Pull request #173).
- cups-browsed: Added another fallback to the get-printer-attributes IPP request: Now after failing the standard request ("all", "media-col-database") with both IPP 2.0 and IPP 1.1, try simply "all", without "media-col-database" (Pull request #173).
- cups-browsed: Do not set printer-is-shared for remote CUPS queue when making a temporary queue permanent (Pull request #180).
- cups-browsed: Fix leaks of ipp_t struct and load balancing on the servers (Pull request #179).
- cups-browsed, implicitclass: Prioritize Apple Raster against PWG Raster when selecting the PDL for the destination printer for a job sent to a cluster, also cleaned up the PDL selector code and added PostScript support.
- libcupsfilters: Updated the PPD generator adding all changes of the PPD generator of CUPS: Support for "job-account-id", "job-accounting-user-id", "job-password", finishing options "trim-..." added, finishing options and "finishing-col-database" support synced with CUPS.
- libcupsfilters: In the PPD generator get the mode for handling the back sides of the sheets when printing duplex preferably from the "urf-supported" attribute.
- libcupsfilters: Fixed bug that the PPD generator did not output the "*CloseUI: *ColorModel" line when it did not determine a default setting for "ColorModel".
- cups-browsed: Added some missing memory allocations leading to a segfault (Issue #175).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-25-13)
