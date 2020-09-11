---
title: OpenPrinting News - August 2020
layout: single
author: Till
excerpt: 20 years working on printing, Linux Plumbers, GSoC, LFMP, cups-filters 2.0.0 approaching
---
## 20 Years of working on printing with free software!
This month I have my 20th work anniversary of working with printing under Linux and free software. In August 2000 I have started at MandrakeSoft in Paris (later Mandriva) to switch the first Linux distribution from LPD/LPRng to CUPS.

See [how all began](https://openprinting.github.io/How-did-this-all-begin/).


## OpenPrinting Microconference on Linux Plumbers Conference 2020
**Update:** [Recording on YouTube](https://youtu.be/MPGh9FUW4as)

As already back in [2019](https://openprinting.github.io/OpenPrinting-Microconference-on-Linux-Plumbers-Conference-2019/) we are holding a Microconference on the [Linux Plumbers 2020](https://www.linuxplumbersconf.org/), this year in ...

... the wider Internet!! Yes, due to COVID-19 it is all virtual this time, no travelling, no 12 hours with a mask in an airplane full of people. But also no nice sights and delicious restaurants, not tourist-guiding my co-workers with the help of my knowledge of the Portuguese language through a nice city.

But it has also one big advantage: It is much easier to get the desired speakers, as one does not need to get their travel funded. So we will have Michael Sweet, Ira McDonald, Aveek Basu, Alexander Pevzner, and Rithvik Patibandla on our virtual stage, and me naturally, too.

We will talk about the following [subjects](https://openprinting.github.io/upcoming-technologies/):

- [Printer Applications - A new way to print in Linux](https://openprinting.github.io/upcoming-technologies/01-printer-application/)
- [IPP scan (or virtual MF device) server (Scanner Application)](https://openprinting.github.io/upcoming-technologies/02-ipp-scan/)
- [3D Printing](https://openprinting.github.io/upcoming-technologies/03-3d-printing/)
- [IPP Fax Out - A new reality](https://openprinting.github.io/upcoming-technologies/04-ipp-fax/)
- [Designing and Packaging Printer and Scanner Drivers](https://openprinting.github.io/upcoming-technologies/05-designing-packaging-drivers/)

The conference takes place from **Monday, August 24 to Friday, August 28, every day from 2pm - 6pm UTC**. Our day will be the **Friday, August 28**, with our microconference to span all the 4 hours. Everyone is invited to visit us.

If you are actually attending the Linux Plumbers Conference, please visit the **OpenPrinting MC on Friday** and participate in the discussion of the future of printing and scanning. If you are not registered, please listen in via **[YouTube Live Stream](https://linuxplumbersconf.org/event/7/page/100-watch-live-free) for free**. The links to the YouTube streams will appear on this page shortly before the sessions start.


## Google Summer of Code 2020
Unfortunately, one of our students, Aakash Lahoti, had to leave the GSoC early due to family reasons. In the first month he started adding scanner support to [PAPPL](https://github.com/michaelrsweet/pappl). His work you can see [here](https://github.com/aakashlahoti/pappl) (last two commits).

As a replacement, we have opened [another LFMP project](https://people.communitybridge.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) and got accepted with it. This allows us to put two students, each one for 3 months onto this project, and fortunately, we got promising applications.

The other 14 students all passed the second evaluation, 6 of them working for OpenPrinting.

Here are some status messages of our students (all from August 11, 2020):

**Jai Luthra**

> Tasks completed:
> 
> - Discovering network devices.([Issue #17](https://github.com/michaelrsweet/pappl/issues/17), [Issue#18](https://github.com/michaelrsweet/pappl/issues/18))
> - A standard Main Loop for Printer Applications.([Issue#19](https://github.com/michaelrsweet/pappl/issues/19))
> - Porting the CUPS rastertohp and its corresponding PPD files to a Printer Application.([Issue #16](https://github.com/michaelrsweet/pappl/issues/16))
> 
> The work done so far can be found in PAPPL ([https://github.com/michaelrsweet/pappl](https://github.com/michaelrsweet/pappl)) and the HP Printer Application ([http://github.com/michaelrsweet/hp-printer-app](http://github.com/michaelrsweet/hp-printer-app)).
> 
> The HP printer application is a native printer application and an example of how to use PAPPL to create printer applications.
> 
> In Progress:
> 
> - Device Auto-Setup.
> 
> The [Pull Request](https://github.com/michaelrsweet/pappl/pull/36) is open in PAPPL and I am working on it.
> 
> Next:
> As per time permits, I along with other GSoC 2020 students am going to help to move the functionality of filters to libcupsfilters.

Special thanks to Jai for his work on the [PCL sample Printer Application](http://github.com/michaelrsweet/hp-printer-app) which gave me a lot of insight in the way how Printer Applications are created and how they work. This made me designing the new concept of filter functions in cups-filters (see more below).

**Mohit Mohan**

> I have completed the following parts for the project:
> 1. Testing cups-browsed with many printers ([https://github.com/mohitmo/Testing](https://github.com/mohitmo/Testing))
> 
> 2. Design document for implementing multi-threading in cups-browsed. ([https://github.com/mohitmo/design-document-cups-browsed/blob/master/doc.md](https://github.com/mohitmo/design-document-cups-browsed/blob/master/doc.md))
> 
> 3. Parallelised printer discovery in cups-browsed. ([https://github.com/mohitmo/cups-filters/tree/thread_new](https://github.com/mohitmo/cups-filters/tree/thread_new))
> 
> Currently I am working on parallelising queue creation in cups-browsed, but I cannot commit the changes as of now.

**Vikrant Malik**

> The main goal of my project was to build a filter which could extract raster data from raster-only pdf files and PCLm files, so that we don’t have to pass them through poppler or other APIs to rasterise them.
> 
> My project is near its completion. The pclmtoraster filter has been tested and added to the cups-filters project and is ready to use. The newly added pclmtoraster filter can extract raster data from the following categories of files:
> 1. All PCLm files
> 2. PDF files with 1 bitmap per page (Colorspace supported: DeviceRGB, DeviceCMYK, DeviceGray, with 8 bits-per-component)
> 
> I am currently working to convert the pclmtoraster filter into a filter function and test it.
>
> Git Repo Link: [https://github.com/V1krant/cups-filters]([https://github.com/V1krant/cups-filters).

**Priydarshi Singh**

> All the major features of the project have been completed. The project can take user's options and print according to those options.
> 
> There are some minor things left, like dealing with unused options, fixing some bugs, adding documentation to the code, and making it strictly follow the Qt Coding style.
> 
> The code is available in the "cpdb" branch of my fork of qtbase ([https://github.com/dryairship/qtbase/tree/cpdb](https://github.com/dryairship/qtbase/tree/cpdb)).

**Lakshay Bandlish**

> I have completed the browsing part and most of the GUI. So currently, using the program, one can see all the running IPP System Services and their network details, updated in real-time in the GUI.
> 
> I have written the code for IPP request handling in a separate file, I am yet to integrate it with the GUI. Apart from that, I still need to add options to edit the printer settings in this code.
> 
> Currently my code resides in this branch of my repo: 
> 
> [https://github.com/lbandlish/Administrate-MF-Devices-GUI/tree/dns-sd_browse](https://github.com/lbandlish/Administrate-MF-Devices-GUI/tree/dns-sd_browse)
> 
> The readme has the exact instructions to run the current functionality of the program.

**Sambhav Dusad**

> I have worked on several different issues and enhancements during GSoC. Here is a list of all the issues/enhancements completed:
> 
>  - [Adding Print-Test Page functionality](https://github.com/michaelrsweet/pappl/issues/20)
>  - [Log Rotation support and setting log-level](https://github.com/michaelrsweet/pappl/issues/13)
>  - [Creation/Deletion of printer from web-interface](https://github.com/michaelrsweet/pappl/issues/12)
>  - [Pager Support and Cancel job(s) buttons to web-interface](https://github.com/michaelrsweet/pappl/issues/11)
> 
> I have submitted the [PR](https://github.com/michaelrsweet/pappl/pull/35) for adding support for job-save in PAPPL.
>
> Also, I have contributed directly to the PAPPL project. So, there's no specific repo for GSoC.
> 
> I am currently having a discussion with Michael and Till for the next contributions.

Sambhav started now to work on a Gutenprint Printer Application for the rest of the GSoC.

Thanks to all the students for their status reports!


## Google Season of Docs 2020
On August 16 Google will announce the technical writers who will participate in the program. Only then we will get to know which of the projects we nominated will get selected by Google.


## Linux Foundation Mentorship Program
We have selected the two students for our [first LFMP project](https://people.communitybridge.org/project/7f416728-2578-471b-9c7a-2136ebdb1e46):

**Wrapping proprietary printer drivers into a Printer Application**<br>
Student: Dipanshu Verma

**Support for IPP Fax Out**<br>
Student: Nidhi Jain

Currently, I am mentoring both. Depending of the further needs other mentors could jump in.

They have both started at the beginning of August and will work until end of October.

As a replacement for our incomplete GSoC project for IPP Scan we got accepted in the next round (September - November) of LFMP for a [2-student project on IPP Scan](https://people.communitybridge.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171) letting one student to extend [PAPPL](https://github.com/michaelrsweet/pappl) for Scanner Applications (IPP Scan as a server) and the other student expand the driverless scanning SANE backend [sane-airscan](https://github.com/alexpevzner/sane-airscan) to also support IPP Scan in addition to the already supported eSCL and WSD (IPP Scan as a client).

Principal mentors will be Michael Sweet and Alexander Pevzner, the same mentors as of the former GSoC project.

This project is currently open for student applications and the work period will be September 1 to November 31. Several students have applied already and we are currently introducing them into the project and asking them to learn about IPP Scan and SANE.


## CUPS Snap
The [CUPS Snap](https://github.com/OpenPrinting/cups-snap) project is currently waiting for the [snapd project to add the needed interfaces and API extensions](https://trello.com/c/9IJToylf/1215-snapd-api-for-checking-client-snaps-whether-they-plug-a-given-interface).

To control the access to the snapped CUPS we want to have two interfaces which application Snaps should plug to: "cups" should allow the plugging application to print, list jobs, remove the user's own jobs, ... this is the interface for users, it should auto-connect by default. The second is "cups-control" which also allows administrative CUPS tasks to the application which plugs it, like creating and removing print queues, or remove someone else's jobs. This interface will not auto-connect without special permission of the Snap Store. A [Pull Request](https://github.com/snapcore/snapd/pull/8920) for the implementation of these interfaces in snapd is posted and worked on.

The snapped CUPS needs a way to find out whether a snapped client is plugging one of these interfaces and for being able to do so without getting full access to snapd a [new API functionality](https://github.com/snapcore/snapd/pull/9132) will get added to snapd.

Thanks to snapd developers Jamie Strandboge and James Henstridge for the great collaboration on the integration of the CUPS Snap.


## Printer Applications
With the start of the [PCL sample Printer Application](https://github.com/michaelrsweet/hp-printer-app/) as a first working model of a printer driver as Printer Application I have made my first thoughts on how to retro-fit classic printer drivers into Printer Applications.

This made me starting some discussion on the [printing-architecture mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) at OpenPrinting:

- [Printer Applications: Retro-fitting classic printer drivers - libppd](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003819.html)
- [Printer Applications: Retro-fitting classic drivers](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003823.html)
- [PostScript printers without PPD files?](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003826.html)
- [Canceling jobs in Printer Applications](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003831.html)
- [Filter Functions - Getting years of development in cups-filters into Printer Applications](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003842.html)
- [Printer Application for PostScript printers](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003846.html)

Here I have found the answers to many of my questions, introduced libppd and also the filter functions concept, gave guidelines to program filter functions, got told that PostScript is deprecated/obsolete and will not be used without PPDs ...

Note that for participating in these discussions you have to [subscribe to the printing-architecture mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture).


## Driverless Scanning and IPP-over-USB
[ipp-usb](https://github.com/OpenPrinting/ipp-usb) and [sane-airscan](https://github.com/alexpevzner/sane-airscan/) are making it into Debian and Ubuntu. They are both already in Ubuntu Universe and a planned to be promoted into Ubuntu Main for Ubuntu 20.10, so that driverless printing and scanning both via network connection and USB work reliably right out of the box for everyone. A [Main Inclusion Request](https://bugs.launchpad.net/ubuntu/+source/ipp-usb/+bug/1891157) to promote ipp-usb into Ubuntu Main is already posted, sane-airscan will follow soon (**Update:** [Main Inclusion Request for sane-airscan](https://bugs.launchpad.net/ubuntu/+source/sane-airscan/+bug/1891682)). ipp-usb should replace ippusbxd as standard IPP-over-USB implementation in Ubuntu 20.10.

In Debian, both [ipp-usb](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=961218) and [sane-airscan](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=964446) are already in Unstable.

**Update:** sane-airscan made it into the updates-testing repository for Fedora 32 now. Thanks to Alexander Pevzner for the hint.


## CUPS
Currently released is 2.3.3.

No further releases or [GIT](https://github.com/apple/cups/) commits, also now [87 open issues](https://github.com/apple/cups/issues) and [23 open Pull requests](https://github.com/apple/cups/pulls). Only few answers from upstream developers.

A person from Apple told me that CUPS development should recover in a few weeks, but in the weeks after that nothing happens. I am still thinking about as a last mean to temporarily fork CUPS so that distribution maintainers can collaborate on fixing bugs there.


## cups-filters
Currently released is 1.27.5.

No new release as I am currently working towards the second generation of cups-filters, 2.0.0. Main goal of cups-filters 2.0.0 is better support for Printer (and Scanner) Applications.

cups-filters 2.0.0 should contain the following features:

- All filters converted to filter functions in libcupsfilters, see below
- All filters (if not specific to PPD use) should work without PPD and job and printer IPP attributes instead
- Filters should safely run in parallel without conflicting, no global variables, no (or locked) writing to common data structures
- Filter function to chain filters
- Wrappers for the filters to allow their use from CUPS
- IPP handling functions, mainly to be used for filter functions
- [libppd](https://openprinting.github.io/OpenPrinting-News-July-2020/#cups-filters) for retro-fitting classic drivers and [manufacturer-supplied PPDs for PostScript printers](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003846.html) into Printer Applications
- [pclmtoraster](https://openprinting.github.io/OpenPrinting-News-July-2020/#cups-filters) filter function to convert PDF files from scanners into PWG/CUPS/Apple Raster without loss of image quality
- cups-browsed with multi-threading to better scale with larger amounts of printers in the network
- Options for the `./configure` script for partial builds: No cups-browsed, no libppd/PPD support, no libqpdf, raster-only printing/scanning, ... to allow Snaps build only the part of cups-filters which they actually need

**Filter Functions**

One of the main new features in cups-filters are the [filter functions](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003842.html). Here we move the former CUPS filters into library functions in libcupsfilters and also make them all work without PPDs and with IPP attributes for job and printer instead.

This way Printer Applications can call the filters directly, without call of external executables. So a lot of overhead, as the call of the executable, and the flattening of complex data structures, as IPP attributes into command line option strings and parsing them by the filter, is eliminated.

With the filter functions we also conserve the many years of work which we have put into the CUPS filters, to live on in the Printer Applications.

Each filter function is called with the same scheme: Input and output file descriptor, is input file descriptor seekable?, common data records for all filters in the chain (job IPP atttributes and printer IPP attributes OR option list and PPD file (retro-fit), logging function), call parameter record for individual filter. This allows easy chaining of filters, defining the filter chain as an array of records of filter and filter call parameters, and all filters in the chain getting the same job and printer data.

This is a generalization of the CUPS filter scheme which gets print data through stdin, puts resulting data to stdout, and all filters are called with the same arguments and environment variables by CUPS, so they all get the same job and printer data. The filter function scheme especially extends to IPP data structure support and caller-supplied logging function.

I have already converted the pstops and pdftops filters into filter functions, for use in a [Printer Application to support PostScript printers with the manufacturer's PPD files](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003846.html). GSoC student Jai Luthra is starting to convert filters now, too, beginning with the rastertops filter and GSoC student Vikrant Malik will convert his own pclmtoraster filter.

For any volunteer wanting to help converting filters, I have put up some [guidelines](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003850.html) for filter function programming.

General discussion about filter functions happens in [this mailing list thread](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003842.html).

**Bug fixes**

Again many bug fixes in cups-browsed, the driverless utility, and the filters have been performed, often with the help of our GSoC/LFMP students or candidates doing assignments. Thanks to all of them.

I will later do a fork to create a last 1.x.y release for Ubuntu 20.10.

```
CHANGES IN V2.0.0

	- driverless: Added "--std-ipp-uris" command line option to
	  show listed URIs in standard hostname-based form (not the
	  CUPS DNS-SD-service-name-based form. Only for manual call of
	  the utility, for debugging purposes (Pull request #277).
	- libfontembed: Removed assert() calls which cause crashes
	  when unsupported emoji fonts are installed (Issue #254, Pull
	  request #276).
	- driverless: Added support for IPPS (use "ipps://..." URIs if
	  possible, Issue #251, Pull request #270, #273).
	- libcupsfilters, pdftops: Moved core functionality of pdftops
	  into the pdftops() filter function.
	- libcupsfilters, bannertopdf, gstoraster, pdftops: Moved
	  common PDF/QPDF functions (pdf.cxx/pdf.h) into
	  libcupsfilters.
	- libcupsfilters, bannertopdf, sys5ippprinter, texttotext,
	  pdftops: Moved portability implementations (getline.c,
	  strcasestr.c) into libcupsfilters.
	- libcupsfilters, pstops: Added filterCUPSWrapper()
	  convenience function to easily create a classic CUPS filter
	  from a filter function.
	- gstoraster, gstopdf: When converting PostScript to PDF use
	  the "pdfwrite" output device with "-dPDFSETTINGS=/default"
	  instead of with "-dPDFSETTINGS=/printer". This reproduces
	  bitmaps in the PostScript file with their original image
	  quality (Issue #272).
	- pdftops: Replaced the external program call of CUPS' pstops
	  filter by the pstops() filter function of libcupsfilters.
	- lincupsfilters: Added the filter functions concept and added
	  CUPS' pstops filter as the first working model of a filter
	  function. All filters will get converted into filter
	  functions to make it easier to use them in Printer
	  Applications.
	- cups-browsed: Limit log file size and add backup file for
	  previous log entries. Introduced the configuration option
	  DebugLogFileSize in cups-browsed.conf to set the actual
	  limit in kilobytes or 0 to get the old behavior of an
	  unlimited size for the log file (Issue #260, Pull request
	  #267).
	- gstoraster, gstopdf: Do not apply margins when output format
	  is PDF, as then we convert an incoming PostScript file to
	  PDF (pre-pdftopdf) and do not prepare the pages for the
	  printer (post-pdftopdf, Issue #250).
	- cups-browsed: Do not write any log messages directly to
	  stderr, there were some concerning timeouts on queue
	  creation (Issue #260).
	- Build system: Fix cross-compilation without DejaVu test font
	  in configure.ac (Issue #262, Pull request #263).
	- libcupsfilters, libppd: Respect the fact that PPD keywords
	  are case-sensitive when adding "*cupsManualCopies: True" in
	  PPD file (Issue #242).
```


## IPP-over-USB: ippusbxd and ipp-usb
With [ipp-usb](https://github.com/OpenPrinting/ipp-usb) making it into the major Linux distributions, [ippusbxd](https://github.com/OpenPrinting/ippusbxd) will get more and more deprecated, probably only the Chrome OS team will hang on it. Hints on how to solve the problems of ippusbxd are discussed in Issue [#15](https://github.com/OpenPrinting/ippusbxd/issues/15).

**Update:** The Chrome OS developers also have written a replacement for ippusbxd, [ippusb_bridge](https://github.com/dgreid/platform2/tree/master/ippusb_bridge), in Rust, implementing only a subset of ipp-usb but enough for the needs of Chrome OS. This means that we can deprecate ippusbxd for now. This will not mean that we remove ippusbxd's repository, you can play with the code and contribute fixes, but we will not put effort in it like GSoC projects for example. Thanks to Alexander Pevzner for the hint.

[ipp-usb](https://github.com/OpenPrinting/ipp-usb) is more and more recognized as the better, more reliable implementation of IPP-over-USB. Thanks to Alexander Pevzner for this great tool.

During the last month only a few bug fixes got [committed](https://github.com/OpenPrinting/ipp-usb/commits/master).
