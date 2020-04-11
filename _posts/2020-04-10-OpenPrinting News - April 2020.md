---
title: OpenPrinting News - April 2020
layout: single
author: Till
excerpt: Most probably 5 students for GSoC 2020; Google Season of Docs 2020: LF will apply; Progress of PAPPL, Driverless, and CUPS Snap, cups-filters 1.27.4
---

## Google Summer of Code 2020

The student apllication period has ended on March 31 and in the whole Linux Foundation we got 28 proposals. Naturally there are always many unusable proposals. For OpenPrinting we got 5 useful ones, in total for the Linux Foundation 10, but there can be more as not all of the workgroups answered to us yet.

We have also high redundancy of mentors in OpenPrinting, so if a mentor drops out there should be no problem for the students to continue their work.

Some of the students asked for deeper details of their projects and I have explained them the state of the art and what they can expect to work on.

We will have to request our number of student slots by April 21 and the accepted projects will get announced by Google on May 4. See Google's [timeline](https://developers.google.com/open-source/gsoc/timeline).

## Google Season of Docs 2020

The Linux Foundation will also apply as mentoring organization in this year's [Google Season of Docs](https://developers.google.com/season-of-docs/). Google accepts umbrella organizations for the first time now, after we had a meeting with the GSoD organizers.

In the Google Season of Docs technical writers apply for documentation writing projects at free software organizations. This way the organizations get high-quality documentation for their software and technical writers get experience in the free software world.

Here is our [project ideas page](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2020) and the [project ideas for OpenPrinting](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2020-openprinting-projects).

**Especially we want to get a tutorial written so that printer and scanner manufacturers have an easy guide to design and package their drivers as Printer Applications.**

The time period for the writing of the documentation starts on September 14, right after the coding period of GSoC, so that we can get documentation written for code which got created during GSoC. The writing period ends on December 5 for standard projects and on March 8, 2021 for long projects.

## Printer Application Framework/SDK -> PAPPL

