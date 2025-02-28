---
title: Common Print Dialog Backends Second Generation - Seventh Beta Release!
layout: single
author: Till
excerpt: Seventh beta with many fixes for bugs found during GSoC 2024, API improvements, support for CUPS instances, and explanation how CPDB works.
---
During the Google Summer of Code 2024 Biswadeep Purkayastha has added CPDB support to the print dialog of LibreOffice, mentored by Michael Weghorn, one of the LibreOffice developers. In addition to working on the print dialog of LibreOffice, they both have made a lot of contributions, mainly bug fixes, but also some improvements. **Thanks, Biswadeep and Michael, for all these valuable contributions.**

**Lots of API improvements**

Most of the API improvements are addition of new functions or turning formerly internal or static functions into public API functions, so they do not break any existing code.

The only change which requires changes on existing code is the removal of the `instance_name` parameter from the API functions `cpdbGetNewFrontendObj()` and `cpdbStartListingPrinters()` (Pull request [#41](https://github.com/OpenPrinting/cpdb-libs/pull/41)). An instance name turned out to not being needed to manage several frontends accessing one backend. One of the code pieces which needed attention due to that was GTK4, which [stopped building in Ubuntu when I had uploaded this release of cpdb-libs](https://bugs.launchpad.net/ubuntu/+source/gtk4/+bug/2100307). Asking my GSoC contributors for fixing this in the CPDB group chat on Telegram, Michael Weghorn came up with a [merge request for GTK4](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/8246) which got accepted the next day. The fix was trivial, but needed. It even simplified the code somewhat as there was no need to create a unique instance name any more. **Thanks a lot, Michael, for the quick fix.**

**Note:** At other places (Qt, Chromium, Mozilla dialogs) similar fixes are most proably needed.

Now let us get to the new API functions:
- `cpdbGetVersion()`: Returns the CPDB version for client applications to be able to check at runtime (Pull request [#49](https://github.com/OpenPrinting/cpdb-libs/pull/49)).
- `cpdbGetOptionTranslationFromTable()`, `cpdbGetChoiceTranslationFromTable()`: Allow to extract translations from a table pre-loaded via `cpdbGetAllTranslations()`, saves a lot of D-Bus calls (Pull request [#58](https://github.com/OpenPrinting/cpdb-libs/pull/58)).
- `cpdbRefreshPrinterList()`: Refreshes the printer list of a given backend (Pull request [#35](https://github.com/OpenPrinting/cpdb-libs/pull/35)).
- `cpdbGetDbusConnection()`: Aquire D-Bus connection to the session bus (Pull request [#35](https://github.com/OpenPrinting/cpdb-libs/pull/35)).
- `cpdbPrinterCallback()`: Default callback function for changes on a printer (Pull request [#36](https://github.com/OpenPrinting/cpdb-libs/pull/36))
- `cpdbOnPrinterAdded()`, `cpdbOnPrinterRemoved()`, `cpdbOnPrinterStateChanged()`: Functions to handle changes on printers (Pull request [#36](https://github.com/OpenPrinting/cpdb-libs/pull/36)).
- `cpdbFillBasicOptions()`: Fills in basic data into the data structure for a printer (Pull request [#37](https://github.com/OpenPrinting/cpdb-libs/pull/37)).

**Bug fixes**

Many bugs got fixed, especially tons of memory leaks and several crashers, and also unused varaiables, data types, and functions got removed.

The more "visible" bugs are here:
- `cpdb-text-frontend`: Get locale via GLib. Instead of only supporting the `LANGUAGE` environment variable that's not necessarily set, use GLib's `g_get_language_names()` to detect the locale to use in the text frontend which takes other environment variables into account as well (Pull request [#51](https://github.com/OpenPrinting/cpdb-libs/pull/51)).
- `cpdb-text-frontend`: Quit the text frontend when `scanf()` returns EOF, which e.g. happens when the user presses `Ctrl + D`. Previously, pressing `Ctrl + D` would result in the loop running indefinitely, printing ">" without end (Pull request [#38](https://github.com/OpenPrinting/cpdb-libs/pull/38)).
- `cpdbConcatPath()`: Instead of using `CPDB_SYSCONFDIR` again as it was already done earlier, and doing so in a loop, use the actual path extracted from the `XDG_CONFIG_DIRS` environment variable (Pull request [#48](https://github.com/OpenPrinting/cpdb-libs/pull/48)).
- `cpdbPrintFileWithJobTitle()`: Already try to open the file to be printed at the given file path before creating a print job using `cpdbPrintFD()`, to avoid creation of a "dead" job which needs to get manually canceled (Pull request [#78](https://github.com/OpenPrinting/cpdb-libs/pull/78)).
- `cpdbConnectToDBus()`: Correct D-Bus subscriptions to backend signals for new printer appearing, printer disappearing, and printer state change, supplying a pointer to the frontend data structure (Pull request [#44](https://github.com/OpenPrinting/cpdb-libs/pull/44)).
- `cpdbRefreshPrinterList()`: Pass backend name as `const char*` and not as `char*` as this is the standard way to pass C strings. That also simplifies using the function (Pull request [#40](https://github.com/OpenPrinting/cpdb-libs/pull/40)).

**Documentation**

- `README.md`: Explained inner workings of CPDB and gave containerization hints in a new section "[How does it all work internally?](https://github.com/OpenPrinting/cpdb-libs#how-does-it-all-work-internally)". Especially done because snapd developers asked for it for [making snapping CPDB work](https://forum.snapcraft.io/t/37397/).
- *Documentation for newly added API functions*: Added header comments for auto-generating developer documentation (Pull request [#43](https://github.com/OpenPrinting/cpdb-libs/pull/43)).

**CUPS Backend changes**

Also the CUPS backend received some love:
- *Add support for CUPS printer instances*: Don't just always use the `cups_dest_t`'s name for the printer name, but also take it's instance member into account and if present, append that to the name used for the CPDB printer name, separated by a slash character (Pull request [#34](https://github.com/OpenPrinting/cpdb-libs/pull/34)).
- *Always query current CUPS default printer*: When asked for the default printer, always query and return the current CUPS default printer instead of whatever was the default last time this was done (Pull request [#33](https://github.com/OpenPrinting/cpdb-libs/pull/33)).
- `cupsStartDestDocument()`: Pass correct job title and job attributes (options) (Pull request [#36](https://github.com/OpenPrinting/cpdb-libs/pull/36)).
- *Use NULL Instead of "NA" if there's no default printer*: NULL makes clear that there's no default printer, while "NA" could even be the name of an actual printer (Pull request [#35](https://github.com/OpenPrinting/cpdb-libs/pull/35)).

**The new versions of the CPDB components**

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b7), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/81)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b7), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/38)**
