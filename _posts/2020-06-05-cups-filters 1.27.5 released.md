---
title: cups-filters 1.27.5 released!
layout: single
author: Till
excerpt: Several fixes/improvements on cups-browsed, to correctly determine the CUPS server to attach to, to correctly create queues pointing to a second local CUPS instance, and to not remove the locally created queues on shutdown. Also included several bug fixes from contributors
---
Several fixes/improvements on cups-browsed, to correctly determine the CUPS server to attach to, to correctly create queues pointing to a second local CUPS instance, and to not remove the locally created queues on shutdown. Also included several bug fixes from contributors
- cups-browsed: Do not remove the created local queues on shutdown, to avoid their re-creation on restart, so that desktops get no cluttered with notifications of new queues being created. One can return to the old behavior via "KeepGeneratedQueuesOnShutdown No" in cups-browsed.conf (Ubuntu bug #1869981, #1878241).
- cups-browsed: Do not accept DNS-SD broadcasts of IPPS type of "remote" CUPS queues of another CUPS instance on the local machine. This way we get a local queue pointing to such a printer only in unencrypted version (IPP). For some reason printing from one CUPS server to another on the same machine works only unencrypted.
- foomatic-rip: Map two-sided-short-edge to DuplexTumble (Pull request #236)
- Build system: In configure.ac use AS_IF instead of AC_CHECK_FILE for font check (Issue #239, Pull request #240)
- cups-browsed: Cleaned up code for determining to which CUPS server (host/port/domain socket) to connect, so that connection via DomainSocket cups-browsed.conf directive, CUPS_SERVER and IPP_PORT environment variables and all defaults and methods of libcups, including CUPS' client.conf work.
- gstoraster, rastertopdf: Do not pass NULL to fprintf() (Pull request #230).
- libcupsfilters: Silence compiler warning (Pull request #229).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-5)
