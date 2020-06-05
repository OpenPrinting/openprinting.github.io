---
title: OpenPrinting News - June 2020
layout: single
author: Till
excerpt: Renaming of CUPS Snap, cups-filters 1.27.5, GSoC 2020 coding period has started
---
## Google Summer of Code 2020
On June 1st the coding period of this year's Google Summer of Code has started! All the 7 students (announced here [last month](https://openprinting.github.io/OpenPrinting-News-May-2020/)) have prepared themselves and even partially started with the coding (and first code pieces being comitted to the project's repositories) and now they will all work on their projects. Some of the students are currently getting printers from us to test their work.

Now in the end of each of the three months there will be evaluations which the students have to pass to get the money for the month done and stay in the program to continue their project.

The coding will end in the end of August and the students will post their work products.

## Google Season of Docs 2020
We got already some e-mails from potential candidates and they are in contact with the mentors of the appropriate sub-organizations of the Linux Foundation.

The application period starts on Tuesday, June 9 and will terminate on Thursday, July 9 and here are the [project ideas for OpenPrinting](https://wiki.linuxfoundation.org/gsoc/google-season-of-docs-2020-openprinting-projects).

## CUPS Snap (Printing Stack Snap)
The Snap will soon get renamed, from [Printing Stack Snap](https://github.com/OpenPrinting/printing-stack-snap) to simply "cups" and the GitHub repository will then also be renamed, to ["cups-snap"](https://github.com/OpenPrinting/cups-snap) (Link will work after the renaming).

The CUPS Snap on OpenPrinting will be the official Snap, as we cannot expect that CUPS' upstream, Apple, will make a Snap of CUPS and also CUPS on any non-Apple system is used with cups-filters, which is an OpenPrinting project and it is based on the parts of CUPS which Apple has spun out due to the fact that they are not needed by Mac OS X and so Apple did not want to maintain them. Therefore it should be no problem to name our CUPS Snap simply "cups".

The GitHub repository will be named "cups-snap" so that the visitor of our GitHub will not think that this is a fork of CUPS but rather the set of files needed to build the CUPS Snap.

I have also [continued work](https://github.com/OpenPrinting/printing-stack-snap/commits/master) on the Snap:
- Updated upstream packages: cups-filters 1.27.5
- When checking for an already running CUPS using lpstat, check also for lpstat errors
- Put groups listed as "SystemGroups" in cups-files.conf in correct order, so that "root" is not the first group
- Removed patches to lift CUPS' internal security features of not allowing to run filters/backends as root, the filters/backends user group being an admin group, and to run the helper program cups-deviced as root
- CUPS is run as root without CAP_DAC_OVERRIDE capability, so CUPS has to obey ownerships and permissions of files/directories, corrected directory/file permissions appropriately
- Set fontconfig environment variables to files/dirs inside the Snap
- Clean up temporary directories by the run-cupsd script, using a special algorithm to work without CAP_DAC_OVERRIDE capability
- Let CUPS create the root certificate with group ownership root and without ACLs
- Installed fonts-arphic-uming package to print CJK plain text files
- Added the Berkeley-style printing utilities lpr, lpq, lprm, and lpc
- Cleaned up the Snap from unneeded files: C headers, documentation, DejaVu fonts, System V startup scripts, static libraries, ...

Currently I am testing the Snap and fixing bugs. Also a migration script to switch over from classically installed CUPS to the CUPS Snap is still needed.

## CUPS
Currently released is 2.3.3.

No further releases or GIT commits.

## cups-filters
Currently released is 1.27.5.

[1.27.5](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-5):

Several fixes/improvements on cups-browsed, to correctly determine the CUPS server to attach to, to correctly create queues pointing to a second local CUPS instance, and to not remove the locally created queues on shutdown. Also included several bug fixes from contributors

```
CHANGES IN V1.27.5

	- cups-browsed: Do not remove the created local queues on
	  shutdown, to avoid their re-creation on restart, so that
	  desktops get no cluttered with notifications of new queues
	  being created. One can return to the old behavior via
	  "KeepGeneratedQueuesOnShutdown No" in cups-browsed.conf
	  (Ubuntu bug #1869981, #1878241).
	- cups-browsed: Do not accept DNS-SD broadcasts of IPPS type
	  of "remote" CUPS queues of another CUPS instance on the
	  local machine. This way we get a local queue pointing to
	  such a printer only in unencrypted version (IPP). For some
	  reason printing from one CUPS server to another on the same
	  machine works only unencrypted.
	- foomatic-rip: Map two-sided-short-edge to DuplexTumble (Pull
          request #236)
	- Build system: In configure.ac use AS_IF instead of
          AC_CHECK_FILE for font check (Issue #239, Pull request #240)
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

We have a new contributor for ippusbxd who wants to solve its problems in C: Fletcher Woodruff is working on [Issue #15](https://github.com/OpenPrinting/ippusbxd/issues/15), of ippusbxd returning invalid data to TCP clients when communications got interrupted. The problem was solved by ipp-usb making use of Go's HTTP library. Fletcher is now trying to find a suitable library in C.

Fletcher has also already made a [small contribution](https://github.com/OpenPrinting/ippusbxd/pull/38), raising the internal buffer size to speed up data transfer between the printer and the host.
