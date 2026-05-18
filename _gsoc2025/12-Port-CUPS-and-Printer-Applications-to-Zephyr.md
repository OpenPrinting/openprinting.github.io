---
title: "Port CUPS and Printer Applications to Zephyr"
---
### Introduction
Probably many of you have already thought about that one can take an SBC, install Linux and [CUPS](https://openprinting.github.io/cups) or a Printer Application on it, and connect this to an old printer which is still mechanically perfect but needs a driver which is not available any more for some operating systems. Suddenly the printer turns into a modern, driverless IPP printer which can be used with any operating system.

But it is a little awkward having a little box dangling behind the printer which also occupies a power outlet. Also one can perhaps also make use of much cheaper SBC.

Imagine you could buy a tiny board for a few dollars and put it somewhere inside the printer and grab its power from the printer's power supply.

Such tiny boards are often not powerful enough to run Linux, but there is also the much more lightweight [Zephyr](https://www.zephyrproject.org/) operating system. This is a system for IoT applications on low-footprint hardware.

And this scenario does not only serve for cheap DIY solutions to save old printers, it also can be a base for cost-effective printer firmware development.

This project is about investigating whether one could run the components of the free software printing stack, as [CUPS](https://openprinting.github.io/cups), [PAPPL](https://github.com/michaelrsweet/pappl/), [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters), ... under the Zephyr operating system, and actually let this tiny print server execute printer drivers and print on legacy printers. Also the handling of print data and the need of resources here needs to be investigated. Can we hold several pages? Can we use [Ghostscript](https://ghostscript.com/)? Or do we have to stream raster print data from the client to the printer?

Most desirable is to do this with PAPPL (Printer APPlication Library), as it is designed to emulate a driverless IPP printer in software, including the so-called "Gadget" mode to appear as an IPP-over-USB device when connecting the power supply USB port of the SBC with the client computer's USB.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Iuliana Prodan (iuliana dot prodan at nxp dot com), Zephyr developers TBD
### Desired knowledge
 C, Zephyr, USB, network
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
