---
title: >-
  OpenPrinting News - Google Summer of Code 2026 - All contributors did a great start!
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: >-
  11 Contributors on COSMIC printing support, KDE vs. CUPS 3.x, printing under Zephyr, PDFio-based PDF renderer, CI and fuzz testing, printer/scanner simulation, driver lookup with local ML ...
date: '2026-07-20'
---
As [last year](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one) we have 11 contributors again for OpenPrinting!

We got a lot of applications and had to make a way to find the best candidates, we needed to line up a vast amount of mentors, we needed to rank our projects mixed with other projects of the Linux Foundation to not step on anybody's toes, we needed to get around with the actual contributor slot count we got, we needed to agree on individual coding periods with some contributors and set final submission deadlines accordingly, ... A lot of things to do to get the best out of the GSoC ...

And even that we did not get as many contributor slots as we wanted to get, we are working on a wide variety of subject matters: Adding printing support to System76's Rust-based COSMIC desktop environment, completing the work on the KDE Print Manager to support CUPS 3.x, port PAPPL to the Zephyr real-time operating system for microcontrollers, a PDFio-based PDF renderer with permissive license and without C++, complete CI testing workflows for all OpenPrinting projects, fuzz testing libcupsfilters with real filter workflows, fuzz testing CPython bindings, printer/scanner simulation, and driver lookup with local ML

In this post I will go through all that journey, and also post some first reports of our contributors.

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and (new) on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


