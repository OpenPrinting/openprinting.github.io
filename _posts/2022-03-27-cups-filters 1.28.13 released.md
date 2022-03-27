---
title: cups-filters 1.28.13 released!
layout: single
author: Till
excerpt: Bug fix release, for correct printing on printers which take in the paper long-edge-first and for Apple LaserWriter printers
---
Bug fix release, for correct printing on printers which take in the paper long-edge-first and for Apple LaserWriter printers.
- pdftopdf: Fix N-up printing when paper is taken long-edge-first by the printer.
- pdftopdf: Fix cropping ("print-scaling=none" and "print-scaling=fill") when paper is taken long-edge-first by the printer (Issue #454).
- pdftops: Use Poppler for all Apple LaserWriter models (Issue #452).

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.13)
