---
title: OpenPrinting News - September 2021
layout: single
author: Till
excerpt: OpenPrinting Micro-Conference on Linux Plumbers, OpenPrinting in Ubuntu Office Hours, GSoC results, pappl-retrofit, Ghostscript and HPLIP Printer Applications
---
## Debian has a new printing maintainer!
Didier Raboud ("OdyX") is going on a 6-month sabbatical and therefore leaving his position as printing guru of Debian. Thorsten Alteholz is overtaking here. OdyX and me have introduced him and he already started off well.

Thanks a lot to OdyX for all his work on Debian's printing part and the great collaboration with me and to Thorsten for overtaking where OdyX has left off.

## OpenPrinting Micro-Conference on the Linux Plumbers 2021
[Linux Plumbers 2021](https://www.linuxplumbersconf.org/event/11/) is approaching! It will start on Monday next week (Sep 20, 2021) right away with our OpenPrinting micro-conference on the first day!

Yes, our micro-conference will take place on
- **Monday, September 20, 2021, 7am - 11 am Pacific or 14:00 - 18:00 UTC**

The conference is all-online again, as 2020, due to the travel restrictions caused by COVID-19.

**Update: Links to watch live for free on YouTube will get posted [here](https://linuxplumbersconf.org/event/11/page/107-watch-live-free).**

We will have the following sessions:

**CUPS 2.4/2.5**<br>
Presenter: Michael Sweet<br>

**CUPS 3.0**<br>
Presenter: Michael Sweet<br>

**Print Management GUI**<br>
Presenter: Till Kamppeter<br>

**Common Print Dialog Backends**<br>
Presenter: Till Kamppeter<br>

**Printer/Scanner Driver Design and Development**<br>
Presenter: Till Kamppeter<br>

**Scanning in PAPPL**<br>
Presenter: Bhavna Kosta<br>

Note that these sessions are not just slide presentations, there are some slides to introduce into the subject matter, but as the Linux Plumbers micro-conferences are intended for, we will discuss the about issues, decisions, design, ... to put our future work into the right direction, and for answering questions of the attendees.

The exact schedule is [posted on the Linux Plumbers web site](https://linuxplumbersconf.org/event/11/sessions/113/#20210920). Registered attendees can participate interactively in the live discussions. Probably there will also be the possibility for non-interactive watching of the micro-conference on YouTube and a recording on YouTube after the micro-conference, as last year.


## The Summer of Printers in the Ubuntu Office Hours
Once a week, every Thursday in the US morning and the European afternoon on the "[Ubuntu OnAir](https://ubuntu.com/blog/ubuntuonair)" YouTube channel of the Ubuntu community, the live event "Ubuntu Office Hours" is taking place. In each episode a free software community memeber is invited to tell about his project and what is happening in its community.

In the [October 7 episode](https://www.youtube.com/watch?v=diB3wm4HB1Y) (3 weeks from today) it is all about OpenPrinting. Organizer and host Monica Ayhens-Madon has invited me to talk about GSoC and the students I have mentored. There will not only Monica and me be on the (virtual) stage but also OpenPrinting program manager Aveek Basu and some of this year's (and perhaps also former year's) GSoC students.

We will tell about our GSoC work and its achievements, not only of code but also the community growth, and what students have done after the summer, like mentoring the next students or creating our current web site.

We will also call for volunteers to join OpenPrinting and to contribute, and also answer the spectator's question which they post on the YouTube Live Chat of the session.

Please mark in your calendars:

- **Thursday, October 7, 2021, 17:00 - 18:00 UTC**

It will take place on [YouTube](https://www.youtube.com/watch?v=diB3wm4HB1Y) and everyone can participate, without registration and free of charge. Everyone can post questions on the YouTube Live Chat.

For everyone who wants to get some technical background, Michael Sweet and me have talked about the ongoing changes in the architecture of printing with free software three weeks ago in the [Ubuntu Indaba](https://openprinting.github.io/OpenPrinting-News-Flash-Ubuntu-Indaba-and-Ghostscript-Printer-Application/#the-ubuntu-desktop-indabas-and-openprinting---the-recording) (recording on [YouTube](https://www.youtube.com/watch?v=P22DOu_ahBo)).

See you there!


## Google Summer of Code 2021
The Google Summer of Code 2021 has ended successfully for OpenPrinting! All our 5 students have passed final evaluations and did great work. The projects are mostly completed, only some debugging and polishing is currently taking place. Most of the code is already committed to the respective upstream GIT repositories (and partially already in use in the [CUPS-driver-retro-fitting Printer Application Snaps](https://snapcraft.io/search?q=OpenPrinting)).

There was a presentation of the GSoC projects on the [PWG August 2021 Face-to-Face Meeting](https://www.pwg.org/chair/meeting-info/august-2021-virtual.html) which has taken place online on August 17-19, 2021. There we have shown [this video](https://docs.google.com/file/d/1zzV1Gi7qqnfkUenOFdZ1WhrI2LMMlycK/preview) where every student has presented his project.

Here are the projects with their submitted work product links:

**cups-filters: Make sure all filter functions work without PPD files**<br>
Student: Suraj Kulriya<br>
Mentors: Jai Luthra, Till Kamppeter, Dheeraj Yadav<br>
[Work Product](https://surajkulriya.medium.com/gsoc-2021-final-work-product-the-linux-foundation-make-printing-work-through-cups-without-bf06dbfa1789)

PASSED

**cups-filters: Convert filters to filter functions**<br>
Student: Pratyush Ranjan<br>
Mentors: Till Kamppeter, Dheeraj Yadav<br>
[Work Product](https://pranjanpr.github.io/pratyush/#/gsoc)

PASSED

**cups-filters: Create a single, universal CUPS filter to replace the chain of individual filters**<br>
Student: Pranshu Kharkwal<br>
Mentors: Till Kamppeter, Dheeraj Yadav<br>
[Work Product](https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023)

PASSED

**GUI for listing and managing available IPP Print/Scan services (or DNS-SD-advertised network services in general)**<br>
Student: Divyasheel<br>
Mentors: Till Kamppeter<br>
[Work Product](https://github.com/divyashk/GSOC21_summary)

PASSED

**PAPPL: Printer setup tool support and Scanning support**<br>
Student: Bhavna Kosta<br>
Mentors: Jai Luthra, Till Kamppeter, Michael Sweet<br>
[Work Product](https://github.com/Bhavna2020/GSoC-2021)

PASSED


## pappl-retrofit - The CUPS Driver Retro-Fit Library
Printer Applications retro-fitting classic CUPS printer drivers consisting of PPD files, CUPS filters, and CUPS backends, like currently the [PostScript](https://github.com/OpenPrinting/ps-printer-app/), [Ghostscript](https://github.com/OpenPrinting/ghostscript-printer-app/), and [HPLIP](https://github.com/OpenPrinting/hplip-printer-app/) Printer Applications, have a lot in common and share most of their code. Therefore I have continued the development of the code of the PostScript Printer Application by generalizing it for any type of classic CUPS printer driver (see previous [News posts](https://openprinting.github.io/news/) and the [sneak previews](https://github.com/OpenPrinting/ps-printer-app/discussions/8) of my work during the last months) and put it up on the OpenPrinting GitHub as the [PAPPL Retro-Fit Library](https://github.com/OpenPrinting/pappl-retrofit).

This library will also be the start of several other CUPS driver retro-fits making all the drivers from the last (even more than) 21 years available for the new all-IPP, PPD-less printing architecture. 21 years ago I migrated all printer drivers into CUPS, now I am migrating them into the next architecture.

The library makes creating a Snap of a CUPS driver as easy as creating a Snap of any other application. It contains 98 % of the C code needed to create a [PAPPL](https://github.com/michaelrsweet/pappl/)-based Printer Application around the CUPS driver. Only C code still needed is a `main()` function stub setting the configuration of the Printer Applications (Which features are used, which are the resource/log/spool/state directories?) and perhaps a printer auto-discovery function (Which printers are supported?). Otherwise one needs only the driver with all its files and some extra packages like Ghostscript, libcups, libcupsfilters, libppd, ...

The driver's files (PPDs, filters, backends) only need to get placed in the appropriate directories for the Printer Application to find them. No need to change the code of the drivers, so it is also easy to retro-fit unmaintained drivers, drivers for which one does not have an appropriate printer to test, and even proprietary, closed-source, binary-only drivers.

Then one can create print queues with the printers being auto-discovered (by PAPPL's backend and/or included CUPS backends) and the model/driver (PPD file) can be automatically or manually selected (each "Driver Name" drop-down entry on the "Add Printer" web interface page is one PPD file).

When printing a job the IPP attributes are automatically mapped to the best-fitting PPD option settings, to easily allow to make use of the features of the printer, even on clients with limited print dialogs, like phones or IoT devices. The web interface also allows to manually set defaults for all PPD options for more detailed control. Even options requiring CUPS PPD extensions, numeric, string, password, fax number, ... options are supported.

All current retro-fitting Printer Applications ([PostScript](https://github.com/OpenPrinting/ps-printer-app/), [Ghostscript](https://github.com/OpenPrinting/ghostscript-printer-app/), and [HPLIP](https://github.com/OpenPrinting/hplip-printer-app/)) are using this library now.

The Printer Applications created with this library can also be run directly on the system, without being in a Snap, especially the Test Printer Application which comes with the library and sets its resource directories to use all the PPD files, filters, and backends of the system's classic CUPS installation. This allows testing installed drivers how they work under a Printer Application or allows installed drivers to be used with an installed CUPS Snap.

All important features are included now. Further development of the library will go with the development of PAPPL and the needs of the Printer Applications. Especially the following features will get implemented/supported as soon as they are implemented/fixed in PAPPL:
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142) (Patch already applied in the Printer Application Snaps). 
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).


## Ghostscript Printer Application
**[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) in the [Snap Store](https://snapcraft.io/ghostscript-printer-app), 194 installations via Snap Store**

If you want to use an (older) printer which is not a modern driverless IPP printer and is also not a PostScript printer (which would be supported by the [PostScript Printer Application](https://snapcraft.io/ps-printer-app) then) Then this is the right Printer Application for you.
 
It supports ~5000 different printer models, mainly with drivers from the well-known [Ghostscript](http://www.ghostscript.com/) but also some others. The printer model support is based on OpenPrinting's [printer support database (Foomatic)](http://www.openprinting.org/printers/). Especially many standard laser (PCL 6/XL, PCL 5c/e, PCL4) and dot matrix (ESC/P, OKI, IBM, ...) but also many printers with proprietary print data formats are supported. There are not only model-specific entries to choose from, but also generic entries for the common formats for the case your printer is not explicitly listed.

The Printer Application gives access to all the options of the former PPD files inside its web interface ("Device Settings", "Media", "Printing Defaults") but can be easily used from any IPP-compliant client application or device. The standard IPP attributes are automatically converted to the best-fitting PPD option settings, especially for color, quality, and content optimization.

These drivers already ship for many years with most common Linux distributions (Ubuntu, Debian, Fedora, SUSE, ...) and have made many user's printers work and these printers will continue to work in environments where only Printer Applications (and no classic printer driver packages) are supported.

In the future more drivers will get added to the Snap of this Printer Application, especially smaller, unmaintained driver projects for which it does not make much sense to clutter the Snap Store with another Printer Application.


## HPLIP Printer Application
**[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) in the [Snap Store](https://snapcraft.io/hplip-printer-app), 616 installations via Snap Store**

Right after having published the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) I have continued with the HPLIP Printer Application, to cover the printers supported by the printer driver of HPLIP.

Creating this one was much more complex than the Ghostscript Printer Application as HPLIP is a suite of printer drivers, PostScript PPD files (with extra CUPS filters), scanner drivers and command-line and GUI utilities. It also has many quirks like excessive use of hard-coded absolute file paths in the source code, utilities written in Python, an x86-32/64-only binary-only code blob in the driver ... while Ghostscript and Foomatic are much more packaging-friendly.

As [scanning support in PAPPL](https://github.com/Bhavna2020/GSoC-2021) is not ready yet, scanning on multi-function printers is not yet supported. Also loading the proprietary driver plugin will be added later.

Printing is now possible on all non-PostScript and PostScript printers from HP and Apollo which HPLIP supports without its proprietary plugin. More than 3000 different models from ~30 years.

For maximum compatibility both PAPPL's standard backends and the "hp" backend of HPLIP are available, the former for bi-directional access (poll accessory configuration settings of PostScript Printers), the latter for simultaneous printing and scanning on the same device and perhaps also special needs of some printer models.

Note that HP is one of the best manufacturers in terms of supporting driverless IPP printing and scanning, so most newer HP printers work best without this Printer Application, even if HPLIP (and so this Printer Application) supports them.

Note also that HPLIP has many bugs which are fixed in the Debian/Ubuntu and RedHat/Fedora packages by a high amount of distribution patches whereas this Printer Application uses the "raw" upstream source code. I will soon switch to the [packaging GIT repository of Debian](https://salsa.debian.org/printing-team/hplip/), as soon as the new Debian printing maintainer has updated it to version 3.21.8.


## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), 1484 installations via Snap Store**

The PostScript Printer Application is now switched over to use the new [PAPPL Retro-Fit Library](https://github.com/OpenPrinting/pappl-retrofit).

This means that now we have fully automatic mapping of job IPP attributes to the best-fitting PPD option settings to make printing as easy as possible with standardised user-settable options and from any client device including phones.

Also most of the development and debugging happens centrally in the retro-fit library.

Note that HP's PostScript PPD files are in both this and the [HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) now. This should make the life easier for users. Some do not know whether their printer is PostScript, but it is from HP, so the HPLIP Printer Application will always work, others have a bunch of PostScript printers of different manufacturers, including HP, they will be able to support them all with a single Printer Application.


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), 2564 installations via Snap Store**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but unfortunately, they are very busy currently.

But I have good news now: I have talked with them about when I can expect the merging into snapd and they tell that they will do it in October, so that for the full developemnt cycle of Ubuntu 22.04 LTS (J. J.), starting end of October, it will be available for testing and deciding whether said Ubuntu version will come with the CUPS Snap as standard printing environment, and naturally uploading of applications which print into the Snap Store will get easy and fully automatic, without any manual review and permission needs.

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces (see above)
- Testing
- Turn classic CUPS drivers into Printer Applications (see progress above)
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 19 months.

Ubuntu Impish Indri (21.10) will also come with CUPS 2.3.3op2, the CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master.

The CUPS in Impish Indri has a distribution patch porting the fully automatic job-IPP-attribute-to-PPD-option-settings mapping from cups-filters, which we use in all retro-fitting Printer Applications to CUPS, so that when sharing a print queue under the new Ubuntu one has the same ease of printing to it from any device, especially phones. A [Pull Request](https://github.com/OpenPrinting/cups/pull/236/) for upstream inclusion of this feature is posted and under discussion.

There will be news and discussion about CUPS 2.4.x and 3.x with Michael Sweet on the [OpenPrinting Micro-Conference on the Linux Plumbers 2021](#openprinting-micro-conference-on-the-linux-plumbers-2021) on Monday (Sep 20).

```
CUPS v2.4rc1 (Pending)
----------------------

- Fixed documentation and added examples for CUPS' limited CGI support
  (Apple #5940)
- Fixed the `lpc` command prompt (Apple #5946)

- Stubbed out deprecated `httpMD5` functions.
- Printer driver deprecation wasn't mentioned in CUPS Web UI
```


## cups-filters
Currently released is [1.28.10](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10).

Current development work is finishing up, testing, debugging this year's GSoC student projects, improving and optimizing the rules for mapping job IPP attributes to PPD option settings, and smaller feature needs appearing during the CUPD driver retro-fitting work (but most is already done for this).  Now we also need to clean up and sort out things to be able to do a first 2.x release of cups-filters.
- Improved the auto-mapping of job IPP attributes to PPD option settings (presets). Several new rules added during further driver retro-fitting work, especially also for Foomatic's "PrintoutMode" composite option.
- The GSoC students have completed conversion of the filters into filter functions and making the filter functions also use job and printer IPP attributes as alternative to PPDs and option settings.
- A [Pull Request](https://github.com/OpenPrinting/cups-filters/pull/421/) for a single, universal CUPS filter, calling sequences of filter functions, reducing external function calls, is posted and shortly before merging.
- Support for the `print-rendering-intent` IPP attribute in filter functions.
- Use of log function for the log messages produced by the color-management-related functions of libcupsfilters.
- In the `ieee1284NormalizeMakeAndModel()` function extract driver info with regular expression (needed by libpappl-retrofit).
- In `filterExternalCUPS()` sanitize the device URI (for CUPS backends) and env variables to assure that passwords do not get into log files.

Also several minor bug fixes were done.

[1.28.10](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10)

Bug fix release, fixes backported from the master (2.x) branch (see below)

Ubuntu Impish Indri (21.10) will come with cups-filters 1.28.10. The CUPS Snap currently uses 1.28.10. The PostScript Printer Application Snap uses the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- foomatic-rip: Debug message was wrongly sent to stdout and
	  not to log (Issue #422).
	- libcupsfilters: In ghostscript() pass on LD_LIBRARY_PATH to
	  Ghostscript
	- libcupsfilters: In color-management-related functions use
	  the log function instead of logging right to stderr.
	- libcupsfilters: In ieee1284NormalizeMakeAndModel() extract
	  driver info with regular expression.
	- libcupsfilters: Support print-rendering-intent IPP attribute
	  in ghostscript(), mupdftoraster(), and pdftoraster() filter
	  functions.
	- libcupsfilters, mupdftoraster: Moved core functionality of
	  mupdftoraster into the mupdftoraster() filter function (Pull
	  request #412).
	- textbrftoindex: Fix control character filtering (Pull
          request #409)
	- libcupsfilters, bannertopdf: Moved core functionality of
	  bannertopdf into the bannertopdf() filter function (Pull
	  request #407).

	- libcupsfilters: Also allow supplying a regular expression to
	  extract driver information when the input string is a PPD's
	  *NickName.
```

```
CHANGES IN V1.28.11

	- foomatic-rip: Debug message was wrongly sent to stdout and
	  not to log (Issue #422).

CHANGES IN V1.28.10

	- Sample PPDs: Add borderless page size definitions to Generic
	  PDF Printer, HP Color LaserJet CM3530 MFP PDF, and Ricoh PDF
	  Printer PPD files.
	- Sample PPDs: From the PDF PPD files removed the unneeded
	  "*cupsFilters2: ..." line. For CUPS it does not make any
	  difference.
	- libcupsfilters: Fixed pdftopdf filter to correctly support
	  page ranges without upper limit, like "10-" (Pull request
	  #399).
	- libcupsfilters: Use wildcard tag (IPP_TAG_ZERO) search for
	  "media-type" and "media-type-supported" in the PPD
	  generator (Pull request #398).
	- implicitclass, parallel: Added missing newlines at error
	  messages.
	- libfontembed: Removed unneeded fontembed/main.c and ttfread
	  executable. Eliminates the dependency on DejaVuSans.ttf
	  (Issue #386).
	- gstoraster: Refactor the filter a little to clarify handling
	  of page counts and set job-impressions for TotalPageCount in
	  PWG-Raster header (Pull request #394).
	- cups-browsed: Make NotifLeaseDuration configurable and renew
	  after half the lease duration not 60 sec before end. The
	  early renewal improves reliability on busy systems a
	  lot. For easier development and debugging short durations
	  from 300 sec on can get selected (Pull request #378).
```

## PAPPL
Currently released is [1.1b1](https://github.com/michaelrsweet/pappl/releases/tag/v1.1b1).

We have now support for setting the default printer and pausing/resuming print queues in the web interface (and command line interface, too).

Also the Printer Application does not get stuck any more on an unresponsive printer when canceling or deleting jobs or shutting down the Printer Application.

The printer's device ID now also gets polled from SNMP-discovered devices, meaning that for those an auto-assignment of the driver is also possible.

Many other improvements and fixes.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

```
Changes in v1.1b2
-----------------

- Added support for `papplDeviceGetID` with network devices (Issue #95)
- Added support for the "compression" option.
- Added English names for Tabloid and A3 media sizes in the web interface.
- Added "server-hostname" and "listen-hostname" server options to the default
  mainloop system callback.
- Fixed support for default printers, added indicator in web interface
  (Issue #182)
- Fixed support for printers with spaces in their names.
- Fixed the "jobs" subcommand.
- Fixed support for page-ranges.
- Fixed support for printers that do PDF beyond converting it to raster.
- Fixed support for mainloop subcommands on Windows.
- Fixed error message when Bonjour for Windows is not installed.


Changes in v1.1b1
-----------------

- Added support for Windows 10 and higher.
- Added `PAPPL_SOPTIONS_NO_TLS` option to disable TLS support.
- Added Wi-Fi callbacks to support configuration over IPP-USB (Issue #45)
- Added buttons and sub-commands to pause and resume printers (Issue #124)
- `papplMainLoop` now uses a persistent location for state and spool files by
  default (Issue #128)
- `papplMainLoop` now supports clients talking to a system-wide server running
  as root (Issue #148)
- Added a "set default" button to the web interface (Issue #150)
- The `drivers` sub-command now reports the IEEE-1284 device ID for a given
  driver (Issue #157)
- Jobs can now be canceled and printers deleted when a processing job is trying
  to connect to a printer (Issue #163)
- The default media is now updated if the ready media for a given tray is
  updated (Issue #164)
- Fixed an issue with the "drivers" sub-command not working if you don't have a
  system callback.
- Fixed a deadlock issue on macOS.
- Added a new `papplJobCreateWithFile` API to allow printer applications to
  submit print jobs internally.
- Refactored the `papplSystem` hostname/port APIs to be consistent with the
  naming used for the `papplClient` APIs.
```

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
