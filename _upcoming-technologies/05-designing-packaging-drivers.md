---
title: Designing and Packaging Printer and Scanner Drivers
---
At the time of the Linux Plumbers 2020 taking place we have all the tools to create printer and scanner drivers in the new architecture: PAPPL, the Printer Application library gives us most of the always needed code for a standard-conforming IPP-printer-emulating Printer Application, cups-filters provides additional data format conversion code, and snapcraft creates the sandboxed Snap packages.
Here we will present and discuss the workflow of designing and creating the drivers in the form of a Printer (and Scanner) Application and making a Snap ("snapping") it.
The outcome of this session will also use in our Google Season of Docs project of creating a Printer/Scanner driver design and packaging tutorial.
