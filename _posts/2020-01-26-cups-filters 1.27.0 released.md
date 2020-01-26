---
title: cups-filters 1.27.0 released!
layout: single
author: Till
excerpt: In this release cups-browsed does not need to know the port number of the CUPS daemon it is attached to any more when it connects via domain socket and many additional filters support zero-page jobs now
---
In this release cups-browsed does not need to know the port number of the CUPS daemon it is attached to any more when it connects via domain socket and many additional filters support zero-page jobs now
- cups-browsed: Eliminate the use of the local CUPS daemon's (the CUPS we are attached to) port number completely, so that for attaching to an arbitrary local CUPS daemon listening on an arbitrary port (or even not listening on localhost at all) it is enough to tell cups-browsed the domain socket the CUPS daemon is listening on.
- cups-browsed, libcupsfilters: Identify DNS-SD-reported printers as of the local CUPS daemon via UUID and not via the port on which the local CUPS is listening, as we do not always have this port available.
- cups-browsed: Leave the port for legacy CUPS browsing and broadcasting on 631, do not use a possible alternative port of the CUPS we are attached to. The legacy CUPS servers we communicate with are always remote ones.
- libcupsfilters: in the PPD generator prioritize print-color-mode-supported against pwg-raster-document-type-supported (Issue #186, Pull request #188)
- rastertopdf, rastertops, texttopdf, pdftoraster, mupdftoraster: Handle zero page jobs, corrections on zero-page job handling (Issue #117)
- cups-browsed: When restarting after a crash make sure that local queue names have same upper/lower case as before.
- cups-browsed: Small code improvements to reduce crash probability.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-0)
