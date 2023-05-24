---
title: OpenPrinting News - May 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: OpenPrinting Summit/PWG Meeting 2023, LAS 2023 in Brno, GUADEC 2023 in Riga, Ubuntu Summit 2023 in Riga, GSoC 2023, CUPS 3.x only end-2024, Print GUI testing, CPDB in print dialogs, security bugs
---
Lots of conferences during the last 4 weeks: the [Linux App Summit 2023](#linux-app-summit-2023) in Brno, then home for a week and after that back to the Czech Republic for a week in Prague for Canonical's Engineering Sprint, another conference-free week again and this week we had our annual [OpenPrinting Summit](#openprinting-summitpwg-meeting) together with the Printer Working Group (PWG) again, but completely online, so no third trip within a month.

Hot news from the OpenPrinting Summit, not so nice, by Michael Sweet, author of and maintainer of CUPS: He showed in his [CUPS Plenary](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2023.pdf) a nice roadmap for the CUPS 2.5.x releases, in contrary to our [last micro-conference](/OpenPrinting-News-September-2022/#openprinting-micro-conference-on-the-linux-plumbers-2022) in the end of this year. So I have asked him what about CUPS 3.x and he told that he has [pushed it out by one year](#cups-3x-release-postponed), to end-2024 ...

But nevertheless, we will all continue working on the New Architecture, the Printer and Scanner Applications, the Snaps, ... and I will switch Ubuntu 23.10, the Mantic Minotaur, as planned, to use the CUPS Snap as its printing system and the Printer Application Snaps as drivers for non-IPP-driverless printers.

We have now configured our GitHub repositories to support private security bug reports and have made our experience with the first vulnerability reported this way, and together with the help of Canonical's Security Team we got the fix completed. I have written up my experience as a [tutorial for free software projects using GitHub](#handling-reported-security-bugs-with-github).

And we will get a new team member: My colleague Amin Bandali, in the Ubuntu Desktop Team at Canonical responsable for the packaging of Firefox, got very interested in OpenPrinting. We talked a lot about it in hallway sessions on the Canonical Engineering Sprint, and he attended the whole OpenPrinting Summit and liked it a lot. He is interested in contributing the documentation for the libraries ([libcupsfilters](https://github.com/OpenPrinting/libcupsfilters), [libppd](https://github.com/OpenPrinting/libppd), [libpappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit)). Welcome on board!


## OpenPrinting Summit/PWG Meeting
On May 16-18 we had our annual meeting together with the [PWG](https://www.pwg.org/) (Printer Working Group) again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2023-virtual.html).

We presented and discussed our work of the last 12 months and what we plan to do next. Especially CUPS 2.5.x/3.x, use of OAuth with CUPS, cups-filters 2.x, Printer/Scanner Applications, Chrome OS, and the GSoC 2023 projects for the New Architecture were the main subjects of the meeting.

Main news item of the meeting was the [postponing of CUPS 3.x by a year](#cups-3x-release-postponed).

In contrary to the previous years we had no presentation from Artifex about Ghostscript and MuPDF. This is due to changes in the staff at Artifex after they got [acquired by ePapyrus](https://artifex.com/news/artifex-announces-acquisition). I will try to obtain news about the future of Ghostscript from the new/remaining team and post here later.

The time slot which got free by that I have made use of to report about cups-filters 2.x, filter functions, separating PPD file support into libppd, clean-up, release, ... in much more detail.

A highlight was also the session about the Goggle Summer of Code with our contributors from 2022 presenting and demoing their work and praising me as their mentor.

There will be written up summaries of the event in the coming weeks. I will post links to them in the June News.


## Linux App Summit 2023
My second [Linux App Summit 2023](https://linuxappsummit.org/) has taken place in Brno in the Czech Republic, the city of the European Red Hat office.

**Recordings: [Day 1, room 1](https://www.youtube.com/watch?v=3-_aUNZMvko), [Day 2, room 1](https://www.youtube.com/watch?v=J7-3Qj_oVMM), [Day 2, room 2](https://www.youtube.com/watch?v=jwMEDI4WsAE). Direct links to all sessions are in the comments of the videos (thanks, Ban Jo @Enry211). Unfortunately, there are no recordings of room 2 on day 1.**

**I have also added links to the recordings of all mentioned sessions in the [April News](/OpenPrinting-News-April-2023/#linux-app-summit-2023)**

On Friday morning I went by train from Vienna to Brno, a trip of only 2 hours, and so I already had lunch with my colleagues from Canonical and the Ubuntu community, Heather Ellsworth, Jeremy Bicha, Dennis Loose, Igor Ljubuncic, and Lucy Llewellyn. In the afternoon we also met Michal Kohutek, with whom we picked up the letters for the decoration of the release party (Ubuntu 23.04, Fedora 38, cups-filters 2.0). Then we all got to the pre-registration social event at Harry's Pivovar (brewery), where we met a lot of people, especially we met Jason Evangelho from Thunderbird (one of the sponsors of LAS) who was hanging out with us most of the time from then on and I also met Keywan Tonekaboni from the German c't computer magazine, who was very interested in my OpenPrinting work.

Friday night and Saturday in the early morning in my hotel room I was chatting with Mohit Verma, GSoC contributor for the "Printers" module in the GNOME Control Center, and with Gaurav Guleria, GSoC contributor of Common Print Dialog Backends (CPDB) support in the print dialogs, via Telegram and I got some last bug fixes on the printing GUI code for my demo in the afternoon. Thanks a lot!

On Saturday the conference started and keynote speaker Marcel Kolaja, member of the European Parlament, got Zdenek Dohnal's (Red Hat printing maintainer) and my help to get some papers for his [talk](https://conf.linuxappsummit.org/event/5/sessions/6/) ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=935s)) printed on the printer we had at the venue for my demo later that day. Also Jeremy Bicha asked me for some printouts later during the day.

For the Canonical/Ubuntu Office Hours we decided spontaneously to not do an AMA (Ask Me Anything) at the booth, but instead, do a panel about Ubuntu and Canonical, similar to what we did [last year](https://www.youtube.com/watch?v=r5trlMeCQR0). Heather Ellsworth, me, Dennis Loose, and Jeremy Bicha (seating order) talked about what is new in Ubuntu 23.04, and what we are working on, and to motivate people to work at Canonical, about how we got hired, how the hiring process is, and about how we work at the pioneer of work-from-home. There were not many attendees as it was at lunch time, but it is recorded, so that people can watch it ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=10810s)).

In the afternoon I met with Zdenek Dohnal and Marek Kasik (Upstream maintainer of GTK print dialog and "Printers" module in GNOME Control Center) about all things OpenPrinting and the Google Summer of Code. This was the first time I met Marek in-person.

After that my talk and demo about the printing GUI, GNOME Control Center and also the Common Print Dialog Backends used in the GTK and Qt print dialogs has taken place. After some struggle with the projection from my laptop it all worked fine. the printer which Zdenek and Felipe have brought from the Red Hat office also worked. It was the last time slot of the day, right before the release party. So I started telling that we will have the release party for cups-filters 2.x after my talk, as the 2 distros, Ubuntu 23.04 and Fedora 38 are the first 2 with the new version of cups-filters. I explained the New Architecture and its GUI requirements and then demoed the GNOME Control Center and the print dialogs ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=23760s), [slides](https://conf.linuxappsummit.org/event/5/contributions/158/attachments/35/60/las-2023-new-architecture-demo.pdf)).

The day's program ended with the release party, officially for Ubuntu 23.04 and Fedora 38, both being the 38th releaso of each distro, but it was also the release party for cups-filters 2.x, as the 2 distros are the first ones using the new generation of cups-filters.

There was a cake, one half with blue icing for Fedora and the other half with orange icing for Ubuntu, and the first cut was done together by Jiri Eischmann from Red Hat representing Fedora and Heather Ellsworth from Canonical representing Ubuntu.

On Sunday I got interviewed by Keywan Tonekaboni from the German c't computer magazine. He wanted to know everything about my OpenPrinting work. It took 40 min, one time slot of talks, and afterwards I also sent him a longer e-mail with links to write-ups, News Posts, and conference videos. The main intention is an article about OpenPrinting in the magazine, but as Keywan has attended the conference, there is also a [small news article](https://www.heise.de/news/Linux-Desktops-gemeinsam-auf-neuen-Wegen-8983436.html) (in German) about the LAS, also mentioning my OpenPrinting work in one paragraph.

Some further interesting talks to mention:
- "[What’s next for the Linux App Ecosystem?](https://www.youtube.com/watch?v=3-_aUNZMvko&t=18735s)", Panel Discussion by Sriram Ramkrishna with Jason Evangelho (Thunderbird), Lubos Kocman (SUSE), Aleix Pol (KDE), Heather Ellsworth (Ubuntu/Canonical), Robert McQueen (GNOME), Felipe Borges (Fedora)
- "[Free & Open Source Software: Software Design For The Environment](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=0s)" by Joseph P. De Veaugh-Geiss (KDE)
- "[GNOME Mobile Show & Tell](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=14266s)" by Jonas Dreßler (GNOME), Robert Mader (Collabora), and Tobias Bernard (GNOME)
- "[Snap performance optimization - The Firefox case study](https://www.youtube.com/watch?v=3-_aUNZMvko&t=15730s)" by Igor Ljubuncic (Canonical/Ubuntu)
- "[UnifiedPush - Push notifications for Linux](https://www.youtube.com/watch?v=3-_aUNZMvko&t=4975s)" by Volker Krause (KDE)
- "[Game development on Linux](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=22555s)" by Jesús Soto (Canonical/Ubuntu)
- "[We can’t spell BUGs without U](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=23109s)" by Heather Ellsworth (Canonical/Ubuntu)

See also Mastodon, hash tags [#LAS2023](https://ubuntu.social/tags/LAS2023), [#LinuxAppSummit](https://ubuntu.social/tags/LinuxAppSummit), and [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting).


## GUADEC 2023 in Riga
[GUADEC](https://events.gnome.org/event/101/overview) in Riga, Latvia, is approaching! Now the talks, workshops, and BoFs are selected and the [schedules](https://events.gnome.org/event/101/timetable/#all) are available and my 2 proposals got accepted!

**[The New Printing GUIs: GNOME Control Center and Common Print Dialog Backends](https://events.gnome.org/event/101/contributions/461/)**

Wed, July 26, 10:00 EEST, room 2

So right on the first day I will talk about the state of the art of the printing GUIs for the New Architecture, the "Printers" part of the GNOME Control Center and the Common Print Dialog Backends (CPDB) support in the print dialogs and will also demo the GUIs.

**[Your app everywhere, just in a Snap! (Workshop)](https://events.gnome.org/event/101/contributions/460/)**

Sat, July 29, 12:30 EEST, room 2

This GUADEC will get snappy! In this 2-hour interactive workshop you will learn how to snap (= package as a Snap) your favourite applications! You will snap a simple GNOME application on your own laptop and after that we (me and Jesús Soto) will also help you to snap your applications.

So if you have some free software application project and want to make it easily avcailable for your users, without them needing to compile, and without the goodwill of the maintainers of their distro, Snap is the right solution. This is distribution-independent, secure, and easy-to-use packaging, like on smartphones.

More about Snap: [The Powers](https://www.youtube.com/watch?v=TfB6QwR2GYg), [The People](https://www.youtube.com/watch?v=ido6kGmSHWI)

**Note:** Unfortunately, Heather Ellsworth is not able to attend GUADEC this year. Therefore Jesús Soto, also from the Canonical Desktop Team, replaces her as my co-speaker. I have already asked the organizers for updating the announcement of the workshop.

**Canonical/Ubuntu**

And as usual, I come with my colleagues, this time the Canonical Gang consists of Jeremy Bicha, Jesús Soto, Marco Trevisan, Mauro Gaspari, and me.

There will be an orange Ubuntu booth again, as last year, a nice point to find us and to start interesting hallway sessions ([Developers, not marketing people](/OpenPrinting-News-June-2022/#guadec-2022)).

And, in addition to my two sessions mentioned above, you will see my colleagues in these sessions:

**[How GNOME Gets into Ubuntu](https://events.gnome.org/event/101/contributions/486/)** by Jeremy Bicha

Wed, July 26, 13:50 EEST, room 1

Jeremy's description:
> GNOME produces two major releases every year. Ubuntu also has two releases every year.
>
> In this talk, a longtime Ubuntu Desktop team member will discuss how GNOME features and bugfixes get into Ubuntu.

**[Release Team BoF](https://events.gnome.org/event/101/contributions/475/)**

Sat, July 29, 12:30 EEST, room 1

This is a meeting of the GNOME Release Team, where Jeremy Bicha is member of.


## Ubuntu Summit 2023 in Riga
The [site](https://events.canonical.com/event/31/) for the Ubuntu Summit 2023 is up! And it will take place in Riga, Latvia! Riga? Did we not have it already? Yes, the GUADEC will take place there, too, see above. So me and my colleagues from Canonical who attend GUADEC will visit Riga twice, experiencing it once in Summer and the second time in fall. And we will hopefully find some nice restaurants and bars to recommend to the rest of Canonical ...

It will take place on the weekend between the two internal meetings of Canonical, the Roadmap/Product Sprint in the week before and the Engineering Sprint in the week after, so that Canonical employees having to attend the two Sprints are not away from their families for more than 2 weeks and many Canonical employees have no excuse to not be on the Summit ...

So it takes place on

**Fri, Nov 3, 2PM EET to Sun, Nov 5, 6PM EET**

If you have something awesome to present on the Ubuntu Summit, please submit your abstract. The [Call for Proposals](https://events.canonical.com/event/31/abstracts/) opens on June 1 and ends on July 2.

I will be in the organization team again and I am eager to see your submissions.


## Google Summer of Code 2023
Some weeks ago, Google has [announced](https://summerofcode.withgoogle.com/programs/2023/projects) the slot counts assigned to each of the mentoring organizations and the accepted projects. Unfortunately, [the Linux Foundation](https://summerofcode.withgoogle.com/programs/2023/organizations/the-linux-foundation) got only 12 slots for their 24 ranked proposals. This means that for OpenPrinting 6 of 10 ranked proposals got accepted.

The accepted proposals for OpenPrinting are the following:

**OpenPrinting: CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Till Kamppeter, Gaurav Guleria, Shivam Mishra, Rithvik Patibandla, Ira McDonald<BR>
See [below](#common-print-dialog-backends-getting-into-the-dialogs) and also [test it!](#test-the-gui-changes-for-the-new-architecture)

**Sand-Boxed Scanner Application Framework**<BR>
Contributor: Akarshan Kapoor<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Deepak Patankar, Ira McDonald

**GNOME Control Center: List and handle IPP print services for the New Architecture**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Marek Kašík, Zdenek Dohnal, Rithvik Patibandla, Ira McDonald<BR>
[Test it!](#test-the-gui-changes-for-the-new-architecture)

**Continuous Integration: Test Programs for libcupsfilters, libpappl-retrofit, libppd, CPDB, CPDB Libs**<BR>
Contributor: Pratyush Ranjan<BR>
Mentors: Till Kamppeter, Deepak Patankar, Zdenek Dohnal, Ira McDonald

**Adding support for the new functionality of IPP Everywhere 2.x to libcupsfilters and CPDB**<BR>
Contributor: Gayatri Kapse<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Zdenek Dohnal, Ira McDonald

**Native gutenprint Printer Application**<BR>
Contributor: Yuvraj Aseri<BR>
Mentors: Till Kamppeter, Solomon Peachy, Rishabh Maheshwari, Chandresh Soni, Ira McDonald

Some of the other candidates already told that they want to participate in OpenPrinting voluntarily, like for example fixing bugs.

Our contributors already have started their work on their projects and provided short write-ups about what they have done in the recent weeks:

*Kushagra Sharma (CPDB support for Mozilla, Chromium, LibreOffice, see [below](#common-print-dialog-backends-getting-into-the-dialogs) and also [test it!](#test-the-gui-changes-for-the-new-architecture)):* 
> Made a feature request for Chromium, Mozilla and LibreOffice for CPDB support.collaboration started with chromium dev team of CPDB support. Completed design documentation for better understanding of CPDB for upstream developers. In upcoming week I will be working with CPDB team at OpenPrinting to start the coding process to whichever development team agrees for adding CPDB support to existing print dialog.

*Akarshan Kapoor (Scanning with PAPPL):*
> The very first task that I had to implement was regex parsing for scan jobs following the eSCL Protocol in the C language. The challenge? Unlike C++ or Python, C does not come equipped with built-in regex parsing libraries. However, I have managed to surmount this challenge at a file-independent level. (The merge with the local code base is still pending.)
>
> The eSCL Protocol, or the network scanning protocol, forms an integral part of scanning functionality. It utilizes HTTP and XML for communication between devices, thereby making it a vital feature for transmitting both scan jobs/requests and scan features. 
>
> In the context of regex parsing, it was essential to comprehend and process XML responses effectively. To do this, I delved into the different XML responses outlined in the MOPRIA Scan Specifications. These specifications define the format of requests to be text/xml and interact with the appended directory functionality. 
>
> This posed an intriguing challenge, and I'm eagerly anticipating tackling more of these during my Summer of Code with Google and with OpenPrinting.

*Mohit Verma (GNOME Control Center "Printers", [test it!](#test-the-gui-changes-for-the-new-architecture)):*
> I am working on the project of  "List and handle IPP print services for the New Architecture". I have completed the work of listing _ipps-system._tcp,  _ipp-system._tcp, _ipps._tcp & _ipp._tcp print services and currently working on grouping the services together & making the entire process for finding and listing print services asynchronous. I am working with TIll extensively and he keeps on providing me valuable insights about my work by checking out my G-C-C build whenever required.

*Gayatri Kapse (IPP Everywhere 2.0 support):*
> I have figured out what "functionality implementation I have to do in libcupsfilters and user interface enhancement in CPDB. In libcupsfilters, I will incorporate the new attributes and their functionality specified in IPP Everywhere 2.0, ensuring seamless interaction with printers. For CPDB, I will enhance the user interface to support and display the new attributes, creating an intuitive printing experience." Currently I am going through the ipp-support in cups and then after figuring out where to code, I will start writing the logic and start testing it.

*Yuvraj Aseri (Gutenprint Printer Application):*
> I am working on native gutenprint printer application, Gutenprint is a package of high quality printer drivers for Linux, BSD, Solaris, Macintosh OS X, IRIX, and other UNIX-alike operating systems. I have completed the framework of printer application. I have gone through codebase of libgutenprint to add functionalities in the applications. Currently I am reading the source codebase of pappl-retrofit to understand how to integrate the libgutenprint into printer application.


## CUPS 3.x release postponed
As every year, CUPS author Michael Sweet has presented his [CUPS Plenary](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2023.pdf) on the [OpenPrinting Summit/PWG meeting](#openprinting-summitpwg-meeting). When I browsed through the slides before the actual presentation I already saw that the releases of CUPS 2.5.x were scheduled at the end of this year (page 8) and there were no release schedules at all for CUPS 3.x (page 11+).

So I asked Mike about the CUPS 3.x release while he was giving his talk and he confirmed that the CUPS 3.x release is indeed pushed out by a year, meaning that the release will be end-2024.

This especially also means that Ubuntu 24.04 LTS will come with CUPS 2.5.x instead of 3.x. But as we will switch from the Debian packages of CUPS to the [CUPS Snap](https://github.com/OpenPrinting/cups-snap) already in Ubuntu 23.10 anyway, the New Architecture will already be reality in 24.04 LTS.

So we are still heavily working on the New Architecture! And when CUPS 3.x will finally make it into the distributions, the Printer Applications as replacement for the classic CUPS printer drivers will be well established so that we get a smooth transition into the new CUPS.

Also we will be starting already to test the new [libcups 3.x](https://github.com/OpenPrinting/libcups) in the Printer Applications. they do not need anything from libcups which is removed from version 3.x, especially as the retro-fitting Printer Applications are using [libppd](https://github.com/OpenPrinting/libppd).


## Approaching final release of cups-filters 2.0.0
Now having the new cups-filters in the first 2 distros, Ubuntu 23.04 and Fedora 38, first bug reports started to appear:

**All PDFs when printed come out mirror image ([Ubuntu bug #2018538](https://bugs.launchpad.net/bugs/2018538))**

I asked for the queue's PPD file from the people who observed the bug but did not yet get an answer.

**cups-browsed is using an excessive amount of CPU ([Ubuntu bug #2018504](https://bugs.launchpad.net/bugs/2018504))**

I am not able to reproduce it by myself, but I got debug logs from one of the people suffering this bug. Need to investigate.

**Brother DCP-J125 not printing after update to cups-filer 2.0b3 & 2.0rc1 ([libppd issue #20](https://github.com/OpenPrinting/libppd/issues/20))**

Here I already did deeper investigations. It occurs for PPD files which require the print data to be turned into PostScript, either for a PostScript printer or for a proprietary printer driver (here from Brother) and if the printer stacks up the printed sheets face-up and therefore needs the jobs printed in reverse order. In this case the `ppdFilterPSToPS()` filter function is actually not outputting any print data due to a wrong function being used for the output. This was most probably introduced with the conversion of the `pstops` CUPS filter to the `ppdFilterPSToPS()` filter function. At too many places the regular `puts()`/`printf()` got replaced by `doc_puts()`/`doc_printf()` where actually just a `fputs()`/`fprintf()` to `outputfd` had been needed.

**PDFtoraster - Printout of image files (.JPEG, .PNG) are not properly aligned and cropped ([cups-filters issue #529](https://github.com/OpenPrinting/cups-filters/issues/529))**

Not yet started the investigations.

I will try to fix these bugs before the final release, at least if I get enough cooperations by the reporters and who else claimed to have observed the bug.

I will also update all the Snaps, the CUPS Snap and the Printer Application Snaps, to use the new cups-filters components and check whether they are still working correctly.

If all this works well and any occuring bugs are fixed I will do the final release.

After the release of 2.0rc1 some newly discovered bugs got already fixed:

In libcupsfilters the filter function `cfFilterPDFToPDF()` failed to correctly flatten filled interactive PDF forms in some files, losing the entered data ([Issue #28](https://github.com/OpenPrinting/libcupsfilters/issues/28)). With the flattening actually done by QPDF I asked Jay Berkenbilt, maintainer of QPDF, for help and he pointed me to [QPDF issue #949](https://github.com/qpdf/qpdf/issues/949) where the same problem was reported. Jay fixed the bug and released [QPDF 11.4.0](https://github.com/qpdf/qpdf/releases/tag/v11.4.0), which I tested and this indeed fixed the bug. So I [updated the documentation](https://github.com/OpenPrinting/libcupsfilters/commit/151863b1a2) appropriately.

In cups-filters we got our [first private security bug report](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-gpxc-v2m8-fr3x). It was that the (very rarely used) `beh` backend, a wrapper backend to handle errors of the actual backend, called the actual backend with the `system()` function. And this function takes a command line as a single string and not the arguments as separate strings, so it is easy to inject arbitrary commands by a forged job title. This is fixed and published now and with this [I learned how to handle security vulnerabilities as upstream organization](#handling-reported-security-bugs-with-github).

I also added [some missing `#include` lines in the `backend/parallel.c` file of cups-filters](https://github.com/OpenPrinting/cups-filters/commit/a4809b8990). I discovered this when I prepared libcupsfilters for libcups3 support [cleaning up some things in it](https://github.com/OpenPrinting/libcupsfilters/commit/119a40350).

And in cups-browsed we have first [switched to `pkg-config` from the deprecated `cups-config`](https://github.com/OpenPrinting/cups-browsed/commit/11bc2879) and second, fixed a [glitch in the build system](https://github.com/OpenPrinting/cups-browsed/commit/1921fa792c01) ([Issue #12](https://github.com/OpenPrinting/cups-browsed/issues/12)).


## Test the GUI changes for the New Architecture
Central part of the OpenPrinting work in [this year's GSoC](#google-summer-of-code-2023) is to make the printing-related GUIs working with the New Architecture. Mohit Verma is adding support for IPP print destinations and Printer Applications to the "Printers" module of the GNOME Control Center, while Gaurav Guleria has added CPDB support to the GTK print dialog and is adding it also to the Qt one. And Kushagra Sharma is adding CPDB support to application-specific print dialogs, for Firefox, Thunderbird, Chromium Browser, and LibreOffice.

This code needs testing, not only by the mentors of the GSoC contributors, but by as many people as possible, and so that everyone can easily install the packages with the modifications for supporting the New Architecture, I have created a [PPA (Personal Package Archive)](https://launchpad.net/~till-kamppeter/+archive/ubuntu/new-arch-dev) with all the modified packages for Ubuntu 23.04 (Lunar Lobster) on the x86_64, arm64, and armhf architectures (most PCs, laptops, mobile devices, and single-board computers, like Raspberry Pi). So one can simply include the PPA in one's system as described and install the packages. This PPA will get updated frequently, so come back at any time and see the progress.

In addition, the PPA helps to demo the development on conferences (see my talks on [LAS 2023](#linux-app-summit-2023) and [GUADEC 2023](#guadec-2023-in-riga) above, [slides](https://conf.linuxappsummit.org/event/5/contributions/158/attachments/35/60/las-2023-new-architecture-demo.pdf)) and I will also use it to present the work to Canonical's design team, so that they can try it out and optimize the UI design of the "Printers" module of GNOME Control Center.

**GNOME Control Center**

The test version of the "Printers" module of the GNOME Control Center (package `gnome-control-center` in the PPA) currently only covers the main view, the list of available print destinations, not the Printer Application support in the "Add Printer" dialog.

In the main view you will see:
- All available IPP print services/destinations
  - Network printers
  - IPP-over-USB printers
  - Printer Applications
- Permanent CUPS queues, created manually or created automatically by plugging a (classic) USB printer or by cups-browsed
- If an IPP device (most likely a Printer Application) has more than one print destination, the destinations are listed together.

So you will see all print destinations where you can print to with CUPS, both classic CUPS queues and IPP destinations for which CUPS creates a temporary queue when printing to them.

The menu opening when clicking the button to configure an entry differs whether we have a classic CUPS queue or an IPP destination. For the former you will have, as before, the possibilities to set default option settings, remove the queue, ..., but for the latter you will simply only have the possibility to enter the destination's web admin interface, as there is no local CUPS queue to configure, but you can configure the service by its web interface.

**Common Print Dialog Backends**

The Common Print Dialog Backends (CPDB) you can test on the standard print dialogs of GTK and Qt 6.x. The packages to install from the PPA are `gtk4` and `qt6-base` resp. In addition, you also need to install `cpdb-backend-cups` and `cpdb-backend-file`. The components of `cpdb-libs` should get installed automatically.

Most GNOME or GTK applications, like `gnome-text-editor`, use the standard GTK print dialog. So simply print from them (`Ctrl + P`) and you are testing the CPDB-based print dialog.

For Qt, unfortunately, most applications available for Ubuntu 23.04 use Qt 5.x, and the CPDB support is only available on our test version of Qt 6.x. So you need to find applications using Qt 6.x by the following command:
```
apt rdepends libqt6printsupport6
```
For example you could install `focuswriter` for the test. Do not be disappointed that the GUI of the print dialog is not cute, we did not change it for adding the CPDB support and it is the original from when CUPS support was introduced to Qt ~20 years ago.

Note also that some applications, as far as I know currently, Firefox, Thunderbird, Chromium Browser, and LibreOffice have their own print dialogs. As long as these do not appear in my PPA, you should use the standard GTK print dialog by clicking the appropriate link or button inside the print dialogs of these applications.

Also note that desktop applications installed as Snaps or Flatpaks do not use your system's libraries, especially not the GTK and Qt you have installed from my PPA, but on the other side they often use a print dialog provided by the running desktop environment instead of their own print dialogs, so that if you are running Ubuntu's standard GNOME (or another GTK-based desktop) and you get the standard GTK print dialog when you print from your application, you most probably have the CPDB-enabled one from my PPA.

**Test example**

Here is a step-by-step HOWTO to test the new GUIs:

Stop cups-browsed (to not get permanent CUPS queues generated for each IPP print destination):
```
sudo systemctl stop cups-browsed
```

Include the PPA in your package installation sources:
```
sudo add-apt-repository ppa:till-kamppeter/new-arch-dev
sudo apt update
```

Install the packages (and focuswriter as Qt 6.x example):
```
sudo apt install cpdb-libs cpdb-backend-cups cpdb-backend-file gnome-control-center gtk4 qt6-base focuswriter
```

For being able to test even without having a printer at hand, install cups-ipp-utils:
```
sudo apt install cups-ipp-utils
```
and run the IPP printer emulator `ippeveprinter`:
```
ippeveprinter -s 10,10 -2 -f "image/urf,application/pdf" -d /tmp -k testprinter
```
This emulates a color IPP printer with duplex capability which understands jobs in Apple Raster (URF) and PDF. Printing to it makes the input file being dropped in the `/tmp` directory, without any conversion (original URF or PDF file). DNS-SD service name is `testprinter`.

Create a classic CUPS queue via
```
lpadmin -p testclassic -E -v /dev/null -m drv:///sample.drv/generic.ppd
```

If you have a printer, make it available in your local network and/or connect it via USB.

If your printer is not a driverless IPP printer (or a driverless printer which can also be used the classic way, like PostScript for example), install the appropriate Printer Application:
```
sudo snap install ps-printer-app
sudo snap install ghostscript-printer-app
sudo snap install hplip-printer-app
sudo snap install gutenprint-printer-app
```
Open the web interface of the Printer Application ([`http://localhost:8000/`](http://localhost:8000/)) either using a web browser directly or finding the Printer Application in the destination list of the "Printers" module of GNOME Control Center, clicking its configure button (with a gear icon), and choosing "Web Interface" (see also below).

Create a print queue using the "Add Printer" button in the web interface (under "Printers", top-right.

Now run
```
gnome-control-center
```
or, if you are using GNOME as your desktop, start it by clicking the gear button in the quick settings panel which you get when clicking the upper-right corner of your screen.

Choose the "Printers" entry in the list on the left.

In the main area you see a list of the print destinations now. At least you should have the `testprinter` which you have created with `ippeveprinter` and `testclassic` which you have created with `lpadmin`.

If you are so lucky that you have a printer at hand, you will see more entries, especially the print queues which you had created before starting this test and also entries coming directly from the printer itself (if it is a driverless IPP printer) or from the Printer Application you have installed and set up.

For the Printer Applications you do not only get an entry for each of your configured print destinations within it, but one extra entry for the Printer Application itself. This allows to see its presence and access its web interface already before adding the first printer to it, especially to do just this. You can try this also by installing a Printer Application even without having an appropriate printer.

Now each destination has a button with a gear on it. This is the configure button. Click it, and you will see one of two types of a menu, either with four or five entries, like "Printer Options", "Remove Printer", ..., or with only one entry, "Web Interface". If you get the former, you have a classic CUPS queue, which as before, you configure locally using the functionality of GNOME Control Center. In case of the latter you have an IPP print service. There is no local configuration for it, but it has a web admin interface. Click on "Web Interface" to open it in your browser.

There is nothing new on how to configure classic CUPS queues, so I will not elaborate on that here.

In case of the web interfaces, a web interface is required by the IPP standards, therefore you even get one for `ippeveprinter`, not a very useful one, but there is one. By the web interfaces you see where the print destinations come from, you know the manufacturer's interfaces of network printers, and Printer Applications show the one of PAPPL ([example HPLIP](https://snapcraft.io/hplip-printer-app)). And if you see the web interface of a network printer and the URL is `http://localhost:60000/`, then it is IPP-over-USB, you have connected a driverless IPP printer via USB.

Note that there are still some glitches, especially GNOME Control Center gets blocked while creating the print destination list or groups of destinations from a Printer Application are not clearly marked, lead entries of Printer Applications are not marked as such, no fax-out queues listed, ...

Now open applications and trigger their print functionality (`Ctrl + P`). The print dialog pops up. If it is a standard GTK print dialog you should see all print destinations which you have seen in GNOME Control Center. In case of a Qt print dialog, only if the application is using Qt 6.x.

Run for example
```
gnome-text-editor
focuswriter
```

Select printers, set options, print ... This all should work. Note that options can be different between IPP services and classic CUPS queues for the same printer. If you print on `testprinter` grab your "printouts" in the `/tmp` directory.

Opening the print dialogs must have started the CPDB backends. Run
```
ps aux | grep print-backends
```
and you will see entries for each backend in the `/usr/lib/*/print-backends/` directory.


## Common Print Dialog Backends getting into the dialogs
Kushagra Sharma got now [accepted as GSoC contributor](#google-summer-of-code-2023) with his [project](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#cpdb_support_for_application_s_print_dialogsfirefox_chromium_libreoffice) of adding CPDB support to several application's print dialogs. He gets mentored by Gaurav Guleria and me and he has already started working on his project.

I have found for him the places and people in the upstream organizations of Mozilla (Firefox/Thunderbird), Chromium, and LibreOffice, to propose the switch of the print dialog from direct CUPS support to CPDB. Currently, we have reached out with the following activities:
- I posted a [Feature request for Mozilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311) already some weeks ago. First discussion has started.
- I posted on the [mailing list for LibreOffice](https://lists.freedesktop.org/archives/libreoffice/2023-April/090210.html), after some IRC chat on #libreoffice-dev on Libera.Chat.
- I am in contact with Piotr Pawliczek and Benjamin Gordon from the Chromium Paper I/O team and, after getting an appropriate hint via the developer [Google group](https://groups.google.com/a/chromium.org/g/chromium-dev), Kushagra has created a [design document](https://docs.google.com/document/d/1xJ6XP3myP45CeJjO3lVYqpCBUblXp6J259qMhN0wxi0/edit?usp=sharing) and posted a [feature request](https://bugs.chromium.org/p/chromium/issues/detail?id=1445999) for the CPDB support on Chromium's print dialog. Benjamin is aware of the feature request.

Kushagra is currently studying the code of the print dialogs and also finding the best agreements with with the upstream developers on how to implement the CPDB support.


## Handling reported security bugs with GitHub
a very important maintenance task for free-software organizations is to handle reports of security vulnerabilities.

Generally all the development of a free software project is public. Changes, independent whether for new features or to fix bugs, are committed into public code repositories. And all the work towards them is discussed on public platformas, mailing lists, discussion forums, conferences.

Reporting a security vulnerability on a public bug tracker is counter-productive though, as not only the developers supposed to fix the bug but also potential attackers can read them and get aware of the bug before it gets fixed and updates made available for all major OS distributions.

So we get here into a situation where also free software developers have to keep something confidential. To avoid potential attackers to get aware of a security flaw, such bugs need to get reported in private and their publication be embargoed until the bug is fixed and the package maintainers of the distributions having gotten a reasonable period of time to apply the fix to their packages.

This is the common practice between the upstream free software projects and the downstream OS distributions.

Therefore most bug tracking systems ask the reporter of a bug whether it is a security issue, or whether the bug should be reported publicly or in private.

We at OpenPrinting, and also many other free software organizations and individual developers, use GitHub as platform to host the code repositories and track our bugs. Unfortunately, in GitHub, if you start a new repository or a new organization, private bug reporting is not available by default. It is supported though, but it is not intuitive how to activate it and how to tell who of the organization should have access.

Also it is no obvious how to make the OS distribution's maintainers or security teams aware of a received security bug report.

This makes many developers just fix the bug and commit the fix ...

I discovered some weeks ago, when I reported a (regular) bug on [PAPPL](https://github.com/michaelrsweet/pappl/), that when clicking the button to report a new issue, that an [extra page](https://github.com/michaelrsweet/pappl/issues/new/choose) appeared where I can choose whether my issue is a regular bug, a feature request, or a security vulnerability. Such a page did not appear when reporting a bug on any OpenPrinting reporsitory.

So I investigated what is different, and found out that private security bug reports must be activated under the security settings and bug report templates to generate selection page for the report type must be created. I also told Mark Esler of Canonical's Security Team about that and he was very happy about having learned about this, as Canonical is using GitHub heavily, too.

Once done so, I quickly received the [first security issue](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-gpxc-v2m8-fr3x). It was easy to fix the actual bug, and one could also request a CVE number easily by a simple click in GitHubs interface for private security bugs, but then I ran into the problem on how to inform all relevant OS distributions about this report.

It came the time of the Canonical Engineering Sprint in Prague where all the engineers of Canonical (~700) meet in a huge hotel for a week, including the Security Team. So I took the opportunity and scheduled a meeting with the Security Team in their room, exactly with Mark Esler, Marc Deslauriers, and Seth Arnold. They gave me a 25-min [HOWTO](https://diataxis.fr/how-to-guides/) on how to proceed, posting the report and the patch on the appropriate mailing list where all the responsible persons of the distributiins are subscribed and setting the publication date/end of the embargo and at the end of the embargo, regardless whether all the distros have actually done the update, publish the report by committing/merging the fix and posting on a public list specialized for that.

I suggested them to give a workshop or at least a 50-min talk on the upcoming [Ubuntu Summit](#ubuntu-summit-2023-in-riga), to help the several upstream application developers who attend the conference. Mark told that it took him only 25 min to explain that to me, but then I told him that his explanation was a HOWTO for an experienced upstream developer/organization lead and downstream packager, but on the conference we need a [tutorial](https://diataxis.fr/tutorials/) for less experienced application developers ...

And now the last challenge was to manage who in our OpenPrinting team will be able to access the security bug reports, without making all of them owners of the organization in GitHub. But this I found out rather quickly. One has to create a team in the GitHub organization and make it the security manager.

Mark Esler has also reported the problem of needing to create templates for getting a button to report a security issue to GitHub and that got fixed, so now one only needs to activate private bug reports in the settings. And, on the day after my meeting with the security team on the Sprint, he gave a lightning talk about all this and mentioned me giving him the hint about security bug reporting support in GitHub.

**So what you have to do is the following:**

*Activate security bug reports for a whole organization or account*

By default, private vulnerability reporting is not active at all. This makes your users hesitating to report security vulnerabilities or reporting them publicly, like regular bugs, and it also makes developers just committing the fixes of such bugs.

At a rather hidden place in your account's (or your organization's) GitHub settings you can activate private bug reporting. We recommend to activate it to your whole account/organization and get it activated by default for new repositories in it. This way you avoid that any repository stays without coverage.

In the following URLs replace `XXX` by your organization's (would be `OpenPrinting` for me) or your user name (`tillkamppeter` for me), depending on where you want to apply the changes.

Go to your organization's/account's start page:
```
https://github.com/XXX
```
and then click "Settings" near the top, to get onto the settings panel of your organization/account:
```
https://github.com/organizations/XXX/settings/profile
```

Then click "Code security and analysis" under "Security" on the left:
```
https://github.com/organizations/XXX/settings/security_analysis
```

Under "Private vulnerability reporting" check "Automatically enable for new public repositories" to make sure all repositories added in the future accept security bug reports, and click "Enable All" to enable this functionality on all already existing repositories.

*Activate security bug reports for a single repository*

If you are maintaining a repository in an organization where you have no appropriate administrator rights for, or if you do not want to accept security bugs on all your repositories, you can activate them also only for a single repository.

Please replace also `YYY` by the name of the repository, for example `cpdb-libs`.

Go to your repository's start page:
```
https://github.com/XXX/YYY
```
and then click "Settings" near the top, to get onto the settings panel of your repository:
```
https://github.com/XXX/YYY/settings
```

Then click "Code security and analysis" under "Security" on the left:
```
https://github.com/XXX/YYY/settings/security_analysis
```

Now click "Enable" for "Private vulnerability reporting" and then "Save changes" at the bottom of the page.

*Ready for receiving private security vulnerability reports*

Now, when a user wants to report a new issue, clicking on the "New Issue" button on your repository's issues page
```
https://github.com/XXX/YYY/issues
```
they get asked whether the issue should be a regular, public bug report or a private security vulnerability report.

Note that owners of the repository do not get asked this, but there is an alternative way to start a security bug report, clicking "Security" at the top of the start page of a repository, landing at
```
https://github.com/XXX/YYY/security
```
and then clicking "Advisories" under "Reporting" on the left, getting onto
```
https://github.com/XXX/YYY/advisories
```

On this page there is a button "New draft security advisory". Click it to start a new private security bug report.

If you have activated private bug reporting for your whole organization or account, this is valid for all your repositories.

*Allow access to everyone who needs it*

Security bug reports mentioned above are only accessible to the owners of your organization. This is most probably not everyone in your developer team who should have access, for example as they would be the right persons to fix these bugs.

So you have to define the security managers for your organization.

Go to the organization's start page again:
```
https://github.com/XXX
```
and click "Teams" near the top:
```
https://github.com/orgs/XXX/teams
```

Create a team and add all the people who need to access the security bug reports of your organization. These are the core developers of your organization, but also could be the security people of the major OS distributions, ...

You can add/invite more people at any time later.

Now go back to the start page and click "Settings" and then "Code security and analysis" again. Scroll down to find "Security managers". Enter the name of your newly created team into the search bar and add the team. Now the members can do everything in the security bug reports, commenting, proposing patches, ...

*Handling a security vulnerability report*

Once having done all the setup, you will sooner or later get your first vulnerability report, probably the sooner, the more your project is an essential part of the operating system.

You find all your vulnerability reports to each repository when you click "Security" at the top of the start page and then "Advisories" under "Reporting" on the left:
```
https://github.com/XXX/YYY/advisories
```

It is expected that you do the whole procedure within three months after the original report.

First, fix the bug, but do not commit the fix to the regular, public repository. If you need more info from the reporter, especially if they have not supplied steps to reproduce the bug, ask via comments on the report. Do not discuss the bug on public mailing lists or forums. You can also discuss the bug with your security team colleagues by means of comments in the private bug report.

If you have fixed it, use the appropriate button in the security bug report to let GitHub request a CVE ([Common Vulnerabilities and Exposures](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures)) number for you. With this the bug gets registered in the central [CVE database](https://cve.mitre.org/index.html).

Once having gotten the CVE number follow the instructions under "Collaborate on a patch" near the bottom of the bug report to clone the private fork of your repository. Apply your fix to your local copy of the fork, then commit and push it. Make sure to include the CVE number in the first line of the commit message, for example
```
CVE-yyyy-xxxxx: Heap buffer overflow in my-special-daemon
```
The title after the CVE number could be the title of the bug report, or a one-line description of the fix. Add more lines to explain your fix. With this you get a private pull request attached to the bug report.

Now you can discuss the fix with your team colleagues and with the original reporter, and they all can also clone the private fork to test the fix and/or apply additional changes.

Next step is to inform the responsible people of the major OS distributions, usually package maintainers and security teams, about the bug and the fix and give them a time period of around 1 to 2 weeks to provide updates with the fix for their distributions. Only after this time period (the embargo) expires, you publish the bug report and the fix.

For this there is a non-public mailing list with the right persons subscribed to it. So you do not need to know all these people to either mail to them individually or add them to your organization's security team.

The e-mail address of the list is [distros@vs.openwall.org](mailto:distros@vs.openwall.org) (or [linux-distros@vs.openwall.org](mailto:linux-distros@vs.openwall.org) if the bug is Linux-specific).

Please respect the list's [policy](https://oss-security.openwall.org/wiki/mailing-lists/distros).

The email subject must start with the four characters `[vs]` to bypass their weird anti-spam filtering measures. The subject should also contain the CVE number and a one-line description of the bug.

The mail body should contain a description of the bug, instructions to reproduce or exploit, if available, a link to the bug report (not yet working for most of the readers), the planned date for the publication, and the patch to fix the bug should be attached to the e-mail. Simply copy and paste the appropriate text content from the bug report.

For the publication date the maximum is 14 days from the date of sending the mail, 7-10 days are preferable. Make sure that at that date a team member is available to do the publication.

On the day of publication, first merge the private pull request, so that the fix gets committed to your public repository. If you want, spin a release of your repository now. Then click the button at the bottom of your bug report to publish the report. Now everyone can access it. The link to the report which you have put into your e-mail will work for everyone from now on.

Send another e-mail, now, to the public list [oss-security@lists.openwall.com](mailto:oss-security@lists.openwall.com), with the same subject and body as your first e-mail, no attached patch required any more if you instead add a link to the appropriate commit (the one from merging the private pull request) in your public repository.

You always publish a security bug on the publication day you have chosen in your first e-mail, regardless of whether all distributions provide updates in time. This way you do not make the publication dependent on a distribution not doing their duty and do not get stressed on that distributions do not provide their updates. It is in the full responsibility of each distribution not to be covered on the day of publication.

Now you are done with the security bug.

This is at least what I did on [our first security report](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-gpxc-v2m8-fr3x).

Thanks a lot to Mark Esler, Marc Deslauriers, and Seth Arnold from Canonical's Security Team for guiding me through handling security bug reports as upstream organization and for reporting to GitHub the need of creating templates to make security bug reporting possible in the regular issue reporting process. And thanks to the GitHub folks to quickly fix this.
