---
title: OpenPrinting News - Opportunity Open Source 3.0 in the IIT Kanpur, India
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: For our third edition we returned to Kanpur
---
## From Nepal to India ...
As reported in my [previous blog](/OpenPrinting-News-UbuCon-Asia-2025-in-Kathmandu-Nepal/) I had also attended the [UbuCon Asia](https://2025.ubucon.asia/) in Kathmandu, in Nepal, on August 30-31. We have set the date for the Opportunity Open Source on the following weekend, September 5-7, to give the possibility to attend both doing one single round trip, which had especially made sense if we had co-hosted [UbuCon India](https://events.canonical.com/event/136/overview).

So at least I have made said round trip and traveled from Kathmandu in Nepal directly to Lucknow in India, on September 2, the day after the day trip of the UbuCon in Nepal. Then I have stayed in Lucknow for tourism for 2 nights and the traveled with Aveek Basu with a hired driver to Kanpur. There we met the local organizers **Sanskar Yaduka** (does also [GSoC for OpenPrinting](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#openprinting-image-output-verification-framework-by-sanskar-yaduka)) and **Shreya Shree**, and also **Akarshan Kapoor**.

We originally wanted to do the final testing of A/V for the live streaming and remote speaking, but we ended up fixing the schedules.

Originally, we had the 3 conference days, September 5-7 for the talks and workshops, as nobody provided a Hackathon to us. So I accepted all the proposals on the CfP and scheduled all the sessions into plenary room, breakout room and workshop room over the 3 days, taking into account speaker's requirements when they are not there all the days, time zones of remote speakers, talk before workshop, no 2 talks of one speaker to the same time, ...

Then, just when I arrived in Kanpur, they told me that they got a Hackathon and to have the 7th for doing it, we had to re-schedule all the sessions to squeeze them into the first 2 days. Fortunately, I did not need to re-schedule from scratch, as Sanskar did a first draft of a new schedule, but I had to correct several things to re-assure the speaker's wishes and I had to transfer everything into the [Indico site of the event](https://events.canonical.com/event/134/timetable/?layout=room#all.detailed), ending up to have only 2 hours of sleep the night before the event.

Also, we had originally planned to start the conference only at noon on Friday, to give participants more time to arrive at the venue and also us more time to prepare the conference rooms. The re-scheduling required us to start already 11:00 in the morning and so having even less preparation time in the rooms.

But on the other side, **Akarshan Kapoor** stepped in to help with adjusting last-minute schedules and announcing sessions on the Telegram channel for the attendees, especially also if we had delays. **Thanks a lot, Akarshan, for doing so!** Also some others, not only the organizers, started announcing the talks on the Telegram channel.

## The Sessions

[**Schedules**](https://events.canonical.com/event/134/timetable/?layout=room#all.detailed)

Despite getting most of the proposals only lately, 3 weeks or less before the event, we got an amazing selection of sessions. Aveek and me, we naturally brought our own sessions about OpenPrinting, Snap, Google Summer of Code, and first contributions, but we had subject matters of a wide range of areas, a lot about the area everybody talks about, Artificial Intelligence and Machine Learning, ... and naturally also coding and development, security, Zephyr, ... Also non-coding-related subject matters of community building, switching to open source, funding, ...

Some highlights:

As this conference is primarily to introduce students into FOSS and how to contribute to it, we had several presentations about the **basics of open source and how to join the contributor community**:

- **Aveek Basu** has given an overview in how to do so right after the opening of the event, with "[Starting the Open Source Journey](https://events.canonical.com/event/134/contributions/778/)".

- "[My LFX Mentorship Journey: From Application to KubeEdge Contributor](https://events.canonical.com/event/134/contributions/802/)" ([Slides](https://events.canonical.com/event/134/contributions/802/attachments/437/704/abhishek-kumar-lfx-mentorship-journey.pdf)) and "[From Zero to LFX: How Three Friends Cracked Open Source and Landed KubeEdge Mentorships](https://events.canonical.com/event/134/contributions/801/)" ([Slides](https://events.canonical.com/event/134/contributions/801/attachments/436/703/abhishek-kumar-three-friends-one-dream.pdf)) by **Abhishek Kumar** are both about his experience with the Linux Foundation's mentoring program LFX and KubeEdge as mentoring organization.

- Kernel developer and Linux Foundation fellow **Shuah Khan** showed in her talk "[Six years of empowering open source communities](https://events.canonical.com/event/134/contributions/734/)" which learning opportunities the Linux Foundation provides to open source newcomers.

- **Aveek Basu** and me as experienced GSoC org admins and mentors hosted again a [Google Summer of Code panel](https://events.canonical.com/event/134/contributions/749/), with GSoC contributors **Akarshan Kapoor**, **Mohammed Imaduddin**, and **Sanskar Yaduka** as guests and answered the questions of the audience.

- In "[The Dark Side of Free and Open-Source Software (FOSS)](https://events.canonical.com/event/134/contributions/782/)" **Ayush Ghai** talked about the problems occurring in FOSS development communities, like hobby developers ending up with responsibility on essential system components, burnout, commercial companies publishing under "Open Core" models keeping their stand out parts proprietary, ... ([Blog](https://godspeed.systems/blog/dark-sides-of-free-and-open-source-software-foss))

Aveek and me have naturally have made **OpenPrinting** one of the central parts of the conference:

- To start, I introduced into OpenPrinting by telling about how it all started, what we are doing currently, the New Architecture with CUPS 3.x doing away with PPDs and classic drivers and Microsoft's Windows Protected Print with which they do away with classic drivers, PAPPL not only for Printer Applications but also as base for the CUPS 3.x daemons, OSS-Fuzz, rust and Python bindings, ... and how to contribute. All this in my talk "[OpenPrinting - We make printing just work! - 25 years of printing for FOSS](https://events.canonical.com/event/134/contributions/751/)" ([Slides](https://events.canonical.com/event/134/contributions/751/attachments/411/661/talk-openprinting-2025.pdf), [Blog](/OpenPrinting-News-25-years-of-working-full-time-for-printing-with-free-open-source-software/)).

- **Akarshan Kapoor** has presented his OpenPrinting work of the last 2 GSoCs, "[Scaniverse Universal Scanner Drivers: One Solution for Every Distro](https://events.canonical.com/event/134/contributions/748/)" ([Report 2023](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci), [Report 2024](https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc)), showing how the driverless scanning protocol eSCL can be used to create Scanner Applications, sandboxable scanner drivers.

- **Alexander Pevzner** (creator of [ipp-usb](https://github.com/OpenPrinting/ipp-usb) and [sane-airscan](https://github.com/alexpevzner/sane-airscan)) is enthusiastically working on his "[Behaviorally Accurate Simulator for Multifunction Printers and Scanners](https://events.canonical.com/event/134/contributions/722/)" ([slides](https://events.canonical.com/event/134/contributions/722/attachments/429/692/Behaviorally%20Accurate%20Simulator%20for%20Multifunction%20Printers%20and%20Scanners.pdf), [GitHub](https://github.com/OpenPrinting/go-mfp)) and told in his talk about it. This improves the possibilities of automated testing at OpenPrinting a lot, especially for device discovery, and whether the print output is correct. It is also very useful for development and debugging.

- To not let automated testing (CI, unit testing, fuzz testing) stop at crashes and errors but also allow testing of actual print output, **Sanskar Yaduka** is working on a GSoC project about visual analysis of print output. And this was subject of his talk "[From Open Source to OpenPrinting: My GSoC Journey and Project on Image Output Evaluation](https://events.canonical.com/event/134/contributions/786/)" ([GitHub](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation))

- The successful efforts on fuzz testing and OSS-Fuzz integration of the GSoC 2024 continued in this year's GSoC, by contributor **Mohammed Imaduddin**. And he gave the talk "[Fuzzing Go and Python Projects in OSS-Fuzz: The OpenPrinting Case Study](https://events.canonical.com/event/134/contributions/742/)" ([Slides](https://events.canonical.com/event/134/contributions/742/attachments/434/699/mohammed-immaduddin-talk-fuzzing-go-python-openprinting.pdf), [GSoC Report 2025](https://github.com/OpenPrinting/fuzzing/blob/main/contributions/GSoC%202025%20-%20Integrating%20OSS-Fuzz%20for%20Go-Based%20and%20Python-Based%20OpenPrinting%20Projects/Final%20report.md)) about his work.

**Artificial Intelligence (AI) and Machine Learning (ML)** are talked about a lot and this is also reflected by the many CfP submissions we got for this subject matter, and so we had a good amount of great sessions:

- In "[Can human intelligence show the way for artificial intelligence?](https://events.canonical.com/event/134/contributions/784/)" **Francis Steen** (UCLA, Red Hen Lab) and **Prof. Mark Turner** (CWRU) suggest that based on the higher efficiency of human intelligence a new generation of AI should be developed and that not by the tech giants but by independent open source projects.

- **Neeraj Poddar's** and **Saiyam Pathak's** talk "[Future of Open Source AI: From Cloud to the Edge](https://events.canonical.com/event/134/contributions/798/)" shows how AI can be deployed with open source, both in the cloud and in edge computing (processing takes place near the data source, locally deployed AI).

- In the talk "[Building Adaptive, AI-Native Experiences with On-Device Intelligence](https://events.canonical.com/event/134/contributions/799/)" **Neeraj Poddar** shows how with the open-source platform DeliteAI AI can be deployed on local devices instead of cloud services being used to improve performance and privacy.

And other **awesome success stories** of FOSS to motivate the students:

- **Oliver Völckers** presented "[How we built a pump monitoring system for Deutsche Bahn with wireless sensors using Zephyr RTOS](https://events.canonical.com/event/134/contributions/727/)" ([Slides](https://events.canonical.com/event/134/contributions/727/attachments/430/691/2025-09-06%20Kanpur%20ii-r.pdf)), the subject of **Akarshan Kapoor's** internship which brought him into the world of Zephyr. 

- **Sumanto Kar** and his colleagues have shown in the talk "[From Containers to Chip Design Classrooms: Leveraging Snap and Docker to Enable Open-Source EDA with eSim](https://events.canonical.com/event/134/contributions/735/)" ([Slides](https://events.canonical.com/event/134/contributions/735/attachments/420/677/Containerizing%20eSim%20with%20Snap%20and%20Docker.pdf)) how sandboxed packaging methods, Snap and Docker, allow for distributing the complex electronics design application eSim, consisting of many components to be easily installed in different Linux distribution environments without running into dependency hell. And in the second talk "[An Offline AI Assistant for eSim: Easier, Accessible, Open-Source Circuit Design and Debugging](https://events.canonical.com/event/134/contributions/737/)" ([Slides](https://events.canonical.com/event/134/contributions/737/attachments/421/678/Solution%20Offline%20Debug.pdf)) they showed how eSim uses locally implemented AI.

- **Mikhail Novosyolov** told in is talk "[Migration of whole country to GNU/Linux](https://events.canonical.com/event/134/contributions/755/)" about Russia's move to FOSS and digital sovereignty where ROSA Linux is playing the central role.

And to get interactivity and action into the event one cannot run it without **Workshops**. We had one room dedicated for workshops and they all got well accepted. Here is especially to mention:

- **Akarshan Kapoor** with "[Zephyr RTOS: Building the IoT Future from the Ground Up](https://events.canonical.com/event/134/contributions/747/)" ([Slides](https://events.canonical.com/event/134/contributions/747/attachments/435/701/Zephyr%20RTOS.pdf), [Exercises: Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)) explained what an RTOS (Real-Time Operating System) is compared to a standard system and how to use the development tools. In the end he gave away some sample boards to attendees who asked questions.

- **Sagar Sundaray** and **Swaraj Pande**, both from Red Hat, showed how to deploy AI on automotive-grade systems, in "[Accelerating AI Deployment in Automotive: A Unified Approach](https://events.canonical.com/event/134/contributions/726/)". They brought also a lot of demo hardware. 

- For the app developers who have attended **Mohammed Imaduddin** talk about his OSS-Fuzz work for OpenPrinting to do the same on their app, Mohammed has given the workshop "[Intro to OSS-Fuzz: Build, Break, and Harden Open Source Software ](https://events.canonical.com/event/134/contributions/743/)" ([Slides](https://events.canonical.com/event/134/contributions/743/attachments/433/697/mohammed-immaduddin-workshop-fuzzing-oss-fuzz.pdf)).

- In the session "[MicroCeph: Build your S3 app without AWS!](https://events.canonical.com/event/134/contributions/721/)" **Utkarsh Bhatt** from Canonical's Ceph Engineering Team let his attendees self-host their S3 (Simple Storage Service) with MicroCeph.

**YouTube links:**

Note that, unfortunately, some sessions are missing and on some there is no audio.

[YouTube channel with the recordings](https://www.youtube.com/@oosc3.0)

- Fri, Sep 5
  - Morning
    - [Plenary](https://www.youtube.com/watch?v=NAamSJlVTEc)
    - [Breakout](https://www.youtube.com/watch?v=yYlUykpM_mY)
  - Afternoon
    - [Plenary](https://www.youtube.com/watch?v=4c74PmjMKEc)
    - [Breakout](https://www.youtube.com/watch?v=qt3-3FkPqQ8)
    - [Workshops](https://www.youtube.com/watch?v=W_IVXvemjfc)
- Sat, Sep 6
  - Morning
    - [Plenary](https://www.youtube.com/watch?v=lfpWgYrUBpE)
    - [Breakout](https://www.youtube.com/watch?v=DFtB1jT57vg)
    - [Workshops](https://www.youtube.com/watch?v=BWnFRI_UEu4)
  - Afternoon
    - [Plenary](https://www.youtube.com/watch?v=zlDRpwozmB4)
    - [Breakout](https://www.youtube.com/watch?v=15XssP0m7xw)
    - [Workshops](https://www.youtube.com/watch?v=NUpPZ3K7b7s)

## The Resonance

After the event it was talked a lot about it and organizers and speakers got a lot of kudos, especially on LinkedIn. Most mentioned and cited persons in the reactions were me, **Aveek Basu**, **Akarshan Kapoor**, **Ayush Ghai**, **Mikhail Novosyolov**, **Neeraj Poddar**, **Mohammed Imaduddin**, **Utkarsh Bhatt**

**LinkedIn**

There are many more posts related to the OOSC 3.0 on LinkedIn. I am just listing the most interesting ones.

- [Aveek Basu](https://www.linkedin.com/posts/basuaveek_opportunity-open-source-30-oosc-has-ugcPost-7375926734631841793-RDKb): "What started in 2023 as a small student meetup at IIT Mandi has now grown into a vibrant community — with the 2024 and 2025 editions hosted at IIT Kanpur." (10 photos, 87 reactions, 2 comments, 2 reposts)
- [Akarshan Kapoor](https://www.linkedin.com/posts/akarshan111_opensource-india-zephyrrtos-ugcPost-7376567570348498944-FjfC): "If you weren’t living in a cave, you have probably already seen my name pop up on your feed lately" (8 photos, 193 reactions, 12 comments, 4 reposts)
- [Akarshan Kapoor](https://www.linkedin.com/posts/akarshan111_ubuconasia2025-opensource-community-ugcPost-7378523739967143936-krEw): "GitHub doesn’t build communities. People do.", "Code changes fast. Communities last." (9 photos, 176 reactions, 17 comments, 10 reposts)
- [Shrishti Gaikwad](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_iitkanpur-opensource-ubuntucore-activity-7372000780825821184-G_Hj) has praised me and my sessions a lot! (1 photo, 99 reactions)
- [Shrishti Gaikwad](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_iitkanpur-opensource-zephyrrtos-ugcPost-7372190211037966337-xGCb) has also praised Akarshan and his 2 sessions as well (4 photos, 85 reactions, 2 comments)
- [Shrishti Gaikwad](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_iitkanpur-oosc2025-conference-activity-7368006324191686656-ORjJ) was selected as the media and publicity partner of the OOSC by the local organizers, probably therefore she wrote in more detail about some important speakers and sessions, also about [Ayush Ghai](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_iitkanpur-opensource-softwaredevelopment-activity-7372010088200318976-KaR6), [Utkarsh Bhatt](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_microceph-ceph-opensource-activity-7372204333930717185-tgJz), and [Sagar Sundaray/Swaraj Pande](https://www.linkedin.com/posts/shrishti-gaikwad-330a09279_iitkanpur-automotiveai-redhat-activity-7379494733817012225-4DCF).
- [Yash Mishra](https://www.linkedin.com/posts/yash-mishra-539807190_deeplearning-oosc3-iitkanpur-activity-7371367076252348416-E9VP)  presented his research on Deep Learning (1 photo, 22 reactions)
- [Ayush Ghai](https://www.linkedin.com/posts/ayushghai_life-tech-ai-ugcPost-7371100781686501377-XBfg) about the LinkedIn reactions on his sessions (4 photos, 72 reactions, 3 comments, 2 reposts)
- [Prajwal Kumar K](https://www.linkedin.com/posts/prajwal-kumar-k-632411307_opensource-ugcPost-7374800977947713536-umXQ) (6 photos, 142 reactions, 12 comments)
- [Varun Khandelwal](https://www.linkedin.com/posts/varun-khandelwal-539535321_oosc-iitkanpur-opensource-ugcPost-7374767897954594816-TtEu): "From the moment I entered the IITK campus, it felt surreal" (4 photos, 51 reactions, 2 comments)
- [Diksha Parulekar](https://www.linkedin.com/posts/diksha-parulekar-a949282a2_opensource-linuxfoundation-iitkanpur-ugcPost-7373790173412605952-bCJL): "Some highlights that stayed with me:
Till Kamppeter (Leader OpenPrinting, Linux Foundation Fellow)
 Showed how even small experiments, done consistently, can grow into impactful contributions and meaningful open-source careers. His journey proved persistence matters more than perfection when starting out. ..." (10 photos, 87 reactions, 2 comments, 2 reposts)
 - [Gauri Singh](https://www.linkedin.com/posts/gauri-singh07_tech-oosc-iitkanpur-ugcPost-7373041848589832192-iV0c): "WHAT.AN.EXPERIENCE!!", "Till Kamppeter – The Linux Printing Wizard and Project Lead at OpenPrinting. His insights? Next level." (4 photos, 74 reactions, 6 comments, 1 repost)
 - [Mohammed Imaduddin](https://www.linkedin.com/posts/mdimado_last-week-i-flew-to-kanpur-to-be-part-of-ugcPost-7372011140295348225-QP8e) about his sessions about his GSoC work with OSS-Fuzz (5 photos, 201 reactions, 3 comments)
 - [Sumanto Kar](https://www.linkedin.com/posts/sumanto-kar-0424391a9_open-source-eda-ugcPost-7371162836460359680-5MHp) about his talks about eSim (4 photos, 196 reactions, 12 comments, 6 reposts)
 - [Aakarsh Gupta](https://www.linkedin.com/posts/aakarsh-gupta-446b63290_opensource-oosc3-iitkanpur-ugcPost-7371264503000297472-ibbM) from the Jaipur Engineering College and Research Centre (JECRC, where UbuCon Asia 2024 took place, good candidate for OOSC 4.0) (7 photos, 63 reactions, 5 comments, 2 reposts)
 - [Owais Tabrez](https://www.linkedin.com/posts/owais-tabrez-751b11376_oosc2025-opensource-linux-ugcPost-7371527422602735616-qyPX): "Open source isn’t just about code — it’s about community, collaboration, and shaping the future of technology." (5 photos, 36 reactions, 1 comment)
 - [Lucky Tiwari](https://www.linkedin.com/posts/tiwarilucky_iitkanpur-hackathon-opensource-ugcPost-7372538592893759488-GDB-) about meeting me and many others on the conference dinner (5 photos, 29 reactions)
 - [Ansh Goel](https://www.linkedin.com/posts/anshgoel1_oosc3-oosc3-iitkanpur-ugcPost-7370408154851033088-5gTq) Tells about his hackathon experience, nearly quit early, but ... (7 photos, 42 reactions)
 - [Vedika Chaudhary](https://www.linkedin.com/posts/vedika-chaudhary-56552630b_opensource-linuxfoundation-canonical-ugcPost-7373696744439656448-Z9Wo) and [Abhishek Sharma](https://www.linkedin.com/posts/abhishek-sharma-525a92233_opensource-linuxfoundation-canonical-ugcPost-7373703182096637952-s40j), posting on LinkedIn is not a college exam, so please do not copy from each other. But Abhishek, you won with 107 reactions and 4 comments against Vedika's 31 reactions ...

**Some other sites**

- [Best Sensor](https://www.bestsensor.de/en/post/opportunity-open-source-conference-in-india-2025)
- [Zephyr Project](https://www.zephyrproject.org/zephyr-project-at-opportunity-open-source-conference-3-0/)

**Photos**

- [Coverage-OOSC (Google album)](https://photos.app.goo.gl/rrFnKSX2NnVL8w9x6)


## Opportunity Open Source 2026 - Call for Locations

After 3 successful Opportunity Open Source conferences we want to continue, and so we want to do an Opportunity Open Source 4.0 in 2026, most probably around the same date as this year but we are open for different dates.

As we want to reach young people and students to present to them what FOSS is and how they can participate and contribute, we want to run it in a city in India where there are several universities and colleges with undergraduate programs in engineering and especially computer science. The actual venue in that city is ideally a university or college with strong engagement in FOSS.

Also important is that we, Aveek and me, cannot organize the whole conference remotely. We need an enthusiastic team of local organizers at venue. Their task is to negotiate with the administration to get all the needed local resources, as conference rooms (lecture halls, class rooms), and accommodation in gust houses and dorms, to get the needed permissions from the local government, find local sponsors, ...

Right before and during the event the local organizers need to make sure that everything is going smoothly. A/V in the rooms needs to get tested, volunteers have to be lined up to make up the crew for each room and also to prepare things like decoration, booth space, front desk, ..., accommodation needs to get reserved, ...

So if you are interested, please discuss it in your university or college, and contact Aveek and me to show your interest and get your questions answered. More detailed instructions for applying will come soon.


## Thank you

Thanks a lot to the local organizers **Sanskar Yaduka**, **Shreya Shree**, and all the volunteers who joined. Especially also thanks to **Akarshan Kapoor** for helping with the last-minute schedule adjustment and announcements of sessions on Telegram.

Also thanks a lot to the speakers: **Aveek Basu**, **Akarshan Kapoor**, **Alexander Pevzner**, **Sanskar Yaduka**, **Mohammed Imaduddin**, **Francis Steen**, **Prof. Mark Turner**, **Neeraj Poddar**, **Saiyam Pathak**, **Oliver Völckers**, **Sumanto Kar**, **Mikhail Novosyolov**, **Sagar Sundaray**, **Swaraj Pande**, **Utkarsh Bhatt**, **Ayush Ghai**, **Abhishek Kumar**, **Shuah Khan**, **Bhavanishankar Ravindra (Bhavi)**, **Divy Srivastava**, **Akash Sankaranarayanan**, **Nikitha Dhanabal**, **Jiongchi Yu**, **Priyam Chakraborty**, **Prof. Suman Chakraborty**, **Manuel Haro**, **Yash Mishra**, **Jayanth Tatineni**, **Aishwarya Sinha**, **Varad Patil**, **Shanthi Priya**, **Prof. Kannan M. Moudgalya**, **Manvith Kumar**, **Prajwal Kumar Karnad**, **Shaun Sebastian**, **Saquib Akhtar**, **Adlair Cerecedo-Mendez**, **Aditya Bhattacharya**, **Rudra Mani Upadhyay**, **Myo Thinzar Kyaw**, **Arjun Kumar Manav**, **Paritoshik Paul**, **Hardik Jinda**, **Abelardo Valdez Poot**, **Anmol Sharma**, **Siddharth Bhat**, **Lakshay Bandlish**, **Vidushi Sharma**, **Diptangshu Dey**, **Aaryan Khandelwal**, **Pavan Kumar Kondeti**, **Viswanath Kraleti** 

And also thanks to the sponsors and to the IIT Kanpur!

And especially thanks to **Canonical** for funding my trip, and also to **Mauro Gaspari** and **Gemma Mulcahy** for making this going smoothly and helping quickly where needed.

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


