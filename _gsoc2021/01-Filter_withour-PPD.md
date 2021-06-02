---
title: "Make All Filter Functions Work Well Even Without PPD Files"
---

### Introduction
<p>
We have already moved from Postscript to PDF as the standard data format for print jobs. Michael Sweet has deprecated the use of PPD files, but due to lack of replacement, we have continued using them. Some years ago the concept of printer applications as a replacement for the classic CUPS printer drivers was introduced. It solves many problems including no more use of obsolete PPD files and it enhances sandboxing. Printer applications themselves can be sandboxed, so they can be distributed as OS-distribution-independent packages on a central download place. For this, all filter functions also need to work correctly even if there is no PPD file assigned to the print queue. They should as well understand standard IPP attributes as their options and printer IPP attributes for their default settings.
</p>


### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Dheeraj Yadav (dhirajyadav135 at gmail dot com), Jai Luthra (luthrajaiji at gmail dot com)
</p>

### Desired Knowledge
<p>
C and/or Python programming, GTK
</p>

### Code License
<p>
<abbr title="GNU General Public License">GPL</abbr> 2+ or <abbr title="GNU Lesser General Public License">LGPL</abbr> 2+
</p>
