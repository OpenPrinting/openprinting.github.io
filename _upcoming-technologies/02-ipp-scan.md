---
title: IPP scan (or virtual MF device) server (Scanner Application)
---
The Printer Working Group (PWG) has also taken multi-function devices into account, devices which offer printer and scanner in one unit. For that they also have added IPP Scan, a driverless scanning standard for the scanners in IPP network multi-function devices.
As IPP is already used by the operating systems for many years via CUPS, we also want to use it as scanning standard in the operating system, to easily integrate network multi-function devices and also for sandboxed packaging of scanner drivers. For this we emulate an IPP scanner, having a so-called Scanner Application, or even Printer/Scanner Applications being a driver for a whole multi-function device.
Here we will discuss the transition from SANE-based scanning to IPP-based scanning in the operating system environment.