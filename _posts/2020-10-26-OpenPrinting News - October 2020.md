---
title: OpenPrinting News - October 2020
layout: single
author: Till
excerpt: PostScript Printer Application, GSoC 2012, GSoD, LFMP, PAPPL, CUPS fork, cups-filters 1.28.5
---
## First year of monthly news posts completed!

It was exactly one year ago, October 2019, when I posted my [first monthly OpenPrinting news](https://openprinting.github.io/OpenPrinting-News-October-2019/) here on [our web site](https://openprinting.github.io/news/)!

Some will tell me now that I already started in September 2019, but the [September 2019 news post](https://openprinting.github.io/OpenPrinting-News-September-2019/) was only a test for the new platform and it was already October when I wrote it as an exact copy of the [original mailing list news post](https://lists.linuxfoundation.org/pipermail/printing-architecture/2019/003733.html).

## Google Summer of Code 2020 Mentor Summit

Due to COVID-19 this year's [Mentor Summit](https://sites.google.com/view/gsoc2020mentorsummit/) was much smaller and totally virtual, an 4-hour event. Aveek Basu and me have participated, leading a [breakout session](https://sites.google.com/view/gsoc2020mentorsummit/breakout-sessions) and having a [lightning talk](https://sites.google.com/view/gsoc2020mentorsummit/lightning-talks).

Here also the GSoC 2021 and its new mode was announced.

## Google Summer of Code 2021

There will be a [Google Summer of Code](https://summerofcode.withgoogle.com/) next year again, but it will be different. The 3-months student projects will be replaced by part-time projects, 6-weeks full-time-equivalent, to be done in a 10-week time-window. Stipends are appropriately reduced to the half amount, leading to the smae per-hour value.

Google hopes to attract more students by this mode. For us as org admins and mentors it means more work, as we have to select more students and we have to work with more students when mentoring. Also we cannot post bigger projects. So let us hope that there will also be a Linux Foundation Mentoring Program for the larger projects.

## Google Season of Docs 2020
Our OpenPrinting project

**Tutorial and Design Guidelines for Printer/Scanner drivers in Printer Applications**

is going well. Piyush Goyal has already written a lot and will continue until December 5.

He regularly posts Pull Requests on [our web site GitHub](https://github.com/OpenPrinting/openprinting.github.io) and we have merged them. See his work on [our web site](https://openprinting.github.io/documentation/).

He gets currently a lot of input, from me with my [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) as example for a non-Raster and CUPS-driver-retro-fit Printer Application and from Michael Sweet by adding documentation to his [PAPPL project](https://github.com/michaelrsweet/pappl).

## Linux Foundation Mentorship Program
In our [first LFMP project](https://people.communitybridge.org/project/7f416728-2578-471b-9c7a-2136ebdb1e46) also Nidhi Jain has withdrawn, also due to suddenly re-started classes in her college and a COVID-19 case in her family.

Our [second LFMP project](https://people.communitybridge.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) about IPP Scan is going on. [Abhik Chakraborty on the server side](https://github.com/Abhik1998/pappl/commits/master) and [Rishabh Arya on the client side](https://github.com/RishabhArya/sane-airscan-ipp/commits/master) are in the middle of their work and have passed their first evaluations.

We had some discussion between Alexander Pevzner, Michael Sweet, and me whether we should actually use IPP Scan as network protocol for sandboxed packaging of scanner drivers/Scanner Applications or better eSCL instead, as eSCL is already implemented as [client](https://github.com/alexpevzner/sane-airscan) and as [server](https://github.com/SimulPiscator/AirSane), but we came to the final conclusion of continuing with IPP Scan.

We only will move the assignment of the remaining work somewhat. Alexander will complete the IPP Scan support in [sane-airscan](https://github.com/alexpevzner/sane-airscan) by himself and both students will work on the server side.

## CUPS Snap
The [CUPS Snap](https://github.com/OpenPrinting/cups-snap) project is currently still waiting for the [snapd project to add the needed API extensions](https://trello.com/c/9IJToylf/1215-snapd-api-for-checking-client-snaps-whether-they-plug-a-given-interface).

After the [Pull Request](https://github.com/snapcore/snapd/pull/8920) for the implementation of the [interfaces](https://openprinting.github.io/OpenPrinting-News-August-2020/#cups-snap) got merged we are still waiting for the completion of the [pull request](https://github.com/snapcore/snapd/pull/9132) for adding the API functionality so that a Snap can check whether a client Snap plugs the needed interfaces is still in the works.

## PostScript Printer Application
After having all needed filter functions and PPD file collection handling implemented in cups-filters and having the [HP PCL Printer Application](https://github.com/michaelrsweet/hp-printer-app) as example I have created a **Printer Application for PostScript printers**.

It is now available as the [ps-printer-app](https://github.com/OpenPrinting/ps-printer-app) repository on the OpenPrinting GitHub.

Currently it is a first working model, it will get much more functionality, especially for best user experience, added in the near future. See all the details of properties, planned features, known issues, and how to use in the [README.md](https://github.com/OpenPrinting/ps-printer-app/blob/master/README.md) file.

This Printer Application is especially a working model for

- A non-raster Printer Application: Destination format is PostScript, a high-level/vector format. Input data in PostScript or PDF is accepted and needed conversion is not done through an inbetween raster step.

- A Printer Application which uses the new filter functions of cups-filters 2.x. Filter functions are library functions derived from cups-filters and contain decades of development and refinement starting from the introduction of CUPS in 2000.

- A retro-fit Printer Application for classic CUPS drivers, in this case the simplest form of only PPD files for PostScript printers. It lists PPD files from repositories included in the Snap, loads the PPD needed for the actual printer, extracts options from the PPD to display them in the web interface, accepts job settings as IPP attributes, and inserts the PostScript code provided by the PPD correctly into the output data stream.

- A Printer Application which does not pass through raw (input format is printer's native format) jobs. To assure that always the PostScript code of the PPD file is inserted into the output stream, we call the printer's native format "application/vnd.printer-specific" which does not exist as input format, so "application/postscript" input is forced through the pstops() filter function.

- To do not need to re-invent the code for forking into sub-processes so that we can pass data through a sequence of filters, we create a filter function to send the data off to the printer and form a chain of the actually converting filter function (one of pstops(), pdftops(), imagetops(), rastertops()) and the with this filter function using the filterChain() filter function.

- The PostScript Printer Application has all PostScript PPD files of the [foomatic-db](https://github.com/OpenPrinting/foomatic-db) and [HPLIP](https://developers.hp.com/hp-linux-imaging-and-printing) projects built-in, so most PostScript printer PPDs which usually come with Linux Distributions. Note that some PPDs use certain CUPS filters for extra functionality. These filters are not included. The user can add additional PPDs without needing to rebuild the Snap.

## Driverless Scanning and IPP-over-USB
The Main Inclusion Requests (MIR) to get [ipp-usb](https://bugs.launchpad.net/ubuntu/+source/ipp-usb/+bug/1891157) passed the Ubuntu security team and so made it to be the default IPP-over-USB implementation in the Groovy Gorilla, Ubuntu 20.10, released October 22, some days ago. So we have reliable IPP-over-USB in Ubuntu now.

Unfortunately, the security team was swmped with requests and so did not come to processing the [MIR for sane-airscan](https://bugs.launchpad.net/ubuntu/+source/sane-airscan/+bug/1891682). So it will only get into the Main repository in Ubuntu 21.04, to be released in April 2021. As it is already in the Universe repository, it can still get easily installed in 20.10. Also upstream is always supplying the newest version in packages for common Ubuntu releases.

Alexander Pevzner is continuing to take user reports and make the packages working with as many devices as possible.

IPP Scan support is currently still worked on in sane-airscan.


## CUPS
Currently released is 2.3.3.

Due to dormant [upstream development](https://github.com/apple/cups/) we have created a [fork an OpenPrinting](https://github.com/OpenPrinting/cups) which will replace the original repository if Apple does not come back with the development. So for the time being CUPS is maintained by Michael Sweet and me.

Michael Sweet has already committed a lot of changes and fixes and Debian has put the first packages of the fork into Experimental.


## cups-filters
Currently released is 1.28.5.

On the way towards 2.0.0 we have converted many filters to filter functions, having now pstops, pdftops, pdftopdf, ghostscript (replaces gstoraster, gstopdf, gstopxl), pclmtoraster, rastertopdf (replaces rastertopdf amd rastertopclm), rastertops, imagetopdf, imagetops, imagetoraster, and filterChain.

With the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app) the filter function concept got its first real life use. Due to this I found and fixed many bugs, especially filterChain() got actually tested for the first time and so found some important bugs and fixed them so that filterChain() actually works now.

Also the functions for handling PPD file collections in libppd got actually used for the first time and I spotted and fixed some bugs in them.

The release of Ubuntu 20.10 (Groovy Gorilla) also made me fix some bugs in the 1.x series of cups-filters.

[1.28.5](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.5):

Bug fix release for a quick, potential crasher correction in cups-browsed

[1.28.4](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.4):

Bug fix release, mainly to solve CUPS performance problems caused by the IPP fax support of the "driverless" utility

[1.28.3](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.3):

Bug fix release to solve problems caused by an inconsistency between the resolvers for DNS-SD-based URIs

```
CHANGES IN V2.0.0

	- libppd: Added PPD collection handling functions (based on
	  the code of cups-driverd in CUPS), for listing collections
	  of PPD files and picking a PPD out of the collection.  PPDs
	  can be in arbitrary subdirectory structures, .tar and
	  .tar.gz files, and also be generated by executables, as one
	  uses them with CUPS in /usr/lib/cups/driver. This is for
	  Printer Applications which retro-fit classic CUPS drivers.
	- libppd, libcupsfilters: Share the definition of logging functions
	  between the two libraries, so that the same logging functions
	  can be used with both.
	- Sample PPDs: Corrected manufacturer name in
	  Fuji_Xerox-DocuPrint_CM305_df-PDF.ppd.
	- texttopdf: Added support for PPD-less use.
	- libcupsfilters, imagetops: Introduced imagetops() filter
	  function for Printer Application to print on PostScript
	  printers. It is used to print images (IPP standard requires
	  at least JPEG to be accepted) without need of a PDF renderer
	  (imagetopdf -> pdftops) and without need to convert to
	  Raster (imagetoraster -> rastertops). The CUPS filter
	  imagetops uses this filter function now, too.
	- libcupsfilters, imagetopdf: Moved core functionality of
	  imagetopdf into the imagetopdf() filter function.
	- libcupsfilters, imagetoraster: Moved core functionality of
	  imagetoraster into the imagetoraster() filter function.
	- sys5ippprinter, cups-browsed: Removed sys5ippprinter, as
	  CUPS does not support System V interface scripts any
	  more. This first approach of PPD-less printing was also not
	  actually made use of.
```

```
CHANGES IN V1.28.5

	- cups-browsed: UUID from IPP response was used after its
	  pointer was freed by ippDelete() (Pull request #311).

CHANGES IN V1.28.4

	- driverless: Avoid duplicate PPD list entries from the same
          device via UUID
	- driverless: Reduce ippfind calls by "driverless" and
	  "driverless-fax"called by CUPS. Let "driverless list" list
	  both print and fax PPDs and "driverless-fax list" do
	  nothing.
	- driverless: Avoid duplicate listings in printer discovery,
	  by "driverless-fax" not listing any URI as "driverless"
	  lists them all already.
	- driverless: Vastly improve performance by doing only one
	  ippfind call instead of two (IPP, IPPS) as ippfind accepts
	  more than one reg type on the command line.
	- Sample PPDs: Corrected manufacturer name in
	  Fuji_Xerox-DocuPrint_CM305_df-PDF.ppd.

CHANGES IN V1.28.3

	- libcupsfilters, cups-browsed: Fixed inconsistency between
	  resolvers for DNS-SD-based URIs, resolve_uri() and
	  ippfind_based_uri_converter(). Now both return a freeable
	  string.
	- libcupsfilters: Fix uninitialized buffer and parsing ippfind
	  output in ippfind_based_uri_converter() function (Issue
	  #308, Pull request #309).
```
