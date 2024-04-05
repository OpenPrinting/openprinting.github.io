---
title: OpenPrinting News - December 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Fax?!, New Architecture under Windows, from Ubuntu Summit 2023 into YouTube and Podcasts, FOSDEM 2024, GSoC 2024, Mailing list moving
---
2023 is coming to an end and this is the last news post of this busy year. 8 conferences, an attempt to switch Ubuntu 23.10 to use the CUPS Snap, 4 GSoC contributors doing amazing work ...

And it will all go on in 2024, not only Ubuntu 24.04 LTS, but also Ubuntu Core Desktop as the first distribution where the CUPS Snap is used for printing by default. And after that, if we get good desktop integration (print dialogs with CPDB, printer setup tools) of the New Architecture covering all Ubuntu flavors, I will aim for a switchover to the CUPS Snap in classically installed Ubuntu again ...

Also next year we will have the releases of CUPS 2.5.x of which I will be the release manager. CUPS 2.5.x is mainly to introduce OAuth2 support into CUPS 2.x, to not require the much more impactful switchover to CUPS 3.x only to get OAuth2 support for printing.

The components of CUPS 3.x are about to be released throughout the year 2024, starting with libcups3 end-January and then later on at first the local CUPS server and finally the sharing server, allowing the switchover to CUPS 3.x from Ubuntu 25.04 on, but requiring the same desktop integration as needed for the CUPS Snap, to not make the flavors angry again ...

The libcups3 release end of January is also important to allow the release of PAPPL 2.0 with Akarshan Kapoor's scanning support end-February in time for Ubuntu Core Desktop.

