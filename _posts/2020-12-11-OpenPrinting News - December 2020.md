---
title: OpenPrinting News - December 2020
layout: single
author: Till
excerpt: PAPPL 1.0.0, PostScript Printer Application, GSoC 2021, GSoD ended, CUPS 2.3.3op1, cups-filters
---
## Google Summer of Code 2021
We are currently looking for project ideas for next year's Google Summer of Code.

As mentioned [already in October](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021) student projects will only be half the time (6 weeks). Google tells that this will probably attract more students, but for us it is a much higher workload as we have to find the double amount of students and get the double amount of students introduced and up to speed to get the same work done.

For larger projects we should also consider to run them under the Linux Foundation Mentoring Program instead of GSoC.

## Google Season of Docs 2020

The standard length (3 months) projects of this year's Google Summer of Docs have ended and so also our OpenPrinting project done by Piyush Goyal. His work continues to be available [on our web site](https://openprinting.github.io/documentation/) and he has also put up his [final report](https://docs.google.com/document/d/1ZWaDt897MyoiNDkgrvO8vU_SlGwQI8cIfuhsA0c3Q7A/).

Piyush also reported his successful conclusion of GSoD on [LinkedIn](https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A6742723576908038144/) and thanked his mentors and others on OpenPrinting who helped him.

Only part not completed is the [section about Scanning](https://openprinting.github.io/documentation/03-designing-scanner-drivers/) as the implementation os scanning support in PAPPL is still work in progress.

## PAPPL 1.0.0 released!
Michael Sweet has issued the first stable release of PAPPL, version [1.0.0](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.0).

With the help of my issue reports and feature requests during the development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) he reached a certain feature-completeness for the first stable version.

