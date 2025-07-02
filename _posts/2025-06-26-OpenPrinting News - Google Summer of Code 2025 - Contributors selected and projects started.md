---
title: OpenPrinting News - Google Summer of Code 2025 - Contributors selected and projects started
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: 11 Contributors on CUPS 3.x desktop integration, fuzz testing, visual analysis of print filter output, Rust support, and more ...
---
A lot of things happened since [my last post about this year's GSoC](/OpenPrinting-News-Google-Summer-of-Code-2025-The-Linux-Foundation-is-accepted-as-mentoring-organization/). We got a lot of applications and had to make a way to find the best candidates, we needed to line up a vast amount of mentors, we needed to rank our projects mixed with other projects of the Linux Foundation to not step on anybody's toes, we needed to get around with the actual contributor slot count we got, we needed to agree on an individual coding period with each contributors and set final submission deadlines accordingly, ... A lot of things to do to get the best out of the GSoC ...

And even that we did not get as many contributor slots as we wanted to get, we are working on a wide variety of subject matters: Desktop integration of CUPS 3.x, modernizing the GTK print dialog, Rust bindings for easy printing from desktop apps written in Rust, more fuzz testing, visual analysis of print filter output for automated functional testing, not only crashes and errors, and a new web site.

In this post I will go through all that journey, and also post some first reports of our contributors.

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and (new) on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


## The selection process
Already before [the Linux Foundation got selected as a mentoring organization](/OpenPrinting-News-Google-Summer-of-Code-2025-The-Linux-Foundation-is-accepted-as-mentoring-organization/) we have started to look for contributors for this year. The first candidates appeared already in 2024, and also some contributors of last year decided to do a project with OpenPrinting this year again.

In total, we got a lot of people interested in being a GSoC contributor approaching us. Many had attended one of our [Opportunity Open Source](https://www.linkedin.com/company/opportunity-open-source/posts/) conferences, [2024 in the IIT Kanpur in India](/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur) and [2023 in the IIT Mandi in India](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india) and got motivated by that.

We had originally posted 16 project ideas and got more than 50 candidates, with some of them also bringing their own project ideas. By average, we had 2-3 candidates per project idea, a completely new situation for us. Before, we found more or less 1 good candidate for each posted project idea and so we assigned the ideas to the candidates and had the line-up.

Now we had to select from competing candidates for the projects, especially for the fuzz-testing-related ones, the OpenPrinting port to Zephyr, the GTK print dialog modernization, and the visual analysis of print filter output. Here my special thanks to the mentors, Jiongchi Yu (TTfish) and George-Andrei Iosif for fuzz testing, Iuliana Prodan for Zephyr, Alexander Pevzner for visual analysis, and Michael Weghorn, Gaurav Guleria, Kushagra Sharma, and Mohit Verma for the GTK print dialog modernization for giving additional, subject-specific assignments and doing interviews.

Generally, we have let all new candidates read and watch videos about OpenPrinting and then let them build CUPS and do a modification in it so that it adds additional log lines to the log file. Passed that, we have assigned issue reports from our GitHub repos to them, or given them other coding-related tasks. We made exceptions on people we already knew, if they did GSoC with us already in a previous year or if they contributed to us another way, like voluntary work or participating in other mentorship programs with us, as in the [Winter of Code](/OpenPrinting-News-The-Winter-of-Code-4.0/).

In order to assign contributor slots to each mentoring organization, Google wants the organizations to list all worthwhile proposals and rank them: 1st place, 2nd place, ... Also each ranked proposal needs to have at least 1 mentor assigned to it. And Google also asks for having a total of 2*n mentors when ranking n contributors, but does not enforce that. Google assigns a certain number of slots to each organization, but usually less than the number of proposals they lined up. The proposals then getting accepted are the ones ranked highest.

For OpenPrinting we succeeded to find 33 persons registering as mentor (thanks to all of them!), and so we were good for 16 projects. We lined up all the 19 we found worthwhile running though. As we are a not a mentoring organization by ourselves, but a sub-organization of the Linux Foundation (where I am doing the org application for every year since 2008, and where I am one of the org admins) we need to add our proposals to the overall ranking.

For this each of the sub-organizations ranks their proposals by themselves and also lines up mentors for their contributors. We have OpenPrinting (19 proposals, 33 mentors), Automotive Grade Linux AGL (4 proposals, 8 mentors), SPDX (2 proposals, 4 mentors), Industrial IO IIO (4 proposals, 4 mentors), Sound Open Firmware SOF (2 proposals, 2 mentors), Zephyr (1 proposal, 2 mentors), and KWorkflow (1 proposal, 2 mentors). Then I had to interweave all these individual rankings into one overall ranking in a round-robin manner, but taking into account the very different total numbers of proposals in each sub-organization. So I have taken the first of each group first, starting with the strongest (most proposals) group (OpenPrinting) and ending with the weakest (KWorkflow). After that I have picked further proposals, more often from the stronger groups less often from the weaker groups. Until I had ranked for each groups the mentor-covered number of proposals (half the number of mentors), so that if Google had given us as number of slots half the number of registered mentors, each group has full mentor coverage by itself. Only after that I have ranked the remaining ones.

In total we have ranked 33 for the Linux Foundation, including 19 for OpenPrinting, with 55 mentors (33 for OpenPrinting), but, unfortunately, we got a rather low amount of slots, 21 in total, and with this we got 11 of OpenPrinting's proposals accepted. We have taken into account both importance of the subject matter for OpenPrinting and the free software ecosystem and also how well the contributor was doing during and before the selection process, like previous GSoC project, assignments, familiarization with the code base, and interaction with the developers, ... and also the proposal, naturally. Here one has also to consider whether one better gives a chance to a new contributor or whether one bets on the experience of a returning one (a person can be contributor in up to 2 GSoCs).

All-in-all we got good coverage with the 11 projects which we will be running now, but on the other side there were also really good contributors under those who did not get a slot, and also disappointment by them. Unfortunately we cannot do anything about Google's decision here. Sorry if you got selected by us but not by Google's slot count.


## The contributors and their work
As in 2024, we got 11 contributor slots for OpenPrinting, despite having ranked 19 contributors, compared to the 13 of last year. Here is [Google's announcement](https://summerofcode.withgoogle.com/programs/2025/projects), with the slot counts assigned to each of the mentoring organizations and the accepted projects. This time the [the Linux Foundation](https://summerofcode.withgoogle.com/programs/2025/organizations/the-linux-foundation) got again 21 contributor slots, but now with 33 ranked proposals.

Thanks to all candidates for applying and providing their excellent proposals. And sorry for those who did not get selected. You all did great work and it was really difficult for us to decide, and in addition, we got less slots than expected.

Also, thanks a lot to everybody who stepped up as a mentor for us. Without your valuable help we are not able to do all these great projects.

And here are the accepted proposals for OpenPrinting, and also status of the contributor's work so far (in the order as we had ranked them, mentor names in bold are the principal, most active mentors):

### KDE Print Manager vs. CUPS 3.x, by Tarun Srivastava
Mentors: **Mike Noe**, **Till Kamppeter**, Nicolas Fella, Zdenek Dohnal

Description from proposal:
> The KDE Print Manager, a critical component of the KDE desktop environment, requires updates to support the advancements introduced in CUPS 3.x. This project aims to modernize the Print Manager by enabling compatibility with CUPS 3.x while maintaining backward compatibility with CUPS 2.x. The focus will be on incorporating support for IPP (Internet Printing Protocol) print destinations, which allow users to print to driverless network printers, IPP-over-USB printers, and Printer Applications without the need for traditional CUPS queues or PPD files.

[Tarun had already volunteered](/OpenPrinting-News-June-2024/#kde-print-manager) for [this project](/OpenPrinting-News-April-2024/#kde-print-manager) for some time and is now finishing it as a GSoC project.


### Porting pyCUPS to CUPS 3.x API and implementing it in system config printer, by Soumyadeep Ghosh
Mentors: **Bhavanishankar Ravindra**, **Callahan Kovacs**, Till Kamppeter, Zdenek Dohnal, Kushagra Sharma

Description from proposal:
> Currently, PyCups supports up to libcups 2.4.x. PyCups being written using the C extensions for Python, is very tough to maintain, and to implement new features in. Also, there is a very small scope of implementing automation for creating the python bindings of libcups. After PyCups is ported to libcups 3.x, I'll implement the same API for system-config-printer. So, that distros still shipping old libcups 2.4.x can slowly stop shipping the library. And libcups 2.4.x can be deprecated. Immensely helping the printing APIs and libraries.

[Soumyadeep](/OpenPrinting-News-August-2024/#soumyadeep-ghosh) has started his work ~2 weeks ago. He did first bindings for [libcups3](https://github.com/OpenPrinting/libcups), mentored by Bhavanishankar Ravindra (Bhavi) and Callahan Kovacs. His work you find in the "libcups3" branch of [his copy of the pycups repository](https://github.com/soumyaDghosh/pycups).


### GNOME Control Center: Finalizing the New Printing Architecture for GNOME, by Kaushik Vishwakarma
Mentors: **Mohit Verma**, Till Kamppeter, Zdenek Dohnal, KushagraSharma, Bhavanishankar Ravindra

Description from proposal:
> The latest CUPS 3.x versions support only driverless printing through the new IPP Everywhere architecture. Modern printers predominantly use driverless technology, supporting IPP printing and automatically configuring themselves via CUPS. Unlike traditional setups, these IPP printers do not require a permanent print queue. However, many printers still rely on drivers (PPD + filter). To address this, the Genome Control Center (GCC) must be adapted to support both driver-based and driverless printers. While significant progress has been made, substantial work remains before this new approach can be fully integrated into GCC. The project aims to complete all remaining tasks, ensuring a seamless user experience for GCC printers while refining all aspects for the final release.

Kaushik has created this [GitHub repository](https://gitlab.gnome.org/Kaushik1216/gnome-control-center.git).


### Porting Printing to Zephyr, by Hubert Guan
Mentors: **Iuliana Prodan**, Akarshan Kapoor, Benjamin Cabé, Till Kamppeter, Ira McDonald

Description from proposal:
> Current driverless print servers can be complex and resource-demanding in large part since they only run on full-scale operating systems like Linux. This project aims to port the different elements of OpenPrinting's printing stack (CUPS, libcupsfilters, etc.) to the Zephyr OS for simple future print server development on embedded devices. This will consist of systematically adding Zephyr modules and commits to the OS itself for each part of the printing stack. Importantly, Zephyr replacements and ports must also be used instead of the current Linux dependencies. This leads to further investigation into the capabilities of the Zephyr OS to support technologies such as Ghostscript and print buffering. Lastly, the stack must be tested on hardware to verify functionality and view benchmarks such as power consumption.

This project is a collaboration between the OpenPrinting and Zephyr sub-groups of the Linux Foundation.

Hubert is progressing well with his work an he documents it in [blog posts](https://hubertyguan.github.io/GSoC-2025/posts/).

He has also a [GitHub repository](https://github.com/HubertYGuan/zephyr) with his work.


### OpenPrinting Image Output Verification Framework, by Sanskar Yaduka
Mentors: **Till Kamppeter**, Zdenek Dohnal, Pratyush Ranjan, Mohit Verma, Bhavanishankar Ravindra

Description from proposal:
> Currently, OpenPrinting's testing only looks for errors or crashes; it does not automatically verify the content of print or scan output. This project uses OpenCV to create an automated tool that fills this gap. By analyzing controlled test images, the tool will verify key output characteristics essential for print quality: page completeness and order, correct orientation and scaling, expected color properties, and appropriate density/sharpness. Deliverables include the verification tool designed for integration into OpenPrinting's CI pipeline, a methodology for defining suitable test images, and comprehensive documentation. This project will significantly enhance the reliability and quality assurance of open-source printing solutions.

Inspired by an [openQA BoF on the GUADEC 2024 in Denver](/OpenPrinting-News-July-2024/#guadec-2024-in-denver), where I learned how the GNOMies are testing the correct behavior of GUI applications in automated (CI, ...) tests, I came to the idea of doing the same with print filter output for automated testing of the print job processing.

Alexander Pevzner, author of [ipp-usb](https://github.com/OpenPrinting/ipp-usb) and [sane-airscan](https://github.com/alexpevzner/sane-airscan), is also working on a [behavior-accurate simulator of an IPP multi-function printer](https://github.com/OpenPrinting/go-mfp) for testing print workflows and here he also suggests visual analysis of the simulator's print output, which matched my original idea somehow and so we joined our thoughts and posted this project.

Sanskar got selected as contributor on this project and is enthusiastically on it. Here is his [GitHub repository](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation). It has a detailed description of his work.


### Rust bindings for libcups2/3, by Mintu Gogoi
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter

Description from proposal:
> This project will create comprehensive Rust bindings and idiomatic wrappers for CUPS (Common UNIX Printing System), enabling Rust applications to fully interact with printers. We'll develop a layered architecture with low-level FFI bindings, safe Rust abstractions, and a DBus/zbus service layer for secure application integration. The implementation will balance leveraging existing C code in libcups while providing memory safety and ergonomic APIs. Key deliverables include core libcups bindings, an idiomatic Rust API, async support through tokio, a secure DBus service, and integration with the Common Print Dialog Backend (CPDB) for COSMIC desktop environment compatibility

Here is Mintu's work in his [GitHub repository](https://github.com/Gmin2/cups-rs).


### Rust bindings for cpdb-libs, by Titiksha Bansal
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter, Chandresh Soni, Pratyush Ranjan, Bhavanishankar Ravindra

Description from proposal:
> The Common Print Dialog Backends (cpdb-libs) library from OpenPrinting serves as a bridge between application print dialogs (like GTK, Qt, LibreOffice, Firefox, Chromium, etc.) and diverse print technologies (such as CUPS/IPP and cloud printing services). It decouples application UIs from backend print systems, enabling more flexible and rapid integration of new print technologies across all platforms. While it's natively written in C, bindings are required for other languages. Rust, known for its safety and concurrency advantages, currently lacks such bindings. This project aims to develop safe and idiomatic Rust bindings for cpdb-libs, enabling seamless integration of modern print backend capabilities in Rust-based applications.

Titiksha's report for the first month:
> Project Progress
> 1. Project Setup
>    - Created Rust project structure with bindgen integration
>    - Successfully generated FFI bindings for cpdb-libs (v2.3)
>    - Implemented safe Rust wrappers for core printer management functions
> 2. Key Implementations
>    - Printer discovery and job submission workflows
>    - Memory-safe resource handling with proper RAII patterns
>    - Async callback translation (C → Rust) for printer updates
>
> Challenges Faced
> 1. FFI Compatibility<BR>
>    Issue: Rust 2024's stricter unsafe extern requirements<BR>
>    Solution: Added build.rs post-processing to modify generated bindings
> 2. Function Naming<BR>
>    Issue: Mismatch between C (camelCase) and Rust (snake_case) conventions<BR>
>    Solution: Standardized on exact C function names in FFI calls
> 3. Memory Safety<BR>
>    Issue: Proper cleanup of C-allocated resources<BR>
>    Solution: Implemented Drop traits with null checks for all wrapper types
>
> Areas Needing Guidance
> 1. Advanced Features
>    - Help needed with media/margin handling implementations
>    - Clarification on translation table management

Here is Titiksha's work in her [GitHub repository](https://github.com/TitikshaBansal/cpdb-rs).


### Utilizing OSS-Fuzz-Gen to Improve Fuzz Testing for OpenPrinting Projects, by Zixuan Liu
Mentors: **Jiongchi Yu**, **George-Andrei Iosif**, Dongge Liu, Till Kamppeter, Shivam Mishra, Akarshan Kapoor

Description from proposal:
> This project aims to improve fuzz testing for OpenPrinting’s C/C++ codebases by leveraging OSS-Fuzz-Gen, a new framework that uses Large Language Models (LLMs) to assist fuzz testing. While some OpenPrinting projects are already integrated into Google’s OSS-Fuzz, current fuzzing efforts achieve limited runtime coverage (e.g., only 11.84% for cups), leaving many functions untested. To address this, the project will (1) refine existing fuzzers, (2) improve corpus and dictionary quality using LLMs, and (3) generate additional fuzz harnesses with OSS-Fuzz-Gen to improve the coverage. This will enhance test depth, uncover hidden vulnerabilities, and strengthen the security of OpenPrinting projects.

Our OSS-Fuzz team, consisting of Jiongchi Yu (TTfish) and George-Andrei Iosif from last year's GSoC ([Report](https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024)), [Ubuntu Summit workshop](https://www.youtube.com/watch?v=S0IyScIRzb8)), and now with this year's contributors Zixuan Liu and Mohammed Imaduddin ([see below](#integrating-oss-fuzz-for-go-based-and-python-based-openprinting-projects-by-mohammed-imaduddin)) added, is continuing to do great work.

Zixuan has posted the following summaries of his work in the OSS-Fuzz team's Telegram group:

May 26, 2025:
> Hi. This is a quick update on my GSoC progress this week.
>
> I’ve submitted a PR to the OpenPrinting/fuzzing repository to support oss-fuzz-gen although it is a simple modification: https://github.com/OpenPrinting/fuzzing/pull/9
>
> If you have any suggestions or feedback, please leave a comment in the doc or in this group. Thank you!

June 5, 2025:
> Each time oss-buzz-gen is run, several rounds of harness generation will be performed for every target function until a usable harness is generated. Each round may generate around 500~1500 prompt tokens and around 1000 completion tokens. Using my API (gpt-4o) only costs about $0.02 per round, which is not a lot, so it's alright

June 16, 2025:
> Firstly, fuzz_ppd_gen_1, the fuzzer I added last week has achieved higher coverage: directly increasing CUPS coverage to 20%. This fuzzer has achieved good results.
>
> Based on last week's goal, I generated a total of 5 new fuzzers using my own developed tool. Three of these fuzzers have already submitted by PR. These three fuzzers are related to conflicts, options, and cache related functions, and have discovered crash related to heap overflow.
>
> However, some problems have arisen. Firstly, if I add all the new fuzzers, it will cause a decrease in the coverage of the previously effective fuzz_ppd_gen_1 (locally test). This may be related to the corpus variation rules of OSS Fuzz, or it may be related to my testing time. So @ttfish suggested that I could first submit the fuzzer to OSS Fuzz for long-term running and testing, and then analyze it if any problems arise.
>
> The second problem is that I don't know why I have called the _ppdCacheCreateWithPPD function in fuzz_ppd_gen_cache, but it has not generated coverage. I want to know how to trigger these functions.
>
> Next is my plan for next week. I plan to fix the issues in fuzz_ppd_gen_cache and start analyzing the bugs discovered by fuzzing, especially heap-buffer-overflow.

June 23, 2025:
> I have mainly completed two tasks. 
>
> The first is to fix fuzz_ppd_gen_cache. Due to the design problem of fuzzer, crashes appeared before executing more possible paths, and these crashes are actually false positives. Therefore, the fuzzers added last week did not generate effective coverage. I tried to let LLM refer to the cachebench.c file in cups to generate a new fuzz_ppd_gen_cache, which has submitted to oss-fuzz.
>
> The second is to analyze the crashes. Taking heap-buffer-overflow as an example, tracing the function call stack, I find it that this is an error sample caused by problems in the fuzzer implementation(details in the doc). So I deleted fuzz_ppd_gen_options because it has hardly help for coverage. Maybe we can also modify the source code of string.c to improve robustness (I don't know if it is necessary, because normally target functions will not get illegal strings.).

Zixuan's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Zixuan's user name on GitHub is "pushinl".


### GTK Print Dialog: Modern dialog with built-in preview in main view, by Yash Kumar Kasaudhan
Mentors: **Michael Weghorn**, **KushagraSharma**, Till Kamppeter, Zdenek Dohnal, Shivam Mishra

Description from proposal:
> We are trying to solve the problem of print dialogs in the gtk. The actual gtk contains a very simplistic approach regarding the print dialogs which need to be improved. As gtk is a parent library for most of the softwares. So its print dialogs need to be updated, as its affecting the most of the softwares relying on them. So, I am determined to solve the process of print dialog and provide it a modern look of print dialog which contains the print preview and print dialog in same pane. The steps i choose to work on came from the great research i did on the software that have this modern dialog. Especially i got attracted with the approach of the libreoffice. below are the steps : 1. Add the return button to the print preview pane in gtk. 2. Sync the print dialog setting with the print preview pane in gtk. 3. Extend the class of print preview so that other softwares could write there own algorithm for it. 4. Combine the print preview pane and print dialog into one.


### Integrating OSS-Fuzz for Go-Based and Python-Based OpenPrinting Projects, by Mohammed Imaduddin
Mentors:  **Jiongchi Yu**, **George-Andrei Iosif**, Dongge Liu, Till Kamppeter, Ira McDonald, Shivam Mishra

Description from proposal:
> The OpenPrinting ecosystem includes several utilities for driverless printing, protocol implementation, and printer management, including projects written in Go and Python. These polyglot projects currently lack fuzz testing, making them prone to undetected bugs and security issues. This project proposes integrating such polyglot OpenPrinting projects, namely ipp-usb, goipp, pycups, and pyppd, into OSS-Fuzz to enable continuous, large-scale fuzzing. The work will include evaluating current unit tests, improving coverage where lacking, identifying suitable fuzzing targets based on test coverage and risk, developing fuzz harnesses, and integrating the projects into OSS-Fuzz. This effort will help expand OSS-Fuzz coverage across OpenPrinting projects, further strengthening their overall security and reliability.

Mohammed has posted the following summaries of his work in the OSS-Fuzz team's Telegram group:

May 26, 2025:
> Summarizing the tasks that I have done so far, I have completed setting up the goipp project in the oss-fuzz repo locally with its harness located in a fork of the openprinting/fuzzing repo on my github. I have also built and ran the initial fuzzer, which can be considered as a primary fuzzing target, the harness for the Message.DecodeBytes() function. I have also identified other key target areas for fuzzing in the goipp project, which I plan to discuss with alexander in the coming week and write fuzzing harnesses for the same. Later, when the coding period begins, I plan to prepare a pr for the goipp project to integrate into oss-fuzz (this will include harnesses of the key target areas located in the openprinting/fuzzing repo along with dockerfile, build scripts and project.yaml). If I face any issues or have any doubts, I'll text in this group. Thank you

June 15, 2025:
> Last week, as I mentioned in the meet, I discussed with Alexander, for the goipp project, finalized the fuzzing harnesses and created the pr to OSS-Fuzz. Then i started with the ipp-usb project and identified the key fuzzing areas and also created fuzzing harness for a core function that extracts string values from ipp. This week, I wrote another fuzzing harness for the xml parsing logic and wrote the build script and the dockerfile for the integration into OSS-Fuzz completing the fuzzing pipeline for the ipp-usb project. Before creating a pr to the OpenPrinting/fuzzing repo I tested and tried building the fuzzers on OSS-Fuzz locally, which failed and the reason to it was that ipp-usb is a program and cannot be imported. I couldn't figure that out yet as I was in bangalore and I'll try to resolve it as said by @ttfish this week and once fixed, I will create the initial integration PR for the ipp-usb into OpenPrinting/fuzzing. 
>
> As far as the goipp initial integration PR in the OSS-Fuzz is concerned, I rebased and squashed the commits as said by @ttfish and thank you so much @iosifache for texting the maintainers and one more thing, as @iosifache said, I have also replaced with a description of what the pr does.
>
> Thank you and sorry I might not be able to attend the meeting tomorrow. And I'll get back to work as soon as I reach Hyderabad and complete the pipeline of the ipp-usb project with no build errors.

June 23, 2025:
> I continued working on writing the harnesses of ipp-usb. Working on the not importable issue, I tried the local copy approach (copying all files source files into the fuzzing repo and using the go mod edit -replace to make it importable locally using the build file). I wrote fuzzing harness for the internal config loader, another fuzz harness that targets the IPP attribute helper to fuzz attribute value parsing logic. I also experimented with FuzzHTTPProxy to fuzz HTTP request handling by mocking the usb transport. When trying to build these fuzzing harnesses using OSS-Fuzz, the build failed each time. Issues like broken internal imports, go.mod conflicts and dependency problems were causing the build to fail. 
After all these struggles, I planned to switch to a (hopefully) cleaner approach by forking ipp-usb and changing package main to package usb, and using this fork in OSS-Fuzz. 
>
> Another issue, regarding the introspector build fail is still un-understandable.
>
> Also, It'd be of great help if Alexander helps in better understanding of the ipp-usb project. I texted him about 6 days back but didn't get a reply back

Mohammed's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Mohammed's user name on GitHub is "mdimado".


### Modernize OpenPrinting Website with Next.js, by Rudra Pratap Singh
Mentors: **Till Kamppeter**, Zdenek Dohnal, Deepak Patankar, Bhavanishankar Ravindra

Description from proposal:
> The OpenPrinting website is an essential platform for Linux printing resources. The current system lacks modern UI enhancements and optimized SEO. Additionally, the existing Foomatic lookup page relies on SQL and dynamic web technologies, which I will be migrating to a fully static implementation. This transition will eliminate dependencies on an SQL server and a web server, with everything being managed exclusively on GitHub. This project aims to modernize the OpenPrinting website by migrating it to Next.js, a powerful React framework that ensures scalability, performance optimization, and maintainability. The transition will include: - Rebuilding the site with a modular, component-based Next.js architecture. - Migrating the Foomatic lookup page to a static page for improved efficiency. - Implementing Server-Side Rendering (SSR) and Static Site Generation (SSG) to optimize performance. - Deploying the new website with a CI/CD pipeline for automated updates and maintenance.

Rudra still had exams in June and an internship afterwards. He has already done some initial work ("... including markdown rendering for static sites, slug generation and with toc.") but will actually start his GSoC work mid-August when his internship is done. His final submission deadline is moved to November.

