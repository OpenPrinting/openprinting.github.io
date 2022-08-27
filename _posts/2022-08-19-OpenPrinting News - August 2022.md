---
title: OpenPrinting News - August 2022
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Printer Applications under Windows, Pages about our work, Linux Plumbers, Ubuntu Summit, GUADEC, GSoC, CPDB 2.x, "cups" snapd interface, cups-filters 2.x
---
## Using Windows? We can help you, too.
In March 2019, right before the pandemic broke out, on a Canonical-internal conference, I entered the team room of my team, the Desktop Team, and my colleague Heather Ellsworth introduced me to another person, saying:

> This is Till, he makes printing just work, on everything except Windows.

Now, two and a half years later, we must correct:

> This is Till, he makes printing just work, on everything except Mac.

Once, Michael Sweet has left Apple end of 2019, and second, one can [run Printer Applications under Windows](/current/#reviving-legacy-printers-under-windows)!

Microsoft and Canonical are collaborating and the Desktop Team has a nice WSL (Windows Subsystem for Linux) sub-team now. With this I came up with the idea to run Printer Applications under WSL and this way make legacy printers which are abandoned by Microsoft and also their manufacturers work under Windows again.

My colleague Carlos Nihelton, of the WSL sub-team, has worked out a first approach with my guidance. He made his HP OfficeJet J4660 working under Windows again as his work requires him to use this OS quite often.

About this he has written a HOWTO and contributed it to OpenPrinting. The [HOWTO](/wsl-printer-app/) explains step-by-step how to compile and install a Printer Application under Windows to make ones good old printer working again.

Thanks a lot, Carlos.

The process is still somewhat awkward, but with further development of WSL (support for systemd, AppArmor, Avahi, snapd) it will get easier with the time and we will keep updating our HOWTO.


## New web pages about our work are completed
[Last month](/OpenPrinting-News-July-2022/#new-web-pages-about-our-work) I told about that we want to have a blog post about OpenPrinting at Canonical to make OpenPrinting and Canonical's support for it more visible and that therefore I have decided to write some articles about what OpenPrinting has done and is doing.

These articles I have completed now (All linked from the "[About Us](/about-us/)" page):

- [How did this all begin?](/history/)
- [Our principal achievements](/achievements/)
- [What we are currently doing](/current/)

The first is derived from my [blog article about how I got started with OpenPrinting](/How-did-this-all-begin/), the second one is about what we have achieved in all the time, and the third is about what we are currently doing.

I have not only added the page about our current activities but also added some forgotten items to the achievements page.

The pages will get updated from time to time in the future, when items get completed and new items started.


## OpenPrinting Micro-Conference on the Linux Plumbers 2022
[Linux Plumbers 2022](https://lpc.events/event/16/) is approaching! It will take place in Dublin, Ireland on September 12-14, 2022. Our micro-conference will make the happy-end of the conference, being on

- **Wednesday, September 14, 2022, 3pm - 6:30pm Dublin time or 2pm - 5:30pm UTC**

[Full schedules of LPC 2022](https://lpc.events/event/16/timetable/#all.detailed)

I will be live on stage in Dublin, also Piotr Pawliczek from Google, and Monica Ayhens-Madon will also be there and help me with remote attendee's questions. All the other speakers will participate remotely. Also several of our GSoC contributors will participate remotely.

We will have the following sessions:

**CUPS 2.5 and 3.0 Development**<br>
Presenter: Michael Sweet<br>

**3D Printing**<br>
Presenter: Michael Sweet<br>

**Testing and CI for OpenPrinting projects**<br>
Presenter: Till Kamppeter, Michael Sweet<br>

**Restricting access to IPP printers with OAuth2 framework**<br>
Presenter: Piotr Pawliczek<br>

**Documentation for OpenPrinting projects**<br>
Presenter: Till Kamppeter, Aveek Basu<br>

**Sandboxing/Containerizing alternatives to Snap for Printer Applications**<br>
Presenter: Till Kamppeter<br>

[Up-to-date schedules on LPC web site](https://lpc.events/event/16/sessions/142/#20220914)

Note that these sessions are not just slide presentations, there are some slides to introduce into the subject matter, but as the Linux Plumbers micro-conferences are intended for, we will discuss the about issues, decisions, design, ... to put our future work into the right direction, and for answering questions of the attendees.

The exact schedule is [posted on the Linux Plumbers web site](https://lpc.events/event/16/sessions/142/#20220914). Registered remote attendees can participate interactively in the live discussions. Probably there will also be the possibility for non-interactive watching of the micro-conference on YouTube and a recording on YouTube after the micro-conference, as last year.


## Open Source Summit Europe 2022
Once in Dublin for the Linux Plumbers (see above) I will also be lurking around on this year's [Open Source Summit Europe](https://events.linuxfoundation.org/open-source-summit-europe/) of the Linux Foundation, which also takes place in Dublin, on Sep 13-16.


## Ubuntu Summit 2022
During this year, Canonical has formed a new Community Team and wants to interact more with the Ubuntu community. Therefore they revived the former [Ubuntu Developer Summits](https://wiki.ubuntu.com/DeveloperSummit) (UDS) which were discontinued 10 years ago.

Now they come with a new concept, covering the wider community, not only developers, but also designers, documentation writers, ... It is now an annual (not coupled any more with the Ubuntu releases) meeting between Canonical employees and the free software community.

It is named [**Ubuntu Summit**](https://summit.ubuntu.com/) and the first edition takes place in Prague, Czech Republic, November 7-9. See the web site for subscribing to a newsletter, registration, call for proposals, ... Currently the site is preliminary, but in the next days more information and features will appear ...

See also [a first public announcement](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=31880s) on the LAS 2022 back in April this year.

Canonical comes with a good anount of their employees and is inviting a lot of important contributors from the free software community.

We will have talks, workshops, BOFs, tutorials, ... about Ubuntu, the desktop, Snap, robotics, ... and naturally also several sessions with the OpenPrinting team, most probably at least me, Aveek Basu, and Zdenek Dohnal.

Get in touch with the Ubuntu developers in Prague!!


## GUADEC 2022
I have attended my first [GUADEC](https://events.gnome.org/event/77/overview), in Guadalajara in Mexico and it was a success, and also a lot of fun.

In my [talk](https://events.gnome.org/event/77/contributions/285/) I have first introduced the GNOME Community into the [New Architecture of printing and scanning](/current/#the-new-architecture-for-printing-and-scanning) and then spread the news about our [GSoC](#google-summer-of-code-2022) work on the ["Printers" module of the GNOME Control Center](/current/#gnome-control-center---printers-module) and on the [GTK print dialog](/current/#the-print-dialogs) ([slides](https://events.gnome.org/event/77/contributions/285/attachments/88/187/guadec-2022-new-architecture.pdf), [video](https://youtu.be/_zy_FkDttHQ?t=19194)).

**Bye Bye, colord!**

My talk was a success!! It generated a hallway session! Right after my talk Sebastian Wick chatted with me about the demise of colord. He said that colord is about to be abolished. This daemon is a manager for color profiles, *.icc files which convert color spaces, especially correct the color appearance of output devices like monitors or printers.

Wayland handles the color profiles for monitors by itself, and in the New Architecture for printing CUPS only deals with driverless IPP printers and those use only sGray, sRGB, and AdobeRGB color spaces, all are known color spaces and so no profiles are required. And so only printers which need a driver can need color profiles and as a driver is a Printer Application in the New Architecture, the profile is hidden in the Printer Application.

Only point to solve is the soft proofing. This means that you apply the output device's color profile to an image to check with a program on the client whether the output device is able to correctly reproduce the image. The program looks for blown out highlights (structureless white areas) and warns the user. For this we would need a way to poll the output device's profile still ...

**Driverless printing with Slackware**

On the second BoF day I had a spontaneous micro-BoF with only Logan Rathbone who is running Slackware on his tablet (which was originally running Windows) and was not able to do driverless printing. So we tried to fix this. Slackware is, similar to Gentoo but not that extremely, a CIY distro (Compile it yourself).

On his machine there was CUPS and cups-filters installed and the versions were not that old, but there was no avahi-daemon which is needed to discover driverless IPP printers in the network as they advertise themselves via DNS-SD (aka BonJour, mDNS, ZeroConf). There was no Avahi at all, not even the libraries, and therefore the CUPS and cups-filters packages got compiled without Avahi support as Slackware's compile scripts do not have hard build dependencies on Avahi. So we needed to compile the two, and also update CUPS to the newest version to catch a bug fix and then all worked. He saw the Printer Applications on my laptop then.

He learned a lot about driverless printing, CUPS, cups-browsed, its config files, and I about Slackware. On one end Slackware and Gentoo, somewhere in the middle Ubuntu, on the other end an all-Snap Ubuntu (if we get such a thing) ...


## Google Summer of Code 2022
Now the second month of the coding period of the Google Summer of Code 2022 has passed and our contributors are continuing their great work!

7 of the 8 contributors have passed the mid-term evaluations.

I have also mentioned our GSoC work and all the contributors and active mentors on our new page about [our current activity](/current/).

All of them have posted again a little summary of what they have done in our group chat on Telegram:

**Converting Braille embosser support into a printer application**<BR>
Contributor: Chandresh Soni<BR>
Mentors: Till Kamppeter, Samuel Thibault<BR>
> I'm currently developing a native printer application for the Braille embosser.
> I'm currently following Micheal R Sweet's lprint application, which is based on PAPPL. Currently, I am writing a driver for a generic embosser while also working on using existing Braille filters that are in shell script using FilterExternalcups() to make them ready for use in printer applications.
> After finishing the driver, I will work on the application's backend and test it.

**Scanning Support in PAPPL**<BR>
Contributor: Deepak Khatri<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>
> I am currently working to implement pappl_sc_options_t structure based on pappl_pr_options_t, as I work on scanner objects. After that I will implement the API papplSystemSetScannerDrivers and will attempt to add pappl_sc_autoadd_cb_t, pappl_sc_create_cb_t, pappl_sc_driver_cb_t callbacks to system.h for the driver interface.

**Adding Common Print Dialog Backends (CPDB) support to existing Print Dialogs**<BR>
Contributor: Gaurav Guleria<BR>
Mentors: Till Kamppeter<BR>
> I have completed the GTK printbackend and created a merge request upstream: https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930
> I also have improved the cpdb-libs and cpdb-backend-cups libraries and fixed some bugs. I also tried working on QT CPDB print backend implementation, and had a meet with Priyadarshi Singh (previous GSoC contributor who has worked upon CPDB backend for qt). Though due to the lack of proper communication/guidance for the development of Qt, I have dropped it and started working on firefox instead after talking with my mentor. I have installed it from source and have been going over it's CUPS print backend, and talking with people on the IRC regarding the development of a new Print Backend for firefox.

**Cute update:** I have succeeded to get Qt print dialog upstream maintainer Albert Astals Cid working with us and so Gaurav is no working on the **Qt print dialog**!

[GTK Merge Request](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930): Draft: New CPDB print backend for GTK Print Dialog

Gaurav's [GitHub repository for the GTK print dialog](https://github.com/TinyTrebuchet/gtk/tree/cpdb)

**GNOME Control Center GUI for discovering non-driverless printers and finding suitable Printer Applications for them**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Michael Sweet, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
> I am currently working on adding functionalities for Printer Applications in G-C-C. The work for the discovery of Printer Application in cups-pk-helper was completed last week. I was able to get the name of the binaries of Printer Application which were being advertised on the IPP System Service, _ipps-system._tcp . In G-C-C , I will be creating a GUI through which I will be testing the feature of a quick auto-add-this-printer button in a Printer Application(Already Installed on the system) and a button to open the web interface of the Printer Application.  Once,  the architecture and design of GUI for Printer Application is finalized, I will adjust the current GUI to actual design and also add a button, which does a fuzzy search for the printer make and model on the Snap Store/the OpenPrinting web site to find Printer Applications which are not installed on the local system.

Further discussion happened on Mohit´s issue report:

- [GNOME Issue report #1878](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878) with discussion on Mohit's work.

cups-pk-helper changes:

- [cups-pk-helper PR #7](https://gitlab.freedesktop.org/cups-pk-helper/cups-pk-helper/-/merge_requests/7): Added discovery of Printers via lpinfo, PAPPL and Printer Applications

**Scanning Support in PAPPL with eSCL Support**<BR>
Contributor: Rishabh Maheshwari<BR>
Mentors: Till Kamppeter, Michael Sweet, Dheeraj Yadav, Deepak Patankar<BR>
> I am currently looking into the functions _papplClientCreate() and _papplClientRun(), _papplClientProcessIPP() of PAPPL and have started work on developing the _papplClientProcessESCL() by understanding the similarities of code to be used from AirSane.

**Add Avahi calls for discovering and resolving driverless IPP printers and Optimize the processes**<BR>
Contributor: Sachin Thakan<BR>
Mentors: Till Kamppeter, Michael Sweet, Deepak Patankar<BR>
> I have created header file containing discovery APIs and its source files. [This link](https://github.com/thakan25/avahi-demo) contains implementation and its application on a demo service browse utility. I tested it fine on my local setup. Here is PR containing integration of the new avahi module with ippfind utility, [PR#434](https://github.com/OpenPrinting/cups/pull/434) .
> Taking suggestion from Michael, I have tried improving on coding conventions. Currently I am working on better implementation of same since I am having difficulty implementing current design in other files containing service discovery code. Hoping to complete it soon in this week.

**Create new printer setup tool for the GNOME Control Center**<BR>
Contributor: Shivan Mishra<BR>
Mentors: Till Kamppeter, Pranshu Kharkwal, Divyasheel, Deepak Patankar<BR>
> I am currently working on  adding the GUI functionality of configuring IPP multi function devices using IPP system service in the module for listing available IPP print services. I plan to finish it by this week so that I can move over to fine-tuning and adding support for IPP scanner and print queues as currently program supports IPP system and printer objects.

Feature requests so far:
- [#1877](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1877): Improve setting of IPP options
- [#1879](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1879): Do not show setting of drivers for IPP printers
- [#1911](https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1911): Printers: Make adminurl available for IPP printers


## Common Print Dialog Backends 2.0

While our GSoC contributor Gaurav Guleria is working on [adding CPDB support to the print dialogs](/current/#the-print-dialogs) (see [above](#google-summer-of-code-2022)) he has also done many fixes and improvements on the [CPDB framework](https://openprinting.github.io/achievements/#common-print-dialog-backends) itself:

- Support for human-readable strings for options and choices
- Removal of CUPS dependencies in the core libraries
- Access to media size dimensions
- Asynchronously acquire printer details
- Renamed functions not to contain "cups" in their name

All this made me considering a 2.0 release of the Common Print Dialog Backends.

Therefore I have now renamed all the function, data type, and constant names similar to how it is done in CUPS and cups-filters, so that the CPDB libraries can be used together with any other libraries without name clashes.

For the release itself I will still wait a little bit, as Gaurav could find other needs of functionality during his work on the Qt dialog.


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

Now with the [`cups` snapd interface in place](https://openprinting.github.io/achievements/#the-cups-snap) Snap package maintainers are starting to use it.

Some days ago I have worked with my colleagues in the Canonical Desktop Team on [switching their Snaps over](https://discourse.ubuntu.com/t/desktop-team-updates-monday-15th-august-2022/29954/8?u=till-kamppeter) to the new `cups` interface and they did and it is actually working now. At least the Firefox, Chromium, gnome-text-editor, and evince Snaps should be switched over now, at least in the "Edge" channel of the Snap Store. Also of the LibreOffice Snap a switched version will appear soon.

Thanks a lot to Oliver Tilloy, Nathan Pratta Teodosio, Sergio Costas, and Heather Ellsworth!


## Approaching cups-filters 2.0
Completed the restructuring to have **libppd depend on libcupsfilters** instead of **libcupsfilters depend on libppd**, as [introduced in May](/OpenPrinting-News-May-2022/#approaching-cups-filters-20) now!

The commit is [here](https://github.com/OpenPrinting/cups-filters/commit/af98924b376). And the adaptations on [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/) are [here](https://github.com/OpenPrinting/pappl-retrofit/commit/9b8fe83ba6).

The direct PPD file access in **all filter functions** is now replaced by converting PPD options and attributes to IPP printer attributes and control options in the `ppdFilterLoadPPD()` function (which calls `ppdLoadAttributes()`) in libppd.

In addition, I succeeded to simplify the restructuring by not needing wrapper filter function in libppd for each filter function in libcupsfilters. Such wrappers are now only used for a few filter functions which need some special handling of the PPD file. To not need a different data structure for the filter data for PPD-supporting filter functions of libppd and not PPD-supporting filter functions of libcupsfilters I have added support for named extensions to the filter data structure.

With this we can split the [cups-filters repository](https://github.com/OpenPrinting/cups-filters) into libcupsfilters (filter functions), libppd (PPD file and PostScript output support), and cups-filters-legacy (filters for CUPS 2.x) and do not need to eternally maintain PPD support code for distros any more.

The code only needs some clean-up now and then is ready for a first beta release.

Note that there is not enough time any more to get cups-filters 2.x into Ubuntu 22.10 (Kinetic Kudu).


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|75697|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|2397|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2381|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1557|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|5074|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|4242|

## CUPS
Currently released is [**2.4.2**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.2).

There will be further bug fix releases in the 2.4.x series. Some bug fixes were done during the last month, see changes below.

Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will most probably come with a later 2.4.x.

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.3 (TBA)
----------------------------

- Added quirk for GoDEX label printers (Issue #440)
- Fixed `--enable-libtool-unsupported` (Issue #394)

- Fixed a potential SNMP OID value overflow issue (Issue #431)
- Look for default printer on network if needed (Issue ##452)
- Now localize HTTP responses using the Content-Language value (Issue #426)
- Raised file size limit for importing PPD via Web UI (Issue #433)

- Write defaults into /etc/cups/lpoptions if we're root (Issue #456)
```


## cups-filters
Currently released is [1.28.15](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.15).

The restructuring of the code to separate the siamesian twins of the filter functions and PPD file support is completed and now we will finally polish and bug-fix the code for the 2.0.0 release.

See above for more details.

As cups-filters 2.0.0 will not make it into Ubuntu 22.10 there will be probably at least one further bug fix backport release in the 1.x series.

Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will coming with cups-filters 1.28.15 or a later 1.28.x release.

The CUPS Snap is currently locked to the [/e496badbf2](https://github.com/OpenPrinting/cups-filters/commit/e496badbf2) commit (from May 20) of cups-filter's GIT master (2.x) until the restructuring gets more tested. The Printer Application Snaps also use the current GIT master of cups-filters.


## PAPPL
Currently released is [1.2.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.2.1).

In the last month the development of the 1.3.x series has started. See changes below.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.3b1
-----------------

- Added timer APIs to manage periodic tasks (Issue #208)
- Added debug logging for device management.
- Fixed a device race condition with job processing.
- Fixed a potential value overflow when reading SNMP OIDs (Issue #210)
- Fixed more CUPS 2.2.x compatibility issues (Issue #212)
- Updated PAPPL to conform to the new prototype PWG 5100.13 specification
  (Issue #216)
```
