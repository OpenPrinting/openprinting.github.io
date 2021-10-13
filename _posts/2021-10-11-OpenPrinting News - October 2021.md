---
title: OpenPrinting News - October 2021
layout: single
author: Till
excerpt: OpenPrinting/GSoC in Ubuntu Office Hours, Gutenprint Printer Appl., HPLIP Printer Appl. supports HP's plugin, new print GUI in Flutter, CUPS' release plan
---
## Ubuntu 21.10 (Impish Indri) is coming!
This Thursday, October 14, 2021, is Ubuntu release day again! Ubuntu 21.10!

Not a lot of new stuff in terms of printing (in addition to all printing- and scanning-related packages being up-to-date) but at least some nice things:
- The GTK print dialog finally lists virtual/temporary queues which CUPS generates for driverless IPP printers and Printer Applications. So if one uses only GTK=based applications, one does not need cups-browsed any more. But for now I continue providing cups-browsed, as Qt's print dialog is not cute.
- libcups is patched with the same algorithm for mapping standard IPP attributes to PPD option settings as I have created in libppd in cups-filters for the Printer Applications. So you can print to shared CUPS queues from your phone or IoT device and easily get the printout as you like it.

And there will be a virtual release party on [YouTube](https://www.youtube.com/watch?v=8ZTI7kdPFLc)!


## OpenPrinting Micro-Conference on the Linux Plumbers 2021
Our micro-conference on [Linux Plumbers 2021](https://www.linuxplumbersconf.org/event/11/) was a success! We discussed a lot on our development plans. Especially Michael Sweet has presented his plans on how to go on with the CUPS development and the next releases. See the CUPS section below, Bhavna Kosta has presented her GSoC work on scanning with PAPPL.

Here is the [Recording on YouTube](https://www.youtube.com/watch?v=5KogjLb1Hb4).

We had the following [sessions](https://linuxplumbersconf.org/event/11/sessions/113/#20210920):

**Introduction**<br>
Presenter: Aveek Basu<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1025/attachments/813/1531/OP_Presentation_Introduction_LinuxPlumbers2021.pdf)<br>

**CUPS 2.4/2.5**<br>
Presenter: Michael Sweet<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1023/attachments/737/1443/lpc-cups-2021.pdf)<br>

**CUPS 3.0**<br>
Presenter: Michael Sweet<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1023/attachments/737/1443/lpc-cups-2021.pdf)<br>

**Print Management GUI**<br>
Presenter: Till Kamppeter<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1027/attachments/774/1460/Print-Management-GUI.pdf)<br>

**Common Print Dialog Backends**<br>
Presenter: Till Kamppeter<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1028/attachments/762/1433/Common-Print-Dialog-Backends.pdf)<br>

**Printer/Scanner Driver Design and Development**<br>
Presenter: Till Kamppeter<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1030/attachments/758/1450/Designing-and-Packaging-Printer-and-Scanner-Drivers.pdf)<br>

