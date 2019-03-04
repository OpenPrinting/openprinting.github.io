--- 
title:  Workflow Of Driverless Printing
---
<h2>The workflow of driverless printing is always the same-: </h2>

<ol>
    <li><p align="justify">The printer advertises itself by DNS-SD, with a summary of its most important capability information (especially also its PDLs and a one-line-string super summary in case of AirPrint printers) in its DNS-SD record.</p></li>
    <li>Clients find these printers via DNS-SD.</li>
    <li><p align="justify">The client polls the full capabilities info from the printer sending a get-printer-attributes IPP request. The printer returns a long list of info, especially paper sizes and types, unprintable margins, resolutions, input trays, finishers, quality settings, all user-settable options etc..</p></li>
    <li><p align="justify">CUPS or cups-browsed on the client generate PPD files from this info and create print queues for each printer.</p></li>
    <li><p align="justify">The print dialogs of the applications show the printers and allow access to all the user-settable options.</p></li>
    <li><p align="justify">The user prints a job. The PDF from the application is turned into one of the PDLs which the printer supports by cups-filters. The settings selected by the user are passed along with the job as IPP attributes.</p></li>
    <li><p align="justify">The printer prints the job and thanks to IPP the status can be observed, toner levels and any errors can get reported to the client.</p></li>
    <li><p align="justify">If the printer is shut down, its queue will get automatically removed. So no clutter of print queues as souvenir of all the networks you have visited.</p></li>
</ol>
