---
title: OpenPrinting News - March 2022
layout: single
author: Till
excerpt: Linux Foundation accepted as GSoC 2022 org, "cups" Snap interface for applications ready, Snap vs. Flatpak for printing, approaching cups-filters 2.x, Ghostscript and driverless IPP
---
## Google Summer of Code 2022

The Linux Foundation got accepted as mentoring organization by Google again!

So now we are about to find the contributors we ant to work with. Many of those who have already worked on OpenPrinting GitHub issues during our selection process have came up to us, right on the day after Google has announced the Linux Foundation's participation, suggesting which project idea they want to work on and some are already starting to work on it.

We are open for GSoC contributors, also non-students, like for example retired people looking into getting involved, and especially people who join our OpenPrinting community, stay with us, maintain, and improve their code, bring in new ideas, mentor contributors in the following years, write on our web site, ...

We have posted [everything you need to know for participating](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022) and our [**project ideas**](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects) for you to have a look.

We also appreciate any new project ideas brought up to us and narurally also contributors suggesting their ow idea.

And we already have one extra project idea since last month:

- [Make a native Printer Application from Gutenprint](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#make_a_native_printer_application_from_gutenprint)


## OpenPrinting web site
First, we are working on a prominent note that most modern printers are driverless on our front page and an (automated?) list of available driverless IPP printers. See the discussion in [this issue report](https://github.com/OpenPrinting/openprinting.github.io/issues/138).

**Update: Michael Sweet has updated the [front page](https://openprinting.github.io/) now, adding a prominent hint that most modern printers are driverless and also linked a [list of driverless printers](https://openprinting.github.io/printers/) right from the front page. Thanks a lot, Michael.**

The part of the web site for looking up (legacy, non-driverless) printers and drivers (the [OpenPrinting database web app](https://github.com/OpenPrinting/foomatic-db-webapp/) has moved to a new server at Oregon State University Open Source Lab ([OSUOSL](https://osuosl.org)). As the old server did not receive a system upgrade for many years there were a lot of problems with the compatibility of the code (SQL and PHP) with the new, modern server.

Fortunately, the people there, especially Violet Kurtz and Lance Albertson, both from the OSUOSL, helped a lot on doing this migration by doing the needed code changes. Thanks a lot to them.

The UI of the web app did not change, but there are changes in the internal functionality. Instead of feeding the complete [Foomatic XML data](https://github.com/OpenPrinting/foomatic-db) into the MySQL database and from this generate the PPD files which are identical with the ones we find in Linux distributions (they usually create them with the `foomatic-compiledb` script directly from the XML data which comes with the [foomatic-db-engine](https://github.com/OpenPrinting/foomatic-db-engine) package) we do the same as the distributions do also on the server. We pre-build the PPD files with `foomatic-compiledb` and serve only the content of the web pages from a (reduced) MySQL database. This saves us from too many SQL fixes to do and server responses, especially when downloading PPD files should be faster.

Also the `query.php` script for machine queries got fixed and is fully working again.

This is especially important as we soon want to add a [query service for printer setup tools](https://openprinting.github.io/OpenPrinting-News-November-2021/#printer-querying-on-the-openprinting-web-server) to find the correct Printer Application(s) for a printer based on its device ID.

Note that the UI still needs some updating, especially removing obsolete links.

If you find any bug, please report it on the [bug tracker of the web app](https://github.com/OpenPrinting/foomatic-db-webapp/issues).


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

The "cups" interface for Snaps of applications which print is completely implemented now! What is missing are simply only the next stable releases of the components of the Snap environment: [snapd](https://snapcraft.io/snapd) 2.55 and new stable releases of the core Snaps ([core](https://snapcraft.io/core), [core-base](https://snapcraft.io/core-base), [core18](https://snapcraft.io/core18), [core20](https://snapcraft.io/core20)). Once they are out, the new "cups" interface is ready to use.

See the [progress of our work](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/) and the [updated TODO list](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/28653/21?u=till.kamppeter).

As we will see the needed releases probably already before next month's news post, perhaps in around 2 weeks or so, I will describe here how the final concept works and how to snap an application with print functionality:

### How it works

Snaps are file systems in isolated sandboxes. A Snap is not able to access the file system of another Snap (like the CUPS Snap for example) nor it is able to access the file system of the host system (like for example the Unix socket of a classically installed CUPS).

For exceptions from this isolation there are interfaces. They have well-defined permissions what a Snap can access in the outside world. Snaps of user applications, like LibreOffice, Darktable, ... have so-called "plugs": `network`, `avahi-observer`, ..., and `cups`. These plugs are connected ("plugged") to so-called "slots", most of the host system but some also of other Snaps (usually servers in a Snap, like the CUPS Snap).

The packager of a Snap can decide which interfaces the packaged application plugs and so he can have maximum security without losing functionality of the application. He uploads the Snap to the Snap Store and when a user installs it on his system, the interfaces usually get auto-connected and the user can use the application without hassle.

Now there are some interfaces through which you can do operations which are dangerous for the system. One of them for example is the `cups-control` interface, which snapd provided already from the beginning on and plugging it (to the system) allows your Snap not only to list the available printers and to print on them, but also to do any administrative tasks (creating and modifying queues, changing cupsd configuration, seeing and deleting other user's jobs, ...) on the system's classically installed (RPM, DEB, ...) CUPS. In classic systems you control this via the "lpadmin" group, but in the Snap world you do not have any system groups.

To avoid that arbitrary developers can upload Snaps to the Snap Store which plug such "dangerous" interfaces and abuse them, compromising the system's security, only selected (not "dangerous") interfaces get auto-connected when installing from the Snap Store, other interfaces need to get connected manually by the user (requires "root" access to the system), or the developer of the Snap has to request a special permission for auto-connection by the Snap Store team (they manage the list of which interfaces are "dangerous" or not). The Snap Store team reviews the application and at least 2 members have to be in favor of the auto-connection for it to het improved.

Now when I started to get printing into the Snap world several years ago, snapping CUPS but also looking into how snapped applications can print, I found out that the only way to print out of a Snap was through the "dangerous" `cups-control` interface. The snapper of an application had to plug this interface and request special permission from the Snap Store for the interface's auto-connection on the user's machines, or the user had to connect it manually, not really having printing "just work". In addition, this could lead up to very many special permissions from the Snap Store team and raise the probability that a developer abuses his permission by modifying his application.

So I started developing, together with the snapd developer team, the new `cups` interface. All the development was accompanied by the [snapcraft.io forum thread of the initial feature request](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/) which I started **exactly** one year ago, on March 18, 2021. There were two pull requests on the snapd code, the first got dropped and the second got merged around half a year after getting initially posted. After the merge, on February 7, 2022, I marked this thread as solved and started a [second thread](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/) for the finalization.

Now let us see how this interface works:

An application with print functionality (like LibreOffice, Darktable, gedit, ...) plugs the `cups` interface. In contrary to `cups-control` the slot is not in the host system, but in the CUPS Snap, always the CUPS Snap, even if the user uses a classically installed (RPM, DEB, source, ...) CUPS on his system. This means that the CUPS Snap gets auto-installed (like a package dependency) during the installation of the application Snap when it is not already on the system.

The application Snap then mounts the CUPS Snap's `/var/snap/cups/common/run` directory into its own file system's `/var/cups` directory and has this way access to the Unix socket of the CUPS Snap's CUPS daemon, as `/var/cups/cups.sock`. This interaction between the two Snaps is part of the `cups` interface. In addition, the `cups` interface sets the `CUPS_SERVER` environment variable in the application Snap's sandbox to `/var/cups/cups.sock` so that the application uses the CUPS Snap's CUPS.

If there is no classically installed CUPS on the system, the CUPS Snap is running in its standalone mode and is the system's print environment, also for non-snapped, classically installed applications (for which it then creates a second socket as the usual `/run/cups/cups.sock`). So both the snapped and the unsnapped applications print happily via the snapped CUPS.

But what if there is a classic installation of CUPS on the user's system, with lots of thoroughly manually created queues and even proprietary printer drivers which we cannot migrate into a CUPS-Snap-based system? In this case the CUPS Snap sees that there is a claasic CUPS configures and automatically starts in its proxy mode. This means the CUPS Snap's CUPS daemon is a proxy for the system's CUPS daemon. The CUPS Snap runs a helper daemon (named `cups-proxyd`) along with its CUPS daemon and `cups-proxyd` observes the system's CUPS and clones all its queues, as filterless pass-through queues but with the same PPD files as the original queues, to have the same options and printer properties. Every change on the system's classically installed CUPS is immediately synced into the Snap's CUPS.

But why that complicated for the most common situation of having a classically installed CUPS on the system? Why running two CUPS daemons on one simple desktop machine? The Snap's CUPS daemon in this configuration is a firewall for the system's CUPS daemon, it protects it against administrative requests of the snapped application.

In the beginning we told that the `cups` interface blocks administrative requests, but we did not tell how. snapd does not understand IPP (Internet Printing Protocol) and so it cannot filter out the unwished requests from the communication between the application and the CUPS daemon. So who is best for understanding IPP? CUPS! So I have implemented the filtering in the CUPS daemon, the so-called Snap mediation. The CUPS daemon, if it is new enough, 2.4.x in general, also some 2.3.x in case of Debian or Ubuntu packages, checks on each administrative inquiry it receives whether it is from a confined Snap (only these you can upload into the Snap Store without special permission). If so, it checks whether the client Snap plugs `cups-control` and only then it accepts the request. Requests from unsnapped clients or classic Snaps are not blocked. As we are explaining the mechanisms of the `cups` interface, our client plugs `cups` and not `cups-control` and so its administrative requests get rejected and our CUPS is safe.

The CUPS Snap only exists with a Snap-mediating CUPS, at least at the time of launch of the `cups` interface with snapd 2.55, but actually already for many months, since I implemented the Snap mediation. This way with the `cups` interface forcing the application's CUPS communication through the Snap's CUPS we are for sure blocking the unwished requests. If we let the snapped application communicate directly with the system's CUPS, we cannot be sure that the administrative requests are blocked, as classically installed CUPS daemons can be too old or the package maintainer could have opted for building CUPS without Snap mediation. We need to keep in mind that Snaps are distribution-independent packages, and each distribution's classic CUPS packages can be different. Therefore wen need the CUPS Snap as proxy. 

This way we can safely install application Snaps. They plug `cups` and therefore can print but not mess up CUPS, whatever CUPS the user prefers to use. Developers can easily snap their applications with print functionality and upload them to the Snap Store, without questions asked and easily installable by the user, so that his printing "just works".

### How to snap an application

Snapping an application with print functionality is easy, do not get turned away by these rather complicated inner workings.

First, you start your snapping the same way as you are used to for applications without print functionality. Read about this part elsewhere.

Second, in `snapcraft.yaml` let each app with print functionality plug the `cups` interface:
```
apps:
  cups:
    command: bin.sh
    plugs:
      - cups
      - network
```
or
```
apps:
  lp:
    command: usr/bin/lp
    plugs: [network, home, cups]
  lpstat:
    command: usr/bin/lpstat
    plugs: [network, avahi-observe, cups]
```

Third, add the placeholder content interface to trigger the auto-installation of the CUPS Snap. Simply add the following lines to `snapcraft.yaml`:
```
# this is not used or needed for anything other than to trigger automatic
# installation of the cups snap via "default-provider: cups"
plugs:
  foo-install-cups:
    interface: content
    content: foo
    default-provider: cups
    target: $SNAP_DATA/foo
```
Do not put this into any section, put it right after the header part for example. Simply copy and paste the whole blob of lines as you see it here. Nothing needs to get adapted to your particular Snap, nor you have to create any directories in your Snap for that to work.

Note: Having to add these lines is only a temporary workaround. The `default-provider` functionality is planned to be added to the `cups` interface in snapd in the coming months. When this has taken place, all what is needed to use the `cups` interface is plugging `cups` as described in the second step here.

Forth, build your Snap as you are used to, test it, and upload it into the Snap Store using your habitual method. If a user installs it, the CUPS Snap gets auto-installed and the `cups` interface auto-connected and printing out of the Snap "just works".

DO NOT plug both `cups` and `cups-control` in the same Snap. This can mess up things, especially as CUPS' Snap mediation works "per-Snap" not "per-application-in-the-Snap", meaning that if one ioff the apps in the Snap plugs `cups-control` CUPS assumes the whole Snap plugging `cups-control` and allows all apps in the Snap to do administrative operations.

See a [complete example here](https://github.com/snapcore/test-snapd-cups-consumer).

### Thanks

Thanks a lot to my colleagues in the Desktop and snapd teams of Canonical for the great collaboration and team work to get the `cups` interface designed and implemented: Ian Johnson, James Henstridge, Samuele Pedroni, Alex Murray, Alberto Mardegan

And also thanks to Michael Sweet for the helping with the smooth iontegration of the Snap mediation into the CUPS code.


## Flatpak and printing
I have talked a lot about Snap and integration of printing in the Snap ecosystem here in the news posts and also on many conferences, but [Snap](https://snapcraft.io/) (from Canonical, the company behind Ubuntu) is not the only system for sandboxed packaging. [Flatpak](https://flatpak.org/) (comimg [freedesktop.org](https://www.freedesktop.org/wiki/), popular in the RedHat-ish world) is also common.

I asked Zdenek Dohnal from Red Hat and he and Felipe Borges, a colleague of him at Red Hat told me about how it works with printing and Flatpak.

As Snap, Flatpak packages are distribution independent. The developer uploads a single Flatpak of his application and everyone can use it, independent of the Linux distribution in use.

First, Flatpak is only for packaging user applications, and **not** for system components, system or server applications, daemons, ..., or even a base system. So there will be no CUPS Flatpak, nor Flatpaks of Printer Applications.

Especially this way Flatpak is not suitable as a platform to distribute printer and scanner drivers as distribution-independent packages. So currently we have no alternative to Snap to provide the complete "printing just works" experience. This is somewhat sad as there are Linux distributions which are not systemd-based and so are not compatible with Snap, and there are Snap deniers, too.

Also users who trust more the "original from upstream" than a distro package of CUPS cannot follow their preference by a simple Flatpak install as we cannot provide a Flatpak of CUPS.

Second, Flatpaked user applications communicate with the host system/the outside world through so-called [Portals](https://github.com/flatpak/xdg-desktop-portal), so for printing they use the [Printing Portal](https://docs.flatpak.org/en/latest/portal-api-reference.html#gdbus-org.freedesktop.portal.Print).

But in contrary to Snap's interfaces the Portal is not an AppArmor permission to access a certain part of the host system (or another Snap) or a mount of certain parts of the host's (or another Snap's) file system, but instead, it is a D-Bus API which provides common GUI dialogs for common tasks (choose file, save file, print, ...), where the dialog comes from the desktop environment (GNOME or KDE) and so is the one of the desktop environment, a *common* dialog and is de-coupled from the user application via the D-Bus interface. So when using the GNOME desktop and printing from a flatpaked KDE app we should see GNOME's print dialog.

Those under you who have followed the activity of the OpenPrinting project already for longer time, perhaps remember our effort on the "Common Print Dialog" (**not** the "Common Print Dialog *Backends*" we are currently trying to establish). That was the same idea, but only for printing that time. To not confuse users with different print dialogs for different applications, we wanted to provide the print dialog from the desktop environment (GNOME or KDE) and the applications shouting into the D-Bus in order to print, also with a well-defined D-Bus API. Unfortunately, we had to give up on this project as we had neither volunteers nor someone financing a developer for us.

There is the portal frontend, `xdg-desktop-portal` which provides the D-Bus interface inside the sandbox and there are portal backends, one for each desktop environment, to provide the actual functionality, as the dialogs and also the communication with the host system. In order to print, the application has to call appropriate D-Bus methods, first for opening the dialog and getting the user's selection of the printer and the option settings back, and another method call to send the job data formatted according to the user's choices.

Modern GNOME and KDE applications are supposed to use appropriate high-level APIs ([Here is the one of GTK](https://docs.gtk.org/gtk3/class.PrintOperation.html)) which auto-discover whether the app is inside a Flatpak sandbox and print (and use other common dialogs) via D-Bus instead of popping up the GUI library's dialog.

Problem here is that if we have older apps, non-GNOME/GTK/KDE/Qt apps, and especially closed-source apps, and generally apps not using the appropriate APIs. If they are free software we can at least patch them for the Flatpak, but this is rather invasive for packaging a user application. In addition, only interactive desktop applications which print through dialogs are covered. Non-GUI applications usually talk directly to CUPS (via libcups) or call command line utilities to print and so they need to get invasively modified for printing.

In Snaps the user applications do not need to be changed, nor need to have Snap-specific functionality already included. snapd connects the original CUPS interface into the application's sandbox and so the application can do the same thing as it was doing without sandbox.

So at least for me it seems that Flatpak is highly specialized for sandbox-packaging desktop applications with GUI, whereas Snap is more general, allowing to sandbox-package practically everything, especially allowing also the use for headless servers.

Thanks to Zdenek and Felipe for their explanations and links about Flatpak.

## Approaching cups-filters 2.0
I am getting closer to the release, the list of items to fix or ideas to still add gets shorter. So we will see [cups-filters](https://github.com/OpenPrinting/cups-filters) 2.0 soon.

This time I worked on the `imageto...()` filter functions again and corrected the centering of the image with `print-scaling=none` ([commit](https://github.com/OpenPrinting/cups-filters/commit/0a1c76fc38)) and the switching between fit-to-page abd no sacling with `print-scaling=auto` ([commit](https://github.com/OpenPrinting/cups-filters/commit/df3b1975)).

I also added support for grayscale (sGray 8-bit) PCLm printing support ([commit](https://github.com/OpenPrinting/cups-filters/commit/3d28a44428), [commit](https://github.com/OpenPrinting/cups-filters/commit/973f97a56a), [commit](https://github.com/OpenPrinting/cups-filters/commit/870e86962c), [commit](https://github.com/OpenPrinting/cups-filters/commit/2e4472f79f)) and added PCLm output support to the `gstoraster` CUPS filter executable ([commit](https://github.com/OpenPrinting/cups-filters/commit/c4df9517d5)).

By the way, I got motivated to do this by discovering a [**driverless printer which supports only PCLm**](https://github.com/apple/cups/issues/6022), the HP LaserJet M15. Usually, driverless IPP printers also support Apple Raster to allow printing from iOS devices via AirPrint.

And finally I made the the `universal` CUPS filter work correctly with all PPD files. If a PPD file specified a driver filter in a `*cupsFilter2: "..."` line, the `FINAL_CONTENT_TYPE` environment variable was set to the output format of that filter (2nd word of the string defined in the `*cupsFilter2: "..."` line) and not to its input format, which would be what `universal` has to deliver. So before, the `universal` filter received a wrong format as its destination format. Npow the filter checks for `*cupsFilter2: "..."` lines and corrects from the given format to the input format of the corresponding line as destination format ([commit](https://github.com/OpenPrinting/cups-filters/commit/fe7649c8a0)). Also when installing cups-filters using the `universal` filter we install also the individual filters (the executables are little stubs anyway) as sometimes they are called by the PPD file ([commit](https://github.com/OpenPrinting/cups-filters/commit/4da1faf99b)).

Some smaller bugs and glitches got also fixed.

The fixes on the `imageto...` filters are already backported to cups-filters 1.28.12 and so included in Ubuntu 22.04 LTS (Jammy Jellyfish), the other fixes do not apply to the 1.x series.

Mainly missing now is a bunch of log leaks to stderr in image processing functions, some little known bugs, general code clean-up, license info in the source files, and then we are ready for a Release Candidate.


##Ghostscript supports driverless IPP data formats
I have also contributed to Ghostscript towards driverless printing this month. The changes will be available from Ghostscript 9.56.0 on, which will get released in a few days.

First I have added new `appleraster` and `urf` output devices to let Ghostscript generate the Apple Raster (URF) format for driverless IPP printing ([commit](https://git.ghostscript.com/?p=ghostpdl.git;a=commitdiff;h=d56ebbd30ded)). The chabge was trivial, as Ghostscript already uses libcups to generate PWG Raster (with the `cups` or `pwgraster` output devices) and one can switch these libcups functions to output Apple Raster instead by changing a simple flag.

Second, I have posted a [feature request](https://bugs.ghostscript.com/show_bug.cgi?id=705035) for an output device to generate grayscale (sGray 8-bit) PCLm output. The feature got implemented a few days later under the output device name `pclm8`.

Ghostscript now supports all standard data formats for driverless IPP printing as output formats: PDF (`pdfwrite`, `pdfimage8`, `pdfimage24`, `pdfimage32`), PWG Raster (`pwgraster`), Apple Raster (`appleraster`, `urf`), and PCLm (`pclm`, `pclm8`).


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|4141|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|1729|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2257|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1143|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|3847|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|3169|


## CUPS
Currently released is [**2.4.1**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.1).

There will be further bug fix releases in the 2.4.x series. An important bug fixed recently is that with 2.4.1 (or earlier) you cannot create a print queue with `lpadmin` using a DNS-SD-service-name-based URI (output of `driverless` command) and the `-m everywhere` option to auto-generate a PPD for driverless printing ([Issue #340](https://github.com/OpenPrinting/cups/issues/340), [Issue #343](https://github.com/OpenPrinting/cups/issues/343)). This is [fixed now](https://github.com/OpenPrinting/cups/commit/777c1ec8e5).

I also discovered a bug that prevents printing to temporary queues for driverless printers on localhost (IPP-over-USB with ipp-usb, Printer Applications) from the GTK print dialog. I have found a fix for this, posted it as [Pull request #353](https://github.com/OpenPrinting/cups/pull/353), and applied it as distro patch to Ubuntu's CUPS package. Problem here is that the GTK dialog does all the client's work on its own instead ofg using the convenience API's of libcups. GTK's implementation does not replace the network host name in the URI of the local service (coming from Avahi) by "`localhost`" when the service comes via the loopback (`lo`) device. In the pull request I let the CUPS daemon correct this when creating the temporary queue.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with 2.4.1, perhaps with 2.4.2 if it gets released in time for [Final Freeze on April 14, 2022](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/).

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.2 (TBA)
----------------------------

- Fixed CSS related issues in CUPS Web UI (Issue #344)
- Fixed copyright in CUPS Web UI trailer template (Issue #346)
- mDNS hostname in device uri is not resolved when installaling a permanent
  IPP Everywhere queue (Issues #340, #343)
```

## cups-filters
Currently released is [1.28.12](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.12).

We are continuing to polish and to fix bugs for the 2.0.0 release. I have especially done image centering corrections in the `imageto...()` filter functions, added grayscale PCLm output support, fixed the `universal` CUPS filter to work with all PPD files.

I have also backported the fixes on the `imageto...` filters to cups-filters 1.x, included in the 1.28.12 release.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will ome with cups-filters 1.28.12. The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.

```
CHANGES IN V1.28.12

	- imagetoraster, imagetopdf: Fixed comparison of the image
	  size with the page size for print-scaling=auto. The image
	  size in pixels was compared with the page size in PostScript
	  points (1/72 inch).
	- imagetoraster, imagetopdf: Fixed the "print-scaling=none"
  	  (crop-to-fit) mode, also use crop-to-fit always when
  	  requested, do not fall back to fit-to-page when the image
  	  size differs significantly from the page size (Issue #362).
	- libcupsfilters: Changed the default PPI resolution for
	  images as input files from 128 to 200 (Pull request #446).
	- implicitclass: Do not check availability of "gs" and
	  "pdftops" executables, instead, check by the presence of
	  "gstoraster" and "pdftoraster" filters whether we have
	  configured cups-filters for Ghostscript and/or Poppler use.
	- libcupsfilters: In the PPD generator for the driverless
	  utility and cups-browsed add "*cupsFilter2: ..." lines for
	  all supported driverless data formats (PDF, Apple/PWG
	  Raster, PCLm), and add lines for legacy data formats (PCL,
	  PostScript) only if no driverless formats available.
	- libcupsfilters: Always use encryption for ipps. RFC7472
	  requires that 'ipps' must be used over HTTPS, but the
	  driverless utility does not enforce encryption (Pull request
	  #433).
	- serial: Add a 10-msec sleep and at the end add a tcdrain().
	  For some unknown reason, every printing file need sleep a
	  little time to make sure the serial printer receive data is
	  right (Pull request #431).
	- libcupsfilters: Fix resolver functions for DNS-SD-based
	  URIs, to make resolve_uri() also work when DEVICE_URI env
	  variable is set and to make ippfind_based_uri_converter()
	  not re-direct stdin.
	- pdftopdf: Set default for print-scaling to avoid "should
	  never happem" log messages and undefined behavior.
	- pdftopdf: Fix orientation-requested = 0. Consider
	  this as "automatic selection and not as error.
	- pdftopdf: Fixed all combinations of print-scaling and
	  number-up for printers with asymmetric margins (top !=
	  bottom or left != right) and for input files containing
	  pages with different sizes and/or orientations. Fixes
	  backported from 2.x branch.
	- pdftopdf: Add 2% tolerance for input size larger than output
	  page when "print-scaling=auto" or "print-scaling=auto-fit"
	  is used and too large input pages should be scaled, fitting
	  documents not. This prevents a random-looking behavior if
	  input and output page size seem to be equal, but in reality
	  there are slight dependencies between size dimensions.
```


## PAPPL
Currently released is [1.1.0](https://github.com/michaelrsweet/pappl/releases/tag/v1.1.0).

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
