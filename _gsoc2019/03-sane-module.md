---
title: SANE module for IPP driverless scanning
---

<div>

<p>
Version 2.0 and newer of the Internet Printing Protocol (IPP) support polling the full set of capabilities of a printer and if the printer supports a known Page Description Language (PDL), like PWG Raster, Apple Raster, PCLm, or PDF, it is possible to print without printer-model-specific software (driver) or data (PPD file), so-called “driverless” printing. This concept was introduced for printing from smartphones and IoT devices which do not hold a large collection of printer drivers. Driverless printing is already fully supported under Linux. Standards following this scheme are IPP Everwhere, Apple AirPrint, Mopria, and Wi-Fi Direct Print.
</p>

<p>
As there are many multi-function devices (printer/scanner/copier all-in-one) which use the IPP, the Printing Working Group (PWG) has also worked out a standard for IPP-based scanning, “driverless” scanning, to also allow scanning from a wide range of client devices, independent of which operating systems they are running.
</p>

<p>
Conventional scanners are supported under Linux via the SANE (Scanner Access Now Easy) system and require drivers specific to the different scanner models. Most of them are written based on reverse-engineering due to lack of support by the scanner manufacturers. To get driverless scanning working with the software the users are used to the best solution is to write a SANE module for driverless IPP scanning. This module will then automatically support all IPP scanners, thousands of scanners where many of them do not yet exist.
</p>

<p>
Even if there are no driverless IPP scanners on the market yet, this module can be used for accessing scanners with their driver provided as Scanner Application (see previous project in this list).
</p>

<p>
The student&#039;s task is to write this SANE module for IPP driverless scanning and so make Linux ready for the future of driverless devices.
</p>

<p>
Mentors: Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), SANE upstream developers TBD
</p>

<p>
Desired knowledge: C programming, <abbr title="Domain Name System">DNS</abbr>-SD, IPP
</p>

<p>
Code license: <abbr title="GNU General Public License">GPL</abbr> 2+
</p>

</div>
