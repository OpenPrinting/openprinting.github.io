---
title: Generic Framework to turn legacy drivers consisting of CUPS filters and PPDs into Printer Applications
---
<div>

<p>
Classic printer drivers for CUPS-based printing environment consist of print filters which convert a known page data format (like CUPS/PWG Raster, PostScript, PDF, …) into the printer&#039;s native data format and PPD (PostScript Printer Description) files which describe the printer&#039;s capabilities, user-settable options, and the way how the print filters are used.
</p>

<p>
The PPD files and print filters have to be put into standardized directories of the installed CUPS system so that CUPS finds them and allows the selection of this printer driver when setting up a printer (or selects the driver automatically when identifying a printer as supported).
</p>

<p>
This method works well in standard desktop and server systems using RPM or Debian packages and when the source code of the driver&#039;s filters is available or the driver is packaged for the operating system distribution in use. If the CUPS environment is provided in a sandboxed package <a href="https://github.com/OpenPrinting/printing-stack-snap" title="https://github.com/OpenPrinting/printing-stack-snap"  rel="nofollow">like this Snap</a> adding files to the CUPS installation is not possible, and in addition, one wants to provide the drivers in distribution-independent binary packages, as for example Snaps. Also the CUPS project is deprecating the use of PPD files.
</p>

<p>
The solution, suggested by Michael Sweet, the author of CUPS, are Printer Applications. Printer Applications are simple daemons which emulate a driverless IPP network printer on localhost, do the conversion of the print jobs into the printer&#039;s format, and send the job off to the printer. And as a physical driverless IPP printer they advertise themselves via <abbr title="Domain Name System">DNS</abbr>-SD and provide there capability information on (IPP) request from the client.
</p>

<p>
The IP connection between CUPS and the Printer Application allows both being in different sandboxes (for example being installed from different Snap packages) and the printer setup is completely automatic. When the Printer Application&#039;s daemon is running and the printer is connected and turned on, the daemon discovers the printer and automatically advertises it on the local machine via <abbr title="Domain Name System">DNS</abbr>-SD. Then CUPS discovers the printer and automatically sets up a print queue with an auto-generated PPD file.
</p>

<p>
The student&#039;s tasks here are
</p>
<ul>
<li><div> Create a universal printer application framework which can be packaged with print filters and PPDs to make up a Printer Application</div>
</li>
<li><div> Use this framework to create Printer Applications for drivers like HPLIP, foo2zjs, Gutenprint, SpliX, …</div>
</li>
<li><div> Use this framework to make a Printer Application for Foomatic</div>
</li>
<li><div> Making Snaps of Printer Applications.</div>
</li>
</ul>

<p>
Existing free software which could be used to accomplish this task are <a href="http://www.cups.org/" title="http://www.cups.org/"  rel="nofollow">CUPS/libcups</a>, <a href="https://github.com/istopwg/ippsample" title="https://github.com/istopwg/ippsample"  rel="nofollow">PWG&#039;s ippsample</a>, <a href="https://github.com/OpenPrinting/cups-filters" title="https://github.com/OpenPrinting/cups-filters"  rel="nofollow">cups-filters</a>, <a href="http://www.ghostscript.com/" title="http://www.ghostscript.com/"  rel="nofollow">Ghostscript</a>, <a href="https://mupdf.com/" title="https://mupdf.com/"  rel="nofollow">MuPDF</a>, …
</p>

<p>
The tasks can be distributed to more than one student if needed.
</p>

<p>
Mentors: Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

<p>
Desired knowledge: C programming, <abbr title="Domain Name System">DNS</abbr>-SD, IPP
</p>

<p>
Code License: Apache 2.0, MIT
</p>

</div>