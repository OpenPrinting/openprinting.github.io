---
title: Foomatic   Generating CUPS PPD generator (/usr/share/cups/drv/\*.drv files) from Foomatic data
---

### Introduction

<p>
CUPS has two mechanisms for on-the-fly-PPD generation to avoid the wasting of disk space by thousands of uncompressed (or slightly compressed) PPD files. One is to put an executable file into the /usr/lib/cups/driver/ directory which lists and generates PPD files on request, the other is using *.drv files in /usr/share/cups/drv, which contain the data for the PPDs in a simpler and more compact format.
</p>

<p>
The former method is deprecated upstream and can be removed in a future release of CUPS, especially also because the executables can get slow in some cases.
</p>

<p>
The latter is not yet supported by Foomatic and letting Foomatic support it is subject of this project idea.
</p>

### Student Tasks
<p>
The student&#039;s task is to create a utility which generates *.drv files from the whole database and/or from selected, printers, manufacturers, drivers, groups, …, depending on what the user requests.
</p>

### Mentor
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com)
</p>

### Desired Knowledge
<p>
Perl programming, perhaps also MySQL
</p>

### Code License
<p>
<abbr title="GNU General Public License">GPL</abbr>
</p>
