---
title: OpenPrinting News - April 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Releases of Ubuntu 24.04, Fedora 40, MS-DOS 4.0, OpenPrinting Summit/PWG Meeting, LAS 2024, GSoC 2024, system-config-printer revival, KDE Print Manager, CUPS 2.4.8, pycups 2.0.4
---
We had three releases of free software operating systems in the last weeks. Both Ubuntu and Fedora came with their 40th release! [Ubuntu 24.04 LTS](https://www.omgubuntu.co.uk/2024/04/ubuntu-24-04-lts-20-changes-to-look-out-for) (Long Term Support) and Fedora 40. Unfortunately we did not have a [Linux App Summit for a joint release party](/OpenPrinting-News-April-2023/#release-party) in that week. This year the [Linux App Summit](#linux-app-summit-2024) will only take place in October (so one could celebrate 20 years of Ubuntu there).

Printing-wise there is not anything special to tell about in these two releases. In Ubuntu I have taken care that from all components the newest release is included and I have applied some bug fixes, and in Fedora probably the same thing got done.

The next major change will probably only happen in Ubuntu 25.04 and Fedora 42 (to be released in one year from now), as then we have hopefully CUPS 3.x and the needed changes in the desktop environments and applications.

The third one is MS-DOS 4.0. MS-DOS? This is not free software and was already released decades ago, you would think. No, now it **is** free software. [Microsoft has put it under a MIT license](https://cloudblogs.microsoft.com/opensource/2024/04/25/open-sourcing-ms-dos-4-0/) and [posted the source code on GitHub](https://github.com/microsoft/MS-DOS)! Unfortunately, [GIT does not do well with such old source code](https://www.os2museum.com/wp/how-not-to-release-historic-source-code/) leading to some compatibility problems. So to be able to easily build it we have to see whether, when, and how Microsoft will fix that.

Note that OpenPrinting does not plan to support DOS ...

So let us see what happened at OpenPrinting in April ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


## OpenPrinting Summit/PWG Meeting
On May 6-8 we will have our annual meeting together with the [PWG](https://www.pwg.org/) (Printer Working Group) again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2024-virtual.html). As in the years before the event is totally online.

We will present and discuss our work of the last 12 months and what we plan to do next. Especially CUPS 2.5.x/3.x, Printer/Scanner Applications, Common Print Dialog Backends (CPDB), Chrome OS, desktop integration, and the GSoC 2024 projects for the New Architecture are the main subjects of the meeting.

We will again not have a presentation from Artifex about Ghostscript and MuPDF. Due to the vastly reduced staff there was no actual feature development on Ghostscript, only bug fixes.

The freed up time we will make use of to talk about desktop integration, changes on printer setup tools, and CPDB support in print dialogs.

We will also have a session about distribution methods, where we will cover Snap, especially snapping the CPDB backend for CUPS and CUPS 3.x, and OCI containerization of CUPS and the Printer Applications.

From this year's GSoC contributors Akarshan Kapoor will give a short talk about scanner support in PAPPL and Rudra Pratap Singh about OCI containerization.

See the schedules and how to participate on the [event web page](https://www.pwg.org/chair/meeting-info/may-2024-virtual.html).


## Linux App Summit 2024
Probably you were already wondering that I did not write about the [Linux App Summit 2024](https://linuxappsummit.org/) here. It is not skipped, it will take place, but this year only in October. This is because the organizers in [Monterrey in Mexico](https://linuxappsummit.org/local/), where the Summit will take place, did not find a date in April and so finally decided to settle on October 4-5.

The fact that the LAS ended up in Mexico this year was also caused by me. On the GUADEC 2023 in Riga, Manuel Haro has given a keynote in which he mentioned community work he did and he also mentioned the possibility of running a LAS. As it was some days before the deadline of the Call for Locations for 2024, I stepped up to him right after his keynote and told him how to apply and about the nearing deadline and he showed interest.

The next day on GUADEC Manuel met Jesús Soto from Canonical's Desktop Team, who lives in Mexico and studied in Monterrey, and talked with him about the idea. Jesús offered then to contact his university and so they applied for running the LAS in Monterrey, and this bid won.

Here is the [Call for Proposals](https://conf.linuxappsummit.org/event/6/abstracts/#submit-abstract).


## Google Summer of Code 2024
Last week, Google has [announced](https://summerofcode.withgoogle.com/programs/2024/projects) the slot counts assigned to each of the mentoring organizations and the accepted projects. This time [the Linux Foundation](https://summerofcode.withgoogle.com/programs/2024/organizations/the-linux-foundation) got generously served! 21 contributor slots for the 27 ranked proposals!

For OpenPrinting this means that we got 11 slots for our 13 ranked proposals. We had never that many contributors!

The accepted proposals for OpenPrinting are the following:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh<BR>
Mentors: Cristovão Cordeiro, Ira McDonald, Mohit Verma, Pratyush Ranjan, Saurav Dharwadkar, Till Kamppeter

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha<BR>
Mentors: Michael Weghorn, Gaurav Guleria, Akshit Chauhan, Ira McDonald, Sahil Arora, Till Kamppeter

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu<BR>
Mentors: George-Andrei Iosif, Dustin Ingram, Ira McDonald, Pratyush Ranjan, Shivam Mishra, Till Kamppeter

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor<BR>
Mentors: Rishabh Maheshwari, Deepak Patankar, Dheeraj Yadav, Ira McDonald, Mohit Verma, Till Kamppeter

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Gaurav Guleria, Akshit Chauhan, Aveek Basu. Ira McDonald, Shivam Mishra, Till Kamppeter

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal<BR>
Mentors: Mohit Verma, Zdenek Dohnal, Aveek Basu, Ira McDonald, Shivam Mishra, Till Kamppeter

**Make a native printer Application from Gutenprint**<BR>
Contributor: Ankit Pal Singh<BR>
Mentors: Solomon Peachy, Aveek Basu, Dheeraj Yadav, Ira McDonald, Zdenek Dohnal, Till Kamppeter

**GNOME Control Center: Finalizing the New Printing Architecture for GNOME**<BR>
Contributor: Kaushik Vishwakarma<BR>
Mentors: Mohit Verma, Ira McDonald, Pranshu Kharkwal, Shivam Mishra, Till Kamppeter

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma<BR>
Mentors: Gaurav Guleria, Deepak Patankar, Ira McDonald, Saurav Dharwadkar, Shivam Mishra, Till Kamppeter

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa<BR>
Mentors: Samuel Thibault, Chandresh Soni, Akshit Chauhan, Deepak Patankar, Ira McDonald, Till Kamppeter

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak<BR>
Mentors: Deepak Patankar, Dheeraj Yadav, Akshit Chauhan, Ira McDonald, Rishabh Maheshwari, Till Kamppeter

Of the 2 candidates who did not get selected, Sujal Bhor wants to do his project "cups-filters: Create OCR filter to deliver scans as searchable PDFs" voluntarily.

He appeared very lately before the submission window and so he could not do many assignments for us to know him better and therefore I ranked him on a rather low position. I told him that when he is doing his project well, he should apply in 2025, so that it will happen to him what now happened to Biswadeep and Ankit, who did not get selected last year and after doing excellent work voluntarily I ranked them higher this year and they got accepted. 

By the way, the selection process works as follows: Each mentoring organization selects the proposals they actually want to mentor from the ones they received during the submission period and have to rank them. For the Linux Foundation as a whole we have ranked 27 and Google gave us 21 slots. So the first 21 got accepted, ranks 22-27 got rejected.

As the Linux Foundation is an umbrella organization they are composed of several sub-organizations, OpenPrinting being one of them. So I as org admin asked each sub-group for ranking their projects and I by myself have ranked the OpenPrinting projects. After that I had to join the rankings in a round-robin, zipper style to not step on any sub-org's toes.

Inside OpenPrinting I applied the following criteria for ranking and for assignment of project ideas to contributors:

The project ideas most urgent and important to get done for OpenPrinting and the free software ecosystem are ranked the highest and assigned to the most promising candidates.

The most promising candisates for us are those who we know best due to their work on assignments, like investigating and fixing bugs, but even better due to voluntary contributions to OpenPrinting or a GSoC project they did with us in a previous year (one person can be GSoC contributor 2 times at maximum).

Contributors coming late to the party and therefore we not having time to give assignments and the candidate to work on them get lower-priority project ideas and so go lower in the ranking.

Last year we had two contributor candidates, Biswadeep Purkayastha and Ankit Pal Singh, who did not get a slot (we got only 12 slots for 24 ranked proposals for the whole Linux Foundation, or 6 of 12 for OpenPrinting) and they worked voluntarily for OpenPrinting and applied this year again. As they did amazing work I gave them more important projects and higher ranks and therefore they got accepted this year.

This counts much more for us than the proposals. Candidates just submitting a proposal without contacting us before will usually not get considered.

What also helped us for getting a good cut of slots is probably that we gathered many mentors. So thanks a lot to everyone who stepped up as mentor for OpenPrinting.


## system-config-printer development revival
Originally, we already had discontinued the development of [system-config-printer](https://github.com/OpenPrinting/system-config-printer) and put it into maintenance mode, only fixing bugs and collecting UI translations.

But system-config-printer is still used a lot. There are practically only 3 printer setup tools around: The "Printers" module of GNOME Control Center, the printer manager of KDE Settings, and system-config-printer. There are many more desktop environments than just GNOME and KDE, and distributions using many of those use system-config-printer as their printer setup tool.

Also both the GNOME "Printers" module and the KDE printer manager depend on system-config-printer. system-config-printer provides all its "intelligence" in a D-Bus service, named scp-dbus-service, which contains two algorithms which I have written long time ago, in the late 2000s when I started at Canonical and was responsible for the printing part of Ubuntu. This is once the algorithm to assign the best, most suitable driver to a printer given by make and model (or device ID) and second, the algorithm to find out whether two discovered printers are actually the same physical device. The algorithms wer separated into the D-Bus service to serve for other printer setup tools, too, and the ones of GNOME and KDE actually use it.

This means that system-config-printer is also the gold standard for assigning the correct driver to a discovered printer ...

For switching distributions into the New Architecture, meaning from CUPS 2.x to CUPS 3.x, the printer setup tool needs to get appropriately adapted, to list IPP print destinations with appropriate configuration options, especially access to their web admin interfaces, and assign Printer Applications to non-driverless printers.

And one needs to be very careful with switching over Ubuntu. The original distro from Canonical is GNOME-based, but there are the flavors, community-maintained distros derived from Ubuntu but with all kinds of different desktops. And the base of all of them is the same, and the printing stack, especially also CUPS is part of the base. So simply taking care of GNOME and then switching over is [failing miserably](/OpenPrinting-News-August-2023/#the-cups-snap-not-in-ubuntu-2310) ...

One could also think about dropping the concept of printer setup tools altogether as modern, driverless printers are simply there, but it is not very intuitive for a user to have to find a Printer Application and install it to make a non-driverless printer working and that for driverless printers and Printer Applications there are web admin interfaces and how to access them.

So to assure continued coverage of all desktops we need to revive development of system-config-printer and make it supporting the New Architecture, as we did already with the "Printers" module of GNOME. Also to complete any effort for CUPS 3.x support on the GNOME and KDE tools we also need to update system-config-printer.

So therefore we have revived the development, adding the support for CUPS 3.x in the GSoC project "[Desktop Integration: Update system-config-printer for the New Architecture of printing](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#desktop_integrationupdate_system-config-printer_for_the_new_architecture_of_printing)" by Shivam Jaiswal.

There are also some thoughts about further development towards CUPS 3.x in the [`README.md`](https://github.com/OpenPrinting/system-config-printer?tab=readme-ov-file#future-with-cups-30).


## KDE Print Manager
I told in the [previous section](#system-config-printer-development-revival) that there are practically only 3 printer setup tools, system-config-printer, the one from GNOME, and ...

... the KDE Print Manager in KDE Settings!

The first 2 are well covered by our GSoC activities, only the KDE one is not. But here the KDE developer Mike Noe is taking care of.

See his (and also my) comments on the following issue reports on the Print Manager:

- **[#1](https://invent.kde.org/plasma/print-manager/-/issues/1) Port away from deprecated CUPS API calls**: This one is only about doing away with the use of deprecated CUPS APIs. But this is already an important first step, to be able to smoothly switch to libcups3 and to display and handle IPP print destinations for which CUPS creates temporary queues automatically.
- **[#2](https://invent.kde.org/plasma/print-manager/-/issues/2) Printer Manager - Where to go next?**: This is about a general make up of the Print Manager. Inside there is a [sub-thread started by Nate Graham](https://invent.kde.org/plasma/print-manager/-/issues/2#note_745445) making aware of the "OpenPrinting CUPS 3.0 architecture" with reference to [Michael Sweet's notes in the CUPS GitHub repo](https://github.com/OpenPrinting/cups/wiki/CUPS-3.0) and [my talk on the GUADEC 2023 in Riga](https://www.youtube.com/live/dVVyokoQl2k?feature=share&t=5841). Mike Noe and me, we answered, I with a longer detailed message telling about the details and referring to [Mohit Verma's work on GNOME Control Center](https://github.com/vermamohit13/GSOC-2023).
- **[#11](https://invent.kde.org/plasma/print-manager/-/issues/11) Post Plasma6 rollout and CUPS 3.0 Direction**: Mike Noe's issue report about working towards CUPS 3.0 on the Print Manager, referring to the [sub-thread in issue #2](https://invent.kde.org/plasma/print-manager/-/issues/2#note_745445) and [Zdenek Dohnal's first thoughts on CUPS 3.0 support in system-config-printer](https://github.com/OpenPrinting/system-config-printer?tab=readme-ov-file#future-with-cups-30).

Also see the following merge request:

- **[#121](https://invent.kde.org/plasma/print-manager/-/merge_requests/121) kcm: Provide the driverless config option when driver discovery fails**: Here Mike Noe has added a functionality for setting up printers as driverless IPP printers.

So KDE developers are aware and especially Mike Noe is on it. I also had a longer e-mail exchange with Mike Noe explainiung him all the details and answering his questions.

I also plan to give a talk on the [aKademy 2024](https://akademy.kde.org/2024/) in Würzburg, Germany.


## CUPS 2.4.8
Half a year's worth of bug fixes, especially such important things like a race condition when querying an IPP print destination for which CUPS creates a temporary queue ([Issue #871](https://github.com/OpenPrinting/cups/issues/871)), raised `cups_enum_dests()` timeout for listing available IPP print destinations ([Issue #751](https://github.com/OpenPrinting/cups/issues/751), to make `lpstat -l -e` working correctly also when there are many IPP destinations in the network), and many many other bug fixes ...

Get it [here](https://github.com/OpenPrinting/cups/releases/tag/v2.4.8) and see [all the changes in detail](https://github.com/OpenPrinting/cups/blob/v2.4.8/CHANGES.md#changes-in-cups-v248-2024-04-26).

And the [CUPS Snap](https://snapcraft.io/cups/) is also already the current version, 2.4.8, thanks to [Snap release automation](/OpenPrinting-News-March-2024/#snap-automation-working-well)!

## pycups 2.0.4
The Python bindings for CUPS also received an update. This time it is all about compatibility with newer Python versions, 3.10 and newer.

> **Pycups 2.03**
>
> pycups 2.0.3 contains changes from 2.0.2 - mainly changes related to newer Python3 versions:
> 
> - removed shebang from example/cupstree.py
> - ignore driverless utilities for postscriptdriver tags creation (Fedora bug #1873385)
> - remove epydoc from Makefile ([#27](https://github.com/OpenPrinting/pycups/issues/27))
> - fix invalid delete of pointer ([#11](https://github.com/OpenPrinting/pycups/issues/11))
> - Makefile uses wrong Python ([#32](https://github.com/OpenPrinting/pycups/issues/32))
> - define PY_SSIZE_T_CLEAN in cupsipp.h - fixes traceback during IPPRequest.writeIO with Python 3.10
> - fix the test.py when there is no printer installed ([#46](https://github.com/OpenPrinting/pycups/issues/46))
> - Use PyObject_Call() instead of deprecated PyEval_CallObject()
> 
> Version 2.0.3 was created to attempt to fix pycups installation via pip, but it was unsuccessful.
> 
> Enjoy!

> **Pycups 2.04**
>
> The hotfix release removes install_requires from setup.py, which is used for generating OS requirements.
> 
> Enjoy!
