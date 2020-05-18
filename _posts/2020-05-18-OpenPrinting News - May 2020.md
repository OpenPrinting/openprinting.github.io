---
title: OpenPrinting News - May 2020
layout: single
author: Till
excerpt: 7 students for GSoC; LP accepted for Google Season of Docs; OpenPrinting/PWG Meeting; Progress of our projects
---
## OpenPrinting Summit/PWG Meeting 2020
During 4 days we have discussed, together with the [Printer Working Group (PWG)](http://www.pwg.org), our plans how we will continue the development printing (and scanning) with free software on Linux and similar operating systems and also about free printing-related standards, especially the Internet Printing Protocol (IPP).

The OpenPrinting-related part was the first day (Tue, May 5). See the [agenda](http://www.pwg.org/chair/meeting-info/may-2020-virtual.html).

Due to COVID-19 we did not meet in person, but had a virtual meeting, using WebEx. The agenda was modified to make the individual meeting days shorter, adding a forth day.

The topics we discussed are on the [agenda](http://www.pwg.org/chair/meeting-info/may-2020-virtual.html). Slides of all presentations are linked there, too. Here is an [excellent summary](https://ftp.pwg.org/pub/pwg/www/blog/pwg-may-2020-F2F-summary.html) written by Smith Kennedy from HP and here are [Ira McDonald's minutes](http://ftp.pwg.org/pub/pwg/liaison/openprinting/minutes/OP-Summit-Minutes-20200505.htm) of the OpenPrinting topics. There is no audio or video recording of the meeting.

## Google Summer of Code 2020
On May 4 Google has officially announced the accepted student projects, and we were lucky with the student slots, having received all the 15 requested slots for the Linux Foundation with 7 being for OpnePrinting.

These are the 7 student projects working with us this summer:

**Linux GUI application (can be part of GNOME printer tool) to admin MF devices using IPP System Service**<br>
Student: Lakshay Bandlish<br>
Mentors: Rithvik Patibandla, Michael Sweet, Ira McDonald, Smith Kennedy, Danny Brennan

**Common Print Dialog Backends (CPDB) Qt implementation**<br>
Student: Priydarshi Singh<br>
Mentors: Dongxu Li, Nilanjana Lodh, Till Kamppeter, Deepak Patankar

**IPP scan (or virtual MF device) server (Scanner Application)**<br>
Student: Aakash Lahoti<br>
Mentors: Alexander Pevzner, Thierry Hucahrd, Michael Sweet, Ira McDonald, Smith Kennedy, TIll Kamppeter

**General Printer Application SDK (PAPPL-based)**<br>
Student: Jai Luthra<br>
Mentors: Dheeraj Yadav, Michael Sweet, Ira McDonald, Till Kamppeter

**Make Printer Applications configurable (via PAPPL)**<br>
Student: Sambhav Dusad<br>
Mentors: Michael Sweet, Dheeraj Yadav, Ira McDonald, Till Kamppeter, Sahil Arora

**Speed/scaling optimization of cups-browsed**<br>
Student: Mohit Mohan<br>
Mentors: Till Kamppeter, Deepak Patankar

**Extract raster data from PDFs for direct printing**<br>
Student: Vikrant Malik<br>
Mentors: Sahil Arora, Alexander Pevzner, Thierry Hucahrd, Till Kamppeter

They all started getting into their projects now and some have even startet coding.

## Google Season of Docs 2020
The Linux Foundation got accepted as [one of the 50 mentoring organizations](https://developers.google.com/season-of-docs/docs/participants/) by Google!

We have lined up and registered 19 mentors! So we will not have any problem with assuring continuous mentoring during the whole doc writing period.

As umbrella organization we can get up to 4 project slots which we will distribute to the sub-organizations of the Linux Foundation.

Here are the [project ideas for OpenPrinting](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2020-openprinting-projects).

Especially we want to get a tutorial written so that printer and scanner manufacturers have an easy guide to design and package their drivers as Printer Applications.

## Printer Application Framework/SDK -> PAPPL
Michael Sweet is not alone any more on the [PAPPL](https://github.com/michaelrsweet/pappl/) project. After some e-mail exchange with Michael and me both Jai Luthra and Sambhav Dusad have started coding on their GSoC projects and Michael has accepted their first pull requests. Sambhav has added buttons for handling jobs and Jai has added DNS-SD discovery.

## Driverless scanning
Alexander continued the development of his "airscan" SANE backend, having many users testing their devices making up a longer and longer [list of supported devices](https://github.com/alexpevzner/sane-airscan-wsd#compatibility).

Especially now there will be only one entry per physical device even if it supports both eSCL and WSD and discovery is also much faster and the exact behavior is configurable via the configuration file.

In addition, there is now the new `airscan-discover` utility included, to simply discover supported devices via command line. In contrary to the former separate tool this one is written in C now.

## Printing Stack Snap
On the snapd interface for the [Printing Stack Snap](https://github.com/OpenPrinting/printing-stack-snap) we came to a solution. [We settled on going the PulseAudio way](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/15233/19), [patching the CUPS daemon](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/15233/23) to check whether the inquiry is administrative, and if yes, if the client process is of a Snap which is not under classic confinement. In this case we reject the inquiry if the client Snap is not plugging the "cups-control" interface. The appropriate [patch for CUPS](https://github.com/OpenPrinting/printing-stack-snap/commit/2e5817f57a64f80029d18fb7331426a0b7dc1b12) I have committed to the CUPS Snap's GitHub. The snapd team is [now working](https://forum.snapcraft.io/t/interface-request-cups-control-on-cups-snap-and-including-d-bus/15233/47) on the new interfaces.

After that I have [continued work](https://github.com/OpenPrinting/printing-stack-snap/commits/master) on the Snap:
- Updated upstream packages: CUPS 2.3.3, cups-filters 1.27.4, Ghostscript 9.52, QPDF: 10.0.1
- Let the standard domain socket `(/var)/run/cups/cups.sock` be used when the Snap's CUPS is the only one on the system, for maximum compatibility with client applications
- Made the libcups of the Snap read the Snap's configuration files, especially the client.conf with the domain socket actually used by the Snap
- Use the "snap_daemon" user to replace the unavailable "lp" system user to drop the privileges of filter and backend processes
- Dropped several modifications on CUPS which are now not needed any more, especially the removal of all `chown()` and `chmod()` calls
- For determining an admin group for the snapped CUPS, check first whether the host system has an "lpadmin" group, then "adm", and after that allow CUPS administration only to root.
- Added fixes for CUPS upstream bugs which Apple did not apply yet
- Fixed setup of fonts.conf file for the texttopdf filter
- Made `cupsctl` correctly working.

The Snap is approaching to have all features and fixes needed for use as the standard CUPS of a Linux distribution, but for actual use we need to complete the Printer Applications in this year's GSoC, as classic drivers are not supported by a snapped CUPS.

## CUPS
New release 2.3.3: Security fixes

CUPS 2.3.2 did not get actually released.

CUPS developer Steve Algernon from Apple was on this year's OpenPrinting Summit/PWG meeting but he did not give a presentation, so we have no new CUPS roadmap.

```
Changes in CUPS v2.3.3
----------------------

- CVE-2020-3898: The `ppdOpen` function did not handle invalid UI
  constraint.  `ppdcSource::get_resolution` function did not handle
  invalid resolution strings.
- CVE-2019-8842: The `ippReadIO` function may under-read an extension
  field.
- Fixed WARNING_OPTIONS support for GCC 9.x

Changes in CUPS v2.3.2
----------------------

- Localization updates.
```

## cups-filters
Currently released is 1.27.4.

No further releases.

```
CHANGES IN V1.27.5

	- cups-browsed: Cleaned up code for determining to which CUPS
	  server (host/port/domain socket) to connect, so that
	  connection via DomainSocket cups-browsed.conf directive,
	  CUPS_SERVER and IPP_PORT environment variables and all
	  defaults and methods of libcups, including CUPS' client.conf
	  work.
	- gstoraster, rastertopdf: Do not pass NULL to fprintf() (Pull
          request #230).
	- libcupsfilters: Silence compiler warning (Pull request #229).
```


## IPP-over-USB: ippusbxd and ipp-usb

Ubuntu 20.04 is shipping ippusbxd 0.34. Unfortunately, on some multi-function devices, when querying the eSCL scanning properties, it comes to a segfault. I plan to issue a 0.35 release and use it for a Stable Release Update on Ubuntu 20.04.

Later [another bug got discovered](https://github.com/OpenPrinting/ippusbxd/issues/34) and Thierry Hucahrd and Alexander Pevzner are working on it. I like to include the fix in 0.35, too.
