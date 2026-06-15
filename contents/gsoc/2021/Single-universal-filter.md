---
title: "Create a single universal CUPS filter to replace the chain of individual filters"
---

### Introduction
<p>
Currently cups calls a sequence of filters in order to convert the input file format to the desired format. This makes CUPS call a lot of external executables which is resource consuming. Now that most of the filters are converted to filter functions, it would make more sense if we call the functions one by one in appropriate order instead of calling external executables. The aim of this project is to create a single universal filter which would check what the input and output formats are, figure out the sequence of filters required and call those functions to get the desired output.
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
