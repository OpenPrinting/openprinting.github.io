---
title: "Contribute"
layout: splash
permalink: /contribute/
header:
    overlay_color: "#616161"
    overlay_filter: "1"
excerpt: "Helping the Advance of Linux Printing"
---
## HELP!
You can contribute to Openprinting by plenty of ways, so programming knowledge is not required. You can help with any of the following:
* [Data](#data)
* [Bug Reports](#bugs)
* [User Support](#support)
* [Programming](#programming)
* [Money, Hardware, Events,...](#otherstuff)

### DATA<a name="data"></a>


As a user of a certain printer model, please post your experience in the “User Notes” section of your printers' page. Please tell with which driver and which option settings your printer works best, what is supported and what not, whether you use Foomatic or another setup infrastructure. Tell also whether the information in the printer's entry is correct (recommended driver, drivers which support the printer, comments, etc). Please report bugs in the entries also on our [forums](http://www.openprinting.org/forums.cgi).

If your printer is not listed yet, simply add it by clicking the appropriate links on the [printer listings](http://www.openprinting.org/printer_list.cgi) pages or the “Add similar printer” link on a printer entry page of a similar printer. The latter way saves you from a lot of typing as most fields get pre-filled. But be careful to change everything what is different on the new printer. Especially the auto-detection data you should obtain from the actual printer (see instructions on the printer input page).

Or go directly to the [add printer form](http://www.openprinting.org/edit_printer.cgi?newentry=1).

Also reporting that a printer does not work at all is important for us, users should be warned before they buy a “Paperweight”.

Please try to make a complete and correct report; entering wrong or unreproducible data will more confuse than help.

Developers might even attempt provide complete XML files. Downloading and installing the [Foomatic packages](https://wiki.linuxfoundation.org/openprinting/database/foomatic) gives an environment for testing. Refer to the format description in the end of the [README of the foomatic-db-engine package](http://www.openprinting.org/foomatic-db-engine/README). Do also the needed changes in driver and option XML files and generate a patch to our Bazaar repositories. See the [instructions for contributors](https://wiki.linuxfoundation.org/openprinting/database/instructionsforcontributors).

If you're really ambitious, you could go through a printer manufacturer's web site and tabulate data in XML for all current models.

If you have discovered a free software driver which is not listed, please tell us (in the driver comment field and also on the [forums]()) the driver's home page. If the driver is not available for download any more, please send us the newest source package of it which you can get, so that we can re-host this driver. Please also tell us all your experiences, special tricks, which printers does it support, and how to use the driver. Also here providing XML data as described in the README of the foomatic-db-engine package is welcome. If you generate the XML files with scripts, please send us the scripts, too.

You have developed or plan to develop a driver? Then please put it under a free software license and make it available for download (we can host it for you, if needed). Consider also using the OpenPrinting Vector, CUPS Raster, and IJS interfaces to connect your driver to GhostScript and under no circumstances patch it into GhostScript. This way users can easily add the driver to their systems. Include also a generator for PPDs and/or Foomatic data into your driver's source package, so that users can easily set up printer queues with your driver. This also makes it easier for us to list your driver on our site and for distributions to support your driver. Consult the README of the foomatic-db-engine package to obtain the necessary Foomatic background knowledge.

If you are a printer manufacturer, test your printers to find which ones work with free software, or provide free software drivers. Ideally, provide Foomatic data and/or PPDs for your printers and drivers. This will lead to useful listings of your printers in the support database and good reports on the Vendor Info and Suggested Printers pages.


### Bug Reports<a name="bugs"></a>


Please post also all kinds of bug reports of our web site and Foomatic on the appropriate [forums](http://forums.openprinting.org/), ideally in the LF OpenPrinting Site Support.

Please do not report only “I cannot print” or “Foomatic does not work”. Try to investigate as best you can what the origin of the problem is. Read the documentation of your distribution, your printing system, Foomatic, this web site, GhostScript, the driver, the CUPS printing tutorial, … Read the Foomatic database entry pages of the printer and the driver, check through the [forums](http://forums.openprinting.org/) and their [archives](http://www.openprinting.org/cgi-bin/mailman/listinfo). Check your printing system's log files, check whether all kernel modules are loaded, check whether you can print by entering the GhostScript command line manually or by sending a text or PostScript directly to the printer device. You can also try to surround the printing system by trying to print [without spooler](https://wiki.linuxfoundation.org/openprinting/database/nospoolerdocumentation).

Turn on the debug modes of your printing software, for example the `LogLevel` setting in the `/etc/cups/cupsd.conf` file of CUPS. In `foomatic-rip`, the universal filter script of Foomatic, you can turn on the debug mode by editing the script replacing the `my $debug = 0;` line by `my $debug = 1;`. This debug mode leads to a log file named `/tmp/foomatic-rip.log` and to the PostScript as sent to the renderer (usually GhostScript or the built-in interpreter of a PostScript printer) in `/tmp/foomatic-rip.ps`.

When you post your report, tell exactly which distribution (“Mandriva 2007”, “SuSE 10.1”, but not “Linux 7.2”), which printer model, which driver, which option settings, and which printer port you are using. Make also your log files and configuration files, the output of “lsmod”, “lpstat”, “lpq”, and other diagnostic commands available, and also the file which you tried to print.


### User Support<a name="support"></a>


Do you have knowledge and experience with printing using free software? Then please help the users on this very complicated subject. The users post their questions on the [forums](http://forums.openprinting.org/)     of this site. So read all the forums (also of other printer brands then yours, because some questions turn out not to be model-specific) and help the users with your answers.

The most difficult questions we face are distribution-specific questions (we collectively know Mandriva, Ubuntu, Debian, Red Hat, and SuSE); also questions about Windows and Mac interoperability are often puzzlers.


### Programming<a name="programming"></a>


Documentation about the database structure, the Perl API, and how the software works, you find in the README files of the [foomatic-db-engine](http://www.openprinting.org/foomatic-db-engine/README) and the [foomatic-filters](http://www.openprinting.org/foomatic-filters/README) packages. Detailed info about Foomatic 2.0.x you can find in the tutorial chapter [Foomatic from the Developer's View: How does Foomatic work?](http://www.openprinting.org/kpfeifle/LinuxKongress2002/Tutorial/IV.Foomatic-Developer/IV.tutorial-handout-foomatic-development.html) ([PDF](http://www.openprinting.org/kpfeifle/LinuxKongress2002/Tutorial/IV.Foomatic-Developer/IV.Foomatic-Developer.pdf)). Most of this applies also to Foomatic 3.0.x. 

Here are some documents about the former Foomatic 2.0: The [roadmap](http://www.openprinting.org/pipermail/foomatic-devel/2001q1/000073.html), and Till's original ideas for [Foomatic 2.0 listed in his announcement of version 1.9](http://www.openprinting.org/pipermail/foomatic-devel/2002q2/000753.html).

Here is our current TODO list (This list can be considered as an RFC, a “Request For Comments”, please comment, suggest, discuss on the [Foomatic development mailing list](http://lists.linux-foundation.org/mailman/listinfo/printing-foomatic), see also [some ideas and sketches of implementation](http://www.openprinting.org/Foomatic-Devel-Ideas.txt)): 


-   More documentation for developers, especially about the XML database format so that contribution of data gets easier.
Support for conflicts of option settings (as Duplex on transparencies).

-   Add CUPS-1.2-specific keywords to numerical and string options in the PPD files so that these options are fully accessible also from the web interface of CUPS 1.2 or other CUPS-1.2-specific frontends. CUPS 1.2 has native support for numerical and string options.

-   Multiple-language PPD file generation (see CUPS 1.2 documentation and CUPS DDK).
Option for the output of the version number for Foomatic command line tools, esp. foomatic-rip 

-   For every option foomatic-rip should also be able to handle `KDEPrint-<option>=<value>`, as when the user enters an option/value pair under “Options»”/“Additional Tags” in kprinter, `KDEPrint-<option>=<value>` is added to the CUPS command line by some KDE versions.

-   Rewrite foomatic-rip in C, to get it faster. (forum thread)[http://forums.linuxfoundation.org/read.php?34,109]

-   Write testing scripts for foomatic-rip, for LSB 3.2 and for regression testing

-   UPDF file generation (UPDF is candidate to replace PPDs in the future)

-   Make hard disk space occupation and package size of the manufacturer-supplied PPD files smaller by having them compressed in a more efficient way than individual gzipping and 
uncompressing them with the CUPS 1.2 on-the-fly PPD generation feature (See [Ubuntu bug #39847](https://launchpad.net/bugs/39847)). This is especially interesting for live CDs (Ubuntu, Mandriva, Knoppix).

-   Support for “PickMany” options (enumerated choice options where more than one item can be chosen). This option type is defined in the Adobe specs for PPD files.

-   Categorize options in “Standard” and “Advanced” option groups, so that the most important options appear in the main dialog and advanced options in an extra dialog.

-   Foomatic data for the [gs2hbp](http://sourceforge.net/projects/hbp-for-brother/) driver to make Brother printers print in host-based mode where all their features including PIN-protected printing and HQ1200 (2400×660 dpi) work (see also [this forum thread](http://forums.linuxfoundation.org/read.php?24,106)). DONE in the ["hl7x0" driver entry](http://www.openprinting.org/show_driver.cgi?driver=hl7x0).

-   A "tiff" driver entry for TIFF printers (GhostScript has a built-in TIFF output device).

-   PPDs to make [hp4laser](http://home.mn.rr.com/richardsons/sw/hp4laser/) script working with CUPS/foomatic-rip, as it supports the “paging” mode of the printer which   allows to use high resolutions with low memory in the printer (See the user comment [on this page](http://www.openprinting.org/show_printer.cgi?recnum=HP-LaserJet_3P_w_PCL5) and [this forum posting](http://forums.linuxfoundation.org/read.php?20,92)).

-   PPDs for HP DesignJets with CUPS DDK and its HP driver (that driver supports the DesignJets, only the PPDs are missing).

-   Drivers for “Paperweights” [(Documentation about printer languages and protocols)](http://www.undocprint.org/).

So there is a lot to do, if you want to participate, or suggest something which is not listed, please post on the [Foomatic development mailing list](http://lists.linux-foundation.org/mailman/listinfo/printing-foomatic) and use the current [Bazaar snapshot](http://bzr.openprinting.org/) as base for your development [(Instructions for submitting changes via Bazaar)](https://wiki.linuxfoundation.org/openprinting/database/instructionsforcontributors). The README files of Foomatic, especially of the [foomatic-db-engine](http://www.openprinting.org/foomatic-db-engine/README) and the [foomatic-filters](http://www.openprinting.org/foomatic-filters/README) packages, explain the data structure, the Perl API, how `foomatic-rip` works, and more. Happy hacking! 



### Money, Hardware, Events,...<a name="otherstuff"></a>


In case that you want to help funding our work, get an [LF member](https://www.linuxfoundation.org/about/join) or sponsor events like for example the [Printing Summits and LF OpenPrinting meetings](https://wiki.linuxfoundation.org/openprinting/meetinginfo) (travel/accommodation for attendees, catering, …). We are also grateful for invitations to get to free software events, congresses, and fairs. Publicity is very important for us to get more contributors. Please contact us.

If you want to donate hardware (printers, network print boxes, …), please go to the [forums](http://forums.openprinting.org/) and post your intention (or send a private message to Till via the forum interface), or in case of a printer for which free drivers are under development, contact the authors of the driver (Go to the [printer's page](http://www.openprinting.org/printer_list.cgi), follow the link to the driver and then the link to the driver's home page). We will also help you getting in contact with the driver authors. If your printer is a “Paperweight”, and you have already bought/plan to buy a [better one](https://www.linuxfoundation.org/node/add/wiki?gids[]=2721), do not throw away your old printer, inform us and we might be able get it to someone who can make it work.
