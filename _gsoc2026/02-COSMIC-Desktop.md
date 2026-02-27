---
title: "COSMIC Desktop: Printer setup tool and print dialog"
---
### Introduction
2 (perhaps 3) contributors full-size (350 hours), Level of difficulty: Hard

[COSMIC](https://system76.com/cosmic) is a desktop environment completely written in Rust. Rust is memory-safe and with this we expect much more stability and robustness, and less potential security vulnerabilities.

COSMIC as the standard desktop of the [Pop!_OS](https://pop.system76.com/) operating system which comes on [System 76](https://system76.com/) laptops. It is meant as a complete, feature-rich desktop, like KDE and GNOME are. and its development is happening really quickly (but one needs to take into account that it gets the momentum of a hardware vendor).

As COSMIC seems to want to be the third "big player" with KDE and GNOME, it will also need solid printing support, and for this OpenPrinting is working together with the COSMIC developers at System 76.

First, we need a printer setup tool. as in GNOME and KDE it will most probably be embedded in the settings application, as one of its modules. It will need to support CUPS 3.x right from the beginning, as it does not take long any more to the first stable release of the new CUPS. This means, that we need to show IPP print destinations in the main view, grouped by the hardware device they come from, and with buttons to open the device's web admin interfaces. The "Add printer" part has to find non-driverless (legacy or specialty) printers and associate Printer Applications to them.

Second, we need a print dialog, to be used by desktop applications written in Rust, using libcosmic and also for the print dialog to be popped up by the desktop when an app prints through the XDG Desktop Portal. This dialog should use the Common Print Dialog Backends (CPDB), so that it does not need to be changed on future changes in CUPS or when some cloud printing service gets available.

One contributor will work on the print dialog and another on the printer setup tool. For the latter we can also have 2 contributors, one of the main view and the other on the "Add Printer" part.

The contributors will be guided by developers and designers from System 76 to get the correct, streamlined GUI for COSMIC and by mentors from OpenPrinting for the CUPS and CPDB end.

The whole software is to be written in Rust, to integrate in COSMIC which is by itself written in Rust.

Rust bindings for the needed OpenPrinting libraries are already in place, written in last year's GSoC: [libcups](https://github.com/Gmin2/cups-rs), [cpdb-libs](https://github.com/TitikshaBansal/cpdb-rs)
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Michael Murphy, COSMIC developer at System 76 (michael at mmurphy dot dev), Mintu Gogoi, creator of the Rust bindings for libcups (mintugogoi567 at gmail dot com), Titiksha Bansal, creator of the Rust bindings for cpdb-libs (titikshabansal0209 at gmail dot com), COSMIC developers TBD
### Desired knowledge
 Rust, CUPS, desktop programming
### Code License
 GPL-3+ (GPL 3 or any later version)
