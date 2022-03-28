---
title: Driverless Printing Standards And their PDLS
---
There are four driverless printing standards established, but they all are based on the printer advertising itself via DNS-SD in the network, communicating with clients via IPP, and supporting a selection out of four known Page Description Languages (PDLs). The difference is merely only which selection of PDLs is supported.

Due to this we actually do not distinguish between the standards any more and simply call it "driverless IPP printing" or simply "driverless printing".

Here are the four standards and their PDLs:

1. [AirPrint™](https://support.apple.com/en-ca/HT201311): Apple Raster/URF, JPEG, and PDF. AirPrint is Apple's "standard" to print from iOS, iPadOS, and macOS, and is the most common and oldest driverless printing standard.
2. [IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html): PWG Raster, JPEG, and PDF. IPP Everywhere is developed by the Printer Working Group (PWG) and is a completely open standard.
3. [Mopria®](https://www.mopria.org): PCLm, PWG Raster, and PDF. Mopria is a proprietary profile of IPP used for printing from Android and Microsoft Windows®.
4. [Wi-Fi Direct Print Services](https://www.wi-fi.org): PCLm, PWG Raster, and PDF. Wi-Fi Direct printers work as a Wi-Fi access point so that mobile devices can print without an existing Wi-Fi network.


Apple Raster
------------

Apple Raster (aka URF) is Apple's own raster format for printing with AirPrint.
It is similar to CUPS and PWG Raster but with much simpler page headers.  Apple
Raster uses a modified PackBits compression algorithm that works on whole pixels
for non-bitmap graphics that is typically paired with GZIP compression during
transmission to the printer.


PCLm
----

PCLm is a raster-only subset of PDF that has nothing to do with the original HP
PCL.  Since PCLm files are valid PDF files, you can view them using a standard
PDF file viewer or print them on a PDF printer.  However, printers that support
PCLm can only accept PCLm files produced for a particular combination of band
height, color space, and resolution that is supported by the printer.


PWG Raster Format
-----------------

The PWG Raster Format is a subset of CUPS raster that is documented in PWG
Candidate Standard 5102.4-2012.  Like Apple Raster, it uses a modified PackBits
compression algorithm that works on whole pixels for non-bitmap graphics that is
typically paired with GZIP compression during transmission to the printer.
