---
title: cups-filters 1.28.9 released!
layout: single
author: Till
excerpt: Bug fix release, fixes backported from the master (2.x) branch
---
Bug fix release, fixes backported from the master (2.x) branch.
- libcupsfilters: Silenced compiler warnings
- libcupsfilters: Removed duplicate code in the apply_filters() function.
- driverless: If there are no driverless IPP printers available let "driverless" terminate with exit code 0 and not 1, to follow CUPS' standard of backends in discovery mode terminating with 0 if there are no appropriate printers found (Issue #375).
- gstoraster, foomatic-rip: Fixed Ghostscript command line for counting pages as it took too long on PDFs from evince when printing DjVu files (Issue #354, Pull request #371, Ubuntu bug #1920730).
- cups-browsed: Renamed ldap_connect() due to conflict in new openldap (Issue #367, Pull request #370).
- pdftoraster: Free color data after processing of each page (Pull request #363).
- cups-browsed: Always save "...-default" option entries from printers.conf, regardless of presence or absense of PPD file (Pull request #359).
- cups-browsed: Start after network-online.target (Pull request #360).
- texttopdf: Set default margins when no PPD file is used (Pull request #356).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.9)
