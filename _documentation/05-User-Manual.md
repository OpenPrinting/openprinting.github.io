---
title: User Manual
toc: true
toc_sticky: true
h_range: [1,3]
---

**This document will be a user manual, containing information about installing drivers provided as Printer/Scanner Applications, installing the CUPS Snap, configuring and using Web Interface options, and finally use the printer or scanner to print and scan respectively.**

## Introduction

The user is relieved from most of the complexities as compared to the manufacturer and OpenPrinting in this switch to new technology. They are just required to install the driver provided as a Printer/Scanner Application (based on the manufacturer and model) and use the same to get their devices working.

Further, many manufacturer's devices have options that cannot be translated into IPP attributes. So the users can change their printer/scanner properties through the Web GUI provided with the Printer/Scanner Application.


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

Many interfaces are automatically connected when a snap is installed, and this ability is a property of either the interface itself or the snap. Interfaces not connected automatically require the user to make a manual connection using the `snap connect` command.

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

    The addition of a printer requires only the following attributes:
    1. **Name** of the printer
    2. **Device** can be one of the following:
        * Label Printer
        * Office Printer
        * Network Printer

        The choices here vary with the Printer Application and the available printer devices. Usually, here you will see printers which were discovered on your system, both local (USB and also manufacturer-specific or legacy connection types) and network printers. ideally only the ones supported by this Printer Application. Sometimes also manual options, like "Network Printer" with the possibility to enter a hostname/IP in the next field, are available, too.

    3. **Hostname/IP Address** of the printer required only in the case of a Network Printer.
    4. **Driver Name** needs to be selected from the available list of drivers provided by the manufacturer.

<br />
* **Delete printers**

    Resource path: /\<printer_name\>/delete

    This option can be exercised by pressing the delete button on the right side of the name of the printer, followed by pressing the button of confirmation.

___

### View Logs

Resource path: /logs

![Logs](../../assets/images/Web-Interface/logs.png)

The complete system logs can be viewed here. If you prefer to read the text file instead, use the resource path: /logfile.txt.

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

### Configure Printing Defaults

* **Printing**

    Resource path: /\<printer_name\>/printing

    ![Printing Defaults](../../assets/images/Web-Interface/printing_defaults.png)

    Many manufacturer's devices have options that cannot be translated into IPP attributes. So the web interface provides the possibility to set up these options.

    The printing defaults are automatically fetched for each job and the user is not required to pass them each time using the command-line.

* **Media**

    Resource path: /\<printer_name\>/media

    ![Media Config](../../assets/images/Web-Interface/media_config.png)

    You can use this segment to configure the loaded media including the size, offset, and rolls.

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

Apart from configuring printing defaults for the printer, these are the other printer-specific utilities.

1. **Supplies** (*Only available for Office Printers*)

    Resource path: /\<printer_name\>/supplies

    ![Supplies](../../assets/images/Web-Interface/supplies.png)

    This utility helps the user to know the remaining supplies of different inks in the cartridge(s) of the printer.

2. **Identify Printers**

    This option supports printer identification, usually a sound or a light on the printer, which is a requirement for IPP Everywhere™ and is used to visually or audibly isolate a particular printer for the user.

3. **Print Test Page**

    This option helps in testing printer functionality, by issuing a print command for a sample test page. 

## Working with Command-Line

Before start working with your device, you must know about the capabilities of your printer/scanner by viewing the set of sub-commands and options supported by your printer/scanner. For retrieving this information, you need to pass the `--help` argument:

    <application-name> --help

The default list of sub-commands and options available with all applications is shown below.

