---
title: cups-filters 1.26.2 released!
layout: single
author: Till
excerpt: Bug fix release mainly to make cups-browsed correctly working with a CUPS daemon on a non-standard port, and also for cups-filters smoothly building with GCC 10
---
Bug fix release mainly to make cups-browsed correctly working with a CUPS daemon on a non-standard port, and also for cups-filters smoothly building with GCC 10
- cups-browsed: Added crash guards to avoid crashes in case the dummy printer entry for a deleted master entry is used.
- cups-browsed: Set the port of the local CUPS daemon to be used according to the IPP_PORT environment variable.
- cups-browsed: Eliminated the use of the cupsGetPPD2() function of libcups completely, also the remaining calls in the record_printer_options() and update_cups_queues() functions, the former causing incomplete recording of option settings and the latter use of CUPS-generated PPDs not working when CUPS is running on a non-standard port.
- cups-browsed: Eliminated the use of the cupsGetPPD2() function of libcups in queue_overwritten(). The function actually loads the queue's PPD file if the queue is on a local CUPS on port 631. Due to a bug the function fails if an alternative port is used. This lets queue_overwritten() always assume that the PPD got removed and therefore the queue got overwritten. So queues got released from cups-browsed if it was printed on them or if they were supposed to be removed on shutdown.
- foomatic-rip: Fixed compilation with -fno-common. Starting from the upcoming GCC 10, the default of the -fcommon option will change to -fno-common. This causes compilation errors in foomatic-rip due to missing "external" declarations (Pull request #184).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-26-2)
