---
title: OpenPrinting News - September 2020
layout: single
author: Till
excerpt: GSoC final results, Linux Plumbers recording, GSoD, LFMP, CUPS temporary fork, cups-filters 1.x fork
---
## OpenPrinting Microconference on Linux Plumbers Conference 2020

We successfully did our second OpenPrinting microconference!

There is a [complete recording on YouTube](https://youtu.be/MPGh9FUW4as) (same links as for the live broadcast during the conference). But note that this one is created automatically by the video conference system, and edited version will get posted later.

We talked about the following [topics](https://linuxplumbersconf.org/event/7/sessions/83/#20200828) (links to the slides in PDF format):

- [Introduction](https://linuxplumbersconf.org/event/7/contributions/773/attachments/680/1243/LPC_20_Print-Scan-FaxInLinux.pdf) - Aveek Basu
- [Printer Applications - A new way to print in Linux](https://linuxplumbersconf.org/event/7/contributions/693/attachments/556/984/lpc-printer-applications-august-2020.pdf) - Michael Sweet
- [3D Printing](https://linuxplumbersconf.org/event/7/contributions/694/attachments/557/985/lpc-3d-printing-august-2020.pdf) - Michael Sweet
- [IPP scan (or virtual MF device) server (Scanner Application)](https://linuxplumbersconf.org/event/7/contributions/695/attachments/558/986/sane-airscan.pdf) - Alexander Pevzner
- [Designing and Packaging Printer and Scanner Drivers](https://linuxplumbersconf.org/event/7/contributions/688/attachments/688/1273/Designing-and-Packaging-Printer-and-Scanner-Drivers.pdf) - Till Kamppeter
- [IPP Standards Landscape](https://linuxplumbersconf.org/event/7/contributions/689/attachments/559/987/Linux-Plumbers-2020-OP-IPP-Standards-Landscape-20200828.pdf) - Ira McDonald
- [IPP Fax Out - A new reality](https://linuxplumbersconf.org/event/7/contributions/748/attachments/681/1244/LPC_20_IPP_FaxOut-A_New_Reality.pdf) - Aveek Basu
- [20 Years on Printing with Free Software](https://linuxplumbersconf.org/event/7/contributions/748/attachments/681/1265/20-Years-on-Printing-with-Free-Software.pdf) - Till Kamppeter

The video conferencing system and the live broadcast worked very well, having around 40 listeners in our virtual room and up to 17 listeners on YouTube. Thanks again to the great work of the organizers!

But I hope we will be able to meet in person again in 2021.


## Google Summer of Code 2020

Coding ended and the final evaluations are completed, the completed projects officially announced by Google.

For the Linux Foundation we got 15 student slots in the beginning and after 1 student dropping out after the first month we had 14 students reaching the final evaluations. 1 of them failed and the other 13 passed.

For OpenPrinting there started with 7 students, 1 being the one who quit after one month and 1 failed in the final evaluations, having 5 who completed the program successfully.

Here are the projects with their submitted work product links:


### 1. Extract raster data from PDFs for direct printing

Student: Vikrant Malik<br>
Mentors: Sahil Arora, Till Kamppeter<br>
[Work Product](https://vikrantmalik051.blogspot.com/2020/08/blog-post.html)

PASSED


### 2. General Printer Application SDK

Student: Jai Luthra<br>
Mentors: Michael Sweet, Till Kamppeter<br>
[Work Product](https://jailuthra1.github.io/google-summer-of-code-2020/)

PASSED

Jai has principally worked on PAPPL but also done an HP PCL sample Printer Application. In gthe end he has also worked on converting filters of cups-filters into filter functions.


### 3. Linux GUI application to admin MF devices using IPP System Service

Student: Lakshay Bandlish<br>
Mentor: Michael Sweet<br>
[Work Product](https://github.com/lbandlish/Administrate-MF-Devices-GUI)

PASSED


### 4. Make Printer Applications Configurable

Student: Sambhav Dusad<br>
Mentor:  Michael Sweet<br>
[Work Product](https://dsam82.github.io/gsoc20)

PASSED

Sambhav has also started to create a Gutenprint Printer Application.


### 5. Speed/Scaling Optimisation of cups-browsed

Student: Mohit Mohan<br>
Mentors: Deepak Patankar, Till Kamppeter<br>
[Work Product](https://github.com/mohitmo/GSoC-2020-Documentation)

PASSED


### 6. Common Print Dialog Backends (CPDB) Qt Implementation
Student: Priydarshi Singh<br>
Mentor: Dongxu Li<br>
[Work Product](https://dryairship.github.io/gsoc-2020/)

FAILED (final evaluation)

We are looking into finishing up CPDB after GSoC.


### 7. IPP Scan (or virtual MF device) server (Scanner Application)
Student: Aakash Lahoti<br>
Mentors: Michael Sweet, Alexander Pevzner

WITHDRAWN (shortly after first evaluation)

We have replaced this project by a 2-student LFMP project ([see below](#linux-foundation-mentorship-program)).



## Google Season of Docs 2020
Our OpenPrinting project

Tutorial and Design Guidelines for Printer/Scanner drivers in Printer Applications

got accepted!

Piyush Goyal will write for us in the next three months (September 14 - December 5).

In total we got [5 projects accepted for the Linux Foundation](https://developers.google.com/season-of-docs/docs/participants/).


## Linux Foundation Mentorship Program
In our [first LFMP project](https://people.communitybridge.org/project/7f416728-2578-471b-9c7a-2136ebdb1e46) Dipanshu Verma, working on retro-fitting proprietary classic printer drivers into Printer Applications had to withdraw, as his college suddenly re-established the classes after the pandemic interruption. In the first months he has done several tests of installing closed-source drivers into a chroot, see his work [on GitHub](https://github.com/dipanshu231099/printer-driver-chroot-example).

Nidhi Jain has successfully expanded the `driverless` tool of cups-filters (which allowed setting up driverless printers with classic printer setup tools) to also work for IPP Fax Out queues, allowing to use the Fax send facility of most modern multi-function printers easily, as devices supporting AirPrint usually support also IPP Fax Out. The functionality is fully working in cups-filters from version [1.28.2](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.2) on and will also be included in Ubuntu 20.10 (Groovy Gorilla).

In the printer setup tool you find your printer under the discovered network printers (also if it is connected via USB, as IPP-over-USB is used then). Select this entry and when it comes to select the driver, select the entry with "Fax, driverless". If you want to fax print the document to this queue and in the print dialog (GTK/GNOME or LibreOffice) select "Custom" in the "Phone Number" option and enter the destination fax number. Parameters like sender info on the fax, default prefixes, repetition of failure, ... you configure with the devices web admin interface.

Nidhi was supposed to add fax support to the Common Print Dialog Backends (CPDB) now, but as development did not make it far enough to do so and due to the withdrawal of Dipanshu we have asked her to carry on on retro-fitting classic printer drivers into Printer Applications. **Update:** Nidhi agreed and will now work on retro-fitting classic printer drivers.

As a replacement for our incomplete GSoC project on IPP Scan we are running our [second LFMP project](https://people.communitybridge.org/project/55cdb4a1-76bd-423a-ab48-3bdf1502a171). Here we have selected our students now and they have started working in the beginning of this month:

**Expand PAPPL for scan support, Scanner Applications (IPP Scan as a server)**<br>
Student: Abhik Chakraborty

**Expand sane-airscan to support IPP Scan (IPP Scan as a client)**<br>
Student: Rishabh Arya

Abhik will get primarily mentored by Michael Sweet and Rishabh by Alexander Pevzner.


## CUPS Snap
The [CUPS Snap](https://github.com/OpenPrinting/cups-snap) project is currently waiting for the [snapd project to add the needed API extensions](https://trello.com/c/9IJToylf/1215-snapd-api-for-checking-client-snaps-whether-they-plug-a-given-interface).

The [Pull Request](https://github.com/snapcore/snapd/pull/8920) for the implementation of the [new "cups" and "cups-control" interfaces](https://openprinting.github.io/OpenPrinting-News-August-2020/#cups-snap) got merged into snapd.

The [pull request](https://github.com/snapcore/snapd/pull/9132) for adding the API functionality so that a Snap can check whether a client Snap plugs the needed interfaces is still in the works.


## Printer Applications
On the Printer Apllications side Sambhav Dusad, GSoC 2020 student, has started to work on creating a Gutenprint Printer Application. As Gutenprint provides all printer capability through its library (PPD files are auto-generated) this will be the first larger-scope **native** Printer Application.

We also have already the following filter functions in cups-filters: pstops, pdftops, pdftopdf, ghostscript (replaces gstoraster, gstopdf, gstopxl), pclmtoraster, rastertopdf (replaces rastertopdf amd rastertopcl), rastertops, and filterChain

Special thanks go to Vikrant Malik and Jai Luthra for thei work on the filter functions.

On the [printing-architecture mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture) at OpenPrinting we had a discussion about whether CUPS is still needed with Printer Applications and IPP devices in place:

- [Will IPP printer devices and Printer Applications obsolete the cupsd?](https://lists.linuxfoundation.org/pipermail/printing-architecture/2020/003854.html)

Note that for participating in these discussions you have to [subscribe to the printing-architecture mailing list](https://lists.linuxfoundation.org/mailman/listinfo/printing-architecture).


## Driverless Scanning and IPP-over-USB
The Main Inclusion Requests (MIR) to get [ipp-usb](https://bugs.launchpad.net/ubuntu/+source/ipp-usb/+bug/1891157) and [sane-airscan](https://bugs.launchpad.net/ubuntu/+source/sane-airscan/+bug/1891682) into Ubuntu Main have passed the general checks of the Ubuntu MIR team and are waiting for the reviews of the Ubuntu security team.

Alexander Pevzner is continuing to take user eports and make the packages working with as many devices as possible.

IPP Scan support is currently added to sane-airscan as a LFMP project.


## CUPS
Currently released is 2.3.3.

Due to dormant [upstream development](https://github.com/apple/cups/) we have discussed to create a (temporary) fork on OpenPrinting for bug fixes and distribution patches and Michael Sweet has [done it now](https://github.com/OpenPrinting/cups).


## cups-filters
Currently released is 1.28.2.

On the way towards 2.0.0 we have converted many filters to filter functions, having now pstops, pdftops, pdftopdf, ghostscript (replaces gstoraster, gstopdf, gstopxl), pclmtoraster, rastertopdf (replaces rastertopdf amd rastertopcl), rastertops, and filterChain

filterChain() is a special filter function which takes an array of filter functions as parameter and passes the input data to all these filter functions subsequently, allowing for conversions for which there is no single filter function available.

Special thanks go to Vikrant Malik and Jai Luthra for thei work on the filter functions.

To allow further releases of cups-filters during the transition from 1.x to 2.x I have created a [1.x branch](https://github.com/OpenPrinting/cups-filters/tree/1.x) into which I cherry-pick all the bug fixes and some smaller feature additions. This branch is especially the source for the current cups-filters packages in Debian and Ubuntu.

Here I have especially added the driverless fax support and the IPP/IPPS support in the `driverless` utility, from Nidhi Jain's LFMP project ([see above](#linux-foundation-mentorship-program)). Also many bug fixes, especially crashes and memory leaks of cups-browsed, are included here.

[1.28.2](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.2):

Bug fix release to mainly fix cups-browsed not shutting down and the driverless utility being slow when listing available printers/faxes

[1.28.1](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.1):

Bug fix release to fix several bugs in the new IPP Fax Out support by the "driverless" utility and also to fix some minor issues

[1.28.0](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.0):

Feature release (probably the last one before 2.0.0) which adds IPP Fax Out support, IPPS support, and a command line option to reveal satndard IPP URIs to the "driverless" utility, added log file size limitation and command line options to control what happens to generated queues on shutdown to cups-browsed, fixed several bugs when printing PostScript input files, several bugs and memory leaks in cups-browsed, crashes on the presence of certain fonts, and many more fixes.

```
CHANGES IN V2.0.0

	- libcupsfilters, gstoraster, gstopdf, gstopxl: Moved core
	  functionality of gstoraster into the ghostscript() filter
	  function.
	- braille: Support new liblouis tables not containing a
          display name (Pull request #303)
	- libcupsfilters: Added filterChain() filter function to run
	  several filter functions in a chain.
	- libcupsfilters, pdftopdf: Moved core functionality of
	  pdftopdf into the pdftopdf() filter function (Pull request
	  #301).
	- Build system: Let ./configure not error out when there is
	  more than one DejaVuSans.ttf test font candidate (Issue
	  #300).
	- cups-browsed: Crash when a remote printer set as default
	  gets removed, due to missing variable in printf() call
	  (Issue #299).
	- COPYING: Fixed several typos
	- libcupsfilters: Fixed typo in log message of
	  get_printer_attributes functions.
	- cups-browsed: Fixed typos in configuration file and man page
	- libcupsfilters: Let the PPD generator not suffix page size
	  names with ".Borderless" if all page sizes would get this
	  suffix, for example for printers which generally print
	  borderless.
	- driverless, driverless-fax, libcupsfilters: Added IPP Fax
	  Out support. Now printer setup tools list an additional fax
	  "driver".  A fax queue is created by selecting this
	  driver. Jobs have to be sent with "-o phone=12345" to supply
	  the destination phone number (Pull request #280, #293,
	  #296, #302, #304, #305, #306, Issue #298).
	- libfontembed: Silenced warning with gcc 10.x (Pull request
	  #287).
	- libcupsfilters, rastertopdf, rastertopclm: Moved core
	  functionality of rastertopdf into the rastertopdf() filter
	  function (Pull request #288, #289).
	- cups-browsed: Added ./configure options
	  --enable-saving-created-queues and
	  --with-remote-cups-local-queue-naming (Pull request: #253,
	  #285).
	- libcupsfilters, pclmtoraster: Moved core functionality of
	  pclmtoraster into the pclmtoraster() filter function (Pull
	  request #275).
	- libcupsfilters, rastertops: Moved core functionality of
	  rastertops into the rastertops() filter function (Pull
	  request #282, #290).
	- cups-browsed: Fixed several memory leaks, mainly from the
	  code to merge printer IPP attributes for clusters (Pull
	  request #281, #283).
	- libcupsfilters: Started adding functions to read out IPP
	  attributes from the job and check them against the IPP
	  attributes (capabilities) of the printer:
	  ippAttrEnumValForPrinter(), ippAttrIntValForPrinter()
```

```
CHANGES IN V1.28.2

	- driverless: Free allocated memory, use MAX_OUTPUT_LEN (Pull
	  request #304).
	- driverless: driverless: Make the two ippfind tasks(for IPP
	  and IPPS) run in parallel (Pull request #302, #305, #306).
	- braille: Support new liblouis tables not containing a
	  display name (Pull request #303)
	- Build system: Let ./configure not error out when there is
	  more than one DejaVuSans.ttf test font candidate (Issue
	  #300).
	- cups-browsed: Crash when a remote printer set as default
	  gets removed, due to missing variable in printf() call
	  (Issue #299).
	- libcupsfilters: Removed all signal handling and global
	  variables from get_printer_attributes() and
	  ippfind_based_uri_converter().  This is overkill for these
	  quick operations and causes problems when shutting down
	  cups-browsed (Issue #298).

CHANGES IN V1.28.1

	- COPYING: Fixed several typos
	- libcupsfilters: Fixed typo in log message of
	  get_printer_attributes functions.
	- cups-browsed: Fixed typos in configuration file and man page
	- libcupsfilters: Let the PPD generator not suffix page size
	  names with ".Borderless" if all page sizes would get this
	  suffix, for example for printers which generally print
	  borderless.
	- libcupsfilters: Added "faxPrefix" option for generated IPP
	  Fax Out PPDs, so that this option also appears in print
	  dialogs.
	- driverless: List addresses for local services correctly when
	  using "--std-ipp-uris" (with "localhost" hostname).
	- driverless: Make calls of the ippfind utility somewhat faster,
	  setting the timeout of ippfind to automatic.
	- libcupsfilters: Resolve DNS-SD-based URIs for local services
	  correctly (using hostname "localhost").
	- libcupsfilters: In get_printer_attributes() functions do not
	  try to convert URIs which are not DNS-SD-based (Issue #294).
	- libcupsfilters: In get_printer_attributes() functions also
	  support URIs with "dnssd://..." scheme.
	- libcupsfilters: Moved signal handling back into main
	  function of the get_printer_attributes() variants, it got
	  moved out accidentally.
	- driverless: For generating a PPD, independent whether via
	  "driverless URI" or "driverless cat URI", always allow CUPS
	  driver URIs (prefixed with "driverless: " or
	  "driverless-fax:") and pure IPP URIs.
	- driverless: Accept clean IPP URIs also for 'driverless cat
	  ...' (Issue #295, Pull request #296).
	- driverless-fax: Do not use fixed path for call of driverless
	  itself (Pull request #293).

CHANGES IN V1.28.0

	- driverless, driverless-fax, libcupsfilters: Added IPP Fax
	  Out support. Now printer setup tools list an additional fax
	  "driver".  A fax queue is created by selecting this
	  driver. Jobs have to be sent with "-o phone=12345" to supply
	  the destination phone number (Pull request #280).
	- libfontembed: Silenced warning with gcc 10.x (Pull request
	  #287).
	- cups-browsed: Added ./configure options
	  --enable-saving-created-queues and
	  --with-remote-cups-local-queue-naming (Pull request: #253,
	  #285).
	- cups-browsed: Fixed several memory leaks, mainly from the
	  code to merge printer IPP attributes for clusters (Pull
	  request #281, #283).
	- driverless: Added "--std-ipp-uris" command line option to
	  show listed URIs in standard hostname-based form (not the
	  CUPS DNS-SD-service-name-based form. Only for manual call of
	  the utility, for debugging purposes (Pull request #277).
	- libfontembed: Removed assert() calls which cause crashes
	  when unsupported emoji fonts are installed (Issue #254, Pull
	  request #276).
	- driverless: Added support for IPPS (use "ipps://..." URIs if
	  possible, Issue #251, Pull request #270, #273).
	- gstoraster, gstopdf: When converting PostScript to PDF use
	  the "pdfwrite" output device with "-dPDFSETTINGS=/default"
	  instead of with "-dPDFSETTINGS=/printer". This reproduces
	  bitmaps in the PostScript file with their original image
	  quality (Issue #272).
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
	- libcupsfilters: Respect the fact that PPD keywords
	  are case-sensitive when adding "*cupsManualCopies: True" in
	  PPD file (Issue #242).
	- libcupsfilters: Older versions of libcups (< 2.3.1)
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

