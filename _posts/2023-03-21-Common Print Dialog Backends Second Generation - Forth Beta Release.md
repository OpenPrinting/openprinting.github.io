---
title: Common Print Dialog Backends Second Generation - Forth Beta Release!
layout: single
author: Till
excerpt: Forth beta to add build tests (`make check`), development tools get built and installed the standard way.
---
We are now releasing the forth beta of the second generation of the Common Print Dialog Backends (CPDB).

Main addition are build test scripts (`make check`) for all the three components, as they are required for [inclusion of the CPDB packages into Ubuntu Main](/OpenPrinting-News-February-2023/#the-new-architecture-is-going-into-ubuntu-and-red-hat). Main is the core part of Ubuntu, which gets full support from Canonical.

To facilitate creation of test scripts for the backends, for creating test scripts which test packages installed into a system (like autopkgtests of Debian and Ubuntu), and also for general development and debugging use, the demo programs of cpdb-libs (former `demo/` sub-directory) got promoted to be development tools. Not only their directory got renamed (to `tools/`) but also the programs get built together with the libraries by `make` and get installed by `make install`. And they got also renamed to nicely live in a system: `cpdb-text-frontend` and `cpdb-pickle-print`.

Another feature to ease writing test scripts for backend packages is that now the frontend library does not only look for backend metadata in a hard-wired system directory (`/usr/share/print-backends/`) but one can provide an alternative location via the `CPDB_BACKEND_INFO_DIR` environment variable. So a build test of a freshly compiled and not yet installed backend is no problem any more.

And while developing test scripts one usually tests the software itself a lot. And this revealed some bugs, including crashers, which got also fixed with this release.

The components we are currently maintaining got all updated and released as version 2.0b4. The following changes have been done:

**General**

- Added test script for `make test`/`make check` build tests
  The script `src/run-tests.sh` starts the `cpdb-text-frontend` text mode frontend of cpdb-libs and in case of a backend package also the backend, both in one `dbus-run-session` environment. The frontend discovers the backend and some test tasks are performed with it, like listing options and printing a job. The script of the CUPS backend also starts its own copy of CUPS to allow testing independent of the actual system configuration and without running as root.

**CPDB Libraries**

- Allow changing the backend info directory via environment variable
  To make it possible to test backends which are not installed into the system, one can now set the environment variable `CPDB_BACKEND_INFO_DIR` to the directory where the backend info file for the backend is, for example in its source tree.
- Install sample frontend with `make install`
  We use the sample frontend `cpdb-text-frontend` for several tests now, especially `make check` and also the autopkgtests in the Debian/Ubuntu packages. They are also useful for backend developers for manual testing.
- Renamed developing/debug tools
  As we install the development and debugging tools now, they should be more easily identifiable as part of CPDB. Therefore they get `cpdb-`-prefixed names.
- `cpdb-text-frontend`: Use larger and more easily adjustable string buffers
- Fixed segfault in the frontend library
  `cpdbResurrectPrinterFromFile()`, when called with an invalid file name, caused a crash.

**Print-to-File Backend**

- README.md: Updated for renaming of cpdb-libs tools
  The test/development frontend `print_frontend` is renamed to `cpdb-text-frontend` now.
- Fixed buffer overflow caused in log line in the backend

The new versions of the CPDB components:

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b4), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/25)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b4), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/24)**
- **cpdb-backend-file: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-file/releases/tag/2.0b4), [Discussion](https://github.com/OpenPrinting/cpdb-backend-file/discussions/9)**
