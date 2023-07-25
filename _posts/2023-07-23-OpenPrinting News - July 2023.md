---
title: OpenPrinting News - July 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: GUADEC 2023 in Riga, Opportunity Open Source in IIT Mandi, India, Ubuntu Summit 2023 in Riga, GSoC 2023, Ubuntu 23.10 with snapped CUPS, versioned Printer Applications.
---
My work since the last news post was mainly organizing and preparing for conferences and updating and improving our Snaps, of CUPS, ipp-usb, and the 4 Printer Applications.

The work on our Snaps is to prepare them for the default inclusion in Ubuntu 23.10 and in [Ubuntu Core](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop). We had to version the Printer Applications, promote them to the stable channel, the `cups-control` interface got checked for different system types and fixed to work on all of them, ...

And we have a lot of conferences again, GUADEC, DebConf, the second Ubuntu Summit, and a new one: The Opportunity Open Source in the IIT Mandi! And this one is my baby! We have many students from the IIT Mandi under our GSoC contributors, and so Aveek Basu and me decided to neet them in-person to motivate even more.

But next up is GUADEC. On the GNOME developer conference I will tell about the state of the art of the GNOME UI for printing, teach application developers how to make Snaps to be distributed in the Snap Store, an discuss the printing-related topics in a BoF with GNOME developers.

**And stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting).**


