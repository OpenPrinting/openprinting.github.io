---
title: OpenPrinting News - January 2020
layout: single
author: Till
excerpt: Driverless scanning and AirScan, ippusbxd problems solved, cups-filters 1.26.2 released, lots of bug fixes for cups-browsed, GSoC 2020 org application for the Linux Foundation submitted and project idea list posted
---
## Google Summer of Code 2020
The application period for mentoring organizations has started on Jan 14 and we have submitted our application for the Linux Foundation as mentoring organization.

Along with this we have posted our [project ideas list](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects) with a total of 16 projects and within these there are 10 dealing with Printer and Scanner Applications.

We still need to (preliminarily) assign mentors to the projects. We are currently contacting former students to ask them whether they want to mentor and if yes, which projects.

We have started looking for students for this yaer and some are already working on assignments.

## Google Summer of Code 2019
Tanmay Anand is working on the Common Print Dialog Backends (CPDB) support for the GTK print dialog which he did not finish withing the GSoC. Here is his [GitHub repository](https://github.com/tanmayanand44/cpdb-gtk-adaptor-backend-gsoc19/).

## Avahi local service support
Trent Lloyd has given another [sign of life](https://github.com/lathiat/avahi/issues/125#issuecomment-568229662) in the [localhost-support issue](https://github.com/lathiat/avahi/issues/125) on GitHub. This time he tells that he will merge the patch but fix [this issue](https://github.com/lathiat/avahi/pull/161#issuecomment-532048820) first.

This was on December 22, 2019, after that nothing more happened.

## Driverless scanning
There is no IPP Scan implemented yet but in December, during the holiday season there came up projects of Linux support for Apple AirScan, or eSCL. eSCL is the HTTP-based protocol which Apple uses for AirScan, which is available on all multi-function printers which also do AirPrint, intended to allow scanning from Apple's mobile devices with the iOS operating system. The specifications of eSCL are not published but as an HTTP-based protocol it was not that difficult to reverse-engineer for the authors of the eSCL-related software.

There are two (independently developed) SANE backends for using these scanners: ["escl"](https://gitlab.com/sane-project/backends/merge_requests/242) (small, light, basic, already included in SANE 1.0.29) and ["airscan"](https://github.com/alexpevzner/sane-airscan) (complete functionality). There is also an AirScan server, [AirSane](https://github.com/SimulPiscator/AirSane), which is a SANE frontend which emulates an AirScan scanner scanning on any physical scanner supported by SANE.

I have worked a lot with the two authors of the backends to get my HP DeskJet 2540 Ink Advantage (a cheap multi-function device with AirPrint) scanning with them (and without need of HPLIP). I tested not only via network (Wi-Fi) but also via USB, using [ippusbxd](https://github.com/OpenPrinting/ippusbxd) and also got it working this way. One must note that the IPP-over-USB standard is not strictly about IPP but actually defines an HTTP-over-USB connection, to allow for extra functionality like web administration interfaces. The authors also investigated ippusbxd and its shortcomings. Thierry Hucahrd, author of the "escl" backend, even contributed DNS-SD advertising of the scanner part to ippusbxd and Alexander Pevzner, author of the "airscan" backend replaced ippusbxd altogether in a few hours. His [ipp-usb](https://github.com/alexpevzner/ipp-usb), written in Go, fixes paractically all the problems of ippusbxd (Issues [#9](https://github.com/OpenPrinting/ippusbxd/issues/9), [#14](https://github.com/OpenPrinting/ippusbxd/issues/14), and [#15](https://github.com/OpenPrinting/ippusbxd/issues/15)). Currently he is working on doing the DNS-SD advertising correctly (Issue [#11](https://github.com/OpenPrinting/ippusbxd/issues/11)) in his ipp-usb project.

Even if AirScan/eSCL is not PWG's IPP Scan, the code of the mentioned software can be a good base for implementing IPP Scan both as a client (SANE backend) and a server (Scanner Application). We are contacting the authors for a possible GSoC participation.

Also good news is that 100s (1000s ?) of scanners in modern multi-function devices will soon "just work" with regular Linux distributions.

## Printing Stack Snap

There is no new release but I have done a bigger overhaul ([on the GitHub repository](https://github.com/OpenPrinting/printing-stack-snap)):

- CUPS 2.3.1
- cups-filters 1.26.2
- QPDF 9.1.0
- Added Ghostscript (9.50) as main PDF renderer, kept Poppler as backup
- Now based on Ubuntu Core 18
- More debugging options
- Bug fixes

The snap is working well now, including the integrated cups-browsed.

Note that when running CUPS in a snap one cannot add classic drivers consisting of filters and PPDs. Drivers can only get added in the form of Printer Applications.

## CUPS

No further releases.

By the way, I have it currently working well in the [printing-stack-snap](https://github.com/OpenPrinting/printing-stack-snap).

## cups-filters

Currently released is 1.26.2.

1.26.2:

Bug fix release mainly to make cups-browsed correctly working with a CUPS daemon on a non-standard port, and also for cups-filters smoothly building with GCC 10

1.26.1:

Bug fix release, to make the cups-browsed-generated local print queues actually work on all OS distributions and to get legacy (not actually designed for driverless IPP) printers better working

```
CHANGES IN V1.26.3

	- libcupsfilters: in the PPD generator prioritize
	  print-color-mode-supported against
	  pwg-raster-document-type-supported (Issue #186, Pull request
	  #188)
	- rastertopdf, texttopdf, pdftoraster: Handle zero page jobs,
	  corrections on zero-page job handling (Issue #117)
	- cups-browsed: When restarting after a crash make sure that
	  local queue names have same upper/lower case as before.
	- cups-browsed: Small code improvements to reduce crash
	  probability.

CHANGES IN V1.26.2

	- cups-browsed: Added crash guards to avoid crashes in case
	  the dummy printer entry for a deleted master entry is used.
	- cups-browsed: Set the port of the local CUPS daemon to be
	  used according to the IPP_PORT environment variable.
	- cups-browsed: Eliminated the use of the cupsGetPPD2()
	  function of libcups completely, also the remaining calls
	  in the record_printer_options() and update_cups_queues()
	  functions, the former causing incomplete recording of
	  option settings and the latter use of CUPS-generated
	  PPDs not working when CUPS is running on a non-standard
	  port.
	- cups-browsed: Eliminated the use of the cupsGetPPD2()
	  function of libcups in queue_overwritten(). The function
	  actually loads the queue's PPD file if the queue is on a
	  local CUPS on port 631. Due to a bug the function fails if
	  an alternative port is used. This lets queue_overwritten()
	  always assume that the PPD got removed and therefore the
	  queue got overwritten. So queues got released from
	  cups-browsed if it was printed on them or if they were
	  supposed to be removed on shutdown.
	- foomatic-rip: Fixed compilation with -fno-common. Starting
	  from the upcoming GCC 10, the default of the -fcommon option
	  will change to -fno-common. This causes compilation errors
	  in foomatic-rip due to missing "external" declarations.
	  (Pull request #184).

CHANGES IN V1.26.1

	- build system: Install the "implicitclass" backend with
	  "-rwx------" permissions, so that CUPS executes it as root,
	  as the "ipp" CUPS backend also has to be executed as root
	  (Issue #183).
	- build system: Fixed setting permissions when installing the
	  "cups-brf" backend.
	- libcupsfilters: When using the
          "media-{bottom,left,right,top}-margin-supported" IPP
          attributes (needed if we have no "media-col-database"), use
          the minimum and not the maximum margins, this allows
          accessing more of the printer's capabilities, especially for
          legacy printers which do not provide sufficient information
          (Issue #22).
```

## ippusbxd and ipp-usb

Good news! As already told earlier here in the section about driverless scanning we did intensive tests of ippusbxd with scanning (Apple AirScan) found several problem and Alexander Pevzner, author of the "airscan" SANE backend, wrote a complete replacement for ippusbxd in Go in a few hours, named [ipp-usb](https://github.com/alexpevzner/ipp-usb). It fixes most long-standing issues ([#9](https://github.com/OpenPrinting/ippusbxd/issues/9), [#14](https://github.com/OpenPrinting/ippusbxd/issues/14), and [#15](https://github.com/OpenPrinting/ippusbxd/issues/15)) and Alexander is currently working on correct DNS-SD advertising, based on polling the device via HTTP/IPP and not only on the USB device ID (Issue [#11](https://github.com/OpenPrinting/ippusbxd/issues/11)).

ippusbxd received some pull requests from Thierry Hucahrd, author of the "escl" backend, DNS-SD advertising of the scanner part.

