---
title: OpenPrinting News - June 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Opportunity Open Source in IIT Kanpur, UbuCon Asia 2024, Open Source Summit Europe, Ubuntu Summit 2024, GSoC 2024, KDE Print Manager, Gutenprint, CPDB 2.0b6, CUPS 2.4.10
---
This month we have again a lot of great News!

First, as usual, we have a lot of conference news. We now know the location and date for the third [Ubuntu Summit](#ubuntu-summit-2024-in-the-hague) and the second [Opportunity Open Source](#opportunity-open-source-in-iit-kanpur). And I am featured speaker on the [UbuCon Asia](#ubucon-asia-2024-in-india) and will also give a talk on the [Open Source Summit Europe](#open-source-summit-in-vienna).

Also we got [8 reports](#google-summer-of-code-2024) from our 11 GSoC contributors. They are all doing great work!

But 11 contributors? There is more work, and so we have also a volunteer now, working on CUPS 3.x support in the [KDE Print Manager](#kde-print-manager).

The most sophisticated non-manufacturer free software printer driver project is Gutenprint. But what is on with this project now? Have a look into my [interview with Solomon Peachy](#quo-vadis-gutenprint), current maintainer of it and contributor of the dye-sublimation printer support.

I have [tested one of the most hated cheapo HP printers](#most-hated-gets-loved-under-linux) and it is working perfectly under Linux, when one sets it up correctly.

There are many people making use of Linux to conserve old printers under Windows, when there are no Windows drivers any more, and have caused a [longer thread on Hackaday](#raspberry-pi-saves-old-printers).

And it is always nice to get praised by users for the OpenPrinting work, this time by Aaron Prisk from Canonical's Community Team. He writes on [Mastodon](https://fosstodon.org/@AKernelPanic/112707405234525979):

> I love that I can just plug in my printer and scanner and they just work. No extra bloatware, no funky drivers, they just pick up and go. We're super lucky to have wizards like @till in the open source world.

and also got a [nice thread of answers](https://fosstodon.org/@AKernelPanic/112707405234525979).

To complete our intro, on Matrix I told to a person that I am leading OpenPrinting, and they told something about their skills and in the end:

"Though I am hesitant to approach devices that often seem to personify God's punishment upon prideful IT workers. 😅"

So let us see what happened at OpenPrinting in June ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## Most hated gets loved under Linux
Remember when I wrote earlier here about [**HP's madnesses**](/OpenPrinting-News-January-2024/#hp-madness) related to there razor-and-blades business model and how they try to enforce it?

I got hold on one of these cheapo inkjets from HP now, the **HP Envy 6000**. I did not buy it, I would never do, I got it as a gift from a person who is moving to overseas. It is one of the **Wi-Fi-only species** with a sticker put over its USB port, saying Wi-Fi-only. They want the user to install their software to set it up for the user's Wi-Fi SSID and password (it has also no front panel menus and no WPS support). And this software is pitching the ink subscriptions and trying to update the firmware so that the printer rejects 3rd-party cartridges.

I tested the printer and found out that you do not need all this, just a USB printer cable. Remove the stupid Wi-Fi sticker and see the shiny USB port. Connect the printer to your computer and in a browser, go to http://localhost:60000/ (if this does not work, install [ipp-usb](https://github.com/OpenPrinting/ipp-usb/)). You will see the printer's web admin interface, and on the "Network" tab you can do your Wi-Fi setup. Once done, you can remove the USB cable and use the printer from all devices in your network.

Note that when you use the printer just USB-only it will print only 20 pages. If you set up Wi-Fi you can continue printing, both via network and via USB.

And you do not need any driver for printing and scanning, it is just a driverless IPP printer, as most modern printers.


## Raspberry Pi saves old printers
Well known for us Linux users is that a big problem on Windows is that hardware support for a certain device gets discontinued after a few years, so many printers go to the trash because there is no driver in the new Windows version and the manufacturer has also discontinued support for it.

But under Linux, in free software, hardware drivers are conserved for many years, ideally eternally, so if a printer gets once supported under Linux, by a free software printer driver, it stays supported. So a Linux print server, for example on a Raspberry Pi is a solution for Windows users to conserve an old printer, at least if it works with a free software driver under Linux.

This idea was presented on [Hackaday](https://hackaday.com/2024/06/13/raspberry-pi-saves-printer-from-junk-pile/): A Canon PIXMA MP250 (released 2009) got the death sentence for Windows 11 by Microsoft or Canon but can be used under Linux with the Gutenprint driver. So a Raspberry Pi was used to run CUPS with Gutenprint and the printer shared to the network, appearing as modern, driverless IPP printer under Windows ... The original author wrote a [HOWTO](https://ounapuu.ee/posts/2024/06/12/save-old-printer/).

But we have already shown here that this also works without any additional print server hardware, at least for Windows 10 and newer, just running Linux under WSL. And also, with or without extra hardware, one does not even need CUPS but can simply use Printer Applications instead, as shown in our [HOWTO](https://openprinting.github.io/wsl-printer-app/), and also on the [Ubuntu Summit 2022](/OpenPrinting-News-November-2022/#and-the-conference-finally-started-), which got [well accepted](/OpenPrinting-News-December-2022/#blogs-and-articles).

There is a long list of comments on Hackaday and [I have commented, too](https://hackaday.com/2024/06/13/raspberry-pi-saves-printer-from-junk-pile/#comment-6767443), telling about the WSL-based solution and also that a Pi cannot only mimick a driverless network printer but also a driverless USB (USB-over-IPP), thanks to PAPPL.

So OpenPrinting is sustainable!

I have posted the link to our HOWTO for saving old printers with the help of WSL also at another place. Zygmunt Krynicki has asked in a [Mastodon Thread](https://fosstodon.org/@zygoon/112656002921581263) who is using WSL and for what. He got several answers, including [one by me](https://fosstodon.org/@zygoon/112656002921581263) ...


## Opportunity Open Source in IIT Kanpur
Now we have confirmed it! **The [second Opportunity Open Source](https://events.canonical.com/event/89/) will be held in the Indian Institute of Technology Kanpur, on August 24-26**, the weekend before [UbuCon Asia in Jaipur](https://2024.ubucon.asia/)! We already had some contributors from there, like Shivam Mishra, Mohit Mohan, Pratyush Ranjan, Vikrant Malik, Tanmay Anand, ...

We also got a lot of support. Shivam Mishra, former GSoC contributor for us, made the suggestion to do it in Kanpur and already told us that IIT Kanpur is larger than Mandi and has more ease to travel to from other cities, like Delhi, as alredy told here [earlier](/OpenPrinting-News-March-2024/#opportunity-open-source---2nd-edition). And as we started working it out, Pratham Sahu has taken the lead in the on-location organization and built up a nice volunteer team. He even interviewed several candidates to fill volunteer roles.

In contrary to Mandi, the local organizers are also looking for (local) sponsors, to support us financially for things like speaker accommodation and meals, banners, backdrops, conference-specific swag, ... We also do not need to worry about A/V, as this will all get managed for us by the local organizers.

Our responisbility will be to fill the Saturday and the Sunday (August 24 and 25) with talks, demos, and workshops, which we are currently working on. Once we are talking to potential speakers, and second, we have put up a [Call for Proposals](https://events.canonical.com/event/89/abstracts/). So if you want to come and contribute, please submit your proposal until July 22.

As on Monday, August 26, there are no classes in the IIT Kanpur, we include this day in our event, as a Hackathon day. So attendees can participate in several Hackathons. Also Hackathon ideas are accepted via our call for proposals.

Canonical's Community Team has, as last year made available their Indico for us, so that we have an [event site](https://events.canonical.com/event/89/) for handling proposals and schedules, some practical info, and later on also registrations.

The event is annouced on both [Mastodon](https://ubuntu.social/@till/112653496800160462) and the [Ubuntu Discourse](https://discourse.ubuntu.com/t/45959). Any further spreading is more than welcome.

I plan to give talks about OpenPrinting, Snap/Ubuntu Core Desktop and workshops about Snap. We will also host panels about GSoC and about working at Canonical.

We also invited Michael Sweet who will give a talk (online) about the state of the art of CUPS and PAPPL and we will run a Q&A session afterwards.

Jiongchi Yu, GSoC contributor for OSS Fuzz testing of OpenPrinting components, also wants to give a talk. He also will give it online as he lives in Singapore. I will also try to get further GSoC contributors giving a talk.


## UbuCon Asia 2024 in India
As I already told [last month](/OpenPrinting-News-May-2024/#ubucon-asia-2024-in-india) I will be in [Jaipur](https://2024.ubucon.asia/) the weekend after the Opportunity Open Source, Aug 31 - Sep 2 (Sat - Mon), and give a talk and a workshop about Snap.

On the [front page of the event](https://2024.ubucon.asia/) there are 6 featured speakers, the keynote speakers Bhavanishankar Ravindra, Khairul Aizat Kamarudzzaman, and Varshi Gupta, and also Rudra Saraswat (Ubuntu Unity, blendOS, Iona), Buo-Ren Lin (Snap, L10n), and ...

... me! The featured session is my [workshop](https://events.canonical.com/event/47/contributions/397/), "Your app everywhere - Just in a Snap!", the one where the audience will learn snapping.


## Open Source Summit in Vienna
As I already mentioned here in [February](/OpenPrinting-News-February-2024/#open-source-summit-and-plumbers-in-vienna) this year's [Open Source Summit Europe](https://events.linuxfoundation.org/open-source-summit-europe/) will take place in Vienna (on Sep 16-18).

And I will not just attend because it is around the corner for me, I will also give a talk:

**[OpenPrinting - We Make Printing Just Work!](https://sched.co/1ej79)**

Wed, September 18, 15:10 - 15:50 CEST, Room 1.61 & 1.62 (Level 1)

Track: [LinuxCon](https://osseu2024.sched.com/type/LinuxCon)

I will give an overview of our work. Going through OpenPrinting's history the components of the printing infrastructure of modern Linux (and other Posix-style) operating systems will get shown. - How did the Internet Printing Protocol (IPP) with the printing system CUPS being an implementation of it simplify printing a lot? - The printer driver challenge, good and bad cooperation with manufacturers, packaging and distributing ... - Desktop integration, GUI toolkits, print dialogs, setup tools, portals, ... Especially also the New Architecture of all-IPP printing and scanning and also the integration in immutable OS distributions will be treated ... 

There will also be a Canonical/Ubuntu booth with several people from Canonical, especially also Mauro Gaspari, organization lead of the Ubuntu Summits, from Canonical's Community Team.


## Ubuntu Summit 2024 in The Hague
After 2 amazing Ubuntu Summit events in [2022](/OpenPrinting-News-November-2022/#the-first-ubuntu-summit-was-a-success) and [2023](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga), there is only one solution:

**Celebrate a third one.**

And this we are doing this year in [the Hague in the Netherlands](https://ubuntu.com/blog/ubuntu-summit-2024), on October 25-27.

Our Call for Proposals is open, until July 15! And this time we do not only ask for awesome talks and workshops, but ...

... also for your free software organization's booths, for our new exhibition which will make up the center of the event.

I am in the organization team again, as in the first 2 years, and having run community booths already in the early 2000s I will be able to help with booth-related questions.


## Google Summer of Code 2024
After more than one month into the coding period of the GSoC we have seen a lot of enthusiasm by our 11 contributors. As last month many of them have provided a write-up again to tell what they have done.

And one of them, Rudra Pratap Singh (OCI-containerization of CUPS and Printer Applications) got [interviewed in a video](https://www.youtube.com/watch?v=OmzCvb-QBak&t=2448s) by Harkirat Singh, telling about his experience.


**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh

> This month, I've made significant progress on containerizing a working CUPS instance using Rockcraft:
>
> - Implemented a [GitHub Action](https://github.com/rudra-iitm/cups-rock/blob/main/.github/workflows/registry-actions.yml) to automate building the Rockcraft project, compiling it into a Docker image, and pushing the image to a Docker registry. Checkout at [DockerHub](https://hub.docker.com/r/rudraiitm/cups)
> - Raised and merged a PR to extend update-automation for rockcraft.yaml in the [ubuntu/desktop-snaps](https://github.com/ubuntu/desktop-snaps) repository, now part of the [cups-rock](https://github.com/rudra-iitm/cups-rock) project: GitHub [PR 635](https://github.com/ubuntu/desktop-snaps/pull/635)
> - Started dbus-daemon within the container for printer discovery, avoiding interaction with the Docker host.
> - Verified printer discovery using the ippeveprinter tool from cups-ipp-utils.
> - Successfully printed files from the Docker host to CUPS running inside the container.
> - Raised another PR for extending version-automation to rockcraft.yaml in the [ubuntu/desktop-snaps](https://github.com/ubuntu/desktop-snaps) repository: GitHub [PR 636](https://github.com/ubuntu/desktop-snaps/pull/636)

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha

> This month I worked on rewriting all the necessary older code to include CPDB frontend API functions and fix the printing process so that now printing with CPDB works on the LibreOffice print dialog. While working on that I discovered that the names of printers on the LibreOffice dialog are static, evaluated on LibreOffice startup and not refreshed while the dialog is open unlike CPDB where periodic refreshing of the printer lists take place. This meant that the print dialog needed to be able to cope with that a printer can already have gone away even though it is still displayed in the dialog. So, I made changes to include appropriate error handling so that while using CPDB, the issue of stale printers do not occur. Moreover, I also made modifications so that for CPDB the "Print Directly" button of LibreOffice now prints on the default printer initially and not on the first available printer as was the case before.

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu

> OpenPrinting has successfully integrated two main projects into the OSS-Fuzz framework in June, which includes the migration of the ownership for existing OSS-Fuzz CUPS integration and fixing building issues. We have integrated all harnesses into a new GitHub repo, [fuzzing](https://github.com/OpenPrinting/fuzzing), and are continuously updating and maintain the fuzzers. So far, OSS-Fuzz has identified a total of 34 potential issues and has contributed to one fixed bug in [libcups](https://github.com/OpenPrinting/libcups/commit/a7a28e643cd0f84dcae785f93b72426d644c0619) and [CUPS](https://github.com/OpenPrinting/cups/commit/c67f4add6dfe88fe440a172f49946234694ac211).
>
> We are pleased that Oliver Chang and Dongge Liu from Google have joined to mentor the integration process and we plan to add more fuzz harnesses in future developments to improve test coverage and will push forward the continuous fuzzing integration of more OpenPrinting projects such as cups-filters.

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor

Akarshan has moved from India to Germany for studying for a semester there. Therefore he had a lot to do with this move in the last month and so he did less on his GSoC project, so he did not provide the usual write-up.

For onboarding Alexander Pevzner (author of ipp-usb and sane-airscan) as a mentor, he wrote a short introduction to his project, which is also interesting for anybody not having followed his work in previous news posts:

> For non-driverless legacy or specialty printers, we have introduced Printer Applications, which emulate driverless IPP printers. To create these Printer Applications, there is a standard library called PAPPL (Printer Application Library), written by Michael Sweet. It contains everything a Printer Application needs, including a daemon, handlers for DNS-SD and IPP, a web admin interface, and more. Michael has also written two native Printer Applications: hp-printer-app (for legacy PCL lasers) and LPrint (for label printers).
>
> Till Kamppeter has written pappl-retrofit, an additional library for PAPPL that allows one to easily wrap classic CUPS printer drivers and PostScript PPD files into Printer Applications - retro-fitting.
>
> Currently, I am adding scanner support to PAPPL so that it can be used to create both Printer and Scanner Applications, even supporting multi-function printers with a single application. I am adding eSCL support to PAPPL (which previously only supported IPP printing) and SANE support to pappl-retrofit.
>
> This approach provides a universal Printer/Scanner driver format that allows for distribution-independent binary packages and the addition of drivers not only to classically installed but also to immutable operating systems.

Akarshan's ongoing work you find in this [work-in-progress pull request on PAPPL](https://github.com/michaelrsweet/pappl/pull/349) and in his [GIT clone of PAPPL 1.4.x](https://github.com/Kappuccino111/pappl/tree/v1.4.x).

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma

> I have resolved all the comments on the merge request for adding CPDB support to chromium, the updated code is under review and in this coming week I am planning to have a virtual meeting with chromium team to speed up the merge request. I have also started working on adding CPDB to mozilla which includes both Firefox and thunderbird.

Kushagra created a good collaboration with the Mozilla developers now, via my original [feature request](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311).

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> With help of ideas discussed with Mohit Verma in meetings, I was clear on what I have to do and how I'm going to test it. 
>
> Developed Functions for Listing IPP Services:
> - Used Avahi and D-Bus libraries in Python.
> - Implemented functions to list available IPP services.
>
> Service Discovery:
> - Program runs DBusGMainLoop() to continuously discover new services.
> - Prints service details whenever a new service is resolved.
>
> Next Objective:
> - Deliver the discovered services to the UI part of the system configuration printer.

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> First I have build a dummy printer for testing the code and after that I started working on an authentication server. It is important to know the flow of access tokens, so I learned about it and implemented the code of it. Then I started working on handling HTTPS requests which will be done by libcurl.
>
> Currently I am working on the user interface and in coming weeks I will implement the code written so far and will try to make it secure and to make it secure I am using HTTPS.

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak

> I have migrated following files from QPDF to PDFIO, also I have changed the code for these files from C++ to C
> - qpdf-tools.cxx,
> - qpdf-cm.cxx,
> - qpdf-xobject.cxx,
> - qpdf-pdftopdf.cxx, 
> - qpdf-pdftopdf-processor.cxx  
>
> As there was a "pptypes.cxx" file dependancy  while migrating "qpdf-pdftopdf.cxx". So that I have changed pptypes.cxx extenion to .c extension.
>
> Currently, I am validating the changed qpdf-pdftopdf-processor.cxx functions.

**Gaurav Guleria** is now finishing the merge requests for **CPDB support in the Qt print dialog**, actively working out the remaining rough edges with the Qt developers ([#556476](https://codereview.qt-project.org/c/qt/qtbase/+/556476), [#437301](https://codereview.qt-project.org/c/qt/qtbase/+/437301), [#471258](https://codereview.qt-project.org/c/qt/qt5/+/471258), [#116726](https://bugreports.qt.io/browse/QTBUG-116726)).


## KDE Print Manager
Good News! We found a volunteer who will work on the CUPS 3.x support in the KDE Print Manager together with KDE developer Mike Noe!

As [I told in April](/OpenPrinting-News-April-2024/#kde-print-manager) Mike Noe from KDE is working on CUPS 3.x support for KDE's printer setup tool.

Now, well after the contributor application deadline for this year's GSoC, Tarun Srivastava, student at the Indian institute of Technology Mandi in India, showed interest in participating in OpenPrinting. He started working on a [CUPS issue](https://github.com/OpenPrinting/cups/issues/135) and after some conversation with Michael Sweet, the problem got solved.

He showed more interest in OpenPrinting, reached out also to me, and then I offered him three areas for contribution: Working on further issues, working on library documentation, and doing the CUPS 3.x support for KDE. He picked the latter.

Now Tarun is enthsiastically on it, talking with Mike Noe by e-mail and also discussing on our Telegram channel for the CUPS 3.x support in the GNOME Control Center, as he will have to resemble this functionality in KDE.

So seems that the first [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) in Mandi was really successful ...


## Quo vadis, Gutenprint?
The Gutenprint project (formerly GIMP-Print as it provided also GUI for printing out of GIMP), created by Michael Sweet, overtaken by Robert Krawitz, and currently taken care of by Solomon Peachy, was an approach to get high quality, free software inkjet printer drivers, especially for photo printing, also with specialty inkjets (like 6 gray-level monochrome) from third parties. Mainly covered were Epson and Canon inkjets, including large formats, and also dye-sublimation photo printers. Also some HP inkjet and laser printers were supported.

Robert Krawitz was working on the project with a lot of enthusiasm for many years, making it the most sophisticated and most active non-manufacturer free software printer driver project, and while he was on it, most Epson inkjets got quickly supported. Unfortunately, Robert stopped working on Gutenprint some years ago due to lack of time.

Maintenance got continued by Solomon Peachy, but as he joined originally for the dye-sublimation printers, development of Epson and Canon printer support practically died.

As Solomon is now mentoring Ankit Pal Singh on his GSoC project about creating a native Printer Application of Gutenprint I got to have a conversation with Solomon which turned out to also be interesting for our readers here and so I published it (with his consent) as an interview here:

Solomon:

> Gutenprint is effectively dead upstream, other than my work.
>
> I keep hoping that these GSoC efforts will supr other interest, but none of this is cool sexy work.. :(

Till:

> Are there really new printer models coming up needing Gutenprint and somebody implementing the support for these models?

Solomon:

> Yes, unfortunately. :)
>
> Well, that someone is me, but yeah. The commercial/industrial dyesub space is still quite resistant to IPP

Till:

> As label printers ...

Solomon:

> Label printers are another vertical that is largely sdk driven instead of generic raster.

Till:

> So the only new models in need of Gutenprint support are dyesubs? Or are Epson and Canon still producing proprietary-only inkjets?

Solomon:

> I can't speak about canon but Epson is still producing non IPP models, especially on the very high end
>
> They still see IPP as something that iterates too rapidly and drives up the cost/complexity/support burdens given the decade-long lifecycle for a given model
>
> Several times now I've actually been hired by US/EU branches of printer makers to reverse engineer things because it was easier than working with their corporate head office. Corporate politics are really screwed up sometimes...

Till:
> That's great ...

Solomon:

> Its been a long time since I've been able to talk anyone into funding improvements to the low level infrastructure though.
>
> Most of my work on gutenprint has been self funded. I prefer to focus on the hardware support side, but... I'm the only one keeping gutenprint alive now.

> I have some contract work coming probably next month for a new router. And I'm still slowly backfilling in some other models as time and access to hardware permits.
>
> Er, a new printer. Not router.

Till:

> So there is somebody contracting you to add support for their printer in Gutenprint?

Solomon:
> Yep. Though not the actual manufacturers

Till:

> OS vendors?

Solomon:

> ISVs producing things like kiosks and specialized print servers, mainly.

Till:

> So these drugstore photo kiosks which have a dyesub printer inside?

Solomon:

> That's one of the major markets, yes. The other major one I deal with is for folks wanting an on premise printing solution for event photography or selfie booths at weddings.

Till:

> These thingies which also often make it to closing parties of conferences, like the Ubuntu Summits.

Solomon:

> They are incredibly popular still.

Till:

> And these high-end Epsons, these seem to show shortcomings of IPP. Are there problems to map the high-end imaging into IPP? Or is it this vast amount of adjustable parameters?

Solomon:

> I think it's the latter, and the fact that the normal use cases require actively tweaking things until you are happy with the output
>
> Printing on custom media, using custom inks, and more. These things are typically driven by a dedicated RIP built on a mfg sdk instead of via OS drivers.

Till:

> And is it straightforward to add the new Epson models into the existing Epson driver of Gutenprint? Or are they inventing all the time new communication protocols? Or is the problem more the always new and different ink sets?

Solomon:

> It's not hard to add basic support for new Epson models, but tuning the output to be "good enough" for standard use case is time consuming especially if it involves a new ink set. I only did it once.

Till:

And probably requires from you to have the actual printer (which you would have to buy if you do not get some form of external support for this work)?

Solomon:

> But yes, either someone sends me a printer or I buy one myself. I have quite a collection now, thanks to eBay and being able to repair broken stuff.

> Epson has a newer communication language and they even provide a cups driver... but it uses a proprietary library.
>
> But all of their high end stuff still provides esc/p2 because that provides the low level knobs you need for all the custom stuff.
>
> Dyesubs are comparatively simple, so I've often got things working with someone else sending me USB sniffs, spool files, and running tests. But it's a lot faster to have the printer on hand. Usually results in more features too as I can experiment more

Till:

> So Epson's proprietary driver with its new proprietary language is more for the "consumer" users who want everything read-made, like what is IPP supposed to be good for, and there is ESC/P2 for the "power users" to have access to everything?

Solomon:

> I think that's fair, yes. But afaik all of the relatively recent esc/p-r models also support IPP directly

Till:

> So the ESC/P-R driver is actually only needed for non-IPP legacy models?

Solomon:

> ...maybe? I honestly haven't looked into it. Epson also doesn't publish any esc/p-r specifications
>
> I don't have any contacts with them.

> When I added the [Epson] surecolor D700 to gutenprint I produced over 100 printed before the quality was acceptable in my eyes. If that hasn't been paid work I would have never have done it.

Till:

> This is a lot, you run through a lot of cartridges, this is impossible if you have to do this on your own dime ...

Solomon:

> Exactly. This sort of tuning needs mfg support. Or better yet they do it themselves.

Till:

> I only have seen by the options in Epson's ESC/P-R PPDs that this driver is rather low-end. It often had only 300 or 360 dpi as resolution, not these crazily high ones directly accessible with Gutenprint. Did they already reach the 10000 dpi?

Solomon:

> That esc/p-r 300dpi is the software exposed resolution. The hardware is much higher, and generates the high res dot/dotjer patterns internally.

Till:

> Does it not make sense to feed at least 600 dpi from the software side into the driver?

Solomon:

> Those crazy high resolutions refer only to individual ink drops. You might get 2-3 drop sizes only so you have to use dithering to get smooth tones. So in practice a 3840dpi printer is still only 360 from a sw perspective
>
> Iirc the models that use /300 dpi are all esc-pr, but /360 can use escp2 as well

Till:

> So there are 300-dpi Epsons? And these are ESC-P/R only (perhaps also IPP)? And the 360-dpi models are both ESC/P-R and ESC/P2? Are the high-end ones all 360-dpi then?

Solomon:

> I think so? Like I said, I have only mucked with two models personally.

Till:

> So you are more the master of the dye-subs?

Solomon:

> Yes, that was how I got involved in this space. And then everyone else sorta left.

Till:

> Meaning that we probably will not see support for new Epson and Canon models?

Solomon:

> The short answer is... Probably not.
>
> The canon maintainer hasn't been heard from for several years.
>
> I could probably take over that stuff completely but.. not on a purely volunteer basis.

Till:

> But this will cost a lot of time and money (printers, lots of cartridges, ...).

Solomon:

> Exactly. Fwiw I think it wouldn't be a lot of work to write a native esc/p-r driver for gutenprint and make the Epson drivers irrelevant. But that goes back to time and money.
>
> ...I have not had a lot of spare time these days, and prefer to spend what I do have outside instead of staring at screens.

Till:

> Yes, and such a high-impact driver change requires testing on actual hardware.

Solomon:

> For several of the dyesub models I've reverse engineered driver binaries to work out algorithms. And often it's not the algorithms themselves that matter, but instead it's embedded data tables.
>
> Meanwhile gutenprint needs updates for the gimp plugin too. Gimp 3 and newer versions of gtk.
>
> The work adds up.
>
> I'm hoping to at least get a new gutenprint release out soon.

Till:

> Yes, this would be great. The Debian (and so also our Ubuntu) package has a crazy version number, due to lack of releases.
>
> 5.3.4.20220624T01008808d602-1build4

Solomon:

> The CI system that Robert set up has gone MIA too. There is a lot of stuff I don't know about that needs to get done for a proper release.

Till:

> So with the background of that most modern consumer or office printers are IPP, including Epson and Canon models, Gutenprint's Epson and Canon support is to be considered rather a way to keep legacy printers alive and for you to do great, useful, and impactful things with Gutenprint is to concentrate on dye-sub, as here IPP support is lacking and in this area you get more easily somebody contracting you.

Solomon:

> I think that is a good summation
>
> The ultra high end and commercial gear also benefits from gutenprint due to the extreme tunability required by the target market.
>
> But everything else is legacy.

Till:

> But this one only if somebody maintains Gutenprint and adds the new models.

Solomon:

> Current models too, yes.
>
> But for any new model to be added someone has to do the work..

Till:

> And therefore it makes the impression for me that this high-end printing support via Gutenprint is dying.

Solomon:

> That's probably been true of gutenprint as a whole for a decade.

> I sometimes think it might be simpler to fork gutenprint and strip out everything that isn't for dyesubs
>
> A pure dyesub subset would be a lot simpler to bolt onto PAPPL too.

Till:

> This would be a good idea ...
>
> The inkjet part would go into OpenPrinting's driver museum for legacy printer support via the (retro-fitting, nobody is willing to make a native one) Gutenprint Printer Application and the dye-sub part goes on actively maintained by you including a native Printer Application.
>
> WDYT? Or would this lead to a lot of independently maintained duplicate code?

Solomon:

> I don't know.
>
> The main complication/duplication has to do with the backend.
>
> And that happens whether or not gutenprint itself is forked.
>
> Figuring out how to merge the backend stuff into the application is a task I've been putting off until after the rest of it is at least demonstrable.

Till:

> OK, looks like that will still need some effort ...

Solomon:

> Yep. Pappl also gives us a lot more options for dynamic settings (Eg restricting available print sizes or other options based on printer state) so that will factor into how things get restructured.
>
> And much better status reporting options. And being able to seamlessly combine print jobs to save paper or time.

Till:

> So with PAPPL we get much better printer drivers and for the client it is all IPP?

Solomon:

> Since PAPPL is a running daemon it is a lot easier to carry state versus the old cups every job is completely standalone model?

Till:

> It even saves state files so that it carries on where it left off after a reboot.
>
> Do you have something which you want to tell to our readers?

Solomon:

> The main thing... see [Xkcd #2347](https://m.xkcd.com/2347/)
>
> I got into this printer hacking world so I could actually use my own printer without using proprietary software/drivers that were ... Quite awful
>
> Even in an IPP world, that still matters.

Till:

> [XKCD #2347](https://m.xkcd.com/2347/) ... The usual one ... It is referred to a lot ...

Solomon:

> Every IPP printer I have owned has had serious bugs that only occasionally get fixed.
>
> My brother laser printer is more reliable using cups+gutenprint talking to the jetdirect port than via IPP.
>
> And faster too?
>
> Free software still matters.
>
> Anyway
>
> I need to go help with dinner, but thanks for the chat. :)

Till:

> Dinner?! For what that? You should better use the time for coding ...

Solomon:

> Plus my phone is at 2%.

Till:

> And thanks for the patience with me, have a nice dinner!


## CPDB 2.0b6
After 10 months, and working currently on [snapping the CPDB backend for CUPS](/OpenPrinting-News-May-2024/#cpdb-cups-backend-snap), we are [now releasing](/Common-Print-Dialog-Backends-Second-Generation-Sixth-Beta-Release/) the sixth beta of the second generation of the Common Print Dialog Backends (CPDB).

**Changes on the CPDB libraries**

Changes are

- Streaming print job content
- Simplifying list filter control
- Allow permanently running backends
- Print dialog update on addition or removal of backends
- Dropped job control functionality
- Discontinued the [`FILE` backend](https://github.com/OpenPrinting/cpdb-backend-file)
- Bug fixes

This caused some API and D-Bus communication protocol changes. See the [announcement post](/Common-Print-Dialog-Backends-Second-Generation-Sixth-Beta-Release/).

**Changes on the CUPS Backend**

Changes are

- Updated names of some CUPS constants to CUPS 2.5.x and newer
- Removed `tryPPD()`, a useless, PPD-related function
- Unified logging. We always use the `log...()` functions now.
- Build test ( `make check`) fixes
- Bug fixes

**The new versions of the CPDB components**

- **cpdb-libs: [More Details and Download](https://github.com/OpenPrinting/cpdb-libs/releases/tag/2.0b6), [Discussion](https://github.com/OpenPrinting/cpdb-libs/discussions/34)**
- **cpdb-backend-cups: [More Details and Download](https://github.com/OpenPrinting/cpdb-backend-cups/releases/tag/2.0b6), [Discussion](https://github.com/OpenPrinting/cpdb-backend-cups/discussions/30)**


## CUPS 2.4.10
There were two new CUPS 2.4.x releases in June, one containing the bug fixes which happened so far plus a security fix and the second quickly done to fix a regression caused by the security fix:

2.4.9:

> CUPS 2.4.9 brings a security fix for CVE-2024-35235 and several bug fixes regarding CUPS Web User Interface, PPD generation and HTTP protocol implementation.

2.4.10:

> CUPS 2.4.10 brings two fixes:
>
> - Fixed error handling when reading a mixed `1setOf` attribute.
> - Fixed scheduler start if there is only a domain socket to listen on (Issue #985)
>
> with the latter being a fix for a regression caused by the fix for CVE-2024-35235 in scenarios where there are no other listeners in `cupsd.conf` than the domain socket created on demand by systemd, launchd or upstart.

**[More Details and Download](https://github.com/OpenPrinting/cups/releases/tag/v2.4.10)**
