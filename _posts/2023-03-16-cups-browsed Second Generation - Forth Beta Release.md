---
title: cups-browsed Second Generation - Forth Beta Release!
layout: single
author: Till
excerpt: Test script, for `make check`, CI, autopkgtest, ... and several bug fixes
---
In this forth beta we have added a test script, to give `make check` functionality but also for using it in the autopkgtests of debian/Ubuntu and for general CI. We also found and fixed many bugs in cups-browsed itself during the development of the script.

The splitting of cups-filters into separate packages for the second generation has put the code of cups-filters into packages which are "new" for Ubuntu. Therefore they have to pass the process of [being included in the "Main" part of the distro](/OpenPrinting-News-February-2023/#the-new-architecture-is-going-into-ubuntu-and-red-hat), especially as at the time when cups-filters was originally created there was not such a Main Inclusion process.

One requirement are the automatic tests, a build test (`make check`) performed right after compiling the code by the build process of the DEB package, and an autopkgtest, performed when the package is uploaded or when a new version of another package where our package depends on is uploaded (for example upload of CUPS triggers also the autopkgtest of cups-browsed).

Therefore with this release I add a test script, which serves for both build test and autopkg test. It has different modes, once it can run a private copy of CUPS and the compiled cups-browsed in the source tree, and second, it can also use the daemons which are regularly installed into the system.

The script generally emulates IPP printers with the help of the `ippeveprinter` utility of CUPS and checks whether cups-browsed auto-creates CUPS queues for them and whether one can print a job via the cups-browsed-generated queue.

cups-browsed [made it into Main](https://launchpad.net/ubuntu/+source/cups-browsed) already, despite the [Main Inclusion Request (MIR)](https://bugs.launchpad.net/ubuntu/+source/libcupsfilters/+bug/2003259) not yet being concluded.

In the course of the development of the test script cups-browsed received also some more intense testing and this revealed several bugs, including some crashers. These we have all fixed now.

And to complete this release, it also contains the fixes of bugs found by a Coverity scan done at Red Hat, as it was also done with the other components of cups-filters. These bugs are typically memory leaks or potential segmentation faults. Thanks a lot, Zdenek Dohnal.

### All changes

- Added test script for `make test`/`make check`, CI, autopkgtest, ...
  The script test/run-tests.sh creates emulations of IPP printers via `ippeveprinter` (of CUPS 2.x) and checks whether cups-browsed creates corresponding CUPS queues, whether a job to such a queue gets actually printed, and whether cups-browsed removes the queues again when the printers are shut down.
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
- `configure.ac`: Change deprecated `AC_PROG_LIBTOOL` for `LT_INIT` ([Pull request #5](https://github.com/OpenPrinting/cups-browsed/pull/5))
- `configure.ac`: cups-browsed doesn't need C++

### Packages

- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0b4), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/8)**
