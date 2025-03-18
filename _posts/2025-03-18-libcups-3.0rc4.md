---
title: libcups v3.0rc4
layout: single
author: Mike
excerpt: libcups v3.0rc4 is the fourth release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.
---

libcups v3.0rc4 is the fourth release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.  Changes include:

- Added `cupsCopyCredentialsPublicKey` API.
- Added `cupsGetClock` API.
- Added `cupsJWTLoadCredentials` API.
- Added "client.conf" man page.
- Added `cups-oauth` and `cups-x509` utilities (Issue #108)
- Updated documentation (Issue #99)
- Updated `cupsDNSSD` APIs on Windows (Issue #29)
- Updated the `ipptool` utility to support the `--bearer-token` and `--client-name` options.
- Updated `cupsOAuthGetMetadata` to support Microsoft Azure/Entra OAuth servers.
- Updated `ipptransform` to support generation of PCLm output in addition to PWG Raster data.
- Updated `cupsEnumDests` and `cupsGetDests` to support printer browsing and filtering options in client.conf (Issue #106)
- Fixed handling of finishings/finishings-col and media/media-col in the `ippeveprinter` tool (Issue #95)
- Fixed a duplicate printer reporting bug in `cupsGetDests`.
- Fixed handling of `NULL` path in `cupsSaveCredentials` API.
- Fixed handling of default authorization strings.
- Fixed validation of dateTime values with time zones more than UTC+11.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0rc4" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0rc4</a>
