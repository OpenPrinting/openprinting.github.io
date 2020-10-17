---
title: Packaging Drivers and Release them to the Snap Store
toc: true
toc_sticky: true
h_range: [1,3]
---
**This document contains a complete tutorial as well as information for manufacturers with examples for packaging printer/scanner drivers and releasing them to the Snap Store. If you are looking for information regarding the designing of printer/scanner drivers, kindly refer to <a href="../02-designing-printer-drivers/">Tutorial to Design Printer Drivers</a> and <a href="../03-designing-scanner-drivers/">Tutorial to Design Scanner Drivers</a> respectively.**  

<h2 id="introduction"> Introduction </h2>

After designing the printer/scanner application, you need to distribute these applications, so that the users can directly download and install these applications to support the printers and scanners manufactured by your company. 

One of the primary concerns while packaging the driver is **Distribution-independent packaging**.  The classical printer driver binaries were specifically built for Linux distributions because the distribution provides the layout of CUPS, the libraries, and so on. Also, they have different packaging formats DEB, RPM, and many more.

For each distro, drivers need to be built, packaged, and tested separately. It made the task next to impossible to execute. As a result, most of the hardware manufacturers refrained from making these drivers.

But OpenPrinting has reduced the intensity of your task to a great extent as now you only need one driver for all printers, for all distributions, and distribute it through **snaps**.  

<h2 id="snap"> Snaps </h2>

Snaps are app packages for desktop, cloud, and IoT that are easy to install, secure, cross-platform and dependency-free. 

### Benefits of using snaps 

* A snap is a bundle of an app and its dependencies that works without modification across many different Linux distributions.

* Snaps are more secure. Every package with all its libraries and files in its own sandbox(isolated from other snaps and the host system), fine-grained control for communication between packages.

* Snaps are easily discoverable and installable from the Snap Store, an app store with an audience of millions who can browse and install snaps graphically in the Snap Store or from the command-line.

You are encouraged to dive deep into the official <a href="https://snapcraft.io/docs">Snap Documentation</a> to explore more about it.

<h2 id="package"> Packaging Drivers </h2>

Most Snaps we create are driven using `snapcraft.yaml`. This file describes a snap’s build dependencies and run-time requirements, it integrates remote repositories and extensions and runs custom scripts and hooks for better integration with CI systems.

As a distributor, you would create a `snapcraft.yaml` file and upload the same on Snap Store. When the user runs `snap install`, snapcraft will fetch and open the corresponding `snapcraft.yaml`, interpret it, figure out what to do, and build your application.

To start building your snap, the initial step is to install snapcraft. Kindly refer the <a href="https://snapcraft.io/docs/installing-snapcraft">installation guidelines</a> to follow the same.

After installation, navigate to the directory containing your application and use the following command.

    snapcraft init

This creates a buildable `snapcraft.yaml` template within a snap sub-directory relative to your current filesystem location. 

<h2 id="snapcraft"> The snapcraft.yaml format </h2> 

The `snapcraft.yaml` file starts with a small amount of human-readable metadata. This data is used in the presentation of your app in the Snap Store. The former keys define the build dependencies and run-time requirements.

### **Top Level metadata**

* **name** 
<br>This is the identifying name of the snap. It must start with an ASCII character and can only contain letters in lower case, numbers, and hyphens, and it can’t start or end with a hyphen. The name must be unique if you want to publish it to the Snap Store.

    In this field, you may wish to use the name of your organization along the part it is designed for. 
    
        name: hp-printer-app
    
    For help on choosing a name and registering it on the Snap Store, see <a href="https://snapcraft.io/docs/registering-your-app-name">Registering your app name</a>.

___

* **base**
<br>The base keyword declares which base snap to use with your project. A base snap is a special kind of snap that provides a run-time environment alongside a minimal set of libraries that are common to most applications:

        base: core18

    As used above, core18 is the current standard base for snap building and is based on Ubuntu 18.04 LTS.

    See <a href="https://snapcraft.io/docs/base-snaps">Base snaps</a> for more details.

___

* **version**
<br>A human-readable string(enclosed within single-quotes) of maximum size 32 characters, represents the version number of your snap. A higher version number generally corresponds to a new application. 

        version: '1.0'

___

* **summary**
<br>A single line summary that maybe 79 characters long, describes the snap in short and simple terms. It is used when users are searching through the Store for your application.

        summary: HP Printer Application

___

* **description**
<br>Description is used to provide a little more detail about your application. You could as many lines as you want in this field.

        description: |
            HP Printer Application is a PAPPL (Printer Application Framework) based printer application
            to support hp printers.
            PAPPL is a simple C-based framework/library for developing CUPS
            Printer Applications, which are the recommended replacement for
            printer drivers.

___

* **grade**
<br> Grade defines the quality grade of the snap. It can have two values.
    
    * **devel**: a development version of the snap, so as not to be published to the stable or candidate channels.

    * **stable**: a stable release or release candidate, which can be released to all channels.

    We would be using the grade value as stable.

        grade: stable

___

