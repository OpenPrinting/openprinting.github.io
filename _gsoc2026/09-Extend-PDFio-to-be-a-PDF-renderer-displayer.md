---
title: "Extend PDFio to be a PDF renderer/displayer"
---
### Introduction
1 contributor large-size (350 hours), Level of difficulty: Hard

To avoid binary compatibility issues of C++, and more importantly, there are no PDF renderers with fully permissive licensing. This project's  aim is to develop a PDF rasterization engine in pure C that utilizes [PDFio](https://github.com/michaelrsweet/pdfio) for parsing and Cairo as the rendering engine. It is primarily for use as a print filter to be used with CUPS and Printer Applications. A simple screen viewer for development and debugging should also be included.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), Ira McDonald (blueroofmusic at gmail dot com), TBD
### Desired knowledge
 C, CUPS
### Code License
 Apache 2.0
