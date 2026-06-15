---
title: Improve the pdftoraster filter to not need copying Poppler source code or using unstable APIs
---

### Introduction

<p>
The cups-filters project at OpenPrinting (included in all Linux distributions using CUPS 1.6.x or newer) provides the filters needed to convert the print job output of desktop applications (usually PDF) into the printer&#039;s native language or into the universal CUPS/PWG-Raster format as input for a separate printer driver. It also provides the pdftopdf filter to apply page management (N pages per sheet, selected pages, even/odd pages for manual duplex, mirror for iron-on sheets, …) to the PDF data stream.
</p>

<p>
One of the filters, pdftoraster, to rasterize PDF files into CUPS/PWG Raster, uses Poppler but makes use of unstable APIs of Poppler, requiring frequent modifications when Poppler gets updated.
</p>

### Student Tasks
<p>
The task for the student is here to improve pdftoraster&#039;s interface with Poppler, for example using Poppler&#039;s PPM (generic raster) output and converting it into CUPS/PWG Raster. Discussion about possible approaches you can find <a href="https://github.com/OpenPrinting/cups-filters/issues/9" title="https://github.com/OpenPrinting/cups-filters/issues/9"  rel="nofollow">on the cups-filters GitHub</a>.
</p>

### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Tobias Hoffmann, cups-filters developer (smilingthax at googlemail dot com).
</p>

### Desired Knowledge
<p>
C and/or C++ programming
</p>

### Code License
<p>
MIT
</p>
