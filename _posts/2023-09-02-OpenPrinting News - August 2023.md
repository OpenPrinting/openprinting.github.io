---
title: OpenPrinting News - August 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Opportunity Open Source in IIT Mandi, India, DebConf 2023 in Kochi, India, Ubuntu Summit 2023 in Riga, GSoC 2023, CUPS Snap switchover postponed, Ubuntu Core Desktop first
---
Usually, I am posting each month's news mid-to-end of the month, now it got really late with it, but it is still for August, there will be the September one in the end of this month.

I was really busy these days, once trying to complete the desktop integration of the New Architecture of printing in Ubuntu 23.10 and second, organizing the Opportunity Open Source in the IIT Mandi, in India.

While with India everything is going well (I am writing these lines on the flight) I did not succeed with the switchover to the CUPS Snap in time and we are [rolling back to the original Debian-package-based setup](#the-cups-snap-not-in-ubuntu-2310) of 23.04 and before. But it was not lost time and effort, it was a test, a rehearsal, and a wake-up call for the desktop and application developers.

Our [GSoC contributor team](#google-summer-of-code-2023) is continuing with the desktop integration full-steam neverthelesss, as there is not only the switchover of Ubuntu to the CUPS Snap, but also all-Snap Ubuntu Core Desktop and CUPS 3.x are right in front of us. 

Now there are only a few days left until the [Opportunity Open Source](#opportunitiy-open-source-in-the-iit-mandi-india). Canonical's Ubuntu OnAir (the same live streaming system which is used for the Ubuntu Indabas) is set up for live streaming and for remote live speakers. Akarshan and his colleagues in Mandi are lining up a volunteer team and organizing the equipment needed to stream from the 2 conference rooms. And I will meet Aveek in Kolkata in a few hours and will travel with him to Mandi on Thursday, being at the venue Friday morning for setting up the rooms and briefing the volunteers ...

Meet us in Mandi ...

... or on a screen near you ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting).**


## Opportunitiy Open Source in the IIT Mandi, India
Now there are only 2 days missing before we all meet on the [Opportunity Open Source](https://events.canonical.com/e/mandi2023) in the Indian Institute of Technology Mandi in Northern India.

The [final schedules](https://events.canonical.com/e/mandi2023/timetable) are published now and we got exceptional sessions together to introduce the students to the amazing world of Open Source.

We start Friday afternoon, at 3pm IST (Indian Standard Time, UTC+5:30) or 9:30am UTC. After a short introduction by Aveek and me Aveek will explain what Open Source and free software exactly means, for those who are new to the scene. Then we will hear some introducing words from Kate Stewart from the Linux Foundation and the Zephyr project, before I tell what OpenPrinting is, how it started, and what we are currently doing.

After a break for some snacks, coffee, and most importantly, hallway sessions, we split into 2 tracks in our 2 conference rooms for the rest of the day.

In Room 1 I will host the OpenPrinting track with Michael Sweet connected remotely, talking about the current development of CUPS and how we will proceed in 2023 and 2024 and discuss with us. After that I will present and discuss the desktop integration of the New architecture and also the integration in immutable distributions with sandboxed packaging. Mohit Verma will give a demo of his work on making the GNOME Control Center ready for the New Architecture.

In Room 2 we will have a [Zephyr](https://www.zephyrproject.org/) track, hosted by Aveek Basu, with 2 remote sessions. First, Benjamin Cabé from the Zephyr project will give an introduction into Zephyr, a free software lightweight operating system for IoT, for microcontrollers and similar devices not powerful enough to run Linux. After that we will have the first interactive workshop where the speaker is connecting remotely. Jonas Remmert will teach using Zephyr and developing on Zephyr to the audience in the room.

On Saturday we start in the morning, at 10am IST, or 4:30am UTC. Here we will have a Google Summer of Code panel hosted by Aveek and me with GSoC contributors nd mentors, another panel with a Canonical Gang telling about what it is to work at Canonical and how to apply, talks about immutable distributions, one about Snap and [Ubuntu Core Desktop](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) by me and another about [blendOS](https://blendos.co/) by Rudra Saraswat, talks about documentation, lightning talks, and two workshops.

The talks and panels all take place in Room 1, the workshops are run in parallel, a Zephyr training in Room 1 and a workshop about packaging applications as Snaps, hosted by me, in Room 2.

For the lightning talk session most of the spots are still free and you can sign up during the event.

Naturally I hope to see you in-person in Mandi, but alternatively, you can attend remotely on YouTube or Twitch via Ubuntu OnAir. See instructions on [our event site](https://events.canonical.com/event/35/page/231-attending-remotely) and on [Ubuntu Discourse](https://discourse.ubuntu.com/t/opportunity-open-source-in-the-iit-mandi-india-live-september-8-9-2023/).

**And watch out for updates on Mastodon: [#OpportunityOpenSource](https://ubuntu.social/tags/OpportunityOpenSource).**


## DebConf 2023 in Kochi, India
After Mandi in the north of India I will directly go to Kochi in the south, to the [DebConf](https://debconf23.debconf.org/).

My two proposals got both accepted, and the event's [schedules](https://debconf23.debconf.org/schedule/) are published.

**Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!**

**Tuesday, Sep 12, 10:30 - 11:15 IST, Anamudi Room**

This talk is about how we have organized the conference, the challenges, and naturally also the outcome and experiences with running it, having come right from there to the DebConf. And we will have a Q&A session about organizing conferences and also being a mentoring organization for the Google Summer of Code.

So everyone interested in running a free software conference and/or participating in the Google Summer of Code is welcome to participate in this session.

**The New Architecture for Printing and Scanning on Debian**

**Saturday, Sep 16, 12:00 - 12:45 IST, Anamudi Room**

With the DebConf taking place right in the new cycle after the Bookworm release I will tell the Debian developer community about the New Architecture of printing and scanning to help them switch the Debian distribution to the new IPP-only PPD-less realm. The talk will also cover any news from our roadmap sprint in Mandi.


## Ubuntu Summit 2023 in Riga
For this year's [Ubuntu Summit](https://events.canonical.com/event/31/) the presentationns have been chosen, but unfortunately, my talk about the Opportunity Open Source in India and the workshop about snapping (packaging as Snaps) applications, together with Lucy Llewellyn, did not get selected.

But I will not be there without any contribution. My workshop "[Improving snap maintenance: automating tag updates](https://events.canonical.com/event/31/contributions/217/)" got selected.


## Google Summer of Code 2023
Some changes have happened in our contributor team. Yuvraj Aseri has finally failed on mid-term and Gayatri Kapse's project of updating libcupsfilters, CPDB, ... to IPP Everywhere 2.0 turned out to be unnecessary and so I moved her over to do the native Gutenprint Printer Application. With that we have now 5 GSoC contributors plus 1 volunteer.

**OpenPrinting: CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Till Kamppeter, Gaurav Guleria, Shivam Mishra, Rithvik Patibandla, Ira McDonald

> I have pushed the dummy printer code for review and in response chromium team replied that code is compiling and linking perfectly fine but it needs to be invoked from the core code that initiates print backend, I am able to locate the issue with creating instance of print backend and successfully implemented it and tested the functionality of dummy print backend . Next task is to import CPDB and replace dummy code with CPDB API’s

**Sand-Boxed Scanner Application Framework**<BR>
Contributor: Akarshan Kapoor<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Deepak Patankar, Ira McDonald

> I am in the process of developing a series of callback functions for scanning, which will later interface with SANE via PAPPL Retrofit. One of the challenges I face is manually reviewing the entire list of callback requests, ensuring adherence to specific input and output specifications. Furthermore, as we support Continuous Integration (CI), it's essential to maintain a standard set of text files suitable for use as a Dummy Driver Replacement.
>
> I've nearly completed the callbacks for "Get Scanner Capabilities" and "Scanner Buffer Info". My upcoming focus will be on the PUT requests typically sent to the server for scan settings verification and for estimating the size of the scanned image. This will lead into the development of Scan Job Callbacks, which will necessitate a thorough examination of the MOPRIA scan specifications.
>
> We already have a set of data structures to store scan information, accompanied by a custom XML generation function. This function facilitates the conversion of data from these structures into the XML format for the client. Alongside these developments, I am also delving into SANE's implementation within PAPPL Retrofit.

**GNOME Control Center: List and handle IPP print services for the New Architecture**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Marek Kašík, Zdenek Dohnal, Rithvik Patibandla, Ira McDonald

Mohit is continuing his work after being out for a required internship for some time. Trying to get Ubuntu 23.10 using the CUPS Snap I asked him to make everything working, especially the "Add Printer" part and visible grouped listing of IPP print destinations in the main view, as soon as possible and do the UI design worked out with Elio Qoshi from Canonical afterwards.

For the "Add Printer" part one problem was to find the executable of a locally running Printer Application discovered via DNS-SD, in order to run it as command line client to control the Printer Application, like making it auto-discover the printers or assign a driver to a given printer. I found out that PAPPL provides (non-standard) IPP calls for all needed operations and Mohit now succeeded to implement the "Add Printer" part only using DNS-SD and IPP to communicate with the Printer Applications.

This is also important as if we use Snap packages or other containers, G-C-C does not see processes in other containers and also cannot access the executable files.

The fact that we use non-standard IPP calls of PAPPL is no problem, as the command line interface we wanted to use before is also PAPPL-specific. There is no standard way to make a Printer Application discover printers or assign internal drivers to a given printer.

**Native Gutenprint Printer Application**<BR>
Contributor: Gayatri Kapse<BR>
Mentors: Till Kamppeter, Solomon Peachy, Rishabh Maheshwari, Chandresh Soni, Ira McDonald

> I have gained an understanding of how the pappl-mainloop operates, as well as how printer states are managed in pappl using the .state file. I have also identified various functions responsible for handling requests like get-printer-attributes and print_job in pappl. Moreover, I have explored the web interface of the printer application running on port 8000. Currently, I am delving into the codebase of gimp-print-source, where different printer driver series have distinct backends. These backend methods are stored in an object, and backend_common.c plays a role in determining the appropriate backend to execute based on options. I am in the process of identifying functions within libgutenprint that I can correlate with pappl, facilitating the creation of a native printer application.

**Preset management web interface for PAPPL-based Printer Applications**<BR>
Volunteer contributor: Ankit Pal Singh

> I have completed writing the code in pappl and cpdb-backend-cups to implement presets support. Currently, I am in the process of refactoring and making some UI changes. Once this is done, I will proceed to finalize the documentation.


## The CUPS Snap NOT in Ubuntu 23.10
Sorry for the false alarm last month, unfortunately, we had to step back from the switchover. So Ubuntu 23.10 will, as 23.04 and before, come with a printing stack in Debian packages.

As I told last month, I had conducted the switchover together with Sebastien Bacher, and so Ubuntu 23.10 (Mantic) was using the CUPS Snap as printing stack and so was forced into the New Architecture. Principally this works, but only on the command line, or on headless servers.

What was missing is the desktop integration. I have tried torrush in the changes in the "Printers" module of GNOME Control Center getting it just working without any UI design fancinesses and put Mohit Verma under some pressure, but this turned out not being that easy.

Also Ubuntu is not only the original distribution from Canonical, with GNOME desktop. There are many so-called flavors, distributions derived from the original Ubuntu and also having the same release cycles as the original Ubuntu. In most cases they have a different desktop, but also versions for special tasks, like education, or media streaming an editing are under them. Many of them do not use the current GNOME Control Center, but other printer setup tools.

This caused a lot of discussion in a [Ubuntu Discourse thread](https://discourse.ubuntu.com/t/cups-snap-call-for-testing/), especially the leders of several Ubuntu flavors chimed in. I tried to calm the people down and bring in ideas for quick solutions, like providing a modified GNOME Control Center which all modules but the "Printers" module removed for example, which could be installed as independent printer setup tool on any distro.

But this does not cover everything and already being after Feature Freeze it would be impossible for all these flavors getting ready for the New Architecture, and therefore we have pulled back. Especially also to avoid a desaster as we had with Firefox.

And as I always keep the community up to date, between the OpenPrinting News posts [via Mastodon](https://ubuntu.social/@till/110945873056733624), it made it right away into [OMG! Ubuntu](https://www.omgubuntu.co.uk/2023/08/ubuntu-23-10-wont-use-cups-snap) and following that we got also a [video by Brodie](https://www.youtube.com/watch?v=eVAoG83lm3Y).

So for now I will concentrate on printing and scanning integration in the all-Snap distro [Ubuntu Core Deskop](https://discourse.ubuntu.com/t/ubuntu-core-desktop-deep-dive/), using the CUPS Snap, the Printer Application Snaps, Akarshan Kapoor's scanning support in PAPPL for Scanner Application Snaps, Mohit Verma's work on the GNOME Control Center, and Gaurav Guleria's and Kushagra Sharma's work on CPDB and print dialogs. If all this is working, we will reconsider the switchover of the "classic" Ubuntu, to avoid breaking an LTS (24.04) in Ubuntu 24.10 at the earliest.
