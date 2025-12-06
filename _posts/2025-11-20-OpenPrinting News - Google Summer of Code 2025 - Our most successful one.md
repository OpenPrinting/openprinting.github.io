---
title: OpenPrinting News - Google Summer of Code 2025 - Our most successful one!
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: That's a wrap! All the 11 contributors have made it!
---
The [Google Summer of Code 2025](https://summerofcode.withgoogle.com/programs/2025/organizations/the-linux-foundation) has come to its end! And since we started participating back in 2008 this edition was the best one for us, with 11 contributors having delivered amazing work, nobody has failed this time.

What especially helped us were the Opportunity Open Source conferences (OOSC) which we are organizing in India since 2023 ([IIT Mandi](/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india)) and especially [last year's one in the IIT Kanpur](/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur). Mandi helped us already to get 11 contributors for OpenPrinting last year, but last year's OOSC caused even more momentum. We got ~60 inquiries of interested candidates, let 40 write a proposal after passing our selection and onboarding process, and we finally selected 19 proposals to rank and ask slots for from the GSoC organizers.

Unfortunately, we got only 11 contributor slots, so the 11 highest ranked got our GSoC contributors. This means that after all this effort we did not get more contributors than last year, but we could for the first time select from several candidates for many of our [posted project ideas](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2025-openprinting-projects). And with this we ended up with even more excellent contributors than last year, especially nobody failed in midterm or final evaluations.

They all have done all or at least most of their project work and now they are finishing off some parts or working on their code getting merged upstream.

See also the [details about our selection process](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#the-selection-process).

This is the fifth post about this year's Google Summer of Code, after the [presentation of our project ideas](/OpenPrinting-News-Google-Summer-of-Code-2025-Project-Ideas-List-posted/), [the Linux Foundation being accepted as mentoring organization](/OpenPrinting-News-Google-Summer-of-Code-2025-The-Linux-Foundation-is-accepted-as-mentoring-organization/), and the [first reports from the contributors](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/) and the [second reports of most contributors](/OpenPrinting-News-Google-Summer-of-Code-2025-The-amazing-work-is-going-on/).

In this post I will post new write-ups from the GSoC contributors, links to their official final reports and anything else interesting around their work.

**Thanks a lot to all the contributors who brought the development of printing with FOSS forward, mentors who stepped up voluntarily for selecting the best contributors for their area, introducing and guiding them through their project work, and to the organizers of the Google Summer of Code at Google, especially Stephanie Taylor, for their tireless work on running the program.**

By the way, 17 candidates have already shown their interest to get
a GSoC contributor for OpenPrinting in 2026. We are already doing the onboarding and give them assignments. So it seems that we are getting more known and especially we were also successful with the [OOSC 3.0](/OpenPrinting-News-Opportunity-Open-Source-3.0-in-the-IIT-Kanpur,-India/) this year.

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and (new) on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)



## The contributors and their work
And here are the links to their final reports/work products (with links to their code) and the last write-ups about their work after the [first](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/) and [second](/OpenPrinting-News-Google-Summer-of-Code-2025-The-amazing-work-is-going-on/) news post, of all our contributors.

<BR>

### KDE Print Manager vs. CUPS 3.x, by Tarun Srivastava
Mentors: **Mike Noe**, **Till Kamppeter**, Nicolas Fella, Zdenek Dohnal<BR>
[Work product](https://github.com/Lord-Morpheus/GSOC-2025?tab=readme-ov-file#google-summer-of-code-2025---project-summary)

PASSED

Tarun's feedback of his final evaluation:
> ***I would like to thank you all for providing the support and direction needed. OpenPrinting and KDE, mentors of both the organizations are really helpful in solving any kind of issue arising.***

<BR>

> So, what we did till last write-up? Yeah right, we had update the KDE framework for CUPS 3.x, but it couldn't be released yet because we had decided to take a little longer path. So, now we are to establish a automatic testing setup (autotests) and then include it with the CI/CD pipeline. This will reduce the hectic work of manually testing each and every function which will get updated with CUPS 3.x inclusion. 
>
> Now, with the recent work done on this, we have preliminary autotests in place. I will not go into detail but I can see a pile of work that could be done for KDE on autotest, but we will first finish up the autotest part required for CUPS v3.
>
> I have done all of the part which we were supposed to do in this year's gsoc. Now we wait for the reviewers to review the PR. Once they review and I answer to their comments, only after that the KDE software will be able to move to CUPS v3. 
>
> Now I am not sure how much time will they take to review, So merging the PR will take some time. Since, I am not leaving this work behind anytime soon. I am sure that if reviewing is done on time we can finish this project till year's end or before next GSOC. Only in cases that more work comes up with KDE devs deciding to change something, the work will get extended.
>
> Since, I will continue to work on this even after GSOC's end. so if the PR not get reviewed before this year's GSOC end, we will still have plenty of time to fix it.

[Tarun had already volunteered](/OpenPrinting-News-June-2024/#kde-print-manager) for [this project](/OpenPrinting-News-April-2024/#kde-print-manager) for some time and is now finishing it as a GSoC project.

<BR>

### Porting pyCUPS to CUPS 3.x API and implementing it in system config printer, by Soumyadeep Ghosh
Mentors: **Bhavanishankar Ravindra**, **Callahan Kovacs**, Till Kamppeter, Zdenek Dohnal, Kushagra Sharma<BR>
[Work product](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-final-submission)

PASSED

Soumyadeep's feedback of his final evaluation:
> ***Callahan, without your continuous support, I could've never been able to complete this project. All those brainstorming sessions, all those Eureka moments, all those jokes on hilarious APIs during the weekly calls, I'll surely miss them. I hope, I can continue working with you, even in future.***
>
> ***Bhavani bhaiyaa, your support and push was one of my biggest motivators. All those sleepless nights, you calming me down, giving me a bigger picture about everything we were doing, ಧನ್ಯವಾದಗಳು ಅಣ್ಣ***
>
> ***Till, thank you for picking me up. I'm sure, you picking me up randomly at UbuCon Asia 2024 and suggesting me the idea and then I pitching my solution, or our discussions during the night before UbuCon Asia 2025, will have a great impact in Open Printing.***

<BR>

[Soumyadeep](/OpenPrinting-News-August-2024/#soumyadeep-ghosh) has continued presenting his GSoC work in his blog:
- [GSOC: PyCups3 is intelligent?](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-pycups-is-intelligent/)
- [GSOC: PyCups3 is Abstracting!](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-pycups-is-abstracting/)

> Regarding the recent works, it was plain implementation. I went ahead and implementing more APIs related to http. Creating classes to represet c structures like http_t, http_field_t, http_addr_t etc and various enums like http_encoding_t, http_state_t etc.
>
> There was also a bit of research around simplifying initializers of these classes and getting almost true method overloading in python. This includes looking into custom modules like [https://multiple-dispatch.readthedocs.io/en/latest/](https://multiple-dispatch.readthedocs.io/en/latest/)
>
> and at the end getting a very simple implementation with the singledispatch apis from the functools standard library. I'll soon write a blog post elaborating this, as this goes into the fundamental concepts of object oriented programming

His work you find in the "libcups3" branch of [his copy of the pycups repository](https://github.com/soumyaDghosh/pycups).

And his [final report](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-final-submission) ends with the words:

> So, take up cups and Stay caffeinated! ☕ Cheers Till!


<BR>

### GNOME Control Center: Finalizing the New Printing Architecture for GNOME, by Kaushik Vishwakarma
Mentors: **Mohit Verma**, **Till Kamppeter**, Zdenek Dohnal, KushagraSharma, Bhavanishankar Ravindra<BR>
[Work product](https://medium.com/@kaushik.vishwakarma2003/gsoc-2025-thelinuxfoundation-advancing-printer-management-in-gnome-control-center-c36a1ce8ae07)

PASSED

Kaushik's feedback of his final evaluation:
> ***My mentor, Till Kamppeter, was incredibly helpful throughout the project. He provided clear guidance, quick feedback on merge requests, and deep technical insights into CUPS and GNOME printing architecture. His approach of encouraging exploration while providing just the right amount of direction made this experience both challenging and rewarding.
In the future, mentors could perhaps organize a short weekly sync call (even 15 minutes) early in the program to ensure alignment and faster onboarding for new contributors.***

<BR>

> I’m happy to share that we’ve created our first merge request (MR) in the GNOME Control Center (GCC)! 🎉
>
> This MR has been selected for inclusion in the upcoming GCC 50 major update, scheduled for release next year.
>
> Our contribution adds support for driverless IPP printers and printer applications, grouping associated printers in a more intuitive GUI layout.
?
> During development, we encountered an issue with duplicate printer entries, as the same printer could be discovered both via CUPS and DNS-SD records due to asynchronous discovery in GCC.
>
> To resolve this, we updated the GCC printer discovery API from using cupsGetDests() to cupsEnumDests(), which gives us greater flexibility and control over duplicate detection and management.
>
> Next, we plan to submit another merge request that will allow users to add printers directly within the Printer Application — without needing to open the web interface — restoring the classic CUPS-like behavior in GCC.
>
> A huge thanks to Till Kamppeter for his guidance, testing, and help in identifying edge cases throughout this process.
>
> 🔗 Merge Request Link: [[Link](https://gitlab.gnome.org/GNOME/gnome-control-center/-/merge_requests/3226)]

<BR>

### Porting Printing to Zephyr, by Hubert Guan
Mentors: **Iuliana Prodan**, Akarshan Kapoor, Benjamin Cabé, Till Kamppeter, Ira McDonald<BR>
[Work product](https://hubertyguan.github.io/GSoC-2025/posts/final/)

PASSED

Hubert's feedback of his final evaluation:
> ***I have had a great time working with my mentors and Org Admins, as you have always helped me with my questions on different aspects of the project and encouraged me through all the highs and lows of this extended journey. I liked that, even though there is a clear project deadline, you have been more understanding of all the changes that happen over time with the project timeline. In other words, I didn't have to necessarily be completely swamped during the last weeks like some of the PhD students I know before a paper deadline. I also like how GSoC and projects like mine have been more focused on the actual code and the journey rather than trying to show off to a conference.***

<BR>

Hubert Provided excellent weekly summaries of his work in his [blog posts](https://hubertyguan.github.io/GSoC-2025/posts/).

Hubert's [GitHub repository](https://github.com/HubertYGuan/zephyr) of the project.

> I am extremely grateful for all the support I have received from my mentors in both OpenPrinting and the Zephyr Project as I continue porting the CUPS/PAPPL printing stack to Zephyr. I can now confirm that the main parts of libcups, such as the HTTP, IPP, and array APIs, are operational on Zephyr. I have been able to sort out the issues with these APIs in large part thanks to large external memory modules. However, this does mean that only microcontrollers that have extra MBs of external memory will be able to use libcups without memory issues. I have also done a bunch of testing with ippeveprinter, which is a simple print server emulator. Although I was not able to get it to process jobs correctly, I did figure out how to use Zephyr’s version of mDNS Responder to advertise the server and accept user requests. However, this does mean all mDNS functionality has to be switched to Zephyr’s API since this API and libcups’ API are incompatible as Zephyr’s API requires everything to be statically declared and linked before run time.
>
> I am currently working on using these libcups APIs and modifying PAPPL to run a simulated print server. Since there is not much time left for the project, I will have to leave some things like TLS out of the picture for now and aim to get a basic version of PAPPL that can process jobs appropriately. I have also documented my progress and what still needs to be done in my project proposal below, so that others can pick up on ironing out the remaining issues and port remaining software like ippusb_bridge. You can also look through what I have done in my blog linked below. Overall, this project has been a great learning experience for me in managing embedded devices and large software projects, and I can’t wait to see how this will be continued and adopted in the future!
>
> Proposal: [https://docs.google.com/document/d/1cYL6S2JSkzY0ln1w_s3qwpm85-keB9jaVjGSwyPg5NM/edit?usp=drivesdk](https://docs.google.com/document/d/1cYL6S2JSkzY0ln1w_s3qwpm85-keB9jaVjGSwyPg5NM/edit?usp=drivesdk)
>
> Blog: [https://hubertyguan.github.io/GSoC-2025](https://hubertyguan.github.io/GSoC-2025)

<BR>

### OpenPrinting Image Output Verification Framework, by Sanskar Yaduka
Mentors: **Till Kamppeter**, Zdenek Dohnal, Pratyush Ranjan, Mohit Verma, Bhavanishankar Ravindra<BR>
[Work product](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation)

PASSED

<BR>

> Since my last update, I've significantly improved the robustness and usability of the testing framework. The biggest technical achievement was adding a dedicated filter chain testing pipeline that isolates CUPS filter processing from hardware, letting us test what gets sent to the printer without actually printing - solving the scanning/hardware confusion.
>
> I implemented error handling for edge cases that were crashing the system. The OpenCV feature matching now gracefully handles images with insufficient key points (like solid colors or simple gradients), and the texture analysis got a massive performance boost by optimizing the Local Binary Pattern calculation from pixel-by-pixel loops to vectorized operations with intelligent downsampling.
>
> I also fixed pycups integration issues that were breaking printer capability discovery across different distributions. The system now properly detects filter chains, printer modes, and PPD configurations on both Ubuntu and Fedora, with fallback mechanisms when direct CUPS API calls fail.
>
> Added a four-tier HOWTO system that progressively demonstrates capabilities: basic quality analysis (15-20 min), fast filter chain testing (5 min), comprehensive document validation, and individual algorithm exploration. Each is self-contained and verifiable.
>
> The verification infrastructure now includes automated setup checks, dependency validation, and example testing scripts that confirm everything works before users invest time. 
>
> The framework handles real-world variability: different printer queue names, missing dependencies, and various CUPS configurations across distros, making it production-ready for CI/CD integration and actual print driver development workflows.

Here is Sanskar's [GitHub repository](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation). It has a detailed description of his work.

<BR>

### Rust bindings for libcups2/3, by Mintu Gogoi
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter<BR>
[Work product](https://github.com/Gmin2/cups-rs)

PASSED

<BR>

> During GSoC 2025, I developed cups-rs, a safe Rust wrapper for the CUPS printing system, covering most of the C API. The library provides complete printer discovery, job management with multi-document support, and advanced print options (color, duplex, quality, media). Key enterprise features include authentication callbacks for GUI applications, SSL/TLS certificate management, destination management with conflict detection, server configuration for multi-server environments, and localization support for internationalized UIs. All unsafe C FFI operations are wrapped in safe abstractions following RAII patterns for automatic cleanup. The implementation includes low-level IPP request handling, direct connection management with timeouts, and comprehensive error handling with recovery suggestions. I provided 7 working examples, integration tests, and extensive documentation. The project progressed through three versions (0.1.0 → 0.3.0), with each release adding production-ready features. The library supports all common document formats and provides type-safe enums throughout. cups-rs enables Rust developers to build printing applications and enterprise tools without unsafe C bindings, demonstrating that complex system APIs can be made safely accessible to the Rust ecosystem. The codebase uses minimal dependencies with automatic bindgen FFI generation and pkg-config integration. This work establishes a solid foundation for future async/await support and enhanced builder patterns.
> 
> The library - [https://docs.rs/crate/cups_rs/0.3.0](https://docs.rs/crate/cups_rs/0.3.0)
> The docs in - [https://docs.rs/cups_rs/latest/cups_rs/](https://docs.rs/cups_rs/latest/cups_rs/)
> and the code in - [https://github.com/Gmin2/cups-rs](https://github.com/Gmin2/cups-rs)

Here is Mintu's work in his [GitHub repository](https://github.com/Gmin2/cups-rs).

<BR>

### Rust bindings for cpdb-libs, by Titiksha Bansal
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter, Chandresh Soni, Pratyush Ranjan, Bhavanishankar Ravindra<BR>
[Work product](https://github.com/TitikshaBansal/cpdb-rs)

PASSED

Titiksha's feedback of her final evaluation:
> ***My mentor was very supportive and approachable throughout the program. They provided timely feedback on my code, explained design decisions clearly, and encouraged me to think through problems instead of just giving direct answers. This helped me build confidence in my problem-solving and debugging skills.***
>
> ***Overall, I’m very grateful for the mentorship—I learned a lot not only technically but also about open-source collaboration and best practices.***

<BR>

> Over the course of the Google Summer of Code 2025 program, I successfully completed the development of safe and idiomatic Rust bindings for the Common Print Dialog Backends (cpdb-libs) library under OpenPrinting (The Linux Foundation).
>
> Key Achievements
>
> Binding Generation:
>
> Generated and refined raw Rust bindings for cpdb-libs using bindgen, ensuring compatibility with cpdb-libs v2.3 and the latest Rust 2024 standards.
>
> Safe Rust Wrappers:
>
> Designed and implemented memory-safe, idiomatic Rust abstractions for core cpdb-libs functionalities, including printer discovery, job submission, and queue management.
>
>Error Handling & Resource Management:
>
> Introduced structured error handling using custom Result types and enums, and implemented RAII-based resource cleanup through Drop traits to eliminate memory leaks.
>
> Async Callbacks & Data Mapping:
>
> Translated asynchronous C callbacks into safe Rust equivalents, ensuring seamless communication between Rust and C components.
Mapped complex cpdb-libs data structures into strongly typed Rust representations, improving developer ergonomics.
>
> Testing & Validation:
>
> Wrote extensive unit and integration tests to verify API correctness and stability across Linux and macOS.
Validated bindings with real print workflows using sample Rust applications.
>
> Documentation & Crate Packaging:
>
> Authored comprehensive documentation, including code examples and usage guides.
>
> Packaged the bindings into a Rust crate for future publication and community use.
>
> Outcome
>
> The completed project delivers a robust, safe, and developer-friendly Rust interface for cpdb-libs, enabling modern Rust applications to leverage CUPS-based printing functionality without unsafe memory operations. It lays the foundation for future expansion of OpenPrinting’s ecosystem into the Rust community.
>
> I am grateful to my mentor and the OpenPrinting community for their guidance throughout this journey. This project has been an invaluable experience, strengthening my expertise in systems programming, FFI integration, and open-source collaboration.

Here is Titiksha's work in her [GitHub repository](https://github.com/TitikshaBansal/cpdb-rs).

<BR>

### Utilizing OSS-Fuzz-Gen to Improve Fuzz Testing for OpenPrinting Projects, by Zixuan Liu
Mentors: **Jiongchi Yu**, **George-Andrei Iosif**, Dongge Liu, Till Kamppeter, Shivam Mishra, Akarshan Kapoor<BR>
[Work product](https://github.com/OpenPrinting/fuzzing/blob/main/contributions/GSoC%202025%20-%20Utilizing%20OSS-Fuzz-Gen%20to%20Improve%20Fuzz%20Testing%20for%20OpenPrinting%20Projects/Final%20report.md)

PASSED

Zixuan's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Zixuan's user name on GitHub is "pushinl".

<BR>

### libpdfrip - a PDFio-based PDF renderer, C++-free with permissive license by Yash Kumar Kasaudhan
Mentors: **Uddhav Phatak**, **Till Kamppeter**<BR>
[Work product](https://github.com/OpenPrinting/libpdfrip)

PASSED

Yash's feedback of his final evaluation:
> ***I am very glad and thankful to my mentors who kept a lot of patience with me and believed that I can do things. Their constant support and kindness were very special. Every single time I had any doubts or problems, they were there for me and guiding me throughout. I honestly thank my mentors because if today I feel and can say that I am a software engineer or know engineering, it is because of them only. Before that, I never worked on these kinds of software and never thought about it either.***

<BR>

If you had read the [last news post about our GSoC progress](/OpenPrinting-News-Google-Summer-of-Code-2025-The-amazing-work-is-going-on/#gtk-print-dialog-modern-dialog-with-built-in-preview-in-main-view-by-yash-kumar-kasaudhan) you are probably wondering that Yash's project has a completely different title now.

Yash was originally selected on his proposal to [modernize the UI of GTK's print dialog](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/#gtk-print-dialog-modern-dialog-with-built-in-preview-in-main-view-by-yash-kumar-kasaudhan), especially adding an embedded preview as we already have in the dialogs of
LibreOffice, Mozilla (Firefox, Thunderbird), and the Chromium Browser.

He also interacted with the upstream developers, starting a thread on
GNOME's Discourse platform:

"[Print Preview Missing in GTK Print Dialog on Fresh Kali Linux —
Appears After Installing Evince](https://discourse.gnome.org/t/29520)"

and in a follow-up thread

"[Print dialog for GTK provided by portal - Help from GSoC contributor](https://discourse.gnome.org/t/31029)"

In response to this I decided to pull back from this project and to re-assign Yash to something different. I offered him some alternatives and after he had quickly studied them he settled on working on a PDF interpreter based on Michael Sweet's [PDFio PDF manipulation library](https://github.com/michaelrsweet/pdfio).

The reason for developing such a PDF interpreter is to be able to once,
provide one under a permissive license (Apache in our case) and second, to have an interpreter in straight C, not C++.

And he started very well on this project, according to the updates he gave me in the last days:

> I wanted to share a quick update on my progress with the PDF renderer for the pdfio parser.
>
> It's been a fantastic learning experience so far, and I'm following the project plan sequentially to ensure everything is built solidly from the ground up.
> 
> I'm thrilled to let you know that a major foundational piece is now complete: the renderer can successfully process and display all shapes and vector graphics from a PDF document. This means lines, boxes, and other drawings are rendering perfectly, which is a huge milestone!
>
> My current focus is now on the next exciting challenge: rendering text. This part is proving to be a bit tricky, but I'm actively working through it and am confident I'll have it sorted out soon.
>
> I am keeping the project board updated with all my tasks and progress. You can follow along here: [https://github.com/users/vididvidid/projects/5](https://github.com/users/vididvidid/projects/5)

> [https://github.com/vididvidid/pdfio/tree/feature/pdf2cairo](https://github.com/vididvidid/pdfio/tree/feature/pdf2cairo):
>
> my pdf2cairo renderer code

> Text is rendering sir.. it was the first preference of mine.. all the fonts and text are being rendered

> image renderer is half completed but there is some bug that's why image is not able to draw .. i just have to fix that bug only..

He liked this project and his new mentors:

> I would like to express my sincere gratitude to Uddhav Sir for his invaluable guidance, and to Till Sir for believing in my capabilities and entrusting me with this opportunity. This achievement was possible only because of their constant support and confidence in me.

So diverting him to the PDF renderer was a success, especially that I had a little doubt in the beginning as a PDF renderer is a big thing and we had only half a GSoC left.

Yash is motivated and wants to finish the project post-GSoC:

> the things that i have work on in order is .. 
> 1. image renderer
> 2. load encoded pdf.
> 3. renderer multiple pages.. 
> 4. your task which is multi-page pdf to the formats pwg/cup/apple raster..

<BR>

### Integrating OSS-Fuzz for Go-Based and Python-Based OpenPrinting Projects, by Mohammed Imaduddin
Mentors:  **Jiongchi Yu**, **George-Andrei Iosif**, **Till Kamppeter**, Dongge Liu, Ira McDonald, Shivam Mishra<BR>
[Work product](https://github.com/OpenPrinting/fuzzing/blob/main/contributions/GSoC%202025%20-%20Integrating%20OSS-Fuzz%20for%20Go-Based%20and%20Python-Based%20OpenPrinting%20Projects/Final%20report.md)

PASSED

Mohammed's feedback of his final evaluation:
> ***I am very grateful to my mentors for their guidance throughout the project. Till Kamppeter provided deep domain knowledge in printing protocols and OpenPrinting architecture, George-Andrei Iosif shared valuable insights on fuzzing methodologies and OSS-Fuzz infrastructure, and Jiongchi Yu offered detailed, step-by-step technical advice building on his previous GSoC experience. Their mentorship was both technically enriching as well encouraged independence and problem-solving.***

<BR>

> With the complex Go projects now integrated into OSS-Fuzz, the focus shifted to completing the project by addressing the two Python-based components: pyppd and pycups. This phase marked the first time Python projects from OpenPrinting were successfully integrated into OSS-Fuzz, addressing a significant security gap in the printing ecosystem.
>
> First, for pyppd, the Python library for managing PostScript Printer Description (PPD) files, I implemented 7 comprehensive fuzz harnesses. These fuzzers targeted core file processing and compression logic, which is crucial for handling the legacy PPD format. Key areas included testing PPD file archiving (fuzz_archive.py) and ensuring the integrity of compression and decompression round-trips (fuzz_compress.py, fuzz_compressor.py). I also created fuzz_ppd.py to specifically test the parser's resilience when faced with corrupted or malicious PPD data. The successful integration required careful configuration of the Python build and dependencies within the OSS-Fuzz environment.
> 
> Next, I tackled pycups, the official Python bindings to the CUPS API (libcups). This was a particularly demanding challenge due to the project’s dependence on the underlying C library, which necessitated rigorous testing of the binding layer for memory safety and input validation. I developed 7 specialized fuzz harnesses for critical CUPS operations. These included fuzzers for testing authentication callback handling (fuzz_auth_callback.py), buffer management (fuzz_buffer_handling.py), and the processing of IPP requests and responses (fuzz_ipp_io.py). A notable harness was fuzz_UTF8.py, designed to test string encoding and decoding across all functions, aiming to catch issues related to improper string handling at the C/Python boundary. With the successful creation and integration of these harnesses, the fuzzing pipeline for both Go and Python OpenPrinting projects is now complete and running on OSS-Fuzz.
>
> I would like to sincerely thank my mentors Till Kamppeter, George-Andrei Iosif, and Jiongchi Yu for their invaluable guidance throughout this project. Their insights on OpenPrinting architecture, fuzzing methodologies, and OSS-Fuzz integration were instrumental in completing this work. I’m also grateful to Alexander Pevzner for his assistance in understanding goipp and ipp-usb, and to the Google OSS-Fuzz maintainers for their prompt reviews and technical support. Finally, I thank the OpenPrinting community and the Linux Foundation for maintaining the projects and infrastructure that made this contribution possible.

Mohammed's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Mohammed's user name on GitHub is "mdimado".

<BR>

### Modernize OpenPrinting Website with Next.js, by Rudra Pratap Singh
Mentors: **Till Kamppeter**, Zdenek Dohnal, Deepak Patankar, Bhavanishankar Ravindra<BR>
[Work product](https://medium.com/@rudransh.iitm/static-pages-dynamic-impact-my-gsoc-2025-journey-119a2544f4c9)

PASSED

Rudra's feedback of his final evaluation:
> ***My mentors have been incredibly supportive throughout GSoC. They provided clear guidance when needed, encouraged independent problem-solving, and always ensured that discussions stayed constructive and technically insightful. Their feedback helped me think more deeply about architecture and scalability, and I genuinely appreciate their time, patience, and trust in me while giving me room to explore solutions. I’m grateful for the collaborative environment they fostered and look forward to continuing to contribute to OpenPrinting (The Linux Foundation).***

<BR>

Rudra has done an internship until Aug 22 and therefore started lately. Having extended his coding period to the maximum of 22 weeks he had 11 weeks remaining to do his project and he did great work in that time.

> I have built the **Foomatic Lookup Site**, which supports **lazy loading** of printer data, **search functionality** by name and manufacturer, and is **fully statically deployed** on GitHub Pages. The site fetches its data from JSON files generated by merging the actual Foomatic database. The project is still a work in progress, and several contributors have joined to help complete it — I’m currently mentoring them through the development process.

Not having completed his project and having many candidates interested in web development under the applicants for GSoC 2026 we plan to run one web development project again and Rudra is now working together with the candidates, to onboard them and give them assignments, with the side effect that the project work is continuing by that.
