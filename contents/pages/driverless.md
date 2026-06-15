---
layout: collection
title: "Driverless Printing"
permalink: /driverless/
author_profile: false
sidebar:
  - image: /assets/images/logo _ipp.png
    image_alt: "Driverless Printing"
    nav: "driverless"
---
<h2 id="introduction">Introduction-:</h2>
<p align="justify">Driverless Printing means that to be able to print on a given printer no software or data specific to that printer model needs to be installed on the client. The client should even be able to print on printers which did not exist yet when the client's software was released. The printer must use known page description languages and must inform the client about its capabilities on request.</p>
<p align="justify">There exist a variety of methods for a client to submit a job to a printing system and print driverlessly-:</p>
<ul>
    <li>Print directly from an application on the client.</li>
    <li>Use AirPrint or IPP Everywhere printing.</li>
    <li>Send the job as an email attachment to a special address.</li>
    <li>Web print. The document is uploaded from a web browser via a web form style interface.</li>
</ul>

<h2>Importance-:</h2>
<p align="justify">Driverless printing is especially important for Linux and similar operating systems as they are often not explicitly supported by the manufacturers supplying drivers for them. Originally the driverless printing standards were created to allow smartphones, tablets, and similar mobile devices to print, as these come with several different and new operating systems. Even very cheap printers do driverless printing (people want to print from phones), so it is easy to get a printer for Linux nowadays.</p>

<h2 id="standards">Driverless Printing Standards And their PDLs</h2>

There are four driverless printing standards established, but they all are based on the printer advertising itself via DNS-SD in the network, communicating with clients via IPP, and supporting a selection out of four known Page Description Languages (PDLs). The difference is merely only which selection of PDLs is supported.

Due to this we actually do not distinguish between the standards any more and simply call it "driverless IPP printing" or simply "driverless printing".

Here are the four standards and their PDLs:

1. [AirPrint™](https://support.apple.com/en-ca/HT201311): Apple Raster/URF, JPEG, and PDF. AirPrint is Apple's "standard" to print from iOS, iPadOS, and macOS, and is the most common and oldest driverless printing standard.
2. [IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html): PWG Raster, JPEG, and PDF. IPP Everywhere is developed by the Printer Working Group (PWG) and is a completely open standard.
3. [Mopria®](https://www.mopria.org): PCLm, PWG Raster, and PDF. Mopria is a proprietary profile of IPP used for printing from Android and Microsoft Windows®.
4. [Wi-Fi Direct Print Services](https://www.wi-fi.org): PCLm, PWG Raster, and PDF. Wi-Fi Direct printers work as a Wi-Fi access point so that mobile devices can print without an existing Wi-Fi network.

### Apple Raster

Apple Raster (aka URF) is Apple's own raster format for printing with AirPrint.
It is similar to CUPS and PWG Raster but with much simpler page headers.  Apple
Raster uses a modified PackBits compression algorithm that works on whole pixels
for non-bitmap graphics that is typically paired with GZIP compression during
transmission to the printer.

### PCLm

PCLm is a raster-only subset of PDF that has nothing to do with the original HP
PCL.  Since PCLm files are valid PDF files, you can view them using a standard
PDF file viewer or print them on a PDF printer.  However, printers that support
PCLm can only accept PCLm files produced for a particular combination of band
height, color space, and resolution that is supported by the printer.

### PWG Raster Format

The PWG Raster Format is a subset of CUPS raster that is documented in PWG
Candidate Standard 5102.4-2012.  Like Apple Raster, it uses a modified PackBits
compression algorithm that works on whole pixels for non-bitmap graphics that is
typically paired with GZIP compression during transmission to the printer.

<h2 id="workflow">The workflow of driverless printing is always the same-: </h2>

<ol>
    <li><p align="justify">The printer advertises itself by DNS-SD, with a summary of its most important capability information (especially also its PDLs and a one-line-string super summary in case of AirPrint printers) in its DNS-SD record.</p></li>
    <li>Clients find these printers via DNS-SD.</li>
    <li><p align="justify">The client polls the full capabilities info from the printer sending a get-printer-attributes IPP request. The printer returns a long list of info, especially paper sizes and types, unprintable margins, resolutions, input trays, finishers, quality settings, all user-settable options etc..</p></li>
    <li><p align="justify">CUPS or cups-browsed on the client generate PPD files from this info and create print queues for each printer.</p></li>
    <li><p align="justify">The print dialogs of the applications show the printers and allow access to all the user-settable options.</p></li>
    <li><p align="justify">The user prints a job. The PDF from the application is turned into one of the PDLs which the printer supports by cups-filters. The settings selected by the user are passed along with the job as IPP attributes.</p></li>
    <li><p align="justify">The printer prints the job and thanks to IPP the status can be observed, toner levels and any errors can get reported to the client.</p></li>
    <li><p align="justify">If the printer is shut down, its queue will get automatically removed. So no clutter of print queues as souvenir of all the networks you have visited.</p></li>
</ol>
