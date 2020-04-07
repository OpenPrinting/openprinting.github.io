---
title: "Support for IPP Fax Out"
---

### Introduction
<p>
Modern network multi-function devices (printer, scanner, fax) provide driverless operation (meaning no device/model-specific software or data is needed to use them). The device advertises itself on the network via <abbr title="Domain Name System">DNS</abbr>-SD providing a summary of its features and capabilities. Then a client can access the device using standard HTTP and IPP protocols to poll detailed capability info to be able to use the device and do the actual operation with the same communication protocols and standardized data formats for the images scanned or to be printed.
</p>

<p>
Current Linux distributions already support the printing part via IPP and there is also already upstream code for scanning via AirScan (eSCL) to appear in the distributions soon and the open IPP Scan standard is subject of another project in this GSoC. Also the standard for device configuration (IPP System Service) is subject of other projects in this GSoC list.
</p>

<p>
What is missing is IPP Fax out. This is a standard, very similar to driverless IPP printing for sending faxes. Principally sending a fax can be done by printing a file to a special destination in the device, accompanied with a phone number (required) and some fax-specific options (like how to proceed on failure or cover sheets, …) as IPP attributes.
</p>

<p>
One can easily determine whether a device supports this and poll all needed capabilities. The <abbr title="Domain Name System">DNS</abbr>-SD record of the device&#039;s printing part (“_ipp._tcp”) does not report only the <abbr title="Uniform Resource Identifier">URI</abbr> extension for printing (“rp=ipp/print”) but also for fax (“rfo=ipp/faxout”, no extra <abbr title="Domain Name System">DNS</abbr>-SD record!). If there is such an entry one can poll the <abbr title="Uniform Resource Identifier">URI</abbr> “ipp://host:port/ipp/faxout” with a get-printer-attributes IPP request as it was a printer, and one gets the capabilities for the device-internal fax destination. The “driverless” utility of cups-filters happily generates a PPD from this, but naturally without fax-specific options, and if you create a CUPS queue with this <abbr title="Uniform Resource Identifier">URI</abbr> and PPD and print a file with “lp -d queue -o phone=0012345678 file” the device will fax the file to the given number. The feature is commonly available in modern devices and I have actually tested it as described here.
</p>

<p>
The student&#039;s task here is to make this functionality easily accessible for users of common desktop Linux distributions. Like printers, faxes should automatically appear on the system and get available in print dialogs and if one prints to a fax, fax-specific options should also appear in the print dialog and the user should be able to pick phone numbers also from contacts.
</p>

<p>
This can be done by expanding existing resources and creating new ones in the printing stack. Especially one should think here abour the Common Print Dialog Backends (CPDB), but also other projects, like cups-filters would perhaps need changes.
</p>

### Mentors
<p>
Nilanjana Lodh, first implementor of the CPDB  (nilanjanalodh at gmail dot com), Dongxu Li (dongxuli2011 at gmail dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired knowledge
<p>
C/C++ programming, CUPS, IPP
</p>

### Licenses
<p>
MIT, Apache, <abbr title="GNU General Public License">GPL</abbr> 2+
</p>