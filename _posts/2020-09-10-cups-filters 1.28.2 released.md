---
title: cups-filters 1.28.2 released!
layout: single
author: Till
excerpt: Bug fix release to mainly fix cups-browsed not shutting down and the driverless utility being slow when listing available printers/faxes
---
Bug fix release to mainly fix cups-browsed not shutting down and the driverless utility being slow when listing available printers/faxes
- driverless: Free allocated memory, use MAX_OUTPUT_LEN (Pull request #304).
- driverless: driverless: Make the two ippfind tasks(for IPP and IPPS) run in parallel (Pull request #302, #305, #306).
- braille: Support new liblouis tables not containing a display name (Pull request #303)
- Build system: Let ./configure not error out when there is more than one DejaVuSans.ttf test font candidate (Issue #300).
- cups-browsed: Crash when a remote printer set as default gets removed, due to missing variable in printf() call (Issue #299).
- libcupsfilters: Removed all signal handling and global variables from get_printer_attributes() and ippfind_based_uri_converter(). This is overkill for these quick operations and causes problems when shutting down cups-browsed (Issue #298).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.2)
