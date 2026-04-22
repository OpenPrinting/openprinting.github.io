---
title: "Port pyCUPS to CUPS 3.x API + apply the new pyCUPS to system-config-printer"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Intermediate

Most software with print functionality or print administration functionality uses the CUPS library (libcups, [2.x](https://github.com/OpenPrinting/cups/), [3.x](https://github.com/OpenPrinting/libcups/)) to communicate with CUPS. This is easy when the software is written in C or `C++` as the library is written in C.

If the software is written in other languages, we need some connection between the library and the client code, the so-called bindings. For Python we have bindings for libcups, [pyCUPS](https://github.com/OpenPrinting/pycups). This works well with libcups 2.x already for years. [system-config-printer](https://github.com/OpenPrinting/system-config-printer) is principal user of pyCUPS.

What we need now is to extend pyCUPS for the use with [libcups 3.x](https://github.com/OpenPrinting/libcups/) of the new [CUPS 3.x](https://openprinting.github.io/cups/cups3.html), so that pyCUPS will live on and continue to allow writing software which interacts with CUPS in Python.

The contributor's task is to go through the APIs of libcups3 and compare them with libcups2 to see what has to be added. If there is a way to automate the creation of Python bindings, it can be used and old (libcups2) and new (libcups3) has to be merged, so that pyCUPS can be used for any version of libcups.

It should be also taken into account that libcups2 of CUPS 2.5.x got some functions of libcups3 backported.

system-config-printer was already updated for CUPS 3.x in [last year's GSoC](https://github.com/TheJayas/GSoC-2024-Final-Report). Here we want system-config-printer use the new pyCUPS now, for optimization and minimization of code duplication.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Zdenek Dohnal, Printing Maintainer at Red Hat (zdohnal at redhat dot com), TBD
### Desired knowledge
 Python, C, CUPS
### Code License
 GPL-2+ (GPL 2 or any later version)
