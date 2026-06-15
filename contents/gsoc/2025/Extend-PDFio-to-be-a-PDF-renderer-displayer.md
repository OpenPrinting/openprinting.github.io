---
title: "Extend PDFio to be a PDF renderer/displayer"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

Like [CUPS](https://openprinting.github.io/cups/), [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters) is principally written in regular C and not in `C++`. We want to avoid `C++` as it has often problems with binary compatibility and the mechanism with which the Debian/Ubuntu build services auto-detect dependencies between Debian packages get very awkward with `C++`.

In libcupsfilters we now succeeded to eliminate use of `C++`, by replacing the use of the `C++` library [QPDF](https://github.com/qpdf/qpdf/) for PDF manipulation by Michael Sweet's [PDFio](https://www.msweet.org/pdfio/) and also by not using libpoppler any more but using Poppler's command line utilities instead. This was done as a [GSoC project last year](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce).

As the call of Poppler via command line utilities and Ghostscript having a license which makes it unsuitable in vertain cases, we are looking into a PDF rasterizer which is written in straight C and has a more friendly (permissive) license. PDFio is written in C and has the same license as CUPS and libcupsfilters themselves, but it is only a PDF manipulation library, not a renderer.

But as PDFio is able to do the "dirty work" of PDF file reading, especially navigating through the file's object structure we can make use of it to create a PDF renderer, ideally to extend the PDFio library to provide this functionality or to create the renderer library using PDFio.

This renderer should be aimed for printing, it should be principally called from libcupsfilters, or from Printer Applications, so the goal of this project is to get in this direction and not design a fancy GUI document viewer, but a simple screen display facility would be helpful for development and debugging.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Ira McDonald (blueroofmusic at gmail dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
