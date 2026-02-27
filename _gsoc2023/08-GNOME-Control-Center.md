---
title: "GNOME Control Center: List and handle IPP print services for the New Architecture"
---

### Introduction

1 contributor full-size (350 hours).

Modern printers usually are driverless IPP printers, and those get discovered fully automatically by CUPS, no CUPS queue needs to get explicitly created. Same for remote CUPS printers and also Printer Applications (new format for drivers for non-driverless specialty and legacy printers). They get all discovered as IPP print services.

This means that a printer setup tool does not need to display CUPS queues any more, but instead, IPP print services, each of them being a possible destination for print jobs.

And listings of IPP print services have different requirements: One server can have more than one individual print services and these should get listed together. This could be a print queue and a fax out queue of the same multi-function printer, or two physical legacy printers supported by one Printer Application. Also the user interaction coupled to each listing is different. We do not need to configure PPD option settings, but instead, we need access to the IPP service's web administration interface and also to an IPP System Service configuration panel by a simple mouse click.

Several parts of this got already coded in previous GSoCs, but we need to get everything smoothly integrated in the "Printers" part of the GNOME Control Center, and this is the contributors task here. They will work together with the upstream maintainer of the "Printers" module, Marek Kasik and also with the UI/UX design teams of GNOME and of Canonical.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Mare Kasik (mkasik at redhat dot com), further GNOME/GTK developers TBD
### Desired knowledge
 `C/C++`, GTK, DNS-SD/Avahi, CUPS/IPP
### Code License
 GPL-2+ and LGPL-2+
