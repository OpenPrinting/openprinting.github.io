---
title: "CI Testing programs for libpappl-retrofit and libppd"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Intermediate

To protect a free software project worked on by several contributors against regressions caused by a committed change, one needs frequent, automated testing of the code, base, ideally triggered by every commit into the repository. This is called Continuous Integration (CI).

What is triggered on each commit is usually some static analysis of the code using common, specialized tools and also build and execution tests, usually doing `./configure; make; make test` on different system platforms.

This naturally requires test scripts/programs which are compiled and run by the `make test` step. For CUPS for example the daemon is started (on an unprivileged port so that it does not need root), queues created and listed, jobs sent, the logs checked whether everything went OK, ... For Ghostscript a large collection of input files (gathered from bug reports) is processed and converted into raster formats.

The contributor's task here is to write test programs for the OpenPrinting projects libppd and pappl-retrofit so that `make test` does something useful, being efficient to catch regressions. They should exercise important functionality of the software with different parameters and analyse logs and output files to check whether the program did the expected work.

Test programs are also needed for the so-called 'autopkgtest' tests which are added to Debian packages and executed whenever the package is uploaded to Debian or Ubuntu.

In addition, instruction files and shell scripts are needed to build the software on different platforms/environments, run tests, create GitHub Actions (for the automatic triggering on each commit ...).

This subject got discussed on the OpenPrinting micro-conference on Linux Plumbers 2022: ([Summary](https://openprinting.github.io/OpenPrinting-News-September-2022/#openprinting-micro-conference-on-the-linux-plumbers-2022), [Slides](https://lpc.events/event/16/contributions/1161/attachments/942/1851/lpc-printing-ci-2022.pdf), [Video](https://www.youtube.com/watch?v=c--Uki7cvGE))

Here you can see what we already have in terms of CI, and what is missing ...
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), TBD
### Desired knowledge
 C, Shell, PAPPL, CUPS, CI
### Code License
 Apache 2.0