**Scanning in PAPPL**<br>
Presenter: Bhavna Kosta<br>
[Slides](https://linuxplumbersconf.org/event/11/contributions/1029/attachments/785/1474/Scanning%20in%20PAPPL.pdf)<br>

**Closing Session**<br>
Presenter: Aveek Basu<br>


## The Summer of Printers in the Ubuntu Office Hours
On last week's episode of the Ubuntu Office Hours we have talked about our success with the Google Summer of Code (see also the announcement here [last month](/OpenPrinting-News-September-2021/#the-summer-of-printers-in-the-ubuntu-office-hours)). Not only me and Aveek Basu have been in the virtual studio but also two of our GSoC 2021 students, Divyasheel ([Printer management GUI](https://github.com/divyashk/GSOC21_summary)) and Pranshu Kharkwal ([Universal CUPS filter](https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023)).

Our conversation with host Monica Ayhens-Madon why and how we are doing GSoC, finding students, introducing them to our projects, getting them as developer community members, ... The students also told about their experience with us, we all have also given some tips to everyone who wants to participate in the GSoC, as student, mentor, or organization, and in the end we answered some spectator's questions from the Live Chat.

And here is the [Recording on YouTube](https://www.youtube.com/watch?v=diB3wm4HB1Y).

Thanks a lot to Monica Ayhens-Madon for inviting us!


## Print Management GUI in Flutter

As Michael Sweet and me talked about the New Architecture (Driverless IPP, Printer Applications, R. I. P. PPD files, ...) in the [Ubuntu Indaba in August](/OpenPrinting-News-Flash-Ubuntu-Indaba-and-Ghostscript-Printer-Application/#the-ubuntu-desktop-indabas-and-openprinting---the-recording) and I also mentioned that the printer setup tools need to change for this, the host, Heather Ellsworth from Canonical, brought me together with Frederik Feichtmeier, who is writing a replacement for the GNOME Control Center completely in the Dart programming language with the Flutter GUI toolkit ([the GitHub](https://github.com/Feichtmeier/settings)).

He showed much interest in making the printing part of his tool to work with the New Architecture. I introduced him into everything, giving him links to my news posts, our GutHub, the slides (especially [these ones](https://linuxplumbersconf.org/event/11/contributions/1027/attachments/774/1460/Print-Management-GUI.pdf)) and video of the Linux Plumbers conferences, the Indaba, the Office Hours, ...

His tool is a good candidate to soon get a printer management tool of the new generation.

Thanks a lot to Heather Ellsworth for this contact!


## pappl-retrofit - The CUPS Driver Retro-Fit Library
The retro-fitting library is practically complete and is used by 4 Printer Applications now: PostScript, Ghostscript, HPLIP, and Gutenprint. In the last month it only received some minor improvements, mainly to fit the needs of our 4 Printer Applications:

- If all page sizes of the PPD file have zero margins (especially no variants of the same size with and without margins) we do not show "Borderless" check boxes on the "Media" web interface any more, as there is nothing to switch ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/59864c05168)).
- Raster input resolutions are limited now, to avoid overloading clients by requesting extremely high PPD resolutions from them (Gutenprint PPDs have up to 5760x2880dpi). High quality is limitted to 1440dpi, normal to 720dpi, and draft to 360dpi. 1440dpi is good enough for drawings and 720dpi good enough for photos ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/59864c05168), [discussion](https://sourceforge.net/p/gimp-print/mailman/gimp-print-devel/thread/e24b2385-6576-a949-a40d-3786c8067520%40gmail.com/#msg37353830) on the [Gutenprint mailing list](https://lists.sourceforge.net/lists/listinfo/gimp-print-devel)).
- Remove duplicate entries in lists of media sizes, media types, and media sources ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/59864c05168)).
- Explicitly shut down CUPS backend on end of job before the dynamic data structure of the job is taken down, to avoid a crash when the Printer Application by itself closes the backend later ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/7b112e227b)).
- Allow setting callback functions for extra system and printer setup steps. Especially extra buttons and pages can be added to the web interface. We use this for example in the HPLIP Printer Application to add a web interface page to install HP's proprietary plugin, and to auto-update the plugin when starting the Printer Application ([commit](https://github.com/OpenPrinting/pappl-retrofit/commit/82f2f5671e)).

Further development of the library will go with the development of PAPPL and the needs of the Printer Applications. Especially the following features will get implemented/supported as soon as they are implemented/fixed in PAPPL:

- Support for scanning. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/commits/scanning) (Bhavna Kosta's [GSoC project](https://github.com/Bhavna2020/GSoC-2021)).
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142) (Patch already applied in the Printer Application Snaps). 
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).


