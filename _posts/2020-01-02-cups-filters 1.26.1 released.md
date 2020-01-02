---
title: cups-filters 1.26.1 released!
layout: single
author: Till
excerpt: Bug fix release, to make the cups-browsed-generated local print queues actually work on all OS distributions and to get legacy (not actually designed for driverless IPP) printers better working
---
Bug fix release, to make the cups-browsed-generated local print queues actually work on all OS distributions and to get legacy (not actually designed for driverless IPP) printers better working
- build system: Install the "implicitclass" backend with `-rwx------` permissions, so that CUPS executes it as root, as the "ipp" CUPS backend also has to be executed as root (Issue #183).
- build system: Fixed setting permissions when installing the "cups-brf" backend.
- libcupsfilters: When using the "media-{bottom,left,right,top}-margin-supported" IPP attributes (needed if we have no "media-col-database"), use the minimum and not the maximum margins, this allows accessing more of the printer's capabilities, especially for legacy printers which do not provide sufficient information (Issue #22).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-26-1)