* **confinement**
<br>Confinement determines if the snap should be restricted in access or not. It could have three possible values.

    * **strict**: for no access outside of declared interfaces through plugs. Can be published easily and installed without any special command-line argument.
    
    * **devmode**: for unrestricted access to system resources. Snaps having this confinement cannot be published to Snap Store.
    
    * **classic**: Allows access to your system’s resources in much the same way traditional packages do. To safeguard against abuse, publishing a classic snap requires manual approval, and installation requires the --classic command-line argument.

    We would be using the confinement value as strict.

        confinement: strict

___

There are other metadata that could be used to provide more information to snapcraft besides the above-listed ones. One may refer to <a href="https://snapcraft.io/docs/snapcraft-top-level-metadata">Snapcraft top-level format documentation</a> to know about these.

___

### **Apps Metadata**
The `apps` keys and values in `snapcraft.yaml` detail the applications and services that a snap wants to expose, including how they’re executed and which resources they can access.
 
Each application or service is an independent block, defined by a `<app-name>` and corresponding combinations of keys and values. These are some of the keys that could be used.

* **command**
<br>The command to run inside the snap when `<app-name>` is invoked.
<br>
In most of the applications, command will be: `bin/<app-name>`. 

* **daemon**
<br>Declares that <app-name> is a system daemon.

* **plugs**
<br>A list of plugs for <a href="https://snapcraft.io/docs/interface-management">interfaces</a> to connect to. 

There other snapcraft `apps` metadata may be referred from <a href='https://snapcraft.io/docs/snapcraft-app-and-service-metadata'>Snapcraft Apps Metadata Documentation</a>.

A most basic example for writing `apps` metadata is given below: 

    apps:
        hp-printer-app:
            command: bin/hp-printer-app
            plugs: [avahi-observe, home, log-observe, network, network-bind, network-manager, raw-usb]

Note that you must specify the `<snap-name>` same as `<app-name>` so that it can be invoked by just specifying the `<app-name>`. However, if they differ, the program will be exposed as `<snap-name>.<app-name>`. 

___

### **Parts Metadata**
The most important part of the snap, that declares build dependencies and run-time requirements that will be pulled into your snap package. The `parts` key and value in `snapcraft.yaml` detail how `parts` are configured and built by the snapcraft.

Each `part` is an independent building block, defined by a name and corresponding combinations of keys and values. These are some of the keys that could be used.

* **plugin**
<br>The plugin that will drive the build-process for this `part`.

* **source**
<br>A URL or path to a source tree to build. This can be a local path or remote and can refer to a directory tree, a compressed archive, or a revision control repository.

* **source-type**
<br>Used when the type of `source` entry cannot be detected.

* **build-packages**
<br>A list of packages required to build a snap.

* **stage-packages**
<br>A list of packages required at runtime by a snap.

* **after**
<br>Ensures that all the `parts` listed in after are staged before this `part` begins its lifecycle.

These are only a few `parts` metadata that is must be used in a printer/scanner application. The other metadata can be referred from <a href="https://snapcraft.io/docs/snapcraft-parts-metadata">Snapcraft parts documentation</a>.

Your Application will contain at least these 3 `parts`:
* PAPPL dependency (jpeglib)
* PAPPL
* Application

Other `parts` includes additional dependencies if needed by your application.

**Default Parts for Application**
<br>These `parts` must be included in every application. They do not require modification and the developers may consider using it as boilerplate code for their applications.

1. JPEGLIB

    PAPPL supports `JPEG` and `PNG` format and for loading the image data, it uses the `jpeglib` library. Hence it is a dependency for PAPPL and built using the `autotool` plugin. The Tape Archive (TAR) file can be fetched from the below-mentioned URL.

        jpeglib:
            plugin: autotools
            source: https://www.ijg.org/files/jpegsrc.v9d.tar.gz
            source-type: tar


2. PAPPL

    It is the most important part of an application and is also built using the `autotool` plugin. It is fetched from Michael's GitHub repository using the "git" source-type. The build-packages and stage-packages are mentioned below.

    *Note the `after` key is essential as `jpeglib` is a building dependency for PAPPL. Hence PAPPL must be staged after `jpeglib`.*

        pappl:
            plugin: autotools
            configflags: [--enable-libjpeg,--enable-libpng,--enable-libusb,--with-dnssd=avahi]
            source: https://github.com/michaelrsweet/pappl
            source-type: git
            build-packages: [libavahi-client-dev, libcups2-dev, libcupsimage2-dev, libgnutls28-dev, libjpeg-dev, libpam-dev, libpng-dev, libusb-1.0-0-dev, zlib1g-dev]
            stage-packages: [libavahi-client3, libcups2, libcupsimage2, libpng16-16, libusb-1.0-0]
            after: [jpeglib]

<br>

**Non-Default Parts for Application**

1. Application Dependency (Optional)

    Your application may use different libraries / Utilities / APIs, for example, the ones used for converting one format of data to another format, especially in the case of non-raster printers. In this case, those libraries are a dependency for the application, which needs to be specified in the `parts` section.

2. Application

    The core of the snap.

    *Note that the application has a dependency on libraries as well as PAPPL. Hence don't forget to add the `after` key so that the application must be staged at the last.*
 

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