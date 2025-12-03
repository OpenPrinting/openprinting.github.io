---
title: OpenPrinting News - UbuCon Asia 2025 in Kathmandu, Nepal
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Organized by the Ubuntu and GNOME communities of Nepal
---
**UPDATE: Links to session recordings on YouTube added**

**[Playlist of all currently available recordings](https://www.youtube.com/playlist?list=PLr8g8zdbZAgGNzweq3NGgwLmruBIA2QBw)**


## Why attending a conference in Nepal?
This year we have done the [third Opportunity Open Source](https://oosc.org.in/) in India, and originally having planned to co-host the first [UbuCon India](https://events.canonical.com/event/136/overview) with it we had settled it on the weekend right after this year's [UbuCon Asia](https://2025.ubucon.asia/) which has taken place on August 30-31 in Kathmandu in the neighboring country Nepal, to make it possible that speakers could be on both events with only one round trip.

But even with the co-hosting not having worked out, and also with my talks already being accepted, I have done this round trip and attended UbuCon Asia before running the Opportunity Open Source 3.x in the IIT Kanpur in India.


## Arriving in Nepal
My trip from Vienna to Kathmandu went through the beautiful Doha Airport in Qatar, via Qatar Airways. With 2 ~5-hour flights with a meal ~2 hours into each flight and the stop-over in the middle of the night I had not much sleep when I arrived in the morning of Friday, August 29, the day before the conference started.

After landing and going through immigration (was quick as I already applied for my tourist visa online before traveling) I met **Mauro Gaspari** (Ubuntu Community Team at Canonical) and **Dimple Kuriakose** (Technical author at Canonical) at the baggage claim and we shared a taxi to the hotel.

The hotel was in the Thamel district. There are many streets with small stores selling handcrafts and souvenirs and there I bought some stuff for my wife.

In the evening I met [**Soumyadeep Ghosh**](/OpenPrinting-News-August-2024/#soumyadeep-ghosh) ([Snapcrafters](http://snapcrafters.org/)) and talked with him about [his GSoC project](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#porting-pycups-to-cups-3x-api-and-implementing-it-in-system-config-printer-by-soumyadeep-ghosh) ([Blog](https://soumyadghosh.github.io/website/)) of Python bindings for [libcups3](https://github.com/OpenPrinting/libcups) and he brought in the idea of creating programming-language-independent APIs for printing and also of oxidizing (converting to Rust) libcups and CUPS as future work at OpenPrinting. I told him that for oxidizing on one side we will have a lot of work and the risk to introduce new bugs but on the other side we have rather low coverage with fuzz-testing the C code, so replacing it my memory-safe Rust could be the better solution.


## Day 1
On Saturday, August 30, the UbuCon started. Arriving at the venue one saw a long line of people waiting. It was for the registration desk in front of the building, for the more than 300 people just attending the conference, but not giving a talk or a workshop. Speakers got shown a hidden room inside the building where they could pick up their badges. The organizers (a sponsor?) provided us with highly sophisticated all-plastic badges, which were not that easy to assemble, especially removing the protective plastic film. But this way the sponsors assure that, if a badge gets into the environment, their logos will still be seen in centuries ...

After the introduction from the organizers the first session was the keynote presentation by **Dimple Kuriakose**, ["Confidential Computing Demystified: An in-depth look into CVMs"](https://events.canonical.com/event/127/contributions/649/) ([Slides](https://events.canonical.com/event/127/contributions/649/attachments/416/670/Confidential%20Computing%20Demystified%2006.pdf), [Video](https://www.youtube.com/watch?v=krzexdI2Cow)), explaining all the measures in the Ubuntu operating system to keep the system secure and protect the data and privacy of the users.

And since the [Ubuntu Summit 2022](/OpenPrinting-News-November-2022/#the-first-ubuntu-summit-was-a-success) there is practically no conference any more without workshops, and the first workshop this time was ["Crafting snaps quickstart guide 101"](https://events.canonical.com/event/127/contributions/650/) ([Slides](https://events.canonical.com/event/127/contributions/650/attachments/399/643/Snap%20quickstart%20workshop.pdf), [Exercises](https://github.com/snapcrafters/snap-quickstart-workshop?tab=readme-ov-file#snap-quickstart-workshop), [Video](https://www.youtube.com/watch?v=ZUNsGWiIRLw)), by **Soumyadeep Ghosh** and **me**. The room was nearly full, showing that there are many people interested in packaging applications in the Snap format. In total there were 6 workshops throughout the 2 days: Snap, LXD, AppArmor, Local AI/LLMs, Documentation on GIT, and air-gapped Ubuntu.

There was lunch in the cafeteria of the college, free of charge for speakers and included in the conference fee for general attendees. Organizers redirected speakers to early and late hours during the lunch break for them to avoid long waiting lines.

In the afternoon **Akarshan Kapoor**, GSoC contributor for OpenPrinting in [2023](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) and [2024](https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc) presented his GSoC work in the talk ["Scaniverse Universal Scanner Drivers: One Solution for Every Distro"](https://events.canonical.com/event/127/contributions/664/) ([Slides](https://docs.google.com/presentation/d/1OfvKXLbVarYXB7Pv2_79iEG3t_tj6ElujyesAAJGMcQ/edit?usp=sharing)).

My second time on the stage was also on the first day. I have participated in the panel session ["Growing Ubuntu and FOSS Community - and yourself, Locally and Globally"](https://events.canonical.com/event/127/contributions/676/) ([Video](https://www.youtube.com/watch?v=vmD-qjWWK9E)), hosted by **Yush Pokharel** and with **Aryan Kaushik**, **Rashika Karki**, and me as guests. Everyone told here about the creation of their projects and building their communities, and the audience could ask questions afterwards.


## Day 2
The second day, Sunday, August 31, started for me with the exhibition area. Despite being the rainy season in South Asia, the booths were set up on an open-air space, each of them was at least under a tent to protect them from rain.

Especially I visited the [DeepComputing](https://deepcomputing.io/) booth, in the hope to meet founder **Yuning Liang**, but he was not there. I also wanted to try out the second-gen RISC-V motherboard for Framework laptops, but due to my visit right in the beginning of the conference day the electric cables were not yet set up (they had to be removed during the night because of the rain) and so they had no working machine.

After that I went to the Ubuntu booth to meet some former colleagues and friends, **Mauro Gaspari**, **Andreia Velasco**, and others. As this event is an UbuCon, the Ubuntu booth was not in the outdoor space but right in front of the door of the main lecture hall, where the plenary sessions were taking place.

In the afternoon I attended **Graham Morrison**'s workshop ["Open Documentation Academy Live: Make your first open source contribution"](https://events.canonical.com/event/127/contributions/656/) ([Slides](https://events.canonical.com/event/127/contributions/656/attachments/418/675/CODA%20UbuCon%20Asia%202025.pdf), [Video](https://www.youtube.com/watch?v=QpOjiQ3Or7g)) which was about documentation and managing it in GIT repositories, to get ideas to handle documentation at OpenPrinting.

The last talk I attended on this UbuCon was ["How to build a sustainable Open Source company"](https://events.canonical.com/event/127/contributions/678/) ([Video](https://www.youtube.com/watch?v=bcMHz8U0P2I)) by **Frank Karlitschek**, creator and founder of [NextCloud](https://nextcloud.com/). This was interesting for me and OpenPrinting for two reasons, once, for the economical aspect how Nextcloud earns money, and second because of Nextcloud itself, as I am also thinking about having it on a server of OpenPrinting, for collaborative office document work, video meetings, conference streaming, download management, ...

In the end of Frank's talk, when it came to the Q&A I asked him ([In the video, at 27:30 min](https://youtu.be/bcMHz8U0P2I?t=1650)):

> When you put AI on your own server, where does that AI get its training data? Especially because the commercial ones go through the whole internet, breaking copyright ...

As answer He told more or less that for things like face recognition there are materials under Creative Commons license but for actual LLMs you can only get the mentioned copyright-infringing bad data from others.

What I missed during the day was a printing incident in the exhibition space. **Yeonguk Choo** from the Ubuntu Korea LoCo (Local Community) has, inspired by a photo booth on the [Ubuntu Summit 2023 in Riga](/OpenPrinting-News-November-2023/#ubuntu-summit-2023-in-riga), created his own photo booth based on Ubuntu and free software, Ubu4Cut and deployed it for the first time on the UbuCon Korea. Then he [brought it to this year's UbuCon Asia](https://discourse.ubuntu.com/t/66806).

On the first day Ubu4Cut behaved well and many attendees lined up for taking photos to take home as souvenir, but on the second day, at some hour in the morning, the photo printer (some Canon Selphy device) stopped working. **Youngbin Han**, lead of the global organization of the UbuCon Asia conferences and lead of the Ubuntu Korea LoCo, was there and directly messaged me on both Matrix and Telegram, but I must have been busy with something and so I did not see the messages, sorry. But, fortunately, I have built a nice team at OpenPrinting, with the help of the Google Summer of Code, and so **Akarshan Kapoor**, one of our most amazing team members, who was at the booth at that time, solved the problem. **Thanks a lot, Akarshan, for helping to make printing just work everywhere!**

The conference ended with a closing ceremony where all the speakers, sponsor representatives, and organizers were called onto the stage, one by one to receive their tokens of appreciation.

After that we have taken a group photo and then headed to the venue of the conference dinner, hosted by one of the event's sponsors, [Programiz](https://www.programiz.com/). The place was beautiful and the food delicious, a great night to network with the speakers and the sponsors.


## The day trip
And that was not the end. On Monday, September 1, there was another opportunity to socialize with the conference participants and also to see a bit of the beautiful Nepal. In the morning we were taken by bus to [Bhaktapur](https://en.wikipedia.org/wiki/Bhaktapur), to visit the palace and the museum there and after lunch our bus took us up the mountains, to [Nagarkot](https://en.wikipedia.org/wiki/Nagarkot), where we crossed a long suspension bridge over a deep valley and we also got to a viewpoint where we were supposed to see the Mount Everest and other 8000+-meters mountains, but unfortunately, we did not have a clear that day ...


## And off to India ...
Next day, Tuesday, September 2, I had to say good bye to Nepal as the next adventure, the Opportunity Open Source 3.0 in India, in the IIT Kanpur was approaching ...


## Thank you
Thanks a lot to the global and local organizers **Youngbin Han**, **Khairul Aizat Kamarudzzaman (fenris)**, **Muhd Syazwan Md Khusaini**, **Rj Hsiao**, **Aryan Kaushik**, **Aaditya Singh**, **Sailesh Singh**, and **Utsav Bhattarai**.

Also thanks a lot to the speakers: **Dimple Kuriakose**, **Soumyadeep Ghosh**, **Akarshan Kapoor**, **Yush Pokharel**, **Aryan Kaushik**, **Rashika Karki**, **Mauro Gaspari**, **Andreia Velasco**, **Graham Morrison**, **Frank Karlitschek**, and to the many others whose talks I have missed ...

And also to the sponsors and to St. Xavier’s College!

And especially thanks to **Canonical** for funding my trip, and also to **Mauro Gaspari** and **Gemma Mulcahy** for making this going smoothly and helping quickly where needed.

**I hope to see you all again, perhaps in [Malaysia](https://discourse.ubuntu.com/t/67058) ...**


## Links
- [UbuCon Asia 2025 web site](https://2025.ubucon.asia/)
- [Photos from the community](https://photos.app.goo.gl/H8pZBLKDz2CgASnJ8)
- [Schedules](https://events.canonical.com/event/127/timetable/?layout=room)
- [Ubuntu Discourse post from Youngbin Han](https://discourse.ubuntu.com/t/66637/)
- [Ubuntu Discourse post from Aryan Kaushik](https://discourse.ubuntu.com/t/66793/)
- [Ubuntu Discourse post from Yeonguk Choo](https://discourse.ubuntu.com/t/66806)


**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


