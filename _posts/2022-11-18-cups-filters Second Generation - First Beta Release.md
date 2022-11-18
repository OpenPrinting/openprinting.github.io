---
title: cups-filters Second Generation - First Beta Release!
layout: single
author: Till
excerpt: cups-filters is now split into 5 sub-repositories and we have released the first beta of the 2.x series
---
We now finally completed the first beta of the second generation of cups-filters!

The cups-filters project is now split into several parts, similar to CUPS on its transition to the 3.x series. There are the following parts:

- **libcupsfilters:** The central library with the filter functions and some useful functions for printer drivers, human-readable strings and translation handling for IPP attributes, ... It does not contain any support for PPD files.
- **libppd:** PPD file support library providing the complete support for PPD files from libcups (2.x and earlier, see `ppd/ppd.h`), the CUPS PPD compiler and utilities (`ppdc`, see `ppd/ppdc.h`) and functions to convert PPD Options into IPP attributes, to add PPD file support to the filter functions of libcupsfilters, to handle collections of PPD files, ... **This library is only for legacy PPD and driver support, it should not motivate anyone to create new PPD files!**
- **cups-filters:** Legacy CUPS filter/backend executables for CUPS 2.x. Uses both libcupsfilters and libppd. Any `XXXtoYYY` filters, `foomatic-rip`, `driverless`, ...
- **braille-printer-app:** The Braille embosser driver code plus Chandresh Soni's [GSoC](https://gist.github.com/Chandresh2702/73923b2c686039404cdd9b050edbe995) work to turn this code into a Printer Application.
- **cups-browsed:** Daemon to automatically create local print queues for network printers and remote CUPS queues and to create printer clusters. Will be turned into a Printer Application later (GSoC project?).

libcupsfilters is completely free of PPD file support, same for braille-printer-app. libcupsfilters can be used for all kinds of Printer Applications and wherever print data or scanned data has to get converted. The Braille Printer Application is a native Printer Application, it does not use PPD files internally.

libppd contains the complete PPD file support for Printer Applications which retro-fit PostSctipt PPD files or classic CUPS drivers. These Printer Applications are usually created based on [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit). Distributions using the New Architecture for printing and scanning will not install libppd by default, as it is not needed any more.

cups-filters provides the filter executables needed by CUPS 2.x or earlier. Most executables are just simple wrappers and all the internal workings have moved into the filter functions in libcupsfilters, and the PPD file support into libppd. This package requires libppd, but it is for PPD-based classic CUPS versions only anyway.

cups-browsed is currently supporting and generating PPD files (for CUPS 2.x), and therefore also depending on libppd. In a later version, when it is turned into a Printer Application, the PPD file support will be removed.

An important goal of the separation is to put all PPD support in their own project so that they can get discontinued later and this way we can easily stop maintaining the PPD file support code while all the other useful code of the former cups-filters will live on.

- **libcupsfilters: [More Details and Download](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/libcupsfilters/discussions/1)**
- **libppd: [More Details and Download](https://github.com/OpenPrinting/libppd/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/libppd/discussions/1)**
- **cups-filters: [More Details and Download](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/cups-filters/discussions/491)**
- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0b1), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/1)**

Note that [braille-printer-app](https://github.com/OpenPrinting/braille-printer-app) will only be released once the conversion to a Printer Application got committed.
