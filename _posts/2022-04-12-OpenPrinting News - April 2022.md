---
title: OpenPrinting News - April 2022
layout: single
author: Till
excerpt: Linux App Summit 2022, GSoC 2022, "cups" Snap interface, Snap vs. AppImage for printing, approaching cups-filters 2.x, Ubuntu 22.04 LTS
---
## Ubuntu 22.04 LTS (Jammy Jellyfish) is coming!
On Thursday next week, April 21, 2021, is Ubuntu release day again! Ubuntu 22.04 LTS!

Not a lot of new stuff in terms of printing (in addition to all printing- and scanning-related packages being up-to-date) but at least many bug fixes, especially with the page geometry, `number-up`, `orientation-requested`, all settings for `print-scaling` (`auto`, `auto-fit`, `fit`, `fill`, `none`) are now working correctly, in arbitrary combinations.

Otherwise we have GNOME 42 now with [a lot of nice newfeatures](https://www.omgubuntu.co.uk/2022/04/ubuntu-22-04-lts-20-key-changes)!


## Linux Application Summit 2022
I will be on this year's [Linux Application Summit](https://conf.linuxappsummit.org/event/4/overview) on April 29 and 30 in Rovereto, Italy, near the Lake Garda!

There I will give a [talk](https://conf.linuxappsummit.org/event/4/contributions/106/) about the New Architecture of printing and scanning and what is important for developers of desktop applications.

I will give a summary of the changes and tell what needs to be changed in the desktop world, the [new printer setup tool](https://openprinting.github.io/OpenPrinting-News-February-2022/#gui-printer-setup-tool-and-print-dialog---essential-for-user-experience), [print dialog requirements](https://openprinting.github.io/OpenPrinting-News-February-2022/#the-print-dialogs) and [CPDB}(https://nilanjanalodh.github.io/common-print-dialog-gsoc17/), snaboxed/distribution-independent packaging, like [Snap](https://openprinting.github.io/OpenPrinting-News-March-2022/#how-to-snap-an-application), [Flatpak](https://openprinting.github.io/OpenPrinting-News-March-2022/#flatpak-and-printing), ...

This should help application and GUI/desktop developers to get print and scan functionality of their software just work.

The talk will take place on Sat, April 30 at 15:35 CEST in the Auditorium. It will be also possible to participate remotely. If the talk will get recorded, I will post a link here and also in the May news post.

There will also be a Canonical booth with a Canonical gang of 5 people (including me). The orange polo shirts are already in production.

And on Fri, April 29, at the end of the lightning talk session an old, gray-bearded, long-time Canonical employee (nearly from the beginning on) will do an important announcement!

Thanks, Heather Ellsworth, for participating in the organization of the event and making me aware of the even!


## Google Summer of Code 2022
The time window for the contributor candidates to submit their proposals to Google is open and many proposals got already submitted. Deadline will be April 19, a week from now.

So we are still open for GSoC contributors, also non-students, like for example retired people looking into getting involved, and especially people who join our OpenPrinting community, stay with us, maintain, and improve their code, bring in new ideas, mentor contributors in the following years, write on our web site, ...

We have posted [everything you need to know for participating](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022) and our [**project ideas**](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects) for you to have a look.

We also appreciate any new project ideas brought up to us and narurally also contributors suggesting their own idea.


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

Unfortunately, [snapd](https://snapcraft.io/snapd) 2.55 with the new `cups` interface has not made it into the stable channel of the Snap Store yet. A non-`cups`-interface-related [regression](https://forum.snapcraft.io/t/snapd-2-55-2-stable-release-reverted/) has made it getting withdrawn shortly after being promoted into the stable channel. Due to the progressive releases many people did not even see it in stable.

The regression has been fixed already and snapd 2.55.3 with the fix is available in the beta and candidate channels. So who wants to test the new `cups` interface can manually install snapd 2.55.3 via
```
sudo snap refresh --candidate snapd
```
Then everything should work as described [last month](https://openprinting.github.io/OpenPrinting-News-March-2022/#cups-snap-and-snapd-printing-interface).

If not, there is still a bug which could affect you:

During the testing of 2.55.2 I also discovered a bug of the `CUPS_SERVER` environment variable wrongly being set to `/var/cups/cups.sock` on ALL Snaps, regardless whether they plug `cups` or not, especially also on the CUPS Snap and Snaps plugging `cups-control` which cease to work by that. This [got fixed](https://github.com/snapcore/snapd/pull/11616) by Michael Vogt, the snapd team manager.

When [testing the fix](https://github.com/snapcore/snapd/pull/11616#issuecomment-1087973483) I discovered [another bug](https://github.com/snapcore/snapd/pull/11616#issuecomment-1088305845) of the `CUPS_SERVER` environment variable wrongly set by snapd 2.55.2 persisting on the update to the fixed 2.55.3 and with [further testing](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/28653/32?u=till.kamppeter) and [even more testing](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/28653/33?u=till.kamppeter) I found out that to work around/fix it, you have to run
```
sudo /usr/lib/snapd/snap-discard-ns SNAPNAME
```
on all your already installed Snaps after updating snapd to 2.55.3 to "reset" their environments. This assures that the `CUPS_SERVER` environment variable is set to `/var/cups/cups.sock` in all Snaps which plug `cups` and not set in any other Snap, especially the CUPS Snap or Snaps plugging `cups-control`.

So apply the command either to all Snaps, listed by
```
snap list
```
or at least to the CUPS Snap
```
sudo /usr/lib/snapd/snap-discard-ns cups
```
and each Snap which plugs `cups` or `cups-control`:
```
snap connections | grep cups:cups
snap connections | grep :cups-control
```
Michael Vogt told me that he is working on a fix this week and that he already has an idea of what can have caused the bug.

Anyway, thanks a lot to Michael Vogt and his team on the hard work on snapd.


## AppImage and printing
I had a quick look (especially also for the talk on Linux App Summit 2022, see above) into [this format](https://appimage.org/) for distribution-independent packaging and found out that it is, as [Flatpak](https://openprinting.github.io/OpenPrinting-News-March-2022/#flatpak-and-printing), also not suitable for packaging system services, like CUPS, ipp-usb, or Printer Applications.

AppImage is not actually sandboxed packaging, as Snap and Flatpak are. It is simply a single downloadable file, which a user puts into their home directory, makes it executable, and starts it, this way the included (squashfs) file system is mounted and the application started. The file system *is supposed* to contain everything to run the application. So one does not need to install anything.

Not having any security concept (not found the word "security" on the site), like AppArmor or similar, it would be dangerous to put such files into system directories and run them as root, also as normal user this is questionable. **So this concept is not suitable for system daemons, like CUPS, ipp-usb, and Printer Applications, meaning that we will continue Snap-only in terms of distribution-independent upstream packaging.**

**Printing from AppImaged applications should just work though, as there is no security concept and therefore full access to the host system.**


## Approaching cups-filters 2.0
I am getting even closer to the release, nearly no bug fixing and feature adding any more but mostly work on cleaning the code and getting a nica API. So we will see [cups-filters](https://github.com/OpenPrinting/cups-filters) 2.0 soon.

Important part of my current work on cups-filters is to **get away from mix-up of different coding and naming styles** arising from the many code contributions I collected from the announcement of the switch-over from the PostScript-based to the PDF-based printing workflow on the first OpenPrinting Summit in Atlanta, Georgia back in 2006.

I want to get cups-filters following the same [coding guidelines](https://github.com/OpenPrinting/cups/wiki/Developing-CUPS) as Michael Sweet created for CUPS, and so extend them to the rest of OpenPrinting.

Therefore I started with the **naming of the functions and data types**. All [public API functions](https://github.com/OpenPrinting/cups-filters/commits/master?after1424691d5c73fe0b022fdab5c99660e275d79468+0) now have names starting with `cf` and the name itself in CamelCase, as the functions of CUPS which start with`cups` instead. Library-internal functions are declared in `*-private.h` files and have names like the API functions but starting with `_cf`, like the private functions of CUPS start with `_cups`. Functions used in only the source file where they are defined (local functions) are not declared in any `*.h` file, declared `static`, and have all-lowercase names with "`_`" as word separator. Constants are all-uppercase, also with "`_`" as word separator, and start with `CF_`.

This way one can very easily see in the source code of some program what comes from libcupsfilters.

This is a substantial change on the API, but fortunately, there are only very few consumers of the libcupsfilters API yet, to my knowledge only [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/) and the [c2esp](http://sourceforge.net/projects/cupsdriverkodak/) printer driver. I have [updated the pappl-retrofit code](https://github.com/OpenPrinting/pappl-retrofit/commit/c1b14b129cadf) appropriately and also the patch for the c2esp printer driver ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/672188079a25), [commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/2e634322a39b)) in the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app). After that I have tested all the 4 Printer Applications and all are working correctly with the new API.

Even without the renaming the API of the libcupsfilters in cups-filters 2.x is not compatible with the libcupsfilters of the 1.x series. Therefore I have [**bumped the library's soname to 2**](https://github.com/OpenPrinting/cups-filters/commit/ef2d2b13b3b2). I have also set the version number to the one of the [**first planned release: 2.0b1**](https://github.com/OpenPrinting/cups-filters/commit/8691d15327). 

The new cups-filters will also drop support for old software. At least CUPS 2.2.2, Ghostscript 9.56.0 (if GHostscript is used), and QPDF 10.3.2 are required. Note that no yet all of the conditionals are removed.

When compiling on Ubuntu 22.04 (gcc 11.2.0) there are **no compiler warnings**.

All functions in libcupsfilters, especially the filter functions, do not log to `stderr`. **All logging is done via logging functions** (see also `cupsfilters/log.h`, [`cupsRasterParseIPPOptions()`](https://github.com/OpenPrinting/cups-filters/commit/c89237765a), [`bannertopdf()`](https://github.com/OpenPrinting/cups-filters/commit/60ed1fa002), [raster driver functions](https://github.com/OpenPrinting/cups-filters/commit/530783e20)).

**Filter functions do not load or modify the PPD file data structure**. When using PPD files, the structure has to be set up before calling the first filter function for the job. There is a new API function for that, `cfFilterLoadPPD()` There is also a new filter function to free the space used by the PPD data structure again: `cfFilterFreePPD()`.

Generally all filter functions use parameters instead of environment variables now.

The **`ghostscript()` filter function** now makes use of Ghostscript 9.56.0 or newer supporting all data formats used by driverless IPP printing as output formats. It outputs PWG Raster, Apple Raster, PCLm (both color and grayscale), PDF (standard with vector graphics and fonts, embedded raster in color and grayscale), and for legacy CUPS drivers also CUPS Raster and PCL-XL (both color and grayscale).

The default output format of the `gstoraster` CUPS filter for the case that the `FINAL_CONTENT_TYPE` environment variable is set to an unknown format is CUPS Raster now, as the unknown format can come from a `rasterto...` CUPS driver.

**Ghostscript is the recommended renderer (RIP, Raster Image Processor)** for high-level graphics print files (PDF and PostScript) for CUPS, cups-filters, and Printer Applications. It is optimized for print output and supports **ALL** data formats for driverless printing.

**Note that we cannot neglect PCLM in driverless printing! Printers like the [HP LaserJet M15](https://github.com/apple/cups/issues/6022) do driverless printing only with PCLm!**

For those who prefer MuPDF instead of Ghostscript as PDF renderer the **`mupdftopwg()` filter function/CUPS filter** is now fully usable as one can generate with it (and the help of an additional post-filter) all Raster formats (Apple/PWG/CUPS Raster, PCLm) and so one can use MuPDF instead of Ghostscript for all driverless printers and printers with CUPS Raster driver (and with `pdftops()` also for all PostScript printers).

`mupdftopwg()` was originally named `mupdftoraster()`. We renamed it as the underlying `mutool` only outputs PWG Raster and the actual output we get by calling `pwgtoraster()` or `rastertopclm()` afterwards. The changes we did on `mupdftopwg()` are simply to get color space and resolution for the final output format and not for PWG Raster from the PPD file or IPP attributes.

Therefore we enhanced the **`pwgtoraster()` filter function** to take both Apple and PWG Raster as input and produce Apple, PWG, and CUPS Raster as output,

Fixed the **`rastertopclm()` filter function** to work with printers which do not supply a default resolution for PCLm, typically models which support only one single resolution, like the [HP LaserJet M15](https://github.com/apple/cups/issues/6022#issuecomment-1081111292).

As the **`pclmtoraster()` filter function** already produces PWG Raster, it is only the flick of flag in the `cupsRasterOpen()` function to get Apple Raster output, so we support Apple Raster here now.

Let the **`rastertopwg()` filter function** error out if no or a wrong output format is specified and let the CUPS filter `rastertopwg` default to PWG Raster.

The **`pdftopdf()` filter function** received further fixes on the output page geometry.

I especially fixed the output when the [`landscape` or `orientation-requested`](https://github.com/OpenPrinting/cups-filters/issues/456) options are used and when the auto-rotation of the input pages is suppressed (see also [this great write-up](https://wiki.debian.org/CUPSPdfToPdf) from Brian Potkin about `pdftopdf`).

Fixed also the behavior of the filter function if the output page is landscape-shaped (Width > Height) which is usually the case if the printer feeds the paper long-edge-first ([Issue report](https://github.com/OpenPrinting/cups-filters/issues/454)).

in the **`pdftops()` filter function** use Poppler instead of Ghostscript for all Apple LaserWriter models, as they all seem to have the firmware bug not working with Ghostscript's PostScript output ([commit](https://github.com/OpenPrinting/cups-filters/commit/f93d64bfb6d2a)),

We also identify HP LaserJet printers more precisely to apply the correct PostScript interpreter bug workarounds. Only HP LaserJet XXXXY models with XXXX being a number of at least one and at most four digits and Y an optional group of letters (no extra words after that) are to consider old and to be used with Poppler, whereas printers with extra words in the model name ([HP
LaserJet 500 color M551](https://bugs.launchpad.net/bugs/1967816)) are to consider modern again and **need** Ghostscript's PostScript output.

For the **`universal()` filter function** we also install the individual filter executables together with the `universal` CUPS filter now, as PPD files could explicitly call the individual filters  via their `*cupsfilter(2):` lines ([commit](https://github.com/OpenPrinting/cups-filters/commit/4da1faf99bad9e)), As the executables are only stubs which call the actual filter functions this does not occupy much more disk space.

Several fixes got applied to the **`bannertopdf()` filter function** ([commit](https://github.com/OpenPrinting/cups-filters/commit/3b80c89c7e72)). Especially it does not use environment variables any more, but instead, it takes the template directory as parameter and printer info and location via the "printer-info" and "printer-location" options or IPP attributes. All dynamic memory is freed correctly after use now and there is no crash on a missing PDF template any more.

Also let the generated PPD files for driverless printers only have one `*cupsFilter2: "..."` line for the preferred data format and not one for each supported format any more ([commit](https://github.com/OpenPrinting/cups-filters/commit/580d67176a24b)), and we removed the unused Kolor Manager/Oyranos support code from the color management functions.

What is missing now is a way to build cups-filters without PPD support, general code clean-up, license info in the source files, and then we are ready for a Release Candidate.


## CUPS-driver-retro-fitting Printer Applications
**HPLIP 3.22.2 in all Printer Applications**

The [HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) ([Snap Store](https://snapcraft.io/hplip-printer-app)) got another update of the underlying HPLIP version. It is now [HPLIP 3.22.2](https://developers.hp.com/hp-linux-imaging-and-printing/release_notes). We continue using the [Debian package sources](https://salsa.debian.org/printing-team/hplip.v2) to include more than 80 bug fixes not adopted upstream. Sorry for the delayed updates due to this. It is always a lot of work for Debian printing package maintainer Thosten Alteholz to update the upstream source code and to adapt the patches where needed. Thanks a lot for this, Thorsten.

The update adds explicit support for the new HP printer models which got released in the beginning of 2022. Note that most of those printers should also work as driverless IPP printers and therefore also work without the HPLIP Printer Application.

The update worked out smoothly. If you have installed an HPLIP Printer Application version which still uses an older HPLIP and have the proprietary plugin installed, the plugin gets updated right after the installation of the new version of the Printer Application. Note that this can take some minutes and that during this time your printer will perhaps not work.

After that, I have updated also the HPLIP used in the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) (PostScript PPD files for HP printers, [Snap Store](https://snapcraft.io/ps-printer-app)) and in the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) (HPIJS for non-HP PCL-5c/e lasers, [Snap Store](https://snapcraft.io/ghostscript-printer-app)) to the Debian package source of HPLIP 3.22.2.

In [all the 4 Printer Applications](https://snapcraft.io/search?q=OpenPrinting)  (and also in the [CUPS Snap](https://github.com/OpenPrinting/cups-snap)) I have also fixed [bugs caused by GNU-TLS -> SSL transition of CUPS and PAPPL](https://github.com/OpenPrinting/hplip-printer-app/commit/c0961e891).

In addition, I have updated the code of [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/commit/c1b14b129cadf) and the patch for the `c2esp` printer driver in the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/672188079a25), [commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/2e634322a39b)) for the new cups-filters 2.x API. I tested all the 4 Printer Applications and all are working correctly with the new API.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|4584|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|1895|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2358|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1235|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|4141|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|3395|


## CUPS
Currently released is [**2.4.1**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.1).

There will be further bug fix releases in the 2.4.x series. Some bug fiixes were done, see changes below.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with 2.4.1.

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.2 (TBA)
----------------------------

- The cupsd daemon removed processing temporary queue (Issue #364)
- Fixed delay in IPP backend if GNUTLS is used and endpoint doesn't confirm
  closing the connection (Issue #365)

- Re-added LibreSSL/OpenSSL support (Issue #362)
- Updated the Solaris smf service file (Issue #368)
```


## cups-filters
Currently released is [1.28.15](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.15).

We are continuing to polish and to fix bugs for the 2.0.0 release. I have especially renamed function and data types to get a clean API, bumped the soname of libcupsfilters to 2, set the version number to 2.0b1, and fixed tons of bugs.

I also backported several fixes to the 1.x branch so that they make it into current Linux distributions, especially Ubuntu 22.04 LTS (Jammy Jellyfish) which has [Final Freeze tomorrow](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/) and will get released one week later on thursday, April 21.

The fixes are the ones on the `pdftopdf` CUPS filter for printing on printers which take the paper long-edge first (1.28.13) and for the `landscape` or `orientation-requested` options to work correctly (1.28.14). Also fixes for the handling of PostScript interpreter bugs in `pdftops` got backported, for Apple Laserwriter printers into 1.28.13 and for HP LaserJet printers into 1.28.15. I also backported the fix for PCLm printers which do not report their default resolution into 1.28.14.

[1.28.13](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.13)

Bug fix release, for correct printing on printers which take in the paper long-edge-first and for Apple LaserWriter printers.

[1.28.14](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.14)

Bug fix release to get correct PDF output when using "landscape", "orientation-requested", and/or "nopdfAutoRotate" options, and to get PCLm printing work on printers not telling their PCLm default resolution.

[1.28.15](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.15)

Bug fix release, to make all HP LaserJet PostScript printers correctly work.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with cups-filters 1.28.15. The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.

```
CHANGES IN V1.28.15

	- pdftops: In pdftops identify old LaserJets more precisely
	  for working around PostScript interpreter bugs, older
	  printers need Poppler, newer models need Ghostscript
	  (Ubuntu bug #1967816).

CHANGES IN V1.28.14

	- pdftopdf: Correct the output when suppressing auto-rotation
	  (option "nopdfAutoRotate"). Depending on the situation pages
	  got cropped in the wrong orientation or de-centered.
	- pdftopdf: Correct the output when the
	  "orientation-requested" or the "landscape" option is
	  supplied. Output could be de-centered (Issue #456),
	  portrait-oriented pages be wrongly cropped and division of
	  the output page into cells for N-up done in the wrong
	  orientation.
	- rastertopdf: In PCLm output mode the filter failed to
	  generate PCLm if the printer has no
	  "pclm-source-resolution-default" IPP attribute.

CHANGES IN V1.28.13

	- pdftopdf: Fix N-up printing when paper is taken
	  long-edge-first by the printer.
	- pdftopdf: Fix cropping ("print-scaling=none" and
	  "print-scaling=fill") when paper is taken long-edge-first by
	  the printer (Issue #454).
	- pdftops: Use Poppler for all Apple LaserWriter models (Issue
	  #452).
```


## PAPPL
Currently released is [1.1.0](https://github.com/michaelrsweet/pappl/releases/tag/v1.1.0).

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.2b1
-----------------

- Added macOS menubar icon/menu (Issue #27)
- Added IPP notifications support with `papplSystemAddEvent` and
  `papplSubscriptionXxx` functions (Issue #191)
- Added `papplPrinterDisable` and `papplPrinterEnable` functions and proper
  support for the IPP "printer-is-accepting-jobs" attribute.
- Added OpenSSL/LibreSSL support (Issue #195)
- Updated `papplPrinterSetReadyMedia` to support up to `PAPPL_MAX_SOURCE`
  media entries, regardless of the number of sources.
```
