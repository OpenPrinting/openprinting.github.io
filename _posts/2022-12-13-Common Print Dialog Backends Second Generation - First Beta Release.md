---
title: Common Print Dialog Backends Second Generation - First Beta Release!
layout: single
author: Till
excerpt: The CPDB got vastly enhanced in the course of their integration in the GTK and Qt print dialogs, leading to the 2.x series
---
We now finally completed the first beta of the second generation of the Common Print Dialog Backends (CPDB).

As part of making everything ready for the [New Architecture of printing](/current/#the-new-architecture-for-printing-and-scanning) we have finally added CPDB support to the print dialogs of the major desktop environments/GUI toolkits, GNOME/GTK and KDE/Qt. This was done in [Gaurav Guleria's GSoC project](https://github.com/TinyTrebuchet/gsoc22/) and in the course of his work on the print dialogs he also did a lot of improvements on the CPDB framework, mainly due to missing features but also to work well in a PPD-less world.

The components we are currently maintaining got all updated and released as version 2.0b1:

- **cpdb-libs:** The central library package implementing both ends of the D-Bus interface (backend = server, frontend = client) and the APIs for frontends and backends.
- **cpdb-backend-cups:** The CUPS backend. It allows the print dialogs (frontends) to print with CUPS. It polls the list of available printers (queues) from CUPS and also the option/setting list for a selected printer, and it passes on jobs with option settings to CUPS. It uses the current APIs of libcups for that and does not interact with PPD files at all, so that porting the backend to CUPS 3.x will be easy.
- **cpdb-backend-file:** This backend allows the print dialogs to print into a file. As most print dialogs have already their own functionality for that, this backend will probably not be needed in production. We have it at least for sake of completeness, but it is also useful as code example for backend developers.

After the last 1.x releases of the CPDB components, the following changes have been done:

- **Added interfaces to get human readable option and settings names**
  Print attributes/options and their choices are usually defined in a machine-readable form which is more made for easy typing in a command line, not too long, no special characters, always in English and in a human-readable form for GUI (print dialogs), more verbose for easier understanding, with spaces and other special characters, translated, ...
  Older backends without human-readable strings can still be used. In such a case it is recommended that the dialog does either its own conversion or simply shows the machine-readable strings as a last mean.
- Added **`get_media_size()` function** to retrieve media dimensions for a given `media` option value
- Support for **media sizes to have multiple margin variants** (like standard and borderless)
- Support for **configurable user and system-wide default printers**
- **Acquire printer details asynchronously** (non blocking)
- Made **cpdb-libs completely CUPS-neutral**
  Removed CUPS-specific functions from the frontend library functions and the dependency on libcups, renamed CUPS-based function and signal names
- Debug logging now includes error messages

The API and the organization of the source and header files got vastly changed with the transition to version 2.x (note that this makes the API incompatible with 1.x):

- **Renamed all API functions, data types and constants**
  To make sure that the resources of libcpdb and libcpdb-frontend do not conflict with the ones of any other library used by a frontend or backend created with CPDB, all functions, data types, and constants of CPDB got renamed to be unique to CPDB.
  Here we follow the rules of CUPS and cups-filters (to get unique rules for all libraries by OpenPrinting): API functions are in camelCase and with `cpdb` prefix, data types all-lowercase, with `_` as word separator, and constants are all-uppercase, also with `_` as word separator, and with `CPDB_` prefix.
- **All headers go to `/usr/include/cpdb` now**
  Base API headers `cpdb.h` and `cpdb-frontend.h`, interface headers (and also part of the API) `backend-interface.h` and `frontend-interface.h`, and the convenience header files `backend.h` and `frontend.h` (include exactly the headers needed).
- **Renamed and re-organized source files** to make all more standards-conforming and naming more consistent.
- **Bumped soname of the libraries to 2.**

The CUPS backend has also the followig functionality added:

- Added function to **query for human readable names** of options/choices
  With the added functionality of cpdb-libs to poll human-readable names for options/attributes and their choices this commit adds a simple function to provide human-readable strings for the user-settable printer IPP attributes of CUPS queues.
- Added support for **common CUPS/cups-filters options**
  Options like `number-up`, `page-set`, `output-order`, ... Available for
  all CUPS queues, not specific to particular printer.

The new versions of the CPDB components:

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/13)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/16)**
- **cpdb-backend-file: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-file/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/cpdb-backend-file/discussions/2)**
