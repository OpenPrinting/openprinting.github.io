---
title: Common Print Dialog Backends Second Generation - Sixth Beta Release!
layout: single
author: Till
excerpt: Sixth beta to improve more for sandboxed packaging, especially streaming print data and simplifying D-Bus interface
---
After 10 months, and working currently on [snapping the CPDB backend for CUPS](/OpenPrinting-News-May-2024/#cpdb-cups-backend-snap), we are now releasing the sixth beta of the second generation of the Common Print Dialog Backends (CPDB).

**Streaming print job content**

Main change is that the data to be printed is not dropped into a temporary file any more for the backend to pick it up from there, but streamed to the backend, into a per-job domain socket created by the backend. This makes sandboxed packaging (Snap, OCI containers, ...) where frontend and backend are in different isolated packages much easier.

**Simplifying list filter control**

CPDB has also a facility to filter the list of displayed available print destination. Here once remote printers (network printers, shared remote CUPS queues) and second, temporary printers (IPP print destinations for which no permanent print queue is set up by CUPS) can get suppressed. To apply these filters to the list the frontemd has to send control commands to the backends.

Before, in addition to the fact that each backend is a D-Bus service and the frontends are clients for them, also the frontends were D-Bus services, only to be able to send the control commands to the backends as signals. Now we have simplified by introducing methods for controlling the filters to the backend D-Bus interfaces and done away with the frontends being D-Bus services. Also this helps to make sandboxed packaging easier.

**Allow permanently running backends**

To give more flexibility on how backends are handled in sandboxed packages we allow now also to just run a backend continuously from login to logout without needing to have it registered as D-Bus service using a `*.service` file. Now the frontend checks for both registered D-Bus services and already running D-Bus services, regardless of whether they are registered.

**Print dialog update on addition or removal of backends**

Another nice new feature, but this time not to improve sandboxability, is that we spawn a background thread now which checks every few seconds whether backends have come or gone while the print dialog is open. So the printer list gets updated right when a fresh backend gets installed. Also great for apps which keep a list of available printers all time, independent of a print dialog being open or not.

**Removed/Discontinued**

We have also removed some functionality which turned out to not be used in typical print dialogs and to be awkward for sandboxed packaging.

First we dropped the job control functionality, listing jobs, number of jobs, and canceling a job.

Second, we discontinue the [`FILE` backend](https://github.com/OpenPrinting/cpdb-backend-file), as the existing print dialogs do much better in printing into a PDF file by themselves. The code of the backend will be merged into cpdb-libs to have a backend for development, debugging, and testing, especially for having a useful build test (`make check`).

**API changes**

Only the **frontend API has changed**, the **backend API is unchanged**. See the file `cpdb/cpdb-frontend.h` of cpdb-libs for details, especially on how the new functions get called.

We have some slight changes in the API this time, which could require changes in the print dialogs.

On existing print dialogs most probably only one little change is needed. For the removal of support for the `FILE` backend we have removed the `cpdbPrintFilePath()` function. Use `cpdbPrintFileWithTitle()` instead. Explicit support for the `FILE` backend as opening a "Save as ..." dialog for the destination file path should be removed.

It is recommended to send jobs with title now. Replace the use of `cpdbPrintFile()` by `cpdbPrintFileWithTitle()` for that.

The other removals in the API will most probably not affect existing print dialogs, but you should be aware of them:

For the frontend not being a D-Bus service any more, removed the related fields of `cpdb_frontend_obj_s`: `skeleton`, `name_done`, and `bus_name` (`own_id` was forgotten and will also get removed, also the constant `CPDB_DIALOG_BUS_NAME`). Also any function generated from the now removed frontend D-Bus service definition `cpdb/interface/org.openprinting.Frontend.xml` is not available any more. Those had names starting with `print_frontend_...`.

Dropping job control support we have removed the API functions `cpdbGetAllJobs()`, `cpdbGetActiveJobsCount()`, and `cpdbCancelJob()`.

We have also added new items, especially new API functions for sending the job content to the printer, as we are streaming it now. Now one cannot only specify a file to get printed (which actually gets streamed out to the backend) but also obtain a file descriptor or a domain socket to feed the job content into. File descriptors and sockets are per-job. It is required to properly terminate the job submission, usually by closing the file after writing it, so that the job ends and everything gets actually printing. And for a new job always a new file descriptor or socket has to get acquired.

New is also that the functions to start the job submission accept job titles now, so that the print system can properly list the jobs and also send the title to the printer for the front panel display.

The new functions are `cpdbPrintFileWithJobTitle()`, `cpdbPrintFD()`, and `cpdbPrintSocket()`.

The functions make it much easier to output print data as no temporary files are needed. This especially helps for very long jobs, not taking storage space and starting to come out of the printer while still being created.

For general convenience we have added some more API functions.

- `cpdbGetAllPrinters()` logs a list of all available printers, for development and debugging.
- `cpdbPrintBasicOptions()` logs basic properties of a given printer.
- `cpdbActivateBackends()` finds the currently available backends, starts the ones which are not already running, and updates the list of available printers. To be called when the frontend starts and also at any time to get updates on the come and go of backends. Does not need to be called to update the printer list of a running backendm as each backend sends push notifications on printer changes.
- `cpdbStartBackendListRefreshing()` Starts a background thread to observe the come and go of backends (thread calls `cpdbActivateBackends()` every few seconds)
- `cpdbStopBackendListRefreshing()` Stops the background thread to observe the come and go of backends
- `cpdbStartListingPrinters()` Convenience function to be called when starting the frontend (usually when opening the print dialog)
- `cpdbStopListingPrinters()` Convenience function to be called when stopping the frontend (usually when closing the print dialog)

`cpdb_frontend_obj_s` also got some extra fields, for the new filter control by backend D-Bus methods two boolean fields `hide_remote` and `hide_temporary` got added and for managing the background thread to observe come and go of backends `stop_flag` and `background_thread`.

**D-Bus communication protocol changes**

The D-Bus communication protocol between frontends and backends has also changed, once all job content being streamed and second, printer list filter control being implemented as methods of the backend D-Bus service interface.

Therefore backends must be based on cpdb-libs 2.0b6 or newer. Currently, we have only the CUPS backend as the only maintained backend and its 2.0b6 version, released together with cpdb-libs 2.0b6 is appropriately updated.

**CUPS Backend changes**

Generally we have updated the CUPS backend to work with the changes on cpdb-libs described above.

Backend-specific changes are the following:

- Updated names of some CUPS constants to CUPS 2.5.x and newer
- Removed `tryPPD()`, a useless, PPD-related function. This function logs the options in the PPD file of the CUPS queue but does nothing else. As PPDs will go away in CUPS 3.x we want the CUPS backend not depend on PPDs or PPD-supporting functions or libraries.
- Unified logging. We always use the `log...()` functions now.
- In the build test ( `make check`) we give more time (3 instead of 1 sec) for the print job submission before closing the backend, to get note of the confirmation of successful submission more reliably and we let the frontend and backend log in debug mode.

**Bug fixes**

Naturally, many bug fixes have made it into CPDB in the many months after the last release. most of the bugs caused crashes and so one can expect that CPDB is much more stable now.

**The new versions of the CPDB components**

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b6), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/34)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b6), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/30)**
