---
title: "Gutenprint Printer Application"
---

### Introduction
<p>
Gutenprint is a printer driver for high-quality inkjet printing which is under continuous development for many years already and supports hundreds of printers. It is popular under users of both Linux and Mac <abbr title="Operating System">OS</abbr> X.
</p>

<p>
Currently, it supports printing either the classic CUPS way, by a PPD generator and a filter or by a plug-in for the GIMP. It should be rather easy to add more ways of using the core driver functionality, as this functionality is in a library, all capability information of the supported printers, dithering and color correction algorithms, …
</p>

<p>
The new mode of using this library should be a new Printer Application which will be the student´s task to create. The Gutenprint printer application should wrap the Gutenprint library and so support all the printers the library supports. The basic structure can be like the <a href="https://github.com/OpenPrinting/printer-application-framework" class="urlextern" title="https://github.com/OpenPrinting/printer-application-framework"  rel="nofollow">Printer Application framework</a> but here we do not want to create the (deprecated) PPD files but instead, let the IPP server link directly with the library and serve out the printer capability information on client&#039;s get-printer-attributes requests. Also see Michael Sweet&#039;s work on <a href="https://github.com/michaelrsweet/pappl" class="urlextern" title="https://github.com/michaelrsweet/pappl"  rel="nofollow">PAPPL</a>.
</p>

### Mentors
<p>
Dheeraj Yadav (dhirajyadav135 at gmail dot com), Michael Sweet, author of CUPS/LPrint/PAPPL and original creator of Gutenprint (msweet at msweet dot org), Ira McDonald, OpenPrinting (blueroofmusic at gmail dot com), Smith Kennedy, HP (smith kennedy at hp dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Gutenprint developers, TBD
</p>

### Desired knowledge
<p>
C programming, IPP
</p>

### Code license
<p>
(L)<abbr title="GNU General Public License">GPL</abbr> 2+, Apache 2.0, MIT
</p>