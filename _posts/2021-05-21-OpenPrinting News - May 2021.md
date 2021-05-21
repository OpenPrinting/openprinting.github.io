---
title: OpenPrinting News - May 2021
layout: single
author: Till
excerpt: OpenPrinting Summit/PWG Meeting, GSoC, GSoD, CUPS Snap proxy mode, PostScript Printer Application, CUPS
---
## OpenPrinting Summit/PWG Meeting

On May 4-7 we will had our annual meeting, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2021-virtual.html). Because of the Corona virus situation we again had a virtual meeting.

Smith Kennedy from HP wrote up a great [summary](https://www.pwg.org/blog/pwg-may-2021-f2f-summary.html) of the meeting. There are also the [minutes](https://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/OP-Summit-Minutes-20210504.htm) from Ira McDonald.

The slides of all presentations are linked on the [agenda](https://www.pwg.org/chair/meeting-info/may-2021-virtual.html) of the event.

## Google Summer of Code 2021
Google has [officially announced](https://summerofcode.withgoogle.com/projects/) the accepted student projects. [The Linux Foundation got 19 student slots](https://summerofcode.withgoogle.com/organizations/6068823263805440/) and so could accommodate all students they considered for mentoring. With this we can also run 5 student projects for OpenPrinting:

**cups-filters: Make sure all filter functions work without PPD files**<br>
Student: Suraj Kulriya<br>
Mentors: Jai Luthra, Till Kamppeter, Dheeraj Yadav

**cups-filters: Convert filters to filter functions**<br>
Student: Pratyush Ranjan<br>
Mentors: Till Kamppeter, Dheeraj Yadav

**cups-filters: Create a single, universal CUPS filter to replace the chain of individual filters**<br>
Student: Pranshu Kharkwal<br>
Mentors: Till Kamppeter, Dheeraj Yadav

**GUI for listing and managing available IPP Print/Scan services (or DNS-SD-advertised network services in general)**<br>
Student: Divyasheel<br>
Mentors: Till Kamppeter

**Firmware and other file handling in PAPPL**<br>
Student: Bhavna Kosta<br>
Mentors: Jai Luthra, Till Kamppeter

## Google Season of Docs 2021
With our application for this year’s [Google Season of Docs](https://developers.google.com/season-of-docs/) we did not get accepted.

## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)**

As [reported in the April news](https://openprinting.github.io/OpenPrinting-News-April-2021/#cups-snap) I have worked out a security concept with the snapd developers to print from user application Snaps without allowing administrative access to CUPS. With this we can let developers upload applications to the Snap Store which automatically connect to the `cups` interface for printing, without the risk that such applications mess with CUPS.

We have discussed the concept further on the [snapcraft.io forum](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/39?u=till.kamppeter) (this post and the following) to work out the details. Now only the finalization in snapd is needed. The final concept is [here](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter), only the paths for the CUPS socket needed to get adjusted. 

I have also [presented my work on the CUPS Snap](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-filters-cups-snap-ipp-usb-and-more-2021.pdf) on the OpenPrinting Summit/PWG meeting. 

Features and fixes in the past month:

- The CUPS Snap is now based on [Ubuntu Core 20 and not Core 18 any more](https://github.com/OpenPrinting/cups-snap/commit/2fac99e69448e9f40b267233a276b65ae0a46dd1).
- The Core20 base Snap did not support mDNS host name lookup. This [got fixed now](https://github.com/snapcore/core20/pull/102) but the CUPS Snap also contains a [workaround](https://forum.snapcraft.io/t/no-mdns-support-in-snaps-should-core-have-a-modified-nsswitch-conf/7603/30?u=till.kamppeter).
- Added [libpaper support](https://github.com/OpenPrinting/cups-snap/commit/ffd94c144b).
- [Restricted the build architectures](https://github.com/OpenPrinting/cups-snap/commit/c4a473741126180a2c13dd52cda296ed7fdcb193) in the Snap Store to the actually supported ones: amd64, arm64, and armhf.
- Upgraded the built-in Ghostscript to [9.54](https://github.com/OpenPrinting/cups-snap/commit/54ae9f86c3a28dec60ecfb52293cc6488f329bc9).

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces
- Testing
- Turn classic CUPS drivers into Printer Applications
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap.

Up to now, the CUPS Snap got installed from the Snap Store **more than 1600 times!** Note that it is still only on the Edge channel, there is not yet an "official" release.

## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/)**

I have [presented my work on the PostScript Printer Application](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/ps-printer-app-2021.pdf) on the OpenPrinting Summit/PWG meeting and Michael Sweet has also given a presentation about [Printer Applications in general and PAPPL](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/printer-applications-may-2021.pdf). 

Features and fixes in the past month:

- Following the CUPS Snap also [switched to core20 and restricted build architectures](https://github.com/OpenPrinting/ps-printer-app/commit/c3dd2cd9fcae48640050d33a3803a50ab8ae618a) also here.
- Also here added the workaround for mDNS host name lookup as I did for the CUPS Snap.
- Added checking of the user’s location via locale-related environment variables and based on this use A4 or Letter as default paper size when a new print queue is created, also posted appropriate [feature request on PAPPL](https://github.com/michaelrsweet/pappl/issues/167).
- Applied a patch for a [PAPPL bug](https://github.com/michaelrsweet/pappl/issues/164) of changes of loaded media are not taken into account when printing.
- Updated the built-in QPDF to 10.3.1 and Ghostscript to 9.54.
- Some clean-up in `snapcraft.yaml`.

Unfortunately, some things in the PostScript Printer Application are not working as expected due to bugs in PAPPL:

- [USB connection only uni-directional](https://github.com/michaelrsweet/pappl/issues/153) (This especially leads to polling option defaults and installable accessory configuration not working)
- [When creating a print queue via command line, I cannot auto-select the driver](https://github.com/michaelrsweet/pappl/issues/154) (You cannot use `-m auto` when creating a print queue via command line)

For creation of GUI tools to easily find Printer Applications and set up printers we would need these improvements:

- [Extend "ps-printer-app drivers" to also show supported device IDs](https://github.com/michaelrsweet/pappl/issues/157)
- [Add subcommand to simply ask whether a given printer is supported](https://github.com/michaelrsweet/pappl/issues/158): This works for USB-connected devices now, but for network devices [a further fix is needed](https://github.com/michaelrsweet/pappl/issues/95).

With appropriate features added to PAPPL we will be able to also add the following:
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

Up to now, the PostScript Printer Application Snap got installed from the Snap Store **more than 1000 times!** Note that it is still only on the Edge channel, there is not yet an "official" release.

## Driverless Scanning

**Mopria has published the specifications of the eSCL scanning protocol!**

You can download it [here](https://mopria.org/spec-download).

Principally it is the same as AirScan, the scanning part of Apple's AirPrint.

As long as the hardware industry does not adopt IPP Scan, we can simply do our client/server scan architecture for Scanner Applications as snappable scanner drivers with eSCL.

See our [discussion thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003987.html) on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/thread.html). Please [subscribe here](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) to participate in the discussion.

**sane-airscan** got finally, two days before Final Freeze of Ubuntu Hirsute (21.04), [accepted](https://bugs.launchpad.net/ubuntu/+source/sane-airscan/+bug/1891682) into the main part of the distribution and so it is now in default desktop installation. **This will make the scanners in most modern multi-function printers, plus some stand-alone models (like Canon LIDE 300) work with Hirsute out-of-the-box**.

## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Michael Sweet [presented his plans on CUPS 2.4.x and 3.x](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2021.pdf) on the OpenPrinting Summit/PWG Meeting.

CUPS 2.4.x is supposed to get shared printers reporting all required attributes/keys/values, OAuth 2.0/OpenID authentication, pkg-config support, snapcraft support, "job-sheets-col" and better "media-col" attribute support, TLS and X.509 improvements, and deprecate cups-config and Kerberos authentication.

CUPS 3.x will be a major change in architecture, having the CUPS daemon split in two, a user daemon to handle local printing to USB printers and printers in the local network and a system daemon to share printers.

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 17 months.

Ubuntu Hirsute Hippo (21.04) comes with CUPS 2.3.3op2, the CUPS Snap and the PostScript Printer Application Snap use the current GIT master.

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
- Fixed reporting of printer instances when enumerating and when no options are
  set for the main instance (Issue #71)
- Reverted USB read limit enforcement change from CUPS 2.2.12 (Issue #72)
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
- Fixed a `DISPLAY` bug in `ipptool` (Issue #139)
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
- Added a workaround for Solaris in `httpAddrConnect2` (Issue #156)
- Now use a 60 second timeout for reading USB backchannel data (Issue #160)
- The USB backend now tries harder to find a serial number (Issue #170)
- Fixed `@IF(name)` handling in `cupsd.conf` (Apple #5918)
- Fixed a job history update issue in the scheduler (Issue #187)
- Fixed `job-pages-per-set` value for duplex print jobs.
- Documentation fixes (Issue #92, Issue #163, Issue #177, Issue #184)
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

I have also [presented my work on cups-filters](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-filters-cups-snap-ipp-usb-and-more-2021.pdf) on the OpenPrinting Summit/PWG meeting. 

I have removed the duplicate PPD generator (for CUPS queues for driverless IPP printers) from libppd, keeping the one in libcupsfilters. In this one I have cleaned up the obtaining of human-readable strings, taking them from a PWF IPP standard repository which is included in the translation string files of CUPS. See the [OpenPrinting mailing list thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003991.html) about this.

Currently I am working on improving the handling of color spaces and depths when printing to a driverless printer in Apple or PWG Raster foirmat. Formerly, the auto-generated PPD files of cups-filters provided choices in their "ColorModel" option to select color space and depth manually. To make the "ColorModel" option in the PPD mirror the "print-color-mode" IPP attribute and to make printing easier for the user I am switching to automatic selection. See [this thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003997.html) on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/thread.html).

Please [subscribe here](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) to participate in the discussions.

I have also merged Mohit Mohan's GSoC 2021 project of [multi-threading support for cups-browsed](https://github.com/mohitmo/GSoC-2020-Documentation) and fixed several bugs in cups-browsed and the filters, many were fixed by GSoC student candidates as assignments.

Ubuntu Hirsute Hippo (21.04) comes with cups-filters 1.28.8, also the CUPS Snap currently uses this version. The PostScript Printer Application Snap uses the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- libcupsfilters: In the ghostscript() filter function fixed
	  Ghostscript command line for counting pages as it took too
	  long on PDFs from evince when printing DjVu files (Issue
	  #354, Pull request #371, Ubuntu bug #1920730).
	- imagetopdf, imagetops, imagetoraster: Removed support for
	  asymmetric image resolutions ("ppi=XXXxYYY") as CUPS does
	  not support this (Issue #347, Pull request #361,
	  OpenPrinting CUPS issue #115).
	- cups-browsed: Added multi-threaded operation, the Avahi
	  resolver callback (which examines the remote printer,
	  registers it, checks whether we want a local queue for it,
	  adds it to a cluster, ...) and the creation/modification of
	  a local CUPS queue is now done in separate threads, so that
	  these processes can get executed in parallel to keep the
	  local queues up-to-date more timely and to not overload the
	  system's resources.  Thanks a lot to Mohit Mohan who did
	  this work as Google Summer of Code 2020 project
	  (https://github.com/mohitmo/GSoC-2020-Documentation).
	- cups-browsed: Always save "...-default" option entries
	  from printers.conf, regardless of presence or absense
	  of PPD file (Pull request #359).
	- cups-browsed: Start after network-online.target (Pull
	  request #360).
	- texttopdf: Set default margins when no PPD file is used
	  (Pull request #356).
```

```
CHANGES IN V1.28.9

	- cups-browsed: Always save "...-default" option entries
	  from printers.conf, regardless of presence or absense
	  of PPD file (Pull request #359).
	- cups-browsed: Start after network-online.target (Pull
	  request #360).
	- texttopdf: Set default margins when no PPD file is used
	  (Pull request #356).
```

## PAPPL
Currently released is [1.0.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.3).

Michael Sweet has given a presentation about [Printer Applications in general and PAPPL](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/printer-applications-may-2021.pdf) on the OpenPrinting Summit/PWG meeting. 

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

