---
title: Common Print Dialog Backends Second Generation - Fifth Beta Release!
layout: single
author: Till
excerpt: Fifth beta to communicate D-Bus-only, without auxiliary files, so that it works with sandboxed packaging
---
We are now releasing the fifth beta of the second generation of the Common Print Dialog Backends (CPDB).

Main change is the removal of the backend info files, in a standard installation in the `/usr/share/print-backends/` directory. They are not actually needed, all containing the D-Bus object path `/`, which we can simply hard-code, and we also cannot use the files to determine which backends are there, as both the frontend and the backends can be provided in a sandboxed package, like a Snap or an OCI container (`podman`, Docker, ...), and so cannot read each other's file systems.

So frontends communicate with backends purely by D-Bus, not any more by the file system.

In addition, we have fixed several bugs, especially security vulnerability CVE-2023-34095, a buffer overflow due to unlimited scanning of input strings by `scanf()` and `fscanf()` calls, some crashers, and a bug breaking `make install`.

The components we are currently maintaining got all updated and released as version 2.0b5. The following changes have been done:

**General**

- Removed browsing for backends via file system
  The frontend should only shout into the D-Bus to find out which backends are available and to communicate with them. Depending on the way how the frontend and backand are installed (for example sandboxed packaging, like Snap) the frontend cannot access the host's or the backend's file systems. Therefore we cannot determine the presence of the backends by their info files. We have also removed the now unnecessary info files from the backends ([PR #27](https://github.com/OpenPrinting/cpdb-libs/pull/27)).
- Build system: Removed unnecessary lines in `tools/Makefile.am`
  Removed the `TESTdir` and `TEST_SCRIPTS` entries in `tools/Makefile.am`. They are not needed and let `make install` try to install `run-tests.sh` in the source directory, where it already is, causing an error.

**CPDB Libraries**

- Limit scanned string length in `scanf()`/`fscanf()` functions
  cpdb-libs uses the `fscanf()` and `scanf()` functions to parse command lines and configuration files, dropping the read string components into fixed-length buffers, but does not limit the length of the strings to be read by `fscanf()` and `scanf()` causing buffer overflows when a string is longer than 1023 characters (CVE-2023-34095).
- Fixed memory bugs leading to leaks and crashes ([PR #26](https://github.com/OpenPrinting/cpdb-libs/pull/26))

**CUPS Backend**

- `get_all_media()`: Do not crash on custom page size range entries
  The media-col-database IPP attribute contains one entry for each valid combination of page size dimensions, margins, and in some cases also media source and media type. Entries for custom page sizes contain ranges instead of single values. `get_all_media()` crashed on these. Now we let the function simply skip them.

The new versions of the CPDB components:

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b5), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/28)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b5), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/27)**
- **cpdb-backend-file: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-file/releases/tag/2.0b5), [Discussion](https://github.com/OpenPrinting/cpdb-backend-file/discussions/10)**
