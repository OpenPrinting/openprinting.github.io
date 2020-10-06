---
title: Printer Applications - A new way to print in Linux
---

Ever wondered how a Printer works? What are the different steps involved between the print command and the final output?

The following document contains information about the history of printing and its evolution. It describes Printer Applications. What were the issues with the previous methodologies? How Printer Applications helped in solving them? Why it has been referred to as the "Technology for Future"? In the end, it also contains roles of different entities including OpenPrinting, Manufacturers, and the User.  

<div id="table-of-content" markdown="1">

__Table of Contents__


1. **[Brief History](#brief-history)**
2. **[What is a Printer Application?](#printer-application)**
3. **[Advantages of Printer Applications](#advantages)**
4. **[Roles and Responsiblities](#roles)**
5. **[Resources](#resources)**
</div>


<h2 id="brief-history"> Brief History </h2>
The first release of CUPS was back in 1997. <sup><a href="https://openprinting.github.io/How-did-this-all-begin/">[1]</a></sup> Since then, Printer Drivers consisted of **PPD files** and **CUPS filters**.

**PPD (PostScript Printer Description)** is a decades-old data format created by Adobe, probably together with PostScript or shortly after, to describe capabilities and user-settable options of PostScript printers and which PostScript commands to embed in the print job to execute the option settings.

**PPD files** describe the printer's capabilities and which filters to use to produce the data format needed by the printer.

This format was adopted because in that time printing under Linux and Unix worked via **PostScript**. Applications sent jobs in PostScript which could be understood by PostScript printers. It allowed users to use all PostScript printers directly. The system supports printers, the user uses printers.

**CUPS** made the move from built-in printer drivers in Ghostscript to CUPS filters, with the help of the CUPS Raster device-independent print raster format. CUPS raster drivers used **PPD files** because it used **Ghostscript** or (on IRIX) **Impressario** (a version of Adobe's PostScript interpreter) to produce raster data for printing, and they could use embedded PostScript commands to control page size, colour space, etc.  Since both PostScript and raster printers could then use PPD files, Michael Sweet adopted PPD as a common printer description format, which also got used for his company's ESP Print Pro (GUI) software and then later macOS and GNOME/KDE. CUPS provides reserved directories to drop these **PPD files** and **filters** into, so adding a printer driver was rather easy.

Nowadays applications send jobs in PDF and CUPS does the **PDF-centric** processing, already for 8 years, since the first release of cups-filters back in 2012. So PPD files do not really fit in the picture anymore, and they also had their shortcomings, especially being rather unflexible in the possible types of user-settable options. Also, the need to drop filters and PPDs into reserved directories of CUPS makes it difficult to provide CUPS and printer drivers in sandboxed packages, like **Snaps**.

Already several years ago, mainly due to the advent of smartphones and the desire to also print from these devices, printers got equipped with **driverless IPP** printing functionality: [AirPrint](https://support.apple.com/en-in/HT201311)(released in 2010), IPP Everywhere, [Mopria](https://mopria.org/), Wi-Fi Direct Print. These standards are practically all the same, the printer advertises its presence, its network address, and basic capabilities via DNS-SD (aka BonJour, mDNS, zero-conf, implemented with Avahi in Linux), accepts communication and jobs from clients via **IPP (Internet Printing Protocol)**, from the [Printer Working Group](http://www.pwg.org/), supplies complete capability info to clients via IPP and uses only common Page Description Languages (PDLs) for jobs: PDF, Apple Raster, PWG Raster, PCLm.


<h2 id="printer-application">What is a Printer Application?</h2>
    
A **Printer Application** is a background service, a GUI application, etc. that happens to respond to HTTP and IPP requests. It detects the supported printers and advertises those printers on the localhost as an IPP Everywhere printer. It can also listen on network interfaces (i.e. not just localhost) so provide access to a printer to all client devices on a network. Printer Applications are the recommended architecture for printer drivers.

The Printer Application emulates a driverless IPP printer, so that the printing system does not need to distinguish, it simply needs to support driverless IPP printers. This way we add support for non-driverless printers and avoid deprecated and inconvenient methods, like using PPD (Postscript Printer Description) files on non-PostScript printers but also allow sandboxed packaging which allows providing OS-distribution-independent driver packages and improves security.

In a **sandboxed package**, we cannot modify directory contents once it is built. Our system is no more modular. We cannot choose which printer driver package to install. Printer Applications address this problem of modularity and give us the same freedom as in the case of printer drivers.

A **Printer Application's Web Interface** provides configurability and makes it more accessible to the user. Instead of the web interface, one can also use the standard interface IPP System Service. This allows defining configurable parameters that a device-independent client can poll from the IPP server and display in a GUI so that the user can change them appropriate to his needs. It allows creation and deletion of printers, viewing active and completed jobs, cancellation of job/jobs, configuring the loaded media and network settings, requesting software updates, etc. The underlying mechanism involves adding custom pages and contents using callbacks, static resources, or external files and directories.


<h2 id="advantages">Advantages of Printer Applications</h2>
<ul>
<li> <strong>One Driver for one Manufacturer</strong> Earlier, there were different PPD files for different Printers from the same Manufacturer. Printer Application solve this problem, reducing the manufacturer's effort by just maintaining a single Printer Application Driver.</li>
<br>
<li> <strong>Usability</strong> Users are enabled to directly install and configure CUPS and Printer Application Drivers by just a few simple steps. They do not require to manually drop the PPD files in reserved directories and hence make the process less error-prone. Also, they just need to have a single Printer Application Driver for different printers from the same manufacturer.</li>
<br>
<li> <strong>Easy Configuration</strong> Printer Applications also provide a Web Interface to easily configure Printer's Capabilities, helping people who were earlier unaware to change properties of a Printer in PPD files and were forced to pass the same printing options through the Command line, every time.</li>
<br>
<li> <strong>Good Bye PPD!</strong> PPD files which were earlier used to describe the printer's capabilities and which filters to use to produce the data format needed by the printer are not required by Printer Application.</li>
<br>
<li> <strong>Diversified Nature</strong> Printer Applications have a lot in common. Therefore Michael Sweet has created PAPPL, a library that provides all the common functionality which is needed in every Printer Application. However, the manufacturer is expected to write the drivers on their own (using PAPPL) and defining functions like identifying the start of the page, the start of a line, etc, leading to Printer Application's Diversified Nature.</li>
<br>
<li> <strong>Technology for Future</strong> As we know, Linux is moving to sandboxed packaging (Snap for example) and printing is also moving in that direction. In a sandboxed package, we cannot modify directory contents once it is built. Our system is no more modular. We cannot choose which printer driver package to install. Printer Applications address this problem of modularity and give us the same freedom as in the case of printer drivers. </li>
</ul>

<h2 id="roles">Roles and Responsiblities</h2>


![printerapp (1)](https://user-images.githubusercontent.com/43112419/87853120-229e6400-c925-11ea-89b4-a0dbcfdb9b49.jpg)

<h3>OpenPrinting</h3>
<ul>
<li><strong>CUPS Snap <sup><a href="https://github.com/OpenPrinting/cups-snap">[2]</a></sup></strong> This is a complete printing stack in a Snap. It contains not only CUPS but also cups-filters, Ghostscript, and Poppler. It is everything which is required for printing, except Printer Drivers. Till Kamppeter has created this in order to provide a complete printing stack for a purely Snap-based Operating System.</li>
<br>
<li><strong>PAPPL <sup><a href="https://github.com/michaelrsweet/pappl/">[3]</a></sup></strong> Printer Applications have a lot in common. It would be a lot of re-inventing the wheel if everyone who wants to create a printer driver has to implement all this. Therefore Michael Sweet has created PAPPL, a library which provides all the common functionality which is needed in every Printer Application.</li>
<br>
<li><strong>Web Interface</strong> Printer Applications also provide a Web Interface to easily configure Printer's Capabilities. This GUI helps people who were unaware to change printer properties directly in PPD files and were forced to pass the similar printing options through Command line, each and every time.</li>
<br>
<li><strong>Providing Sufficient Guidance</strong> OpenPrinting also helps the manufacturer about designing of printer <sup> <a href="../02-designing-printer-drivers/">[4]</a></sup> and scanner drivers.<sup><a href="../03-designing-scanner-drivers/">[5]</a></sup> It also guides them about packaging those drivers and uploading on Snap Store. <sup> <a href="../04-packaging-drivers/">[6]</a></sup>  It also educated users about using Printer Application Drivers. It provides neccessary documentation and tutorial for all the above mentioned things.<sup> <a href="../05-User-Manual/">[7]</a></sup></li>
</ul>
 
<h3>Manufacturer</h3>
The Manufacturer besides manufacturing Printers and Scanners, is also expected to design drivers for the same. They can use PAPPL<sup><a href="https://github.com/michaelrsweet/pappl/">[3]</a></sup> library which certainly reduces their task to an great extent. Also they could take help from the documentation and tutorial developed by the OpenPrinting team. <sup> <a href="../02-designing-printer-drivers/">[4]</a></sup> 
<sup> <a href="../03-designing-scanner-drivers/">[5]</a></sup>  

After designing the drivers, they need to package them and Upload it to Snap Store. Again, documentation and tutorial for the same have developed by the OpenPrinting team which could be referred.<sup> <a href="../04-packaging-drivers/">[6]</a></sup> 


<h3>User</h3>
The user is relieved from most of the complexities and is just required to install CUPS and Printer Application Driver (based on the manufacturer). 

Further, he has the option to change his printer properties through the Web GUI provided with Printer Application.

The OpenPrintring team has also worked out documentation and tutorials about installing CUPS and Drivers and using Web-based GUI, making the switch to this new technology easier for all.<sup> <a href="../05-User-Manual/">[7]</a></sup>

<h2 id="resources">Resources</h2>
<ul>

[1] <a href="https://openprinting.github.io/How-did-this-all-begin/">How all this began</a>
<br>
[2] <a href="https://github.com/OpenPrinting/cups-snap">CUPS Snap</a>
<br>
[3] <a href="https://github.com/michaelrsweet/pappl/">PAPPL</a>
<br>
[4] <a href="../02-designing-printer-drivers/">Tutorial to Design Printer Drivers</a>
<br>
[5] <a href="../03-designing-scanner-drivers/">Tutorial to Design Scanner Drivers</a>
<br>
[6] <a href="../04-packaging-drivers/">Packaging Drivers and Uploading them to Snap Store</a>
<br>
[7] <a href="../05-User-Manual/">User Manual</a>

</ul>

