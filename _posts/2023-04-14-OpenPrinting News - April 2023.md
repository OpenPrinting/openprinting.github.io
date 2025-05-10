---
title: OpenPrinting News - April 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Ubuntu 23.04 release, LAS 2023 in Brno, GSoC 2023, Release Candidate for cups-filters 2.0.0, CPDB support in print dialogs
---
Not long ago that there were the [March News](/OpenPrinting-News-March-2023/), and now we already have the April ones! April News contain important announcements and therefore they cannot be late, usually the new [Ubuntu release](#ubuntu-2304-lunar-lobster-is-coming), and the latest and greatest about the upcoming [Linux App Summit](#linux-app-summit-2023). But no April fool's pranks, like [this one](https://news.itsfoss.com/ubuntu-ditch-snap/), for that we are too late. But don't worry, we will go on [snappy](https://snapcraft.io/search?q=OpenPrinting) ...


## Ubuntu 23.04 (Lunar Lobster) is coming!
On Thursday next week, April 20, 2023, is Ubuntu release day again! Ubuntu 23.04!

This will be the first distribution with the second generation of cups-filters! The Release Candidates of the components, released this week, in time for Final Freeze have made it into it.

This is the first piece of the New Architecture, and even if Ubuntu 23.04 has not yet switched over, it is important to have the new cups-filters already there so that it has one Ubuntu release (6 months) more of getting intensely tested.

The user-facing printing-related changes are lots of bug fixes:
- More accuracy in handling page sizes and margins, including overspray for borderless printing
- `orientation-requested` now also correctly working for images and plain text as input
- Plain text printing in landscape orientation
- Correct handling of the `print-scaling` attribute for all input formats
- Suppress auto-rotation of images by supplying `landscape=false` or `orientation-requested=3/4/5/6` attributes
- Auto-selection of output color space based on requested print quality
- Color printers print in color by default
- 16-bit-per-color-output support for all input formats
- Correct 1-bit monochrome dithered output
- Apple Raster preferred over PDF for more printing speed and reliability, printer's PDF interpreters are often slow and buggy
- cups-browsed is more stable and reliable now
- Universal CUPS filter for less external filter executable calls by CUPS

In addition, there are included:
- **CUPS 2.4.2** (with [auto-setting PPD options by print-quality, print-color-mode, and print-content-optiomize job IPP attributes](/OpenPrinting-News-August-2021/#retro-fitting-of-cups-printer-drivers-into-printer-applications))
- **Ghostscript 10.0.0** (with fix for [not matching custom page size against PPD](https://github.com/OpenPrinting/cups-filters/issues/484))
- **HPLIP 3.22.10**

Otherwise we have GNOME 44 now with [a lot of nice new features](https://www.omgubuntu.co.uk/2023/03/ubuntu-23-04-features)!

And there will be a [**release party**](#release-party)!! In-person on the [Linux App Summit in Brno](#linux-app-summit-2023)! On Saturday evening, right after the talks. A joint party together with the release of Fedora 38!


## Linux App Summit 2023
The [Linux App Summit 2023](https://linuxappsummit.org/) in Brno in the Czech Republic is approaching! It is less than a week and we will meet in Brno.

Brno is an office location of Red Hat, so we will have many people from Red Hat on the Summit, but for Ubuntu not getting overrolled by them there will be a Canonical Gang of 7 (!): Dennis Loose, Heather Ellsworth, Igor Ljubuncic, Jeremy Bicha, Jesús Soto, Marco Trevisan, and me.

**Update: Links to the recordings**

**Recordings: [Day 1, room 1](https://www.youtube.com/watch?v=3-_aUNZMvko), [Day 2, room 1](https://www.youtube.com/watch?v=J7-3Qj_oVMM), [Day 2, room 2](https://www.youtube.com/watch?v=jwMEDI4WsAE). Direct links to all sessions are in the comments of the videos (thanks, Ban Jo @Enry211). Unfortunately, there are no recordings of room 2 on day 1.**

### OpenPrinting

As printing and scanning are not unimportant for the free software application ecosystem, OpenPrinting will be present again, this year with two sessions, both on Saturday, April 22 (all times CEST):

**15:00: OpenPrinting Informal BoF/Scheduled Hallway Session**

Meeting in front of Room 1/Plenary Room, exact location TBD, no streaming/recording. Please watch out here and on Mastodon, #LAS2023, #LinuxAppSummit, and #OpenPrinting.

This one is an informal meeting of me with my colleagues and contributors on the printing area, Zdenek Dohnal (Red Hat), Marek Kasik (GNOME/GTK), Albert Astals Sid (KDE/Qt), Harald Sitter (KDE/Qt). We will mainly talk about the printing GUI, the print dialogs of Desktop environments and applications, and also printer setup tools, about the GSoC work in this area, but if desired, also about general printing subjects ...

Everyone can join, make suggestions, ask questions, for example for developing apps with print or scan functionality, or perhaps you want to join OpenPrinting? For developing, documentation, testing, ...

The duration of the meeting is not pre-determined, if we have more to discuss, it simply takes longer, at the latest, it ends around 16:30, and we all will move into the Plenary Room for the second session ...

**16:35: [The New Printing GUIs: GNOME Control Center and Common Print Dialog Backends](https://conf.linuxappsummit.org/event/5/contributions/158/)**

Room 1/Plenary Room

([Video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=23760s), [Slides](https://conf.linuxappsummit.org/event/5/contributions/158/attachments/35/60/las-2023-new-architecture-demo.pdf))

Here I will give an update about our printing-related GUI work for the New Architecture. I will show off the state of the art of the "Printers" module in the GNOME Control Center, done by GSoC contributor Mohit Verma, and the Common Print Dialog Backends (CPDB), done by GSoC contributor Gaurav Guleria.

I will demo the new GUI components, the GNOME Control Center, and the CPDB based on the GTK print dialog, and, if possible also the Qt print dialog.

As I meet Marek Kasik, maintainer of the "Printers" G-C-C module and the GTK print dialog before this session and having him also in the room, there may be changes.

After the demos there will be a Q&A/AMA (As me anything) part and there will not only be me but also Zdenek, Marek, Albert, and Harald (from the BoF) be present and participating in the conversation.

### Ubuntu/Canonical

With a Canonical Gang of 7 and Canonical being main sponsor of this event, we will have a lot of sessions from the Ubuntu folks:

**Opening and Closing Remarks**

Given by Heather Ellsworth and Igor Ljubuncic.

**Booth**

There will be a Ubuntu/Canonical booth, no marketing people, but a gathering point to meet who makes Ubuntu, to start great hallway chats (like described [here](/OpenPrinting-News-June-2022/#guadec-2022)).

**Office Hours**

Meet the whole gang at the booth, Saturday in the lunch break, 12:45-13:45. Ask your questions, discuss with us the future development of Ubuntu, get help for your application projects by the desktop developers and snappers, ...

**Update: We did a panel instead ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=10810s)).**

**Talks, panels, workshops, ...**

*Saturday, April 22*

[14:15: Snap performance optimization - The Firefox case study](https://conf.linuxappsummit.org/event/5/contributions/152/)<BR>
Igor Ljubuncic, Room 1 ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=15730s))

[14:15: What's next for the Linux App Ecosystem? Panel Discussion](https://conf.linuxappsummit.org/event/5/contributions/151/)<BR>
Host: Sriram Ramkrishna; Heather Ellsworth is one of the guests, Room 2 ([video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=18735s))

[15:50: Bringing Windows applications to Linux app stores with Wine snaps](https://conf.linuxappsummit.org/event/5/contributions/156/)<BR>
Mr Merlijn Sebrechts (Ubuntu - Ghent University - imec) and Ms Lucy Llewellyn (Snapcrafters & Ubuntu), Room 2

[16:35: The New Printing GUIs: GNOME Control Center and Common Print Dialog Backends](https://conf.linuxappsummit.org/event/5/contributions/158/)<BR>
Till Kamppeter, Room 1 (see [above](#openprinting), [video](https://www.youtube.com/watch?v=3-_aUNZMvko&t=23760s), [slides](https://conf.linuxappsummit.org/event/5/contributions/158/attachments/35/60/las-2023-new-architecture-demo.pdf))

[16:35: Accessibility Testing Workshop](https://conf.linuxappsummit.org/event/5/contributions/157/)<BR>
Heather Ellsworth and Jeremy Bicha, Room 2

*Sunday, April 23*

[14:40: Testing Flutter Desktop Applications Workshop](https://conf.linuxappsummit.org/event/5/contributions/162/)<BR>
Dennis Loose, Room 2 ([video](https://www.youtube.com/watch?v=jwMEDI4WsAE&t=17530s))

[16:20: Game development on Linux (Lightning Talk)](https://conf.linuxappsummit.org/event/5/contributions/169/)<BR>
Jesús Soto, Room 1 ([video](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=22555s))

[16:30: We can’t spell BUGs without U](https://conf.linuxappsummit.org/event/5/contributions/168/)<BR>
Heather Ellsworth, Room 1 ([video](https://www.youtube.com/watch?v=J7-3Qj_oVMM&t=23109s))

[Complete schedules](https://conf.linuxappsummit.org/event/5/timetable/#all)

### Release party!

We celebrate the 38th Release! Ubuntu? Fedora? Both!! Ubuntu 23.04 Lunar Lobster, the [38th release of Ubuntu](https://www.omgubuntu.co.uk/2023/03/ubuntu-23-04-features) and Fedora 38. Now you would ask yourself whether Ubuntu's and Fedora's first releases happened to the same time. No, Fedora started earlier, in November 2003, and Ubuntu is really young, they started in October 2004 with 4.10, the Warty Warthog. While Ubuntu always had the strict twice-a-year pace, Fedora's pace was somewhat more loose.

But independent of this, we will all gather right after the talks of Saturday and celebrate these 2 new Linux distro releases together. With cake and general merriment ...


## Google Summer of Code 2023
The deadline for contributors to submit proposals has passed on April 4 and all our candidates have worked out a proposal with help from me and also their mentors.

Now they are concentrating on their projects again planning their work and partially already starting with it.

Until April 27 we have to rank all the proposals (for the Linux Foundation, not only OpenPrinting) we like to actually mentor. By this Google will know how many proposals we want to accept and how important each one is for us (or how much confidence we will have that the project works out). If we do not get the requested amount of contributor slots (usually when all the mentoring organizations together demand more slots that Google has budget for), the proposals ranked highest will get automatically accepted, the rest gets rejected.

So we have once to evaluate the importance of each of the projects for OpenPrinting but also to observe how well the candidates have done up to now and how they will do until the 27th, to get the ranking for OpenPrinting together.

The other sub-organizations of the Linux Foundation will do the same thing and provide their rankings. Now we as the organization administrators have to assemble a ranking for the whole Linux Foundation based on each sub-group's ranking, each one with a different number of proposals. We cannot simply rank the sub-groups now, putting the one we consider as most important first, and so forth, as then whole subgroups at the end of the list do not get any project end the highest ranked ones all their projects. So we have to join the rankings in zipper style, taking into account also the different numbers of projects of each group. This assures that nobody gets stepped on their toes when a cut-off of contributor slots will happen.


## Release Candidate for cups-filters 2.0.0
I have [released](/cups-filters-Second-Generation-Release-Candidate/) the release candidates (2.0rc1) of the 4 components [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters/releases/tag/2.0rc1), [libppd](https://github.com/OpenPrinting/libppd/releases/tag/2.0rc1), [cups-filters](https://github.com/OpenPrinting/cups-filters/releases/tag/2.0rc1), and [cups-browsed](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.0rc1) and updated the [Ubuntu 23.04 (Lunar Lobster)](#ubuntu-2304-lunar-lobster-is-coming) packages in time for the Final Freeze last Thursday.

**Filter functions**

To prepare for this I checked through all the repositories for not yet merged pull requests, assignments of GSoC candidates, and have done some further testing, partially motivated by the bug reports and experiences from the GSoC candidates. Especially I got the following sorted:

GSoC candidate Sourabh Sav reported that he was not able to suppress the auto-rotation of images when printing JPG or PNG image files. So I investigated the case and ended up correcting the attributes `orientation-requested` (page layout orientation, landscape, upside-down, ...) and `landcape` in the `cfFilterImageToRaster()`, `cfFilterImageToPDF()`. `cfFilterTextToPDF()`. and `cfFilterPDFToPDF()` filter functions. I also discovered that `cfFilterTextToPDF()` was not able to layout text in landscape orientation at all, which I have also fixed. And I also fixed the `ppi` attribute in the image filters, which means printing with given pixels per inch and not crop, but let the image span over more than one sheet instead. Also on auto-rotation (or with the "landscape" attribute), the printer's preferred rotation direction (counter-clockwise or clockwise) is used, according to the printer's `landscape-orientation-requested-preferred` IPP attribute (or “`*LandscapeOrientation: ...`” PPD keyword).

In [Issue #25](https://github.com/OpenPrinting/libcupsfilters/issues/25) of libcupsfilters problems with 16-bit-per-color output were reported, one being the image filters producing a blank page, with correct page size, resolution, and color mode, but just white. This problem I gave to GSoC candidate Harshit Krishna as assignment and we got it solved by him adding the missing code to convert the input to 16 bits per color.

I also assigned [Issue #20](https://github.com/OpenPrinting/libcupsfilters/issues/20) of libcupsfilters, a grid of black dots appearing on white backgrounds when printing in dithered 1-bit monochrome, and [Issue #26](https://github.com/OpenPrinting/libcupsfilters/issues/26) of libcupsfilters, empty page output when not supplying the page size for the job, and ended up fixing them by myself as the GSoC candidates disappeared.

**libcups3 support**

And the Release Candidate has [one last, slight API change](https://github.com/OpenPrinting/libcupsfilters/commit/54e1adc4adebef4f3) in libcupsfilters: For resolving DNS-SD-service-name-based device URIs (ex.: `ipps://psc2500%20(E313F0)._ipps._tcp.local/`) for IPP printers as CUPS uses them, to standard IPP URIs (ex.: `ipps://localhost:8000/ipp/print/psc2500`) libcups2 does not offer any useful API and we therefore ended up implementing 2 workarounds, one based on the libcups2's API for CUPS backends and the other calling the external executable `ippfind`. For each we have created an API function in libcupsfilters. libcups3 has an API function for this task now. Therefore we have adapted our API for its use already now, even with libcups3 support only being introduced in libcupsfilters 2.1.0, because we want to keep the API stable for the whole 2.x series.

Change is renaming the function `cfippfindBasedURIConverter()` to `cfResolveURI2()` to not have the function named by the method it uses. Now the names are suitable for using the new API function `httpResolveURI()` of libcups3, `cfResolveURI()` always returning the IPP URI for printing and `cfResolveURI2()` taking an additional boolean argument to tell whether one wants the print or fax out URI.

The [implementation of the libcups3 support](https://github.com/OpenPrinting/libcupsfilters/pull/24) (see also [last month](/OpenPrinting-News-March-2023/#libcupsfilters-and-libcups-3x)) for libcupsfilters is now nearly completed. Thanks to GSoC candidate Gayatri Kapse for his excellent work.

**Bug report from Ubuntu 23.04 user**

After having taken care in libcupsfilters and libppd that if the destination printer supports both Apple Raster and PDF to send the jobs in Apple Raster, due to the fact that PDF interpreters in printers are often slow and/or buggy, I have discovered now that cups-browsed still selects PDF in such a case and [fixed this now](https://github.com/OpenPrinting/cups-browsed/commit/3eb66da94d7). This follows a [bug report](https://bugs.launchpad.net/bugs/2014976) by a user testing Ubuntu 23.04 with the fresh update to cups-browsed 2.0b4.

In the same report he also complained that the auto-generated print queue for his color printer defaulted to grayscale printing. This was due to the printer reporting "auto" as color mode default and the PPD generator not setting the default color mode then. This is [now fixed in libppd](https://github.com/OpenPrinting/libppd/commit/1934a6c341c).

**Autopkgtests**

As told here in [February](/OpenPrinting-News-February-2023/#the-new-architecture-is-going-into-ubuntu-and-red-hat) and [March](/OpenPrinting-News-March-2023/#cups-filters-20b4-in-ubuntu-2304) Debian and Ubuntu packages have so-called autopkgtests which are run on the build servers after each upload and build of a new package release, with the package installed on a virtual machine running the destination distribution. This revealed especially two bugs which we fixed in the Release Candidates.

After uploading cups-filters 2.0b3 to Ubuntu, the autopkg test of the foo2zjs printer driver package started failing, but only on the ppc64el architecture. Repeating the test also failed, so the problem seemed not to be intermittent. There it always came to a SIGPIPE error when the `foomatic-rip` CUPS filter called Ghostscript. As I do not have easy access to a system based on ppc64el, I talked with Steve Langasek (@vorlon) from the Ubuntu release team on IRC (#ubuntu-release, Libera.Chat) and he had some test setup where he could investigate the problem. He found a fix for this in foomatic-rip and provided a [pull request](https://github.com/OpenPrinting/cups-filters/pull/517). Thanks a lot, Steve.

Another failure caused by the new generation of cups-filters was the failure of the autopkgtest of the dymo-cups-drivers package. Test print jobs were simply erroring out. The reason were duplicate page size entries in the PPD files of this label printer driver, created because of differently named label types having the same size. In the process of converting the PPD file into printer IPP attributes for libcupsfilters' filter functions only one instance of the size with only one of the names got cached and with the default size being the other name, the default got not found and without a defined page size the error occured. Now the default size is also matched by the size dimensions.


## Common Print Dialog Backends getting into the dialogs
Gaurav Guleria is currently working on getting the [merge request for CPDB support in the Qt print dialog](https://codereview.qt-project.org/c/qt/qtbase/+/437301) merged. With that and the [GTK dialog](/OpenPrinting-News-February-2023/#common-print-dialog-backends-support-accepted-into-gtk) we are not yet ready, as [several applications have their own dialogs which also need CPDB support](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2023-openprinting-projects#cpdb_support_for_application_s_print_dialogsfirefox_chromium_libreoffice).

GSoC candidate Kushagra Sharma, mentored by Gaurav, is already working on this.

Naturally this needs also support from the respective upstreams, so I reached out: I posted a [Feature request for Mozilla (Firefox/Thunderbird)](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311), a [Mailing list posting for LibreOffice](https://lists.freedesktop.org/archives/libreoffice/2023-April/090210.html) (after some IRC chat on #libreoffice-dev on Libera.Chat), and e-mailed to some people of Chrome OS' Paper I/O team.

Only from the LibreOffice developers I got a reaction yet. They have taken my inquiry to their meeting and [I have answered](https://lists.freedesktop.org/archives/libreoffice/2023-April/090227.html) to their meeting minutes on [the list](https://lists.freedesktop.org/archives/libreoffice/2023-April/thread.html). [This answer](https://lists.freedesktop.org/archives/libreoffice/2023-April/090229.html) shows especially the importance of getting CPDB into the apps dialogs instead of bolting the GTK dialog (also via distro patch as last mean) onto them. Most critical here is the spread sheet application of LibreOffice as this one puts many options about which part of the spread sheet to print, in which layout, ... This cannot get simply injected into a standard dialog.

For LibreOffice there was already a [GSoC project](https://yashsriv.org/posts/gsoc-finale/) by Yash Srivastav back in 2017 in which [CPDB-support got added to print dialog](https://gerrit.libreoffice.org/#/c/40565), this could be also used to facilitate the current project.

The MIRs (Main Inclusion Requests, [Libraries](https://bugs.launchpad.net/ubuntu/+source/cpdb-libs/+bug/1747759), [CUPS backend](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-cups/+bug/1747760), [File backend](https://bugs.launchpad.net/ubuntu/+source/cpdb-backend-file/+bug/2003272)) for Ubuntu are practically completed, only thing missing is the review of cpdb-libs by Canonical's security team. Unfortunately this did not happen in time and therefore CPDB did not make it into Main in 23.04, but will do in 23.10, to be released in October.

In the course of the preparation for demos of the GUIs for the New Architecture on the [LAS](#linux-app-summit-2023) I will probably rebuild the GTK package of Ubuntu with CPDB support activated and put that into my [PPA (Personal Package Archive) for the New Architecture](https://launchpad.net/~till-kamppeter/+archive/ubuntu/new-arch-dev), so that everyone can test.
