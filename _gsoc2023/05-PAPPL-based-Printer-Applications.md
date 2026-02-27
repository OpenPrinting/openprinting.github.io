---
title: "PAPPL-based Printer Applications: Option setting presets via web interface"
---

### Introduction

1 contributor full-size (350 hours).

Generally, Printer Applications as emulation of driverless IPP printers only support standard IPP job attributes as user-settable options: media size/type/source, duplex, printer-resolution, print-quality, print-content-optimize, ... but some drivers, like for example Gutenprint or also PostScript printers, have many options to fine-tune the printout and those cannot get individually mapped to IPP options so that the user can control them in a print dialog. Also many print dialogs, especially of phones, are limited to standard IPP attributes.

So what we want to add is to have a preset functionality in PAPPL. On an extra web interface page you can create and edit any number of named presets.

On this page you can create, copy, edit, and delete presets.

You see a list of the existing presets, each with buttons for copy, edit, and delete. At the top you see the create button.

If you click on the create button, you will get on the page for editing a preset.

This page contains a field for the preset's name at the top, being empty if you are creating a new preset. You enter the desired name, only with a valid name you can save your preset.

Under that you see the same options as on the "Printing Defaults" page, both the IPP standard attributes and the vendor options, but in the choices for each option is an extra one "Do not set" to not include this setting in the preset. This is chosen by default in a newly created preset. The rest of the choices are the ones which there are also under "Printing Defaults" but with the choice which is the current default under "Printing Defaults" having " (current default)" added, to ease the orientation for the user. To define the preset, the user chooses the settings for the desired attributes/options and leaves the attributes/options they do not to include in the template on "Do not set". If the user edits the name of the preset, it gets renamed. Then the user clicks on "Save" to save the preset. This brings them back to the list view, with the new preset in the list.

The user can for example create a "photo" preset choosing photo paper, 4x6 size, and high print quality, or a "draft" preset choosing recycled paper and draft print quality. With Gutenprint they could fine-tune a lot of knobs for each paper type, photo style, ... and quickly get back to all their preferred settings by choosing the right template.

The user-defined presets are made available to the client (print dialog, or better CUPS backend of the Common Print Dialog Backends, CPDB) by the "job-presets-supported" entry in the answer to the "get-printer-attributes" IPP request and so we get an option to select a preset in the print dialogs and the client (print dialog, CPDB backend) adds the settings described in the preset to the job.

This, I think, is the best way to cope with printer drivers which have extended settings not mappable to standard IPP attributes, especially for complex drivers like Gutenprint, but also for the retro-fitting Printer Applications as the PPD files (treated by pappl-retrofit) always have non-standard options which end up as vendor options in a PAPPL-based Printer Application, not mapped to standard IPP options.

This project should be implemented in [PAPPL](https://github.com/michaelrsweet/pappl/) and not in [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/), as the problem occurs for both native (developed from scratch) and retro-fitting Printer Applications (retro-fitting a classic CUPS driver with PPD files into a Printer Application). One can easily see it when one takes the (retro-fitting) [Gutenprint Printer Application](https://github.com/OpenPrinting/gutenprint-printer-app). See also the screenshot of the "Printing Defaults" page in the [Snap Store listing](https://snapcraft.io/gutenprint-printer-app). And this will not change when we turn Gutenprint into a native Printer Application (see below).

This was already considered in the discussion during earlier work on the Gutenprint Printer Application.

For the user experience with Gutenprint this preset feature would be even more important than the switchover to a native Printer Application.

  * [IPP Driver Replacement Extensions v2.0](https://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippnodriver20-20221027.pdf)
  * [Description of "job-presets" attribute](https://ftp.pwg.org/pub/pwg/ipp/registrations/reg-ipppreset-20171214.odt)
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Michael Sweet, author of CUPS and PAPPL (msweet at msweet dot org), TBD
### Desired knowledge
 `C`, PAPPL, CUPS
### Code License
 Apache 2.0
