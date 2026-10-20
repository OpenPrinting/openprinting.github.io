---
title: >-
  libcupsfilters 2.1.2 - Stop-gap release for regressions caused by PDFio transition
layout: single
toc: false
author: Till
excerpt: >-
  CUPS 2.x, 2.5.x, 3.x support, non-Latin plain text and JPEG-XL printing, full CI testing, ... but no QPDF-to-PDFio transition
date: '2026-10-06'
---
## Why another 2.1.x release?

We have found out in the 2.2.x releases of libcupsfilters that the transition
from QPDF to PDFio by merging Pull Request [#71](https://github.com/OpenPrinting/libcupsfilters/pull/71) (the [GSoC 2024 work](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce) of Uddhav
Phatak) caused a lot of regressions and so printing with distros which have
adopted these releases (note that Arch adopts all new upstream releases
automatically) got rather broken.
    
To not require distros to stay with the rather old 2.1.1 release and so miss
1.5 years of changes, especially many bug fixes, many of them security issues,
we are doing this 2.1.2 release in the new 2.1.x branch here by starting the
branch on the last commit before the merge of PR [#71](https://github.com/OpenPrinting/libcupsfilters/pull/71), skipping the merge, and
then cherry-picking all the following commits which do not interfere with the
changes of the transition from QPDF to PDFio.

**So with this 2.1.2 release you get all the features and fixes of our [2.2.1 release](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.1.2) except the transition from QPDF to PDFio which makes libcupsfilters free of C++.**

## Next steps

Our development work goes on in the master branch of our GIT repository, in the series of 2.2.x releases. We are working on the regressions to get them fixed as soon as possible.

As we already have fixed several bugs we will soon publish the version 2.2.2 to make the first bunch of fixes available. Then we continue fixing and issue further releases.

Important bug fixes outside the PDFio transition will also be ported over to 2.1.x.

## Recommendations for the distributions

For operating system distributions which are shortly before their next release we recommend 2.1.2 or following 2.1.x releases.

If there are still some months until release, please check the upcoming 2.2.2 and also the head of the master branch. Most probably the regressions will get fixed until your release.

**[More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.1.2)**<BR>
**[Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/270)**

- Non-Latin language input support for `cfFilterTextToPDF()`
  - Removed `FC_MONO` constraint to allow proportional fonts
     Some languages have non-monospaced scripts and now they can correctly load their intended fonts.
  - Default to UTF-8 when charset metadata is missing
     `cfFilterTextToPDF()` expects UTF-8 input by default now
  - Add Devanagari Unicode range to utf-8 charsets
  - Thanks to Shreyansh Tiwari
  - Pull requests [#120](https://github.com/OpenPrinting/libcupsfilters/pull/120), [#140](https://github.com/OpenPrinting/libcupsfilters/pull/140), [#141](https://github.com/OpenPrinting/libcupsfilters/pull/141)
- Added JPEG‑XL Support to libcupsfilters
   Now jobs in the high-quality JPEG-XL image format can be sent directly to CUPS and `cfFilterImageTo...()` filter functions read and convert these files.
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
  - Temporarily set cppcheck test to never fail as it fails without any "error" class issue reported
  - Part of Rohit Kumar's GSoC 2026 project. Thanks a lot.
  - Pull requests [#132](https://github.com/OpenPrinting/libcupsfilters/pull/132), [#133](https://github.com/OpenPrinting/libcupsfilters/pull/133), [#134](https://github.com/OpenPrinting/libcupsfilters/pull/134), [#135](https://github.com/OpenPrinting/libcupsfilters/pull/135), [#137](https://github.com/OpenPrinting/libcupsfilters/pull/137), [#157](https://github.com/OpenPrinting/libcupsfilters/pull/157), [#158](https://github.com/OpenPrinting/libcupsfilters/pull/158), [#159](https://github.com/OpenPrinting/libcupsfilters/pull/159)
- CI: Improvements of unit tests
  - Add malformed PDF testcase for `pdftopdf` validation (Pull request [#131](https://github.com/OpenPrinting/libcupsfilters/pull/131))
  - Added UTF-8 non-Latin regression coverage for Cyrillic, Greek, Arabic (Pull request [#129](https://github.com/OpenPrinting/libcupsfilters/pull/129))
  - Let `testfilters` just go through all lines of test cases instead of using line count as a parameter (Pull request [#128](https://github.com/OpenPrinting/libcupsfilters/pull/128))
  - Add optional manual `FilterChain()` support to `testfilters`
     Manually providing a filter chain is optional, if not supplied, it is set automatically as before (Pull request [#122](https://github.com/OpenPrinting/libcupsfilters/pull/122))
  - Added a deterministic build-time multi-page UTF-8 Lorem-Ipsum generator (Pull request [#119](https://github.com/OpenPrinting/libcupsfilters/pull/119))
  - Added CI test `test-pclm-overflow.sh` for PCLm strip overflow, skip (exit 77) when AddressSanitizer is unavailable, also temporarily use "new-delete-type-mismatch" option, as there are delete-type-mismatch errors only on some architectures and locally not reproducible (Issue [#200](https://github.com/OpenPrinting/libcupsfilters/issues/200), Pull requests [#105](https://github.com/OpenPrinting/libcupsfilters/pull/105), [#204](https://github.com/OpenPrinting/libcupsfilters/pull/204)).
  - Thanks to Shreyansh Tiwari
- Fixed (crasher) bugs found in security audit by 7ASecurity
  - Crash from wrong tag `*-supported`/`*-default` attributes in the `cfIPPAttrEnumValForPrinter()` function
     Check IPP tags (data types) to avoid NULL dereferences (OCU-01-001, Issue [#149](https://github.com/OpenPrinting/libcupsfilters/issues/149), pull request [#162](https://github.com/OpenPrinting/libcupsfilters/pull/162))
  - Crash from wrong-tag driverless IPP attributes
     `cfGetBackSideOrientation()` and `cfGetPrintRenderIntent()` look up several IPP attributes. Also here check tags/data types to avoid NULL dereferences (OCU-01-003, Issue [#163](https://github.com/OpenPrinting/libcupsfilters/issues/163), pull request [#164](https://github.com/OpenPrinting/libcupsfilters/pull/164))
  - Crash by a crafted PNG input file extremely large in one dimension. Cap PNG dimensions to avoid memory exhaustion (OCU-01-016, Issue [#215](https://github.com/OpenPrinting/libcupsfilters/issues/215), pull request [#216](https://github.com/OpenPrinting/libcupsfilters/pull/216))
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
  - ([CVE-2025-57812](https://www.cve.org/CVERecord?id=CVE-2025-57812))
- SECURITY: `cfFilterImageTo...()`: Added error handling for libpng and libjpeg function calls to avoid the process being aborted.
   (Pull request [#168](https://github.com/OpenPrinting/libcupsfilters/pull/168), [#169](https://github.com/OpenPrinting/libcupsfilters/pull/169))  
   ([CVE-2026-64612](https://github.com/advisories/GHSA-qfw8-cr83-3h6j))
- SECURITY: Fix possible infinite loop when parsing device IDs, also avoid empty device IDs
   (Pull request [#170](https://github.com/OpenPrinting/libcupsfilters/pull/170))  
   ([CVE-2026-64611](https://github.com/advisories/GHSA-m7r8-8qc5-j4jf))
- `pclmtoraster`: Treat `realloc()` failures correctly, freeing the allocated memory. Found by the cppcheck analyzer
- `cfFilterGhostscript()`: Serialize raster integer parameters as signed integers (Issue [#218](https://github.com/OpenPrinting/libcupsfilters/issues/218), [#222](https://github.com/OpenPrinting/libcupsfilters/issues/222), pull request [#225](https://github.com/OpenPrinting/libcupsfilters/pull/225))
- `pwgtoraster`: Reject overflowing raster buffers (Issue [#192](https://github.com/OpenPrinting/libcupsfilters/issues/192), [#193](https://github.com/OpenPrinting/libcupsfilters/issues/193), [#194](https://github.com/OpenPrinting/libcupsfilters/issues/194), pull request [#210](https://github.com/OpenPrinting/libcupsfilters/pull/210))
- Fixed heap buffer overflow in bilinear zoom of images
   (Issue [#142](https://github.com/OpenPrinting/libcupsfilters/issues/142), pull request [#143](https://github.com/OpenPrinting/libcupsfilters/pull/143))
- Out-of-bounds read in `NormalizeMakeModel` when manufacturer name too long
   (Issue [#136](https://github.com/OpenPrinting/libcupsfilters/issues/136), pull request [#139](https://github.com/OpenPrinting/libcupsfilters/pull/139))
- Use `ColorModel` or `output-mode` if there is no `print-color-mode`
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
- `cfFilterTextToPDF()`: Let all Arabic characters be rendered right-to-left
   (Issue [#84](https://github.com/OpenPrinting/libcupsfilters/issues/84))
- Fix build with libcups3
  - Add changed function `cupsParseOptions()`
  - Update `testfilters.c` to use CUPS 3.0 API with compatibility shim for CUPS 2.x and older. Given that this is an end-user program, we don't want to include `libcups2-private.h`. Also tweaked Makefile to link against proper CUPS library.
  - Removed unused reference to `cups/backend.h`
  - Pull request [#153](https://github.com/OpenPrinting/libcupsfilters/pull/153)
- Allow building without fontconfig
   Controllable by `./configure` option. When building without fontconfig, `cfFilterTextToPDF()` gets no-op (to keep API)
   (Pull request [#83](https://github.com/OpenPrinting/libcupsfilters/pull/83))
- Build-time option for alternative CJK font name
   `./configure` option `-with-cjk-fonts` sets alternative name
   (Pull request [#96](https://github.com/OpenPrinting/libcupsfilters/pull/96))
- Build system: Get `CUPS_DATADIR` from the `.pc` `cups_datadir` variable, not from `$prefix/share/cups` (wrong under an arch-specific CUPS prefix); fallback kept (Issue [#201](https://github.com/OpenPrinting/libcupsfilters/issues/201), Pull request [#204](https://github.com/OpenPrinting/libcupsfilters/pull/204)).
- Build system: Ensure gen-lorem-text test supports out of tree builds, creating needed directory (Pull request [#205](https://github.com/OpenPrinting/libcupsfilters/pull/205)).
- Fix missing `sys/stat.h` include for Solaris
   (Issue [#97](https://github.com/OpenPrinting/libcupsfilters/issues/97), pull request [#130](https://github.com/OpenPrinting/libcupsfilters/pull/130))
- Use `/bin/sh` for `testfilters.sh` to avoid dependency on bash
   (Pull request [#67](https://github.com/OpenPrinting/libcupsfilters/pull/67))
- `cfFilterImageToPDF()`: Added extra debug log messages concerning page orientation
   (Pull request [#102](https://github.com/OpenPrinting/libcupsfilters/pull/102))
