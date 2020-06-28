---
title: IPP scan (or virtual MF device) server (Scanner Application)
---
The Printer Working Group (PWG) has also taken multi-function devices into account, devices which offer printer and scanner in one unit. For that they also have added IPP Scan, a driverless scanning standard for the scanners in IPP network multi-function devices.
As IPP is already used by the operating systems for many years via CUPS, we also want to use it as scanning standard in the operating system, to easily integrate network multi-function devices and also for sandboxed packaging of scanner drivers. For this we emulate an IPP scanner, having a so-called Scanner Application, or even Printer/Scanner Applications being a driver for a whole multi-function device.
Here we will discuss the transition from SANE-based scanning to IPP-based scanning in the operating system environment.

IPPScan is an extension of the existing IPP protocol to facilitate driverless scanning. 
Currently, to scan in linux, a user has to procure the device specific SANE driver and then use a command line or a GUI based application that communicates with that scanner using this driver. An IPPScan enabled scanner would be able to communicate and transfer standard files (pdf/jpeg) with a daemon running on the client, thus eliminating the need of scanner specific drivers. However, currently there are no such scanners enabled in the market. 
This application attempts to remedy this situation by emulating IPPScan versions of ordinary scanners. This is beneficial as we move all the drivers to the central scan service rather than keeping a copy of each driver on each client and this also enables the sandboxed packaging of scanner drivers. The added benefits of a central service also include authentication and effective administration of scanners in a large enterprise setting.

