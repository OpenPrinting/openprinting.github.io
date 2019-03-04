---
title: Driverless Printing Standards And their PDLS
---
<p align="justify">There are four driverless printing standards established, but they all are based on the printer advertising itself via DNS-SD in the network, communicating with clients via IPP, and supporting a selection out of four known Page Description Languages (PDLs). The difference is merely only which selection of PDLs is supported.</p>
<p align="justify">Due to this we actually do not distinguish between the standards any more and simply call it "driverless IPP printing" or simply "driverless printing".
<br>
    Here are the four standards and their PDLs-:
    <ol>
        <li>Apple AirPrint: Apple Raster/URF, PDF (Apple's standard to print from iOS, most common and the oldest driverless printing standard)</li>
        <li>PWG's IPP Everywhere: PWG Raster, PDF (from the Printer Working Group (PWG), completely open PWG Raster format)</li>
        <li>Mopria: PCLm, PWG Raster, PDF</li>
        <li>Wi-Fi Direct: PCLm, PWG Raster, PDF (printers must also work as a Wi-Fi server so that phones can print without an existing Wi-Fi infrastructure)</li>
    </ol>
    <ul>
        <li><h2> Apple Raster-: </h2>
            <p align="justify">Apple Raster (aka URF) is Apple's own raster format for printing from iOS. Specs got only known when support for it got added to CUPS (version 2.2.2). It is similar to CUPS and PWG Raster but with much simpler page headers.The processing of a job to create an Apple raster file is taken care of by CUPS' rastertopwg filter. The file produced by the filter is sent directly to the printer with IPP so no vendor-specific filters are involved.</p>
        </li>
        <li><h2>PWG's Raster and IPP Everywhere-: </h2>
            <p align="justify">PWG raster, a raster format was chosen because it is a simpler format than that of the high-level languages, which also require significant resources on the printer. PWG Raster is, as all the PWG's standards work, completely free and fully documented, as well as the PWG's IPP Everywhere standard.</p>
        </li>
        <li><h2>PCLm-: </h2>
            <p align="justify">PCLm has nothing to do with PCL, it is a raster-only subset of the PDF format. So you can display every PCLm file with a PDF viewer, or print it on a PDF-only printer, but you cannot print arbitrary PDF files on a PCLm-only printer.
            </p>
        </li>
    </ul>
</p>