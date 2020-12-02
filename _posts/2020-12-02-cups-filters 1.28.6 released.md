---
title: cups-filters 1.28.6 released!
layout: single
author: Till
excerpt: Bug fix release, especially memory leaks and performance of cups-browsed, but also on the PPD generator and foomatic-rip
---
Bug fix release, fixing lots of memory leaks in cups-browsed, fixed cups-browsed hanging several seconds when there are local print queue with invalid DNS-SD-based URIs, several fixes on the PPD generator for IPP printers, taken from OpenPrinting's fork of CUPS, and fixing bugs on foomatic-rip
- libcupsfilters: In generated PPDs add a grayscale mode if there are only color printing modes (from OpenPrinting CUPS).
- libcupsfilters: In generated PPDs add an "OutputBin" option also if it has only one choice (OpenPrinting CUPS pull request #18).
- libcupsfilters: Generated PPDs could have an "Unknown" default InputSlot (OpenPrinting CUPS issue #44).
- cups-browsed: Removed unneeded IPP attribute additions preventing the created local queues from preserving a location or description the user assigns to them (Issue #323).
- cups-browsed: Removed all calls of the resolve_uri() function of libcupsfilters, as these are not actually needed and in case the supplied DNS-SD-based URI is not resolvable, the function gets stuck for ~5 seconds.
- cups-browsed: Fixed several memory leaks, mainly from the code to merge printer IPP attributes for clusters (Pull request #322).
- cups-browsed: Silenced compiler warning.
- foomatic-rip: Fix infinite loop and input from file on raw printing (Pull request #318).
- foomatic-rip: Remove temporary file created during pdf-to-ps conversion (Pull request #313).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.6)
