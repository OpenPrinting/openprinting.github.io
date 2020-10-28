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


## Installation

For installing Printer/Scanner Applications, you should have `snap` installed on your system.

### Snap

To install `snap` from the Software Manager application, search for `snapd` and click Install.

Alternatively, `snapd` can be installed from the command line:

    sudo apt install snapd

### Applications

Once `snap` is installed, you can easily install any driver. Find the name of the application compatible with your device. This information will be provided by your device manufacturer. You can install the application from the command line:

    snap install <application-name>

<br>
*Note: Driver auto-installation i.e. when a printer on the system is discovered, the driver can be found on the Snap Store and even can be automatically installed using the hardware signature, is under development. We will update this work on our website as soon as this is completed. Until then you have to install drivers manually.*

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

![Webp net-resizeimage (1)](https://user-images.githubusercontent.com/43112419/97160934-1850f900-17a3-11eb-93cd-fe881c5816b7.png)

___

### Create and Delete Printers

* **Create printers**

    Resource path: /addprinter

    ![Webp net-resizeimage (4)](https://user-images.githubusercontent.com/43112419/97161428-d2e0fb80-17a3-11eb-856b-b56752f4995e.png)

    Addition of printer requires only the following attributes:
    1. **Name** of the printer
    2. **Device** can be one from the following:
        * [Label Printer](https://en.wikipedia.org/wiki/Label_printer)
        * Office Printer
        * [Network Printer](https://www.computerhope.com/jargon/n/netwprin.htm#:~:text=A%20network%20printer%20is%20a,to%20a%20single%2C%20dedicated%20computer.)
    3. **Hostname/IP Address** of the printer required only in the case of Network Printer.
    4. **Driver Name** needs to be selected from the available list of drivers provided by the manufacturer.

<br />
* **Delete printers**

    Resource path: /\<printer_name\>/delete

    This option can be exercised by pressing the delete button on the right side of the name of the printer, followed by pressing button of confirmation.

___

### View Logs

Resource path: /logs

![Webp net-resizeimage](https://user-images.githubusercontent.com/43112419/97160724-c7d99b80-17a2-11eb-8986-eb0b34733147.png)

The complete system logs can be viewed here. If you prefer to read the txt file instead, use the resource path: /logfile.txt.

___

### Update the TLS certificates

Following are the options that can be used to update the Transport Layer Security (TLS) certificates used by the server:

1. **Create New TLS Certificate**

    Resource path: /tls-new-crt

    ![Webp net-resizeimage (7)](https://user-images.githubusercontent.com/43112419/97260304-adef9580-1842-11eb-860b-d30552b9a5cd.png)

    This form creates a new 'self-signed' TLS certificate for secure printing. Self-signed certificates are not automatically trusted by web browsers.


2. **Create TLS Certificate Request**

    Resource path: /tls-new-csr

    ![Webp net-resizeimage (8)](https://user-images.githubusercontent.com/43112419/97261055-07a48f80-1844-11eb-94cb-3ac1443853bb.png)
    
    This form creates a certificate signing request ('CSR') that you can send to a Certificate Authority ('CA') to obtain a trusted TLS certificate. The private key is saved separately for use with the certificate you get from the CA.


3. **Install TLS Certificate**

    Resource path: /tls-install-crt

    ![Webp net-resizeimage (5)](https://user-images.githubusercontent.com/43112419/97259946-efcc0c00-1841-11eb-936d-6f9159d184ac.png)

    This form will install a trusted TLS certificate you have obtained from a Certificate Authority ('CA'). Once installed, it will be used immediately.

___

### Configure Priting Defaults

* **Printing**

    Resource path: /\<printer_name\>/printing

    ![Webp net-resizeimage (10)](https://user-images.githubusercontent.com/43112419/97261802-9c5bbd00-1845-11eb-9618-5907372c0755.png)

    Many manufacturers have options that cannot be translated into IPP attributes. So web interface provides the option to set up these options in this segment.

    The printing defaults are automatically fetched for each job and user is not required to pass them each and every time using the command-line.

* **Media**

    Resource path: /\<printer_name\>/media

    ![Webp net-resizeimage (9)](https://user-images.githubusercontent.com/43112419/97261806-a087da80-1845-11eb-8bb9-b189f4f4553f.png)

    You can use this segment to configure the loaded media including the size, offset and rolls.

___

### Set Location and DNS-SD name

Resource path: /config

![Webp net-resizeimage (13)](https://user-images.githubusercontent.com/43112419/97453115-70326000-195b-11eb-98e0-f7083ed4e1e7.png)

___

### Configure Networking Settings

* **Networking**

    Resource path: /network

    ![Webp net-resizeimage (14)](https://user-images.githubusercontent.com/43112419/97453631-ef279880-195b-11eb-819a-e24f2c7820ee.png)

    The option can be used to configure networking settings such as the hostname and also see the list of interfaces/addresses. 

* **Security**

    Resource path: /security
    
    ![Webp net-resizeimage (15)](https://user-images.githubusercontent.com/43112419/97453648-f2bb1f80-195b-11eb-8a60-b5ff358123d2.png)

    You may use this option for setting access password.

___

### Printer Specific Utilities

Apart form configuring printing defaults for the printer, these are the other printer specific utilities.

1. **Supplies** (*Only avilable for Office Printers*)

    Resource path: /\<printer_name\>/supplies

    ![Webp net-resizeimage (11)](https://user-images.githubusercontent.com/43112419/97263666-7e905700-1849-11eb-9f26-f326abb4fcb4.png)

    This utility helps the user to know the remaining supplies of different inks in the cartridge of Office Printers.

2. **Identify Printers**

    This option supports printer identification, usually a sound or a light on the printer, which is a requirement for IPP Everywhere™ and is used to visually or audibly isolate a particular printer for the user.

3. **Print Test Page**

    This option helps in testing printer functionality, by issuing a print command for a sample test page. 
