---
title: "Adding support for new IPP Everywhere 2.x functionality/attributes to libcupsfilters and CPDB"
---

### Introduction

1-2 contributors full-size (350 hours).

Driverless IPP printing is implemented with four, very similar standards, IPP Everywhere, AirPrint, Mopria, and Wi-Fi Direct Print. Most [printers](https://openprinting.github.io/printers/) qualify to be driverless as the support [Apple's Airprint](https://support.apple.com/en-us/HT201311), the standard which got widely used first, to allow printing from iPhones and other iOS devices, but IPP Everywhere from the Printer Working Group is the first free and open standard.

IPP Everywhere is under continuous development. The current version printers are certified on is 1.1, but 2.0 is close to its release. It adds new attributes to cover the most recent printers.

The software provided on OpenPrinting is all based on IPP Everywhere 1.x and to make use of printer features covered by the new version of the standard it needs to get updated.

The contributor's task is to add the new features according to the new specifications and to update everything to conform with [IPP Everywhere 2.0](https://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippeve20-20221107.pdf), [IPP Driver Replacement Extensions v2.0](https://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippnodriver20-20221027.pdf), and [IPP Job Extensions v2.1](https://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippjobext21-20221212.pdf). Especially the libcupsfilters and CPDB must "understand" the new attributes and choices, libcupsfilters needs to implement the new attribute's functionality, and CPDB to carry through the new attributes to the print dialogs.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Ira McDonald (blueroofmusic at gmail dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
