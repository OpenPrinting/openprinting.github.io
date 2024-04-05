---
title: OpenPrinting News - March 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Easter Egg in xz, GSoC 2024, Opportunity Open Source 2024?, CPDB Snap, PAPPL scanning, Snap automation, SpliX 2.0.1
---
This Easter weekend was really e**XZ**iting ...

Mastodon is [full of posts](https://ubuntu.social/tags/xz) about the backdoor sneaked into xz/liblzma ([CVE-2024-3094](https://www.openwall.com/lists/oss-security/2024/03/29/4)) by a co-maintainer who stepped in for the original maintainer suffering burnout. The compromised free software project is a widespread data compression library, performing better than the other libraries of this type, like bzip2 for example. This hobby project got a standard part of the operating system, used on practically any server on the world.

Fortunately, the issue was discovered quickly, thanks to [Andres Freund](https://mastodon.social/@AndresFreundTec) who discovered something going wrong when benchmarking Postgres changes. He investigated and finally reported his shocking discovery on [OSS Security](https://www.openwall.com/lists/oss-security/2024/03/29/4), and he posted on Mastodon causing a [long thread](https://mastodon.social/@AndresFreundTec/112180083704606941) where he also shortly [explained how he came to xz as the culprit](https://mastodon.social/@AndresFreundTec/112180406142695845).

Even Andres' report explaining the attack excellently, there were many articles, blogs, videos, ... giving more or less detailed explanations, like [a video by Brodie Robertson](https://youtu.be/OHAyf0qwdCs), the [Ubuntu Security Podcast](https://ubuntusecuritypodcast.org/episode-224/) (read also the text at the end of the page), a [blog about the shell script-based obfuscation](https://gynvael.coldwind.pl/?lang=en&id=782), [FAQ as GitHub Gist with discussion](https://gist.github.com/thesamesam/223949d5a074ebc3dce9ee78baad9e27), or [summarizing it on a single page](https://ubuntu.social/@fr0gger@infosec.exchange/112189232761279711).

Also articles about the strategies the attacker has probably used are there, for example [a nice article about the social engineering by the attacker](https://robmensching.com/blog/posts/2024/03/30/a-microcosm-of-the-interactions-in-open-source-projects/) or [explaining how the attacker tries to hide their location](https://rheaeve.substack.com/p/xz-backdoor-times-damned-times-and).

It was really a sophisticated piece of engineering, hiding the binary-only (closed-source) backdoor code in a test `*.xz` file and hiding the code for the multi-stage decryption and extraction in the cryptic autotools build system and in a second `*.xz` file, and in the end making it only installed when the user/packager uses the release tarball and not a GIT snapshot, to make it not being discovered when auditing/testing the GIT. In addition, the components got added in several commits distributed over months.

**Thanks, Andres, for investigating and discovering this!!**

This shows one of the [principal problems of free software](https://xkcd.com/2347/): Some arbitrary hobby programmer creates something useful for them and thinks it is also useful for others, and so they publish it as free software. Now it gets picked up by other free software projects and ends up getting into all Linux distributions and the original contributor suddenly is maintaining an important part of the world's IT infrastructure.

At OpenPrinting we are in a good situation, as nobody of us is about to give up, we only need to take care that there are no such "Easter eggs" hidden in any contributor's commits.

Also, frequently attending conferences and meeting one's contributors there in-person helps to improve the relationships.

**But I have also good news:**

Anyone following us on Mastodon has perhaps seen that I am using the ubuntu.social server. The founder and maintainer of the server, **Alan "Popey" Pope** (thanks a lot), former employee of Canonical, active contributor to Ubuntu, and a Snap packager, has given up maintaining the instance and looked for somebody to overtake it, and Canonical has jumped in!

**Thanks a lot to Canonical and especially Philipp Kewisch, manager of the Community Team!**

So all my posts and threads I have linked in my news posts will stay available.

So let us see what was exciting at OpenPrinting in March ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


## Google Summer of Code 2024
The submission window for contributor proposals has closed yesterday and many proposals got done only close to the deadline, especially also of people who did not contact us before submitting. Those not contacting us usually have poor proposals and we do not consider them. We only select contributors with whom we have communicated before the submission, and the most important criterium is that they work well with us there, doing assignments well, having done vuluntary contributions, starting on their actual project early, ... All this raises them in our ranking for the selection, not the proposal.

At OpenPrinting we had a good amount of candidates this year. ~15 have communicated with us in the weeks before the submission window and received assignments, building and modifying CUPS, issues, ..., some have even contributed valuable voluntary work starting last year.

Here are especially to mention **Rudra Pratap Singh** who went above and beyond on Snap update and versioning automation, **Biswadeep Purkayastha** who made our libraries ready for libcups3 and currently makes CPDB backends snappable, **Ankit Pal Singh** who volunteered on preset support in Printer Applications and contributed comment preservation in `cupsd.conf` when it is modified by `cupsctl`. Rudra's and Biswadeep's work we have covered in more detail [last month](/OpenPrinting-News-February-2024/#google-summer-of-code-2024) here.

We have also **Akarshan Kapoor** and **Kushagra Sharma** returning to participate this year to continue their great work on scanning support for PAPPL and on CPDB support for print dialogs.

If all works out fine, we will cover especially the desktop integration well, finishing and merging the CUPS 3.x support of the "Printers" module in GNOME Control Center ([GSoC 2023 report](https://github.com/vermamohit13/GSOC-2023)), adding support for the New Architecture also to [system-config-printer](https://github.com/OpenPrinting/system-config-printer) and getting CPDB support in LibreOffice ([Mailing list thread](https://lists.freedesktop.org/archives/libreoffice/2024-March/091748.html)) and Mozilla (Firefox, Thunderbird) ([Feature request](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311)).

Unfortunately, we have nobody to update KDE's Printer Manager (Issues [#1](https://invent.kde.org/plasma/print-manager/-/issues/1), [#2](https://invent.kde.org/plasma/print-manager/-/issues/2#note_890473), [#11](https://invent.kde.org/plasma/print-manager/-/issues/11)).

So we have many project proposals and naturally would like to have them all going, but for that we need mentors, many mentors, ideally 2 per project. So we need your help! If you are interested to help us mentoring, contact me (e-mail at the top left of this page) and I give you instructions on how to register. Please see our [project idea list](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2024-openprinting-projects) for what we are mentoring this summer.

Please step up as soon as possible, as we do not need only your actual mentoring but also you being registered while the contributor slots are distributed, and if we do not have enough mentors on our list, we get less slots. Also note that you do not need to take full responsibility for a contributor's project but also can help mentoring, especially if you can contribute appropriate expertise.

Thanks in advance to make this GSoC amazing!


## Opportunity Open Source - 2nd edition!
Many of you remember the [Opportunity Open Source](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) conference in the IIT Mandi in India which was grown out of the idea that Aveek Basu and me wanted to meet our GSoC contributors and motivate more people to join the free software community and GSoC.

It was a great success and therefore we want to make it annual, meaning that we are now aiming for its second edition.

Very first step is to find a place and a date for the event. It should be in India again, as most of our contributors come from there.

So we started to brainstorm now on [our "Opportunity Open Source" Telegram channel](https://t.me/+Hkefit2Aa6RiZmU0) and currently the most promising candidates are the IIT Mandi, where we did it last year, and the IIT Kanpur.

Most of our contributors are studying or have studied in Mandi, and even with Akarshan Kapoor, main on-site organizer last year, being on an exchange semester in Germany this summer, there are already others jumping in.

Shivam Mishra, GSoC contributor and mentor in previous years, is studying at the IIT Kanpur and suggesting to run the conference there, expecting around 300-400 attendees (instead of the ~100 we had in Mandi). He tells that there "has been a really active Open-Source community". He also tells that the IIT Kanpur is larger than the IIT Mandi and closer to Delhi, and it is "among the top 5 technical institutes in India". Travel to Kanpur would also be easier than to Mandi, especially if it gets rainy.

For the date we are aiming for the weekend after the [UbuCon Asia 2024](https://2024.ubucon.asia/) which takes place in the JECRC University, Jaipur, India, on Aug 31 - Sep 2 (Sat - Mon), meaning that we will go somewhere inside Sep 6 - 8 (Fri-Sun). This way I (and also others, potential speakers) can attend both with one trip, and I can arrive in Kanpur already some days earlier for the preparation. Taking the weekend before UbuCon (Aug 23 - 25) would give me the opportunity to give a talk about this Opportunity Open Source in Jaipur and to attend [aKademy 2024](https://akademy.kde.org/2024/) in Würzburg, Germany, on Sep 7-12, but I also have to stay longer in India, and the risk of rain is higher.

So these are our ideas for now. We appreciate a lot any suggestion or help. If you want to discuss and/contribute, please join our Telegram channel.


## CPDB CUPS backend Snap
End of last year I have investigated how to make a Snap of the backends of CPDB (Common Print Dialog Backends), especially [the one for CUPS](https://github.com/OpenPrinting/cpdb-backend-cups) and ran into several problems, especially as we have to do with user daemons now and the frontend browses available D-Bus services to find all installed backends. So I started a [discussion on the snapcraft.io forum](https://forum.snapcraft.io/t/snapping-cpdb-cups-backend-a-user-daemon-using-d-bus/) and found out that several things need to be changed on CPDB. Biswadeep Purkayastha who was already volunteering for doing the Snap started doing these changes. We covered this here in the [October News](/OpenPrinting-News-October-2023/#cpdb-cups-backend-snap) and in the [November News](/OpenPrinting-News-November-2023/#cpdb-cups-backend-snap).

Biswadeep made good progress:

**1. The `printFile` method of backends needs to pass the job data as stream (file descriptor or domain socket), not as file specified by a file path.**

Done. The data is now streamed through a domain socket.

**2. The D-Bus methods `getActiveJobsCount`, `getAllJobs`, and `cancelJob` need to get removed from CPDB**

Done.

**3. The file backend of CPDB cannot be used. We should discontinue its development and tell that it is for development and documentation only.**

Low-priority point, which does not stop us from snapping the CUPS backend, but we will do it before the final 2.0.0 release.

**4. Filtering of the printer list in the dialog should be completely managed by the frontends, and not by sending signals to the backends, to allow different filtering on print dialogs which are open to the same time.**

This point is actually different, as we discovered later. The backend recognized from which frontend the signals came and so served different, individually filtered lists to each backend, so handling the filtering by the backend was not even the problem, and also has the advantage of sending less data to the frontemd.

More a problem was that the frontend is also a D-Bus service, not only the backends. And the only thing the frontned D-Bus service does is sending signals to the backends to switch the filtering. Here the right way is to implement the filter switching as methods in the backend interfaces and remove the need of the frontends also being a D-Bus service to get a real Snap hell.

Biswadeep is currently working on this one.

**5. Add newly appearing backends while the dialog is open.**

Not yet started, will be Biswadeeps next point.


Biswadeep's work is progressing well and available in pull requests. The pull requests for (1) and (2) are already merged.

- cpdb-libs: [Pull Request for (1) and (2)](https://github.com/OpenPrinting/cpdb-libs/pull/30) ([merged](https://github.com/OpenPrinting/cpdb-libs/commit/85447e86686)), [Pull Request for (4)](https://github.com/OpenPrinting/cpdb-libs/pull/31)
- cpdb-backend-cups: [Pull Request for (1) and (2)](https://github.com/OpenPrinting/cpdb-backend-cups/pull/28) ([merged](https://github.com/OpenPrinting/cpdb-backend-cups/commit/4a1c45315da9)), [Pull Request for (4)](https://github.com/OpenPrinting/cpdb-backend-cups/pull/29)


**Thanks, Biswadeep, for your great work!**


## Scanning support in PAPPL
Akarshan Kapoor is continuing to work on the scanning support in PAPPL, to allow providing scanner drivers as Scanner Applications and the Printer Applications for multi-function printers also covering the scanner part.

In the GSoC 2023 [he created an eSCL parser](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) and afterwards [SANE driver retro-fitting support for pappl-retrofit](https://github.com/OpenPrinting/pappl-retrofit/pull/23).

Currently he works on the [implementation of the scanning API functions in PAPPL](https://github.com/michaelrsweet/pappl/pull/349) and will continue this in this year's GSoC.

**Thanks a lot, Arkashan!**


## Snap automation working well
Thanks to the awesome work of Rudra Pratap Singh on the [Ubuntu Snap automation GitHub action](https://github.com/ubuntu/desktop-snaps/) and naturally also on the Snaps themselves we have now deployed [Snap update automation](https://ubuntu.com/blog/improving-snap-maintenance-with-automation) and Snap versioning automation on OpenPrinting's Snaps. See our detailed coverage in the [January News](/OpenPrinting-News-January-2024/#snap-automation).

What is still missing, is to devide up our Snap GitHub repositories into 2 branches, a development one and a stable one and to have the automation running on the stable branch and the resulting packages uploaded to the "candidate" channel of the Snap Store, controlled by a Launchpad setup, as described in the second part of my [Snap update automation workshop](https://events.canonical.com/event/31/contributions/217/attachments/126/198/Workshop%20Automating%20Snap%20updates%20on%20new%20upstream%20releases.pdf).

Now, using the simple autobuild mechanism of the Snap Store web admin interface, the automation simply happens on the master branch and the resulting Snaps go into the "edge" (unstable/development) channel of the Snap Store.

But this is good enough to observe whether the automation works correctly, and it actually does! So no worries any more about the frequent updates of QPDF or the many drivers contained in the Ghostscript Printer Application. They get all just updated and as long as they build the users get up-to-date software. Also the version numbers are nice `<upstream-version>-<Package-release>` numbers, like we already know from Debian or RPM packages.

**Thanks for this amazing contribution, Rudra!**


## SpliX 2.0.1
I know, classic CUPS drivers are deprecated, but there are still enough people with legacy printers needing them. And this driver will live on as part of the [Ghostscript Printer Application](https://snapcraft.io/ghostscript-printer-app/), so that Linux and [Windows](/wsl-printer-app/) users will be able to continue to use their printers.

[SpliX](/splix/) is a CUPS driver for Samsung SPL2 printers and rebranded models from Xerox, Dell, Lexmark, and Toshiba. It was created back in 2006 by Aurelien Croc based on reverse-engineering the protocol. He worked on it continuously improving and updating it, especially also to support new printer models, until mid-2009, shortly after the 2.0.0 release. After that I continued maintaining it, just applying contributed patches for fixing bugs and adding some new printer models, no actual development. I did this until mid-2013.

After that, nothing changed on SpliX, and distros simply included the latest revision, r315, of the [Subversion repository](https://sourceforge.net/p/splix/code/HEAD/tree/) at SourceForge, where SpliX was hosted.

I am maintaining the printing-related packages of Ubuntu, and as I am working very closely together with the maintainers of these packages on Debian, most packages are synced, meaning that the Debian package is also used by Ubuntu without any changes.

For SpliX there was a little mis-hap, the upstream source tarball used by Debian and the one used by Ubuntu were not identical, even both being the r315 revision of the Subversion repository. So we cannot use the automated syncing of the Debian package into Ubuntu and so have an Ubuntu package with really ugly version numbers, like "2.0.0+svn315-7fakesync1ubuntu1".

These ugly version numbers have also caused some confusion, which gave us a [bug report](https://bugs.launchpad.net/ubuntu/+source/splix/+bug/2060038) with the title

> splix version 2.0.0+svn315-7fakesync1ubuntu0.22.04.1 in jammy is higher than versions in mantic and noble

I have fixed it by just doing a little correction on the version number, but do not want to continue with this uglyness for future Ubuntu versions and wanted to make distro packaging easier in general. So to stop with this nightmare I came finally around, 15 years after 2.0.0, to make a new release, catching up all the commits after 2.0.0 and including all non-Debian-specific distro patches from the Debian/Ubuntu package. It is 2.0.1, and as I cannot release on the old SourceForge site, I have moved the repo over to **[GitHub, under OpenPrinting](https://github.com/OpenPrinting/splix/)**.

Side effect is also that the source code is managed by GIT now and not by Subversion any more.

So anybody here packaging for a distribution, please update the package to this release.
