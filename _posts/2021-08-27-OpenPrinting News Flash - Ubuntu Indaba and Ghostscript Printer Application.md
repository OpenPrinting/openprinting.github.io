---
title: OpenPrinting News Flash - Ubuntu Indaba, Ghostscript Printer Application, and the Special Ubuntu 21.10 Feature
layout: single
author: Till
excerpt: Ubuntu Indaba with Michael Sweet and me, Recording on YouTube, Ghostscript Printer Application, Ubuntu 21.10 IPP Printing
---
## The first News Flash
A lot of new things to talk about, so I do not want tolet you wait until the September News Post here. So here we go, the first News Flash between the months!


## The Ubuntu Desktop Indabas and OpenPrinting - The Recording
Today's episode of the monthly Ubuntu Indabas was all about printing, with Michael Sweet (author of CUPS an PAPPL, one of the founders of IPP) and me as speakers, as announced 2 weeks ago [here in the August news](/OpenPrinting-News-August-2021/) and on the [Ubuntu Discourse](https://discourse.ubuntu.com/t/announcing-the-ubuntu-desktop-team-indaba-ama-august-27-2021-5pm-utc/).

The Ubuntu Indabas are live events to present features of Ubuntu Linux to the users and give them the possibilty to ask questions to the developers.

The event got streamed live on YouTube and Twitch, both with live chat.

