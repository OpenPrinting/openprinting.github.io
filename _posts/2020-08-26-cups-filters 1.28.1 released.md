---
title: cups-filters 1.28.1 released!
layout: single
author: Till
excerpt: Bug fix release to fix several bugs in the new IPP Fax Out support by the "driverless" utility and also to fix some minor issues
---
Bug fix release to fix several bugs in the new IPP Fax Out support by the "driverless" utility and also to fix some minor issues
- COPYING: Fixed several typos
- libcupsfilters: Fixed typo in log message of get_printer_attributes functions.
- cups-browsed: Fixed typos in configuration file and man page
- libcupsfilters: Let the PPD generator not suffix page size names with ".Borderless" if all page sizes would get this suffix, for example for printers which generally print borderless.
- libcupsfilters: Added "faxPrefix" option for generated IPP Fax Out PPDs, so that this option also appears in print dialogs.
- driverless: List addresses for local services correctly when using "--std-ipp-uris" (with "localhost" hostname).
- driverless: Make calls of the ippfind utility somewhat faster, setting the timeout of ippfind to automatic.
- libcupsfilters: Resolve DNS-SD-based URIs for local services correctly (using hostname "localhost").
- libcupsfilters: In get_printer_attributes() functions do not try to convert URIs which are not DNS-SD-based (Issue #294).
- libcupsfilters: In get_printer_attributes() functions also support URIs with "dnssd://..." scheme.
- libcupsfilters: Moved signal handling back into main function of the get_printer_attributes() variants, it got moved out accidentally.
- driverless: For generating a PPD, independent whether via "driverless URI" or "driverless cat URI", always allow CUPS driver URIs (prefixed with "driverless: " or "driverless-fax:") and pure IPP URIs.
- driverless: Accept clean IPP URIs also for 'driverless cat ...' (Issue #295, Pull request #296).
- driverless-fax: Do not use fixed path for call of driverless itself (Pull request #293).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.1)
