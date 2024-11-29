---
title: OpenPrinting News - October 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: 5 years of OpenPrinting News, Festa do Software Livre/UbuCon Portugal 2024, Ubuntu Summit 2024, 4 times in Podcast Ubuntu Portugal, GSoC 2024 completed, new releases
---
**This month we have the 5th anniversary of the OpenPrinting News!**

For 5 years now, starting October 2019, I have posted here every month, to tell what we are doing at OpenPrinting and what we are planning to do: Our design and development work, new releases, vulnerabilities and security issues, our GSoC participation, conferences we attend and talks we give, what people say and write about us, and also important things which happen in the free software world in general.

This is not only useful for those just interested in OpenPrinting, but it also helps us to attract and onboard volunteer contributors and it is an easy way to find out what we have done at which point in time.

This facility is unusual for free software projects, probably due to the fact that it requires some work. So far I got only positive feedback, so I will continue. It also probably has potential for improvement, so please tell us your suggestions through the communication channels mentioned below.

Last month, I have been on two conferences: The [Festa do Software Livre/UbuCon 2024](#festa-do-software-livreubucon-portugal-2024) in Aveiro, Portugal and on the third [Ubuntu Summit](#ubuntu-summit-2024-in-the-hague), in den Haag, in the Netherlands. The Festa was done principally in Portuguese language and my 3 sessions I have given in Portuguese, whereas the Summit is the big community event organized by Canonical, this time with less talks but with booths instead.

On the Festa do Software Livre we recorded 2 episodes of the Podcast Ubuntu Portugal and on the Ubuntu Summit another episode, so there are [4 episodes with my participation now](#4-times-in-podcast-ubuntu-portugal).

The [GSoC](#google-summer-of-code-2024) has ended and our 11 contributors have all done amazing work to put together our most successful GSoC year. We had never that many contributors and all have actually done code which we can merge upstream.

And there were also several [new releases](#new-releases) at OpenPrinting, starting with the 2.1.0 releases of libcupsfilters, libppd, and cups-browsed to include the fixes for the [recent vulnerabilities](/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/) and updates of libcups3 and PAPPL.

Videos of the talks on the [UbuCon Asia 2024](https://www.youtube.com/playlist?list=PLr8g8zdbZAgH7pLbMXfwdEI-c9Ck-gcHI) and on the [Open Source Summit Europe 2024](https://www.youtube.com/playlist?list=PLbzoR-pLrL6rC7SpO7MJCZm22Qp5ns3p-) are available now. See links to the recordings of my talks in the appropriate sections in the [August News](/OpenPrinting-News-August-2024/).

So let us see what happened at OpenPrinting in October ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## Festa do Software Livre/UbuCon Portugal 2024
After 20 years I was again on a a conference held in Portuguese laguage, this time on the [Festa do Software Livre](https://festa2024.softwarelivre.eu/) in Aveiro, Portugal, a 2-day conference with a main track and several sub-conferences co-located by different open-source organizations: Drupal, Flutter, WikiMedia Portugal, Inêrcia, and the [UbuCon Portugal](https://ubuconpt2024.ubuntu-pt.org). I followed the [invitation of Diogo Constantino](/OpenPrinting-News-September-2024/#festa-do-software-livreubucon-portugal-2024).

I was departing early in the morning, on the day before the conference started, and when telling to my colleagues in Canonical's Desktop Team, that I am heading to Aveiro, Ana Sereijo, UX designer, spoke up telling me that she came from there. So, as I was arriving in Aveiro at lunch time, I asked her for restaurant recommendations and this way got to an excellent, delicious place for classic Portuguese food. I ate grilled sardines and it reminded me to when I lived in Portugal for a year back in 2007.

Diogo and the others of the organizing team was still at their day jobs, so I have finished translating my slides to Portuguese in the afternoon (that is really a lot of work, feels like more than creating the talk in the first place) and met them for dinner.

The conference has taken place in the Departamento de Eletrónica, Telecomunicações e Informática (DETI) of the University of Aveiro, in up to 6 rooms, 2 lecture halls and 4 classrooms in parallel. There have been up to 2 plenary tracks and sub-conferences by Drupal, WikiMedia Portugal, Flutter, Inêrcia, and the UbuCon Portugal.

Here are the schedules: [Festa do Software Livre](https://festa2024.softwarelivre.eu/pt-pt/agenda/), [UbuCon Portugal](https://ubuconpt2024.ubuntu-pt.org/sessions/)

I have given 3 sessions, all in Portuguese, as announced [last month](/OpenPrinting-News-September-2024/#festa-do-software-livreubucon-portugal-2024).

On the first day, Friday, I gave my talk about the history and the current work of OpenPrinting, but in Portuguese:

**OpenPrinting - A boa impressão do software livre**

[Video](https://www.youtube.com/live/UaKzri016Zc?t=11250s)

I have given it in the main track. I ended up talking about how I got into free software, the history of OpenPrinting, our current work on CUPS 3.x including its integration in the desktop, [Windows Protected Print](/OpenPrinting-News-December-2023/#new-architecture-under-windows), ... for 70 minutes and afterwards did a 14 min [Q&A session](https://www.youtube.com/live/UaKzri016Zc?t=15505s). I also got some printing-related questions during the coffee breaks on both days.

And I did not talk about the [recent vulnerabilities](/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/) and nobody asked me about them during the Q&A (if you want to hear me talking in Portuguese about that, see my [Podcast Ubuntu Portugal participation](#4-times-in-podcast-ubuntu-portugal), episodes [E321](https://podcastubuntuportugal.org/e321/) and [E322](https://podcastubuntuportugal.org/e322/)).

On the second day, we had the UbuCon Portugal, where the morning part was all about Snap. First, I gave a Portuguese version of my talk in which I explain what Snap is, how it works and how it is motivated, and about the Snap-only operating systems Ubuntu Core and Ubuntu Core Desktop:

**[Linux para desktop, fácil como um smartphone! Graças ao Snap!](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao1/)**

[Video](https://www.youtube.com/live/_NMKUHkZ0i8?t=140s)

I also mentioned [how the work of OpenPrinting comes into play for Ubuntu Core Desktop](https://www.youtube.com/live/_NMKUHkZ0i8?t=2130s) and after the talk we had a [20-min discussion](https://www.youtube.com/live/_NMKUHkZ0i8?t=2462s) about the quality control of Snaps, initiated by an attendee who installed the nextcloud-client Snap and it did not work for him.

After a coffee break people could make their hands dirty with snapping by themselves, in an interactive workshop to learn how to package applications as Snaps:

**[O seu aplicativo para todo mundo! Graças ao Snap! - Oficina interativa](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao2/)**

[Video](https://www.youtube.com/live/_NMKUHkZ0i8?t=5715s)

This is the workshop [which I have given several times on other conferences](https://forum.snapcraft.io/t/40263), but this time I have given it in Portuguese.

After lunch there was a [workshop about developing games with Godot](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao4/) (Video parts [1](https://www.youtube.com/watch?v=_NMKUHkZ0i8&t=15974s), [2](https://www.youtube.com/watch?v=_NMKUHkZ0i8&t=24655s)) and after that there was the talk "[Uma história de vida usando Linux e Debian](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao3/)" ([video](https://www.youtube.com/watch?v=_NMKUHkZ0i8&t=26832s)), José M Calhariz talking about how he got into computers and free software, and in the end, the two graybeards who having told about their free software history throughout the conference have met to make the [happy end of the UbuCon](https://www.youtube.com/watch?v=_NMKUHkZ0i8&t=28070s).

On the two conference days in the evenings, dinners were organized in a nearby restaurant. The first one was to celebrate the Oracular Oriole (24.10) release of Ubuntu and the second was the "closing party" of the Festa do Software Livre. We were 10-15 people on each of them, the organizers of the event and some others.

Each night we have produced an episode of the [Podcast Ubuntu Portugal](https://podcastubuntuportugal.org/), [E320](https://podcastubuntuportugal.org/e320/) and [E321](https://podcastubuntuportugal.org/e321/), resp. There not only the usual hosts, Diogo Constantino and Tiago Carrondo were speaking, but we all got involved. And Diogo brought for everyone a little rubber duck, and one really hears them often in the two podcasts ... Therefore they got the duck (with a beer bottle cap as hat) as avatar.

At the second day's dinner we had also a post-conference meeting talking about what went well and what not so well at the conference and what one can improve in the next edition.

And before the dinner Diogo and me exchanged our experience in recording and live-streaming the Festa do Software Livre and the [Opportunity Open Source](/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur) resp. Diogo fell in love with the wireless clip-on mic kits (from Tonor) which I brought (and used several times on the conference) and bought such a kit right when he got home. And we concluded that we need to develop a better method for live-streaming/recording/remote speaking and document it somewhere.


## Ubuntu Summit 2024 in the Hague
**Update: Session video playlist started and all links to session recordings here point to the individual videos now.**

**Recordings of the conference days in the plenary room: [25th](https://www.youtube.com/watch?v=LPCg0NcQICQ), [26th](https://www.youtube.com/watch?v=ZNK4aSv-krI), [27th](https://www.youtube.com/watch?v=byPpJW5l6pg)**

**[Playlist](https://www.youtube.com/playlist?list=PLwFSk464RMxmaZj6wi3e-NLOGtRr4iFF6) of all the sessions in the plenary room (talks and lightning talks), sessions in the workshop room will get added later.**

**Pictures: [Photographers](https://photos.app.goo.gl/7RxFVjLPqvuq3y51A), [Attendees](https://photos.app.goo.gl/g7CrHwxCmtzTsMzBA)**

**[Aftermovie](https://www.youtube.com/watch?v=aR-yTFtjGtw)**

**When I refer to talks or workshops in this section, I always link to the slides, exercises, and recordings, if possible, so if you have missed a session, you can watch it, read the slides, and also do the workshop's exercises, whenever you like.**

The third [Ubuntu Summit](https://ubuntu.com/summit) in the Hague, Netherlands, was again a success!

During the years we made a move from having lots of talks and workshops to making the hallway track the central part of the event. 2022 there were still 7 rooms in parallel (1 plenary, 4 breakout, 2 workshop), 2023 5 rooms (1 plenary, 2 breakout, and 2 workshop), and now there was only the plenary room, 1 workshop room and ... an exhibition consisting of 26 booths!

It got much harder to get a talk or workshop proposal accepted, only talks of general interest, breaking news, and with the "Wow" effect made it into the conference, special interest topics got discussed at the booths now.

Here are the [schedules](https://events.canonical.com/event/51/timetable/?layout=room#all.detailed).

**Before it started**

As I am part of the organization team of the Summit, as I was in the previous 2 years, too, I had arrived early, already in the afternoon of the 22nd of October, to help on the preparations, together with **Mauro Gaspari**, principal organizer of the event, and also **Aaron Prisk**, **Jason Nucciarone**, and **Jesús Soto**.

These extra days gave me also the opportunity to meet people, also due to the fact that in the week before the Summit the Canonical-internal Roadmap/Product Sprint, to be attended by all the managers, has taken place. So I have especially also met **Ken VanDine** and some people of Canonical's desktop team.

And I also met the non-Canonical Summit attendees of the free software community as they were rolling in. **Soumyadeep Ghosh** from the Snapcrafters already joined us at dinner of the 23rd, and on the 24th in the morning I went to the hotel where most of the community people were accommodated, principally to prepare for the Snapcrafters booth and the Snap workshops with Soumyadeep, **Merlijn Sebrechts**, and **Lucy Llewellyn** from the Snapcrafters. There I met also many others, especially **Heather Ellsworth** from Thunderbird, **Akarshan Kapoor** the master of the Scanner Applications, **Mathieu Comandon** from Lutris, **Martin Wimpress ("Wimpy")** from NixOS, ...

**And on the 25th, the Summit finally took off ...**

Last preparations at the venue in the morning, and as soon as the Roadmap Sprint ended at noon, the booth staff from the community arrived and the preparation of the booths started. Many busy people in the main foyer of the venue, the place looking somewhat chaotic, and one started to meet more people.

It was originally planned to open the exhibition only after the opening plenary, but the booths got already busy right in the beginning, as the exhibition ground was between the main entrance and the plenary room.

**Snapcrafters Booth and Workshops**

I was participating in the [Snapcrafters booth](https://events.canonical.com/event/51/contributions/524/), together with Soumyadeep Ghosh, Merlijn Sebrechts, Lucy Llewellyn and so we were also setting up our booth. As I have [already run a Snapcrafters booth with Soumyadeep on the UbuCon Asia](/OpenPrinting-News-August-2024/#soumyadeep-ghosh) Soumyadeep had already a slide show for the booth screen where he only needed to update the workshop announcements. Our booth tables were full of Snapcrafters stickers and Origami Snapcraft birds.

With the same people I was also participating in the organization of the two Snap workshops:

"**[Crafting snaps quickstart guide 101](https://events.canonical.com/event/51/contributions/586/)**" ([Slides](https://events.canonical.com/event/51/contributions/586/attachments/284/518/Snap%20quickstart%20workshop.pdf), [Exercises](https://github.com/snapcrafters/snap-quickstart-workshop))

and

"**[How to build and test your snaps automatically using GitHub actions](https://events.canonical.com/event/51/contributions/587/)**" ([Slides](https://events.canonical.com/event/51/contributions/587/attachments/285/528/CI%20Workshop.pdf), [Exercises](https://github.com/snapcrafters/discord))

I did not do the presentations themselves, this was done my Soumyadeep Ghosh and Merlijn Sebrechts, but on both I have given a short introduction telling how the Snap workshops had their roots in my [Snap workshop series on the Ubuntu Summit 2022](/OpenPrinting-News-November-2022/#the-first-ubuntu-summit-was-a-success) and the first one being based on Heathers's original workshop ["Snapping like Hell(sworth)"](https://events.canonical.com/event/2/contributions/15/) which was afterwards given on many other conferences, [mainly by me](https://forum.snapcraft.io/t/40263) but also by [Lucy](https://www.dorscluc.org/dors-2023/) and by [Soumyadeep](/OpenPrinting-News-August-2024/#soumyadeep-ghosh). I (and several other Snap experts) have also been in the room to help on the exercises, as these workshops were, in contrary to several others, really interactive.

**Talks and Workshops**

During the event I was most of the in the exhibition area, but I also made it into some of the talks and workshops.

I attended following sessions, including all those sessions where our [GSoC](#google-summer-of-code-2024) contributors and mentors were the speakers:

"**[Inkscape for Everything](https://events.canonical.com/event/51/contributions/565/)**" by Christopher Rogers

The session was announced as a workshop and had taken place in the workshop room. In the beginning I installed Inkscape expecting that there are exercises, but actually it was only a demo of most of the functionality of Inkscape, which is a lot, allowing for really professional artwork, doing nearly everything which has to do with graphics: Non-destructive photo editing, slides for presentations, ... Christopher tells that if he had given exercises he could only treat a very small part of the whole session's content.

"**[Live build your submarine step-by-step](https://events.canonical.com/event/51/contributions/541/)**" by Juanmi Taboada

Here I was in the good hope to put my hands on some hardware, but, as the Inkscape "workshop" this was also only a demo. Juanmi, who brought his remote-operated and free-software-controlled submersible already to [last year's Summit](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga) explained the free-software-driven hardware-components, showed them and put them together, but there were no extra copies for the audience to try it by themselves.

"**[Fuzzing in the open: Integrate your project in OSS-Fuzz for continuous fuzzing](https://events.canonical.com/event/51/contributions/540/)**" by Dongge Liu, George-Andrei Iosif, Jiongchi Yu ([Slides](https://events.canonical.com/event/51/contributions/540/attachments/230/529/Presentation.pdf), [Exercises](https://github.com/iosifache/fuzzingintheopen))

Finally, an actually interactive workshop, but this one was also with my mentoring, as the speakers are no less than our [GSoC](#google-summer-of-code-2024) team for [deploying OSS Fuzz on the OpenPrinting repositories](https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024)), contributor Jiongchi Yu and mentors George-Andrei Iosif and Dongge Liu. Unfortunately Jiongchi could not come to the Summit in-person as he was on another conference in the US. So after a short introduction by me, George Andrei and Donggi were explaining the steps for the attendees to do on their laptops, with the Heartbleed on OpenSSL being the example. Jiongchi was connected via video meeting and in the end he told about the OSS Fuzz deployment on OpenPrinting.

"**[The Journey of KDE Plasma on Ubuntu Core](https://events.canonical.com/event/51/contributions/549/)**" by Kevin Ottens ([Slides](https://docs.google.com/presentation/d/1iYKSYeRfsUc6JvUl8j_PNpZC2tOfNxAVgedKRLiO0Us/edit?usp=sharing), [Video](https://www.youtube.com/watch?v=62_H4jzoefM))

This is all about the development of an Ubuntu Core Desktop distro with KDE instead of GNOME as desktop session. The architecture is shown and the challenges encountered and how they got solved.

Soumyadeep Ghosh, GSoC-2024 contributor of the Snap backend for KDEs software manager Discover, mentored by Scarlett Moore, asked several [interesting questions](https://www.youtube.com/watch?v=62_H4jzoefM&t=2580).

"**[Unstoppable Force Behind Linux on RISC-V](https://events.canonical.com/event/51/contributions/518/)**" by Gordan Markus and Yuning Liang ([Slides](https://docs.google.com/presentation/d/1Z3_dOIojdL3FHTfyEGkcFXrI0KNTyWMC/edit), [Video](https://www.youtube.com/watch?v=RFQ_TvCYBYM))

Gordan Markus, Director Silicon Alliances at Canonical, and Yuning Liang, founder of Deep Computing, tell about Deep Computing's efforts to create consumer-ready laptops with RISC-V architecture and Ubuntu as operating system.

"**[Re-inventing distroless with Chiselled Ubuntu containers](https://events.canonical.com/event/51/contributions/520/)**" by Cristovão Cordeiro ([Slides](https://docs.google.com/presentation/d/1viW8ZGtPgxS39NXjLKZ77K1zFf4sK-Xip77tTu0XklU/edit?usp=sharing), [Video](https://www.youtube.com/watch?v=yQukQb-n99E))

In this talk Cristovão Cordeiro, manager of a containerization team at Canonical, tells about freeing containers from unnecessary files, not only to save storage space but also to reduce the attack surface of the containerized applications. He uses the `chisel` tool which allows the installation of parts of Debian packages (so-called "slices"). Cristovão was also [GSoC](#google-summer-of-code-2024) mentor at OpenPrinting this year for the [project of Rudra Pratap Singh, to create OCI container images of CUPS and Printer Applications](https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6).

"**[Building secure and minimalistic Docker images for Data and ML with Rockcraft](https://events.canonical.com/event/51/contributions/542/)**" by Anas El Husseini, Zhijie Yang ([Slides](https://docs.google.com/presentation/d/1oX_WQ5uRMKIHRnmpOyo9dWVuLKO1RthWqz6qTFLLbR4/edit?usp=sharing), [Exercises](https://github.com/linostar/rocks-workshop-ubuntu-summit-2024))

Right after Cristovão's talk one could get hands-on with his subject matter in this workshop. And it was really interactive. On one of the first slides there are instructions on which packages to install and a link to a GitHub repo with all the example files for the exercises in a subdirectory for each task. I have actually done the exercises during the workshop and they all worked as designed.

"**[Flush with Innovation: Revolutionising Train System Toilets with Embedded Technologies](https://events.canonical.com/event/51/contributions/551/)**" by Akarshan Kapoor ([Slides](https://gamma.app/docs/Revolutionizing-Train-System-Toilets-fke0yjvj9xyas1y), [Video](https://www.youtube.com/watch?v=kWMt8PLVEE0))

Our [GSoC](#google-summer-of-code-2024) contributor Akarshan Kapoor was on the Ubuntu Summit again, but not with a talk about Scanner Applications. Doing his second exchange semester in Germany, he also did an internship where he worked on the free software stack used in the monitoring system of the toilets in the trains of the German railway. Christian Ehrhardt, MC of the day, [announces this talk so nicely](https://www.youtube.com/live/byPpJW5l6pg?t=21576s):

> This is AK, who will revolutionize my personal live. Because train travel in Germany really is not, what you want it to be, and if it is really not what you want it to be, you at least want to have the toilets working ...

And Akarshan, when he introduced himself in the beginning, he told that he was already speaking on the [Summit last year](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga), about his [Scanner Application work for OpenPrinting](https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc), and [he shouted me out](https://www.youtube.com/watch?v=kWMt8PLVEE0&t=82s)!

**Lightning Talks**

I have also attended the lightning talks, especially
- "**[Making the Thunderbird snap a first class citizen](https://events.canonical.com/event/51/contributions/574/)**" by Heather Ellsworth ([Slides](https://docs.google.com/presentation/d/1rLv_Yh8fTMmvThm9UFr5QmzghI5KAplTQoSo-XCoc1k/edit?usp=sharing), [Video](https://www.youtube.com/watch?v=G6OBiIKn1J4&t=1s)): Heather, who formerly worked in Canonical's Desktop Team and had moved on to Thunderbird, is snapping Thunderbird in close collaboration with her former colleagues from Canonical.
- "**[How I built Check-in Kiosk for UbuCon Korea](https://events.canonical.com/event/51/contributions/582/)**" by Youngbin Han ([Slides](https://docs.google.com/presentation/d/1YZ7mb07jB-HP26xy0gejg_27JLZ0t9-yEQbTmUe6rFg/edit#slide=id.p), [Video](https://www.youtube.com/watch?v=2cQ7IUFmHUg&t=1s)): On-the-spot printing of conference badges with a self-service kiosk setup with a label printer, created by Youngbin.
- "**[Back to the Future of Open Source 3D Printing Hardware](https://events.canonical.com/event/51/contributions/605/)**" by Yatin Khurana ([Slides](https://docs.google.com/presentation/d/1KObA88U0JqXXO-tzpcvtQ0N2Ap-xbTfGynjRq-peWq0/edit#slide=id.p), [Video](https://www.youtube.com/watch?v=2cQ7IUFmHUg&t=1551s)): Indian manufacturer makes true open-source hardware components for 3D printers.
- "**[Open Source DJing: bringing hardware compatibility to the Linux platform](https://events.canonical.com/event/51/contributions/638/)**" by Jesús Soto ([Slides](https://docs.google.com/presentation/d/11-yxkPiCB0RxG2quLGtrBv7P1Q0dYUvr4f0_ZIqvQnc/edit#slide=id.g29228888b6b_0_0), [Video](https://www.youtube.com/watch?v=2cQ7IUFmHUg&t=1860s)): Before Jesús performs it live on the closing party he tells in the last lightning talk of the conference, right before the party, how DJing with free software is done.

and the lightning demo:
- "**[Modifying a Framework Laptop from x86 to RISC-V live on stage](https://events.canonical.com/event/51/contributions/557/)**" by Nirav Patel ([Video](https://www.youtube.com/watch?v=l6khGznGeyY)): Framework's CEO is showing how easy it is to make changes on the hardware of a Framework laptop, thanks to their modularity. And with Deep Computing having presented their RISC V mainboard for Framework, it is exactly this which makes it into the sample laptop within the 5 minutes of a lightning talk slot. Unfortunately no boot test is demonstrated ... But the demo was already impressive this way.

Should we try to get a lightning workshop next year?

**Exhibition**

On the exhibition I have not only received visitors at the [Snapcrafters booth](https://events.canonical.com/event/51/contributions/524/) but also visited several booths:

**[Deep Computing](https://events.canonical.com/event/51/contributions/579/)**: I met the founder of Deep Computing, **Yuning Liang**, and he showed me the RISC-V-based Roma laptops and also the RISC-V mainboard for Framework laptops, and at the same time there was also the 14-year old Gabriel Ozkan who was very interested in participating in Open Source. I told that I am leading OpenPrinting and that I am fellow of the Linux Foundation, and to Gabriel I also told about Rudra Saraswat who is also 14 years old and he is leading Ubuntu Unity and has created blendOS.

Yuning gave a RISC-V SBC to both Gabriel and me, and I contacted him some days ago how to get it working and he put me in contact with the right people. The board can be useful for me to test the printing stack on RISC-V.

Yuning has also given the talk about RISC-V, together with Gordan Markus from Canonical (see above).

**[Framework](https://events.canonical.com/event/51/contributions/562/)**: Right nect to the Deep Computing booth was the Framework booth where you could see and try out their laptops and their laptop's modularity. Naturally, they also had Deep Computings RISC-V board on their booth. Nirav Patel, their CEO, has done the lightning demo of changing the motherboard in five minutes (see above).

**[UBPorts](https://events.canonical.com/event/51/contributions/561/)**: This was the place where you could find **Diogo Constantino** (of the LoCo Portugal) most easily, as participant of this booth and Ubuntu Touch enthusiast who even uses this system as daily driver. Also **Alfred Neumayer**, [master of Snap on Ubuntu Touch](/OpenPrinting-News-February-2024/#cups-snap-on-ubuntu-touch) was participating (and giving a [talk](https://events.canonical.com/event/51/contributions/513/), [slides](https://events.canonical.com/event/51/contributions/513/attachments/301/441/SnapsOnUbuntuTouchLibreoffice.pdf)).

**[Back to the Future of Open Source 3D Printing Hardware](https://events.canonical.com/event/51/contributions/517/)**: Here I met Yatin Khurana, from [Boltz R&D](https://boltzrnd.com/) in India, developing truly Open-Source hardware for 3D printers, in contrary to most manufacturers going more and more closed-source. I am looking into getting him onto the next Opportunity Open Source conference. Yatin has also given a lightning talk (see above).

**[Thunderbird](https://events.canonical.com/event/51/contributions/528/)**: For me visiting the Thunderbird booth was less because I use Thunderbird for more than 20 years already (I started as it was still the mail part of Netscape Communicator), but more to meet old friends, **Heather Ellsworth** and **Monica Ayhens-Madon**. As last year, Monica has bought a penguin for Jill again and let Mathieu Comandon again bring it to its Destination. The Thunderbird booth was right next to UBPorts and Heather made the mobile version of Thunderbird working on Ubuntu Touch.

**Hallway Track**

When **Diogo Constantino** showed up at our Snapcrafters booth I started chatting with him, in Portuguese, and not taking it actually seriously, telling him that we should record an episode for [Podcast Ubuntu Portugal](https://podcastubuntuportugal.org/) on the Summit, and he found that a good idea, and then he asked the organizers for a room and we started gathering people who speak Portuguese end ended up to produce [episode E322](https://podcastubuntuportugal.org/e322/) with Diogo, **Cristovão Cordeiro** (Canonical Containerization/Rockcraft), **Carlos Nihelton** (Canonical Desktop Team/WSL), **Diogo Sousa** (Canonical Security Engineering), and me. This was the [4th time of me being in the Podcast Ubuntu Portugal](#4-times-in-podcast-ubuntu-portugal).

On the UbuCon Asia in Jaipur, where I met **Soumyadeep Ghosh** for the first time and [I was talking with him about a lot of my free software activity and experience](/OpenPrinting-News-August-2024/#soumyadeep-ghosh), he came to the idea to create a monthly Ubuntu podcast, probably because I told him also about Heather's famous Indabas.

On the Summit he was then looking for help on how to do the logistics of a podcast, and it was great that Diogo as experienced podcaster was there and he explained everything to Soumyadeep and we created a room on Matrix for further planning.

And I also met our famous vulture, **Liam Proven**, the Reg FOSS desk from [The Register](https://www.theregister.com/Author/Liam-Proven), again, exactly at the dinner of the 26th, which I had with him and Soumyadeep, in an Indian restaurant. As Soumyadeep, he likes the really spicy Indian food and so they asked the restaurant staff to do it really as in India and not adapted to Europe. Liam told a lot about his long life, his accidents and all the steel in his body holding together his broken bones, and so he got the "Iron Man" for me ...

**Hacker Spaces**

On the evening of the 26th, right after the talks, meeting rooms were set up for the [Hacker Spaces](https://events.canonical.com/event/51/page/471-hackerspace-evening), informal meetings of some of the participating free software organizations and groups, for hacking, debugging, planning, ...

The groups who got a room were Ubuntu Flavours, Governance & Autoinstall, Open Source Security, Linux Gaming, Juju & Friends, and the Open Documentation Academy.

As OpenPrinting is [participating as organization](/OpenPrinting-News-May-2024/#open-documentation-academy) in the [Open Documentation Academy (ODA)](https://discourse.ubuntu.com/t/39615), I have participated in their room. Our activity was running an episode of the weekly [Open Documentation Hour](https://discourse.ubuntu.com/t/42771) live session (Episode 35, [Video](https://www.youtube.com/watch?v=J5GEAzAZOS0)). **Graham Morrison**, at Canonical responsible for the Snap documentation and also project lead of the ODA (at the very right in the frame, but not visible in the first few minutes), is hosting the session.

At [2:00 min](https://www.youtube.com/watch?v=J5GEAzAZOS0&t=120s) we discussed the use of GIT to manage the documentation and I (second to the right in the frame, in the beginning at the very right) am telling that I use it for all content on OpenPrinting without problems. Right after ([3:18 min](https://www.youtube.com/watch?v=J5GEAzAZOS0&t=198s)) Graham is introducing me as responsible for OpenPrinting and then I tell what OpenPrinting is, about CUPS, Michael Sweet, and our need of documentation and that therefore I joined the ODA as the first non-Canonical organization. I also tell that Michael Sweet is an excellent example of a programmer who is also doing all the documentation for his work. Graham tells that Thunderbird is also joining, as the second non-Canonical organization. My part ends at 10:23 min.

**Coverage**

Here are some blogs, articles, videos, and podcasts about the event (taken from the internal list of the organization team):

- **[The Source - Canonical on LinkedIn](https://www.linkedin.com/newsletters/the-source-7108409718422839296/)**
  - [Thank YOU for open source](https://www.linkedin.com/pulse/thank-you-open-source-canonical-eyroe/): Canonical's official report of the Summit on LinkedIn, featuring [Ngazetungue Muheue’s talk on open source in Africa](https://youtu.be/mPP7amqTGFA), the work of the Hack Club, creating free software with high school teenagers, including the [talk about the Boreal Express](https://youtu.be/AdgU-_1vDco), by Zach Latta, founder of the organization, [Akarshan's talk about the free software use in train toilet monitoring](https://www.youtube.com/watch?v=kWMt8PLVEE0) (see above), Juanmi Taboada's submersible workshop (see above), and as the higlight at the end, the [Framework lightning demo](https://www.youtube.com/watch?v=l6khGznGeyY) (see above).

- **[Soumyadeep Ghosh on GitHub](https://soumyadghosh.github.io/website/)**
  - [Ubuntu Summit 2024: A joyful experience filled with sorrow](https://soumyadghosh.github.io/website/blog/ubuntu-summit-2024/): Soumyadeep's second conference in his life (The first was the [UbuCon Asia 2024](/OpenPrinting-News-August-2024/#soumyadeep-ghosh) and his first international trip, was the Ubuntu Summit. He tells about his arrival, the people he met, the Snapcrafters booth, the Snap workshops, the sessions he attended, with many photos of the people ... But he also tells that his grandpa passed away while he was on the Summit. R. I. P.

- **[The Register](https://www.theregister.com/)**
  - [An awful lot of FOSS should thank the Academy](https://www.theregister.com/2024/11/01/aswf_foss_oscars/): About the presentation ["Open Source Software for Motion Pictures"](https://events.canonical.com/event/51/contributions/590/) by the [Academy Software Foundation](https://www.aswf.io/).
  - [Why we're still waiting for Canonical's immutable Ubuntu Core Desktop](https://www.theregister.com/2024/11/06/ubuntu_core_desktop_waiting/): State of the art of Ubuntu Core Desktop, especially the challenge of having different desktop sessions, as KDE in our case.
  - [A sit-down with Ubuntu founder Mark 'SABDFL' Shuttleworth](https://www.theregister.com/2024/11/11/mark_shuttleworth_ubuntu_interview/): The vulture has interviewed Mark about major happenings during the 20 years of Canonical.
  - [Framework laptops get modular makeover with RISC-V main board](https://www.theregister.com/2024/11/18/riscv_framework_main_board/): About the lightning demo of getting Deep Computingś RISC-V board into a Framework laptop (see above) and about the RISC-V board itself.
- **[Gaming on Linux](https://www.gamingonlinux.com/)**
  - [Ubuntu Summit 2024 highlights - Linux gaming talks on UMU and Heroic Launcher](https://www.gamingonlinux.com/2024/10/ubuntu-summit-2024-highlights-linux-gaming-talks-on-umu-and-heroic-launcher/): Short article about the 2 gaming-related talks, [Paweł Lidwin about Heroic](https://events.canonical.com/event/51/contributions/580/) and [Thomas Crider ("GloriousEggroll", "Eggy") about UMU](https://events.canonical.com/event/51/contributions/510/), with links to the talks in the recording videos. The gaming booth and hacker room got not mentioned though.
- **[Late Night Linux Podcast](https://latenightlinux.com/)**
  - [Episode 307](https://latenightlinux.com/late-night-linux-episode-307/): Report from the summit at 18:50 min to 22:00 min.
- **[Fedora Podcast](https://www.youtube.com/@fedora)**
  - [Gaming with ProtonGE](https://www.youtube.com/watch?v=pB7h8T1rBNM&t=2449s): Eggy gets interviewed about his work on Linux gaming and he tells about the Summit in the "Future of Gaming" section near the end.
- **[Canonical Open Documentation Academy](https://discourse.ubuntu.com/t/39615)**
  - [Open Documentation Hours episode 35](https://www.youtube.com/watch?v=J5GEAzAZOS0): The episode which we have produced in the Open Documentation Academy hacker room, see above.
- **[Podcast Ubuntu Portugal](https://podcastubuntuportugal.org/)** (in Portuguese)
  - [E322: Na Ubuntu Summit 2024 (Haia)](https://podcastubuntuportugal.org/e322/): The episode we have produced live on the Summit, by Diogo Constantino, me and 3 other Portuguese-speaking guests.
  - [E323: Balanço de Cimeiras](https://podcastubuntuportugal.org/e323/): About both the Festa do Software Livre and the Ubuntu Summit. At 8:30 min - 13:20 min Diogo Constantino tells about the wireless clip-on mics which I brought and which we used for my Snap workshop and some other sessions.


## 4 times in Podcast Ubuntu Portugal
As [reported in July](/OpenPrinting-News-July-2024/), **Diogo Constantino**, leader of the Ubuntu local community (LoCo) Portugal, had [interviewed me](https://podcastubuntuportugal.org/e310/) in the [Podcast Ubuntu Portugal](https://podcastubuntuportugal.org/), a podcast in Portuguese language about Linux and especially Ubuntu.

In the end of the interview Diogo invited me to the [Festa do Software Livre/UbuCon Portugal](#festa-do-software-livreubucon-portugal-2024) in Aveiro in Portugal, where on both conference days I had dinner with Diogo and the organizers of the event and some others, and after each of the two dinners we recorded an episode of the podcast.

Two weeks after that, I met Diogo again, on the [Ubuntu Summit](#ubuntu-summit-2024-in-the-hague) in the Hague in the Netherlands. Not really taking it seriously I told him that we could record an episode of the podcast on the Summit, and he told that is a good idea and so we looked for Portuguese-speaking people on the Summit, and put together a group of 5: Diogo, me, Diogo Sousa (Canonical Security Engineering), Cristovão Cordeiro (Canonical Containerization/rockcraft), Carlos Nihelton (Canonical Desktop/WSL) We got a meeting room from the organizers and produced another great episode.

So this way I made it into the Podcast Ubuntu Portugal 4 times:

- [E310](https://podcastubuntuportugal.org/e310/): I got interviewed by Diogo
- [E320](https://podcastubuntuportugal.org/e320/): Festa do Software Livre, day 1
- [E321](https://podcastubuntuportugal.org/e321/): Festa do Software Livre, day 2
- [E322](https://podcastubuntuportugal.org/e322/): Ubuntu Summit

If you feel more comfortable to listen to people speaking Portuguese and not English, together with the recordings of my talks on the Festa do Software Livre, there are a lot of opportunities to listen to me now.

Also if you feel more comfortable to get the [recent vulnerabilities](/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/) explained in Portuguese, I did so in [E321](https://podcastubuntuportugal.org/e321/) and [E322](https://podcastubuntuportugal.org/e322/).


## Google Summer of Code 2024
Now the GSoC 2024 has finally completed, also those contributors who got the longest possible coding period of 22 weeks had to submit their final reports now.

This was the most successful Google Summer of Code for OpenPrinting. 11 contributors is the highest count we reached so far and they all did amazing work! We plan to get each one's project into the respective upstream code. With all our great mentors we have worked in an excellent OpenPrinting team of more than 20 persons.!

10 of the 11 contributors have passed the final evaluation, but the one who has failed, Shivam Sharma (OAuth2 support in print GUI), and his mentor, Deepak Patankar want to finish the project after GSoC. Also all the others want to finish their missing pieces and get their code upstream.

And we got excellent feedback from all the 11 contributors. Each of them has praised our work as mentors and at OpenPrinting a lot in their final evaluation, and many also already in their midterm evaluations.

Now we have a lot of pull/merge requests, both on OpenPrinting itself and also on external projects. We are now working on getting them all merged.

Thanks a lot to all the contributors and mentors for their work, confidence, and patience with us!

Here are the results, work products, and links to their code:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh<BR>
[Work Product](https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6)<BR>

PASSED

To complete this task, the repositories need to get transferred to OpenPrinting or merged into the appropriate repositories of OpenPrinting and also an OpenPrinting account on the DockerHub needs to get created and the container images uploaded to there.

Code:
- [CUPS Rock](https://github.com/rudra-iitm/cups-rock)
- [PostScript Printer Application Rock](https://github.com/rudra-iitm/ps-printer-app-rock)
- [Ghostscript Printer Application Rock](https://github.com/rudra-iitm/ghostscript-printer-app-rock)
- [HPLIP Printer Application Rock](https://github.com/rudra-iitm/hplip-printer-app-rock)
- [Gutenprint Printer Application Rock](https://github.com/rudra-iitm/gutenprint-printer-app-rock)
- [GitHub action update automation for Rocks](https://github.com/ubuntu/desktop-snaps/pull/635)
- [GitHub action versioning automation for Rocks](https://github.com/ubuntu/desktop-snaps/pull/636)
- [GitHub action `rock-version-schema` addition](https://github.com/ubuntu/desktop-snaps/pull/666)

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha<BR>
[Work Product](https://medium.com/@bpdps95/providing-cpdb-support-for-the-libreoffice-print-dialog-my-gsoc-journey-e46f72d5a61c)

PASSED

To complete this task, Biswadeep’s changes linked above need to be merged into LibreOffice upstream. All pull requests on CPDB are already merged.

Code:
- [Pull request on Gerrit](https://gerrit.libreoffice.org/c/core/+/169617)

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu<BR>
[Work Product](https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024))

PASSED

OSS-Fuzz testing is now active on the [CUPS](https://github.com/OpenPrinting/cups) (2.x) and [libcups](https://github.com/OpenPrinting/libcups) (3.x) repositories. Development will go on:
- Based on existing fuzzing projects, integrating more harnesses is more convenient, especially with the help of LLMs.
- More C/C++-based projects are needed to be integrated, such as cups-browsed and cups-snap
- Integrating OSS-Fuzz into OpenPrinting projects written in other languages such as Python (pyppd) and Go (ipp-usb), is feasible.
- More effective fuzzing seeds and dictionaries for specific OpenPrinting functionalities are required.
- End-to-end testing methods can help identify more exploitable bugs in OpenPrinting projects. Manual security audits can also help.

Code:
- [Source Code for Fuzz Harnesses](https://github.com/OpenPrinting/fuzzing)
- [OSS-Fuzz Projects](https://github.com/google/oss-fuzz/)
  - [cups](https://github.com/google/oss-fuzz/tree/master/projects/cups)
  - [libcups](https://github.com/google/oss-fuzz/tree/master/projects/libcups)

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor<BR>
[Work Product](https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc)

PASSED

To complete this task, the following steps have to be done:
- Create a test suite/test driver ([PAPPL Issue #134](https://github.com/michaelrsweet/pappl/issues/134))
- Retrofit API Completion: It must be assured that all SANE drivers work smoothly in Scanner Applications
- Rebase to PAPPL v2.0: Developing and testing have been done with PAPPL 1.4.x. In the mean time feature development concentrated on the 2.x branch

Kshitij Sharma has stepped up as a volunteer contributor to help on the Scanner-Application-related work. He will help Akarshan to complete his work and also on the further development of Scanner Applications.

Code:
- Scan API PR in PAPPL: Laying down the framework to make scanning work as seamlessly as printing ([PAPPL Pull request #371](https://github.com/michaelrsweet/pappl/pull/371))
- PAPPL Retrofit Interface PR: Aiming to replace SANE with a more universal PAPPL interface, moving scanning closer to true driverless operation ([pappl-retrofit Pull request #23](https://github.com/OpenPrinting/pappl-retrofit/pull/23))
- Last year's eSCL Work in GSoC 2023: A deep dive into building groundwork for driverless scanning, covering our approach to sandboxing scanners ([GSoC 2023 final report](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci))
- [Akarshan's GIT repo](https://github.com/Kappuccino111/pappl/tree/v1.4.x)

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma<BR>
[Work Product](https://github.com/kushagra20251/GSoC24)

PASSED

To complete this task, the following steps have to be done:
- Implementing additional features from the CPDB API, ensuring that the print dialog can dynamically fetch printer properties and settings
- Conducting thorough tests to verify that the dummy printers are recognized correctly and that their properties are displayed accurately in the print dialog
- Upstream merge in Mozilla

Uddhav Phatak (GSoC contributor for PDFio support in libcupsfilters) is volunteering to help finishing these tasks.

Code:
- [Code review request at Mozilla](https://phabricator.services.mozilla.com/D227780)

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal<BR>
[Work Product](https://github.com/TheJayas/GSoC-2024-Final-Report)

PASSED

To complete this task, the following steps have to be done:
- Finalising the "Add Printer" part
- Merge [Pull request #378](https://github.com/OpenPrinting/system-config-printer/pull/378): Adding Feature of IPP Service Discoveries

Code:
- [Pull request #378](https://github.com/OpenPrinting/system-config-printer/pull/378): Adding Feature of IPP Service Discoveries

**Make a native printer Application from Gutenprint**<BR>
Contributor: Ankit Pal Singh<BR>
[Work Product](https://docs.google.com/document/d/1BkjO4FAIIyeQCJV_1qkUsx9pG2DD1HqgrsoL0MuYG3A/edit?usp=sharing)

PASSED

The project is completed so far, it only needs to be merged upstream, ideally in the Gutenprint project. Further development plans are to add option preset functionality, so the complex options can be set in preset profiles in the web interface of the Printer Application and the presets can then be selected for each print job via IPP.

Code:
- [Ankit's GitHub repository](https://github.com/Ankit3002/native-gutenprinter-app)

**GNOME Control Center: Finalizing the New Printing Architecture for GNOME**<BR>
Contributor: Kaushik Vishwakarma<BR>
[Work Product](https://medium.com/@kaushik.vishwakarma2003/gsoc-2024-thelinuxfoundation-journey-07e24d7e9be9)

PASSED

To complete this task, the following steps have to be done:
- The code needs to get migrated to the current development branch (47.3) and a merge request posted
- A feature request for PAPPL needs to be posted to allow triggering auto-addition of printers via IPP request

Code:
- [Kaushik's Github repository](https://github.com/Kaushik1216/gnome-control-center/tree/cupsgcc46.3)

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma<BR>
[Work Product](https://github.com/shivamsharma2509/GSOC24)

FAILED

To complete this task, the following steps have to be done (these are very important for the usefulness of the work, therefore the fail):
- Complete the functionality, for example the access token is not sent to the printer with every request.
- Document how the code is tested, or ideally add test scripts.

Shivam promised to fnish his project after GSoC.

Code:
- [Shivam's GitHub repository of cpdb-backend-cups](https://github.com/shivamsharma2509/cpdb-backend-cups)
- [Pull request #37 on cpdb-backend-cups](https://github.com/OpenPrinting/cpdb-backend-cups/pull/37)

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa<BR>
[Work Product](https://docs.google.com/document/d/1ZUQV_Qha9f14ceZc6mW39i3RZfWGu6HGPGcXsz3dKUE/edit?tab=t.0#heading=h.uws5sjz8iisy)

PASSED

The project is completed so far, but there are some plans to improve it, especially adding support for more Brialle embossers, adding more filter chain options, and more customization for users.

Code:
- [Arun's Github Repository](https://github.com/arunpatwa/braille-printer-app-pappl)
- [Pull request](https://github.com/OpenPrinting/braille-printer-app/pull/10)

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak<BR>
[Work Product](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce)

PASSED

To complete this task, the following steps have to be done:
- Port cupsfilters/pwgtopdf.cxx
- Intense testing of the ported functions

Code:
- [Uddhav's work on GitHub](https://github.com/uddhavphatak/libcupsfilters/tree/pdfio-implement).
- [libcupsfilters Pull request #71](https://github.com/OpenPrinting/libcupsfilters/pull/71)

And here are the write-ups for October:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh

> This month, I tested the ps-printer-app rock using an example daemon printer emulator, which forwards print jobs to an output file through a simple C script. With minor modifications to ps-printer-app.c, I was able to add a generic printer, but I am still working on forwarding the print job to our printer emulator.

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu

> In October, the primary focus of the OpenPrinting fuzzing project is to triage and submit bug reports to development teams for addressing issues identified by existing OSS-Fuzz harnesses. Notable fixes include changes in the CUPS repository, such as the commits 80fe6815d5941ef8a812087af7869f4c02779f1d and 7a2d383ee59a90f41d482476edb909165ea9565d, resulting in over 5,000 lines of code changes.
>
> https://github.com/OpenPrinting/cups/commit/80fe6815d5941ef8a812087af7869f4c02779f1d
> https://github.com/OpenPrinting/cups/commit/7a2d383ee59a90f41d482476edb909165ea9565d
>
> Additionally, the OpenPrinting fuzzing team shared our integration experience on developing fuzzing for open-source software at the Ubuntu Summit 2024. Till, Andrei, and Dongge participated onsite, deliverred a successful workshop and shared insight for open source developers in securing their projects. After wrapping up the work in GSoC, we are focusing on incorporating more practical fuzzing harnesses into the OpenPrinting projects.

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma

> The work on adding Common Print Dialog Backends (CPDB) support to Mozilla Firefox focused on setting up foundational elements and preparing the backend for seamless integration. Key accomplishments include configuring CPDB dependencies within Mozilla's build system and implementing a dummy print backend to simulate basic CPDB operations, allowing for initial testing. This backend interacts with nsPrinterBase and nsPrinterListBase to ensure compatibility with Firefox’s printing framework. Currently, the dummy backend is under code review, while the next phase will replace placeholder values with real CPDB data. I have added a work in progress code review for progress made so far 
(Code review : https://phabricator.services.mozilla.com/D227780 )
Also published GSoC’24 report (Report :https://github.com/kushagra20251/GSoC24 ).

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> I have added the IPP Service Discovery part and created a pull request. Here is the link to the PR: https://github.com/OpenPrinting/system-config-printer/pull/378. In this PR, I included code for the asynchronous discovery of IPP services and for the UI part as well. I'm currently working on the "Add Printer" functionality, using methods suggested by @tillkamppeter and discussed with @Mohit. I have also created the final report for my GSoC project. Here is the link to the final report: https://github.com/TheJayas/GSoC-2024-Final-Report

**GNOME Control Center: Finalizing the New Printing Architecture for GNOME**<BR>
Contributor: Kaushik Vishwakarma

> I had an online meeting with Mohit, and we decided to remove the second option—installing printer apps from the internet—since implementing this concept isn’t entirely feasible. I’ll provide all the code next week.
>
> Once you successfully test my code, I’ll migrate it to the current GCC, which I believe is 47.3. I’ll also raise an issue in Pappl regarding the auto-add method to expedite this feature. I plan to continue contributing to this project until it’s officially released with the upcoming GCC

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> This month I performed several tests to check the status of the code and apart from this I also fixed some bugs. I also made changes to the existing function on_handle_print_socket(). The change was to merge the OAuth file with the CPDB_print_backend file. I also called a function for smooth transition. The question was where the access token will be stored and for how long the client can use that code? So to fix this I made changes to Auth.c code to save the access token in the access_token.txt file and the file can only be accessed by the client requested for it. By this way the security is also improved. I also created a pull request and the code is ready to review.

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa

> I introduced a spooling_conversions array, enabling the addition of MIME filters to handle conversions between source and destination types. This setup streamlined the process of iterating through filters to change file types as needed, facilitating the integration of multiple filters, including "texttobrf" and "imagetobrf." I also removed PPD support in favor of IPP options, focusing solely on default IPP configurations.
>
> Additionally, I implemented the mime_cb() function using libmagic to dynamically identify the MIME type of input files. This approach allowed me to successfully print various file types, such as .txt, .pdf, .html, and .jpg, enhancing the flexibility and functionality of the printer application.

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak

> I have successfully ported all the files in the cupsfilters/pdftopdf/*, cupsfilters/pdf.cxx, cupsfilters/pclmtoraster.cxx from C++ to C, all the tests are passing using the "make check" command. Even though I have wrapped up my GSoC journey officially by passing the final submission, the conversion of 1 file (cupsfilters/pwgtopdf.cxx) is remaining, which I will complete soon.


## New Releases
Since the last OpenPrinting News we had again several releases:

[**libcupsfilters, libppd, cups-browsed 2.1.0**](/libcupsfilters,-libppd,-cups-filters-2.1.0-Releases-including-vulnerability-fix/)

First of all, we have done upstream releases of the packages which got fixed because of the [recently reported remote code execution and DDoS vulnerabilities](/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/).

We have especially removed support for legacy CUPS browsing and for LDAP from **cups-browsed** to eliminate the entrance point for the attacks, the acceptance of UDP packages from arbitrary sources on port 631. In addition we validate and sanitize incoming IPP responses and PPD file entries in both **libcupsfilters** and **libppd**.

After the 2.0.0 release we had also added some new features during all the months up to now. In **libcupsfilters** and **libppd** we have added **support for building with libcups3**, and `INSTALL.md` files instead of `INSTALL`.

**libcupsfilters** received a facility for **CI/build/unit testing of filter functions** using an easily-editable table describing the test cases. This was Pratyush Ranjan's [GSoC 2023 project](https://github.com/pranjanpr/GSoC-23) at OpenPrinting.

**libcups [3.0rc1](/libcups-3.0rc1/), [3.0rc2](/libcups-3.0rc2/), and [3.0rc3](/libcups-3.0rc3/)**

The development of libcups3 has reached release candidate (RC) state. Then usually all planned features should be included band final testing and bug fixing will happen. So it now will not take long any more until the first stable release of a CUPS-3.x component.

The last feature additions are here:

> - Added `cupsFormatString` and `cupsFormatStringv` APIs to safely format UTF-8 strings.
> - Added support for per-user instances of `cups-locald` (Issue #69)
> - Added `httpConnectURI` API.
> - Added "end" argument to `cupsParseOptions` API.
> - Renamed `httpReconnect` to `httpConnectAgain`.
> - Updated `cupsDestInfo` to accept a `cups_dest_flags_t` argument.
> - Updated `cupsCopyString` and `cupsConcatString` APIs to safely terminate UTF-8 strings.
> - Updated list of attributes included in the destination options.
> - Updated `cupsAddIntegerOption` and `cupsGetIntegerOption` to use the `long` type.
> - Updated `httpAddrConnect()` to handle `POLLHUP` together with `POLLIN` or `POLLOUT`.
> - Updated the various tool man pages, usage output, and examples.
> - Updated `ippCreateRequestedArray` for the Get-Documents and Get-Output-Device-Attributes operations.
> - Updated `ipptool` to validate IPP, PDF, and .strings files using the "WITH-[ALL-]CONTENT" predicate ([Issue #87](https://github.com/michaelrsweet/pappl/issues/87))
> - Now use installed PDFio library, if available.
> - Now use NotoSansMono font for `ipptransform` text conversions.
> - Brought back IPP/2.x and related conformance test files ([Issue #85](https://github.com/michaelrsweet/pappl/issues/85))
> - The `ipptransform` program now supports uncollated copies.

In addition. many bugs got fixed.

**PAPPL [1.4.7](/pappl-1.4.7/) and [1.4.8](/pappl-1.4.8/)**

These releases fix several bugs, including a [security issue](https://github.com/michaelrsweet/pappl/issues/373): If a password is set for the web admin interface, it got ingnored when logging in and so anybody could log in.
