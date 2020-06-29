---
title: Printer Applications - A new way to print in Linux
---
Most modern general-purpose printers are IPP printers that allow driverless printing. They advertise themselves via DNS-SD, clients can poll the capability information of them via IPP requests, and they use standard data formats for print jobs. Printers not providing this functionality, usually legacy or specialty printers need a printer driver.

A Printer Application is a daemon that detects the supported printers and advertises those printers on the localhost as an IPP Everywhere printer. Printer Applications are the recommended architecture for printer drivers.

The Printer Application emulates a driverless IPP printer, so that the printing system does not need to distinguish, it simply needs to support driverless IPP printers. This way we add support for non-driverless printers and avoid deprecated and inconvenient methods, like using PPD (Postscript Printer Description) files on non-PostScript printers but also allow sandboxed packaging which allows providing OS-distribution-independent driver packages and improves security.

In a sandboxed package, we cannot modify directory contents once it is built. 
Our system is no more modular. We cannot choose which printer driver package to install. Printer Applications address this problem of modularity and give us the same freedom as in the case of printer drivers.

A Printer Application's web Interface provides configurability and makes it more accessible to the user. Instead of the web interface, one can also use the standard interface IPP System Service. This allows to define configurable parameters which a device-independent client can poll from the IPP server and display in a GUI so that the user can change them appropriate to his needs. It allows creation and deletion of printers, viewing active and completed jobs, cancellation of job/jobs, configuring the loaded media and network settings, requesting software updates, etc. The underlying mechanism involves adding custom pages and contents using callbacks, static resources, or external files and directories.

Problems:

1. Some old drivers are now unmaintained. So PPD files might be needed to support those. Therefore we need retro-fitting Printer Applications here, which wrap the driver's PPD files and filters.
2. The CUPS API, frequently used in Printer Applications, is currently not actively developed by Apple, so Feature requests bug reports do not get answered. This often requires to work around bugs and shortcomings.

Feel free to discuss in the comments.
