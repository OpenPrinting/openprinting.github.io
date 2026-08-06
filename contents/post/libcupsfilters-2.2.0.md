---
title: >-
  libcupsfilters 2.2.0 - First actual feature release after 2.0.0 three years ago
layout: single
toc: false
author: Till
excerpt: >-
  CUPS 2.x, 2.5.x, 3.x support, C++-free thanks to PDFio and Poppler CLI, non-Latin plain text and JPEG-XL printing, full CI testing, ...
date: '2026-08-06'
---
First actual feature release after libcupsfilters 2.0.0 three years ago: Done away with C++ using PDFio instead of QPDF and Poppler's `pdftoppm` instead of libpoppler, non-Latin plain text support, JPEG XL input support, print quality enhancement with Ghostscript, full-fledged CI testing for x86_64, ARM 32 and 64, RISC-V, and CUPS 2.x, 2.5.x, 3.x, bugs from security audit fixed, 4 CVEs fixed, and more ...

**[More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.2.0)**<BR>
**[Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/199)**

- Eliminated the use of C++ in libcupsfilters, to get all regular C
  - Replaced QPDF by PDFio as PDF manipulation library in libcupsfilters
    Modified the filter functions `cfFilterPDFToPDF()`, `cfFilterPCLmToRaster()`, `cfFilterPWGToPDF()`, `cfFilterBannerToPDF()`. Also turned the code from C++ into C.
  - In `cfFilterPDFToRaster()` replaced use of libpoppler by using PDFio and also the external executable `pdftoppm` of poppler-utils, also here turned C++ code into C
  - Made sure that the API/ABI of libcupsfilters did not change
  - Also added extra CI tests via `cupsfilters/test-filter-cases.txt`
  - PDFio 1.6.4 now required for building libcupsfilters
     Older versions have bugs.
  - GSoC 2024 project of Uddhav Phatak: [Final report](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce)
  - Thanks, Uddhav, for your excellent work!
  - Pull requests [#71](https://github.com/OpenPrinting/libcupsfilters/pull/71), [#101](https://github.com/OpenPrinting/libcupsfilters/pull/101), [#103](https://github.com/OpenPrinting/libcupsfilters/pull/103), [#105](https://github.com/OpenPrinting/libcupsfilters/pull/105), [#115](https://github.com/OpenPrinting/libcupsfilters/pull/115), [#124](https://github.com/OpenPrinting/libcupsfilters/pull/124), [#146](https://github.com/OpenPrinting/libcupsfilters/pull/146), [#154](https://github.com/OpenPrinting/libcupsfilters/pull/154), [#171](https://github.com/OpenPrinting/libcupsfilters/pull/171)
- Non-Latin language input support for `cfFilterTextToPDF()`
  - Removed `FC_MONO` constraint to allow proportional fonts
     Some languages have non-monospaced scripts and now they can correctly load their intended fonts.
  - Default to UTF-8 when charset metadata is missing
     `cfFilterTextToPDF()` expects UTF-8 input by default now
  - Add Devanagari Unicode range to utf-8 charsets
  - Thanks to Shreyansh Tiwari
  - Pull requests [#120](https://github.com/OpenPrinting/libcupsfilters/pull/120), [#140](https://github.com/OpenPrinting/libcupsfilters/pull/140), [#141](https://github.com/OpenPrinting/libcupsfilters/pull/141)
- Added JPEG‑XL Support to libcupsfilters
   Now jobs in the high-quality JPEG-XL image format can be sent directly to CUPS and cfFilterImageTo...() filter functions read and convert these files.
   Winter of Code 4.0 project by Titiksha Bansal. Thanks a lot.
   (Pull request [#82](https://github.com/OpenPrinting/libcupsfilters/pull/82))
- Print quality improvements
  - In `cfFilterGhostscript()` introduced `cupsHalftoneType` dithering algorithms
     Controlled with `halftone-type` job option or `cupsHalftoneType` PPD option. Added stochastic halftoning, bi-level threshold, an algorithm from foo2zjs, 8x8, genordered, and spot from PDF (Pull request [#92](https://github.com/OpenPrinting/libcupsfilters/pull/92), [#160](https://github.com/OpenPrinting/libcupsfilters/pull/160))
  - Added user-settable gamma parameter and removed Ghostscript's default one
  - Fixed 1-bit mono dithering of 100% black pixel.  
    Prevents white holes in the text
  - Thanks to ValdikSS
- CI: Implemented complete GitHub Actions pipeline (Build, Unit tests, CodeQL, Cppcheck)
  - GitHub workflow for CI added
  - Static analysis (CodeQL, Cppcheck)
  - Build and unit tests multiple architecture (x86 64-bit, ARM 64- and 32-bit, and RISC-V 64-bit) and for different CUPS versions (2.4.x, 2.5.x, 3.x). Tests on 12 combos
  - Emulations used for ARM 32-bit and RISC-V
  - Use `make check` and also Debian's autopkgtests as unit tests
  - Workflows optimized with caching and parallel jobs
  - Fixed several issues discovered with the added static analysis
  - Part of Rohit Kumar's GSoC 2026 project. Thanks a lot.
  - Pull requests [#132](https://github.com/OpenPrinting/libcupsfilters/pull/132), [#133](https://github.com/OpenPrinting/libcupsfilters/pull/133), [#134](https://github.com/OpenPrinting/libcupsfilters/pull/134), [#135](https://github.com/OpenPrinting/libcupsfilters/pull/135), [#137](https://github.com/OpenPrinting/libcupsfilters/pull/137), [#157](https://github.com/OpenPrinting/libcupsfilters/pull/157), [#158](https://github.com/OpenPrinting/libcupsfilters/pull/158), [#159](https://github.com/OpenPrinting/libcupsfilters/pull/159)
- CI: Improvements of unit tests
  - Add malformed PDF testcase for `pdftopdf` validation (Pull request [#131](https://github.com/OpenPrinting/libcupsfilters/pull/131))
  - Added UTF-8 non-Latin regression coverage for Cyrillic, Greek, Arabic (Pull request [#129](https://github.com/OpenPrinting/libcupsfilters/pull/129))
  - Let `testfilters` just go through all lines of test cases instead of using line count as a parameter (Pull request [#128](https://github.com/OpenPrinting/libcupsfilters/pull/128))
  - Add optional manual `FilterChain()` support to `testfilters`
     Manually providing a filter chain is optional, if not supplied, it is set automatically as before (Pull request [#122](https://github.com/OpenPrinting/libcupsfilters/pull/122))
  - Added a deterministic build-time multi-page UTF-8 Lorem-Ipsum generator (Pull request [#119](https://github.com/OpenPrinting/libcupsfilters/pull/119))  
  - Thanks to Shreyansh Tiwari
- Fixed (crasher) bugs found in security audit by 7ASecurity
  - Crash from wrong tag `*-supported`/`*-default` attributes in the `cfIPPAttrEnumValForPrinter()` function
     Check IPP tags (data types) to avoid NULL dereferences (OCU-01-001, Issue [#149](https://github.com/OpenPrinting/libcupsfilters/issues/149), pull request [#162](https://github.com/OpenPrinting/libcupsfilters/pull/162))
  - Crash from wrong-tag driverless IPP attributes
     `cfGetBackSideOrientation()` and `cfGetPrintRenderIntent()` look up several IPP attributes. Also here check tags/data types to avoid NULL dereferences (OCU-01-003, Issue [#163](https://github.com/OpenPrinting/libcupsfilters/issues/163), pull request [#164](https://github.com/OpenPrinting/libcupsfilters/pull/164))
  - Thanks to Aayush Kumar for the GitHub issue reports and the fixes
  - And thanks to 7ASecurity for the audit and to the Sovereign Tech Agency for funding the Audit
- SECURITY: Out-of-bounds write in `cfFilterPDFToRaster()` if PDF has too large page dimensions
   Crop dimensions to maximum allowed by standard, 14400x14400pt, 200x200in, 5x5m, if needed.
  ([CVE-2025-64503](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-893j-2wr2-wrh9))
- SECURITY: Vulnerabilities by image input with wrong color space/depth/bits-per-pixel combo
  - Fix heap-buffer overflow write in `cfImageLut`
  - Reject color images with 1 bit per sample
  - Reject images where the number of samples does not correspond with the color space
  - Reject images with planar color configuration
  - Reject images with vertical scanlines
  ([CVE-2025-57812](https://www.cve.org/CVERecord?id=CVE-2025-57812))
- SECURITY: `cfFilterImageTo...()`: Added error handling for libpng and libjpeg function calls to avoid the process being aborted.
   (Pull request [#168](https://github.com/OpenPrinting/libcupsfilters/pull/168), [#169](https://github.com/OpenPrinting/libcupsfilters/pull/169))
   ([CVE-2026-64612](https://github.com/advisories/GHSA-qfw8-cr83-3h6j))
- SECURITY: Fix possible infinite loop when parsing device IDs, also avoid empty device IDs
   (Pull request [#170](https://github.com/OpenPrinting/libcupsfilters/pull/170))  
   ([CVE-2026-64611](https://github.com/advisories/GHSA-m7r8-8qc5-j4jf))
- Fixed heap buffer overflow in bilinear zoom of images
   (Issue [#142](https://github.com/OpenPrinting/libcupsfilters/issues/142), pull request [#143](https://github.com/OpenPrinting/libcupsfilters/pull/143))
- Out-of-bounds read in `NormalizeMakeModel` when manufacturer name too long
   (Issue [#136](https://github.com/OpenPrinting/libcupsfilters/issues/136), pull request [#139](https://github.com/OpenPrinting/libcupsfilters/pull/139))
- Use ColorModel or output-mode if there's no print-color-mode
   (Issue [#126](https://github.com/OpenPrinting/libcupsfilters/issues/126), pull request [#127](https://github.com/OpenPrinting/libcupsfilters/pull/127))
- Fix cache thrashing for large images when cropping them
   (Pull request [#106](https://github.com/OpenPrinting/libcupsfilters/pull/106))
- Fix for potential heap-buffer-overflow when reading TIFF images with more than one sample per pixel
   (Issue [#107](https://github.com/OpenPrinting/libcupsfilters/issues/107), pull request [#108](https://github.com/OpenPrinting/libcupsfilters/pull/108))
- Unified return value of TIFF related functions to -1
- When zooming images check whether X and Y size dimensions are not zero
   (Pull request [#86](https://github.com/OpenPrinting/libcupsfilters/pull/86))
- `pdftoraster`, `gsto...`, `mupdftopwg`: Fix NULL-pointer dereference when parsing `%%PDFTOPDF...` comments
   (Pull request [#94](https://github.com/OpenPrinting/libcupsfilters/pull/94))
- `pdftoraster`: Check result of `render_page()` as it may return NULL if the page is not properly constructed
   (Pull request [#95](https://github.com/OpenPrinting/libcupsfilters/pull/95))
- `imagetopdf`: convert custom media size `min_width` and `min_height` to points
   (Issue [#87](https://github.com/OpenPrinting/libcupsfilters/issues/87), pull request [#93](https://github.com/OpenPrinting/libcupsfilters/pull/93))
- `cfFilterChain()`: Initialize return value to 0  
   In some cases the function exits with non-zero status when all filters exit with no errors (zero status).
- Fixed Deadlock in filter chain when one filter fails
   (Issue [#32](https://github.com/OpenPrinting/libcupsfilters/issues/32), pull request [#85](https://github.com/OpenPrinting/libcupsfilters/pull/85))
- cfFilterTextToPDF(): Let all Arabic characters be rendered right-to-left
   (Issue [#84](https://github.com/OpenPrinting/libcupsfilters/issues/84))
- Fix build with libcups3
  - Add changed function `cupsParseOptions()`
  - Only define struct `cups_media_s` if running a version older then CUPS 2.5.x
  - Update `testfilters.c` to use CUPS 3.0 API with compatibility shim for CUPS 2.x and older. Given that this is an end-user program, we don't want to include `libcups2-private.h`. Also tweaked Makefile to link against proper CUPS library.
  - Removed unused reference to `cups/backend.h`
  - Pull request [#153](https://github.com/OpenPrinting/libcupsfilters/pull/153)
- Allow building without fontconfig
   Controllable by `./configure` option. When building without fontconfig, `cfFilterTextToPDF()` gets no-op (to keep API)
   (Pull request [#83](https://github.com/OpenPrinting/libcupsfilters/pull/83))
- Build-time option for alternative CJK font name
   `./configure` option `-with-cjk-fonts` sets alternative name
   (Pull request [#96](https://github.com/OpenPrinting/libcupsfilters/pull/96))
- Fix missing `sys/stat.h` include for Solaris
   (Issue [#97](https://github.com/OpenPrinting/libcupsfilters/issues/97), pull request [#130](https://github.com/OpenPrinting/libcupsfilters/pull/130))
- Use `/bin/sh` for `testfilters.sh` to avoid dependency on bash
   (Pull request [#67](https://github.com/OpenPrinting/libcupsfilters/pull/67))
- `cfFilterImageToPDF()`: Added extra debug log messages concerning page orientation
   (Pull request [#102](https://github.com/OpenPrinting/libcupsfilters/pull/102))