## ipp-usb Snap
**[ipp-usb](https://github.com/OpenPrinting/ipp-usb) is also available as a Snap in the [Snap Store](https://snapcraft.io/ipp-usb) (229 downloads in the first 2 weeks) now!**

So making use of IPP-over-USB for easy driverless printing and scanning on USB-connected devices, one only needs to install the Snap and connect the printer to USB. You get an emulation of an IPP network printer and CUPS and SANE find it automatically.

The Snap also offers configurability, logging, and user-editable quirks as a classic installation (see [`README.md`](https://github.com/OpenPrinting/ipp-usb#the-ipp-usb-snap)).

Note that the Snap is usually not needed on Linux distribution which have ipp-usb already installed and in working condition. Only if you have problems with the installed ipp-usb or simply want to always have the newest version, install this Snap then. Make sure to uninstall the system's ipp-usb (and also the obsolete ippusbxd).

The challenge of making this Snap was to trigger `ipp-usb` on the appearing (and also the presence) of IPP-over-USB devices.

In the classic installation of ipp-usb (via `make install` or RPM/DEB package installation) a UDEV rules file and a systemd service file (in `systemd-udev/`) are installed, so that the system automatically triggers the launch of `ipp-usb` when an appropriate device is connected or already present. A Snap is not able to do so. It cannot install any files into the system. It can only bring its own, static file system and create files only in its own state directory. These locations are not scanned for UDEV rules.

So the Snap must discover the devices without its own UDEV rules, but it still can use UDEV. The trick is to do a generic monitoring of UDEV events and filtering out the USB devices with IPP-over-USB interface (7/1/4). If such a device appears, we trigger an `ipp-usb` launch. We also check on startup of the Snap whether there is such a device already and if so, we also trigger an `ipp-usb` launch.

`ipp-usb` is run, as in the classic installation, with `udev` argument. This way it stops by itself when there is no device any more (and we do not need to observe the disappearal events of the devices) and it is assured that only one single instance of `ipp-usb` is running.

To do this with low coding effort I use the UDEV command line tool `udevadm` in a shell script (`snap/local/run-ipp-usb` in the [source repository](https://github.com/OpenPrinting/ipp-usb/blob/master/snap/local/run-ipp-usb)). Once it runs in `monitor` mode to observe the UDEV events. Then we parse the output lines to only consider the ones for a device appearing and run `udevadm info -q property` on each device path, to get the properties and filter the 7/1/4 interface. In the beginning we use `udevadm trigger` in dry-run mode to find the already passed appearal event of a device which is already present. So the shell script is an auxiliary daemon to start ipp-usb when needed.

We use the same method in the [HPLIP Printer Application](#hplip-printer-application) to automatically load firmware files into USB devices.

See also the [`README.md`](https://github.com/OpenPrinting/ipp-usb#the-ipp-usb-snap) file and the "[How to add or workaround a udev rule](https://forum.snapcraft.io/t/how-to-add-or-workaround-a-udev-rule/)" thread on the snapcraft.io forum.

I came to the idea with `udevadm monitor` by myself, but Oliver Grawert ("ogra" in the snacraft.io thread) came to the same idea earlier. I got only aware of it by him reacting to this thread.


## CUPS-driver-retro-fitting Printer Applications
On all the 4 currently available retro-fitting Printer Applications, PostScript, Ghostscript, HPLIP, and Gutenprint, the following improvements were done:
- **No log rotation:** As PAPPL rotates already after a rather small portion of log, we decided to de-activate PAPPL's log rotation completely in the Snaps. To avoid filling up the disk, the default log level is "Error" (can be changed in the web interface of the Printer Application).
- **Maximum of 256 instead 32 vendor-specific options in PAPPL:** As the Snaps of the Printer Applications build PAPPL by themselves, I have patched the hard-coded maximum for the number of vendor-specific options in PAPPL (a single number) as many PPD files (especially Gutenprint but also some high-end PostScript printers) have more options. This assures that always all options get available. See also our [discussion](https://sourceforge.net/p/gimp-print/mailman/gimp-print-devel/thread/e24b2385-6576-a949-a40d-3786c8067520%40gmail.com/#msg37353830) on the [Gutenprint mailing list](https://lists.sourceforge.net/lists/listinfo/gimp-print-devel).
- **Use CUPS' backends and not PAPPL's:** This gives the following improvements:
  - Quirk workarounds for USB printers with compatibility problems are used. The quirk rules can get edited or new rule files added in `/var/snap/*-printer-app/common/usb/`
  - Additional network protocols: IPP, IPPS, LPD. Especially one can send PostScript output to the printer via encrypted IPPS.
  - The SNMP discovery can get configured via `/var/snap/*-printer-app/common/cups/snmp.conf`
- **Stop building libjpeg9 in the Snaps:** The libjpeg8 from Ubuntu Core 20 works well enough and the Snap Store's build servers have difficulties to load the upstream source tarball from the original web site, requiring triggering several rebuilds manually until the Snap gets into the Snap Store. The libjpeg9 build was overtaken from the [hp-printer-app](https://github.com/michaelrsweet/hp-printer-app) Snap (where it also had been removed later).

I had also posted a [request for the Snap Store allowing auto-connections of all interfaces of the Printer Application Snaps](https://forum.snapcraft.io/t/request-ghostcript-hplip-and-gutenprint-printer-application-snaps-ipp-usb-snap-ghostscript-printer-app-hplip-printer-app-gutenprint-printer-app-ipp-usb-auto-connection-to-avahi-control-raw-usb-hardware-observe-interfaces/) and it got approved. So the Snaps can get easily installed from the Snap Store.

## Printer Applications in the OpenPrinting printer/driver database
To help users finding the correct drivers for their printers we always had the [OpenPrinting printer/driver compatibility database](https://www.openprinting.org/printers/). Now, as most of the legacy drivers listed there are in one of the four retro-fitting Printer Applications, we have now links to the appropriate Printer Application in each of the [driver entries](https://www.openprinting.org/drivers/) of drivers which are contained in one of the Printer Applications. So now people can finally install the desired driver on practically any Linux distribution ([HPLIP](https://www.openprinting.org/driver/hplip/), [Gutenprint](https://www.openprinting.org/driver/gutenprint/), [pxlcolor](https://www.openprinting.org/driver/pxlcolor/), [hl7x0](https://www.openprinting.org/driver/hl7x0/), [Ricoh PostScript](https://www.openprinting.org/driver/Postscript-Ricoh/)).


## Gutenprint Printer Application
**[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app) in the [Snap Store](https://snapcraft.io/gutenprint-printer-app), 520 installations via Snap Store**

One of the most important printer driver suites in free software has made it into a Printer Application (and also into the Snap Store) now. It is known for its high output quality, adjustability, and support for third-party papers and ink sets. Now one can easily install its newest version on nearly any Linux distribution and easyily print from any IPP-capable device (like phones) but adjust all its options via web interface.

It supports more than 3000 different printer models, especially inkjet printers from Epson and Canon, dye-sublimation photo printers, PCL 4/5c/e laser printers, but also some other printers. In addition it provides generic support for the different PCL flavors, everything which is supported by the [Gutenprint CUPS Raster driver](http://gimp-print.sourceforge.net/). Some of these printers are probably also driverless IPP printers, but you can still use this Printer Application then as perhaps you could get better output quality.

The challenge when encapsulating this driver in a PAPPL-based Printer Application was that some PPDs (higher-end Epson inkjets) have around 120 options whereas PAPPL only supports 32 vendor-specific options by a hard-coded array. Fortunately, one only needs to change one number in PAPPL's source code to change this limit. So at least in Snaps, which build their own copy of PAPPL one can adjust the limit. So in all retro-fitting Printer Application Snaps I have changed it to 256. It is more a problem in distribution packages, where the PAPPL package is not modified. Here the Printer Application automatically switches to the simplified PPDs of Gutenprint.

Another point which could cause problems are the high resolutions (uo to 5760x2880 dpi) which the driver uses. If we let the Printer Application simply use these, this can make clients (those which send jobs in Apple Raster or PWG Raster) render their jobs in such extreme resolutions and slow down the devices, slow down the printing and the data transfer, or even crash the client device. Therefore we limit now all retro-fitting Printer Applications to 1440 dpi for high, 720 dpi for normal, and 360 dpi for draft quality. 1440 dpi is good enough for fine drawings and 720 dpi good enough for photos. The higher resolutions are used only internally now, for the driver to use a sophisticated, fine-grained dithering.

Both these issues got [discussed](https://sourceforge.net/p/gimp-print/mailman/gimp-print-devel/thread/e24b2385-6576-a949-a40d-3786c8067520%40gmail.com/#msg37353830) on the [Gutenprint mailing list](https://lists.sourceforge.net/lists/listinfo/gimp-print-devel) (free-of-charge subscription required to discuss on the list).


## HPLIP Printer Application
**[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) in the [Snap Store](https://snapcraft.io/hplip-printer-app), 1316 installations via Snap Store**

The HPLIP Printer Application experienced two substantial changes during the last month: The Snap uses the source code of the Debian package and not the upstream one and the Printer Application supports installing the proprietary plugin via web interface now, also in the Snap.

**Source code from Debian**

HPLIP's original source, as it comes from [HP's web site](https://developers.hp.com/hp-linux-imaging-and-printing/) has many bugs, unfortunately. The HPLIP developer team has a [bug tracker at Launchpad](https://launchpad.net/hplip) and the bugs got reported there but it seems thatb the developers are not reviewing and merging the proposed patches.

Therefore the Debian package of HPLIP (which is also used by Ubuntu) has 81 patches, partially originating from the Debian and Ubuntu developers but also from RedHat/Fedora developers.

As it would be a lot of work to add the patches to the HPLIP Printer Application repository to be used in the Snap build, we have simply switched to Debian's [GitLab repository](https://salsa.debian.org/printing-team/hplip) as source instead of the original upstream tarball, as on Debian's repository the patches are already applied.

This way in the HPLIP Printer Application Snap all these bugs are fixed and thanks to Debian's re-packaging of the original source, the code is totally free software (HP's original code contains a closed-source library even without the proprietary plugin).

**Support for the proprietary plugin**

Unfortunately, HP has some (cheaper) laser printers which do not work with totally free software. They either need their firmware loaded everytime when they are turned on ot they need a closed-source driver for their proprietary print data format. For this HP has issued a proprietary plugin which joins all these extensions for all devices needing it in a single package. On a classic HPLIP installation (as it usually comes with Linux distributions) one can install the plufin with the `hp-plugin` utility, or when setting up the printer with `hp-setup`.

Now the plugin can also be used with the HPLIP Printer Application Snap. In the web interface (see screen shots in the [Snap Store](https://snapcraft.io/hplip-printer-app)), on the front page, under "Other Settings" there is an "Install Proprietary Plugin" button now (and at the entries of all printers which need the plugin is a "Plugin" button). Clicking one of these leads to a web interface for installing the plugin, and also for updating, removing, and re-installing. One needs only to click the appropriate buttons, accept the license (on initial install) and the plugin gets installed.

Once the plugin in place, the USB is observed (as with [ipp-usb](#ipp-usb-snap) above, as we [cannot install UDEV rules out of a Snap](https://forum.snapcraft.io/t/how-to-add-or-workaround-a-udev-rule/)) to upload the appropriate firmware file if a USB printer which needs it appears (or is already there when starting the Snap).

If the Snap gets updated by one with a newer HPLIP version, the plugin gets updated automatically.

When installing the HPLIP Printer Application classically one can also install the plugin via web interface, but only if the Printer Application is running as root. Automatic updates of the plugin only happen when (re-)starting the Printer Application, also only as root. Running as non-root the web interface page only shows the status of the plugin, and the user has to install with `ho-plugin` of the (then also classically installed) HPLIP.

As [scanning support in PAPPL](https://github.com/Bhavna2020/GSoC-2021) is not ready yet, scanning on multi-function printers is not yet supported.


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), 2832 installations via Snap Store**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but unfortunately, they are very busy currently but the merging into snapd is expected still in October, so that for the full developemnt cycle of Ubuntu 22.04 LTS (J. J.), starting end of October, it will be available for testing and deciding whether said Ubuntu version will come with the CUPS Snap as standard printing environment, and naturally uploading of applications which print into the Snap Store will get easy and fully automatic, without any manual review and permission needs.

Michael Sweet has done some [clean-up](https://github.com/OpenPrinting/cups/pull/269) on the Snap support of CUPS and I have tested it with the CUPS Snap. All is working correctly.

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces (see above)
- Testing
- Turn classic CUPS drivers into Printer Applications (see progress above)
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|2832|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|229|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|1663|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|318|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|1361|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|520|


## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 20 months.

Ubuntu Impish Indri (21.10, **release this Thursday, Oct 14**) will also come with CUPS 2.3.3op2, the CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master.

As outcome of our [OpenPrinting Micro-Conference on the Linux Plumbers 2021](#openprinting-micro-conference-on-the-linux-plumbers-2021) on Sep 20, 2021 (see [Michael Sweet's slides](https://linuxplumbersconf.org/event/11/contributions/1023/attachments/737/1443/lpc-cups-2021.pdf)) we will proceed with the development of CUPS as follows:

**CUPS 2.4**

Feature highlights:
- Official AirPrint/Mopria printer sharing support
- OAuth support
- Explicit container support (Snap for now)
- `pkg-config` support
- Deprecated `cups-config` and Kerberos (will be removed in 3.0, replaced by OAuth)

Release schedule:
- Beta in the end of September 2021
- Release Candidate in October 2021
- 2.4.0 in November 2021
- Patch releases every 2 months from January 2022 on
- 2.4.1 or 2.4.2 in Ubuntu 22.04 LTS

Release Manager: Most probably Zdenek Dohnal (RedHat)

**CUPS 2.5**

Feature highlights:
- OAuth support in cupsd
- OAuth callback for desktop - D-BUS API - Good for containers to do it with DBUS-API
- TLS/X.509 improvements 
- Centralized localization - OSes usually have their own localization services
- Other container technologies - Docker, AppImage, Flatpak

Release schedule:
- Beta in the end of September 2022
- Release Candidate in October 2022
- 2.5.0 in November 2022
- Patch releases every 2 months from January 2023 on
- 2.5.1 or 2.5.2 in Ubuntu 23.04

Release Manager: Most probably me (Till Kamppeter)

2.5.x is probably the last 2.x.

**CUPS 3.0**

Feature highlights:
- 100% free of PPDs!
- New architecture of separate modules:
  - Command line utilities: `lp`, `lpstat`, `lpadmin`, `lpinfo`, ...
  - Local server: Runs as normal user, only temporary/virtual (auto-generated queues) pointing to IPP printers/Printer Applications, spooling filtering, only on domain sockets, D-Bus (protocol similar to CPDB backend, merge with it?)
  - Sharing server: Runs as root, only permanent queues, web interface, network, accounting
  - CUPS library, to be used by all the components above

Release schedule (development together with 2.5):
- Beta in March 2023
- 3.0.0 in October 2023
- Ubuntu 24.04 LTS is the first PPD-free Ubuntu!

```
CUPS v2.4-b1 (Pending)
----------------------

- Added basic OAuth 2.0 client support (Issue #100)

- Now show better error messages when a driver interface program fails to
  provide a PPD file (Issue #148)
- Added dark mode support to the CUPS web interface (Issue #152)

- Fixed an interaction between `--remote-admin` and `--remote-any` for the
  `cupsctl` command (Issue #158)

- Fixed some IPP Everywhere option mapping problems (Issue #238)
- Fixed support for "job-hold-until" with the Restart-Job operation (Issue #250)
- Fixed the default color/grayscale presets for IPP Everywhere PPDs (Issue #262)
- Fixed support for the 'offline-report' state for all USB backends (Issue #264)

- Web interface updates (Issue #218)

- Fixed several Windows TLS and hashing issues.

- Removed support for the (long deprecated and unused)
  `ListenBackLog` directive in `cupsd.conf` and `cups-files.conf`.
```


## cups-filters
Currently released is [1.28.10](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.10).

Current development work is finishing up, testing, debugging this year's GSoC student projects, improving and optimizing the rules for mapping job IPP attributes to PPD option settings, and smaller feature needs appearing during the CUPD driver retro-fitting work (but most is already done for this).  Now we also need to clean up and sort out things to be able to do a first 2.x release of cups-filters.

- Merged [Pratyush Ranjan's](https://pranjanpr.github.io/pratyush/#/gsoc) [Pull Request](https://github.com/OpenPrinting/cups-filters/pull/425/) for converting the `texttotext` CUPS filter into a filter function. **Now the filter function conversion work is completed!**
- Make cupsRasterParseIPPOptions() work correctly together with printers with PPDs, especially to not mis-interprete the weird "Resolution" variant choice names of Gutenprint (like "301x300dpi").
- Clean "Eastmak Kodak Company" to "Kodak".
- In IPP-attributes-to-PPD-options auto mapper rules considering “ColorMode” also with prefix (like “cupsColorMode”) now.
- Fixed PPD URIs when generating dynamic PPDs, so that they do not depend on the absolute path of the dyanamic PPD generator.
- Deal with too large custom page size limits in PPD files when creating PPD cache

Also several minor bug fixes were done.

Michael Sweets PDF file handling library [PDFio](https://www.msweet.org/pdfio/) is a good candidate to replace QPDF in cups-filters, to eliminate the need of C++ and therefore make the code easier to maintain.

I discussed this with Michael on the Linux Plumbers and we discovered that two important features were missing and he suggested me to post feature requests:
- Generate streaming output (vs. file output) ([Feature requst](https://github.com/michaelrsweet/pdfio/issues/21), already implemented)
- Flattening filled interactive PDF forms and annotations in PDF files to get a static PPD file with fields filled ([Feature requst](https://github.com/michaelrsweet/pdfio/issues/20), Michael is investigating)

Ubuntu Impish Indri (21.10) will come with cups-filters 1.28.10. The CUPS Snap currently uses 1.28.10. The Printer Application Snaps use the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- libcupsfilters: Make cupsRasterParseIPPOptions() work
	  correctly together with PPDs, by not parsing options
	  which are in the printer's PPD and using
	  ppdRasterInterpretPPD() when set_defaults = 1 is set.
	  Without PPD the function behaves as before.
	- libcupsfilters: Let the ieee1284NormalizeMakeAndModel()
	  function Clean up "Kodak" manufacturer name, as it is
	  sometimes reported as "Eastman Kodak Company".
	- libcupsfilters, texttotext: Moved core functionality of
	  texttotext into the texttotext() filter function (Pull
	  request #425).
	- libcupsfilters: Let colord_get_profile_for_device_id() not
	  return empty file name, to avoid error messages in CUPS
	  error_log.
```

```
CHANGES IN V1.28.11

        - libcupsfilters: Let colord_get_profile_for_device_id() not
          return empty file name, to avoid error messages in CUPS
          error_log.
```

## PAPPL
Currently released is [1.1b2](https://github.com/michaelrsweet/pappl/releases/tag/v1.1b2).

After this release mainly only bug fixes and additions for Windows compatibility got added.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

```
Changes in v1.1b2
-----------------

- Added support for `papplDeviceGetID` with network devices (Issue #95)
- Added support for the "compression" option.
- Added English names for Tabloid and A3 media sizes in the web interface.
- Added "server-hostname" and "listen-hostname" server options to the default
  mainloop system callback.
- Fixed support for default printers, added indicator in web interface
  (Issue #182)
- Fixed support for printers with spaces in their names.
- Fixed the "jobs" subcommand.
- Fixed support for page-ranges.
- Fixed support for printers that do PDF beyond converting it to raster.
- Fixed support for mainloop subcommands on Windows.
- Fixed error message when Bonjour for Windows is not installed.
```

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
