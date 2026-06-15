---
title: "GNOME Control Center: List and handle IPP print services for the New Architecture"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Hard

Modern printing on Linux is centered around driverless IPP printers and Printer Applications. Instead of managing traditional queue-centric workflows, desktop tooling now needs to discover, group, and manage IPP print services in a way that matches the new printing architecture.

This project extended GNOME Control Center to better support that model. The work focused on presenting driverless IPP printers and Printer Applications cleanly inside the desktop printer settings experience, improving service discovery behavior, and reducing duplicate entries.

### Project Goals

* Add support for the new OpenPrinting architecture in GNOME Control Center.
* Improve discovery and grouping of driverless IPP printers and Printer Applications.
* Resolve duplicate printer listings and make the UI more intuitive.
* Prepare the work for upstream integration in newer GNOME Control Center releases.

### Current Outcome

The project was completed successfully in GSoC 2025. The resulting work finalized the new printing architecture support for GNOME Control Center, including an upstream merge request for GCC 50 and a discovery update from `cupsGetDests()` to `cupsEnumDests()` to avoid duplicate printer entries.

### Mentors

Till Kamppeter, Shivam Mishra, Mohit Verma

### Desired knowledge

C/C++, GTK, DNS-SD/Avahi, CUPS/IPP

### Code License

GPL-2+ and LGPL-2+

### Links

* [GSoC Archive Project Page](https://summerofcode.withgoogle.com/archive/2025/projects/PTiuC47E)
* [Final Report](https://medium.com/@kaushik.vishwakarma2003/gsoc-2025-thelinuxfoundation-advancing-printer-management-in-gnome-control-center-c36a1ce8ae07)
* [GCC Merge Request](https://gitlab.gnome.org/GNOME/gnome-control-center/-/merge_requests/3226)