Michael Sweet has continued his work on [PAPPL](https://github.com/michaelrsweet/pappl/). He still tells that itis under development and not yet working, but many things already reached a working state. The emulated IPP printers are now advertised via DNS-SD and one gets a mostly correct response on a get-printer-attributes IPP request, meaning that the local CUPS creates a temporary queue, the `driverless` utility lists the printer's URI and creates a working PPD, and also `cups-browsed` creates a queue. And you can actually print on this emulated printer, jobs being listed on the web interface of the test Printer Application.

In the web interface the structure of pages is already defined, but most pages are still empty. Job history list and consumables are displayed already.

This also means that things planned for the Printer Application SDK GSoC project will already be done when the coding period starts, but here we will simply be flexible with what will exactly be done during the project. We will be able to do additional things which we did not plan in the beginning.

I am suggesting the following:
- Take care that all the properties described on [here](https://openprinting.github.io/OpenPrinting-News-March-2020/#printer-application-frameworksdk---pappl)last month are fulfilled. I have agreed with Mike on them. But if Mike does not implement all of these it will be the student's task to add what is missing.
- One point Mike will most probably not add is the retro-fitting of old PPD/filter drivers. For these we will need to copy over PPD-supporting code from libcups into cups-filters to conserve it for the legacy driver support with a minimum of code creation.
- Re-structuring of cups-filters to make it easier to use the code of the filters in Printer Applications.

## Driverless scanning
**I succeeded to get “escl” maintainer Thierry Huchard and “airscan” maintainer Alexander Pevzner join their projects instead of competing with each other!!** (see [thread on GitLab](https://gitlab.com/sane-project/backends/issues/202)).

Also I did a lot of testing for WSD (Microsoft’s Web Services for Devices) support by the “airsane” driver on my HP OfficeJet 8730 Pro. With my feedback all the problems got fixed and my device is now perfectly scanning with both eSCL (Apple AirScan) and WSD and probably 100s of other multi-function devices, too.

Currently we ran into a problem that some devices provide lossless images only in PDF format, so raster extraction from PDF is needed. Unfortunately, we did not find emough students to cover [the student project we posted for raster extraction for printing](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2020-openprinting-projects#extract_raster_data_from_pdfs_for_direct_printing). We discussed the problem and in addition to classic renderers ([Ghostscript](http://www.ghostscript.com/), [MuPDF](https://mupdf.com/), [Poppler](https://poppler.freedesktop.org/)) many libraries were mentioned, which partially also do complete rendering but at least are capable of extracting bitmaps: [PDFium](https://opensource.google/projects/pdfium), [PoDoFo](http://podofo.sourceforge.net/), [QPDF}(http://qpdf.sourceforge.net/). For the latter I confirmed with author Jay Berkenbilt that it is actually capable of extracting raster images. My suggestion is to go with QPDF as cups-filters already uses it and the extraction algorithm will also e used for printing to get higher output quality and faster processing.

## Printing Stack Snap
The discussion of a snapd interface for the [Printing Stack Snap](https://github.com/OpenPrinting/printing-stack-snap) has gone on with a video meeting and on the [Snapcraft forum](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/).

Here we first found out that we have to patch cupsd so that on inquiries on the domain socket it can find out from where those come: Which process? Is the client a Snap? ...

Two approaches came to discussion, using PolicyKit (adding PolicyKit support to CUPS) and applying the same mechanism which is applied to the PulseAudio Snap to restrict who is allowed to record audio instead of only playing. We settled on the latter and currently I am investigating how to apply this to the CUPS daemon.

## CUPS
No further releases.

Still no commits on the [CUPS GitHub](https://github.com/apple/cups) since Dec 18, 2019.

## cups-filters
Currently released is 1.27.4.

**Next development steps** of cups-filters are to go towards a PPD-less world and Printer applications (most I mentioned already last month):
- Make all filters working without PPD, with IPP options. Exceptions are filters especially made for PPDs, as foomatic-rip.
- Add build options for no-PPD-supporting CUPS, raster-only Printer Applications, no cups-browsed. Snaps will often have their own cups-filters and then a very limited part of it.
- Move more functionality into the libcupsfilters library, so in Printer Applications filter chains could be implemented as library function calls instead of external executable calls
- Move all the PPD-related functions of the CUPS library (libcups) into a new libppd, to allow converting legacy drivers into Printer Applications with minimum need of creating new code

To make the move of filter functionality into libcupsfilters possible, and also to integrate well with CUPS and PAPPL, we will **change the license of cups-filters** to [Apache 2.0](https://github.com/apple/cups/blob/master/LICENSE) with [(L)GPL2](https://github.com/apple/cups/blob/master/NOTICE) exception. This is the same as CUPS and PAPPL use.

I have reached out to all contributors and all but two agreed so far, no one rejected. I am still waiting fo the answer of the remaining two.

We have agreed on **not to rename cups-filters**. It will only get a new generation number (versions 2.x.y). cups-browsed will perhaps get spun out into its own project.

1.27.4:

Bug fix release, several minor fixes and especially memory issues in cups-browsed

This will be the cups-filters version of Ubuntu 20.04 LTS (Focal Fossa).

```
CHANGES IN V1.27.4

	- libcupsfilters, cups-browsed: Fix memory issues in
          ppdgenerator and cups-browsed (Pull request #226).
	- pdftops: Mention cups-filters README, CUPS README in debug
          log (Pull request #225).
	- pdftopdf, gstoraster, foomatic-rip: Use "-dSAFER"
          Ghostscript option, instead of the deprecated
          "-dPARANOIDSAFER" (Pull request #224).
	- Build System: Replace '==' in configure.ac test with '=', as
	  the former is a bashism (Pull request #222).
```


## IPP-over-USB: ippusbxd and ipp-usb

No further news.
