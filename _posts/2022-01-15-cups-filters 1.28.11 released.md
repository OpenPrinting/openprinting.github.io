---
title: cups-filters 1.28.11 released!
layout: single
author: Till
excerpt: Bug fix release, containing backports of many of the bugs recently fixed during the preparation of the cups-filters 2.x release.
---
Bug fix release, containing backports of many of the bugs recently fixed during the preparation of the cups-filters 2.x release. Important is that cups-browsed's queue naming is aligned with CUPS' temporary queue naming now and several bugs affecting driverless printing are fixed.
- libcupsfilters: Let PPD generator take default ColorModel from printer (CUPS issue #277).
- Braille: In vectortopdf check inkscape version to call inkscape with the correct command line (Issue #315, Pull request #443).
- Build system: Make missing DejaVuSans.ttf non-fatal in ./configure as the font is only needed for test programs, not for actual use of cups-filters (Issue #411).
- libcupsfilters: In imagetoraster() fixed crash with SGray (Issue #435).
- cups-browsed: Naming of local queues is matched to CUPS' current naming of temporary queues (no leading or trailing underscores), to avoid duplicates in print dialogs which support CUPS' temporary queues.
- libcupsfilters: Make cupsRasterParseIPPOptions() work correctly with PPDs (Issue #436).
- libcupsfilters: Let colord_get_profile_for_device_id() not return empty file name, to avoid error messages in CUPS error_log.
- foomatic-rip: Debug message was wrongly sent to stdout and not to log (Issue #422).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.11)
