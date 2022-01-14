---
title: OpenPrinting News - December 2021
layout: single
author: Till
excerpt: Testing and bug fixing to approach cups-filters 2.x, CUPS 2.4.0, PAPPL 1.1rc1
---
This month's news post is somewhat shorter, as not many important features, milestones, or great new ideas we have to talk about. I mainly tested cups-filters and fixed bugs to approach its 2.0.0 release.

But we are not completely without milestones, as **CUPS 2.4.0** got released as the **first stable feature release of CUPS on OpenPrinting**. We are back with a new stable release series of CUPS and Ubuntu 22.04 LTS and probably many other distributions will come with a 2.4.x version of CUPS.

And also keep in mind that for 2022 **everyone** can participate as code contributor in the Google Summer of Code, not only students. See [last month's edition](https://openprinting.github.io/OpenPrinting-News-November-2021/#google-summer-of-code-2022). So if you like to participate, or at least be part of the OpenPrinting developer community, please speak up (`till at linux dot com`).

We need also project ideas for the GSoC 2022. Note that there are 2 sizes now, 3 months like on GSoC 2020 and before and 6 weeks like on GSoC 2021.


## CUPS-driver-retro-fitting Printer Applications
On further testing I have found the following issues and corrected them:

- Removed now unneeded workaround for missing `mdns4_minimal` in core20, as this is fixed in released core20 now ([commit](https://github.com/OpenPrinting/ghostscript-printer-app/commit/67a1962cad2b))
- Adjusted the systemd timeout for shutdown (`TimeoutStopSec`) in the Printer Application Snaps, to be longer than PAPPL's internal timeout on shutdown, to assure regular shutdowns instead of killing (`kill -9 ...`) the Printer Application ([GitHub Issue](https://github.com/OpenPrinting/ghostscript-printer-app/issues/4)).


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but we have again progress here.

Only few things still need to get adjusted, once to prevent breaking the AppArmor profile by the CUPS socket path specified in the client Snaps ([discussion](https://github.com/snapcore/snapd/pull/10427#discussion_r740962760)) and second, the best location for the CUPS socket to do not interfere with other files ([discussion](https://github.com/snapcore/snapd/pull/10427#discussion_r757582011)).

I got asked to do two further real-life tests of the new snapd to see whether the new `cups` interface is working correctly. Here are the results of the [second test](https://github.com/snapcore/snapd/pull/10427#issuecomment-958500321) and the [third test](https://github.com/snapcore/snapd/pull/10427#issuecomment-977790163). Generally, all tests showed that the interface is correctly working, but in the third test, done after snapd having gotten a facilty to set the `CUPS_SERVER` environment variable automatically in client Snaps, the interface only worked after re-connecting it after the snapd update.

So we come closer now.

Main TODOs are:

- Complete the `cups` interface in snapd.
- Testing
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|3425|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|856|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|1914|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|689|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|2414|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|1718|


## CUPS
Currently released is [**2.4.0**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.0).

This is the **first feature release of CUPS on OpenPrinting**. Thanks to Zdenek Dohnal (RedHat) for having taken the role of the release manager for the CUPS 2.4.x series. See our [development roadmap](https://openprinting.github.io/OpenPrinting-News-October-2021/#cups) posted earlier here for details.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with CUPS 2.4.x, if all works well, as Snap. The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

[2.4.0](https://github.com/OpenPrinting/cups/releases/tag/v2.4.0)

CUPS 2.4.0 is the latest stable OpenPrinting CUPS release. Among the changes from beta and release candidate the stable release adds two new configuration options for optimizing cupsd setup on servers and several other changes.

```
Changes in CUPS v2.4.0 (29th November 2021)
-------------------------------------------

- Added configure option --with-idle-exit-timeout (Issue #294)
- Added --with-systemd-timeoutstartsec configure option (Issue #298)
- DigestOptions now are applied for MD5 Digest authentication defined
  by RFC 2069 as well (Issue #287)
- Fixed compilation on Solaris (Issue #293)
- Fixed and improved German translations (Issue #296, Issue #297)
```

## cups-filters
Currently released is [1.28.10](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10).

We are continuing to polish and to fix bugs for the 2.0.0 release. I have especially tested the new [`universal`](https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023) filter function and by that found some bugs in the filter function itself and in cups-filters in general. Also switching the `implicitclass` CUPS backend of cups-browsed over to use filter functions instead of external filter executables revealed some bugs.

- Forgotten to include `bannertopdf()`([commit](https://github.com/OpenPrinting/cups-filters/commit/9f7488239ed8e4b)) and its MIME rule ([commit](https://github.com/OpenPrinting/cups-filters/commit/f6fd85071de)) in the 'universal()` filter function.
- Added CUPS conversion rule files ([commit](https://github.com/OpenPrinting/cups-filters/commit/2db75852fe3)) separately for individual CUPS filters and `universal()`
- Make `universal()` not fail if the filter chain turns out to be empty ([commit](https://github.com/OpenPrinting/cups-filters/commit/3ee9e7885bcee01a9dc8)).
- Let `universal()` use the log function ([commit](https://github.com/OpenPrinting/cups-filters/commit/b30528cf85fa15)).
- Added way to silence the `driverless` utility by environment variable so that the Legacy Printer Application can suppress its report of driverless printers ([commit](https://github.com/OpenPrinting/cups-filters/commit/f03a9eead74f)).
- `pdftopdf()` did not correctly scale and rotate the pages according to the `print-scaling` job IPP attribute, especially on documents which contain pages of different sizes. Fixed also N-up printing (N pages per sheet), and handling of job option/attributes ([commit](https://github.com/OpenPrinting/cups-filters/commit/4aaf23aae36)).
- Made sure that all filter functions use their input/output file descriptors and log functions get used everywhere, not stdin/stdout/stderr, nowhere call `exit()`, code clean-up and simplification, feeding all needed information by parameters, ... things which got overlooked when converting external executable filters to library functions.
- In the `universal()` filter function do not call `pdftopdf()` on input data in `application/vnd.cups-pdf`, this data is considered as already treated by `pdftopdf()` ([commit](https://github.com/OpenPrinting/cups-filters/commit/7ee71391)).
- Fixed environment variable handling in `filterExternalCUPS()` ([commit](https://github.com/OpenPrinting/cups-filters/commit/630343cc)).
- Created a debug helper filter function to check data passing between two filter functions in a chain ([`filterTee()`](https://github.com/OpenPrinting/cups-filters/commit/2443a1c4e87)).
- Accepted a [Pull Request](https://github.com/OpenPrinting/cups-filters/pull/433) making sure that when the `driverless` utility communicates with a device with IPPS URI the communication is encrypted.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will most probably come with cups-filters 2.x. The CUPS Snap currently uses 1.28.10. The Printer Application Snaps use the current GIT master of cups-filters.

## PAPPL
Currently released is [1.1rc1](https://github.com/michaelrsweet/pappl/releases/tag/v1.1rc1).

> The release candidate for PAPPL v1.1 is now available for download. PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10 and higher.
>
> Changes in 1.1rc1 include:
>
> Fixed a bug in the printer configuration web page.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

```
Changes in v1.1rc1
------------------

- Fixed a bug in the printer configuration web page.
```

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
