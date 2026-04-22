---
title: "Desktop Integration: Update system-config-printer for the New Architecture of printing"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Intermediate

Originally, we already had discontinued the development of system-config-printer and put it into maintenance mode, only fixing bugs and collecting UI translations.

But system-config-printer s still used a lot. There are practically only 3 printer setup tools around: The "Printers" module of GNOME Control Center, the printer manager of KDE Settings, and system-config-printer. There are many more desktop environments than just GNOME and KDE, and distributions using many of those use system-config-printer as their printer setup tool.

For switching distributions into the New Architecture, meaning from CUPS 2.x to CUPS 3.x, the printer setup tool needs to get appropriately adapted, to list IPP print destinations with appropriate configuration options, especially access to their web admin interfaces, and assign Printer Applications to non-driverless printers.

One could also think about dropping the concept of printer setup tools altogether as modern, driverless printers are simply there, but it is not very intuitive for a user to have to find a Printer Application and install it to make a non-driverless printer working and that for driverless printers and Printer Applications there are web admin interfaces and how to access them.

So to assure continued coverage of all desktops we need to revive development of system-config-printer and make it supporting the New Architecture, but as with GNOME Control Center and KDE Settings we also need to keep the old functionality, to allow a switchover to the new CUPS at any time and already while still using CUPS 2.x, have a better support for driverless printers.

And this is the contributor's task in this project.

Note that system-config-printer is written in Python.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
### Desired knowledge
 Python, C, CUPS
### Code License
 GPL-2+ (GPL 2 or any later version)
