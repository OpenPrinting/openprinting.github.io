---
title: OpenPrinting News - August 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Soumyadeep Ghosh, Opportunity Open Source in IIT Kanpur, UbuCon Asia 2024, Open Source Summit Europe 2024, Ubuntu Summit 2024, GSoC 2024, Pull Requests
---
Sorry for posting late, but events are following close to each other ...

Last month I did my second trip to India, for the second [Opportunity Open Source](#opportunity-open-source-in-iit-kanpur) in the IIT Kanpur and also for the [UbuCon Asia](#ubucon-asia-2024-in-india) in Jaipur, and having the Taj Mahal in the middle of the way between the two, I visited it during the days between the events. 

On the UbuCon Asia I met Soumyadeep Ghosh, [Snapcrafter](http://snapcrafters.org/) and submitter of the Snapcrafters' booth and workshops on the [Ubuntu Summit](https://ubuntu.com/blog/ubuntu-summit-2024) and being newcomer in conferences, the UbuCon Asia was his very first conference. So I started to [mentor and inspire him](#soumyadeep-ghosh) ...

And next week there is already the next conference, the [Open Source Summit Europe](#open-source-summit-europe-in-vienna), this year in Vienna, so I will not need to travel nor need I a hotel room, I can easily commute by Vienna's excellent subway.

I even played with the idea to attend aKademy 2024 in Würzburg, Germany, on the weekend between UbuCon Asia and OSS, but this would really get too much. So it was even better here that my talk did not get accepted.

For the [Ubuntu Summit in the Hague](#ubuntu-summit-2024-in-the-hague) the sessions are selected and published. I will give a Snap workshop and participate in the Snapcrafters' booth.

For many mentoring organizations the [Google Summer of Code](#google-summer-of-code-2024) has ended, as the standard 12-week coding period is over. But we at OpenPrinting have extended the deadline for most of our projects as our contributors were not able to continuously work full-time in the default coding period, due to academic work, exams, ... Therefore for us the GSoC is continuing full-steam. This way the contributors are able to finish their projects thoroughly and without stress instead of having to rush them in, producing low-quality, buggy code.

So let us see what happened at OpenPrinting in August ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## Soumyadeep Ghosh
When reviewing the submissions on the Call for Proposals for the [Ubuntu Summit 2024 in the Hague](https://ubuntu.com/blog/ubuntu-summit-2024) I saw 3 abstracts posted by Soumyadeep Ghosh together with other [Snapcrafters](http://snapcrafters.org/), including Heather Ellsworth, one being for a Snapcrafters booth and the other two for Snap workshops. So I am not the only one who is [organizing Snap workshops](https://forum.snapcraft.io/t/40263). Especially as already before the CfP in the Ubuntu Summit organization team we planned to pre-set some workshops with Canonical employees teaching certain Canonical projects (one being me with Snap) I suggested to merge my workshop with the [initial one of theirs](https://events.canonical.com/event/51/contributions/586/) and not compete with them.

After having seen this, first there was GUADEC in Denver and there I have met Heather in-person. I talked with her about the submissions and she agreed with me on joining and merging the workshop. She proposed that I should write an e-mail to all participants of the submissions and I did after GUADEC and Soumyadeep approached me on Telegram, where we had longer conversations about the Snap workshops. Especially Soumyadeep also studied my initial workshop (which originally got created by Heather). Soumyadeep is GSoC contributor for KDE this year, his project is a Snap permisson manager for KDE, his own idea, not in KDE's project idea list.

He also told me that we meet in-person on the [UbuCon Asia](https://soumyadghosh.github.io/website/blog/ubucon-asia-2024/) and that he will run a Snapcrafters booth on the event. So we already made an appointment to meet the evening before the first conference day, to plan the booth, right when he arrives in Jaipur. I already arrived a day earlier and have been the first day together with the organizers, and asked them for a TV for our booth, which I actually got. And in the evening of the second day Soumyadeep and me met again and re-modeled my workshop, to replace the GNOME-based exercises by CLI-based ones, so that when the attendees do the exercises they do not download the large GNOME content Snap which contains all GNOME libraries during the Snap build, as this would overload the slow Wi-Fi in the venue. Soumyadeep also told me that the UbuCon Asia was the very first conference in his life, the first flight, the first solo trip. So I was his conference mentor and we were up until 2am both nights, so not being principal organizer of the UbuCon I did not get any more sleep than on the [Opportunity Open Source](#opportunity-open-source-in-iit-kanpur) ...

Soumyadeep and me have given the workshop together then and he was a surprise guest, as we decided to do the workshop together only in the two nights before and I did not come around to ask the organizers to modify my entry in the schedules. Soumyadeep talked with the organizers about the Wi-Fi needs and they have swapped the workshop into the plenary room as that room has faster Wi-Fi than the breakout room. The attendees liked the workshop a lot (especially also Guruprasad Lakshmi Narayanan from Launchpd). Soumyadeep's conference debut was a great success.

And now he got really enthusiastic. He does not only want to speak on the Ubuntu Summit this year, but also be GSoC contributor for OpenPrinting next year, create a monthly Ubuntu podcast interviewing people (comeback of the Indabas?), and create a programming club in his college ... Seems that I have really inspired him ...

**Update: [LinkedIn report by Soumyadeep about this section](https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A7240953725081583616/?midToken=AQGZKDiU1P2dsg&midSig=0EvrmszONQ2Hs1&trk=eml-email_notification_single_mentioned_you_in_this_01-hero_notification_cta-0-1ep~cta&trkEmail=eml-email_notification_single_mentioned_you_in_this_01-hero_notification_cta-0-1ep~cta-null-h90q4~m135draj~bz-null-null&eid=h90q4-m135draj-bz)**


## Opportunity Open Source in IIT Kanpur
I have done my second trip to India, mainly for the **[Opportunity Open Source 2.0](https://oosc-next.vercel.app/)** in the Indian Institute of Technology (IIT) Kanpur, on August 24-26.

Arriving at the campus of IIT Kanpur and approaching the the actual venue, the central lecture hall building, large, nicely designed posters with the faces of many of the speakers, including the event chairs Aveek and me, appeared at several places, and especially at the main entrance there was a row of posters, each featuring two faces, like at the entrance for a polling place for elections ...

This showed already the excellent on-location organization of the event by Pratham Sahu, Rahbar Khan, Shreya Shree, Prakhar Mishra, Sanskar Yaduka, and many volunteers. Thanks a lot to them. They did not only get 3 lecture halls (all with projector, mics, and speakers) for us during all the two days but they also organized guest house rooms for speakers and attendees, set up registration and payment for attendees, designed the [web site](https://oosc-next.vercel.app/) and the posters, and organized an excellent conference dinner not only for the speakers but for all attendees on Sunday.

And this was naturally not possible without sponsors. Our organization team found local start-ups, Trumio and CDIS, and also Red Bull as sponsors and raised funds near 10000 USD.

Before the start of the conference I got kept busy with adjusting the schedules, accommodating last-minute speakers, talks by the sponsors, speakers only coming for one day, but I got puzzled together everything to cater for everybody.

The conference went smoothly, we had some delay, due to technical problems, but not more than half an hour, and we succeeded to stream the plenary and breakout rooms as planned and also we succeeded to record the workshops at least on Sunday. But it was not really easy for me to rush through all the 3 rooms in the beginning of each day and at the end of the lunch breaks, to set up the streaming. We also needed to move to different rooms on Saturday after the afternoon break, due to university events happening in our rooms.

A special success were the 9 workshops. they were really well attended. People seem to like to try out the things hands-on than just listening to talks ...

And on Sunday evening, after the 2 days of talks and workshops, came the big surprise: We went to a place on the campus, a large open-air area, and there a catering hired for the conference dinner set up a nice decoration, a delicious buffet, especially also with live cooking and a nice mocktail bar (alcohol-free cocktails, as booze is not allowed on-campus), and also waiters going around with finger food, and that not only for the organizers and speakers but also for all the attendees.

This was great for networking and many people came up to me as they wanted to have the next Opportunity Open Source in their college, and many, many people have taken photos of them with me ...

On Monday, the third day of the Opportunity Open Source, the [Hackathon](https://oosc-next.vercel.app/competitions) day, has taken place, a 12-hour programming competition, with a really odd timing, starting at midnight and ending at noon. For this tables and chairs got set up in a yoga hall and there were many people participating, the hall got very busy. The problems to work on were provided by the Hackathon sponsors Trumio and Overlayy and the best 3 submissions won an internship at Trumio. Thanks a lot to the sponsors.

**Schedules**

Of at least some sessions the slides are available here, under "Presentation Materials".

- [All days](https://events.canonical.com/event/89/timetable/?layout=room#all.detailed)

**Recordings**

The recordings are not edited and it is possible that on some there is a bad audio quality.

Also note that the closing plenary has taken place in the breakout room and not in the plenary room.

- Saturday, August 24, Morning
  - [Plenary Room](https://www.youtube.com/watch?v=XOZOT0Fu2p0)
  - [Breakout Room](https://www.youtube.com/watch?v=uq_2kXn-IUg)
- Saturday, August 24, Afternoon
  - [Plenary Room](https://www.youtube.com/watch?v=zb7vGeTwTDs)
  - [Breakout Room](https://www.youtube.com/watch?v=V9LO8pO2iCk)
- Sunday, August 25, Morning
  - [Plenary Room](https://www.youtube.com/watch?v=dDZJ1d-n2xg)
  - [Breakout Room](https://www.youtube.com/watch?v=VWeFn1nEP-E)
- Sunday, August 25, Afternoon
  - [Plenary Room](https://www.youtube.com/watch?v=XMCGMbEtbkQ)
  - [Breakout Room](https://www.youtube.com/watch?v=1B7v5k8rOk4)

**Coverage**

There are several blogs, reports, and announcements about this event, mostly on LinkedIn. People liked it a lot and are eager to attend the next edition.

- [IIT Kanpur Announcement]( https://www.iitk.ac.in/new/opportunity-open-source-conference-2024)
- [Hindustan Times](https://www.hindustantimes.com/education/news/iit-kanpur-gears-up-to-host-opportunity-open-source-conference-2024-from-august-24-invites-proposals-101721055082149.html)
- [Announcement of the event on LinkedIn](https://www.linkedin.com/posts/opportunity-open-source_join-us-for-the-opportunity-open-source-ugcPost-7227324671497490433-Xmr4?utm_source=share&utm_medium=member_desktop)

- [My summary on Ubuntu Discourse](https://discourse.ubuntu.com/t/45959/5)
- [Report by Tushar Gupta on Ubuntu Discourse](https://discourse.ubuntu.com/t/48007)

- [Report by Aveek Basu on LinkedIn](https://www.linkedin.com/posts/basuaveek_an-idea-of-a-student-meetup-getting-converted-ugcPost-7233701995159691265-HUZE?utm_source=share&utm_medium=member_desktop)

- [Report from speaker and former OpenPrinting GSoC contributor Sahil Arora on LinkedIn](https://www.linkedin.com/posts/sahilarora535_over-the-weekend-i-was-delighted-to-have-activity-7234091631128272897-uMo8/?utm_source=share&utm_medium=member_ios)

- [Report by Aditya Nigam on LinkedIn](https://www.linkedin.com/posts/aditya-nigam-150b62102_over-the-weekend-i-was-delighted-to-have-ugcPost-7236439356561838080-ToLC?utm_source=share&utm_medium=member_desktop)
- [Report by Aditya Narayan on LinkedIn](https://www.linkedin.com/posts/aditya-narayan-33156a288_opensource-oosc-hackathon-ugcPost-7234524347896373250-BZUu?utm_source=share&utm_medium=member_desktop)
- [Report by Abhipsa Nayak on LinkedIn](https://www.linkedin.com/posts/abhipsa-nayak-03213928b_oosc-iitkanpur-opensource-ugcPost-7234275375889989632-Vjak?utm_source=share&utm_medium=member_desktop)
- [Report by Mayank Porwal on LinkedIn](https://www.linkedin.com/posts/mayank-porwal-4854b12a7_oosc2024-opensource-innovation-ugcPost-7234625515448377344-lUL_?utm_source=share&utm_medium=member_desktop)
- [Report by Apurv Gupta on LinkedIn](https://www.linkedin.com/posts/apurv-gupta-1a9938240_oosc2024-iitkanpur-hackathon-ugcPost-7236085451722211328-YuRk?utm_source=share&utm_medium=member_desktop)
- [Report by Kaushal Sharma on LinkedIn](https://www.linkedin.com/posts/kaushal-sharma-26aa0128a_opensource-gsoc-iitkanpur-ugcPost-7234671355890126848-Ve0f?utm_source=share&utm_medium=member_desktop)
- [Report by Rishu Singh on LinkedIn](https://www.linkedin.com/posts/rishu-singh-118642225_iitkanpur-opensource-coding-activity-7233726228275281920-cs7Y/?utm_source=share&utm_medium=member_android)
- [Report by Garvit Bhardwaj on LinkedIn](https://www.linkedin.com/posts/garvitofficial_looking-back-at-an-inspiring-experience-activity-7240406126016536576-sQ88/)

- [Report by Garvit Bhardwaj about the Hackathon on LinkedIn](https://www.linkedin.com/posts/garvitofficial_hackathon-blockchain-dapp-activity-7234563980747231232-H-od/)

**Pictures**

Not many of the talks and workshops on Sunday, unfortunately, but hopefully more pictures will get added.

- [Saturday](https://drive.google.com/drive/folders/1qfEl7wNcGcT4oB76QqmbDvZp9kQ3abPS)
- [Sunday & Monday](https://drive.google.com/drive/folders/1FdThzQVM4iDymqIyFtVvSzjgXvt40vut)

**Mastodon**

- [#OpportunityOpenSource](https://ubuntu.social/tags/OpportunityOpenSource)


## UbuCon Asia 2024 in India
After leaving Kanpur my trip went on in the direction of Jaipur with a stop-over in Agra, to see the Taj Mahal. Alao the stop-over split the road trip into 2 4-5-hour pieces. In Jaipur the [UbuCon Asia 2024](https://2024.ubucon.asia/) has taken place, on Aug 31 - Sep 2 (Sat - Mon).

There I have given a talk and a workshop about Snap, and, only one week before the event, when I was already in Kanpur, I got the invitation to also give my submitted lightning talk about conserving old printers under Windows using WSL.

- **[Desktop Linux, as easy as a smartphone! Just in a Snap!](https://events.canonical.com/event/47/contributions/372/)** ([Slides](https://events.canonical.com/event/47/contributions/372/attachments/275/404/Desktop%20Linux%20as%20easy%20as%20a%20smartphone%20-%20Just%20in%20a%20Snap!%20-%20UbuCon%20Asia%202024.pdf))
- **[Your app everywhere - Just in a Snap! - Interactive Workshop](https://events.canonical.com/event/47/contributions/397/)** ([Slides](https://events.canonical.com/event/47/contributions/397/attachments/274/412/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!-with-KDE.odp-2.pdf))
- **[Save Legacy Printers under Windows with WSL and Printer Applications](https://events.canonical.com/event/47/contributions/571/)** ([Slides](https://events.canonical.com/event/47/contributions/571/attachments/276/406/Save%20Legacy%20Printers%20under%20Windows%20with%20WSL%20and%20Printer%20Applications%20-%20UbuCon%20Asia%202024.pdf))

But the most important of this conference for me was to meet Soumyadeep Ghosh ([see above](#soumyadeep-ghosh)).

**Coverage**

- [Report by Soumyadeep Ghosh on GitHub](https://soumyadghosh.github.io/website/blog/ubucon-asia-2024/)
- [Report by Youngbin Han (`/young/bin/`) on Ubuntu Discourse](https://discourse.ubuntu.com/t/47876)

- [Report by Soumyadeep Ghosh on LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7240406631417536512/)
- [Report by Lakshya Borasi on LinkedIn](https://www.linkedin.com/posts/lakshya-borasi_ubuconasia2024-techcommunity-opensource-ugcPost-7237715341865345024-AJb0?utm_source=share&utm_medium=member_desktop)
- [Report by Vaibhav Chouhan on LinkedIn](https://www.linkedin.com/posts/vaibhav270_opensource-ubuntu-kubernetes-activity-7236786669566214144-SLVa?utm_source=share&utm_medium=member_desktop)
- [Report by Uddaraju Praneeth Kumar on LinkedIn](https://www.linkedin.com/posts/uddaraju-praneeth-kumar-376a2a259_ubuconasia2024-ubuntu-opensource-ugcPost-7236081062852845568-1Lm1?utm_source=share&utm_medium=member_desktop)


## Open Source Summit Europe in Vienna
This year's [Open Source Summit Europe](https://events.linuxfoundation.org/open-source-summit-europe/) in Vienna is approaching, next week! On September 16-18. It is a home game for me and so I had attended it independent whether I had given a talk or not. Especially also as I am one of the 8 fellows of the Linux Foundation, the conference fee is waived for me.

But independent of this I had submitted a talk and it got accepted, so mark your calendars:

**[OpenPrinting - We Make Printing Just Work!](https://sched.co/1ej79)**

Wed, September 18, 15:10 - 15:50 CEST, Hall B (Level 2)

Track: [LinuxCon](https://osseu2024.sched.com/type/LinuxCon)

I will give an overview of our work. Going through OpenPrinting's history the components of the printing infrastructure of modern Linux (and other Posix-style) operating systems will get shown. - How did the Internet Printing Protocol (IPP) with the printing system CUPS being an implementation of it simplify printing a lot? - The printer driver challenge, good and bad cooperation with manufacturers, packaging and distributing ... - Desktop integration, GUI toolkits, print dialogs, setup tools, portals, ... Especially also the New Architecture of all-IPP printing and scanning and also the integration in immutable OS distributions will be treated ... 

There will also be a Canonical/Ubuntu booth (Hall E, Level 0, Booth G/S13) with several people from Canonical, especially I will meet there Cristovão Cordeiro, Rockcraft expert and mentor of our GSoC contributor Rudra Pratap Singh, and Mauro Gaspari, organization lead of the Ubuntu Summit.

**See all Canonical/Ubuntu activity in [this Ubuntu blog](https://ubuntu.com/blog/meet-canonical-at-open-source-summit-europe-2024).**


## Ubuntu Summit 2024 in The Hague
Also the [Ubuntu Summit](https://ubuntu.com/blog/ubuntu-summit-2024) is coming closer, only 6 weeks left (on October 25-27).

The sessions are selected now but not yet scheduled. So you can see our talks, workshops, and booths in the now published [list of contributions](https://events.canonical.com/event/51/contributions/).

See also [how we got our nice stork logo](https://ubuntu.com/blog/ubuntu-summit-2024-a-logo-takes-flight).

I will be there, not only as member of the organization team, but also presenting Snap together with the [Snapcrafters](http://snapcrafters.org/), on the [booth](https://events.canonical.com/event/51/contributions/524/) and also in the [workshop](https://events.canonical.com/event/51/contributions/586/), all together with Merlijn Sebrechts, Heather Ellsworth, Scarlett Moore, and [Soumyadeep Ghosh](#soumyadeep-ghosh).


## Google Summer of Code 2024
All our 11 contributors have passed their mid-term evaluations and one, Rudra Pratap Singh, has passed the finals. All the others asked for a later deadline as they were not able to work full-time on their projects during the originally scheduled 12 weeks, but they are all well in shape for successfully completing their tasks.

And this time we got write-ups of all of them:

**Packaging CUPS and Printer Apps into OCI images**<BR>
Contributor: Rudra Pratap Singh<BR>
[Work Product](https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6)

PASSED

> 1. Successfully completed the packaging of all four printer apps: ps-printer-app (https://github.com/rudra-iitm/ps-printer-app-rock), hplip-printer-app (https://github.com/rudra-iitm/hplip-printer-app-rock), gutenprint-printer-app (https://github.com/rudra-iitm/gutenprint-printer-app-rock), and ghostscript-printer-app (https://github.com/rudra-iitm/ghostscript-printer-app-rock).
> 2. Integrated GitHub Actions from ubuntu/desktop-snaps (https://github.com/ubuntu/desktop-snaps) into each app, enabling seamless automatic versioning and dependency updates.
> 3. Added registry-action.yml (https://github.com/rudra-iitm/hplip-printer-app-rock/blob/main/.github/workflows/registry-actions.yml) to streamline pushing Docker images of the Rock packages to Docker Hub.
> 4. Documented the printer apps and further enhanced the documentation of CUPS rocks (https://github.com/rudra-iitm/cups-rock).
> 5. Had the honor of delivering a talk, conducting a workshop, and joining the GSoC panel at Opportunity Open Source 2.0 (https://events.canonical.com/event/89/), hosted by IIT Kanpur (https://www.iitk.ac.in/).
> 6. Wrapped up both the month and my official GSoC journey by submitting the final report. Explore it here: https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6 
> 7. While the GSoC period has ended, a few tasks remain, which I’ll continue working on with my mentor at our own pace.

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha

> This month I worked on multiple small bug fixes, styling changes and phasing out most of the low level handling of CPDB's components by replacing them with CPDB API function calls. I also fixed the issue of user-selected printer settings not being actually sent in the print job and that of starting of the print dialog sometimes leading to crashes. Currently I am working on replacing multiple DBuS calls to get translations of options and choices seperately with one single call to get everything to prevent the slowing of the LO print dialog.

[WIP Pull Request](https://gerrit.libreoffice.org/c/core/+/169617).

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu

> In the past month, we achieved the integration of another important project of OpenPrinting, cups-filters, into the OSS-Fuzz framework. The primary focus of the initial fuzzing effort has been on the texttopdf functionality. To date, OSS-Fuzz has uncovered a total of 35 issues across OpenPrinting projects, with 22 already resolved.
>
> We have fixed the building for the Google Fuzz Introspector, a critical development tool for monitoring fuzzing activity and visualizing data within OSS-Fuzz. The information extracted by the Fuzz Introspector are now used by the automated fuzz driver generator OSS-Fuzz-Gen.
>
> We recently shared insights our OSS-Fuzz integration experience at the security track of OOSC 2024 and we are going to lead a workshop at the Ubuntu Summit 2024 by Mr. George-Andrei Iosif to further exploring these advancements.

**PAPPL API Bridging for Scanner Applications**<BR>
Contributor: Akarshan Kapoor

> This month, the focus was on integrating the eSCL components into the new scanner API within PAPPL. Although the coding for these components was completed some time ago, it is currently being refactored with newer API integrations in mind. The primary objective is to finalize the eSCL integration to ensure that both the coding and logical aspects are fully addressed. This will enable testing with both dummy and SANE scanners to begin. The main goal for the coming month is to streamline the code and complete the logistics setup, ensuring sufficient time for both testing and configuration.

Akarshan's ongoing work you find in this [work-in-progress pull request on PAPPL](https://github.com/michaelrsweet/pappl/pull/349) and in his [GIT clone of PAPPL 1.4.x](https://github.com/Kappuccino111/pappl/tree/v1.4.x).

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma

> the dummy print backend is up and running successfully. I've started the process of integrating CPDB into the codebase, which is a critical step for our project's development. Currently, I'm working through some import issues related to CPDB, which I anticipate resolving soon. Once these issues are addressed, we can proceed with further integration and testing to ensure CPDB functions seamlessly within the system

Kushagra created a good collaboration with the Mozilla developers now, via my original [feature request](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311).

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> I have written the asynchronous service discovery code and tested it with my local instance of system-config-printer. Regarding the part on "assigning Printer Applications to non-driverless printers," after receiving feedback from Till, I'm now working to understand the required changes. My next goal is to discuss and select a UI for the discovered services, compile the final code, and merge it into the main GitHub repository of SCP. After that, I will focus on the "assign Printer Applications to non-driverless printers" task.

**Make a native printer Application from Gutenprint**<BR>
Contributor: Ankit Pal Singh

> I’m working on adding cups_image_t to the rasterRasterJob and printJob functions to handle image data for printing. I’m fixing some minor issues with memory and data formatting. Once these functions are done, I’ll start on the Pappl backend.

**GNOME Control Center: Finalizing the New Printing Architecture for GNOME**<BR>
Contributor: Kaushik Vishwakarma

> 1. Migrated all previous work done by the previous GSoC contributor, and my current mentor Mohit Verma, from GCC 45 to GCC 46.4. This migration included updating UI code that Mohit added to the new GCC architecture, migrating all features, and updating the library versions.
>
> 2. Additionally, I removed duplicate printer entries in the GUI that appeared with different options by modifying the sort function used in the main GCC printer panel.
>
> 3. I also created a DBus mechanism in CUPS pk-helper to add printers into the printer application , provide printer information.
>
> What's Next?
> 1. Implement a feature to allow the printer application to choose options from already installed system printers for auto-adding printers.
> 2. Make necessary changes to the UI and code to finalise the project.
> 3. Create a pull request to the GCC repository to merge all the completed work.

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> I developed a local server for user authentication, integrating OAuth support for CPDB. The server facilitates secure user verification by redirecting them to GitHub for authentication. This approach ensures a seamless and robust authentication process, leveraging GitHub's OAuth system to handle user credentials and access securely. Now the task will be to add a few more ways to authenticate users. And later I will work on security issues as well.

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa

> This month, I have added the functionality for converting text to BRF format using 'liblouisutdml' Repo and integrated the Braille Embosser with the PAPPL application. This integration allows the application to handle Braille embossing tasks. The next steps involve thorough testing to ensure everything works smoothly. I am currently working on it and taking help of Samuel. Once this would be integrated successfully then will add other filters.

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak

> While going through all the converted files, found many errors, and converted pdfio-xobject.cxx file once more.I also updated the  the pdfio-pdftopdf-processor.cxx and pdftopdf-processor.cxx files.

Here is [Uddhav's work on GitHub](https://github.com/uddhavphatak/libcupsfilters/tree/pdfio-implement).


## Pull Requests
Special thanks go to Biswadeep Purkayastha (CPDB support for LibreOffice) and his mentor Michael Weghorn (LibreOffice upstream developer) as they did again many changes and improvements, mainly on the CPDB libraries ([cpdb-libs](https://github.com/OpenPrinting/cpdb-libs/)) and also on the CUPS backend for CPDB ([cpdb-backend-cups](https://github.com/OpenPrinting/cpdb-backend-cups/)).

Most changes are bug fixes.

Since the 2.0b6 releases they did 24 Pull Requests on cpdb-libs and 5 on cpdb-backend-cups:

**cpdb-libs**

- [PR #53](https://github.com/OpenPrinting/cpdb-libs/pull/53): Fix memory leaks in `cpdbUnpackOptions()`, by Michael Weghorn
- [PR #54](https://github.com/OpenPrinting/cpdb-libs/pull/54): `text-frontend`: Fix memory leak in "add-setting", by Michael Weghorn
- [PR #55](https://github.com/OpenPrinting/cpdb-libs/pull/55): Replace `cpdbConcat()` with `g_strconcat()`, by Michael Weghorn
- [PR #56](https://github.com/OpenPrinting/cpdb-libs/pull/56): Drop unused `cpdbExtractFileName()`, by Michael Weghorn
- [PR #57](https://github.com/OpenPrinting/cpdb-libs/pull/57): Fix memory leak in `cpdbGetDefaultPrinterForBackend()`, by Michael Weghorn
- [PR #58](https://github.com/OpenPrinting/cpdb-libs/pull/58): Allow to extract translations from table, by Biswadeep Purkayastha


**cpdb-backend-cups**

- [PR #36](https://github.com/OpenPrinting/cpdb-backend-cups/pull/36): 
Pass correct parameters to `cupsStartDestDocument()`, by Biswadeep Purkayastha