```c
Usage: <application-name> SUB-COMMAND [OPTIONS] [FILENAME]
    <application-name> [OPTIONS] [FILENAME]
    <application-name> [OPTIONS] -

Sub-commands:
add PRINTER      Add a printer.
cancel           Cancel one or more jobs.
default          Set the default printer.
delete           Delete a printer.
devices          List devices.
drivers          List drivers.
jobs             List jobs.
modify           Modify a printer.
options          List printer options.
printers         List printers.
server           Run a server.
shutdown         Shutdown a running server.
status           Show server/printer/job status.
submit           Submit a file for printing.

Options:
-a               Cancel all jobs (cancel).
-d PRINTER       Specify printer.
-j JOB-ID        Specify job ID (cancel).
-m DRIVER-NAME   Specify driver (add/modify).
-n COPIES        Specify number of copies (submit).
-o NAME=VALUE    Specify option (add,modify,server,submit).
-u URI           Specify ipp: or ipps: printer/server.
-v DEVICE-URI    Specify socket: or usb: device (add/modify).
```

*Note: Printer Application can have additional sub-commands. You can get the information about them using the `--help` argument.*

### Server Daemon

* **Start Server**
    <br>Before adding devices and submitting jobs, you must start the application as a server daemon:

        <application-name> server [-o <NAME>=<VALUE>]

    The list of options you could use are:

    | Option          | Significance         |
    |-----------------|----------------------|
    | spool-directory | Spool directory      |
    | log-file        | Log File             |
    | server-hostname | Hostname             |
    | log-level       | Log Level            |
    | server-port     | Port                 |
    | admin-group     | Administrative Group |

* **Close Server**
    <br>You can close the daemon using the following command:

        <application-name> shutdown

___

### Devices

* **Adding Device**
    
    Add a printer queue. The following fields are required to be mentioned for creating a printer queue:

    1. Device name
    2. Device URI
    3. Driver Name
    4. Default Options (Optional)
    
            <application-name> add -d <DEVICE_NAME> -m <DRIVER-NAME> -v <DEVICE-URI> [-o <NAME>=<VALUE>]

    You can obtain the possible list of `<DRIVER-NAME>` values via the call with the `drivers` sub-command:

        <application-name> drivers

    You can also obtain the possible list of `<DEVICE-URI>` values via the call with the `devices` sub-command:

        <application-name> devices

* **Setting Default Device**
    
    Get/Set the default the printer queue. The default device is used when the device is not inputted along with the job. 

    * Get the Default Device

            <application-name> default

    * Set the Default Device

            <application-name> default -d <DEVICE_NAME>

* **Modifying Printer**

    Modify a printer queue by changing the following fields:

    1. Device URI
    2. Driver Name
    3. Default Options

            <application-name> modify -d <DEVICE_NAME> [-m <DRIVER-NAME>] [-v <DEVICE-URI>] [-o <NAME> = <VALUE>]

* **Deleting Device**

    Delete a printer queue.

        <application-name> delete -d <DEVICE_NAME>

___

### Handling Jobs

* **Submit Jobs**

    Submit a file for printing.

        <application-name> submit <FILE> [-n <COPIES>] [-o <NAME> = <VALUE>]

* **Cancel Jobs**
    
    * All jobs

            <application-name> cancel -a

    * Specific Job

            <application-name> cancel -j <JOB-ID>

___

### Other Utilities 

* **List devices**

    List the connected printers.

        <application-name> devices

* **List drivers**

    List the supported drivers.

        <application-name> drivers

* **List jobs**

    List pending print jobs.

        <application-name> jobs

* **List printer options**

    List the supported options.

        <application-name> options

* **List printers**

    List the printer queues.

        <application-name> printers

* **Status**

    Show server/printer/job status.

        <application-name> status

## Resources

[1] <a href="../01-printer-application/">Printer Application</a>
<br>
[2] <a href="https://snapcraft.io/docs">Snap Documentation</a>
<br>
[3] <a href="https://github.com/OpenPrinting/ps-printer-app/blob/master/README.md">PS Printer App README</a>
<br>
[4] <a href="https://github.com/michaelrsweet/hp-printer-app/blob/master/hp-printer-app.1">HP Printer App Man Page</a>
<br>
[5] <a href="https://github.com/michaelrsweet/pappl/tree/master/doc">PAPPL Documentation</a>
