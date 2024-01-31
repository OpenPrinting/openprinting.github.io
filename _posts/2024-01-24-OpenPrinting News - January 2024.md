---
title: OpenPrinting News - January 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: HP madness, Framework printer?, tattoo printer, FOSDEM 2024, GSoC 2024, Snap automation, User mailing list
---
You probably remember the [October News](/OpenPrinting-News-October-2023/), where, based on experience of some colleagues and also based on discussions on Mastodon, I changed from recommending HP printers to Brother printers. Unfortunately, there are [many more reasons](#hp-madness) to move on from the formerly well-respected printer manufacturer, mainly their agressive enforcement of their razor-and-blades business model.

Already before reading about all this, back on the [Ubuntu Summit 2023 in November](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga) after attending [Daniel Schaefer's great talk about Framework laptops](https://www.youtube.com/watch?v=W8IAszo8SjM) and also getting a hallway demo from him, I came to the idea why Framework could not also make a modular, easily upgradeable and repairable multi-function printer and some weeks ago, [I posted this idea on their community forum](https://community.frame.work/t/framework-could-make-repairable-printers-multi-function-devices/).

I got a lot of likes, and D.H from Framework's Mainboard Developer Program gave a nice answer:

> I love the idea. Especially if the repairable items list expanded to power supply, main board, WiFi module, Ethernet module, etc. In my current case I have a 7 year old brother laser that is preventing me from going to all WPA3 network, because the firmware and/or WiFi chip in it does not speak WPA3.
>
> Economics make the printer space a difficult one to introduce a new, different, more complex, and by necessity slightly higher entry price point product. It would have to be paired with sufficient advertising, media coverage, etc to really sell the long term total cost to own advantage. Probably pretty easy for a professional IT department to do the cost analysis, effect the repairs, etc. A self managed small office, typical home office is certainly capable of the same but many will prefer to stay with commodity disposable hardware unfortunately.
>
> But yes from an e-waste and TCO standpoint, I love the idea of a repairable, upgradable, open source, etc paper printer, whether Framework or some other company decides to make it.

I also take feedback [on Mastodon](https://ubuntu.social/@till/111686260654381281).

And the thread seems to have inspired Framework to [cite the Ars Technica article about the HP madness on Mastodon](https://ubuntu.social/@frameworkcomputer@fosstodon.org/111819774064085324).

Many of you know that we work here with

> Structured deposition of ink and toner particles on paper substrates

or, just printing.

But some people do

> Structured deposition of ink particles into skin substrates

Oh, this sounds like tattoos, a traditional art done by hand ... By hand? No, also for that we have printers. There are actually [tattoo printers](https://blackdot.tattoo/#technology) now, which print with inked needles into the human skin!

But sorry, no color, only grayscale.

Imagine

```
lp -d ... -o media-type=human-skin -o media-source=forearm-left ...
```

and a kind of dot-matrix printer is doing its work on your skin ...

[Mastodon](https://ubuntu.social/@till/111700732760187110)

No information about the software used is known, though.

So let us see what happened at OpenPrinting in January ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**


## HP madness
Hewlett-Packard (HP) was for long time a symbol for robust and reliable printer workhorses lasting for decades. And they also were a preferred brand for Linux users as they usually understood PostScript or PCL, and for the few which did not, quickly third-party drivers based on reverse engineering appeared as free software drivers. Also with the advent of driverless IPP printing HP printers behaved well and just worked.

And for me as developer HP printers were a good choice as they still understand many languages, starting from good old PostScript and PCL up to the needs of driverless IPP printing, PDF and the different raster formats, and also some HP-proprietary languages and variants in addition. Also all communication protocols, LPD, raw socket, IPP, ... are present, which allows testing for compatibility with many old and modern printers.

But in recent years, HP tried to enforce more and more their [razor-and-blades](https://en.wikipedia.org/wiki/Razor_and_blades_model) business model on printers and multi-function devices, meaning that the printer is sold with loss to actually earn on the high prices for the ink or toner cartridges, where a new set of cartridges often costs near as much as the printer itself.

They not only sell ink subscriptions where the printer "calls home" through the internet so that the user gets automatically sent new cartridges when the current ones are nearly used up but also started to add more measures against using third-party supplies. 

Especially they [automatically install firmware updates via the internet adding these new measures to printers which are already around](https://arstechnica.com/gadgets/2023/03/customers-fume-as-hp-blocks-third-party-ink-from-more-of-its-printers/), without any warning to the user, making the printer suddenly stop working due to the third-party cartridges in use. This practise even led to a lawsuit against HP, and HP responds telling that it is for security reasons, as [third-party cartridges could contain viruses which infect the printer and compromise the user's network](https://arstechnica.com/gadgets/2024/01/hp-ceo-blocking-third-party-ink-from-printers-fights-viruses/). They call these updates "Dynamic Security".

But if such a thing would be possible, it is a clear sign of bad design, as it would mean that cartridges contain executable code which the printer executes, or at least a way to inject code into the printer via forged data on the cartridge, but this requires a vulnerability in the printer's firmware plus a rather high amount of storage on the cartridge. A cartridge's chip is expected to contain some cryptographic signature and/or copyrighted data from HP to identify itself as original, plus info about the cartridges capabilities, perhaps also color calibration tables. All this should not require such a lot of storage, and well-engineered software can reliably read the data and reject it if not in the correct format. In addition, it is also not proven that such an attack ever happened.

In the article it is also told that such kind of firmware updates make people refuse to update and so actual security vulnerabilities especially against attacks from the internet do not get fixed.

Another trick to force users to buy original HP supplies is [HP+](https://www.theverge.com/2023/5/25/23736811/hp-plus-printer-ink-drm-firmware-update-cant-cancel). They offer an Instant Ink subscription to the user of a very cheap printer, with the first 6 months of ink cartridges for free, but couple it with a firmware update which makes the printer only working with original cartridges, and if the customer cancels the ink subscription, the firmware change is not reverted, excluding the use of third-party ink for the rest of the printer's live.

And many of HP's printers have the EPEAT ecolabel which requires the printer accepting third-party ink. With the firmware updates revoking that permission International Imaging Technology Council (IITC), representing the third-party ink/toner industry, wants to have [these printers removed from the EPEAT list](https://arstechnica.com/gadgets/2023/05/hp-printers-should-have-epeat-ecolabels-revoked-trade-group-demands/) and they call these updates "Killer firmware updates".

**All this shows that HP does everything to lock in their users on original cartridges to make money ...**

**And HP's CEO Enrique Lores really admits that they are using the razor-and-blades business model, by telling that when you buy a printer, HP is investing in you, but if you do not print enough or do not use HP's supplies, it is a bad investment. In addition he tells that HP's long-term goal is to make printing a subscription ...**

Another interesting observation on an HP printer, on the very cheap DeskJet 2700, is that it comes with a sticker over the USB port telling to connect by Wi-Fi and not by USB. This printer was bought by Mastodon user netspooky and they tell in a [post](https://haunted.computer/@netspooky/110832978569741892) that HP most probably wants to make users install an app which lets the user's documents being stored in a cloud service from HP. They also tell that they made it working by Wi-Fi without the app (does most probably driverless IPP).

This caused a long thread, with some people saying that the USB principally works but only for ~20 pages as long as the user did not install the app yet. And people tell that the app possibly tries to make users subscribe to the HP+ ink subscription, preventing them from being able to use third-party ink.

And with all this, HP claims their printers are "[Made to be less hated](https://arstechnica.com/gadgets/2023/12/hp-misreads-room-awkwardly-brags-about-its-less-hated-printers/)" ([Mastodon](https://ubuntu.social/@till/111544590480730079)) ...


## FOSDEM 2024
[FOSDEM](https://fosdem.org/2024/) is approaching! This Friday, in the early morning I will fly to Brussels to attend the FOSDEM on Saturday and Sunday. And many people I will already meet on Friday, during the day and also at a dinner of former and current Canonical employees, mainly from the Desktop Team. And with Brno, the city of RedHat's Europe office, only 2 hours from Vienna, I could even meet one or another Red Hat person on my flight (Brussels Airlines SN2902 VIE - BRU 9:15am - 11:00am, on Fri, Feb 2, if you happen to be on the same one ...).

Most of the sessions in the 32 rooms on the 2 days are already scheduled ... Most?! Yes, there are still some missing at this point in time, it seems that the lightning talk submissions are not yet all decided about, especially my two submissions are still pending:

- Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!
- Save Legacy Printers under Windows with WSL and Printer Applications

**On the [Schedules page](https://fosdem.org/2024/schedule/) follow the links to the schedules of each room, full schedules for each day, in which room is which track, ...**

From [my other 4 proposals](/OpenPrinting-News-November-2023/#fosdem-2024) which I have submitted two talks are accepted and scheduled now, and another talk and a workshop got rejected.

So here are my scheduled talks up to now:

**[OpenPrinting - We make printing just work!](https://fosdem.org/2024/schedule/event/fosdem-2024-1930-openprinting-we-make-printing-just-work-/)**

On Sunday, February 4, 11:00 – 11:50 CET, in K.1.105 (La Fontaine)	

Main Track

OpenPrinting: What it is, [how it emerged](/history/), [what we are doing](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#introduction), what are our challenges, what are we in need of ...

Zdenek Dohnal, printing maintainer at RedHat, and I will give an overview of our organization and how we make printing just work.

**[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://fosdem.org/2024/schedule/event/fosdem-2024-1860-desktop-linux-as-easy-as-a-smartphone-just-in-a-snap-/)**

On Sunday, February 4, 13:30 – 13:55 CET, in UA2.118 (Henriot)	

Distributions Track

There are many [immutable distributions](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) around, and several talks in the Distributions track are naturally about them, there will also be demos of several of them on the booths. But one immutable distribution is special as it is based on [Snap](https://snapcraft.io/about), actually an all-Snap distribution, [Ubuntu Core Desktop](https://discourse.ubuntu.com/t/ubuntu-core-desktop-deep-dive/), and a Distributions Track, and especially one on a conference with many Canonical and Ubuntu folks, should not omit this distribution. **And also [Snap got 10 years old](https://git.launchpad.net/snappy/commit/?id=48e0c2599f7580d107d478d1de49ed05487da840)!** (Thanks for the hint, Oliver Grawert)

In this 25-min talk I will give a quick overview about how Snap, Ubuntu Core, and Ubuntu Core Desktop work, showing the advantages of a sandboxed packaging system which allows packaging everything, not only desktop apps, but also CLI apps, system and user daemons, desktop environemnts and even kernels, boot systems, and the immutable system core.

During all the event there will also be several demos of Ubuntu Core Desktop, especially by Alan Pope ("Popey") on a [Steam Deck](https://popey.com/blog/2023/11/ubuntu-core-snapdeck/) and if all works well also by Philipp Kewisch, Community Team manager at Canonical, on an Intel NUC. I hope I will also find the time to set up/update an Ubuntu Core Desktop VM on my laptop.

So that's it from my presentations for now, but up to 2 lightning talks can still get added here ...

For whom is not able to attend there will be [live streams](https://fosdem.org/2024/schedule/streaming/). I am not sure whether all rooms will do it, but very probably the Main Track (2 rooms) and the Lightning talks will do. Please check [here](https://fosdem.org/2024/schedule/streaming/) for the links.

The organizers of the Google Summer of Code will also be on FOSDEM and have a booth there, and there is a GSoC meeting/dinner on Saturday night, kind of mini Mentor Summit, which I will attend, to meet the organizers and also fellow mentors.

And after that, also on Saturday night, there will be the [GNOME Beers](https://foundation.gnome.org/2024/01/29/gnome-at-fosdem-2024/) which I will also most probably join.


## Google Summer of Code 2024
For the 20th Google Summer of Code the time window for the mentoring organization applications has opened (closing on Feb 6) and so I have posted the application for the [Linux Foundation](https://www.linuxfoundation.org/) (Mastodon: [#LinuxFoundation](https://ubuntu.social/tags/linuxfoundation)) again, naturally with OpenPrinting participating as one of its sub-organizations.

For this we have also set up our [project ideas list](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects), this time with a vastly updated [introduction part](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#introduction) about our work, now with sections for [videos](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#videospodcasts) and for [desktop integration](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#desktop_integration). And there are 9 project ideas this time (further ones can get added later):

- [Desktop integration: CPDB support for the print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#desktop_integrationcpdb_support_for_the_print_dialogs_of_mozilla_thunderbirdfirefox_and_libreoffice)
- [Desktop Integration: Update system-config-printer for the New Architecture of printing](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#desktop_integrationupdate_system-config-printer_for_the_new_architecture_of_printing)
- [Desktop Integration: User interfaces for using OAuth2 with printers and scanners](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#desktop_integrationuser_interfaces_for_using_oauth2_with_printers_and_scanners)
- [Replace QPDF by PDFio as PDF manipulation library in libcupsfilters (`cfFilterPDFToPDF()` filter function and others)](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#replace_qpdf_by_pdfio_as_pdf_manipulation_library_in_libcupsfilters_cffilterpdftopdf_filter_function_and_others)
- [Turn cups-browsed into a Printer Application](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#turn_cups-browsed_into_a_printer_application)
- [Converting Braille embosser support into a Printer Application](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#converting_braille_embosser_support_into_a_printer_application)
- [Make a native Printer Application from Gutenprint](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#make_a_native_printer_application_from_gutenprint)
- [CI Testing programs for libpappl-retrofit and libppd](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#ci_testing_programs_for_libpappl-retrofit_and_libppd)
- [cups-filters: Create OCR filter to deliver scans as searchable PDFs](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#cups-filterscreate_ocr_filter_to_deliver_scans_as_searchable_pdfs)

Please [contact us](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects#contact) at any time if you are interested in being a GSoC contributor for OpenPrinting on one of these projects or on your own project idea.

We also have already many contributor candidates doing assignments, in stage 1 building CUPS and cups-filters, learning about the code, the printing architecture, driverless printing, ... in stage 2 working on issues in cups-filters, CUPS, and other OpenPrinting projects, and in stage 3 learning about the project in which they want to do their GSoC work.

Especially to mention here is Rudra Pratap Singh, to whom I have give the task of introducing [Snap update automation](https://ubuntu.com/blog/improving-snap-maintenance-with-automation) into the 4 Printer Application Snaps at OpenPrinting as a stage 2 assignment.

It is principally a rather easy task as the steps are well described in my Snap automation workshop ([video](https://www.youtube.com/watch?v=tL4DBSSdBHU), [slides](https://events.canonical.com/event/31/contributions/217/attachments/126/198/Workshop%20Automating%20Snap%20updates%20on%20new%20upstream%20releases.pdf)).

But he went far beyond his task. See below ...


## Snap automation
As most of you already know, we are offering [several Snaps in the Snap Store](https://snapcraft.io/publisher/openprinting): CUPS, ipp-usb, and several Printer Applications.

All these Snaps need maintenance, especially they are composed of several different upstream packages, which means that whenever of one of these upstream packages a new release is issued, the Snap needs to get updated. This causes a significant amount of maintenance work, especially many upstream projects need to get followed to not miss any new releases.

In the Desktop Team at Canonical, Heather Ellsworth (currently at Thunderbird), has developed a GitHub action to [automatically update Snaps when one of their upstream components has issued a new release](https://ubuntu.com/blog/improving-snap-maintenance-with-automation), as we have to deal with many Snaps for Ubuntu and especially also for [Ubuntu Core Desktop](https://www.youtube.com/watch?v=ahWrhnjjYDk).

**Applying Snap update automation**

As the procedure is rather simple to apply to existing GitHub repositories following above-mentioned article, or even better, my workshop about Snap update automation ([video](https://www.youtube.com/watch?v=tL4DBSSdBHU), [slides](https://events.canonical.com/event/31/contributions/217/attachments/126/198/Workshop%20Automating%20Snap%20updates%20on%20new%20upstream%20releases.pdf)), I have given it as an assignment to a contributor candidate for GSoC 2024, Rudra Pratap Singh.

He started modifying the 4 Snaps of the retro-fitting Printer Applications according to the instructions and it mostly worked afterwards, but he has also bumbed into some issues.

And here is the point where he really showed his engagement, as he solved all these problems.

**foomatic-db**

[foomatic-db](https://github.com/OpenPrinting/foomatic-db/), the printer/driver database, is used by 2 of the 4 Printer Application Snaps, the PostScript Printer Application and the Ghostscript Printer Application, for the former providing manufacturer PPD files for PostScript printers and for the latter providing the data for building PPD files for all the built-in printer drivers of Ghostscript ad even some more drivers.

As foomatic-db is pure data, not containing any code, we have never issued official releases of it. For easier handling by OS distributions we have a cron job which creates a tarball of it, once a day, versioned by the date of the day. There are no release tags in the repo.

So I suggested Rudra to add a GitHub workflow to the foomatic-db repo, to once in 24 hours check whether there was at least one commit in the last 24 hours and in this case create a release tag. This way on each day with at least one commit the Snap update automation of the Printer Application Snaps get triggered, and not on days without any change. Rudra got it quickly working without any problems.

**Automation GitHub action: More versioning schemes and Debian GitLab support**

Even Canonical's [GitHub action itself](https://github.com/ubuntu/desktop-snaps/) got some changes from Rudra. The original GitHub action only supported release tags containing up to 3 integers embedded in a fixed string. So we bumbed into problems with some new, not yet finally released software of OpenPrinting ([pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/)) from which we are using a beta version and also with Debian packaging as upstream code where we have the more complex Debian package version number.

So I suggested Rudra to modify the GitHub workflow to allow free-formed version numbers and he added this functionality and posted [Pull Request #487](https://github.com/ubuntu/desktop-snaps/pull/487). After that he posted [Pull Request #489](https://github.com/ubuntu/desktop-snaps/pull/489/) to support repos from Debian's Salsa GitLab as upstream source, as due to the fact that there is no "gitlab" in the URL, they were not identified as GitLab repos. To complete, he posted also the two further Pull Requests [#490](https://github.com/ubuntu/desktop-snaps/pull/490) and [#493](https://github.com/ubuntu/desktop-snaps/pull/493). All of them got merged by my Desktop Team colleague Sergio Costas, who also guided him on these pull requests.

With all this the Snap update automation on the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) and the 4 Printer Application Snaps is working now.

**Snap versioning automation**
Another point is the version number of the Snap. It would be useful if Snaps have a versioning scheme like DEB or RPM packages, the version number of its main upstream package plus a package release number, like cups 2.4.7-1. If there is a new version of the upstream package, its version number in the Snap's version number will get updated and the package release number reset to 1. If changes made are only on the packaging or on auxiliary upstream repos, the package release number will get bumped: 2.4.7-1 -> 2.4.7-2 -> 2.4.8-1 -> ... This way on any change the Snap gets a new version number, without needing to create an over-complex numbering scheme.

Scripting for this I had already in the [CUPS Snap](https://github.com/OpenPrinting/cups-snap), and made it completely working recently. I asked Rudra to add this scripting also to the Printer Application Snaps and he did. And as all the Snaps now contain complex scriptlets which are practically identical, and therefore on any change on the scriptlet one had to update 5 Snaps, I came to the idea to move this functionality into the Snap update automation GitHub action and Rudra posted [Pull Request #516](https://github.com/ubuntu/desktop-snaps/pull/516).

This Pull Request is still in the works and Sergio Costas is guiding Rudra again to correctly integrate his changes.

The posting of the Pull Requests and the work with Sergio to get the Pull Requests merged, Rudra did without needing my help, completely on his own.

**Thanks a lot to Rudra and Sergio for that great work!**

## What is hot on the OpenPrinting maiing list

**Current interesting discussions**

We had some interesting discussions in the last weeks. See the [mailing list archives](https://lore.kernel.org/printing-architecture/). The following links are to the initial posting of each thread:

- [Printer's IPP response declares AirPrint, but it's missing urf-supported - workaround?](https://lore.kernel.org/printing-architecture/011111E7-A938-4FB1-B5BE-EDB06F3F6D49@hp.com/T/#t): Another firmware bug in a driverless printer and whether we should have a workaround
- [Congrats, Mike! IPP Everywhere is now really Everywhere!](https://lore.kernel.org/printing-architecture/SYBP282MB2617D9F70787C7B9D74E3FD987722@SYBP282MB2617.AUSP282.PROD.OUTLOOK.COM/T/#t): Microsoft Protected Print - all-IPP printing in Windows
- [CUPS Trademark](https://lore.kernel.org/printing-architecture/cea831e8-c065-4735-b08c-100a8f48dd0d@gmail.com/T/#t): Are there no trademark issues with Apple when CUPS moved to OpenPrinting?

If you want to participate, please subscribe following the links on the "printing-aechitecture mailing list entry [on this page](https://subspace.kernel.org/lists.linux.dev.html).

## New printing-users mailing list

- **e-mail: printing-users AT lists DOT linux DOT dev**
- **Archive: [https://lore.kernel.org/printing-users/](https://lore.kernel.org/printing-users/)**
- **Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)**

A first discussion thread already appeared:

- [Cups automatic duplex printing problems](https://lore.kernel.org/printing-users/e43a7eab-2ca4-4fcb-a345-fb65061b18b8@sessink.nl/T/#t): User cannot print duplex on autodetected printer
