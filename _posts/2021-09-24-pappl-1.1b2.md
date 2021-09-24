---
title: PAPPL 1.1b2
layout: single
author: Mike
excerpt: PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10.
---

The second beta release of PAPPL v1.1 is now available for download.  PAPPL v1.1
adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-
add functionality, improves management of multiple printers, and adds support
for Microsoft® Windows® 10 and higher.

Changes in 1.1b2 include:

- Added support for `papplDeviceGetID` with network devices (Issue #95)
- Added support for the "compression" option.
- Added English names for Tabloid and A3 media sizes in the web interface.
- Added "server-hostname" and "listen-hostname" server options to the default
  mainloop system callback.
- Fixed support for default printers, added indicator in web interface
  (Issue #182)
- Fixed support for printers with spaces in their names.
- Fixed the "jobs" subcommand.
- Fixed support for page-ranges.
- Fixed support for printers that do PDF beyond converting it to raster.
- Fixed support for mainloop subcommands on Windows.
- Fixed error message when Bonjour for Windows is not installed.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.1b2" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.1b2</a>

