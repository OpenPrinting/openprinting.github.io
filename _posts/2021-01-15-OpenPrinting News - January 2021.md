---
title: OpenPrinting News - January 2021
layout: single
author: Till
excerpt: PAPPL 1.0.1, PostScript Printer Application, GSoC 2021, LFMP projects ended, CUPS, cups-filters
---
## Google Summer of Code 2021
The time window for the mentoring organizations to [apply](https://summerofcode.withgoogle.com/) will be Jan 29 - Feb 19, 2021. See also the [complete timeline](https://developers.google.com/open-source/gsoc/timeline). We will again apply for the Linux Foundation as mentoring organization, as in the previous years, OpenPrinting being one of the sub groups.

We are still looking for project ideas to get a good number lined up before applying.

As mentioned [already in October](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021) student projects will only be half the time (6 weeks). So this has to be taken into account and larger projects we should consider to run under the Linux Foundation Mentoring Program instead of GSoC.

## Linux Foundation Mentorship Program
Our [IPP Scan LFMP project](https://mentorship.lfx.linuxfoundation.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) has ended, with both Abhik Chakraborty and Rishabh Arya having completed their work successfully and preparing their final reports. Their work of adding IPP Scan as a server to PAPPL is currently available in [Abhik's GitHub repository](https://github.com/Abhik1998/pappl) and Rishabh's earlier work on [sane-airscan](https://github.com/alexpevzner/sane-airscan/) in the [IPP Scan repository of sane-airscan](https://github.com/alexpevzner/sane-airscan-ipp/).

## PostScript Printer Application
The development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) is going on and has driven the development of PAPPL forward.

The PostScript Printer Application got several new features:
- Extra per-printer web interface page "Device Settings" for configuration of which optional hardware add-ons are actually installed ("Installable Options" group in the PPD files). The user selects which add-ons (extra trays, duplex unit, finishers, ...) are installed and the options and choices on the "Printing Defaults" page and also the capabilities reported as response to a get-printer-attributes IPP request from a client get appropriately adapted.
- Polling add-on setup and option defaults from the printer, triggered by buttons on the "Device Settings" web interface page.
- New "Add PPDs" web interface page for the user to add extra PPD files to the Printer Application, to use PostScript printers not supported by the already included PPDs. Especially important when the PPD for a printer is not available under a free license.
- Support for collated copies (PDF or PostScript input only)
- Support for custom page sizes (but currently [the size can only be set in inches](https://github.com/michaelrsweet/pappl/issues/118)).
- Made "Identify Printer" work, simply by sending a zero-page job with a certain delay between beginning and end, to make the printer light up its display and make noise (and perhaps also show job info on the display).

Next steps will be:
- When auto-selecting driver prefer user-added PPDs (the user added them because he wants to use them) and also prefer PPDs in the system's language or at least in English.
- Display results of PPD upload: Errors, warnings, successful uploads, issue a warning also for PPDs with `*cupsFilter(2): ...` lines.
- Display all user-added PPD files with checkboxes for deleting them.
- Ignore PPD options which do not have PostScript or PJL code snippets for the option choices.

With appropriate features added to PAPPL we will be able to also add the following:
- Make Snap fire up Printer Application automatically as daemon and Printer Application set up USB printers automatically when they get connected (needs [support in PAPPL](https://github.com/michaelrsweet/pappl/pull/36).
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

As other retro-fitting Printer Applications also use most of what we have in the PostScript Printer Application now (as PPDs are used) I am thinking about renaming the "ps-printer-app" project into "retro-fit-printer-app", and adding conditional compiling to activate and de-activate the appropriate pieces of code for the actual Printer Applications: PostScript, Foomatic, Ricoh, HPLIP, ... and create appropriately named projects (like "ps-printer-app") on the GitHub only for the snapping and putting into the Snap Store.

## CUPS
Currently released is 2.3.3op1.

This release made it already into Debian and Ubuntu.

Fedora/Red Hat is using the OpenPrinting fork of CUPS, too, and we already have some contributions from Zdenek Dohnal from Red Hat, meaning that the patches of the different distributions get merged in the fork.

```
Changes in CUPS v2.3.3op2
-------------------------

- Clarified the documentation for the "Listen" directive (Issue #53)
- Fixed duplicate ColorModel entries for AirPrint printers (Issue 59)
- Fixed directory/permission defaults for Debian kfreebsd-based systems
  (Issue #60, Issue #61)
- The scheduler's systemd service file now waits for the nslcd service to start
  (Issue #69)
- Root certificates were incorrectly stored in "~/.cups/ssl".
```

## cups-filters
Currently released is 1.28.7.

On the way towards 2.0.0 and driven by the further development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) I have added the following new feature:
- Let the filter functions not load the PPD and not mark options in the PPD files to make them better usable with Printer Applications and to avoid race conditions in filter chains.

Important bug fixes, applied to both 1.x and 2.x are
- The `driverless` utility does not check the printers for driverless support quality any more. Each printer got polled with up to 3 get-printer-attributes IPP requests and this takes significant time, especially when there are many printers, making [CUPS timing out and do not show any available driver at all](https://github.com/OpenPrinting/cups/issues/65).
- In the PPD generator for setting up driverless IPP printers with CUPS prefer Apple Raster instead of PDF due to [compatibility problems with some printers](https://github.com/OpenPrinting/cups-filters/issues/331).

[1.28.7](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.7):

Bug fix release to remove the support quality check from the "driverless" utility to do not break CUPS' PPD listing facility and several fixes for generating PPDs for driverless printers

```
CHANGES IN V2.0.0

	- Build system: Add files in gitignore that are generated by
	  "autogen.sh", "configure", and "make" (Pull request #336).
	- implicitclass: Added "#include <signal.h>" (Issue #335).
	- libppd: Removed versioning.h and the macros defined in this
	  file (Issue #334).
	- driverless: Removed the support quality check from Pull
	  request #235 as it takes significant time for each printer
	  being listed, making cups-driverd (`lpinfo -m`) timing out
	  when there are many printers (OpenPrinting CUPS issue #65).
	- libcupsfilters: Let the filter functions not load the PPD
	  and not mark options in the PPD files to make them better
	  usable with Printer Applications and to avoid race
	  conditions in filter chains. To keep the behavior of CUPS
	  filters, changed the filterCUPSWrapper() function
	  appropriately.
	- libcupsfilters, libppd: In the PPD generators give priority
	  to Apple Raster against PDF (Issue #331).
```

```
CHANGES IN V1.28.7

	- driverless: Removed the support quality check from Pull
	  request #235 as it takes significant time for each printer
	  being listed, making cups-driverd (`lpinfo -m`) timing out
	  when there are many printers (OpenPrinting CUPS issue #65).
	- libcupsfilters: In the PPD generator give priority to Apple
	  Raster against PDF (Issue #331).
	- libcupsfilters: Added NULL check when removing ".Borderless"
	  suffixes from page size names (Issue #314, Pull request
	  #328).
	- libcupsfilters: In the cupsRasterParseIPPOptions() map the
	  color spaces the same way as in the PPD generator (Issue
	  #326, Pull request #327).	
	- libcupsfilters: Fixed addition of grayscale mode in
	  generated PPD files, to avoid duplicate entries
	  (OpenPrinting CUPS issue #59).
```

## PAPPL
Currently released is 1.0.1.

Michael Sweet has now issued a first bug fix update of PAPPL, version [1.0.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.1).

Many bug fixes are resulting from Coverity and also from my further development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app).

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

Didier Raboud, printing maintainer at Debian, is already starting on packaging PAPPL.

```
Changes in v1.1b1
-----------------

- Added `PAPPL_SOPTIONS_NO_TLS` option to disable TLS support.


Changes in v1.0.2
-----------------

- The `papplSystemSetVersions` function now allows changes while the system is
  running (Issue #123)
- The `papplPrinterSetDriverDefaults` function did not validate the defaults
  against the actual driver data.
- The IPP interface no longer allows the Create-Printer operation for single
  queue applications.


Changes in v1.0.1
-----------------

- Documentation updates (Issue #105)
- The `papplSystemLoadState` function did not load vendor attribute defaults
  correctly (Issue #103)
- Vendor options without "xxx-supported" attributes are no longer shown on the
  printing defaults page (Issue #104)
- Added support for Windows 10/Mopria clients that incorrectly convert the
  printer resource path to lowercase (Issue #106)
- The `papplSystemLoadState` function now calls the printer driver's status
  callback after loading the printer's attributes (Issue #107)
- Added additional error handling for memory allocations throughout the library
  (Issue #113)
- Fixed an issue with validation of custom media sizes (Issue #120)
- Partially-discovered SNMP printers would cause a crash (Issue #121)
- The "copies-supported" attribute was not report correctly.
- Job operations that targeted a non-existent job yielded the wrong status code.
- Printing a test page from the web interface did not trigger a reload to update
  the printer and job state.
- The TLS web page was hardcoded to use "/etc/cups" for the CUPS server root.
- Fixed file output when the job name contains a '/'.
- Updated 1-bit driver output to support "photo" dither array for high print
  quality.
- PAPPL now (re)creates the spool directory as needed.
- Coverity: Added missing NULL checks.
- Coverity: Fixed file descriptor leaks.
- Coverity: Fixed some locking issues.
- Coverity: Fixed printer-darkness-configured bug in `papplSystemSaveState`.
- Coverity: Fixed an error handling bug in the file printing code for the PWG
  test driver.
- Coverity: Removed dead code.
```
