---
title: libcups v3.0b2
layout: single
author: Mike
excerpt: libcups v3.0b2 is the second beta release of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.
---

libcups v3.0b2 is the second beta release of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.  Changes include:

- Added the `ipptransform` command to replace/upgrade the `ippevepcl` and
  `ippeveps` commands (Issue #65)
- Added `cupsFormDecode` and `cupsFormEncode` APIs (Issue #49)
- Added `cupsJWT` APIs to support JSON Web Tokens (Issue #50, Issue #52)
- Added `ippAddCredentialsString` and `ippCopyCredentialsString` APIs
  (Issue #58)
- Added `cupsCreateCredentialsRequest` and `cupsSignCredentialsRequest` APIs and
  updated `cupsCreateCredentials` API to better support X.509 certificates
  (Issue #59)
- Updated the configure script to add `_FORTIFY_SOURCE=3` (previous level was 2)
  when not using address sanitizer and when it hasn't already been added
  (Issue #51)
- Updated the `httpAddrListen` function to use the maximum backlog value.
- Fixed ipptool limit on the size of an attribute value that would be printed
  (Issue #5)
- Fixed some configure script issues (Issue #48)
- Fixed JSON output bug in ipptool.
- Fixed `CUPS_DNSSD_IF_INDEX_LOCAL` when using Avahi.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0b2" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0b2</a>