## GUADEC 2023 in Riga
Tomorrow the [GUADEC](https://events.gnome.org/event/101/overview) in Riga, Latvia, will start! I am already on the way to there.

I have now prepared everything for my 3 sessions, especially the slides (linked below) but also the exercises and examples and a virtual machine image for the Snap workshop.

See the [schedules](https://events.gnome.org/event/101/timetable/#all).

**Please also keep an eye on Mastodon for updates: [#GUADEC2023](https://ubuntu.social/tags/GUADEC2023), [#GUADEC](https://ubuntu.social/tags/GUADEC)**

Also note that if you cannot make it to Riga you can register as remote attendee and then watch all the talks live (and also ask questions via keyboard, as far as I remember).

On Tuesday I will get to Riga, meet my colleagues and friends, attend some exciting sessions, have an even more exciting hallway track, and will host these sessions:

**[The New Printing GUIs: GNOME Control Center and Common Print Dialog Backends](https://events.gnome.org/event/101/contributions/461/)**

Wed, July 26, 10:00 EEST, room 2

[Slides](https://events.gnome.org/event/101/contributions/461/attachments/195/385/guadec-2023-new-architecture-demo.pdf)

Right on the first day I will talk about the state of the art of the printing GUIs for the New Architecture, the "Printers" part of the GNOME Control Center and the Common Print Dialog Backends (CPDB) support in the print dialogs and will also demo the GUIs. I will also announce my BoF then.

**[Your app everywhere, just in a Snap! (Workshop)](https://events.gnome.org/event/101/contributions/460/)**

Sat, July 29, 14:15 EEST, room 1 (**Update**)

[Slides](https://events.gnome.org/event/101/contributions/460/attachments/194/380/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf)

This GUADEC will get snappy! In this 2-hour interactive workshop you will learn how to snap (= package as a Snap) your favourite applications! You will snap a simple GNOME application on your own laptop and after that we (me and Jesús Soto) will also help you to snap your applications.

**Update: The workshop got moved to two hours later to not run in parallel with the only other workshop on the GUADEC, "[Discover GNOME development with Workbench](https://events.gnome.org/event/101/contributions/538/)" at 12:00 in room 2.**

**If you want to attend the workshop, please prepare your laptop for the hands-on exercises, by installing the needed software or downloading our virtual machine image. Instructions are in the "Setup" section of the [slides](https://events.gnome.org/event/101/contributions/460/attachments/194/380/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf) and here is the [Ubuntu 23.04 virtual machine image](https://drive.google.com/file/d/1kkxZ8GE3_UtG7orl5v2d4x_T4FhMUcbb/view?usp=sharing) with everything needed alrady installed. Note that the `*.qcow2` image is 5.7GB large, so please download it as soon as possible and especially not during the workshop.**

**[GNOME/GTK Printing BoF](https://events.gnome.org/event/101/contributions/535/)**

Sun, July 30, 12:30 EEST, room 3

[Slides](https://events.gnome.org/event/101/contributions/535/attachments/244/387/guadec-2023-gnome-gtk-printing-bof.pdf)

During my work on the New Architecture for printing and a recent discussion with GNOME developers and designers, I have 2 subjects I want to discuss in-person:

1. UI Design for the GNOME Control Center "Printers" module with support for the New Architecture
2. Separation of GTK printing API into its own project

Main participants of the discussion are me, Matthias Clasen, and Jakub Steiner. Anyone is invited to participate.

Remote participation is possible and I expect that Mohit Verma, GSoC contributor on the "Printers" module of G-C-C, and Gourav Guleria, GSoC contributor (2022) and mentor (2023) on CPDB support in print dialogs will connect.

**Canonical/Ubuntu Booth**

Wed-Fri

I will also be at the booth for some time and will be able to demo recent work on printing, scanning, Snap, and Ubuntu, and also help you preparing your laptop for the Snap workshop.


## Opportunity Open Source in the IIT Mandi, India
Organizing every year the participation of [the Linux Foundation](https://www.linuxfoundation.org/) as mentoring organization in the [Google Summer of Code](https://summerofcode.withgoogle.com/) (GSoC) and mentoring contributors for OpenPrinting I work together with Aveek Basu who joined OpenPrinting when he worked at Lexmark in India. He is reaching out to colleges and universities in India and this way we have every year around 5-7 students as contributors for OpenPrinting, most of them studying at the [Indian Institute of Technology (IIT) in Mandi](https://www.iitmandi.ac.in).

With the [DebConf](#debconf-2023-in-kochi-india) being in India, Aveek and me have decided to meet most of our current and former contributors in-person and motivate the students, professors, and researchers to join the community of developers, designers, doc writers, … in a 2-1/2-day conference, the "**[Opportunity Open Source](https://events.canonical.com/e/mandi2023)**".

We will

- talk with our contributors about their GSoC experience on a panel
- have a GSoC Q&A session
- have the contributors presenting their work
- have talks about OpenPrinting
- have talks about [Zephyr](https://www.zephyrproject.org/)
- have Rudra Saraswat on the conference giving talks about his projects [Ubuntu Unity](https://ubuntuunity.org/) and [blendOS](https://blendos.co/).
- have a panel and Q&A with Canonical employees telling about jobs at Canonical, how to apply, how the work will be.
- have a talk (and perhaps also a workshop) about Snap by me.

By a **[Call for Proposals](https://events.canonical.com/event/35/abstracts/)** (extended to August 14) we hope to get even more contributions.

And for the attendees getting some real-life experience we are running this year’s OpenPrinting Roadmap Sprint (like our micro-conferences on Linux Plumbers: [2019](/OpenPrinting-Microconference-on-Linux-Plumbers-Conference-2019/), [2020](/OpenPrinting-News-September-2020/#openprinting-microconference-on-linux-plumbers-conference-2020), [2021](/OpenPrinting-News-October-2021/#openprinting-micro-conference-on-the-linux-plumbers-2021), [2022](/OpenPrinting-News-September-2022/#openprinting-micro-conference-on-the-linux-plumbers-2022)) on the conference and attendees can participate in the discussion and planning of the next 12 months in printing and scanning.

We will also live-stream and record everything and allow remote participation.

The conference takes place on **September 8-10**, right before the DebConf.

By the way, I have extended the **[Call for Abstracts](https://events.canonical.com/event/35/abstracts/) to close on August 14**.

**There is a [thread on Ubuntu Discourse](https://discourse.ubuntu.com/t/opportunity-open-source/).**

**And we keep you informed via Mastodon: [#OpportunityOpenSource](https://ubuntu.social/tags/OpportunityOpenSource)**

I hope to see you all in Mandi!


## DebConf 2023 in Kochi, India
And thsi year I will be on Debian's annual developer conference, DebConf, for the first time! [This year´s edition](https://debconf23.debconf.org/) takes place in Kochi, in the south of India.

This is the annual 2-week meeting of the Debian developers to plan their work, 1 week DebCamp on Sep 3-9, informal, hackfest, BoFs, and a second week on Sep 10-17, with talks, panels, workshops, ... I will attend the second week, starting from the 11th or 12th, depending on when and how well I will arrive from Mandi.

I have submitted two presentations:

**The New Architecture for Printing and Scanning on Debian**

With the DebConf taking place right in the new cycle after the Bookworm release I will tell the Debian developer community about the New Architecture of printing and scanning to help them switch the Debian distribution to the new IPP-only PPD-less realm. The talk will also cover any news from our roadmap sprint in Mandi.

**Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!**

This talk is about how we have organized the conference, the challenges, and naturally also the outcome and experiences with running it, having come right from there to the DebConf. And we will have a Q&A session about organizing conferences and also being a mentoring organization for the Google Summer of Code.

So everyone interested in running a free software conference and/or participating in the Google Summer of Code is welcome to participate in this session.


## Ubuntu Summit 2023 in Riga
Preparations for another great [Ubuntu Summit](https://events.canonical.com/event/31/) are going on. The [Call for Proposals](https://events.canonical.com/event/31/abstracts/) has ended on July 21 and we got a whopping **178 proposals!!**

So we are reviewing like hell as we have a lot to select from.

I have also submitted some proposals, partially together with colleagues, a talk telling about my experience with the [Opportunity Open Source in the IIT Mandi](#opportunity-open-source-in-the-iit-mandi-india), a workshop about packaging applications as Snaps ("snapping") together with Lucy Llewellyn, and another workshop, about [Snap update automation on upstream releases](https://ubuntu.com/blog/improving-snap-maintenance-with-automation) with Heather Ellsworth.

Notification of acceptance of the sessions is planned to be sent out on July 31, probably we will also have the schedules then.

## Google Summer of Code 2023
5 of our 6 contributors have passed midterm and I as mentor and org admin got many positive evaluations from them. The 6th contributor did not fail, but we have postponed his remaining part of the GSoC, including midterm.

Some of the contributor's evaluations:

**Akarshan Kapoor (Scanning support for PAPPL):**

> Both the organization and the mentors have been excellent throughout my participation in GSoC. The well-structured and supportive environment provided by my organization has made the program a highly enriching experience. My mentors have been outstanding, offering consistent support and sharing their expertise, contributing significantly to my learning and growth. My experience with GSoC has been exceptionally positive due to their concerted efforts and dedication.

**Kushagra Sharma (CPDB support for Chromium, Mozilla, LibreOffice):**

> I wanted to take a moment to express my utmost gratitude and appreciation for the invaluable guidance and mentorship you have provided  by mentors at linux foundation

**Pratyush Ranjan (CI Testing for OpenPrinting):**

> Hi, you guys have been great, and I appreciate working with you all.

Write-up from Kushagra:

**OpenPrinting: CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Till Kamppeter, Gaurav Guleria, Shivam Mishra, Rithvik Patibandla, Ira McDonald

> After building chromium from source, I have created a dummy print backend which implements all the virtual functions in /printing/backend/printing_backend.h. After this next task is to add this dummy print backend to build files of ninja. The implementation requested from chromium dev team is that they want to select which print backend in runtime. I am currently working on how to tackle this task as currently if CUPS print backend is available then it is automatically using it and not the dummy print backend. Chromium team has asked me to push the changes on the gerrit so that they can assist. This will be my upcoming task

And Google does the Mentor Summits in-person again! So I will be on this year's Mentor Summit, October 13-15 on the Google Campus in Sunnyvale, California! Here I will meet my fellow mentors from a lot of different free software organizations to exchange experience, tell about the [Opportunity Open Source in the IIT Mandi](#opportunity-open-source-in-the-iit-mandi-india), and, with Ubuntu 23.10 being released on October 12, celebrate the release!


## The CUPS Snap in Ubuntu 23.10
Now it finally happened! Ubuntu is switched over to use the CUPS Snap as its printing stack. The Debian package of the CUPS daemon and of the classic CUPS drivers are going away.

First, do not rush out to grab Ubuntu 23.10 (Mantic Minotaur) and install it for testing it out, it has still too many rough edges in terms of printing. Especially do not install it on your daily driver machine, as usual, you should not use a development branch for your daily work ...

I worked together with Sebastien Bacher, leader of the distro squad in the Canonical Desktop Team. He told me what is needed for the installation image inclusion ("seeding") of my Snaps and I told him which Snaps have to get seeded and which Debian packages removed, and finally he switched over and current daily ISOs use the CUPS Snap as their printing system.

The [Snaps](https://snapcraft.io/publisher/openprinting) being all migrated to `core22` (Ubuntu 22.04 LTS) as base distro and all their components updated to the newest upstream versions already [last month](/OpenPrinting-News-June-2023/#snap-updates) I now had to give them version numbers nad release all of them on the "stable" channel in the Snap Store.

CUPS is already versioned, by CUPS' upstream version number plus a package release number, similar to the (classic) packages of Linux distributions. The upstream version number is taken from the metadata of the GIT snapshot of the CUPS upstream code loaded. The correct GIT snapshot is selected via the release tag (`source-tag:` in `snapcraft.yaml`). This method is already a preparation for future automation of [updating the CUPS Snap triggered by a new upstream release of CUPS via GutHub workflow](https://ubuntu.com/blog/improving-snap-maintenance-with-automation).

The 4 retro-fitting Printer Applications get their version numbers from their principal component, plus a package release number:

- PostScript Printer Application: foomatic-db, current version 20230715-1
- Ghostscript Printer Application: Ghostscript, current version 10.01.2-1
- HPLIP Printer Application: HPLIP, current version 3.22.10-1
- Gutenprint Printer Application: Gutenprint, current version 5.3.4-1

For all of them I select the version via upstream release tags, so that later automation will get easy.

No with all Snaps versioned I have promoted the current versions of them into the "stable" channel, and in addition, created `ubuntu-23.10` branches for them in the Snap Store, as this is needed for inclusion in Ubuntu 23.10.

With this in place we could change the seeding in Ubuntu 23.10:

*Removed Debian (binary) packages:*
- cups-daemom
- cups-browsed
- cups-filters
- ipp-usb
- printer-driver-*
- system-config-printer-*

*Added Snaps:*
- cups
- ipp-usb
- ps-printer-app
- ghostscript-printer-app
- hplip-printer-app
- gutenprint-printer-app

Note that the removal of the mentioned binary packages of CUPS does not eliminate the need of the source Debian package "cups", as we still need the CUPS library, libcups2, of it. Applications with print functionality installed classically, as Debian package, need this library. Here things get improved with CUPS 3.x, as here the CUPS library comes as separate upstream source.

To be able to remove system-config-printer, Sebastien has updated the gnome-control-center package, removing the patch which adds the button to start system-config-printer for advanced configuration. system-config-printer is not actively developed any more and therefore did not get updated to support the New Architecture.

Principally, it is planned that the Printer Applications are only downloaded and installed if actually needed, and not included by default. We are temporarily seeding them as the work on the needed functionality in GNOME Control Center is not yet completed. As soon as this is done, they will not get seeded any more.

I have also tested the `cups-control` interface whether it is working correctly with the different system configurations, especially if the classic CUPS installation is replaced by the Snap, both on classic Ubuntu and on [Ubuntu Core](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) (all-Snap immutable distro).

Here we already got a [bug report](https://forum.snapcraft.io/t/how-to-run-cups-commands-inside-a-snap/) of `cups-control` not getting correctly auto-connected on Ubuntu Core, which made me more intensely testing and discussing my observations on [this thread](https://forum.snapcraft.io/t/cups-control-interface-needs-to-work-with-cups-debs-cups-snap-and-on-ubuntu-core/). And we really needed a fix here, which James Henstridge fixed by this [pull request](https://github.com/snapcore/snapd/pull/12965). Now, if a Snap is installed from the Snap Store which has permission to auto-connect `cups-control`, gets it auto-connected to the system's `:cups-control` slot only if a classic CUPS is installed, identified by the presence of an `/etc/cups/cupsd.conf` file, otherwise it gets connected to the `cups:cups-control` slot of the CUPS Snap. This way we can have printer setup tools distributed as Snaps and they connect to CUPS as expected by the user.

**Next steps are:**

*CUPS migration script:*<BR>
Similar to how it got done for the introduction of the Firefox Snap in Ubuntu we will create a transitional Debian package providing a binary package with the name "cups-daemon" and a version number higher than the one of current CUPS. This way the package will replace the current cups-daemon package which actually contains the CUPS daemon on a update. It does not install any files but has a post-install script which installs the CUPS Snap, migrates the classic CUPS' configuration from `/etc/cups/` to the Snap (`/var/snap/cups/common/etc/cups/`), taking into account that we now need Printer Applications instead of classic drivers, so installing the needed Printer Application Snaps and migrating the print queues from CUPS into the Printer Applications. In the end the `/etc/cups/` directory gets deleted (or at least renamed), so that `cups-control` of client Snaps gets auto-connected correctly to the CUPS Snap.

*Add support for the New Architecture to GNOME Control Center:*<BR>
We need at least the essential parts from Mohit Verma, GSoC contributor on this part, before Feature Freeze mid-August. This is to make the "Add Printer" part working and to let the main view show visible grouping of the listed IPP services if they come from the same Printer Application or the same multi-function device. More detailed changes, like the [UI design worked out by Mohit together with Canonical's Elio Qoshi](https://github.com/vermamohit13/GSOC_2022_Summary/issues/1) Mohit will implement during his extended GSoC time until end-October.

*Add Common Print Dialog Backends (CPDB) support to all print dialogs:*<BR>
All print dialogs will be migrated from direct CUPS use to using the Common Print Dialog Backends. Once we replace "bad" CUPS access implementations which do not support temporary CUPS queues which CUPS creates for discovered IPP print services or directly access PPD files in `/etc/cups/ppd/`, and second, we pass the maintenance responsibility for the print dialogs to suppor the print technologies correctly from the GUI and app maintainers to the maintainers of the print technologies themselves, as they also should provide the backends. For CUPS this is OpenPrinting. But as long as we do not achieve this goal, we will keep cups-browsed in the distro to assure that the old dialogs keep working ...

*Install the Legacy Printer Application (legacy-printer-app) by default:*<BR>
With it installed, a classic CUPS driver, like a proprietary driver from a printer manufacturer, will get visible in this Printer Application and so printers can get set up with this driver. For actual seeding I will need to post a Main Inclusion Request (MIR), to get it into the Canonical-supported Main part of the Ubuntu distro.

**Rehearsal for the all-Snap desktop distro**

The switchover from classic Debian packages to Snaps for printing in Ubuntu 23.10 serves not only to prepare for Ubuntu 24.04 LTS and even more future Ubuntu versions which will use CUPS 3.x, but it is also a rehearsal for the all-Snap desktop.

As already told about on an [Ubuntu blog post](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) by Oliver Smith, product manager Desktop at Canonical, we are also working on an all-Snap desktop distro based on Ubuntu Core (there are already [first images of it for testing](https://www.omgubuntu.co.uk/2023/06/try-ubuntu-snap-desktop), but please, do not use for your daily driver).

This is also an immutable distro, but not as immutable as most others, because of the fact that its application package format, Snap, cannot only distribute desktop applications, but also [daemons and system components](https://events.canonical.com/event/2/contributions/42/). One good example of such Snaps is the CUPS Snap with is not just an application but a complete printing stack in one Snap. On most other immutable distribution, the printing stack, probably even the printer drivers, are in the immutable core, making it hard for printer manufacturers to add drvers.

So here we have, as usual, an immutable core (based on the current Ubuntu LTS, currently 22.04), but then not only immutable user applications but also immutable system components, like the CUPS Snap providing the printing stack and printer and scanner drivers in separate Printer/Scanner Application Snaps. By the way, even GPU drivers are available as modular components.

Note that printing in Ubuntu Core Desktop is only superficially tested, so do not bet on it already working currently ...

##Snappy scanning: simple-scan Snap is working now!

And as users of also want to be able to scan from snapped applications, especially also if we have an all-Snap distribution, we need to test this, too.

As a first Snap of a scanning application, there is the [Snap of Simple Scan](https://github.com/ubuntu/simple-scan). It was already there longer ago but probably never got well tested, as it turned out that it actually did not work, not being able to access scanners ([Pull request](https://github.com/ubuntu/simple-scan/pull/4)) and that it was not prepared forall types (eSCL and WSD) driverless scanners and Scanner Applications ([Issue](https://github.com/ubuntu/simple-scan/issues/2)). I have investigated the problem and [fixed it](https://github.com/ubuntu/simple-scan/pull/4#issuecomment-1641499245) and the fix is now included. Now we have tested it on driverless scanners (scanning part of driverless IPP multi-function printers) and it works. So we are ready for a consistent scanning experience in the Snap and Ubuntu Core Desktop world!
