---
title: PAPPL 1.1b3
layout: single
author: Mike
excerpt: PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10.
---

The third beta release of PAPPL v1.1 is now available for download.  PAPPL v1.1
adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-
add functionality, improves management of multiple printers, and adds support
for Microsoft® Windows® 10 and higher.

Changes in 1.1b3 include:

- Added a new `papplSystemSetAuthCallback` API to support alternate authentication
  mechanisms (Issue #185)
- Added `papplCreateTempFile` and `papplPrinterOpenFile` file creation functions
  (Issue #186)
- Added support for a `server-options` option for the `server` sub-command (Issue #187)
- Added an optional callback for processing USB gadget print data.
- Added `papplCopyString`, `papplGetRand`, and `papplGetTempDir` utility
  functions.
- Calling `papplSystemSetHostName` did not also update the default TLS common
  name.
- Now map `file:///dev/null` to `NUL:` on Windows.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.1b3" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.1b3</a>

