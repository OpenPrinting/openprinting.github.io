---
title: CUPS 2.4.13
layout: single
author: Zdenek
excerpt: CUPS 2.4.13 fixes important and moderate vulnerabilities
---

The release 2.4.13 brings two CVE fixes - fix for important CVE-2025-58060 and fix for moderate CVE-2025-58364, together with several bug fixes.

The release includes a new feature - new attribute for printer and job objects - `print-as-raster` - which allows enforce rasterization of the file for IPP Everywhere/AirPrint printers, which supports PDF and raster document formats. The feature is useful for working around internal PDF issues in the printer firmware, for example missing diacritic when printing a PDF.

The detailed list of changes is available in CHANGES.md.

Enjoy the release!

* <a href="https://github.com/OpenPrinting/cups/releases/tag/v2.4.13" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v2.4.13</a>

