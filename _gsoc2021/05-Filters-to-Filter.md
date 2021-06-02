---
title: "CUPS Filters: Converting Filters to Filter Functions"
---

### Introduction
<p>
CUPS-Filters provide the filters which CUPS needs to convert job data from the input data to the printer's native language. Filters enable a user to print a file even if the printer does not support the file format. Currently some filters are in the form of standalone executables. This uses a lot of CPU resources for running printer applications due to so many calls for each individual executable. So the primary focus of this project is to convert a few filters (pdftoraster, texttopdf, bannertopdf) into filter functions. These functions would be integrated in a shared library so as to reduce the number of calls to individual filter executables and minimize CPU resources exploitation.
</p>


### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com),
Dheeraj Yadav (dhirajyadav135 at gmail dot com)
</p>

### Desired Knowledge
<p>
C and/or Python programming, GTK
</p>

### Code License
<p>
<abbr title="GNU General Public License">GPL</abbr> 2+ or <abbr title="GNU Lesser General Public License">LGPL</abbr> 2+
</p>