**And here is the [recording on YouTube](https://www.youtube.com/watch?v=P22DOu_ahBo)!**

Michael Sweet and me, we gave an insight into the history of printing with free software operating systems like Linux, how we slipped into the printing world and made [CUPS](https://github.com/OpenPrinting/cups) the standard printing environment of most non-Windows operating systems (principally Linux and Mac OS).

Then we showed how CUPS is working for 21 years now, using the PPD file concept whose development by Adobe stopped in 1984(!) (George Orwell, why did you not tell us that it is over with PPDs?).

We revealed that the death of the PPD file is near and CUPS will switch to a new PPD-less architecture, continuing in pure IPP.

After that we told how CUPS is working with modern, driverless IPP printers and how we emulate driverless IPP printers with Printer Applications so that non-driverless printers can also print on the CUPS of the future, not using PPD files and being encapsulated in a sandbox (like a Snap), where no filters or other files can be added.

Thanks a lot to Michael Sweet for the participation, providing a lot of valuable background information, Heather Ellsworth of the Canonical/Ubuntu Desktop team for organizing and presenting the show, creating the [info graphics of the print workflows](https://github.com/hellsworth/IPP-stack-flowcharts) (with Inkscape), Monica Ayhens-Madon, Canonical/Ubuntu community lead, also for organizing and presenting, and Rhys Davies, also from the Canonical/Ubuntu Desktop team as broadcast director.

Next live event: [OpenPrinting Micro-Conference on the Linux Plumbers 2021](https://www.linuxplumbersconf.org/event/11/page/104-accepted-microconferences#cont-print) on [Sep, 20](https://www.linuxplumbersconf.org/event/11/page/105-microconferences)


## Ghostscript Printer Application
**[Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app) in the [Snap Store](https://snapcraft.io/ghostscript-printer-app), more than ?? installations via Snap Store**

Freshly uploaded to the GitHub and to the Snap Store today, less than 24 hours ago (therefore no "incidence numbers" as for the other Snaps in my monthly news posts) we have the second Printer Application which retro-fits classic CUPS drivers now: The Ghostscript Printer Application!

If you want to use an (older) printer which is not a modern driverless IPP printer and is also not a PostScript printer (which would be supported by the [PostScript Printer Application](https://snapcraft.io/ps-printer-app) then) Then this is the right Printer Application for you.
 
It supports ~5000 different printer models, mainly with drivers from the well-known [Ghostscript](http://www.ghostscript.com/) but also some others. The printer model support is based on OpenPrinting's [printer support database (Foomatic)](http://www.openprinting.org/printers/). Especially many standard laser (PCL 6/XL, PCL 5c/e, PCL4) and dot matrix (ESC/P, OKI, IBM, ...) but also many printers with proprietary print data formats are supported. There are not only model-specific entries to choose from, but also generic entries for the common formats for the case your printer is not explicitly listed.

The Printer Application gives access to all the options of the former PPD files inside its web interface ("Device Settings", "Media", "Printing Defaults" but can be easily used from any IPP-compliant client application or device. The standard IPP attributes are automatically converted to the best-fitting PPD option settings, espoecially for color, quality, and content optimization.

These drivers already ship for many years with most common Linux distributions (Ubuntu, Debian, Fedora, SUSE, ...) and have made many user's printers work and these printers will continue to work in environments where only Printer Applications (and no classic printer driver packages) are supported.

This Printer Application and the [PostScript Printer Application](https://github.com/OpenPrinting/ps-printer-app/) have a lot in common and share most of their code. Therefore I have continued the development of the code of the PostScript Printer Application by generalizing it for any type of classic CUPS printer driver and put it up on the OpenPrinting GitHub on Monday this week as the [PAPPL Retro-Fit Library](https://github.com/OpenPrinting/pappl-retrofit). This library will also be the start of several other CUPS driver retro fits making all the drivers from the last (even more than) 21 years available for the new all-IPP, PPD-less printing architecture. 21 years ago I migrated all printer drivers into CUPS, now I am migrating them into the next architecture.


## Ubuntu 21.10 (Impish Indri) - The Special Feature
Right before [Feature Freeze](https://discourse.ubuntu.com/t/impish-indri-release-schedule/) of Ubuntu 21.10 I came to the idea to improve the printing experience on it by porting the algorithm to convert standard IPP attributes of print jobs into the best-fitting PPD option settings from my CUPS driver retro-fit work right into CUPS.

Michael Sweet has already thought about the mapping of the IPP attributes `print-color mode` (settings `color` and `monochrome`) and `print-quality` (settings `draft` (3), `normal` (4), and `high` (5)) to PPD option settings and introduced a PPD file extension, the so-called "presets" for this. The creators of PPD files were supposed to add 6 presets, 1 for each combination of these two IPP attributes and each preset containing one or more PPD option settings as key/value pairs. If a job is received by CUPS with said IPP attributes set, CUPS sets the option settings of the appropriate preset. I have tested that and it actually works.

Problem is that there are ~10000 PPD files and none of them has such presets defined. What to do? Let a student edit all these files? That is modern slavery. So I created an algorithm to automatically generate presets, based on the names of the options and the choices (fortunately they are in human-understandable English) and the PostScript or PJL code embedded in the PPD files to control the printing resolution. This I evaluate whether and how much it enhances or lowers the print quality and whether it sets the output to color or monochrome, resultinmg in PPD option settings for the 6 presets.

And I did not stop here, I added preset support also for the `print-content-optimize` (settings `auto`, `text`, `graphics`, `text-and-graphics`, `photo`) IPP attribute.

I did this in libppd in cups-filters (upcoming 2.x) which is a copy of all PPD-related functions of libcups, to keep the retro-fitted printer drivers in Printer Applications working when CUPS does away with PPD files. This way the Printer Applications which are retro-fitting printer drivers with PPD files automatically apply the best-fitting PPD option settings according to the IPP attributes a job comes with, giving always the best possible printing results even if the user has a client which does not know about PPDs and/or CUPS' APIs to poll the queue's PPD options. Also users can use one standard set of options/attributes for all their different printers.

Now, a day before Ubuntu's Feature Freeze I was merging changes of Debian into Ubuntu's CUPS package and came to the idea of why not porting this feature of libppd back into libcups. So I did so, because of not having time to do it the "right" way before the Feature Freeze simply as a patch on trhe Ubuntu package (a so-called "distro patch"). I will commit it upstream soon, but had more urgent stuff to do (see this News Flash).

This means that the CUPS in Ubuntu 21.10 (Impish Indri to be released on October 14) does the same as the Printer Applications. You can send a job from your phone (or any other mobile or IoT device) to a shared CUPS queue and the standard options of the simple print dialog get taken care of.

Or you can print from the command line, not knowing the PPD options, supplying the above-mentioned IPP attributes on the command line instead:

```
lp -d Printer -o print-color-mode=color -o print-quality=5 file.pdf
lp -d Printer -o print-color-mode=monochrome -o print-quality=3 file.pdf
lp -d Printer -o print-color-mode=color -o print-quality=5 -o print-content-optimize=photo file.pdf
```

Note that the print quality has to be supplied as a number, 3 for draft, 4 for normal and 5 for high quality. Content optimization is only fully applied for high print quality (so set also `-o print-quality=5`).

The first line simply prints in color and high quality, the second monochrome (grayscale) in draft quality and the last one gives the best optimization for color photos.

So please test it and enjoy printing with Ubuntu 21.10.

Any [feedback](https://github.com/OpenPrinting/cups-filters/issues) is welcome. I can easily correct the algorithm where needed.
