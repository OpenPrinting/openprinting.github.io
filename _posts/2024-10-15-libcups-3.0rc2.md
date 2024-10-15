---
title: libcups v3.0rc2
layout: single
author: Mike
excerpt: libcups v3.0rc2 is the second release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.
---

libcups v3.0rc2 is the second release candidate of the CUPS v3 library and tools which remove deprecated APIs, add new APIs, and normalize existing APIs.  Changes include:

- Updated `httpConnectAgain` to re-validate the server's X.509 certificate (Issue #90)
- Updated the source tarball script to include the PDFio sources.
- Fixed handling of empty resolution values passed to `ipptool` (Issue #63)
- Fixed a compressed file error handling bug (Issue #91)
- Fixed the default User-Agent string sent in requests.
- Fixed a recursion issue in `ippReadIO`.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0rc2" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0rc2</a>
