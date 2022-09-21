---
title: PAPPL 1.2.2
layout: single
author: Mike
excerpt: PAPPL v1.2.2 fixes key issues with localization, client limits, and compilation.
---

PAPPL v1.2.2 is now available for download and is a general bug fix release.
Changes in 1.2.2 include:

- Added debug logging for device management.
- Fixed a device race condition with job processing.
- Fixed a potential value overflow when reading SNMP OIDs (Issue #210)
- Fixed more CUPS 2.2.x compatibility issues (Issue #212)
- Fixed a 100% CPU usage bug when cleaning the job history (Issue #218)
- Fixed the default values of `--with-papplstatedir` and `--with-papplsockdir`
  to use the `localstatedir` value (Issue #219)
- Fixed a initialization timing issue with USB gadgets on newer Linux kernels.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.2.2" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.2.2</a>

