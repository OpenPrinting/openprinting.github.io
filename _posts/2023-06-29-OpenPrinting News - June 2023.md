---
title: OpenPrinting News - June 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: GUADEC 2023 in Riga, Ubuntu Summit 2023 in Riga, GSoC 2023, CUPS 2.4.6, cups-filters 2.0rc2, Snap updates, Test the CUPS Snap!
---
Perhaps one or another of you remembers that in [last month's news](/OpenPrinting-News-May-2023/) I have announced that I want to switch Ubuntu 23.10 (Mantic Minotaur) from the CUPS packages in Debian format to the CUPS Snap as its printing environment and correspondingly to Printer Applications instead of classic CUPS printer drivers.

And this announcement had a high impact, opened a downright can of worms ...

First, as usual, I announced my news post on [Mastodon](https://ubuntu.social/@till/110426015365214287) and a few days later [OMG! Ubuntu picked up on this](https://www.omgubuntu.co.uk/2023/05/cups-snap-ubuntu-23-10). As usual, if something is written or told about Snap somewhere it tends to provoke a heated debate, the naysayer's voices usually the loudest, nearly masking the few telling about the advantages of Snap ... Near 200 comments!

After all this lively Snap discussion, a few days and subsequent blog posts later, Oliver Smith, product manager desktop at Canonical, issued a [great post on Canonical's Ubuntu Blog](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) about immutable Linux distros, a great explanation of how immutable Linux distributions work, the different already existing approaches Chrome OS, Fedora Silverblue/OSTree, and MicroOS/Btrfs, and Canonical's Ubuntu Core/Snap with the possibility to use also this one for a desktop operating system.

And from then on, immutable distros and distro-independent, immutable packaging was what everyone talks about: [Jorge Castro](https://www.ypsidanger.com/the-distribution-model-is-changing/), [Brodie Robertson on immutable distros](https://www.youtube.com/watch?v=t0_qvADqLsY), [on packaging](https://www.youtube.com/watch?v=ZJamU0yOdAw), ...

By the way, YouTuber Brodie Robertson did a [nice interview](https://www.youtube.com/watch?v=4KxHbDyAi-g) with former Canonical employee (and free software veteran as me) Alan Pope. Alan especially tells about how Snap started. But careful! It is 2 hours, like a full-sized movie ...

So Snaps get more and more important, and therefore I am also on it here at OpenPrinting. I have already switched [all our 6 Snaps](https://snapcraft.io/publisher/openprinting) to [core22 as base Snap](#snap-updates). So please help us and [test the CUPS Snap](#test-the-cups-snap)! We especially need to fix as many bugs as possible but also do some tuning with the interfaces, partially also on snapd.

Also, if our Snaps should get included in Linux distributions, independent of whether immutable or classic, we need a proper versioning and release management for all our Snaps. Heather Ellsworth, responsible for Snap packaging of several desktop applications for Ubuntu in Canonical's Desktop Team, has created scripting for automatic release of a new Snap build into the `--candidate` channel of the Snap Store always when the upstream repo gets a new tag (usually a release).

All files needed for that are available in a [GitHub repository](https://github.com/ubuntu/desktop-snaps) and Heather explains on Canonical's Ubuntu blog site [how to use them](https://ubuntu.com/blog/improving-snap-maintenance-with-automation).

We have also progress in many other OpenPrinting projects thanks to our Google Summer of Code contributors, they [tell us what they have done](#google-summer-of-code-2023) since our previous news post. 

And Canonical's security team liked my [GitHub security bug tutorial](/OpenPrinting-News-May-2023/#handling-reported-security-bugs-with-github) from last month. It made it into their [Ubuntu Security podcast](https://ubuntusecuritypodcast.org/episode-197/)! But note, the first, near 20 min of the podcast is a, for many people rather boring, list of all security fixes which got done in that week. The part about our tutorial starts at 19:33 min into the podcast.


## GUADEC 2023 in Riga
Only 4 weeks until [GUADEC](https://events.gnome.org/event/101/overview) in Riga, Latvia!

Now also the contributions from the second Call for Proposals for extra workshops and BoFs have been selected and my proposal of a GNOME/GTK Printing BoF has been accepted! It seems that they got an extra room in the venue for the workshops and BoFs on Saturday and Sunday. So there are 3 extra 2-hour sessions on Saturday and 2 extra 2-hour sessions on Sunday.

See the updated, final [schedules](https://events.gnome.org/event/101/timetable/#all).

**Please also keep an eye on Mastodon for updates: [#GUADEC2023](https://ubuntu.social/tags/GUADEC2023), [#GUADEC](https://ubuntu.social/tags/GUADEC)**

So I will be speaker/host of the following sessions:

**[The New Printing GUIs: GNOME Control Center and Common Print Dialog Backends](https://events.gnome.org/event/101/contributions/461/)**

Wed, July 26, 10:00 EEST, room 2

Right on the first day I will talk about the state of the art of the printing GUIs for the New Architecture, the "Printers" part of the GNOME Control Center and the Common Print Dialog Backends (CPDB) support in the print dialogs and will also demo the GUIs. I will also announce my BoF then.

**[Your app everywhere, just in a Snap! (Workshop)](https://events.gnome.org/event/101/contributions/460/)**

**Update: Sat, July 29, 14:15 EEST, room 1**

This GUADEC will get snappy! In this 2-hour interactive workshop you will learn how to snap (= package as a Snap) your favourite applications! You will snap a simple GNOME application on your own laptop and after that we (me and Jesús Soto) will also help you to snap your applications.

**Update: The workshop got moved to two hours later to not run in parallel with the only other workshop on the GUADEC, "[Discover GNOME development with Workbench](https://events.gnome.org/event/101/contributions/538/)" at 12:00 in room 2.**

**And if you want to attend, please prepare your laptop for the hands-on exercises, by installing the needed software or downloading our virtual machine image. Instructions are in the "Setup" section of the [slides](https://events.gnome.org/event/101/contributions/460/attachments/194/380/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf) and here is the [Ubuntu 23.04 virtual machine image](https://drive.google.com/file/d/1kkxZ8GE3_UtG7orl5v2d4x_T4FhMUcbb/view?usp=sharing) with everything needed already installed. Note that the `*.qcow2` image is 5.7GB large, so please download it as soon as possible and especially not during the workshop.**

**[GNOME/GTK Printing BoF](https://events.gnome.org/event/101/contributions/535/)**

Sun, July 30, 12:30 EEST, room 3

During my work on the New Architecture for printing and a recent discussion with GNOME developers and designers, I have 2 subjects I want to discuss in-person:

1. UI Design for the GNOME Control Center "Printers" module with support for the New Architecture
2. Separation of GTK printing API into its own project

Main participants of the discussion are me, Matthias Clasen, and Jakub Steiner. Anyone is invited to participate.

Remote participation is possible and I expect that Mohit Verma, GSoC contributor on the "Printers" module of G-C-C, and Gourav Guleria, GSoC contributor (2022) and mentor (2023) on CPDB support in print dialogs will connect.

**Canonical/Ubuntu Booth**

Wed-Fri

I will also be at the booth for some time and will be able to demo recent work on printing and scanning, and also help you preparing your laptop for the Snap workshop.


## Ubuntu Summit 2023 in Riga
Preparations for another great [Ubuntu Summit](https://events.canonical.com/event/31/) are running. Weekly organization team video meetings have started again and the [Call for Proposals](https://events.canonical.com/event/31/abstracts/) is open.

We got more than 70 submissions already! And we are still waiting for your amazing contribution to the conference. We have **extended the Call for Proposals**, so take your time to create something awesome. The **deadline is now on July 21, 20:59 UTC (23:59 in Riga)**.


## Google Summer of Code 2023
Our 6 contributors (plus 1 volunteer) are continuing on their projects and doing awesome work! All of them have posted a little summary in our OpenPrinting team channel on Telegram:

**OpenPrinting: CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Till Kamppeter, Gaurav Guleria, Shivam Mishra, Rithvik Patibandla, Ira McDonald

> Started progressing for adding cpdb support for chromium. Connected with chromium team for assistance in building chromium from source. Faced several challenges as chromium has a very large repository with a lot of dependencies. At last build is successful and print dialog is also working fine thanks to chromium dev team and my mentors. Next step is to use cpdb api for print backend and edit build config file so that ninja can build cpdb api. I am excited to be able to work with chromium dev team.

**Sand-Boxed Scanner Application Framework**<BR>
Contributor: Akarshan Kapoor<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Deepak Patankar, Ira McDonald

> After successfully implementing the regex parser, it was time to delve deeper into the architecture framework of client and server connections. The process began with the implementation of a file named "escl-ops.c," which was the first file that required a separate header file implementation. My mentor, Till Kamppeter, guided me in introducing a file-header system into the existing PAPPL architecture. Little did I know that this was just the beginning of a long implementation journey.
>
> The client-server architecture of PAPPL is primarily designed for printers, so I had to consider the requirements of scanners when processing these requests. I was able to develop a basic architecture for handling these requests and then proceeded to create a baseline for implementing scan job creation. These scan jobs needed to align with the MOPRIA scan documents and required a separate implementation that took into account various scan properties. 
>
> Currently, I am working on resolving the baseline implementation for these scan jobs. Once the baseline implementation of the scan job architecture is complete, we will be able to generate scan job tickets. This will pave the way, after the midterm, for scanner advertising and SANE implementation in PAPPL-retrofit.

**GNOME Control Center: List and handle IPP print services for the New Architecture**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Marek Kašík, Zdenek Dohnal, Rithvik Patibandla, Ira McDonald

> I am currently working on making the discovery of devices in G-C-C  asynchronous. Along with it, I am also working on sorting the device entries. I am currently trying to understand how to make these features possible by understanding the existing methodology of asynchronous discovery of devices. I am trying to get this done as soon as possible.

**Continuous Integration: Test Programs for libcupsfilters, libpappl-retrofit, libppd, CPDB, CPDB Libs**<BR>
Contributor: Pratyush Ranjan<BR>
Mentors: Till Kamppeter, Deepak Patankar, Zdenek Dohnal, Ira McDonald

> Test Suite for Libcupsfilters:
> Implemented tests for filter functions in libcupsfilter. The test program accepts the input in the form of printer properties, formats and options. Each test case also specifies the input and output MIME type of the file.
> The tester function then emulates an IPP printer with same properties and attempts to test it by calling `cfFilterUniversal()`. Tester than summarises all the tests based on the return value of the function call.
> The test cases are determined by the bug reports on various openprinting projects.

**Adding support for the new functionality of IPP Everywhere 2.x to libcupsfilters and CPDB**<BR>
Contributor: Gayatri Kapse<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Zdenek Dohnal, Ira McDonald

> During the analysis of the codebase, I identified a specific structure responsible for declaring the character set of a text file. In order to fulfill the requirements of printing a PDF document, I made an enhancement to this structure by introducing an enumeration that allows for the specification of various character sets beyond the existing utf8 variable. Additionally, further exploration revealed the presence of numerous attributes that necessitate inclusion. The focus is currently directed towards understanding the definition and utilization of these attributes, aiming to ensure their appropriate implementation within the project.

**Native Gutenprint Printer Application**<BR>
Contributor: Yuvraj Aseri<BR>
Mentors: Till Kamppeter, Solomon Peachy, Rishabh Maheshwari, Chandresh Soni, Ira McDonald

> After completing the printer application's basic structure and looking at the codebase of pappl-retrofit, I developed a plan for integrating libgutenprint into the application. I am composing some wrapper functions that will call and list all printers supported by gutenprint. I will test and compile the code as soon as this function is complete. If everything goes according to plan, I will add all other functionalities in a similar fashion. I will periodically compile and debug the code to avoid encountering problems in the future.

**Preset management web interface for PAPPL-based Printer Applications**<BR>
Volunteer contributor: Ankit Pal Singh

> I have successfully developed APIs that allow for the addition and updating of presets in the state file. Additionally, I have created a web interface that enables the creation, editing, and modification of presets.
>
> Currently, I am in the process of identifying the appropriate location to implement the necessary code that will ensure the client listeners receive the presets in the 'job-presets-supported' attribute.


## CUPS 2.4.6
Looong, looong ago ... we had the [release of CUPS 2.4.2](https://github.com/OpenPrinting/cups/releases/tag/v2.4.2), around one year ago now!

But finally, we have a new release. One? No, even 4 in quick sequence, as probably during the enthusiasm of releasing again, some glitches got overlooked and in addition, another security bug got reported.

So we are at [CUPS 2.4.6](https://github.com/OpenPrinting/cups/releases/tag/v2.4.6) now, providing us with tons of bug fixes and among them also two security fixes, and both handled with [GitHubs security vulnerability report functionality](/OpenPrinting-News-May-2023/#handling-reported-security-bugs-with-github).

Highlights of release [2.4.3](https://github.com/OpenPrinting/cups/releases/tag/v2.4.3) were my [pull request](https://github.com/OpenPrinting/cups/pull/599) for polling the `media-col-database` IPP attribute separately if needed when doing a `get-printer-attributes` IPP request to get the printer's capabilities, and the fix for security vulnerability [CVE-2023-32324](https://github.com/OpenPrinting/cups/security/advisories/GHSA-cxc6-w2g7-69p7), a possible heap buffer overflow in `_cups_strlcpy()`.

In addition, there is a year of bug fixes, especially identification of fax queues in the `get-printer-attributes` IPP response (Issue [#459](https://github.com/OpenPrinting/cups/issues/459)), not dropping media types from the PPD due to not having unique IPP names (Issue [#688](https://github.com/OpenPrinting/cups/pull/688)), and color printers not defaulting to color output (Issues [#451](https://github.com/OpenPrinting/cups/pull/451) and [#500](https://github.com/OpenPrinting/cups/pull/500)).

[2.4.4](https://github.com/OpenPrinting/cups/releases/tag/v2.4.4) and [2.4.5](https://github.com/OpenPrinting/cups/releases/tag/v2.4.5) fix regressions discovered soon after the 2.4.3 release, the former a chrasher bug introduced when fixing a bug of not being able to see a remote printer as default (Issue [#719](https://github.com/OpenPrinting/cups/issues/719) and the latter certificates downloaded from printers not being correctly saved and reloaded, making all jobs after the first job being denied (Pull request [#727](https://github.com/OpenPrinting/cups/pull/727), discovered during tests of the CUPS Snap by my colleagues).

And shortly after 2.4.5 the fix for security vulnerability [CVE-2023-34241](https://github.com/OpenPrinting/cups/security/advisories/GHSA-qjgh-5hcq-5f25), a use-after-free in the `cupsdAcceptClient()` function, got published, leading us to the third hotfix release, [2.4.6](https://github.com/OpenPrinting/cups/releases/tag/v2.4.6). And this one also fixes printing multiple files to IPP printers, which did not work on some printers [Issue #643](https://github.com/OpenPrinting/cups/issues/643).

Thanks, Zdenek Dohnal, for your excellent work as release manager for the CUPS 2.4.x series!

I hope we will be able to return to more healthy bug fix release intervals now.


## Approaching final release of cups-filters 2.0.0
Good News! All the bugs I mentioned here [last month](/OpenPrinting-News-May-2023/#approaching-final-release-of-cups-filters-200) are fixed now and appropriate Stable Release Updates (SRUs) are released to Ubuntu 23.04 Lunar Lobster.

Also a fix resulting from testing the [fully updated CUPS Snap](#snap-updates) are included, and the fix for [our first security vulnerability report](/cups-filters-Second-Generation-Release-Candidate-2/#first-vulnerability-report).

But I did not yet do the final release and did a [second release candidate](/cups-filters-Second-Generation-Release-Candidate-2/) first, as I have synced the libppd code with the PPD file support code of current CUPS. The PPD support code of CUPS got spun out for starting libppd three years ago and after that there happened many changes not being synced during all this time, and therefore there should be a little more time for testing.

Here are some highlights of the work on our [second release candidate](/cups-filters-Second-Generation-Release-Candidate-2/):

- [cups-browsed 100% CPU!](/cups-filters-Second-Generation-Release-Candidate-2/#cups-browsed-100-cpu)
- [The Unsupported Resolution Attack!!](/cups-filters-Second-Generation-Release-Candidate-2/#the-unsupported-resolution-attack)
- [All-Snap Ubuntu Desktop](/cups-filters-Second-Generation-Release-Candidate-2/#all-snap-ubuntu-desktop)
- [libppd sync-up with CUPS](/cups-filters-Second-Generation-Release-Candidate-2/#libppd-sync-up-with-cups)
- [First Vulnerability Report](/cups-filters-Second-Generation-Release-Candidate-2/#first-vulnerability-report)

If nothing severe happens, I will release cups-filters 2.0.0 final in a few weeks, so that perhaps we can celebrate it on the [GUADEC](#guadec-2023-in-riga) ...


## Snap updates
Ubuntu 23.10 with the CUPS Snap as its printing system approaching, everyone talking about immutable distros, not having given much love to our Snaps in the last months concentrating on landing cups-filters 2.0.0 ... Now we really need to look after our [6 Snaps](https://snapcraft.io/publisher/openprinting) again ...

First, I have **updated the upstream versions** of all the Snap's components:
- CUPS [2.4.6](#cups-246) (in Printer Applications from GIT Master)
- cups-filters (libcupsfilters, libppd, cups-filters, cups-browsed) [2.0rc2](#approaching-final-release-of-cups-filters-200) (from GIT Master)
- PAPPL 1.3.2 + Avahi registration fix (from GIT Master)
- pappl-retrofit 1.0b1 (from GIT Master)
- Ghostscript 10.01.1
- QPDF 11.4.0
- HPLIP 3.22.10
- foomatic-db 20230701 (from GIT Master)

I have also fixed several build failures, switched to the `cmake` plugin for QPDF, and added `source-depth: 1` for all parts taken from GIT repositories (loads faster, needed for automation scripting, thanks Heather Ellsworth!).

But most importantly, I have **migrated the Snaps from core20 to core22**, to get to the **newest core Snap** and so reduce the number of different core Snaps to install in a distribution, independent whether it is a classic one with some Snaps or an all-Snap immutable one. For this I simply needed to follow the instructions of the documentation for [general core Snap migration](https://snapcraft.io/docs/migrating-bases) and for [migration to core22](https://forum.snapcraft.io/t/micro-howto-migrate-from-core20-to-core22/).

Now you should read on in the next section to try it all out!


## Test the CUPS Snap!
**Update: I have investigated the behavior of the `cups-control` interface in different situations. Needs fixing in snapd for auto-connection if the CUPS Snap is used. See [this thread on snapcraft.io](https://forum.snapcraft.io/t/cups-control-interface-needs-to-work-with-cups-debs-cups-snap-and-on-ubuntu-core/).**

Nice shiny, newly updated Snaps! To get also nice, shiny, both classic and immutable distros with them, they need to get tested, so that in the end everything just works ...

Please follow the instructions below and if something goes wrong, please tell us. Best is to report an [issue for the CUPS Snap](https://github.com/OpenPrinting/cups-snap/issues). You can also use the [discussion facility](https://github.com/OpenPrinting/cups-snap/discussions) or alternatively discuss in the [snapcraft.io forums](https://forum.snapcraft.io/).

Some discussion with a Ubuntu Core (immutable distro) user we have already in [this snapcraft.io thread](https://forum.snapcraft.io/t/how-to-run-cups-commands-inside-a-snap/).

### Classic Ubuntu
So let us first look at classic distros, most importantly Ubuntu Desktop, as we plan to switch to the CUPS Snap as the print environment of Ubuntu 23.10 Mantic Minotaur.

You do not need to upgrade to the development branch for Mantic now and most probably run into other bugs and oddities. I recommend that you do the testing under Ubuntu 23.04 Lunar Lobster, especially if you want to test printing and printer management with desktop applications, you will need my [New Architecture PPA](https://launchpad.net/~till-kamppeter/+archive/ubuntu/new-arch-dev) which is currently only available for Lunar.

Having your Lunar machine ready, does not matter whether on real iron or on a virtual machine, you first need to switch from the Debian packages of CUPS to the CUPS Snap. We go the minimum-invasive way and avoid uninstalling packages, but instead we disable the daemons of the Debian packages via systemd. This way you can more easily return to you habitual configuration (by disabling the daemons of the Snaps and re-enabling the classically installed ones).

So first disable the printing-related daemons which are available as Snaps:
```
sudo systemctl stop cups-browsed
sudo systemctl disable cups-browsed
sudo systemctl stop cups
sudo systemctl disable cups
sudo systemctl stop ipp-usb
sudo systemctl disable ipp-usb
```

Now check whether the Snaps "cups" and "ipp-usb" are already installed:
```
snap list | grep cups
snap list | grep ipp-usb
```
Those which are not installed, install via
```
sudo snap install --edge cups
sudo snap install ipp-usb
```

If you have the CUPS Snap already installed, assure you have the very newest one by switching it to the `--edge` channel:
```
sudo snap refresh --edge cups
```

The CUPS Snap is running in the so-called "proxy" mode now, operating as firewall for the classically installed CUPS. This is triggered by the presence of an `/etc/cups/cupsd.conf` file, not by a running CUPS, to avoid race conditions during boot. But do not delete your `/etc/cups/cupsd.conf` to make the CUPS Snap running in its "standalone" mode. Instead, force the Snap to not go into "proxy" mode via
```
sudo touch /var/snap/cups/common/no-proxy
```

Now restart the CUPS Snap to switch the mode:
```
sudo snap stop cups
sudo snap start cups
```

Check whether it has actually switched. Run
```
lpstat -v
```
and see whether the printer URIs (last word in each line) **DO NOT** start with `proxy:`. If there is no output (but also no error) it is also OK.

If you already have a driverless IPP printer (supporting at least one of the following: AirPrint, Mopria, IPP Everywhere, Wi-Fi Direct Print), `lpstat -v` should contain at least one line, with an URI starting with `implicitclass:`. It does not matter whether your printer is connected via Ethernet cable, Wi-Fi, or USB.

If your printer is not driverless, which is usually the case only for printers which are several years old, you need a driver. But note that the ones already installed on your system (`dpkg -l | grep printer-driver-`) are not supported by the CUPS Snap.

The new format for printer drivers are Printer Applications. Depending on the type of your printer install the needed one:

**PostScript printers**
```
sudo snap install ps-printer-app
```

**HP printers (at least most of them)**
```
sudo snap install hplip-printer-app
```

**Epson or Canon inkjets, dye-sublimation printers of any manufacturer**
```
sudo snap install gutenprint-printer-app
```

**Label printers**
```
sudo snap install lprint
```

**None of the above works, especially if your printer is VERY old, also PDF and PCL printers from RICOH and OEM**
```
sudo snap install ghostscript-printer-app
```

**Activating classically installed drivers**<BR>
Only **if none of the above-mentioned Printer Applications makes your printer working**, especially if you have a **proprietary** printer driver installed, install the Legacy Printer Application which makes the classic CUPS drivers available to the CUPS Snap:
```
sudo apt install legacy-printer-app
```
Note that this package is in Universe, so you need to have the Universe package repository activated.

Now open the web interface of the Printer Application, via [http://localhost:8000/](http://localhost:8000/), if you were in doubt which is the right Printer Application or you have more than one non-driverless printer, you have perhaps installed more than one Printer Applicatio now. Open the web interface of the other ones via [http://localhost:8001/](http://localhost:8001/) and so forth. On the upper left you see in which Printer Application you currently are.

Add your printer via the "Add Printer" button at the upper right, the next screen will take some time to show completely, because it is searched for supported printers. Your printer should get discovered and shown under the discovered devices. Select it. You can usually keep the choice of the printer model on automatic.

Once done and back on the main page you can get to a printer settings/jobs page for each printer you have set up, or directly use the buttons in the printer entries on the main page.

Under "Device Settings" you can configure installable accessories (usually only on PostScript printers). On some printers you can poll this information right from the printer via the appropriate button. It is important to configure this correctly, so that you can choose and configure any added tray on the "Media" page and use other accessories, like finishers, via the settings on the "Printing Defaults" page. Set loaded paper sizes and types via "Media" and desired default settings via "Printing Defaults", A4/Letter should already be set automatically. Print a test page.

**DO NOT** try to create print queues directly with CUPS the "classic" way (`lpadmin`, `system-config-printer`, `http://localhost:631/`, ...). This will not work!

Now `lpstat -v` should show a line for your printer.

The third word of each line, after the `device for` and before the colon (`:`) is the print queue name. This name you use to select a printer when using a command line tool of CUPS.

Run
```
lpoptions -p QUEUE -l
```
replacing `QUEUE` by the desired print queue name. The output shows you the user-settable options, to select paper sizes, trays, finishers, print quality, ... The first word (up to the slash (`/`), but without the slash) of each entry is the option name and the words after the colon are the possible choice names.

Print a file via
```
lp -d QUEUE FILE
```
`FILE` is the name of a PDF file or an image file.

Print with custom option settings via
```
lp -d QUEUE -o OPTION1=VALUE1 -o OPTION2=VALUE2 FILE
```
You can supply any number of options.

Run
```
lpstat
```
to see which jobs are currently in the queue.

Now you have done basic tests of the CUPS Snap, you can try all of CUPS' command line utilities. If you want to try the utilities which are provided by the Snap, call them via `cups.` followed by the command name, like `cups.lpstat -v`. Use these command line utilities also if the "normal" ones fail in some way.

Next step is the desktop. Follow my first call for testing, for the desktop libraries and applications which are already updated for the New Architecture, from my PPA. Simply go to [my call for testing for the GUI changes in the May News](/OpenPrinting-News-May-2023/#test-the-gui-changes-for-the-new-architecture) and follow the instructions there, but do it on your system where you are using the CUPS Snap instead of the standard Debian/Ubuntu CUPS packages.

### Ubuntu Core (immutable)
Another test case is [Ubuntu Core](https://ubuntu.com/core), an immutable distribution for IoT and servers. This one is Snap-only. Any change or application installation can only be done by means of Snaps.

As the immutable core does not contain CUPS or any other parts of the printing stack, you have to install the CUPS Snap, and the Snaps of ipp-usb and also of any needed Printer Application, as shown above for classic Ubuntu, but you do not need to stop or disable any already existing daemons for it. You also do not need to create a `no-proxy` file to stop the CUPS Snap from going into "proxy" mode.

But what you also have to do is to **install the "avahi" Snap in addition**. The CUPS Snap needs the Avahi daemon to be able to discover IPP printers.

With that done you can test the command line tools as shown above for classic Ubuntu (call them with `cups.`, like `cups.lpstat -v`), but **not** any desktop experience, mainly due to not having a desktop, but also you cannot install the Debian packages from my New Architecture PPA into the immutable, Snap-only distro.

Also due to the fact that Core is Snap-only you will not be able to install classic CUPS drivers and import them with the Legacy Printer Application.

By the way, Ubuntu Core, with only the "avahi" Snap and one or more Printer Application Snaps installed (no CUPS) could also be used as a print server/adapter to turn old printers (everything which works under Linux) into a modern IPP printer which can be used from any operating system, especially also smartphones and Windows and Mac systems for which appropriate printer drivers are not available any more. On some hardware (Raspberry Pi?) the adapter can even be connected to a computer via its USB power port (Micro-USB or USB-C) and the computer sees an IPP-over-USB printer (PAPPL's gadget mode). Also tests of such setups are highly appreciated.