## The selection process
Already before the [Linux Foundation got selected as a mentoring organization](https://www.linkedin.com/posts/kamppetertill_google-summer-of-code-2026-share-7430376294904782848-l2p2/) we have started to look for contributors for this year. The first candidates appeared already in 2025, and also some contributors of last year decided to do a project with OpenPrinting this year again.

In total, we got a lot of people interested in being a GSoC contributor approaching us. Many had attended one of our [Opportunity Open Source](/opportunity-open-source) conferences, [2025 in the IIT Kanpur in India](/OpenPrinting-News-Opportunity-Open-Source-3.0-in-the-IIT-Kanpur,-India), [2024 also in the IIT Kanpur in India](/OpenPrinting-News-August-2024#opportunity-open-source-in-iit-kanpur), and [2023 in the IIT Mandi in India](/OpenPrinting-News-September-2023#opportunitiy-open-source-in-the-iit-mandi-india) and got motivated by that.

We had originally posted [15 project ideas](https://github.com/LinuxFoundationGSoC/ProjectIdeas/wiki/GSoC-2026-OpenPrinting) and got more than 73 candidates, with some of them also bringing their own project ideas. By average, we had near 5 candidates per project idea, so even more than the ~50 we had last year. Up to two years ago, we found more or less 1 good candidate for each posted project idea and so we assigned the ideas to the candidates and had the line-up.

Now we had to select from competing candidates for many projects, especially for the work on our web site, the fuzz-testing-related projects, the OpenPrinting port to Zephyr, and the testing workflow with the [multi-function device simulator](https://github.com/OpenPrinting/go-mfp). Here my special thanks go to the mentors, Rudra Pratap Singh for the web site, Jiongchi Yu (TTfish) and George-Andrei Iosif for fuzz testing, Iuliana Prodan and Hubert Guan for Zephyr, Alexander Pevzner for the multi-function device simulator, giving additional, subject-specific assignments and doing interviews.

Generally, we have let all new candidates read articles and watch videos about OpenPrinting and then let them build CUPS and do a modification in it so that it adds additional log lines to the log file. Passed that, we have assigned issue reports from our GitHub repos to them, or given them other coding-related tasks. We made exceptions on people we already knew, if they did GSoC with us already in a previous year or if they contributed to us another way, like voluntary work or participating in other mentorship programs with us, as in the [Winter of Code](https://www.linkedin.com/company/winter-of-code/).

As the selection process involves coding tasks for the candidates and these are not limited to just fixing bugs but also to adding features and implementing new ideas, it has also visible side effects.

The most important of these side effects this year was Rudra Pratap Singh looking for candidates continuing his work on the web site, which he had started in [last year's GSoC](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one#modernize-openprinting-website-with-nextjs-by-rudra-pratap-singh). As the site was not finished, he assigned the next steps needed to the candidates and most of the did really great work, allowing him to finish the site before the proposal submission deadline. So he acknowledged the work by all of them in [his announcement post for the new site](https://openprinting.github.io/OpenPrinting-News-The-New-OpenPrinting-Website).

In order to assign contributor slots to each mentoring organization, Google wants the organizations to list all worthwhile proposals and rank them: 1st place, 2nd place, ... Also each ranked proposal needs to have at least 1 mentor assigned to it. And Google also asks for having a total of 2*n mentors when ranking n contributors, but does not enforce that. Google assigns a certain number of slots to each organization, but usually less than the number of proposals they lined up. The proposals then getting accepted are the ones ranked highest.

For OpenPrinting we succeeded to find 26 persons registering as mentor (thanks to all of them!), and so we were good for 13 projects. We lined up all the 14 we found worthwhile running though. As we are not a mentoring organization by ourselves, but a sub-organization of the Linux Foundation (where I am doing the org application for every year since 2008, and where I am one of the org admins) we need to add our proposals to the overall ranking.

For this each of the sub-organizations ranks their proposals by themselves and also lines up mentors for their contributors. We have OpenPrinting (14 proposals, 26 mentors), Zephyr (5 proposals, 8 mentors), Automotive Grade Linux AGL (4 proposals, 9 mentors), Device Tree Bindings (2 proposals, 4 mentors), SPDX (2 proposals, 3 mentors), and Sound Open Firmware SOF (1 proposal, 0 mentors). Then I had to interweave all these individual rankings into one overall ranking in a round-robin manner, but taking into account the very different total numbers of proposals in each sub-organization. So I have taken the first of each group first, starting with the strongest (most proposals) group (OpenPrinting) and ending with the weakest (KWorkflow). After that I have picked further proposals, more often from the stronger groups less often from the weaker groups. Until I had ranked for each groups the mentor-covered number of proposals (half the number of mentors), so that if Google had given us as number of slots half the number of registered mentors, each group has full mentor coverage by itself. Only after that I have ranked the remaining ones.

In total we have ranked 28 for the Linux Foundation, including 14 for OpenPrinting, with 50 mentors (26 for OpenPrinting), but, unfortunately, we got a rather low amount of slots, 19 in total, and with this we got 11 of OpenPrinting's proposals accepted. We have taken into account both importance of the subject matter for OpenPrinting and the free software ecosystem and also how well the contributor was doing during and before the selection process, like previous GSoC project, assignments, familiarization with the code base, and interaction with the developers, ... and also the proposal, naturally. Here one has also to consider whether one better gives a chance to a new contributor or whether one bets on the experience of a returning one (a person can be contributor in up to 2 GSoCs).

All-in-all we got good coverage with the 11 projects which we are running now, but on the other side there were also really good contributors under those who did not get a slot, and also disappointment by them. Unfortunately we cannot do anything about Google's decision here. Sorry if you got selected by us but not by Google's slot count.


## The contributors and their work
As already in 2024 and in 2025, we got again 11 contributor slots for OpenPrinting, despite having ranked 14 contributors, so this time not such a bad cut as last year where we had ranked 19. Here is [Google's announcement](https://summerofcode.withgoogle.com/programs/2026/projects), with the slot counts assigned to each of the mentoring organizations and the accepted projects. This time the [the Linux Foundation](https://summerofcode.withgoogle.com/programs/2026/organizations/the-linux-foundation) got only 19 contributor slots, from 28 ranked proposals (21 slots for 33 proposals last year).

Thanks to all candidates for applying and providing their excellent proposals. And sorry for those who did not get selected. You all did great work and it was really difficult for us to decide, and in addition, we got less slots than expected.

Also, thanks a lot to everybody who stepped up as a mentor for us. Without your valuable help we are not able to do all these great projects.

And here are the accepted proposals for OpenPrinting, and also status of the contributor's work of ~5 weeks after the beginning of the official coding period (note that some started early). Also everybody has passed their midterm evaluations already. The projects are listed in the order as we had ranked them, mentor names in bold are the principal, most active mentors:

### COSMIC Desktop Printer Setup Tool, by Abdelrahman Khalifa
Mentors: **Till Kamppeter**, Mintu Gogoi, Michael Murphy, **Titiksha Bansal**

**In GSoC 2025 we had two projects about Rust bindings, one for [libcups](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one#rust-bindings-for-libcups23-by-mintu-gogoi) and the other for [CPDB](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one#rust-bindings-for-cpdb-libs-by-titiksha-bansal). They were both successfully concluded and I have reported about them in the public Mattermost chat of the COSMIC developers at System 76 and suggested that they can make the base for printing support in COSMIC. And they liked it. Especially System 76's CEO, Carl Richell, appreciated a lot.**

**COSMIC is a promising new desktop, completely written in Rust and 1.0 freshly announced end of last year, and most of the 1.0 teething issues quickly fixed in a row of subsequent 1.x releases. It looks like that it can be the third in addition to GNOME and KDE, and so it deserves well-integrated printing support.**

**And Rust desktop app developers should also have a nice printing dialog ...**

**So Carl included printing support in the [roadmap for Epoch 2 and 3](https://blog.system76.com/post/cosmic-epoch-2-and-3-roadmap) and also created a [feature request on GitHub](https://github.com/pop-os/cosmic-settings/issues/1800), where I summarized the discussion which we had so far.**

**The selection of the contributors for the COSMIC projects was partially also done by last year's GSoC contributors of the Rust bindings, Mintu Gogoi and Titiksha Bansal, and they have also improved and adapted the bindings as needed for the COSMIC projects. Now they are mentoring the contributors.**

**Abdelrahman gets a lot of support by the COSMIC developers from System76, especially a lot by UI designer Maria Komarova, and also by developers Michael Murphy and Balázs Szulovszky, and by Carl, too.**

Description from proposal:
> This project will build a native printer setup tool for the COSMIC desktop. It will add a Printers page in Settings and an Add Printer flow for legacy or specialty devices. The goal is to give COSMIC a modern printer management experience that matches the move toward IPP and Printer Applications in the Linux printing stack. I plan to implement it in Rust inside the cosmic-settings workspace, with a backend layer that keeps the UI stable as CUPS and Rust bindings evolve. The main view will show and group printer destinations, display status and default-printer information, and provide access to device web interfaces. The Add Printer flow will focus on finding legacy devices, suggesting suitable Printer Applications, and refreshing the main view after setup. Deliverables include a working Printers page, grouping and de-duplication logic, web-interface actions, an Add Printer workflow, tests, and documentation.

Contributor's work so far:
> My GSoC project is implementing printer setup and the Add Printer flow for COSMIC.
>
> I built the foundation in a separate cosmic-printers repository, split into shared types, a client API for the UI, and a CUPS/IPP backend. Keeping this separate from COSMIC Settings makes the architecture cleaner, easier to reuse, and suitable for a future standalone libcosmic printer application.
>
> On the backend, I implemented printer listing and discovery using IPP and CUPS 3-style APIs. This includes listing configured CUPS printers, collecting UI-relevant details such as status, model, location, device URI, web/admin URL, options, and supplies, discovering driverless CUPS/IPP printers, and adding discovered printers as persistent CUPS queues.
>
> For privileged operations, such as printer management and default-printer changes, the backend uses cups-pk-helper over D-Bus with polkit authorization, which fits the COSMIC permission model.
>
> A core part of the work is physical-device grouping in printers-core, so multiple queues belonging to the same printer can later be presented as one device in the UI. The backend grouping and matching logic is implemented, while the final grouped-printer UI is still waiting on the updated Figma design.
>
> I exposed the backend through cosmic-settings-daemon using the COSMIC varlink service, then implemented the initial COSMIC Settings integration: the Printers page, printer details page, queue page shell, localization, and the Figma-based Add Printer dialog.
>
> The Add Printer dialog currently supports discovering unconfigured printers that are exposed through IPP, searching through the discovered printer list, detecting whether a discovered printer is already configured or still unconfigured, and adding discovered driverless printers through the backend and show them as grouped devices.
>
> I'm also working on cups-rs to add CUPS 3 support, with several focused PRs prepared and currently waiting on an upstream formatting PR to land first.
>
> The main missing parts are now on the UI side. I have drafted many of the printer pages and flows, but they still need more integration, cleanup, and refinement. Next steps include finishing the manual IP/network and legacy Printer Applications add flows, wiring the remaining UI actions to the backend, adding live printer event updates, testing with real printers, and preparing the work for draft PRs.


### CI Testing Programs & Upstream Integration for OpenPrinting, by Rohit Kumar
Mentors: **Till Kamppeter**, Zdenek Dohnal, Sanskar Yaduka, Titiksha Bansal 

**Rohit Kumar already started with adding CI workflows to our repositories during the [Winter of Code](https://www.linkedin.com/company/winter-of-code/) in the beginning of this year and got enthusiastic with it. So we have selected him for this project and because he had an internship starting in July, he started his work early and so at the time of the midterm evaluations, in the beginning of July he already had practically completed his project.**

Description from proposal:
> This project established a comprehensive, automated Continuous Integration (CI) and testing infrastructure across five core OpenPrinting repositories: `libppd`, `libpappl-retrofit`, `libcupsfilters`, `cups-filters`, and `cups-snap`. Phase 1 delivered native, standalone C unit tests for `libppd` and `libpappl-retrofit` using Michael Sweet's minimalist testing paradigm, taking `libpappl-retrofit` from effectively no automated coverage to a robust `make check` suite and surfacing real upstream bugs in the process. Phase 2 introduced a novel *DESTDIR Staging* architecture that upstreamed the downstream Debian/Ubuntu autopkgtests directly into GitHub Actions, enabling full system-integration tests to run on every commit without polluting the host environment. The resulting pipelines build and test each component against multiple CUPS releases—2.4.x, 2.5.x, and, for the libraries, the new `libcups3` / CUPS 3.x stack—across four architectures: x86_64 and arm64 natively, with armv7/armhf and riscv64 validated through emulation. Additionally, `cups-snap` was validated using an isolated-sandbox print-through model that exercises real print paths through the snapped CUPS stack, ensuring compatibility across legacy and modern printing workflows and providing early detection of regressions before release.

Contributor's work so far:
> My project focuses on giving the core OpenPrinting projects - libppd, libcupsfilters, cups-filters, pappl-retrofit, and the CUPS Snap - CI pipelines that actually prove the code works across the architectures and CUPS versions real users run. Most of this is already finished and merged upstream; what remains for the coming months is ongoing bug-fixes and small improvements as they surface.
>
> Each repository now has a static-analysis baseline built on GitHub Actions, pairing CodeQL for deep security analysis with Cppcheck as a fast memory/null-pointer gate, deliberately mirroring the two-tier approach upstream CUPS uses itself. For the libraries I added hermetic C unit-test suites - no network, no installed files, no running CUPS - that exercise the parts worth testing directly: PPD-to-IPP conversion, option marking and constraint resolution, code emission, the device comparator, and the ASCII85 encoder.On top of that, every pipeline now builds and tests across four architectures - x86_64 and arm64 natively, armhf and riscv64 under QEMU. The libraries additionally build and test against three CUPS generations, CUPS 2.4.x, 2.5.x, and 3.x/libcups3, as a twelve-combination matrix with all per-leg logic factored into a single setup script; cups-filters is the intentional exception, covering 2.4 and 2.5 only, since it is a classic-filter compatibility layer with no role under CUPS 3.x.
>
> Getting the libcups3 builds green meant handling the drop of cups-config, the now-opaque cups_array struct, an enum collision, and the cupsParseOptions API change through a small compatibility shim. The final layer runs the downstream Debian autopkgtests against an in-tree build via DESTDIR staging, driven entirely by environment-variable path overrides so the same scripts run unprivileged and identically on native and emulated arches.The recurring theme was that the tests became the bug-finders: staging the install, emulating an architecture, or building against a newer CUPS exposed defects that plain x86_64 builds had always masked, and I fixed a number of genuine upstream bugs along the way.The CUPS Snap was a separate track-no libcups version axis, so the work there was integration-testing a real daemon across its stand-alone, proxy, and parallel modes, with armhf handled through Launchpad remote builds and riscv64 through an asynchronous pull from the Snap Store edge channel.With the CI, the multi-architecture matrices, and the CUPS 2.5.x/3.x support all merged, my focus for the following months is on fixes and incremental improvements to the suites as real-world use turns up new edge cases.


### Porting OpenPrinting to Zephyr, by Omkar Nanajkar
Mentors: **Till Kamppeter**, Michael Sweet, Shivam Mishra, **Iuliana Prodan**, Akarshan Kapoor, **Hubert Guan**

**This project is a continuation of [Hubert Guan's work in GSoC 2025](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one#porting-printing-to-zephyr-by-hubert-guan).**

Description from proposal:
> This project focuses on porting the CUPS architecture and OpenPrinting tools to the Zephyr RTOS, building on prior work to enable reliable printing on resource constrained, low power hardware. The effort includes fully migrating libcups and the PAPPL framework while ensuring stable handling of IPP messages and configurations. It also aims to improve DNS SD networking and address performance bottlenecks in large file processing, such as limitations in ippFileRead, alongside establishing IPP over USB communication and upstreaming custom modifications into official Zephyr repositories. Ultimately, the project seeks to optimize performance and deliver a fully functional, energy efficient embedded print server. 

Contributor's work so far:
> My project focuses on porting OpenPrinting software to the Zephyr RTOS. This work serves as a sequel to the foundations established by my mentor, Hubert Guan, last year. The project involves several core components of the OpenPrinting ecosystem, including PAPPL (Printer Application Framework), CUPS (Common Unix Printing System), PDFio, and zlib, which together form a comprehensive printing solution.
>
> Upon the announcement of the projects, I began contributing by completing tasks and reviewing resources provided by Mr. Till Kamppeter. This provided me with a fundamental understanding of printing mechanics and introduced key concepts such as IPP. Subsequently, I received project specific tasks from my mentors, Iuliana Prodan and Hubert Guan, which clarified the project structure and the milestones required to achieve our final goals. Based on this technical roadmap, I developed the proposal that led to my selection.
>
> During the initial coding period, I planned to develop a complete rasterization pipeline to convert raw image or PDF data into a rasterized format for direct printer use. However, research indicated that this was not feasible within the 8MB RAM limitation. Consequently, I shifted focus to porting the PAPPL library to Zephyr. I successfully ported the library with several optimizations to fit within the available RAM and Flash memory, utilizing stub functions to keep the original structure intact. Throughout this process, I gained experience with protocols like mDNS, which I also tested independently with ESP IDF. To further my practical testing, I acquired an HP DeskJet 2820 printer to interface with the ESP hardware.
Initially, I experimented with USB CDC before transitioning to an HTTP web interface. Stabilizing this webpage proved to be a significant challenge, requiring extensive time spent debugging and analyzing logs line by line. I found that managing configuration parameters in the prj.conf file, such as buffer and stack sizes, was critical. By referring to the Zephyr documentation and conducting iterative testing, I was able to determine the optimal resource allotment. 
>
> Currently, I am working on job transmission. While the printer now connects via port 631 (`http://IP:631`), it does not yet accept jobs as the system halts due to high memory consumption. I am currently focused on further optimization using resources provided by Iuliana Prodan. Thank you.


### COSMIC Desktop Print Dialog, by Ayush Chauhan
Mentors: **Till Kamppeter**, Mintu Gogoi, **Michael Murphy**, **Titiksha Bansal**

**As already mentioned [above for the printer setup tool part](#cosmic-desktop-printer-setup-tool-by-abdelrahman-khalifa) the projects of adding printing support to the COSMIC desktop environment are in close collaboration with System76. See especially their [roadmap for next major versions](https://blog.system76.com/post/cosmic-epoch-2-and-3-roadmap) and the [feature request on GitHub](https://github.com/pop-os/cosmic-settings/issues/1800).**

**Ayush gets a lot of support by the COSMIC developers from System76, especially a lot by UI designer Maria Komarova, and also by developers Michael Murphy, Eduardo Flores, and Jeremy Soller.**

**With this project, COSMIC is also participating in the [collaboration for improving the XDG Desktop Portal to support print dialogs with preview](https://github.com/flatpak/xdg-desktop-portal/discussions/2016) which I have initiated on the [Linux App Summit this year in Berlin](https://linuxappsummit.org/) and on the ["Boiling the Ocean" GNOME BoF meeting](https://pad.gnome.org/VIf7LYPtSE6Dd0IBTRwzGg?view#Printing-GTK-amp-Portals) right before.**

**Souptik De, who did the [Winter of Code](https://www.linkedin.com/company/winter-of-code/) project of adding CI workflows to the [CPDB backend for CUPS](https://github.com/OpenPrinting/cpdb-backend-cups/) voluntarily did several improvements on CPDB following the needs of Ayush for the COSMIC dialog and also following the discussion for the XDG Desktop Portal improvements. Thanks a lot to him.**

Description from proposal:
> Build a production-ready CPDB-based print dialog for COSMIC and integrate it with xdg-desktop-portal-cosmic (PreparePrint + Print) so desktop and sandboxed apps can print through a native COSMIC UX. The project also defines an async event-driven backend model in cpdb-rs (aligned with zbus and libcosmic/iced) to bridge async CPDB callbacks cleanly into libcosmic/iced state updates, with handling for printer discovery, options, translations, job submission, and failure scenarios. 

Contributor's work so far:
> My GSoC project focuses on bringing native print dialog support to the COSMIC desktop environment through two interconnected efforts: modernizing the Rust CPDB client library and building a fully functional print portal for xdg-desktop-portal-cosmic.
>
> The first phase involved an overhaul of cpdb-rs, the Rust bindings for cpdb-libs (the consumer-facing API library of the Common Print Dialog Backends system). The previous implementation relied on GLib and the C FFI bindings from cpdb-libs which introduced friction in adopting the bindings in async desktop toolkits like iced/libcosmic (used by COSMIC). I worked on adding a pure native async D-Bus client built on zbus, eliminating the GLib dependency entirely. The new client provides complete feature parity: printer discovery, capability querying, media and margin enumeration, localized translations, job submission, and a live event stream that yields real-time printer added, removed, and state changed signals, making it straightforward to build reactive print dialog UIs. The original C bindings have been moved to a separate crate, cpdb-sys, and preserved behind an optional ffi feature flag for backward compatibility. 
 >
 > The second and ongoing phase is building the COSMIC Print Dialog itself inside xdg-desktop-portal-cosmic. This implements the org.freedesktop.impl.portal.Print D-Bus interface, allowing any application that uses the XDG Desktop Portal API (such as sandboxed applications from Flatpak/Snap) to print through a native COSMIC dialog. The dialog features live printer discovery with streaming updates and a comprehensive settings panel covering copies, color mode, orientation, duplex, paper size and tray, margins, print quality, page ranges, scaling, and pages-per-sheet layout. The work on the dialog is currently ongoing with the basic portal request flow and querying with the print backends now working, remaining work is UI polishing, testing and working on accessibility features. Although there is a strong focus on maintaining a high standard of user experience, we have identified limitations in the current XDG Print portal API that restrict many useful features, such as apps exposing specific settings and the dialog showing a live updating preview of the document as the user changes settings. Thanks to Till Kamppeter from OpenPrinting, there has been an effort to discuss these limitations and come up with a solution. The dialog will follow the existing XDG Print portal API in the current development cycle; when the new and improved Print API is ready to be used, I will work on updating the print dialog accordingly.


### Extending PDFio to be a PDF renderer, by Uddhav Phatak
Mentors: **Till Kamppeter**, Ira McDonald, Michael Sweet, Tobias Hoffmann

Description from proposal:
> There is no PDF renderer with Fully permissible licensing. Available PDF renderers are licensed under GPL licensing, which is pretty restrictive in terms of Open Source. Thus the new PDF rendering library i.e. libpdfrip, which is an extension of PDFio is to be the Fully permissible alternative to restrictive renderers.

Contributor's work so far:
> The primary focus of this project is the development of a fully permissible-licensed PDF renderer utilizing PDFio. As printers cannot directly interpret the structural complexities inside raw PDF files for output, the renderer is to rasterize the document into pixels that a printer can understand.
>
> To achieve this, the current implementation implements a page processing loop that consumes runtime command-line configurations, allowing custom target DPI scaling, explicit page boundary constraints, and verbose debugging while mapping page-level global resources such as /XObject dictionaries. 
>
> For typography handling, the text engine takes embedded font streams directly out of the page resource dictionaries by targeting /FontFile2 (TrueType) and /FontFile descriptor keys within font metadata objects. These binary font buffers are ingested and loaded into memory using the FreeType library to generate vector glyph representations. To guarantee rendering in the event that embedded typography streams are either corrupted or omitted by the PDF writer, the fallback immediately catches the error and utilizes a standard system vector path (DejaVuSans.ttf). These processed FreeType faces are then linked into the Cairo font contexts. 
>
> The Text and images inside of a PDF file is getting correctly parsed through and extracted, and there are some bugs regarding the spacing between the fonts which are not showing correctly through the renderer, which I am working on.


### Advanced System-Level Fuzzing for OpenPrinting: Deep State Exploration and LLM-Augmented Mutation, by Yibo Tan (Aiden Kim)
Mentors: Till Kamppeter, **Jiongchi Yu**, George-Andrei Iosif, Zixuan Liu

Description from proposal:
> This project aims to transition OpenPrinting’s security infrastructure from fragmented unit-testing to a comprehensive, state-aware system fuzzing framework. While current fuzzers target isolated helper functions, they fail to exercise the deep implementation logic of complex media parsers (PDF, PCL, Raster). Utilizing AFL++, Honggfuzz, and OSS-Fuzz-Gen, I will develop API-Sequence-Based harnesses that mimic authentic user-triggered scenarios. Key deliverables include a unified consumption shim for the media pipeline, IR-based recombination algorithms for nested object abstractions, and a curated high-quality seed corpus. My preliminary discovery of a zero-day vulnerability in ipp.c (GHSA-67hg-386m-x83h) underscores the critical need for this systemic approach to harden the open-source printing ecosystem.

Contributor's work so far:
> Here is a brief update on my GSoC progress regarding the `cups-filters` fuzzing project:
> 1. **Smart Seed Generation**: Built format-aware AFL++ harnesses (PPD, raster, etc.). To bypass shallow validation, I used SMT techniques to generate structured seeds and dictionaries, heavily improving deep code coverage.
> 2. **Structure-Preserving Mutators**: Implemented lightweight custom mutators for multi-plane inputs (e.g., PWG bundles). This ensures the fuzzer mutates internal sections without breaking outer container validity.
> 3. **Triage & Tooling Infrastructure**: Developed reproducible build/run scripts to lower operational friction. I also built ASan-replay and deduplication tooling, successfully reducing **1,079 raw crashes down to 22 actionable, unique clusters**.
> 4. **OSS-Fuzz Integration (Current Focus)**: Currently migrating these proven targets to `libFuzzer` and configuring the build scripts for upstream `OSS-Fuzz` integration.
> 
> **Next Steps**: Finalize the OSS-Fuzz PR and begin analyzing/reporting the 22 deduplicated crash clusters.


### AI Driven Printer Compatibility and Recommendation Portal, by Gati Varshney
Mentors: Till Kamppeter, Shivam Mishra, **Rudra Pratap Singh**

**We selected Gati for this project as she already worked on the search facility in a [Winter of Code](https://www.linkedin.com/company/winter-of-code/) project and [kept contributing](/OpenPrinting-News-The-New-OpenPrinting-Website#thanks-to-the-contributors) to the site.**

Description from proposal:
> OpenPrinting maintains detailed Linux printer compatibility data through Foomatic, but users lack an intuitive way to discover or evaluate printers. This project builds a fully static printer discovery and recommendation portal on the OpenPrinting website, deployable on GitHub Pages with no backend. It enables users to search, filter, compare printers, and receive explainable recommendations based on precomputed similarity data.

Contributor's work so far:
> I've been working on the AI-Driven Printer Compatibility and Recommendation Portal for the OpenPrinting website. The goal of the project is to help users discover Linux-compatible printers and find suitable alternatives based on driver support and printer capabilities.
>
> So far, I have implemented the core recommendation pipeline that processes the Foomatic printer database, generates feature vectors representing printer capabilities, and produces explainable printer recommendations using a weighted cosine similarity approach. The recommendation engine considers multiple signals including driver compatibility, color capability, supported command sets, PostScript/PCL language levels, and printer resolution.
>
> These recommendations are integrated directly into the printer detail pages, where users can view similar printers together with human-readable explanations describing why each recommendation was made.
>
> Over the coming weeks, I'll continue improving the recommendation engine, optimize performance, enhance the user interface, and add automated testing and documentation before the final evaluation.
>
> I'm grateful to my mentors and the OpenPrinting community for their guidance and feedback throughout the project, and I'm looking forward to completing the remaining milestones.


### Building a Full Print System Testing Pipeline, by Mohammad Arman
Mentors: **Till Kamppeter**, Michael Sweet,
Sanskar Yaduka 

**Mohammad worked on IEEE-1284 support for the [multi-function device simulator](https://github.com/OpenPrinting/go-mfp) as a [Winter of Code](https://www.linkedin.com/company/winter-of-code/) project.**

Description from proposal:
> Modern printer testing remains heavily dependent on physical hardware, making it slow, expensive, and difficult to scale for regression testing. While OpenPrinting already provides a Go-based MFP simulator and a Python-based image evaluation framework, these components are not yet integrated into a unified, automated testing system. This project proposes to build an end-to-end, hardware-free print testing pipeline that bridges this gap. The system will be implemented as a Go-based orchestration tool that directly leverages the simulator’s internal libraries for efficient control, while embedding Python to execute advanced image evaluation. It will automatically load printer models, create CUPS queues, enumerate all supported print modes, execute print jobs, capture simulator outputs, and evaluate them against expected results. The pipeline will support both single and batch testing modes, enabling scalable regression testing and seamless CI/CD integration. It will generate detailed, structured reports with quality metrics (e.g., SSIM, PSNR) and pass/fail analysis. By transforming isolated components into a cohesive, automated system, this project will significantly enhance reliability, reproducibility, and scalability of printer testing in the OpenPrinting ecosystem.

Contributor's work so far:
> My GSoC 2026 project focuses on building an automated end-to-end testing pipeline for OpenPrinting/go-mfp, a Go toolkit for simulating and testing Multi-Function Printers. The goal is to verify the full print path from sending a document through CUPS to capturing and comparing the printed output against the original image using a virtual printer running entirely in software.
>
> In Phase 1, I introduced the abstract.Printer interface and abstract.PrinterRequest struct in the abstract package, modeled after the existing `abstract.Scanner` design. This provides a single shared backend interface for both the IPP (proto/ipp) and IEEE 1284 (proto/ieee1284) protocol implementations, allowing any backend to receive printed documents with full negotiated job parameters via a streaming io.Reader. I also fixed three attribute-decoding bugs in the IPP package and wrote a unit test suite covering document capture, nil-backend safety, and large document streaming.
>
> In Phase 2, I built the cmd/mfp-test command. It loads a virtual printer model using the embedded CPython interpreter, starts a real IPP server over TCP, registers it as a CUPS queue via lpadmin, generates a test PNG image in Go, and sends it through the full CUPS pipeline using lp. The DocumentCapture backend collects the printed bytes and job parameters for inspection. The CUPS queue is always cleaned up on exit using defer with context.WithoutCancel to preserve logging even after cancellation.
>
> Upcoming phases include integrating an image quality comparison framework for similarity scoring, building a test matrix across simplex/duplex and  mono/color modes, converting captured PWG/CUPS raster output to PNG for comparison, and generating structured JSON reports with configurable pass/fail  thresholds.


### Fuzz and Test the go-mfp CPython Binding, by Abhishrestha Tiwari
Mentors: Till Kamppeter, **Jiongchi Yu**, George-Andrei Iosif, Zixuan Liu

Description from proposal:
> The go-mfp cpython package is a unique Go library that embeds CPython as a scripting engine, supporting multiple isolated sub-interpreters with automatic garbage collection of Python objects. As this package is planned to move into a standalone repository and potentially become critical Linux infrastructure, ensuring correctness and security across Python 3.8 through the latest version is essential. This project will build a comprehensive unit test and fuzz test suite — pairing each source file with _test.go and _fuzz_test.go files using Go's native fuzzing framework, tested across Python 3.8–latest on both x86 and ARM64. Deliverables: - Full unit test suite for all public API functions - Fuzz harnesses for sub-interpreter lifecycle, object GC, type conversions, and error handling - CI matrix builds across Python versions and architectures - Documentation for running and extending the test suite 

Contributor's work so far:
> The project focuses on building a comprehensive unit test and fuzz test suite for the cpython package within the OpenPrinting/go-mfp repository. 
>
> The cpython package is a unique Go library that embeds CPython as a scripting engine, supporting multiple isolated sub-interpreters with automatic garbage collection of Python objects. As this package is planned to move into a standalone repository and potentially become critical Linux infrastructure, ensuring its correctness and robustness across Python 3.8 through the latest version is essential.
>
> Over the past seven weeks, I have authored 16 pull requests, of which 14 have been merged. My work has systematically covered nearly all core areas of the package's public API. I began with tests for error types and Python exception constants, then moved on to floating-point conversion boundaries, pyGate operations, and object identifier mapping. I also added tests for the reflect helper functions used internally for Go-Python type introspection. A notable structural contribution was refactoring object.go into five focused files to improve modularity, followed by updating and extending the corresponding object tests.
>
> In the more recent phase of my work, I have written tests for callback types, general Python functionality, unary and binary operator types . Together, these cover the operator, exception, and error-handling layers of the package comprehensively. As a result of this ongoing effort, the test coverage for the cpython package now stands at 93.4%, which is a strong foundation as we move toward also adding fuzz harnesses and a CI matrix across Python versions and architectures.


### Implement IPP-Scan Support in go-mfp, by Yogesh Singla
Mentors: **Till Kamppeter**, Ira McDonald, Michael Sweet, Akarshan Kapoor, Sanskar Yaduka 

**Yogesh worked on WSD scanning support for the [multi-function device simulator](https://github.com/OpenPrinting/go-mfp) as a [Winter of Code](https://www.linkedin.com/company/winter-of-code/) project.**

Description from proposal:
> This proposal is about adding IPP-Scan support to go-mfp, OpenPrinting’s Go toolkit for multi-function printers and scanners maintained by Alexander Pevzner. Right now, go-mfp has solid IPP support for printing and a full eSCL implementation for scanning (WS-Scan is also being added). But there’s no IPP-Scan support yet, and that’s a gap. IPP-Scan (defined in PWG 5100.17) is the open standard for driverless scanning over IPP. It’s what Scanner Applications need to move away from the current eSCL-based approach. I’m proposing to build both a client and a server for IPP-Scan - the client for testing PAPPL scanner apps, and the server as a reference implementation that will also help with developing a future SANE backend for IPP-Scan.

Contributor's work so far:
> This project aims to add IPP Scan Service support to go-mfp according to PWG 5100.17 (IPP Scan Service).
>
> **What Has Been Done**
>
> Data model and attributes
>   - Added scanner-specific IPP types: ScannerDescription, InputAttributes, OutputAttributes, and related keyword enums (PR #54).
>   - Added job-ids-supported printer attribute (PR #56).
>   - Extended job creation attributes and additional IPP color modes for scan jobs (PR #62).
>   - Fixed IANA/errata gaps for scanner keywords: input-auto-exposure and input-orientation-requested (PRs #51, #52).
> 
> Abstract -> IPP conversion
>   - Implemented abstractfrom.go to translate abstract.ScannerCapabilities into IPP ScannerDescription and input attributes — covering input sources (platen/ADF), color modes, resolutions, sides, and defaults (PR #58).
>   - Fixed IPP-to-abstract mapping for job operations in abstractto.go (PR #72).
> 
> Server-side scan service
>   - Refactored shared Get-Printer-Attributes logic for printer and scanner into getprinterattributes.go (PR #64).
>   - Implemented ipp.Scanner as an IPP Scan Service server (PWG 5100.17 v1) with handlers for:
>       * Get-Printer-Attributes — expose scanner capabilities
>       * Create-Job — start a scan job with validated input attributes
>       * Get-Next-Document-Data — deliver scanned document data (PR #69)
>   - Server validates scan parameters against abstract capabilities, manages job state, and delivers document pages asynchronously.
> 
> Document retrieval wire types
>   - Added getdocument.go with GetNextDocumentDataRequest, GetNextDocumentDataResponse, and DocumentStatus (PR #74).
> 
> **Next Steps**
> 
>   - Merge PR #82 (client helpers and codec test coverage for get document).
>   - Add client-side tests for CreateJob and GetNextDocumentData.
>   - Implement a polling helper on the client that respects document-data-get-interval when no data is immediately available.
>   - Support additional IPP scan operations as needed (e.g. Validate-Job,
>     Cancel-Job on the scan service).


### KDE Print Manager vs. CUPS 3.x, by Tarun Srivastava
Mentors: **Mike Noe**, **Till Kamppeter**

**[Tarun had already volunteered](/OpenPrinting-News-June-2024#kde-print-manager) for [this project](/OpenPrinting-News-April-2024#kde-print-manager) for some time, continued it as [GSoC 2025 project](/OpenPrinting-News-Google-Summer-of-Code-2025-Our-most-successful-one#kde-print-manager-vs-cups-3x-by-tarun-srivastava), and is now finishing it as his second GSoC project.**

Description from proposal:
> This project focuses on completing and refining KDE Print Manager’s transition to CUPS 3.x, ensuring full compatibility with the newer printing architecture while still supporting CUPS 2.x. Although core functionality already works, several features—particularly those related to modern, driverless printing—remain incomplete. The shift in CUPS 3.x toward IPP-based print destinations instead of permanent queues requires KDE Print Manager to better handle discovery, grouping, and display of printers such as network devices, IPP-over-USB printers, Printer Applications, and shared remote queues. The interface should clearly reflect the temporary, on-demand nature of these queues. A major aspect of the work involves improving support for Printer Applications, which are replacing traditional PPD-based drivers. The system should prioritize these modern solutions in workflows like “Add Printer,” while still allowing legacy configurations when necessary. Additionally, the user interface needs refinement to clearly distinguish between classic queues, driverless printers, and Printer Applications, and to provide easy access to external configuration tools like web interfaces. Finally, the project emphasizes strengthening test coverage, especially for newer CUPS 3.x features such as IPP destination handling and Printer Applications. By integrating comprehensive unit tests into the CI pipeline, the goal is to ensure long-term stability and reliability as the Linux printing ecosystem continues to evolve. 

Contributor's work so far:
> Review update: The refactoring work is now in the review phase, and the current effort has shifted toward the auto test prototype. The important part of the transition is that the codebase is no longer being treated as a single CUPS-2-only target. Instead, the migration is being shaped so the build can select the right CUPS family at configure time, and the runtime code can branch where the API behavior differs. That gives us a controlled path for introducing libcups3 support without forcing a full-bang rewrite of every caller at once.
>
> On the library side, the main change is around connection and request handling. The CUPS connection code now has to account for the newer error-reporting API, the newer reconnect behavior, and the updated password callback setup. The idea is to keep the same request flow and threading model, but route the low-level CUPS interactions through the correct API depending on the version that was compiled in. That is the core compatibility layer for the migration: preserve the higher-level behavior, swap out the incompatible CUPS details underneath it.
>
> For the auto test work, the focus is on validating the behavior that still makes sense across both versions, while isolating the parts that are only valid on libcups2. The model tests are the most useful place for this because they already cover printer and job loading, and they can keep the PPD/device-related checks guarded to the older CUPS path. The command tests are useful for the request-driven flows, especially printer lookup, jobs listing, and print command behavior, because those are the pieces most likely to regress when the request plumbing changes. The subscription test is also valuable because it checks that the connection signals are still wired correctly, and it reflects the version split by only expecting the older server-level signals where they still exist.
> 
> The next useful step is to keep prototyping the tests around the new branches so we can confirm the migration is behaviorally stable, not just compile-compatible.
