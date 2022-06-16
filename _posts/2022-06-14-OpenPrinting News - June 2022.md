---
title: OpenPrinting News - June 2022
layout: single
author: Till
excerpt: OP Summit Summary, GUADEC, GSoC 2022 projects started, first apps use "cups" Snap interface, PPD-independent cups-filters 2.x, PAPPL 1.2.1, CUPS 2.4.2
---
## OpenPrinting Summit/PWG Meeting
On May 17-19 we had our annual meeting together with the [PWG](https://www.pwg.org/) (Printer Working Group) again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2022-virtual.html).

We presented and discussed our work of the last 12 months and what we plan to do next. Especially CUPS 3.x, use of OAuth with CUPS, cups-filters 2.x, and the GSoC 2022 projects for the New Architecture were the main subjects of the meeting.

A [summary](https://www.pwg.org/blog/pwg-may-2022-F2F-summary.html) got posted by Jeremy Leber from Lexmark and [minutes of the OpenPrinting sessions](https://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/OP-Summit-Minutes-20220517.htm) posted by Ira McDonald. Thanks a lot for this.

The conference also initiated some interesting discussion with Alexander Pevzner (author of [ipp-usb](https://github.com/OpenPrinting/ipp-usb)) and Smith Kennedy (firmware developer at HP) about too many quirks in printer’s IPP-over-USB implementations (see below).


## GUADEC 2022
As already mentioned here [last month](https://openprinting.github.io/OpenPrinting-News-May-2022/#guadec-2022) I will be on the [GUADEC](https://events.gnome.org/event/77/) (GNOME developer conference) this year which will take place on July 20-25 in Guadalajara in Mexico.

I will not only give my [talk](https://events.gnome.org/event/77/contributions/285/) about the New Architecture of printing and scanning for GNOME developers (July 21, 14:20 - 15:00 local time, Bosch Auditorium), but also come with my colleagues from Canonical, similar as on the [LAS 2022](https://openprinting.github.io/OpenPrinting-News-Flash-OpenPrinting-and-Ubuntu-on-the-Linux-App-Summit-2022/) ([video](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=15480s)).

As of now the Canonical Gang will be me, Heather Ellsworth, Britt Yazel, Marco Trevisan, and Nathan Pratta Teodosio.

Heather will give a lightning talk about the Linux Application Summit 2023 showing how to submit a proposal if one wants to host the event. I hope this will help to have another great LAS as we had [this year](https://openprinting.github.io/OpenPrinting-News-Flash-OpenPrinting-and-Ubuntu-on-the-Linux-App-Summit-2022/). It will take place most probably on July 22, somewhere between 14:25 and 15:05 local time in the Bosch Auditorium.

We will also have a Canonical booth. But do not think about at the GUADEC booths being these sales/marketing people in neatly tucked-in company polo shirts, no, on GUADEC booths you will encounter developers there, of the different companies and projects participating. The booths are just tables to sit around them and chat. This makes it much easier to find people for fruitful hallway sessions.


## Google Summer of Code 2022
Google has [officially announced](https://summerofcode.withgoogle.com/programs/2022/projects) the contributor projects for 2022. We got 18 contributor slots for [the Linux Foundation](https://summerofcode.withgoogle.com/programs/2022/organizations/the-linux-foundation), **all 8 projects for OpenPrinting are accepted!**

**Converting Braille embosser support into a printer application**<BR>
Contributor: Chandresh Soni<BR>
Mentors: Till Kamppeter, Samuel Thibault<BR>

**Scanning Support in PAPPL**<BR>
Contributor: Deepak Khatri<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>

**Adding Common Print Dialog Backends (CPDB) support to existing Print Dialogs**<BR>
Contributor: Gaurav Guleria<BR>
Mentors: Till Kamppeter<BR>

**GNOME Control Center GUI for discovering non-driverless printers and finding suitable Printer Applications for them**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Michael Sweet, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>

**Scanning Support in PAPPL with eSCL Support**<BR>
Contributor: Rishabh Maheshwari<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>

**Add Avahi calls for discovering and resolving driverless IPP printers and Optimize the processes**<BR>
Contributor: Sachin Thakan<BR>
Mentors: Till Kamppeter, Michael Sweet, Deepak Patankar<BR>

**Make a native Printer Application from Gutenprint**<BR>
Contributor: Sahil Kumar Dhiman<BR>
Mentors: Till Kamppeter, Michael Sweet, Solomon Peachy, Robert Krawitz<BR>

**Create new printer setup tool for the GNOME Control Center**<BR>
Contributor: Shivan Mishra<BR>
Mentors: Till Kamppeter, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>

With all the contributors I had already introductory meetings/chats, partially also by video calls. I have also created groups on Telegram, Signal, and Discord (according to participant's preferences) of the contributors and mentors for their daily chat about their work, questions, planning, design, ... I am also trying to include upstream developers into the team's whenever possible.

The 2 contributors on the "Printers" module in the GNOME Control Center and the 2 on scanning support for PAPPL are even together in contrinutor/mentor teams.

During the introductory communication we already have planned the work, explained to the contributors how things are working, and especially made the principal design decisions for each project.

The official coding period starts today and it seems also that the end-semester exams at the Indian colleges have ended, so the contributors will be active coding from now on.


### GNOME Control Center - The new "Printers" module
I had intense e-mail discussion with the upstream maintainer of the G-C-C "Printers" module, Marek Kasik from Red Hat, and also with Michael Sweet. I got a first answer from Marek Kasik about the original idea of [replacing the module by one for the New Architecture](https://openprinting.github.io/OpenPrinting-News-February-2022/#printer-setup-tool). He suggests a different solution, instead of replacing the module adding the functionality needed for the New Architecture to the current module making it supporting both old and new. CUPS 2.x already supports most features of the New Architecture (printers as IPP service, Printer Applications) and with CUPS 3.x old-style items (like PPD/driver-based queues) simply will not show. I agreed with that.

I asked Michael Sweet several questions about how to handle managing printers via pure IPP and he helped a lot. Then finally Marek posted 3 feature requests describing the needed work on the upstream GitLab:

- [#1877](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1877): Improve setting of IPP options
- [#1878](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878): Allow to add new printers via Printer Applications
- [#1879](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1879): Do not show setting of drivers for IPP printers

I presented them to the 2 GSoC contributors and they agreed.

Thanks a lot to Marek and Michael for their kind help and great communication!

With this the GNOME Control Center module and CUPS can get independently updated (as long as the module comes first) and also new elements, like for example Printer Applications or IPP-over-USB printers, can enter at any time and get fully supported.

This means, that the main view (to be worked on by Shivan Mishra) of the "Printers" module will show both classic, permanent CUPS queues, created locally with PPD file/driver and backend, and IPP services, for which CUPS would auto-create a temporary queue.

On classic queues we will get the same operations as we already have: Set option defaults, change driver, ... On IPP services we get operations like entering the web admin interface of the service-providing device, IPP System Service configuration, local option settings, ... Also if an IPP service has more than one print destination (like for example a Printer Application), we will list these destinations together.

The "Add Printer" part (to be worked on by Mohit Verma) will also support both the current way and the New Architecture. As long as the underlying CUPS supports it, both classic queues with drivers or Printer Applications can get installed for a discovered printer. As long as classic drivers are still available (CUPS 2.x, not the [CUPS Snap](https://snapcraft.io/cups)) it will be possible to choose.

[Internet search](https://openprinting.github.io/OpenPrinting-News-November-2021/#printer-querying-on-the-openprinting-web-server) for OS-distribution-independent packages of Printer Applications will get included as originally planned. Initial tests of installing Printer Application Snaps on the OpenPrinting web server were already performed. Thanks Violet Kurtz from OSUOSL!

There will be no "Printers & Scanners" module, due to the very different nature of print, scan, and fax operations for the user we will continue with a "Printers" module. Faxes would be shown on a seperate panel, but the code of the "Printers" module could be shared here.

### Scan support for PAPPL
Two GSoC contributors (Rishabh Maheshwari and Deepak Khatri) will continue where [Bhavna Kosta](https://github.com/Bhavna2020/GSoC-2021) has left off in GSoC 2021: They will add scanning support to PAPPL. This will allow complete suppport for multi-function devices (they get really common nowadays, practically the standard form for paper-processing peripherals) and also with Scanner Applications generally a way to provide scanner drivers in OS-distribution-independent packages.

Originally, Rishabh's main part was to make PAPPL accepting and processing eSCL scan jobs and Deepak's main part to do the same for IPP Scan jobs, but it turned out that IPP Scan got a still birth. It is a nicely worked out standard, also IPP as our printing standard, but no one in the hardware industry adopted it, eSCL won as driverless scanning de-facto industry standard, its specs got also [published by Mopria](https://openprinting.github.io/OpenPrinting-News-May-2021/#driverless-scanning), it works also under IPP-over-USB (not being IPP though), so we go eSCL-only in PAPPL.

This means that we are currently re-organizing and re-defining the projects of our two contributors, to get a great eSCL-based driverless scanning support in PAPPL.

I have started a kick-off mail thread with the two contributors, their assigned mentors, Michael Sweet (PAPPL), Alexander Pevzner (sane-airscan), Bhavna Kosta (GSoC 2021 student who started this work) and got a lot of help from Mike and Alex, thanks a lot to them.

### Common Print Dialog Backends (CPDB)
Our GSoC contributor for adding [CPDB](https://nilanjanalodh.github.io/common-print-dialog-gsoc17/) support to the current print dialogs, Gaurav Guleria, has already started very early, already before submitting his proposal, especially he has already done some fixes the [CPDB libraries](https://github.com/OpenPrinting/cpdb-libs).

He especially worked on support for human-readable strings for options and choices in the CPDB libraries ([commit](https://github.com/OpenPrinting/cpdb-libs/commit/46f8870c7791)) and removed CUPS-specific functions from the frontend library ([commit](https://github.com/OpenPrinting/cpdb-libs/commit/4e07aae03b7e)). He also has already started on the [CPDB support for thr GTK print dialog](https://github.com/tinytrebuchet/gtk/tree/cpdb).

In a recent chat I worked out with him how to handle if the PPD of the CUPS queue contains variants of the same page size, like `A4`, `A4.Borderless`, and `A4.Transverse`. we decided on sending each actual page size (here A4, 297x210 mm) only once to the frontend (in the "Page Size" option) and send additional enumerated choice or boolean options to select borderless or transverse (long-edge-first) printing.


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

The `cups` snapd interface now having been [officially launched](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/) and [documented](https://forum.snapcraft.io/t/the-cups-interface/) gets started to be actually used.

The first application using this interface got uploaded to the Snap Store on May 17, [onlyoffice-desktopeditors](https://snapcraft.io/onlyoffice-desktopeditors) and after that, on June 13 [FreeCAD](https://snapcraft.io/freecad). Congratulations to the developers of these applications and thanks to Daniel Manrique from the Snap Store Team at Canonical for this valuable information.

But the code now getting actually exercised, we also found first bugs:

On a first test with the Chromium Snap by my colleague Nathan Pratta Teodosio from Canonical [some bugs got found](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/29702/3) which are all already fixed as of now.

While starting to make use of the new `cups` printing interface in the web browsers, replacing `cups-control` by `cups` there, as recommended now, it turned out that the CUPS Snap in proxy mode did not clone the print queues, at least if there are no network IPP printers around (observed by Nathan Pratta Teodosio and also Olivier Tilloy, both from Canonical's Ubuntu Desktop Team, thanks a lot for reporting and especially Nathan's patience in investigating it). This was caused by bugs in the CUPS Snap itself, `cups-proxyd` not doing an update right after starting ([fixed](https://github.com/OpenPrinting/cups-snap/commit/383fd0e83edf)) and the CUPS Snap needs to plug `cups-control` to use D-Bus services of host system's CUPS ([fixed](https://github.com/OpenPrinting/cups-snap/commit/ced425ae2ec))), and a bug in snapd, an erroneous restriction `peer=(name=org.freedesktop.DBus,label=...)` for CUPS D-Bus access ([Pull request #11843](https://github.com/snapcore/snapd/pull/11843) on snapd).

The fix on snapd got already merged and should be in snapd 2.56 ([Snap Store](https://snapcraft.io/snapd)) and the fixes on the CUPS Snap are included in version 2.4.2-2 also already in the [Snap Store](https://snapcraft.io/cups), so everything should work now.

Only missing piece is approval from the Snap Store team to auto-connect the `cups-control` interface. The request is [posted here](https://forum.snapcraft.io/t/request-cups-snap-auto-connection-to-cups-control-interface/).

For now, should you not connect `cups-control` manually (`sudo snap connect cups:cups-control`) and/or not have snapd 2.56 or newer, at least when starting the CUPS Snap the cloned queues are updated, as well as on appearing or disapperaing of a network printer. So if a new print queue does not get cloned (not appear in print dialogs of snapped applications), either power-cycle an arbitrary printer in your local network or restart the CUPS Snap (`sudo snap stop cups; sudo snap start cups`).

Thanks, James Henstridge (Canonical Desktop Team) for the pull request on snapd, and Michael Vogt (snapd Team Manager at Caninical), Alberto Mardegan, and Alex Murray for quickly approving this pull request.

To assure that the CUPS Snap works correctly with the current cups-filters 2.x, we are now building the included Ghostscript 9.56.1 with all output devices needed for the 4 page description languages needed for driverless IPP printing (PDF, PWG Raster, AppleRaster, PCLm) ([commit](https://github.com/OpenPrinting/cups-snap/commit/e56ab38e652), [issue fixed](https://github.com/OpenPrinting/cups-snap/pull/10)). The CUPS Snap is also updated to CUPS 2.4.2 now.


## Approaching cups-filters 2.0
Continuing the restructuring to have **libppd depend on libcupsfilters** instead of **libcupsfilters depend on libppd**, as [introduced last month](/OpenPrinting-News-May-2022/#approaching-cups-filters-20). Continuing to restructure the code to separate the siamesian twins of the filter functions and PPD file support.

After having made the `cfFilterPDFToPDF()` filter function free of PPD file support I have done the same now also for the `cfFilterPDFToRaster()` filter function, the Poppler-based PDF rasterizer. The `ppdFilterPDFToRaster()` wrapper filter function now adds PPD file support to that.

To reach this I have especially removed the PPD support from the color management support functions (`cfCm...()` and `cfColord...()`), moved the reading from PPD keywords for CUPS/Apple/PWG Raster/PCLm attributes, backside orientation, even number of pages for duplex, and rendering intent into the PPD loader/parser functions for the wrapper filter functions in libppd, added fields to the filter data structure for input and output formats and also for a sample Raster header which can be derived from the PPD (from pseudo-PostScript code in Raster driver PPDs).

Also some crash bugs in code which did not get exercised enough in our PPDish world got fixed.

Most of the PPD attribute readouts are transferred to libppd now. Especially also some code duplication in filter functions got eliminated. Now it is mainly to go through the remaining filter functions and apply the new PPD handling functionality also to them.


## New feature in PAPPL 1.2.x and implementation in pappl-retrofit
Michael Sweet released [version 1.2.0](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.0) (and bug fix follow-up [1.2.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.1)) with support for SNMP-based supply level readout, localization, and human-readable strings for vendor options. Features which were still missing for the development of pappl-retrofit.

**Supply level readout**

The supply-level readout I made already use of in a [first implementation in pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/commit/f5ba4229d) (plus [crash fix](https://github.com/OpenPrinting/pappl-retrofit/commit/07d760259c), [extra crash guards](https://github.com/OpenPrinting/pappl-retrofit/commit/b0939c1c9952), [no premature backend shutdown]([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/dec586ba)), following the implementation in [hp-printer-app](https://github.com/michaelrsweet/hp-printer-app/) after [talking](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004166.html) about how to do the supply-level readout with Michael Sweet on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/thread.html). For now it only works for network-connected printers and when using PAPPL's own print backends. Later on we will also add support for supply-level readout for embedded CUPS filters.

I also started work on finding out how to read out supply levels with embedded CUPS backend calls and found out that also CUPS backends need access to the PPD file. So I made sure the PPD is also available when a printer uses a CUPS backend ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/1dd93b0ec9)). I found the way how to complete it but had no time to implement it due to the more urgent work on the cups-filters 2.x release.

**Localization and human-readable strings**

I had also some [chat with Michael Sweet](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004165.html) on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/thread.html), about localization and human-readable strings for the vendor options and how to implement it in pappl-retrofit, as here the set of strings is variable on run-time due to the PPD files. They are once too many for pre-building the strings file and second, in the PostScript Printer Application the user can add their own PPD files.


## CUPS-driver-retro-fitting Printer Applications
The [4 retro-fitting Printer Applications](https://snapcraft.io/search?q=OpenPrinting) are now also built with PAPPL 1.2.1 and so getting all the new features and bug fixes, but due to the fact that they use CUPS backends and not PAPPL's own backends to communicate with the printers they currently do not support supply level readout. This will be added later, but most probably only after the release of cups-filters 2.x. Also the support for human-readable strings for the vendor options will come.

For those who are printing JPEG images shot with digital cameras directly to a Printer Application (using the setting `print-scaling=none`) and expect the photo coming out in its "original size" according to the image file's metadata will have much better chances now, as the image resolution information in the image's EXIF data (metadata saved in the image file by the camera, more commonly used to find out about ISO, shutter speed, aperture, ...) is made use of now. See cups-filters [Issue #362](https://github.com/OpenPrinting/cups-filters/issues/362) and [Pull request #466](https://github.com/OpenPrinting/cups-filters/pull/466) which implements the EXIF support. Thanks to Brian Potkin from Debian for reporting and to Sachin Thakan (GSoC contributor on Avahi support, see above) for the implementation.


## ipp-usb: Solution for non-driverless IPP-over-USB-reporting printers
As a follow-up of the discussion about printers with a 7/1/4 USB interface but not doing driverless IPP via IPP-over-USB on this interface (see [last month](https://openprinting.github.io/OpenPrinting-News-May-2022/#ipp-usb-printer-does-ipp-over-usb-but-not-driverless-ipp-and-driver-vs-driverless)), Alexander Pevzner has found a solution for ipp-usb not blocking classic access to these printers. He simply lets the ipp-usb daemon disconnect as soon as the access to the device during the preparation of the daemon fails. See [Issue #52](https://github.com/OpenPrinting/ipp-usb/issues/52). Thanks, Alex, for this.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|41888|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|2186|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2390|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1413|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|4725|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|3974|

**Note:** The sky-rocketing of the number for the CUPS Snap from ~4200 last month to ~42000 this month is due to the fact that Application Snaps in the Snap Store which use the new `cups` snapd interface auto-install the CUPS Snap as it is needed for the interface's security concept. The new interface got [launched](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/) April 25 and the first application using it uploaded on May 16 (see above).

## CUPS
Currently released is [**2.4.2**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.2).

There will be further bug fix releases in the 2.4.x series. Some bug fixes were done, see changes below.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) comes with 2.4.1. Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will most probably come with a later 2.4.x.

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.3 (TBA)
----------------------------

- Added a title with device uri for found network printers (Issues #402, #393)
- Fixed configuration on RISC-V machines (Issue #404)
- Fixed an OpenSSL crash bug (Issue #409)


Changes in CUPS v2.4.2 (26th May 2022)
--------------------------------------

- Fixed certificate strings comparison for Local authorization (CVE-2022-26691)
- The `cupsFileOpen` function no longer opens files for append in read-write
  mode (Issue #291)
- The cupsd daemon removed processing temporary queue (Issue #364)
- Fixed delay in IPP backend if GNUTLS is used and endpoint doesn't confirm
  closing the connection (Issue #365)
- Fixed conditional jump based on uninitialized value in cups/ppd.c (Issue #329)
- Fixed CSS related issues in CUPS Web UI (Issue #344)
- Fixed copyright in CUPS Web UI trailer template (Issue #346)
- mDNS hostname in device uri is not resolved when installaling a permanent
  IPP Everywhere queue (Issues #340, #343)
- The `lpstat` command now reports when the scheduler is not running
  (Issue #352)
- Updated the man pages concerning the `-h` option (Issue #357)
- Re-added LibreSSL/OpenSSL support (Issue #362)
- Updated the Solaris smf service file (Issue #368)
- Fixed a regression in lpoptions option support (Issue #370)
- The scheduler now regenerates the PPD cache information after changing the
  "cupsd.conf" file (Issue #371)
- Updated the scheduler to set "auth-info-required" to "username,password" if a
  backend reports it needs authentication info but doesn't set a method for
  authentication (Issue #373)
- Updated the configure script to look for the OpenSSL library the old way if
  pkg-config is not available (Issue #375)
- Fixed the prototype for the `httpWriteResponse` function (Issue #380)
- Brought back minimal AIX support (Issue #389)
- `cupsGetResponse` did not always set the last error.
- Fixed a number of old references to the Apple CUPS web page.
- Restored the default/generic printer icon file for the web interface.
- Removed old stylesheet classes that are no longer used by the web
  interface.
```


## cups-filters
Currently released is [1.28.15](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.15).

We are continuing to restructure the code to separate the siamesian twins of the filter functions and PPD file support and after that we will finally polish and bug-fix the code for the 2.0.0 release.

See above for more details.

The re-structuring made me not doing any further bug fixes on cups-filters, so there is also nothing to backport to 1.x.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) comes with cups-filters 1.28.15. Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will be the first Ubuntu coming with cups-filters 2.x.

The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.


## PAPPL
Currently released is [1.2.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.1).

I have started to work on adding the new PAPPL 1.2.x features (SNMP-based supply level readout, localization/human-readable strings for options/attributes) to pappl-retrofit. See above.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.3b1
-----------------

- Added debug logging for device management.

Changes in v1.2.1
-----------------

- Fixed a bug in the max-clients support code (Issue #205)
- Fixed compiler warnings (Issue #206, Issue #207)
- Fixed corruption in the English localization file.
- PAPPL didn't compile against CUPS 2.2.6 and earlier.
```
