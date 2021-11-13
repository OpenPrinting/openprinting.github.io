---
title: OpenPrinting News - November 2021
layout: single
author: Till
excerpt: Google Summer of Code 2022, all free drivers in Printer Application Snaps, Legacy Printer Application, CUPS 2.4rc1, PAPPL 1.1b3
---
## Google Summer of Code 2022
On November 5 the virtual Mentor Summit of GSoC 2021 has taken place and there the organization team of the GSoCs at Google has announced that we will have a GSoC again in 2022!

But this time, for the 18th year, there will be [several changes](https://opensource.googleblog.com/2021/11/expanding-google-summer-of-code-in-2022.html):

- **Contributors, not only students**: From now on it is not required any more to be a university/college student any more to code for GSoC. Anyone 18 years olde and older can do.

- **Two project sizes**: 16 GSoCs with ~350-hour projects, then one with ~175-hour ptojects, some tasks fit better into one size others into the other, no one-size-fits-all. Now we can have both. The organizations can select from these two sizes for each project idea they offer.

- **Coding period flexibility**: Before, there was a fixed time period of ~3 months in which the projects had to be done, also with fixed dates for the 2 or 3 evaluations. From 2022 on the period can be extended to 22 weeks on agreement between mentor and contrbutor, should there be some interruptions like exams, trips, sickness, different dates of mid-year break, ... This gives more people the chance to be able to participate.

Now we have much more flexibility in defining projects and in selecting candidates, so much better chances in getting our projects done and finding more long-term contributors.

Any suggestions for GSoC projects are welcome.

We will start looking around for candidates and pre-selecting soon.


## Practically all free printer drivers in Printer Applications
Now we are an important step closer to using the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) as the standard printing system and generally to use a [CUPS which does not support PPDs and printers drivers (like 3.x)](https://github.com/OpenPrinting/cups/issues/103): All free software printer drivers which are available in Debian packages (for Debian and Ubuntu) are now also available in Printer Application Snaps, so with the CUPS Snap and any future CUPS version there is no loss of printer support.

There are four Printer Applications with nearly every driver in the [Snap Store](https://snapcraft.io/search?q=OpenPrinting):

- [**PostScript Printer Application**](https://github.com/OpenPrinting/ps-printer-app) ([Snap Store](https://snapcraft.io/ps-printer-app)): Printer Application Snap for PostScript printers which are supported by the manufacturer's PPD files. User can add PPD files if the needed one is not included or outdated.
- [**HPLIP Printer Application**](https://github.com/OpenPrinting/hplip-printer-app) ([Snap Store](https://snapcraft.io/hplip-printer-app)): HPLIP in a Printer Application Snap. Supports nearly every HP printer ever made. Installing HP's proprietary plugin (needed for a few printers) into the Snap is supported and easily done with the web interface, and it gets automatically updated.
- [**Gutenprint Printer Application**](https://github.com/OpenPrinting/gutenprint-printer-app) ([Snap Store](https://snapcraft.io/gutenprint-printer-app)): High quality output and a lot of knobs to adjust, especially for Epson and Canon inkjets but also for many other printers, for example dye sublimation photo printers, in a Printer Application Snap.
- [**Ghostscript Printer Application**](https://github.com/OpenPrinting/ghostscript-printer-app) ([Snap Store](https://snapcraft.io/ghostscript-printer-app)): Printer Application with Ghostscript and many other drivers, for practically all free-software-supported printers which are not PostScript and not supported by HPLIP or Gutenprint. It contains all the printer for which there is no separate Snap.

In addition, there is LPrint which supports many label printers (more label printer models supported by the Ghostscript Printer Application):

- [**LPrint**](https://github.com/michaelrsweet/lprint) ([Snap Store](https://snapcraft.io/lprint)): Supports Dymo LabelWriter and Zebra ZPL label printers, with all label-printer-typical options: Label modes, tear-off offsets, media tracking, media top offset, print darkness, resolution, roll selection, speed, ... Note that this is of the pre-PAPPL era and so does not use PAPPL with all its features.

If there are any free software CUPS printer drivers left which are not in these Printer Applications and you think it would be great to have it there, please report an [issue on the Ghostscript Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app/issues).

If you have manufacturer-supplied PostScript printer PPDs which are published under a free software license but not included in the PostScript Printer Application, please report an [issue](https://github.com/OpenPrinting/ps-printer-app/issues). For non-free-licensed PPD files simply install the PostScript Printer Application and use the "Add PPD file" functionality in its web interface to install your printers's PPD locally.


## Your driver not in a Printer Application? - The Legacy Printer Application
If your printer still needs a driver which does not exist in any of the above-mentioned Printer Applications but is available for classic installation on your system (RPM or DEB packages, source code, ...) you can make your driver available in a Printer Application by installing the [**Legacy Printer Application**](https://github.com/OpenPrinting/pappl-retrofit#legacy-printer-application).

It is a part of the [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit) package and it makes drivers classically installed for the system's classically installed CUPS available in a Printer Application and this way for the CUPS Snap and any non-driver-supporting CUPS in the future.

Note that this Printer Application cannot be put into a Snap and has to be classically installed instead, as otherwise it would not have access to your classically installed driver.

This is especially of help for proprietary drivers for legacy printers, which are not updated any more by the manufacturers and so will not get converted to Printer Applications.


## Printer querying on the OpenPrinting web server
Important for making printing "just work" for users is an ideally fully automatic setup of the printer. For driverless IPP printers (AirPrint, IPP Everywhere, Mopria, Wi-Fi Direct Print) this is no problem, they get auto-discovered by CUPS and made available as virtual, temporary print queues. Non-driverless printers which need a driver would need a way to get the correct Printer Application downloaded and installed.

So a printer setup tool would need to discover the non-driverless printers, get their device IDs and send a query to somewhere to get as answer which Printer Application to install. The first idea for this was to get hardware-signature-based search added to the Snap Store, and [an appropriate feature request got already posted](https://forum.snapcraft.io/t/hardware-associated-snaps-snap-store-search-by-hardware-signature/), but after suggesting it near 2 years ago there seemed to be not much interest on that. And if one would try to revive the idea, it can still take rather long until it gets actually implemented.

So I am looking into another approach: For years we could query printers and which drivers support them by the [OpenPrinting web server](http://www.openprinting.org/printers), only that we usually only got told about which upstream source project supports the printer, not ready-to-use packages. Here we could improve and update to get what we want.

The server allows human access ([Printers page](http://www.openprinting.org/printers) -> select printer make/model -> [HP LaseJet 4050](https://www.openprinting.org/printer/HP/HP-LaserJet_4050) -> select driver -> [HPLIP](https://www.openprinting.org/driver/hplip)) and also machine access:

- [`https://openprinting.org/query.php?type=printer&make=HP`](https://openprinting.org/query.php?type=printer&make=HP)
- [`https://openprinting.org/query.php?type=printer&make=HP&model=HP-LaserJet_4050`](https://openprinting.org/query.php?type=printer&make=HP&model=HP-LaserJet_4050)
- [`https://openprinting.org/query.php?type=printer&make=HP&model=HP-LaserJet_4050&moreinfo=1`](https://openprinting.org/query.php?type=printer&make=HP&model=HP-LaserJet_4050&moreinfo=1)
- [`https://openprinting.org/query.php?type=printer&printer=MFG:HP;MDL:LaserJet%204050;&moreinfo=1`](https://openprinting.org/query.php?type=printer&printer=MFG:HP;MDL:LaserJet%204050;&moreinfo=1)
- [`https://openprinting.org/query.php?type=driver&make=HP&model=HP-LaserJet_4050`](https://openprinting.org/query.php?type=driver&make=HP&model=HP-LaserJet_4050)

The answers are in plain text (optionally XML, by adding `&format=xml` to the URLs).

What we need is that this system tells about the **Printer Applications** to use not simply the **drivers**.

A first approach I have already added to the human access interface: The driver pages, at least the ones of drivers which are contained in one of the [4 Printer Applications from OpenPrinting](https://snapcraft.io/search?q=OpenPrinting), contain a prominent link to the appropriate Printer Application. For example see the entries of [HPLIP](https://www.openprinting.org/driver/hplip/), [Gutenprint](https://www.openprinting.org/driver/gutenprint/), [pxlcolor](https://www.openprinting.org/driver/pxlcolor/), [hl7x0](https://www.openprinting.org/driver/hl7x0/), [Ricoh PostScript](https://www.openprinting.org/driver/Postscript-Ricoh/).

Now one could think about adding all printers and drivers supported by the printer applications to the [Foomatic database](https://github.com/OpenPrinting/foomatic-db) (the database behind the lookup system shown here). Probablem is that there are very many printers (~10000). Even if one creates a script to make this automatic it is very awkward. The human access interface gets a lot of "boring" entries, only carrying make and model names and driver relationships, no comments and no support quality info. In addition, we can run into scalability issues, getting the system, or the pre-build of PPDs very slow. We also would need to add a field for the Printer Applications into the database somewhere. And we need to update everything whenever we modify one of the Printer Applications.

So I will try another concept: I will use the Printer Applications themselves and not a database derived from them to answer the queries. If you have a single Printer Application, you can find out whether it supports a given printer by simply querying it with the device ID of the printer:
```
ps-printer-app devices -o device-id='"MFG:HP;MDL:LaserJet 4050;"'
```
There will be no answer if the given printer is not supported, and if it is supported, one gets an answer like this:
```
hp--laserjet-4050--recommended "HP laserjet 4050 (recommended) (en)" "MFG:Hewlett-Packard;MDL:hp laserjet 4050 series;"
```
This is the internal driver name of the Printer Application for this printer, a human-readable description (the one which you also see in the web interface of the Printer Application), and the device ID as it is registered for this printer in the Printer Application.

You see now that the device ID in our query does not match the device ID in the Printer Application. The one in the Printer Application is most probably the actual one of the printers, as it comes from HP's PPD file of the printer, which is included in the Printer Application Snap and the one in the command line simply comes from the top of my head (many years ago I worked in the office of Mandriva in Paris, and the daily-work network printer, and also subject of many tests by me, was an HP LaserJet 4050). Here we see that there is a fuzzy matching between the device IDs. This helps us to also do manual searches (user enters make and model names) and we also can match printers from which we do not know the exact device ID, but at least make and model as written on the printer's case.

What I plan to do with this is to install all the Printer Applications (as most modern printers are driverless IPP there should not appear too many Printer Applications) from the Snap Store on the OpenPrinting web server, stop their daemons (the query works without the daemon), and let the auto-update mechanism of snapd and the Snap Store keep them always up-to-date. Now we extend the script behind the machine access interface (`query.php`) to allow querying all Printer Applications for a given printer.

It would make a script like this being run (this is simplified a lot):
```
#!/bin/sh
(
    for a in hplip ps gutenprint ghostscript; do
        echo "$a: `/snap/bin/$a-printer-app drivers -o device-id=\'"$1"\' 2>/dev/null`" &
    done
    wait
) # | any filters
```
Running it with `'MFG:HP;MDL:LaserJet 4050;'` as argument results in:
```
ps: hp--laserjet-4050--recommended "HP laserjet 4050 (recommended) (en)" "MFG:Hewlett-Packard;MDL:hp laserjet 4050 series;"
ghostscript: hp--laserjet-4050--postscript-en "HP LaserJet 4050, Postscript (en)" "MFG:Hewlett-Packard;MDL:HP LaserJet 4050 Series;CMD:PJL,MLC,PCL,PCLXL,POSTSCRIPT;DES:Hewlett-Packard LaserJet 4050 Series;DRV:DPostscript,R0,M0,TP;"
gutenprint: hp--laserjet-4050--en "HP LaserJet 4050 (en)" "MFG:Hewlett-Packard;MDL:HP LaserJet 4050 Series ;DES:Hewlett-Packard LaserJet 4050 Series;CMD:PJL,MLC,PCL,PCLXL,POSTSCRIPT;"
hplip: hp--laserjet-4050--en "HP laserjet 4050 (en)" "MFG:Hewlett-Packard;MDL:hp laserjet 4050 series;DES:hp laserjet 4050 series;"
```
So all the 4 Printer Applications support it. Such an answer is naturally rare in real life, but it can easily happen with a standard laser printer supporting all the common PDLs, like PostScript, PCL 5e, and PCL-XL.

So we will need to prioritize so that we can return the answers in desirability order. We will first check whether the manufacturer name in the answer is "Generic" and in that case only give a very low priority, as it is a generic match, for example by the PDLs in the "CMD:" field of the device ID. Results which contain the actual model name get higher priority.

If this does not lead to a "best" answer, we will also prioritize between the Printer Applications. For example if it has manufacturer-supplied drivers it will get preferred, also more sophisticated drivers are preferred against simpler drivers. This will lead to the following priority order of our 4 Printer Applications:

- HPLIP
- PostScript
- Gutenprint
- Ghostscript

HPLIP is a manufacturer's driver, PostScript is a collection of manufacturer-supplied PostScript PPDs, Gutenprint is a sophisticated, high-output-quality driver, and Ghostscript contains many simple, generic drivers for PCL and PostScript printers which are better supported by the other Printer Applications.

So our querying printer setup tool would set up our HP LaserJet 4050 with the HPLIP Printer Application (and with this it will be used in PostScript mode).


## pappl-retrofit - The CUPS Driver Retro-Fit Library
Most importantly the Test Printer Application included with pappl-retrofit, originally thought as a programming example and to test drivers whether they work in a Printer Application, was renamed to **Legacy Printer Application** as it serves also for making classically installed CUPS drivers available in a Printer Application. So one can install it on a system using the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) to make available the classically installed printer drivers. So it can be used on production systems to support older, often proprietary drivers which did not get converted to Printer Applications (see also above).

To make the new Legacy Printer Application pweform as best as possible we assure now that it never runs the `driverless` utility as PPD generator/backend if it is installed, as it does not make sense to support driverless IPP printers with a Printer Application, we create PPDs on-the-fly from `*.drv` files, and we use only CUPS backends for best compatibility with the drivers (side-/back-channel support, ...). The PAPPL backends can be used for testing by building with `./configure --enable-pappl-backends-for-legacy-printer-app`.

For **streaming Raster or image jobs to PDF printers** we make use of Ghostscript's new PDF Image and PCLm output devices now. the streaming got [fixed in Ghostscript 9.55](https://bugs.ghostscript.com/show_bug.cgi?id=704160). This way printing on PDF printers needs less client resources and also some printers could start to print the job alreasy before all the job data is transferred ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/a50c15a75d76)).

With the conversion of the `bannertopdf` CUPS filter into a filter function in libcupsfilters (see below) we can now [use a **PDF-based dynamic test page**](https://github.com/OpenPrinting/pappl-retrofit/commit/d8ae99446d21c). In contrary to the former `bannertopdf` CUPS filter the banner instruction file and the PDF template/background file can be joined into one, to ease the implementation of the Printer Application.

When running in debug logging mode we now **save a copy of the job data which goes to the printer** ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/4fb4351638)).

The retro-fitting library has also received many fixes and improvements during the work on the 4 Printer Applications, especially for correctly listing the supported printer models in a user-friendly way, reliably auto-assigning the correct driver/model to a discovered printer, and also to prevent crashes:

- When setting up the driver verify and correct default resolution, especially the default resolution saved in the state file can get invalid if the driver is removed from the Printer Application and another one auto-selected. This causes crashes on shutdown ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/f6908518ec3ce04)).
- Use device ID as display string (for "Add Printer") only if manufacturer matches ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/e08172bdb2f))
- On driver setup skip media sources/types/sizes without PWG name to avoid crashes ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/48c9618e252b)).
- When generating the driver list, never use a single "`*Product`" entry in the PPD file, as this entry is either the model name from the "`*NickName`" or something weird ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/138325e6b331b))
- On driver setup corrected loop to go through the "`*cupsFilter(2)`" lines of the PPD, as only the first line got actually used ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/eea77fb19a9))
- Let system setup set the `CUPS_SERVERBIN` environment variable, as some CUPS filters rely on it ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/1f498627b5ed))

Further development of the library will go with the development of PAPPL and the needs of the Printer Applications. Especially the following features will get implemented/supported as soon as they are implemented/fixed in PAPPL:

- Support for scanning. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/commits/scanning) (Bhavna Kosta's [GSoC project](https://github.com/Bhavna2020/GSoC-2021)).
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142) (Patch already applied in the Printer Application Snaps). 
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).


## Ghostscript Printer Application
**[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) in the [Snap Store](https://snapcraft.io/ghostscript-printer-app)**

I Added all the small, old, and mostly unmaintained printer drivers (Debian packages `printer-driver-...`, see output of "`apt search printer-driver-`" in Debian or Ubuntu distributions) to the Snap. This avoids cluttering the Snap Store with tons of Printer Applications, makes maintenance easier, especially less Printer Applications to rebuild after a change in the infrastructure (PAPPL, libcups, cups-filters, pappl-retrofit, Ghostscript, …), and less infrastructure overhead on the user’s machine if he has more than one printer.

The drivers added are c2050, cjet, min12xxw, pnm2ppa, hpijs (non-HP PCL lasers only), c2esp, dymo-cups-drivers, foo2zjs, fxlinuxprint, m2300w, oki, pxljr, rastertosag-gdi, splix, brlaser, and ptouch-driver.

I used the [Debian source code](https://salsa.debian.org/printing-team) of the drivers to get Debian's patches to fit the old code to the current systems and to fix the bugs, but I built the drivers by myself in the Snap to not pull in their dependencies (old Ubuntu 20.04 packages of the full printing stack including cupsd).

With this and the 3 other driver-retro-fitting Printer Applications **all printer drivers available in Debian packages are now also available in Printer Applications**.

I also make use of libppd’s `*.drv` file support in the Snap ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/5a0514ec00a70)) as several drivers use this format instead of actual PPD files or a PPD-file-generating executable and so we do not need to pre-build the PPD files.

Also I discovered that the `pdftops` CUPS filter (needed by `foomatic-rip` for drivers which accept only PostScript) was missing and added it (it is actually only a little stub to call the `pdftops()` filter function in libcupsfilters).


## CUPS-driver-retro-fitting Printer Applications
I did further testing, optimizing, and debugging on listing the supported printers and finding the best support for a given printer, both whether a Printer Application supports the printer at all and if so, which driver is the best. Listing and checking is fast and reliable now and it should be possible to do it on the OpenPrinting web server (see above).

The Snaps of the 4 Printer Application also got some general improvements:

- Make use of libppd’s `*.drv` support in the Snaps ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/5a0514ec00a70))
- More precise determination of files to include in the Snaps in `snapcraft.yaml` ([commit](https://github.com/OpenPrinting/gutenprint-printer-app/commit/ce72f83474de))
- Patched `dnssd` CUPS backend in the Snaps to only report JetDirect/Port 9100 and not IPP or LPD, to avoid discovery of driverless IPP printers including other Printer Applications ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/f818c779a81ed35))
- Switched to the PDF-based dynamic test page ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/45db46b4ae75))
- Corrected passing of arguments in the startup scripts for the Snaps, to make it possible to pass printer device IDs to the `-o device-id=...` option, needed for checking support of a given printer (see above, [commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/1c8cf6c99cba9b))


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but now we have progress here.

Most of the changes requested in the [snapd Pull Request](https://github.com/snapcore/snapd/pull/10427) got implemented and I got asked to do a second real-life test of the current state of snapd. Everything is working as intended and the results of the test [I have reported in the Pull Request](https://github.com/snapcore/snapd/pull/10427#issuecomment-958500321).

Together with the fact that we have practically all free software printer drivers in Printer Applications now we are very shortly before being able to use the CUPS Snap as standard printing system in Linux distributions, like Ubuntu 22.04 ([Jammy Jellyfish](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)).

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces (see above)
- Testing
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|3138|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|621|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|1798|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|516|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|1859|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|1004|


## CUPS
Currently released is [2.4rc1](https://github.com/OpenPrinting/cups/releases/tag/v2.4rc1).

This is a release candidate for the **first feature release of CUPS on OpenPrinting**. Thanks to Zdenek Dohnal (RedHat) for having taken the role of the release manager for the CUPS 2.4.x series.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with CUPS 2.4.x, if all works well as Snap. The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

**Ongoing discussion**

Feature Request: Implement printer profiles ([Issue #207](https://github.com/OpenPrinting/cups/issues/207))

Zdenek Dohnal (RedHat) writes:

> This issue is a placeholder for implementing printer profiles, which are needed for the case:
>
> - CUPS temporary queues work only with LAN located devices, because the tech uses mDNS for device discovery. However, this situation isn't usually a case for enterprises, where their IT engineers tend to put printers into a separate VLAN - they do it because of security and monitoring. Without any migration plan, these use cases would be left behind if permanent queues are gone and CUPS temporary queues become the only technology in CUPS.
>
>The idea of printer profiles was introduced by Mike Sweet during email communication within OpenPrinting group and distro maintainers and presented during PWG F2F meetups.

In good progress: Remove print filters and printer driver support ([Issue #103](https://github.com/OpenPrinting/cups/issues/103))

Here I have especially reported that we [have most drivers in Printer Applications now](https://github.com/OpenPrinting/cups/issues/103#issuecomment-950977809).

[2.4rc1](https://github.com/OpenPrinting/cups/releases/tag/v2.4rc1)

CUPS 2.4rc1 is a release candidate for OpenPrinting CUPS 2.4.0, which adds some further enhancements before the stable release.

[2.4b1](https://github.com/OpenPrinting/cups/releases/tag/v2.4b1)

CUPS 2.4b1 is the beta release for OpenPrinting CUPS 2.4 which contains several new features such as basic OAuth support, support for AirPrint and Mopria clients and support for running CUPS as a snap, several deprecations (Kerberos, cups-config), removals of old deprecated configuration file directives, and many bug fixes.

```
Changes in CUPS v2.4rc1 (12th November 2021)
--------------------------------------------

- Added warning and debug messages when loading printers
 if the queue is raw or with driver (Issue #286)
- Compilation now uses -fstack-protector-strong if available (Issue #285)

Changes in CUPS v2.4b1 (27th October 2021)
------------------------------------------

- Added support for CUPS running in a Snapcraft snap.
- Added basic OAuth 2.0 client support (Issue #100)
- Added support for AirPrint and Mopria clients (Issue #105)
- Added configure support for specifying systemd dependencies in the CUPS
  service file (Issue #144)
- Added several features and improvements to `ipptool` (Issue #153)
- Added a JSON output mode for `ipptool`.
- The `ipptool` command now correctly reports an error when a test file cannot
  be found.
- CUPS library now uses thread safe `getpwnam_r` and `getpwuid_r` functions (Issue #274)
- Fixed Kerberos authentication for the web interface (Issue #19)
- The ZPL sample driver now supports more "standard" label sizes (Issue #70)
- Fixed reporting of printer instances when enumerating and when no options are
  set for the main instance (Issue #71)
- Reverted USB read limit enforcement change from CUPS 2.2.12 (Issue #72)
- The IPP backend did not return the correct status code when a job was canceled
  at the printer/server (Issue #74)
- The `testlang` unit test program now loops over all of the available locales
  by default (Issue #85)
- The `cupsfilter` command now shows error messages when options are used
  incorrectly (Issue #88)
- The PPD functions now treat boolean values as case-insensitive (Issue #106)
- Temporary queue names no longer end with an underscore (Issue #110)
- The USB backend now runs as root (Issue #121)
- Added pkg-config file for libcups (Issue #122)
- Fixed a PPD memory leak caused by emulator definitions (Issue #124)
- Fixed a `DISPLAY` bug in `ipptool` (Issue #139)
- The scheduler now includes the `[Job N]` prefix for job log messages, even
  when using syslog logging (Issue #154)
- Added support for locales using the GB18030 character set (Issue #159)
- `httpReconnect2` did not reset the socket file descriptor when the TLS
  negotiation failed (Apple #5907)
- `httpUpdate` did not reset the socket file descriptor when the TLS
  negotiation failed (Apple #5915)
- The IPP backend now retries Validate-Job requests (Issue #132)
- Now show better error messages when a driver interface program fails to
  provide a PPD file (Issue #148)
- Added dark mode support to the CUPS web interface (Issue #152)
- Added a workaround for Solaris in `httpAddrConnect2` (Issue #156)
- Fixed an interaction between `--remote-admin` and `--remote-any` for the
  `cupsctl` command (Issue #158)
- Now use a 60 second timeout for reading USB backchannel data (Issue #160)
- The USB backend now tries harder to find a serial number (Issue #170)
- Fixed `@IF(name)` handling in `cupsd.conf` (Apple #5918)
- Fixed documentation and added examples for CUPS' limited CGI support
  (Apple #5940)
- Fixed the `lpc` command prompt (Apple #5946)
- Now always pass "localhost" in the `Host:` header when talking over a domain
  socket or the loopback interface (Issue #185)
- Fixed a job history update issue in the scheduler (Issue #187)
- Fixed `job-pages-per-set` value for duplex print jobs.
- Fixed an edge case in `ippReadIO` to make sure that only complete attributes
  and values are retained on an error (Issue #195)
- Hardened `ippReadIO` to prevent invalid IPP messages from being propagated
  (Issue #195, Issue #196)
- The scheduler now supports the "everywhere" model directly (Issue #201)
- Fixed some IPP Everywhere option mapping problems (Issue #238)
- Fixed support for "job-hold-until" with the Restart-Job operation (Issue #250)
- Fixed the default color/grayscale presets for IPP Everywhere PPDs (Issue #262)
- Fixed support for the 'offline-report' state for all USB backends (Issue #264)
- Documentation fixes (Issue #92, Issue #163, Issue #177, Issue #184)
- Localization updates (Issue #123, Issue #129, Issue #134, Issue #146,
  Issue #164)
- USB quirk updates (Issue #192, Issue #270, Apple #5766, Apple #5838,
  Apple #5843, Apple #5867)
- Web interface updates (Issue #142, Issue #218)
- The `ippeveprinter` tool now automatically uses an available port.
- Fixed several Windows TLS and hashing issues.
- Deprecated cups-config (Issue #97)
- Deprecated Kerberos (`AuthType Negotiate`) authentication (Issue #98)
- Removed support for the (long deprecated and unused) `FontPath`,
  `ListenBackLog`, `LPDConfigFile`, `KeepAliveTimeout`, `RIPCache`, and
  `SMBConfigFile` directives in `cupsd.conf` and `cups-files.conf`.
- Stubbed out deprecated `httpMD5` functions.
- Add test for undefined page ranges during printing.
```

## cups-filters
Currently released is [1.28.10](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10).

In cups-filters we are getting closer to the 2.0 release. All filters which are not printer drivers are now converted to filter functions and the universal filter function is also added. Also all PPD-handling code from CUPS is moved into cups-filters to allow retro-fitting of drivers also after CUPS has dropped PPD file support. Several minor bug fixes and improvements got initiated by the work on adding the old, unmaintained printer drivers to the Ghostscript Printer Application. Now mainly clean-up is needed.

- Merged [Pranshu Kharkwal's](https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023) [Pull Request](https://github.com/OpenPrinting/cups-filters/pull/421/) for adding a universal filter function and CUPS filter to replace the chain of individual CUPS filters. Also did the [build system integration](https://github.com/OpenPrinting/cups-filters/commit/3b1ca330cc991a) for the new filter to easily choose between the universal filter executable or individual filter executables. **Now all GSoC 2021 projects on cups-filters are merged.**
- Ported CUPS’ PPD compiler (`ppdc`) into libppd ([commit 1](https://github.com/OpenPrinting/cups-filters/commit/d64c6c5873), [commit 2](https://github.com/OpenPrinting/cups-filters/commit/cb3020c12a), [commit 3](https://github.com/OpenPrinting/cups-filters/commit/d107a29dc7)). This way also classic CUPS drivers using `/usr/share/cups/drv/*.drv` files instead of physical PPDs can get straightforwardly encapsulated into Printer Applications with pappl-retrofit now. **So all PPD handling functionality of CUPS is ported to cups-filters now and all types of classic CUPS printer drivers can get easily converted to Printer Applications.**
- Improved `bannertopdf()` filter function to integrate in pappl-retrofit more easily, to allow PDF-based dynamic test pages, easier to customize for the specific Printer Applications, no need of a PostScript interpreter ([commit](https://github.com/OpenPrinting/cups-filters/commit/cef6da12e8)).
- Dropped support for CUPS < 2.2.2 and QPDF < 10.3.2 from cups-filters 2.x.
- Removed the obsolete `urftopdf` CUPS filter, as libcups supports Apple Raster already for some years now.
- Fixed [bugs in the `texttopdf()` filter function](https://github.com/OpenPrinting/cups-filters/commit/a3484d65a7) which got discovered when developing the universal filter function.
- In `pwgtoraster()` with PPD do not modify the Raster header via IPP options ([commit](https://github.com/OpenPrinting/cups-filters/commit/7879d328)).
- Parse device IDs with spaces correctly ([commit](https://github.com/OpenPrinting/cups-filters/commit/9ab2b735b)).
- Allow specifying CUPS filter/backend executable without full path in the `filterExternalCUPS()` filter function ([commit](https://github.com/OpenPrinting/cups-filters/commit/3d0b54393)).
- Let `filterExternalCUPS()` return 1 if filter is terminated by a signal ([commit](https://github.com/OpenPrinting/cups-filters/commit/dbcebbec8d)).
- Added "`FXOutputMode`" of Fuji Xerox to auto-mapping IPP attributes to PPD option settings ([commit](https://github.com/OpenPrinting/cups-filters/commit/422bcbab20)).
- Useful "`*Product:`" entries in the PCL-XL PPDs ([commit](https://github.com/OpenPrinting/cups-filters/commit/acafde03068)).
- Removed “series” from printer model names when normalizing them to make it easier to search for support for a given printer ([commit](https://github.com/OpenPrinting/cups-filters/commit/fbf9c356cb9c7)).

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will most probably come with cups-filters 2.x. The CUPS Snap currently uses 1.28.10. The Printer Application Snaps use the current GIT master of cups-filters.

```


CHANGES IN V2.0.0

	- libcupsfilters, universal: Added the universal() filter
	  function which allows a single CUPS filter executable which
	  auto-creates chains of filter function calls to convert any
	  input data format into any other output data format.So CUPS
	  can call a single filter for any conversion, taking up less
	  resources. Thanks to Pranshu Kharkwal for this excellent
	  GSoC project (Pull request #421).
	- Build system, README: Require CUPS 2.2.2+ and QPDF 10.3.2+.
	  Removed now unneeded ./configure switches for PCLm support
	  in QPDF and for use of the urftopdf filter for old CUPS
	  versions.
	- urftopdf: Removed as we require CUPS 2.2.2+ now which
	  supports Apple Raster by itself.
	- libppd: Ported CUPS' PPD compiler into libppd. Now the
	  functions for PPD file collections also take driver
	  information files (*.drv) into account, allowing easy
	  retro-fit of ALL CUPS drivers. In addition, the API of CUPS'
	  PPD compiler is available (ppd/ppdc.h) and everything stays
	  available when CUPS drops PPD support.
```

## PAPPL
Currently released is [1.1b3](https://github.com/michaelrsweet/pappl/releases/tag/v1.1b3).

> PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10 and higher.

After this release only changes for Windows compatibility got added.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

```
Changes in v1.1b3
-----------------

- Added a new `papplSystemSetAuthCallback` API to support alternate
  authentication mechanisms (Issue #185)
- Added `papplCreateTempFile` and `papplPrinterOpenFile` file creation functions
  (Issue #186)
- Added support for a `server-options` option for the `server` sub-command
  (Issue #187)
- Added an optional callback for processing USB gadget print data.
- Added `papplCopyString`, `papplGetRand`, and `papplGetTempDir` utility
  functions.
- Calling `papplSystemSetHostName` did not also update the default TLS common
  name.
- Now map `file:///dev/null` to `NUL:` on Windows.


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
```

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
