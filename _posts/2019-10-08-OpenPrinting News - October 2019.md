---
title: OpenPrinting News - October 2019
layout: single
author: Till
excerpt: Linux Plumber's Conference 2019 with OpenPrinting Micro-Conference, first project ideas for Google Summer of Code 2020, Gutenprint as native Printer Application, Avahi local service support continued, OpenPrinting web site switched over to the new design, cups-filters 1.25.7
---

## Linux Plumber's Conference 2019

Till Kamppeter, Aveek Basu, and Rithvik Patibandla have held an OpenPrinting Micro-Conference on this year's Plumber's which has taken place in Lisbon, Portugal.

Here we have discussed the current work of OpenPrinting:

- Driverless IPP Printing
- Driverless IPP Scanning
- Common Print Dialog Backends
- Printer (Scanner) Applications replacing current drivers
- Future of Printer Setup Tools
- 3D Printing

Unfortunately, we did not get many visitors in our conference room (Plumber's is very kernel-oriented), but Jake Edge wrote an [excellent article on LWN](https://lwn.net/SubscriberLink/798916/300a5c0bc4caa815/).

Thanks to Kate Stewart and Jeff Licquia for inviting us.


## Google Summer of Code 2019

Till Kamppeter and Aveek Basu will attend the Mentor Summit in Munich next week. We are looking into giving a lightning talk there.


## Google Summer of Code 2020

With the standards work of the [PWG](http://www.pwg.org/) and after our discussion on the Linux Plumber's Conference, first ideas for next year's Google Summer of Code have come up:

- SANE driver for existing SANE-using apps to be able to access driverless IPP scanners (including Scanner Applications)
- Scanner Application Framework, to make Scanner Applications from SANE drivers
- Extend Printer Application Framework from a converter for legacy drivers to a general Printer/Scanner Application SDK, including direct, PPD-less printer applications, IPP System Service, web interface, C API library, ...
- Make a Gutenprint Printer Application but without PPDs and without Dheeraj's legacy printer driver converter, use only libgutenprint to get the printer capabilities. A built-in web admin interface could allow configurability.
- Turn cups-browsed into a Printer Application: Instead of creating a local CUPS queue for a printer cluster emulate an IPP printer which prints to the cluster (and local CUPS picks it up automatically, but how to prevent local CUPS from seeing the member printers directly). Can also pick up legacy CUPS broadcasts (or BrowsePoll from legacy servers) and provide these printers as IPP printers.

Any further project ideas for the next GSoC are welcome.


## Gutenprint as Printer Application

The developers of the Gutenprint printer driver suite started to discuss the development of a Gutenprint Printer Application to replace their current, classic printer drivers.

The discussion is on the [Gutenprint developer mailing list](https://lists.sourceforge.net/lists/listinfo/gimp-print-devel) in [this thread](https://sourceforge.net/p/gimp-print/mailman/gimp-print-devel/thread/20190925140150.GB15422%40shaftnet.org/#msg36771277). The link will lead you to the message which started the discussion, go down the thread for the further messages.


## Avahi local service support

Trent Lloyd had some time again and promised to get the [localhost support issue](https://github.com/lathiat/avahi/issues/125) solved soon. He has answered on [my pull request](https://github.com/lathiat/avahi/pull/161) mid-September. He has even bought an IPP-over-USB printer for doing further work, but since then no futher reaction.


## OpenPrinting web site

After updating the web app for the [printer/driver database](http://www.openprinting.org/printers) for the new web site and the new OpenPrinting logo we have finally switched www.openprinting.org over to the new web site design!

From now on the monthly news (like this page) and news items in general will be posted under "News & Events".


## CUPS

No further release.


## cups-filters

Currently released is 1.25.7.

Many releases happened during the short time to get bug fixes into the upcoming Ubuntu 19.10 (Eoan), to be released on Thu, Oct 17.

1.25.7:

Bug fix release, fixing several crashes, pdftoraster not working with monochrome jobs, printing to clusters.

1.25.6:

Bug fix release which especially fixes a bug when printing into a cluster but also soives other minor issues.

1.25.5:

Bug fix release, mainly for cups-browsed not to die on left over locally generated queues of unclaen shutdown of the previous session.

```
CHANGES IN V1.25.7

	- implicitclass, libcupsfilters: Fixes to solve an assertion
	  error and printing to an Apple Raster printer (Issue #162,
	  Ubuntu bug #1845286, Ubuntu bug #1845548).
	- cups-browsed: Do not try to resolve the network interface
	  name on Avahi messages which are not interface-related (like
	  "All for now"or "Cache exhausted", Issue #163).
	- Build system: The helper script ln-srf to build on systems
	  with old ln was not included in the release tarballs (Issue
	  #161).
	- pdftoraster: Fixed some bugs in output bitmap generation (
	  writePageImage() function): Segfault on output of
	  up-side-down pages (back side when printing duplex on some
	  printers), margin offsets not taken into account on
	  monochrome jobs, CUPS_CSPACE_W color space not recognized as
	  monochrome (Ubuntu bug #1845286).

CHANGES IN V1.25.6

	- implicitclass: Make sure the destination printer gets always
	  set and do not pass on the cups-browsed-dest-printer when
	  sending the job to the final destination (Issue #152, Pull
	  request #159).
	- Build system: Support old ln versions without the -r option
	  (Pull request #154, #157).
	- texttotext: Link with libiconv if needed (Pull request
	  #155, #158).
	- foomatic-rip: Fix argument representation for raw queue
	  debug mesaage (Pull request #153).

CHANGES IN V1.25.5

	- bannertopdf: Added missing "#include <cstring>" to pdf.cxx
	  so that bannertopdf correctly builds with QPDF 9.0.0 (Issue
	  #134, Issue #151, Gentoo bug #693498).
	- rastertopdf: Let the getIPPColorProfileName() function not
	  return a pointer to a local variable (clang warning, Issue
	  #150).
	- cups-browsed: If a locally generated queue (usually with
          "implicitclass://..." URI) left over from a previous
          (crashed) session is picked up on startup, do not set the
          URI as the remote printer's URI and do not cause a fatal
          error on a failed get-printer-attributes IPP request (Issue
          #148, Debian bug #939316).
	- pdftopdf: Do not preserve encryption, since the output
          already goes into the printer (Issue #146, Pull request
          #147).
```

## ippusbxd

No further news.
