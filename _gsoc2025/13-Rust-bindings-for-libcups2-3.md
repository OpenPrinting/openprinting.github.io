---
title: "Rust bindings for libcups2/3"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

Most software with print functionality or print administration functionality uses the CUPS library (libcups, [2.x](https://github.com/OpenPrinting/cups/), [3.x](https://github.com/OpenPrinting/libcups/)) to communicate with CUPS. This is easy when the software is written in C or `C++` as the library is written in C. If the software is written in other languages, we need some connection between the library and the client code, the so-called bindings.

A programming language which gets more and more used nowadays is Rust, due to its memory-safety, eliminating the number-one source of crashes and vulnerabilities. Unfortunately, we do not have Rust bindings for libcups. And getting them is subject of this project.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
### Desired knowledge
 Python, C, CUPS
### Code License
 GPL-2+ (GPL 2 or any later version)
