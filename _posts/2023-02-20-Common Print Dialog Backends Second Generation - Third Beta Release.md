---
title: Common Print Dialog Backends Second Generation - Third Beta Release!
layout: single
author: Till
excerpt: Third beta to improve translation support
---
We are now releasing the third beta of the second generation of the Common Print Dialog Backends (CPDB).

This time we have added functions for synchronous and asynchronous loading of all group/option/choice string translations from the backends. Also the needed counterparts on the backends got added.

The release is done to get this functionality into the Ubuntu packages before Lunar's (23.04) Feature Freeze on Feb 23, 2023.

The components we are currently maintaining got all updated and released as version 2.0b2. The following changes have been done:

**CPDB Libraries**

- Added functions to fetch all printer strings translations ([PR #23](https://github.com/OpenPrinting/cpdb-libs/pull/23))
  * Added `cpdbGetAllTranslations()` to synchronously fetch all printer string translations
  * Added `cpdbAcquireTranslations()` to asychronously fetch them.
  * Removed `get-human-readable-option`/`choice-name` methods
  * Removed `cpdb_async_obj_t` from `cpdb-frontend.h` as that is meant for internal use.

**Backends**

- Add handler for `GetAllTranslations` method and Bug fixes ([PR #22](https://github.com/OpenPrinting/cpdb-backend-cups/pull/22) and [PR #7](https://github.com/OpenPrinting/cpdb-backend-file/pull/7))
  * Add handler for `GetAllTranslations` method
  * `get_printer_translations()` fetches translations for all printer strings.
  * Removed `get_human_readable_option_name()` and `get_human_readable_choice_name()` functions.
  * Fixed bug when CUPS backend finds zero printers and further fixes


The new versions of the CPDB components:

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/24)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/23)**
- **cpdb-backend-file: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-file/releases/tag/2.0b3), [Discussion](https://github.com/OpenPrinting/cpdb-backend-file/discussions/8)**
