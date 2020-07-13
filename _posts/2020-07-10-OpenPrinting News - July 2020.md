---
title: OpenPrinting News - July 2020
layout: single
author: Till
excerpt: We take comments! Students working in GSoC, GSoD, LFMP; libppd and pclmtoraster in cups-filters
---
## NEW: The OpenPrinting web site got comments sections
Our web pages, these news posts but also most other pages have a comments section now. So you can leave your comment about the page in the comments section at the bottom.

## Google Summer of Code 2020
The first evaluations have ended and all the 15 students for the Linux Foundation have passed, including the 7 for OpenPrinting.

Most of our 7 students also gave a short introduction to their project on this month's OpenPrinting tele conference.

Some student's work reports for the first month:

**Mohit Mohan**

> Hi everyone,
>
> I am Mohit Mohan, junior at IIT Kanpur in the CSE department. I am a GSoC student this year working with Open Printing on the project “Speed/Scaling optimisation of cups-browsed”. As the first coding period completed a few days back, I wanted to inform you all about what I did in that time.
>
> But first a bit about the problem with cups-browsed. The cups-browsed is a very useful tool for networks with large numbers of printers, but as it discovers the printers on the network one by one, so as the number of printers increases, the time taken to create a queue for all of them greatly increases.
>
> To understand more about this issue I tested cups-browsed with different numbers of printers to find out how much time it takes to create queues. Next thing to find out was where it was taking most time. To do that I found out time taken by some of the important functions during a queue creation. From the results it was quite clear that `update_cups_queues()` was taking the most time. This function actually creates the queue.
>
> As my mentors Till Kamppeter and Deepak Patankar suggested I looked at where it was taking most of the time in `update_cups_queues()`, and found out that it was `cupsGetNamedDest()`, which is a part of CUPS API to get a specific destination from the list of available destinations. We tried all available alternatives, but none of them worked faster than it, so in the end we decided to stay with it. You can find the above results at [https://github.com/mohitmo/Testing](https://github.com/mohitmo/Testing).
>
> I also created a design document for implementing multi-threading in
cups-browsed. You can find it [here](https://github.com/mohitmo/design-document-cups-browsed/blob/master/doc.md).
>
> In the next phase I am working on implementing multi-threading in cups-browsed.

**Jai Luthra**

> [...] here's my progress with [PAPPL](https://github.com/michaelrsweet/pappl/).
>
> - Device discovery via DNSSD, SNMP.
> - Command line interface (`papplMainloop`)
> - PCL driver (CUPS `rastertohp`) example
>
> Next for work is the packaging and documenting the driver.


## Google Season of Docs 2020
During the last months was also the time window for the technical writer's applications and we got actually many applications, also for the [2 OpenPrinting projects](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2020-openprinting-projects). Some of the candidates were already interacting with us while writing up their proposals.

## Linux Foundation Mentorship Program
We got accepted in the LFMP for a [2-student project](https://people.communitybridge.org/project/7f416728-2578-471b-9c7a-2136ebdb1e46) letting one student to create a framework for converting existing proprietary printer drivers intp Printer Applications and another student to integrate IPP Fax Out support into the Linux desktop.

The project is currently open for student applications and the work period will be August 1 to October 31. Several students have applied already and to introduce them into OpenPrinting and select them we have given the [cups-filters issues](https://github.com/OpenPrinting/cups-filters/issues) to work on as assignment.

## CUPS Snap
The Snap is now renamed to simply be the "[cups-snap](https://github.com/OpenPrinting/cups-snap)" project on the OpenPrinting GitHub and "cups" in the Snap Store.

The build service of the Snap Store is now attached to our GitHub repository and builds the CUPS Snap for 6 architectures (`amd64`, `i386`, `armhf`, `arm64`, `ppc64el`, and `s390x`). Note that the CUPS Snap cannot be downloaded and installed through the Snap Store yet as it will need [new "cups" and "cups-control" interfaces}(https://github.com/snapcore/snapd/pull/8920) which are not yet added to snapd. I have already tested them and they work as expected.

I have tested the CUPS Snap a lot during the last month and [fixed a lot of bugs](https://github.com/OpenPrinting/cups-snap/commits/master), especially make all components [build on all the 6 architectures](https://github.com/OpenPrinting/cups-snap/commit/2f8765c6620e82f04dd73a495f2a76a1babe8ab8) supported by the Snap Store, make utilities like [`lpoptions`](https://github.com/OpenPrinting/cups-snap/commit/9b6996b05433cd64f97bf4e602b97bc8ee832ab4), [`cupsfilter`](https://github.com/OpenPrinting/cups-snap/commit/636cd16d2cf80a770b60d1098a58f4554bb18b68), and [`driverless`](https://github.com/OpenPrinting/cups-snap/commit/c7ce85d69cb425e9c4d8b599b2649a53cfc963a8) correctly work, make [DNS-SD-service-name-based URIs correctly resolve](https://github.com/OpenPrinting/cups-snap/commit/4964fea2cc8e0f1006c817dc74cd62f5c1e9052e) if the service is local (Printer Application or IPP-over-USB), and updated the [README.md](https://github.com/OpenPrinting/cups-snap/blob/master/README.md) to reflect the renaming and the current use of interfaces.

## Driverless Scanning and IPP-over-USB

Alexander Pevzner, author of the IPP-over-USB daemon [ipp-usb](https://github.com/OpenPrinting/ipp-usb) and of the AirScan/eSCL/WSD scanner driver [sane-airscan](https://github.com/alexpevzner/sane-airscan/) asked me to post the news of his work:

> **sane-aiscan**
>
> Though sane-airscan is not included into any any major distro, its popularity among users grows, and it receives more testing on a growing variety of hardware.
>
> Most of newly discovered issues are either firmware bugs that require workarounds, or certain corner cases, like not running Avahi daemon or device announces 2 IP addresses, one of them is not reachable from host.
>
> A couple of hard to reproduce crash bugs were found and fixed with a help of clang static analyzer.
>
> Added packaging for ARM32 and ARM64, targeting Raspberry Pi users.
>
> There already 7 devices in the list that supports WSD, but doesn't support eSCL, so idea to implement WSD was useful.
>
> Integration into SANE project seems to finally stuck. Meanwhile I work directly with Benjamin Gordon on integration into ChromeOS and Zdenek Dohnal on integration into Fedora.
>
> **ipp-usb**
>
> Initially ipp-usb was targeting distro maintainers. That is why its initial documentation is rather short technical and no binary packaging were provided.
>
> Recently I've discovered certain interest among end users to install and use ipp-usb. So I've provided packages for many distros, including ARM32/ARM64.
>
> It also known to work on mipsel Linux, but I can't provide packaging for this platform due to OBS limitations.
>
> As with sane-airscan, growing popularity implies more testing, and some issues were discovered and fixed.
>
> Some users were interested into direct exporting printer into local network segment, which is safe and reliable with ipp-usb. In result, incompatibility with iOS devices were found and fixed (Android devices were always working). This fix was ported to ippusbxd too.
>
> Most of other issues are of the same class: device returns truncated HTTP response, and ipp-usb stuck forever, waiting for missed part of response, which effectively blocks USB connection.
>
> The solution is also the same in all cases: properly set "Connection: close" or "Connection: keep-alive" header in outgoing HTTP request. Unfortunately, different device require different setting of this header.
>
> As it is hard to organize testing on hundreds of devices, more generic solution of this problem is required.
>
> Zdenek Dohnal seems to begin working on integration of the ipp-usb into Fedora. 
>

The projects are not only on the way into Red Hat but also into Debian. Packaging requests for both [ipp-usb](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=961218) and [sane-airscan](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=964446) have been posted and Didier "OdyX" Raboud, printing maintainer of Debian, has taken up both and uploaded the appropriate packages. Also thanks to Brian Potkin to post the request for ipp-usb.

## CUPS
Currently released is 2.3.3.

No further releases or [GIT](https://github.com/apple/cups/) commits, also [79 open issues](https://github.com/apple/cups/issues) and [18 open Pull requests](https://github.com/apple/cups/pulls). Only few answers from upstream developers.

I have asked several people about what is happening here but did not get really clear answers, but it seems the learning needed by the new engineers, COVID-19, and the switch of Apple from Intel to ARM architecture have influence on this.

I am thinking about as a last mean to temporarily fork CUPS so that distribution maintainers can collaborate on fixing bugs there.


## cups-filters
Currently released is 1.27.5.

No new release, due to the fact that I am currently on a major feature addition which I want to complete before releasing 1.28.0 and which is important for the switch over to Printer Applications:

**libppd**

One important point for the CUPS Snap is that it does not support classic printer drivers, consisting of PPD files and filters. So for using it as default CUPS implementation in a Linux distribution, all existing printer drivers need to get turned into Printer Applications, and this with a minimum effort of coding.

Most of them (probably all except Gutenprint) are difficult to get converted by their original authors, as they do not maintain the drivers any more, supported printers are old and no one wants to code for that any more, driver is simply only a big bunch of PPD files, no code, driver is proprietary, closed source, ...

So we need a way to retro-fit these drivers by wrapping them into Printer Applications with lowest coding effort possible and if needed also without needing to modify the original driver executables.

This works best if we use the driver's PPD files inside the Printer Application and so we need to handle PPD files, also after the PPD handling support got removed from CUPS and especially libcups.

To avoid that we have to invent the wheel again, writing a lot of handling code for a totally obsolete file format, I have grabbed all the PPD handling functions from libcups (current GitHub state, CUPS 2.3.3) and put them into the new libppd which I have added to cups-filters.

It has the following properties:
- All PPD-handling-related functions from libcups (except loading the PPD from a CUPS queue or polling a PPD repository on a CUPS server) are overtaken
- Also the CUPS-private functions related to PPDs are overtaken and added to libppd's public API.
- Other private or internal functions are overtaken from libcups as they are needed for the PPD-related functions to work. They are not added to the API.
- Some functions of tools and utilities like ippeveprinter and ippeveps are overtaken.
- All API functions have names starting with "ppd" and written in camel-case, some needed to get renamed for that.
- libppd is separate from libcupsfilters, so it does not need to get included in a Printer Application which uses functionality of cups-filters but does not use PPD files

NOTE: This is NOT to encourage printer driver developers to continue to create new PPD files for new printers. It is ONLY for retro-fitting existing classic CUPS drivers and PostScript PPD files. There will be no further development on the library's code, especially no new PPD format extensions.

The next release of cups-filters, 1.28.0, will contain libppd for the first time. It is already, shortly before completion for 1.28.0 in the [GitHub repository](https://github.com/OpenPrinting/cups-filters/), in the [ppd/](https://github.com/OpenPrinting/cups-filters/ppd/) subdirectory.


Further work:

**pclmtoraster**

GSoC student Vikrant Malik's project is to extract raster data from PDf files which only consist of embedded raster images, not containing text, fonts, or vector graphics. This allows for higher print quality of such PDFs as input files (for example scanned files) and also to convert PDF output of scanners into dedicated raster formats like TIFF, PWG Raster, ...

One known raster-only PDF format is PCLm and therefore Vikrant has started his work by adding the new `pclmtoraster` filter to cups-filters. He also worked a lot on converting raster formats between color spaces an bi depths.

**Bug fixes**

Many bug fixes in cups-browsed, the filters, and the sample PPDs have been performed, often with the help of our GSoC students or candidates doing assignments. Thanks to all of them.

Note also that the sample PPD files have moved to the new [ppdfiles/](https://github.com/OpenPrinting/cups-filters/tree/master/ppdfiles) subdirectory. 

```
CHANGES IN V1.28.0

	- Build system: Remove '-D_PPD_DEPRECATED=""' from the
	  compiling command lines of the source files which use
	  libcups. The flag is not supported any more for longer times
	  already and all the PPD-related functions deprecated by CUPS
	  have moved into libppd now.
	- libcupsfilters, libppd: Older versions of libcups (< 2.3.1)
	  had the enum name for fold-accordion finishings mistyped.
	  Added a workaround.
	- cups-browsed: Remove left-over local queues from the
	  previous session more quickly when CUPS legacy browsing is
	  turned on.
	- cups-browsed: Left-over local queues from the previous
	  session for which the corresponding remote printer did not
	  appear again did not get removed as they were considered
	  externally overwritten.
	- gstoraster, gstopdf: Add option "-dDoNumCopies" to
	  Ghostscript command line if we are outputting PDF (called
	  via gstopdf wrapper) and the number of copies supplied to
	  CUPS is 1 (4th command line argument). In this case we
	  convert incoming PostScript to PDF and need to respect
	  embedded PostScript commands to implement the number of
	  copies (Issue #255, CUPS Issue #5796, OpenSUSE bug
	  #1173345).
	- imagetoraster: Potential null dereference fix (when no valid
	  PPD is supplied, Pull request #256).
	- libppd: Added the new libppd library overtaking all the PPD
	  handling functions from libcups as they are deprecated there
	  and will probably get removed with the next CUPS
	  version. This form of conservation is mainly intended for
	  converting classic printer drivers which use PPDs into
	  Printer Applications without completely rewriting them. Side
	  effect that all the compiler warnings about deprecated
	  libcups functions went away and so cups-filters is free of
	  warnings again. The library still needs some testing and
	  optimization.
	- Sample PPDs: Renamed source directory from "ppd/" to
          "ppdfiles/"
	- cups-browsed: Call cupsGetNamedDest() only if
	  "OnlyUnsupportedByCUPS No"
	- Sample PPDs: Corrected ColorModel default for Generic PWG
	  Raster PPD to Color (Pull request #247).
	- cups-browsed: Mark the temp queue as cups-browsed-generated
          during setting printer-is-shared (Pull request #246).
	- cups-browsed: Remove mentions of README and AUTHORS files in
          the man page (Pull request #244).
	- pclmtoraster: Added new filter to extract Raster data from
	  raster-only PDF files, here for the special case of PCLm
	  files (Pull request #243, #257).
	- Sample PPDs: In Generic-PDF_Printer-PDF.ppd add option to
	  switch between color and grayscale printing (Pull request
	  #237).
```

## IPP-over-USB: ippusbxd and ipp-usb

ippusbxd got some [bug fixes and improvements](https://github.com/OpenPrinting/ippusbxd/commits/master) from Fletcher Woodruff (PR [#38](https://github.com/OpenPrinting/ippusbxd/pull/38) and [#43](https://github.com/OpenPrinting/ippusbxd/pull/43)) and Thierry Hucahrd (PR [#41](https://github.com/OpenPrinting/ippusbxd/pull/41)). Thanks very much to the contributors.

In ipp-usb Alexander Pevzner added lots of [bug fixes and hardware workarounds/quirks](https://github.com/OpenPrinting/ipp-usb/commits/master). Thanks to all the users who have tested with their devices and reported their problems. Probably many more users will have their device just work by that.

ipp-usb is on the way into Red Hat (according to Alexander Pevzner) and also into Debian. This is the [packaging request](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=961218) and Didier "OdyX" Raboud, printing maintainer of Debian, has taken it up and uploaded the appropriate package. Also thanks to Brian Potkin to post the request.
