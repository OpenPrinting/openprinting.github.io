---
title: cups-filters 1.27.2 released!
layout: single
author: Till
excerpt: Bug fix release, mainly to fix regressions cause by the zero-page-job-support implementation in foomatic-rip, also some code improvements in foomatic-rip and some crasher fixes in cups-browsed
---
Bug fix release, mainly to fix regressions cause by the zero-page-job-support implementation in foomatic-rip, also some code improvements in foomatic-rip and some crasher fixes in cups-browsed
- foomatic-rip: In some PostScript input files it was possible that option settings did not get inserted or lines inserted on the wron place (Issue #208, Pull request #210).
- foomatic-rip: For the PDF page count call Ghostscript in sandbox mode and fix pointer arithmetics (Pull request #212).
- foomatic-rip: Zero-page-job handling changes made the last page of PostScript files not printed, also turning one-page jobs into zero-page jobs (Issue #200, Issue #206, Issue #208, Pull request #209, Pull request #210, Pull request #211).
- cups-browsed: check_printer_with_option() function: Initialize the value, add further checks, freeing memory and stop allocating magic numbers (Pull request #204).
- cups-browsed: Additional checks against crashes in the is_local_hostname() function (Ubuntu bug #1863716)

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-2)
