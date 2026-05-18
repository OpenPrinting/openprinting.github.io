---
title: "cups-filters: Create OCR filter to deliver scans as searchable PDFs"
---
### Introduction
1 contributor medium-size (175 hrs), Level of difficulty: Intermediate

Scanning with IPP Scan gives the user the possibility to request the scanned image in PDF format. If the IPP Scan server is a Scanner Application, a filter function from cups-filters would convert the the raster image coming from the scanner into PDF.

Now such PDF files are simply raster images in a PDF frame, not high-level graphics with text and fonts, as PDFs produced by office applications are. Especially one cannot search text in a PDF coming from a scanning process.

Ghostscript has a new "pdfocr8" device with which Ghostscript takes raster graphics PDFs (or PostScript files) as input, applies OCR (Optical Character Recognition) to the raster image, and creates a PDF which contains the raster image to visually show the scan but adds data about the contained text and where it is located, so that you can find text with the search facility of a PDF viewer.

Here the contributor's task is to write a filter function (or extend the `cfFilterGhostscript()` filter function) to make the "pdfocr8" output device of Ghostscript being used so that a searchable PDF is obtained. 
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Sahil Arora (sahilarora dot 535 at gmail dot com), Dheeraj Yadav (dhirajyadav135 at gmail dot com), TBD
### Desired knowledge
 C/C++, CUPS
### Code License
 Apache 2.0
