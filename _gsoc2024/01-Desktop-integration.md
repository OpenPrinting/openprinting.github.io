---
title: "Desktop integration: CPDB support for print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice"
---

### Introduction

1-2 contributors full-size (350 hours), Level of difficulty: Hard

Most print jobs are sent via the print dialog of a desktop application, like evince, Chrome, LibreOffice, DarkTable, … Print dialogs are usually, like “Open …” or “Save as …” dialogs, provided by the GUI toolkits, in most cases GTK or Qt, sometimes applications come also with their own creations, like LibreOffice or Firefox.

Problem here is usually not the design of the dialog itself, most are actually easy to use, but the way how they connect to CUPS (and also to other print technologies) and how well this connection code is maintained and kept up-to-date.

GUI toolkit projects are large projects, often with long release cycles and all with a certain inertia, and there are things which many people are eager to work on, and others, like print dialogs, which have to be there but no one is really motivated to push their development forward and do the needed maintenance work.

An important part of the maintenance of a GUI toolkit is that it interfaces well and correctly with the underlying operating system, graphics, sound, storage, …, and printing! The OS is under continuous development, things are changing all the time, components get replaced by others, printing is CUPS for 23 years, but within CUPS we have also changes, and they need to be taken care of in the print dialogs.

Several years back, CUPS started to create temporary queues for driverless IPP network printers (or remote CUPS printers, which are emulations of IPP printers), which are only physically available when they are accessed (capabilities are polled or job printed). Print dialogs used an old API which did not support this, the temporary queues did not appear in the dialog, a helper daemon, cups-browsed had to convert the temporary queues into physical queues as a workaround. The correct solution had been to change the print dialogs to a newer CUPS API which supports these queues, but no one at the GUI toolkit projects has felt responsible and taken the time for this update for many years. Only recently this got fixed.

This made me introducing the Common Print Dialog Backends (CPDB) back in 2017, a de-coupling of the print technology (CUPS, print-to-file, that time also Google Cloud Print) from the GUI. The GUI projects have to adopt the CPDB support only once and then OpenPrinting (or any upcoming cloud printing projects) takes care of the CPDB backend for the print technologies to be up-to-date with any changes. This way print technology projects can react quickly and are not dependent any more on the GUI toolkit’s inertia.

The print dialogs of the major GUI toolkits, GTK, Qt, got CPDB support added in GSoC 2022, but several applications come with their own creation of a print dialog. AFAIK these are Firefox/Thunderbird (Mozilla), Chromium/Chrome (Google), and LibreOffice. Also these dialogs need to get CPDB support to make CPDB universal.

Then we are especially prepared for the switch to CUPS 3.x which does not support PPD files any more, as the CUPS backend of CPDB is already using only CUPS APIs not handling PPD files. And we are also prepared for IPP infrastructure/cloud printing for which we also want to create a CPDB backend (see below).

The contributor's task is to get CPDB into the print dialogs upstream, the UI of them does not need to be changed. Dialogs to be treated are Mozilla for Firefox and Thunderbird, and also LibreOffice, and any other application-specific dialog if we have missed it by now. For LibreOffice there was already worked on CPDB support back in 2017, but in the meantime things have changed and the dialog needs to get updated, especially for the new features of CPDB 2.x (human-readable strings/translations, option groups, ...).

CPDB support for the print dialog of the Chromium Browser is already done by Kushagra Sharma in GSoC [2023](https://github.com/kushagra20251/GSoC/).

For the CPDB integration we do not need UI design work.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Gaurav Guleria (gaurav dot gen3 at gmail dot com), Firefox/Thunderbird/Mozilla developers, LibreOffice developers, TBD
### Desired knowledge
 `C/C++`, GTK or Qt, DNS-SD/Avahi, CUPS/IPP
### Code License
 MIT, GPL-2+ and LGPL-2+
