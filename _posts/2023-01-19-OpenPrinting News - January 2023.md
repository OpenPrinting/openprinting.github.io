---
title: OpenPrinting News - January 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: GSoC 2023 project ideas and more, LAS 2023 in Brno, New Architecture going into Debian/Ubuntu, cups-filters fixes and 2.0b2, LPrint 1.2.0, PAPPL 1.3.1
---
Have you already been in need of a new printer and wanted to make sure it works with your prefered operating system, Linux? If this happened longer ago you had to find out whether there is a driver, in most cases one not coming from the manufacturer amd you were looking up the printer models interesting for you in [our database](http://www.openprinting.org/printers/), often with the frustration that they were not listed at all or categorized as a "Paperweight".

Several years ago we got driverless IPP printing as part of IPP 2.x. Printers advertizing their presence in the network by themselves, telling about all their capabilities und user-settable options by themselves, and using only standard page description languges. This was mainly pushed forward by the fact that the industry wanted that users can print from smartphones. So Apple's Airprint (for the iPhone's iOS and similar) got the most present incarnation of driverless IPP printing.

Is this solution the perfect solution making sure that every new printer from now on prints perfectly under Linux and you can simply grab that promotion from your supermarket? In most cases and with certain manufacturers (like HP for example) it works very well, but there are always bugs in manufacturer's implementations of the standards. You see that most bug reports on [cups-filters](https://github.com/OpenPrinting/cups-filters/issues) and many on [CUPS](https://github.com/OpenPrinting/cups/issues) are a user complaining that output of their printer (used in driverless mode) is not correct.

