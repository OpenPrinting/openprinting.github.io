---
title: OpenPrinting News - July 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Caution, non-driverless printer!, Interview by Podcast Ubuntu Portugal, Flatpaking daemons, GUADEC 2024, Opportunity Open Source in IIT Kanpur, UbuCon Asia 2024, GSoC 2024, Pull Requests
---
This month I will start with a very important warning:

Some months ago I talked here about [HP's crazinesses to lock their users into expensive original ink](/OpenPrinting-News-January-2024/#hp-madness) and that following reported user experience I [recommended to buy Brother printers](/OpenPrinting-News-October-2023/) instead of HP.

I also told that typical modern printers, also cheap ones, are driverless IPP (AirPrint, Mopria, IPP Everywhere, Wi-Fi Direct Print) nowadays.

But unfortunately, there are still exceptions: There is the ultra-cheap USB-only Brother DCP-L2600D (for Europe/Africa/Asia markets), which is **not** driverless and therefore useless under Linux! Thanks to Zdenek Dohnal from Red Hat, who got note of it and reported on [our developer mailing list](https://lore.kernel.org/printing-architecture/ZqzQk8FdOfjIRwtl@shaftnet.org/T/#t). Michael Sweet mentions this printer's North-American Wi-Fi sibling DCP-L2640DW which is also not driverless and tells we need to do better in telling which printers to buy.

Solomon Peachy (Gutenprint) answers that inside printers the print engine and the networking engine are separate parts and the IPP support comes from the networking engine, and so IPP-over-USB is usually only available in network printers and not in USB-only printers.

**All-in-all one should really check whether a printer supports driverless IPP protocols like AirPrint or Mopria, according to what is written on the box, and [what most printers do](https://openprinting.github.io/printers/), fortunately.**

**And to make it even easier we have now a button to get to our [driverless printer list](/printers/) right in the banner of our [home page](/).**

By the way, **HP has withdrawn from one of their madnesses**. They were selling cheaper versions of several laser printers with an "e" added to the end of the model name and users of those printers were **required** to join HP+ and to keep the printer always connected to the internet. These models [are now discontinued](https://www-druckerchannel-de.translate.goog/artikel.php?ID=5023&t=hp_laserjet_drucker&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp) and only the somewhat more expensive versions without "e" but full liberty continue to be available. But existing "e" models continue to require HP+.

I am back from **[GUADEC 2024](#guadec-2024-in-denver)** in Denver and did not only give a talk about Snap but learned about the efforts towards **[flatpaking daemons](#guadec-2024-in-denver)** and methods of analysing graphical results in CI testing.

And the next conference is already around the corner. The CfP for the second **[Opportunity Open Source](#opportunity-open-source-in-iit-kanpur)** in Kanpur, India, has ended and the schedules of 50 sessions are published. Once in India I will be on two conferences again, also on the **[UbuCon Asia 2024](#ubucon-asia-2024-in-india)** in Jaipur on the following weekend.

Some weeks ago **I got interviewed by Diogo Constantino**, one of the hosts of the [Podcast Ubuntu Portugal](https://podcastubuntuportugal.org/), and now this interview got published as [episode #310](https://podcastubuntuportugal.org/e310/). I talk about how I got into computers, free software, printing, ... How I started OpenPrinting. And I also talk about Snap ... But note that it is all in Portuguese, Diogo speaking Portuguese of Portugal and I speaking Portuguese of Brazil. And Diogo invited me to the [Festa do Software Livre 2024](https://festa2024.softwarelivre.eu/) in Aveiro, Portugal, which is co-hosting the [UbuCon Portugal](https://discourse.ubuntu.com/t/42438).

While I have put a lot of work into the Opportunity Open Source the [Google Summer of Code](#google-summer-of-code-2024) contributors have carried on with their great work. And even better, they did not only work on their code but Biswadeep Purkayastha, contributor for CPDB support in LibreOffice and his mentor Michael Weghorn did a lot of fixes and improvements on the CPDB code. Also Zdenek Dohnal from Red Hat posted some Pull Requests on OpenPrinting code. See it all [here](#pull-requests).

Did you know that humans have even printed in space? The [Space Shuttles had a 59-pound-weighing 80-column line printer on board](http://www.righto.com/2024/08/space-shuttle-interim-teleprinter.html). See also the comments, where it is told that the line printers got later on replaced by stock [Epson Stylus Color 900](https://catalog.archives.gov/id/23495117) inkjet printers.

So let us see what happened at OpenPrinting in July ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## GUADEC 2024 in Denver
I am back from a great [GUADEC](https://events.gnome.org/event/209/) in Denver, Colorado, in the US!

It was a great event. First I met some good friends, especially Heather Ellsworth from Thunderbird and Ken VanDine, Marco Trevisan, Aaron Prisk, and Jeremy Bicha from Canonical, but also many others on the event.

I already arrived on Wednesday afternoon to attend a GSoC Meet-up which GSoC lead Stephanie Taylor organized as she was already there anyway for her keynote on Sunday. So I met Stephanie and some GSoC mentors and contributors, one even from the beginning of the GSoC, wearing the t-shirt from 2005, the very first year (I was late on the party, started mentoring from 2008 on).

The next day I finally met the GNOMies and who else attended GUADEC on the pre-registration meeting.

Friday to Sunday were the 3 days for the talks. I have given a talk, too:

**[Snap and Ubuntu Core Desktop - Desktop Linux, as easy as a smartphone!](https://events.gnome.org/event/209/contributions/761/)**

[Slides](https://events.gnome.org/event/209/contributions/761/attachments/438/885/Desktop%20Linux%20as%20easy%20as%20a%20smartphone%20-%20Just%20in%20a%20Snap!.pdf), [Video](https://www.youtube.com/watch?v=zU035efP2p0)

Here I explained what Snap is and how it worked and also how the all-Snap immutable operating system, Ubuntu Core, for which Snap was originally created, works. In the end I also showed how adding a desktop session Snap (Wayland + Desktop Environment) turns it into the Ubuntu Core Desktop operating system. As usual, having proposed the talk as a 40-min talk I got only 25 min, but this time I succeeded to finish in around 20 min leaving some time for questions and Ken VanDine, one of Canonical's Ubuntu Core Desktop promoters, helped my nicely to answer them.

There were also great keynotes, the subject matters of both affecting me especially:

**[Thunderbird, The Death and Rebirth of an OSS Project](https://events.gnome.org/event/209/contributions/774/)**

[Video](https://www.youtube.com/watch?v=pWw1A1aKfh8)

Ryan Sipes, lead of Thunderbird, tells how he saved Mozilla's e-mail client from the death and made it awesome again. I am long term lover and user of Thunderbird, I use it already for more than the 20 years that it is named Thunderbird, in the beginning as part of Netscape Communicator even. Ryan, thanks to keep it rolling.

**[Google Summer of Code 20 years of OSS Mentorship](https://events.gnome.org/event/209/contributions/775/)**

[Video](https://www.youtube.com/watch?v=hYsI9VEkLh0)

Stephanie Taylor, lead organizer of the Google Summer of Code at Google, tells everything about the Google Summer of Code and what was achieved with it. I did not participate from the very beginning, but I am long-term org admin for the Linux Foundation as mentoring organization in the GSoC, from 2008 on (4th GSoC). And GSoC has done very well for OpenPrinting.

Monday and Tuesday were the days of BoFs and workshops. I have attended some of the sessions, especially

**[Workshop: openQA testing for your GNOME app, module or service](https://events.gnome.org/event/209/contributions/740/)**

[openQA GitHub](https://gitlab.gnome.org/GNOME/openqa-tests)

Here Sam Thursfield and Outreachy interns Dorothy Kabarozi and Tanjuate Achaleke have shown how automatic testing of GNOME's GUI application works. Especially the graphical content of the application window after doing an operation must be compared against the expected content. And that is something which would be also useful for CI testing at OpenPrinting, comparing the output of print filters against the expected page content.

To compare graphical content they use the free software computer vision library [OpenCV](https://opencv.org/) and also the universal file comparison tool [diffoscope](https://diffoscope.org/) is used to check output.

Especially OpenCV seems to be also useful to check on an output file (if it is PDF or PostScript we would raster it first) whether it is the "correct printout", not doing a pixel-by-pixel comarison, but checking whether the expected text content is there, and whether nothing got cut off at the borders, ...

We could offer that as a GSoC project idea in 2025 ...

**[Flatpak & Portals BoF](https://events.gnome.org/event/209/contributions/848/)**

[Notes](https://pad.gnome.org/hwC074PeS3-E1AqUWGyQPw#)

Georges Basile Stavracas Neto has hosted this session about all kinds of Flatpak related issues.

The discussion started with how to flatpak system services (daemons), led by Christian Hergert who [works on this already for some time](https://blogs.gnome.org/chergert/2024/05/07/system-extensions-from-flatpak/). Also Adrian Vovk with whom I already had a short conversation about this subject matter Thursday night, was participating.

If all this works out, we at OpenPrinting will also start to flatpak CUPS and the Printer Applications, making it easy for users of most immutable Linux distributions to install printer drivers and also the newest CUPS. That would be another GSoC project idea.

Note that this is still in a very experimental stage and it is not yet clear whether Flatpaks of non-GUi system applications and daemons will ever appear.

Back on the Canonical Engineering Sprint 2023 in Prague Heather Ellsworth and Aaron Prisk talked about going to a tattoo studio together for each of them getting a little Tux tattooed, on the next Sprint, in November 2023 in Riga, but before that Sprint happened, Heather had left Canonical. Now, on the GUADEC, Heather and Aaron met again, and turned their old plan into reality, but not only them, also Thomas Crider ("Glorious Eggroll" or just "Eggy"), a good friend of Heather, living in Denver, joined the action, and now all the three are wearing a nice Tux tattoo ...


## Opportunity Open Source in IIT Kanpur
It is only little more than two weeks from now and we have the **[second Opportunity Open Source](https://events.canonical.com/event/89/)** in the Indian Institute of Technology (IIT) Kanpur, on August 24-26!

As we have opened the CfP for the event hardly any proposal appeared and we were already fearing not getting the one plenary room filled with talks on the two days. So I asked the on-location organizers to ask around, and especially Sanskar Yaduca started to e-mail lots of people (I got CCed) mainly in India as they do not need expensive overseas travel to come. Many declined but in the end we got so many proposals that we had to ask for a third room and now we have two rooms for talks and panels and one for workshops and the time slots are nearly completely booked out! Thanks a lot Sanskar!

We have [published the schedules now](https://events.canonical.com/event/89/timetable/?layout=room#all.detailed) and the conference is stuffed with great content of lots of different areas, a total of 50 sessions:

- OpenPrinting, including talks ([CUPS](https://events.canonical.com/event/89/contributions/468/), [PAPPL](https://events.canonical.com/event/89/contributions/469/)) by Michael Sweet, author of CUPS
- Zephyr, several talks and a [workshop](https://events.canonical.com/event/89/contributions/478/), by Jonas Remmert, Oliver Völckers, and others
- I give a [talk about Snap and Ubuntu Core (Desktop)](https://events.canonical.com/event/89/contributions/481/) and [my workshop where you learn snapping applications](https://events.canonical.com/event/89/contributions/482/)
- Hands-on with firmware programming: A ChromeOS firmware team from Google gives 2 talks ([Intro](https://events.canonical.com/event/89/contributions/494/), [Advanced](https://events.canonical.com/event/89/contributions/495/)) and a [workshop](https://events.canonical.com/event/89/contributions/494/)
- Rudra Saraswat introduces into his [BlendOS](https://events.canonical.com/event/89/contributions/459/) system, immutable, arch-based, sandboxes/containerizes classic app packages on-the-spot.
- Rudra Saraswat will also give 2 workshops, one to [make your own Ubuntu flavor with his Iona framework](https://events.canonical.com/event/89/contributions/457/) and the other about [creating Arch-based immutable distros](https://events.canonical.com/event/89/contributions/497/)
- [Jiongchi Yu](https://events.canonical.com/event/89/contributions/475/), GSoC contributor on deploying OSS-Fuzz testing on OpenPrinting and his mentor [George-Andrei Iosif](https://events.canonical.com/event/89/contributions/476/) show that they are not only an excellent team at OpenPrinting but also in presenting security-related talks, this time 3.
- More current and former GSoC contributors will speak: [Akarshan Kapoor](https://events.canonical.com/event/89/contributions/484/), [Rudra Pratap Singh](https://events.canonical.com/event/89/contributions/504/), [Shivam Jaiswal](https://events.canonical.com/event/89/contributions/504/), [Deepak Patankar](https://events.canonical.com/event/89/contributions/499/), [Sahil Arora](https://events.canonical.com/event/89/contributions/493/), ...
- [Large Population Models](https://events.canonical.com/event/89/contributions/505/), AI for simulations of millions of interacting agents (there is not only generative AI)
- Pierre Clisson will talk about [building brain-computer interfaces](https://events.canonical.com/event/89/contributions/490/)
- 20 years of the Google Summer of Code - I am hosting a [panel](https://events.canonical.com/event/89/contributions/483/) about what it is, how to participate, experiences of mentors and contributors, questions & answers
- Want to know how it is to [work at Canonical](https://events.canonical.com/event/89/contributions/460/)? I am hosting a panel with some colleagues from Canonical and we tell our experience.
- [a lot more](https://events.canonical.com/event/89/timetable/?layout=room#all.detailed) ...

So if you come to Kanpur you will for sure find a lot of interesting sessions, plus a great hallway track. We have especially also 9 workshops during the 3 days, if you want to try out the things by yourself, often even on your laptop. And on Monday we will run a Hackathon, the subject is still to be determined by the organization team in India.

We will also live-stream the Plenary Room and the Breakout Room, and record the sessions in the Workshop Room. So if you cannot make it to Kanpur, please follow the menu entry "[Attending Remotely](https://events.canonical.com/event/89/page/420-attending-remotely)" on our event page for instructions and links to watch the live streams on YouTube and to ask questions via the live comments there. Note that the links are not yet there. I will post them some days before the conference.

Special thanks to Shivam Mishra for suggesting the IIT Kanpur and to Pratham Sahu, Sanskar Yaduca, and Mohammad Rabhar for leading the on-location organization, to the 50 volunteers on-location, and to Aveek Basu.

Also thanks to Canonical and there especially the Community Team (Mauro Gaspari, Aaron Prisk) for all the support, providing me Indico, StreamYard, lots of swag, and giving me support and answering my questions concerning conference organization. Also my participation in the organization of the Ubuntu Summits has given me a lot of experience.

Please follow us on Mastodon: [#OpportunityOpenSource](https://ubuntu.social/tags/OpportunityOpenSource)


## UbuCon Asia 2024 in India
From Kanpur I will continue my trip to Jaipur (with stop-over in Agra, to see the Taj Mahal) for the [UbuCon Asia 2024](https://2024.ubucon.asia/), on Aug 31 - Sep 2 (Sat - Mon), and give a talk and a workshop about Snap.

If you attend, please make sure to not miss my two snappy sessions:

**[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://events.canonical.com/event/47/contributions/372/)**

Sat, August 31, 11:35 AM IST, Main Hall

The motivation, advantages, and concept of the sandboxed, immutable Snap packaging format is shown and how it is used to make up immutable all-Snap OS distros, the IoT distro Snap was originally designed for, Ubuntu Core, and the easily usable and maintainable Ubuntu Core Desktop.

**[Your app everywhere - Just in a Snap! - Interactive Workshop](https://events.canonical.com/event/47/contributions/397/)**

Sun, September 1, 1:55 PM IST, Room 2

Interactive workshop to learn how to package applications in the sandboxed, immutable package format Snap to publish them in the Snap Store. Attendees will create simple Snaps in several hands-on exercises.

With the workshop I got featured speaker on the [front page](https://2024.ubucon.asia/).

[Full schedules](https://events.canonical.com/event/47/timetable/#all)

I will also meet Soumyadeep Ghosh from the Snapcrafters and present Snap with him at his booth and also work with him on the plans for the Snapcrafters booth and workshops on the [Ubuntu Summit](/OpenPrinting-News-June-2024/#ubuntu-summit-2024-in-the-hague).


## Google Summer of Code 2024
10 of our 11 contributors have passed their mid-term evaluations! And the 11th, Arun Patwa (Braille Printer Application) did not fail. He just started coding 6 weeks late, due to his graduation, and therefore did not reach mid-term yet.

And we got write-ups of nearly all of them:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh

> - I have thoroughly tested cups-rock.
> - Added instructions in the cups-rock GitHub repository for testing the OCI image.
> - Implemented GitHub Actions from ubuntu/desktop-snaps to support version automation in cups-rock.
> - Started containerizing ps-printer-app.
> - Added GitHub Actions to test cups-rock on every push.

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha

> This month I worked on conforming my code to the reviews left by my mentor Michael Weghorn, of LibreOffice. Apart from minor fixes such as dropping DBus headers, changing low level handling of the options hashtable and writing some documentation for the newer API functions of CPDB frontend, it also included bigger tasks such as changing the way the print dialog was interacting with CPDB. Initially my approach was to write custom DBus calls to subscribe to signals and use the API callback function so that changes were made to both the CPDB and LO printer lists simultaneously. However in the end we agreed upon using the API calls for the signals so that changes were first made to the CPDB printer lists and using a custom callback to make changes to the LO printer list later. This would prevent low-level DBus calls in LO ensuring any future changes in the way signals are processed by CPDB does not require any code change for maintenance in LO.
>
> Apart from that I also added the support for translations in LO so that the options and their corresponding choices are displayed in a human-readable format. While working on this I discovered that options such as media and media-types did not produce expected logical translations. On raising a [bug](https://github.com/OpenPrinting/cups/issues/1016) for it in CUPS, I got to know that CUPS provides only a limited number of localized names for common media sizes and types and as such translations for them may not always be logically correct. Quoting Michael R Sweet's response on the bug, "We provide a limited number of localized names for common media sizes since some sizes have multiple names not tied to a particular language or region (like “ledger” which is also “tabloid” and “b”) and others are so esoteric as to be meaningless (most photo sizes). Thus, the localized size name will be a dimensional name in many cases using the language/region’s appropriate units and separators." So although most translations work, not all will be correct. You can find my WIP PR [here](https://gerrit.libreoffice.org/c/core/+/169617).

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor

> This month, my major goal was to successfully complete a significant portion of the API handling and finalize the integration schemes for the PAPPL Scan API. Additionally, I discussed with Till Kamppeter and Alexander Pevzner the essential elements that should be included in the scan API documentation. I aim to have the main documentation ready by the first week of August to ensure the project is comprehensible to the larger Linux community.
>
> Our next focus will be to complete the API integration by the third week of August and then begin the eSCL server-side integration, which was covered in the last GSoC. As usual, updates to the Work in Progress PR can be found at: [https://github.com/michaelrsweet/pappl/pull/349](https://github.com/michaelrsweet/pappl/pull/349).
>
> The documentation for the initial PAPPL project (not updated for scanners) can be found at: [https://www.msweet.org/pappl/pappl.html](https://www.msweet.org/pappl/pappl.html).

Akarshan's ongoing work you find in this [work-in-progress pull request on PAPPL](https://github.com/michaelrsweet/pappl/pull/349) and in his [GIT clone of PAPPL 1.4.x](https://github.com/Kappuccino111/pappl/tree/v1.4.x).

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma

> Successfully Built Mozilla Firefox. Adding a demo print backend with dummy function calls, these calls will later be replaced by CPDB APIs. Also working on adding package config file for CPDB that will check if CPDB is present or not , if present then it will use CPDB for performing print jobs.

Kushagra created a good collaboration with the Mozilla developers now, via my original [feature request](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311).

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> Firstly, as I mentioned before, I looked into the GNOME Control Center telegram group for UI ideas related to the system-config-printer. Additionally, after discussing with Mohit Bhaiya, we decided to change the IPP discovery code to make it discover services asynchronously (currently, it does this synchronously). So, I have been working on these code changes. I was quite busy with internship stuffs. Now, my goal is to finalize the IPP discovery code and the UI as discussed.

**Make a native printer Application from Gutenprint**<BR>
Contributor: Ankit Pal Singh

> - Successfully created driver callback for the native guten printer applications.
> - Tested the functionality like listing of supported drivers, options specific to printer
> - Currently working on  start_job, end_job, print_job functions using libgutenprint.

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> I have written a code for token exchange which will help clients to authenticate their identity. For this I am using GOA and GOA API has several inbuilt functions which I am using to add various features. I completed the setup of the GOA DBus connection. I am using Google as the account type because GOA supports Google accounts only. Currently I am working on designing the UI for this OAuth process.
>
> After successfully completing the token exchange code I will merge it to CPDB and then I will modify the UI and the functionality of the token exchange code. I can also add the authentication server which the printer will provide to the client for verification.

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa

> I have implemented a foundational structure for a Braille printer application using the PAPPL framework. This includes defining the printer drivers, setting up callbacks for device auto-adding, MIME type handling, and driver configuration. I have also implemented a test page printing callback and a print filter function specifically designed to handle the conversion of input files to Braille-ready formats. Additionally, I have created data structures and global configurations necessary for managing printer settings and job processing within the application. In this month I will add the functionality of text to brf conversion.

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak

> I have ported the code from C++ to C for the files 'nup.cxx' and 'intervalset.cxx',  which I have updated into my GitHub repo. I have also ported 'pdftopdf-processor.cxx' and 'qpdf-pdftopdf-processor.cxx' into C. I am currently testing all the outputs of the functions.

Here is [Uddhav's work on GitHub](https://github.com/uddhavphatak/libcupsfilters/tree/pdfio-implement).

**Adding Common Print Dialog Backends (CPDB) support to the Qt print dialog (GSoC 2022)**
Contributor: Gaurav Guleria

Gaurav is now finishing the merge requests, actively working out the remaining rough edges with the Qt developers ([#556476](https://codereview.qt-project.org/c/qt/qtbase/+/556476), [#437301](https://codereview.qt-project.org/c/qt/qtbase/+/437301), [#471258](https://codereview.qt-project.org/c/qt/qt5/+/471258), [#116726](https://bugreports.qt.io/browse/QTBUG-116726)).

I had an in-person meeting with Axel Spoerl (Qt developer, works at Qt in Oslo, Norway, and does the, otherwise abandoned, print dialog as pet project) in Vienna to discuss the merge of the CPDB support merge request in upstream Qt.

His summary (reported to Volker Hilsheimer from Qt):

> We have changed the commit message slightly and verified, that the merge conflict disappears.
>
> What remains to be done:
>
> - bump the provisioning verison to CPDBlibs 2.0b6
>
> - move the code references from gerrit comments to source code comments
>
> What remains to be decided, Volker's input needed:
>
> There is a compiletime CPDB switch, which will always remain.
>
> We will default it to ON from Qt 6.9 onward, meaining that we build with CPDB support by default. That will enable users to build Qt with CUPS only, CPDB only, both or none.
>
> In addition to that, we need a runtime switch to cover the following case:
>
> - host system doesn't have CPDB support => fall back to CUPS
>
> - use CUPS as default in 6.9, opt in for CPDB
>
> - use CPDB as default from 6.10 onward, opt in for CUPS
>
> This still needs to be developed.
>
> Decisions to be made:
>
> - implement runtime switch on QGuiApplication level? (we proporse: yes)
>
> - confirm the versions: 6.9 still defaults to CUPS, implement CPDB default from 6.10 onward.
>
> @Volker: Are you fine with that? Should we ask the mailing list as well?

It currently also seems to build only locally and not on Qt’s servers.

Volker likes the roadmap but wants to have it completely implemented before making CPDB the default (instead of direct CUPS), ideally in the next LTS+1 release of Qt.

**Important remark: CPDB will be required for using Qt with CUPS 3.x. I agreed with Axel, to not update the direct CUPS support of Qt to CUPS 3.x. From CUPS 3.x CPDB will have to be used.**


## Pull Requests
While I was putting a lot of work into the Opportunity Open Source, GUADEC and into mentoring the GSoC contributors, the development of our code base has continued.

Special thanks go to Biswadeep Purkayastha (CPDB support for LibreOffice) and his mentor Michael Weghorn (LibreOffice upstream developer) as they did many changes and improvements, mainly on the CPDB libraries ([cpdb-libs](https://github.com/OpenPrinting/cpdb-libs/)) and also on the CUPS backend for cpdb-libs ([cpdb-backend-cups](https://github.com/OpenPrinting/cpdb-backend-cups/)). Also Gaurav Guleria (CPDB support for GTK and Qt peint dialogs, CPDB 2.x development) did a change.

Many changes are bug fixes but there are also several library-internal functions promoted to the public API of cpdb-libs.

Since the 2.0b6 releases they did 18 Pull Requests on cpdb-libs and 4 on cpdb-backend-cups:

**cpdb-libs**

- [PR #35](https://github.com/OpenPrinting/cpdb-libs/pull/35): API functions to refresh printer list and to get D-Bus connection, by Biswadeep Purkayastha
- [PR #36](https://github.com/OpenPrinting/cpdb-libs/pull/36): Turn some static functions into frontend API functions, by Biswadeep Purkayastha
- [PR #37](https://github.com/OpenPrinting/cpdb-libs/pull/37): Turn `cpdbFillBasicOptions()` into a frontend API function, by Biswadeep Purkayastha
- [PR #38](https://github.com/OpenPrinting/cpdb-libs/pull/38): `text-frontend`: Quit on EOF (`Ctrl+D`), by Michael Weghorn
- [PR #39](https://github.com/OpenPrinting/cpdb-libs/pull/39): `text-frontend`: Don't crash when printer doesn't exist, by Michael Weghorn
- [PR #40](https://github.com/OpenPrinting/cpdb-libs/pull/40): Pass backend name to `cpdbRefreshPrinterList()` as `const char*`, by Michael Weghorn
- [PR #41](https://github.com/OpenPrinting/cpdb-libs/pull/41): Removed unused parameter `instance_name`, by Biswadeep Purkayastha
- [PR #42](https://github.com/OpenPrinting/cpdb-libs/pull/42): Replace `cpdbGetStringCopy()` with `g_strdup()`, by Michael Weghorn
- [PR #43](https://github.com/OpenPrinting/cpdb-libs/pull/43): Documentation for newly added API functions, by Biswadeep Purkayastha
- [PR #44](https://github.com/OpenPrinting/cpdb-libs/pull/44): Correct DBus calls to add, delete and state change of printers, by Biswadeep Purkayastha
- [PR #45](https://github.com/OpenPrinting/cpdb-libs/pull/45): Fix bad free, by Biswadeep Purkayastha
- [PR #46](https://github.com/OpenPrinting/cpdb-libs/pull/46): frontend: Drop unused `own_id` member, by Michael Weghorn
- [PR #47](https://github.com/OpenPrinting/cpdb-libs/pull/47): Fix a memory leak in `cpdbGetSysConfDir()`, by Michael Weghorn
- [PR #48](https://github.com/OpenPrinting/cpdb-libs/pull/48): `cpdbConcatPath()`: Actually check `XDG_CONFIG_DIRS`, by Michael Weghorn
- [PR #49](https://github.com/OpenPrinting/cpdb-libs/pull/49): Add capability to check CPDB version at runtime, by Gaurav Guleria
- [PR #50](https://github.com/OpenPrinting/cpdb-libs/pull/50): `text-frontend`: Add null check for `get-default-printer`, by Michael Weghorn
- [PR #51](https://github.com/OpenPrinting/cpdb-libs/pull/51): `text-frontend`: Get locale via GLib, by Michael Weghorn
- [PR #52](https://github.com/OpenPrinting/cpdb-libs/pull/52): `text-frontend`: Drop unused local vars, by Michael Weghorn

**cpdb-backend-cups**

- [PR #32](https://github.com/OpenPrinting/cpdb-backend-cups/pull/32): Use `g_strdup` instead of `cpdbGetStringCopy()`, by Michael Weghorn
- [PR #33](https://github.com/OpenPrinting/cpdb-backend-cups/pull/33): Always query current CUPS default printer, by Michael Weghorn
- [PR #34](https://github.com/OpenPrinting/cpdb-backend-cups/pull/34): Add support for CUPS printer instances, by Michael Weghorn
- [PR #35](https://github.com/OpenPrinting/cpdb-backend-cups/pull/35): Use `NULL` Instead of "`NA`" if there's no default printer, by Michael Weghorn

Zdenek Dohnal, printing maintainer at Red Hat, did several fixes on [libppd](https://github.com/OpenPrinting/libppd/) and [cups-browsed](https://github.com/OpenPrinting/cups-browsed/):

**libppd**

- [PR #30](https://github.com/OpenPrinting/libppd/pull/30): `ppd-cache.c`: Use PPD size name from CUPS if size is standardized
- [PR #46](https://github.com/OpenPrinting/libppd/pull/46): `ppd-cache.c`: Use 0.5mm for delta when comparing sizes

**cups-browsed**

- [PR #32](https://github.com/OpenPrinting/cups-browsed/pull/32): `cups-browsed.c`: Ignore attributes with empty values
- [PR #33](https://github.com/OpenPrinting/cups-browsed/pull/33): `cups-browsed.c`: Ignore IPP attributes with "`no-value`"
