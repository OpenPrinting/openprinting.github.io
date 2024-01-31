---
title: LPrint 1.3.0
layout: single
author: Mike
excerpt: LPrint v1.3.0 adds a new dithering algorithm, support for new printers, support for configuration files, and fixes a number of bugs.
---

LPrint v1.3.0 adds a new dithering algorithm, support for new printers, support
for configuration files, and fixes a number of bugs.  Changes include:

- Added new dithering algorithm to better support barcode printing with shaded
  content.
- Added experimental Brother printer support (Issue #15)
- Added basic TSPL printer support (Issue #54)
- Added basic SEIKO printer support (Issue #58)
- Added experimental Zebra CPCL printer support.
- Added support for configuration files in "/etc", "/usr/local/etc", or
  "/Library/Application Support" (macOS).
- Updated ZPL driver to report 'media-needed' reason when out of labels during a
  job.
- Fixed copies support for ZPL printers (Issue #100)
- Fixed darkness calculations for EPL and ZPL printers (Issue #104)

Enjoy!

* <a href="https://github.com/michaelrsweet/lprint/releases/tag/v1.3.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download LPrint 1.3.0</a>
* <a href="https://snapcraft.io/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Install lprint Snap</a>
* <a href="https://www.msweet.org/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-home" aria-hidden="true"></i>Home Page</a>
