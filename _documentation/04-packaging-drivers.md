---
title: Packaging Drivers and Release them to the Snap Store
toc: true
toc_sticky: true
h_range: [1,2]
---
**This document contains a complete tutorial as well as information for manufacturers along with examples for packaging printer/scanner drivers and releasing them to the Snap Store. If you are looking for information regarding the designing of printer/scanner drivers, kindly refer to <a href="../02-designing-printer-drivers/">Tutorial to Design Printer Drivers</a> and <a href="../03-designing-scanner-drivers/">Tutorial to Design Scanner Drivers</a> respectively.**  

<h2 id="introduction"> Introduction </h2>

After designing printer/scanner application, you need to distribute the applications, so that the users can directly download and install these applications to support the printers and scanners manufactured by your company. 

One of the most important concern while packaging driver is **Distribution-independent packaging**. The classical printer driver binaries were specifically built for linux distributions, because the distribution provides the layout of CUPS, the libraries and so on. Also they have different packaging formats DEB, RPM and many more.

For each distro drivers need to be built, packaged, and tested separately. This made the task next to impossible to execute. As a result most of the hardware manufacturers refrained in making these drivers.

But OpenPrinting has reduced the intensity of your task to an great extent as now you only need one driver for all printers, for all distributions and distribute it through **snaps**.  

<h2 id="snap"> Snaps </h2>

Snaps are app packages for desktop, cloud and IoT that are easy to install, secure, cross-platform and dependency-free. 

### Benefits of using snaps 

* A snap is a bundle of an app and its dependencies that works without modification across many different Linux distributions.

* Snaps are more secure. Every package with all its libraries and files in its own sandbox, fine-grained control for communication between packages.

* Snaps are easily discoverable and installable from the Snap Store, an app store with an audience of millions who can browse and install snaps graphically in the Snap Store or from the command-line.

You are encouraged to dive deep into the official <a href="https://snapcraft.io/docs">Snap Documentation</a> to explore more about it.

<h2 id="package"> Packaging Drivers </h2>

Most Snaps we create are driven using `snapcraft.yaml`. This file describes a snap’s build dependencies and run-time requirements, it integrates remote repositories and extensions, and runs custom scripts and hooks for better integration with CI systems.

As a distributer, you would create a `snapcraft.yaml` file and upload the same on Snap Store. When the user runs `snap install`, snapcraft will fetch and open the corressponding `snapcraft.yaml`, interpret it, figure out what to do and build your application.

<h2 id="snapcraft"> snapcraft.yaml </h2> 

<h2 id="template"> Template </h2>

    name: hp-printer-app
    base: core18
    version: '1.0'
    summary: HP Printer Application
    description: |
    HP Printer Application is a PAPPL (Printer Application Framework) based printer application
    to support hp printers.
    PAPPL is a simple C-based framework/library for developing CUPS
    Printer Applications, which are the recommended replacement for
    printer drivers.

    grade: stable
    confinement: strict

    apps:
        hp-printer-app:
            command: bin/hp-printer-app
            plugs: [avahi-observe, home, log-observe, network, network-bind, network-manager, raw-usb]

    parts:
        jpeglib:
            plugin: autotools
            source: https://www.ijg.org/files/jpegsrc.v9d.tar.gz
            source-type: tar

        pappl:
            plugin: autotools
            configflags: [--enable-libjpeg,--enable-libpng,--enable-libusb,--with-dnssd=avahi]
            source: https://github.com/michaelrsweet/pappl
            source-type: git
            build-packages: [libavahi-client-dev, libcups2-dev, libcupsimage2-dev, libgnutls28-dev, libjpeg-dev, libpam-dev, libpng-dev, libusb-1.0-0-dev, zlib1g-dev]
            stage-packages: [libavahi-client3, libcups2, libcupsimage2, libpng16-16, libusb-1.0-0]
            after: [jpeglib]

        hp-printer-app:
            plugin: make
            source: .
            after: [pappl]

<h2 id="release"> Releasing to Snap Store </h2>

Once you have a snap that works under strict or classic confinement, you’re ready to publish the snap in the Snap Store where it can be showcased to millions.

The further steps are extensively covered in the official documentation of Snaps and can be located at <a href="https://snapcraft.io/docs/releasing-to-the-snap-store">Releasing to Snap Documentation</a>.

<h2 id="resources"> Resources </h2>
[1] <a href="../02-designing-printer-drivers/">Tutorial to Design Printer Drivers</a>
<br>
[2] <a href="../03-designing-scanner-drivers/">Tutorial to Design Scanner Drivers</a>
<br>
[3] <a href="https://snapcraft.io/docs">Snap Documentation</a>
<br>
[4] <a href="https://snapcraft.io/docs/releasing-to-the-snap-store">Releasing to Snap Documentation</a>
<br>
[5] <a href="https://github.com/OpenPrinting/cups-snap">CUPS Snap</a>
<br>
[6] <a href="https://github.com/michaelrsweet/hp-printer-app">HP Printer App Example</a>