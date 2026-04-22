---
title: "system-config-printer vs. CUPS 3.x"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

As we have made the "Printers" module of the GNOME Control Center and the KDE Print Manager supporting CUPS 3.x in several GSoC projects we need to do the same for the [system-config-printer](https://github.com/OpenPrinting/system-config-printer). And this is what this project is about.

For the local server of CUPS 3.x the main view does not need to display CUPS queues as defined in `/etc/cups/printers.conf` with PPD files any more but instead, it has to display IPP print destinations (driverless network and IPP-over-USB printers, Printer Applications, shared remote CUPS queues) as on all these we can print, without a CUPS queue needing to be created, because CUPS creates a temporary one when needed. The destinations have to be grouped, when they come from the same device, server, or Printer Application, and the IPP destinations are configured by their admin web interfaces, so we have to add buttons to open these interfaces.

The "Add Printer" dialog will continue to exist, but to list non-driverless (legacy or specialty) printers and assign Printer Applications instead of PPD files to them.

Actually we will only add the new functionality and not remove the old one, meaning displaying both IPP destinations and classic CUPS queues, and in the "Add Printer" part allow for assigning both PPD files and Printer Applications (latter preferred), so that once the new Print Manager in place we can make a smooth transition from CUPS 2.x to CUPS 3.x at any time, and also, CUPS 2.x already supports IPP print destinations without permanent CUPS queue, so also for CUPS 2.x users modern, driverless printers will just appear and they do not try to unnecessarily create queues for them.

As system-config-printer is written in Python, we will use the new Python bindings for [libcups3](https://github.com/OpenPrinting/libcups), as [Soumyadeep Ghosh has created them in GSoC 2025](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-final-submission).

There was already some work on system-config-printer to bring it towards CUPS 3.x in [GSoC 2024](https://github.com/TheJayas/GSoC-2024-Final-Report). This work could perhaps give some inspirations, but here we want system-config-printer use the new pyCUPS now, for optimization and minimization of code duplication.
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Soumyadeep Ghosh, creator of the Python bindings for libcups3 (soumyadeepghosh2004 at zohomail dot in), Zdenek Dohnal, Printing Maintainer at Red Hat (zdohnal at redhat dot com), TBD
### Desired knowledge
 Python, C, CUPS
### Code License
 GPL-2+ (GPL 2 or any later version)
