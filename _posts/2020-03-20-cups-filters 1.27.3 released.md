---
title: cups-filters 1.27.3 released!
layout: single
author: Till
excerpt: Bug fix release, fixing Ghostscript-based PDF page counting in foomatic-rip to work with all Ghostscript versions, building libfontembed tests with correct path to test font, re-sharing of remote CUPS queues with cups-browsed and others
---
Bug fix release, fixing Ghostscript-based PDF page counting in foomatic-rip to work with all Ghostscript versions, building libfontembed tests with correct path to test font, re-sharing of remote CUPS queues with cups-browsed and others
- cups-browsed: Allow sharing local queues pointing to remote CUPS queues and re-sharing printers discovered via BrowsePoll by default, using AllowResharingRemoteCUPSPrinters and NewBrowsePollQueuesShared directives in cups-browsed.conf (Issue #101, Pull request #218).
- driverless: Correctly unlink temporary file when generating PPD file (Pull request #220).
- cups-browsed: Fixed memory leaks (Pull request #219).
- foomatic-rip: PDF page count side-loads the PDF file to count the pages in, so it cannot be run in -dSAFER mode. Run even in -dNOSAFER mode to override the -dSAFER default of newer Ghostscript versions. This should not cause a security problem as we do not take an input file which could do arbitrary side-loads but we run hard-coded PostScript commands instead (Issue #216).
- libfontembed: Add checks to the test programs to not segfault if the test font file is not found (Pull request #214).
- Build System: Let ./configure fail if the supplied test font file path (or the default) does not exist (Pull request #214), also use the "find" command to find the test font file DejaVuSans.ttf under /usr/share/fonts, as every distribution has it somewhere else.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/release-1-27-3)
