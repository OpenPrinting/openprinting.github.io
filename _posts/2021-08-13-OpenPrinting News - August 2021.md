---
title: OpenPrinting News - August 2021
layout: single
author: Till
excerpt: Ubuntu Indaba, Linux Plumbers, GSoC progress, Retro-fitting CUPS drivers with easy option setting and backends, CUPS, cups-filters
---
## The Ubuntu Desktop Indabas and OpenPrinting
From the [announcement](https://discourse.ubuntu.com/t/announcing-the-ubuntu-desktop-team-indaba-ama-august-27-2021-5pm-utc/):

> Heather Ellsworth:
>
> What is the Ubuntu Desktop Team Indaba? Indaba is a South African term for “a conference or consultation between people”. This will be a live stream event, featuring members of the Ubuntu Desktop Team and members of the community. To get a feel for what to expect, you can review the [last Indaba event on YouTube from July 30, 2021](https://www.youtube.com/watch?v=LRPdTI1-OiY).
>
> To keep up a consistent cadence of these Indabas, we’ve decided to have them the last Friday of the month, every month. (The actual time of day may change a bit as we work out scheduling kinks that may arise)

In this month's edition, on Friday, August 27, 5PM UTC (2 weeks from now) it is all about printing and what's new in this area. Therefore the special guests will be me and Michael Sweet (author of CUPS, PAPPL, did important part of IPP and driverless printing) and we will present the newest state-of-the-art and we will be open for the questions of the Ubuntu users.

The event will be streamed live on YouTube and Twitch, both with live chat (links on the [announcement page](https://discourse.ubuntu.com/t/announcing-the-ubuntu-desktop-team-indaba-ama-august-27-2021-5pm-utc/)).

Thanks a lot to the creator and main organizer of the Ubuntu Indabas, Heather Ellsworth, and also to the others from the team, Monica Ayhens-Madon and Rhys Davies.

See you there!

## OpenPrinting Micro-Conference on the Linux Plumbers 2021
We got [accepted](https://www.linuxplumbersconf.org/blog/2021/index.php/2021/07/22/open-printing-microconference-accepted-into-2021-linux-plumbers-conference/) for our third [Openprinting Micro-Conference](https://www.linuxplumbersconf.org/event/11/page/104-accepted-microconferences#cont-print) on the [Linux Plumbers Conference 2021](https://www.linuxplumbersconf.org/event/11/) taking place from Monday September 20 to Friday September 24, 2021, at the same place as last year: On the wider Internet!

With the COVID-19 situation improving some conferences are slowly coming back to be in-person but with still many travel restrictions we will have an online conference again. But it has also an advantage, as we can freely choose the speakers without having to worry about travel expenses. Also it is easier for anyone to listen in on the live stream.

The date of OPenPrinting's turn is not yet determined, please keep an eye on the web site of Linux Plumbers.

## Google Summer of Code 2021
Our 5 students have continued their work and made further progress. All the filters of cups-filters (if not treated appropriately earlier) go through 3 student projects: First getting turned into a filter function by Pratyush, after that made working without PPD file but based on IPP attributes instead by Suraj, and finally landing in the universal CUPS filter/filter function by Pranshu. This will get completed in the last few weeks to go. Perfect team work!

Also Bhavna and Divyasheel made good progress.

On this month's OpenPrinting conference call all students participated again giving a short screen-share-based presentation of their GSoC projects.

There will be also a presentation of the GSoC projects on the [PWG August 2021 Face-to-Face Meeting](https://www.pwg.org/chair/meeting-info/august-2021-virtual.html) which takes place online on August 17-19, 2021. The GSoC presentation will be on August 18, 10AM to 10:30AM EDT (UTC−04:00), with video demos of the students.

Here is some short summary about what got done:

**cups-filters: Make sure all filter functions work without PPD files**<br>
Student: Suraj Kulriya<br>
Mentors: Jai Luthra, Till Kamppeter, Dheeraj Yadav

Suraj made the following filter functions working also without PPD file, based on printer and job IPP attributes:
- [`pdftopdf()`](https://github.com/OpenPrinting/cups-filters/commit/95997917)
- [`pclmtoraster()`](https://github.com/OpenPrinting/cups-filters/commit/6f43961a58)

He again created some library functions for common functionality, this time `ippRasterMatchIPPSize()` and `getBackSideAndHeaderDuplex()` uploaded together with the changes on `pclmtoraster()`.

**cups-filters: Convert filters to filter functions**<br>
Student: Pratyush Ranjan<br>
Mentors: Till Kamppeter, Dheeraj Yadav

Pratyush converted the following CUPS filter to a filter function:
- [`texttopdf()`](https://github.com/OpenPrinting/cups-filters/commit/c7e3f277e46)

`bannertopdf()` is currently in the works.

**cups-filters: Create a single, universal CUPS filter to replace the chain of individual filters**<br>
Student: Pranshu Kharkwal<br>
Mentors: Till Kamppeter, Dheeraj Yadav

Pranshu is not only creating a nice universal CUPS filter, but by this he is also testing all the filter functions and so we discovered some oversights where new filter functions were still using `stdin` or `stdout` at some places instead of the new input and output file descriptors, making the universal filter hang or somehow else mis-behave (like outputting a zero-page job).

He is up to `texttopdf()` with the support now. Most important still missing part is testing it with CUPS and creating the needed MIME conversion rule file.

See his work on [this GitHub branch](https://github.com/pranshukharkwal/cups-filters/tree/universal).

**GUI for listing and managing available IPP Print/Scan services (or DNS-SD-advertised network services in general)**<br>
Student: Divyasheel<br>
Mentors: Till Kamppeter

Divyasheel is currently taking care of the correct device types getting listed, services from the same physical device grouped and duplicates skipped. He also takes care of the correct user action buttons be displayed for each service. Here is the [GitHub branch with the code](https://github.com/divyashk/gnome-control-center/tree/devCups).

**PAPPL: Printer setup tool support and Scanning support**<br>
Student: Bhavna Kosta<br>
Mentors: Jai Luthra, Till Kamppeter, Michael Sweet

Principally mentored by Michael Sweet Bhavna is making good progress with the [addition of scanning support to PAPPL](https://github.com/michaelrsweet/pappl/projects/3). She has submitted a total of [4 pull requests](https://github.com/michaelrsweet/pappl/pulls).

The new one of this month is ["Add scanner-webif.c"](https://github.com/michaelrsweet/pappl/pull/177), adding web interface pages for scanners.

## Retro-fitting of CUPS printer drivers into Printer Applications
Currently I am continuing with the work towards retro-fitting classic CUPS printer drivers into Printer Applications. I have continued to post sneak previews of the most important mile stones [at the usual place](https://github.com/OpenPrinting/ps-printer-app/discussions/8).

Here I have especially done the following:

**Easy printing on every printer using standard IPP options**

Now the 3 IPP attributes `print-color-mode`, `print-quality`, and `print-content-optimize` (or equivalent options under "Printing defaults" in the web interface) will actually work, for nearly every existing PPD file (please tell if they do not work with yours). This allows easy control of every printer with the same operation scheme, no searching for the right options for 99% of the printing tasks, including high quality photo printing, quick and toner-saving draft prints, ..., and printing from restricted client interfaces, like **phones** (iOS directly, Android with Mopria app). The correct PPD options for the jobs are automatically selected internally. **So simply make use of your (old) printer's capabilities with only 3 options/attributes!**

For special needs not covered one only needs to switch the printer-specific options away from "automatic-selection" to manually fine-tune. Do not forget to get back to "automatic-selection" when done with the special job.

Tested with following PPD files: HPLIP ("hpcups" driver), Gutenprint, Foomatic ("bjc250gs" and "hl7x0" drivers), PostScript PPDs from Ricoh, Toshiba, HP.

The most tricky part of this is to automatically find the options and choices in the PPD file which needs to get set for switching between color and grayscale printing, draft, normal, and high print quality, and for optimizing the output for photo, graphics, text, and text-and-graphics jobs, and that for ~10000 PPDs, where everyone has his own ideas about which parameters to make user-settable and how to call the options and choices for them.

This is implemented in libppd in cups-filters (probably the only new PPD file support feature which did not exist in CUPS). In the file `ppd/ppd-cache.c` a data structure for advanced properties of the PPD file is created (by the `ppdCacheCreateWithPPD()` function. One of the items in the structure are the so-called presets. To each of the 6 combination of settings for `print-color-mode` (`color`/`grayscale`) and `print-quality` (`draft`/`normal`/`high`) a set of PPD option settings (as key/value pairs) is assigned to allow quick and easy printing with standard IPP attributes. Problem is that to make use of this functionality one has to define the presets in the PPD (via `APPrinterPreset` PPD attribute) but no one who creates PPDs did this actually and no one wants to create a database of presets for ~10000 PPDs manually.

So to finally (with PPDs already deprecated for years and now active work happening to get rid of them) put live into this great idea, I have added an algorithm to automatically generate the presets, in the new function `ppdCacheAssignPresets()` in the same file. This function gives scores to all PPD options on how much they influence grayscale/color printing and print quality by the names of the options and choices, and by embedded PostScript code affecting resolution, color space, and color depth. This way the relevance of each option for the presets is determined and which choice to set in each of the 6 presets.

And in addition to `print-color-mode` and `print-quality` combos I also evaluate options for their influence on `print-content-optimize` (`auto`/`photo`/`graphics`/`text`/`text-and-graphics`) in the same function to create a preset for this. For `auto` the retro-fit library switches to `photo` on image file input and for PDF input it determines from which app the PDF is coming and chooses of the 4 content types appropriately.

The resolution support implicitly also selects up to 3 preferred resolutions (3 print qualities) and so the problem of PAPPL only supporting 4 resolutions for a printer is overcome. In the Printer Application we simply select the resolutions which are set by the presets. We also make use of the fact that PAPPL does not set the default resolution but selects the lowest/middle/highest resolution from the list for draft/normal/high print quality (Note here that for PAPPL selecting the correct "normal" resolution we have to list one resolution twice in some cases. This is not a bug). 

The code is here:
- [Initial commit](https://github.com/OpenPrinting/cups-filters/commit/f050491b)
- [Add Ricoh's "RIPrintMode"](https://github.com/OpenPrinting/cups-filters/commit/6d1788d5bc)
- [Improved for HPLIP and Gutenprint](https://github.com/OpenPrinting/cups-filters/commit/968cba4)
- [Resolution support](https://github.com/OpenPrinting/cups-filters/commit/28fc11294db)

**Filter function chains for format conversions**

This change in the retro-fit library allows to use a chain of any number of filter functions, both in the conversions for spooling printing mode and also in the formats for streaming printing mode. This way we especially add the `pdftopdf()` filter function (former `pdftopdf` CUPS filter) when PDF is the input format in spooling mode so that the pages get rotated into the destination page format of the printer, the `print-scaling` attribute correctly applied, ... and in the streaming mode for printers with pure PDF PPD files the PJL commands of the PPD get correctly applied to the PDF output by the `pdftopdf()` filter function.

**Streaming mode for filter functions**

In streaming printing mode (input is PWG/Apple Raster or an image) we instruct the filters to stream the job data and not load the whole jobs into a temporary file or into memory only to check which format it is and whether it perhaps does not contain any page for printing. For that we supply the boolean option `filter-streaming-mode` to the filters/filter functions in the filter chain. In [cups-filters](https://github.com/OpenPrinting/cups-filters/commit/23657c7ce70) now `pdftopdf()`, `ghostscript()`, and `foomatic-rip` support this streaming mode. `pdftopdf()` drops the whole processing by QPDF (adjustment of page size and orientation, number-up, page-ranges, ...) and only applies JCL/PJL commands from the PPD and the other two assume the input being PostScript (the other alternative, PDF is not streamable anyway) and do not check whether the input is a zero-page job.

**Support for CUPS backends**

Now we are adding the last major feature for the CUPS driver retro-fitting framework: [Support for CUPS backends](https://github.com/OpenPrinting/ps-printer-app/discussions/8#discussioncomment-1169530)

Several classic CUPS drivers do not only consist of PPDs and filters but also bring a CUPS backend, or several of them. HPLIP provides one to talk with USB printers in IEEE-1284 packet mode, protocol 3, 7/1/3. By the way, protocol 1 is uni-directional stream, protocol 2 bi-directional stream (both supported by PAPPL's own USB scheme and the `usb` CUPS backend) and protocol 4 is IPP-over-USB (needs the ipp-usb extra daemon to work as a network IPP printer). Another one coming with HPLIP supports faxing on many HP printers. Gutenprint has one for the totally proprietary USB protocol of many dye-sub printers.

To be able to correctly retro-fit this into a Printer Application I have now added a custom PAPPL scheme, named "cups" to which a backend directory and include/exclude lists for backends in that directory can get assigned. This scheme integrates the backends in the Printer Application listing all devices which the backends discover (when all run in turn without arguments, like `lpinfo -v` in CUPS) and allowing to add printers using them.

This is not complete yet. It is an interim snapshot. For now it only lists the devices (so you see them in the "Device:" list of the "Add Printer" web interface page, but when adding a printer using such a device, it will not print, as the communication for job execution is not implemented yet. You only can see that the devices got correctly discovered from withing the Printer Application. If you actually want to print you have to select one of PAPPL's own devices.

I have also implemented the [back channel and side channel concepts of CUPS' filters and backends](https://github.com/OpenPrinting/cups-filters/commit/14b958961c), so that classic drivers which use them, will correctly work, and also some functionality of PAPPL's device concept will work better then. Some of the implementation is in cups-filters (especially in the `filterExternalCUPS()` filter function which I also have [added CUPS backend support to](https://github.com/OpenPrinting/cups-filters/commit/2aa16347439b372a84f0ccc965a8b3fd9336d3ee)).

The implementation for actual job processing will come soon.

## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 2200 installations via Snap Store**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but unfortunately, they are very busy currently.

Unfortunately, no news on this.

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces (see above)
- Testing
- Turn classic CUPS drivers into Printer Applications (see progress below)
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 1300 installations via Snap Store**

I did not add anything new to the PostScript Printer Application as I continued my work on the printer driver retro-fit library (see below). The PostScript Printer Application will soon get switched over to be based on the library and this way receive new features, especially easier handling of color mode, print quality, and content optimization by the user.

With appropriate features added to PAPPL we will be able to also add the following:
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142) (Patch already applied in the Snap). 
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 18 months.

Ubuntu Impish Indri (21.10, [Feature Freeze next week](https://discourse.ubuntu.com/t/impish-indri-release-schedule/)) will also come with CUPS 2.3.3op2, the CUPS Snap and the PostScript Printer Application Snap use the current GIT master.

Changes mainly happened in the build system and on the support for different system platforms. Also new logos were added.

There is no new entry in `CHANGES.md`.

## cups-filters
Currently released is [1.28.9](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.9).

Feature additions are principally done for retro-fitting classic CUPS drivers, see details in the [separate section](#retro-fitting-of-cups-printer-drivers-into-printer-applications), but also work of our [GSoC students](#google-summer-of-code-2021):

- Added auto-generation of presets for PPD files, to easily control the printing via `print-color-mode`, `print-quality`, and `print-content-optimize`, with any of more than 10000 PPD files.
- Added support for CUPS backends in both discovery (no arguments `lpinfo -v`) and job processing mode, especially in the `filterExternalCUPS()` filter function.
- Added support for the back channel and side channel which CUPS uses for communication between filters and the backend.
- `ghostscript()`: Added raster-only PDF and PCLm output support (for this also reported a [Ghostscript bug that the new "pclm" and "pdfimageXX" output devices need seekable output files](https://bugs.ghostscript.com/show_bug.cgi?id=704160) and the Ghostscript developers fixed it within a few days!)
- `foomatic-rip`, `ghostscript()`, `pdftopdf()`: Added streaming mode for filters, to be activated by the `filter-streaming-mode` boolean option.
- `pwgtoraster()`: Added support for borderless printing with overspray, stretching the input image by some pixels to file the overspray size.
- libppd: In `ppdCacheGetPageSize()` also checked page size variants (like `A4` and `A4.Borderless`) taking the paper dimensions of the base size and only the margins of the variants, to overcome different paper dimensions in the variants (for example for borderless with oversparay).
- Improved the sample PPD files for PDF printers: Added borderless page size definitions, removed redundant `*cupsFilter2` lines, fixed bugs (all discovered on testing under the retro-fitting Printer Application).
- Nearly all filters are filter functions now and can be used both with PPD files and with printer and job IPP attributes.

Also some bug fixes were done:
- pwgtoraster(): Do not apply back side orientation for duplex printing, it is the responsibility of other filter functions.
- Several minor clean-ups and fixes

[1.28.9](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.9)

Bug fix release, fixes backported from the master (2.x) branch (see below)

Ubuntu Impish Indri (21.10, [Feature Freeze next week](https://discourse.ubuntu.com/t/impish-indri-release-schedule/)) will come with cups-filters 1.28.10 (to be released soon). The CUPS Snap currently uses 1.28.9. The PostScript Printer Application Snap uses the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- libcupsfilters, texttopdf: Moved core functionality of
	  texttopdf into the texttopdf() filter function (Pull request
	  #404).
	- libcupsfilters: The filterExternalCUPS() function. now
	  supports also to run CUPS backends in discovery mode
	  (without command line arguments and without input stream,
	  list of discovered printers in output stream).
	- libcupsfilters: Added support for the back and side channels
	  which CUPS uses for additional communication between the
	  filters and the backend into the filter function
	  infrastructure. Now filter functions can use these channels
	  and also CUPS filters or backends called via the
	  filterExternalCUPS() function. Printer Applications can
	  easily create the needed pipes via the new function
	  filterOpenBackAndSidePipes() and clode them via
	  filterCloseBackAndSidePipes() and filter functions used as
	  classic CUPS filters get the appropriate file descriptors
	  supplied by ihe filterCUPSWrapper() function.
	- libcupsfilters: Added raster-only PDF and PCLm output
	  support to the ghostscript() filter function. Note that
	  these are experimental and not yet suitable for using in
	  print filter chains, as they require a seekable output file
	  and PCLm does not support back side orientation for duples.
	- libcupsfilters, foomatic-rip: Added new streaming mode
	  triggered by the boolean "filter-streaming-mode" option. In
	  this mode a filter (function) is supposed to avoid
	  everything which prevents the job data from streaming, as
	  loading the whole job (or good part of it) into a temporary
	  file or into memory, interpreting PDF, pre-checking input
	  file type or zero-page jobs, ... This is mainly to be used
	  by Printer Applications when they do raster printing in
	  streaming mode, to run with lowest resources possible.
	  Currently foomatic-rip, ghostscript(), and pdftopdf() got a
	  streaming mode. For the former two PostScript (not PDF) is
	  assumed as input and no zero-page-job check is done, in the
	  latter all QPDF processing (page management, page size
	  adjustment, ...) is skipped and only JCL according to the
	  PPD added.
	- Sample PPDs: Add borderless page size definitions to Generic
	  PDF Printer, HP Color LaserJet CM3530 MFP PDF, and Ricoh PDF
	  Printer PPD files.
	- Sample PPDs: From the PDF PPD files removed the unneeded
	  "*cupsFilters2: ..." line. For CUPS it does not make any
	  difference and the PPD-retro-fitting Printer Applications do
	  not accept the PPDs with it.
	- libppd: In ppdCacheCreateWithPPD() also support presets for
	  print-ontent-optimize, not only for print-color-mode and
	  print-quality
	- libppd: Auto-pre-fill the presets with most suitable options
	  from the PPD files with new ppdCacheAssignPresets() function
	  (Only if not filled via "APPrinterPreset" in the PPD). This
	  way we can use the IPP options print-color-mode,
	  print-quality, and print-content-optimize in a
	  PPD/CUPS-driver-retro-fitting Printer Application with most
	  PPDs.
	- libppd: In the ppdCacheGetPageSize() function do not only
	  check the fit of the margins with the page size matching the
	  job's page size (like "A4") but also the margins of the
	  variants (like "A4.Borderless"), even if the variant's size
	  dimensions differ from the base size (and the physical paper
	  size), for example for overspray in borderless printing mode
	  (HPLIP does this). Also select a borderless variant only if
	  the job requests borderless (all margins zero).
```

```
CHANGES IN V1.28.10

	- gstoraster: Refactor the filter a little to clarify handling
	  of page counts and set job-impressions for TotalPageCount in
	  PWG-Raster header (Pull request #394).
	- cups-browsed: Make NotifLeaseDuration configurable and renew
	  after half the lease duration not 60 sec before end. The
	  early renewal improves reliability on busy systems a
	  lot. For easier development and debugging short durations
	  from 300 sec on can get selected (Pull request #378).
```

## PAPPL
Currently released is [1.0.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.3).

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
