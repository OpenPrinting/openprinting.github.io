---
title: User Manual
toc: true
toc_sticky: true
h_range: [1,3]
---

**This document will be a user manual, containing information about installing drivers provided as Printer/Scanner Applications, installing the CUPS Snap, configuring and using Web Interface options and finally use the printer or scanner to print and scan respectively.**

## Introduction

The user is relieved from most of the complexities as compared to the manufacturer and OpenPrinting in this switch to new technology. They are just required to install the driver provided as a Printer/Scanner Application (based on the manufacturer and model) and use the same to get their devices working.

Further, many manufacturer's devices have options that cannot be translated into IPP attributes. So the users have the possibility to change their printer/scanner properties through the Web GUI provided with the Printer/Scanner Application.


## Installation

For installing Printer/Scanner Applications, you should have `snap` installed on your system. On many systems snap is already installed (for example Ubuntu), if not you can usually easily install it.

### Snap

To install `snap` from the Software Manager application, search for `snapd` and click Install.

Alternatively, `snapd` can be installed from the command line:

    sudo apt install snapd

### Applications

Once `snap` is installed, you can easily install any driver. Find the name of the application compatible with your device. This information will be provided by your device manufacturer. You can install the application browsing the Snap Store or from the command line:

    snap install <application-name>

<br>
*Note: Driver auto-installation i.e. when a printer on the system is discovered, the driver can be found on the Snap Store and even can be automatically installed using the hardware signature, is [under development](https://forum.snapcraft.io/t/hardware-associated-snaps-snap-store-search-by-hardware-signature/). We will update this work on our website as soon as this is completed. Until then you have to install drivers manually.*

Many interfaces are automatically connected when a snap is installed, and this ability is a property of either the interface itself, or the snap. Interfaces not connected automatically require the user to make a manual connection using the `snap connect` command.

    snap connect <snap>:<plug interface> <snap>:<slot interface>

Information regarding which interfaces require manual connection will be mentioned by the manufacturer.

## Web Interface

The embedded server can also provide a web interface to the Printer/Scanner Application, and PAPPL includes a standard web interface that can be customized and/or overridden. Aside from the usual status monitoring functionality, the web interface can be configured to allow remote users (with proper authentication) to:

* Create and delete printers

* Set the printer location and DNS-SD name

* Configure the loaded media

* Configure remote access accounts

* Configure networking settings such as the hostname 

* Update the TLS certificates used by the server

![Interface](../../assets/images/Web-Interface/interface.png)

___

### Create and Delete Printers

* **Create printers**

    Resource path: /addprinter

    ![Add Printer](../../assets/images/Web-Interface/addPrinter.png)

    Addition of printer requires only the following attributes:
    1. **Name** of the printer
    2. **Device** can be one from the following:
        * Label Printer
        * Office Printer
        * Network Printer

        The choices here vary with the Printer Application and the available printer devices. Usually here you will see printers which were discovered on your system, both local (USB and also manufacturer-specific or legacy connection types) and network printers. ideally only the ones actually supported by this Printer Application. Sometimes also manual options, like "Network Printer" with the possibility to eneter a host name/IP in the next field, are available, too.

    3. **Hostname/IP Address** of the printer required only in the case of Network Printer.
    4. **Driver Name** needs to be selected from the available list of drivers provided by the manufacturer.

<br />
* **Delete printers**

    Resource path: /\<printer_name\>/delete

    This option can be exercised by pressing the delete button on the right side of the name of the printer, followed by pressing button of confirmation.

___

### View Logs

Resource path: /logs

![Logs](../../assets/images/Web-Interface/logs.png)

The complete system logs can be viewed here. If you prefer to read the txt file instead, use the resource path: /logfile.txt.

___

### Update the TLS certificates

Following are the options that can be used to update the Transport Layer Security (TLS) certificates used by the server:

1. **Create New TLS Certificate**

    Resource path: /tls-new-crt

    ![Create New TLS Certificate](../../assets/images/Web-Interface/create_TLS_Certificate.png)

    This form creates a new 'self-signed' TLS certificate for secure printing. Self-signed certificates are not automatically trusted by web browsers.


2. **Create TLS Certificate Request**

    Resource path: /tls-new-csr

    ![Create TLS Certificate](../../assets/images/Web-Interface/create_TLS.png)
    
    This form creates a certificate signing request ('CSR') that you can send to a Certificate Authority ('CA') to obtain a trusted TLS certificate. The private key is saved separately for use with the certificate you get from the CA.


3. **Install TLS Certificate**

    Resource path: /tls-install-crt

    ![TLS Install](../../assets/images/Web-Interface/install_TLS.png)

    This form will install a trusted TLS certificate you have obtained from a Certificate Authority ('CA'). Once installed, it will be used immediately.

___

### Configure Priting Defaults

* **Printing**

    Resource path: /\<printer_name\>/printing

    ![Printing Defaults](../../assets/images/Web-Interface/printing_defaults.png)

    Many manufacturer's devices have options that cannot be translated into IPP attributes. So the web interface provides the possibility to set up these options.

    The printing defaults are automatically fetched for each job and the user is not required to pass them each and every time using the command-line.

* **Media**

    Resource path: /\<printer_name\>/media

    ![Media Config](../../assets/images/Web-Interface/media_config.png)

    You can use this segment to configure the loaded media including the size, offset and rolls.

___

### Set Location and DNS-SD name

Resource path: /config

![Config](../../assets/images/Web-Interface/config.png)

___

### Configure Networking Settings

* **Networking**

    Resource path: /network

    ![Networking](../../assets/images/Web-Interface/networking.png)

    The option can be used to configure networking settings such as the hostname and also to see the list of interfaces/addresses. 

* **Security**

    Resource path: /security
    
    ![Security](../../assets/images/Web-Interface/security.png)

    You may use this option for setting the access password.

___

### Printer Specific Utilities

Apart from configuring printing defaults for the printer, these are the other printer specific utilities.

1. **Supplies** (*Only avilable for Office Printers*)

    Resource path: /\<printer_name\>/supplies

    ![Supplies](../../assets/images/Web-Interface/supplies.png)

    This utility helps the user to know the remaining supplies of different inks in the cartridge(s) of the printer.

2. **Identify Printers**

    This option supports printer identification, usually a sound or a light on the printer, which is a requirement for IPP Everywhere™ and is used to visually or audibly isolate a particular printer for the user.

3. **Print Test Page**

    This option helps in testing printer functionality, by issuing a print command for a sample test page. 