Especially following features are now available in PAPPL:
- Automatic driver/model selection based on the printer's device ID, device ID obtained from USB printers and network printers, the latter discovered via IPP or SNMP.
- Fallback to automatic driver selection if in an update of the Printer Application the selected driver does not exist any more.
- Adding user-settable options/IPP attributes specific to the individual Printer Application and settable via web interface or as command line options when submitting a job.
- Adding web interface pages for functionality specific to the individual Printer Application. Adding buttons and navigation bar items to access them. All can be done either per-printer or for the system.
- Saving parameters specific to the individual Printer Application which are not necessarily user-settable options as "...-default" IPP attributes in the state file.
- Support for non-raster, high-level output formats (PostScript, PDF, PCL-XL, ...) with direct conversion from PDF or PostScript input without inbetween raster graphics step. Also useful for retro-fitting classic drivers which output a proprietary raster format but only accept high-level input formats (like Ghostscript's built-in drivers).
- Support for data-driven (not hard-coded in the Printer Application's C code) driver lists and parameters.
- Improved user experience and stability.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

Michael Sweet is now continuing the development towards version 1.1.

Next step is for the Linux distributions to package and include PAPPL.

## PostScript Printer Application
The devlopment of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) is going on and has driven the development of PAPPL forward.

The PostScript Printer Application got several new featrures:
- Automatic selection of the printer model by simply selecting "Auto-detect Driver" (the default) for the driver instead o weeding through a long list (currently around 4000 models), also the `autoadd` option of the command line interface uses this functionality.
- Auto-selecting the printer model and the "autoadd" option always check whether the printer actually supports PostScript, independent whether it is in the list of explicitly supported model, for generic support of models not explicitly supported and to make sure that an optional PostScript add-on is actually installed.
- Quick 1-bit-dithered raster output for monochrome/grayscale jobs in draft
print quality. This reduces the raster data sent to the printer a lot and this way speeds up the jobs significantly.
- Not only the standard options of the PPD files, which can be represented by IPP attributes, but also vendor-specific PPD options are suppprted now. The latter can at least be controlled by the "Printing Defaults" page of the web interface and by supplying them when submitting a job via the Printer Application's command line interface.
- Printing a test page via appropriate button in the web interface. The test page is the good, old, 20-years-old CUPS test page from the pre-PDF era. It shows valuable information about the PostScript printer it is printed on and works with practically any page size.
- Improvements on the user experience: No options with a single choice displayed, options with human-readable choices named "true" and "false" displayed as boolean check box options, "OutputBin" only displayed when it is actually in the PPD file.
- Lots of bug fixes, including for [the very first bug report we got](https://github.com/OpenPrinting/ps-printer-app/issues/1).

We get closer to completing this Printer Application. Features still planned are:

- Extra per-printer web interface page for device settings, especially configuration of which optional hardware add-ons are actually installed ("Installable Options" group in the PPD files). So the user selects which add-ons (extra trays, duplex unit, finishers, ...) are installed and the options and choises on the "Printing Defaults" page and also the capabilities reported as response to a get-printer-attributes IPP request from a client get appropriately adapted. Also polling add-on setup and option defaults from the printer will be available on this page.
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).
- Web interface page for user to add extra PPD files
- Checking PPD files for `*cupsFilter(2): ...` lines and for options without PostScript/PJL/JCL code. These are hints for unsuitable, typically non-PostScript PPD files or options based on host-side extra filters. Such PPDs and/or unsuitable options should get removed, during Snap build, during building of Printer Application's driver list, when user adds a PPD.
- Make Snap fire up Printer Application automatically as daemon and Printer Application set up USB printers automatically when they get connected (needs [support in PAPPL](https://github.com/michaelrsweet/pappl/pull/36).

We also need to put up the PostScript Printer Application in the Snap Store soon.

Before starting with further driver-retro-fitting Printer Applications I am thinking about spinning some of code of the PostScript Printer Application out into a library for retro-fitting Printer Applications, like `libpappl-retrofit` or similar.

## CUPS
Currently released is 2.3.3op1.

Note that from now on I will report releases on our [fork of CUPS on OpenPrinting](https://github.com/OpenPrinting/cups) here.

With [2.3.3op1](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op1) Michael Sweet has issued the first CUPS release on OpenPrinting!

The release already made it into Debian unstable and will soon get merged into Ubuntu Hirsute Hippo (21.04). Also the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) is updated to this version.

We will from now on present the new items in `CHANGES-OPENPRINTING.md` of the fork here:

```
Changes in CUPS v2.3.3op2
-------------------------

- Clarified the documentation for the "Listen" directive (Issue #53)
- Fixed duplicate ColorModel entries for AirPrint printers (Issue 59)
- Fixed directory/permission defaults for Debian kfreebsd-based systems
  (Issue #60, Issue #61)


Changes in CUPS v2.3.3op1
-------------------------

- The automated test suite can now be activated using `make test` for
  consistency with other projects and CI environments - the old `make check`
  continues to work as well, and the previous test server behavior can be
  accessed by running `make testserver`.
```

## cups-filters
Currently released is 1.28.6.

On the way towards 2.0.0 and driven by the further development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) I have added the following new features:
- Overtaken all fixes and improvements from the PPD generator in current libcups to the PPD generator implementations in libppd and libcupsfilters.
- Made `cupsRasterParseIPPOptions()` function (called from filter functions used without PPD file) consistent with the changes in the PPD file generators. 
- Added the possibility to define a callback function to tell a filter function when the job got canceled. Before, a pointer to an integer was used. This change is to get more flexibility and especially to support the papplJobIsCanceled() of PAPPL.
- Added support for Sharp-proprietary "ARDuplex" PPD option name for double-sided printing.
- Moved the functions ppdPwgUnppdizeName(), ppdPwgPpdizeName(), and ppdPwgPpdizeResolution() into the public API of libppd.
- In the ppdPwgUnppdizeName() allow to supply NULL as the list of characters to be replaced by dashes. Then all non-alpha-numeric characters get replaced, to result in IPP-conforming keyword strings.

```
CHANGES IN V2.0.0

	- libcupsfilters: In the cupsRasterParseIPPOptions() map the
	  color spaces the same way as in the PPD generator (Issue
	  #326, Pull request #327).	
	- libcupsfilters, libppd: In generated PPDs add a grayscale
	  mode if there are only color printing modes (from
	  OpenPrinting CUPS).
	- libcupsfilters, libppd: In generated PPDs add an "OutputBin"
	  option also if it has only one choice (OpenPrinting CUPS
	  pull request #18).
	- libcupsfilters, libppd: Generated PPDs could have an
	  "Unknown" default InputSlot (OpenPrinting CUPS issue #44).
	- cups-browsed: Removed unneeded IPP attribute additions
	  preventing the created local queues from preserving a
	  location or description the user assigns to them (Issue
	  #323).
	- cups-browsed: Removed all calls of the resolve_uri() function
	  of libcupsfilters, as these are not actually needed and in case
	  the supplied DNS-SD-based URI is not resolvable, the function
	  gets stuck for ~5 seconds.
	- libcupsfilters: Added the possibility to define a callback
	  function to tell the filter function when the job got
	  canceled. Before, a pointer to an integer was used. This
	  change is to get more flexibility and especially to support
	  the papplJobIsCanceled() of PAPPL.
	- Build system: Added missing library dependencies to the
	  filters to make parallel builds work (Issue #319).
	- libppd, libcupsfilters, bannertopdf, texttopdf: Added
	  support for Sharp-proprietary "ARDuplex" PPD option name for
	  double-sided printing.
	- libppd: Move the functions ppdPwgUnppdizeName(),
	  ppdPwgPpdizeName(), and ppdPwgPpdizeResolution() into the
	  public API.
	- libppd: In the ppdPwgUnppdizeName() allow to supply NULL as
	  the list of characters to replace by dashes. Then all non-
	  alpha-numeric characters get replaced, to result in IPP-
	  conforming keyword strings.
	- libppd: Correct conversion between PPD option names and IPP
	  attribute names, duplicate dashes like "Tray-2" -> "tray--2"
	  (OpenPrinting CUPS pull request #23).
	- cups-browsed: Silenced compiler warning.
	- foomatic-rip: Fix infinite loop and input from file on raw
	  printing (Pull request #318).
```

```
CHANGES IN V1.28.7

	- libcupsfilters: Added NULL check when removing ".Borderless"
	  suffixes from page size names (Issue #314, Pull request
	  #328).
	- libcupsfilters: In the cupsRasterParseIPPOptions() map the
	  color spaces the same way as in the PPD generator (Issue
	  #326, Pull request #327).	
	- libcupsfilters: Fixed addition of grayscale mode in
	  generated PPD files, to avoid duplicate entries
	  (OpenPrinting CUPS issue #59).

CHANGES IN V1.28.6

	- libcupsfilters: In generated PPDs add a grayscale mode if
	  there are only color printing modes (from OpenPrinting
	  CUPS).
	- libcupsfilters: In generated PPDs add an "OutputBin" option
	  also if it has only one choice (OpenPrinting CUPS pull
	  request #18).
	- libcupsfilters: Generated PPDs could have an "Unknown"
	  default InputSlot (OpenPrinting CUPS issue #44).
	- cups-browsed: Removed unneeded IPP attribute additions
	  preventing the created local queues from preserving a
	  location or description the user assigns to them (Issue
	  #323).
	- cups-browsed: Removed all calls of the resolve_uri() function
	  of libcupsfilters, as these are not actually needed and in case
	  the supplied DNS-SD-based URI is not resolvable, the function
	  gets stuck for ~5 seconds.
	- cups-browsed: Fixed several memory leaks, mainly from the
	  code to merge printer IPP attributes for clusters (Pull
	  request #322).
	- cups-browsed: Silenced compiler warning.
	- foomatic-rip: Fix infinite loop and input from file on raw
	  printing (Pull request #318).
	- foomatic-rip: Remove temporary file created during pdf-to-ps
	  conversion (Pull request #313).
```
