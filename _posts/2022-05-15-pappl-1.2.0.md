---
title: PAPPL 1.2.0
layout: single
author: Mike
excerpt: PAPPL v1.rc1 adds full localization, support for additional IPP features, and some other improvements.
---

PAPPL v1.2.0 is now available for download.  PAPPL v1.2 adds full localization, support for additional IPP features, and some other improvements.  Changes in 1.2.0 include:

- Added `papplMainloopShutdown` API to trigger a shutdown of the system that
  was started by `papplMainloop`.
- Fixed mapping of MIME media types to IEEE-1284 Command Set values.
- Fixed a crash bug when no printers are added.
- Fixed compatibility issues with libcups3.
- The macOS menu extra did not update the list of available printers.
- No longer try to show the macOS menu extra when running from a root launchd
  service (Issue #201)

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.2.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.2.0</a>

