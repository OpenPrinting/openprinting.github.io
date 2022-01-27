---
title: CUPS 2.4.1
layout: single
author: Zdenek
excerpt: CUPS 2.4.1 is the first bug fix release from 2.4.x series. Among the other bug fixes it fixes sharing default color mode to clients and several memory leaks.
---

CUPS 2.4.1 is the first bug fix release from 2.4.x series. Among the other bug fixes it fixes sharing default color mode to clients and several memory leaks.

Detailed list of changes:

- The default color mode now is now configurable and defaults to the printer's
  reported default mode (Issue #277)
- Configuration script now checks linking for -Wl,-pie flags (Issue #303)
- Fixed memory leaks - in testi18n (Issue #313), in `cups_enum_dests()`
  (Issue #317), in `_cupsEncodeOption()` and `http_tls_upgrade()` (Issue #322)
- Fixed missing bracket in de/index.html (Issue #299)
- Fixed typos in configuration scripts (Issues #304, #316)
- Removed remaining legacy code for `RIP_MAX_CACHE` environment variable
  (Issue #323)
- Removed deprecated directives from cupsctl and cups-files.conf (Issue #300)
- Removed `purge-jobs` legacy code from CGI scripts and templates (Issue #325)

Enjoy! :)
