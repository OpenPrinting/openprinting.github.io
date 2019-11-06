---
title: OpenPrinting News - November 2019
layout: single
author: Till
excerpt: The Linux Foundation applied for Google Code-In 2019 but did not get selected, future work of OpenPrinting should concentrate in Printer/Scanner Applications and IPP System Service, CUPS 2.3.x in Ubuntu 20.04 LTS (Focal Fossa), cups-filters 1.25.11, for ippusbxd David Valleau will look into allowing classic USB access in parallel
---

## Google Code-In 2019
Aveek Basu and Till Kamppeter have conducted an application for the Linux Foundation as mentoring organization in the [Google Code-In 2019](https://codein.withgoogle.com/). A [web page](https://wiki.linuxfoundation.org/gsoc/google-code-in-2019) got set up for the application, containing sample tasks of several work groups of the Linux Foundation, including many of OpenPrinting. The web page will stay available as a start for an application next year.
We try to find out why we did not get selected but have no results yet.

## Google Summer of Code 2019
Till Kamppeter and Aveek Basu have attended the Mentor Summit in Munich on October 17-20, 2019. They have presented a lightning talk about the success of the students working for OpenPrinting and also a held a session to discuss current OpenPrinting work.

## Google Summer of Code 2020
We need to start with the student selection process soon, so that we can let them do assignments to compensate for the missed Google Code-In opportunity.

## Future work of OpenPrinting: Printer/Scanner Applications and IPP System Service
We need to concentrate on Printer/Scanner Applications and IPP System Service from know on. This is urgently needed as Michael Sweet (Apple?) plans to drop PPD file support in CUPS 2.4.x (next cycle, ~1 year from now), at least according to the warning message which one gets from `lpadmin` when one creates a print queue with PPD file (`-P` or `-m` option, except `-m everywhere`).
This is a substantial change in the printing architecture on Posix-style operating systems.
Especially we need to create libraries to allow easy creation of Printer/Scanner Applications. They should provide:
- Acquisition of a port on localhost (or on all network interfaces for sharing). Managing the port numbers in a useful way.
- DNS-SD advertising of the services (printer, scanner, fax, config interfaces, ...)
- IPP server: Answering all types of requests and calling functions to do the needed interactions with the printer and the application-internal printer capability data.
- Processing and filtering the incoming job data: Printer Applications will take PDF and raster formats as input and convert to the printer's native format. Functionality of the filters in cups-filters should be moved into a library, to be available as API functions.
- Communication with printers and scanners, functionality of the CUPS backends.
- IPP System Service as a server, to allow configuration of the Printer/Scanner Application via an external GUI (IPP System Service client). Then there can even be a Printer Application for a legacy printer which cannot be auto-discovered in the network. The application starts only providing IPP System Service. As soon as the user has entered the printer's IP address via the configuration interface, the application connects to the printer and starts to offer IPP print service.
- Perhaps also a web server for legacy clients. Then commodity functions of the library for building up a configuration interface should add each interface element to both the IPP System Service server and the web server.
- IPP System Service as a client, for GUI (and also CLI) apps to configure IPP printers and also Printer/Scanner Applications. This will be a central part of printer setup tools in the future.

For testing this we should create a native Printer Application from Gutenprint for example, or one for PostScript printers for which we have PPD files.

Additional things to do:
- Turn cups-browsed into a Printer Application: Instead of creating a local CUPS queue for a printer cluster emulate an IPP printer which prints to the cluster (and local CUPS picks it up automatically, but how to prevent local CUPS from seeing the member printers directly?). We can also pick up legacy CUPS broadcasts (or BrowsePoll from legacy servers) and provide these printers as IPP printers. Configuration of cups-browsed then also via IPP System Service.
- Overtake PPD support API functions and pstops filter as soon as they get dropped from CUPS, for legacy support in Printer Aplications and cups-browsed.

## Avahi local service support
No further progress this month.
We urgently need the localhost support for the Printer/Scanner Applications, as PPD support will go away within a year.

## OpenPrinting web site
We need to go through the new site now and look for things which are still missing or need improving. Please report any issue [here](https://github.com/OpenPrinting/openprinting.github.io/issues).

## CUPS

No further release.

The development cycle of Ubuntu 20.04 LTS (Focal Fossa) has started and CUPS 2.3.0 is now synced into Ubuntu from Debian, meaning that 20.04 will be released with CUPS 2.3.x.
The `lpadmin` command issues a warning message telling that PPD support will get removed in the next CUPS cycle (2.4.x) when one creates a print queue with PPD file (`-P` or `-m` option, except `-m everywhere`). Therefore we need to get Printer Applications working by then.

## cups-filters

Currently released is 1.25.11.

Many releases happened during the short time to get bug fixes into Ubuntu 19.10 (Eoan), which was released on Thu, Oct 17.
The upcomimg 1.25.12 release contains many fixes on the pdftops filter, especially to solve problems with grayscale jobs when Poppler is used as PDF renderer. These jobs print now reliably but can come out in color on color printers. To assure that grayscale printing on color PostScript printers works correctly, use Ghostscript or MuPDF (these are able to convert color to grayscale). See [Issue #169](https://github.com/OpenPrinting/cups-filters/issues/169). 1.25.12 also builds with no compiler warnings now (tested on Ubuntu 19.10).

1.25.11:

Bug fix release for cups-browsed working correctly with legacy (IPP 1.1) remote printers

1.25.10:

Bug fix release for a bug making cups-browsed crash

1.25.9:

Important bug fix release, fixes infinite recursion in cups-browsed! DO NOT use 1.25.8!

1.25.8:

Bug fix release, especially to solve problems with cups-browsed connecting to older IPP printers/servers and for compatibility with Ghostscript 9.27+

```
CHANGES IN V1.25.12

	- libcupsfilters, beh, implicitclass, foomatic-rip,
	  imagetopdf, mupdftoraster, pdftops, sys5ippprinter,
	  cups-browsed, driverless: Silenced all compiler warnings to
	  make the build process of cups-filters completely free of
	  warnings.
	- pdftops: Fixed crash when using filter without PPD file.
	- pdftops: If printing grayscale jobs with Ghostscript as PDF
	  renderer, add "-sProcessColorModel=DeviceGray" to
	  Ghostscript command line.
	- pdftops: Do not use the ugly "pdftops -level1 ..."
	  workaround to get grayscale PostScript output from
	  Poppler. It leads to huge output files with Poppler's
	  "pdftops" utility and does not work at all with
	  "pdftocairo".  Poppler itself does not support PostScript
	  output converted to grayscale. Issue a warning with the hint
	  to use Ghostscript or MuPDF as PDF renderer (Issue #169).
	- libcupsfilters: In the cupsRasterParseIPPOptions()
	  accept also "Mono", "Monochrome", and "Gray" as color
	  space names.

CHANGES IN V1.25.11

	- cups-browsed: Really accept entries without printer name
	  reported on a job status request (Issue #163).
	- cups-browsed: Strip IPP attribute values reported by the
	  printer on a get-printer-attributes request from white
	  space (Pull request #166).

CHANGES IN V1.25.10

	- libcupsfilters: Added NULL checks when handling page size
	  names as some of the page sizes in CUPS' PWG media list have
	  a NULL PPD name (Ubuntu bug #1847488).

CHANGES IN V1.25.9

	- cups-browsed: Fix leaks in get_printer_attributes() function.
	- cups-browsed: Avoid infinite recursion on IPP 1.1 fallback.

CHANGES IN V1.25.8

	- cups-browsed: On a job status request accept also entries
	  without the printer name being reported (Issue #163).
	- cups-browsed: Fall back to IPP 1.1 if a
	  get-printer-attributes IPP request with IPP 2.x fails (Issue
	  #124, Issue #163).
	- gstoraster: Use ".setfilladjust2" instead of the
	  undocumented ".setfilladjust" PostScript command for
	  Center-of-Pixel method to fill paths (Issue #164).
```

## ippusbxd
David Valleau from Chrome OS/Google cotributed some minor fixes. Thanks to him for this contribution.
An important problem of ippusbxd is that while it is running, the printer is exclusively accessible via IPP-over-USB. Classic USB access in parallel (or at least when there is no ongoing IPP communication) is not possible. This makes the use of ippusbxd on multi-function devices awkward, as IPP-over-USB currently only works with printing and not with scanning, due to the fact that manufacturers did not adopt the driverless IPP scanning standard of the [PWG](http://www.pwg.org/) yet ([Issue #9](https://github.com/OpenPrinting/ippusbxd/issues/9)). David Valleau will look into implementing this.
