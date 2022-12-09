---
title: pappl-retrofit - First Beta Release!
layout: single
author: Till
excerpt: pappl-retrofit 1.0b1 - Library for converting classic CUPS drivers/PPD files into Printer Applications
---
This is the first beta release of the upcoming pappl-retrofit 1.0.0.

This is a library to convert classic CUPS drivers, consisting of PPD files, CUPS filters, and sometimes also CUPS backends, into Printer Applications, the new format of printer drivers, mainly for CUPS 3.x which goes all-IPP and does not support the PPD/filter concept for printer drivers any more. Printer Applications are emulations of driverless IPP printers which on their other end pass on the jobs to the actual printer.

pappl-retrofit uses [PAPPL](https://github.com/michaelrsweet/pappl), library for Printer Applications, as its base, and so it does not need to care of the general functionality of Printer Applications. So it only contains the code to adapt classic CUPS drivers and PPD files into the Printer Application framework.

To support as many classic drivers as possible pappl-retrofit supports all kinds of PPD files, with and without specification of a CUPS filter, installable accessory settings, CUPS extension for custom option values, `*.drv` PPD compiler files, PPD-file-generating executables, CUPS filters, CUPS backends, side and back channels for filter/backend communication, pre-filtering from the driverless-IPP-standard input formats to the input formats of the driver filters.

pappl-retrofit also comes with the Legacy Printer Application, which when it is classically (not as Snap or other container) installed sees all classically installed CUPS drivers on the system and maps them into its IPP printer emulation, so that CUPS 3.x can make use of all these drivers. This way the user does not loose their old printer drivers on the transition to CUPS 3.x, which is especially important for (often proprietary) drivers from printer manufacturers.

As this library was developed along with the 4 retro-fitting Printer Applications for [PostScript](https://github.com/OpenPrinting/ps-printer-app), [Ghostscript](https://github.com/OpenPrinting/ghostscript-printer-app), [HPLIP](https://github.com/OpenPrinting/hplip-printer-app), and [Gutenprint](https://github.com/OpenPrinting/gutenprint-printer-app) as the base for them, it has grown with these applications and contains all functionality they need. It has also grown with PAPPL, getting support for PAPPL's newest features.

So we are not releasing now because we completed a pre-planned feature list but rather to have releases of this package and the Printer Applications for their easier adoption into Linux distributions. With this we will also version the Printer Application Snaps in the Snap Store, so that when distributions adopt them as their default printer drivers, they can also better manage their customer support.

Feature-wise we are even not 100% complete. We will still add ink level read-out from the printer (SNMP-based network printers, same as supported by CUPS) and internationalization, but this will not cause any compatibility-breaking API changes.

[**More Details and Download**](https://github.com/OpenPrinting/pappl-retrofit/releases/tag/1.0b1)

[**GitHub Discussion**](https://github.com/OpenPrinting/pappl-retrofit/discussions/4)
