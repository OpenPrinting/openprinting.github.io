---
title: "Make a native Printer Application from Gutenprint"
---

### Introduction

1 contributor full-size (350 hours).

[Gutenprint](http://gimp-print.sourceforge.net/) is a high-quality printer driver for a wide range of inkjets, especially Epson and Canon, dye-sublimation printers and even monochrome PCL laser printers. It does not only cover many printers to give them support under Linux and free software operating systems at all, but also is optimized for highest possible print quality, so that at least on some printers and with the right settings you can even get better print quality than with the original (Windows/Mac) drivers.

Gutenprint is usually used as classic CUPS driver with a CUPS filter and a PPD file generator. As, as mentioned above, CUPS will not support PPD files any more from version 3.x on and when using the CUPS Snap one cannot install PPD-based drivers already now.

So a Printer Application of Gutenprint is needed. There [is already one](https://github.com/OpenPrinting/gutenprint-printer-app/), but it is a retro-fit of the classic CUPS driver. The Printer Application simply calls the PPD generator and the filter at the right places to do its job.

As Gutenprint contains all its printer support and printer capability info in libgutenprint or in files which are read by libgutenprint, the PPD generator and the filter only containing calls of functions in libgutenprint, it should be easy to create a [PAPPL-based](https://github.com/michaelrsweet/pappl/), native Printer Application for Gutenprint.

Here on an incoming get-printer-attributes IPP request we call the same functions which the PPD generator calls, but instead of translating the responses into a PPD file we translate it into the IPP answer for the get-printer-attributes request. And when we have a job to print, we call the library functions which the filter calls, but directly.

This does not only save us from resource-consuming calls of external executables but we are also no harnessed by the PPD file syntax and so have more flexibility in the UI representations of the (often more than 100) printer-specific options. Also, generally we should completely do away with the PPDs. Retro-fitting is only an ugly interim solution or for drivers which are not actively maintained anymore and for printers we do not have at hand and so cannot test the drivers.

The contributor's task is thus:

  * Create a PAPPL-based Printer Application using the libgutenprint library and PAPPL
  * Make sure all options and parameters of the Gutenprint driver are accessible from the Printer Application's web admin interface.
  * Package the Printer Application as a Snap
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Gutenprint developers TBD
### Desired knowledge
 `C`, PAPPL, CUPS
### Code License
 Apache 2.0
