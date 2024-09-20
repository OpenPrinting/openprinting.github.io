---
title: libcups v3.0rc1
layout: single
author: Mike
excerpt: libcups v3.0rc1 is the first release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.
---

libcups v3.0rc1 is the first release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.  Changes include:

- Added `cupsFormatString` and `cupsFormatStringv` APIs to safely format UTF-8 strings.
- Added support for per-user instances of `cups-locald` (Issue #69)
- Added `httpConnectURI` API.
- Added "end" argument to `cupsParseOptions` API.
- Renamed `httpReconnect` to `httpConnectAgain`.
- Updated `cupsDestInfo` to accept a `cups_dest_flags_t` argument.
- Updated `cupsCopyString` and `cupsConcatString` APIs to safely terminate UTF-8 strings.
- Updated list of attributes included in the destination options.
- Updated `cupsAddIntegerOption` and `cupsGetIntegerOption` to use the `long` type.
- Updated `httpAddrConnect()` to handle `POLLHUP` together with `POLLIN` or `POLLOUT`.
- Updated the various tool man pages, usage output, and examples.
- Updated `ippCreateRequestedArray` for the Get-Documents and Get-Output-Device-Attributes operations.
- Updated `ipptool` to validate IPP, PDF, and .strings files using the "WITH-[ALL-]CONTENT" predicate (Issue #87)
- Now use installed PDFio library, if available.
- Now use NotoSansMono font for `ipptransform` text conversions.
- Brought back IPP/2.x and related conformance test files (Issue #85)
- The `ipptransform` program now supports uncollated copies.
- Fixed GNU TLS crash.
- Fixed PCL output from `ipptransform` (Issue #72)
- Fixed JSON output from `ipptool`.
- Fixed hang/crash in `cupsEnumDests`/`cupsGetDests` (Issue #74)
- Fixed encoding of IPv6 addresses in HTTP requests (Issue #78)
- Fixed encoding of `IPP_TAG_EXTENSION` values in IPP messages (Issue #80)
- Fixed error handling when reading a mixed `1setOf` attribute (Issue #83)
- Fixed non-quick copy of collection values.
- Fixed error handling in `cupsConnectDest`.
- Fixed TLS negotiation using OpenSSL with servers that require the TLS SNI extension.
- Fixed a certificate loading issue with OpenSSL.
- Fixed cupsAreCredentialsValidForName with OpenSSL.
- Fixed how `ippeveprinter` responds to an unsupported request character set.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0rc1" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0rc1</a>
