---
title: "Scanning support in PAPPL"
---

### Introduction

1 contributor full-size (350 hours).

In the Google Summer of Code 2021, Bhavna Kosta has started the work on [Scanning support in PAPPL](https://github.com/Bhavna2020/GSoC-2021) (Talk on OpenPrinting micro-conference 2021: [Slides](https://linuxplumbersconf.org/event/11/contributions/1029/attachments/785/1474/Scanning%20in%20PAPPL.pdf), [Video](https://youtu.be/5KogjLb1Hb4?t=15600)) so that [PAPPL](https://github.com/michaelrsweet/pappl/) not only can be used for creating Printer Applications (emulation of a driverless IPP printer) but also for creating Scanner Applications (emulation of a driverless eSCL scanner), or even an emulation of a driverless IPP multi-function device.

She has created the [needed data structures and API functions](https://github.com/michaelrsweet/pappl/tree/scanning) needed to extend PAPPL for supporting scanners.

After that, in the Google Summer of Code 2022, Rishabh Maheshwari has then [implemented an eSCL parser](https://gist.github.com/Rishabh-792/b1a2960b7e0e3d2bd3a5f4db3d260fc0) so that Scanner Applications emulate eSCL scanners, the standard protocol which the hardware industry uses for driverless scanning.

Next steps to complete the support are the following:

  * Implementation of the PAPPL internal functionality, integration of the eSCL interpreter code, response to the eSCL inquires, interface for callback functions with the actual scanner driver code, ...
  * Create a test scanner driver emulating a scanner without needing actual scanner hardware, for example serving out static images from a directory.
  * A retro-fit SANE interface to be added to the [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/) project (similar to [AirSANE](https://github.com/SimulPiscator/AirSane)), so that all already existing scanner drivers could be converted to Scanner Applications and this way scanning for clients distributed in sandboxed packages (like Snap) or on all-Snap OS distributions is assured.
  * Unit tests
  * Documentation

The contributor's task to implement the above-mentioned components to complete the framework needed by all Scanner Applications. With this done, only code for the particular group of scanners to support (scanner driver) needs to be added to PAPPL.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Rishabh Maheshwari (rishphalod7 at gmail dot com), Deepak Patankar (patankardeepak04 at gmail dot com)
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
