---
title: OpenPrinting News - September 2024
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: cups-browsed RCE vulnerability overhyped, Festa do Software Livre/UbuCon Portugal 2024, Ubuntu Summit 2024, GSoC 2024
---
Most impactful in September were the [security advisories reported for cups-browsed](#cups-browsed-remote-command-execution-vulnerability-overhyped), starting with the report of a remote command execution vulnerability discovered by security researcher Simone Margaritelli and his post about it on X (formerly Twitter) before the official disclosure made it overhyped and main subject of bloggers, podcasters, and YouTubers. In the end it turned out to be much less harmful than was the initial impression suggested.

I have been on the Open Source Summit Europe this year (see [last month's news](/OpenPrinting-News-August-2024/#open-source-summit-europe-in-vienna)), as it was taking place in my city, in Vienna. I also have given a [talk about OpenPrinting](https://sched.co/1ej79) there, but recordings are not yet released.

And now I am also approaching the next events. At first I am following an invitation from Diogo Constantino from the Portuguese Ubuntu Local Community, giving talks on the [Festa do Software Livre in Aveiro, Portugal](#festa-do-software-livre-ubucon-portugal-2024) which hosts the UbuCon Portugal 2024 as one of its tracks, a conference held primarily in Portuguese language.

Shortly after, I will be in the Hague in the Netherlands for the third [Ubuntu Summit](#ubuntu-summit-2024-in-the-hague), where I am again member of the organization team, but I will also present, together with the Snapcrafters, on a booth and in two workshops.

Our [GSoC](#google-summer-of-code-2024) contributors have continued with their work, approaching the completion of their projects. And they have written about their work again.

So let us see what happened at OpenPrinting in September ...

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**


## cups-browsed remote command execution vulnerability overhyped

On September 5 we got a [GitHub security advisory (GHSA) on cups-browsed](https://github.com/OpenPrinting/cups-browsed/security/advisories/GHSA-rj88-6mr5-rcw8) about a remote code execution. It is possible to create an emulation of an IPP printer with forged metadata to make cups-browsed auto-generate a print queue and the PPD generator of libcups or libppd create a PPD with added lines so that the foomatic-rip filter gets used and the PPD defines a filter command line for foomatic-rip which is supplied by the attacker. So we have a **remote code execution (RCE)** vulnerability.

The reporter, Simone Margaritelli (aka evilsocket), started investigating when he discovered that cups-browsed accepts UDP packets on port 631 from any source to trigger a `get-printer-attributes` IPP request. He then found further bugs leading up to the remote code execution.

He [posted on X (formerly Twitter)](https://x.com/evilsocket/status/1838169889330135132) on September 23 that he recently reported a severe security issue, an "Unauthorized RCE on all GNU/Linux systems)" with a CVSSv3 score (agreed on with Canonical and Red Hat) of 9.9 of 10, but not telling anything about that it was his report about cups-browsed. He also told in the post that he has spent 3 weeks on the investigations, and that a disclosure date was agreed on with the developers. The message got hidden shortly after, but one can still read it on some archiving sites.

Seth Arnold of Canonical's security team made me aware of this X message on Tuesday, September 24, and this started continues conversation of me with the security team on the Canonical-internal chat, along with already ongoing conversation on GitHub and VINCE. On Thursday, September 26 I read on VINCE that the vulnerability has leaked and so we had to agree on a quick disclosure. Instead of on the originally planned disclosure on October 6 we agreed to disclose still on September 26, at 20:00 UTC.

Canonical's security team has acted immediately to quickly apply the patches which Michael Sweet (author and maintainer of CUPS) had already prepared for CUPS, cups-browsed, libcups-filters, libppd, and cups-filters (in the time from the first report until then I was some days off and I was also on the Open Source Summit Europe, **thanks, Michael Sweet, for stepping in, also thanks to Zdenek Dohnal from Red Hat**) to the appropriate in all supported Ubuntu versions, so that at the time of disclosure most fixes were already in place. They also reported in an [Ubuntu blog](https://ubuntu.com//blog/cups-remote-code-execution-vulnerability-fix-available). They tell users what to do, from turning off cups-browsed or at least its legacy CUPS browsing support to updating their systems as the fixes were already available. **Thanks a lot to Seth Arnold, Marc Deslauriers, Diogo Sousa, Mark Esler, Luci Stanescu, and more.**

At the time of disclosure there appeared [tons of posts on Mastodon](https://ubuntu.social/@till) about this subject matter and I have given several answers.

A good and detailed description of the vulnerability comes from Simone himself in his [blog](https://www.evilsocket.net/2024/09/26/Attacking-UNIX-systems-via-CUPS-Part-I/). **Thanks to Simone Margaritelli for the detailed investigation and also the detailed description about how the vulnerability works.** Investigators of this kind are really needed to keep free software on a high security level. This vulnerability could never have been found by automated methods like fuzzing or code analysis.

Some days later, **Peter van Dijk (aka Habbie, also thanks for your report)** has reported another vulnerability of the legacy CUPS browsing support as a [GHSA on cups-filters](https://github.com/OpenPrinting/cups-filters/security/advisories/GHSA-rq86-c7g6-r2h8). It was possible to send a well-formed CUPS broadcast packet to UDP port 631 of cups-browsed, but with a port 80 URL of a web site which redirects on the port and then cups-browsed falls into an infinite loop sending HTTP requests which can only be stopped by `kill -9`. This vulnerability got independently discovered and treated in detail by Akamai and posted in their [blog](https://www.akamai.com/blog/security-research/october-cups-ddos-threat).

**Overhyped**

The X post by Simone really overhyped the vulnerability. Attacks from the internet are not very probable due to the fact that servers on the internet do not have cups-browsed and CUPS installed and CUPS/cups-browsed setups usually exist only in NAT-protected local networks with desktop machines and print servers. And the remote code execution is also rather restricted, as CUPS filters are not running as root, but as the system user "lp" which cannot even read user's home directories. In addition, the remote code execution only happens when a user actually prints a job on the fake printer. Actually assigned scores ended up between 8.4 and 9.1.

**Fixes**

Fixes are already available in the appropriate upstream repositories: cups-browsed, libcupsfilters, libppd, cups-filters, cups. Especially we have removed legacy CUPS browsing (and also LDAP) support from cups-browsed and added verification of the content of IPP responses and of content filled into PPD files, to not contain control characters like newlines. These changes are sufficient to prevent the reported exploits.

We did not yet add any protection against PPD files defining malicious filter command lines for foomatic-rip. A possible solution we are discussing is providing a hash database for all command lines in the existing PPD files but also isolation/encapsulation/containerization of Foomatic-based filtering.

**See more info and a list of all CVEs and patches in our [separate News Flash](/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/).**


## Festa do Software Livre/UbuCon Portugal 2024
In a few days I will depart to Portugal, exactly to the city of Aveiro, close to O Porto. Diogo Constantino, who is leading the Ubuntu Local Community (LoCo) Portugal, has, as he [interviewed me on the Podcast Ubuntu Portugal #310](https://podcastubuntuportugal.org/e310/), invited me to come to the event.

It is the [Festa do Software Livre](https://festa2024.softwarelivre.eu/), a 2-day conference with a main track and several sub-conferences co-located by different open-source organizations: Drupal, Flutter, WikiMedia Portugal, Inêrcia, and the [UbuCon Portugal](https://ubuconpt2024.ubuntu-pt.org).

Here are the schedules: [Festa do Software Livre](https://festa2024.softwarelivre.eu/agenda), [UbuCon Portugal](https://ubuconpt2024.ubuntu-pt.org/sessions/)

I will give 3 sessions during the event, all in Portuguese:

**OpenPrinting - A boa impressão do software livre**

Fri, October 11, 14:00 - 15:00 WEST, Anfiteatro IV (Main Track)

I will give an overview of our work. Going through [OpenPrinting’s history](https://openprinting.github.io/history/) the components of the printing infrastructure of modern Linux (and other Posix-style) operating systems will get shown.

- How did the Internet Printing Protocol (IPP) with the printing system [CUPS](https://openprinting.github.io/cups/) being an implementation of it simplify printing a lot?
- The printer driver challenge, good and bad cooperation with manufacturers, packaging and distributing ...
- Desktop integration, GUI toolkits, print dialogs, setup tools, portals, ...

Especially also the [New Architecture](https://openprinting.github.io/current/#the-new-architecture-for-printing-and-scanning) of all-IPP printing and scanning and also the integration in [immutable OS distributions](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) will be treated ...

And in the end I will also quickly tell about [Microsoft going all-IPP in Windows](/OpenPrinting-News-December-2023/#new-architecture-under-windows) ...

This is the same talk as I had given on the [FOSDEM](https://openprinting.github.io/OpenPrinting-News-February-2024/#fosdem-2024), on the [Opportunity Open Source](https://openprinting.github.io/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur), and on the [Open Source Summit Europe](https://openprinting.github.io/OpenPrinting-News-June-2024/#open-source-summit-in-vienna), but in Portuguese language. And I got a generous time slot of 60 min, meaning that we have a lot of time for questions, answers, and discussion.

**[Linux para desktop, fácil como um smartphone! Graças ao Snap!](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao1/)**

Sat, October 12, 09:30 - 10:30 WEST, room 4.1.02 (UbuCon PT)

The motivation, advantages, and concept of the sandboxed, immutable Snap packaging format is shown and how it is used to make up immutable all-Snap OS distros, the IoT distro Snap was originally designed for, Ubuntu Core, and the easily usable and maintainable Ubuntu Core Desktop.

This is the same talk as I had given on the [FOSDEM](https://openprinting.github.io/OpenPrinting-News-February-2024/#fosdem-2024), on the [GUADEC](https://openprinting.github.io/OpenPrinting-News-July-2024/#guadec-2024-in-denver), and on the [Opportunity Open Source](https://openprinting.github.io/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur), but in Portuguese language. And here I also got a generous time slot of 60 min, meaning that we have again a lot of time for questions, answers, and discussion.

**[O seu aplicativo para todo mundo! Graças ao Snap! - Oficina interativa](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao2/)**

Sat, October 12, 11:00 - 13:00 WEST, room 4.1.02 (UbuCon PT)

Vamos snapear! (Let's snap!) - Interactive workshop to learn how to package applications in the sandboxed, immutable package format Snap to publish them in the Snap Store. Attendees will create simple Snaps in several hands-on exercises.

This is the [same workshop as I had given on several other conferences](https://forum.snapcraft.io/t/40263), but in Portuguese language. And here I also got plenty of time, 2 hours, whereas on other events I got only 60 or 90 minutes. I also do not need to give a long introduction as I will give my talk right before. So we have a lot of time for doing the exercises.

And if you want to participate, [do not forget to prepare your laptop before](https://ubuconpt2024.ubuntu-pt.org/sessions/sessao2/).

Most probably the sessions will get streamed, so that one can also attend them remotely.


## Ubuntu Summit 2024 in the Hague
The third [Ubuntu Summit](https://ubuntu.com/summit) is only little more than two weeks away from us (on October 25-27).

The [schedules are published](https://events.canonical.com/event/51/timetable/?layout=room#all.detailed). As announced already we will have one plenary room for talks and an additional room for workshops. And we will have an exhibition floor with 26 booths of open-source organizations.

As already told last month, I will be presenting Snap together with Merlijn Sebrechts, Heather Ellsworth, Soumyadeep Ghosh, and Lucy Llewellyn from the [Snapcrafters](http://snapcrafters.org/). We will have a [booth](https://events.canonical.com/event/51/contributions/524/) and the following two workshops:

**[Crafting snaps quickstart guide 101](https://events.canonical.com/event/51/contributions/586/)**

Sat, October 26, 16:30 - 17:30 CEST, room Princess Ariane (Workshop room)

This is an interactive workshop where you learn snapping (package applications as Snaps), based on the [original workshop given by Heather Ellsworth and me on several other conferences](https://forum.snapcraft.io/t/40263). You will make Snaps of simple GNOME and KDE applications on your laptop. You will use interfaces for defined communication with the outside world, content Snaps providing common libraries (GNOME, KDE ffmepeg, ...), learn several methods how to make software running in a sandbox, build and run the applications, ...

And our team will be in the room and help you on all your questions and doubts ...

**[How to build and test your snaps automatically using GitHub actions](https://events.canonical.com/event/51/contributions/587/)**

Sun, October 27, 14:00 - 15:00 CET, room Princess Ariane (Workshop room)

Original description:

> In this workshop we will showcase how one can use GitHub actions to automate the building and testing of Snaps. We will show users how they can use the already created CIs directly. Or, how they can modify and change those according to their needs. We'll show how to run VMs inside the GitHub runners using `ghvmctl` and run GUI apps.

We will also have a workshop created by our OpenPrinting GSoC OSS-Fuzz project team. The 2 mentors George-Andrei Iosif and Dongge Liu will be on the Summit to give

**[Fuzzing in the open: Integrate your project in OSS-Fuzz for continuous fuzzing](https://events.canonical.com/event/51/contributions/540/)**

Sat, October 26, 11:30 - 13:00 CEST, room Princess Ariane (Workshop room)

They will teach how you can make your free software application project more stable and more reliable by using Google's OSS-Fuzz service to make your code undergo continuous fuzz testing. They will explain what fuzz testing is and how OSS-Fuzz works with their work on OpenPrinting as example, how to write Fuzz harnesses, and how to make use of the test results to fix crash bugs (which are often possible vulnerabilities).

Unfortunately, our GSoC contributor, Jiongchi Yu will not be able to come to the Hague.

If you want to attend these workshops (or any other workshop on the Summit) please open the session description by clicking the session in the [timetable](https://events.canonical.com/event/51/timetable/?layout=room#all.detailed) follow any preparation instructions there and/or also download the slides (under "Presentation Materials" at the bottom) and follow preparation instructions in there. Also you will have the slides at hand to copy and paste any commands and examples. Preparations are usually things like installing the needed operating system/virtual machine and needed software.

Our GSoC contributor Akarshan Kapoor is on the Ubuntu Summit again, but not with a talk about Scanner Applications. Doing his second exchange semester in Germany, inspired by the technology used in the trains of the German railway he will give the talk

**[Flush with Innovation: Revolutionising Train System Toilets with Embedded Technologies](https://events.canonical.com/event/51/contributions/551/)**

Sun, October 27, 14:30 - 14:55 CET, room KWA (Plenary room)

Original description:

> This talk will cover updates on the hardware, firmware, and software developments of the Pump Monitor, a unique device currently used by Deutsche Bahn, leveraging recent Zephyr RTOS (real time operating system) components like zbus. The core of the talk will delve into the architecture and development path of our Open Source IoT LwM2M and Django server, highlighting its robustness, flexibility, and user-friendly interface. Additionally, the session will address sustaining cloud infrastructure through Open Source solutions, ensuring reliability and security via protocols like LwM2M and CoAP, and promoting the benefits of Open Source adoption in real-world applications. The project utilizes a local server-based IoT system leveraging the Lightweight Machine to Machine (LwM2M) protocol, enabling communication between IoT devices running Zephyr RTOS and a backend server using Django, operating fully within a local environment without external cloud services.

And if you want to attend any live-streamed sessions (talks in the plenary room) remotely, note that in the night between the Saturday and the Sunday of the Summit the daylight saving time in Europe ends, meaning that on Friday and Saturday we have CEST (UTC+2) and on Sunday we have CET (UTC+1).

See you all in the Hague!


## Google Summer of Code 2024
Rudra Pratap Singh has officially completed his project of OCI containerization of CUPS and the Printer Applications, but he still does some testing and we will need to make his work available. For this we will need to create a DockerHub account for OpenPrinting and also transfer his work to be hosted in the OpenPrinting GitHub.

The other 10 contributors are all nearing the completion of their projects. Most have gotten additional deadline extensions due to important events interrupting their project work, but they and their mentors are reporting that they are doing well.

As the second contributor Biswadeep Purkayastha, adding CPDB support to LibreOffice's print dialog, will reach the finish line. He has already submitted his final report.

And here are the write-ups:

**CPDB support for the LibreOffice print dialog**<BR>
Contributor: Biswadeep Purkayastha<BR>
[Work Product](https://medium.com/@bpdps95/providing-cpdb-support-for-the-libreoffice-print-dialog-my-gsoc-journey-e46f72d5a61c)

> This month, I worked on resolving an issue where user-set default values were not being properly applied in CPDB. The problem occurs when user default settings are defined using lpoptions. CPDB fails to recognize these newly set user defaults as the actual defaults when retrieving options. Upon further investigation, I discovered that CUPS is not returning the correct default values when queried by CPDB, indicating the issue likely lies with CUPS. I've submitted a detailed issue report on the CUPS GitHub repository and am currently awaiting a response from Michael Sweet. In the meantime, I am focusing on wrapping up my project and fine-tuning minor details in preparation for my final submission.

[WIP Pull Request](https://gerrit.libreoffice.org/c/core/+/169617).

**Integrating C-based OpenPrinting Projects in OSS-Fuzz Testing**<BR>
Contributor: Jiongchi Yu

> In September, the OpenPrinting fuzzing project integrates more harnesses for libcupsfilters and cups-filters. We upgraded the harness for cups-filters from version 1.X to the latest 2.X to better align with the long-term development goals of OpenPrinting ecology. However, due to the current OSS-Fuzz base image lacking support for operating systems higher than Ubuntu 20.04 and the corresponding dependency libraries, the ClusterFuzz compilation for the two projects remains failing. We are actively communicating with Google developers to resolve this issue.
>
> Additionally, we have triaged 27 identified issues found by existing OSS-Fuzz harnesses and submitted relevant issue reports and security advisories for the confirmed bugs. Moving forward, we are working on involving more LLMs efforts to help generate effective fuzz drivers and towards more secured OpenPrinting projects.

**CPDB support for the print dialog of Mozilla**<BR>
Contributor: Kushagra Sharma

> Progress has been made in the integration of CPDB. After successfully setting up the dummy print backend, I have now transitioned to replacing the placeholder calls with CPDB APIs. These APIs are being used to populate the print backend in Mozilla, enabling more robust print functionality.
>
> This phase involves ensuring that the CPDB integration is seamless and interacts correctly with other components. I'm also focused on fixing import issues with CPDB and testing edge cases and across different environments. As this work nears completion, I anticipate submitting a pull request shortly for review, which will mark an important milestone in this project.

Kushagra created a good collaboration with the Mozilla developers now, via my original [feature request](https://bugzilla.mozilla.org/show_bug.cgi?id=1826311).

**Desktop Integration: Update system-config-printer for the New Architecture of printing**<BR>
Contributor: Shivam Jaiswal

> I have written the asynchronous service discovery code and created a basic UI structure for discovered services. I have added buttons to list all discovered services. My next goal is to  merge the final code for service discovery into the main GitHub repository of SCP. After that, I will finalize code for add printer part.

**Make a native printer Application from Gutenprint**<BR>
Contributor: Ankit Pal Singh

> Currently working on status callback function, documentation and the job flow. Fixing some minor issues, once this is done then I will start with pappl backend implementation.

**User interfaces for using OAuth2 with printers and scanners**<BR>
Contributor: Shivam Sharma

> This month the major focus was on improving the security levels in OAuth code and merging OAuth code with CPDB. I implemented the auth.h file and called the auth.h file in the print-backend.c file and also made a few changes in makefile which helps to merge the auth code with the CPDB backend. Currently I am working on the gtk of OAuth. Also testing the code with different authentication url. After finishing this task the focus will be on adding more functionality and improving the way of authentication which will be made easier for the clients to authenticate themselves. The changes will be made to improve the GTK and level of authentication.

**Converting Braille embosser support into a Printer Application**<BR>
Contributor: Arun Patwa

> In September Month, I was majorly working on integration of  braille embosser support into the PAPPL Application for the brf file. Got stuck into embosser support for long time. I had done some testing for the conversion and also refractored the code.  I aim to complete the integration of other filters in the upcoming weeks and also testing of braille embosser support for them.

**Replace QPDF by PDFio as PDF manipulation library in libcupsfilters**<BR>
Contributor: Uddhav Phatak

> I have sucessfully ported all the files in the `cupsfilters/pdftopdf/`, and all tests are passing with the `make check`. The remaining three files are `pwgtopdf.cxx`, `pdf.cxx`, and `pclmtoraster.cxx`. In this, I have already converted half functions of `pclmtoraster.cxx` and `pdf.cxx`. Soon, all the code will be converted to C and the dependency from the QPDF library would be removed completely.

Here is [Uddhav's work on GitHub](https://github.com/uddhavphatak/libcupsfilters/tree/pdfio-implement).
