---
title: OpenPrinting News - October 2022
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Ubuntu 22.10 Kinetic Kudu, Ubuntu Summit, GSoC 2022, CPDB 2.x, "cups" snapd interface, cups-filters 2.0, retro-fitting Printer Applications, foomatic-db daily snapshots, PAPPL 1.2.3
---
## Today is Release Day, of Ubuntu 22.10 (Kinetic Kudu)!
It is not yet switching to the New Architecture for printing and scanning, but has a lot of nice new features, mainly GNOME 43 with a new quick settings panel, Ubuntu Desktop section in System Settings, Nautilus and System Settings with window layout adapting to the window size, improved dock, ... Also the audio stack is based on the new PipeWire which has less bugs than the old PulseAudio and makes especially Bluetooth audio devices work more reliably.

To learn more about the new Ubuntu release, watch tomorrow's [Desktop Team Indaba](https://discourse.ubuntu.com/t/ubuntu-desktop-team-indaba-ama-october-21-2022-3pm-utc/) about the Kinetic Kudo release. Heather Ellsworth will receive Philipp Kewisch, Adam Szopa, Oliver Smith, and Ken VanDine from Canonical to tell about the new features of Ubuntu itself and Rudra Saraswat from Ubuntu Unity, which got official flovor with 22.10.

And as always, if you are watching live via YouTube or Twitch, you can use the chat facility to ask questions.


