---
title: OpenPrinting News - January 2022
layout: single
author: Till
excerpt: GSoC 2022 timeline, approaching cups-filters 2.x, PAPPL 1.1.0, LPrint 1.1.0 PAPPL_based, PDFio 1.0.0, cups-filters 1.28.11
---
## Google Summer of Code 2022
Save the dates! The [timeline for 2022](https://developers.google.com/open-source/gsoc/timeline) is out!

Mentoring organizations can submit their applications in the time from February 7 to February 21. We will apply again with the Linux Foundation.

Code contributor (not only students) applications are accepted from April 4 on, up to April 19, and coding starts on June 13, and either ends on September 4 if the work was done in the standard period, or on November 13 if the extended period was made use of.

Now we need to write up our project ideas for the organization application. Main work areas for 2022 are:

- Complete the scanning support in PAPPL and create a retro-fit framework to convert SANE drivers into Scanner Applications
- Create a GUI to find Printer Applications for discovered non-driverless printers and set them up
- Common Print Dialog Backends in GTK, QT, ... print dialogs
- Get Braille embosser support of cups-filters into a Printer Application
- Switchover of pdftopdf() and bannertopdf() to from QPDF to PDFio (?)

We are also already looking for contributor candidates and as part of our community onboarding program we have assigned GitHub issues, mainly of cups-filters to them. Several are investigating the issues and working on fixes and so helping us towards the cups-filters 2.0 release.


## Approaching cups-filters 2.0
Currently, I am doing a lot of testing, bug-fixing, cleaning-up, polishing, ... to prepare the release of [cups-filters](https://github.com/OpenPrinting/cups-filters) 2.0.

Before doing this release, the second generation of cups-filters, I still want to discuss some points in order to optimize the release. I have tried to initiate this discussion with a [post on the OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004100.html) but, unfortunately, did not get a single answer.

So I am re-posting the text here:

> With the background of [CUPS 3.x, planned to get released 2 years from now](https://openprinting.github.io/OpenPrinting-News-October-2021/#cups), not supporting PPD files any more and only considering driverless IPP printers, I have changed the architecture of cups-filters, converting filter executables (CUPS filters) into filter functions (library functions doing a filter's task, with standardized call scheme/interface) so that the code of the filters is preserved but they get more universally usable.
>
> In addition I have created some auxiliary functions (partially filter functions by themselves) to call filter functions in a chain, feed data into a filter function through a pipe, call classic CUPS external filter/backend executable wrapped into a filter function, save data stream between chained filter function calls into a file for debugging, ...
>
> Perhaps you have followed all this development [here in the news posts](https://openprinting.github.io/news/) or in the [GIT repository of cups-filters](https://github.com/OpenPrinting/cups-filters/commits/master).
>
> With this I was especially able to create [Printer Applications retro-fitting classic CUPS printer drivers](https://github.com/OpenPrinting/pappl-retrofit) ([Snap Store](https://snapcraft.io/search?q=OpenPrinting)), an important step to be able to switch to a PPD-less and driverless CUPS without dropping support for legacy printers.
>
> Now I am also thinking about making use of the filter functions somehow in CUPS, both to get improvement in the upcoming 2 years where CUPS still supports PPD files and classic drivers and also in PPD-less CUPS 3.x, where data-format conversions are still needed, as for example print jobs usually come in PDF but it is not required for a driverless IPP printer to support PDF. Also implementation of functionality like N-up or flattening filled PDF forms (both tasks currently done by pdftopdf) is needed in CUPS 3.x.
>
> We should do our best to **avoid duplicate code in OpenPrinting and not re-invent the wheel**.
>
> **"universal" filter for CUPS**
>
> As a first approach to improve PPDish CUPS 2.4.x and 2.5.x I have run the [GSoC project of a universal CUPS filter](https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023), where one single CUPS filter executable does all the filtering for a job by calling filter functions, in a chain if needed. This reduces the number of external executable calls by CUPS vastly, as normally CUPS calls for each filter to run first the `cups-exec` helper program and `cups-exec` then calls the filter executable, making up 2 external executable calls per filter.
>
> The filter function chaining in the universal CUPS filter still does a fork for each filter function though and pipes the print data from filter function to filter function. Also filters of printer drivers and CUPS backends are not part of the universal filter and need to get called separately by CUPS.
>
> The disk space saved is low, as with cups-filters 2.x each filter executable in `/usr/lib/cups/filters/` is only a little code stub calling the actual filter function in libcupsfilters,
>
> Also the universal filter still needs a fix to work correctly with PPD files which use "`cupsFilter2`" instead of "`cupsFilter`" lines.
>
> So it is a little bit of a question whether it is really worth the effort to replace the individual filters called by CUPS 2.4.x and 2.5.x by this universal filter, especially also that we have only more 2 years where CUPS uses PPD files.
>
> So before I complete this (if not, the universal filter will at least be used to make cups-browsed's `implicitclass` backend use filter functions instead of external filters) I want to hear some opinions about this, especially also whether actually saving external executable calls is more resource-saving than for example saving forked parallel tasks and pipes between them.
>
> **Forking and piping vs. one filter after the other**
>
> In general if forking and piping for a filter chain consumes much more than calling each filter function one after the other directly and let them write their output into temporary files for the next filter functions in the chain reading from the previous filter function's temp file I am also thinking about adding a second mode to `filterChain()` to let it operate this way. WDYT?
>
> **Using filter functions directly in CUPS**
>
> And, finally, should we make the filter functions be directly used by CUPS, either that in CUPS 2.5.x in `scheduler/job.c` we call filter functions instead of external filter executables (at least for standard, non-driver filters), or that for CUPS 3.x we do the needed file format conversions by filter function calls (there are no driver filters)? Backends could also be converted to filter functions and be directly called. WDYT?
>
> Also, do we need extra functionality in the filter function concept for using it directly in CUPS? For example add a field to the records of the filter functions called by `filterChain()` to tell as which user each individual filter function should get run?
>
> Also, if we want CUPS to use filter functions, we need to do re-structuring to avoid circular dependencies, as libcupsfilters uses libcups and if a function in libcups would call a filter function of libcupsfilters, libcups is using libcupsfilters, ... The planned splitting of libcups, local CUPS daemon, sharing CUPS daemon of CUPS 3.x could help here as if the daemons call filter functions but not libcups, we will not get a circular dependency. WDYT?
>
> It would be great if we could discuss these topics before finalizing cups-filters 2.x

I am inviting everyone to discuss on the [OpenPrintingmailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) (subscription required for posting), either answering to the [existing thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004100.html) or starting a new one.


## CUPS-driver-retro-fitting Printer Applications
When getting some [UTAX PostScript PPD files](https://github.com/OpenPrinting/foomatic-db/pull/24) I found a bug with the PPD file handling in the retro-fitting Printer Applications.

PPD files contain a metadata field named NickName (like ``UTAX 350ci (KPDL)`). It contains make and model name of the printer followed by information about the PostScript interpreter or printer driver. This field, plus the two-character code for the PPD's user interface language in parentheses (like `(en)`) are put together (`UTAX 350ci (KPDL) (en)`) in a string and then normalized (all-lowercase, no non-alpha-numeric characters, word separation with `-`) to get a unique driver name (`utax--350-ci--kpdl-en`) for each PPD and no loss of PPD list entries caused by duplicate names. Unfortuately, the normalization code had a bug, throwing away all characters after the first closing paranthesis. This way the language code got lost and as UMAX PPDs come in 6 languages, only the versions with the language coming first in the alphabet (`(de)`) remained.

In the PostScript Printer Application not only the PPD files for the 3 UTAX printers were affected but also PPDs for all Kyocera PostScript printers (they also have `(KPDL)` in their NickName), so users of these printers had a working printer but with printer-specific options on the Printer Defaults web interface page  in German or another language.

This is [fixed now](https://github.com/OpenPrinting/cups-filters/commit/c71879afd). Now options appear in English when auto-selecting the PPD and all supported languages are available when manually selecting the model/PPD from the list when adding the printer.


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups)**

The CUPS Snap uses **cups-filters 2.x (GIT master)** now ([commit](https://github.com/OpenPrinting/cups-snap/commit/0c5c57c1))! Not only we use the newest generation of cups-filters now, but alo there are many bug fixes, especially also that Raster-only printers in cups-browsed print correctly now.

So please test the CUPS Snap, especially also whether everything in it also works nicely in the Snap environment.

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but we have agai progress here.

Only few things still need to get adjusted, once to prevent breaking the AppArmor profile by the CUPS socket path specified in the client Snaps ([discussion](https://github.com/snapcore/snapd/pull/10427#discussion_r740962760)) and second, the best location for the CUPS socket to do not interfere with other files ([discussion](https://github.com/snapcore/snapd/pull/10427#discussion_r757582011)).

Also the bug that the interface needs to get reconneted after an update of snapd needs to get fixed.

Main TODOs are:

- Complete the `cups` interface in snapd.
- Testing
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## LPrint
**[LPrint](https://www.msweet.org/lprint/) in the [Snap Store](https://snapcraft.io/lprint)**

LPrint the Printer Application for label printers, created by Michael Sweet, got now switched over to be PAPPL-based and with this it is the **first PAPPL-based, native** (non-PPD-retro-fitting) **production** Printer Application.

So not only it gives you support for many label printer models (if your label printer is not supported, some more are supported by the [Ghostscript Printer Application](https://snapcraft.io/ghostscript-printer-app)), but it also is an example for developers who want to create their own native Printer Application.

Announcement of the [**1.1.0 release**](https://openprinting.github.io/lprint-1.1.0/).


## PDFio
**[PDFio](https://www.msweet.org/pdfio/)**

PDFio is a simple library for reading and writing PDF files, but it is not a PDF renderer/rasterizer. So it does similar things as the [QPDF](https://github.com/qpdf/qpdf/) library, but using only simple C, not C++. It does not replace renderers like Ghostscript or Poppler.

Some weeks ago, the **first stable release, [1.0 of PDFio](https://www.msweet.org/blog/2021-12-14-pdfio-1.0.0.html)** got issued!

Im am thinking about switching cups-filters from QPDF to PDFio, to make libcupsfilters free of C++, but PDFio still does not support converting filled interactive PDF forms into static PDF files. A [feature request](https://github.com/michaelrsweet/pdfio/issues/20) is posted. This could also be a project for GSoC 2022.


## Snap Store Overview
From OpenPrinting we have already [6 Snaps in the Snap Store](https://snapcraft.io/search?q=OpenPrinting):

|Name|Description|Downloads|
|:---|:---|---:|
|[cups](https://snapcraft.io/cups)|[CUPS](https://github.com/OpenPrinting/cups-snap)|3730|
|[ipp-usb](https://snapcraft.io/ipp-usb)|[ipp-usb](https://github.com/OpenPrinting/ipp-usb)|1191|
|[ps-printer-app](https://snapcraft.io/ps-printer-app)|[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app)|2031|
|[ghostscript-printer-app](https://snapcraft.io/ghostscript-printer-app)|[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app)|875|
|[hplip-printer-app](https://snapcraft.io/hplip-printer-app)|[HPLIP Printer Application](https://github.com/OpenPrinting/hplip-printer-app)|3039|
|[gutenprint-printer-app](https://snapcraft.io/gutenprint-printer-app)|[Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app)|2373|


## CUPS
Currently released is [**2.4.0**](https://github.com/OpenPrinting/cups/releases/tag/v2.4.0).

CUPS is now on its best way to version 2.4.1, the first bug fix release.

Most visible fix for users and admins is probably the fix of the default setting for the "ColorModel" option in the PPD fles generated for temporary CUPS queues, as instead of the "best" choice getting selected, the "print-color-mode-default" printer IPP attribute gets used. So the PPD will have the actual default setting of the printer.

This is once the most intuitive and when the printer´s default gets changed on the server, the client follows. This makes administration a lot easier.See also the [original bug report](https://github.com/OpenPrinting/cups/issues/277).

This change I have also ported to the PPD generator of cups-filters (in both [master](https://github.com/OpenPrinting/cups-filters/commit/99d1cc62) and [1.x](https://github.com/OpenPrinting/cups-filters/commit/d335a33), included in [1.28.11](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.11)), so PPDs of cups-browsed-generated print queues and PPDs created by the `driverless` utility use the printer's color mode defaults now.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will come with CUPS 2.4.x, if all works well as Snap. The CUPS Snap and our CUPS-driver-retro-fitting Printer Application Snaps use the current GIT master of CUPS.

```
Changes in CUPS v2.4.1 (TBA)
----------------------------

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
```

## cups-filters
Currently released is [1.28.11](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.11).

We are continuing to polish and to fix bugs for the 2.0.0 release. I have especially switched the `implicitclass` backend over from using external CUPS filter executables to using filter functions, using the `universal()` filter function to create the needed filter chains. This revealed a lot of bugs in cups-filters which I have fixed now.

I have also adapted the queue naming scheme of cups-browsed to the new naming of temporary CUPS queues, without trailing underscore. This suppresses ugly duplicate entries in print dialogs.

- cups-browsed's `implicitclass` backend to dispatch jobs to cluster member printers [now uses filter functions](https://github.com/OpenPrinting/cups-filters/commit/ce332acf9) and with this it is able to print to Raster printers (see also [issue #426](https://github.com/OpenPrinting/cups-filters/issues/426).
- The `implicitclass` also polls the destination printer with a get-printer-attributes IPP request now to get exact details for the data format to send. Before only the cluster queue's PPD was used with has insufficient info, especially for raster printing ([commit](https://github.com/OpenPrinting/cups-filters/commit/de8f8566)).
- `cupsRasterPrepareHeader()` creates a complete header now, especially setting page/margin dimensions for the job's page size, filling all dependent fields, initializing header to zero, handle invalid orientation-requested values ([commit](https://github.com/OpenPrinting/cups-filters/commit/bf1acd31184)).
- `pdftopdf()` is now correctly applying all print-scaling settings also when the unprintable margins are not symmetric (top != bootom and/or lef != right, [commit](https://github.com/OpenPrinting/cups-filters/commit/31dfcae96)).
- Fixed bugs in resolver functions for DNS-SD-based URIs, to not use `stdin` without need (and so blocking the job data stream in a filter/backend) and to use the actually supplied destination URI ([commit](https://github.com/OpenPrinting/cups-filters/commit/58c47774f)).
- Added PCLm support in `cupsRasterPrepareHeader()`, to cover all kinds of driverless print data formats ([commit](https://github.com/OpenPrinting/cups-filters/commit/394544f1)).
- Fixed Apple Raster and PCLm output in `universal()` filter function, especially make PCLM being generated directly by Ghostscript ([commit](https://github.com/OpenPrinting/cups-filters/commit/44762183)).
- Updated the naming of cups-browsed's locally created print queues to match CUPS' naming of temporary queues, to avoid duplicate listings in print dialogs ([commit](https://github.com/OpenPrinting/cups-filters/commit/3d9c480)).
- PPD NickName normalization does not throw away extra text after parentheses any more now, so now Kyocera's KPDL (PostScript) printers appear correctly in ps-printer-app ([commit](https://github.com/OpenPrinting/cups-filters/commit/c71879a)).

[1.28.11](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.11)

Bug fix release, containing backports of many of the bugs recently fixed during the preparation of the cups-filters 2.x release. Important is that cups-browsed’s queue naming is aligned with CUPS’ temporary queue naming now and several bugs affecting driverless printing are fixed.

Ubuntu Jammy Jellyfish ([22.04 LTS](https://discourse.ubuntu.com/t/jammy-jellyfish-release-schedule/)) will most probably come with cups-filters 2.x. The CUPS Snap currently uses cups-filter's GIT master (2.x). The Printer Application Snaps also use the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- Braille: In vectortopdf check inkscape version to call
          inkscape with the correct command line (Issue #315, Pull
          request #443).
	- cups-browsed: Naming of local queues is matched to CUPS'
	  current naming of temporary queues (no leading or trailing
	  underscores), to avoid duplicates in print dialogs which
	  support CUPS' temporary queues.
	- libcupsfilters: Removed now obsolete apply_filters() API
	  function to call a chain of external CUPS filter
	  executables, as we have filter functions now and even can
	  call one or another filter executable (or even backend) via
	  filterExternalCUPS().
	- cups-browsed, implicitclass: Let the implicitclass backend
	  use filter functions instead of calling filter executables.

	- Build system: Let ./configure not error out when there is
	  more than one DejaVuSans.ttf test font candidate or if there
	  is no DejaVuSans.ttf at all installed (Issue #300, #411).
```

```
CHANGES IN V1.28.11

	- libcupsfilters: Let PPD generator take default ColorModel
	  from printer (CUPS issue #277).
	- Braille: In vectortopdf check inkscape version to call
	  inkscape with the correct command line (Issue #315, Pull
	  request #443).
	- Build system: Make missing DejaVuSans.ttf non-fatal in
	  ./configure as the font is only needed for test programs,
	  not for actual use of cups-filters (Issue #411).
	- libcupsfilters: In imagetoraster() fixed crash with SGray
          (Issue #435).
	- cups-browsed: Naming of local queues is matched to CUPS'
	  current naming of temporary queues (no leading or trailing
	  underscores), to avoid duplicates in print dialogs which
	  support CUPS' temporary queues.
	- libcupsfilters: Make cupsRasterParseIPPOptions() work correctly
	  with PPDs (Issue #436).
	- libcupsfilters: Let colord_get_profile_for_device_id() not
	  return empty file name, to avoid error messages in CUPS
	  error_log.
	- foomatic-rip: Debug message was wrongly sent to stdout and
	  not to log (Issue #422).
```


## PAPPL
Currently released is [1.1.0](https://github.com/michaelrsweet/pappl/releases/tag/v1.1.0).

> PAPPL v1.1.0 is now available for download. PAPPL v1.1 adds support for Wi-Fi configuration, IPP-USB, printer driver lookup and auto-add functionality, improves management of multiple printers, and adds support for Microsoft® Windows® 10 and higher.

All the CUPS-driver-retro-fitting Printer Applications in the Snap Store (see above) use the current GIT master of PAPPL, so they contain all the latest fixes and improvements.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.
