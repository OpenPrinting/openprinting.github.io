---
title: pyppd 1.1.0 released!
layout: single
author: Till
excerpt: Vastly reduced memory consumption when extracting a PPD file and incorporated the patches of the Debian/Ubuntu package
---
Vastly reduced memory consumption when extracting a PPD file and incorporated the patches of the Debian/Ubuntu package

- When extracting a PPD file from the archive streaming decompression is used now instead of decompressing the whole archive into memory at once (Issue #2), Thanks to Sambhav Dusad (@dsam82).
- Use JSON dumps instead of Pickle dumps, from Ubuntu/Debian to make archive reproducible, but also faster than Pickle dumps. Thanks to Didier Raboud (@OdyX).
- Sort PPD list before archiving, from Ubuntu/Debian to make archive reproducable. Thanks to Didier Raboud (@OdyX)
- Use "python3" in shebangs, from Debian/Ubuntu

[**More Details and Download**](https://github.com/OpenPrinting/pyppd/releases/tag/release-1-1-0)
