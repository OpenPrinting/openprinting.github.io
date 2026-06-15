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
