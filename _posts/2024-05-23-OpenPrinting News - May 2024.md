---
title: OpenPrinting News - May 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: 20 Years!! CUPS 3.x postponed to mid-2025, OpenPrinting Summit/PWG Meeting, GUADEC 2024, aKademy 2024, UbuCon Asia 2024, GSoC 2024, CPDB Snap, Open Documentation Academy
---

This year is the **20th anniversary**!

The 20th anniversary? Of what?

- Of [**Ubuntu**](https://www.ubuntu.com/)! Its first version 4.10 got released in October 2004.
- Of [**Canonical**](https://www.canonical.com/)! The company behind Ubuntu. It got founded earlier in 2004.
- Of the [**Google Summer of Code**](https://summerofcode.withgoogle.com/)! This year's edition is the 20th.
- Of [**Thunderbird**](https://www.thunderbird.net/)! The famous e-mail clinet. Its 1.0 got released in December 2004.
- Of [**OpenWrt**](https://openwrt.org/)! Embedded operating system for routers. Started back in January 2004.

And ...

... **I got married in 2004**, a **really magic year**. And I was already working with free software, but not aware of all these great things which happened in that year.

This month we had our annual [OpenPrinting Summit/PWG Meeting](#openprinting-summitpwg-meeting) again, and, as usual [Michael Sweet was reporting about the state of the art of CUPS](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2024.pdf), with an updated time line. Unfortunatly, things do not go as fast as thought about and therefore the sharing server, as the last component of **CUPS 3.x** to be released **will only be ready mid-2025**, in 1 year from now. And this is the date which marks when distros can switch over to CUPS 3.x, so that **for Ubuntu the switchover will only happen in 25.10**.

Do you want to learn how to package software in the [Snap](https://snapcraft.io/) package format? Most probably you will not look for resources [here on OpenPrinting](https://openprinting.github.io/OpenPrinting-News-November-2023/#snap-workshops) then, but rather at [snapcraft.io](https://snapcraft.io/). I had already talked about this with Graham Morrison, Snap documentation lead at Canonical, on the [Ubuntu Summit last November](https://openprinting.github.io/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga) and now, finally, after meeting him again on the Canonical-internal Engineering Sprint this month, I have created a page about the Snap workshops on snapcraft.io:

**[Learn snapping! - Interactive Snap Workshops](https://forum.snapcraft.io/t/40263)**

I will keep this page up to date with new workshops, updates of the existing workshops, announcements of next chances to attend in person ...

So let us see what happened at OpenPrinting in May ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## OpenPrinting Summit/PWG Meeting
On May 6-8 we had our annual meeting together with the [PWG](https://www.pwg.org/) (Printer Working Group) again, the [OpenPrinting Summit/PWG Meeting](https://www.pwg.org/chair/meeting-info/may-2024-virtual.html). The meeting was online again, as most of the participants were not able/willing to travel. All slides are available via links in the [schedules](https://www.pwg.org/chair/meeting-info/may-2024-virtual.html).

The first half of the meeting was dedicated to OpenPrinting, the second half to the PWG, mainly the development of the Internet Printing Protocol (IPP).

In the OpenPrinting part there was **no Ghostscript session** again. Since having gotten [acquired by ePapyrus](https://artifex.com/news/artifex-announces-acquisition) Artifex has reduced the development activity on Ghostscript a lot and so there were only bug fixes. We used the time again for other topics, this year especially about [**desktop integration**](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-filters-snap-oci-cpdb-desktop-and-more-2024.pdf) and [**software distribution methods (Snap, OCI)**](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/distribution-methods-roadmap-may-2024.pdf).

Most important session was [**Michael Sweet's CUPS plenary**](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2024.pdf), where he always gives estimated timelines of the upcomimg releases of CUPS. Unfortuntaly, these do not match the [last ones](https://events.canonical.com/event/35/contributions/285/attachments/66/111/oos-cups-september-2023.pdf), presented on the [Opportunity Open Source in September last year](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india). The final 3.0.0 releases of the components are now estimated as follows:
- [**libcups3**](https://github.com/OpenPrinting/libcups): August/September 2024
- [**cups-local**](https://github.com/OpenPrinting/cups-local): February/March 2025
- [**cups-sharing**](https://github.com/OpenPrinting/cups-sharing): April/May 2025

This means a **further delay of another ~6 months**.

**Note that for an integration in Linux distributions all the 3 components need to be available**. It would be awkward to have a desktop distribution using the local server of CUPS 3.0.0 (with libcups3) and if a user wants to share their printers they have to install CUPS 2.x (with libcups2) and somehow the interaction between the CUPS 2.x daemon and the local server of CUPS 3.x has to get managed.

libcups3 could get into use more quickly, for example in Snaps or OCI container images of Printer Applications.

We had also **2 short talks by our GSoC contributors** this year. **Akarshan Kapoor** has presented his work about [**scanning support in PAPPL**](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/PAPPL%20Scanning%20Support.pdf) and **Rudra Pratap Singh** his planned GSoC project of [**OCI containerization of CUPS and Printer Applications**](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/PWG_2024_rudra_pratap_singh.pdf).

There will be written up summaries of the event in the coming weeks. I will post links to them as soon as they get available.


## GUADEC 2024 in Denver
The next [GUADEC](https://events.gnome.org/event/209/) is approaching! This year it will take place in Denver, Colorado, USA, on July 19-24!

As usual it will consist of talks on the first 3 days, then workshops and BoFs for 2 days and to complete it, 1 day-trip day. The Call for Proposals has closed some weeks ago and the talks are already [selected](https://events.gnome.org/event/209/contributions/) and [scheduled](https://events.gnome.org/event/209/timetable/#all.detailed), but not yet the workshops and BoFs.

As in the previous years I will be there with a Canonical Gang, this time Ken VanDine, Marco Trevisan, Jeremy Bicha, and Aaron Prisk. And we all will meet our former colleague Heather Ellsworth (had moved on to Thunderbird last year). Living in Colorado Springs, one hour from Denver, this GUADEC is practically a home game for her (and she was actually involved in this location selection).

I had also submitted 3 proposals. The Snap workshop and a talk about the Google Summer of Code got rejected, but my talk about Snap and Ubuntu Core Desktop will take place.

It is

**[Snap and Ubuntu Core Desktop - Desktop Linux, as easy as a smartphone!](https://events.gnome.org/event/209/contributions/761/)**

Fri, July 19, 15:15 MDT, Room 250 Turnhalle (Track 1)

This talk is about Snap and the all-Snap desktop Linux distribution Ubuntu Core Desktop, how all this works, the motivations, advantages, challenges, and state-of-the-art ...

I submitted the proposal for a 40-min slot, to allow for a generous Q&A, like [Ken VanDine had on SCaLE](https://www.youtube.com/live/twP0V0SjKbc?si=Ey-loScot6JWSLPm&t=6894) ([directly to Q&A](https://www.youtube.com/live/twP0V0SjKbc?si=y1oUQixBSpnQot0k&t=8968)), but unfortunately, I got only 25 min, as I got for [this talk when I gave it on FOSDEM](https://fosdem.org/2024/schedule/event/fosdem-2024-1860-desktop-linux-as-easy-as-a-smartphone-just-in-a-snap-/).

As Ken is also on this conference, he will be most probably with me in the room and help answering questions.


## aKademy 2024
This year will be the first time that I attend the [aKademy](https://akademy.kde.org/2024/), KDE's annual conference! This is to raise awareness of the New Architecture for printing also under the KDE folks. Also they need to update their printing support, both in the printer setup tool and the print dialog, to allow for distros to switch to CUPS 3.x. The dialog got already done by [Gaurav Guleria adding CPDB support](https://github.com/TinyTrebuchet/gsoc22/) and the [KDE developer Mike Noe is on the KDE Print Manager](/OpenPrinting-News-April-2024/#kde-print-manager), but to be sure it is better to let the wider KDE developer community know ...

For that I have submitted a talk proposal to tell what the New Architecture is all about, what it requires from the GUIs, and the state-of-the-art of KDE's work on supporting it.

Another point is that I will, together with my colleague Alex Lowe from Canonical, make the conference snappy. For that Alex has submitted a short (10 min) talk about "why a [KDE] developer might want to release their software as a Snap" and I have submitted my talk "Desktop Linux, as easy as a smartphone! Just in a Snap!" based on the one [which I already have given on FOSDEM](https://fosdem.org/2024/schedule/event/fosdem-2024-1860-desktop-linux-as-easy-as-a-smartphone-just-in-a-snap-/), but also telling about the state-of-the-art of KDE desktop session Snaps (which could make up a Kubuntu Core Desktop) if there are ones by the time of the conference.

There was no CfP for workshops yet, but as soon as submissions for workshops open, Alex and me, we will submit my initial [Snap workshop](https://forum.snapcraft.io/t/40263) "Your app everywhere, just in a Snap!" but as a KDE edition. Alex will make KDE-based examples/exercises for that. I could also submit the workshop about Snap update automation in addition, to make the "SnapKademy" complete ...

By the way, the [aKademy 2024](https://akademy.kde.org/2024/) takes place on September 7-12 in Würzburg, in Germany.


## UbuCon Asia 2024 in India
As I already [told in March](/OpenPrinting-News-March-2024/#opportunity-open-source---2nd-edition) I am working on a second edition of the Opportunity Open Source in India. Having again another conference in India, this time the [UbuCon Asia in Jaipur](https://2024.ubucon.asia/) on Aug 31 - Sep 2 (Sat - Mon) I am planning to run the Opportunity Open Source on Aug 23 - 25 (Fri - Sun), and most probably in the IIT Kanpur, and this way attend two conferences on one trip.

Therefore I have submitted several talk proposals and got 2 sessions accepted:

**[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://events.canonical.com/event/47/contributions/372/)**

Sat, August 31, 11:35 AM IST, Main Hall

The motivation, advantages, and concept of the sandboxed, immutable Snap packaging format is shown and how it is used to make up immutable all-Snap OS distros, the IoT distro Snap was originally designed for, Ubuntu Core, and the easily usable and maintainable Ubuntu Core Desktop.

**[Your app everywhere - Just in a Snap! - Interactive Workshop](https://events.canonical.com/event/47/contributions/397/)**

Sun, September 1, 1:55 PM IST, Room 2

Interactive workshop to learn how to package applications in the sandboxed, immutable package format Snap to publish them in the Snap Store. Attendees will create simple Snaps in several hands-on exercises.

[Full schedules](https://events.canonical.com/event/47/timetable/#all)

Special thanks to Youngbin Han from the Ubuntu Korea community and Ubuntu LoCo Council, who is leading the organization of the conference, for his great support.


## Google Summer of Code 2024
Lat week, the official coding period has started. Some of the contributors have started to work on their projects already earlier, others had their final exams for this semester in the last weeks and therefore are starting only now.

I have created group chats on Telegram for each project to ease the communications between the mentors, the contributors and me. The OpenPrinting channel on Telegram is for general discussion and for my announcements.

I have also taken care that there are mentors for everybody and I do not have to do all the mentoring by myself.

And I have started to ask the contributors for write-ups for the OpenPrinting News, and several have written some lines:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh

> This month, I have concentrated on deepening my knowledge by studying the Rockcraft documentation. Looking ahead, my next objective is to develop a production-ready CUPS container. To achieve automation in this endeavor, I am thoroughly reviewing the codebase of the ubuntu/desktop-snap project. My goal is to leverage their existing work to implement automated versioning and dependency updates for our container images.
>
> Additionally, I have successfully developed a Dockerfile for CUPS, enabling remote access from the host system to the CUPS instance within the container using the cupsctl --remote-admin command.
>
> Have a look at the github repository [http://github.com/Rudra-IITM/cups-docker](http://github.com/Rudra-IITM/cups-docker)

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha

> This month I worked on the remaining part for the CPDB Snap. I finished making the necessary changes for filtering the printer list completely by the frontends and not by sending signals to the backends, and submitted a PR for the same. I am currently working on facilitating adding new backends while the frontend dialog is open. I am working closely with Till on this and hope to finish it as soon as possible to ensure everything is ready for the CPDB Snap. With respect to GSOC, I have finished setting up the development environment for LibreOffice, and am currently going through the code of the previous OpenPrinting contributor's work on the print dialog of LibreOffice.

Biswadeep still mostly worked on the snappability of the CPDB backends, but finished the needed changes now ([see below](#cpdb-cups-backend-snap)). Now he has started on his actual GSoC project.

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu

> Enhancing OpenPrinting's Security with OSS-Fuzz Integration
>
> Most of OpenPrinting's projects are predominantly written in C, which are prone to encounter memory violation bugs, and lack advanced testing methods like fuzzing. OSS-Fuzz, a well-recognized initiative for identifying vulnerabilities in open-source projects, is now being leveraged to bolster the security of C-based projects under OpenPrinting. This strategic integration aims to continuously detect and report potential threats.
>
> The current phase of integrating CUPS with OSS-Fuzz is primarily dedicated to rigorous validation and testing. Our approach involves developing fuzzing harnesses grounded on previously identified CVE vulnerabilities and refining existing unit testing framework into a more robust fuzzing infrastructure. This initial integration serves as a foundational step in our broader strategy to enhance the resilience of OpenPrinting’s projects through comprehensive fuzz testing.

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor

> My work was focused on developing the API for the Scanner object and Driver Interface, with an initial task to finalise the structure of scan APIs within the scanner and scanner-private header files. Key achievements include developing the Scan API object based on the Printer API object, tailored to eSCL scanning needs. I also updated the PAPPL job API object to accommodate both print and scan jobs by adding a reference to the scan object. Additionally, I created the scan driver API, modelled after the print driver APIs, but with callback functions and without support for vendor-specific options to align with PAPPL eSCL scanning protocols. Similarly, the options API structure was updated based on printer options and also excludes vendor options. The scanner headers for the public and private APIs were introduced, each with appropriately named header guard macros, patterned after their printer counterparts. Currently, I am enhancing the accessors file to provide accessor functions for the scanner object, following the format established in the printer accessor functions.

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> Here's the latest on my project:
> - Understanding System Config Printer:
>   - I've been studying the current code and functions of system-config-printer to understand how it works.
>   - This helps me see what needs to be changed for the new architecture.</LI>
> - Switching to the New Architecture:
>   - To update CUPS for the new architecture, we will need to change some existing functions in system-config-printer.
>   - This will make sure everything works well together.
> - Understanding IPP Services:
>   - I've been reading about the IPP (Internet Printing Protocol) services that system-config-printer needs to use.
>   - This is important for making the necessary updates.
> - Talking with My Mentor:
>   - I had a discussion with my mentor, Mohit Verma, who gave me an overview of how to start the project and suggested some functions I might need to write.
>   - His advice is helping me plan the updates.
> - Next Steps:
>   - Right now, I'm focused on understanding the existing functions in system-config-printer.
>   - Next, I'll figure out and add the new functions needed for the new architecture.

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> User interface for using OAuth2 with printers and scanners
>
> This project is all about providing authentication support to the printers and scanners which can help us to save the client's files. I had figured the idea about adding this functionality to the print dialogs.
>
> The CPDB does not have authentication support, which may cause threat to client's data. It is important to use an authentication server and for this I am using GNOME online accounts (GOA).
>
> I had a discussion with GOA for using their server for authentication and it can be used to create or add an account which client needs to initiate for the authentication.
>
> To proceed with it setting up D-Bus communication, querying GOA for OAuth2 tokens.
>
> To use GOA as authentication server, the installation of few libraries are required such as 'libgoa-1.0-dev' for GOA and 'libdbus-1-dev' for D-Bus communication.

Unfortunately, we did not get write-ups from everyone. Several have been deeply in their exams these days. **Especially Arun Patwa (Braille) and Ankit Pal Singh (Gutenprint) have graduated. Congratulations to them!**


## CPDB CUPS backend Snap
Biswadeep Purkayastha is volunteering on snapping the [CPDB backend for CUPS](https://github.com/OpenPrinting/cpdb-backend-cups) since the end of last year and we ran into several problems, especially as we have to do with user daemons now and the frontend browses available D-Bus services to find all installed backends. [Discussion on the snapcraft.io forum](https://forum.snapcraft.io/t/snapping-cpdb-cups-backend-a-user-daemon-using-d-bus/) led to the need of some changes in the architecture of the Common Print Dialog Backends (CPDB) infrastructure and Biswadeep has done them all now!

**Thanks again, Biswadeep, for your great work!**

The changes are:

1. The `printFile` method of backends passes the job data as stream via a domain socket now, not as file specified by a file path
2. The D-Bus methods `getActiveJobsCount`, `getAllJobs`, and `cancelJob` got removed from CPDB
3. The file backend of CPDB cannot be used. We decided to discontinue its development and will use it for development and documentation only
4. Filtering of the printer list in the dialog is now done by D-Bus methods in the backend's D-Bus service and not any more by the frontend also being a D-Bus service and sending signals
5. By a background thread the coming and going of backends is monitored and the printer list in the dialog appropriately updated

Biswadeep provided the changes via the following Pull Requests which got all merged now:

- cpdb-libs: [Pull Request for (1) and (2)](https://github.com/OpenPrinting/cpdb-libs/pull/30) ([merged](https://github.com/OpenPrinting/cpdb-libs/commit/85447e86686)), [Pull Request for (4) and (5)](https://github.com/OpenPrinting/cpdb-libs/pull/32) ([merged](https://github.com/OpenPrinting/cpdb-libs/commit/8f9e0544aa6))
- cpdb-backend-cups: [Pull Request for (1) and (2)](https://github.com/OpenPrinting/cpdb-backend-cups/pull/28) ([merged](https://github.com/OpenPrinting/cpdb-backend-cups/commit/4a1c45315da9)), [Pull Request for (4)](https://github.com/OpenPrinting/cpdb-backend-cups/pull/29) ([merged](https://github.com/OpenPrinting/cpdb-backend-cups/commit/db3ff14114eae))

I have [posted the news on the thread in snapcraft.io](https://forum.snapcraft.io/t/snapping-cpdb-cups-backend-a-user-daemon-using-d-bus/37397/16?u=till.kamppeter) and snapd developers Zygmunt Krynicki and James Henstridge are looking into how to proceed with the snapping.

See also our coverage here in the [October News](/OpenPrinting-News-October-2023/#cpdb-cups-backend-snap), the [November News](/OpenPrinting-News-November-2023/#cpdb-cups-backend-snap), and the [March News](/OpenPrinting-News-March-2024/#cpdb-cups-backend-snap).


## Open Documentation Academy
OpenPrinting needs contributors for documentation urgently. Especially we have no documentation for the APIs of [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters), [libppd](https://github.com/OpenPrinting/libppd), [pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit), and [cpdb-libs](https://github.com/OpenPrinting/cpdb-libs).

Finding contributors for documentation is not easy, Google Summer of Code is only for code contributions, Google Season of Docs is not suitable for us as we would have to hire the technical writer, and finding people just volunteering i tried, even some telling they would do, but they did not do in the end ...

Now another chance came up for us: Recently Canonical has started the new "[Open Documentation Academy](https://discourse.ubuntu.com/t/39615)" program and this seems to be a good way to find volunteer documentation writers.

Central point of it is a [GitHub repository](https://github.com/canonical/open-documentation-academy), where organizations can post their documentation needs as [issues](https://github.com/canonical/open-documentation-academy/issues), so volunteer writers can browse the issues and find documentation tasks they like to do. I have already posted one issue as an example, it is for API documentation of libcupsfilters. Here is the [original on our GitHub](https://github.com/OpenPrinting/libcupsfilters/issues/54) and a [manual copy at the Open Documentation Academy](https://github.com/canonical/open-documentation-academy/issues/74).

This is a little awkward and several feature requests for improvements got posted. First idea was [automatic copying of documentation issues](https://github.com/canonical/open-documentation-academy/issues/11), but this would need explicit permission from Canonical's IS team (they are owner of the https://github.com/canonical/ organization on GitHub). Then I brought in the ideas of [registration and self-presentation of participating organizations](https://github.com/canonical/open-documentation-academy/issues/70) and of [listing documentation-related issues directly from their tracker](https://github.com/canonical/open-documentation-academy/issues/71).

And the Open Documentation Academy is not only finding together organization's documentation needs and voluntary writers, but they support the writers with a lot of resources: [Discussion forum](https://discourse.ubuntu.com/c/open-documentation-academy/), [Weekly Office Hours (live discussion, recording on YouTube)](https://discourse.ubuntu.com/t/42771), [Chat on Matrix](https://matrix.to/#/#documentation:ubuntu.com), mentoring, guiding, ...

We will post more documentation tasks in [the list](https://github.com/canonical/open-documentation-academy/issues) and hopefully will have a better presentation of ourselves and of our tasks in the program soon.

Thanks Graham Morrison for this great initiative!
