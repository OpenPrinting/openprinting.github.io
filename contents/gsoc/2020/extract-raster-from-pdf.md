---
title: "Extract Raster data from PDFs for direct printing"
---

### Introduction
<p>
If an incoming print job is a PDF file and the printer is not a PDF printer, the file always goes through a PDF interpreter (Ghostscript, Poppler, or MuPDF) to get rasterized. This is needed when the file contains vector/high-level graphics, fonts, …, but is unneeded and can even produce bad interferences if each page is a simply a full-page bitmap (raster graphics).
</p>

<p>
There is even an official file format, PCLm, which is a subset of PDF but describes each page as full-page raster graphics. It is used for driverless printing on cheaper printers which do not provide a PDF interpreter. As the files are a subset of PDF, they are recognized as PDF format. Also certain PDF from scanning software (or hardware) are raster-only.
</p>

<p>
To speed up the filtering process and to avoid quality degradation caused by mis-matched resolutions we could recognize these special-case PDFs, extract the bitmaps from each page and convert them into PWG/CUPS Raster and then continue as we had gotten raster graphics in the first place.
</p>

<p>
We could let the pdftoraster/gstoraster filter (or already CUPSvia MIME types) identify whether the input is PCLm (or any other known raster-only PDF format) and in this case delegate to a pclmtoraster filter to extract the raster data from the pages and convert them into other raster formats, without PDF interpreter.
</p>

<p>
The student&#039;s task here is to find out about suitable raster-only PDF types (at least PCLm should be supported, the more file types, the better), make these files get identified, and write a CUPS filter which extracts the raster data and passes it on as CUPS Raster. The resulting code will get added to the cups-filters project.
</p>

### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired knowledge
<p>
C programming, CUPS
</p>

### Code License
<p>
(L)<abbr title="GNU General Public License">GPL</abbr> 2+, Apache 2.0, MIT
</p>
