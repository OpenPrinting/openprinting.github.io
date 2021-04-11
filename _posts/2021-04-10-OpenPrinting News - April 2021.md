---
title: OpenPrinting News - April 2021
layout: single
author: Till
excerpt: OpenPrinting Summit/PWG Meeting, GSoC, GSoD, CUPS Snap proxy mode, PostScript Printer Application, CUPS
---
## OpenPrinting Summit/PWG Meeting

On May 4-7 we will have our annual meeting again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2021-virtual.html).

Because of the Corona virus situation we will again have a virtual meeting, with the side effect that everyone can participate, without needing to travel. Instructions for participation via WebEx are on the meeting's page.

The [agenda](https://www.pwg.org/chair/meeting-info/may-2021-virtual.html) is already put up, with the OpenPrinting part on the first two days. Links to the slides will be added on the meeting page and we will link to any summary/outcome here in the next month's news.

## Google Summer of Code 2021
With the Linux Foundation being accepted as mentoring organization we are now receiving the student's proposals until the deadline on April 13 ([Timeline](https://developers.google.com/open-source/gsoc/timeline)). After that we have to select the students/projects we want to work with.

OpenPrinting's project ideas are [posted](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2021-openprinting-projects), but further ideas are still welcome. Note that the projects are half-length this year, 175 hours instead of 350 hours (see our [October news](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021)). Larger projects we should run in the Linux Foundation Mentoring Program instead of in the GSoC.

## Google Season of Docs 2021
We have also applied as mentoring organization in this year’s [Google Season of Docs](https://developers.google.com/season-of-docs/).

In the Google Season of Docs technical writers apply for documentation writing projects at free software organizations. This way the organizations get high-quality documentation for their software and technical writers get experience in the free software world.

Our project this year is [User and Developer Documentation for cups-filters](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2021-openprinting-projects). With this we want to get complete user and developer documentation for cups-filters 2.x.

## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)**

Now, with the CUPS Snap in the Snap Store and [all interfaces connecting automatically](https://forum.snapcraft.io/t/request-cups-snap-cups-auto-connection-to-of-cups-cups-control-to-cups-admin-and-also-of-the-network-manager-observe-interface/) we started discussing [how the `cups` interface for client Snaps is supposed to work](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/) and found out that if a Snap which plugs `cups` for printing is installed on an older Ubuntu or a non-Ubuntu distribution with classically installed CUPS that there is no protection against administrative action on CUPS, as the CUPS damon has no Snap mediation (CUPS daemon checks whether client is Snap and then requires `cups-control` for admin tasks).

To close this security hole snapd developer [Ian Johnson](https://forum.snapcraft.io/u/ijohnson/summary) picked up some [weird hypothetic idea from me](https://github.com/snapcore/snapd/pull/10023#issuecomment-799425764) and [suggested to implement it this way](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/3?u=till.kamppeter): The snapped cupsd (has Snap mediation) as a firewall for the classic cupsd on the system (does not always have Snap mediation)!

So after some weeks of thinking about the best way to implement it and of coding and testing the [**proxy mode of the CUPS Snap**](https://github.com/OpenPrinting/cups-snap/blob/master/README.md#proxy-mode) got born!

If a Snap of an application which prints (plugs `cups`) is installed, the CUPS Snap gets force-installed like a package dependency ("default-provider" for [content interface](https://snapcraft.io/docs/content-interface)) and the snapped application only communicates with the CUPS Snap for printing, never with a classically installed CUPS if one is there. The CUPS Snap works stand-alone as system's CUPS if there is no classic CUPS and it goes into the new proxy mode if there is a classic CUPS.

The snapped CUPS in proxy mode mirrors all the queues of the classic CUPS, copying the PPD options for the client's print dialogs to show all options, passes on jobs to the classic CUPS, and lets the classic CUPS apply its printer drivers so that the user continues with his habitual queues and drivers. This all goes automatically and transparently without user intervention needed, nor any changes being done on the classic CUPS.

See the [technical details of the proxy mode](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/16?u=till.kamppeter).

The content interface is not yet implemented, but it will be my very next step on the CUPS Snap.

Features and fixes in the past month:

- Added the proxy mode - See above
- Switched to GitHub master snapshot of CUPS - As the Snap support code for CUPS is upstream now no patches for CUPS are needed any more! Fixed in CUPS:
  - Grant access without calling `snapctl` when the client is our Snap
  - The `usb` CUPS backend needs to run as root, [set permissions appropriately](https://github.com/OpenPrinting/cups-snap/issues/7)
- Redefined plugs and slots to standard names `cups` and `cups-control`, tested and fixed to have everything work as expected
- Removed more unneeded plugs from the utilities in the `apps:` section of `snapcraft.yaml`
- Updated version of upstream source package QPDF to 10.3.1 and of cups-filters to 1.28.8
- Install the default `cups-browsed.conf` on the correct place in the Snap
- README.md - Updated for no need of manual interface connections, interface names, deactivating classic CUPS, proxy mode, new discussion links

Main TODOs are:

- Implement the content interfaces
- Testing
- Turn classic CUPS drivers into Printer Application
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap.

## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)**

Nothing really spectacular happened here, only bug fixes, two crashers got fixed after bug reports from a user:

- [Crash on typo in margin handling code](https://github.com/OpenPrinting/ps-printer-app/issues/3)
- [Crash on boolean vendor options in PPD](https://github.com/OpenPrinting/ps-printer-app/issues/4)

The PostScript Printer Application (and any other Printer Application) should now [correctly tell that a print queue name is invalid](https://github.com/michaelrsweet/pappl/issues/161) when one with special characters or starting with a digit is entered, instead of telling that a queue with this name already exists.

Unfortunately, some things in the PostScript Printer Application are not working as expected due to bugs in PAPPL:

- [USB connection only uni-directional](https://github.com/michaelrsweet/pappl/issues/153) (This especially leads to polling option defaults and installable accessory configuration not working)
- [When creating a print queue via command line, I cannot auto-select the driver](https://github.com/michaelrsweet/pappl/issues/154) (You cannot use `-m auto` when creating a print queue via command line)
- [Web interface: After adding a queue via command line the frontend does not show all queues](https://github.com/michaelrsweet/pappl/issues/155) (Display glitch of the web interface)
- ["autoadd" via command line works but gives 3 times "ps-printer-app: Unable to get IEEE-1284 device ID: Pipe error"](https://github.com/michaelrsweet/pappl/issues/156) (Principally it works, but ugly messages appear on the screen)

For creation of GUI tools to easily find Printer Applications and set up printers we would need these improvements:

- [Extend "ps-printer-app drivers" to also show supported device IDs](https://github.com/michaelrsweet/pappl/issues/157)
- [Add subcommand to simply ask whether a given printer is supported](https://github.com/michaelrsweet/pappl/issues/158)

With appropriate features added to PAPPL we will be able to also add the following:
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 15 months.

Ubuntu Hirsute Hippo (21.04) will ship with CUPS 2.3.3op2, the CUPS Snap uses the current GIT master.

```
CUPS v2.4rc1 (Pending)
----------------------

- Added support for CUPS running in a Snapcraft snap.
- Added support for AirPrint and Mopria clients (Issue #105)
- Added configure support for specifying systemd dependencies in the CUPS
  service file (Issue #144)
- Added several features and improvements to `ipptool` (Issue #153)
- The `ipptool` command now correctly reports an error when a test file cannot
  be found.
- Fixed Kerberos authentication for the web interface (Issue #19)
- The ZPL sample driver now supports more "standard" label sizes (Issue #70)
- The IPP backend did not return the correct status code when a job was canceled
  at the printer/server (Issue #74)
- The `testlang` unit test program now loops over all of the available locales
  by default (Issue #85)
- The `cupsfilter` command now shows error messages when options are used
  incorrectly (Issue #88)
- The PPD functions now treat boolean values as case-insensitive (Issue #106)
- Temporary queue names no longer end with an underscore (Issue #110)
- The USB backend now runs as root (Issue #121)
- Added pkg-config file for libcups (Issue #122)
- Fixed a PPD memory leak caused by emulator definitions (Issue #124)
- The scheduler now includes the `[Job N]` prefix for job log messages, even
  when using syslog logging (Issue #154)
- Added support for locales using the GB18030 character set (Issue #159)
- The IPP parser now errors out when reading a member attribute outside a
  collection.
- `httpReconnect2` did not reset the socket file descriptor when the TLS
  negotiation failed (Apple #5907)
- `httpUpdate` did not reset the socket file descriptor when the TLS
  negotiation failed (Apple #5915)
- The IPP backend now retries Validate-Job requests (Issue #132)
- Documentation fixes (Issue #92, Issue #163)
- Localization updates (Issue #123, Issue #129, Issue #134, Issue #146,
  Issue #164)
- USB quirk updates (Apple #5766, Apple #5838, Apple #5843, Apple #5867)
- Web interface updates (Issue #142)
- The `ippeveprinter` tool now automatically uses an available port.
- Deprecated cups-config (Issue #97)
- Deprecated Kerberos (`AuthType Negotiate`) authentication (Issue #98)
- Removed support for the (long deprecated and unused) `FontPath`,
  `LPDConfigFile`, `KeepAliveTimeout`, `RIPCache`, and `SMBConfigFile`
  directives in `cupsd.conf` and `cups-files.conf`.
```

## cups-filters
Currently released is [1.28.8](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.8).

Many things were going on in the other projects, so here we have only some bug fixes, overtaken from CUPS and also from issues fixed by students applying for GSoC 2021 as assignments.

[1.28.8](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.8):

Bug fix release, to fix several different issues (see below)

Ubuntu Hirsute Hippo (21.04) will ship with cups-filters 1.28.8, also the CUPS Snap currently uses this version.

```
CHANGES IN V2.0.0

        - libppd: Fixed PPD memory leak caused by "emulators" field
          not freed (OpenPrinting CUPS issue #124).
        - libcupsfilters: Made check whether the driverless PPD to
          generate should be a fax out PPD more reliable (Issue #343).
        - foomatic-rip: Options in the 5th command line argument of
          the CUPS filter command line are separated only by white
          space and not by comma, also make sure that an option "none"
          is not considered a custom page size (Issue #348).
        - libppd: Make "True" in boolean options case-insensitive
          (OpenPrinting CUPS pull request #106).
```

```
CHANGES IN V1.28.8

        - libcupsfilters: Made check whether the driverless PPD to
          generate should be a fax out PPD more reliable (Issue #343).
        - foomatic-rip: Options in the 5th command line argument of
          the CUPS filter command line are separated only by white
          space and not by comma, also make sure that an option "none"
          is not considered a custom page size (Issue #348).
        - implicitclass: Raise timeout for cups-browsed's answer from
          20s to 60s (Pull request #346).
        - libcupsfilters: In the PPD generator really give priority to
          Apple Raster against PDF (Issue #331).
```

## PAPPL
Currently released is [1.0.2](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.2).

PAPPL development has continued, approaching 1.0.3.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.0.3
-----------------

- Fixed testpappl on systems without Avahi running (Issue #159)
- Adding a printer now works for names with special characters (Issue #161)
```
