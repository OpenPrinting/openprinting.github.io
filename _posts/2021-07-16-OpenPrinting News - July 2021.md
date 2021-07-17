---
title: OpenPrinting News - July 2021
layout: single
author: Till
excerpt: GSoC mid-term, PostScript Printer Application, Retro-fitting CUPS printer drivers, CUPS, cups-filters
---
## Google Summer of Code 2021
The mid-term evaluations are done now and all our 5 students have passed. Thanks a lot to them for the great work they did during the first half of the coding period.

On this month's OpenPrinting conference call all students participated giving a short screen-share-based presentation of their GSoC projects.

Here is some short summary about what got done:

**cups-filters: Make sure all filter functions work without PPD files**<br>
Student: Suraj Kulriya<br>
Mentors: Jai Luthra, Till Kamppeter, Dheeraj Yadav

Suraj made the following filter functions working also without PPD file, based on printer and job IPP attributes:
- [`rastertopdf()`](https://github.com/OpenPrinting/cups-filters/commit/bda9f64e1035)
- [`ghostscript()`](https://github.com/OpenPrinting/cups-filters/commit/35d847b4a229)
- [`texttotext()`](https://github.com/OpenPrinting/cups-filters/commit/5e2a33cab42f)
- [`imagetoraster()`](https://github.com/OpenPrinting/cups-filters/commit/4e6ec0edbf70)
- [`pdftops()`](https://github.com/OpenPrinting/cups-filters/commit/06eafee31d)
- [`imagetopdf()`](https://github.com/OpenPrinting/cups-filters/commit/fde79370c9ca5)

He also created some library functions for common functionality needed here, like a function which converts IPP attributes to option lists.

**cups-filters: Convert filters to filter functions**<br>
Student: Pratyush Ranjan<br>
Mentors: Till Kamppeter, Dheeraj Yadav

Pratyush converted the following CUPS filters to filter functions:
- [`pdftoraster()`](https://github.com/OpenPrinting/cups-filters/commit/d754edb4b3ae)
- [`rastertopwg()`](https://github.com/OpenPrinting/cups-filters/commit/eb33da4e26a) (filter from CUPS)

**cups-filters: Create a single, universal CUPS filter to replace the chain of individual filters**<br>
Student: Pranshu Kharkwal<br>
Mentors: Till Kamppeter, Dheeraj Yadav

Pranshu is making very good progress on the universal CUPS filter. Most conversions already work. It also depends on the progress of Pratyush to convert filters to filter functions. The code can be found in [this GitHub branch](https://github.com/pranshukharkwal/cups-filters/tree/universal).

**GUI for listing and managing available IPP Print/Scan services (or DNS-SD-advertised network services in general)**<br>
Student: Divyasheel<br>
Mentors: Till Kamppeter

The graphical frontend part is mostly done and in the second half the internal functionality, like Avahi browsing and so on, will be worked on. Here is the [GitHub branch with the code](https://github.com/divyashk/gnome-control-center/tree/devCups).

**PAPPL: Printer setup tool support and Scanning support**<br>
Student: Bhavna Kosta<br>
Mentors: Jai Luthra, Till Kamppeter, Michael Sweet

The original project, "Firmware and other file handling in PAPPL" turned out to be not that useful and so we decided to switch to other PAPPL work. I presented the list of [feature requests on PAPPL](https://github.com/michaelrsweet/pappl/) and Bhavna decided to start on features to support printer setup tools and after that to add scanning support to PAPPL.

For printer setup tool support I earlier requested to have [device IDs listed with the drivers](https://github.com/michaelrsweet/pappl/issues/157) when listing all included drivers of a Printer Application with the `drivers` sub-command and to make Printer Applications [tell whether a printer is supported by them if one supplies the printer's device ID](https://github.com/michaelrsweet/pappl/issues/158).

Bhavna implemented both these features via pull requests, [the one for the former](https://github.com/michaelrsweet/pappl/pull/170) got already merged and [for the latter](https://github.com/michaelrsweet/pappl/pull/174) not yet.

After that, Bhavna started on scanning support, which should not be too difficult do to the fact that Michael Sweet already posted an excellent [project description](https://github.com/michaelrsweet/pappl/projects/3).

Here she already posted 3 pull requests: ["Add scanner object and header files"](https://github.com/michaelrsweet/pappl/pull/172), ["Add scanner.c and scanner-accessors.c files"](https://github.com/michaelrsweet/pappl/pull/175), and ["Add scanner-driver.c"](https://github.com/michaelrsweet/pappl/pull/176)


## CUPS Snap
**[CUPS Snap](https://github.com/OpenPrinting/cups-snap) in the [Snap Store](https://snapcraft.io/cups), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 2000 installations via Snap Store**

I am still waiting for the snapd team to implement the [security concept](https://forum.snapcraft.io/t/handling-of-the-cups-plug-by-snapd-especially-auto-connection/23419/43?u=till.kamppeter) on the snapd side, but unfortunately, they are very busy currently.

A [pull request](https://github.com/snapcore/snapd/pull/10427) with a suggested implementation of the new "cups" interface to which client Snaps which just want to print are supposed to plug automatically got posted and discussion on it has happened. There got also posted a test package of snapd with which I could confirm that the implementation is actually working (see my comments on the pull request).

Once this pull request is merged, as a next step a pull request on snapcraft for easily using the interface in client application Snaps is planned.

In addition, the CUPS Snap uses newer upstream sources for its components now, of QPDF version 10.3.2 and of cups-filters the current GitHub master branch (2.x under development).


Main TODOs are:

- Complete the security concept on the snapd side, especially implement the content interfaces (see above)
- Testing
- Turn classic CUPS drivers into Printer Applications (see progress below)
- Add a migration script so that OS distributions can easily switch over from classic packages to the CUPS Snap


## PostScript Printer Application
**[PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) in the [Snap Store](https://snapcraft.io/ps-printer-app), Call for testing on the [snapcraft.io forum](https://forum.snapcraft.io/t/call-for-testing-openprintings-cups-snap/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), more than 1200 installations via Snap Store**

I Continued on the support for CUPS filters used in PostScript PPD files, also in preparation for retro-fitting of actual CUPS drivers, adding the following features (follow the links to the commits for more detailed descriptions and motivations):

- [Added `foomatic-rip` to the Snap](https://github.com/OpenPrinting/ps-printer-app/commit/953b3fcd8) (for PIN-secured printing on Ricoh)
- [Support for CUPS' PPD extension for custom (string, integer, ...) option settings](https://github.com/OpenPrinting/ps-printer-app/commit/190d774f5a5284d4d721468a18e48d1385c8c1e1)
- [Added parameters like job UUID, date/time of submission/processing, ... to calls of external CUPS filters](https://github.com/OpenPrinting/ps-printer-app/commit/8b7e66d778b98833164abe05129ad90449df8180)
- On the Snap's included PAPPL [applied the patch for custom string option support](https://github.com/OpenPrinting/ps-printer-app/commit/eafd0f4011) (PAPPL's [PR #142](https://github.com/michaelrsweet/pappl/issues/142))

**With all this now all ~4000 PostScript printer PPD files which come with the Snap are fully functional, especially also supporting PIN-secured printing on HP and all Ricoh brands.**

Note that these changes only apply to a few PostScript Printers and only to enable features which are not used very often, but they are especially done with general retro-fitting of CUPS printer drivers in mind, where CUPS filters defined in the PPD file and string/text/numeric/fax number options are more commonplace.

With appropriate features added to PAPPL we will be able to also add the following:
- Support for string/text-style vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/142) (Patch already applied in the Snap). 
- Human-readable strings for vendor options. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/58).
- Ink level check via `ps_status()` function. Needs [support in PAPPL](https://github.com/michaelrsweet/pappl/issues/83).

Once having these features implemented, the PostScript Printer Application is complete so far.


## Retro-fitting of CUPS printer drivers into Printer Applications
Currently I am continuing with the work towards retro-fitting classic CUPS printer drivers into Printer Applications. Here I have especially done the following:

**Turning the PostScript Printer Application into the retro-fit library**

To start the planned `libpappl-retrofit` library I have taken the PostScript Printer Application and modified the functions it is composed of to make them "library-ready" and to generalize them to support all types of drivers and PPD files, especially also non-PostScript ones.

I have done the following modifications on the original `ps-printer-app.c` file:

- Get rid of global variables: Instead of using global variables for data which should be accessible from all the functions I have created a data structure (`pr_printer_app_global_data_t`) for all these items and carry it through the whole Printer Application via the context data pointer of the callback functions.

- Generalization of data conversion methods: Depending on what kind of driver (High-level graphics like PostScript or PDF or raster/bitmap graphics) you want to accept different sets of input formats and therefore have different format conversion methods. For spooling (usually high-level graphics) conversions there is an array of `pr_spooling_conversion_t` records and for streaming (usually raster) conversions an array of `pr_stream_format_t` record now, with input and output data types, and filter functions to be used for the conversion (Hint: If you need more than one filter function for a conversion, simply use the `filterChain()` filter function).

- Easy configuration of the Printer Application by the implementer: One only needs to put some basic data into a structure of type `pr_printer_app_config_t` (which is a part of the global data structure), create the arrays of data format conversion methods in priority order, make sure that the CUPS filters and PPD files are at the right place, and call the Printer Application's main loop. Can all be done in the `main()` function.

- Future library functions start with `pr_...`, the ones starting with `ps_...` are specific to the PostScript Printer Application.

As a sneak preview I have uploaded the code as an attachment to a [GitHub discussion](https://github.com/OpenPrinting/ps-printer-app/discussions/8). Or simply download it directly: [`ps-printer-app.c.txt`](https://github.com/OpenPrinting/ps-printer-app/files/6833548/ps-printer-app.c.txt)

To try it out, take the GIT master of the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) and replace its `ps-printer-app.c` file by this file. Then build the Snap (or build classically with newest snapshots of [cups-filters](https://github.com/OpenPrinting/cups-filters) and [PAPPL](https://github.com/michaelrsweet/pappl)) as described in `README.md`. As a result you should get the PostScript Printer Application with its usual features, probably indistinguishable from the original, but with the new innards. And this will also be the future of it, once the library is started as a new GitHub repo at OpenPrinting.

**`pwgtoraster()` filter function**

Many of the classic CUPS drivers are the so-called CUPS Raster drivers, where the job in a device-independent, designed-for-printing, standard raster format, CUPS Raster, is fed into a CUPS filter, usually with name starting with `rasterto`, which turns the input into the printer's native, often proprietary language.

One can easily recognize these filters by a line like
```
*cupsFilter:    "application/vnd.cups-raster 50 rasterto..."
```
in the PPD file.

Retro-fitting those into a PAPPL-based Printer Application is not trivial, especially if one wants to use the streaming raster-printing mode of PAPPL, which is once required to be supported in a Printer Application and second, very useful for large jobs and especially large paper sizes and that even more in combination with low-spec IoT devices.

In spooling mode the retro-fit of these drivers is easy, as one can easily call the filter chain which CUPS would use.

In streaming raster mode we run into the problem that CUPS Raster supports a lot of different, often exotic color spaces and that also in several different color depths. This would mean, that the 5 raster printing callbacks (start job, start page, print pixel line, end page, end job) need to be able to convert the input into all these color spaces. To implement this only for retro-fitting old drivers is a lot of work, especially as we have this already nicely working in cups-filters, in the `gstoraster` and `pdftoraster` filters (`ghostscript()` and `pdftoraster()` filter functions).

So I have gone another way: The `pdftoraster()` filter function has everything to convert the 8-bit RGB raster output of Poppler into any of the color spaces needed for CUPS Raster, and this filter already exists for long time and just works. So I have derived a new [`pwgtoraster()` filter function](https://github.com/OpenPrinting/cups-filters/commit/eebd52ed4ca) (there is also a `pwgtoraster` CUPS filter executable for easy testing) from the `pdftoraster()` filter function, throwing out Poppler and taking PWG Raster as input, allowing only the color spaces 1-bit monochrome, 8-bit grayscale, and 8-bit RGB and converting to the destination color spaces from these.

As what the raster printing callbacks of a Printer Application receive is more or less PWG Raster I can simply pass through this raster data when pre-filtering with `pwgtoraster()` before calling the `rasterto...` filter defined in the PPD.

The new filter function has the following special properties:
- As streaming as possible: For chunked and banded color orders the data streams "by-pixel-line", meaning that a line is read from the input, converted, and immediately sent to the output, before the next line is read. Only when the colors are ordered in planes the streaming is only "by-page".
- Pre-conversion of resolution and color space: The resolution and color space/depth/order for the CUPS Raster data to be fed into the filter is not simply defined by options and choices with intuitive names, but by the PostScript code attched to the choices of the options in the PPD which are selected for the job, like `<</HWResolution[300 300]>>setpagedevice` or `<</cupsColorOrder 1/cupsColorSpace 8/cupsCompression 2>>setpagedevice`. The CUPS filters collect all of the selected ones and interpret them with a mini PostScript interpreter (`ppdRaterInterpretPPD()` in libppd) to generate the CUPS Raster header (data structure describing the raster format) for the page. Unfortunately, resolutions are not always defined in the "Resolution" option (for example in "Print Quality" instead) or the resolution values do not correspond with the human-readable choice names, same for color spaces not always defined in "ColorModel". As with this the information the Printer Apoplication has from the PPD often does not reflect the driver's actual requirements, the filter function pre-converts resolutions and color spaces as needed.

Note that the integration of this filter function into the retro-fit Printer Application code is not yet done, meaning that a CUPS Raster driver retro-fit will not work yet.

**Capturing of stderr output in the log**

Printer Applications with PAPPL have a nice logging facility and filter functions in cups-filters support this logging facility. Now I have added [capturing of stderr of the called external CUPS filter executable](https://github.com/OpenPrinting/cups-filters/commit/b15c3bf97d718096401622997ea1883c00c8280c) for logging to the [new `filterExternalCUPS()` filter function](https://github.com/OpenPrinting/cups-filters/commit/8ea2006a0) (see [last month's news](https://openprinting.github.io/OpenPrinting-News-June-2021/#retro-fitting-of-cups-printer-drivers-into-printer-applications)) and also [capturing of stderr of Ghostscript](https://github.com/OpenPrinting/cups-filters/commit/a52eef169142cba4d5465a08a5181f378a7bd22e) to the `ghostscript()` filter function.  This way the stderr output gets correctly into the log file of the Printer Application instead of leaking into the syslog.


## CUPS
Currently released is [2.3.3op2](https://github.com/OpenPrinting/cups/releases/tag/v2.3.3op2).

Development of CUPS 2.4 is in progress, currently mainly fixing of bugs which were reported to Apple's CUPS GitHub in the last 18 months.

Ubuntu Hirsute Hippo (21.04) comes with CUPS 2.3.3op2, the CUPS Snap and the PostScript Printer Application Snap use the current GIT master.

```
CUPS v2.4rc1 (Pending)
----------------------

- The scheduler now supports the "everywhere" model directly (Issue #201)

- Further hardened `ippReadIO` to prevent invalid IPP messages from being
  propagated (Issue #196)

- Add USB quirk for Canon MP480 (Issue #192)
```


## cups-filters
Currently released is [1.28.9](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.9).

Feature additions are principally done for retro-fitting classic CUPS drivers, see details in the [separate section](#retro-fitting-of-cups-printer-drivers-into-printer-applications), but also work of our [GSoC students](#google-summer-of-code-2021):

- Added `pwgtoraster()` filter function
- In `filterExternalCUPS()` and `ghostscript()` filter functions now stderr output of external executables is captured for logging
- `rastertopdf()`, `ghostscript()`, `texttotext()`, `imagetoraster()`, `pdftops()`, and `imagetopdf()` support printer and job IPP attributes now and so do not need PPD files any more
- The `pdftoraster` CUPS filter is converted to a filter function now
- The `rastertopwg` filter of CUPS is now added as filter function `rastertopwg()`

Also several bug fixes were done:
- cups-browsed: Make NotifLeaseDuration configurable and renew after half the lease duration not 60 sec before end
- The `pdftopdf()` filter function now works correctly with unseekable input
- Removed unneeded test code from libfontembed
- Fixed pdftopdf() filter function to correctly support page ranges without upper limit, like "10-"
- Minor fixes

[1.28.9](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.9)

Bug fix release, fixes backported from the master (2.x) branch (see below)

Ubuntu Hirsute Hippo (21.04) comes with cups-filters 1.28.8, also the CUPS Snap currently uses this version. The PostScript Printer Application Snap uses the current GIT master of cups-filters.

```
CHANGES IN V2.0.0

	- libcupsfilters: Fixed pdftopdf() filter function to
	  correctly support page ranges without upper limit, like
	  "10-" (Pull request #399).
	- libcupsfilters, pwgtoraster: Created new pwgtoraster()
	  filter function primarily to print raster input (PWG Raster,
	  Apple Raster, images) to CUPS Raster drivers in
	  driver-retro-fitting Printer Applications.
	- libcupsfilters: Added new oneBitToGrayLine() API function
	  which converts a line of 1-bit monochrome pixels into 8-bit
	  grayscale format (cupsfilters/bitmap.[ch]).
	- libcupsfilters: Fixed possible crash bug in oneBitLine()
	  function.
	- libcupsfilters, rastertopwg: Converted CUPS' rastertopwg
	  filter into the rastertopwg() filter function.
	- libfontembed: Removed unneeded fontembed/main.c and ttfread
	  executable (Issue #386).
	- texttotext: Made the filter also work when instead of PPDs
	  and CUPS options printer and job IPP attributes are used
	  (Pull request #385).
	- libcupsfilters: Made ghostscript() filter function also work
	  when instead of PPDs and CUPS options printer and job IPP
	  attributes are used (Pull request #383).
	- libcupsfilters, pdftoraster: Moved core functionality of
	  pdftoraster into the pdftoraster() filter function (Pull
	  request #381, #382).
	- cups-browsed: Make NotifLeaseDuration configurable and renew
	  after half the lease duration not 60 sec before end. The
	  early renewal improves reliability on busy systems a
	  lot. For easier development and debugging short durations
	  from 300 sec on can get selected (Pull request #378).
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

CHANGES IN V1.28.9

	- libcupsfilters: Silenced compiler warnings
	- libcupsfilters: Removed duplicate code in the
	  apply_filters() function.
	- driverless: If there are no driverless IPP printers
	  available let "driverless" terminate with exit code 0 and
	  not 1, to follow CUPS' standard of backends in discovery
	  mode terminating with 0 if there are no appropriate printers
	  found (Issue #375).
	- gstoraster, foomatic-rip: Fixed Ghostscript command line for
	  counting pages as it took too long on PDFs from evince when
	  printing DjVu files (Issue #354, Pull request #371, Ubuntu
	  bug #1920730).
	- cups-browsed: Renamed ldap_connect() due to conflict in
	  new openldap (Issue #367, Pull request #370).
	- pdftoraster: Free color data after processing of each page
	  (Pull request #363).
	- cups-browsed: Always save "...-default" option entries
	  from printers.conf, regardless of presence or absense
	  of PPD file (Pull request #359).
	- cups-browsed: Start after network-online.target (Pull
	  request #360).
	- texttopdf: Set default margins when no PPD file is used
	  (Pull request #356).
```


## PAPPL
Currently released is [1.0.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.0.3).

See also the [currently open](https://github.com/michaelrsweet/pappl/issues) and [closed](https://github.com/michaelrsweet/pappl/issues?q=is%3Aissue+is%3Aclosed) issues of PAPPL.

