---
title: cups-filters 1.28.16 released!
layout: single
author: Till
excerpt: Bug fix release, to make images be printed in their original size with "print-scaling=none" and to not use deprecated data types for reading TIFF images.
---
Bug fix release, to make images be printed in their original size with "print-scaling=none" and to not use deprecated data types for reading TIFF images.
- imagetoraster, imagetopdf, libcupsfilters: Added support for reading the resolution of an image from its EXIF data when loading it. This way we get the image reproduced in its original size with "print-scaling=none" (Issue #362).
- libcupsfilters: Replaced deprecated data types uint16 and uint32. The function to read TIFF image files via libtiff in cupsfilters/image-tiff.c uses the deprecated types uint16 and uint32. The replacements for these types are uint16_t and uint32_t.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.16)
