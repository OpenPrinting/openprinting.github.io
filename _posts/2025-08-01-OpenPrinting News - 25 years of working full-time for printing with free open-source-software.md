---
title: OpenPrinting News - 25 years of working full-time for printing with free/open-source-software
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: Dedicated to make printing just work ... And the show must go on!
---
## Working full-time for printing with FOSS
**Exactly 25 years ago**, on Tuesday, August 1, 2000, **I started my job at MandrakeSoft in Paris**, to which I got invited when showing off my print dialog [X Printing Panel (XPP)](http://cups.sourceforge.net/xpp.html) on the LinuxTag 2000 in Stuttgart, Germany, in the beginning of July 2000.

**Since then I am working full-time for printing with free and open-source software**, principally Linux and other POSIX-style operating systems.

My first task at MandrakeSoft (later Mandriva) was to **switch Mandrake Linux from the LPD (Line Printer Daemon) printing environment to CUPS**. I succeeded the switchover just in a few month so that the next available edition of Mandrake Linux had CUPS working and printer setup and printing much easier and much more functional as before.

This, and my numerous presentations of CUPS on conferences, in talks, workshops, and booths, [made all the other distributions follow](/achievements/#getting-all-linux-distributions-to-use-cups), including Debian, and as being derived from Debian, Ubuntu just started off with CUPS back in 2004.

**In 2006, I organized the first OpenPrinting Summit**, at Lanier (now part of Ricoh), in Atlanta, Georgia, with the help of Ulrich Wehner who is working there. There **I got invited to work full-time at the Free Standards Group** (now the Linux Foundation) by Ian Murdock, one of the founders of DebIAN Linux, **to lead OpenPrinting**.

I also **bumped into Mark Shuttleworth**, founder of Ubuntu and Canonical on the LinuxTag 2006 (I was organizing a community booth every year there, from 2001-2006), and he **invited me to work at Canonical**, also full-time.

Not being able to take both full-time and leading OpenPrinting be the central part of my work I took the full-time job at the Linux Foundation and added a part time contract at Canonical for maintaining Ubuntu's printing-related packages.

Later on, when the Linux Foundation dropped my contract to 1/2 and Canonical offered me a full-time employment I got full-time there, until this year.

See also: [How did this all begin?](/history/)

## Achieved a lot of things ...
Principally I have done the same work all the time, and independently, who my actual employer was, to make printing with FOSS "just work".

In the beginning I have taken care that [all the printer drivers from the pre-CUPS era work with CUPS](/achievements/#all-free-drivers-to-be-used-with-cups), that distributions have all the drivers readily available to the user, for example with the help of the [Grand Unified Ghostscript](/achievements/#grand-unified-ghostscript-cups-support-third-party-built-in-drivers-), and that printer setup is as easy and automatic as possible by adding algorithms for printer identification and driver assignment to [system-config-printer](https://github.com/OpenPrinting/system-config-printer) to provide the Plug'n'Print experience (not Plug'n'Play as in Windows, you plug in the printer and play for hours with the drivers and if you win this game, you can print).

I also need to assure that the **good user experience stays conserved all the time**, even if changes in CUPS drop features which make user's life easy and users get used to them.

One was CUPS' simple but fully automatic **broadcasting/browsing system**, where when in a local network the CUPS on one machine shared a printer, automatically all the other machines created a (virtual) print queue and the users could immediately print, and thanks to server-side drivers without needing to download and install a driver.

This mechanism got replaced by the **DNS-SD** protocol, which is once a general standard in networking, and also matches the standard of driverless [IPP](https://en.wikipedia.org/wiki/Internet_Printing_Protocol) printing. Only here the automatic creation of virtual print queues on the client side was not done, which made me create [cups-browsed](/achievements/#cups-browsed), an auxiliary daemon which creates local print queues for discovered IPP printers, both shared remote CUPS queues and network printers.

When **Apple removed the filters and backends from CUPS** (they had hired Michael full-time for macOS printing from 2007 tom 2019) **as they have their own proprietary ones** (2011) I had overtaken their maintainership calling it the [cups-filters](/achievements/#cups-filters) project and the first thing I did was switching them over to the [PDF-centric printing workflow](/achievements/#pdf-instead-of-postscript-as-standard-print-job-format) which we already had agreed on on the OpenPrinting Summit back in 2006, making all distros finally getting switched to PDF.

I also created the idea of the [Common Print Dialog Backends](/achievements/#common-print-dialog-backends) to separate the communication with the actual print technology (like CUPS) from the print dialog GUI. This is once to overcome the inertia of big GUI toolkit and app projects of keeping pace with changes in the print system (CUPS), as motivation of printing support maintenance work in these GUI/desktop project is very low. So the maintainer of the print dialog maintains the backend to keep up with the changes in CUPS. Also backends for cloud printing services could easily get added (and so the support for them be added to all print dialogs by installing a single Snap).

Next step was integration of **driverless printing**. Some years ago new printers started all to be driverless IPP printers, with the main motivation that one can print on them from a smartphone (AirPrint for iPhone, Mopria for Android). The principle of driverless printing always follows the principles of the common [IPP Everywhere](https://www.pwg.org/ipp/everywhere.html) standard from the Printer Working Group ([PWG](https://www.pwg.org/), I work closely together with them) here. CUPS supports it and I did the integration with cups-filters, also on some extra points, like AirPrint as a server (so that iPhone prints on shared Linux printers).

And to make driverless printing complete, meaning that it does not only work with network-connected printers but also via USB (there can be settings without LAN or people prefer USB for privacy) I have taken care of the [IPP-over-USB](https://github.com/OpenPrinting/ipp-usb/blob/master/README.md) standard being [implemented on Linux](/achievements/#driverless-printers-on-usb---ipp-over-usb), first by a GSoC contributor doing [an implementation in C](https://github.com/OpenPrinting/ippusbxd), but this one was not very reliable, and later on, when I tested Alexander Pevzner's [sane-airscan](https://github.com/alexpevzner/sane-airscan) also on IPP-over-USB and ran into problems, he quickly created [ipp-usb](https://github.com/OpenPrinting/ipp-usb) in Go, and he used Go as Go's HTTP library is much more sophisticated and the one of C is not sufficient for this task.

See also: [Our principal achievements](/achievements/)

## ... and a lot of things to do

### CUPS 3.x - The New Architecture

Currently [Michael Sweet is working on CUPS 3.x](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-may-2025.pdf). First, the CUPS daemon will be split in 2, the local server for just allowing printing from the local machine, running as unprivileged user, and the sharing server, a system daemon running as root for sharing print queues on the network. And as these daemons, providing IPP print destinations, are nothing else than **Printer Applications, software emulations of IPP printers**, and so they are developed on the base of [PAPPL](https://github.com/michaelrsweet/pappl) (Printer APPLication framework, also developed by Michael Sweet).

Second, CUPS is going **all-[IPP](https://en.wikipedia.org/wiki/Internet_Printing_Protocol)** and **doing away with PPD (POSTSCRIPT Printer Description) files** and classic printer drivers. Most modern printers are driverless IPP printers and so continue working, while for non-driverless legacy printers classic drivers get replaced by Printer Applications.

And the CUPS library will have a lot of convenient new APIs, for OAuth2, X.509, DNS-SD, TLS, zlib, threading, JSON, HTML forms, ... And part of these is also backported into libcuos of CUPS 2.5.x

### Integration of the New Architecture, CUPS 3.x

And currently I am working on preparing the **smooth transition from CUPS [2.x](/cups/) to [3.x](/cups/cups3.html)** in the operating systems.

First, I had to [turn all the printer drivers currently available in Linux distributions into **Printer Applications**](/achievements/#all-free-drivers-in-a-ppd-less-world---or---all-free-drivers-in-snaps) to conserve the non-driverless legacy printers (with the side effect that the [Printer Applications also work under WSL under Windows](/wsl-printer-app/), saving these printers there, too).

The other very important point is also the **desktop integration**, so that **print dialogs** and **printer setup tools** correctly list all print destinations and offer the correct functionality for configuring the destinations and printing on them.

In addition to classic CUPS print queues we have to display IPP print destinations as one can print on them without creating an explicit CUPS queue. We have to group them if they come from the same hardware unit or the same Printer Application, let users access their web admin interfaces by clicking a single button. The "Add printer" part has to find only non-driverless legacy printers and now find installed Printer Applications and prefer their use instead of PPD files. **Printer setup tools** commonly in use are the GNOME Control Center, KDE Print Manager, and [system-config-printer](https://github.com/OpenPrinting/system-config-printer).

For **print dialogs** we have implemented the IPP print destination support and PPD-less operation in the [CPDB](/achievements/#common-print-dialog-backends) (Common Print Dialog Backends) backend for CUPS, so we have to switch all print dialogs to CPDB support. This affects all dialogs currently in use, which are the GTK (GNOME), Qt (KDE), Mozilla (Firefox, Thunderbird), Chromium Browser, and LibreOffice print dialogs.

Here one sees that **we need changes on code which is not provided by OpenPrinting**. But we cannot just report issues or feature requests to the mentioned GUI toolkit, desktop environment, and desktop application projects. Their developers, in good part also ones doing their part in their spare time, are doing a lot of valuable work to bring their projects forward, but, unfortunately, as printing is not such an attractive subject matter for developers, motivation to implement the requested features is low and so the projects do not keep pace with the development of CUPS.

Here it is best if we from OpenPrinting contribute code, and due to lack of people/volunteers we do it mainly by the Google Summer of Code, as I will tell later. But GUI programming is complex, and to get contributions merged upstream, one has to fulfill strict requirements from the upstream projects, and this requires a lot of enthusiasm and patience ...

### GUI modernization

As I mentioned earlier, in typical Linux desktop systems there are principally **5 different print dialogs** in use: GTK (GNOME), Qt (KDE), Mozilla (Firefox, Thunderbird), Chromium Browser, and LibreOffice. The ones of Mozilla and Chromium have a nice modern look and feel, with its embedded preview and the easy to access option settings on the right, while the **dialogs from GTK and Qt are aging** with their UI designs still coming from the time when CUPS support was originally introduced to these toolkits.

As we are already done with the CPDB support via GSoC projects in the previous years, I have posted project ideas for **modernizing them following the designs from Mozilla and Chromium**, for both [GTK](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2025-openprinting-projects#gtk_print_dialogmodern_dialog_with_built-in_preview_in_main_view) and [Qt](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2025-openprinting-projects#qt_print_dialogmodernize_the_user_interface). For both we got good proposals but Google has not given us enough contributor slots for both proposals having been accepted.

The principal designs of the dialogs still are mainly the original designs from the 2000s when I asked the developers from Qt and GTK to create print dialogs supporting CUPS, replacing the old dialogs from LPD times where one often had just a text input field for entering the `lp` command line to print stdin.

Now the GTK dialog is worked on in a GSoC project, and we are lucky that for the Qt dialog one of our GSoC candidates, who did not get accepted, stepped in voluntarily.

### Sandboxed, distribution-independent packaging and immutable distributions

With classic packaging of applications for Linux distribution, in most cases RPM or DEB packages, packages are usually specific to the distribution for which they are made and there even for a certain version of that distribution.

This makes difficult, near impossible, for a third party to create ready-to install Linux packages of their application without having to create and test packages separately for 10+ distributions and 5+ versions of each.

Also, the distros by themselves only make packages for their current releases and do not update them any more to new upstream versions, once the distro is released. So you need to wait for the next release of your operating system to get new versions of your applications.

This is especially a problem for printer drivers, and therefore probably many manufacturers are hesitating to provide Linux drivers.

So we need distribution-independent packages, which do not rely on anything specific to each operating system distribution. Usually, these dependencies are shared libraries, but it can also be the locations and file names of certain resource, like device files or translations. So the packages bring all these files and components from the operating system under which the app was built.

Main formats are [Flatpak](https://flatpak.org/), [Snap](https://snapcraft.io/), and [OCI containers](https://opencontainers.org/) here. As OpenPrinting's software, CUPS, ipp-usb, and the Printer Applications (new format of printer drivers), are all system daemons, Flatpak is not suitable, it only supports packaging desktop applications. There are efforts to also package daemons, started by [Christian Hergert](https://blogs.gnome.org/chergert/2024/05/07/system-extensions-from-flatpak/), discussed in a [BoF on the GUADEC 2024 in Denver, Colorado](/OpenPrinting-News-July-2024/#guadec-2024-in-denver), and Adrian Vovk wants to continue on it ...

Therefore and also as I was working at Canonical I used Canonical's Snap format for getting distro-independent packages right from OpenPrinting, also because they wanted create an all-Snap desktop distribution, Ubuntu Core Desktop, based on the immutable IoT distro Ubuntu Core, which was for what they originally designed Snap for. And there were also plans to switch the printing system of the standard Ubuntu distributions to Snap. But even with Ubuntu Core Desktop not materializing it is good to have everything, especially the drivers for ~10000 legacy printer models available as distro-independent package in the [Snap Store](https://snapcraft.io/publisher/openprinting/).

With my work on snapping the printing stack I also have learned a lot about Snap, and shared this knowledge in a [series of workshops on several conferences](https://forum.snapcraft.io/t/40263).

Unfortunately, many distros do not support Snap well, most immutable distributions not at all. They are designed for adding desktop applications via Flatpak. But some of them also allow to install applications in OCI containers via podman or Docker, and so I also introduced the idea of creating such containers and ran a [GSoC project](https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6) for doing this.

### Testing, reliability, and security

As essential system components, CUPS and the printing stack in general needs to be running stably, reliably, and securely, and for that thorough testing of the code is needed.

For automated testing one thinks about the CI tests first which are executed whenever a change is committed to the GIT repository of the code base. These catch many glitches but as they are static code which is created by the developers of the code base itself they can easily overlook scenarios about which we never thought about.

Therefore we are also doing **[Fuzz testing](https://en.wikipedia.org/wiki/Fuzzing) using Google's OSS-Fuzz service**. Here the code is exercised with randomized input and each input which leads to unexpected behavior (usually crashes, errors, memory leaks, getting stuck, ...) is taken note of and automatically reported as a bug, with the actual input data of the run and everything need to reproduce the problem. This testing technique requires that huge amounts of tests with new random input are done, and this happens on Google's OSS-Fuzz high-performance cluster.

The work is done by our OSS-Fuzz team, started by George-Andrei Iosif, former member of Canonical's security engineering team, and in the GSoC 2024 he mentored Jiongchi Yu ("TTfish") for [OSS-Fuzz deployment on CUPS and cups-filters](https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024)), and now, in the GSoC 2025 Jiongchi is mentoring 2 further contributors, on [LLM use for creating fuzzers](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#utilizing-oss-fuzz-gen-to-improve-fuzz-testing-for-openprinting-projects-by-zixuan-liu) and [fuzzing our Go- and Python-based components](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#integrating-oss-fuzz-for-go-based-and-python-based-openprinting-projects-by-mohammed-imaduddin).

We have also produced an [excellent workshop about fuzzing free software apps on the Ubuntu Summit 2024](https://www.youtube.com/watch?v=S0IyScIRzb8).

Now you could think, why do we apply such a high computational effort to hunt after crashes when there is the memory-safe Rust programming language? Should we not just oxidize (convert into Rust) the whole OpenPrinting code base? Theoretically, this would be a solution, but it requires a lot of people to do the work in a timely manner (how should we get them, and this for the even more boring conversion of code into another programming language?) and in this work easily many new bugs, not crashes or memory violations, but annoying bugs are introduced ... At least we now support people who write apps in Rust, by creating appropriate bindings in 2 GSoC projects ([libcups](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#rust-bindings-for-libcups23-by-mintu-gogoi), [CPDB libraries](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#rust-bindings-for-cpdb-libs-by-titiksha-bansal)).

Another approach for testing is done by Alexander Pevzner, volunteer contributor of the IPP-over-USB support implementation [ipp-usb](https://github.com/OpenPrinting/ipp-usb) and the SANE scanning backend for driverless scanning, [sane-airscan](https://github.com/alexpevzner/sane-airscan). He is creating a **behavior-accurate simulator for a driverless IPP printing and scanning multi-function device**. This will not only use a database of get-printer-attributes IPP responses of the devices but also reproduce device-specific behavior, like bugs for example and so we can test OpenPrinting's software against known hardware device behavior without having the hardware at hand.

And for not only discovering crashes and errors but also test for correct output, we are doing, inspired by GNOME's [openQA](https://gitlab.gnome.org/GNOME/openqa-tests) about which I have learned on another [BoF on the GUADEC 2024 in Denver, Colorado](/OpenPrinting-News-July-2024/#guadec-2024-in-denver) **visual analysis of print output**, so that problems in the printouts, like decentered pages, cut borders, ... get discovered. To implement this we are mentoring [a GSoC project](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#openprinting-image-output-verification-framework-by-sanskar-yaduka).

This can enhance all types of automated tests, to advance to testing actual functionality, CI tests, fuzzing, and also the multi-function printer simulation.

### Going beyond the usual PC and server architecture

Printing does not only happen on PCs and servers with the usual Intel or AMD processors, but there are also other systems where we want to print from or which we want to use as print servers, or even as the controller inside a printer.

First, there is the RISC-V architecture, this is a completely open hardware architecture, meaning that everybody can make RISC-V processors without acquiring a license from the creators of RISC-V. This makes it interesting as a new architecture for a lot of use cases, including desktop PCs/laptops, the category of computers for which printing support is essential.

On the [Ubuntu Summit 2024](/OpenPrinting-News-October-2024/#ubuntu-summit-2024-in-the-hague) and the [FOSDEM 2025](https://fosdem.org/2025/) I have met Yuning Liang, founder and CEO of [DeepComputing](https://deepcomputing.io/), manufacturer of RISC-V-based motherboards for Framework laptops and on the [FOSDEM I got a sample of the motherboard](https://deepcomputing.io/deepcomputing-received-overwhelming-interest-at-fosdem-2025/) for OpenPrinting. I tested it with the Ubuntu desktop and after sorting out some problems with Yuning and the developers at DeepComputing and also with Heinrich Schuchardt, Ubuntu RISC-V expert at Canonical, everything was up and running, including the full printing stack both from DEB packages and from Snaps. For the latter I have activated RISC-V support for the builds of the OpenPrinting Snaps in the Snap Store.

I have written a [blog article on OpenPrinting](/OpenPrinting-News-We-got-a-Framework-RISC-V-board-from-DeepComputing/) about this and Yuning has [linked it also from DeepComputing's blog](https://deepcomputing.io/openprinting-news-we-got-a-framework-risc-v-board-from-deepcomputing/).

**[Zephyr RTOS](https://www.zephyrproject.org/)** is an operating system for microcontrollers, tiny single-chip computers for embedded/IoT applications. To allow such devices to print, to use them as a cheap solution to make a non-driverless legacy printer driverless, or even to use them as controller in a printer, we are porting CUPS and [PAPPL](https://github.com/michaelrsweet/pappl) (Printer APPLications framework, developed by Michael Sweet) to the Zephyr platform via a [GSoC project](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#porting-printing-to-zephyr-by-hubert-guan).


## Our team and our community

This all I cannot do alone, also our little core team, of Michael Sweet, me, Zdenek Dohnal, Alexander Pevzner, Thorsten Alteholz, Aveek Basu, and Ira McDonald cannot do it. Also, from these it is only me actually working full-time on OpenPrinting. We need a developer/contributor community. And printing is not a very attractive subject matter to have tons of volunteers overrunning to our organization ...

Therefore I make massive use of the **[Google Summer of Code](https://summerofcode.withgoogle.com)**, since 2008 every year, in the beginning we had 1-3 contributors every year, and when Aveek Basu from India (he worked at Lexmark that time) joined OpenPrinting and he asked around at several universities and colleges in India, we got around  5-6 every year, and when we started organizing the annual [Opportunity Open Source conferences](/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur) since 2023, 11 contributors for [2024](/OpenPrinting-News-October-2024/#google-summer-of-code-2024) and also for [2025](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/). They do most of the coding work, especially in the GUI part where I do not have very much experience with.

## The show must go on ...

Generally, coding got all the time a smaller and smaller part of my work, I did more and more creating solutions and project ideas, mentoring and managing (GSoC) student teams, presenting in blogs and on conferences, organizing conferences, communicating with OS distribution developers, GUI developers, other involved free software projects, potential OpenPrinting team members, ... And I love this work and want to continue it, and by doing it, I want to keep printing just working and continue making people tell that with Linux printing works better than under Windows and Mac.

There are two ways to support my (and OpenPrinting's) work:

Either by sponsoring OpenPrinting. We will soon be a full sub-organization of the Linux Foundation and accept sponsorships.

Or, you hire me for continuing my work at OpenPrinting, as MandrakeSoft/Mandriva and Canonical did it in the past.

**See [my profile on LinkedIn](https://www.linkedin.com/in/kamppetertill/) and also contact me by [e-mail](mailto:till@linux.com).**

**Any form of help is highly welcome!**

And, do you know that Ken VanDine (also a great FOSS enthusiast, as me) from Canonical has written a [book](https://www.packtpub.com/en-us/product/the-ultimate-ubuntu-handbook-9781835468876)? Near 400 pages of all what you need to know about Ubuntu. Today I watched a video interview, where Alan Pope (Popey) has interviewed Ken. I found the video by [Popey's announcements on Mastodon](https://mastodon.social/@popey/114942661834589134), and there I asked Ken whether he also covered setting up a printer, and he answered:

> printing just works in Ubuntu, thanks to you!!!

Then I answered:

> Good documentation is great, but products which are so intuitive to use that one does not need any documentation are even better.

The show must go on ...




**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and (new) on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