## Ubuntu Summit 2022
There are less than 3 weeks now until the first Ubuntu Summit! And you really should come to Prague and attend it. There are a lot of [good reasons](https://ubuntu.com/blog/why-you-should-attend-ubuntu-summit-in-person).

**Call for Proposals has ended**

Two weeks ago, the call for proposals has ended and we got a lot of exciting submissions! Nearly all the submitters got already informed whether their proposal got accepted or not, and now a part of the organization team is solving the difficult puzzle of scheduling all the workshops (90 min, interactive), talks (50 or 25 min), and lightning talks (10 or 5 min) into 7 rooms and 3 days. Especially important is to fulfill the many dependencies between the sessions, not only that 1 speaker cannot present in 2 rooms at the same time, but also that a talk about a given subject has to be deleivered before the workshop of the same subject or the workshop for the basic knowledge of a subject has to come before all advanced-topics workshops ...

And if you really cannot make it to this exciting event, there is some limited remote access to it, too. All the sessions happening in the plenary room (the largest of all the rooms) are broadcasted and one can ask questions via chat (like on the [Ubuntu Indabas](https://discourse.ubuntu.com/t/ubuntu-desktop-team-indaba-ama-october-21-2022-3pm-utc/)). Unfortunately, we cannot have remote live speakers and we cannot broadcast the sessions in the breakout/workshop rooms (and for the workshops it does not make much sense to attend remotely anyway).

**OpenPrinting is in Prague, too**
Yes, we are always in need to extend our developer, designer, document writer, ... community and the Ubuntu Summit is all about that kind of community. Therefore we will present our [activity](/current/), our [plans](/OpenPrinting-News-September-2022/#openprinting-micro-conference-on-the-linux-plumbers-2022), and our needs in the session

> OpenPrinting - Join the team to make printing just work!

There I will be accompanied by Zdenek Dohnal from Red Hat, and Johannes Meixner from SUSE presenting about their contributions and their integration in OpenPrinting. And after our presentations, we have an extended questions and discussion part. Depending on the room where this session will take place, we can also connect Aveek Basu from OpenPrinting and one or another (former) GSoC contributor. And if there is more discussion time needed, we can create spontaneous BoFs to continue the discussion. Unfortunately, I was not able to get BoFs pre-scheduled.

We also will help all these attendees who have relatives or friends who are still stuck in Windows (and also WSL developers who need to test), to make their old printers working again. I will show in a 10-min lightning talk that one can easily run our Printer Application Snaps in WSL under Windows, as described in our [HOWTO](/wsl-printer-app/). So do not miss

> Save Legacy Printers under Windows with WSL and Printer Applications

Carlos Nihelton, author of the HOWTO, will also be present.

**Let's build a plotter!**

Tired of listening to three people talking about paper I/O? Do you prefer to do it with your own hands? No problem, Daniele Procida, director of documentation at Canonical, has created a DIY plotter made out of parts for ~12.50 EUR, the [Brachiograph](https://www.brachiograph.art/), and in the workshop

> Let's build a pen-plotter

he will teach the attendees to build such a plotter by themselves. Control unit for the device is a Raspberry Pi, and the device itself consists of cheap servos, clothes pegs, paper clips, wood sticks, and a pen. And did you remeber that refills for commercially available printers are usually expensive? For this device the refill is free, you find it all over the conference hotel ...

I will attend the workshop and report about it next month ...

**Your application everywhere, just in a Snap!**

Or are you developer of a free software application and need a way to easily distribute it to as many users as possible? Without need of the goodwill of distribution package maintainers, without the requirement of your users to install the newest version of their distro to get the newest version of your application? Without you needing to test your application on 10 or more different distros and platforms? And as a little extra, your application can also be used easily under Windows, via WSL, without you needing to ever touch Windows for testing it.

The solution is to package your application as a Snap (we also say "snapping it") and put it up in the Snap Store. The basic idea is similar to smartphone applications in the App Store or Google Play Store, its origin is even in the good old times when Canonical was developing a smartphone running Ubuntu Touch. The Snap is an encapsulated, distribution-independent package containing everything what it needs and which can be easily installed in many OS distributions, like a smartphone app. And even system services can be distributed as Snap, like [CUPS and our Printer Applications](https://snapcraft.io/search?q=OpenPrinting).

Do you want to learn how? Then do not miss our series of Snap tutorial workshops. In each workshop one topic of snapping applications is treated and they qre not simply talks, but hands-on workshops. You bring your laptop and do the exercises and examples by yourself! And we will answer your questions ...

Following workshops are available:

> Snapping like Hell(sworth)

The basics of snapping, for everyone who is new to Snap

> ROS Deployment Workshop

Also for those who are new to Snap, but here Snap is used for IoT/Robotics

> Snapping Desktop Applications

Make Snap packages of GUI applications, based on either GNOME?GTK or KDE/Qt

> Daemon Snapper's Workshop

Snapping of system services and utilities

> Deploying Flutter apps on Linux Desktop

Snapping Flutter-based applications

Note that if you have no knowledge about Snap, you should first attend one of the first two woekshops before you you dive into the advanced topics of the other three.

And to get some deeper knowledge, there are also many talks about Snap available.

**And do not forget to bring your board games, gaming-related tinkering, and your knitting projects (life jackets are supplied)!**

And there is no conference without social events/evening events. On the Ubuntu Summit we will have:

- Sun, Nov 6: **Sunday evening reception** - Many of us arrive already on Sunday, so meet and greet, get your badge, and avoid the lines on Monday moring.

- Mon, Nov 7: **Kinetic Knitter's Session** - Knitting together, bring your project (Knitting needles are allowed in your carry-on)

- Tue, Nov 8: **Gaming night** - Games, games, games, both analog and digital! Bring your board/tabletop/card games but also your gaming-related tinkering projects, (like Raspberry Pi for retro-gaming). We have many tables for playing and also monitors, keyboards, mice, and a projector for bringing your digital gaming contributions onto the large screen.

- Wed, Nov 9: **Closing party on a boat** - To celebrate the (hopefully successful) completion of the first Ubuntu Summit. And we are not docked, we are actually cruising.

I hope to see you all in Prague and not that you will read here next month what you have missed ...


## Google Summer of Code 2022
For the first time we are in the forth month of coding, as all the OpenPrinting projects got extended by at least 4 weeks. The 4 projects extended by 4 weeks have ended now and all the contributors have passed. Links to the work products are below.

In our GNOME Control Center sub-team (Mohit and Shivam) we have no news from the UX/UI design team from GNOME, but I have reported the UX design needs inside Canonical and it will get worked on them in the development cycle for Ubuntu 23.04 (the design work will naturally also get upstreamized).

And now we have forth editions of the contributor's little summaries (and results/work products if available):

**Converting Braille embosser support into a printer application**<BR>
Contributor: Chandresh Soni<BR>
Mentors: Till Kamppeter, Samuel Thibault<BR>
[Work Product](https://gist.github.com/Chandresh2702/73923b2c686039404cdd9b050edbe995)

PASSED

> As now our gsoc work have been submitted i have created the printer apllication which is now working with detecting various printer using web interface. raw printing can be done using printer application for format such as .brf .ubrl, and debugging is going for filter conversions.

**Adding Common Print Dialog Backends (CPDB) support to existing Print Dialogs**<BR>
Contributor: Gaurav Guleria<BR>
Mentors: Till Kamppeter<BR>
[Work Product](https://github.com/TinyTrebuchet/gsoc22/)

PASSED

> I have added CPDB support to the Qt print dialog after discussion with the Qt development team and opened a merge request: https://codereview.qt-project.org/c/qt/qtbase/+/437301. I have also fixed some bugs with the CPDB backend of the GTK print dialog.

Discussion with the Qt upstream developers on their mailing list: [Initial post](https://lists.qt-project.org/pipermail/development/2022-September/042993.html), [thread "Adding CPD support to Qt print dialog"](https://lists.qt-project.org/pipermail/development/2022-September/thread.html)

Merge request for CPDB support in the Qt print dialog:

- [Qt Merge Request #437301](https://codereview.qt-project.org/c/qt/qtbase/+/437301)

Merge request for CPDB support in the GTK print dialog (a lot of discussion with maintainer Marek Kasik has happened here):

- [GTK Merge Request #4930](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930)

**Scanning Support in PAPPL with eSCL Support**<BR>
Contributor: Rishabh Maheshwari<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>
[Work Product](https://gist.github.com/Rishabh-792/b1a2960b7e0e3d2bd3a5f4db3d260fc0)

PASSED

> I have completed developing the functions required for the eSCL parser and I have defined the data structures and helper utilities to use them. Along with Deepak, we will successfully implement a scanner application which uses eSCL protocol.


**Add Avahi calls for discovering and resolving driverless IPP printers and Optimize the processes**<BR>
Contributor: Sachin Thakan<BR>
Mentors: Till Kamppeter, Michael Sweet, Deepak Patankar<BR>
[Work Product](https://github.com/thakan25/gsoc22-submission)

PASSED

> Last month I worked on driverless utility. I have completed the new implementation for service discovery which removes ippfind as a dependency for discovering ipp/ipps printing devices and uses avahi APIs directly. It also includes optimization of the discovery process, which is only resolving relevant services but not all browsed services. Currently, I am working on moving this optimization logic to a commonplace similar to other avahi APIs.

**Scanning Support in PAPPL**<BR>
Contributor: Deepak Khatri<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>

(See Rishabh Maheshwari)

**GNOME Control Center GUI for discovering non-driverless printers and finding suitable Printer Applications for them**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Michael Sweet, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
[Work Product (preliminary)](https://github.com/vermamohit13/GSOC_2022_Summary)<BR>
> I have completed the work of implementing the functionality for querying the OpenPrinting web server to get the details of supported Printer Application. The list of supported apps are displayed in a window which has the most appropriate app preselected along with  a "Recommended" tag. With the work on our request on adding IPP operations to request discovered devices and available drivers from Printer Application as the server completed , we will now be able to make IPP requests to discover devices and add them . This also means that from G-C-C we can now  make IPP requests for adding a device. I will be moving ahead and updating the method of discovery of devices of Printer Application by creating IPP requests to Printer apps. I will also be expanding the cups-pk-helper DBUS interface to get details of Printer Apps in G-C-C via a DBUS call. With this, we will complete the functionality of Adding a new printer in a Printer App, along with opening their web interfaces from G-C-C.

Further discussion happened on Mohit´s issue report:

- [GNOME Issue report #1878](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878): Allow to add new printers via Printer Applications

cups-pk-helper changes:

- [cups-pk-helper PR #7](https://gitlab.freedesktop.org/cups-pk-helper/cups-pk-helper/-/merge_requests/7): Added discovery of Printers via lpinfo, PAPPL and Printer Applications

**Create new printer setup tool for the GNOME Control Center**<BR>
Contributor: Shivam Mishra<BR>
Mentors: Till Kamppeter, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
> Hi, I have completed the integration of functionality of listing available IPP services with the GUI functionality of managing IPP multi function devices using IPP system service and also done with fine tuning of the hybrid module. Currently I'm working on integrating Mohit's work of getting details of discovering devices to add them.

Feature requests so far:
- [#1877](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1877): Improve setting of IPP options
- [#1879](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1879): Do not show setting of drivers for IPP printers
- [#1911](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1911): Printers: Make adminurl available for IPP printers


## Common Print Dialog Backends 2.0
While our GSoC contributor Gaurav Guleria is working on [adding CPDB support to the print dialogs](/current/#the-print-dialogs) (see [above](#google-summer-of-code-2022)) he has continued to do fixes and improvements on the [CPDB framework](/achievements/#common-print-dialog-backends) itself:

- Fix for new requirement of glib that the glib headers should no longer be included inside `extern "C" { ... }` blocks ([PR #11](https://github.com/OpenPrinting/cpdb-libs/pull/11))
- Fixes for code reliability, like crash guards, function reporting success/failure, ... ([PR #12](https://github.com/OpenPrinting/cpdb-libs/pull/12))

In the discussion on the [merge request for CPDB support in the GTK dialog](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930), Marek Kasik [asked about how tto handle translations of option/choice names](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930#note_1574247) and here I suggested that they should be provided from CPDB (and the CPDB CUPS backend takes them from CUPS) and Marek Kasik agreed with that. I also presented the API functions of cups-filters to obtain these strings, which the CPDB CUPS backend could use. Gaurav Guleria will now work on the implementation.

The API in cups-filters is implemented in the files `cupsfilters/catalog.[ch]` and it uses the translation tables of CUPS, which also contain the strings for all standard IPP attributes and their enumerated values, and it also can obtain printer-specific strings from a printer via IPP. I had originally designed it for the PPD file generator for driverless IPP printers which is used by `cups-browsed` and by the `driverless` utility.

I am also thinking about later creating a separate IPP strings/translations project on OpenPrinting which collects translations via Weblate (we are already using Weblate for [system-config-printer](https://github.com/OpenPrinting/system-config-printer)).

Also this functionality to provide human-readable strings and their translations will get included in the 2.0 release of the Common Print Dialog Backends.


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

[Last month](/OpenPrinting-News-September-2022/#cups-snap-and-snapd-printing-interface) we told here that there is a bug in snapd due to which seeded Snaps (being part of the standard installation/ISO image of the OS) cannot use the `cups` interface (and have to stay with `cups-control` for now. There will be no rush to fix this bug. Instead, we have planned to let snapd handle the dependency of the `cups` interface on the CUPS Snap internally to not need the pseudo-content interface any more and that to be implemented within the Ubuntu 23.04 development cycle (before Feature Freeze mid-February 2023). This also does not only work around the bug but pone also needs to only plug `cups` in `snapcraft.yaml`, no additional section for the dependency on CUPS is needed.

But note that the bug really only concerns the Snaps contained in the standard installation of Ubuntu, if you Snap your application, you can use the [`cups` interface](/achievements/#the-cups-snap) for printing without any problems.


## Approaching cups-filters 2.0
We get even closer now. I have done most of the cleaning up of all the code to get a unique coding style and to make it more readable, as described [last month](/OpenPrinting-News-September-2022/#approaching-cups-filters-20). This has now be done for the complete libcupsfilters, libppd, and for `foomatic-rip`.

When the complete code is cleaned, the current cups-filters project will be split into several parts, similar to CUPS on its transition to the 3.x series. There will be the following parts:

- **libcupsfilters:** The central library with the filter functions and some useful functions for printer drivers, human-readable strings and translation handling for IPP attributes, ... It does not contain any support for PPD files.
- **libppd:** PPD file support library providing the complete support for PPD files from libcups (2.x and earlier), the CUPS PPD compiler and utilities (`ppdc`) and functions to convert PPD Options into IPP attributes, to add PPD file support to the filter functions of libcupsfilters, to handle collections of PPD files, ... **This library is only for legacy PPD and driver support, it should not motivate anyone to create new PPD files!**
- **cups-filters:** Legacy CUPS filter/backend executables for CUPS 2.x and earlier. Uses both libcupsfilters and libppd. Any `XXXtoYYY` filters, `foomatic-rip`, `driverless`, ...
- **braille-printer-app:** The Braille embosser driver code plus Chandresh Soni's [GSoC](#google-summer-of-code-2022) work to turn this code into a Printer Application.
- **cups-browsed:** Daemon to automatically create local print queues for network printers and remote CUPS queues and allows to create printer clusters. Will be turned into a Printer Application later (GSoC project?).

libcupsfilters is completely free of PPD file support, same for braille-printer-app. libcupsfilters can be used for all kinds of Printer Application and wherever print data or scanned data has to get converted. The Braille Printer Application is a native Printer Application, it does not use PPD files internally.

libppd contains the complete PPD file support for Printer Applications which retro-fit PostSctipt PPD files or classic CUPS drivers. These Printer Applications are usually created based on [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit). Distributions using the New Architecture for printing and scanning will not install libppd by default, as it is not needed any more.

cups-filters provides the filter executables needed by CUPS 2.x or earlier. Most executables are just simple wrappers and all the internal workings have moved into the filter functions in libcupsfilters, and the PPD file support into libppd. This package requires libppd, but it is for PPD-based classic CUPS versions only anyway.

cups-browsed is currently supporting and generating PPD files (for CUPS 2.x), and therefore also depending on libppd. In a later version, when it is turned into a Printer Application, the PPD file support be removed.

An important goal of the separation is to put all PPD support in their own project so that they can get discontinued later and this way we can easily stop maintaining the PPD file support code will all the other useful code of the former cups-filters will live on.

libfontembed is merged into libcupsfilters now as it is only used by the `cfFilterTextToPDF()` filter function, really nowhere else, it has also no package which depends on it in Ubuntu (neither in Main nor in Universe). Its code (a lot for being a part of the `texttopdf` CUPS filter GSoC project) has also a lot of TODOs, so it probably is not ideal for general use but serves well in the text filter function ([commit](https://github.com/OpenPrinting/cups-filters/commit/cf1a80a11)).

As a last change/improvement in the functionality I moved the filter functions for calling external filter executables back from libppd to libcupsfilters (now with the name `cfFilterExternal()` and `ppdFilterExternalCUPS()` being a wrapper), as it is also useful in native printer applications, as it allows using filters written in non-C languages or proprietary, closed-source filters. Also added support for System V interface scripts to the function (they are similar to CUPS filters but take input from named file, not from stdin). This was inpired by the work of [GSoC contributor Chandresh Soni](#google-summer-of-code-2022) on the Braille Printer Application where he needs to embed shell-script filters into the native (not using PPD files) Printer Application ([commit](https://github.com/OpenPrinting/cups-filters/commit/cce5a348e8f1)).

Also several smaller fixes got done, like removing some unneeded, leftover portability code files [commit](https://github.com/OpenPrinting/cups-filters/commit/282b60cba42) and header files ([commit](https://github.com/OpenPrinting/cups-filters/commit/714b41332ed93af0567e8f21d19f19f3d2208183)).

libcupsfilters needs the new Ghostscript 10.00.0 now. This got reflected now in the README file and in comments in the source code ([commit](https://github.com/OpenPrinting/cups-filters/commit/531505b1e4285)).

`cupsfilters/catalog.h` received a comment telling where the human-readable and translated strings for the IPP attributes and enumerated values come from. This information was only in `ppd/ppd-generator.c` ([commit](https://github.com/OpenPrinting/cups-filters/commit/de0fd6519)).

There was also a [bug report](https://github.com/OpenPrinting/cups-filters/issues/484) about pages in custom sizes rotated by 90 degrees for fitting the orientation. This came from the fact that Ghostscript's built in CUPS/PWG/Apple Raster output device tries to match the given page size dimensions with the ones of the PPD file, even if the size is custom. I have fixed this by not matching the page size dimensions against the PPD if the size is custom ([commit](https://github.com/ArtifexSoftware/ghostpdl/commit/387f09416ca7364d09415d47df01864b04cbdbc0)).


## pappl-retrofit
Michael Sweet released [PAPPL 1.2.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.3) with a [correction](https://github.com/michaelrsweet/pappl/issues/142) for string-type user-settable options (passwords, fax numbers, ...). With this and after getting some [help](https://github.com/michaelrsweet/pappl/issues/142#issuecomment-1272552555) from him I am noe able to do the **Printer Applications without patches on PAPPL and pappl-retrofit!** I updated pappl-retrofit and the Printer Applications appropriately ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/4a54fb7148)).

I also updated all the 4 retro-fitting Printer Applications for last API changes in cups-filters (Merged libfontembed, cfFilterExternal() in libcupsfilters, see above) and updated the included Ghostscript to version 10.00.0, which has especially a faster PDF renderer and latest support functionality for PPD-less printing.

Michael Swwet also added a feature to [auto-select the A4/Letter default by locale](https://github.com/michaelrsweet/pappl/issues/167) and earlier there was already support for localization/human-readable strings and SNMP-based ink-level checking. So now I have everything to be able to get all my [planned features](https://github.com/OpenPrinting/pappl-retrofit#to-do) into pappl-retrofit and the retro-fitting Printer applications, but cups-filters 2.0b1 first ...


## OpenPrinting web server

On the OpenPrinting web server the [daily snapshots](https://openprinting.org/download/foomatic/) of foomatic-db are back, s it is easy again for distributions to package foomatic-db.

Thanks a lot to Violet Kurtz from the OSUOSL for implementing this!


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|87811|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|2956|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2595|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1967|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|6097|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|4911|


## CUPS
Currently released is [**2.4.2**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.2).

There will be further bug fix releases in the 2.4.x series. Some bug fixes were done during the last month, see changes below.

Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) got released today with 2.4.2.

The CUPS Snap (in the Edge channel) and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

The CUPS Snap in the stable channel is version 2.4.2.

```
Changes in CUPS v2.4.3 (TBA)
----------------------------

- Added new media sizes defined by IANA (Issues #501)
```


## cups-filters
Currently released is [1.28.16](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.16).

The restructuring of the code to separate the siamesian twins of the filter functions and PPD file support is completed and we also have done a lot of testing and bug fixing. Now we are finally polishing the coding style and updating the license/copyright headers for the 2.0.0 release.

See above for more details.

As cups-filters 2.0.0 will not make it into Ubuntu 22.10 we have continued with further bug fix backport releases in the 1.x series.

Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) got released today with 1.28.16.

The CUPS Snap is currently locked to the [/e496badbf2](https://github.com/OpenPrinting/cups-filters/commit/e496badbf2) commit (from May 20) of cups-filter's GIT master (2.x) until the restructuring gets more tested. The Printer Application Snaps use the current GIT master of cups-filters and so are the first application for real-life testing.


## PAPPL
Currently released is [1.2.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.3).

In the last months the development of the 1.3.x series has already started. See changes below.

[1.2.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.3)

General bug fix release. See changes below.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.3b1
-----------------

- Added `papplLocGetDefaultMediaSizeName` function to get the default media size
  for the current country (Issue #167)
- Added support for localized banners at the top of printer and system web pages
  (Issue #183)

- Changed names of PAPPL-specific attributes to use "smi55357" prefix.

- Fixed a potential memory underflow with USB device IDs.
- Fixed web interface support for vendor text options (Issue #142)

- Fixed a 100% CPU usage bug when cleaning the job history (Issue #218)
```

```
Changes in v1.2.3
-----------------

- Fixed a bug in the TLS upgrade logic.
- Fixed a potential memory underflow with USB device IDs.
- Fixed web interface support for vendor text options (Issue #142)
```
