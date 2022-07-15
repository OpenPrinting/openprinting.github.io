---
title: OpenPrinting News - July 2022
layout: single
author: Till
excerpt: New pages about our work, GUADEC, GSoC 2022 projects, "cups" snapd interface bugs fixed, PPD-independent cups-filters 2.x, CUPS
---
## New web pages about our work
At Canonical I got told some weeks ago that someone asked what Canonical is doing for printing with Linux. The person seems not having been aware that Canonical is paying me to lead OpenPrinting full-time.

This brought us to the idea to soon post a Ubuntu Blog article and to support such an article we need more detailed information about what OpenPrinting is doing, to link it from there and also partially re-post it in the blog.

Therefore I have decided to add three articles to our static web site (not the [News and Events](/news/) blog series here):

- [How did this all begin?](/history/)
- [Our principal achievements](/achievements/)
- What we are currently doing

The first is derived from my [blog article about how I got started with OpenPrinting](/How-did-this-all-begin/), the second one is about what we have achieved in all the time, and the third will be about what we are currently doing. The first two are already available (simply follow the links) and the third I will write soon after I an back from [GUADEC](#guadec-2022).

The new pages are all linked from our "[About Us](/about-us/)" page.


## GUADEC 2022
[GUADEC 2022](https://events.gnome.org/event/77/overview) in Guadalajara in Mexico is approaching! Next week we will celebrate the 25th anniversary of GNOME!

It is the first time for me to attend a GUADEC and also the first time for me to visit Mexico.

In my [talk](https://events.gnome.org/event/77/contributions/285/) (July 21, 14:20 - 15:00 local time, Bosch Auditorium) I will spread the news about our [GSoC](#google-summer-of-code-2022) work on the "Printers" module of the GNOME Control Center and on the GTK print dialog and also introduce the GNOME Community into the New Architecture of printing and scanning (**Update:** [slides](https://events.gnome.org/event/77/contributions/285/attachments/88/187/guadec-2022-new-architecture.pdf)).

You will probably often enough find me at the Canonical booth (or better gathering table, see [last month's news](/OpenPrinting-News-June-2022/#guadec-2022)).

If you cannot make it to Guadalajara in Mexico but to Berlin, you can get to a satellite event, the [Berlin Mini-GUADEC 2022 in the C-Base](https://wiki.gnome.org/Hackfests/BerlinMiniGUADEC2022) and meet Berlin's/Europe's GNOME community and besides local sessions, hackfests, ... also have a public viewing of the complete GUADEC. And some talks of the GUADEC are even performed in Berlin and transmitted live to Mexico. This is the wonderful world of hybrid (in-person + online) conferences!


## Google Summer of Code 2022
Now we are one month into the coding period of the Google Summer of Code 2022 and all our 8 contributors are doing great work!

All of them have posted a little summary of what they have done in our group chat on Telegram:

**Converting Braille embosser support into a printer application**<BR>
Contributor: Chandresh Soni<BR>
Mentors: Till Kamppeter, Samuel Thibault<BR>
> I researched the existing implementation of Braille in cups-filters and how things operate to have a general concept of how braille embossers work and what functionality they bring. I learned about liblouis and ImageMagick, which are used to transform basic text or images to Braille. I've also configured a virtual BRF printer. Now I'm attempting to implement the current filter features, which is converting old shell scripts to C.

**Scanning Support in PAPPL**<BR>
Contributor: Deepak Khatri<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>
> I have already looked over PAPPL code and some implementations of it, and it is functioning well. I've also seen the PAPPL scanning work that Bhavna Kosta and others have done in the past. I'm currently going through the current PAPPL scanning issues. I'll try to fix some of the issues in the approaching days as I continue working.

**Adding Common Print Dialog Backends (CPDB) support to existing Print Dialogs**<BR>
Contributor: Gaurav Guleria<BR>
Mentors: Till Kamppeter<BR>
> Hello. I have been working on writing the GTK CPDB print dialog backend, and it's going good. It has been a bit slow, as there is no online documentation regarding it and I have to constantly refer the GtkPrintBackendCups and GtkUnixPrintDialog files along with various others. Some of the files aren't even commented and follow old Gtk code conventions, so it takes some time to understand them (I even talked to Emmanuele Bassi about this). Nevertheless, due to the progress I had made earlier as well as putting in some extra hours, I will be able to complete it by the end of first month of GSoC as proposed in the timeline. I plan to finish it by this week, so I can fix any bugs or continue with the qt backend.
>
> I just have to add support for multiple backends, configure media-margins and borderless option properly, and add a few more things.
>
> I also fixed some more issues with the cpdb-backend.

Gaurav's [GitHub repository](https://github.com/TinyTrebuchet/gtk/tree/cpdb)

**GNOME Control Center GUI for discovering non-driverless printers and finding suitable Printer Applications for them**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Michael Sweet, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
> Hello all, I am currently working on updating the discovery of devices in cups-pk-helper.We will use PAPPL, Printer apps, and lpinfo (as long as it is accessible) in the new approach of device discovery .I had to understand the current functions of cups-pk-helper and the general architecture of G-C-C, which was using it to locate and configure printers.I will try to complete this by next week.After that, I will be working on creating a GUI for printer application set up dialog whose design is ready. I will be sharing the design on the link given below once I am done updating cups-pk-helper. One of the most challenging task for me till now was to use gnome-builder to build current branch of G-C-C. There were too many dependency errors and other weird errors while building it.I had to ask for help at several Gnome IRC channels and even creating a issue at gnome-builder gitlab's page.Finally, I was able to build it successfully after a lot of errors and using few tricks suggested by Christian Hergert(maintainer of gnome-builder).Here's the link for discussion on the new printer dialog.

[Issue report](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878) with discussion on Mohit's work.

**Scanning Support in PAPPL with eSCL Support**<BR>
Contributor: Rishabh Maheshwari<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>
> I have completed learning about both AirSane and PAPPL and have marked the important files and some other related files in them and I have prepared short notes for the description and usage of these files.
> Currently, I am trying to use the code from AirSane and use it in PAPPL in one of the scan functions to make our eSCL parser by making the required changes in it in.

**Add Avahi calls for discovering and resolving driverless IPP printers and Optimize the processes**<BR>
Contributor: Sachin Thakan<BR>
Mentors: Till Kamppeter, Michael Sweet, Deepak Patankar<BR>
> Hi all, until now I was doing online reading and trying to understand the implementation for service discovery using avahi and bonjour. From this week I starting to work on segregating the tasks of service browse and service resolve and will try to finish the utility for at least one of them and subsequently make a push.

**Make a native Printer Application from Gutenprint**<BR>
Contributor: Sahil Kumar Dhiman<BR>
Mentors: Till Kamppeter, Michael Sweet, Solomon Peachy, Robert Krawitz<BR>
> I have been actively working to understand the PAPPL framework. I have learnt basics of PAPPL and proceeded to knowing the libgutenprint library. I had made myself familiar with the most of the APIs. Having read and understood the workflow of hp_printer_app I have begun modifying the code for Gutenprint Printer Application. The hard task of getting the capabilities of printer using the libgutenprint library has been almost completed. I am also finishing my code after which I will be working on printer admin web interface.
>
> All the documentation will also be updated as time progresses.

Sahil's [GitHub repository](https://github.com/rookieCoder9/gutenprint-printer-app)

**Create new printer setup tool for the GNOME Control Center**<BR>
Contributor: Shivan Mishra<BR>
Mentors: Till Kamppeter, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
> Hello all, I have been working on modifying Divyasheel's code for adding functionality to list IPP printing services in the main panel along with CUPS queues. I plan to finish it by this week so that I can move over to adding IPP Device Configuration System Service in the base hybrid module. Other than this, I have also been working on removing widget for setting of drivers (PPD) in the Printer Details dialog for printers advertised as IPP services over DNS-SD.

Feature requests so far:
- [#1877](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1877): Improve setting of IPP options
- [#1878](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878): Allow to add new printers via Printer Applications
- [#1879](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1879): Do not show setting of drivers for IPP printers
- [#1911](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1911): Printers: Make adminurl available for IPP printers


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

The [`cups` snapd interface](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/) is now fully working as [documented](https://forum.snapcraft.io/t/the-cups-interface/)!

The bugs we told about [last month](/OpenPrinting-News-June-2022/#cups-snap-and-snapd-printing-interface) are all fixed and appropriate CUPS Snap and snapd versions are released. Also the CUPS Snap is now auto-connecting the system's `cups-control` interface. So snappers only need to follow the instructions in the mentioned documentation to use the `cups` interface in their apps and users of applications plugging the `cups` interface can just print.

Note that there is still no further application using the `cups` interface except the [first two](/OpenPrinting-News-June-2022/#cups-snap-and-snapd-printing-interface), especially Firefox, Chromium, and LibreOffice did not switch over to it yet.


## Approaching cups-filters 2.0
Continuing the restructuring to have **libppd depend on libcupsfilters** instead of **libcupsfilters depend on libppd**, as [introduced in May](/OpenPrinting-News-May-2022/#approaching-cups-filters-20). Continuing to restructure the code to separate the siamesian twins of the filter functions and PPD file support:

- Made the `cfFilterRasterToPWG()`, `cfFilterPWGToRaster()`, `cfFilterGhostscript()`, `cfFilterImageToRaster()` and `cfFilterImageToPDF()` filter functions **free of PPD file support** and created appropriate `ppdFilter...()` wrapper filter functions in libppd for them.
- Also had a look into the `cfFilter...ToPS()` filter functions but they will not get converted but completely moved over to libppd, **considering not only PPD files obsolete but also the PostScript format** (at least when not used in a PostScript printer driver with PPD).
- Tested handling of media size, margins, and page geometry and found some issues. Did several improvements on the `cfGetPageDimensions()` and `cfGenerateSizes()` functions to solve the problems.
- Added support for **page size variants** in PPD files (`A4`, `A4.Borderless`, `A4.Duplex`, ... differences in margins, sometimes even a bit in the size dimensions)
- Now we are also matching of **custom page sizes** and **pages rotated by 90 degrees**.
- Support for the **Duplex** (`sides`) option.
- Support for **using the sizes of the input file's pages** when not explicitly requesting a page size, no page scaling (`page-scaling=none`), and no special layout features like N-up or booklet printing. This allows documents with differently sized pages to be printed.
- When working on the `cfFilterGhostscript()` filter function bumped into **problems with Ghostscript's `cups` output device**. It allows supplying the backside orientation for duplex, the need of software copies, and the CUPS Raster version only via PPD files, so added appropriate functionality for setting these parameters without PPD file to the Ghostscript device in the [Ghostscript upstream repository](http://git.ghostscript.com/?p=ghostpdl.git;a=commit;h=1f876cfb63c0b0a1bd488ea21155368dc500dddd).
- Have the `cfFilterPDFToPDF()` and `cfFilterImageToPDF()` **sharing the JCL/PJL support code** for classic native PDF printers.

Remaining filter functions to be converted: `cfFilterBannerToPDF()`, `cfFilterTestToPDF()`, and `cfFilterUniversal()`. I still need to check whether to convert also `cfFilterTextToText()`. So we come close to cups-filters 2.x.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|74900|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|2287|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2313|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1482|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|4864|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|4128|

## CUPS
Currently released is [**2.4.2**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.2).

There will be further bug fix releases in the 2.4.x series. Some bug fixes were done during the last month, see changes below.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) comes with 2.4.1. Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will most probably come with a later 2.4.x.

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.3 (TBA)
----------------------------

- Fixed the `device_uri` invalid pointer for driverless printers with `.local`
  hostname (Issue #419)

- Use localhost when printing via printer application (Issue #353)
- Now localize HTTP responses using the Content-Language value (Issue #426)
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

In the last month only some minor bug fixes got done, also fixes for libcups3 (CUPS 3.x) compatibility, and addition of translations from Weblate.

I have started to work on adding the new PAPPL 1.2.x features (SNMP-based supply level readout, localization/human-readable strings for options/attributes) to pappl-retrofit. See above.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

