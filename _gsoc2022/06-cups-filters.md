---
title: "cups-filters: In filter functions call Ghostscript via libgs and not as external executable"
---

### Introduction

1 contributor half-size (175 hrs)

cups-filters has always provided the filters which CUPS needs to convert job data from the input format (PDF in most cases) into the printer's native language. For use in Printer Applications the filters got converted from standalone executables to library functions, reducing the number of calls of separate executables and so saving resources.

The filter functions themselves also often call external executables, and this we can also try to avoid. For example the ghostscript() filter function calls Ghostscript and Ghostscript also has a library, libgs, which allows Ghostscript to be called as library function.

The contributor's task here is to convert the ghostscript() filter function to call Ghostscript via libgs. Here it is also important to make everything working in a multi-threading environment as Printer Applications can process jobs in parallel. Ghostscript has a special GS_THREADSAFE build mode for that.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Sahil Arora (sahilarora dot 535 at gmail dot com), Dheeraj Yadav (dhirajyadav135 at gmail dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
