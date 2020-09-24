---
title: cups-filters 1.28.3 released!
layout: single
author: Till
excerpt: Bug fix release to sove problems caused by an inconsistency between the resolvers for DNS-SD-based URIs
---
Bug fix release to sove problems caused by an inconsistency between the resolvers for DNS-SD-based URIs
- libcupsfilters, cups-browsed: Fixed inconsistency between resolvers for DNS-SD-based URIs, resolve_uri() and ippfind_based_uri_converter(). Now both return a freeable string.
- libcupsfilters: Fix uninitialized buffer and parsing ippfind output in ippfind_based_uri_converter() function (Issue #308, Pull request #309).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.3)
