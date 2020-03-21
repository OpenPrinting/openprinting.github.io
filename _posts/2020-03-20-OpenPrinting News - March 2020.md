---
title: OpenPrinting News - March 2020
layout: single
author: Till
excerpt: Virtual OpenPrinting Summit/PWG Meeting, LF Member Summit 2020 cancelled, Linux Foundation accepted as GSoC mentoring organization, PAPPL Printer Application Framework, Avahi 0.8.0 released with localhost support, AirScan in Ubuntu 20.04, cups-filters 1.27.3, ippusbxd 1.34
---
## OpenPrinting Summit/PWG Meeting Virtual

On May 5-7 we will have our annual meeting again, the [OpenPrinting Summit/PWG Meeting](http://www.pwg.org/chair/meeting-info/may-2020-virtual.html).

Because of the Corona virus situation we have turned it into a virtual meeting using WebEx instead of actually coming together in Lexington, KY. The originally planned schedules are slightly changed to get shorter meeting days.

## Linux Foundation Member Summit 2020 has been cancelled
Unfortunately, the Linux Foundation Member Summit 2020 in Lake Tahoe, California, has been cancelled due to the Corona virus as many other events got cancelled.

## Google Summer of Code 2020

The Linux Foundation got accepted as a mentoring organization on February 20. So we have continued looking for students and let them do assignments to introduce them into OpenPrinting.

The application period for students has started on March 16 and currently we are working with our student candidates on their proposals. We are giving them more background information about the [project ideas](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects) so that they can plan how to work on the projects.

The students who have reached this stage of our selection process have successfully fixed 9 issues on the OpenPrinting GitHub which we have given to them as assignments. Some additional issues we have closed as invalid after investigations done by out students. The number of [open issues of cups-filters](https://github.com/OpenPrinting/cups-filters/issues) is down to 8 now.

We have also 13 mentors registered already for OpenPrinting, so mentoring for all students will be assured.

The application period for students ends on March 31, so we are still accepting student applications. The accepted student projects will get announced on April 27. See the [GSoC 2020 timeline](https://developers.google.com/open-source/gsoc/timeline).

## Avahi local service support

As I told last month Trent Lloyd has [added support for localhost](https://github.com/lathiat/avahi/commit/2fd76baeb8298ef1b5b177bf7fd70f6cda3eab00) to Avahi.

Now he has released [version 0.8.0](https://github.com/lathiat/avahi/releases) with the localhost support included and my name is listed in the "Thank you" section of the release notes.

Now all the requirements for Printer (and Scanner) Applications to work are fulfilled.

## Printer Application Framework/SDK -> PAPPL

Michael Sweet has started his [PAPPL](https://github.com/michaelrsweet/pappl/), a framework/SDK for creating standards-conforming Printer Applications. Especially allows configuration and administration with a web interface, a command line interface, and a basic IPP System Service interface and it opens only one socket for all configuration interfaces and IPP device emulations. Note that PAPPL is still under development and not in a working state yet.

The [printer-application-framework](https://github.com/OpenPrinting/printer-application-framework) project from GSoC 2019, which I had moved into OpenPrinting last month and also started improving it for actual use is now deprecated by PAPPL, as it is missing configuration interfaces and runs IPP printer emulations with independent sub daemons on different ports. Some part of the code could perhaps still be used in future Printer Applications. I want to than Dheeraj Yadav for his work anyway, as it was an important study to try out and understand the new architecture.

After having a deeper look into PAPPL and also [LPrint](https://github.com/michaelrsweet/lprint/), the very first working Printer Application, a driver for label printers, also from Michael Sweet, which also has a [good documentation](https://github.com/michaelrsweet/lprint/blob/master/DOCUMENTATION.md) I have written up how a Printer Application should work, especially also with user experience in mind, and Michael has agreed with that, and he wants to add that to the documentation of PAPPL.

What I had written up is the following:

A Printer Application should work like this:

- Fire up the daemon after installation of the Snap and after each subsequent boot (declare as "daemon: simple" in snapcraft.yaml).
- Check whether there is an "lp" system user available. If yes, let daemon drop privileges fully or partially, depending whether root is needed to access the hardware device. Opening the socket and filtering can always be done as "lp".
- Open the socket, at least localhost:PORT, only one single socket on one single port. Depending on configuration settings the socket is also opened on the network: HOST:PORT. For simplicity I will only mention localhost in the next steps, also only http and ipp and not https and ipps.
- Fire up the web admin interface:
```
   http://localhost:PORT/
```
It should always be there, even if no supported printer or scanner gets discovered or manually set up. Make also a command line interface and optionally an IPP System Service interface available.
- Observe devices appearing and disappearing through the whole life of the daemon process. Auto-setup USB- and DNS-SD-discovered devices when they are not already set up and when configuration does not suppress auto setup of a certain device or generally. Do not wake up hardware devices during auto-setup. Use only the information of device IDs and DNS-SD records plus the knowledge of the Printer Application itself (driver) for the initial configuration of the device. Do not use SNMP for auto-setup, it causes more problems than benefits. Mark queues online and offline on devices appearing and disappearing.
- For each hardware device create an IPP device emulation with an URI as follows:
```
   ipp://localhost:PORT/ipp/print/laserjet-1200
   ipp://localhost:PORT/ipp/print/laserjet-4000
   ipp://localhost:PORT/ipp/print/officejet-5000
   ipp://localhost:PORT/ipp/scan/officejet-5000
   ipp://localhost:PORT/ipp/faxout/officejet-5000
```
Here the OfficeJet 5000 is a multi-function device which also does Scan and Fax and the Printer Application supports this (HPLIP for example). My suggestion is to have the same queue name for the printer, scanner, and fax which belong to the same hardware device.
- Only query a hardware device (possibly waking it up) if
  - A client sends a get-printer-attributes IPP request
  - A client sends a job
  - The user configures the device using the Printer Application's web interface.
- A new Printer Application should be done natively whenever possible, not simply wrapping PPD files and filters.
- Printer Applications retro-fitting PPD files and filters should only be used for older, now unmaintained drivers, proprietary drivers where the manufacturer does not care, or as a quick interim solution if a Linux distribution should be turned all-Snap, especially with CUPS in a Snap. All PPD options which can get translated to IPP attributes should be made available as IPP attributes, all options of the PPD including the ones which cannot get converted to IPP attributes should be configurable by the web interface, so that a user can at least access them by setting queue default values for them.
- The Printer Application is not restricted to only provide functionality for the printing and scanning itself and preparing it but can contain all printer-specific software, like the GUI tools which come with HPLIP.
- (I do not know whether this is required by standards, but in my opinion it should work) Make use of GUI tools contained in a Printer Applications Snap optional, always also allow installation of the Snap and using it on a GUI-less, headless server. This especially requires that all configuration should also be available through the web admin interface.

Michael Sweet has also updated our [GSoC project ideas](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects) appropriately and the mentors are also informed about the new requirements.

While preparing our students for writing their proposals, Michael has discovered that IPP System Service is missing a standard DNS-SD record. So he has [quickly defined one](https://github.com/istopwg/ippsample/wiki/IPP-System-Service-Discovery-with-DNS-SD) and already put it onto its way into the IPP System Service standard of the [PWG](http://www.pwg.org/).

## Driverless scanning
SANE 1.0.29 with the "escl" (AirScan) backend made it into Ubuntu 20.04 LTS (Focal Fossa), so we have AirScan support, meaning that hundreds of scanners in multi-function devices will work now.

Alexander Pevzner has expanded his "airscan" SANE backend to be a general backend for manufacturer-independent high-level scanning protocols. He already has added the WSD (Microsoft, W3) scanning standard and plans to add IPP Scan support soon. Here is his work so far on [GitHub](https://github.com/alexpevzner/sane-airscan-wsd).

He will also mentor a student on the [IPP Scan server/Scanner Application project](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects?&#ipp_scan_or_virtual_mf_device_server_scanner_application) in this year's GSoC.

## Printing Stack Snap
I have been on a Canonical Engineering Sprint in Frankfurt as my last trip right before the Corona virus shutdown and talked with the developers of the Snap infrastructure about the CUPS Snap integration.

For the [Printing Stack Snap](https://github.com/OpenPrinting/printing-stack-snap) I have posted the following requests on the [Snapcraft Forum](https://forum.snapcraft.io/):

- **[Interface request: “cups-control” on CUPS snap and including D-Bus](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/):** Snaps are a form of sandboxed software packages. The packaged software is inside an enclosure to allow detailed control of the interaction between this software and the outside world. To define the allowed communication Snaps use interfaces which describe what is allowed. These interfaces are defined in snapd, the central control entity for the Snaps on a system. For the CUPS printing Snap we need a specialized interface allowing the communication channels of CUPS. its TCP socket, its domain socket, and its D-Bus services. This is a request to the snapd developers to add an appropriate interface.
- **[Hardware-associated snaps - Snap Store search by hardware signature](https://forum.snapcraft.io/t/hardware-associated-snaps-snap-store-search-by-hardware-signature/):** The main reason for which we are developing Printer Applications is to provide printer drivers in a way that we can used sandboxed packaging for security and for making the driver packages working on any Linux distribution, not needing to build them for each distribution individually. But when the Printer Applications are put up as Snaps in the Snap Store, users would need to find the corrct Snap for their device to install it. Adding a hardware signature list could make the finding of the correct driver automatic, by hardware info being sent to the Snap Store as search term. This is the appropriate feature request for snapcraft and the Snap Store.

## CUPS
No further releases.

Still no commits on the [CUPS GitHub](https://github.com/apple/cups) since Dec 18, 2019.

But now I got the first sign of life from Apple after Michael Sweet has left. I got answers on my two bug reports, [one about mangling IPP attribute names](https://github.com/apple/cups/issues/5740), and [one about `cupsctl` corrupting the `cupsd.conf` file](https://github.com/apple/cups/issues/5744).

## cups-filters
Currently released is 1.27.3.

Next development steps of cups-filters are to go towards a PPD-less world and Printer applications:
- Make all filters working without PPD, with IPP options. Exceptions are filters especially made for PPDs, as foomatic-rip.
- Add build options for no-PPD-supporting CUPS, raster-only Printer Applications, no cups-browsed. Snaps will often have their own cups-filters and then a very limited part of it.
- Move more functionality into the libcupsfilters library, so in Printer Applications filter chains could be implemented as library function calls instead of external executable calls

1.27.3:

Bug fix release, fixing Ghostscript-based PDF page counting in foomatic-rip to work with all Ghostscript versions, building libfontembed tests with correct path to test font, re-sharing of remote CUPS queues with cups-browsed and others

1.27.2:

Bug fix release, mainly to fix regressions cause by the zero-page-job-support implementation in foomatic-rip, also some code improvements in foomatic-rip and some crasher fixes in cups-browsed

```
CHANGES IN V1.27.3

	- cups-browsed: Allow sharing local queues pointing to remote
	  CUPS queues and re-sharing printers discovered via
	  BrowsePoll by default, using
	  AllowResharingRemoteCUPSPrinters and
	  NewBrowsePollQueuesShared directives in cups-browsed.conf
	  (Issue #101, Pull request #218).
	- driverless: Correctly unlink temporary file when generating
	  PPD file (Pull request #220).
	- cups-browsed: Fixed memory leaks (Pull request #219).
	- foomatic-rip: PDF page count side-loads the PDF file to
	  count the pages in, so it cannot be run in -dSAFER mode. Run
	  even in -dNOSAFER mode to override the -dSAFER default of
	  newer Ghostscript versions. This should not cause a security
	  problem as we do not take an input file which could do
	  arbitrary side-loads but we run hard-coded PostScript
	  commands instead (Issue #216).
	- libfontembed: Add checks to the test programs to not
	  segfault if the test font file is not found (Pull request
	  #214).
	- Build System: Let ./configure fail if the supplied test font
	  file path (or the default) does not exist (Pull request
	  #214), also use the "find" command to find the test font
	  file DejaVuSans.ttf under /usr/share/fonts, as every
	  distribution has it somewhere else.

CHANGES IN V1.27.2

	- foomatic-rip: In some PostScript input files it was possible
	  that option settings did not get inserted or lines inserted
	  on the wron place (Issue #208, Pull request #210).
	- foomatic-rip: For the PDF page count call Ghostscript in
	  sandbox mode and fix pointer arithmetics (Pull request
	  #212).
	- foomatic-rip: Zero-page-job handling changes made the last
	  page of PostScript files not printed, also turning one-page
	  jobs into zero-page jobs (Issue #200, Issue #206, Issue
	  #208, Pull request #209, Pull request #210, Pull request
	  #211).
	- cups-browsed: check_printer_with_option() function:
	  Initialize the value, add further checks, freeing memory and
	  stop allocating magic numbers (Pull request #204).
	- cups-browsed: Additional checks against crashes in the
	  is_local_hostname() function (Ubuntu bug #1863716)
```

## IPP-over-USB: ippusbxd and ipp-usb

Released ippusbxd 1.34

This release is mainly to improve the DNS-SD advertising to equal the one of the network mode of the device and also to advertise its AirScan scanning capabilities, but we also have some communication and code base improvements.

- DNS-SD-advertise the device's capabilities based on polling the device via IPP (printing and send-fax part) and via HTTP (eSCL scanning part, if available), the records now contain the same information as the DNS-SD records which the printer broadcasts through its network connection
- Improved code base by formatting, header files, comments in the header files, and improving debug output
- Added exponential backoff for print read requests when printer’s responses are empty for saving resources and reducing log file spam
- Apparmor: Matched path when bin and sbin directories are merged
