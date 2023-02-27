---
title: OpenPrinting News - February 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Linux Foundation accepted as GSoC 2023 org, LAS 2023 in Brno, CPDB accepted into GTK 4.9.4, libcups 3.0b1, New Architecture going into Ubuntu and Red Hat, cups-filters 2.0b4, pappl-retrofit 1.0b4, CPDB 2.0b2
---
Sorry, we are late this month, there was a lot of work getting the new generations of cups-filters and CPDB [into Ubuntu](#the-new-architecture-is-going-into-ubuntu-and-red-hat).

But we have a lot of **good and exciting news**! Not only that we got [accepted as mentoring organization in the Google Summer of Code 2023](#google-summer-of-code-2023---we-are-in--) but also Common Print Dialog Backends support got [merged into GTK}(#common-print-dialog-backends-support-accepted-into-gtk), and we have the first beta release on the way to CUPS 3.x, [libcups 3.0b1](#libcups-3-0b1---the-first-piece-of-cups-3-x-)!

Some of you were perhaps wondering how to **report security issues** and therefore hesitated to do so, now I succeeded in [getting an intuitive way](#private-bug-reports-for-security-issues).

And **Kurt Pfeifle**, who made me know about CUPS back in mid-2000 by a magazine article and [so made me what I am now](https://openprinting.github.io/history/) has retired and now wants to **contribute to the documentation** on OpenPrinting! Welcome back in the team!!


## Google Summer of Code 2023 - We are in!!
First off, the Linux Foundation got accepted as mentoring organization. So we are again looking for amazing contributors to do projects with us and improve the printing and scanning experience with Linux.

Our selection process has already started some months ago and we already got some promising candidates. If you want to participate, too, have a look at our [project ideas list](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects). Please contact us as soon as possible and not only when Google's application time window opens (March 20 - April 4).

Please send us your resume/CV and tell us what you like to work on, either on one of the project ideas or you can also provide your own project idea. Also have a look what we are doing via the links on our [About Us](/about-us/) and [News and Events](/news/) pages.

A nice side effect of having the contributors working on GitHub issues as part of the process is that we get several bugs fixed or feature requests implemented. For example we have completely overlooked to transfer the handy utility `cupstestppd` into [libppd](#cups-filters). Now, thanks to a contributor candidate we have it even as library function, `ppdTest()`, in addition to the new command line utility `testppdfile`. Also several bugs in the print filters got fixed.

Thanks a lot to all contributor candidates who helped us fixing bugs and accomplishing other tasks.


## Linux App Summit 2023
The [Linux App Summit 2023](https://linuxappsummit.org/) in Brno in the Czech Republic is coming closer. The conference will actually take place on Saturday, April 22 and Sunday April 23. On Friday, April 21 there will be a pre-registration. Here is some info about [the venue, the location, and how to get there](https://linuxappsummit.org/local/).

The Call for Proposals has closed and we got a lot of great abstracts, for talks, lightning talks, workshops, and BoFs, 44 in total. So now we have the hard work of selecting the best ones to accommodate in the two rooms we have, like [last year in Rovereto](/OpenPrinting-News-Flash-OpenPrinting-and-Ubuntu-on-the-Linux-App-Summit-2022/) an auditorium for the talks and lightning talks and a classroom for the workshops and BoFs.

Provided that it gets accepted I will give a talk about the **Printing GUI work to support the New Architecture**, on the [GNOME Control Center](https://github.com/vermamohit13/GSOC_2022_Summary) and on the print dialogs, especially the [GTK one](#common-print-dialog-backends-support-accepted-into-gtk), and perhaps also give a short demo. I will leave plenty of time in the end for an AMA (Ask Me Anything) and for further Q&A and discussion I will also run an **OpenPrinting BoF** session afterwards.

On my two printing sessions you will also have the chance to meet
- Marek Kasik (GTK/GNOME printing maintainer)
- Zdenek Dohnal (Red Hat printing maintainer, great contributor to CUPS and OpenPrinting)
- Albert Astals Cid (Qt print dialog)
- Harald Sitter (KDE developer, wants to improve Qt print dialog UI)

They will be in the rooms to answer questions and participate in the discussion.

I will also make use of the fact that this year we will for the first time offer workshops and give a **workshop to learn how to snap (= package as a Snap) applications** for distributing them via the Snap Store. So anyone who has missed [my Snap workshop series on the Ubuntu Summit](/OpenPrinting-News-November-2022/#and-the-conference-finally-started-), here is another chance. There is only this one workshop for the basics, but I have also seen some talks about advanced topics under the submissions and have given good reviews to them.

Accepted contributions will get announced on March 1.


## Common Print Dialog Backends support accepted into GTK
**Gaurav Guleria's [GSoC 2022 work on CPDB support for GTK](https://github.com/TinyTrebuchet/gsoc22/) got finally merged into GTK upstream!**

Gaurav posted the [merge request](https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930) during his GSoC time back in August 2022. Now, half a year later, after a lot of extra work after the GsOC, mainly during the winter break of his college, and after a lot of discuassion of him and me with the upstream maintainers Matthias Clasen and Marek Kasik, the code got finally merged.

Compared to Gaurav's initially posted code a lot of changes were needed to fulfill the requirements of the upstream maintainers for the print dialog. Especially many changes required also the addition of important features to CPDB, especially synchronous and asynchronous polling of information, keeping the list of available printers up-to-date, human-readable option, choice, and option group names and translations, ... All this Gaurav completed, mentored by Marek Kasik and me.

With this, the Common Print Dialog Backends concept made it **for the first time into real life**, and especially into the most common of the print dialogs, the one of GTK. This way the print dialog is prepared for any change in the print technologies, especially the **switchover of CUPS into the New Architecture without PPDs**.

Now Gaurav is working on getting the [merge request](https://codereview.qt-project.org/c/qt/qtbase/+/437301) for the CPDB support in the Qt print dialog accepted ...

On [LAS 2023](#linux-app-summit-2023) end-April, in my printing GUI talk I will report about this work, and if possible, also present a demo of it. And Marek Kasik will be with me in the room, for questions and answers.

Gaurav, thanks for your amazing work on both the GTK print dialog itself and also on the [2nd generation of the CPDB](https://github.com/OpenPrinting/cpdb-libs/releases) and the [backends](https://github.com/OpenPrinting/cpdb-backend-cups/releases)!

Marek Kasik and Matthias Clasen, thanks a lot for guiding Gaurav to get his work accepted into GTK!


## libcups 3.0b1 - The first piece of CUPS 3.x!
Michael Sweet has **released the [first beta of libcups 3.0](https://openprinting.github.io/libcups-3.0b1/)!**

This is the first of the new split components of CUPS 3.x. It will not only have deprecated features removed, like PPD file and classic driver support, but also a lot of new functionality, like for example:

- [DNS-SD API](https://github.com/OpenPrinting/libcups/issues/19)
- [JSON API](https://github.com/OpenPrinting/libcups/issues/31),
- [Localization API](https://github.com/OpenPrinting/libcups/issues/24)
- Vast improvements on ipptool
- More consistent APIs
- New PWG media sizes, ...
- A lot more ...

So we will not only get a streamlined all-IPP CUPS without the PPD burden, but also several nice new APIs to make the development of all kinds of printing-related software easier.

Now we need to test and adapt everything at OpenPrinting which is using libcups to the new library version: libcupsfilters, libppd, cups-filters, cups-browsed, pappl-retrofit, cpdb-backend-cups, ... This should not be so complicated as we have transfered all PPD file support into libppd already.

And there is already a GSoC contributor candidate on it to start the adaptation.


## The New Architecture is going into Ubuntu and Red Hat

**Ubuntu**

I have continued the Ubuntu integration work. See also my [report on it from last month](/OpenPrinting-News-January-2023/#new-architecture-makes-it-into-ubuntu-and-debian), where I have especially talked about the concepts and requirements.

Of all the packages libcupsfilters, libppd, cups-filters. cups-browsed, pappl, pappl-retrofit, cpdb-libs, cpdb-backend-cups, and cpdb-backend-file, the current versions are uploaded.

The first challenge is that they **build on the 6 supported processor architectiures**. and pass two levels of automatic tests which get performed with every package upload, also on each of the 6 architectures. Libraries must in addition have a complete **list of symbols** (API function and variable names) used for automatic package dependency resolution. Only with this fulfilled, the package passes from proposed status to released status ("migrates"). Only packages with released status are visible for users who are searching for packages to install and replace the previous package version in the distro. This process is independent of whether the package is in Universe or in Main.

The two levels of tests are the **build test** which is performed when one runs `make check` after one has run `make`, so the freshly compiled, not yet installed programs are tested. The second level is the so-called **autopkgtest** which is performed with the software and all its dependencies installed on a virtual machine. This is to check whether the software runs in the actual system environment of the current Ubuntu. On each upload of a package not only the autopkgtest of the package itself is performed but also the autopkgtests of each package which depends on the uploaded package.

Now one could think why do I not simply upload packages which do not contain any tests and they get simply accepted when they just build. For Universe this is fine, but to get a package promoted from Universe to Main, it does not only need to fulfill the criteria of stability, security, being well maintained, ... but also actually contain non-trivial tests for both the build test and the autopkgtest.

So this meant a lot of work, first, **symbol lists** are easily auto-created for libraries which do not contain C++, but for C++ code in libraries it gets crazy, as there are entries which differ between the different processor architectures in the auto-created lists and then manual merging is required, and usually several uploads of the package, checking the auto-generated symbol lists and doing several merging iterations. This was the case for **licupsfilters** and **libppd**, the other library packages are all free of C++. So **a reason to avoid C++ at OpenPrinting ...**. Thanks a lot to Sebastien Bacher and Jeremy Bicha for all the valuable help on this!

Next step are the **tests**: **libcupsfilters** and **libppd** ([MIR](https://bugs.launchpad.net/ubuntu/+source/cups-browsed/+bug/2003259)) have have build tests (`make check` actually does something) but the new Debian/Ubuntu packages also need autopkgtests. Also the old cups-filters 1.x package did not have autopkgtest allowing to transfer the appropriate part to libcupsfilters. To avoid having to design autopkgtests I simply added optionally installable binary packages to install the test programs of the build test into the system so that they can be used as autopkgtests and the problem was solved.

But **cups-browsed** ([MIR](https://bugs.launchpad.net/ubuntu/+source/cups-browsed/+bug/2003259)) has no tests at all and **cpdb-libs** ([MIR](https://bugs.launchpad.net/ubuntu/+source/cpdb-libs/+bug/1747759)), **cpdb-backend-cups** ([MIR](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-cups/+bug/1747760)), and **cpdb-backend-file** ([MIR](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-file/+bug/2003272)) lack build tests.

Therefore we need, not only for our own QA, a **good test infrastructure** for all the software we produce. This is already on our [roadmap](/OpenPrinting-News-September-2022/#openprinting-micro-conference-on-the-linux-plumbers-2022) and we will let two GSoC contributors [work on it](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#ci_testing_programs_for_libcupsfilters_libpappl-retrofit_libppd_cpdb).

In **cups-filters** ([2.0b4](https://openprinting.github.io/libcupsfilters-and-libppd-Second-Generation-Forth-Beta-Release/)) I have also eliminated warnings about deprecated QPDF functions by making everything using the current QPDF 11 API, as having that many warnings was not much liked by the MIR approval team.

Of the **Common Print Dialog Backends** I released the [second](/Common-Print-Dialog-Backends-Second-Generation-Second-Beta-Release/) and the [third beta](/Common-Print-Dialog-Backends-Second-Generation-Third-Beta-Release/), to have a CPDB release with which [GTK 4.9.4](#common-print-dialog-backends-support-accepted-into-gtk) actually builds and to get the improvements in translation support in, all in time for Lunar's Feature Freeze. All 3 packages (cpdb-libs, cpdb-backend-cups, cpdb-backend-file) already did the migration from -proposed into the release in Universe.

For **PAPPL** I posted the [MIR](https://bugs.launchpad.net/ubuntu/+source/pappl/+bug/2004119). The package ([1.3.1](https://launchpad.net/ubuntu/+source/pappl/1.3.1-2)) synced already from Debian.

For the [first Debian/Ubuntu package](https://launchpad.net/ubuntu/+source/pappl-retrofit) of **pappl-retrofit** I have released the [second beta](/pappl-retrofit-Second-Beta-Release/) upstream. It especially includes the systemd `*.service` file for auto-starting the Legacy Printer Application as system service. The Debian package contains a binary package of the [Legacy Printer Application](https://github.com/OpenPrinting/pappl-retrofit#legacy-printer-application) for making classically installed (also proprietary) printer drivers available for the CUPS Snap and for CUPS 3.x.

**Red Hat**

The new packages, for now at least libcupsfilters, libppd, cups-filters, and cups-browsed will replace the old cups-filters package also in Red Hat and Fedora Linux. Therefore Red Hat's printing maintainer Zdenek Dohnal did a lot of fixes and clean-up on the upstream source code and build systems of these packages.

He [removed some unnecessary dependencies](https://github.com/OpenPrinting/libcupsfilters/pull/7) (Avahi, GLib, zlib, Freetype) from libcupsfilters which got overlooked during the separation. He also removed overlooked dependencies in the other packages, especially on C++ in cups-filters and cups-browsed and added explanations for the actual dependencies to the `INSTALL` files. These changes are in my release of the [third beta](/cups-filters-Second-Generation-Third-Beta-Release/).

Zdenek ran also Coverity on libcupsfilters ([PR](https://github.com/OpenPrinting/libcupsfilters/pull/11)) and libppd ([PR](https://github.com/OpenPrinting/libppd/pull/9)), discovering several bugs (memory leaks, possible buffer overflows, ...) and fixed those. This fixes are available in the [forth beta](/libcupsfilters-and-libppd-Second-Generation-Forth-Beta-Release/) now.

Thank you very much, Zdenek for all this amazing work! 


## Private bug reports for security issues
Some of you were probably thinking about how to report a security vulnerability in OpenPrinting's software, how to do an appropriate private bug report. Perhaps some even gave up on the report because they did not find the right place for it.

I have now investigated and found out how to get this done with GitHub repositories. First, the support for private bug reports needs to get activated in the security section, and second, to have the link to actually report such a bug not hidden under security, create at least one template for regular bug reports so that initiating a regular bug report lands the user on a template selection page, and here, in addition to the defined templates, a button for a private security bug report appears.

So to start somewhere I have added templates for issue submissions to the [CUPS](https://github.com/OpenPrinting/cups/commit/850e604c7c) and [cups-filters](https://github.com/OpenPrinting/cups-filters/commit/71dd90b972) repositories. This adds said selection page when the "New Issue" button gets clicked, not only allowing to select the template ("Bug report", "Feature Request") but also providing a button for a private security bug report. Shortly after, Zdenek Dohnal already refined the one of CUPS and added a [REPORTING_ISSUES.md](https://github.com/OpenPrinting/cups/pull/602) file. We will soon add this on the remaining repositories of OpenPrinting.


## CUPS
In addition to the [release of libcups 3.0b1](#libcups-3-0b1---the-first-piece-of-cups-3-x-) maintenance work on CUPS 2.x continued, as this version will be with us still for some time.

While assigning issue reports to GSoC contributor candidates and them investigating the reports and working on the bugs we get several fixes done. On CUPS the following problems got solved:

- If the `get-printer-attributes` IPP request on attributes `all,media-col-databse` fails, we poll `all` and `media-col-database` separately and several printers work this way ([PR](https://github.com/OpenPrinting/cups/pull/599)). Without this in some cases printer features, like borderless printing, get overlooked ([Issue on cups-filters](https://github.com/OpenPrinting/cups-filters/issues/492)).

- snapd-glib got a new API snapd-glib-2, and the CUPS package in Ubuntu got updated by a patch. Now I have added support for the new API upstream ([commit](https://github.com/OpenPrinting/cups/commit/63890581)).

- We fixed also a long-standing [bug](https://github.com/OpenPrinting/cups/issues/614) which broke printing on several monochrome driverless IPP printers due to the PPD file generator setting (the not available) RGB as default color mode. It is now fixed by [this commit](https://github.com/OpenPrinting/cups/commit/ebf3bb82).

Ubuntu 23.04 (Lunar Lobster) will most probably come with CUPS 2.4.2, perhaps with 2.4.3 if it gets released in time for Final Freeze (April 13).


## cups-filters
In the course of the [integration of the new generation of cups-filters in Ubuntu](#the-new-architecture-is-going-into-ubuntu-and-red-hat) I have done two more beta releases to include general bug fixes and also fulfill requirements for Ubuntu. Also several of the bug fixes were done in cooperation with [GSoC contributor candidates](#google-summer-of-code-2023---we-are-in--) to whom we have given issue reports as assignments.

**[Third beta](https://openprinting.github.io/cups-filters-Second-Generation-Third-Beta-Release/)**

- Monochrome PXL-XL printing (Ghostscript, output device `pxlmono`) did not work due to the `cfFilterGhostscript()` filter function using the sRGB instead of the sGray color profile, which makes Ghostscript erroring out ([commit](https://github.com/OpenPrinting/libcupsfilters/commit/81f0e79)).
- As in CUPS we have also added the separated polling of the `all` and `media-col-database` attributes from driverless printers to cups-filters ([commit](https://github.com/OpenPrinting/libcupsfilters/commit/789cca62d), [issue](https://github.com/OpenPrinting/cups-filters/issues/492))
- We parse also `media-col-ready` in the `get-printer-attributes` IPP responses now, to more reliablly find all media properties ([commit](https://github.com/OpenPrinting/libcupsfilters/commit/3b9ec4aa5), [issue](https://github.com/OpenPrinting/cups-filters/issues/492)).
- Removed the public `cfPDFOut...()` API (`cupsfilters/pdfutils.h`). This API only makes sense if the API of fontembed is also public, but this we made private earlier ([commit](https://github.com/OpenPrinting/libcupsfilters/commit/389d233a)).
- Removed unnecessary dependencies, especially on C++ in cups-filters and cups-browsed. Thanks, Zdenek Dohnal.
- Many fixes in the build system and the source code documentation.

**[Forth beta of libcupsfilters and libppd](https://openprinting.github.io/libcupsfilters-and-libppd-Second-Generation-Forth-Beta-Release/)**

- Zdenek Dohnal from Red Hat has run all the components of the new generation of cups-filters through Coverity and found several bugs: Memory leaks, files not closed, possible string overflows, ... He fixed all these bugs in the upstream code. This assures reliability and security of all the new components, especially if being part of permanently running daemons ([PR libcupsfilters](https://github.com/OpenPrinting/libcupsfilters/pull/11), [PR libppd](https://github.com/OpenPrinting/libppd/pull/9)). Thanks a lot, Zdenek!
- Updated libcupsfilters to work with the latest version of QPDF (11) as building it showed a lot of warnings about the use of deprecated functions in QPDF. Now it should be even ready for the upcoming QPDF 12.
- After GSoC candidate Biswadeep Purkayastha having gotten assigned a bug report about the [PostScript Printer Application not preventing the use of malformed, user-supplied PPD files](https://github.com/OpenPrinting/ps-printer-app/issues/12), we realized that we did not transfer CUPS’ valuable command line tool cupstestppd into libppd. This Biswadeep [has done now](https://github.com/OpenPrinting/libppd/pull/6)), as the library function `ppdTest()`, easily callable from a [PPD-retrofitting](https://github.com/OpenPrinting/pappl-retrofit) Printer Application. He also created the wrapper executable `testppdfile` to replace `cupstestppd`. Thanks a lot for this excellent work!
- As in CUPS, we fixed the bug of PPD files for monochrome driverless IPP printers having RGB as default color mode choice in their PPD file and therefore the printer not printing also in the [PPD generator of libppd](https://github.com/OpenPrinting/libppd/commit/ae345c3a).
- And we fixed a [crash](https://github.com/OpenPrinting/cups-filters/issues/507) in the `cfFilterImageToRaster()` filter function, PNG images coming out [blank](https://github.com/OpenPrinting/cups-filters/issues/465), crash on PPD files with "Unknown" default page size, and a possible crash in the build test (`make check`) of libppd.

**[cups-filters 1.28.17](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.17)**

For distributions which do not switch the second generation of cups-filters yet, like Debian Bookworm, we have again backported important fixes to the 1.x series of cups-filters:
- Let the PPD generator for driverless IPP printers only put the one, most desirable `*cupsFilter2: ...` line into the PPD, usually the one for Apple Raster.
- Poll `all` and `media-col-database` attributes separately in `get-printer-attributes` IPP request if needed.
- Let PPD generator also parse media-col-ready IPP attribute.
- Actually read all margin sizes in the `media-{left,right,top,bottom}-margin-supported` IPP attributes and do not skip the first value which is often borderless.


## Braille Printer Application
I continued working with Chandresh Soni on the [PR](https://github.com/OpenPrinting/braille-printer-app/pull/1) for getting the Braille Printer Application upstream. Unfortunately it is not in a working condition yet.

For now, we will simply use the classic CUPS driver as it is contained in the repository, like [Zdenek Dohnal](https://github.com/OpenPrinting/braille-printer-app/issues/2) for Red Hat.

Zdenek Dohnal also [improved the privilege dropping](https://github.com/OpenPrinting/braille-printer-app/commit/7c808110) of the `cups-brf` CUPS backend. Thanks a lot.


## Common Print Dialog Backends
For the requirements of the [CPDB support in the GTK print dialog](#common-print-dialog-backends-support-accepted-into-gtk) Gaurav Guleria needed to do a lot of enhancements on CPDB itself, and when his merge request got accepted into GTK, CPDB 2.0b1 was already 2 months old and after that a lot of changes have been done, ending up with GTK's CPDB support [not building with any released version of CPDB](https://gitlab.gnome.org/GNOME/gtk/-/issues/5589). Therefore we have now [released version 2.0b2](https://openprinting.github.io/Common-Print-Dialog-Backends-Second-Generation-Second-Beta-Release/) of all the three components (cpdb-libs, cpdb-backend-cups, cpdb-backend-file) of the CPDB to allow easy building of the first CPDB-supporting GTK.

Features added are
- **Options groups:** This allows better structuring of options in print dialogs. Common options are categorized in groups, like media, print quality, color, finishing, ...
- **Initial printer list:** When opening the dialog, in one synchronous function call the initial printer lists are polled from all installed backends.
- **Update printer list continuously:** Backends will automatically signal any print queue updates to the frontend to keep the displayed list up to date.
- **Translation support:** For option, choice, and group names translations can be provided, both from backends and from frontend libraries.
- **Allow re-establishing the D-Bus connections** between frontend and backend.
- **CUPS backend makes use of the new features:** It subscribes to CUPS notifications on print queue changes and passes the changes on to the frontend and it provides option/choice/group name translations from both CUPS' message catalogs and polling via IPP from CUPS queues and printers.

Also several bugs got corrected and work on the documentation done. And there are now three source code download formats: `*.tar.gz`, `*.tar.bz2`, and `*.tar.xz`

Shortly before Feature Freeze for Ubuntu 23.04 I have released the [third beta](https://openprinting.github.io/Common-Print-Dialog-Backends-Second-Generation-Third-Beta-Release/) with improvements in translation support, now having functions to load translations synchronously and asynchronously.


## PAPPL Scanning Support
One of our GSoC contributor candidates is preparing for working on the GSoC project idea "[Scanning support in PAPPL](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#scanning_support_in_pappl)". He has compared the printing-related and scanning-related API functions, added header comments for automatic generation of developer documentation, implemented missing functions, and we had a video meeting to plan his work on the project ([Pull request on PAPPL](https://github.com/michaelrsweet/pappl/pull/249)).


## pappl-retrofit
I have released the [second beta](/pappl-retrofit-Second-Beta-Release/). It especially includes the systemd `*.service` file for auto-starting the [Legacy Printer Application](https://github.com/OpenPrinting/pappl-retrofit#legacy-printer-application) as system service, so that it can easily be used for making classically installed (also proprietary) printer drivers available for the CUPS Snap and for CUPS 3.x.

As an example case for the Legacy Printer Application we can take this [bug](https://github.com/OpenPrinting/cups-filters/issues/497) where it turns out that a printer designed to be driverless does not work correctly when used as such and the manufacturer worked around the bug with their proprietary driver, defeating the original driverless design of the printer. In the end of the bug's discussion thread I discussed with Zdenek Dohnal (Red Hat) and Brian Potkin (Debian) about how to use legacy CUPS drivers with the Legacy Printer Application in the era of the New Architecture/CUPS 3.x.
