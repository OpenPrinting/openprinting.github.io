---
title: cups-filters Second Generation - Release Candidate 2!
layout: single
author: Till
excerpt: Now we are really close - Resolution handling, mirrored output, no output at all, beh vulnerability, cups-browsed 100% CPU, libppd vs. CUPS sync
---
After the [cups-filters 2.x release party in Brno](https://openprinting.github.io/OpenPrinting-News-May-2023/#linux-app-summit-2023) (Ubuntu 23.04 and Fedora 38 with 2.0rc1) there also came the first bug reports from users. And together with other fixes a lot of stuff came together, so I decided to issue a second release candidate before actually landing the final.

### cups-browsed 100% CPU!

First bug report coming up was that cups-browsed is taking up between 25% and 100% of one CPU core (Ubuntu bug [#2018504](https://bugs.launchpad.net/bugs/2018504)). Especially my colleagues complained about this when we were all meeting for a week at Canonical's Engineering Sprint two weeks after the Ubuntu 23.04 release (and one of them posted this bug report), and after we were all home again nobody was able to reproduce it any more. Fortunately there were other users able to reproduce this bug and so we do not need to wait for the next Engineering Sprint in November to get it fixed.

Even not able to reproduce it by myself I investigated the workflow, especially after [multi-threading](https://github.com/mohitmo/GSoC-2020-Documentation) got introduced. And there I found that if during creation or update of a local print queue the destination IPP printer cannot get accessed a global variable is set, to stop the loop of updating all local queues and remove the local queue whose destination got lost.

Main problem was that the variable did not get reset, so all future update loops got immediately stopped, without even a first update being done, and as the updates still were due, the loop got immediately started again, causing a busy loop for the rest of the life of the cups-browsed process.

To fix this, I have simply done away with this variable altogether and simply mark the printer as disappeared for the local queue be removed in the next updating round. This is my original design and was already done with multi-threading in mind.

What actually happened on the Engineering Sprint was that I have a lot of shared printers on my laptop, of the Printer Applications I am developing and testing, and when I left our team's meeting room for a meeting with other people, the shared printers got unaccessible for the colleague's laptops and the bug showed up ...

### The Unsupported Resolution Attack!!

There were also some Ubuntu and Fedora users reporting bugs on printing, starting from uglinesses like all jobs coming out [mirrored](https://bugs.launchpad.net/bugs/2018538), or, the more ecological way, [nothing coming out at all](https://github.com/OpenPrinting/libppd/issues/20), up to [unsupported resolution attacks](https://github.com/OpenPrinting/libcupsfilters/issues/29).

The unsupported resolution attack was performed by the [Chromium Browser](https://bugs.chromium.org/p/chromium/issues/detail?id=1448735), sending jobs with `resolution=96dpi` option and these getting printed as garbage by CUPS. It was not intended to save ink by printing less pixels, but simply a bad choice for a default resolution when no resolution info is provided by the PPD and also missing support for PPD files with only `*DefaultResolution=...` but no "Resolution" option. The Chromium developers have fixed that on the Chromium side, but the final solution is [on the way](/OpenPrinting-News-May-2023/#google-summer-of-code-2023).

The reporter of the bug also reported the problem [to us](https://github.com/OpenPrinting/libcupsfilters/issues/29) and made us aware that we do not ignore unsupported resolutions and simply rasterized in them, instead of, as with other job attributes/options, to ignore unsupported values. Now this is fixed to defend our users against such attacks from applications. And, once investigating our resolution handling, I have fixed also some other resolution-related bugs to get more consistent behavior and especially resolution settings in the pseudo-PostScript code of non-"Resolution" options of the PPDs (like "cupsPrintQuality") being respected.

### All-Snap Ubuntu Desktop

During the development work on the [all-Snap Ubuntu Desktop](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) my colleagues started to test the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) (which is included in the installation image but not in the immutable operating system core) amd we found out that cups-browsed broke printing when restoring saved printer settings and attributes due to a [CUPS bug](https://github.com/OpenPrinting/cups/issues/734) with the `print-quality` attribute, making CUPS setting the invalid default velue "0" when it receives any invalid value and not simply ignoring that inquiry (and logging an error). We work around this CUPS problem now by not saving and restoring printer IPP attribute default for the local queues any more (the PPD option defaults should be good enough).

### libppd sync-up with CUPS

The development of libppd, a library which conserves all of CUPS' PPD file support for retro-fitting Printer Applications before it gets removed from CUPS in the 3.x generation, [started nearly exactly 3 years ago](https://openprinting.github.io/OpenPrinting-News-July-2020/#cups-filters). Now in these 3 years after grabbing CUPS' PPD supporting code for libppd a lot has happened with CUPS and also this code received several bug fixes (including some memory leaks) and also even small feature additions by adding extra attributes to generated PPDs so that CUPS can better support all IPP functionality of all driverless printers. I have [overtaken these changes](https://github.com/OpenPrinting/libppd/commit/3e332f051da) now to be in sync with CUPS. Especially retro-fitting Printer Applications now always list all media types of the PPD file!

### First Vulnerability Report

And last, but not least, our second release candidate contains the [fix](https://github.com/OpenPrinting/cups-filters/commit/8f274035756) for our [first security vulnerability reported via GitHub](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-gpxc-v2m8-fr3x). It was the `beh` CUPS backend (Backend Error Handler) allowing to execute arbitrary commands by supplying jobs with forged job titles. The backend is not that often used, but this was also a nice case to find out how to handle any reported vulnerability (which made me writing a [tutorial](/OpenPrinting-News-May-2023/#handling-reported-security-bugs-with-github)).

And here are the lists of all the changes in detail:

### libcupsfilters

- Ignore unsupported resolution values when preparing a Raster header via `cfRasterPrepareHeader()` function, to avoid rasterization with wrong resolution (Issue [#29](https://github.com/OpenPrinting/libppd/issues/29), Ubuntu bug: [#2022929](https://bugs.launchpad.net/bugs/2022929), Chromium issue [#1448735](https://bugs.chromium.org/p/chromium/issues/detail?id=1448735)).
- `cfRasterPrepareHeader()`: When taking default resolution from `urf-supported` printer IPP attribute, use first value (lowest) of the list, to match the `ppdLoadAttributes()` function of libppd.
- `cfIPPAttrResolutionForPrinter()`: List of resolutions is not `IPP_TAG_RANGE`, corrected the search to use `IPP_TAG_ZERO`.
- `cfIEEE1284NormalizeMakeModel()`: Do not consider "XPrinter" as made by Xerox, only "XPrint" is (OpenPrinting CUPS pull request [#506](https://github.com/OpenPrinting/cups/pull/506)).
- `INSTALL`: Recommend QPDF 11.4.0 as it fixes loss of content filled into interactive forms as (Issue [#28](https://github.com/OpenPrinting/libppd/issues/28)).
- `INSTALL`: Fixed some typos.

### libppd

- `ppdFilterPSToPS()`: Fixed reverse output order.
  When converting the former `pstops` CUPS filter into the filter function, some function calls got wrongly replaced by new ones, resulting in no output at all when the input should be re-arranged into reverse order. This broke printing with all PostScript printers (and proprietary CUPS drivers needing PostScript as input) which do reverse-order by default (Issue [#20](https://github.com/OpenPrinting/libppd/issues/20), Ubuntu bug [#2022943](https://bugs.launchpad.net/bugs/2022943)).
- Fixed resolution handling when converting PPDs to printer IPP attributes
  For PWG/Apple Raster or PCLm output resolutions in job options or pseudo-PostScript code in the PPD get ignored and instead, the lowest resolution of the description of the Raster format used in the PPD file gets always used, which reduced output quality (Ubuntu bug [#2022929](https://bugs.launchpad.net/bugs/2022929)).
- `ppdFilterLoadPPD()`: Actually create sample Raster header also for Apple/PWG Raster
- All PPD files with "MirrorPrint" option cuased mirrored printout
  If a PPD contains an option "MirrorPrint", the `ppdFilterLoadPPD()` sent the option `mirror=true` to the filter functions, regardless of the actual setting of "MirrorPrint" (which is usually "False" by default), making all jobs coming out with mirrored pages (Ubuntu bug [#2018538](https://bugs.launchpad.net/bugs/2018538)).
- PPD file generator: Put `*cupsSingleFile: True` into generated PPD as some driverless IPP printers do not support multi-file jobs (CUPS issue [#643](https://github.com/OpenPrinting/cups/issues/643)).
- Add CUPS PPD attributes `*cupsLanguages: ...` and `*cupsStringsURI ...` to generated PPDs so that CUPS loads printer-specific option names and translations from the printer and uses them without need of static translations in the PPD file.
- CUPS renames the PPD option choice name "Custom" to "_Custom" when a fixed choice is named as such, to distinguish from CUPS' facility for custom option values. We do now the same when loading PPD files.
- Prevent duplicate PPD->IPP media-type name mappings, now we do not have dropping of some media types in the Printer Applications any more.
- When not specifying a media source and the page size is small (5x7" or smaller) do not request the photo tray but `auto` instead.
- Do not override color settings from print dialog ("ColorModel") with `print-color-mode` setting.
- Make `ppdFilterPSToPS()` recognize `%%PageRequirements:` DSC comment.
- Correctly display "Xprinter" instead of Xerox for Xprinter devices
- Fix the `job-pages-per-set` value (used to apply finishings correctly) for duplex and N-up printing.
- Make the `testppd` build test program also work if it is started from an environment with non-English locale.
- Minor bug fixes, silencing warnings (especially of clang), fixing typos in comments, coding style, ..., and also some fixes for memory leaks.

### cups-filters

- beh backend: Use `execv()` instead of `system()` - [CVE-2023-24805](https://github.com/OpenPrinting/cups-filters/commit/8f274035756)
  With `execv()` command line arguments are passed as separate strings and not the full command line in a single string. This prevents arbitrary command execution by escaping the quoting of the arguments in a job with forged job title.
- beh backend: Extra checks against odd/forged input - CVE-2023-24805
  * Do not allow `/` in the scheme of the URI (= backend executable name), to assure that only backends inside `/usr/lib/cups/backend/` are used.
  * Pre-define scheme buffer to empty string, to be defined for case of URI being NULL.
  * URI must have `:`, to split off scheme, otherwise error.
  * Check return value of `snprintf()` to create call path for the backend, to error out on truncation of a too long scheme or on complete failure due to a completely odd scheme.
- beh backend: Further improvements - CVE-2023-24805
  * Use `strncat()` instead of `strncpy()` for getting scheme from URI, the latter does not require setting terminating zero byte in case of truncation.
  * Also exclude `.` or `..` as scheme, as directories are not valid CUPS backends.
  * Do not use `fprintf()` in `sigterm_handler()`, to not interfere with a `fprintf()` which could be running in the main process when `sigterm_handler()` is triggered.
  * Use `static volatile int` for global variable job_canceled.
- `parallel` backend: Added missing `#include` lines

### cups-browsed

- Fixed cups-browsed getting stuck in busy loop
  When the function `create_queue()` fails to create a local print queue and the failure is not intermittent, it sets a global variable to stop the main thread's loop for updating local queues. With the variable not reset no queue updates happened ever again and cups-browsed fell into a busy loop taking up to 100% CPU. We have solved this by doing away with the variable and simply mark these printers as disappeared (Ubuntu bug [#2018504](https://bugs.launchpad.net/bugs/2018504)).
- Do not record `*-default` IPP attributes of local CUPS queues
  Many of the `*-default` IPP attributes represent properties already covered by the PPD option defaults which we also record. In addition, there is also `print-quality-default` where IPP reports `draft`, `normal`, and `high` settings while CUPS only accepts `3`, `4`, and `5`, and on everything else it sets `print-quality-default=0` which is invalid and jobs do not get printed. So we stop saving and loading these attributes.
- Build system: Removed unnecessary lines in Makefile.am
  Removed the `TESTdir` and `TEST_SCRIPTS` entries in Makefile.am. They are not needed and let `make install` try to install `run-tests.sh` in the source directory, where it already is, causing an error.
- `run-tests.sh`: Use pkgconfig instead of deprecated cups-config (Pull request [#9](https://github.com/OpenPrinting/cups-browsed/pull/9)).

### Packages

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0rc2), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/30)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0rc2), [Discussion](https://github.com/OpenPrinting/libppd/discussions/23)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0rc2), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/533)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0rc2), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/14)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got implemented.
