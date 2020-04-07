---
title: "Real roll paper support in cups-filters"
---

### Introduction
<p>
Currently, most probably due to the fact that once most printers use paper in cut sheet and also PPD (PostScript Printer Description, now deprecated) files only support paper in cut sheet, roll paper as used in large-format and also some specialty prrinters is not actually supported.
</p>

<p>
The difference of roll paper against sheet paper is that only its width is defined, the height of the printing area can be selected individually for each print job.
</p>

<p>
What the user expects to happen is that the paper is cut right after the page so that nothing is wasted and the user has minimum work with manual cutting. He also would like pages to be rotated by 90 degrees if they fit better this way, for example if the page height fits into the roll&#039;s width. This saves paper and allows pages which are too wide for the roll to be printed. An option to activate this (auto), never rotate, or always rotate should be added.
</p>

<p>
Also some way to manage paper consumption and preventing a page being started which does not fit into the remaining paper is desired.
</p>

<p>
The student&#039;s task is to add this functionality into the current print workflow.
</p>

<p>
He should at first study the IPP (Internet Printing Protocol) standard for its roll paper support. Then he should check where changes are needed: in CUPS, cups-filters, print dialogs … Also it has to be investigated whether this can be completely implemented in the current (deprecated) PPD-based printing workflow or whether the new Printer-Application-based model is required.
</p>

### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired knowledge
<p>
C programming, IPP
</p>

### Code license
<p>
(L)<abbr title="GNU General Public License">GPL</abbr> 2+, Apache 2.0, MIT
</p>