Google is rolling out the [20th Google Summer of Code](#google-summer-of-code-2024) in 2024 and for us it will be all about desktop integration, both for the New Architecture and also for OAuth2 use in printing. I am also eager to know how the Mentor Summit will look like then.

But also under Windows a new printing architecture is on the way, also all-IPP, driverless-only printing ... aiming mainly for improved security, very similar to our New Architecture. They call it [Windows Protected Print](#new-architecture-under-windows).

And while we are all going into the New Architecture, we still have some stone-aged technology in use, at least in some countries, and that is **Fax**, a way to transmit documents through analog phone lines. Often preferred by authorities for privacy reasons it is probably much easier to intercept than any modern, encrypted communication on the internet. But the security issue shown here is not about spying on your faxes, but making use of that nowadays faxes are usually recived by multi-function printer/scanner devices. Sending forged faxes could gain access the computers in the recipient's local network. See this [amazing talk from the Chaos Communication Congress 2018 (35C3)](https://media.ccc.de/v/35c3-9462-what_the_fax) detailing how this works!

So now send your Christmas faxes to your loved ones and happy holidays!

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Please also note that our [mailing list](#what-is-hot-on-the-openprinting-mailing-list) is moving.**


## New Architecture under Windows

[Last month](/OpenPrinting-News-November-2023/) I was citing Michael Tunnell from TuxDigital:

> There is no such thing like a pain-free experience of printing under Windows ... Linux printing is ridiculously good ...

and on every conference where I am I get a lot of kudos, ...:

> Printing under Linux works much better than under Windows or macOS

Did the people at Microsoft hear this? Or did they just read/hear Michael Sweet's and my talking about the New Architecture in the last few years and now they want to have the New Architecture themselves. 

Microsoft is introducing a new printing architecture for Windows, with mainly security in mind, called [Windows Protected Print](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/a-new-modern-and-secure-print-experience-from-windows/bc-p/4013352) and like our New Architecture with CUPS it going all-IPP only supporting driverless IPP printers and not classic printer drivers any more.

By the way, I have [participated](https://techcommunity.microsoft.com/t5/security-compliance-and-identity/a-new-modern-and-secure-print-experience-from-windows/bc-p/4013012/highlight/true#M6961) in the blog article's discussion.

They do away with their classic printer drivers because they run with system (highest) privileges, like the print spooler itself and many come from third parties. This makes fixing security vulnerabilities especially challanging, and even worse if there are decade-old drivers installed for which the issuing printer manufacturer has already ceased support.

Microsoft did not present any concept to support non-drierless legacy printers, considering all these printers obsolete. But in reality, at least the ones for which there are drivers under Linux can be continued to be used, thanks to WSL and Printer Applications. Here is [how to do this](/wsl-printer-app/).

Windows Protected Print can already be tested, in the Insider Preview of Windows 11, as described on [How-To Geek](https://www.howtogeek.com/microsoft-is-revamping-printing-on-windows-11/) and also by [Microsoft itself](https://blogs.windows.com/windows-insider/2023/12/13/announcing-windows-11-insider-preview-build-26016-canary-channel/#:~:text=in%20Build%2026016-,Windows%20Protected%20Print%20Mode,-Windows%20protected%20print).

Note that Print Support Apps (PSA) under Windows are not the same as Printer Applications under Linux. The latter are emulations of driverless IPP printers serving as printer drivers under Linux and the former are printer-specific software extensions for driverless printers under Windows, which is printer-model-specific software again, defeating the driverless model ...


## From the Ubuntu Summit 2023 into YouTube and Podcasts
The Ubuntu Summit 2023 in Riga was not only successful due to the talks and hallway sessions but also in terms of YouTube videos and podcasts with me. So together with the two recordings from the Engineering Sprint in Riga which I already mentioned [last month](/OpenPrinting-News-November-2023/) you have even more nice alternatives to boring holiday TV programs.

In less than 2 weeks 4 new videos/shows got released:

**Ubuntu Summit recordings**

The recording of my [third Snap workshop](https://events.canonical.com/event/31/contributions/217/) has been published on [Ubuntu OnAir](https://www.youtube.com/@UbuntuOnAir/) on December 13: [**Improving Snap maintenance: Automating tag updates on new upstream releases of the app - Interactive workshop**](https://www.youtube.com/watch?v=tL4DBSSdBHU)

**Ask Noah podcast**

Noah J. Chelliah met me on the hallway and asked me for an interview for his "[**Ask Noah**](https://podcast.asknoahshow.com/)" podcast. So we immediately went to an unused conference room for a "Noah asks" and we recorded the interview, me telling him about OpenPrinting, how it started and what were the problems we have solved with it. The interview is part of [episode 368](https://podcast.asknoahshow.com/368?t=2837), released on Tuesday, December 19. It starts at 47:17 min.

**Destination Linux**

When leaving the closing plenary, **Michael Tunnell** from [TuxDigital](https://tuxdigital.com/) and one of the hosts of [Destination Linux](https://tuxdigital.com/podcasts/destination-linux/) grabbed me in the crowd leaving the plenary room and invited me for an interview for a Destination Linux episode. The interview got onto the road as [episode 351](https://tuxdigital.com/podcasts/destination-linux/dl-351/), "**These guys made Linux printing great**", on Monday, December 18. The show is available both as video and as podcast.

This episode is something special in several points: First, being invited to talk about OpenPrinting I have invited Mike Sweet, author of CUPS and creator of driverless IPP printing, into the show in addition, like in the [Indaba](https://www.youtube.com/watch?v=P22DOu_ahBo) 2 years ago.

Second, the interview with Mike and me got 1:20 hours long, nearly as a full movie and so this episode is appropriately long and dedicated to the interview!

Third, Monica Ayhens-Madon has bought a little penguin in Riga, a gift for co-host Jill (see [last month](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga)), and taken photos with it and several important people on the conference, including me ([Mastodon](https://ubuntu.social/@communiteatime@fosstodon.org/111375114801448241)), so I have asked Michael to make my episode the first where Jill has received the penguin and put me into the scene where she presents it. So this episode consists of the "Community Feedback" section where Jill & Till present the penguin and of the interview, nothing more, nothing less.

The Destination Linux team is eager to attend the Ubuntu Summit 2024. I suggested them to produce an episode there.

**Linux Saloon**

Also after the Summit I continued following the Ubuntu Summit channel on Telegram, and suddenly, on Saturday, December 9, Nathan Wolf, @CubicleNate on Telegram and other platforms, and host of the [Linux Saloon](https://tuxdigital.com/podcasts/linux-saloon/) live show series, announced his [episode about **Snap**](https://www.youtube.com/watch?v=m5QKJH9tDjQ) inviting people to participate live in the show, something like 2 hours before the show started. So I thought it would be great to have a Snap expert on the show and I joined, ending up with it being mainly a near 2-hour-long interview with me, about OpenPrinting, Snap, and Ubuntu Core Desktop, and especially how I got into Snap and how I got the Snap enthusiast of today.

The production of the Destination Linux episode got scheduled on Sunday, Dec 10, after Jill's penguin has arrived and Mike Sweet having time to join, and the Linux Saloon happened to be the Saturday before, so I have produced 2 practically movie-length shows on one weekend.

And if you also want to see many more people doing great things with free software, on the Ubuntu Summit Advent Calendar nearly all the doors are open now, only a few sessions are still missing. Find the recordings of the individual sessions in all rooms on the [Ubuntu Summit 2023 playlist](https://www.youtube.com/playlist?list=PL-qBHd6_LXWZqbxr3542fZs_IMn0gAb2B) on [Ubuntu OnAir](https://www.youtube.com/@UbuntuOnAir/videos).

I have also updated my Ubuntu Summit report from [last month](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga) with links to all videos and shows which got released.

**Complete [playlist of all sesions](https://www.youtube.com/playlist?list=PL-qBHd6_LXWZqbxr3542fZs_IMn0gAb2B)**

**Mastodon: [#UbuntuSummit](https://ubuntu.social/tags/UbuntuSummit), [#UbuntuSummit2023](https://ubuntu.social/tags/UbuntuSummit2023)**


## FOSDEM 2024
[FOSDEM](https://fosdem.org/2024/) is coming closer, my flights to Brussels are booked, on Telegram we are already talking a lot about who attends and that we will all meet there, several of the DevRoom organizers have already selected the talks.

**On the [Schedules page](https://fosdem.org/2024/schedule/) follow the links to the schedules of each room, full schedules for each day, in which room is which track, ...**

Of [my 6 proposals](/OpenPrinting-News-November-2023/#fosdem-2024) which I have submitted one is accepted now, 2 are rejected and 3 still pending.

The 2 rejected ones are the report about the [Opportunity Open Source conference](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) which I have organized in India, as full-size talk for the Community DevRoom and my [workshop about packaging applications as Snaps (snapping)](/OpenPrinting-News-November-2023/#snap-workshops) in the Distributions DevRoom. There was a really high amount of propoals submitted for these rooms, 89 for Community! And each DevRoom takes place on only one single day.

My proposal "[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://fosdem.org/2024/schedule/event/fosdem-2024-1860-desktop-linux-as-easy-as-a-smartphone-just-in-a-snap-/)", about Snap, Ubuntu Core, and Ubuntu Core Desktop, in the [Distributions DevRoom](https://fosdem.org/2024/schedule/track/distributions/) got accepted, but only as a short 25-min talk, instead of the originally proposed 55 min. It got scheduled for [Sunday, Feb 4, 13:30 - 13:55](https://fosdem.org/2024/schedule/track/distributions/). Not having gotten the Ubuntu/Canonical booth accepted we have this way at least one representation of Snap and Ubuntu Core Desktop on the conference. I and some colleagues will also demo Ubuntu Core Desktop in the DevRoom and in the hallways.

The other 3 proposals, 2 lightning talks, about the Opportunity Open Source and about saving legacy printers under Windows with WSL and Printer Applications, and the full-size talk about OpenPrinting (in the main track) are still pending.

OpenPrinting will get represented well on FOSDEM, in addition to me Zdenek Dohnal from Red Hat will also attend, and if my talk "OpenPrinting - We make printing just work!" will get accepted, he will be my co-speaker. And with the lightning talk about saving old printers we can have two OpenPrinting talks on the confernce.

And, to follow the newest development, I will mention Microsoft's new [Windows Protected Print](#new-architecture-under-windows) in both talks, in the main OpenPrinting talk as a possible answer of Microsoft to the CUPS-based all-IPP printing on the other operating systems and in the lightning talk telling that Microsoft has completely given up on legacy printers and WSL will be the only solution to save them. The proposals are already appropriately updated.

Last but not least, several people from Red Hat's office in Brno will attend FOSDEM, and some of them fly from Vienna Airport to Brussels, so I can have some inflight sessions ... (Brussels Airlines SN2902 VIE - BRU 9:15am - 11:00am, on Fri, Feb 2, if you want to join ...)


## Google Summer of Code 2024
The preparations for our participation at the [20th GSoC](https://opensource.googleblog.com/2023/11/google-summer-of-code-2024-celebrating-20th-year.html) have started.

We have already our first contributor candidates learning about OpenPrinting and doing assignments.

There will be a lot of interesting projects again, like:
- Desktop integration: CPDB support for the print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice
- Desktop Integration: Update system-config-printer for the New Architecture of printing
- Desktop Integration: User interfaces for using OAuth2 with printers and scanners
- Replace QPDF by PDFio as PDF manipulation library in libcupsfilters (`cfFilterPDFToPDF()` filter function and others)
- CPDB backend for IPP infrastructure/cloud printers
- Turn cups-browsed into a Printer Application
- Printer Application for Braille embossers

Note that for general acceptance of CUPS 3.x and of the CUPS Snap we need to have a desktop integration for **all** desktops, not only for GNOME.

Suggestions for any further project ideas are more than welcome.

And if you like to be a GSoC contributor next year, please contact me (till AT linux DOT com).


## What is hot on the OpenPrinting mailing list

**Current interesting discussions**

**Update: Links updated to point into the new archive**

We had some interesting discussions in the last weeks. See the [mailing list archives](https://lore.kernel.org/printing-architecture/). The following links are to the initial posting of each thread:

- [PDFio: Replace QPDF by PDFio in libcupsfilters as GSoC project?](https://lore.kernel.org/printing-architecture/F8540CAC-A93F-42DD-9E1A-D46746C92283@msweet.org/T/#m7d696e04ffe21f01388318451f76ca9238c0fb41): Should we replace the C++ PDF manipulation library QPDF by the standard-C PDFio written by Mike Sweet?
- [RFC: Pantum M7300FDW and similar](https://lore.kernel.org/printing-architecture/SYBP282MB26176D7E8D1C09528DDBCFF7878CA@SYBP282MB2617.AUSP282.PROD.OUTLOOK.COM/T/#mc612d645ab72016a8e9a4f4e9778a0c7bade3c33): Alexander Pevzner has discovered a firmware bug in Pantum printers which breaks their driverless IPP printing support. Should one implement a workaround here?
- [github.com/OpenPrinting/goipp 1.1.0 and ipp-usb 0.9.24 announce](https://lore.kernel.org/printing-architecture/3BC27CB9-23C9-4D9B-8862-693F255177B6@msweet.org/T/#m6d8ab65c40702e2dedf2672456a7a8bc5c997e56): Alexander Pevzner resumes development of our IPP-over-USB implementation ipp-usb and goipp

If you want to participate and you are not subscribed, please subscribe after the migration.

**Mailing list moving**

**Update: The move has been completed:**
- **e-mail: printing-architecture AT lists DOT linux DOT dev**
- **Archive: [https://lore.kernel.org/printing-architecture/](https://lore.kernel.org/printing-architecture/)**
- **Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)**

The OpenPrinting mailing list, printing-architecture AT lists.linuxfoundation DOT org, is getting moved to a new system. The old e-mail address stays working and all subscribers and also the list archives are automatically migrated to the new list.

See the announcement from Konstantin Ryabitsev, Linux Foundation:

```
From: Konstantin Ryabitsev, Linux Foundation
Subject: PSA: this list is moving to lists.linux.dev (no action required)

Hello, all:

The mailman-2 system running on lists.linuxfoundation.org is being
decommissioned, so all lists currently hosted there will be found new homes.

This Thursday, December 21, at 11AM PST (19:00 UTC), this list will be migrated
to live on lists.linux.dev, but the impact of this move should be minor:

1. The new canonical list address will be printing-architecture@lists.linux.dev.

2. *The old address will continue to work* for the foreseeable future, so any
   existing conversations can continue and any new messages sent to the old
   list address will be properly delivered to all subscribers.

3. All members will be automatically subscribed to the new list, so no action
   is required on anyone's part to keep receiving list mail.

4. The list will be archived on https://lore.kernel.org/printing-architecture/
   with all prior archives automatically imported.

5. The List-ID header will change, regardless to which address the message is
   sent:

   before: List-Id: <printing-architecture.lists.linuxfoundation.org>
    after: List-Id: <printing-architecture.lists.linux.dev>

   You will need to update your filtering rules if you filter based on the
   contents of that header (on or after the migration date).

6. The mailman footer will no longer be added to message bodies and the
   subject will no longer be modified to insert [Printing-architecture]
   (because this violates DMARC).

7. Subscribing and unsubscribing will be done using the mlmmj supported
   commands, documented at https://subspace.kernel.org/subscribing.html

Please let me know if you have any questions or concerns. I will follow up
on Thursday after the migration has been completed.

Best regards,
-K
```