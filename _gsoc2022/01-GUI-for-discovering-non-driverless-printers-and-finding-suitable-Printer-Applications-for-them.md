---
title: "GUI for discovering non-driverless printers and finding suitable Printer Applications for them"
---

### Introduction

1 contributor full-size (350 hours).

Modern printers usually are driverless IPP printers, and those get discovered and set up fully automatically with CUPS, no Printer Application is required for them, so it is easy for users to get up and running with them.

Printers which do not do driverless IPP are either legacy printers, the many older printers which got developed before driverless IPP printing existed, and specialty printers. These need Printer Applications. As there will be several different Printer Applications and each one supporting another set of printers it is not trivial for the user to discover available non-IPP-driverless printers and find out which is the Printer Application to use and whether it is already installed.

So we need some guide for the user. The idea is a GUI tool which lists available, non-IPP-driverless printers, local (USB) and network devices. If the user selects one of them, all installed Printer Applications which support this printer are shown, and for each a button to open the Printer Application's web interface and also a quick auto-add-this-printer button. In addition to the list of suitable Printer Applications there should also be a button which does a fuzzy search for the printer make and model on the Snap Store/the OpenPrinting web site to find Printer Applications which are not installed on the local system. There is already a concept to implement an appropriate [search index on OpenPrinting](https://openprinting.github.io/OpenPrinting-News-November-2021/#printer-querying-on-the-openprinting-web-server) which will be used by this GUI.

The contributor's task is to implement such a tool in GTK, ideally as a module for the GNOME Control Center.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), GNOME/GTK developers, TBD
### Desired knowledge
 `C/C++`, GTK, DNS-SD/Avahi, CUPS/IPP
### Code License
 GPL-2+ and LGPL-2+
