---
title: "ipp-usb"
---
ipp-usb is a daemon that enables the use of IPP-over-USB class USB devices, so
that USB-connected printers and multi-function devices can be used with the same
driverless ("IPP Everywhere") protocols as network IPP devices.

The IPP-over-USB standard was ratified by the USB forum in 2012. ipp-usb makes
the device's IPP service available over a local network socket on `localhost`,
which lets CUPS, applications, and scanning software talk to a USB device exactly
as if it were a driverless network printer or scanner.

ipp-usb is the actively maintained successor to the now-discontinued ippusbxd. It
is written in Go and has become the standard component for IPP-over-USB support
on modern Linux distributions.

ipp-usb has the following advantages:

1. Exposes the full driverless capabilities of the device, including IPP
   Everywhere printing and eSCL ("AirScan") scanning, over USB.
2. Advertises the device on `localhost` via DNS-SD so it is discovered
   automatically by CUPS and scanning frontends.
3. Handles the multiple simultaneous HTTP connections that IPP-over-USB requires.
4. Integrates cleanly with systemd and udev for automatic, on-demand startup.
5. Ships with sane defaults and a simple configuration file.

### Project Links

* <a href="https://github.com/OpenPrinting/ipp-usb" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub
  	</a>
