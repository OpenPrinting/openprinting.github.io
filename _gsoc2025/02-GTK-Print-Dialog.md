---
title: "GTK Print Dialog: Modern dialog with built-in preview in main view"
---
### Introduction
1 contributor full-size (350 hours), Level of difficulty: Hard

Are you using LibreOffice, Firefox, Thunderbird, or Chromium with their nice, modern preview-centric print dialogs and got somewhat disappointed with GNOME apps like the Text Editor, Evince, or similar because of their more conventional [GTK](https://gitlab.gnome.org/GNOME/gtk) print dialog? Note that GTK's dialog has also a preview, but it is awkward to use, one has to click a button to get a preview, but there is no button to return to the main dialog to do adjustments.

Then you should make an end to this problem, by modernizing the user interface (UI) of GTK's print dialog!

Investigate the workflow of the modern preview-centric print dialogs and also have a look into their code (the mentioned apps are all open source). Also have a look into the code base of GTK's print dialog. Then design a similar UI, with embedded preview for the print dialog and implement it in GTK.

Try to conserve the API between the application and the print dialog, so that the new print dialog can just replace old one in all applications. If this is not possible, try to keep the API additions a minimum, and for applications which are not (yet) adapted to the new print dialog, try to make as much as possible working in your print dialog (and as last resort display the old dialog).
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), GTK/GNOME developers, TBD
### Desired knowledge
 C, GTK/GNOME, UI Design
### Code License
 LGPL-2 or later and LGPL-2.1 or later
