---
title: OpenPrinting News - November 2020
layout: single
author: Till
excerpt: PAPPL first beta, PostScript Printer Application, GSoC 2021, GSoD, LFMP, CUPS fork in Debian, cups-filters
---
## Lexmark second manufacturer (after HP) to certify IPP Everywhere printers
The days (months?, years?) of only HP being present on the PWG's [certified IPP Everywhere printers list](https://www.pwg.org/printers/) are counted. Lexmark has entered as second manufacturer, registering 92 IPP Everywhere v1.1 printers and with this the first v1.1 certifications at all. The total amount of printers in the list is currently 625.

## Google Summer of Code 2021
We are currently looking for project ideas for next year's Google Summer of Code.

As mentioned [last month](https://openprinting.github.io/OpenPrinting-News-October-2020/#google-summer-of-code-2021) student projects will only be half the timr (6 weeks). Google tells that this will probably attract more students, but for us it is a much higher workload as we have to find the double amount of students and get the double amount of students introduced and up to speed to get the same work done.

For larger project we should also consider to run them under the Linux Foundation Mentoring Program instead of GSoC.

## Google Season of Docs 2020
Our OpenPrinting project is continuing well. Most pages of [Piyush Goyal's project](https://openprinting.github.io/documentation/) are already populated, merely only the scanning part is missing as its coding in our LFMP project is not yet completed.

Next steps for the time being until IPP Scan gets far enough for being documented is to check whether everything is correct, recent API changes in PAPPL taken into account, design of existing Printer Applications, like the [HP PCL](https://github.com/michaelrsweet/hp-printer-app/) and the [PostScript](https://github.com/OpenPrinting/ps-printer-app) Printer Applications explained, ...

## Linux Foundation Mentorship Program
Our [second LFMP project](https://people.communitybridge.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) about IPP Scan is going on, with both Abhik Chakraborty and Rishabh Arya woring on the IPP Scan server/Scanner Application. Abhik is introducing Rishabh into PAPPL and the IPP server work. Mentoring will be mainly done by Michael Sweet.

## PAPPL first beta release
PAPPL made it to its first beta release, [1.0b1](https://github.com/michaelrsweet/pappl/releases/tag/v1.0b1)!

So now it takes more or less the shape for the first stable release, having mostly the features and functionality needed to create printer driver packages in the new Printer Application format. 1.0 will not yet have scanning support. This will come in a later release.

## PostScript Printer Application
The devlopment of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) is going on and the application's TODO items get less.

To fulfill IPP Everywhere requirements printing of PWG/Apple Raster input is streaming now, using PAPPL's built in Raster filter and raster callback functions to generate the PostScript for the printer, with the PPD's PostScript code snippets for the option settings inserted. Streaming instead of spooling means that the printing does not only start when the Printer Application has sucked in the whole job, but continuously picks up input data, filters it, and sends it off to the printer, raster line by raster line and as soon as the printer has enough data to print something it prints, in PostScript on completion of each page. This is less resource-consuming for large jobs and even would permit infinite jobs.

Also printing of JPEG and PNG images uses PAPPL's internal image filter now, but PDF and PostScript input is handled by the appropriate filter functions of cups-filters.

The creation of the PPD file list (currently we use ~4000 PPD files) was optimized to get the printer model names sorted in a human-friendly way (HP LaserJet 4, HP LaserJet 5, HP LaserJet 4000, HP LaserJet 5000 and not HP LaserJet 4, HP LaserJet 4000, HP LaserJet 5, HP LaserJet 5000) and to easily match the printer's device IDs with the PPD files even if the PPD file does not contain the device ID. Also the driver names for PAPPL's command line interface and config file are stable against changes in the PPD list, like the order or adding/removing some PPDs.

My work on the PostScript Printer Application as the first non-Raster, retro-fitting, and many printers supporting Printer Application also has exercised PAPPL a lot and made me posting several bug reports (partially with patches) and feature requests on PAPPL and most of them Michael Sweet has fixed/implemented.

Here are the most recent ones:
- [Provide device ID to driver callback](https://github.com/michaelrsweet/pappl/issues/70) (Milestone for 1.0)
- [Web interface: Button/Link to return to printer's main page from printer's config pages, also show print queue name on the config pages](https://github.com/michaelrsweet/pappl/issues/69) (Fixed)
- [When printing colored PNG image in gray the image does not get correctly converted](https://github.com/michaelrsweet/pappl/issues/63) (Fixed)
- [When printing an image with "print-scaling=fill" the image is not blown to fully fill the page but printed as with "print-scaling=auto"](https://github.com/michaelrsweet/pappl/issues/62) (Fixed)
- [When printing JPG image with Printer Application the Printer Application crashes](https://github.com/michaelrsweet/pappl/issues/61) (Fixed)
- [With PWG/Apple Raster input papplJobCreatePrintOptions() is called with num_pages = 0, clobbering the Duplex default setting](https://github.com/michaelrsweet/pappl/issues/60) (Fixed)
- [Add tolerance to rounding errors when sending Apple/PWG Raster](https://github.com/michaelrsweet/pappl/issues/59) (Fixed)
- [PAPPL-based Printer Applications do not DNS-SD-advertise their printers](https://github.com/michaelrsweet/pappl/issues/53) (Fixed)
- [When printing to a network printer host name does not get resolved from device URI, job falls into infinite, uninterruptable](https://github.com/michaelrsweet/pappl/issues/52) (Fixed)
- [Web interface: One can set Borderless Media, but setting not displayed](https://github.com/michaelrsweet/pappl/issues/50) (Fixed)

More to be seen under the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

## CUPS
Currently released is 2.3.3.

On our [fork of CUPS on OpenPrinting](https://github.com/OpenPrinting/cups) Didier Raboud ("OdyX"), maintainer of the printing packages on Debian, has posted pull requests for most of Debian's (and so also Ubuntu's) distribution patches and Michael Sweet has merged most of these pull requests so that future packaging will work without this "patch hell". **First GIT snapshots got already packaged and released on Debian Experimental**.

Michael Sweet has also merged several other pull requests and fixed bugs which got originally reported to the [original repository at Apple](https://github.com/apple/cups/) and there not taken care of.

Here is the new `CHANGES-OPENPRINTING.md` of the fork:

```
Changes in CUPS v2.3.3op1
-------------------------

- ippeveprinter now supports multiple icons and strings files.
- ippeveprinter now uses the system's FQDN with Avahi.
- ippeveprinter now supports Get-Printer-Attributes on "/".
- ippeveprinter now uses a deterministic "printer-uuid" value.
- ippeveprinter now uses system sounds on macOS for Identify-Printer.
- Updated ippfind to look for files in "~/Desktop" on Windows.
- Updated ippfind to honor `SKIP-XXX` directives with `PAUSE`.
- Updated IPP Everywhere support to work around printers that only advertise
  color raster support but really also support grayscale (Issue #1)
- ipptool now supports DNS-SD URIs like `ipps://My%20Printer._ipps._tcp.local`
  (Issue #5)
- The scheduler now allows root backends to have world read permissions but not
  world execute permissions (Issue #21)
- The SNMP backend now supports the HP and Ricoh vendor MIBs (Issue #28)
- The scheduler no longer includes a timestamp in files it writes (Issue #29)
- The systemd service names are now "cups.service" and "cups-lpd.service"
  (Issue #30, Issue #31)
- The scheduler no longer adds the local hostname to the ServerAlias list
  (Issue #32)
- The `httpAddrListen` function now uses a listen backlog of 128.
- Added USB quirks (Apple issue #5789, #5823, #5831)
- Fixed IPP Everywhere v1.1 conformance issues in ippeveprinter.
- Fixed DNS-SD name collision support in ippeveprinter.
- Fixed compiler and code analyzer warnings.
- Fixed TLS support on Windows.
- Fixed ippfind sub-type searches with Avahi.
- Fixed the default hostname used by ippeveprinter on macOS.
- Fixed resolution of local IPP-USB printers with Avahi.
- Fixed coverity issues (Issue #2)
- Fixed `httpAddrConnect` issues (Issue #3)
- Fixed web interface device URI issue (Issue #4)
- Fixed lp/lpr "printer/class not found" error reporting (Issue #6)
- Fixed xinetd support for LPD clients (Issue #7)
- Fixed libtool build issue (Issue #11)
- Fixed a memory leak in the scheduler (Issue #12)
- Fixed a potential integer overflow in the PPD hashing code (Issue #13)
- Fixed output-bin and print-quality handling issues (Issue #18)
- Fixed PPD options getting mapped to odd IPP values like "tray---4" (Issue #23)
- Fixed remote access to the cupsd.conf and log files (Issue #24)
- Fixed fax phone number handling with GNOME (Issue #40)
- Fixed potential rounding error in rastertopwg filter (Issue #41)
- Fixed the "uri-security-supported" value from the scheduler (Issue #42)
- Fixed IPP backend crash bug with "printer-alert" values (Issue #43)
- Fixed crash in rastertopwg (Apple issue #5773)
- Fixed cupsManualCopies values in IPP Everywhere PPDs (Apple issue #5807)
```

## cups-filters
Currently released is 1.28.5.

On the way towards 2.0.0 and driven by the further development of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) I have added the following new features:
- Moved IEEE1284-device-ID-related functions into the public API of libcupsfilters, also made the internal functions public and renamed them all to `ieee1284...()`, moved `test1284` to `cupsfilters/`
- Extended `ieee1284NormalizeMakeAndModel()` to a universal function to clean up and normalize make/model strings (also device IDs) to get human-readable, machine-readable, or easily sortable make/model strings
- Added `filterPOpen()` and `filterPClose()` functions which similar to `popen()` and `pclose()` create a file descriptor which either takes data to feed into a filter function or provides data coming out of a filter function.
- In `cupsRasterParseIPPOptions()` (called from filter functions used without PPD file) improved understanding of color mode options. Options "output-mode", "OutputMode", "print-color-mode", and choices "auto", "color", "auto-monochrome", "process-monochrome", and "bi-level" are supported now and default color mode is RGB 8-bit color and not 1-bit grayscale.

```
CHANGES IN V2.0.0

	- libcupsfilters: In cupsRasterParseIPPOptions() (called from
	  filters used without PPD file) improved understanding of
	  color mode options. Options "output-mode", "OutputMode",
	  "print-color-mode", and choices "auto", "color",
	  "auto-monochrome", "process-monochrome", and "bi-level" are
	  supported now and default color mode is RGB 8-bit color and
	  not 1-bit grayscale.
	- libcupsfilters: Added filterPOpen() and filterPClose()
	  functions which similar to popen() and pclose() create a
	  file descriptor which either takes data to feed into a
	  filter function or provides data coming out of a filter
	  function.
	- libcupsfilters: Extended ieee1284NormalizeMakeAndModel() to
	  a universal function to clean up and normalize make/model
	  strings (also device IDs) to get human-readable,
	  machine-readable, or easily sortable make/model strings.
	- libcupsfilters: Added NULL check when removing ".Borderless"
	  suffixes from page size names (Issue #314).
	- libcupsfilters, parallel, test1284: Moved
	  IEEE1284-device-ID-related functions into the public API of
	  libcupsfilters, also made the internal functions public and
	  renamed them all to ieee1284...(), moved test1284 to
	  cupsfilters/.
	- foomatic-rip: Remove temporary file created during pdf-to-ps
	  conversion (Pull request #313).
```

```
CHANGES IN V1.28.6

        - foomatic-rip: Remove temporary file created during pdf-to-ps
          conversion (Pull request #313).
```
