---
title: OpenPrinting News - June 2021
layout: single
author: Till
excerpt: GSoC, PostScript Printer Application and PIN-based printing, Retro-fitting CUPS printer drivers
---
## Want more news?
Are you always eagerly waiting until I issue my next news post here after a month?

Due to the fact that I am working at Canonical (the company behind Ubuntu) I also post [weekly updates](https://discourse.ubuntu.com/c/desktop/team-updates/) about my work (which is mainly OpenPrinting but also printing integration in Ubuntu) in the [Discourse forum of Ubuntu](https://discourse.ubuntu.com/).

## Google Summer of Code 2021
The coding period has started a week ago and now, after some of the students having finished their exams, they are all working on their projects. They have now 9 weeks until mid-August for their coding work.

## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 1800 installations via Snap Store**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but unfortunately, they are very busy currently.

Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces
- Testing
- Turn classic CUPS drivers into Printer Applications
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap.

## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 1000 installations via Snap Store**

Features and fixes in the past month (follow the links to the commits for more detailed descriptions and motivations):

- Support for CUPS filters used in PostScript PPD files. The manufacturers of PostScript printers got aware of the shortcomings of the PPD file concept and work around them using CUPS filters for more complex conversion of option settings into PostScript or PJL code. The PostScript Printer Application [supports such filters now](https://github.com/OpenPrinting/ps-printer-app/commit/c8e298da4) and if the appropriate filter is actually installed, all PPD options for the printer get available. This is the first application of the new [`filterExternalCUPS()` filter function](#retro-fitting-of-cups-printer-drivers-into-printer-applications) in cups-filters.
- Support for printing [private jobs (with PIN protection) on HP printers](https://github.com/OpenPrinting/ps-printer-app/commit/6e51d3fa1) in the Snap of the PostScript Printer Application. Here we make use of the CUPS filter support for the first time, adding the `hpps` filter of the HPLIP package. The options to control PIN-protected printing are under the "Printing Defaults" in the web interface.
- Support for the [CUPS extension of PPDs for custom option settings](https://openprinting.github.io/cups/doc/spec-ppd.html#OPTIONS), as strings, password, numeric values, fax/phone numbers, ... This is especially needed by the PostScript printer PPD files from Ricoh and OEMs as here the PINs are entered as string-type options. Note that this change is not yet in the GIT repository of the PostScript Printer Application, as it still needs [PAPPL's string option support to get fixed](https://github.com/michaelrsweet/pappl/issues/142). Patches with the changes on both [PAPPL](https://github.com/michaelrsweet/pappl/files/6641859/support-text-string-vendor-options.patch.txt) and the [PostScript Printer Application](https://github.com/michaelrsweet/pappl/files/6643918/ppd-cups-custom-options-support.patch.txt) for implementing this feature are included in the issue report.

Note that these changes only apply to a few PostScript Printers and only to enable features which are not used very often, but they are especially done with general retro-fitting of CUPS printer drivers in mind, where CUPS filters defined in the PPD file and string/text/numeric/fax number options are commonplace.

With appropriate features added to PAPPL we will be able to also add the following:
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142).
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.


## Retro-fitting of CUPS printer drivers into Printer Applications

Currently I am working towards retro-fitting classic CUPS printer drivers into Printer Applications. Here I have especially done the following:

**Automatic selection of extended Color spaces**

[Completed first version](https://github.com/OpenPrinting/cups-filters/commit/b06d4899cee7) of implementing automatic selection of the extended print quality features 16-bit-per-color (high color depth/dynamic range) and AdobeRGB (wide color gammut) via `print-quality=high` setting and document color space on driverless IPP printers. Created library functions in libcupsfilters for it and applied them to the ghostscript() filter function. Modified the PPD file generator for CUPS queues appropriately.

Discussion in [this thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/003997.html) on the [OpenPrinting mailing list](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/thread.html) and [this thread](https://ghostscript.com/pipermail/gs-devel/2021-May/010439.html) on the [Ghostscript developer mailing list](https://ghostscript.com/pipermail/gs-devel/2021-May/thread.html).

Details of my commit in the threads on [OpenPrinting](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004027.html) and [Ghostscript](https://ghostscript.com/pipermail/gs-devel/2021-May/010456.html) mailing lists).

We came to the [conclusion](https://lists.linuxfoundation.org/pipermail/printing-architecture/2021/004044.html) that the PDF print job output of user applications lacks information about the actually used color space/profile (sRGB, AdobeRGB, custom). I was unable to correctly print a JPEG photo shot with the camera set to AdobeRGB on an AdobeRGB-supporting printer with CUPS from photo management/editor applications. 

Please subscribe to the [OpenPrinting mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) and/or to the [Ghostscript mailing list](https://ghostscript.com/cgi-bin/mailman/listinfo/gs-devel) to participate in the discussions.

**Made foomatic-rip streaming PostScript, feed Raster to it as PostScript**

I investigated how raster data can get streamed into `foomatic-rip` for the Foomatic/Ghostscript Printer Application and also for using `foomatic-rip` with Ricoh's PostScript PPD files in the PostScript Printer Application to enable secure (PIN-protected) printing. Started a [thread](https://ghostscript.com/pipermail/gs-devel/2021-June/010469.html) about this on the [Ghostscript mailing list](https://ghostscript.com/pipermail/gs-devel/2021-June/thread.html).

Please subscribe to the [Ghostscript mailing list](https://ghostscript.com/cgi-bin/mailman/listinfo/gs-devel) to participate in the discussions.

As PostScript is a streamable format but PDF is generally not, I decided to make Raster input data to be converted into a PostScript stream, especially with this already being implemented in the PostScript Printer Application. So the Ghostscript used by the legacy driver gets the Raster input streamed in as PostScript and prints each page as it completes, allowing streaming and infinite jobs as required by the driverless IPP printing standards. If the input was PDF Ghostscript reads until the end of the job/document before starting to print the first page.

For this I also did a fix on [the zero-page job handling in `foomatic-rip`](https://github.com/OpenPrinting/cups-filters/pull/209) to make it able to [stream PostScript input again](https://github.com/OpenPrinting/cups-filters/commit/fd3510646).

**filterExternalCUPS() filter function to call classic CUPS filters**

The ideal way to convert a classic CUPS driver into a Printer Application is to take the copde of the driver and re-arrange it into a native Printer Applications, to get rid of calling external executables and using PPD files altogether. Problem is that this requires access to the source code, understanding of the source code andf reliable ways for testing, ideally having all supported printer models at hand.

Unfortunately, many of the drivers we want to convert are old, unmaintained code, authors do not have these printers any more, not remembering any more for waht exactly all these parts of their code were good for, and there are even proprietary drivers for which we do not even have the source code. And do not think that OpenPrinting has every printer which ever came to the market, so that we can test.

Therefore our strategy of converting such printer drivers is wrapping their unchanged code into Printer Applications, what we call retro-fitting printer drivers. To call the original CUPS printers without turning them into filter functions I have created the [new `filterExternalCUPS()` filter function](https://github.com/OpenPrinting/cups-filters/commit/8ea2006a0) in libcupsfilters which calls a CUPS filter, specified in the filter-function-specific parameters. The filter function also allows to supply options and environment variables only applied to this filter, not to the whole filter chain.

The new filter function is already in use in the [PostScript Printer Application](#postscript-printer-application) to support PostScript PPD files which specify CUPS filters, as the ones from HP which use a filter for secure, PIN-based printing.

**Filter and custom option support in PostScript Printer Application**

As already described [above](#postscript-printer-application) we got more techniques important for retro-fitting classic CUPS drivers into the PostScript Printer Application, which will be the base for a driver retro-fitting library.

This is especially the support for CUPS filters and the support for custom (string/text/numeric/...) option settings.


## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 17 months.

Ubuntu Hirsute Hippo (21.04) comes with CUPS 2.3.3op2, the CUPS Snap and the PostScript Printer Application Snap use the current GIT master.

```
CUPS v2.4rc1 (Pending)
----------------------

- Now always pass "localhost" in the `Host:` header when talking over a domain
  socket or the loopback interface (Issue #185)

- Fixed an edge case in `ippReadIO` to make sure that only complete attributes
  and values are retained on an error (Issue #195)

- Fixed some Windows issues.
```

## cups-filters
Currently released is [1.28.8](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.8).

Feature additions are principally done forretro-fitting classic CUPS drivers, see details in the [separate section](#retro-fitting-of-cups-printer-drivers-into-printer-applications):

- Automatic selection of extended Color spaces
- Made foomatic-rip streaming PostScript, feed Raster to it as PostScript
- Added `filterExternalCUPS()` filter function to call classic CUPS filters

Also some bug fixes were done, especially letting the `driverless` utility not
error-exit if no supported printer got discovered.

Ubuntu Hirsute Hippo (21.04) comes with cups-filters 1.28.8, also the CUPS Snap currently uses this version. The PostScript Printer Application Snap uses the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- libcupsfilters: Removed duplicate code in the
	  apply_filters() function.
	- libcupsfilters: Added new filterExternalCUPS() filter
	  function which calls an external CUPS filter executable
	  specified in the parameters, for example a legacy or
	  proprietary printer driver which cannot be converted into a
	  filter function.
	- driverless: If there are no driverless IPP printers
	  available let "driverless" terminate with exit code 0 and
	  not 1, to follow CUPS' standard of backends in discovery
	  mode terminating with 0 if there are no appropriate printers
	  found (Issue #375).
	- foomatic-rip: The fixes for zero-page-job handling (Pull
	  request #209) broke PostScript streaming support. Changed
	  method to check whether a PostScript input file is non-empty
	  to only need to read and buffer the input up to the first
	  page.
```

## PAPPL
Currently released is [1.0.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.3).

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

