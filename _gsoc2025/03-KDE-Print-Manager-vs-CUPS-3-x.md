---
title: "KDE Print Manager vs. CUPS 3.x"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

As we have made the "Printers" module of the GNOME Control Center supporting CUPS 3.x in several GSoC projects we need to do the same for the [KDE Print Manger](https://invent.kde.org/plasma/print-manager/). And this is what this project is about.

For the local server of CUPS 3.x the main view does not need to display CUPS queues as defined in `/etc/cups/printers.conf` with PPD files any more but instead, it has to display IPP print destinations (driverless network and IPP-over-USB printers, Printer Applications, shared remote CUPS queues) as on all these we can print, without a CUPS queue needing to be created, as CUPS creates a temporary one when needed. The destinations have to be grouped, when they come from the same device, server, or Printer Application, and the IPP destinations are configured by their admin web interfaces, so we have to add buttons to open these interfaces.

The "Add Printer" dialog will continue to exist, but to list non-driverless (legacy or specialty) printers and assign Printer Applications instead of PPD files to them.

Actually we will only add the new functionality and not remove the old one, meaning displaying both IPP destinations and classic CUPS queues, and in the "Add Printer" part allow for assigning both PPD files and Printer Applications (latter preferred), so that once the new Print Manager in place we can make a smooth transition from CUPS 2.x to CUPS 3.x at any time, and also, CUPS 2.x already supports IPP print destinations without permanent CUPS queue, so also for CUPS 2.x users modern, driverless printers will just appear and they do not try to unecessarily create queues for them.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Mike Noe (noeerover at gmail dot com), KDE developers, TBD
### Desired knowledge
 `C/C++`, KDE/Qt, UI Design
### Code License
 GPL 2.0 or later and LGPL 2.0 or later
