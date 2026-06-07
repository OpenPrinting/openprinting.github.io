---
title: libcups v3.0.2
layout: single
author: Mike
excerpt: libcups v3.0.2 is a bug fix release.
date: '2026-06-05'
---

libcups v3.0.2 is bug fix release.  Changes include:

- Updated `ipptool` to limit the range of supported raster resolutions for the
  generated test page content from 1 to 9600dpi.
- Fixed a recursion issue with encoding of nested collections.
- Fixed a potential margin issue when generating A4 PCL from `ipptransform`.
- Fixed exporting of JSON with very large numbers.
- Fixed page header validation in `cupsRasterReadHeader` and
  `cupsRasterWriteHeader` for banded raster data.
- Fixed potential crash bug in `cupsCheckDestSupported` function.
- Fixed a duplicate printer bug in `cupsEnumDests` and `cupsGetDests`.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0.2" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0.2</a>
