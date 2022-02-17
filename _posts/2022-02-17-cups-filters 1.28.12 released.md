---
title: cups-filters 1.28.12 released!
layout: single
author: Till
excerpt: Bug fix release, again backports of cups-filters 2.x, page geometry fixes for print-scaling and number-up, cups-browsed, serial backend
---
Bug fix release, containing backports of many of the bugs recently fixed during the preparation of the cups-filters 2.x release. This time many page geometry bugs in the pdftopdf and imageto... filters were fixed especially with `print-scaling` and `number-up`, but also bugs in cups-browsed and in the serial backend got fixed.
- imagetoraster, imagetopdf: Fixed comparison of the image size with the page size for print-scaling=auto. The image size in pixels was compared with the page size in PostScript points (1/72 inch).
- imagetoraster, imagetopdf: Fixed the "print-scaling=none" (crop-to-fit) mode, also use crop-to-fit always when requested, do not fall back to fit-to-page when the image size differs significantly from the page size (Issue #362).
- libcupsfilters: Changed the default PPI resolution for images as input files from 128 to 200 (Pull request #446).
- implicitclass: Do not check availability of "gs" and "pdftops" executables, instead, check by the presence of "gstoraster" and "pdftoraster" filters whether we have configured cups-filters for Ghostscript and/or Poppler use.
- libcupsfilters: In the PPD generator for the driverless utility and cups-browsed add "*cupsFilter2: ..." lines for all supported driverless data formats (PDF, Apple/PWG Raster, PCLm), and add lines for legacy data formats (PCL, PostScript) only if no driverless formats available.
- libcupsfilters: Always use encryption for ipps. RFC7472 requires that 'ipps' must be used over HTTPS, but the driverless utility does not enforce encryption (Pull request #433).
- serial: Add a 10-msec sleep and at the end add a tcdrain(). For some unknown reason, every printing file need sleep a little time to make sure the serial printer receive data is right (Pull request #431).
- libcupsfilters: Fix resolver functions for DNS-SD-based URIs, to make resolve_uri() also work when DEVICE_URI env variable is set and to make ippfind_based_uri_converter() not re-direct stdin.
- pdftopdf: Set default for print-scaling to avoid "should never happem" log messages and undefined behavior.
- pdftopdf: Fix orientation-requested = 0. Consider this as "automatic selection and not as error.
- pdftopdf: Fixed all combinations of print-scaling and number-up for printers with asymmetric margins (top != bottom or left != right) and for input files containing pages with different sizes and/or orientations. Fixes backported from 2.x branch.
- pdftopdf: Add 2% tolerance for input size larger than output page when "print-scaling=auto" or "print-scaling=auto-fit" is used and too large input pages should be scaled, fitting documents not. This prevents a random-looking behavior if input and output page size seem to be equal, but in reality there are slight differences between size dimensions.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.12)
