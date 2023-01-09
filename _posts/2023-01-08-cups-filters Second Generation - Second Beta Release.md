---
title: cups-filters Second Generation - Second Beta Release!
layout: single
author: Till
excerpt: First round of bug fixes, for page size handling, translation support, build systems, source code documentation
---
During creation of the Debian/Ubuntu packages for the components of the 2nd-generation cups-filters and also during the further development of the [Common Print Dialog Backends (CPDB)](https://openprinting.github.io/achievements/#common-print-dialog-backends) some bugs were discovered which are fixed now.

Also the adaptation of the source code documentation files to the individual components was not yet complete.

So there were many things to fix and these fixes are now available in the second beta release.

### libcupsfilters

- Filter functions did not handle the page size correctly when no printer IPP attributes are supplied (in case of classic CUPS filter no PPD file). Now if a page size is supplied with the job, this one is simply used, otherwise the sizes of the input pages and as a last mean US Letter.
- In the `cfCatalog...()` API for obtaining human-readable strings and translations of attribute/option and choice names, we added suport for specifying the user's UI language now, to receive the requested strings in the correct language, and not only human-readable strings in English.
- In the `cfCatalog...()` API also removed the `const` qualifiers from output string pointers as these strings get allocated by the functions.
- Let API header files `catalog.h` and `ipp.h` not include `config.h`.
- Fixed building libcupsfilters with and without libpoppler. By default, libpoppler is used, to not use it, supply the `--disable-poppler` option to `./configure`.
- Unnecessary `./configure` options for the former PDF-to-PostScript filter function (has moved to libppd as ppdFilterPDFToPS) which were forgotten during the separation, are removed now.
- All `AC_DEFINE` macro calls in `configure.ac` got corrected, setting the macros in `config.h` really to 1 after testing positive.
- libcupsfilters does not use glib, removed the check in `configure.ac`.
- In `libcupsfilters.pc.in` added libqpdf under `Libs.private`.

### libppd

- In the PPD file generator for driverless printing with CUPS we now support more than 2 resolutions in Apple Raster/AirPrint. The `urf-supported` IPP attribute was only parsed correctly when its `RS` part had only 1 or 2 and not more resolutions specified. We have corrected now for an arbitrary amount of resolutions, taking the lowest for "draft", the highest for "high" and one in the middle for "normal" print quality.
- Update `cfCatalogLoad()` calls for API change in libcupsfilters. In libcupsfilters we have added language/translation support to the `cfCatalog...()` API functions via OpenPrinting/libcupsfilters#2. This changes the `cfCatalogLoad()` calls in libppd (both in the PPD generator for driverless printing). For a quick solution we supply NULL as language for now, resembling the old behavior. We look into language support in the PPD generator later.
- `ppdFilterEmitJCL()`: Added NULL check for PPD not being supplied. Classic CUPS filters created based on filter functions using `ppdFilterCUPSWrapper()` and also filter functions of libppd (`ppdFilter...()`) should also work without PPD file and not crash if no PPD file is supplied.
- Make build of `genstrings` optional. `genstrings` is only a development tool for the PPD compiler, not a user tool, therefore we make its build optional.

### cups-filters

- Corrected installation path for include files for `*.drv` files. The PPD compiler `ppdc` (and underlying functions) of libppd searches for include files in `/usr/share/ppdc` and not in `/usr/share/cups/ppdc` any more.

### General

- Tons of fixes in the source code documentation: `README.md`, `INSTALL`, `DEVELOPING.md`, `CONTRIBUTING.md`, `COPYING`, `NOTICE`, ... Adapted the files to the individual components, added links.
- Include `NOTICE` in distribution tarballs
- In `configure.ac` added `foreign` to to `AM_INIT_AUTOMAKE()` calls. Makes automake not require a file named `README`. Removed the empty `README` files.
- Cleaned up `.gitignore`

### Packages

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/4)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/libppd/discussions/5)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/494)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/2)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got committed.
