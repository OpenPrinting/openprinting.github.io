---
title: "Scanning support in PAPPL"
---

### Introduction

1 contributor full-size (350 hours).

In the Google Summer of Code 2021, Bhavna Kosta has started the work on [Scanning support in PAPPL](https://github.com/Bhavna2020/GSoC-2021) so that [PAPPL](https://github.com/michaelrsweet/pappl/) not only can be used for creating Printer Applications (emulation of a driverless IPP printer) but also for creating Scanner Applications (emulation of a driverless IPP/eSCL scanner), or even an emulation of a driverless IPP multi-function device.

She has created the [needed data structures and API functions](https://github.com/michaelrsweet/pappl/tree/scanning) needed to extend PAPPL for supporting scanners.

Next steps to complete the support are the following:

  * IPP Scan interface: Extend the IPP server of PAPPL to understand IPP Scan requests and respond to them appropriately, so that the application emulates an IPP Scan device
  * eSCL Scan interface: Add an eSCL interface to make the application emulate an eSCL scanner. eSCL is the most common communication protocol for driverless scanning, also used by AirPrint ([Code example](https://github.com/SimulPiscator/AirSane))
  * Create a test scanner driver emulating a scanner withour needing actual scanner hardware
  * Unit tests for both IPP Scan and eSCL interfaces

The contributor's task to implement the above-mentioned components to complete the framework needed by all Scanner Application. With this done, only code for the particular group of scanners to support (scanner driver) needs to be added to PAPPL.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Jai Luthra (luthrajaiji at gmail dot com), Dheeraj Yadav (dhirajyadav135 at gmail dot com), Alexander Pevzner (pzz at apevzner dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
