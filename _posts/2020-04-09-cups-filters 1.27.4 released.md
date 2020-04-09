---
title: cups-filters 1.27.4 released!
layout: single
author: Till
excerpt: Bug fix release, several minor fixes and especially memory issues in cups-browsed
---
Bug fix release, several minor fixes and especially memory issues in cups-browsed
- libcupsfilters, cups-browsed: Fix memory issues in ppdgenerator and cups-browsed (Pull request #226).
- pdftops: Mention cups-filters README instead of CUPS README in debug log (Pull request #225).
- pdftopdf, gstoraster, foomatic-rip: Use "-dSAFER" Ghostscript option, instead of the deprecated "-dPARANOIDSAFER" (Pull request #224).
- Build System: Replace '==' in configure.ac test with '=', as the former is a bashism (Pull request #222).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-4)
