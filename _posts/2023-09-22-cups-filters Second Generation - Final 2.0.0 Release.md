---
title: cups-filters Second Generation - Final 2.0.0 Release!
layout: single
author: Till
excerpt: Now it is there! The 2.0.0 release! Security vulnerability fix and final bug fixes
---
Now, in the last 3 months, we got only few bug reports, and a security vulnerability in CUPS, in code which got overtaken into libppd, and therefore the vulnerability is also there. To get the security fix into a release and 3 months being a long time after RC2 I am finally releasing 2.0.0 right now.

### libppd Postscript Parsing Heap Overflow (CVE-2023-4504)

From the bug report:

> The `ppd_scan_ps()` function in the libppd code base provides functionality that scans through a string looking for the next Postscript object. When iterating through a string which contains an open parenthesis and ends with a single backslash (0x5c) character, the code incorrectly iterates forward a character without properly checking the bounds of the string resulting in a 1 byte read beyond the allocated heap buffer.

This is fixed by adding the missing NULL check when, after a backslash was read, the character escaped by the backslash is read.

### Miscellaneous fixes

A few other bugs got reported and fixed since RC2. These fixes are also included. See the lists below.

And here are the lists of all the changes in detail:

### libcupsfilters

- `cfFilterUniversal()`: Support `application/vnd.cups-postscript`
  Some filters (like `hpps` from HPLIP) produce this MIME type, so if the client uses a classic driver/Printer Application and the server IPP Everywhere, jobs fail because the library is not able to find a suitable conversion (Pull request [#31](https://github.com/OpenPrinting/libcupsfilters/pull/31)).
- `CHANGES.md`: Added reference to Chromium bug report.
- `INSTALL`: We need Ghostscript 10.01.1 to get all changes for Raster output

### libppd

- `ppd_scan_ps()`: Fix CVE-2023-4504
  Added check for end of buffer/string when reading escaped character after backslash, return NULL (invalid string) if no character follows.
- Promoted the static function "ppd_decode()" of ppd/ppd.c into the API function "ppdDecode()".
- `ppdEmitJCLPDF()`: Decode "JCLToPDFInterpreter" value in ppdEmitJCLPDF()
  Fixes "classic" (non-driverless) PDF printing (Issue [#24](https://github.com/OpenPrinting/libppd/issues/24)).
- `ppdLoadAttributes()`: Apply `cfIEEE1284NormalizeMakeModel()` to NickName
  Make and model for the printer IPP attributes are extracted from the PPD's NickName, which sometimes misses the manufacturer's name. Extract it from the PPD's Manufacturer field or derive it from the model name if possible. Enhanced alternative for pull request [#21](https://github.com/OpenPrinting/libppd/pull/21).
- `Makefile.am`: Fix disabling `testppdfile`
  Missing conditionals made the binary built when disabled (Pull request [#18](https://github.com/OpenPrinting/libppd/pull/18)).

### cups-filters

- `universal`: Enable `application/vnd.cups-postscript` as input
  There are filters which produce this MIME type (such as `hpps` of HPLIP), and if someone uses such driver on a client and the server has an IPP Everywhere/driverless printer, the job fails (Pull request [#534](https://github.com/OpenPrinting/cups-filters/pull/534), requires libcupsfilters 2.0.0).

### cups-browsed

- Ensure we always send a valid name to `remove_bad_chars()`
  In case the found queue is a CUPS remote queue shared via DNS-SD, the `rp_value` can be without '/', which leads to `cups-browsed` crash if it is set to create the local queue based on the remote name (Pull request [#13](https://github.com/OpenPrinting/cups-browsed/pull/13)).
- Use description/location from server if available, otherwise from client
  When we create a local queue we first check whether we actually got description and location strings from the remote server/printer, if they are empty we do not set empty strings but use the IPP attributes saved locally for our local queue. This way, if the server does not provide description/location and the user sets their own, that one is conserved through reboots and daemon restarts (Issue [#16](https://github.com/OpenPrinting/cups-browsed/issues/16)).

### Packages

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0.0), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/34)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0.0), [Discussion](https://github.com/OpenPrinting/libppd/discussions/25)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0.0), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/544)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0.0), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/18)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got implemented.
