---
title: OpenPrinting - Our principal achievements
permalink: /achievements/
layout: splash
header:
 overlay_color: "#616161"
 overlay_filter: "1"
author: Till
excerpt: What we have done so far
---

In the 21 years from the [beginning of OpenPrinting](/history/) up to now we have changed a lot of things to improve the user experience with printing on free software and Posix-style operating systems (like Linux).

I have worked on this full-time since mid-2000, first at MandrakeSoft in Paris, from mid-2006 on I got paid by the Free Standards Group and from 2007 on by the Linux Foundation, for leading the OpenPrinting project, and in addition part-time by [Canonical](https://canonical.com/) for maintaining the printing part of Ubuntu. And from Feb 2012 on I got full-time employee of Canonical, to continue leading the OpenPrinting project.

So thanks to MandrakeSoft/Mandriva, the Linux Foundation, and Canonical to make this project possible and successful!


## All free drivers to be used with CUPS
My first task back in 2000 at MandrakeSoft was to switch over Mandrake Linux from LPD ro CUPS, and this was not only making the first RPM packages of CUPS, but also to make sure that for the users of the first ever Linux distribution which uses CUPS as printing system all hardware (printers) which was supported in the previous distro version (using LPD) is still supported. THis meant especially that I need PPD files and CUPS filters (wrappers) for **all** drivers, and there were already many in the free software printing stone age ...

Printer drivers were not such a well-defined thing as current CUPS drivers consisting of filters and PPD files or even Printer Applications are. They somehow turned a standard input format (usually PostScript or some bitmap format which Ghostscript was able to generate) into what the printer needs, but this was all what made a software be a printer driver. Drivers could be some output device compiled into Ghostscript, or some tiny, simple filter executable which turns Ghostscript's output into at least one of the input data formats of the printer, or one had Ghostscript Uniprint files to use the first data-driven Ghostscript driver, ... But anything machine-readable which tells how to use the driver and which user-settable options are there was usually not included. Here third-party projects like Magic Filters or apsfilter came into play ...

Fortunately, there was a site named linuxprinting.org which tried exactly this. Exactly it was a database of printer models and of free software drivers, telling which printers work with free software (and therefore is not a "Paperweight") and if so, with which driver. But the very special thing of the site was that it did some automated, systematic integration of printer drivers with printing systems, and there were several printing systems: LPD, LPRng, PDQ, and ... CUPS! So this system provided a universal wrapper CUPS filter for printer drivers, named `cups-o-matic` plus a generator for PPD files which uses the printer and driver properties (page sizes, color modes, trays, other user-settable options, driver command lines, ...) stored in the database to generate a PPD for each valid printer/driver pair.

The problem was that the database was not completely populated, many drivers were missing the information on how to execute them (command line, options, ...).  So I asked the site's author to complete the missing info and as he did not have the time to enter this detaiiled information, he gave me full write access and I could complete the database by myself, solving the driver integration problem.

So now I had PPD files and the universal `cups-o-matic` filter for all drivers and so the printer drivers made it into the age of CUPS. So the second generation of printing with free software could start.

Later on, with Grant not having time for his project any more and me coming up with more and more feature requests he passed the project over to me in mid-2001 and so I got the leader of linuxprinting.org, also known as Foomatic.


## Getting all Linux distributions to use CUPS
Now, with one distribution, Mandrake Linux, using CUPS as its standard printing system, me, together with Kurt Pfeifle, continued marketing CUPS on conferences and especially by organizing a community booth about printing every year on the LinuxTag, in that time the largest free software show in Europe, from 2001 on until 2006.

This, and probably also the good user experience with printing in Mandrake Linux, also convinced the other distributions, Red Hat, SUSE, Debian, ... to switch over to CUPS, using my Foomatic work.

CUPS got the new standard for printing on all Posix-style operating systems! Even Mac OS had adopted CUPS in 2002 (where I do not know whether my work had also influence on Apple. Have I perhaps promoted Michael Sweet to make it into Apple?)!


## PDF instead of PostScript as standard print job format
Decades ago, when it began with the POSIX-style operating systems, there were commercial Unix systems, usually used in data centers at universities or larger companies. Printers were either line printers which printed plain text or PostScript laser printers as only option for text-and-graphics printing. So applications sent jobs in plain text or PostScript and PostScript turned to be the standard print job format for graphical printing.

Later on, and especially with the introduction of Linux for PCs, there was also need for printing on consumer-grade, usually non-PostScript printers. Here Ghostscript came into place to render the PostScript coming in from applications and either generate the printer's format with a built-in driver or a generic bitmap format for an external driver.

This principally works but is not the best solution. PostScript is a format from 1984 and does not support important elements of modern document creation, like transparency. It is also a Turing-complete programming language which opens possibilities for abuse. Also for publishing printable documents on the internet PDF, Adobe's successor of PostScript was already used. And PDF is still developed on by Adobe.

So Michael Sweet and me, we decided on making the standard print job format to be PDF and I announced this decision on the first OpenPrinting Summit which I organized, 2006 in Atlanta.

Principally, PDF as standard print job format means that applications send jobs in PDF and non-PDF input is converted to PDF by CUPS, then page management (N-up, output order, selected pages, ...) is done in PDF, and after that the PDF is converted to the final format needed by the printer.

To implement this we needed several new CUPS filters for the PDF-based print workflow, imagine, as a first approach, to replace all `pstoXXX` filters by `pdftoXXX`. Also the central `pstops` filter had to be replaced by a `pdftopdf` filter. Fortunately, Ghostscript accepts also PDF and not only PostScript as input, so that all printer drivers involving Ghostscript could be continued to be used.

Also CUPS itself did not need any change as its excellent filter system, completely controlled by MIME types and MIME conversion rules and the filters themselves being separate executables, one only needed to add the new filters and to change the conversion rules.

For coding the filters I have found volunteers in the community and at some member companies of the PWG. Later on, when we started participating in the Google Summer of Code in 2008, we ran also some filter implementation projects there.

GUI and application projects have practically all switched to send print jobs as PDF.

As I am maintainer of the CUPS package in Ubuntu I had switched it to the PDF-based print workflow as soon as I had all filters together, not yet having an organized upstream home for these filters, neither an extra upstream project nor imclusion in CUPS. I simply added a [filter source package](https://www.openprinting.org/download/printing/pdf-printing/) to the CUPS package of Ubuntu.

Only when I introduced [cups-filters](#cups-filters) in the end of 2011 I was able to switch the official CUPS filters (which were cups-filters then) to the PDF-based printing workflow and so all distributions got switched over.


## Common Print Dialog
This is the only project on which we failed (but others succeeded, see below). On the first OpenPrinting Summit in 2006, at Lanier (now Ricoh) in Atlanta, Georgia we had a group of GUI/Usability experts to brain-storm about a better print dialog design and we had them even meeting again on (further Summits](https://wiki.linuxfoundation.org/openprinting/summitlexington) continuing in breakout sessions.

The result was not only new approaches in the GUI design of the print dialog, but also the idea of having one and the same print dialog for all applications, independent which toolkit they use.

For this the print dialog should be a part of the desktop environment (GNOME, KDE, ...) and available for the applications as a D-Bus service. The applications will then shout into the D-Bus instead of opening their own print dialog, ending up with always having the GTK dialog when using GNOME and always having the Qt dialog when using KDE. So the user will see only one type of print dialog in their desktop environment, independent which applications they are using.

The actual coding started in 2008, when we (the Linux Foundation, not only OpenPrinting) were for the first time mentoring in the Google Summer of Code. Lars Karlitski (Lars Übernickel in that time) has created the D-Bus interface and also coded on the GTK dialog while another student coded on the Qt dialog. The D-Bus interface got completed and working, but the dialog GUIs got far from complete. Also students in the 2009 GSoC (where Lars was mentoring) did not complete the dialogs.

Also Lars, Peter Sikking (one of the GUI experts on the Summits, running a GUI/usability design firm), and me regularly met in-person (very rare in the free software world) in Berlin (Peter and me lived there, Lars 2 hours driving away from Berlin) to work on the GUI design of the dialog.

As we did not succeed to complete the coding of the complex design of the dialog we tried to get funding for paid developers completing it. The German government organization Bundesamt für Sicherheit in der Informationstechnik (BSI, Federal Authority for IT Security) wanted to give a part as they were switching around 200 work places from Windows to Linux and wanted an easy printing experience for their users. Later on we also got Canonical into the boat. They hired Lars full-time for this task, but as soon as he was hired I told this to the people from the BSI but then they did not answer my e-mails any more and so we considered the project failed.

It was no problem for Canonical having hired Lars and our project being discontinued. There was enough GTK/GNOME work for Lars to do, and after some years he switched to Red Hat. So I have got him into a nice career.

In my opinion our failure was trying to create the perfect GUI for the dialog. If we had simply used the D-Bus interface and the original print dialogs of GTK and Qt we had probably succeeded ...

But, many years later, I have seen this idea being actually implemented. But it is not clear whether it got picked up from my presentations of the idea of the Common Print Dialog on conferences or whether it was created independently.

The implementation happened to be in the [Flatpak](https://flatpak.org/) system for distribution-independent packaging of desktop applications (in contrary to [Snap](https://snapcraft.io/) only desktop applications, no command line utilities, system daemons, system components, or core systems). Flatpak comes from [freedesktop.org](https://www.freedesktop.org/wiki/), and is popular in the RedHat-ish world.

Flatpaked desktop applications communicate with the host system/the outside world through so-called [Portals](https://github.com/flatpak/xdg-desktop-portal), so for printing they use the [Printing Portal](https://docs.flatpak.org/en/latest/portal-api-reference.html#gdbus-org.freedesktop.portal.Print).

In contrary to Snap's interfaces the Portal is not an AppArmor permission to access a certain part of the host system (or another Snap) or a mount of certain parts of the host's (or another Snap's) file system, but instead, it is a D-Bus API which provides **common GUI dialogs** for common tasks (choose file, save file, **print**, ...), where the dialog comes from the desktop environment (GNOME or KDE) and so is the one of the desktop environment, a *common* dialog and is de-coupled from the user application via the D-Bus interface. So when using the GNOME desktop and printing from a flatpaked KDE app we should see GNOME's print dialog.

See more details in my "[Flatpak and Printing](https://openprinting.github.io/OpenPrinting-News-March-2022/#flatpak-and-printing)" article.


## Grand Unified Ghostscript: CUPS support, third-party built-in drivers ...
When Michael Sweet created printer drivers (ESP Print) and finally CUPS during the 90s of the previous century, he included a modified version of Ghostscript as PostScript interpreter to print incoming PostScript jobs from applications on non-PostScript printers. Main modification was most probably adding the output of the device-independent CUPS Raster format or a predecessor of it. Later on, when CUPS was released as free software, the modified Ghostscript was also made available as free software, named ESP Ghostscript.

This Ghostscript got the Ghostscript of the Linux distributions when they adopted the CUPS printing system. Michael Sweet and me, we continued its development. Especially I added all the third-party Ghostscript drivers which the distributions had to add to GPL Ghostscript as patches on their own, making Ghostscript in distributions always one of the packages with the most patches.

ESP Ghostscript also got an improved, easier to control build system based on autoconf and I added a patch from Mandrake which made the X11 output device dynamically loadable, so that the same binary executable of Ghostscript can be used in both desktop and headless server systems.

In May 2006, the Ghostscript developers announced that from version 8.54 on they will merge the former commercial, leading-edge (AFPL) and the free GPL development branch, which was only based on the previous major rlease, and so doing the leading-edge developemnt as free software, usable by the Linux distributions.

> [**Ghostscript leading edge is now GPL!**](https://web.archive.org/web/20161003082642/http://ghostscript.com/News.html)
> Posted 7 Jun 2006 by raph
>
> I have some great news to report. The leading edge of Ghostscript development is now under GPL license, as is the latest release, Ghostscript 8.54.
>
> By switching to the GPL, we're reaffirming our commitment to the free software world. One big reason for this decision was to reduce the lead time between bugs being fixed in the development tree and users seeing the fixes, especially those users dependent on Linux distributions.
>
> Moving forward, we'd also like to resolve the effective fork with "ESP Ghostscript," so that our development tree is suitable directly for use in Linux distributions without a lot of extra patches. It would be very nice if all the GPL patches could be incorporated into the main tree without any license restrictions (which means that we need copyright assignment), but realistically, we'll still have to implement an apartheid system of some kind, so that a GPL-only subdirectory exists that gets deleted out of our commercial releases.

Linux distributions continued using ESP Ghostscript though, due to the CUPS Raster output device and the complete set of built-in printer drivers.

As the upstream Ghostscript development is under GPL now, Michael Sweet decided to discontinue the separate ESP Ghostscript development and merge ESP Ghostscript into GPL Ghostscript.

In April 2007 I started the merger moving all the extra features of ESP Ghostscript into GPL Ghostscript, making up the Grand Unified Ghostscript, which was released as version 8.60 in August 2007. It was really a large surgery on GPL Ghostscript but worked out smoothly with the great collaboration of Ghostscript's upstream developers of that time (esp. Ralph Giles, Raph Levien, Ray Johnston), Michael Sweet, distribution package maintainers Werner Fink (SUSE) and Bernhard Rosenkränzer (Ark Linux), for testing all the changes, adapting patches to GPL Ghostscript, upstreamizing distribution patches ...

In the [CUPS Blog](http://www.cups.org/blog.html) I posted:

> **The Grand Unified Ghostscript Officially Released: GPL Ghostscript 8.60**
>
> Now the merger between ESP Ghostscript and GPL (upstream) Ghostscript is done and available in an official, stable release. Artifex has released GPL Ghostscript 8.60, which is is now the Ghostscript recommended for use in Linux distributions. Now the latest and greatest Ghostscript will make it into the distros.
>
>This new version contains especially the CUPS raster output device, IJS and OpenPrinting Vector interfaces for driver plug-ins, all built-in printer drivers listed in the OpenPrinting database, X display drivers in a separate shared library, and many more improvements and bug fixes.

From then on, all distributions switched to GPL Ghostscript ([Ubuntu Gutsy Gibbon, 7.10](https://tracker.debian.org/media/packages/g/ghostscript/changelog-9.06dfsg-2deb8u7) and the patch hell in the distribution packaging had an end.


## cups-filters
In February 2007, Apple acquired ownership of the CUPS source code and hired Michael Sweet, for continuing CUPS developemnt as free software (GPL2/LGPL2 licensing terms), and for using CUPS as the printing system of Mac OS.

As Apple uses their own, proprietary filter suite (note that one can easily replace the filters in CUPS, see "[PDF instead of PostScript as standard print job format](#pdf-instead-of-postscript-as-standard-print-job-format)" section above) and not the free software filters which originally came with CUPS, they dropped the further development of most of these filters, removed them from the CUPS source code repository, and passed them over to OpenPrinting. This happened with the CUPS 1.6.0 release in July 2012.

As the actual pass-over happened somewhat earlier, I created the cups-filters project starting from the filters and backends which Apple had abandoned end of 2011.

Right away, even before I did the very first release of cups-filters, I pulled the plunge for the [PDF-based printing workflow](#pdf-instead-of-postscript-as-standard-print-job-format) everywhere, adding the PDF-related filters which we developed already since 2006 and tested already for several years in Ubuntu. This way, right away when distributions had to include cups-filters when they updated CUPS to a version 1.6.x, they automatically got switched to the PDF-based print workflow. This did not cause any complaints and most applications probably had already switched over that time.

During the following 11 years up to now the filters were continuously maintained and developed.

Especially we are preparing cups-filters for the New Architecture of printing, meaning that we do not have PPD files any more and classic printer drivers are replaced by Printer Applications (emulators of IPP printers):
- **Driverless printing support:** Output formats for driverless printing got included:PDF, PWG Raster, Apple Raster, PCLm)
- **Filter functions:** Filter executables turned into filter functions, library functions with standardized call theme, also for easy chaining. This rerduces external function calls and also makes it easier to use the filters from Printer Applications (Software-emulated IPP printers to replace printer drivers). They also do not use environment variables and log into a log function, to make them also easy to use in non-CUPS environments.
- **Use without PPD files:** As use of PPD files will end with CUPS 3.x and already the CUPS Snap does not support adding PPD files for new printer drivers any more, the filter functions can now also be used with IPP attributes instead of with PPD files.

These changes will soon appear in the second generation of cups-filters, version 2.x.


## cups-browsed
CUPS 1.6.x did not only drop the free software filters but also switched from its own broadcasting/browsing to easily share queues to remote systems using CUPS to the standard DNS-SD method.

This way CUPS is especially a complete emulation of a driverless IPP printer, advertising itself via DNS-SD, speaking IPP 2.x, and understanding standard data formats like PDF, and in addition, we have less clutter by different network communication protocols being used.

What we lost by this is that CUPS clients do not auto-create a queue to a printer shared by a CUPS server any more. The user can find the DNS-SD self-advertising remote CUPS queues but there are no local queues automatically set up any more which point to these remote printers. So the user cannot "just print" on a remote CUPS printer any more, without manually setting up a local queue first.

Ubuntu 12.10 shipped CUPS 1.6.x for the first time. Filters were there, even for PDF-based printing but the automatic setup of client queues pointing to remote CUPS printers was missing. As there was not much time for creating something new before Feature Freeze I simply patched the broadcasting/browsing functionality of CUPS 1.5.x into Ubuntu's CUPS 1.6.x but clearly expressed that this is an interim solution for only this Ubuntu release and something better will come with the next Ubuntu release, 13.04.

And I found the "something better". In the end of 2012 I created an auxiliary daemon which gets triggered by the DNS-SD advertising of the remote CUPS queues and this way automatically creates the client queues, it even removes the local queue again when the shared printer disappears (for example when one leaves the network). So this is very close to what are the temporary queues in modern CUPS.

I named this daemon "cups-browsed" and added it to the cups-filters project. And with this the user experience in the distributions did not change with the transition from CUPS 1.5.x and 1.6.x

With the time, cups-browsed got a lot of new features, advancing to be a universal auxliary daemon for CUPS, especially former Red Hat printing maintainer added functionality that cups-browsed does (when activated by configuration file) the classic CUPS broadcasting/browsing as there are still many long-term-supported enterprise distributions, both servers and desktops around and they often still have CUPS 1.5.x or older.

Also a clustering facility, much more sophisticated than CUPS' implicit classes (which also disappeared with 1.6.x) got added, highly configurable for manual and automatic clustering, different fail-over and load-balancing schemes, and even clusters of completely different printers (laser, photo inkjet) and by the job and its option settings cups-browsed determines which is the most suitable printer.

But most importantly, unfortunately, cups-browsed turned a stop-gap for overcome the fact that print dialogs do not support the temporary queues which got introduced in CUPS some years ago.

Temporary queues are CUPS' replacement for the missing auto-creation of client queues pointing to remote printers. A client can discover a remote printer via DNS-SD and then send a job to the local CUPS as CUPS had a queeu pointing to this printer. Then CUPS auto-creates the queue, prints the job, and when the queue stays idle for a minute afterwards, removes the queue again.

Print dialogs did not switch to the new print destinations API of libcups and so did not discover such printers. So I have added a configuration option to cups-browsed to check whether a discovered remote printer would print on via the local CUPS through a temporary queue and in this case create a permanent queue pointing to this printer, in a way that CUPS considers the creation of a temporary queue unneeded.

Once this done I had to keep cups-browsed in the standard desktop installation of Ubuntu up to today, as not all print dialogs support temporary queues yet. I hope I will be able to remove cups-browsed from Ubuntu soon.


## Common Print Dialog Backends
Some years after having failed with the [Common Print Dialog](#common-print-dialog) Aveek Basu suggested to revive the project, but I was unsure about that. And when I was fixing a CUPS-related bug in the GTK print dialog I discovered that it uses backends for different print technologies. This brought up a new idea in me to improve the print dialogs.

It was back in 2017, CUPS already having the concept of the temporary queues, auto-created by CUPS when a client prints on a DNS-SD-discovered IPP printer through the local CUPS and the local CUPS does not need to have a queue set up for this printer.

For a client to know for which printers it can simply send jobs to the local CUPS, it needed a special, newly introduced API of libcups, but in print dialogs the switchover to the new API was missed out for many years, making the dialogs only displaying the permanent, usually manually set up, print queues

Also, now with the introduction of the new Architecture of printing, going all-IPP and not using PPD files any more, print dialogs would need another update to not try to load the PPD file from CUPS (or even directly from the file system) to obtain the printer capabilities and options, but instead, use CUPS APIs of libcups, which internally use CUPS's current methods to get the needed information about the printer.

The delays in GUI toolkit (GTK, Qt) and desktop application projects to update their print dialogs to new technologies, caused by missing volunteers for maintaining the print dialogs and also long release cycles, led us to the idea to move the responsibility on the communication with the print technology away from GUIs and applications and towards the maintainers of the print technology itself (OPenPrinting in case of CUPS).

For this we separated the communication with the actual print technology (CUPS, print-to-file, cloud printing services, ...) out of the print dialog GUIs and applications by using a D-Bus interface. So the communication with the print technology happens in a backend module which provides a standardized D-Bus service, providing methods for listing available printers, listing options an choices for a given printer, printing a job on a given printer, ... The print dialogs get frontends which call these D-Bus methods. There is one backend per print technology (CUPS, print-to-file, cloud printing services, ...) and a print dialog is supposed to shout into the D-Bus and get a list of available printers for each of 

This we call the "Common Print Dialog Backands" and the project started back in the Google Summer of Code 2017. Here is the [final report of Nilajana Lodh](https://nilanjanalodh.github.io/common-print-dialog-gsoc17/) who worked on [cpdb-libs](https://github.com/OpenPrinting/cpdb-libs), the central libraries with the D-Bus interface.

The D-Bus interface was actually working a support for it in LibreOffice was implemented in the same Google Summer of Code but we did not get it into the GTK and Qt print dialogs yet. In this year's (2022) Google Summer of Code we have another contributor working on it and his work is promising.


## CUPS upstream home is OpenPrinting now
End of 2019 Michael Sweet left Apple to start [Lakeside Robotics](https://www.lakesiderobotics.ca/). After that any further developemnt of CUPS at Apple stopped. In 2020 there were only a few commits on [Apple's CUPS GitHub](https://github.com/apple/cups) to fix one urgent security bug. Bug reports stayed untouched and accumulated.

In September 2020 Michael teamed up with us to [fork](https://github.com/OpenPrinting/cups) Apple CUPS to fix bugs, incorporate distribution patches, and continue its development. In the beginning it was meant to be temporary, until Apple resumes to develop CUPS.

As Apple did not resume the upstream work on CUPS in the following months, we have made OpenPrinting now the official upstream home for CUPS. We now continue developing CUPS, independent of Apple. So we can add features and lead CUPS into the New Architecture without PPD files and with Printer Applications.

CUPS has a [new home page](https://openprinting.github.io/cups/) now and what was formerly our fork is now the [official CUPS repository](https://github.com/OpenPrinting/cups/). We started releasing the 2.4.x series end-2021, now without "opX" suffix of forked CUPS versions. Also all documentation files which come with it are updated to point to the OpenPrinting resources. Mailing list for development discussions is our [printing-architecture](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) list.

So today Apple CUPS is the version of CUPS that is provided with macOS® and iOS® while OpenPrinting CUPS is the version of CUPS being further developed by OpenPrinting for all operating systems.

This way we could extablish a [roadmap](https://openprinting.github.io/OpenPrinting-News-October-2021/#cups) for upcoming CUPS releases, especially in the end of 2023 releasing CUPS 3.x with the NEW Architecture of handling printers IPP-only without PPDs and classic drivers. Michael has presented development plans on [Linux Plumbers 2021](https://openprinting.github.io/OpenPrinting-News-October-2021/#openprinting-micro-conference-on-the-linux-plumbers-2021) and the [OpenPrinting Summt/PWG Meeting 2022](https://openprinting.github.io/OpenPrinting-News-June-2022/).


## The CUPS Snap
In October 2017 I started [snapping (= packaging as a Snap) CUPS](https://github.com/OpenPrinting/cups-snap).

[Canonical](https://canonical.com/) started [Snap](https://snapcraft.io/) in that time to have a sandboxed, Linux-distribution-independent packaging system to make distribution of software for Linux as easy as distribution of apps on smartphones. Users of any distribution with snapd installed (and snapd one can easily install on all systemd-based Linuxes) can find application software packages in the [Snap Store](https://snapcraft.io/store) and install it right away. No need to have packages for exactly that release of the Linux distribution one is using, and finally also software released after the distribution one is using is available.

Snap has also a rigorous security system, encapsulating the application's file systems against each other and only allowing controlled communication between different Snaps and also beteween Snaps and the host system via well-defined interfaces. And the Snap Store team has to give explicit permission for automatic connection of interfaces which could be dangerous in some form. So one can easily and safely install third-party software and is not restricted to what one's distribution has packaged for the release in use.

My work on the CUPS Snap got motivated by Canonical's plans of creating an all-Snap Linux distribution, not using Debian packages at all any more. So everything, including the printing system (and also the printer drivers) had to be in Snaps.

Fortunately, Snap was so well-designed that it allows also packaging command line tools and even system daemons ([Flatpak](https://flatpak.org/) for example only packages GUI applications, see [my blog post](https://openprinting.github.io/OpenPrinting-News-March-2022/#flatpak-and-printing)) and so I could snap right away.

But there were a lot of challenges in these 5 years until the CUPS Snap got into production use for the first time:
- [How to add printer drivers](https://forum.snapcraft.io/t/snapping-cups-drivers-as-plugins) (note that Michael Sweet brought in the solution with the Printer Applications only on the [OpenPrinting Summit 2018](https://pwg.org/chair/meeting-info/may-2018-sunnyvale.html), [slides](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-18.pdf))
- [Providing the "cups-control" interface by the CUPS Snap](https://forum.snapcraft.io/t/snapping-cups-printing-stack-providing-cups-control-interface)
- [Including D-Bus in "cups-control"](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/)
- [First idea of a "cups" interface for only printing, not managing CUPS](https://forum.snapcraft.io/t/developer-sprint-sep-17th-2018/7336/10?u=till.kamppeter)
- [System users and groups](https://forum.snapcraft.io/t/snapping-cups-printing-stack-avahi-support-system-users-groups/)

See the [`README.md` of the CUPS Snap](https://github.com/OpenPrinting/cups-snap#discussion-and-links) for more links.

Once everything working the biggest challenge was the "cups" interface through which application Snaps can safely print but canmnot mess up the system's CUPS, independent whether classically installed or the CUPS Snap.

Note that the "cups-control" interface which was there from the beginning allows full access to the system's CUPS and so was considered "dangerous", meaning that in apps uploaded to the Snap Store it does not get connected automatically. The "cups" interface is considered "safe" and therefore auto-connects.

After a year of design and implementation work of me together with Canonical's snapd team we made the "cups" interface exclusively connecting to the CUPS Snap, auto-installing the CUPS Snap as a dependency if it is not already installed. The CUPS Snap contains a new-enough CUPS where my Snap mediation functionality is built in, rejecting administrative tasks of Snaps not connecting via "cups-control".

So if the CUPS Snap is the user's standard CUPS, all is working as expected.

If the user has a classically installed CUPS, the CUPS Snap goes into proxy mode, cloning the queues of the system's CUPS and passing all jobs simply through to the system's CUPS, so that the user's queues and drivers (also proprietary ones) continue to get used and the user gets the same experience for snapped and classically installed apps. Administrative CUPS requests from application Snaps get always blocked, so the CUPS Snap's CUPS works as a firewall for the system's CUPS.

Here are some threads on the [snapcraft.io forum](https://forum.snapcraft.io/) about the development of the interface (including documentation for who wants to snap their apps):

- [New interface: “cups” for all Snaps which print (How to use, how it exactly works)](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/)
- [The "cups" interface, by Graham Morrison](https://forum.snapcraft.io/t/the-cups-interface/)
- [My original documentation request for the "cups" interface](https://forum.snapcraft.io/t/the-cups-interface/)
- [Handling of the “cups” plug by snapd, especially auto-connection (How we came to the proxy mode of the CUPS Snap)](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/)
- [“cups” interface merged into snapd - Additional steps to complete](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/)

And by the time of writing this, two applications in the Snap Store are actually using the "cups" interface: [onlyoffice-desktopeditors](https://snapcraft.io/onlyoffice-desktopeditors) and [FreeCAD](https://snapcraft.io/freecad). Due to their dependency on the CUPS Snap they made the installation count of the CUPS Snap sky-rocket from 4200 to 75000. And we can expect much more as soon as the Firefox, Chromium, and LibreOffice Snaps switch over ...

This also means that the CUPS Snap got integral part of the Snap eco-system. It is live and in production now.

Now we are looking forward for the first distribution using the CUPS Snap as its default printing environment (Ubuntu 23.04 ???) and for the first all-Snap Ubuntu distribution.


## All free drivers in a PPD-less world - OR - All free drivers in Snaps
After having transferred all free software drivers [from the dark age of LPD to CUPS](#all-free-drivers-to-be-used-with-cups) in the beginning of the glory days of OpenPrinting we now have been at the point of transferring them again, this time from classic CUPS drivers consisting of PPD files and filters into Printer Applicatioms, emulations of IPP printers.

Many, many years ago, in the good old times of CUPS 1.4 (August 2009) PPD files got deprecated, but continued to be used up to today, due to lack of a new concept for printer drivers.

This concept came up only on the [OpenPrinting Summit/PWG Meeting 2018](https://pwg.org/chair/meeting-info/may-2018-sunnyvale.html)) in Sunnyvale, CA, when Michael Sweet introduced the concept of Printer Applications in his [CUPS Plenary](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-18.pdf).

Printer Applications are emulations of driverless IPP printers (IPP Everywhere, AirPrint), so behave exactly like a modern network printer. Internally, they connect to non-driverless printers and convert incoming jobs from at least one of the driverless standard data formats (PDF, PWG Raster, Apple Raster, PCLm) into the printer's native language. They also know about the supported printer's capabilities and supply this information on a client's `get-printer-attributes` IPP request. They also advertise there presence by DNS-SD as network printers do.

This means that printer drivers are emulations of driverless IPP printers, so CUPS only needs to deal with driverless IPP printers, as a printer is either actually a driverless IPP printer, or it is taken care of by a Printer Application, or it is a remote CUPS printer (and CUPS is also an emulation of driverless IPP printers). And this way CUPS can go all-IPP, no PPD files and printer-specific filters any more!

And this CUPS we are approaching now: In [CUPS 3.x](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2022.pdf) (or if you prefer video: [The Ubuntu Indaba](https://www.youtube.com/watch?v=P22DOu_ahBo)) the deprecated PPD file support will get finally removed.

Also if the [CUPS Snap](#the-cups-snap) is used as the standard printing system, we cannot use classic CUPS drivers any more but have to resort to Printer Applications. This is due to the nature of Snaps, having a static, immutable file system where we cannot add extra files, in our case PPD files and filters. One could now say that CUPS is flexible enough to move the PPD and filters directories into the dynamic file system of the Snap (hey, we can add PPD files to the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) Snap, why not drivers to the CUPS Snap?) but this is not desired, as copying executable files (the filters) into a Snap would break the security principles of Snaps.

But now one can think why did we rush the classic printer drivers into Printer Applications right now? We have still time until end of 2023 when CUPS 3.x gets released? The main reason is that I want to switch Ubuntu 23.04 (release April 2023) to use the CUPS Snap as its default printing system, as a dress rehearsal for the New Architecture to test all its shiny new components (the Printer Applications, the GNOME Control Center, the print dialogs with [Common Print Dialog Backends](#common-print-dialog-backends), ...). If I wait for the release of CUPS 3.x, the next available Ubuntu release is 24.04 LTS (Long Term Support) and doing such a high-impact change as the New Architecture in an LTS is very risky, therefore I would very much like to make use of the "small" Ubuntu releases before.

And all the talk about an all-Snap Ubuntu distribution ...

Yes, I have transferred [all free software printer drivers](https://openprinting.github.io/OpenPrinting-News-November-2021/#practically-all-free-printer-drivers-in-printer-applications) which come with Debian (and so also with Ubuntu) into [4 driver-retro-fitting Printer Applications](https://snapcraft.io/search?q=OpenPrinting). Only driver not transferred (yet) is the Braille printer driver included in cups-filters (but this is in the works now).

But do not think I have all these drivers rewritten into filter functions and turned their PPD file generators into `get-printer-attributes` IPP responders. No, I would never do it, as such code changes one has to test, and how should I test the drivers for ~10000 printer models without having the actual printers, but having a hall with 10000 printers inside one would also need a lot of people to do the testing. So the way to go is "do not touch the running code" and encapsulate it in Printer Applications.

I started writing a [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) for printing on PostScript printers with their manufacturer's PPD files (~4000 PPDs included in the [Snap](https://snapcraft.io/ps-printer-app), all free ones which come with distributions, user can add own ones) and once having this completely working (with support for installable accessories, polling settings from the printer, ...) I decided to [generalize this for CUPS drivers and turn this into a library](https://github.com/OpenPrinting/ps-printer-app/discussions/8)), ending up with the [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit) project based on Michael Sweet's [PAPPL}(https://github.com/michaelrsweet/pappl).

Using this library the effort for retro-fitting CUPS drivers is low, and needs only very small changes in C code for configuring the Printer Application and for a method to find out which printers are supported. More substantial C programming is only needed if one wants to add some special functionality (like downloading HP's proprietary plugin in the HPLIP Printer Application). The original PPD files (or PPD generators) and filters are then package together with the Printer Application and that's it.

pappl-retrofit has all functionalities to list the PPD files, to generate `get-printer-attributes` IPP responses from the PPD files, find the best PPD option settings for given job IPP attributes, create `media-ready` lists of loaded media, run CUPS filters to execute the print jobs, stream jobs whenever possible, ...

Once created this library it was quick and easy to get all these drivers into Printer Applications. 2 of the 4 ([HPLIP](https://github.com/OpenPrinting/hplip-printer-app), [Gutenprint](https://github.com/OpenPrinting/gutenprint-printer-app)) are for still actively maintained drivers and so will sooner or later get replaced by native (= no PPD files used internally) Printer Applications.

So we currently have:

- [**PostScript Printer Application**](https://github.com/OpenPrinting/ps-printer-app) ([Snap Store](https://snapcraft.io/ps-printer-app)): Printer Application Snap for PostScript printers which are supported by the manufacturer's PPD files. User can add PPD files if the needed one is not included or outdated.
- [**HPLIP Printer Application**](https://github.com/OpenPrinting/hplip-printer-app) ([Snap Store](https://snapcraft.io/hplip-printer-app)): HPLIP in a Printer Application Snap. Supports nearly every HP printer ever made. Installing HP's proprietary plugin (needed for a few printers) into the Snap is supported and easily done with the web interface, and it gets automatically updated.
- [**Gutenprint Printer Application**](https://github.com/OpenPrinting/gutenprint-printer-app) ([Snap Store](https://snapcraft.io/gutenprint-printer-app)): High quality output and a lot of knobs to adjust, especially for Epson and Canon inkjets but also for many other printers, for example dye sublimation photo printers, in a Printer Application Snap.
- [**Ghostscript Printer Application**](https://github.com/OpenPrinting/ghostscript-printer-app) ([Snap Store](https://snapcraft.io/ghostscript-printer-app)): Printer Application with Ghostscript and many other drivers, for practically all free-software-supported printers which are not PostScript and not supported by HPLIP or Gutenprint. It contains all the printer drivers for which there is no separate Snap.

And Michael Sweet has also made a Printer Application for label printers, based on the label printer drivers which come with CUPS:

- [**LPrint**](https://github.com/michaelrsweet/lprint) ([Snap Store](https://snapcraft.io/lprint)): Supports Dymo LabelWriter and Zebra ZPL label printers, with all label-printer-typical options: Label modes, tear-off offsets, media tracking, media top offset, print darkness, resolution, roll selection, speed, ... Note that this is a native Printer Application. It does not simply encapsulate the CUPS filters and PPF files which come with CUPS.

And there is also a [Legacy Printer Application](https://openprinting.github.io/OpenPrinting-News-November-2021/#your-driver-not-in-a-printer-application---the-legacy-printer-application) (included in the pappl-retrofit) project which, when classically installed (do not try to snap it) sees all classically installed CUPS drivers and makes them available in a Printer Application. This is especially useful for proprietary drivers.

So we will not loose the support for any of the currently supported printers when switching over into the PPD-less, all-IPP New Architecture ... Now the third generation of printing with free software can start ...

