---
title: "Print Dialogs: Make them use the Common Print Dialog Backends (CPDB)"
---

### Introduction

1 contributors full-size (350 hours).

Most print jobs are sent via the print dialog of a desktop application, like evince, Chrome, LibreOffice, DarkTable, … Print dialogs are usually, like “Open …” or “Save as …” dialogs, provided by the GUI toolkits, in most cases GTK or Qt, sometimes applications come also with their own creations, like LibreOffice or Chrome.

Problem here is usually not the design of the dialog itself, most are actually easy to use, but the way how they connect to CUPS (and also to other print technologies) and how well this connection code is maintained and kept up-to-date.

GUI toolkit projects are large projects, often with long release cycles and all with a certain inertia, and there are things which many people are eager to work on, and others, like print dialogs, which have to be there but no one is really motivated to push their development forward and do the needed maintenance work.

An important part of the maintenance of a GUI toolkit is that it interfaces well and correctly with the underlying operating system, graphics, sound, storage, …, and printing! The OS is under continuous development, things are changing all the time, components get replaced by others, printing is CUPS for 22 years, but within CUPS we have also changes, and they need to be taken care of in the print dialogs.

Several years back, CUPS started to create temporary queues for driverless IPP network printers (or remote CUPS printers, which are emulations of IPP printers), which are only physically available when they are accessed (capabilities are polled or job printed). Print dialogs used an old API which did not support this, the temporary queues did not appear in the dialog, a helper daemon, cups-browsed had to convert the temporary queues into physical queues as a workaround. The correct solution had been to change the print dialogs to a newer CUPS API which supports these queues, but no one at the GUI toolkit projects has felt responsible and taken the time for this update for many years. Only recently this got fixed.

This made me introducing the Common Print Dialog Backends (CPDB) back in 2017, a de-coupling of the print technology (CUPS, print-to-file, that time also Google Cloud Print) from the GUI. The GUI projects have to adopt the CPDB support only once and then OpenPrinting (or any upcoming cloud printing projects) takes care of the CPDB backend for the print technologies to be up-to-date with any changes. This way print technology projects can react quickly and are not dependent any more on the GUI toolkit’s inertia.

As far as I know the GTK, Qt, and LibreOffice print dialogs support temporary print queues now (but only recently, there are many old dialog versions around), but now we are at the next challenge as we have to assure that the print dialogs use CUPS APIs which do not handle PPDs on the dialog side, so that if the system switched to PPD-less CUPS 3.x that the dialog continues to work. If we get the dialogs using CPDB, these changes happen (if actually needed) only in the CUPS CPDB backend, not in each print dialog individually.

The contributor's task is to get CPDB into the print dialogs upstream, the UI of them does not need to be changed. Dialogs to be treated are GTK, Qt, (LibreOffice has already CPDB support AFAIR), Chrome, and perhaps others. Also important are backports, as there are many apps based on old toolkit versions around in the distributions (Firefox? Thunderbird?).

For the CPDB integration we do not need UI design work.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), GNOME/GTK developers, Qt developers, TBD
### Desired knowledge
 `C/C++`, GTK or Qt, DNS-SD/Avahi, CUPS/IPP
### Code License
 GPL-2+ and LGPL-2+, Apache 2.0
