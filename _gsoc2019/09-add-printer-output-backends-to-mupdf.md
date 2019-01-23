---
title: Add printer output backends to MuPDF
---

<div>

<p>
MuPDF is a lightweight PDF renderer made by Artifex, the company behind Ghostscript. In contrary to Ghostscript, MuPDF is a pure PDF renderer. It does not contain a PostScript interpreter nor parts of it are written in PostScript. This makes it smaller, faster, and less resource-consuming, the ideal solution for mobile devices like tablets or smartphones.
</p>

<p>
On mobile devices printing will not be done with having tons of printer-model-specific drivers on the system. Once, they consume the limited mass storage space, and second, one uses the mobile device in several different local networks with different printers: At home, in the office, in a copy shop, … and one wants to use the printers which are available there, without installing drivers and setting up queues.
</p>

<p>
Therefore we want to have a system which automatically detects network printers and makes them available for local apps. To do so we restrict ourselves to printers with known, common languages: IPP Everywhere/AirPrint/Mopria/W-Fi Direct (driverless printing standards, using PWG Raster, Apple Raster, PCLm, and PDF) and PostScript, PDF, PCL 5c/e/6/XL (legacy standards). So MuPDF has to generate raster output for these languages, meaning raster embedded in the specifics of the language, and to avoid exhausting printer resources raster in small bands and no high-level output, even if the printer language is high-level.
</p>

<p>
Artifex will also work on this, but to get additional man power we are also opening this project for students.
</p>

<p>
Note that you have to assign copyright on your code to Artifex, as otherwise the code cannot be integrated in MuPDF.
</p>

<p>
This project can be split to be worked on by more than one student.
</p>

<p>
Mentors: MuPDF developers TBD, Till Kamppeter, Project Leader OpenPrinting (till at linux dot com)
</p>

<p>
Desired knowledge: C and/or C++ programming
</p>

<p>
Code License: <abbr title="GNU General Public License">GPL</abbr>
</p>

</div>