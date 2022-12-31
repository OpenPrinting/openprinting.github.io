---
title: LPrint 1.2.0
layout: single
author: Mike
excerpt: LPrint v1.2.0 adds support for snap configuration and EPL/ZPL auto-typing support, and fixes a number of bugs.
---

LPrint v1.2.0 adds support for snap configuration and EPL/ZPL auto-typing
support, and fixes a number of bugs.  Changes include:

- Documentation corrections (Issue #53, Issue #76)
- Added snap server configuration.
- Added `--with-systemd` configure option and install to
 `$prefix/lib/systemd/system` by default (Issue #50)
- Added EPL2 and ZPL auto-typing support (Issue #64)
- Changed the default log level for systemd to info (Issue #82)
- Fixed macOS installer to start LPrint server (Issue #48)
- Fixed configure script not using warning/preprocessor options in build
  (Issue #60)
- Fixed printer renaming algorithm to not truncate the name (Issue #60)
- Fixed missing "print-color-mode=bi-level" for bar code printing (Issue #76)
- Fixed label mode support in EPL and ZPL drivers (Issue #79)
- Fixed driver names for EPL printers (Issue #52)

Enjoy!

* <a href="https://github.com/michaelrsweet/lprint/releases/tag/v1.2.0" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download LPrint 1.2.0</a>
* <a href="https://snapcraft.io/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Install lprint Snap</a>
* <a href="https://www.msweet.org/lprint" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-home" aria-hidden="true"></i>Home Page</a>
