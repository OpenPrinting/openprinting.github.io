---
title: OpenPrinting News - September 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: 40 years of GNU, Opportunity Open Source in IIT Mandi, India, DebConf 2023 in Kochi, India, R. I. P. Abraham Raji, Ubuntu Summit 2023 in Riga, GSoC 2023, cups-filters 2.0.0, PAPPL 1.4.0, CUPS 3.x
---
We are all talking about Open Source or, more correctly, Free Software, and others are just talking about Linux, which is only a small part of it, but many do not know when and how it all began.

A few days ago, on September 27, we had the **40th anniversary of Richard M. Stallman (RMS) [announcing](https://www.gnu.org/gnu/initial-announcement.html) the plan to develop the [GNU operating system](https://www.gnu.org/gnu/the-gnu-project.html)**, a free (as in freedom) Unix-like operating system.

And what made Richard coming to this idea is the same as what made me promoting CUPS and running OpenPrinting, a problem with a printer.

[Richard´s problem](https://amogh.medium.com/the-story-of-open-source-so-far-bfcb685d85a4) was that back in 1980 at the MIT Artificial Intelligence Laboratory, where he was working, they got a shiny new Xerox 9700 and Xerox denied him access to the source code of the printer's software, for him to make the users get informed about finished jobs, paper jams, ... (note that CUPS came well later) Exactly this he did with the software of the previous printer. See the whole story in ["Free as in Freedom", by Sam Williams, chapter 1](https://www.oreilly.com/openbook/freedom/ch01.html).

[My problem](/history/) was that back in 1998 in the Theoretical Physics department of the University of Bayreuth in Germany, where I did my PhD, they got a shiny new Tektronix Phaser color laser printer and it only came with proprietary software for commercial Unixes and not for Linux. Only by deploying CUPS with its perfect PostScript printer support I solved the problem.

But my problem had never showed when there had not been Richard's ...

To celebrate the 40th anniversary of the foundation of the free software movement, there was a [little one-day conference](https://www.gnu.org/gnu40/) in [Biel/Bienne](https://www.biel-bienne.ch/) in Switzerland, with several talks. Richard Stallman was also there, giving a [keynote](https://audio-video.gnu.org/video/gnu40/rms-gnu40.webm) ([FOSS Force article](https://fossforce.com/2023/10/richard-stallman-talks-red-hat-ai-and-ethical-software-licenses-at-gnu-birthday-event/)).

In the keynote RMS revealed that he has cancer, and one sees also in the video that he has lost all his hair and beard due to the chemo (see also the [article on The Register](https://www.theregister.com/2023/09/29/richard_stallman_cancer/)). But he says that his prognosis is good.

**We all wish RMS all the best to recover soon and continue his great initiative for many more years.**

And, talking about history of free software, on the DebConf in Kochi, India, I met Raghavendra Bhat, who told me his **experience with [XPP](http://cups.sourceforge.net/xpp/) (X Printing Panel)**, the little print dialog I wrote back in 2000, which initiated my printing career.

He did a lttle write-up for me to post here:

> XPP was doing a good job for me as I had setup some Xerox or HP Laser Jet printers. I had setup FVWM on Slackware GNU or so, then I chanced upon this small nifty printer setup uty XPP. I deployed it as it had no other library dependencies, it had a dependency on libfltk or was it libx11. I setup the HP Laserjet printer beautifully, an unused PC AT computer with Slackware GNU/Linux acted as the print server now with this X11 tool called XPP.
> 
> I looked up as to who the developer of this panel was, a weird sounding Norwegian or such name with Kampeter in the end. I thought it was some computer programmer who made a pun of  his name to mask identity as to the creator of XPP, Kampeter for Komputer!!
> 
> About a couple of months back, a research scientist told me that the Slackware machine near a Laser Printer was still not junked. Much to my suprise, the Laser printer was still churning out pages with this XPP dialog-like printer panel interfacing with this antique AT machine. Hahaha..... 

> Yes, Till Kampeter, you really are ancient, more still so serving a real good job with the XPP printer panel.  I had deployed this with Slackware in an oceanography lab here in Kochi, maybe was it Bo Peep or was it Hamm or it could  have still have been Slackware GNU. Debian GNU was not known, even if it were who would want to do a tedious install with the BOOT and ROOT floppies!!  

So XPP is still in good memories ...

My colleague at Canonical I mentioned most in my OpenPrinting News was **Heather Ellsworth**, especially known as the host of the [Ubuntu Desktop Team Indabas](https://www.youtube.com/watch?v=P22DOu_ahBo). Unfortunately, she has left Canonical.

But no worries, [she is at **Thunderbird** now](https://ubuntu.social/@killyourfm@layer8.space/110877369458576896), in Jason Evangelho's marketing and communications team. So she is continuing in free software, continuing doing community work, continuing to attend and organize conferences (and so continuing to meet me), ~~continuing to do Indabas~~ ...

... not Indabas, but she did a great podcast, [episode #5](https://blog.thunderbird.net/2023/09/thunderbird-podcast-5-remote-work-tips-tricks/) of the [Thundercast series](https://blog.thunderbird.net/category/podcast/). She tells about how she got into free software and gives some tips for remote working (note that Thunderbird is also totally work-from-home, as Canonical).

Also Monica Ayhens-Madon, especially known as host of the [Ubuntu Community Office Hours](https://www.youtube.com/watch?v=diB3wm4HB1Y) back in 2021, who left Canonical already last year, [is now at Thunderbird](https://ubuntu.social/@communiteatime@fosstodon.org/111144927870000249), at least part-time.

And by the way, I have shown here already, [exactly a year ago](/OpenPrinting-News-September-2022/), a printer which prints on beer foam, in the Guinness Storehouse in Dublin, Ireland, and I have [seen it again in Vienna](https://ubuntu.social/@till/111137094247325237), where I live. It's a [Ripple Maker](https://www.drinkripples.com/), controlled by its touch screen and a web app, most probably not a driverless IPP printer.

**Special tip:** You are on **NixOS**? Printing is not enabled by default there. Please follow [these instructions](https://nixos.wiki/wiki/Printing) (Thanks, [Linux Matters](https://linuxmatters.sh/) team for the hint in [episode #13](https://linuxmatters.sh/13/)).

So let us now start with what we did at OpenPrinting in September ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**


## Opportunitiy Open Source in the IIT Mandi, India
**My talk about the conference on the DebConf 2023: "[Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!](https://debconf23.debconf.org/talks/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us/)" ([video](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/debconf23-216-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us.av1.webm), [slides](https://salsa.debian.org/debconf-team/public/share/debconf23/-/blob/main/slides/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us/talk-opportunity-open-source.pdf), [all files/photos](https://salsa.debian.org/debconf-team/public/share/debconf23/-/tree/main/slides/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us))**

**Report by Dimple Kariakose on [Ubuntu Discourse](https://discourse.ubuntu.com/t/opportunity-open-source-conference-report/)**

**Mastodon: [#OpportunityOpenSource](https://ubuntu.social/tags/OpportunityOpenSource)**

My first trip to India, especially the [Opportunity Open Source](https://events.canonical.com/e/mandi2023) in the Indian Institute of Technology Mandi in Northern India was a success.

The long trip, a 10-hour road trip from Delhi Airport and after the event ~6 hours driving to Chandigarh Airport, were really worth it, as we encountered ~100 excited students of the IIT Mandi attending the event. We were also lucky with the weather, sunny and no rain during the road trips and the event itself.

Especially our GSoC contributors were eager to meet me, as I arrived at 2am and several stayed up to receive me at the guest house, amd they helped me to get my suitcases (with all the swag) into my bedroom.

**Akarshan Kapoor** (GSoC contributor on scanning with PAPPL) did great on-location organization work, getting for us the 2 conference rooms, accommodation in the guest house, volunteers for A/V and also excellent food ... **Thanks a lot to him**.

Everything worked great, streaming, recording, remote speaking, only problem was the connection of the laptop running the streaming with the room's audio system. We could not test this beforehand as the rooms were permanently busy witih classes. We ended up running an hour late and to make remote speakers audible holding a mic against a Bluetooth speaker connected to the laptop. Especially we did not have the time for running the GSoC panel any more. Also due to the live stream in room 1 on Friday having broken down we needed to create a new one for the OpenPrinting track and so were not able to start the sessions in time. At least we could have Michael Sweet's talk in full.

The actual schedules, also with some last-minute changes of the day before, worked out in several phone calls with the Zephyr people during the road trip to Mandi, are [here](https://events.canonical.com/event/35/timetable/?layout=room#20230908.detailed). Especially we have added the talk "[Getting a Start in Open Source](https://events.canonical.com/event/35/contributions/314/)" by Shuah Khan from the Linux Foundation on Friday into the Zephyr track and we have replaced the Zephyr training on Saturday by the talk "[Why BeST uses OpenSource and Zephyr RTOS](https://events.canonical.com/event/35/contributions/313/)" by Oliver Völckers from BeST Berliner Sensortechnik GmbH in Germany. We also moved the screening of [Kate Stewart's pre-recorded talk](https://events.canonical.com/event/35/contributions/302/) from Friday to Saturday.

But the attendees had no problem with all that and were patient with us. They liked the event a lot.

**Special thanks to Canonical's Community Team, Philipp Kewisch, Mauro Gaspari, and Aaron Prisk**, for all the support, the swag, and especially for hosting my event site on Canonical's Indico and for letting me accept remote speakers, live-stream, and record using Canonical's StreamYard and Ubuntu OnAir.

And we have asked for those who want to participate in an Indian Ubuntu Local Community (LoCo) to sign up via a QR code and ~30 actually signed up! In total, including DebConf we got even 47 sign-ups. Thanks a lot already now to everyone having signed up.

**Here are all the sessions with links to slides and recordings:**

**General open source/free software**

- *[What is Open Source?](https://events.canonical.com/event/35/contributions/304/)* by Aveek Basu ([video](https://www.youtube.com/watch?v=2xY95cIFJxg&t=1525s), [slides](https://events.canonical.com/event/35/contributions/304/attachments/64/109/Open-Source_IIT%20Mandi%202023.pdf)) - Aveek started the event with an introduction for **newcomers to open source and free software**.
- *[Getting a Start in Open Source](https://events.canonical.com/event/35/contributions/314/)* by Shuah Khan ([video](https://www.youtube.com/watch?v=DOA8yL9yntM&t=2986s), [slides](https://events.canonical.com/event/35/contributions/314/attachments/62/112/Getting%20a%20start%20in%20open%20source.pdf)) - Shuah from the Linux Foundation shows **where one can contribute** and **mentorship opportunities** at the Linux Foundation. 
- *[ScaniVerse: A New Horizon in Unified Scanning for Linux Systems](https://events.canonical.com/event/35/contributions/290/)* by Akarshan Kapoor ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=2650s), [slides](https://events.canonical.com/event/35/contributions/290/attachments/54/89/Ubuntu_Summit_2023_Akarshan_Kapoor.pdf)) - **GSoC contributor Akarshan Kapoor** presents his GSoC project of adding scanning support to PAPPL to supply scanner drivers via sandboxable Scanner Applications and also his project of MetaScan a scan client which organizes the scanned images. The same talk he will also give on the Ubuntu Summit 2023. He does amazing work for free software.
- *[Apply and work at Canonical](https://events.canonical.com/event/35/contributions/296/)*, panel by Till Kamppeter and the Canonical Gang ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=18450s)) - Right in the time of the year of placement, when companies come to Indian universities to offer first jobs for those who complete their courses, I have hosted a panel with three Indian Canonical employees and we told about **how we got to Canonical**, how the **selection process** works, how it is to **work from home for Canonical**, everyone meeting twice a year for a week at **Engineering Sprints** and the fun of it, **attending conferences**, ...

**OpenPrinting**

- *[OpenPrinting - We make printing just work!](https://events.canonical.com/event/35/contributions/289/)* by Till Kamppeter ([video](https://www.youtube.com/watch?v=2xY95cIFJxg&t=3120s), [slides](https://events.canonical.com/event/35/contributions/289/attachments/58/94/talk-openprinting-intro.pdf)) - Here I have told **how I got into free software and how I started OpenPrinting and what we are doing at OpenPrinting**.
- *[CUPS 2.5 and 3.0 Development](https://events.canonical.com/event/35/contributions/285/)* by Michael Sweet ([video](https://www.youtube.com/watch?v=vzu0FIyDfOo), [slides](https://events.canonical.com/event/35/contributions/285/attachments/66/111/oos-cups-september-2023.pdf)) - **Michael Sweet, author of CUPS**, told about the next steps and future plans in CUPS development. **CUPS 2.5.x** adding features like OAuth2 support, wide-area DNS-SD look-up, multi-language support, ... **CUPS 3.x** completely restructuring (New Architecture), especially all-IPP without PPDs but also a more comprehensive library API, local server and sharing server, D-Bus printing, ... **a lot of coding is needed**, for CUPS itself, desktop integration, new PDF library, ... **Contributors urgently needed**.
- *Demo of GNOME Control Center "Printers" module*, by Mohit Verma ([video](https://www.youtube.com/live/vzu0FIyDfOo?si=n_HljJEM7LEat2qw&t=3719)) - Mohit showed his work on the "Printers" module of the GNOME Control Center, to prepare it for the New Architecture, supporting IPP print destinations and Printer Applications. 
- *Call for participation* by Till Kamppeter ([video](https://www.youtube.com/live/vzu0FIyDfOo?si=P2UC8rKK3F_rJhVc&t=3944)) - And as we have seen here we have a lot of work and need people who want to contribute, so I made a call for contributions as a conclusion for the OpenPrinting track.

**Zephyr**

- *[What is Zephyr?](https://events.canonical.com/event/35/contributions/305/)* by Benjamin Cabé and Jonas Remmert ([video](https://www.youtube.com/watch?v=DOA8yL9yntM&t=0s)) - Introduction into this **free-software real-time operating system for IoT systems too small for running Linux**.
- *[Zephyr Project: Supporting Sustainability](https://events.canonical.com/event/35/contributions/302/)* by Kate Stewart ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=448s), [slides](https://events.canonical.com/event/35/contributions/302/attachments/63/107/20230908%20-%20Zephyr%20Supporting%20Sustainability%20.pdf)) - This talk, pre-recorded by Kate Stewart, VP Dependable Embedded Systemsof the Linux Foundation, shows where Zephyr gets actually used.
- *[Zephyr in Action: Real-World Product Development](https://events.canonical.com/event/35/contributions/307/)*, **interactive workshop** by Jonas Remmert ([video](https://www.youtube.com/watch?v=DOA8yL9yntM&t=5060s), [slides](https://events.canonical.com/event/35/contributions/307/attachments/57/103/workshop_slides.pdf), [examples/exercises](https://github.com/jremmert-phytec-iot/zephyr-workshop)) - Jonas, speaking remotely, showed how to set up a Zephyr environment and run several examples in it. Attendees could try out everything on their own laptops and got **on-the-spot help by Akarshan Kapoor**. **A successful workshop with remote speaker.**
- *[Why BeST uses Open Source and Zephyr RTOS](https://events.canonical.com/event/35/contributions/313/)* by Oliver Völckers ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=27861s), [slides](https://events.canonical.com/event/35/contributions/313/attachments/101/149/BeST%202023-09-09%20Opportunity%20Open%20Source%20IIT%20Mandi%20India.pdf)) - Success story of using Zephyr for monitoring wastewater removal from trains.

**Immutable distributions and sandboxed packaging**

- *[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://events.canonical.com/event/35/contributions/292/)* by Till Kamppeter ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=15854s), [slides](https://events.canonical.com/event/35/contributions/292/attachments/61/104/talk-snap-2023.pdf)) - Grown from the smartphone operating system Ubuntu Touch we got the universal sandboxed packaging format **Snap**, initially for **Ubuntu Core**, an immutable Linux operating system for IoT. Snap got established as packaging format for standard Desktop and Server Linux systems and Ubuntu Core got extended to **Ubuntu Core Desktop**, an all-Snap immutable desktop operating system. This talk explained how all this actually works.
- *[A sneak peak into the realm of immutable Linux distributions](https://events.canonical.com/event/35/contributions/283/)* by Rudra Saraswat ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=31197s), [slides](https://events.canonical.com/event/35/contributions/292/attachments/61/104/talk-snap-2023.pdf)) - Rudra, 14-years-old project lead of Ubuntu Unity, Unity 7, and **[blendOS](https://blendos.co/)**, explains the principles of an immutable operating system and atomic updates how they work in blendOS.
- *[Your app everywhere, just in a Snap!](https://events.canonical.com/event/35/contributions/291/)*, **interactive workshop** by Till Kamppeter ([slides](https://events.canonical.com/event/35/contributions/291/attachments/60/101/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf), [virtual machine](https://drive.google.com/file/d/1kkxZ8GE3_UtG7orl5v2d4x_T4FhMUcbb/view?usp=sharing)) -12 brave souls, not only my 3 colleagues from Canonical, stepped up to learn how to snap (package in Snap format) desktop applications in my workshop. I could not run the complete workshop, as we had only 1 hour, but give a good insight into the subject matter. One of the participants, Biswadeep Purkayastha, also one of our GSoC contributor candidates for 2023, **started volunteering to snap for OpenPrinting**. See more below. And sorry, this workshop was too interactive for recording ...

**Documentation**

- *[The Fundamentals of Effective Technical Writing](https://events.canonical.com/event/35/contributions/293/)* by Hrittik Roy ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=3600s), [slides](https://events.canonical.com/event/35/contributions/293/attachments/55/152/Technical%20Writing.pdf)) - An introduction into technical writing, document types, organization of the document, examples, ... The slides are actually for a workshop, so while or after watching the video you can actually do the exercises.
- *[Can Documentation be fun?](https://events.canonical.com/event/35/contributions/294/)* by Dimple Kariakose ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=12674s), [slides](https://events.canonical.com/event/35/contributions/294/attachments/99/145/Can%20documentation%20be%20fun%2001_expanded.pdf)) - Another approach to introduce the audience into the aspects of documentation, and as Dimple is in Daniele Procida's documentation team at Canonical, she follows Daniele's [Diátaxis](https://diataxis.fr/) model.

**Recordings of the conference days**

Friday, Sep 8:

- [Plenary](https://www.youtube.com/watch?v=2xY95cIFJxg)
- [OpenPrinting Track](https://www.youtube.com/watch?v=vzu0FIyDfOo)
- [Zephyr Track](https://www.youtube.com/watch?v=DOA8yL9yntM)

Saturday, Sep 9:

- [Plenary](https://www.youtube.com/watch?v=Iw4JA3m92Q8)

Nice comment by @manojkapoor9855 on the YouTube video of Saturday:
> A very informative talk show entitle as 'Opportunity Open Source' was organized By Akarshan Kapoor and his team mates of Kamand Prompt under the Guidance of Technical Secretaries Reetam Sir and Anurag Sir at IIT Mandi. 
> 
> Heartfelt Thanks to Mr. Till Kamppeter and Mr. Aveek Basu  whom have arrived from Austria for such an informative session for 2 days Summit. Today on 9th September 2023 it was almost 9 Hours 15 minutes online tireless streaming on You Tube Channel. Thanks to all team members of Data Science & Engineering and Computer Science Students for taking such good initiatives for making Open Source Canonical, Ubuntu and Linux more visible and vibrant to all who seems to be interested. 

And thanks to Ban Jo (@Enry211) for adding a comment with links to the beginnings of all sessions to each video.


## DebConf 2023 in Kochi, India
From Mandi in northern India I directly went to Kochi in southern India, to the [DebConf](https://debconf23.debconf.org/). Departing on Sunday morning (Sep 10) I arrived after 6 hours on the road (to Chandigarh Airport) and 4 hours of flight on Monday, Sep 11, 4am in the morning.

And on Tuesday, Sep 12, right in the very first time slot my talk about Mandi was scheduled! So after taking some sleep up to lunch I had only the Monday afternoon to prepare the talk, and I also needed to do a semi-annual report for Canonical that afternoon ... So I was not able to attend any of the talks on Monday ...

My 2 talks have actually taken place as planned and were a success, at least what the circumstances allowed, as unfortunately, the 3 conference rooms were far from each other, making it difficult to switch between them to get to the desired sessions. Especially the plenary room, in which my 2 talks have taken place, was outside the hotel and required a 5-min walk to get there, ending up with a near empty room most of the time.

Here are the 2 talks and the slides and recordings of them:

**[Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!](https://debconf23.debconf.org/talks/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us/)**

**[video](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/debconf23-216-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us.av1.webm), [slides](https://salsa.debian.org/debconf-team/public/share/debconf23/-/blob/main/slides/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us/talk-opportunity-open-source.pdf), [all files/photos](https://salsa.debian.org/debconf-team/public/share/debconf23/-/tree/main/slides/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us)**

This talk is about how we have organized the conference, the challenges, and naturally also the outcome and experiences with running it, having come right from there to the DebConf. Lots of photos!

**[The New Architecture for Printing and Scanning on Debian](https://debconf23.debconf.org/talks/42-the-new-architecture-for-printing-and-scanning-on-debian/)**

**[video](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/debconf23-386-the-new-architecture-for-printing-and-scanning-on-debian.av1.webm), [slides](https://salsa.debian.org/debconf-team/public/share/debconf23/-/blob/main/slides/42-the-new-architecture-for-printing-and-scanning-on-debian/talk-printing-new-architecture-debian.pdf), [all files](https://salsa.debian.org/debconf-team/public/share/debconf23/-/tree/main/slides/42-the-new-architecture-for-printing-and-scanning-on-debian)**

With the DebConf taking place right in the new cycle after the Bookworm release I tell the Debian developer community about the New Architecture of printing and scanning to help them switch the Debian distribution to the new IPP-only PPD-less realm.

The event's [full schedules](https://debconf23.debconf.org/schedule/) have all recordings embedded in the talk descriptions now. Here are [all videos](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/) and [all slides, photos, and other materials](https://salsa.debian.org/debconf-team/public/share/debconf23/-/tree/main).

On Wednesday, Sep 13, right in the middle of the conference, there was a tourist day. Attendees could select 1 of 5 day trips in and around Kochi. One of the trips was a day at the beach with an option for kayaking. Unfortunately, there were less kayaks than they got reserved and one of the 2 persons who stayed without, Abraham Raji, entered the kayaking waters and got drowned by the streams.

On the [Debian web site](https://debconf23.debconf.org/news/2023-09-14-mourning-abraham/):

> Abraham was a popular and respected Debian Developer as well a prominent free software champion in his home state of Kerala, India. He was a talented graphic designer and led design and branding work for DebConf23 and several other local events in recent years. Abraham gave his time selflessly when mentoring new contributors to the Debian project, and he was instrumental in creating and maintaining the Debian India website.

**R. I. P. Abraham**

Due to this, all sessions and the conference dinner on Thursday, Sep 14, got suspended, some got withdrawn by the speakers, others moved out to the following days using extra rooms. On Friday, Sep 15, in the morning was the funeral and so there the sessions got also suspended and buses provided for those who wanted to visit Abraham's familiy ~2 driving hours away from Kochi.

As Rudra Saraswat attended the Opportunity Open Source in Mandi only remotely, because he was afraid of traveling to there due to heavy rain and landslides during the weeks before, I have suggested him to attend the DebConf to meet him there. I also helped him to get accepted by the DebConf's organizers with his last-minute registration. So I met him there only on Tuesday and Wednesday, as on Thursday he had to leave early in the morning already to not miss his visa appointment for the Ubuntu Summit 2023 in Riga.

I wanted to do with him a spontaneous panel session about immutable operating systens, especially [blendOS](https://blendos.co/) and [Ubuntu Core Desktop](https://discourse.ubuntu.com/t/ubuntu-core-desktop-deep-dive/), and live-stream it on [Ubuntu OnAir](https://www.youtube.com/@UbuntuOnAir), Wednesday night, as there was no other time slot left. So I told people at dinner that I wanted to do the session, so that they attend it, to get some live audience, and I prepared the conference room, especially set up a laptop with my camera and my microphones for the Ubuntu OnAir streaming, same configuration as in Mandi, as the video team of DebConf was not present for such a spontaneous session. Once completely done with the setup and ready for starting the stream, a person from the DebConf organizers entered the room, delivering the news about Abraham and we did not start our session ...

[Photos of the DebConf](https://photos.google.com/share/AF1QipM8sORv2E6gDhCf7dctgoZMY1qTB9p8M0RKIeFTSiO9ItCvmzgKBf2ELw_W31bdFw?key=MTdaTlAyVFVlODdmSUEyMUVVUEdfS2tITkMyRklR)


## Ubuntu Summit 2023 in Riga
The [schedules](https://events.canonical.com/event/31/ngtimetable/) for the [Ubuntu Summit](https://events.canonical.com/event/31/) have been published, and the two and a half days are packed with amazing sessions!

And for displaying them more nicely, Philipp Kewisch, Canonical's Community Team manager has hacked Indico again, adding a horizontal view for the schedules, similar how you see the Electronic Program Guide (EPG) on a modern TV, with a line for each channel (room) and the time at the horizontal axis. If you have problems navigating, you can resort to the "classic" vertical view via the menu button in the upper left corner.

My workshop "[Improving snap maintenance: automating tag updates](https://events.canonical.com/event/31/contributions/217/)" will take place on Saturday, November 4, at 12:00 - 13:00 EET.

As Heather Ellsworth has left Canonical, she will not be on the Ubuntu Summit. My co-speaker in the workshop will be Jesús Soto now. He is from the gaming squad in Canonical's Desktop Team and he already replaced Heather in my Snap workshop on the GUADEC 2023. The session description is already updated appropriately now.


## Google Summer of Code 2023
This month not much has happened in the GSoC. In Indian universities there have been the mid-semester exams and the placements have started. The placements are the way how students in their last year find their first employment after completing their courses. Indian companies who are hiring come to the universities, offer their jobs, and run tests and interviews. And in the IIT Mandi there was also the Opportunity Open Source.

On October 13-15 there will be the [GSoC Mentor Summit 2023](https://sites.google.com/view/gsoc2023mentorsummit/). After 3 online editions due to the pandemic it is finally in-person again, taking place on the Google Campus in Sunnyvale, CA, where it already happened in 2018.

It is somewhat smaller than the last editions before the pandemic, with only one instead of two guaranteed slots for representatives of each mentoring organization. I will attend, and also Deepak Patankar, mentor and former GSoC contributor for OpenPrinting. He was lucky getting his slot by the waitlist, through which slots not taken up are getting redistributed.

As in the years before, the Mentor Summit will be a so-called un-conference, consisting of BoFs, spontaneously planned during the event. There will also be lightning talk sessions where each organisation could tell about exceptional contributors or other interesting things which happend related to the organization's GSoC participation.

I plan to give a lightning talk about the Opportunity Open Source in Mandi.


## cups-filters Second Generation - Final 2.0.0 Release!
Now, in the last 3 months, we got only few bug reports, and a security vulnerability in CUPS, in code which got overtaken into libppd, and therefore the vulnerability is also there. To get the security fix into a release and 3 months being a long time after RC2 I am [finally releasing 2.0.0](/cups-filters-Second-Generation-Final-2.0.0-Release/) right now.

Ubuntu 23.10 will ship with this release.

**libppd Postscript Parsing Heap Overflow (CVE-2023-4504)**

From the bug report:

> The `ppd_scan_ps()` function in the libppd code base provides functionality that scans through a string looking for the next Postscript object. When iterating through a string which contains an open parenthesis and ends with a single backslash (0x5c) character, the code incorrectly iterates forward a character without properly checking the bounds of the string resulting in a 1 byte read beyond the allocated heap buffer.

This is fixed by adding the missing NULL check when, after a backslash was read, the character escaped by the backslash is read.

**Miscellaneous fixes**

A few other bugs got reported and fixed since RC2. These fixes are also included. See the lists in the [original announcement](/cups-filters-Second-Generation-Final-2.0.0-Release/).


## PAPPL 1.4.0
Michael Sweet has released [PAPPL v1.4.0](https://openprinting.github.io/pappl-1.4.0/) which is a new feature release.

Especially it adds the new create-printers operation, as API function and IPP request, to let the Printer Application automatically add queeus for any local printers which are supported by it. This function will also be called automatically the first time the Printer Application is run after its installation, so that just installing a Printer Application is usually all what needs to be done to set up a non-driverless printer.

This also makes it easier to write Printer-Application-supporting printer setup tools, as (at least for PAPPL-based Printer Applications) one can add a button to auto-setup all supported ones under the auto-discovered printers.

Here is a list of further feature additions:

- Added support for "job-retain-until" ([Issue #14](https://github.com/michaelrsweet/pappl/issues/14))
- Added new PAPPL-Create-Printers operation, and the PAPPL mainloop API now auto-adds local printers the first time a server is run ([Issue #245](https://github.com/michaelrsweet/pappl/issues/245))
- Added new `papplDeviceRemoveScheme` and `papplDeviceRemoveTypes` APIs to disable unwanted device types ([Issue #259](https://github.com/michaelrsweet/pappl/issues/259))
- Added support for suspending and resuming jobs at copy boundaries ([Issue #266](https://github.com/michaelrsweet/pappl/issues/266))
- Added support for server configuration files ([Issue #279](https://github.com/michaelrsweet/pappl/issues/279))
- Now preserve the paused state of printers ([Issue #286](https://github.com/michaelrsweet/pappl/issues/286))
- Updated the `options` sub-command to list vendor options and values ([Issue #255](https://github.com/michaelrsweet/pappl/issues/255))
- Updated web interface to show the age of jobs ([Issue #256](https://github.com/michaelrsweet/pappl/issues/256))
- Updated "devices" sub-command to have the PAPPL server find the devices instead of doing it directly ([Issue #262](https://github.com/michaelrsweet/pappl/pull/262))
- Updated default logging to be less chatty ([Issue #270](https://github.com/michaelrsweet/pappl/issues/270))
- Updated the Wi-Fi configuration page to support hidden networks.
- Updated the Wi-Fi configuration page reload time to 30 seconds.
- Updated TLS certificate generation to support more types of certificates and to use modern OpenSSL/GNU TLS APIs.


## Snapping for OpenPrinting, especially the CPDB CUPS backend
The [Snap workshop](https://events.canonical.com/event/35/contributions/291/) ([slides](https://events.canonical.com/event/35/contributions/291/attachments/60/101/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf)) which I have given on the Opportunity Open Source in Mandi was a special success, as under the ~12 participants, one of them, Biswadeep Purkayastha, stepped up to voluntarily snap for OpenPrinting. He also was one of our GSoC contributor candidates for 2023, but did not get selected due to lack of contributor slots assigned to us by Google.

He has already studied the rest of the workshop slides which we could not do at the conference due to the limited time, and also my "[Daemon Snapper's Workshop](https://events.canonical.com/event/2/contributions/42/)" ([slides](https://events.canonical.com/event/2/contributions/42/attachments/15/23/Daemon%20Snapper's%20Workshop.pdf)) from the Ubuntu Summit 2022. And he familiarized himself with the new [user daemon feature of snapd](https://discourse.ubuntu.com/t/ubuntu-core-desktop-the-desktop-session/), in preparation to snap CPDB backends.

Now he will work on creating a Snap for the [CPDB backend for CUPS](https://github.com/OpenPrinting/cpdb-backend-cups).


## Printer setup tool for KDE
On DebConf, when I have given [my talk about the New Architecture for printing](https://debconf23.debconf.org/talks/42-the-new-architecture-for-printing-and-scanning-on-debian/) ([video](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/debconf23-386-the-new-architecture-for-printing-and-scanning-on-debian.av1.webm), [slides](https://salsa.debian.org/debconf-team/public/share/debconf23/-/blob/main/slides/42-the-new-architecture-for-printing-and-scanning-on-debian/talk-printing-new-architecture-debian.pdf)), Michael from Nigeria came up to me and showed interest in updating the printer setup tool in the KDE Settings application for the new PPD-less all-iPP printing approach.

I am in contact with him via Telegram and he is already studying the code base.


## CUPS 3.x
Michael Sweet has presented his updated plans for CUPS 2.5.x and CUPS 3.x in his [talk on the Opportunity Open Source](https://events.canonical.com/event/35/contributions/285/) ([video](https://www.youtube.com/watch?v=vzu0FIyDfOo), [slides](https://events.canonical.com/event/35/contributions/285/attachments/66/111/oos-cups-september-2023.pdf)).

It is not only about the all-IPP printing approach with support for classic CUPS drivers and PPD files going away so that we are required to support Printer Applications, but also there are interesting new features coming which should also get integrated into the desktop. Note that the support for Printer Applications by the desktop is absolutely required for CUPS 3.x, support for the other features is highly recommended, to get access to the full functionality of CUPS.

**Here are the new features and their desktop needs:**

- *Already planned for CUPS 2.5.x:*
  - **Wide-area discovery** of network print destinations via DNS-based DNS-SD
  - Print destination access outside the scope of DNS-SD discovery, by **specifying the IPP destination(s) in a configuration profile** - Profile setup UI in setup tool
  - **OAuth2/OpenID authentication** - Authorization UI in print dialog, token registration in setup tool?
  - **Localization**: Use Weblate to gather translations, generate multi-language PPD files, provide `*.strings` files for shared printers - No desktop integration needed, client just tells their UI language to server, CPDB CUPS backend should already do that.
- *Planned for CUPS 3.x*
  - **Separation of local and sharing server** - In setup tool show only functionality for CUPS daemon type in use
  - **Printing via D-Bus** with local server - Access to CUPS also via D-Bus, should get implemented in libcups3, CPDB should use correct libups APIs

Michael Sweet also writes (on his last slide):

> CUPS 3 - Challenges
> - Much broader scope and integration than the original CUPS work
> - Desktop support - need to uplift GNOME/KDE/XFCE desktops to new D-Bus API for printing, authorization, consent UI
> - Need developers to work on the local and sharing servers, desktop UI/services
> - Can probably use/adapt PAPPL code for the core server bits
> - Much of the print dialog work can be repurposed
> - Probably have existing authorization/notiﬁcation UI we can use
> - Graphics libraries - current PDF tools/libraries have problematic licenses or other limitations

**For all this we need contributors, not only for desktop integration but also for coding on CUPS itself. We should also post GSoC project ideas for coding on CUPS 3.x.**

**Planned (estimated) release dates:**

- *CUPS 2.5.x* (release manager: Till Kamppeter)
  - CUPS 2.5b1 - November/December 2023
  - CUPS 2.5rc1 - January/February 2024
  - CUPS 2.5.0 - February/March 2024
  - Estimated Ubuntu release: 24.04 LTS or 24.10
- *CUPS 3.x* (release manager: Michael Sweet)
  - libcups 3.0b2 - November/December 2023
  - libcups 3.0rc1 + cups-local 3.0b1 - March/April 2024
  - cups-sharing 3.0b1 - September/October 2024
  - Estimated Ubuntu release: 25.04

**CUPS Snap**

Not treated in Michael's talk, but CUPS 3.x has also impact on the CUPS Snap, caused by the 2 different server types.

- The snapping of CUPS as we have it now will most probably be applied to the sharing server, which is very similar with CUPS 2.x
- The Snap of the local server will get simpler, especially
  - It is a user daemon
  - It does not provide IPP print destinations to the network, so it needs less interfaces (for example no `network-bind`, `avahi-observe` instead of `avahi-control`).
- The "cups-snap" repository will get discontinued and folded into "cups" (2.5.x) and "cups-sharing" (3.x).
- snapd needs to correctly prioritize to which CUPS Snap's slot the interfaces `cups` and `cups-control` of client Snaps get auto-connected.
