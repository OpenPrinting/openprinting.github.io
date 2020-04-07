---
title: "General Printer SDK"
---

### Introduction
<p>
Traditional CUPS printer drivers consist of one or more print filters and a metadata file (PostScript Printer Description or PPD) which describes the printer capabilities, options, and filters. The filters  convert common print formats such as CUPS Raster, JPEG, PDF, and/or PostScript into the printer&#039;s native data format for transmission to the printer.
</p>

<p>
Future versions of CUPS will do away with support for these printer drivers, choosing instead to package support for non-IPP printers in Printer Applications which provide IPP emulation - see the <a href="https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-april-19.pdf" class="urlextern" title="https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-april-19.pdf"  rel="nofollow">2019 CUPS Plenary Slides</a>. Some initial efforts have produced useful tools, including:
</p>
<ul>
<li class="level1"><div class="li"> ippeveprinter (part of <a href="https://www.cups.org/" class="urlextern" title="https://www.cups.org/"  rel="nofollow">CUPS</a> for prototyping and supporting existing PostScript printers</div>
</li>
<li class="level1"><div class="li"> Printer Application framework from the Google Summer of Code 2019 by Dheeraj Yadav for classic (filters and PPD files) printer drivers (<a href="https://github.com/OpenPrinting/printer-application-framework" class="urlextern" title="https://github.com/OpenPrinting/printer-application-framework"  rel="nofollow">The framework itself</a>, <a href="https://github.com/dheeraj135/Printer-Application-Snaps" class="urlextern" title="https://github.com/dheeraj135/Printer-Application-Snaps"  rel="nofollow">Snapping the Printer Application</a>)</div>
</li>
<li class="level1"><div class="li"> <a href="https://www.msweet.org/lprint" class="urlextern" title="https://www.msweet.org/lprint"  rel="nofollow">LPrint</a> for supporting DYMO and ZPL label printers</div>
</li>
<li class="level1"><div class="li"> <a href="https://github.com/michaelrsweet/pappl" class="urlextern" title="https://github.com/michaelrsweet/pappl"  rel="nofollow">PAPPL</a>, a Printer Application framework/library based on ippeveprinter and LPrint</div>
</li>
</ul>

<p>
This year&#039;s GSoC goal is to get a universal Printer Application SDK (Software Development Kit) to not only convert classic drivers but also to create new printer drivers, from scratch, without PPD files.
</p>

<p>
The student&#039;s tasks here are
</p>
<ul>
<li class="level1"><div class="li"> Study Dheeraj&#039;s project and PAPPL to see from where the universal SDK can be started</div>
</li>
<li class="level1"><div class="li"> Check which functions are needed and which are already in existing projects (like <a href="http://www.cups.org/" class="urlextern" title="http://www.cups.org/"  rel="nofollow">CUPS/libcups</a>, <a href="https://github.com/OpenPrinting/cups-filters" class="urlextern" title="https://github.com/OpenPrinting/cups-filters"  rel="nofollow">cups-filters</a>, <a href="https://github.com/istopwg/ippsample" class="urlextern" title="https://github.com/istopwg/ippsample"  rel="nofollow">PWG&#039;s ippsample</a>) to create a library, ideally in cooperations with the upstream projects.</div>
</li>
<li class="level1"><div class="li"> Create further needed code pieces, for printer discovery, starting of IPP service, passing jobs through driver and to printer, …</div>
</li>
<li class="level1"><div class="li"> Documentation and templates for designing the driver and making a Snap of the Printer Application.</div>
</li>
</ul>

### Mentors
<p>
Dheeraj Yadav (dhirajyadav135 at gmail dot com), Michael Sweet, author of CUPS/LPrint/PAPPL and original creator of Gutenprint (msweet at msweet dot org), Ira McDonald, OpenPrinting (blueroofmusic at gmail dot com), Smith Kennedy, HP (smith kennedy at hp dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired Knowledge
<p>
C programming, <abbr title="Domain Name System">DNS</abbr>-SD, IPP
</p>

### Code License
<p>
Apache 2.0, MIT
</p>
