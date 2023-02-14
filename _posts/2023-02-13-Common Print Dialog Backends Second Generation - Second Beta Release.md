---
title: Common Print Dialog Backends Second Generation - Second Beta Release!
layout: single
author: Till
excerpt: With the CPDB support accepted upstream into GTK we release the second beta
---
We are now releasing the second beta of the second generation of the Common Print Dialog Backends (CPDB).

In the 4.9.4 version of GTK the [Merge Request](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930) for Gaurav Gulerias [GSoC work](https://github.com/TinyTrebuchet/gsoc22/) on
adding CPDB support to GTK's print dialog got finally accepted. To reach this goal, Gaurav also needed to do a lot of enhancements on CPDB itself, and when his merge request got accepted into GTK, CPDB 2.0b1 was already 2 months old and after that a lot of changes have been done, ending up with GTK's CPDB support [not building with any released version of CPDB](https://gitlab.gnome.org/GNOME/gtk/-/issues/5589). Therefore we have now released version 2.0b2 of all the three components of the CPDB to allow easy building of the first CPDB-supporting GTK.

The components we are currently maintaining got all updated and released as version 2.0b2. The following changes have been done:

**General**

- **Options groups:** This allows better structuring of options in print dialogs. Common options are categorized in groups, like media, print quality, color, finishing, ... This can be primarily done by the backends but the frontend library can do fallback/default assignments for options not assigned by the backend.
- **"Color" option group:** Many print dialogs have a "Color" option group (usually shown on one tab), so we also have one in cpdb-libs to match with the dialogs and more easily map the options into the dialogs.
- **Initial printer list:** When starting the dialog we once fetch all backend's printer lists synchronously, waiting for all backends to activate and send their lists. This is done by the function `cpdbConnectToDbus()` ([PR #21](https://github.com/OpenPrinting/cpdb-libs/pull/21)).
- **Update printer list continuously;** Backends will automatically signal any printer updates instead of the frontend having to manually ask them ([PR #21](https://github.com/OpenPrinting/cpdb-libs/pull/21))
- **Translation support:** Translations of option, choice, and group names are now supported, not only English human-readable strings. And Translations can be provided by the backends (which are polling them from the print service, like CUPS queue or IPP printer) and by the frontend library. Use autopoint instead of gettextize for preparing the source package for translations.
- **Allow re-establishing the D-Bus connections** ([PR #14](https://github.com/OpenPrinting/cpdb-libs/pull/14))
- **Debug logging by frontend:** Now backends forward their log messages to the frontend library for easier debugging with all the log being at the frontend.
- **Bug fixes**
  * Use `<glib/gi18n.h>` instead of redefining macros ([Issue #19](https://github.com/OpenPrinting/cpdb-libs/issues/19), [PR #20](https://github.com/OpenPrinting/cpdb-libs/pull/20))
  * Add functions to free memory allocated by objects ([PR #15](https://github.com/OpenPrinting/cpdb-libs/pull/15))
  * Remove hardcoded paths and follow XDG base dir specs ([PR #14](https://github.com/OpenPrinting/cpdb-libs/pull/14))
- **Documentation**
  * Added comment headers for auto-generation of documentation with javadoc to the function declarations ([PR #21](https://github.com/OpenPrinting/cpdb-libs/pull/21))
  * `README.md` Added the dependency on libdbus
  * `COPYING`: Added Priydarshi Singh
- **Distribution tarballs in different formats:** We generate them with `gz`, `bz2`, and `xz` compression now, as the other OpenPrinting packages.

**CUPS Backend**

- **Assure complete and up-to-date list of available printers ([PR #20](https://github.com/OpenPrinting/cpdb-libs/pull/20)):**
  * Return printer list synchronously upon activation
  * Subscribe to CUPS notifications for printer updates
  * Automatically update frontends about new printers found, old
    printers lost, or printer state changed
- **Translations:** Added the support of cpdb-libs for translations
  * Using general message string catalogs from CUPS and also message
    string catalogs from individual print queues/IPP printers.
  * Message catalog management done by libcupsfilters 2.x, via the
    `cfCatalog...()` API functions (`catalog.h`).
- **Added `billing-info` option** ([PR #19](https://github.com/OpenPrinting/cpdb-libs/pull/19))


The new versions of the CPDB components:

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/22)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/21)**
- **cpdb-backend-file: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-file/releases/tag/2.0b2), [Discussion](https://github.com/OpenPrinting/cpdb-backend-file/discussions/6)**
