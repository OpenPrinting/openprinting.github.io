---
title: libcups v3.0.3
layout: single
author: Mike
excerpt: libcups v3.0.3 is a bug fix release.
date: '2026-08-20'
---

libcups v3.0.3 is a bug fix release. Changes include:

- CVE-2026-*NNNNN*: The `cupsUTF32toUTF8` function incorrectly treated UTF-32 values as 64-bit.
- Now run `ldconfig` on Linux after installing the shared library (Issue #148)
- Now use dateTime variants of Job attributes.
- Added Chinese media sizes (Issue #152)
- Added length checks for JWT signatures (Issue #155)
- Added language code validation to nameWithLanguage and textWithLanguage values.
- Updated the configure script to look for PDFio v1.2 or later.
- Fixed a non-blocking IO bug that impacted GNOME.
- Fixed a potential buffer overflow in `cupsFormEncode`.
- Fixed long number string error handling in `cupsJSONImportXxx`.
- Fixed HTTP state for POST/PUT with an empty message body (Issue #149)
- Fixed the example RPM spec file (Issue #150)
- Fixed the `ipptool` "get-printer-attributes-suite.test" test file (Issue #154)
- Fixed potential buffer overflow in `cupsCopyDestConflicts`.
- Fixed potential buffer overrun in `cupsDoAuthentication` (Issue #156)
- Fixed potential buffer overrun in `cupsSignCredentialsRequest`.
- Fixed X.509 name checks using OpenSSL.
- Fixed renewal of expired self-signed certificates.
- Fixed potential buffer overflow in Windows DNS-SD code.
- Fixed potential buffer underflow in `ippAdd/SetStringf(v)`.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0.3" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0.3</a>
