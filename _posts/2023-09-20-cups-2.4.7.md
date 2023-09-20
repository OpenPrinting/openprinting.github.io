---
title: CUPS 2.4.7
layout: single
author: Zdenek
excerpt: CUPS 2.4.7 brings fix for CVE-2023-4504 and other fixes
---

CUPS 2.4.7 is released to ship the fix for CVE-2023-4504 and several other changes, among them it is adding OpenSSL support for cupsHashData function and bug fixes.

Detailed list:

- CVE-2023-4504 - Fixed Heap-based buffer overflow when reading Postscript
  in PPD files
- Added OpenSSL support for cupsHashData (Issue #762)
- Fixed delays in lpd backend (Issue #741)
- Fixed extensive logging in scheduler (Issue #604)
- Fixed hanging of lpstat on IBM AIX (Issue #773)
- Fixed hanging of lpstat on Solaris (Issue #156)
- Fixed printing to stderr if we can't open cups-files.conf (Issue #777)
- Fixed purging job files via cancel -x (Issue #742)
- Fixed RFC 1179 port reserving behavior in LPD backend (Issue #743)
- Fixed a bug in the PPD command interpretation code (Issue #768)

Enjoy the new release!

* <a href="https://github.com/OpenPrinting/cups/releases/tag/v2.4.7" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v2.4.7</a>

