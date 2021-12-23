---
title: LPrint 1.1.0
layout: single
author: Mike
excerpt: LPrint v1.1.0 adds support for EPL and 600dpi ZPL label printers, adds several auto-connfiguration and status reporting improvements, and fixes all known bugs in the previous release.
---

LPrint v1.1.0 adds support for EPL and 600dpi ZPL label printers, adds status reporting and automatic label configuration for ZPL label printers, adds auto-setup and test labels for printers, adds system service files for macOS and Linux, and fixes all known bugs in the previous release.  Changes include:

- Switched to PAPPL (Issue #20, #35)
- Fixed `lprint default` and `lprint delete` not working (Issue #17, Issue #40)
- Fixed server crashes on `SIGINT` (Issue #18)
- Fixed the reported date and time information when no printers were added (Issue #26)
- Fixed a startup bug on macOS (Issue #34)
- Now support auto-detection of printer drivers and auto-add USB printers the first time LPrint is run.
- Added the missing macOS binary package (Issue #33)
- Added launchd and systemd service files for running lprint as a service.
- Added support for Zebra/Eltron EPL2 printers (Issue #38)
- Added support for 600dpi ZPL thermal transfer printers.
- Added support for ZPL status/ready media updates.
- Added support for test pages.
- Temporarily removed support for DYMO LabelWriter Wireless printer (Issue #23)

Enjoy!

* <a href="https://github.com/michaelrsweet/lprint/releases/tag/v1.1.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download LPrint 1.1.0</a>
* <a href="https://snapcraft.io/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Install lprint Snap</a>
* <a href="https://www.msweet.org/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-home" aria-hidden="true"></i>Home Page</a>
