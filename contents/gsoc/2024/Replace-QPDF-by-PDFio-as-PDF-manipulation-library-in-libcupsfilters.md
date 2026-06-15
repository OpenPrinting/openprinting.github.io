---
title: "Replace QPDF by PDFio as PDF manipulation library in libcupsfilters"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Hard

Like [CUPS](https://openprinting.github.io/cups/), [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters) is principally written in regular C and not in `C++`. We want to avoid `C++` as it has often problems with binary compatibility and the mechanism with which the Debian/Ubuntu build services auto-detect dependencies between Debian packages get very awkward with `C++`.

But libcupsfilters still depends on one library which is written in `C++`, [QPDF](https://github.com/qpdf/qpdf/), a library for manipulating PDF files: Scaling up and down, moving around on the page, rotating, combining several source pages on one destination page, turning filled PDF forms into straight PDF, ... QPDF is used by the filter functions cfFilterPDFToPDF(), cfFilterBannerToPDF(), cfFilterGSToRaster(), and cfFilterRasterToPDF().

Michael Sweet, author of CUPS, has some years ago started the [PDFio](https://www.msweet.org/pdfio/) project. This is a PDF handling and manipulation library, as QPDF is, but it is fully written in standard, regular C, not in `C++`.

Therefore we want to replace the use of QPDF by PDFio and this is what this GSoC project is about.

But for such a switchover we must take into account that QPDF is a complex and sophisticated project with a lot of features (it got even new features by two GSoC projects of OpenPrinting) while PDFio is a young project run as one of the many small projects by Michael Sweet and we must be very careful to see whether it does not miss any important feature. Especially we must look after correct printing of filled-in PDF forms and PDF annotations.

So part of the project will be investigation of suitability and perhaps also work with Mike to get needed features added. And after the switchover thorough testing is needed to avoid any regressions after this impactful change.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Ira McDonald (blueroofmusic at gmail dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
