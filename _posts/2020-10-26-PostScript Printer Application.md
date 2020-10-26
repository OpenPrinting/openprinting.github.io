---
title: PostScript Printer Application
layout: single
author: Till
excerpt: The PostScript Printer Application, first PAPPL-based non-Raster Printer Application, retro-fitting PPD files
---
## PostScript Printer Application
After having all needed filter functions and PPD file collection handling implemented in cups-filters and having the [HP PCL Printer Application](https://github.com/michaelrsweet/hp-printer-app) as example I have created a **Printer Application for PostScript printers**.

It is now available as the [ps-printer-app](https://github.com/OpenPrinting/ps-printer-app) repository on the OpenPrinting GitHub.

Currently it is a first working model, it will get much more functionality, especially for best user experience, added in the near future. See all the details of properties, planned features, known issues, and how to use in the [README.md](https://github.com/OpenPrinting/ps-printer-app/blob/master/README.md) file.

This Printer Application is especially a working model for

- A non-raster Printer Application: Destination format is PostScript, a high-level/vector format. Input data in PostScript or PDF is accepted and needed conversion is not done through an inbetween raster step.

- A Printer Application which uses the new filter functions of cups-filters 2.x. Filter functions are library functions derived from cups-filters and contain decades of development and refinement starting from the introduction of CUPS in 2000.

- A retro-fit Printer Application for classic CUPS drivers, in this case the simplest form of only PPD files for PostScript printers. It lists PPD files from repositories included in the Snap, loads the PPD needed for the actual printer, extracts options from the PPD to display them in the web interface, accepts job settings as IPP attributes, and inserts the PostScript code provided by the PPD correctly into the output data stream.

- A Printer Application which does not pass through raw (input format is printer's native format) jobs. To assure that always the PostScript code of the PPD file is inserted into the output stream, we call the printer's native format "application/vnd.printer-specific" which does not exist as input format, so "application/postscript" input is forced through the pstops() filter function.

- To do not need to re-invent the code for forking into sub-processes so that we can pass data through a sequence of filters, we create a filter function to send the data off to the printer and form a chain of the actually converting filter function (one of pstops(), pdftops(), imagetops(), rastertops()) and the with this filter function using the filterChain() filter function.

- The PostScript Printer Application has all PostScript PPD files of the [foomatic-db](https://github.com/OpenPrinting/foomatic-db) and [HPLIP](https://developers.hp.com/hp-linux-imaging-and-printing) projects built-in, so most PostScript printer PPDs which usually come with Linux Distributions. Note that some PPDs use certain CUPS filters for extra functionality. These filters are not included. The user can add additional PPDs without needing to rebuild the Snap.