To avoid such problems, the [PWG](http://www.pwg.org/) (Printer Working Group), [creator of the IPP](https://www.pwg.org/ipp/) (Internet Printing Protocol) has created a [self-certification program](https://www.pwg.org/ippeveselfcert/) for their own flavor of driverless IPP printing, [IPP Everywhere](https://www.pwg.org/ipp/everywhere.html), so that manufacturers can certify their printers, and several did.

So we have a [long list](/printers/) of printers, either listed by Apple as supporting AirPrint or certified to support IPP Everywhere, more than 8000 printers!

For the printers listed as only supporting AirPrint and not IPP Everywhere we do not exactly know how Apple tests the compatibility and how Apple's operating systems exactly communicate with the printers. This can easily lead to issues like [this one](https://github.com/OpenPrinting/cups-filters/issues/492) where a printer does perfectly do AirPrint with Apple clients but has problems when the client is running Linux. Changing the way how to poll the printer's capabilities via IPP solves the problem.

For IPP Everywhere everyone can see what the standard includes and how the certification works, as at the PWG all standards and all development are open. All the specifications for the standards are freely downloadable and the self-certification utilities are [free software](https://github.com/istopwg/ippeveselfcert). So if a user reports an issue on an IPP-Everywhere-certified printer we can check why the certification utility succeeds but the user's system fails and more easily do a fix.

And, back to buying a printer, now you can download the certification tools, put them on your laptop, phone, or other portable device and run it on the printers which are on display in the store, finding a printer passing all tests and that is the one you will buy ... As the tool does a series of sophisticated tests and so it is much more reliable than if you randomly try to print some file.

And in the future this gets even easier: Michael Sweet is working on a [**graphical certification tool**](https://github.com/istopwg/ippeveselfcert/tree/flutter), written in Flutter and probably put up in the Snap Store and other system's app stores once released, making your printer shopping even easier, if needed with the help of the laptops on display and WSL ...


## Google Summer of Code 2023
While still doing the aftermath of GSoC 2022, having the contributors integrating their work in the appropriate upstream projects, we are already preparing GSoC 2023. So we are involved in the GSoC year-round.

As the application period for mentoring organizations is soon starting (Feb, 23, 2023), we have already lined up our [project ideas](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects) (after some [discussion with Michael Sweet](https://lists.linuxfoundation.org/pipermail/printing-architecture/2023/004265.html)):

- [Adding support for the new functionality/attributes of IPP Everywhere 2.x to libcupsfilters and the Common Print Dialog Backends (CPDB)](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#adding_support_for_the_new_functionalityattributes_of_ipp_everywhere_2x_to_libcupsfilters_and_the_common_print_dialog_backends_cpdb)
- [CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice, ...](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#cpdb_support_for_application_s_print_dialogsfirefox_chromium_libreoffice)
- [Scanning support in PAPPL](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#scanning_support_in_pappl)
- [Turn cups-browsed into a Printer Application](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#turn_cups-browsed_into_a_printer_application)
- [PAPPL-based Printer Applications: Option setting presets via web interface](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#pappl-based_printer_applicationsoption_setting_presets_via_web_interface)
- [Make a native Printer Application from Gutenprint](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#make_a_native_printer_application_from_gutenprint)
- [CI Testing programs for libcupsfilters, libpappl-retrofit, libppd, CPDB, ...](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#ci_testing_programs_for_libcupsfilters_libpappl-retrofit_libppd_cpdb)
- [GNOME Control Center: List and handle IPP print services for the New Architecture](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#gnome_control_centerlist_and_handle_ipp_print_services_for_the_new_architecture)
- [cups-filters: Create OCR filter to deliver scans as searchable PDFs](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#cups-filterscreate_ocr_filter_to_deliver_scans_as_searchable_pdfs)

Please contact us at any time if you are interested in being a GSoC contributor for OpenPrinting on one of these projects or on your own project idea.

We also have already many contributor candidates doing assignments, in stage 1 building CUPS and cups-filters, learning about the code, the printing architecture, driverless printing, ... in stage 2 working on issues in [cups-filters](https://github.com/OpenPrinting/cups-filters/issues), [CUPS](https://github.com/OpenPrinting/cups/issues), and other OpenPrinting projects, and some already in stage 3 learning about the project in which they want to do their GSoC work.


The work on the GSoC 2022 projects and their integration is going on and some are getting continued in GSoC 2023 projects:

**Common Print Dialog Backends**

Gaurav Guleria continued his work on the CPDB integration in the print dialogs. Especially he added an option group concept, implemented support for translated UI strings for option, choice, and option group names ([commit](https://github.com/OpenPrinting/cpdb-libs/commit/92350c4e363)) and also did a fix on the API of libcupsfilters for that ([commit](https://github.com/OpenPrinting/libcupsfilters/commit/86c010177378a32bbbb77e02fd31bed8a446e477)).

Gaurav's best friend and dorm roommate Kushagra Sharma got inspired by Gaurav's enthusiasm, started volunteering on CPDB and wants to participate in GSoC 2023. I have put him then to study the print dialogs of the browsers and I had really motivating and inspiring Telegram 1:1s with him, he is currently studying a semester in Germany and I animated him to attend [FOSDEM](https://fosdem.org/2023/).

**GNOME Control Center "Printers" module**

I worked with Mohit Verma on preparing his work on the "Add Printer" part for Elio Qoshi and Canonical's UI/UX design team to work on the UI design for the upstream integration. They asked me for some screenshots and screencasts and so [Mohit has provided them](https://github.com/vermamohit13/GSOC_2022_Summary/issues/1). Mohit is also starting to look into work to be done on the main panel (list of printers/IPP services).

**PAPPL scanning support**

I also found a volunteer/GSoC-2023 candidate for doing the remaining work for the scanning support in PAPPL, Akarshan Kapoor. He has studied the project and **created documentation** for Bhavna Kosta's [scanning API work of GSoC 2021](https://github.com/Bhavna2020/GSoC-2021). He followed the standards of PAPPL, auto-generating the documentation for the functions with Michael Sweet's [codedoc](https://github.com/michaelrsweet/codedoc) and wrote an introduction manually. He only needed to do a few corrections in the comments of the code which codedoc turns into documentation (Thanks, Bhavna). Here is his [pull request for PAPPL](https://github.com/michaelrsweet/pappl/pull/249).


**Braille Printer Application**

I am currently helping GSoC-2022 contributor Chandresh Soni to fix a bug in his [Pull Request](https://github.com/OpenPrinting/braille-printer-app/pull/1) to upstreamize the Braille Printer Application.


Some of our contributors of GSoC 2022 and contributor candidates for GSoC 2023 have provided little write-ups:

**Mohit Verma**<BR>
GSoC 2022 contributor on updating the "Printers" part of GNOME Control Center (G-C-C) for the New Architecture

> After my GSoC, I had worked on the new method of finding binaries as suggested by Marek Kasik but it didn’t prove to be useful since this method was returning the snap’s binary path. So, it was decided that it is better to add an IPP request to do this task. I had also started working on integrating Divyasheel’s Panel (DNS-SD Window), Shivam’s Panel (IPP Setup Window) & Lakshay’s Panel (Administrative-MF-Devices-GUI) in the G-C-C. I have completed integrating the DNS-SD window after removing the deprecated call’s and fixing some bugs. This window is now working fine. Currently, I am working on  Administrative-MF-Devices-GUI  Panel and IPP Setup Tool Panel. I am first trying to revamp the GUI to GTK4 along with fixing any bugs that come along. The second step would be to introduce Avahi DBus calls for the Discovery of Device and then finally integrating them into G-C-C.

**Gaurav Guleria**<BR>
GSoC 2022 contributor on adding Common Print Dialog Backends support to the print dialogs of GTK and Qt

> After my GSOC, I have added few improvements to CPDB. Firstly some serious flaws in CPDB have been fixed, like major memory leaks and CPDB not supporting reconnecting to DBus once disconnected from it. CPDB now follows XDG directory specification instead of hardcoding system paths. CPDB also provides generic groupings for most IPP options so print dialogs can now separate the options into several tabs accordingly. Furthermore, CPDB now has full translation support, where the translations are fetched from the backends in user's requested locale. In cpdb-backend-cups, this is achieved by using translation support provided by cups-filters in catalog.h. Certain changes were also made to these functions (cfCatalog...) so that they accept locale as additional parameter instead of just defaulting to en-US. Finally, CPDB has now much more verbose debugging which should be really helpful since it'll make bug fixing much easier in the future, considering that CPDB is a fairly new technology.


**Chandresh Soni**<BR>
GSoC 2022 contributor on turning the Braille embosser driver into a Printer Application

> After the GSOC period, I submitted a pull request to combine my braille printer application code with the cups-filters 2.0 braille support code. This was separated from cups-filters. In the following days, we will release version 1.0 of the braille printer application. I also corrected several errors in my code, which involved switching to a new cfFilterExternal, which is an updated version of ppd_ filter_external_cups and removing ppd support to make it work with newer cups.


**Kushagra Sharma**<BR>
GSoC 2023 contributor candidate preparing for CPDB support in application print dialogs

> I have been studying the repository of chromium to locate and understand print backend and print dialog. I still need some time to get the gasp of whole thing and meanwhile Gaurav asked me to confirm with chromium team whether they need CPDB support or not and if they do agree how they expect it to be implemented. I will continue same for this week. If I need to change anything please let me know.
> 
> I continued my study on the code base of chromium. I studied their print dialog implementation and print backend implementation for cups and had some discussions with Gaurav on CPDB. I have basic understanding of chromium and now I have started expanding my scope to CPDB as Gaurav is teaching me about its backend implementation.


Thanks a lot for all this great work!


## Linux App Summit 2023
Probably you remember the great [Linux App Summit 2022 in Rovereto, Italy](/OpenPrinting-News-Flash-OpenPrinting-and-Ubuntu-on-the-Linux-App-Summit-2022/). We will this year have a [Linux App Summit](https://linuxappsummit.org/) again, this time in Brno in the Czech Republic.

Brno is home of a Red Hat office and so many of our free software colleagues are located there, especially those on GNOME. And they will be for sure on the LAS, making this year's edition an awesome conference.

I will also be there ...

## New Architecture makes it into Ubuntu (and Debian)
Now, with having a release (at least a beta) of all the important components: libcupsfilters, libppd, cups-filters, cups-browsed, pappl, pappl-retrofit, cpdb-libs, cpdb-backend-cups, cpdb-backend-file I have started to create Debian packages from everything so that it gets into the Debian and Ubuntu distributions.

Unfortunately, Debian is currently entering the freeze for finalizing their Bookworm release. So their developers are going from the add-new-packages-and-new-features into the debugging phase.

But fortunately, Debian has at least finally accepted the Common Print Dialog Bsckends (CPDB) components, cpdb-libs ([ITP](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=911335)), cpdb-backend-cups ([ITP](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=911340)), cpdb-backend-file ([ITP](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=911345)) into Debian unstable (after a [reminder on their printing mailing list](https://lists.debian.org/debian-printing/2023/01/msg00001.html)). The versions are still 1.x versions though, the latest stable ones on OpenPrinting, for the 2.x versions libcupsfilters needs to get updated to 2.x first.

But the update to the second generation of cups-filters will only happen after bookworm. So all further packages and updates to their new generations will, if at all before the Bookworm release, happen in Debian's Experimental branch.

For getting new Packages into Experimental while most Debian developers are busy with Bookworm I get help from my colleagues in Canonical's Desktop Team, Sebastien Bacher and Jeremy Bicha, both long-time Debian developers with the appropriate experience and access rights, and due to Canonical more focused in Ubuntu. Thanks already no for the cooperation.

For Ubuntu I can simply upload the new packages, or sync them from Debian (copy the Debian package without changes into Ubuntu), but, in contrary to Debian, the Ubuntu repository of free software packages is split into two parts: Main and Universe. The most important and essential parts of the operating system, which are covered by Canonical's commercial support, are in Main. Universe is a wide range of additional packages for Ubuntu, usually maintained by the community.

Packages newly added to Ubuntu, like PAPPL for example, land in Universe. To promote a package into Main, a Main Inclusion Request (MIR) has to be posted into the bug tracker on Launchpad. This is to check whether a free software package is reliable enough to be a core part of a commercially supported operating system. I must be well-maintained, security vulnerabilities quickly fixed, code fulfilling security standards, depending only on other packages which are also in Main, ...

The printing stack is usually a core part of the operating system and in Ubuntu, packages like CUPS, cups-filters, Ghostscript, most printer drivers, ... are in Main. Now several new packages which are entering via Universe have to transferred into Main with a MIR:

- cups-filters 2.x components: libcupsfilters, libppd, cups-browsed: [Simplified MIR](https://bugs.launchpad.net/bugs/2003259), [PPA](https://launchpad.net/~till-kamppeter/+archive/ubuntu/new-arch-dev/+packages)
- cpdb-libs: [MIR](https://bugs.launchpad.net/bugs/1747759)
- cpdb-backend-cups: [MIR](https://bugs.launchpad.net/bugs/1747760)
- cpdb-backend-file: [MIR](https://bugs.launchpad.net/bugs/2003272)

MIRs for PAPPL and libpappl-retrofit still need to get posted, and for libpappl-retrofit also the Debian package still needs to get created.

For the new component packages of cups-filters we do only a simplified MIR, as the code is already in Main, in the old cups-filters 1.x and partially also in libcups (PPD support code). Therefore this change is only distributing the code into more source packages and not introducing new code.

Here I want to thank Sebastien Bacher for helping me with the preparation of the packages for the MIR requirements, especially the new ones which got introduced after my last MIR several years ago.

Another challenge was that I found an [old package named "libppd"](http://sourceforge.net/project/showfiles.php?group_id=3800&package_id=11729) which was a library providing the PPD support functionality ripped out of libcups to LPD users, via the "gpr" and "ppdfilt" utilities. It stayed unmaintained (and forgotten) for more than 20 years while [all the distros had switched to CUPS](/achievements/#getting-all-linux-distributions-to-use-cups). This package is clashing with the name of the libppd of the new generation of cups-filters.

I discussed its removal/renaming with [Debian folks](https://lists.debian.org/debian-printing/2022/12/msg00023.html) and we settled on renaming this into "libppd-legacy" after the Debian Bookworm release. The renaming has already taken place in Debian Experimental now, where all the packages of the New Architecture will go for now until Bookworm is released.

For Ubuntu I asked for a [complete removal](https://bugs.launchpad.net/bugs/2000411), which is now done. So now nothing is in the way any more for the upload of the new packages, especially also libppd.


## cups-filters bug fixes and second beta (2.0b2)
During the selection and onboarding process for the GSoC 2023 (see above) we are assigning many of our issues on GitHub to contributor candidates for them to learn about our code base.

This leads us to deeper investigation of several bugs and to fixes of them.

Like with [this issue](https://github.com/OpenPrinting/cups-filters/issues/492): To get the full capabilities of a driverless IPP printer, a client (CUPS, or the `driverless` utility) needs to poll the attributes `all` and `media-col-database` with a `get-printer-attributes` IPP request (`media-col-database` is not included in `all` as it is often a very long list). Some printers cannot cope with the two being polled in a single request]. So I added [separate polling](https://github.com/OpenPrinting/libcupsfilters/commit/789cca62) of the two to work around this, and also [parsing the `media-col-ready` attribute](https://github.com/OpenPrinting/libcupsfilters/commit/3b9ec4aa5) now, to lower chances to overlook something (like borderless printing support).

I need to later on add the separate polling of `all` and `media-col-database` also in CUPS.

During packaging of the components in Debian packages I have found and fixed some build system and documentation bugs and also an [API bug](https://github.com/OpenPrinting/libcupsfilters/commit/389d233a) discovered during the CPDB work.

**After that I have [released the second beta](https://openprinting.github.io/cups-filters-Second-Generation-Second-Beta-Release/):**

In addition to documentation and build system fixes discovered during the Debian packaging, the following changes have been done:

**libcupsfilters**

- Filter functions did not handle the page size correctly when no printer IPP attributes are supplied (in case of classic CUPS filter no PPD file). Now if a page size is supplied with the job, this one is simply used, otherwise the sizes of the input pages and as a last mean US Letter.
- In the `cfCatalog...()` API for obtaining human-readable strings and translations of attribute/option and choice names, we added suport for specifying the user's UI language now, to receive the requested strings in the correct language, and not only human-readable strings in English.

**libppd**

- In the PPD file generator for driverless printing with CUPS we now support more than 2 resolutions in Apple Raster/AirPrint. The `urf-supported` IPP attribute was only parsed correctly when its `RS` part had only 1 or 2 and not more resolutions specified. We have corrected now for an arbitrary amount of resolutions, taking the lowest for "draft", the highest for "high" and one in the middle for "normal" print quality.
- `ppdFilterEmitJCL()`: Added NULL check for PPD not being supplied. Classic CUPS filters created based on filter functions using `ppdFilterCUPSWrapper()` and also filter functions of libppd (`ppdFilter...()`) should also work without PPD file and not crash if no PPD file is supplied.


## LPrint 1.2.0 release
The Printer Application for label printers, [LPrint](https://www.msweet.org/lprint) v1.2.0 ([Snap Store](https://snapcraft.io/lprint)) adds support for snap configuration and EPL/ZPL auto-typing support, and fixes a number of bugs. Changes include:

- Documentation corrections ([Issue #53](https://github.com/michaelrsweet/lprint/issues/53), [Issue #76](https://github.com/michaelrsweet/lprint/issues/76))
- Added snap server configuration.
- Added `--with-systemd` configure option and install to `$prefix/lib/systemd/system` by default ([Issue #50](https://github.com/michaelrsweet/lprint/issues/50))
- Added EPL2 and ZPL auto-typing support ([Issue #64](https://github.com/michaelrsweet/lprint/issues/64))
- Changed the default log level for systemd to info ([Issue #82](https://github.com/michaelrsweet/lprint/issues/82))
- Fixed macOS installer to start LPrint server ([Issue #48](https://github.com/michaelrsweet/lprint/issues/48))
- Fixed configure script not using warning/preprocessor options in build ([Issue #60](https://github.com/michaelrsweet/lprint/issues/60))
- Fixed printer renaming algorithm to not truncate the name ([Issue #60](https://github.com/michaelrsweet/lprint/issues/60))
- Fixed missing `print-color-mode=bi-level` for bar code printing ([Issue #76](https://github.com/michaelrsweet/lprint/issues/76))
- Fixed label mode support in EPL and ZPL drivers ([Issue #79](https://github.com/michaelrsweet/lprint/issues/79))
- Fixed driver names for EPL printers ([Issue #52](https://github.com/michaelrsweet/lprint/issues/52))

[**More Details and Download**](https://github.com/michaelrsweet/lprint/releases/tag/v1.2.0)


## PAPPL 1.3.1 release
Michael Sweet has [released PAPPL 1.3.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.3.1). It is a general bug fix release.

Changes:
- Fixed auto-add of USB printers
- Updated "ipp-attribute-fidelity" support
- Reduced sleep interval for USB gadget initialization

[**More Details and Download**](https://github.com/michaelrsweet/pappl/releases/tag/v1.3.1)

[**GitHub Discussions**](https://github.com/michaelrsweet/pappl/discussions)
