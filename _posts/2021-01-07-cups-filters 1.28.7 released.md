---
title: cups-filters 1.28.7 released!
layout: single
author: Till
excerpt: Bug fix release to remove the support quality check from the "driverless" utility to do not break CUPS' PPD listing facility and several fixes for generating PPDs for driverless printers
---
Bug fix release to remove the support quality check from the "driverless" utility to do not break CUPS' PPD listing facility and several fixes for generating PPDs for driverless printers
- driverless: Removed the support quality check from Pull request #235 as it takes significant time for each printer being listed, making cups-driverd (`lpinfo -m`) timing out when there are many printers (OpenPrinting CUPS issue #65).
- libcupsfilters: In the PPD generator give priority to Apple Raster against PDF (Issue #331).
- libcupsfilters: Added NULL check when removing ".Borderless" suffixes from page size names (Issue #314, Pull request #328).
- libcupsfilters: In the cupsRasterParseIPPOptions() map the color spaces the same way as in the PPD generator (Issue #326, Pull request #327).
- libcupsfilters: Fixed addition of grayscale mode in generated PPD files, to avoid duplicate entries (OpenPrinting CUPS issue #59).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.7)
