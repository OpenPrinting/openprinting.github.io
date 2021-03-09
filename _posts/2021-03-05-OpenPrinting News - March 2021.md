---
title: OpenPrinting News - March 2021
layout: single
author: Till
excerpt: New CUPS home is OpenPrinting, CUPS Snap and PostScript Printer App in Snap Store, Printer setup tools/user experience
---
## CUPS has new home at OpenPrinting!
Due to the fact that CUPS development at Apple has stopped since the beginning of 2020 we had [forked CUPS some months ago](https://openprinting.github.io/OpenPrinting-News-September-2020/#cups) to incorporate patches and fixes from the distributions. As Apple did not resume the upstream work on CUPS, we have made OpenPrinting now the official upstream home for CUPS.

This especially means that we can now continue developing CUPS, independent of Apple. So we can add features and lead CUPS into the new architecture without PPD files and with Printer Applications.

CUPS has a [new home page](https://openprinting.github.io/cups/) now and what was formerly our fork is now the [official CUPS repository](https://github.com/OpenPrinting/cups/). Upcoming releases will be of the new 2.4.x series, now without "opX" suffix now. Also all documentation files which come with it are updated to point to the OpenPrinting resources. Mailing list for development discussions is our [printing-architecture](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) list.

First feature additions have already happened, all Snap support which the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) and the Ubuntu package of CUPS received as package-specific patches is now upstream in CUPS.

## Google Summer of Code 2021
**Update: The Linux Foundation got accepted as mentoring organization by Google!**

We have applied again  for the Linux Foundation as mentoring organization, as in the previous years, for the [Google Summer of Code](https://summerofcode.withgoogle.com/). The accepted organizations will be announced by Google on Tue, March 9, 2021 ([Timeline](https://developers.google.com/open-source/gsoc/timeline)).

OpenPrinting's project ideas are [posted](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2021-openprinting-projects), but further ideas are still welcome. Note that the projects are half-length this year, 175 hours instead of 350 hours (see our [October news](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021). Larger projects we should run in the Linux Foundation Mentoring Program instead of in the GSoC.

## CUPS Snap
**The [CUPS Snap](https://github.com/OpenPrinting/cups-snap) is in the [Snap Store](https://snapcraft.io/cups) now!**

After several months of waiting, the snapd developers have finally accepted and merged the needed changes for CUPS to receive both printing and administrative (create/modify queues, delete anyone's jobs, ...) through secure interfaces and to easily upload applications with print functionality (like LibreOffice) to the Snap Store without them being able to do administrative CUPS tasks and this without the CUPS Snap needing full access to the snapd core. So we have a secure and easy-to-use printing infrastructure also in all-Snap operating systems. But note that access from non-Snap software gets always granted, so it is recommended to only install such software as package of your OS distribution.

Please see the [README.md](https://github.com/OpenPrinting/cups-snap/blob/master/README.md) file of the CUPS Snap for installation instructions. Some interface connections still need manual setup as the [automatic setup is not yet fully approved](https://forum.snapcraft.io/t/request-cups-snap-cups-auto-connection-to-of-cups-cups-control-to-cups-admin-and-also-of-the-network-manager-observe-interface/). To make the CUPS Snap your standard printing environment you have to disable or remove your system's CUPS (usually installed as RPM or DEB packages) first.

Note also that one cannot install classic CUPS printer drivers into a snapped CUPS system. You need to use driverless IPP printers (AirPrint, IPP Everywhere, Mopria, Wi-Fi Direct Print, those on which you can print from a phone without dedicated app), remote CUPS printers, or PostScript printers (using the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app), [Snap Store](https://snapcraft.io/ps-printer-app)). More Printer Applications to provide additional drivers are on the way. Automatic migration to the CUPS Snap by OS distributions will only happen if enough drivers are available as Printer Applications.

**Update**

**Call for Testing**

I have now posted a "[Call for Testing](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)" for both the CUPS Snap and the PostScript Printer Application on [Discourse](https://discourse.ubuntu.com/c/desktop/snap-store/). Please try everything out, following the instructions and post your experience there.

Features and fixes in the past month:

- As already told, the correct implementation of the slots for the "cups" and "cups-control" plugs of client Snaps, so that the CUPS Snap does not need to plug "dangerous" interfaces to the system, like "snapd-control".
- Applied all code changes needed on CUPS to support Snap, both for cupsd being in the CUPS Snap and for access control of client Snaps to CUPS upstream, so with the next CUPS release, we do not need to apply patches to CUPS for its snappability any more. Currently, we are applying one single patch with all these changes.
- Do not modify the CUPS code with `sed` any more.
- Updated the plugs of the included command line tools, depending whether they are administrative or not.
- Silenced warnings during build due to missing paths for the included command line tools.
- Get up-to-date with the upstream sources: CUPS 2.3.3op2, QPDF 10.3.0, 1.28.7

Main TODOs are:

- Testing
- Make sure CUPS backends have correct permissions ([USB currently not working](https://github.com/OpenPrinting/cups-snap/issues/7)).
- Turn classic CUPS drivers into Printer Application
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap.

## PostScript Printer Application
**The [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) is also in the [Snap Store](https://snapcraft.io/ps-printer-app) now!**

You can simply install it now and it is immediately ready to use, no manual connection of any interfaces is requiredas [everything got approved](https://forum.snapcraft.io/t/request-postscript-printer-application-snap-ps-printer-app-auto-connection-to-avahi-control-raw-usb-interfaces/). After installation you only need to set up your printers via the web interface or command line interface. If needed you can also upload your own PPD file into the Application. See the [README.md](https://github.com/OpenPrinting/ps-printer-app/blob/master/README.md) for detailed instructions.

**Update**

**Call for Testing**

I have now posted a "[Call for Testing](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)" for both the CUPS Snap and the PostScript Printer Application on [Discourse](https://discourse.ubuntu.com/c/desktop/snap-store/). Please try everything out, following the instructions and post your experience there.

The only new feature added after the February news post is:

- In the Snap use [pyppd](https://github.com/OpenPrinting/pyppd) to compress the included PPD files from 60 MB in tarballs (`.tar.gz`) to 5 MB in pyppd'd self-extracting archives.

Otherwise a lot of testing of the Snap was done and a lot of things got fixed:

- A patch on PAPPL allows the command line control of the server as normal user while the server is running as root (daemons auto-started by a Snap run as root). This change was also [submitted upstream](https://github.com/michaelrsweet/pappl/issues/148).
- Removed unneeded plugs "network-manager" and "log-observe"
- In the Snap make the temporary directory available for non-root users
- Set a default spool directory and allow changing via environment variable to not create a new directory in the `$TMPDIR` with every instance and leave them dandling around.
- Silenced warning in Snap build.
- Correction for build failure in Snap Store
- Updates to keep working after PAPPL API changes

Unfortunately, some things in the PostScript Printer Application are not working as expected due to bugs in PAPP:

- [USB connection only uni-directional](https://github.com/michaelrsweet/pappl/issues/153) (This especially leads to polling option defaults and installable accessory configuration not working)
- [When creating a print queue via command line, I cannot auto-select the driver](https://github.com/michaelrsweet/pappl/issues/154) (You cannot use `-m auto` when creating a print queue via command line)
- [Web interface: After adding a queue via command line the frontend does not show all queues](https://github.com/michaelrsweet/pappl/issues/155) (Display glitch of the web interface)
- ["autoadd" via command line works but gives 3 times "ps-printer-app: Unable to get IEEE-1284 device ID: Pipe error"](https://github.com/michaelrsweet/pappl/issues/156) (Principally it works, but ugly messages appear on the screen)

With appropriate features added to PAPPL we will be able to also add the following:
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

## User experience: Automatic printer setup, printer setup tools
I have also looked into how to solve the [printer auto-setup problem](https://github.com/michaelrsweet/pappl/pull/36) in PAPPL and this way in the Printer Applications. Therefore I have started a [discussion](https://github.com/michaelrsweet/pappl/pull/36#issuecomment-783533960) on the [OpenPrinting printing-architecture](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) list.

First problem is if there is more than one Printer Application (with each having its individual auto-setup) installed (for example by the OS distribution) each one wants to poll the device ID from the newly plugged Printer Application at the same time, making perhaps the "best" Printer Application not getting it ...

We discussed also having a central utility doing the auto-setup and ran into the problem that if more than one installed Printer Application supports the printer in question which Printer Application to select for creating the queue.

so we concluded that as driverless IPP printers will be the standard and non-driverless printers which need a Printer Application are either legacy or specialty auto-setup is not that important. We only need some way to guide the user on which Printer Applications are available locally and in the Snap Store.

So to not let the users with non-driverless-IPP printers alone and lost I think the desktop should continue to have a printer tool to guide users to find the correct Printer Application, and so started a second thread ["Future of Printer Setup Tools"](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003976.html) suggesting how a printer setup tool could look like in the future:

- Main window: Instead of having a list of our local CUPS queues we have a list of installed Printer Applications, which printers are set up with them and buttons leading to web interface, IPP System Service panel, printer options, ... All information obtained through Avahi/DNS-SD, could be expanded to a general network service lister (think about also having a button leading to the web interface of your router).

- Add-printer wizard: Replaced by a list of discovered non-driverless printers (USB, network) and after selecting one you get a list with installed Printer Applications supporting it with button to open the web interface and also a button to do a fuzzy search of make/model in the Snap Store.

[Johannes Meixner from SUSE](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003977.html) suggested to reach this also by a button in the print dialog.

**We need people to do GUI work for the new printing/scanning architecture.**

Related to this I posted two feature requests on PAPPL:

- [Extend "ps-printer-app drivers" to also show supported device IDs](https://github.com/michaelrsweet/pappl/issues/157)
- [Add subcommand to simply ask whether a given printer is supported](https://github.com/michaelrsweet/pappl/issues/158)

Also, having [hardware-signature-based Snap Store search](https://forum.snapcraft.io/t/hardware-associated-snaps-snap-store-search-by-hardware-signature/) would be great here.

## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

[2.3.3op2](https://openprinting.github.io/cups-2.3.3op2/) is the last release of the 2.3.x series. To mark that CUPS upstream development is now under OpenPrinting, we start 2.4.x.

Ubuntu Hirsute Hippo (21.04) will ship with CUPS 2.3.3op2, also the CUPS Snap currently uses this version.

```
CUPS v2.4rc1 (Pending)
----------------------

- Added support for CUPS running in a snapcraft snap.
- Added extra check for administrative inquiries from snapped clients.
- The `testlang` unit test program now loops over all of the available locales
  by default (Issue #85)
- The `cupsfilter` command now shows error messages when options are used
  incorrectly (Issue #88)
- Documentation fixes (Issue #92)
```

## cups-filters
Currently released is [1.28.7](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.7).

Many things were going on in the other projects, so here we have only one bug fix, raising the timeout of cups-browsed's `implicitclass` backend from 20s to 60s, to make printing more reliable if cups-browsed is very busy.

```
CHANGES IN V2.0.0

	- implicitclass: Raise timeout for cups-browsed's answer from
	  20s to 60s (Pull request #346).
```

```
CHANGES IN V1.28.8

	- implicitclass: Raise timeout for cups-browsed's answer from
	  20s to 60s (Pull request #346).
```

## PAPPL
Currently released is [1.0.2](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.2).

The release fixes many bugs.

PAPPL development has continued, approaching 1.0.3.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.1b1
-----------------

- Added `PAPPL_SOPTIONS_NO_TLS` option to disable TLS support.
- Added Wi-Fi callbacks to support configuration over IPP-USB (Issue #45)

Changes in v1.0.3
-----------------

- The Set-Printer-Attributes operation did not save changes to
  "printer-contact-col".


Changes in v1.0.2
-----------------

- Documentation updates (Issue #140)
- The Set-Printer-Attributes operation now properly validates the values of
  "xxx-default" attributes (Issue #93)
- Changes to ready (loaded) media are now validated (Issue #94)
- The `papplSystemSetVersions` function now allows changes while the system is
  running (Issue #123)
- The printing defaults page no longer shows a media chooser when there is a
  single source (Issue #125)
- The DNS-SD support functions did not handle when the Avahi daemon is not
  running (Issue #129)
- The printing defaults web page now reports whether the media is borderless
  (Issue #138)
- The `papplClientGetForm` function did not support files larger than 64k
  (Issue #139)
- Deleting and adding a printer with the same name will cause a crash
  (Issue #141)
- Fixed a deadlock issue when calling the `papplPrinterSet...` functions from
  an iterator callback (Issue #143)
- The "Printing Defaults" web page did not show an error message if the
  defaults could not be validated (Issue #146)
- The `server` sub-command now enables TCP/IP connections using the default
  hostname; auto-started servers still disable TCP/IP connections by default
  (Issue #147)
- The `papplPrinterSetDriverDefaults` function did not validate the defaults
  against the actual driver data.
- The IPP interface no longer allows the Create-Printer operation for single
  queue applications.
- Stopping a printer application with `SIGTERM` now behaves the same as sending
  a Shutdown-System request.
- Added more unit tests to testpappl.
- Added better management of the USB and raw printing threads for each printer.
- Added better error reporting for USB printers.
- `papplDeviceOpen` did not copy the device ID callback.
- `papplDeviceList` and `papplDeviceOpen` did not send errors to stderr when a
  `NULL` error callback was specified.
```
