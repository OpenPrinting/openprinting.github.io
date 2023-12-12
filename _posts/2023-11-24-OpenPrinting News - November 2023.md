---
title: OpenPrinting News - November 2023
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Ubuntu Summit 2023 in Riga, FOSDEM 2024, GSoC 2024, GSoC 2023, Snap workshops, CPDB CUPS backend Snap, PAPPL 1.4.3
---
Probably most of you have made their first desktop computer experience with Windows, and later on started working with a Linux desktop system. Many of your daily tasks which you formerly did under Windows you are doing under Linux now. Some work great, for others you wish your Windows back ...

But having a look at this (stone-old, from Dec 2021) [Linus Tech Tips video](https://www.youtube.com/watch?v=TtsglXhbxno) and especially [Michael Tunnell's reaction video](https://www.youtube.com/watch?v=sc0B_ckmGwQ), printing is not the part where one wants to have Windows back. At [3:00 min](https://www.youtube.com/watch?v=sc0B_ckmGwQ&t=180s) Michael says

> There is no such thing like a pain-free experience of printing under Windows ... Linux printing is ridiculously good ...

and at [14:25-17:25 min](https://www.youtube.com/watch?v=sc0B_ckmGwQ&t=865s) we get the confirmation that one can effortlessly print even with an oooold, non-driverless Samsung CPL-something ...

Thanks Michael, I am looking forward to our Destination Linux episode ...

But there is more on YouTube, this time on Ubuntu OnAir. After the Ubuntu Summit I have stayed in Riga for one more week, for Canonical's internal Engineering Sprint where all the engineers of Canonical, around ~700 people currently, meet twice a year, near the beginning of each Ubuntu development cycle. In addition to meetings inside and across the teams there are also lightning talks and workshops open for everyone on the Sprint.

I have given two sessions this time, both not containing anything Canonical-confidential and so I got the permission to publish the recordings on Ubuntu OnAir. Here we go:

1. [Lightning talk: Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!](https://www.youtube.com/watch?v=Kf2V9xpLXHo)
2. [Interactive workshop: Your app everywhere, just in a Snap!](https://www.youtube.com/watch?v=jNG8m9hesEU)

And last but not least, we have a nice video of the Ubuntu Summit 2022 in Prague, the [Aftermovie](https://www.youtube.com/watch?v=8XF6jR7XzXM), published shortly before this year's Summit as motivation to attend.

And we have good news for users of NixOS: Now [Snap is supported](https://ubuntu.social/@wimpy@fosstodon.org/111445120304302493) and so you cannot only install many application Snaps from the Snap Store but also our [Printer Application Snaps](https://snapcraft.io/publisher/openprinting) to make all those ~10000 non-driverless legacy printers which are already working with common classic Linux distributions also just work with NixOS.

And everyone is providing an advent calendar these days, unfortunately we did not make one at OpenPrinting, but there is one from the Ubuntu Summit 2023! See below ...

So let us dive into what happened at OpenPrinting in November ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**


## Ubuntu Summit 2023 in Riga
**Recordings from the plenary room: [Day 1, part 1](https://www.youtube.com/watch?v=mem7_kIG8NM), [Day 1, part 2](https://www.youtube.com/watch?v=YH5Sub7bgIc), [Day 2](https://www.youtube.com/watch?v=cXxlFWGAelc), [Day 3](https://www.youtube.com/watch?v=XIGxKyekvBQ)**

**And here is the Ubuntu Summit Advent Calendar: Recordings of the individual sessions in all rooms will be posted from today on until the end of this year on the [Ubuntu Summit 2023 playlist](https://www.youtube.com/playlist?list=PL-qBHd6_LXWZqbxr3542fZs_IMn0gAb2B) on Ubuntu OnAir. Open 3 new videos every day (workshops on Wednesdays) for the coming 30 days. They are all edited by a professional editing team.**

**Mastodon: [#UbuntuSummit](https://ubuntu.social/tags/UbuntuSummit), [#UbuntuSummit2023](https://ubuntu.social/tags/UbuntuSummit2023)**

Now it has taken place, the second [Ubuntu Summit](https://events.canonical.com/event/31/), this year in Riga in Latvia, and we in the organization team are already making our first thoughts on the third one ...

Two and a half days of [amazing sessions](https://events.canonical.com/event/31/ngtimetable/) in 5 rooms in parallel. The speakers on this second edition were less Canonical employees but more people from the wider community, and not exactly an Ubuntu Summit but more a Summit about Linux and free software in general.

**Sessions**

Still making well use of the hallway track I succeeded to attend many sessions, most of those I originally planned to attend and [listed last month here](/OpenPrinting-News-October-2023/#ubuntu-summit-2023-in-riga):
- [**Welcome to the Ubuntu Summit**](https://events.canonical.com/event/31/contributions/247/), Philipp Kewisch (Head of Community Team, Canonical), Mark Shuttleworth (Founder and CEO, Canonical), Nathan Haines (Ubuntu Community Council), Fri 11/3, 14:00 EET ([video](https://www.youtube.com/watch?v=NAyvd1o3ono))
- [**From origins to open source: The journey of DreamWorks Animation's production path tracer, MoonRay**](https://events.canonical.com/event/31/contributions/218/), Randy Packer (DreamWorks Animation), Fri 11/3, 15:00 EET ([video](https://www.youtube.com/watch?v=MariNCKIXCs)): Amazing presentation, with sample movie in the following break.
- [**Introducing Ubuntu Core Desktop**](https://events.canonical.com/event/31/contributions/246/), Ken Vandine (Core Desktop development lead, Canonical), Oliver Smith (Product Manager Desktop, Canonical), Fri 11/3, 16:30 EET ([video](https://www.youtube.com/watch?v=ahWrhnjjYDk)): Nice overview of the state of the art of the development of Ubuntu Core Desktop, and [Ken shouted me out](https://www.youtube.com/watch?v=ahWrhnjjYDk&t=681s) when it came to the printing part, I got up and the audience applauded ... I have also answered the first user comment on the YouTube video of the recording.
- [**Alioli ROV Submarine Drone**](https://events.canonical.com/event/31/contributions/200/), Juanmi Taboada, 11/3, Fri 17:00 EET ([video](https://www.youtube.com/watch?v=DijQAhQcjiQ)): How a remote-controlled submarine to explore and photograph potential SCUBA diving sites was developed and all being controlled with free software. And the next day there came the surprise event: We all could test-d(r)ive it in the hotel's pool (only 1.30 m deep, so no risk to implode it) ...
- [**What It's Like to Build an Open, Repairable Laptop**](https://events.canonical.com/event/31/contributions/178/), Daniel Schaefer (Framework Computer), Sat 11/4, 9:00 EET ([video](https://www.youtube.com/watch?v=W8IAszo8SjM)): We are sustainable! Last year we have recycled old printers and this year we have easily repairable and practically arbitrarily upgradable laptops on the Summit. I also had a hallway session with Daniel afterwards and he was demonstrating how easily hardware components could get changed.
- [**Windows Subsystem for Linux (WSL) - Make an awesome Linux environment directly on Windows**](https://events.canonical.com/event/31/contributions/185/), Craig Loewen (Microsoft), Sat 11/4, 9:30 EET ([video](https://www.youtube.com/watch?v=QkA9zLm17bs))
- [**Improving Snap maintenance: Automating tag updates on new upstream releases of the app - Interactive workshop**](https://events.canonical.com/event/31/contributions/217/), Till Kamppeter (Canonical/OpenPrinting), Jesús Soto (Canonical), Sat 11/4, 12:00 EET: My workshop about Snap update automation. Also Sergio Costas and Ken VanDine, both passionate snappers in the Ubuntu Desktop Team at Canonical, and Sergio having worked together with Heather Ellsworth on the [automation method](https://ubuntu.com/blog/improving-snap-maintenance-with-automation) I have presented in this workshop, were in the room in case people need help on the exercises.
- [**Container craftsmanship: from a Pebble to a ROCK - Interactive Workshop**](https://events.canonical.com/event/31/contributions/228/), Cristovão Cordeiro (Canonical), Sat 11/4, 14:00 EET ([video](https://www.youtube.com/watch?v=BDXZxp3aFBY)): Right after my workshop there was a workshop for snapcraft-experienced snappers to learn packaging apps in OCI containers using rockcraft. I attended it as this could be a way to create an official OCI container of CUPS, based on the CUPS Snap. And the way how upstream software components are loaded for the container build is exactly the same as with snapcraft, so applying [update automation](https://ubuntu.com/blog/improving-snap-maintenance-with-automation) here would require only modifying a few lines.
- [**Skynet or Star Trek, what’s the future of AI? - Panel session**](https://events.canonical.com/event/31/contributions/266/), Graham Morrison (host, Canonical), Andreea Munteanu (Canonical), Craig Loewen (Microsoft), Frank Karlitschek (Nextcloud), Juan Luis Cano Rodríguez (QuantumBlack, AI by McKinsey), Pablo Ruiz-Múzquiz (Kaleidos/Penpot), Sun 11/5, 9:00 EET ([video](https://www.youtube.com/watch?v=tKZ4s-Q5hsQ))
- [**ScaniVerse: A New Horizon in Unified Scanning for Linux Systems**](https://events.canonical.com/event/31/contributions/192/) Akarshan Kapoor (Indian Institute of Technology, Mandi, India), Sun 11/5, 11:30 EET: Akarshan presenting [his GSoC work](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) of this year in his own, special style. I have been in his talk especially also to help answering questions.
- [**Bringing Windows applications to Linux app stores**](https://events.canonical.com/event/31/contributions/240/), Merlijn Sebrechts (Ubuntu Community Council, Snapcrafters), Sun 11/5, 12:00 EET: WINE allows to run many Windows apps under Linux but needs some configuration and setup work. To make it easy for end users to simply grab Windows apps in the Snap Store, there is Sommelier, which this talk was about.
- [**Behind the Scenes of tox: The Journey of Rewriting a Python Tool with Over 10 Million Monthly Downloads**](https://events.canonical.com/event/31/contributions/272/), Jürgen Gmach (Canonical), Sun 11/5, 14:30 EET: Jürgen is nearly as long into free software as me, I started with SUSE 5.1 in 1997, he two years later with SUSE 7.0.
- [**Linux Lads live podcast recording**](https://events.canonical.com/event/31/contributions/357/), Shane, Mike, Conor, and Amolith (Linux Lads Podcast), Sun 11/5, 16:00 EET: This was great, the [Linux Lads podcast](https://linuxlads.com/) produced live with audience interaction. I have taken a first-class seat (first row), with these signs "content creators only", but hey, this news post is content, and my talks and workshops on conferences, too, and so I was close to them and contributed, now I am eager to see the show getting published for listening ...
- [**Closing Plenary**](https://events.canonical.com/event/31/contributions/248/), Philipp Kewisch (Head of Community Team, Canonical), Sun 11/5, 17:30 EET ([video](https://www.youtube.com/live/XIGxKyekvBQ?si=gvLA_KesCB4QHzIA&t=31230))

**Hallway Track**

But most important of all is the hallway track (including any evening outings, meals, bar hangouts, ...).

For me it started already one day before the official opening of the Summit, as I traveled already on Thursday, the day before the event started, to make sure to be there in time, even if the airline messes up my flight.

I had an early morning flight, directly from Vienna to Riga, and there I met already **Andrei Iosif** of Canonical's Security Team. So this was not actually a hallway session but more an inflight session. We happened to have seats close to each other and swapping with one other passenger we were sitting together. He told me about [Fuzz testing](https://en.wikipedia.org/wiki/Fuzzing), a special method to test software with random input to find crasher bugs, buffer overflows and similar which can cause severe security risks. He introduced me to [Google OSS-Fuzz](https://google.github.io/oss-fuzz/) a free-of-charge service for free software projects and the possibility to fuzz-test OpenPrinting projects.

I arrived in the hotel at lunch time, and so I already attended the hallway track of the last days of Canonical's internal Product/Roadmap Sprint, where Canonical's managers meet twice a year for one week each time. So several colleagues from Canonical I have met already there and this way got more time to meet old and new friends from the community on the actual Summit days.

Thursday evening I finally met with non-Canonical people for the first time on this trip. We had dinner in the old town of Riga, mainly colleagues of Canonical's Desktop Team, like **Ken VanDine**, **Sebastien Bacher**, **Jesús Soto**, **Jean-Baptiste Lallement**, ... also **Jürgen Gmach** of the Launchpad Team, but also several non-Canonical people, as for example **Alan Pope ("Popey")** or **Martin Wimpress ("Wimpy")**.

And on Friday at lunch time, right before the start of the event I met **Akarshan Kapoor**, GSoC contributor on PAPPL Scanning (see below) and **Monica Ayhens-Madon**, formerly in Canonical's Community Team and currently at Thunderbird ([LAS 2022](https://www.youtube.com/watch?v=r5trlMeCQR0), [Ubuntu Indaba](https://www.youtube.com/watch?v=P22DOu_ahBo), [Community Office Hours](https://www.youtube.com/watch?v=diB3wm4HB1Y)). Monica hugged me saying that this is a hug from Heather, and so I hugged her back, telling her to pass this hug back to Heather.

On the event I had several nice hallway sessions:
- **Daniel Schaefer** demonstrating the repairability and upgradeability of Framework laptops, everything held together by magnets and screws which do not fall out when unscrewed, no soldered-in RAM, everything modular to separately exchange and upgrade, even while the machine is turned on and running ...
- **Popey (Alan Pope)** is proudly presenting his Steam Deck running Ubuntu Core Desktop, naturally hanging out a lot with **Ken VanDine** therefore.
- We had a little Raspberry Pi demo table during the whole conference, right in front of the door of the plenary room, with a Pi (4 or 5) connected to a large monitor, a keyboard and a mouse, and different things were shown there: **Ken VanDine** was naturally showing off Ubuntu Core Desktop on the Raspberry Pi 4 (did not work yet on the 5, Ken spent nearly the whole Engineering Sprint in the week afterwards to get this finally going). And our gamers one also found often enough showing off their work on the Pis.
- I met **Diogo Constantino** from the Ubuntu Portugal local community and we exchanged ideas about combining DebConf 2024 and UbuCon 2024, holding both, one after the other in Aveiro in Portugal. Originally DebConf should have taken place in Haifa in Israel, but this got canceled and the Call for Locations re-opened.
- **Noah J. Chelliah** met me on the hallway and asked me for an interview, for his "[Ask Noah](https://podcast.asknoahshow.com/)" podcast. So we immediately went to an unused conference room for a "Noah asks" and we recorded the interview, me telling him about OpenPrinting, how it started and what we are doing. The interview will get put into one of the next shows, but he told that he also interviewed more people, so it can take some weeks until it is my turn (**Update: It will be [episode 368](https://podcast.asknoahshow.com/368) due on Tuesday, December 20, ~11:59pm UTC**).
- **Amolith** (from the [Linux Lads](https://linuxlads.com/)) has created scripting to get informed about new releases of software running on his server, [Willow](https://git.sr.ht/~amolith/willow), and it seems that it covers more types of upstream release notifications than our [Snap update automation](https://ubuntu.com/blog/improving-snap-maintenance-with-automation), so I have a way to improve the Snap automation if needed.
- **Monica Ayhens-Madon** came up with a little penguin which she has bought in the old town of Riga and wants to give it to a good friend who collects penguins (**Update: It is Jill from [Destination Linux](https://tuxdigital.com/podcasts/destination-linux/)**), but first, gave it a tour on the Summit, taking a lot of photos with many interesting people. See her thread on [Mastodon](https://ubuntu.social/@communiteatime@fosstodon.org/111375114801448241) (**Update: The penguin has safely arrived at its Destination (Linux)! Thanks, Mathieu Comandon! [Jill's thread on Mastodon](https://ubuntu.social/@Jill_linuxgirl@mast.linuxgamecast.com/111517576372508507), [Jill's LWDW/linuxgamecast video](https://www.youtube.com/watch?v=wMI2NyIZX7U&t=278s)**).
- When leaving the closing plenary, **Michael Tunnell** from [TuxDigital](https://tuxdigital.com/) and one of the hosts of [Destination Linux](https://tuxdigital.com/podcasts/destination-linux/) grabbed me in the crowd leaving the plenary room and invited me for an interview in one of the next episodes of Destination Linux (**Update: The interview has been produced now and will be on the road as [episode 351](https://tuxdigital.com/podcasts/destination-linux/dl-351/) from Monday, December 18, ~10pm UTC on**).
- And during the closing party I met **Graham Morrison**, master of the Snap/snapcraft documentation at Canonical, and suggested to him to put up all my Snap workshop materials (slides, exercises, video links) onto the [snapcraft.io](https://snapcraft.io/) web site for people to learn Snap or to give the workshops on more conferences, and he liked the idea ... See below.

**Blogs and podcasts**

Naturally there are many content creators, bloggers, podcasters, YouTubers, ... on such an event, and so we already have some nice stuff to read, listen to, and watch (taken from the internal list of the organization team):
- [**Akarshan Kapoor on dev.to**](https://dev.to/kappuccino111)
  + [The Ubuntu Summit 2023](https://dev.to/kappuccino111/the-ubuntu-summit-2023-1gk3): Akarshan Kapoor, excellent GSoC contributor on scanning support in PAPPL this year and co-organizer of the Opportunity Open Source, attended the Summit and presented [his GSoC work](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci), and wrote a great blog article about the Summit, starting with his [talk](https://events.canonical.com/event/31/contributions/192/) getting accepted, his travel to Riga, the people he met, ... he has really amazed us with this blog in his special style. I have left a nice comment on it, also to give readers a background about the great things which Akarshan did.
- [**Alan Pope Blog**](https://popey.com/blog/)
  + [Heading to Ubuntu Summit 2023](https://popey.com/blog/2023/11/heading-to-ubuntu-summit-2023/): Alan Pope ("Popey") announcing that he will attend the Summit. He also tells about what the former Ubuntu Developer Summits were and what the Ubuntu Summit 2022 was.
  + [Ubuntu Summit 2023 was a success](https://popey.com/blog/2023/11/ubuntu-summit-2023-was-a-success/): Popey's report from the Summit. He speaks positively about many aspects of the Summit, especially the organization, the choice of talks, the hallway track, Raspberry Pi vs. games and Ubuntu Core Desktop, gaming night.
  + [Ubuntu Core Snapdeck](https://popey.com/blog/2023/11/ubuntu-core-snapdeck/): Popey tells about Ubuntu Core Desktop running on his Steam Deck, what he was proudly presenting on the hallway track of the Summit.
- [**The Register**](https://www.theregister.com/)
  + [Canonical shows how to use Snaps without the Snap Store - Despite what you may have heard, it's not as proprietary as the trolls think](https://www.theregister.com/2023/11/10/snap_without_ubuntu_tools/): Our special vulture, Liam Proven, talked with Igor Ljubuncic about Snap and the Snap Store and how to install Snaps without Canonical's Snap Store. Near the end he gives examples how Canonical is publishing how Snap works and how to use it, including a link to my workshop about Snap update automation.
  + [Ubuntu for Arm64 laptops (plus RISC kit) - Did you know there's an Asahi flavored Ubuntu? And Debian, too](https://www.theregister.com/2023/11/13/ubuntu_for_arm64_laptops/): Here the vulture writes about the talks about Ubuntu on non-amd64 platforms, Arm, Apple silicon (Asahi), RISC-V, ...
  + [Canonical reveals more details about Ubuntu Core Desktop - This new entrant in the immutable space is not a replacement for ordinary Ubuntu](https://www.theregister.com/2023/11/08/ubuntu_core_desktop_details/): And the vulture has also attended Oliver's and Ken's talk about Ubuntu Core Desktop and writes about this distro, including Popey's demoing on the Steam Deck in the hallway track.
  + [Ubuntu Budgie switches its approach to Wayland - Elementary OS going full speed ahead, but Parachutist Parakeet considers a new, post-Enlightenment glide path](https://www.theregister.com/2023/11/20/budgie_switches_wayland_approach/): And as last year, the vulture provided us with 4 articles! He met David "Fossfreedom" Mohammed and Sam Lane from Ubuntu Budgie and talked with them about how it will get switched over to Wayland.
- [**Destination Linux Video PodCast**](https://tuxdigital.com/podcasts/destination-linux/)
  + [Episode #346](https://www.youtube.com/watch?v=V6SHIqMnsmw&t=687s): A very good recap of the event, target audience, extra fun activities.
  + [Episode #347](https://www.youtube.com/watch?v=mbg-vCIaSz4&t=585s): Interview with Simon Quigley starts with a very good review of the Ubuntu Summit. Focus on importance on networking, community, and great talks.
- [**Michael Tunnell on YouTube**](https://www.youtube.com/@michael_tunnell/videos)
  + Ubuntu Summit 2023 [Day -1 & 0](https://www.youtube.com/watch?v=PnmeIZJKhw8) [Day 1](https://www.youtube.com/watch?v=XpjEdXj1FFk) [Day 2](https://www.youtube.com/watch?v=bzAHkI-kVak) [Day 3](https://www.youtube.com/watch?v=7slaHFextcc): Michael Tunnell's daily video reports from the Summit
- [**Ask Noah Podcast**](https://podcast.asknoahshow.com/)
  + [Episode #362](https://podcast.asknoahshow.com/362): Noah speaks positively about the Summit and spotlights Rudra and the respectful and empowering community of Ubuntu. Also interviews Jon Seager on a few topics, primarily JuJu.
- [**2.5 Admins Podcast**](https://2.5admins.com/)
  + [Episode #168](https://2.5admins.com/2-5-admins-168/): Jim Salter talks well of the Ubuntu Summit, Jim mentions Canonical looking at the feedback and working hard to make major improvements. Great hallway track, podcasters.

Probably this list will get longer next month.


## FOSDEM 2024
After many, many years I will attend [FOSDEM](https://fosdem.org/2024/) again! The last time I attended it was in the early 2000s [when I worked at MandrakeSoft in Paris](/history/), having only 90 min by train to get there. From Vienna I will have to take a 2-hour flight.

FOSDEM (Free and Open Source DEveloper's Meeting) is a large conference. It is registration-free, anyone can just walk in and attend all the talks. There are more than 8000 visitors to enjoy more than 600 sessions in [36 rooms](https://fosdem.org/2024/schedule/rooms/) in parallel and [~60 non-commercial exhibition booths](https://fosdem.org/2024/news/2023-11-20-accepted-stands-fosdem-2024/).

There are a few rooms for plenary sessions, main track, and lightning talks with the sessions selected by the organizers of FOSDEM itself, but most rooms are the so-called [devrooms](https://fosdem.org/2024/news/2023-11-08-devrooms-announced/). 59 free software community projects selected by a call for proposals for the devrooms have received a devroom and are responsible to fill it with sessions, usually via a [call for proposals for presentations](https://fosdem.org/2024/news/2023-11-20-call-for-presentations/). These calls for proposals are currently open and depending on the devroom will close between Dec 1st and Dec 8.

I have done 6 submissions, all for sessions which I have already given in similar form on other conferences, but I will naturally update them where needed. This is what I have submitted (with links to my most recent versions of these sessions):
- **Desktop Linux, as easy as a smartphone! Just in a Snap!** - Talk telling what Snap and Ubuntu Core Desktop are and how they work
  + 55-min talk in Distributions devroom (already given on [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india), [video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=15854s), [slides](https://events.canonical.com/event/35/contributions/292/attachments/61/104/talk-snap-2023.pdf)).
- **Your app everywhere - Just in a Snap! - Interactive Workshop** - Attendees learn packaging applications as Snaps, with exercises on their own laptops
  + 55-min workshop in Distributions devroom (already given on [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) and Canonical-internal Sprint, [video](https://www.youtube.com/watch?v=jNG8m9hesEU), [slides](https://events.canonical.com/event/35/contributions/291/attachments/60/101/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf)).
- **OpenPrinting - We make printing just work!** - How it all started, what we have achieved, and what we are currently doing
  + 50-min talk in Main Track (already given on [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india), [video](https://www.youtube.com/watch?v=2xY95cIFJxg&t=3120s), [slides](https://events.canonical.com/event/35/contributions/289/attachments/58/94/talk-openprinting-intro.pdf))
- **Save Legacy Printers under Windows with WSL and Printer Applications** - Installing Printer Applications under WSL to support printers where Microsoft or the printer manufacturer do not supply drivers any more
  + 15-min Lightning Talk (already given on [Ubuntu Summit 2022 in Prague](https://youtu.be/ZtY7_fv0vwo?t=1141), [video](https://youtu.be/y7GIiLPjdTk?t=624), [slides](https://events.canonical.com/event/2/contributions/43/attachments/3/4/Save%20Legacy%20Printers%20under%20Windows%20with%20WSL%20and%20Printer%20Applications.pdf))
- **Opportunity Open Source conference in the IIT Mandi, India: Motivating people to be a part of us!** - About the conference I have organized in India to motivate people to join free software
  + 30-min talk in Community devroom (already given on [DebConf 2023 in Kochi, India](https://debconf23.debconf.org/), [video](https://meetings-archive.debian.net/pub/debian-meetings/2023/DebConf23/debconf23-216-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us.av1.webm), [slides](https://salsa.debian.org/debconf-team/public/share/debconf23/-/blob/main/slides/38-opportunity-open-source-conference-in-the-iit-mandi-india-motivating-people-to-be-a-part-of-us/talk-opportunity-open-source.pdf))
  + 15-min (or 5-min) Lightning Talk (already given on Canonical-internal Sprint, [video](https://www.youtube.com/watch?v=Kf2V9xpLXHo))

Most probably not all of these proposals will get accepted, especially the proposal for the workshop in the Distributions devroom is rather experimental, and also if the two sizes of the talk about the Opportunity Open Source get accepted, I will perhaps only give the long version.

## Google Summer of Code 2024
Next year we will have a GSoC again, and this time a very special one, the **20th GSoC!!**

It got [announced](https://opensource.googleblog.com/2023/11/google-summer-of-code-2024-celebrating-20th-year.html) a few weeks ago.

I will participate again with the Linux Foundation and OpenPrinting, there is enough to do ... And we are already starting with finding and selecting contributor candidates.

Potential project ideas are:
- Desktop integration: CPDB support for the print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice
- Desktop Integration: Update system-config-printer for the New Architecture of printing
- Desktop Integration: User interfaces for using OAuth2 with printers and scanners
- CPDB backend for IPP infrastructure/cloud printers
- Turn cups-browsed into a Printer Application

Note that for general acceptance of CUPS 3.x and of the CUPS Snap we need to have a desktop integration for **all** desktops, not only for GNOME.

Suggestions for any further project ideas are more than welcome.

And if you like to be a GSoC contributor next year, please contact me (till AT linux DOT com).


## Google Summer of Code 2023
This year's GSoC came to an end and 4 of our originally 6 GSoC contributors have passed their final evaluations. They did awesome work which brought us a lot closer to have a smooth transition to CUPS 3.x and its PPD-less New Architecture. The projects still need a little work, but the contributors will finish this in their end-of-year breaks.

And here are the final results:

**OpenPrinting: CPDB support for application's print dialogs: Firefox, Chromium, LibreOffice**<BR>
Contributor: Kushagra Sharma<BR>
Mentors: Till Kamppeter, Gaurav Guleria, Shivam Mishra, Rithvik Patibandla, Ira McDonald<BR>
[Work Product](https://github.com/kushagra20251/GSoC/)

PASSED

**Sand-Boxed Scanner Application Framework**<BR>
Contributor: Akarshan Kapoor<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Deepak Patankar, Ira McDonald<BR>
[Work Product](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci)

PASSED

**GNOME Control Center: List and handle IPP print services for the New Architecture**<BR>
Contributor: Mohit Verma<BR>
Mentors: Till Kamppeter, Marek Kašík, Zdenek Dohnal, Rithvik Patibandla, Ira McDonald<BR>
[Work Product](https://github.com/vermamohit13/GSOC-2023)

PASSED

**Continuous Integration: Test Programs for libcupsfilters, libpappl-retrofit, libppd, CPDB, CPDB Libs**<BR>
Contributor: Pratyush Ranjan<BR>
Mentors: Till Kamppeter, Deepak Patankar, Zdenek Dohnal, Ira McDonald<BR>
[Work Product](https://github.com/pranjanpr/GSoC-23)

PASSED

**Native gutenprint Printer Application**<BR>
Contributor: Gayatri Kapse<BR>
Mentors: Till Kamppeter, Rishabh Maheshwari, Zdenek Dohnal, Ira McDonald<BR>
[Work Product](https://github.com/RudraGayu/GSOC-2023.git)

FAILED

**Native gutenprint Printer Application**<BR>
Contributor: Yuvraj Aseri<BR>
Mentors: Till Kamppeter, Solomon Peachy, Rishabh Maheshwari, Chandresh Soni, Ira McDonald<BR>
Failed already on mid-term.

FAILED

Note that Gayatri's original project was "Adding support for the new functionality of IPP Everywhere 2.x to libcupsfilters and CPDB". This project turned out as not feasable and so I moved her to "Native gutenprint Printer Application", after mid-term, the project where Yuvraj failed on.

Our contributors liked a lot to work with OpenPrinting and expressed it in their final evaluations for the mentors:

Kushagra Sharma:

> Thank you for amazing guidance, OpenPrinting is an amazing team and working along side helped me learn a lot , I hope to keep contributing and keep in touch with mentors and fellow contributors

Akarshan Kapoor:

> I express my profound gratitude for the invaluable guidance and unwavering support bestowed upon me by my mentors throughout the duration of the GSoC program. Their exceptional ability to simplify intricate concepts, their constructive critique on my contributions, and their genuine interest in nurturing my growth as a developer have played an instrumental role in making this journey immensely rewarding. The consistent check-ins and their willingness to address any obstacles or concerns that I encountered were particularly commendable. Nevertheless, there were certain instances when I felt slightly overwhelmed by the pace of progress, prompting me to suggest that incorporating more structured milestones or periodic evaluations could prove advantageous in future endeavors. In conclusion, I am profoundly appreciative of the knowledge they shared with me; their mentorship has indubitably left an enduring imprint on my personal and professional development trajectory.
>
> The mentors and the organization I encountered during my participation in GSoC left an indelible impression on me. The level of guidance, support, and communication extended to me was truly unparalleled, resulting in a seamless journey that proved immensely enriching. It became evident early on that their unwavering dedication lay not only in cultivating personal development but also fostering a conducive atmosphere for growth. Without a doubt, the mentorship offered and the program's well-structured framework exceeded all expectations I had harbored prior to embarking upon this endeavor. Consequently, I find myself overwhelmed with gratitude for being granted such an invaluable opportunity

Mohit Verma:

> It was a wonderful expericence to work with OpenPrinting.
>
> I think they (the mentors) are the best out there.

Pratyush Ranjan:

> I am really thankful for the support and response time, Till and Deepak gave me throughout the project.


## Snap workshops
Back in mid-2022 when I joined the organization team of the Ubuntu Summit 2022 in Prague, I had a 3.5-hour 1:1 video call with the leader of the organization team, [Mauro Gaspari](https://discourse.ubuntu.com/t/mauro-gaspari-membership-application/), exchanging ideas of what we can do in this first Ubuntu Summit. And as he brought in that we could do 2-hour interactive workshops where attendees can try out the subject matter on their own laptops, I was immediately sold on that and formed the idea to do a **workshop series on how to package applications as Snaps**. Mauro liked this idea and [I started to work on making it reality](/OpenPrinting-News-November-2022/#the-making-of).

And on the Ubuntu Summit 2022 in Prague, one year ago, [it actually has taken place](/OpenPrinting-News-November-2022/#and-the-conference-finally-started-): One [introduction panel](https://www.youtube.com/watch?v=ido6kGmSHWI) and 5 workshops. All the speakers, including me, have put a lot of effort in designing the workshops and especially also the accompanying examples/exercises. Too much for presenting this only one single time ...

The first workshop, the one to learn the basics, “[Snapping like hell(sworth)](https://events.canonical.com/event/2/contributions/15/)”, originally given by Heather Ellsworth and Lucy Llewellyn, got already re-enacted as "[Snapping with Lucy](https://www.dorscluc.org/sessions/snapping-with-lucy/)" soon after, only by Lucy on the [DORS/CLUC](https://www.dorscluc.org/dors-2023/) in May 2023, in Zagrep, Croatia.

Not actually knowing about Lucy's edition I also formed the idea to give Snap workshops. So I submitted "Snapping like hell(sworth)", renamed to "Your app everywhere, just in a Snap!" (the original name of the whole workshop series) on the [Linux App Summit 2023](/OpenPrinting-News-May-2023/#linux-app-summit-2023) in Brno, the [GUADEC 2023](/OpenPrinting-News-July-2023/) in Riga, and the [Ubuntu Summit 2023](#ubuntu-summit-2023-in-riga) in Riga, the latter 2 together with Heather. Only [on the GUADEC it got accepted](https://events.gnome.org/event/101/contributions/460/), but due to lack of audience I could not actually give it.

But I have also organized my own conference this year, the [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) in the Indian Institute of Technology (IIT) Mandi in northern India. And there, after having done a quick pre-check, finding out that the 3 other employees of Canonical who also attended are interested and so I had an assured base audience, I actually [gave it](https://events.canonical.com/event/35/contributions/291/), but only the first half, as time restrictions only gave me a 60-min slot. I got a total audience of 12, what was very good, probably several got motivated by my [talk introducing into Snap](https://events.canonical.com/event/35/contributions/292/) ([video](https://www.youtube.com/watch?v=Iw4JA3m92Q8&t=15854s), [slides](https://events.canonical.com/event/35/contributions/291/attachments/60/101/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf)).

And finally I got the opportunity to give the workshop ([video](https://www.youtube.com/watch?v=jNG8m9hesEU), [slides](https://events.canonical.com/event/35/contributions/291/attachments/60/101/Workshop%20Your%20app%20everywhere,%20just%20in%20a%20Snap!.pdf)) in its entirety on Canonical's internal Engineering Sprint, which happened in the week after the Ubuntu Summit 2023, also in Riga. Having ~700 engineers from Canonical on the event it was easy to get a significant audience, actually around 25 to 30 people showed up to get great snappers. And as there are only Canonical people, everyone had a suitable Ubuntu version on their laptop where they could install snapcraft and do the exercises. Nobody needed the [virtual machine (~6 GB)](https://drive.google.com/file/d/1kkxZ8GE3_UtG7orl5v2d4x_T4FhMUcbb/view?usp=sharing) which I have prepared already before the GUADEC. And so I found out how long the complete workshop actually takes. I made it in 2:10 hours.

And on the Ubuntu Summit 2023 I actually got accepted for a Snap workshop, but for a more advanced one, "[Improving Snap maintenance: Automating tag updates on new upstream releases of the app](https://events.canonical.com/event/31/contributions/217/)" ([slides](https://events.canonical.com/event/31/contributions/217/attachments/126/198/Workshop%20Automating%20Snap%20updates%20on%20new%20upstream%20releases.pdf)). I originally submitted it together with Heather, who [originally created the update automation](https://ubuntu.com/blog/improving-snap-maintenance-with-automation), but as she left Canonical, she was not on the Summit and I had to replace her by Jesús Soto.

Some people were complaining that we had no beginner's workshop for Snap on this year's Summit. We are looking into fixing this in 2024 ...

So together with the "[Daemon Snapper's Workshop](https://events.canonical.com/event/2/contributions/42/)" ([slides](https://events.canonical.com/event/2/contributions/42/attachments/15/23/Daemon%20Snapper's%20Workshop.pdf)) I have now a repertoire of 3 and I will continue to give them on conferences and Engineering Sprints.

As one can easily also do these workshops by oneself at home, studying the slide decks and trying out the linked examples, I thought that the slides and examples should be made available on a place in the internet where interested people can easily find them. This should be ideally [snapcraft.io](https://snapcraft.io/) as the central place of the official Snap documentation. So I asked Graham Morrison, responsible for the documentation of Snap, whether we could integrate them there, and he agreed. We also plan to put everything onto a GitHub repo of Snap. And, as we started recording workshops on this year's Ubuntu Summit, we will link videos, for now at least of the initial workshop and the workshop about Snap update automation.

And this will not only help to learn snapping, also everyone who likes to give a Snap workshop on a conference by himself could make use of these materials.

Anybody reading here, you do not need to wait for the materials landing on snapcraft.io. Click the links in this section and get a great snapper ... [Snapcrafters](https://github.com/snapcrafters) and many upstream application projects need you ...


## CPDB CUPS backend Snap
On the [snapcraft.io forum thread](https://forum.snapcraft.io/t/snapping-cpdb-cups-backend-a-user-daemon-using-d-bus/) where I asked for help with the [problems I talked about here last month](/OpenPrinting-News-October-2023/#cpdb-cups-backend-snap) a conversation with James Henstridge from Canonical's Desktop Team started.

I have explained how CPDB exactly works, how it finds the available backends and how it communicates with them during the print dialog session in order to actually print a job. He also brought up some security concerns and I told him how we address them.

Especially we found out that CPDB needs some changes:
1. The `printFile` method of backends needs to pass the job data as stream (file descriptor or domain socket), not as file specified by a file path.
2. The D-Bus methods `getActiveJobsCount`, `getAllJobs`, and `cancelJob` need to get removed from CPDB
3. The file backend of CPDB cannot be used. We should discontinue its development and tell that it is for development and documentation only.
4. Filtering of the printer list in the dialog should be completely managed by the frontends, and not by sending signals to the backends, to allow different filtering on print dialogs which are open to the same time.
5. Add newly appearing backends while the dialog is open.

Suggestions about how to make CPDB acually work with Snap were not made.

I have asked Biswadeep to work on these changes and he will do so in December after his end-semester exams.


## PAPPL 1.4.3
[PAPPL v1.4.3](https://github.com/michaelrsweet/pappl/releases/tag/v1.4.3) is now available for download and is a bug fix release. Changes include:

- Added "smi55357-device-uri" and "smi55357-driver" Printer Status attributes
  to Get-Printer-Attributes responses.
- Fixed missing mutex unlock in DNS-SD code (Issue [#299](https://github.com/michaelrsweet/pappl/issues/299))
- Fixed "printer-id" value for new printers (Issue [#301](https://github.com/michaelrsweet/pappl/issues/301))
- Fixed DNS-SD device list crash (Issue [#302](https://github.com/michaelrsweet/pappl/issues/302))
- Fixed Set-Printer-Attributes for "output-bin-default" and "sides-default"
  (Issue [#305](https://github.com/michaelrsweet/pappl/issues/305)) 
- Fixed default "copies" value with `papplJobCreateWithFile()`.
