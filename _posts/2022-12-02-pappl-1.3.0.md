---
title: PAPPL 1.3.0
layout: single
author: Mike
excerpt: PAPPL v1.3.0 adds new job management, image printing, localization, and configuration features.
---

PAPPL v1.3.0 is now available for download and adds new job management, image
printing, localization, and configuration features.  Changes in 1.3.0 include:

- Added debug logging for device management.
- Added support for job hold and release (Issue #15)
- Added support for PNG image scaling using embedded resolution information
  (Issue #65)
- Added `papplLocGetDefaultMediaSizeName` function to get the default media size
  for the current country (Issue #167)
- Added support for localized banners at the top of printer and system web pages
  (Issue #183)
- Added timer APIs to manage periodic tasks (Issue #208)
- Added support for network configuration via callbacks (Issue #217)
- Added APIs to limit the maximum size of JPEG/PNG images (Issue #224)
- Added support for the Clang/GCC ThreadSanitizer with the `--enable-tsanitizer`
  configure option.
- Added Norwegian Bokmål, Polish, and Turkish localizations.
- Added a password visibility button to the Wi-Fi password field.
- Changed names of PAPPL-specific attributes to use "smi55357" prefix.
- Updated USB device code to generate a 1284 device ID and use the manufacturer
  and product strings when necessary (Issue #234)
- Updated the USB gadget code to handle disconnections.
- Updated PAPPL to conform to the new prototype PWG 5100.13 specification
  (Issue #216)
- Fixed a device race condition with job processing.
- Fixed a initialization timing issue with USB gadgets on newer Linux kernels.
- Fixed a potential memory underflow with USB device IDs.
- Fixed web interface support for vendor text options (Issue #142)
- Fixed a potential value overflow when reading SNMP OIDs (Issue #210)
- Fixed more CUPS 2.2.x compatibility issues (Issue #212)
- Fixed a 100% CPU usage bug when cleaning the job history (Issue #218)
- Fixed the default values of `--with-papplstatedir` and `--with-papplsockdir`
  to use the `localstatedir` value (Issue #219)
- Fixed storage of label offsets for printers that implement them.
- Fixed some thread access issues on ARM.
- Fixed when the kernel USB printer driver is unloaded on Linux (Issue #233)
- Fixed `papplDevicePrintf` to allow the "%c" character to be 0.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.3.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.3.0</a>

