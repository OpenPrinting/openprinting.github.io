---
title: OpenPrinting News - May 2022
layout: single
author: Till
excerpt: OP Summit/PWG Meeting, GUADEC, Linux Plumbers, GSoC 2022, "cups" snapd interface, CUPS in Docker, PPD-independent libcupsfilters 2.x, IPP-over-USB, HPLIP 3.22.4
---
## OpenPrinting Summit/PWG Meeting
On May 17-19 we will have our annual meeting together with the [PWG](https://www.pwg.org/) (Printer Working Group) again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2022-virtual.html).

Because of the Corona virus situation we will again have a virtual meeting, as in the last two years, with the side effect that everyone can participate, without needing to travel. Instructions for participation via WebEx are on the meeting’s page.

The [agenda](https://www.pwg.org/chair/meeting-info/may-2022-virtual.html) is already put up, with the OpenPrinting part on the first two days. Links to the slides will be continuously added on the meeting page and we will link to any summary/outcome here in the next month’s news.

## Linux Application Summit 2022
I have been on this year's [Linux Application Summit](https://conf.linuxappsummit.org/event/4/overview) on April 29 and 30 in Rovereto, Italy, near the Lake Garda.

The conference was successful. It was not only giving talks and listening to other people's talks but also the famous hallway tracks. Here I have, inspired by the critique on slow start-up of desktop application Snaps (Firefox and Chrome in Ubuntu 22.04 especially) and on the fact that there is only one Snap Store, especially discussed distribution-independent/sandboxed packaging, mainly with Heather Ellsworth and Robert McQueen, learning that the way to get OpenPrinting's original upstream CUPS and Printer Applications into image-based OS distributions is to make official Docker images from them.

Such conversations are not recorded, unfortunately, but all the talks on the main stage (Auditorium) are recorded in two long YouTube videos, one per day:  [Friday](https://www.youtube.com/watch?v=CBPefa0Ckq8), [Saturday](https://www.youtube.com/watch?v=HxM15UOVmyA) The BoFs did not get recorded.

The descriptions of the two videos on YouTube contain a list of links to the beginnings of each of the talks. The links below are also links to the beginning of the talk in the two day's videos.

Please see also our [News Flash](/OpenPrinting-News-Flash-OpenPrinting-and-Ubuntu-on-the-Linux-App-Summit-2022/) for more info about our talks.

**Links to the recordings**

- [Ubuntu 22.04 LTS (Jammy Jellyfish) Virtual Release Party](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=15480s)
- [OpenPrinting Talk about the New Architecture and what GUI/app developers need to know](https://www.youtube.com/watch?v=HxM15UOVmyA&t=23814s)
- [Getting Good: Gaming on Linux](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=23480s)
- [Snapcraft Secrets: The hidden power of desktop extensions](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=20210s)
- [Ubuntu Summit Announcement](https://www.youtube.com/watch?v=CBPefa0Ckq8&t=31880s)

**Thanks**

Thanks, Heather Ellsworth, for participating in the organization of the event and making me aware of it!

Thanks, Ken VanDine for the original idea of the Ubuntu Summit announcement lightning talk.

Thanks, Britt Yazel for MC-ing (Master of the Ceremony) the sessions in the Auditorium!

Thanks, Heather Ellsworth, Monica Ayhens-Madon, Britt Yazel, Aniss, Kristi Progri, Dani, Caroline Henriksen for the great collaboration on the organization of the Ubuntu release parties.

Thanks, Igor Ljubuncic for providing to me with the YouTube links, and especially with the time marks for each of our presentations!


## OpenPrinting Micro-Conference on the Linux Plumbers 2022
We got accepted for our [forth Openprinting Micro-Conference](https://lpc.events/event/16/contributions/1154/) on the [Linux Plumbers Conference 2022](https://lpc.events/event/16/) taking place from Monday September 12 to Wednesday September 14, 2022.

It is not yet clear whether the conference will be virtual or taking place in-person again. For the latter it will most probably take place in Dublin (see the "Europe/Dublin Timezone" mear the upper left corner of the front page. Most conferences are in-person again, so I hope this one will be so, too. If it is virtual or hybrid (in-person with possibility to attend remotely, also as speaker, like LAS 2022, see above), we could freely choose our speakers without having to worry about travel expenses.

The date of OpenPrinting’s turn is not yet determined, please keep an eye on the web site of Linux Plumbers.

## GUADEC 2022
This year the [GUADEC](https://events.gnome.org/event/77/) (GNOME developer conference) will take place on July 20-25 in Guadalajara in Mexico.

But why do I write about this here on OpenPrinting? It will be my first time on The GUADEC! And then a GUADEC at such a nice place! I am not a GNOMie (GNOME developer, or am I getting one as I am managing the work on the GNOME Control Center Printing-and-Scanning module for the New Architecture?), but I want to help them to make printing from GNOME continue to "just work" with my [talk](https://events.gnome.org/event/77/contributions/285/) about the New Architecture of printing and scanning.

Here I will introduce the New Architecture and tell what is important for GNOME and GTK developers for applications with print functionality, print dialogs, and printer setup tools. I will also report the progress on the new Printing-and-Scanning module for the GNOME Control Center.


## Google Summer of Code 2022
Currently, we have to select the best contributor proposals of the many we received, find mentors for these proposed projects, assign the mentors who have stepped up, and then rank the proposals. After the deadline for that on May 12 (this Thursday) Google will assign slots to each mentoring organization and by this the proposals ranked highest will automatically be selected into the slots. There is no way for us to correct after receiving the slot count. Selected contributors/projects will be announced on May 20 (Friday next week).

As in the other years we have loked for possible contributors already several months ago. We have let them done some exercises to learn about OpenPrinting, CUPS, cups-filters, driverless printing, ... let them also work on issue reports, mainly for cups-filters. Finally, they all have submitted proposals for GSoC projects.


## OpenPrinting Snaps and the Ubuntu Indaba with Mark Shuttleworth
About the [Ubuntu Desktop Team Indaba with Mark Shuttleworth](https://www.youtube.com/watch?v=Owwtcx6QJVo) I commented on the [OMGUbuntu article about the Indaba](http://disq.us/p/2oj9twd) that Mark did not mention that with Snap you can also package **system-daemons** and I made [heavily use of it](https://snapcraft.io/search?q=OpenPrinting) and with the Printer Applications one can distribute distro-independent hardware driver packages. On that I got an **up-vote from Alan Pope**, former Canonical employee who wants to move us to all-Flatpak!!

On a Canonical-internal platform I commented the same and got a thumbs-up from Mark.

And thanks, Heather Ellsworth and Monica Ayhens-Madon for this great Indaba!


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

Finally! Everything for the new `cups` snapd interface is in place now. snapd 2.55.3 with the new interface and no show-stopping regressions in the stable channel of the Snap Store now and the CUPS Snap is appropriately updated for being used with this interface.

For the launch of the interface I have posted a [thread on snapcraft.io](https://forum.snapcraft.io/t/new-interface-cups-for-all-snaps-which-print/), describing how one uses the interface when making Snaps from user applications with print functionality and also how the interface actually works. Please see any updated details on how to use it there.

Applications with print functionality can now be packaged in Snaps easily, by simply using the `cups` interface to allow the application to print. When such an application is downloaded from the Snap Store, the `cups` interface connects automatically.

I have also posted a proposal for addition of how to use the `cups` interface to the snapcraft documentation on the ["doc" forum](https://forum.snapcraft.io/t/the-cups-interface/) on snapcraft.io. Graham Morrison is already on it.


## Official Docker image of CUPS and Printer Applications
On the Linux Application Summit 2022 in Rovereto, Italy, I have, inspired by the critique on slow start-up of desktop application Snaps (Firefox and Chrome in Ubuntu 22.04 especially) and on the fact that there is only one Snap Store, discussed the methods of distribution-independent/sandboxed packaging, mainly with Heather Ellsworth and Robert McQueen.

Especially knowing that from Snap, Flatpak, and AppImage (see also [March](/OpenPrinting-News-March-2022/#flatpak-and-printing) and [April](/OpenPrinting-News-April-2022/#appimage-and-printing) News Posts) only Snap supports packaging system daemons, like CUPS, ipp-usb, and the Printer Applications.

On systems (and for users/admins) who accept Snaps one can easily get the full printing system right from upstream, OpenPrinting, updated independently of the OS distribution, also after its release, and get support for new printers (and in the future also scanners) in a timely manner.

Now let us go to Snap deniers, systems unsuitable for Snap (e. g. not systemd-based), or systems based on a minimal/immutable/atomic/image-based OS designed for applications being installed as Flatpaks. Here we are not able to provide straight-forwardly distribution-independent packages of CUPS, ipp-usb, and the Printer Applications. So printing is restricted to an OS-provided solution or even not possible at all.

Robert McQueen suggested to publish an OCI-compatible container image of CUPS (and also images of the Printer Applications) on DockerHub, but official ones by OpenPrinting (there are many [third-party ones](https://hub.docker.com/search?q=cups). These could be run in said systems (including minimal/immutable/atomic OS) using a runtime like docker or podman.

After the conference he sent me a longer e-mail about this idea and [CCed it to the Flatpak mailing list](https://lists.freedesktop.org/archives/flatpak/2022-May/002244.html). He suggested to use podman together with the [systemd generator Quadlet](https://blogs.gnome.org/alexl/2021/10/12/quadlet-an-easier-way-to-run-system-containers/) for the CUPS daemon to start automatically on boot. This started a [small discussion](https://lists.freedesktop.org/archives/flatpak/2022-May/thread.html) with further suggestions.

Unfortunately, I did not find time to follow up on this yet, but will come back to this later.


## Approaching cups-filters 2.0
The next step in my preparation of the 2.0 release of cups-filters is the handling of cups-filters in environments which do not support PPD files, like CUPS 3.x and also in environments which support PPD files, like CUPS 2.5.x or older or driver-retro-fitting Printer Applications. First thought, when starting the development of cups-filters 2.x was conditional compilin, but this does not work out.

How do we have a libcupsfilters without any PPD file support to use as distro package in a system with CUPS 3.x? But how still be able to install a (non-snapped, DEB package) retro-fitting Printer Application in such a system without needing to replace libcupsfilters by a differently built variant (is this possible in distros?) which supports PPDs, without needing a libcupsfilters generally supporting PPDs (and we all wanted to get rid of them)?

So I thought out a design change in cups-filters: Currently the filter functions support PPDs, **libcupsfilters depends on libppd**, I will remove the PPD support from the filter functions, making libcupsfilters independent of PPDs and libppd, create wrapper filter functions in libppd overtaking the PPD support and calling the original filter function. So dependencies get reversed, **libppd depends on libcupsfilters** and libppd provides the PPD-supporting set of filter functions, libcupsfilters the PPD-free set, and that without code duplications.

I started to do the restructuring with the `cfFilterPDFToPDF()` filter function (`pdftopdf` CUPS filter). Created a first wrapper filter function `ppdFilterPDFToPDF()` calling `cfFilterPDFToPDF()` with the latter not having PPD file support. I let the PPD file loader function directly translate the PPD file into printer IPP attributes for the call of the original filter function in libcupsfilters now and I have currently created a function to extract the requested paper size dimensions from job IPP attributes and options. Currently I am going through `cfFilterPDFToPDF()` to eliminate all direct PPD accesses and move them to the PPD loader/PPD-to-printer-IPP-attributes converter and to the wrapper filter function.

This I will also do with all the other filters. There it should be less work then, as similar items are needed from the PPD.

This will be the last major code change before the release. Once this done I will return to tidying up the code and finally release cups-filter 2.0b1.

This way CUPS 3.x could use libcupsfilters without pulling any dependency of PPD file support.

For Snaps and other types of sandboxed packages I will also add conditionals to libcupsfilters to skip building the support for unneeded data formats.

In a future 2.x release, after 2.0 we will switch `cfFilterPDFToPDF()` from QPDF to Michael Sweet's [PDFio](https://github.com/michaelrsweet/pdfio). This way we will get rid of C++ as it causes binary compatibility problems from time to time. For doing this switchover PDFio need to provide all the feature which QPDF does, especially [flattening of filled interactive PDF forms](https://github.com/michaelrsweet/pdfio/issues/20).


## CUPS 3.x: Filtering and new D-Bus interface
When preparing the talk for the LAS 2022 in Italy I had another look on Michael Sweet's [slides about CUPS 3.x](https://linuxplumbersconf.org/event/11/contributions/1023/attachments/737/1443/lpc-cups-2021.pdf) from Linux Plumbers 2021. This made me think about the filtering/converting of print data formats in CUPS 3.x and also the D-Bus interface of the local CUPS server in relation to the D-Bus interface of the Common Print Dialog Backends (CPDB).

So I started two threads on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) (not that you need to subscribe to the list to participate in the discussion):

(Follow the "Next Message" links in each mail or get an overview of the full threads [here](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/thread.html).)

**[CUPS 3.x: How we make it converting job data formats?](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004144.html)**

This caused a longer discussion between Michael Sweet and me. Michael want to principally use the [`ipptransform`](https://istopwg.github.io/ippsample/ipptransform.html) tool ([source](https://github.com/istopwg/ippsample/blob/master/tools/ipptransform.c)) of (ippsample](https://istopwg.github.io/ippsample/). He tells that there are only a few formats to be converted. As input only PDF, plain text, JPEG, and PWG will be accepted and as output we need only the driverless standard formats PDF, Apple Raster, and PWG Raster. PCLM he considers as not needed despite there are [some HP printers being driverless with PCLM-only](https://github.com/apple/cups/issues/6022).

As PDF renderer he wants that there is Poppler support as with GPL2 this is the only renderer which can be shipped (at least as external executable, not linked in) together with CUPS 3.x code in commercial packages. with the AGPL of Ghostscript this is not possible. Ghostscript can be supported as alternative for OS distributions though (they all come with Ghostscript and this seems to be OK for Artifex).

There will also be PDF pre-processing (similar to the `pdftopdf` CUPS filter, based on [PDFio](https://github.com/michaelrsweet/pdfio). It would be needed for watermarking and header/footer text but also [flattening of filled interactive PDF forms](https://github.com/michaelrsweet/pdfio/issues/20).

Even if cups-filters will not be used in CUPS 3.x I will continue on it as it is needed by CUPS 2.5.x and by Printer Applications.

**[CUPS 3.x: Printing via D-Bus](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004145.html)**

On the D-Bus interface which Mike Sweet mentioned to be in the local CUPS server of CUPS 3.x I was curious whether we could make the D-Bus interface of the Common Print Dialog Backends (CPDB) compatible with this one and so make the local CUPS server a CPDB backend by itself. Mike told that the D-Bus interface is more ample, continuing many IPP functions. So we will stay with different D-Bus interfaces for CPDB and CUPS 3.x.


## ipp-usb: Printer does IPP-over-USB but not driverless IPP and driver vs. driverless
Recently, we got bug reports of users that their printers stopped working and it turned out that ipp-usb attached to them (because **they support the 7/1/4 USB protocol of IPP-over-USB**) but do not do driverless IPP printing.

The IPP-over-USB standard requires that a printer and/or scanner supporting this USB protocol supports driverless IPP printing and/or driverless scanning (eSCL/AirScan, IPP Scan, WSD). The problem can be a firmware bug, either in the driverless print/scan support or that the 7/1/4 USB protocol is activated on a generally non-driverless device.

The devices discovered up to now are the "**HP Laser**" (not "Laser**Jet**") devices, printers re-branced from Samsung when HP acquired the printer division of Samsung. At least the [HP Laser 107a](https://bugs.launchpad.net/ubuntu/+source/ipp-usb/+bug/1970055) and the [HP Laser 135a](https://github.com/OpenPrinting/ipp-usb/issues/50#issuecomment-1121127124) are reported to have this problem. The printers [seem to work via Wi-Fi](https://forums.linuxmint.com/viewtopic.php?t=314966) though.

Alexander Pevzner, author of [ipp-usb](https://github.com/OpenPrinting/ipp-usb/), has immediately added the HP Laser 107a to the exclusion list ([Issue #51](https://github.com/OpenPrinting/ipp-usb/issues/51)) and I have suggested to add a feature to ipp-usb that if ipp-usb is not able to communicate with the device on start-up, to drop out immediately so that classic access will not get precluded ([Issue #52](https://github.com/OpenPrinting/ipp-usb/issues/52)).

This also raised a discussion (mainly between Alexander Pevzner and Zdenek Dohnal) about **whether the introduction of ipp-usb in Linux distributions should auto-migrate print queues** with classic driver to driverless IPP-over-USB when ipp-usb supports the printer in question (([Issue #50](https://github.com/OpenPrinting/ipp-usb/issues/50)).

Here questions came up like migrating a working print queue with the risk that it will not work any more and also that a classic printer driver can have more features or higher output quality than the driverless approach. Also whether and how to ask the user was talked about.


## Contributions to Common Print Dialog Backends
Wor on the Common Print Dialog Backends (CPDB) is continuing! I had posted a [project idea for GSoC](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#print_dialogsmake_them_use_the_common_print_dialog_backends_cpdb) about adding this functionality to the print dialogs which are currently typically used: GTK, Qt, Chrome, ... and a contributor candidate, Gaurav Guleria (aka TinyTrebuchet) has already contributed to the [cpdb-libs](https://github.com/OpenPrinting/cpdb-libs/) and [CUPS CPDB backend](https://github.com/OpenPrinting/cpdb-backend-cups/) projects:

**Add human-readable option/choice name support**

The original CPDB had only machine-readable option and choice names, making print dialogs only able to display standard options, like media size, media source, resolution, ... nicely. Now the human-readable names used by the print service (CUPS, ...) are made use of ([Pull request #2](https://github.com/OpenPrinting/cpdb-libs/pull/2), [commit](https://github.com/OpenPrinting/cpdb-libs/commit/46f8870c779)).

**Support for human-readable-choice-name and bug fixes**

In the CUPS CPDB backend added support for the options provided by CUPS/cups-filters (`number-up`, `page-set`, `output-order`, ...) which are available for any CUPS queue. Also provide human-readable names for these options and their choices and fixed some bugs ([Pull request #8](https://github.com/OpenPrinting/cpdb-backend-cups/pull/8/), replaces [PR #7](https://github.com/OpenPrinting/cpdb-backend-cups/pull/7/)).

**Removed CUPS specific functions from frontend**

Removed some CUPS-specific functions from the frontend library, everything CUPS-specific should go into the CUPDS CPDB backend, the frontend part has to stay neutral ([Pull request #3](https://github.com/OpenPrinting/cpdb-libs/pull/3/)).

Thanks, Gaurav Guleria, for your contributions.


## CUPS-driver-retro-fitting Printer Applications
**HPLIP 3.22.4 in all Printer Applications**

The [HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) ([Snap Store](https://snapcraft.io/hplip-printer-app)) got another update of the underlying HPLIP version. It is now [HPLIP 3.22.4](https://developers.hp.com/hp-linux-imaging-and-printing/release_notes). We continue using the [Debian package sources](https://salsa.debian.org/printing-team/hplip.v2) to include more than 80 bug fixes not adopted upstream. Sorry again for the delayed updates due to this. It is always a lot of work for Debian printing package maintainer Thosten Alteholz to update the upstream source code and to adapt the patches where needed. Thanks a lot for this, Thorsten.

The update adds explicit support for the new HP printer models which got released in the last two months. Note that most of those printers should also work as driverless IPP printers and therefore also work without the HPLIP Printer Application.

Note that there are some former Samsung models re-branded after the acquisition of Samsung's printer division by HP ("HP Laser" not "Laser**Jet**"). Note that they are not supported by HPLIP AFAIK and do not do driverless via USB (see above). It seems the only way to get them to work is driverless via network (Wi-Fi or Ethernet).

The update worked out smoothly. If you have installed an HPLIP Printer Application version which still uses an older HPLIP and have the proprietary plugin installed, the plugin gets updated right after the installation of the new version of the Printer Application. Note that this can take some minutes and that during this time your printer will perhaps not work.

After that, I have updated also the HPLIP used in the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) (PostScript PPD files for HP printers, [Snap Store](https://snapcraft.io/ps-printer-app)) and in the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) (HPIJS for non-HP PCL-5c/e lasers, [Snap Store](https://snapcraft.io/ghostscript-printer-app)) to the Debian package source of HPLIP 3.22.4.

In [all the 4 Printer
Applications](https://snapcraft.io/search?q=OpenPrinting) (and also in
the [CUPS Snap](https://github.com/OpenPrinting/cups-snap)) I have
also fixed updated the included Ghostscript to version 9.56.1 and
unlocked the state of the PAPPL to be used, returning to using the
current GIT snapshot. This way all new features and fixes of [PAPPL
1.2rc1](https://github.com/michaelrsweet/pappl/releases/tag/v1.2rc1)
are included.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|4776|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|2097|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2421|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1334|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|4511|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|3712|


## CUPS
Currently released is [**2.4.1**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.1).

There will be further bug fix releases in the 2.4.x series. Some bug fixes were done, see changes below.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) comes with 2.4.1. Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will most probably come with a later 2.4.x.

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.2 (TBA)
----------------------------

- The `lpstat` command now reports when the scheduler is not running
  (Issue #352)
- Updated the man pages concerning the `-h` option (Issue #357)

- Fixed a regression in lpoptions option support (Issue #370)
- The scheduler now regenerates the PPD cache information after changing the
  "cupsd.conf" file (Issue #371)
- Updated the scheduler to set "auth-info-required" to "username,password" if a
  backend reports it needs authentication info but doesn't set a method for
  authentication (Issue #373)
- `cupsGetResponse` did not always set the last error.
- Fixed a number of old references to the Apple CUPS web page.
- Restored the default/generic printer icon file for the web interface.
- Removed old stylesheet classes that are no longer used by the web
  interface.
```


## cups-filters
Currently released is [1.28.15](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.15).

We are continuing to polish and to fix bugs for the 2.0.0 release. Currently I am restructuring to make libcupsfilters not supporting PPD files and not being dependent on libppd, to make it easily usable in PPD-free (CUPS 3.x or CUPS Snap) environments.

For retro-fitting Printer Applications and other applications using PPD files, PPD-supporting wrapper filter functions, one for each filter function in libcupsfilters, will be added to libppd.

See above for more details.

The re-structuring and also a lot of other work (see everything here above) made me not doing any further bug fixes on cups-filters, so there is also nothing to backport to 1.x.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) comes with cups-filters 1.28.15. Ubuntu Kinetic Kudu ([22.10](https://discourse.ubuntu.com/t/kinetic-kudu-release-schedule/) will be the first Ubuntu coming with cups-filters 2.x.

The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.


## PAPPL
Currently released is [1.2rc1](https://github.com/michaelrsweet/pappl/releases/tag/v1.2rc1).

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

```
Changes in v1.2.0
-----------------

- Added `papplMainloopShutdown` API to trigger a shutdown of the system that
  was started by `papplMainloop`.
- Fixed mapping of MIME media types to IEEE-1284 Command Set values.
- Fixed a crash bug when no printers are added.
- The macOS menu extra did not update the list of available printers.
- No longer try to show the macOS menu extra when running from a root launchd
  service (Issue #201)


Changes in v1.2rc1
------------------

- Added explicit support for running macOS printer applications as a server.
- Added unit test support for the new SNMP-based supply level and status
  monitoring code.
- Updated USB gadget code to not enable gadget until system is started or USB
  options are set.
- Updated default spool directory to use a persistent, per-user location.
- Fixed DNS-SD advertising when adding a printer from the web interface.
- Fixed double "Supplies" buttons in the web interface.
- Fixed human-readable location fields in web interfaces.
- Fixed an issue with the default system callback for `papplMainloop`.
- Fixed an issue with `papplDeviceList` and DNS-SD discovery when there was no
  active system.
- Fixed printer compatibility issues with the new `papplDeviceGetSupplies` API.
- Fixed some locking issues with the macOS menubar icon.


Changes in v1.2b1
-----------------

- Added macOS menubar icon/menu (Issue #27)
- Added support for localization, with base localizations for English, French,
  German, Italian, Japanese, and Spanish (Issue #58)
- Added interpolation when printing JPEG images or when using the
  `papplJobFilterImage` function with smoothing enabled (Issue #64)
- Added `papplDeviceGetSupplies` API to query supply levels via SNMP (Issue #83)
- Added support for custom media sizes in millimeters (Issue #118)
- Added `papplPrinterGet/SetMaxPreservedJobs` API and reprint web interface
  (Issue #189)
- Added IPP notifications support with `papplSystemAddEvent` and
  `papplSubscriptionXxx` functions (Issue #191)
- Added `papplPrinterDisable` and `papplPrinterEnable` functions and proper
  support for the IPP "printer-is-accepting-jobs" attribute.
- Added OpenSSL/LibreSSL support (Issue #195)
- Added `papplSystemGet/SetMaxClients` API (Issue #198)
- Updated `papplPrinterSetReadyMedia` to support up to `PAPPL_MAX_SOURCE`
  media entries, regardless of the number of sources.
```
