---
title: PAPPL 1.1b1
layout: single
author: Mike
excerpt: PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10.
---

The first beta release of PAPPL v1.1 is now available for download.  PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10 and higher.  Changes include:

- Added support for Windows 10 and higher.
- Added `PAPPL_SOPTIONS_NO_TLS` option to disable TLS support.
- Added Wi-Fi callbacks to support configuration over IPP-USB (Issue #45)
- Added buttons and sub-commands to pause and resume printers (Issue #124)
- `papplMainLoop` now uses a persistent location for state and spool files by
  default (Issue #128)
- `papplMainLoop` now supports clients talking to a system-wide server running
  as root (Issue #148)
- Added a "set default" button to the web interface (Issue #150)
- The `drivers` sub-command now reports the IEEE-1284 device ID for a given
  driver (Issue #157)
- Jobs can now be canceled and printers deleted when a processing job is trying
  to connect to a printer (Issue #163)
- The default media is now updated if the ready media for a given tray is
  updated (Issue #164)
- Fixed an issue with the "drivers" sub-command not working if you don't have a
  system callback.
- Fixed a deadlock issue on macOS.
- Added a new `papplJobCreateWithFile` API to allow printer applications to
  submit print jobs internally.
- Refactored the `papplSystem` hostname/port APIs to be consistent with the
  naming used for the `papplClient` APIs.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.1b1" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.1b1</a>

