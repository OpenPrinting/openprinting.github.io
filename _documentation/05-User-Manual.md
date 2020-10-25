---
title: User Manual
toc: true
toc_sticky: true
h_range: [1,3]
---

**This document will be an user manual, containing information about installing printer/scanner application drivers, installing CUPS-Snap, configuring and using Web Interface options and finally use the printer or scanner to print and scan respectively.**

## Introduction

The user is relieved from most of the complexities as compared to the manufacturer and OpenPrinting in this switch to new technology. They are just required to install Printer/Scanner Application Driver (based on the manufacturer and model) and use the same to get their devices working.

Further, many manufacturers have options that cannot be translated into IPP attributes. So the users have the option to change their printer/scanner properties through the Web GUI provided with Printer/Scanner Application.


## Installing Applications

For installing Printer/Scanner Applications, you should have `snap` installed on your system.

To install `snap` from the Software Manager application, search for `snapd` and click Install.

Alternatively, `snapd` can be installed from the command line:

    sudo apt install snapd

Once `snap` is installed, you can easily install any driver with ease. Find the name of the application compatible with your device. This information will be provided by your device manufacturer. You can install the application from the command line using the command:

    snap install <application-name>


*Note: Driver auto-installation i.e. when a printer on the system is discovered, the driver can be found on the Snap Store and even can be automatically installed using the hardware signature, is under development. We will update this work on our website as soon as this is completed. Until then you have to install drivers manually.*
