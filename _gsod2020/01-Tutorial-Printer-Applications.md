---
title: "Tutorial and Design Guidelines for Printer/Scanner drivers in Printer Applications"
---

### Introduction
<p>
Classic printer drivers consisting of printer-specific filters and PPD (Postscript Printer Description, describes printer capabilities and which filters to call) files which has to be dropped in certain directories of the file system are replaced by so-called Printer Applications, emulation of an IPP network printer.
</p>

<p>
Physical IPP network printers work driverless, meaning that a client can poll the printer's capabilities from the printer and then knows how to print on it. The Printer Application as an emulator of an IPP printer contains the software to print incoming jobs on the printer(s) it supports, converting the data to the printer's native language, and it provides the info about the printer's capabilities to clients on request. The Printer Application even has a web administration interface, like an actual network printer.
</p>

<p>
This has two major advantages: First, the ancient concept of PPD files coming from PostScript printers is discontinued. We were already hitting the limits of it a lot with modern printers. In addition, by coupling the CUPS system and the printer driver by an IP connection instead of dropping files into the CUPS system, both the CUPS system and the Printer Appplication can be in separate sandboxed packages (Snap, flatpak, …).
</p>

<p>
Also scanner drivers can be handled this way. Instead of dropping a SANE driver (a shared library) into the appropriate directory of the system, we emulate an IPP scanner, so we have a Scanner Application, and only one application is needed to fully support a multi-function device with print, scan, and fax capabilities.
</p>

<p>
This is the format for printer and scanner drivers of the future, and to make it easy for hardware manufacturers to design drivers this way we want to have a tutorial with design guidelines for drivers. And this is the task of this project.
</p>

<p>
The base for creating such Printer/Scanner Applications is <a href="https://github.com/michaelrsweet/pappl">PAPPL</a>, a library providing most functionality for this, but also <a href="https://github.com/OpenPrinting/cups-filters">cups-filters</a> contains code to be used for Printer Applications. The concept is still under development, mainly in this year's <a href="https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects">Google Summer of Code</a>, but on September 14, when the documentation writing period starts, the coding period of GSoC has already ended and this is when we need the tutorial.
</p>
### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS/LPrint/PAPPL and original creator of Gutenprint (msweet at msweet dot org), Ira McDonald, OpenPrinting (blueroofmusic at gmail dot com), Smith Kennedy, HP (smith kennedy at hp dot com), Dheeraj Yadav (dhirajyadav135 at gmail dot com), Sahil Arora (sahilarora dot 535 at gmail dot com)
</p>

### Desired Knowledge
<p>
C and Jekyll
</p>

### Code License
<p>
<abbr title="GNU General Public License">GPL</abbr> 2+ or <abbr title="GNU Lesser General Public License">LGPL</abbr> 2+
</p>
