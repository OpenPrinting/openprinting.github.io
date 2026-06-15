---
title: "Converting Braille embosser support into a Printer Application"
---

### Introduction

1 contributor full-size (350 hours).

cups-filters currently supports Braille embossers through a series of PPD files and shell scripts that convert documents into a textual layout, convert the text into Braille dots, and convert the Braille dots to braille embosser-specific formats.

For long-term support and wide availability, this needs to be converted to the newer CUPS infrastructure, Printer Applications.

The contributor's task is thus:

  * Converting these shell scripts into filter functions in libcupsfilters
  * Creating a Printer Application that exposes Braille embossers configuration to users

The contributor does not need to own any specific hardware, a comparison can be made between the output of the existing shell-script-based implementation and the output of the converted implementation.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Samuel Thibault, Braille expert (samuel dot thibault at ens-lyon dot org)
### Desired knowledge
 `C/C++`, Shell, CUPS
### Code License
 Apache 2.0
