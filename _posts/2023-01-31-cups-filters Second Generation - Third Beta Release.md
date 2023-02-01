---
title: cups-filters Second Generation - Third Beta Release!
layout: single
author: Till
excerpt: More bug fixes, especially for those discovered during the distro packaging, mainly in build system and source code documentation.
---
During creation of the Debian, Ubuntu, and Red Hat packages for the components of the 2nd-generation of cups-filters and also during the investigation of reported issues some more bugs got discovered and fixed.

Especially in all the component's source code tarballs the `LICENSE` file was missing, which is a problem for Linux distributions using the packages. Now all license- and copyright-relevant files, `AUTHORS`, `COPYING`, `LICENSE`, and `NOTICE` are included in the source tarballs of all the 4 components.

Also unnecessary dependencies, remaining from the times when everything was only a single repository, and overlooked during the separation, got removed, especially in libcupsfilters.

And minor functional glitches and shortcomings, discovered by users (using cups-filters 1.x but the problem continued in 2.x) and by Debian´s and Ubuntu's automatic testing during package build (autopkgtest), got spotted and fixed.

### libcupsfilters

- `cfFilterGhostscript()`: Select correct ICC profile for PCL-XL. When using the `cfFilterGhostscript()` filter function to generate PCL-XL (PXL, PCL 6, Ghostscript output devices "pxlmono", "pxlcolor") output, always the color IPP profile `srgb.c` was used, also for monochrome output ("pxlmono") and this makes Ghostscript error out. Now we correctly select `sgray.icc` for monochrome output.
- `cfGetPrinterAttributes()`: Poll `media-col-database` separately if needed.
  Some printers are not able to handle a get-printer-attributes request querying both the `all` group attribute and the `media-col-database` attribute, so query the latter with a separate call in such cases.
- `cfGenerateSizes()`: Also parse the `media-col-ready` IPP attribute for page sizes and margins. This often reveals extra margin variants, like borderless.
- Removed public `cfPDFOut...()` API (`cupsfilters/pdfutils.h`). This API only makes sense if the API of fontembed is also public, but this we made private earlier.
- Build system, `README.md`: Remove unnecessary dependencies overlooked during the separation: zlib (only needed by libppd), Freetype (not needed any more after removal of `pdftoopvp`), Avahi and GLib (both only needed by cups-browsed). Thanks a lot, Zdenek Dohnal (Pull request #7).
- `COPYING`, `NOTICE`: Added copyright year 2023
- `COPYING`, `NOTICE`, `AUTHORS`: Added Jai Luthra and Vikrant Malik

### cups-filters

- `texttopdf`: Do not include `fontconfig.h` in the CUPS filter wrapper
- Build system: Do not explicitly check for libpoppler-cpp
  The cups-filters package does not contain any code using libpoppler-cpp, therefore we let `./configure` not check for it.
- Add templates for issue reports on GitHub. This makes a selection screen appear when clicking "New Issue" in the web UI, to select whether the issue is a regular bug, a feature request, or a security vulnerability.

### General

- `COPYING`, `NOTICE`: Simplification for autotools-generated files autotools-generated files can be included under the license of the upstream code, and FSF copyright added to upstream copyright list. Simplified `COPYING` appropriately.
- `Makefile.am`: Include `LICENSE` in distribution tarball

### Packages

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/9)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/libppd/discussions/7)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/502)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/3)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got committed.
