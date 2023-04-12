---
title: cups-filters Second Generation - Release Candidate!
layout: single
author: Till
excerpt: Release approaching: Page orientation, image scaling, text in landscape, 16-bit color and 1-bit mono, API adjustment for libcups3, color on color printers fast ...
---
Now we are finally coming to the final release of the components of the second generation of cups-filters, version 2.0.0.

This means going through open bug reports and pull requests, looking for what can get fixed and merged, checking whether the work from the assignments given to GSoC contributor candidates during the selection process got actually included, ...

Also one or another bug report motivates to do further, more intense and systematic testing, as for example GSoC candidate Sourabh Sav did not find a way to suppress auto-rotation of an image when one prints it. This made me discover that the `orientation-requested` attribute was mostly not working with our filter functions and I tested systematically to make it working as expected everywhere, and so not only stopped auto-rotation when desired but also gave full control about orientation of images and text, even discovered that one could not layout plain text input in landscape orientation on the sheet. Now this is all fixed and working.

The beta releases being included in Ubuntu 23.04 helped on finding bugs, too, as for example in [Ubuntu bug #2014976](https://bugs.launchpad.net/bugs/2014976) a user has a driverless color printer for which cups-browsed auto-creates a print queue. The printer takes too long to print the pages and also prints grayscale by default. The grayscale was caused by libppd's PPD file generator for driverless printers not auto-selecting color as default color mode option when the printer's IPP response reports "auto" ([commit](https://github.com/OpenPrinting/libppd/commit/1934a6c341c)). The slow printing was caused by cups-browsed's `implicitclass` CUPS backend choosing PDF as output format when the printer in addition supports the much more reliable Apple Raster ([commit](https://github.com/OpenPrinting/cups-browsed/commit/3eb66da94d7)). This is all fixed in the Release Candidate which today made it in time into Ubuntu 23.04 before tomorrow's Final Freeze (release Thursday next week).

And the Release Candidate is the stage when the API has to be finalized. Having given the addition of [libcups 3.x](https://github.com/OpenPrinting/libcups) support to libcupsfilters as an assignment to GSoC contributor candidate Gayatri Kapse I have found out that we are using 2 dirty workarounds to convert a DNS-SD-based device URI for IPP printers into a standard host-name-based device URI. These 2 had both their own API functions. As the new libcups will finally have a proper API function for this task I have adapted the API already now, despite the libcups3 support will actually be added only in versions 2.1.0 of all the components.

And here are the lists of all the changes in detail:

### libcupsfilters

- Make orientation-requested work correctly In the filter functions `cfFilterImageToRaster()`, `cfFilterImageToPDF()`, `cfFilterTextToPDF()`, and `cfFilterPDFToPDF()` supplying the attributes `orientation-requested` or `(no)landscape` do the expected, rotating content 0/90/180/270 degrees.
- Auto-rotation is always done in the printer's default direction, +90 or -90 degrees as described by the `landscape-orientation-requested-preferred` IPP attribute or by the "`*LandscapeOrientation: ...`" PPD keyword (via libppd).
- The `ppi` attribute works correctly now,no cropping and using more than one sheet if the image gets too large.
- If more than one image-scaling-related attribute is supplied, only the one with the highest priority is used, no mixing with unexpected results.
- Default is always `print-scaling=auto`.
- `cfFilterTextToPDF()` is now capable of printing text in landscape layout, controlled by the `orientation-requested` and `landscape` attributes.
- The `prettyprint` attribute of the `cfFilterTextToPDF()` now uses wider margins for binding/stitching/punching as originally designed. If the printer has even wider margins this is taken into account.
- `cfFilterImageToRaster()`, `cfFilterImageToPDF()`, `cfFilterTextToPDF()`, and `cfFilterPDFToPDF()` all work now correctly also with no printer attributes/capabilities supplied at all, and also with and without supplying a page size. With PDF input the input page sizes are used if applicable. As last mean we resort to US Letter page size (Issue [#26](https://github.com/OpenPrinting/libcupsfilters/issues/26)).
- The `cfFilterUniversal()` filter function now considers the output of `cfFilterImageToPDF()` correctly as `application/vnd.cups-pdf` and not as `application/pdf`, avoiding duplicate application of margins or rotation.
- `cfFilterImageToRaster()` now produces 16-bit-per-color output if requested by the job/printer, and does not output a blank page any more (Issue [#25](https://github.com/OpenPrinting/libcupsfilters/issues/25), pull request [#22](https://github.com/OpenPrinting/libcupsfilters/pull/22)).
- On 1-bit dithered output white background got a grid of dots
  An off-by-one bug in `cfOneBitLine()` made white areas appear with a grid of black dots (1 per 16x16 square). This corrected now (Issue [#20](https://github.com/OpenPrinting/libcupsfilters/issues/20)).
- DNS-SD device URI resolution: Cleaned API for upcoming libcups3 support.
  For resolving DNS-SD-service-name-based device URIs for IPP printers as CUPS uses them, libcups2 does not offer any useful API and we therefore ended up implementing 2 workarounds. As libcups3 has an API function for it we have adapted our API for its use (libcups3 support will get actually added in version 2.1.0).
- Cleaned up the image scaling and rotation code in `cfFilterImage...()`, removing duplicate code and doing some simplification.
- `cfFilterImageToPDF()` could crash when an image could not get loaded and print-scaling was set to fill or none, as a part of the image processing was not covered by the NULL check.
- `cfFilterUniversal()`: Added NULL checks for parameters, so that the function can get called without parameters.
- Added `-std=c++17` C++ compiler flag (Pull request [#18](https://github.com/OpenPrinting/libcupsfilters/pull/18))
  Needed to build libcupsfilters with QPDF 11.
- Removed unneeded `#include` entries for libcups

### libppd

- PPD generator for driverless printers: Set default color mode when printer attrs say "auto"
  Actual printer default color mode did not get set and then often "Gray" got set for color printers. Now we always choose the "best" mode (Ubuntu bug [#2014976](https://bugs.launchpad.net/bugs/2014976)).
- `ppdLoadAttributes()`: Find default page size also by dimensions
  Some PPDs can contain the same page size twice with different names, whereas the PWG cache created from the PPD contains each size only once. This could make the default size not being found when the PPD is converted to IPP attributes. Now we search also by size and not only by name (Caused Ubuntu bug [#2013131](https://bugs.launchpad.net/bugs/2013131)).
- PPD generator for driverless printers: Add `*LandscapeOrientation:` according to the `landscape-orientation-requested-preferred` printer IPP attribute.
- `ppdFilterLoadPPD()`: Corrected PPD attribute name so that for printers which receive PWG Raster a sample Raster header gets created.
- Make the `testppdfile` utility getting built and installed by default.
- Improved formatting of reports generated by `ppdTest()`.

### cups-filters

- `foomatic-rip`: Fix a SIGPIPE error when calling gs (Pull request [#517](https://github.com/OpenPrinting/libcupsfilters/pull/517))
  [Ubuntu's autopkgtest for foo2zjs](https://autopkgtest.ubuntu.com/packages/f/foo2zjs/lunar/ppc64el) shows foo2zjs's testsuite failing with cups-filters 2.0beta3 only on the ppc64el architecture. This is cause by a timing issue in `foomatic-rip` which is fixed now.
- Coverity check done by Zdenek Dohnal for the inclusion of cups-filters 2.x in Fedora and Red Hat. Zdenek has fixed all the issues: Missing `free()`, files not closed, potential string overflows, ... Thanks a lot! (Pull request [#510](https://github.com/OpenPrinting/libcupsfilters/pull/510)).
- Dropped all C++ references and obsolete C standards (Pull requests [#504](https://github.com/OpenPrinting/libcupsfilters/pull/504) and [#513](https://github.com/OpenPrinting/libcupsfilters/pull/513))
  With no C++ compiler needed, there is no need for any checks or setting for C++ in `configure.ac`.
- `configure.ac`: Change deprecated `AC_PROG_LIBTOOL` for `LT_INIT` (Pull request [#508](https://github.com/OpenPrinting/libcupsfilters/pull/508))

### cups-browsed

- Prefer sending jobs in Apple Raster instead of in PDF
  If a destination printer supports both PDF and Apple Raster, and if it is not a remote CUPS queue, prefer sending the job in Apple Raster, as printers print this more reliably (Ubuntu bug [#2014976](https://bugs.launchpad.net/bugs/2014976))
- `run-tests.sh`: Let emulated printers support PDF input
  To test that cups-browsed prefers Apple Raster when the printer supports both PDF and Apple Raster as input format, we let the printers emulated by `ippeveprinter` also support PDF.
- `implicitclass` backend: NULL-initialize filter data field for Raster header
  We are running a filter chain without PPD file, so we do not have Raster header, so initialize it to NULL.

### Packages

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0rc1), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/27)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0rc1), [Discussion](https://github.com/OpenPrinting/libppd/discussions/17)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0rc1), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/522)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0rc1), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/11)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got implemented.
