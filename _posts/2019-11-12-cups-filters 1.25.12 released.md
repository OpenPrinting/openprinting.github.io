---
title: cups-filters 1.25.12 released!
layout: single
author: Till
excerpt: Bug fix release, to address a bug of grayscale jobs not printed on PostScript printers when Poppler is used as PDF interpreter, to allow printing on printers which claim to accept PWG Raster but actually do not print this format, and to eliminate all compiler warnings when building the package
---
Bug fix release, to address a bug of grayscale jobs not printed on PostScript printers when Poppler is used as PDF interpreter, to allow printing on printers which claim to accept PWG Raster but actually do not print this format, and to eliminate all compiler warnings when building the package

- libcupsfilters: Use the text names "Draft", "Normal", and "High" instead of 3, 4, and 5 as choice names for the "cupsPrintQuality" option as CUPS does (Issue #171).
- libcupsfilters: If a printer supports both Apple Raster and PWG Raster let the generated PPD use Apple Raster as there are several printers which report PWG Raster support but do not actually print PWG Raster (Pull reguest #168, Issue #171, CUPS issue #5238).
- cups-browsed: Fix unset location check to use DNS-SD field (Pull request #172).
- libcupsfilters, beh, implicitclass, foomatic-rip, imagetopdf, mupdftoraster, pdftops, sys5ippprinter, cups-browsed, driverless: Silenced all compiler warnings to make the build process of cups-filters completely free of warnings.
- pdftops: Fixed crash when using filter without PPD file.
- pdftops: If printing grayscale jobs with Ghostscript as PDF renderer, add "-sProcessColorModel=DeviceGray" to Ghostscript command line.
- pdftops: Do not use the ugly "pdftops -level1 ..." workaround to get grayscale PostScript output from Poppler. It leads to huge output files with Poppler's "pdftops" utility and does not work at all with "pdftocairo".  Poppler itself does not support PostScript output converted to grayscale. Issue a warning with the hint to use Ghostscript or MuPDF as PDF renderer (Issue #169).
- libcupsfilters: In the cupsRasterParseIPPOptions() accept also "Mono", "Monochrome", and "Gray" as color space names.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-25-12)
