---
title: OpenPrinting News - March 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: LAS 2023 in Brno, GUADEC 2023 in Riga, GSoC 2023, cups-filters 2.x in Ubuntu 23.04, libcupsfilters with libcups 3.x, CPDB 2.0b4, cups-browsed 2.0b4
---
I am again late with this month's news, but now a very important step is done: The second generation of cups-filters has [made it into Ubuntu](#cups-filters-20b4-in-ubuntu-2304), version 23.04, the Lunar Lobster! After a lot of hard work adding missing requirements, especially programs and scripts for automatic testing of each build and each upload, and after getting the all the code security-audited, the new packages landed in time on last Friday, 3 days before Beta Freeze yesterday (March 27).

And between all of this I keep our [Google Summer of Code contributor candidates](#google-summer-of-code-2023) ~~entertained~~ doing their assignments and familiarizing with the projects and now I am lining up our 2023 team of contributors and guiding them through their proposals.

With the first beta of libcups 3.x out I have investigated the [migration of libcupsfilters to the new API](#libcupsfilters-and-libcups-3x), and we are well prepared ...

And, as last year, you will see me on several conferences: For sure on the [Linux App Summit](#linux-app-summit-2023) in Brno, Czech Republic, the [GUADEC](#guadec-2023) in Riga, Latvia, and the Ubuntu Summit, ... perhaps also on the Open Source Summit Europe in Bilbao, Spain or the Linux Plumbers Conference in Richmond, VA in the US ...


## Linux App Summit 2023
For the [Linux App Summit 2023](https://linuxappsummit.org/) in Brno in the Czech Republic the [schedules](https://conf.linuxappsummit.org/event/5/timetable/#all) are published!

My [talk](https://conf.linuxappsummit.org/event/5/contributions/158/) with demos of the state of the art of the Common Print Dialog Backends (CPDB) support in print dialogs and the "Printers" module of the GNOME Control Center, and discussion with the audience, will take place on Saturday, April 22, at 16:35 CEST.

Unfortunately, due to the huge amount of great submissions and the limited time slots in only 2 rooms on 2 days, my Snap workshop and my OpenPrinting BoF did not get accepted.

But it is not such a big problem of the BoF not being accepted, we will have our own one. To have more time to discuss with my colleagues and contributors on the printing area, Zdenek Dohnal (Red Hat), Marek Kasik (GNOME/GTK), Albert Astals Sid (KDE/Qt), Harald Sitter (KDE/Qt), I will have a meeting with them on (**Update**) Saturday, April 22, at 15:00 CEST (room/place TBD). I will announce the exact time next month here, so everyone who likes can join.


## GUADEC 2023
After a great [first GUADEC for me in Mexico last year](/OpenPrinting-News-August-2022/#guadec-2022) I will continue attending GUADECs. This year I do not need to cross the ocean, [GUADEC](https://events.gnome.org/event/101/overview) takes place in [Riga, in Latvia](https://events.gnome.org/event/101/page/168-the-city) on July 26-31, as last year 3 days of talks, 2 days of BoFs and workshops, and 1 day of touristing.

Yesterday the Call for Proposals had its original deadline, but as there were not enough proposals to comfortably fill all the time slots the [**submissions got re-opened**](https://events.gnome.org/event/101/abstracts/), this time without showing any deadline, but [their Tweet](https://twitter.com/guadec/status/1640654976086323200) reveals that the extension is for a week, meaning that the deadline is April 4 now.

So think in the next days about what you like to tell to the GNOME folks in Riga, what you want to teach in a workshop, what you want to discuss in a BoF, ... It is your chance now ...

Also here I have submitted a talk to demo the printing-related GUI changes in GNOME/GTK and to discuss them with the audience.

And if all works fine it will get snappy on the GUADEC ...


## Google Summer of Code 2023
The time window for GSoC contributor candidates to submit proposals has opened and the deadline is April 4. This means for our candidates to write their proposals and mentors to review them. Also mentors have to register and mark in the already submitted proposals whether they want to step up as a mentor for the respective project.

Now all our candidates have decided on the project they want to do and are familiarizing with them and also have written drafts of their proposals. 

The most enthusiastic of them have already started on their projects weeks ago and worked with me and other mentors, often contributors of the previous years, on investigating of what has to be done and planning how to do it.

Especially Akarshan Kapoor who is doing the scanning support in PAPPL has started off very well with his mentors Rishabh Maheshwari ([Last year's contributor on eSCL support](/OpenPrinting-News-November-2022/#google-summer-of-code-2022)), Deepak Patankar (Mentor on PAPPL scanning also last year), and me.

First, he [updated PAPPL's documentation](https://github.com/Kappuccino111/pappl/blob/53708f82a31db2a0be4f9e9a31707b141f8f727c/doc/pappl.html) with the scanning API Bhavna Kosta had added in [GSoC 2021](https://github.com/Bhavna2020/GSoC-2021).

As the next step he created a list of all the printing-related functions of PAPPL and the ones of Bhavna's scanning-related API functions and added for all printing functions which had no scanning counterpart the appropriate scanning function. All this is now posted as a [pull request on PAPPL](https://github.com/michaelrsweet/pappl/pull/249).

Now Arkashan is working on integrating Rishabh's eSCL parser and make incoming requests being distinguished between IPP for printing, eSCL for scanning, and general HTTP for the web admin interface.

For this news post he writes:

> While working on the initial prototyping of a Sandboxed Scanner Application Framework, I encountered a task that required processing and segregating client requests. The way it works is that the client sends a request to the Application Framework, and the API must segregate the request into HTTP/eSCL requests. After creating an initial pathway for implementing this, I realized that I didn't fully understand the format in which the eSCL requests were received. Further exploration revealed that these requests were essentially XML requests and required an XML parser to extract information from them. The parser can be implemented through string matching and is currently being developed. Implementing this and combining it with the current Application Framework will be a checkpoint that leads to integrating it with another parser that parses various scanning capabilities.


## cups-filters 2.0b4 in Ubuntu 23.04
As [reported last month](/OpenPrinting-News-February-2023/#the-new-architecture-is-going-into-ubuntu-and-red-hat) all new packeges which are put into the Canonical-supported core part of Ubuntu ("Main") need a build test and an autopkgtest which are run on 6 architectures everytime when a new release of the package itself or any package depending on it gets uploaded.

**cups-browsed** was still lacking both tests and the **Common Print Dialog Backends (CPDB)** packages were missing a build test. So I have created appropriate scripts and added them to [cups-browsed](#cups-browsed) and to the three [CPDB](#common-print-dialog-backends) packages. All these tests are run by `make check` called after building the repective package.

The challenge for the build test for cups-browsed was to exercise cups-browsed in the way it is actually used without needing root access and ideally independent of the configuration of the system, so that `make check` also works on build servers for example and not only on fully equipped desktop machines. cups-browsed needs 4 further daemons around itself: CUPS to create print queues on, avahi-daemon to collect DNS-SD broadcasts of printers, dbus-daemon to receive notifications about new jobs from CUPS so that it can  dispatch them to their destination printers, and ippeveprinter to emulate IPP printers.

I have taken the (very sophisticated) build test script of CUPS ([`test/run-stp-tests.sh`](https://github.com/OpenPrinting/cups/blob/master/test/run-stp-tests.sh)) as example for [my test script](https://github.com/OpenPrinting/cups-browsed/blob/master/test/run-tests.sh). There I copy/link the system's CUPS files into separate directories out of which I am running my own CUPS instance on port 8631, as normal user. I especially have to copy the CUPS daemon executable (`/usr/sbin/cupsd`) into the separate directory so that AppArmor does not act on it. cups-browsed does not need to run as root, it only needs to have admin access to CUPS, so it is easy to run it attached to our separate CUPS instance. And for a private D-Bus there us the `dbus-run-session` utility.

I was not able to create a private instance of avahi-daemon though, ending up with the need of a system's avahi-daemon. This works in most situations, especially as one can register services without being root, but on Canonical's build servers there is no avahi-daemon running and so I had to skip `make check` in the Debian/Ubuntu package of cups-browsed. Due to this special nature of cups-browsed and the fact that I run the same test script as autopkgtest (run on virtual machine with all needed packages installed), the Ubuntu MIR (Main Inclusion Request) approval team accepted the package into Main.

And the tests also showed already what they are good for, they made me finding some bugs in cups-browsed, including even some crashers, which I have fixed now.

I got also asked to try to run cups-browsed as normal user, which the tests showed that this actually works. cups-browsed only needs to be allowed to do adminstrative requests on the CUPS daemon, meaning the system user running cups-browsed has to be in the "lpadmin" group. It also needs a cache directory writable by the system user. The current Ubuntu package is now running cups-browsed as a normal user.

But not only tests are needed, the code of each package promoted from Universe into Main is thoroughly security-audited by Canonical's security team: Coverity runs, code reviews, have daemons to run as root, SETUID, ... ([see report in the MIR](https://bugs.launchpad.net/ubuntu/+source/libcupsfilters/+bug/2003259)) This takes several hours of work for each package and when many new packages arrive close to Feature Freeze (1 month before beta, 2 months before release) the queue gets long. Easily a package cannot make it into Main for the desired Ubuntu version and it stays for the next version 6 months later.

And we got lucky with the security checks, they got finished last Friday night, in time for the Beta Freeze yesterday (Monday, March 27). Thanks, Sebastien Bacher, for nagging the security team, thanks, Seth Arnold and Alex Burrage from the security team for expediting these packages, and especially thanks, Mark Esler, for your patience with me on the last package, cups-browsed.

So Ubuntu 23.04, the Lunar Lobster, will already contain a first piece of the software for the New Architecture. We will not be running in the New Architecture, still using Debian packages of CUPS (2.4.2) and classic CUPS drivers installed as Debian packages, but we use everything with the 2nd generation of cups-filters. So we will most probably have some more bug fixes, as not every fix got backported to cups-filters 1.x. But the most important is that we have 2 "small" (non-LTS) releases of Ubuntu in which the new cups-filters will get used and tested, this helps a lot for a safer transition into the New Architecture in 23.10 (based on the CUPS Snap) and to CUPS 3.x in 24.04 LTS.

The packages for the Common Print dialog Backends, [cpdb-libs](https://bugs.launchpad.net/ubuntu/+source/cpdb-libs/+bug/1747759), [cpdb-backend-cups](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-cups/+bug/1747760), and [cpdb-backend-file](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-file/+bug/2003272), did not make it into Main yet. Therefore CPDB is not yet used in GTK's print dialog. This will happen together with the general swithcover into the New Architecture in Ubuntu 23.10, to be released in October. I will try to set up a Sneak Preview of the New Architecture (CUPS Snap, CPDB, GNOME Control Center) via a PPA (Personal Package Arquive) soon, though.


## libcupsfilters and libcups 3.x
With [libcups 3.0b1](/libcups-3.0b1/) available I have investigated on how well the code of libcupsfilters 2.x is prepared for the new CUPS library, and it seems that we are in a good shape ...

First, Michael Sweet has prepared the migration to the new library very well, by his always excellent documentation, here the [`MIGRATING.md`](https://github.com/OpenPrinting/libcups/blob/master/MIGRATING.md) file in the new library's source package. The file describes everything what changed, which functions and data types got renamed, which got removed, also what the new names are.

The removal of features is no problem at all for us, as the 2 removed areas are PPD support and non-destination-based listing of queues or printing. For the former we are perfectly prepared, as all PPD support is removed from libcupsfilters and so none of the PPD-supporting functions of libcups get called. And functions of the latter area were never used by libcupsfilters.

So the main part of the migration is the renaming, but one can, after converting the code of libcupsfilters completely to the new API, easily create something like a `libcups2.h` file containing:
```
#include "config.h"
#ifdef HAVE_LIBCUPS2

#define cups_page_header2_t cups_page_header_t

...

#define cupsArrayNew3 cupsArrayNew

...

#endif
```
and let `configure.ac` set `HAVE_LIBCUPS2` if the code is built with the old CUPS library.

Another point are interface variants. The old library (`cups/array.h`) had the following API functions:
```
extern cups_array_t     *cupsArrayNew(cups_array_func_t f, void *d) _CUPS_API_1_2;
extern cups_array_t     *cupsArrayNew2(cups_array_func_t f, void *d,
                                       cups_ahash_func_t h, int hsize) _CUPS_API_1_3;
extern cups_array_t     *cupsArrayNew3(cups_array_func_t f, void *d,
                                       cups_ahash_func_t h, int hsize,
                                       cups_acopy_func_t cf,
                                       cups_afree_func_t ff) _CUPS_API_1_5;

```
So there are 3 interface variants for creating a CUPS array. This is because Michael Sweet has started with the first one and later on realised that one can make (sorted) CUPS arrays better if the user can, in addition to a function for comparing two items, also specify functions for copying and freeing items, and also a hash function. So he added the other two interface variants, giving them new names, with added small integer numbers, to keep the original variant to avoid breaking the API.

In the new API Michael has cleaned up, doing away with the variants and only keeping the most sophisticated one, with the simplest, original name, without number. This serves everyone, simply set parameters for functionality you do not want to `NULL`. It looks like this then:
```
extern cups_array_t     *cupsArrayNew(cups_array_cb_t f, void *d,
                                      cups_ahash_cb_t hf, size_t hsize,
                                      cups_acopy_cb_t cf,
                                      cups_afree_cb_t ff) _CUPS_PUBLIC;
```
Here we will have to define some wrapper functions, simply defined inline in our `libcups2.h` file (or an accompanying `libcups2.c` file).


There is one oversight in `MIGRATING.md` though: Also the APIs in `cups/backend.h` and `cups/sidechannel.h` will go away. The latter is not used in libcupsfilters (I have removed an unnecessary inclusion here) and the former only by the function `cfResolveURI()` in `cupsfilters/ipp.c`, but this can be easily fixed by using the new libcups3 API function `httpResolveURI()` (`cups/http-support.h`). In this case we also will not have to unset the `DEVICE_URI` environment variable. Here one can create a wrapper function in `libcups2.c`/`libcups2.h`, named `httpResolveURI()` which unsets `DEVICE_URI` and calls `httpBackendResolveURI()`.

With all this libcupsfilters should work perfectly well in the new CUPS 3.x world.


## cups-browsed
cups-browsed got a [forth beta release](/cups-browsed-Second-Generation-Forth-Beta-Release/) centered in getting test scripts.

Here I have created a script which serves both as build test (`make check`) to be run as non-root, with its own CUPS instance, and as CI or autopkgtest running as root with installed packages. It runs emulations of IPP printers to be picked up by cups-browsed to auto-create CUPS queues on them. On these queues a test job is printed and cups-browsed has to dispatch the job to the printer.

This naturally made me doing several test runs and they revealed several bugs which I have fixed in this release:

- `implicitclass` backend: If no destination got reported by cups-browsed, retry after one minute, not the standard 5 minutes of CUPS.
- `debug_printf()`: Check for need of log rotation only if log file is set and opened, to avoid a crash.
- `on_printer_modified()`: Added NULL check to avoid a crash.
- `ipp_discoveries_add()`: Ignore duplicate entries.
  These are most probably caused by a bug in Avahi, having certain discoveries of a printer reported twice and others not. When the printer disappears Avahi reports the disappearal of each discovery correctly, leaving the duplicate entry untreated (removing only one instance of it) and cups-browsed assumes that the printer is still there, keeping its CUPS queue.
- `update_cups_queues()`: Reset counter for pausing CUPS queue updates.
  Otherwise after having updated the number of queues supposed to be the maximum for one run of `update_cups_queues()`, cups-browsed will never update any queue again.
- `resolve_callback()`/`resolver_wrapper()`: New thread only when printer found
  We move the check which resolver event we have (found/failure) already in the main thread (`resolver_wrapper()`) and launch a new thread only if we have found a new printer and have to investigate whether to add a queue for it or not. `resolve_callback()` only initiates this investigation now.  This way we do not need to pass the resolver data structure (of type `AvahiServiceResolver*`) into the new thread, which caused segfaults.
- `create_remote_printer_entry()`: Corrected some memory freeing when a printer data structure is deleted, but this has not caused a segfault in the recent tests.
- Fixed issues reported by Red Hat Coverity tool ([Pull request #6](https://github.com/OpenPrinting/cups-browsed/pull/6))

There are more issues resulting from a Coverity run by Canonical's security team. They will get checked and fixed soon.


## Common Print Dialog Backends
The [4th beta release towards 2.0.0](/Common-Print-Dialog-Backends-Second-Generation-Forth-Beta-Release/) was all about getting build tests (`make check`) added to fulfill the requirements for getting into Ubuntu Main. The tests of the backends start the backend and also the text-based sample frontend of cpdb-libs to check whether printers appear in the frontend's list and whether one can print on them. The test of the CUPS backend even runs its own instance of cupsd (like the tests of CUPS and cups-browsed also do) to let the backend discover the CUPS queues.

In addition, cpdb-libs facilitates creating test scripts by installing its text-based demo frontend as a developer utility, with the name `cpdb-text-frontend` and by allowing to search for backends in an aleternative directory, specified by an environment variable.

And the work on test scripts revealed some crash bugs which are fixed now.
