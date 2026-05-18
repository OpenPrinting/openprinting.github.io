---
title: "Image output evaluation for testing of print/scan job processing"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

We do a lot of testing for quality assurance and security of our software, especially also tests of the data processing when printing and scanning. For now our only criteria to consider a test failed is a processing error, a crash, an infinite loop, or the output being empty. We do not verify whether the content of the output is actually what we have expected.

Evaluating the correctness of the content of the output is not easy, as we cannot compare it pixel by pixel, we rather need to determine whether a human being would see the content which they have sent to the printer. This means to recognize text, structures, colors, but with a certain tolerance.

There is free software work at GNOME for the CI testing of their GUI, which requires to analyse graphical screen content to evaluate whether the response of GUI apps to given user input is as expected, and this should be fully automated. This is the [openQA](https://gitlab.gnome.org/GNOME/openqa-tests) project. 

To compare graphical content they use the free software computer vision library [OpenCV](https://opencv.org/) and also the universal file comparison tool [diffoscope](https://diffoscope.org/) is used to check output.

With this we could for example take a PDF file, rasterize it in high quality, then "print" it/send it through a filter chain and afterwards compare the images. We can also OCR raster output to check whether the complete text of the input (plain text or PDF file) is conserved in the output, not having anything cut off at the borders and no glyphs missing or replaced by squares/placeholders for missing glyphs.

See also [my report from the GUADEC 2024](https://openprinting.github.io/OpenPrinting-News-July-2024/#guadec-2024-in-denver), the section "Workshop: openQA testing for your GNOME app, module or service".

Tests which benefit from this are not only our CI testing in libcupsfilters, but also 2 of our other projects on this list:
  * Behavior-accurate simulation of multi-function printers
  * Fuzz-based testing of printing protocols
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
### Desired knowledge
 C, Go, image processing and evaluation, computer vision, OCR
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
