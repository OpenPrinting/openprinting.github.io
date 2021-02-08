---
title: OpenPrinting News - February 2021
layout: single
author: Till
excerpt: PostScript Printer Application, GSoC 2021 project ideas, IPP Scan, CUPS 2.3.3op2, cups-filters, PAPPL
---
## Google Summer of Code 2021
The time window for the mentoring organizations to [apply](https://summerofcode.withgoogle.com/) has opened and the deadline is Feb 19, 2021 ([Timeline](https://developers.google.com/open-source/gsoc/timeline)). We are applying again for the Linux Foundation as mentoring organization, as in the previous years, OpenPrinting being one of the sub groups.

OpenPrinting's project ideas are [posted](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2021-openprinting-projects), but further ideas are still welcome. Note that the projects are half-length this year, 175 hours instead of 350 hours (see our October news](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021). Larger projects we should run in the under the Linux Foundation Mentoring Program instead of GSoC.

## IPP Scan in PAPPL
The students of our [IPP Scan LFMP project](https://mentorship.lfx.linuxfoundation.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) did not do all points needed to complete the IPP Scan server support, but are still working on the missing points. Michael Sweet posted [on the PAPPL GitHub](https://github.com/michaelrsweet/pappl/projects/3) what is still needs to be done.

## PostScript Printer Application
The [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) got complete as far as it is possible with the current state of [PAPPL](https://github.com/michaelrsweet/pappl/). The PostScript Printer Application got also tested running in a Snap package.

The new features added after the January news post are:

*User PPD file upload*
- When auto-selecting the driver (model) we prefer user-added PPDs (the user added them because he wants to use them) now and also prefer English PPDs if there are several languages available.
- For manual selection clearly we mark the user-added PPD files in the driver list with "USER-ADDED".
- Added a "Refresh" button to update the driver list after manually (not via the Printer Applications web interface) copying PPDs into the user PPD directory.
- The results of a PPD upload are now displayed. Errors, warnings, successful uploads, ...
- We issue a warning for PPDs with `*cupsFilter(2): ...` lines as they are potentially non-PostScript PPDs (CUPS drivers). We do not reject them as sometimes PostScript PPDs also use a CUPS filter, often only for a few non-essential options.
- All user-added PPD files are displayed in a list now, with checkboxes for deleting them. So the user can easily manage the extra PPDs he is using.
- Options in the PPD files which do not have PostScript or PJL code snippets for their choices are ignored now, as without code being inserted into the job data these options have no effect to the job. Such options usually appear in PPDs with a `*cupsFilter(2): ...` and the filter does the needed (usually more complex) modifications in the job data stream.
- If the `PageSize` option does not provide code to insert in the job data stream we reject the PPD, as the `PageSize` option is the only absolutely required option in a PPD file.

*Running the PostScript Printer Application in a Snap*
- The state file path can be supplied via environment variable now, so in the Snap a suitable path can easily be used.
- The Snap auto-starts the server now.
- Set `TMPDIR` environment variable so that the filter functions used by the Printer Application work correctly in the Snap.
- The code is tested and some fixes in the Snap packaging done so that it correctly runs as root in the Snap and clients can access it correctly, especially one can print with CUPS now.

*Important bug fix*
- The Printer Application was not able to load state files of more than 4096 bytes and we assumed that this was a [PAPPL bug](https://github.com/michaelrsweet/pappl/issues/135), but in fact the state got already save again before loading it was completed. This is [fixed now](https://github.com/OpenPrinting/ps-printer-app/commit/51f670d56).

Also several further bug fixes got done.

With appropriate features added to PAPPL we will be able to also add the following:
- Make the Printer Application set up USB printers automatically when they get connected (needs [support in PAPPL](https://github.com/michaelrsweet/pappl/pull/36).
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.

As other retro-fitting Printer Applications also use most of what we have in the PostScript Printer Application now (as PPDs are used) I will create a new library for retro-fitting printer drivers into PAPPL-based Printer Applications (perhaps called `libpappl-retrofit`?). I will then move functions of the PostScript Printer Application which are useful also in other driver-retro-fitting Printer Applications into the new library, here I am especially thinking about PPD-file-related functions and PostScript-related functions.

The ideas of renaming the "ps-printer-app" project into "retro-fit-printer-app" and adding conditional compiling I have dropped now.

## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

This [release](https://openprinting.github.io/cups-2.3.3op2/) contains a security fix and several other bug fixes.

It made it already into Debian.

```
Changes in CUPS v2.3.3op2
-------------------------

- Security: Fixed a buffer (read) overflow in the `ippReadIO` function
  (CVE-2020-10001)
- Clarified the documentation for the "Listen" directive (Issue #53)
- Fixed duplicate ColorModel entries for AirPrint printers (Issue 59)
- Fixed directory/permission defaults for Debian kfreebsd-based systems
  (Issue #60, Issue #61)
- Fixed crash bug in `ppdOpen` (Issue #64, Issue #78)
- Fixed regression in `snprintf` emulation function (Issue #67)
- The scheduler's systemd service file now waits for the nslcd service to start
  (Issue #69)
- The libusb-based USB backend now uses a simpler read timer implementation to
  avoid a regression in a previous change (Issue #72)
- The PPD caching code now only tracks the `APPrinterIconPath` value on macOS
  (Issue #73)
- Fixed segfault in help.cgi when searching in man pages (Issue #81)
- Root certificates were incorrectly stored in "~/.cups/ssl".
```

## cups-filters
Currently released is [1.28.7](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.7).

On the way towards 2.0.0 and driven by the further development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) I have added the following new features:
- libcupsfilters: When normalizing printer model name replace '+' by "plus" (the `+` sign appears often in printer model names but gets dropped in IPP-style strings)
- libppd: In the ppdPwgUnppdizeName() function support negative numbers (straight conversion to IPP style drops the negative sign).

I have also posted [several GSoC 2021 project ideas](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2021-openprinting-projects) for cups-filters 2.x.

Bug fix, applied to both 1.x and 2.x:
- In the PPD generator for setting up driverless IPP printers with CUPS prefer Apple Raster instead of PDF due to [compatibility problems with some printers](https://github.com/OpenPrinting/cups-filters/issues/331). This time it really works as a cost value oversight is fixed now.

```
CHANGES IN V2.0.0

	- libppd: In the ppdPwgUnppdizeName() function support
	  negative numbers
	- libcupsfilters: When normalizing printer model name replace
	  '+' by "plus"
	- libcupsfilters, libppd: In the PPD generator really give
	  priority to Apple Raster against PDF.
```

```
CHANGES IN V1.28.8

	- libcupsfilters: In the PPD generator really give priority to
	  Apple Raster against PDF (Issue #331).
```

## PAPPL
Currently released is [1.0.1](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.1).

PAPPL development has continued, approaching 1.0.2, mainly bug fixes this time.

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

Michael Sweet posted [on the PAPPL GitHub](https://github.com/michaelrsweet/pappl/projects/3) what still needs to be done for IPP Scan support in PAPPL.

PAPPL 1.0.1 is in Debian Unstable now and got auto-synced into Ubuntu Hirsute (upcoming 21.04).

```
Changes in v1.1b1
-----------------

- Added `PAPPL_SOPTIONS_NO_TLS` option to disable TLS support.


Changes in v1.0.2
-----------------

- The `papplSystemSetVersions` function now allows changes while the system is
  running (Issue #123)
- The printing defaults page no longer shows a media chooser when there is a
  single source (Issue #125)
- The DNS-SD support functions did not handle when the Avahi daemon is not
  running (Issue #129)
- Deleting and adding a printer with the same name will cause a crash
  (Issue #141)
- Fixed a deadlock issue when calling the `papplPrinterSet...` functions from
  an iterator callback (Issue #143)
- The `papplPrinterSetDriverDefaults` function did not validate the defaults
  against the actual driver data.
- The IPP interface no longer allows the Create-Printer operation for single
  queue applications.
- Stopping a printer application with `SIGTERM` now behaves the same as sending
  a Shutdown-System request.
- Added more unit tests to testpappl.
- Added better management of the USB and raw printing threads for each printer.
- Added better error reporting for USB printers.
- `papplDeviceOpen` did not copy the device ID callback.
- `papplDeviceList` and `papplDeviceOpen` did not send errors to stderr when a
  `NULL` error callback was specified.
```
