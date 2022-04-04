---
title: cups-filters 1.28.14 released!
layout: single
author: Till
excerpt: Bug fix release to get correct PDF output when using "landscape", "orientation-requested", and/or "nopdfAutoRotate" options, and to get PCLm printing work on printers not telling their PCLM default resolution.
---
Bug fix release to get correct PDF output when using "landscape", "orientation-requested", and/or "nopdfAutoRotate" options, and to get PCLm printing work on printers not telling their PCLM default resolution.
- pdftopdf: Correct the output when suppressing auto-rotation (option "nopdfAutoRotate"). Depending on the situation pages got cropped in the wrong orientation or de-centered.
- pdftopdf: Correct the output when the "orientation-requested" or the "landscape" option is supplied. Output could be de-centered (Issue #456), portrait-oriented pages be wrongly cropped and division of the output page into cells for N-up done in the wrong orientation.
- rastertopdf: In PCLm output mode the filter failed to generate PCLm if the printer has no "pclm-source-resolution-default" IPP attribute.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.14)
