---
title: OpenPrinting News - February 2022
layout: single
author: Till
excerpt: GSoC 2022 projects posted, printer setup tool and print dialog, CUPS Snap integration, approaching cups-filters 2.x, CUPS 2.4.1
---
## Google Summer of Code 2022

We have posted [everything you need to know for participating](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022) and our [**project ideas**](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects):

- [GUI for discovering non-driverless printers and finding suitable Printer Applications for them](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#gui_for_discovering_non-driverless_printers_and_finding_suitable_printer_applications_for_them)
- [Scanning support in PAPPL](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#scanning_support_in_pappl)
- [Converting Braille embosser support into a Printer Application](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#converting_braille_embosser_support_into_a_printer_application)
- [cups-filters: In filter functions call Ghostscript via libgs and not as external executable](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#cups-filtersin_filter_functions_call_ghostscript_via_libgs_and_not_as_external_executable)
- [cups-filters: Add Avahi calls for discovering and resolving driverless IPP printers to API and optimize the processes](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#cups-filtersadd_avahi_calls_for_discovering_and_resolving_driverless_ipp_printers_to_api_and_optimize_the_processes)
- [cups-filters: Create OCR filter to deliver scans as searchable PDFs](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#cups-filterscreate_ocr_filter_to_deliver_scans_as_searchable_pdfs)
- [Turn the scp-dbus-service methods - GetBestDrivers and MissingExecutables - of system-config-printer into C](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2022-openprinting-projects#turn_the_scp-dbus-service_methods_-_getbestdrivers_and_missingexecutables_-_of_system-config-printer_into_c)

We also have already submitted the organization application for the Linux Foundation. The organizations accepted by Google will get announced on March 6, 2022.

Here is the full [timeline](https://developers.google.com/open-source/gsoc/timeline) for GSoC 2022.

We continue looking for contributor candidates and as part of our community onboarding program we have assigned GitHub issues, mainly of cups-filters to them. Several are investigating the issues and working on fixes and so helping us towards the cups-filters 2.0 release.


## GUI: Printer setup tool and Print dialog - Essential for user experience
The New Architecture of printing needs GUI work, printer setup tools handle IPP services and install Printer Applications for non-driverless printers, and print dialogs should support CUPS' temporary print queues and should not directly handle PPDs of print queues any more.

We cannot switch a Linux distribution over to the New Architecture, using the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) as its printing infrastructure and removing all classic driver packages from it, but stay with the classic GUI tools doing their work based on static CUPS queues and PPD files. So work on the GUI is required to switch over without losing the good user experience.

Here is an overview of what we already have and what we still need.

### Printer Setup Tool
First, we need a new printer setup tool. The existing ones, the printing part of GNOME Control Center and also system-config-printer, are based on static CUPS queues with PPD files. We need a tool to manage the available IPP services (CUPS auto-creates queues for each of them) and to find non-driverless printers so that we can install Printer Applications for them (and not install static CUPS queues with PPDs).

So the main window (GNOME-Control-Center page) shows a list of IPP services with a list of print, scan, and fax services within them, buttons for opening their web config interfaces and also their IPP System Service config/status panels.

The “Add Printer” part searches for non-driverless printers on USB and on the network, checks for suitable, already installed Printer Applications, queries the OpenPrinting web server for suitable Printer Applications available from the Snap Store. Buttons to install Printer Applications and to setup printers withing Printer Applications should be available.

**Work needed**

There are already implementations from GSoC 2020 and 2021 for the main window/panel with the list of IPP services and the IPP System Service config/status panel, all written with G-C-C in mind. They probably need only small adaptations and optimizations. Main work item will be the “Add Printer” part.

Another important piece of work is to integrate the 3 with each other and to get them upstream into GNOME Control Center.

UI design work is needed for the “Add Printer” part and perhaps on improving and optimizing the UI for the other parts for integration in GNOME Control Center.

**Links**

See below the links to the OpenPrinting Micro-Conference on the Linux Plumbers Conference 2021, especially the presentation about the Print Management GUI, which shows more in-depth how the new printer setup tool should look like. Also see the links to OpenPrinting discussion, GSoC 2020/2021 projects, and Frederik Feichtmeier’s Flutter counerpart to G-C-C.

- [OpenPrinting Micro-Conference on the Linux Plumbers Conference 2021](https://openprinting.github.io/OpenPrinting-News-October-2021/#openprinting-micro-conference-on-the-linux-plumbers-2021)
- [Session about printer setup tool on Linux Plumbers Conference 2021](https://linuxplumbersconf.org/event/11/contributions/1027/attachments/774/1460/Print-Management-GUI.pdf)
- [Session about print dialog on Linux Plumbers Conference 2021](https://linuxplumbersconf.org/event/11/contributions/1028/attachments/762/1433/Common-Print-Dialog-Backends.pdf)
- [Recording of the OpenPrinting Micro-Conference on Linux Plumbers Conference 2021](https://www.youtube.com/watch?v=5KogjLb1Hb4)
- [First thoughts and discussions on a printer setup tool for the New Architecture](https://openprinting.github.io/OpenPrinting-News-March-2021/#user-experience-automatic-printer-setup-printer-setup-tools)
- [IPP System Service config/status panel (GSoC 2020)](https://github.com/lbandlish/Administrate-MF-Devices-GUI)
- [Main window/panel to list and manage IPP services (GSoC 2021)](https://github.com/divyashk/GSOC21_summary)
- [GNOME-Control-Center fork with new printer setup tool (at least main panel)](https://github.com/divyashk/gnome-control-center/tree/devCups)
- [Flutter alternative to GNOME-Control-Center, printer part is planned to be done following the New Architecture](https://github.com/Feichtmeier/settings)
- [Service on OpenPrinting web server for finding the correct Printer Application for a given, non-driverless printer](https://openprinting.github.io/OpenPrinting-News-November-2021/#printer-querying-on-the-openprinting-web-server)

### The Print Dialogs
Most print jobs are sent via the print dialog of a desktop application, like evince, Chrome, LibreOffice, DarkTable, … Print dialogs are usually, like “Open …” or “Save as …” dialogs, provided by the GUI toolkits, in most cases GTK or Qt, sometimes applications come also with their own creations, like LibreOffice or Chrome.

Problem here is usually not the design of the dialog itself, most are actually easy to use (except Qt’s which is really not cute, seems to be untouched for near 2 decades), but the way how they connect to CUPS (and also to other print technologies) and how well this connection code is maintained and kept up-to-date.

GUI toolkit projects are large projects, often with long release cycles and all with a certain inertia, and there are things which many people are eager to work on, and others, like print dialogs, which have to be there but no one is really motivated to push their development forward and do the needed maintenance work.

An important part of the maintenance of a GUI toolkit is that it interfaces well and correctly with the underlying operating system, graphics, sound, storage, …, and printing! The OS is under continuous development, things are changing all the time, components get replaced by others, printing is CUPS for 22 years, but within CUPS we have also changes, and they need to be taken care of in the print dialogs.

Several years back, CUPS started to create temporary queues for driverless IPP network printers (or remote CUPS printers, which are emulations of IPP printers), which are only physically available when they are accessed (capabilities are polled or job printed). Print dialogs used an old API which did not support this, the temporary queues did not appear in the dialog, a helper daemon, cups-browsed had to convert the temporary queues into physical queues as a workaround. The correct solution had been to change the print dialogs to a newer CUPS API which supports these queues, but no one at the GUI toolkit projects has felt reponsible and taken the time for this update for many years. Only recently this got fixed.

This made me introducing the Common Print Dialog Backends (CPDB), a de-coupling of the print technology (CUPS, print-to-file, back in 2017 also Google Cloud Print) from the GUI. The GUI projects have to adopt the CPDB support only once and then OpenPrinting (or any upcoming cloud printing projects) takes care of the CPDB backend for the print technologies to be up-to-date with any changes. This way print technology projects can react quickly and are not  dependent any more on the GUI toolkit’s inertia.

As far as I know the GTK, Qt, and LibreOffice print dialogs support temporary print queues now (but only recently, there are many old dialog versions around), but now we are at the next challenge as we have to assure that the print dialogs use CUPS APIs which do not handle PPDs on the dialog side, so that if the system switched to PPD-less CUPS 3.x that the dialog continues to work. If we get the dialogs using CPDB, these changes happen (if actually needed) only in the CUPS CPDB backend, not in each print dialog individually.

**Work needed**

What we need here is to get CPDB into the print dialogs upstream, the UI of them does not need to be changed (perhaps the one of Qt’s dialog). Dialogs to be treated are GTK, Qt, (LibreOffice has already CPDB support AFAIR), Chrome, and perhaps others. Also important are backports, as there are many apps based on old toolkit versions around in the distributions (Firefox? Thunderbird?).

For the CPDB integration we do not need UI design work, only perhaps to improve the Qt print dialog.

**Links**

- [The original Common Print Dialog Backends GSoC project, back in 2017](https://nilanjanalodh.github.io/common-print-dialog-gsoc17/)
- [Some coding work towards a Qt dialog](https://github.com/rithvikp1998/dCPD)
- [OpenPrinting project of the CPDB libraries](https://github.com/OpenPrinting/cpdb-libs)
- [CPDB support work added to GTK](https://github.com/divyashk/gtk/commits/cpdb-pr)
- [Some coding work towards a Qt dialog](https://github.com/rithvikp1998/dCPD)
- [Red Hat bug report about the lack of temporary CUPS queue support in the GTK print dialog](https://bugzilla.redhat.com/show_bug.cgi?id=1784449)


## CUPS Snap and snapd printing interface
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

The ["cups" interface with its security concept](https://github.com/snapcore/snapd/pull/10427) got **finally merged** into snapd now!

With this the most important part for allowing easy, fully automatic Snap Store upload of applications which print is done.

Now only some smaller steps need to get done, which are tracked and discussed in [this snapcraft.io thread](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/) which I have started.

What is still needed is [this](https://forum.snapcraft.io/t/cups-interface-merged-into-snapd-additional-steps-to-complete/28653/3?u=till.kamppeter):

- **snapd 2.55 release**: The new snapd with the included cups interface needs to get released to the stable channel of the Snap Store. This will happen in 2-3 weeks from now.
- **Snap Store permissions:** Request permissions from the Snap Store team for the CUPS Snap to use the `cups-socket-directory` attribute and for auto-connection of any Snap’s `cups` plug to the `cups` slot of the CUPS Snap. I have already posted the [request](https://forum.snapcraft.io/t/request-cups-snap-to-use-the-cups-socket-directory-attribute-and-auto-connection-of-any-snaps-cups-plug-to-the-cups-slot-of-the-cups-snap/) on the snapcraft.io forum.
- **`/var/snap` in base Snaps:** Ian Johnson will post PRs on the base Snaps to create the `/var/snap` directory. Ian Johnson: *There are some other PR’s I will file to the base snaps which will behind the scenes make using the `cups` interface more efficient, but that will not change how it is used at all (it will just change the mount namespace setup by creating the `/var/cups` directory there so we do not have to do lots of mount tricks)*
- **CUPS Snap auto-installation:** When an application Snap plugging `cups` gets installed from the Snap Store and the CUPS Snap is not installed (or a too old version), the CUPS Snap gets automatically installed in addition to the application Snap, like a package dependency. Ian Johnson plans to adapt the `default-provider` setting to also work for the `cups` interface here: *We have to either manually enable this using a transitional placeholder content interface or adapt the `default-provider` setting to also work for the `cups` interface. I plan on doing the latter at some point soon so I do not think that the former needs to be implemented.*
- **Changes in CUPS Snap:** The CUPS Snap needs to have the correct `cups` slot definition with the “`cups-socket-directory: $SNAP_COMMON/run`” line added and also in the beginning of the `snapcraft.yaml` a line “`assumes: [snapd2.55]`” added as then the Snap will not work with older snapd versions any more. This I only will do when snapd 2.55 gets actually released to the stable channel, to make sure that the CUPS Snap can always be downloaded and used.

When all these steps are done, the snapper of an application which prints (but does not do CUPS management) only needs to let the application(s) in the Snap plug the `cups` interface (in `snapcraft.yaml` in the `apps:` section add `cups` to the `plugs:` list of the appropriate application) and submit to the Snap Store, nothing more. Who has already used the `cups-control` interface, can simply search-and-replace `cups-control` by `cups` in his `snapcraft.yaml`.

When a user installs this application Snap, first it is checked whether the CUPS Snap is installed and if not, it gets installed, after that the application's `cups` plug gets auto-connected to the CUPS Snap's `cups` slot. Also the CUPS Snap's CUPS domain socket gets mounted from the CUPS Snap's sandbox into the application Snap's sandbox, and the application gets pointed to it by the `CUPS_SERVER` environment variable bein auto-set. This way all printing-related requests of the application always got to the CUPS Snap.

Now, if the user has the usual, classic CUPS installation (DEB, RPM, ...), with print queues, using classic drivers, perhaps even proprietary, ..., this is now problem, as the CUPS Snap goes into proxy mode and replicates the user's print queues (by passing the jobs through to the classic CUPS). This way application's attempts to do administrative operations are blocked by the CUPS Snap. The classic CUPS does not need to have the new functionality to block administrative requests from Snaps (Snap mediation).

If the user has no CUPS classically installed, the CUPS Snap goes into stand-alone mode and so it will be the user's print environment. He can print on driverles IPP printers right away (as users of classic CUPS installations can naturally do, too) and for printers which need drivers he has to install [Printer Applications](https://snapcraft.io/search?q=OpenPrinting).

And this way of blocking administrative requests on CUPS coming from the application Snaps plugging `cups` (NOT `cups-control) is our security concept which allows us to let the `cups` interface get auto-connected and so applications which print can be easily uploaded into the Snap Store, without needing to ask for any manual permission.

Thanks to Ian Johnson, James Henstridge, Samuele Pedroni, Alex Murray, Alberto Mardegan, and Michael Sweet for all their work on this.

For the Snap itself, the included QPDF got updated to version 10.5.0.

Main TODOs are:

- Complete the `cups` interface in snapd (we are close now).
- Testing
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## Approaching cups-filters 2.0
Currently, I am continuing the testing, bug-fixing, cleaning-up, polishing, ... to prepare the release of [cups-filters](https://github.com/OpenPrinting/cups-filters) 2.0.

Unfortunately, there is not enough time left to get it released before Feature Freeze of Ubuntu 22.04 LTS (Jammy Jellyfish) on [February 24](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/). Therefore I have backported many of my fixes into the 1.x branch and will do another release in it in the next days.

In the last weeks I have especially tested filter chains for PPD files auto-generated by cups-filters for driverless printers (`driverless` utility and `cups-browsed`). These PPD files do not use pseudo-PostScript code to set the desired color space and depth in their "ColorModel" option any more, but instead, copies of the printer IPP attributes telling about supported color spaces and depths for Apple Raster and PWG Raster. This made the `ppdRasterInterpretPPD()` ceasing to work and I had to replace it with the `cupsRasterPrepareHeader()` function in the `imagetoraster()`, `mupdftoraster()`, and `pdftoraster()` filter functions. `ghostscript()` was already switched over.

I checked high-color-depth Raster output (16 bit per color, auto-selected by `cupsRasterPrepareHeader()` when high print quality is requested, via `print-quality=5`) and found out that it was broken in both `pdftoraster()` and `pwgtoraster()` and found a simple fix for a bug in both, introduced still before the transition of `pdftoraster()` to a filter function. `imagetoraster()` and `mupdftoraster()` do not support high color depths at all, so I blocked using high color depth with these filter functions.

I also checked the `print-scaling` attribute on the `imageto...()` filter functions and found that `print-scaling=none` had the same bug on all the three filter functions and fixed it. Dimensions in PostScript points (1/72 inch) were compared with dimensions in pixels. I also made `print-scaling=none` being applied when requested and not falling back to `fit` on ver small or very large input images. Also the default resolution of image files without embedded resolution info got moved to 200 dpi (standard for shipping labels) from 128 dpi.

All these fixes are applied in [this commit](https://github.com/OpenPrinting/cups-filters/commit/cb2737b56) and in [this commit](https://github.com/OpenPrinting/cups-filters/commit/402472c9).

I also fixed a lot of log message leaking into stderr by changing it to proper loging via log function. This is a remainder of the architecture where each filter was a separate external executable.

With the switchover of the `implicitclass` backend of `cups-browsed` the support for legacy IPP (1.x) network printers got dropped. This I have recovered now, letting the `implicitclass` backend use the queue's PPD file if the `get-printer-attributes` IPP request to the printer fails ([commit](https://github.com/OpenPrinting/cups-filters/commit/a919bd4fcb4ef)).

Many smaller bugs and glitches got also fixed.

Another backport series to the 1.x branch is planned.

Some time ago I have started a [discussion thread on the OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004100.html) and, after not getting any answer, posted a copy [in the January news](https://openprinting.github.io/OpenPrinting-News-January-2022/#approaching-cups-filters-20).

Now I got some [remarks from Zdenek Dohnal](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004107.html) and [answered with clarifications](https://lists.linuxfoundation.org/pipermail/printing-architecture/2022/004108.html).

Again, I am inviting everyone to discuss on the [OpenPrintingmailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) (subscription required for posting), either answering to the [existing thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004100.html) or starting a new one.


## CUPS-driver-retro-fitting Printer Applications

**HPLIP 3.21.12 in all Printer Applications**

The [HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app) ([Snap Store](https://snapcraft.io/hplip-printer-app)) got its first update of the underlying HPLIP version. It is now [HPLIP 3.21.12](https://developers.hp.com/hp-linux-imaging-and-printing/release_notes). We continue using the [Debian package sources](https://salsa.debian.org/printing-team/hplip.v2) to include more than 80 bug fixes not adopted upstream. Sorry for the delayed updates due to this.

The update adds explicit support for the new HP printer models which got released near the end of 2021. Note that most of those printers should also work as driverless IPP printers and therefore also work without the HPLIP Printer Application.

The update worked out smoothly. If you have installed an HPLIP Printer Application version which still uses HPLIP 3.21.8 and have the proprietary plugin installed, the plugin gets updated right after the installation of the new version of the Printer Application. Note that this can take some minutes and that during this time your printer will perhaps not work.

Not caused by the update, I got a [bug report](https://github.com/OpenPrinting/hplip-printer-app/issues/2) that the automatic loading of the firmware into printers which need it everytime when they are turned on did not work.

As I do not have such a printer I had to do some [tricky workaround](https://github.com/OpenPrinting/hplip-printer-app/issues/1#issuecomment-1018846484) for testing when I developed this mechanism. Unfortunately, in the real situation this did not work out (or at least not for the user who reported tha problem).

Fortunately, the reporter of the problem, M. Parker, was very enthusiastic and cooperative, investigating the problem with the help of my mentorship. I [told him](https://github.com/OpenPrinting/hplip-printer-app/issues/2#issuecomment-1020755974) how to debug a Snap, as rebuilding it with some debug `echo` commands added to the script which controls the firmware upload, and putting the script into debug mode. Before this, he also did some [Snap debugging](https://github.com/OpenPrinting/hplip-printer-app/issues/2#issue-1113335132) already, and finally [solved the problem](https://github.com/OpenPrinting/hplip-printer-app/issues/2#issuecomment-1030934431)!

Thanks a lot for your great cooperation, M. Parker! You have made the automatic firmware upload working!

After that, I have updated also the HPLIP used in the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) (PostScript PPD files for HP printers, [Snap Store](https://snapcraft.io/ps-printer-app)) and in the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) (HPIJS for non-HP PCL-5c/e lasers, [Snap Store](https://snapcraft.io/ghostscript-printer-app)) to the Debian package source of HPLIP 3.21.12.

All the [OpenPrinting Snaps](https://snapcraft.io/search?q=OpenPrinting) are updated to use QPDF 10.5.0 now.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|3987|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|1485|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2202|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|1011|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|3436|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|2789|


## CUPS
Currently released is [**2.4.1**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.1).

CUPS 2.4.1 got released, adding several bug fixes, especially that the ColorModel default in generated PPD files for driverless printers is taken from the printer and also configurable which I told about [last month](https://openprinting.github.io/OpenPrinting-News-January-2022/#cups).

Michael Sweet is also **already working on the libcups of [CUPS 3.x](https://openprinting.github.io/OpenPrinting-News-October-2021/#cups)** ([Michael's personal libcups repo](https://github.com/michaelrsweet/libcups)). 

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with CUPS 2.4.x, most probably 2.4.1. It will still come as classic Debian package and all the drivers, too. The full snapd integration of the CUPS Snap is only happening right now ([see above](#cups-snap-and-snapd-printing-interface)) and we also did not succeed to release cups-filters 2.x and pappl-retrofit 1.x (for the Legacy Printer Application). More important even, we need the changes in the GUI tools ([see above](#approaching-cups-filters-20)).

The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.2 (TBA)
----------------------------

- Fixed conditional jump based on uninitialized value in cups/ppd.c (Issue #329)


Changes in CUPS v2.4.1 (27th January 2020)
------------------------------------------

- The default color mode now is now configurable and defaults to the printer's
  reported default mode (Issue #277)
- Configuration script now checks linking for -Wl,-pie flags (Issue #303)
- Fixed memory leaks - in testi18n (Issue #313), in `cups_enum_dests()`
  (Issue #317), in `_cupsEncodeOption()` and `http_tls_upgrade()` (Issue #322)
- Fixed missing bracket in de/index.html (Issue #299)
- Fixed typos in configuration scripts (Issues #304, #316)
- Removed remaining legacy code for `RIP_MAX_CACHE` environment variable
  (Issue #323)
- Removed deprecated directives from cupsctl and cups-files.conf (Issue #300)
- Removed `purge-jobs` legacy code from CGI scripts and templates (Issue #325)
```

## cups-filters
Currently released is [1.28.11](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.11).

We are continuing to polish and to fix bugs for the 2.0.0 release. I have especially tested all the filter functions with the new generated PPD files for driverless IPP printing and for cups-browsed-based printer clusters, fixed 16-bit-per-color output, fixed the `imageto..()` filter functions, and also removed a lot of "log message leaking" to `stderr` ([see above](#approaching-cups-filters-20)).

I have also backported many of the fixes already to cups-filters 1.x, as 2.x will still take some time to get released.

- Do not use high color depth (16 bits per color) with all filter functions ([commit](https://github.com/OpenPrinting/cups-filters/commit/402472c94)).
- Many fixes on the filter functions: Select correct color space/depth for Raster output with cups-filters-generated PPDs, 16-bit-per-color output of `pdftoraster()` and `pwgtoraster()`, `print-scaling=mone` with `imageto...()` filter functions ([commit](https://github.com/OpenPrinting/cups-filters/commit/cb2737b56)).
- Support all color spaces supported by PWG Raster and Apple Raster for auto-selection by the cups-filters-generated PPD files or printer IPP attributes ([commit](https://github.com/OpenPrinting/cups-filters/commit/109abfee6f)).
- Do not call `cupsRasterParseIPPOptions()` if we have a PPD file, as it guesses the meaning of option/attribute names and this can lead to settings not supported by the PPD/the printer ([commit](https://github.com/OpenPrinting/cups-filters/commit/f472e2984f)).
- Added new `input-page-ranges` option to the `pdftopdf()` and `pstops()` filter functions. It takes the same syntax as `page-ranges` but selection of pages is done on the input document before applying N-up, booklet, ... So it allows selecting pages from the input document, whereas `page-ranges` selects from the print job (commits: [`pdftopdf()`](https://github.com/OpenPrinting/cups-filters/commit/ca8cebd807), [`pstops()`](https://github.com/OpenPrinting/cups-filters/commit/70e4478a0)).
- If for a printer in a `cups-browsed` cluster a `get-printer-attributes` IPP request by the `implicitclass` backend fails, for example because the printer is a legacy IPP (1.x) printer, fall back to using the queue's/cluster's PPD file, to not drop `cups-browsed`'s support for legacy IPP printers ([commit](https://github.com/OpenPrinting/cups-filters/commit/a919bd4fcb)).
- In `mupdftoraster()` direct output to `outputfd` instead of directly to stdout and logging to the log function instead of `stderr` ([commit](https://github.com/OpenPrinting/cups-filters/commit/272a037d2)).
- In `pdftopdf()` add 2% tolerance for input sizes larger output page when doing fit-to-page, as otherwise sometimes pages get fit into the sheet and sometimes into the printable area due to small rounding errors ([commit](https://github.com/OpenPrinting/cups-filters/commit/e541dc698)).
- For images without resolution in metadata changed the default ppi from 128 to 200 for printing in "original size" with `imageto...()` filter functions, as this is the standard resolution of shipping labels, and other images you usually print scaled to the page ([commit](https://github.com/OpenPrinting/cups-filters/commit/70970df3c7)).
- In the `serial` CUPS backend add a 10-msec sleep and at the end add a `tcdrain()` call to make serial printers more reliably working ([commit](https://github.com/OpenPrinting/cups-filters/commit/cda85239d)).
- Also fixed a lot of "log message leaking" by re-directing to the log function or dropping the messages.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will most probably come with cups-filters 1.28.12 as 2.x will not get released in time for Feature Freeze pn February 24. The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- pdftopdf, pstops: Introduced new "input-page-ranges"
	  attribute (Issue #365, Pull request #444, #445).
```

```
CHANGES IN V1.28.12

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

The principal change up to now in the upcoming 1.2.0 release will be
IPP notifications support, enabling/disabling printers, and more
media-ready entries than trays possible (so of a tray is use used
sometimes for one paper, sometimes for another, it can have extra
media-ready entries).

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
