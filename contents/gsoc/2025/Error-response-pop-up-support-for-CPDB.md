---
title: "Error response pop-up support for CPDB"
---
### Introduction
1 contributor medium-size (175 hours), Level of difficulty: Intermediate

It often happens that a print job, sent to a network printer or to a remote CUPS queue does not get printed and [a "cups-pki-invalid" error will get logged](https://github.com/OpenPrinting/cups/issues/1072). This is due to the fact that the locally saved certificate does not match the printer (any more).

To prevent man-in-the-middle attacks between a client and a network IPP printer with encrypted connection, the first time when a new network printer is accessed, the printer's certificate is loaded from the printer and saved locally. On subsequent accesses the printer's certificate is compared to the locally saved one and on mismatch the error is logged and the printing does not happen.

often this happens without an attack, just on a change of the printer configuration or a printer firmware update. Then the user screams on internet platforms, when they are lucky finds information about this problem and how to remove the old certificate to make the CUPS replace it by the current one and the printer print again.

To solve this nasty problem, we came to the conclusion to [pop up a dialog which allows to remove the certificate file ("Reset certificte") by clicking a button.](https://github.com/OpenPrinting/cups/issues/1072#issuecomment-2537216779).

The contributor's task here is to create such a dialog and make it pop up in the right situation. The pop-up should also be used for other common error scenarios which could be solved by a simple dialog.

The communication between the pop-up and CUPS should be done by the [Common Print Dialog Backends (CPDB)](https://github.com/OpenPrinting/cpdb-libs), extending the D-Bus interface and implementing the error handling in the CPDB CUPS backend.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Gaurav Guleria (gaurav dot gen3 at gmail dot com), Kushagra Sharma (b20251 at students dot iitmandi dot ac dot in), TBD
### Desired knowledge
 `C/C++`, GTK or Qt, DNS-SD/Avahi, CUPS/IPP
### Code License
 MIT, GPL-2+ and LGPL-2+
