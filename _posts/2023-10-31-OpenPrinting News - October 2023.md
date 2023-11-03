---
title: OpenPrinting News - October 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Ubuntu Summit 2023 in Riga, GSoC 2023, CPDB CUPS backend Snap, libcups3 support, PAPPL 1.4.2, CUPS 2.4.7
---
Probably many of you are using a modern driverless multi-function printer and scanner device, and it does not only print but also scan perfectly on your Linux system, or you have your driverless printer connected via USB and it also just works without any device-model-specific driver.

This works especially thanks to **Alexander Pevzner's** excellent voluntary work of creating the IPP-over-USB daemon [ipp-usb](/achievements/#driverless-printers-on-usb---ipp-over-usb) and the SANE backend [sane-airscan](/achievements/#sane-backends-for-driverless-scanning---escl-and-wsd-airscan) for driverless scanning with both the eSCL and the WSD standards.

For a longer time he has been very busy with other things and so he was keeping his OpenPrinting work in "maintenance mode", but now he showed up again and worked on some issues in CUPS and cups-filters.

And he has also written an **amazing article** ([Original](https://habr.com/en/articles/751214/), [Google-translated to English](https://habr-com.translate.goog/en/articles/751214/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp&_x_tr_hist=true)) about his work, how he got into it, and especially praising me for my cooperation with him. And thanks a lot to Anton Gladky, without his hint on the [DebConf2023](/OpenPrinting-News-September-2023/#debconf-2023-in-kochi-india) I had never got note of it.

Some days ago, Alan Pope ("[Popey](https://ubuntu.social/@popey)"), a former colleague of mine at Canonical, and owner of the [ubuntu.social](https://ubuntu.social/) instance of Mastodon, posted on Mastodon [asking for help which printer to buy](https://ubuntu.social/@popey/111319371893037213). I read the busy thread and answered several times, telling about OpenPrinting's list of driverless printers, confirming that the Xerox somebody else suggested is actually on the list, warning about (mainly HP and Canon) printers which stop scanning when they run out of ink/toner, ...

Confirmed by most people answering down the thread it turns out that **currently Brother is the best choice**, and there especially laser printers. These are reliable printers which perfectly work as driverless IPP printers and scanners with all operating systems and devices, and especially they seem just to be designed to do their job of printing and scanning and not to suck lots of money out of the users by making them buying lots of over-expensive ink and toner.

**Especially I found [another thread](https://social.wildeboer.net/@jwildeboer/111306847779120023) about a purchase of a color laser multi-function printer from Brother and also answered there, [telling that we have currently 657 Brother printers on our list](https://ubuntu.social/@till/111319479230583646) and this answer was my most successful Mastodon post! 21 people favorited and 16 people boosted my post!**

And here is a [YouTube video](https://www.youtube.com/watch?v=-fx_T4GIsX4) where someone is showing how to set up printers with YaST (SUSE) but there is something wrong with it ... Just watch the video, read the description only afterwards...

So let us now start with what we did at OpenPrinting in October ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**


## Ubuntu Summit 2023 in Riga
The [Summit](https://events.canonical.com/event/31/) is coming close, I am already in Riga since yesterday and today at 2pm EET morning (CET) I will it will actually start. A lot of [exciting stuff](https://events.canonical.com/event/31/ngtimetable/) is waiting there in 5 rooms for 2.5 days. And there will be also a surprise!

The best of all is that one will meet each other again, like [last year on the Ubuntu Summit 2022 in Prague](/OpenPrinting-News-December-2022/#ubuntu-summit---videos-pictures-blogs-podcasts-) in these 3.5 days (many arrived early, to enjoy Riga, get rid of jet lag, have a margin for flight delays, attending the Canonical-internal Sprint before the Summit ...).

And on the conference itself I will give my third Snap workshop! It is

[**Improving Snap maintenance: Automating tag updates on new upstream releases of the app**](https://events.canonical.com/event/31/contributions/217/)

On Saturday, November 4, at 12:00 - 13:00 EET in Beta 2

It is all about having your Snap get automatically updated in the Snap Store when any of the underlying upstream projects issues a new release. This helps users of Snaps to always have the latest and greatest versions of their apps.

It is an [easy-to-apply GitHub action/workflow](https://ubuntu.com/blog/improving-snap-maintenance-with-automation), developed by Heather Ellsworth who was in Canonical's Desktop Team, in the Snap Squad.

If you are developing an application and snapping it or are snapping applications for developers who do not snap by themselves (like the [Snapcrafters](https://snapcraft.io/publisher/snapcrafters) do) you should not miss this session, as applying the automation will ease youe life.

If you want to attend it, to make use of the time (60 min) efficiently, I want to ask you to download the [slides](https://events.canonical.com/event/31/contributions/217/attachments/126/198/Workshop%20Automating%20Snap%20updates%20on%20new%20upstream%20releases.pdf) and follow the instructions under "Setup", so that you have forked the example GitHub repositories. Also it is easier to do the exercises when having the slides at hand to browse and copy-and-paste.

By the way, I plan to apply the method also on the [OpenPrinting Snaps](https://snapcraft.io/publisher/openprinting). Especially the [Ghostscript Printer Application](https://snapcraft.io/ghostscript-printer-app) with its ~20 parts will benefit a lot from it. But it will us also get an [Ubuntu Core Desktop](https://events.canonical.com/event/31/contributions/246/) with always up-to-date printing stack.

And do not think that this will be an Ubuntu Summit without any OpenPrinting session, GSoC contributor Akarshan Kapoor will tell about his [GSoC work on scanning support in PAPPL](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) in the talk

[**ScaniVerse: A New Horizon in Unified Scanning for Linux Systems**](https://events.canonical.com/event/31/contributions/192/)

On Sunday, November 5, at 11:30 - 12:00 EET in Sigma

Akarshan presents his work on scanning support of this summer, the addition of scanning support to PAPPL to be able to make scanner drivers available as Scanner Applications, emulators of deriverless scanners ([PAPPL PR #249](https://github.com/michaelrsweet/pappl/pull/249)), the retrofit of SANE drivers ([GitHub repo](https://github.com/Kappuccino111/SaneScanner-PapplRetrofit)), and his new MetaScan ([GitHub repo](https://github.com/Kappuccino111/MetaScan)). I will be in the room with him and help answering the questions.

There are a lot of great sessions to choose from, often several in parallel in different rooms. To help attendees through all this, the schedules display, nicely hacked by Canonical's Community Team manager, Philipp Kewisch, has a facility that you can mark interesting sessions with a star. These will get listed under "My Conference" in chronological order then, so that you do not miss what you plan to attend.

I have marked up to now (only to get an inspiration, not sure whether I will attend them all):
- [From origins to open source: The journey of DreamWorks Animation's production path tracer, MoonRay](https://events.canonical.com/event/31/contributions/218/), Randy Packer (DreamWorks Animation), Fri 11/3, 15:00 EET
- [Introducing Ubuntu Core Desktop](https://events.canonical.com/event/31/contributions/246/), Ken Vandine (Core Desktop development lead, Canonical), Oliver Smith (Product Manager Desktop, Canonical), Fri 11/3, 16:30 EET
- [Alioli ROV Submarine Drone](https://events.canonical.com/event/31/contributions/200/), Juanmi Taboada, 11/3, Fri 17:00 EET
- [What It's Like to Build an Open, Repairable Laptop](https://events.canonical.com/event/31/contributions/178/), Daniel Schaefer (Framework Computer), Sat 11/4, 9:00 EET
- [Windows Subsystem for Linux (WSL) - Make an awesome Linux environment directly on Windows](https://events.canonical.com/event/31/contributions/185/), Craig Loewen (Microsoft), Sat 11/4, 9:30 EET
- [Feature detection for games, letting machines figure out system requirements](https://events.canonical.com/event/31/contributions/184/), Mathieu Comandon (Lutris), Sat 11/4, 11:30 EET
- [Container craftsmanship: from a Pebble to a ROCK - Interactive Workshop](https://events.canonical.com/event/31/contributions/228/), Cristovão Cordeiro (Canonical), Sat 11/4, 14:00 EET
- [Dark matters: The security abyss of distroless containers](https://events.canonical.com/event/31/contributions/249/), Cristovão Cordeiro (Canonical), Sat 11/4, 16:00 EET
- [Snapshot in time: Leveraging Snap and Flatpak to preserve our software legacy](https://events.canonical.com/event/31/contributions/183/), Mathieu Comandon (Lutris), Sat 11/4, 16:00 EET
- [How to launch an open source software?](https://events.canonical.com/event/31/contributions/237/), Ömer Faruk Aydin, Sat 11/4, 16:30 EET
- [Join the RISC-V revolution](https://events.canonical.com/event/31/contributions/201/), Heinrich Schuchardt (Canonical), Sat 11/4, 17:00 EET
- [Skynet or Star Trek, what’s the future of AI? - Panel session](https://events.canonical.com/event/31/contributions/266/), Graham Morrison (host, Canonical), Andreea Munteanu (Canonical), Craig Loewen (Microsoft), Frank Karlitschek (Nextcloud), Juan Luis Cano Rodríguez (QuantumBlack, AI by McKinsey), Pablo Ruiz-Múzquiz (Kaleidos/Penpot), Sun 11/5, 9:00 EET
- [ScaniVerse: A New Horizon in Unified Scanning for Linux Systems](https://events.canonical.com/event/31/contributions/192/) Akarshan Kapoor (Indian Institute of Technology, Mandi, India), Sun 11/5, 11:30 EET
- [Bringing Windows applications to Linux app stores](https://events.canonical.com/event/31/contributions/240/), Merlijn Sebrechts (Ubuntu Community Council, Snapcrafters), Sun 11/5, 12:00 EET
- [Open Source for Sustainable and Long lasting Phones](https://events.canonical.com/event/31/contributions/175/), Luca Weiss (Fairphone), Sun 11/5, 12:00 EET
- [Behind the Scenes of tox: The Journey of Rewriting a Python Tool with Over 10 Million Monthly Downloads](https://events.canonical.com/event/31/contributions/272/), Jürgen Gmach (Canonical), Sun 11/5, 14:30 EET
- [Linux Lads live podcast recording](https://events.canonical.com/event/31/contributions/357/), Shane Kitt (Linux Lads Podcast), Sun 11/5, 16:00 EET

In addition to these lots of awesome talks and workshops and hopefully also a great hallway track, there are also 3 evenings and on all these there will also be [events not to be missed](https://events.canonical.com/event/31/page/163-evening-events).

On Friday, right after leaving the last session at 18:00 EET in the hallway between the conference rooms you will directly be on the first one, the

**Welcome Reception/Opening Mixer**

Have some after-session chat with appetizers and form groups to have dinner in the nice old town of Riga afterwards.

Saturday evening, from 20:00 - 23:00 we will be gaming like hell in the

**Gaming Night**

In the 2 workshop rooms (Beta 1 & 2) opened up to one we will play board games, video games, Foosball, and Air Hockey. **And you can contribute: Bring your board games, gaming consoles, and other gaming devices!!**

Also on Saturday there will be a

**Special Demonstration**

What exactly, will be told through the event. There are 2 sessions of it, at 21:00 and 22:00, room to be announced.

And after two and a half days of amazing, exciting, eshausting, ~~boring~~, ... talks and workshops, we will celebrate the success of the second Ubuntu Summit on the

**Closing Party**

on 19:00 - 23:00 EET in the Digital Art House, walking distance from the venue (so no party buses). Drinks and a dinner buffet will get served.

So see you in Riga!

Or attend remotely via [live streams and recordings](https://events.canonical.com/event/31/page/269-livestreams).

And keep up-to-date via Mastodon: [#UbuntuSummit](https://ubuntu.social/tags/UbuntuSummit), [#UbuntuSummit2023](https://ubuntu.social/tags/UbuntuSummit2023)


## Google Summer of Code 2023
Now we are close to the end. Having extended the deadline for all the now 5 OpenPrinting contributors it is time to write the final reports. Their deadline is Nov 6, Monday next week.

Due to his participation in the Ubuntu Summit Akarshan Kapoor already finished one week earlier and so [**his report is already posted**](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci). He succeeded with the addition of scanning support to PAPPL and so we will soon see first Scanner Applications.

And from Kushagra Sharma, GSoC contributor on CPDB support in the print dialogs I got a last write-up before the end of the GSoC:

> Implementation for CPDB pkg config support is completed which allows autoninja to set flags for CPDB allowing its import into the system. Currently implementing all the virtual functions for print backend as of now I am able to display all thé available printers for different print backends on the print dialog using CPDB, working on fetching their print capabilities and semantics. This will conclude CPDB support for print dialog in chromium.
> 
> Thanks Till Kamppeter and Gaurav Guleria for all the support, I hope we keep working on CPDB and one day all software use CPDB for print dialog.

Next month I will post an overview with links to all the final reports.

And I was in Sunnyvale at Google on the [Mentor Summit](https://sites.google.com/view/gsoc2023mentorsummit/) meeting my fellow mentors again, especially also Deepak Patankar, who was lucky to get a spot through the waitlist. The event was smaller than the 2018 edition which has taken place in the same location, as each mentoring organization got only one guaranteed delegate spot and not two. But nevertheless it was still fun.

Especially I have given a 3-min (!) lightning talk about the participation of the Linux Foundation and the [Opportunity Open Source in the IIT Mandi](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india). It was in [one of two sessions](shttps://sites.google.com/view/gsoc2023mentorsummit/schedule/lightning-talks-speaker-order) where every mentoring organization could give a brief presentation about something interesting or important, usually success stories about exceptional contributors. So mine was somehow different, but in some form also a success story of a contributor, of Akarshan doing the excellent local part of the organization of the event ...

And even quicker was the self-presentation of each of the 175 attendees. We only could use 4 words! I used OpenPrinting - Snap - Ubuntu - Community.

But the rest went much more easily, mostly hallway chat but also the un-conference, BoF-style sessions planned on the spot. Two boards, one for each conference day, with squares for each hour and each of the 5 rooms where people could post a paper announcing their session. No pre-planning, no CfP. A little like the [Ubuntu Developer Summits many years ago](https://popey.com/blog/2023/11/heading-to-ubuntu-summit-2023/).

In addition, I departed to the US two days earlier, to not miss the event if flights are late or canceled, to have the jet lag go down a bit, and also to have a short touristic visit in San Francisco, and luckily enough, on the evening before the Mentor Summit, there happened the [Annual Celebration](https://blog.archive.org/2023/10/06/join-us-for-our-annual-celebration-thursday-october-12/?utm_source=substack&utm_medium=email) of the [Internet Archive](https://archive.org/), a great organization conserving everything which appears on the internet, even if popping up only shortly, and making it available via the Wayback Engine, preserving a lot of history. I met also some of the Mentor Summit attendees that evening, especially Robert Kaye from [Metabrainz](https://metabrainz.org/)/[Musicbrainz](https://musicbrainz.org/) who works closely together with the Internet Archive.


## CPDB CUPS backend Snap
To complete the printing stack in the all-Snap experience of [Ubuntu Core Desktop](https://discourse.ubuntu.com/t/ubuntu-core-desktop-deep-dive/) we still need one more Snap, the one of the [CUPS backend](https://github.com/OpenPrinting/cpdb-backend-cups/) for the [Common Print Dialog Backends (CPDB)](https://openprinting.github.io/achievements/#common-print-dialog-backends).

This is needed as all the application's print dialogs also need to get switched over to the New Architecture of not having PPD files any more, but instead, IPP print destinations. And exactly this we have implemented in the CPDB backend for CUPS, and now making the dialogs using CPDB we will make them not only working with the upcoming CUPS 3.x and with the CUPS Snap, but also assure that they stay working with further changes in CUPS and also being open for new print services, like for example cloud services.

Luckily I was successful with my [talk about Snap and Ubuntu Core Desktop](https://events.canonical.com/event/35/contributions/292/) and my [Snap workshop](https://events.canonical.com/event/35/contributions/291/) on the [Opportunity Open Source in Mandi](https://events.canonical.com/e/mandi2023), as Biswadeep Purkayastha, one of the candidates for this year's GSoC, attended and stepped up as a volunteer for OpenPrinting. Right after the conference he studied the rest of the workshop (In Mandi I had only 60 min for the workshop which was originally designed for 90 min - 2 hours), my [Daemon Snapper's Workshop](https://events.canonical.com/event/2/contributions/42/) from the [Ubuntu Summit 2022](https://events.canonical.com/event/2/), and Ken VanDine's [blog about Ubuntu Core Desktop](https://discourse.ubuntu.com/t/ubuntu-core-desktop-deep-dive/). Then he asked me what he could do for OpenPrinting and I offered him to snap the CPDB backend for CUPS.

He is really enthusiastic about OpenPrinting, especially he ported the `cupstestppd` utility's core functionality into a library function in libppd ([Pull Request #6](https://github.com/OpenPrinting/libppd/pull/6)) and when he got the message of not having been selected for GSoC, he asked me right away what he could do voluntarily and I talked with him about OCI containers and Snap and also about my planned sessions in Mandi.

Biswadeep accepted the snapping task and started right away creating the `snapcraft.yaml`. He asked me when he got stuck and I helped him through several quirks, including libcups2 of CUPS 2.5.x having removed some things which were marked deprecated in CUPS 2.4.x.

Later on we both got stuck as the CPDB backend is entering a new area: It is a user daemon, triggered via the session D-Bus (see [Ken VanDine's second blog](https://discourse.ubuntu.com/t/ubuntu-core-desktop-the-desktop-session/)). There is support for such a thing by snapd but it is still considered experimantal and not really well documented, and it only supports a client application to call one pre-defined D-Bus service, not as we have with CPDB that the client (in our case a print dialog) is looking for all suitable D-Bus services (in our case the CPDB backends) which are installed and does not know beforehand which these are (in our case a new cloud printing service with its CPDB backend could appear). So I asked for help [on the snapcraft.io forum](https://forum.snapcraft.io/t/snapping-cpdb-cups-backend-a-user-daemon-using-d-bus/), but did not get any answer yet, neither from Canonical's snapd and snapcraft developers nor from the community ...

So now I will have to make the developers aware in-person, on the Canonical Engineering Sprint, Canonical's internal meeting of their around ~700 engineers, in the week right after the Ubuntu Summit, also here in Riga.

Thanks a lot, Biswadeep, for all your great work on this!

## libcups3 support
Michael Sweet is not only deep into the development of [libcups3](https://github.com/OpenPrinting/libcups), the CUPS library of the new CUPS 3.x, but he is also already switching PAPPL to it. The current stable release 1.4.2 can be built with either libcups2 or libcups3, the library being autodetected by the `./configure` script, and the master branch in the GIT repository which is approaching version 2.0 is even libcups3-only.

So Michael seems to be eager to switch us into the [New Generation](/current/#the-new-architecture-for-printing-and-scanning) of all-IPP, PPD-less printing as soon as possible and probably also considers Printer Applications as a thing of the New Generation CUPS 3.x world.

Akarshan Kapoor has [added scanning support to PAPPL](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) during this year's GSoC and posted a [Pull Request](https://github.com/michaelrsweet/pappl/pull/249) for its inclusion. As it is a significant new feature it will most probably not be accepted into the 1.4.x series but only into 2.x which would require that PAPPL-based Scanner Applications will háve to use libcups3.

As we do not want to only support writing new scanner drivers from scratch but also retro-fit all drivers which are already there, which are SANE backends, we need SANE support and this we want to do in [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit) where we are already supporting PPD-based legacy printer drivers. But pappl-retrofit also uses the libcups2-based [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters) and [libppd](https://github.com/OpenPrinting/libppd) libraries, and pappl-retrofit also uses libcups2 by itself.

This made adding support for building with libcups3 to the libraries libcuppsfilters, libppd, and pappl-retrofit getting more urgent. Work on libcupsfilters got already started by Gayatri Kapse during the selection process for the GSoC earlier this year ([Pull request #24](https://github.com/OpenPrinting/libcupsfilters/pull/24)) and as Biswadeep Purkayastha got stuck with snapping the CPDB backend for CUPS I asked him to work on the addition of libcups3 to the libraries. He did all the renamings to the new libcups3 function names and the `#define`s for converting to the libcups2 names when building with libcups2, taking Gayatri's work and also PAPPL 1.4.x as example and in the end I completed it by doing the more tricky parts.

But the worst thing was already done much earlier, copying all PPD file support code into libpppd. This way all the libraries did not contain any calls of PPD-related functions in libcups2 any more. The only code I still had to copy from libcups2 was the code to support the back channel and the side channel for communication between CUPS filters and CUPS backends. I have taken the files `cups/sidechannel.h`, `cups/sidechannel.c`, and cups/backchannel.c` and copied their content over into the new files `pappl-retrofit/cups-side-back-channel.c` and `pappl-retrofit/cups-side-back-channel-private.h` in [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit). After that I renamed all the functions, data types, and constants to the scheme of pappl-retrofit. pappl-retrofit builds with either libcups2 or libcups3 now, always using its own copies of the back/side channel support functions.

All the libcups3-support-related changes are done now and available in the master branches of the three libraries. They still need more testing before the 2.1.0 releases of libcupsfilters and libppd and the 1.0.0 release of pappl-retrofit.

Scanner Applications being forced to use libcups3 instead of libcups2 are no problem at all if they are provided as Snaps or otherwise packaged in some sandboxed format (like Docker/OCI containers). In all these formats each application brings its own dependencies (needed libraries, ...), so the system can use libcups2 while the encapsulated Scanner Application uses libcups3. Even classically installed the Scanner Applications can use libcups3, as libcups2 and libcups3 can co-exist on classically installed distributions, at least if they use DEB or RPM. Even more this works as current libcups3 uses the `3` actually in its name, having the library file `libcups3.so.3` and the compiler argument `-lcups3`.

Only disadvantage against using libcups2 is that libcups3 is still in its beta phase, but Michael Sweet's code quality is very high, so it is not such a problem.


## CUPS 2.4.7
Michael Sweet has already started the development of CUPS 2.5.x but not stopped releases of of 2.4.x yet. Latest release is 2.4.7 including the fix for CVE-2023-4504 and other changes, like adding OpenSSL support for the `cupsHashData()` function and bug fixes.

List of changes from the [original announcement](https://github.com/OpenPrinting/cups/releases/tag/v2.4.7):

- CVE-2023-4504 - Fixed Heap-based buffer overflow when reading Postscript
  in PPD files
- Added OpenSSL support for cupsHashData ([Issue #762](https://github.com/OpenPrinting/cups/issues/762))
- Fixed delays in lpd backend ([Issue #741](https://github.com/OpenPrinting/cups/issues/741))
- Fixed extensive logging in scheduler ([Issue #604](https://github.com/OpenPrinting/cups/issues/604))
- Fixed hanging of lpstat on IBM AIX ([Issue #773](https://github.com/OpenPrinting/cups/issues/773))
- Fixed hanging of lpstat on Solaris ([Issue #156](https://github.com/OpenPrinting/cups/issues/156))
- Fixed printing to stderr if we can't open cups-files.conf ([Issue #777](https://github.com/OpenPrinting/cups/issues/777))
- Fixed purging job files via cancel -x ([Issue #742](https://github.com/OpenPrinting/cups/issues/742))
- Fixed RFC 1179 port reserving behavior in LPD backend ([Issue #743](https://github.com/OpenPrinting/cups/issues/743))
- Fixed a bug in the PPD command interpretation code ([Issue #768](https://github.com/OpenPrinting/cups/issues/768))


## PAPPL 1.4.2
Also PAPPL received a bug fix release, 1.4.2.

- Fixed potential crash while listing devices ([Issue #296](https://github.com/michaelrsweet/pappl/issues/296))
- Fixed potential deadlock issue ([Issue #297](https://github.com/michaelrsweet/pappl/issues/297))
- Fixed loading of previous state ([Issue #298](https://github.com/michaelrsweet/pappl/issues/298))

By the way, the 1.4.x series of PAPPL can be built with either libcups2 or libcups3, while the master branch (2.x) is libcups3-only.
