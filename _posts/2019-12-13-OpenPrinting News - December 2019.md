---
title: OpenPrinting News - December 2019
layout: single
author: Till
excerpt: CUPS 2.3.1 and cups-filters 1.26.0 released, lots of improvements and fixes for cups-browsed and the "driverless" utility, OpenPrinting meeting in Mandi, India, GSoC 2020 org application period announced.
---
## OpenPrinting Mini Summit at IIT Mandi, India
On November 9 we had a meeting in India presenting the work of OpenPrinting at one of the universities where our Google Summer of Code students came from.

See our [separate news article with pictures](https://openprinting.github.io/OpenPrinting-Mini-Summit-at-IIT-Mandi/).

## Google Summer of Code 2020
We need to start with the student selection process soon, so that we can let them do assignments to compensate for the missed Google Code-In opportunity.

The mentoring organization application time window for the Google Summer of Code 2010 got announced. It is from January 14th to February 5th, 2020.

## Avahi local service support
Trent has added a [comment](https://github.com/lathiat/avahi/issues/125#issuecomment-562586275] to the [Upstream issue](https://github.com/lathiat/avahi/issues/125) with some questions on December 6th, 2019 and I (amd Michael Sweet) have answered. No further action after that.

This has raised the idea in me to make cups-filters (cups-browsed and the "driverless" utility) use DNS-SD-service-name-based IPP URIs, like CUPS does. Compared to the standard host-name-based ones they are independent of network interfaces and ports and so make it easier to implement local IPP services (like Printer Applications). I have implemented this in cups-filters 1.26.0 (see below).

We urgently need the localhost support for the Printer/Scanner Applications, as PPD support will go away within a year.

## OpenPrinting web site
Dheeraj has continued to work on the web site and fixed several [issues](https://github.com/OpenPrinting/openprinting.github.io/issues). Especially the last three news items are presented on the front page now and they are listed with author and date. On the "News and Events" page we have also a link to the archive of minutes of the monthly OpenPrinting phone meetings now.

## CUPS

CUPS 2.3.1 got released today!

Tons of bug fixes:

```
Changes in CUPS v2.3.1
----------------------

- Documentation updates (Issue #5661, #5674, #5682)
- CVE-2019-2228: The `ippSetValuetag` function did not validate the default
  language value.
- Fixed a crash bug in the web interface (Issue #5621)
- The PPD cache code now looks up page sizes using their dimensions
  (Issue #5633)
- PPD files containing "custom" option keywords did not work (Issue #5639)
- Added a workaround for the scheduler's systemd support (Issue #5640)
- On Windows, TLS certificates generated on February 29 would likely fail
  (Issue #5643)
- Added a DigestOptions directive for the `client.conf` file to control whether
  MD5-based Digest authentication is allowed (Issue #5647)
- Fixed a bug in the handling of printer resource files (Issue #5652)
- The libusb-based USB backend now reports an error when the distribution
  permissions are wrong (Issue #5658)
- Added paint can labels to Dymo driver (Issue #5662)
- The `ippeveprinter` program now supports authentication (Issue #5665)
- The `ippeveprinter` program now advertises DNS-SD services on the correct
  interfaces, and provides a way to turn them off (Issue #5666)
- The `--with-dbusdir` option was ignored by the configure script (Issue #5671)
- Sandboxed applications were not able to get the default printer (Issue #5676)
- Log file access controls were not preserved by `cupsctl` (Issue #5677)
- Default printers set with `lpoptions` did not work in all cases (Issue #5681,
  Issue #5683, Issue #5684)
- Fixed an error in the jobs web interface template (Issue #5694)
- Fixed an off-by-one error in `ippEnumString` (Issue #5695)
- Fixed some new compiler warnings (Issue #5700)
- Fixed a few issues with the Apple Raster support (rdar://55301114)
- The IPP backend did not detect all cases where a job should be retried using
  a raster format (rdar://56021091)
- Fixed spelling of "fold-accordion".
- Fixed the default common name for TLS certificates used by `ippeveprinter`.
- Fixed the option names used for IPP Everywhere finishing options.
- Added support for the second roll of the DYMO Twin/DUO label printers.
```

## cups-filters

Currently released is 1.26.0.

1.26.0:

This release adds some new features to cups-browsed and to the driverless utility: Both now use DNS-SD-service-name-based URIs for IPP print queues, like CUPS does. These URis are independent of network interfaces and ports and so make providing IPP services on the local machine (Printer Applications) easier. cups-browsed creates large numbers of local queues in portions now, so that it can treat jobs to print clusters between the portions, this makes printing more reliable in large networks with many printers. In addition, a lot of bugs got fixed.

1.25.13:

Bug fix release, mainly to solve problems of cups-browsed, mainly for compatibility problems with some printers, leaks, and crashes. Also updated the PPD generator to catch up with the one of CUPS. Prefer Apple Raster instead of PWG Raster as some printers have bugs in their PWG Raster implementation.

1.25.12:

Bug fix release, to address a bug of grayscale jobs not printed on PostScript printers when Poppler is used as PDF interpreter, to allow printing on printers which claim to accept PWG Raster but actually do not print this format, and to eliminate all compiler warnings when building the package.

```
CHANGES IN V1.26.0

	- cups-browsed: When generating local queues for printers for
	  which the local CUPS daemon would provide temporary queues
	  use the PPDs generated by libcupsfilters and not the ones
	  generated by CUPS. The PPD generation of libcupsfilters also
	  works with IPP-1.x-only printers, printers which do not
	  support to query "media-col-database" and printers which
	  support driverless printing only via PCLm. This can be
	  changed via the "UseCUPSGeneratedPPDs" directive in
	  cups-browsed.conf (Issue #22).
	- libcupsfilters: Re-structured the get_printer_attributes()
	  function to remove the recursive calls for the fallbacks, to
	  check required attributes in the response only if requested,
	  and to fully integrate the method of getting a suitable
	  response for a full printer capability list also if the
	  printer is only IPP 1.1 or does not support the
	  "media-col-database" attribute (Issue #22, Issue #163).
	- libcupsfilters, cups-browsed, driverless: Moved the funtions
	  get_printer_attributes() and resolve_uri() from cups-browsed
	  into libcupsfilters, to share them with the driverless
	  utility (Issue #22).
	- implicitclass: Fixed wrong stdout redirection from the
	  filters to the IPP backend and hard-coded path for "ipp"
	  backend call (Possible fix for Issue #163, Issue #181).
	- cups-browsed, driverless: Use DNS-SD-service-name-based URIs
	  instead of host-name-based ones, as CUPS also does. In
	  cups-browsed one can switch back to the conventional
	  host-name-based URIs via the new "DNSSDBasedDeviceURIs"
	  configuration option.  Note that cups-browsed always uses
	  conventional URIs for printers discovered via legacy CUPS
	  browsing or LDAP.
	- cups-browsed: When removing a CUPS queue, do not consider an
	  error (and retry) if the queue does not actually exist. Also
	  ignore errors when checking whether there are still
	  jobs. This way when a new queue gets created and the
	  generation of the PPD file fails the attempt to remove this
	  non-existing queueu when removing the printer entry does not
	  cause any problem.
	- cups-browsed: Improved the fallback mechanism of the
	  get_printer_attributes() function. Instead of considering
	  the request failed by the content of the response only when
	  not more than the two language atrributes come out, we check
	  through a list of required attributes whether they are all
	  there.  In addition, we actually fail when all callbacks
	  have failed (Issue #22).
	- cups-browsed: Introduced new configuration options
	  "UpdateCUPSQueuesMaxPerCall" and
	  "PauseBetweenCUPSQueueUpdates" to limit the amount of local
	  CUPS queues created, modified, or removed in a single event
	  callback. Before, when there were thousands of printers in
	  the network, cups-browsed got blocked for other tasks, like
	  assigning a destination printer for a cluster print job
	  (Issue #163).

CHANGES IN V1.25.13

	- implicitclass: When passing on the job via the "ipp" CUPS
	  backend, set argv[0] to the destination printer URI (Pull
	  request #173).
	- cups-browsed: Added another fallback to the
	  get-printer-attributes IPP request: Now after failing the
	  standard request ("all", "media-col-database") with both IPP
	  2.0 and IPP 1.1, try simply "all", without
	  "media-col-database" (Pull request #173).
	- cups-browsed: Do not set printer-is-shared for remote CUPS
	  queue when making a temporary queue permanent (Pull request
	  #180).
	- cups-browsed: Fix leaks of ipp_t struct and load balancing
	  on the servers (Pull request #179).
	- cups-browsed, implicitclass: Prioritize Apple Raster against
	  PWG Raster when selecting the PDL for the destination
	  printer for a job sent to a cluster, also cleaned up the PDL
	  selector code and added PostScript support.
	- libcupsfilters: Updated the PPD generator adding all changes
	  of the PPD generator of CUPS: Support for "job-account-id",
	  "job-accounting-user-id", "job-password", finishing options
	  "trim-..." added, finishing options and
	  "finishing-col-database" support synced with CUPS.
	- libcupsfilters: In the PPD generator get the mode for
	  handling the back sides of the sheets when printing duplex
	  preferrably from the "urf-supported" attribute.
	- libcupsfilters: Fixed bug that the PPD generator did not
	  output the "*CloseUI: *ColorModel" line when it did not
	  determine a default setting for "ColorModel".
	- cups-browsed: Added some missing memory allocations leading
	  to a segfault (Issue #175).

CHANGES IN V1.25.12

	- libcupsfilters: Use the text names "Draft", "Normal", and
	  "High" instead of 3, 4, and 5 as choice names for the
	  "cupsPrintQuality" option as CUPS does (Issue #171).
	- libcupsfilters: If a printer supports both Apple Raster and
	  PWG Raster let the generated PPD use Apple Raster as there
	  are several printers which report PWG Raster support but do
	  not actually print PWG Raster (Pull reguest #168, Issue
	  #171, CUPS issue #5238).
	- cups-browsed: Fix unset location check to use DNS-SD field
	  (Pull request #172).
	- libcupsfilters, beh, implicitclass, foomatic-rip,
	  imagetopdf, mupdftoraster, pdftops, sys5ippprinter,
	  cups-browsed, driverless: Silenced all compiler warnings to
	  make the build process of cups-filters completely free of
	  warnings.
	- pdftops: Fixed crash when using filter without PPD file.
	- pdftops: If printing grayscale jobs with Ghostscript as PDF
	  renderer, add "-sProcessColorModel=DeviceGray" to
	  Ghostscript command line.
	- pdftops: Do not use the ugly "pdftops -level1 ..."
	  workaround to get grayscale PostScript output from
	  Poppler. It leads to huge output files with Poppler's
	  "pdftops" utility and does not work at all with
	  "pdftocairo".  Poppler itself does not support PostScript
	  output converted to grayscale. Issue a warning with the hint
	  to use Ghostscript or MuPDF as PDF renderer (Issue #169).
	- libcupsfilters: In the cupsRasterParseIPPOptions()
	  accept also "Mono", "Monochrome", and "Gray" as color
	  space names.
```

## ippusbxd
No further news.
