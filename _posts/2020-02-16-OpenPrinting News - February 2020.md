---
title: OpenPrinting News - February 2020
layout: single
author: Till
excerpt: OpenPrinting on LF Member Summit 2020, GSoC 2020 preliminary mentors, Avahi localhost support finally accepted, projects moved to OpenPrinting GitHub, driverless scanning, cups-filters 1.27.1 released, IPP-over-USB improvements
---
## We will be presenting on the Linux Foundation Member Summit 2020!
The talk proposal by Aveek Basu and me, "Revitalizing an Open Source Community - Nurturing the New Contributors to Carry on the Baton" got accepted for the [Linux Foundation Member Summit 2020](https://events.linuxfoundation.org/lf-member-summit/), Lake Tahoe, California.

It will get presented [on Wednesday, March 11, 2020, 11:50am local time](https://events.linuxfoundation.org/lf-member-summit/program/schedule/).

Abstract:

>As a matter of fact, there are many technologies and Open Source software that the world uses daily without valuing the need for the same. As a result, contributors feel it to be less lucrative to work on these projects since these are very less talked about topics. One such classic example is printing. Even though we know that however digitized we may be, we can not live without printing but on the technological front there are very few contributors in this space.
>
>This session is to talk about how we can nurture potential candidates when they are in their schools, train and develop them to make them efficient contributors for carrying the baton forward.
>
>Open Source is not only about great technical contributions. Leadership and people management is also an important aspect to make and bond a community together. Forming and building the community is very essential for the long term sustainability of an Open Source Organisation.

## Google Summer of Code 2020
The application period for mentoring organizations has ended on Feb 5 and we are now waiting for whether the Linux Foundation will get accepted as mentoring organization. The publication of the accepted organizations will occur on Feb 20.

Now we also have preliminarily lined up the mentors for our projects. See the [updated project ideas list](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects). We could find 9 mentors for now. Some of them are former GSoC students.

We continue looking for students for this yaer and some are already working on assignments. Several assignments got already solved by the students, reducing the number of [issues of cups-filters](https://github.com/OpenPrinting/cups-filters/issues) by 6.

## Avahi local service support
Alexander Pevzner, author of the Go-based ippusbxd alternative [ipp-usb](https://github.com/OpenPrinting/ipp-usb) and the ["airscan" eSCL SANE backend](https://github.com/alexpevzner/sane-airscan/), reached out to Trent Lloyd in an e-mail thread about Debian packaging of his work and Trent answered that he will sort it and do a new release of Avahi before Feature Freeze of Ubuntu 20.04 (this would be Feb 27).

Update: Finally, Trent has [merged the patch](https://github.com/lathiat/avahi/commit/2fd76baeb8298ef1b5b177bf7fd70f6cda3eab00)!

## New projects on the OpenPrinting GitHub
Due to the importance for the free software printing stack and for the future directions of development 3 new projects got added to OpenPrinting:

### [ipp-usb](https://github.com/OpenPrinting/ipp-usb)
This is a Go-based alternative for [ippusbxd](https://github.com/OpenPrinting/ippusbxd) from Alexander Pevzner, who I discovered through his ["airscan" eSCL SANE backend](https://github.com/alexpevzner/sane-airscan/) and when discussing the support of these scanners via IPP-over-USB with him he started this great project, a better, more reliable implementation of the IPP-over-USB standard in Go. The ippusbxd project will get continued though as not all OS distributions accept Go projects.

### [goipp](https://github.com/OpenPrinting/goipp)
This is an implementation of IPP in Go, needed for ipp-usb.

### [printer-application-framework](https://github.com/OpenPrinting/printer-application-framework)
The future of printer drivers is supplying them as Printer Applications, running [CUPS in a Snap](https://github.com/OpenPrinting/printing-stack-snap) even requires this, and Ubuntu is also on the way to have [all the printer drivers packageed as Snaps](https://trello.com/c/2zZSlgxT/535-cups-as-a-snap-make-printing-in-distro-snap-only).

This project provides the base for snapping legacy printer drivers consisting of filters and PPDs.

The following project will get added soon:

### [pyppd](https://github.com/vitorbaptista/pyppd)
pyppd was created as a GSoC project many years ago with the intention to make the thousands of PPD files included in a Linux distribution as compact as possible, as uncompressed the made up a substantial part of the size of a typical Linux distribution. PPDs get xz-compressed in a self-extracting archive from which CUPS can automatically list them and grab the desired PPDs as needed.

Nowadays in the age of Printer Application this project gets useful again, to make the Snaps for legacy drivers with thousands of PPDs (Foomatic, PostScript, ...) as compact as possible.

## Driverless scanning
I have followed the work of Alexander Pevzner ("airscan" eSCL SANE backend) and Thierry Hucahrd ("escl" eSCL SANE backend), tested a lot on my HP OfficeJet Pro 8730, reported bugs, ... and so the backends got reliably working (personally I use "airscan" now and not HPLIP any more).

"escl" made it into SANE 1.0.29 and so eSCL scanning support will get readily available in the Linux distributions soon, making the scanners in most modern multi-function printers work out-of-the-box. I have prepared SANE 1.0.29 packages for [Debian](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=951213) and [Ubuntu](https://bugs.launchpad.net/ubuntu/+source/sane-backends/+bug/1862926). They only need to get uploaded by persons with appropriate rights.

For "airscan" there is also a [request for inclusion into upstream SANE](https://gitlab.com/sane-project/backends/issues/202).

I hope this will stop people from messing around with [HPLIP in Linux distributions](https://bugs.launchpad.net/ubuntu/+source/hplip/+bug/1766020).

Aakash Lahoti, 2019 GSoC student on "ipptool test suite for IPP System Service", wants to do the IPP Scan implementation in this year's GSoC. I have given him an introduction on how to do this work and re-using the code of the new SANE eSCL backends and of [AirSANE](https://github.com/SimulPiscator/AirSane), an eSCL scanner emulation for any SANE-supported scanner.

## Printing Stack Snap
There is still no new release but the work on it is going on ([on the GitHub repository](https://github.com/OpenPrinting/printing-stack-snap)). Here is what got done since the last News post:

- cups-filters 1.27.0: cups-browsed working reliably with CUPS on non-631 port
- CUPS: Added AirPrint server functionality (patch of the Debian package)
- Fixed password authentication for administrative tasks
- Added shutdown and reload scripts for the daemons
- Do not re-create the configuration files on every start, this way allow user configurability
- Do not use Python script during startup
- Fixed Ghostscript's font access
- Started re-organization of the directories

The snap is working well now, including the integrated cups-browsed.

Note that when running CUPS in a snap one cannot add classic drivers consisting of filters and PPDs. Drivers can only get added in the form of Printer Applications. Creating Printer Applications of the legacy drivers is [on the way](https://trello.com/c/2zZSlgxT/535-cups-as-a-snap-make-printing-in-distro-snap-only).

## CUPS
No further releases.

No commits on the [CUPS GitHub](https://github.com/apple/cups) since Dec 18, 2019.

CUPS is mangling IPP attribute names when generating them from PPD names, breaking some functionality, like input tray selection. I have reported [a bug](https://github.com/apple/cups/issues/5740) on this. The patch already got into the Debian package of CUPS and will get synced into the Ubuntu package in the next days.

## cups-filters
Currently released is 1.27.1.

1.27.1:

Bug fix release: All filters support zero-page jobs now, option and choice names in PPDs are changed to work around [a bug in CUPS](https://github.com/apple/cups/issues/5740) when generating IPP attributes, cups-browsed creates queues for all emote IPP printers by default, and several smaller fixes in the filters

1.27.0:

In this release cups-browsed does not need to know the port number of the CUPS daemon it is attached to any more when it connects via domain socket and many additional filters support zero-page jobs now

```
CHANGES IN V1.27.1

	- libcupsfilters: Let the PPD generator not put any dashes
	  into the PPD option and choice names when translating them
	  from IPP attribute names, to avoid that on the
	  back-translation by CUPS no double-dashes are
	  generated. This broke paper tray selections with tray names
	  like "tray-1", "tray-2", ... (Issue #192, Issue #201, Debian
	  bug #949315).
	- foomatic-rip: Fixed segfault when PRINTER environment
	  variable is not supplied.
	- pdftopdf, pdftops, gstoraster, gstopdf, gstopxl,
	  rastertoescpx, rastertopclx, foomatic-rip: Handle zero-page
	  jobs (Issue #117, Pull request #196, Pull request #197, Pull
	  request #198, Pull request #200).
	- texttopdf: Added support for CJK (double-width) fonts (Issue
	  #135, Pull request #199).
	- cups-browsed: Switched default for "CreateIPPPrinterQueues"
	  from "local-only" to "All". The configure script options
	  "--enable-auto-setup-local-only" and
	  "--enable-auto-setup-driverless-only" can be used to change
	  this default (Debian bug #921252).
	- rastertoescpx: Fixed wrong freeing of a buffer.
	- pdftops: Added options "crop-to-fit" and "fill" to the
	  pdftopdf options which the pstops called by pdftops should
	  not apply a second time.
	- pdftops: Added missing "-sstdout=%stderr" to Ghostscript
	  command line, to assure that all messages are redirected to
	  stderr and do not mix up with the output data.

CHANGES IN V1.27.0

	- cups-browsed: Eliminate the use of the local CUPS daemon's
	  (the CUPS we are attached to) port number completely, so
	  that for attaching to an arbitrary local CUPS daemon
	  listening on an arbitrary port (or even not listening on
	  localhost at all) it is enough to tell cups-browsed the
	  domain socket the CUPS daemon is listening on.
	- cups-browsed, libcupsfilters: Identify DNS-SD-reported
	  printers as of the local CUPS daemon via UUID and not via
	  the port on which the local CUPS is listening, as we do not
	  always have this port available.
	- cups-browsed: Leave the port for legacy CUPS browsing and
	  broadcasting on 631, do not use a possible alternative port
	  of the CUPS we are attached to. The legacy CUPS servers we
	  communicate with are always remote ones.
	- libcupsfilters: in the PPD generator prioritize
	  print-color-mode-supported against
	  pwg-raster-document-type-supported (Issue #186, Pull request
	  #188)
	- rastertopdf, rastertops, texttopdf, pdftoraster,
	  mupdftoraster: Handle zero-page jobs, corrections on
	  zero-page job handling (Issue #117)
	- cups-browsed: When restarting after a crash make sure that
	  local queue names have same upper/lower case as before.
	- cups-browsed: Small code improvements to reduce crash
	  probability.
```

## IPP-over-USB: ippusbxd and ipp-usb

Alexander Pevzner, author of the "airscan" eSCL SANE backend, has continued on his [ipp-usb](https://github.com/OpenPrinting/ipp-usb) project and all seem to work perfectly now with it: DNS-SD advertising of the printer part, scanner part, and web admin interface with data actually polled from the device via HTTP and IPP (not hard-coded records) and the USB communication, also with high-resolution scans and the web interface correctly working with both Chromium and Firefox.

He also created a Debian package of ipp-usb, with automatic starting and stopping of the daemon via UDEV and systemd.

Thierry Hucahrd, author of the other eSCL SANE backend, "escl", dedicated himself to improving the classic ippusbxd: He especially fixed the DNS-SD advertising of the device, to not be a mainly hard-coded but also USB-device-ID-based record for the printer part but now being records for both printer and scanner part generated by polling the device via HTTP and IPP.

The version 1.34 containing these improvements will get released soon.
