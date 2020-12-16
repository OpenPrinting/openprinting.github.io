---
title: PAPPL v1.0.0
layout: single
author: Mike
excerpt: PAPPL is a simple C-based framework/library for developing CUPS Printer Applications, which are the recommended replacement for printer drivers.
---

The first stable release of PAPPL is now available for download.  PAPPL
is a simple C-based framework/library for developing CUPS Printer Applications,
which are the recommended replacement for printer drivers.

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.0.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download PAPPL v1.0.0</a>
* <a href="https://www.msweet.org/pappl/index.html" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-home" aria-hidden="true"></i>Home Page</a>

Changes in 1.0.0 include:

- `papplSystemLoadState` would not load printers whose device IDs contained the
  `#` character (Issue #92)
- Passing "auto" for the driver name would cause a crash if there was no auto-
  add callback.
- Added `papplPrinterGetPath` API to get the path for a printer web page
  (Issue #97)
- The `papplPrinterAddLink` and `papplSystemAddLink` functions now accept an
  "options" argument instead of the "secure" boolean in order to allow links to
  be added to multiple places on the web interface in addition to requesting a
  secure (HTTPS) link (Issue #98)

Enjoy!

