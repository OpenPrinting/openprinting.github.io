---
title: cups-filters 1.28.17 released!
layout: single
author: Till
excerpt: Bug fix release, to more reliably discover all printer capablities from driverless printers, especially borderless printing, and to preferably use Apple Raster instead of PWG Raster or PCLM
---
Bug fix release, to more reliably discover all printer capablities from driverless printers, especially borderless printing, and to preferably use Apple Raster instead of PWG Raster or PCLM.
- libcupsfilters: In PPD generator create only one `*cupsFilter2:` line for raster. Only use the most desirable/reliable format, usually Apple Raster (Issue #498).
- libcupsfilters: In `get_printer_attributes()` poll `media-col-database` separately if needed. On some printers one gets `media-col-database` only this way. Often it reveals important functionality, like for example borderless printing (Issue #492).
- libcupsfilters: Let PPD generator also parse `media-col-ready` IPP attribute. `media-col-ready` lists the loaded media, in contrary to `media-ready`, as list of complete descriptions of the media (`media-col` data structure).  This often lists also variants like borderless (it is the same physical paper). Especially useful when `media-col-database` is not available (Issue #492).
- libcupsfilters: In `generate_sizes()` consider all margin alternatives. When generating the PPD file for a driverless printer, and in the `media-{left,right,top,bottom}-margin-supported` printer IPP attributes there was more than 1 value, the first value (which often was the 0 for borderless printing) was not considered, leaving the borderless functionality of many printers undiscovered (Issue #492).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.17)
