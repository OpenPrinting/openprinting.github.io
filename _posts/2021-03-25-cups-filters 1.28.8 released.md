---
title: cups-filters 1.28.8 released!
layout: single
author: Till
excerpt: Bugfix release, to fix several different issues
---
Bugfix release, to fix several different issues
- libcupsfilters: Made check whether the driverless PPD to generate should be a fax out PPD more reliable (Issue #343).
- foomatic-rip: Options in the 5th command line argument of the CUPS filter command line are separated only by white space and not by comma, also make sure that an option "none" is not considered a custom page size (Issue #348).
- implicitclass: Raise timeout for cups-browsed's answer from 20s to 60s (Pull request #346).
- libcupsfilters: In the PPD generator really give priority to Apple Raster against PDF (Issue #331).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.8)
