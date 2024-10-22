---
title: libcups v3.0rc3
layout: single
author: Mike
excerpt: libcups v3.0rc3 is the third release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.
---

libcups v3.0rc3 is the third release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.  Changes include:

- Updated `cupsCreateCertificateRequest` to store the new private key separately.
- Updated `cupsSaveCredentials` to validate the input credentials, support using a saved private key from `cupsCreateCertificateRequest`, and support credential removal as documented.
- Updated the raster functions to report more issues via `cupsRasterGetErrorString`.
- Fixed a crash bug on Windows.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0rc3" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0rc3</a>
