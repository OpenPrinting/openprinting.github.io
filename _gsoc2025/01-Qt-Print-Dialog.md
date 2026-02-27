---
title: "Qt Print Dialog: Modernize the user interface"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

The print dialog of [Qt](https://contribute.qt-project.org/), which is also the print dialog used by KDE applications has still the user interface of 20 years ago, when I told the Qt and KDE developers that a CUPS-supporting print dialog is needed and they made this print dialog in response.

Now, after the internals of the dialog being up-to-date (Support for the [Common Print Dialog Backends](https://openprinting.github.io/achievements/#common-print-dialog-backends) added in [GSoC 2022](https://github.com/TinyTrebuchet/gsoc22/)) we need to make the user interface of the Qt print dialog cute.

The modernization should at least be a UI similar to the one of the GTK print dioalog. This should not require any extensions of the API between the print dialog and the applications and so the new dialog can replace the old one without modifications on existing applications needed.

Optionally, depending on the time left, a dialog with built-in preview (Like in LibreOffice, Chromium, Firefox, Thunderbird) could be created. This requires more UI design work and most probably also additions to the API. The migration of a simple application (like text editor or document viewer) to the new print dialog would demo it and  make the developers of other applications switch over.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Qt developers, TBD
### Desired knowledge
 `C/C++`, Qt, UI Design
### Code License
 LGPL-3 and GPL-2
