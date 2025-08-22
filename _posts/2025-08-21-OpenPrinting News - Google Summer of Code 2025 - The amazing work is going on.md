---
title: OpenPrinting News - Google Summer of Code 2025 - The amazing work is going on!
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: The contributors have passed the midterm evaluations and their projects are taking shape ... And we also have some volunteers!
---
We are well in the middle of our journey now and everybody is doing great. This is the forth post about this year's Google Summer of Code, after the [presentation of our project ideas](/OpenPrinting-News-Google-Summer-of-Code-2025-Project-Ideas-List-posted/), [the Linux Foundation being accepted as mentoring organization](/OpenPrinting-News-Google-Summer-of-Code-2025-The-Linux-Foundation-is-accepted-as-mentoring-organization/), and the [first reports from the contributors](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/) we present now the second reports of most contributors.

In this post I will not only post write-ups of the actual GSoC contributors but also mention some valuable work contributed voluntarily.

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till) and (new) on LinkedIn: [@OpenPrinting](https://www.linkedin.com/company/openprinting/posts/).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)


## Voluntary contributions
Unfortunately, we did not get many contributor slots compared to the number of proposals we have ranked, but fortunately, we got some voluntary contributors.

**Modernization of the UI of the Qt print dialog**

First, **Abrar Nasir Jaffari**, has done good work on the completion of the merge requests for the [CPDB support in of the Qt print dialog](https://github.com/TinyTrebuchet/gsoc22/) GSoC project of Gaurav Guleria back in 2022 and created a [pull request](https://github.com/qt/qtbase/pull/122) for the current code base of [Qt](https://contribute.qt-project.org/).

He plans to do the [modernization of the UI of the Qt print dialog](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2025-openprinting-projects#qt_print_dialogmodernize_the_user_interface) a GSoC project idea for which we did not get a contributor slot this year. He has also an eye in our Fuzz testing activity.

He writes:

> Qt CPDB integration update:
>
> ✅ COMPLETED:
> - Applied Gaurav's CPDB patch to Qt 6.8
> - All testing passed (printer enumeration, IPP communication)
> - IPP emulator verified: "Get-Printer-Attributes successful-ok"
> - PR created: [https://github.com/qt/qtbase/pull/122](https://github.com/qt/qtbase/pull/122)
>
> 🔧 CURRENT STATUS:
> - CLA signed ✅
> - Fixing merge conflicts (4 files in printsupport/)
> - Should be ready for Qt maintainer review within hours
> 
> 📊 TEST RESULTS:
> - Printer discovery: ✅ Working
> - IPP options (not PPD): ✅ Verified  
> - Print job submission: ✅ Success
> - cpdb-text-frontend consistency: ✅ Confirmed
>
> 🔗 VIEW PR: [https://github.com/qt/qtbase/pull/122](https://github.com/qt/qtbase/pull/122)
> 
> Next: Resolve conflicts → Qt maintainer review → Begin modernization phase

**Scanning support in PAPPL/Scanner Applications**

**Akarshan Kapoor** had worked on [scanning support in PAPPL](https://www.youtube.com/watch?v=AAeUseU35Cc) (to get [Scanner Applications](/current/#scanner-applications) for sandboxed packaging of scanner drivers) in GSoC [2023](https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci) and [2024](https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc) and as he did already 2 GSoC with that he is not eligible as contributor any more. **Kshiitij Sharma** has stepped up as a volunteer to finish the project together with Akarshan.

**PDF renderer/displayer based on PDFio**

And **Uddhav Phatak**, contributor in the GSoC 2024, on [Replace QPDF by PDFio as PDF manipulation library in libcupsfilters](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce), after getting the [Pull Request of his work](https://github.com/OpenPrinting/libcupsfilters/pull/71) merged, wants to create a [PDF renderer/displayer based on PDFio](https://wiki.linuxfoundation.org/gsoc/google-summer-code-2025-openprinting-projects#extend_pdfio_to_be_a_pdf_rendererdisplayer) voluntarily, a project he applied already for in this year's GSoC, but we did not get enough contributor slots from Google. This would be the **first PDF renderer under a permissive license** for easy inclusion of a PDF viewer for a preview in the print dialog GUI toolkit libraries.


## The contributors and their work
And here is the second round of write-ups from our GSoC contributors. The descriptions of the projects you find in [the first round of contributor reports](/OpenPrinting-News-Google-Summer-of-Code-2025-Contributors-selected-and-projects-started/).

### KDE Print Manager vs. CUPS 3.x, by Tarun Srivastava
Mentors: **Mike Noe**, **Till Kamppeter**, Nicolas Fella, Zdenek Dohnal

> The migration involved refactoring the KDE Print Manager codebase to adopt the updated CUPS 3.x interfaces. This includes replacing deprecated functions, updating to the new data types and enums, and adjusting function calls to align with the asynchronous and modernized APIs introduced in CUPS 3.x.
>
> By making these changes, the Print Manager can now seamlessly work with the latest version of CUPS while preserving backward compatibility with its existing features. This ensures that users will not experience any regression in functionality.
>
> Now, we have to add the unit test for all the previous and newer functionality of printer manager for automated testing before moving ahead with CUPS related changes.

[Tarun had already volunteered](/OpenPrinting-News-June-2024/#kde-print-manager) for [this project](/OpenPrinting-News-April-2024/#kde-print-manager) for some time and is now finishing it as a GSoC project.


### Porting pyCUPS to CUPS 3.x API and implementing it in system config printer, by Soumyadeep Ghosh
Mentors: **Bhavanishankar Ravindra**, **Callahan Kovacs**, Till Kamppeter, Zdenek Dohnal, Kushagra Sharma

Soumyadeep has presented the first half of his GSoC project work in his blog article "[GSoC: Until Midterm, August 2025](https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-until-midterm/)". He starts with a short historical background and the reasoning why he switched from the C extensions in the current pyCUPS to CFFI (C Foreign Function Interface):

> Back in the day (almost 15 years ago!), Tim Waugh wrote the first version of pycups as a C extension module for Python. That worked well, but like all old code, it aged… let’s just say, not like fine wine. After Tim, Zdenek took over as maintainer, but with multiple projects of OpenPrinting and other projects in the mix, there wasn’t much room to modernize PyCups2 for him.
>
> Fast forward to the release of libcups3 — OpenPrinting needed a shiny new pycups, but the old codebase was a bit too… tangled. It was all C extensions, hard to read, harder to extend, and basically a maintenance nightmare. That’s where I stepped in and pitched a hybrid solution:
>
> 👉 Use CFFI (C Foreign Function Interface) to call libcups APIs directly from Python.
>
> 👉 Keep the library written mostly in pure Python.
>
> Why? Because:
>
> - Python code is easier to read.
> - Easier to extend and manage.
> - And let’s be honest — no one wants to debug a decade-old C extension unless they absolutely have to.

After that he wrote how he exactly proceeded and he concluded with:

> And yes, the work is still ongoing. So stay tuned… or better yet, stay caffeinated. ☕

His work you find in the "libcups3" branch of [his copy of the pycups repository](https://github.com/soumyaDghosh/pycups).


### GNOME Control Center: Finalizing the New Printing Architecture for GNOME, by Kaushik Vishwakarma
Mentors: **Mohit Verma**, Till Kamppeter, Zdenek Dohnal, KushagraSharma, Bhavanishankar Ravindra

The main view of the "Printers" module of the GNOME Control Center is nearly completed and it needs only minor fixes and adjustments.

As required by the GNOME developers for feature requests the new feature has to be presented on GNOME's Discourse and Kaushik has [posted it here](https://discourse.gnome.org/t/30745) and naturally he also did a [merge request](https://gitlab.gnome.org/GNOME/gnome-control-center/-/merge_requests/3226).

For his development work Kaushik is now using this [GitLab repository](https://gitlab.gnome.org/Kaushik1216/gnome-control-center/-/tree/curr?ref_type=heads) and his current code is in the `curr` branch. **Do not** use his GitHub repository linked in my previous blog. And for testing, do not just directly use your system environment, but use a container with GNOME-dev Fedora 43 distro as defined build environment, following [these instructions](https://gitlab.gnome.org/Kaushik1216/gnome-control-center/-/tree/curr?ref_type=heads), but create the container with the command:
```
toolbox create --distro fedora --container gnome-dev --release 43
```


### Porting Printing to Zephyr, by Hubert Guan
Mentors: **Iuliana Prodan**, Akarshan Kapoor, Benjamin Cabé, Till Kamppeter, Ira McDonald

Hubert continues to progress well with his work summarizes what he did in weekly [blog posts](https://hubertyguan.github.io/GSoC-2025/posts/).

He has also a [GitHub repository](https://github.com/HubertYGuan/zephyr) with his work.


### OpenPrinting Image Output Verification Framework, by Sanskar Yaduka
Mentors: **Till Kamppeter**, Zdenek Dohnal, Pratyush Ranjan, Mohit Verma, Bhavanishankar Ravindra

> Currently this is what I implemented 
>
> 1. test_document_pipeline.py<BR>
> Purpose: Document-focused testing pipeline for virtual printers<P>
> Generates multiple test document types (text, images, mixed content)<BR>
> Sends documents to CUPS for processing<BR>
> Waits for processed files to appear in ~/gsoc/openprinting/PDF/<BR>
> Converts both original and processed documents to PNG images<BR>
> Compares them using enhanced image analysis algorithms<BR>
> Generates HTML reports with visual comparisons and quality metrics<P>
> Used for: Testing document rendering quality and content preservation
>
> 2. print_quality_pipeline.py<BR>
> Purpose: Complete automated print quality testing system<P>
> Takes only printer queue name as input parameter<BR>
> Automatically discovers printer capabilities, modes, and filter chains from PPD files<BR>
> Generates 37 comprehensive test images targeting specific quality aspects<BR>
> Processes each image through detected CUPS filter chains for each printer mode<BR>
> Key difference: Tests filter chain output directly (not physical printing)<BR>
> Compares original images with filter-processed results using 11+ algorithms<P>
> Used for: Complete printer driver validation and filter chain correctness testing

Here is Sanskar's [GitHub repository](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation). It has a detailed description of his work.


### Rust bindings for libcups2/3, by Mintu Gogoi
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter

Here is Mintu's work in his [GitHub repository](https://github.com/Gmin2/cups-rs).


### Rust bindings for cpdb-libs, by Titiksha Bansal
Mentors: **Jynn Nelson**, **Michael Murphy**, Till Kamppeter, Chandresh Soni, Pratyush Ranjan, Bhavanishankar Ravindra

> Since my last update, I have made steady progress on the Rust bindings. After completing the setup and generating the raw bindings, I moved forward with implementing safe Rust wrappers for the core cpdb-libs functions. These wrappers focus on providing idiomatic Rust abstractions while ensuring memory safety through Rust’s ownership and borrowing rules.
>
> I have implemented functionality for printer discovery, job submission, and queue management, all wrapped in a type-safe API to minimize unsafe blocks. Error handling mechanisms have been introduced using Result types and custom error enums to better integrate with Rust’s ecosystem.
>
> Additional wrapper functions have been developed to handle print job management and authentication, ensuring that key cpdb-libs features are exposed cleanly to Rust applications. I have also refined the API design to make it more developer-friendly, using strongly typed structures instead of raw pointers wherever possible.
>
> Currently, I am finalizing the type-safe API for common CUPS functionalities and ensuring that the abstractions are both safe and efficient. This includes careful mapping of C data structures to Rust equivalents while avoiding unnecessary performance overhead.
>
>The next steps will involve writing unit tests for the implemented modules to ensure stability and correctness before moving on to integration testing with sample Rust applications. I will also commit and push the updated code to GitHub shortly so that you can review it.

Here is Titiksha's work in her [GitHub repository](https://github.com/TitikshaBansal/cpdb-rs).


### Utilizing OSS-Fuzz-Gen to Improve Fuzz Testing for OpenPrinting Projects, by Zixuan Liu
Mentors: **Jiongchi Yu**, **George-Andrei Iosif**, Dongge Liu, Till Kamppeter, Shivam Mishra, Akarshan Kapoor

> The initial goal was to integrate the OpenPrinting projects into OSS-Fuzz-Gen in order to generate more fuzzers and improve code coverage. However, during practice I identified some major limitations of OSS-Fuzz-Gen: 
>
> The biggest flaw is that when a YAML defines multiple functions, OSS-Fuzz-Gen creates a separate fuzzer for each function. This makes it hard to capture the relationships of functions called —— which limits coverage. Besides, OSS-Fuzz-Gen is highly encapsulated and heavy. Even minor issues like network instability can cause the entire pipeline to fail. It also generates many redundant Docker images. 
>
> To address these issues, I developed light-fuzz-gen ([https://github.com/pushinl/light-fuzz-gen](https://github.com/pushinl/light-fuzz-gen)), with the aim of eventually integrating it back into OSS-Fuzz-Gen. (Since the workflow of OSS-Fuzz-Gen is overly complex at the moment, light-fuzz-gen is being used separately for now.)
>
> In addition, I experimented with combining OSS-Fuzz-Gen, light-fuzz-gen, and AI-assisted IDE tools. This approach allowed me to generate a large number of harnesses and seeds, which significantly improved the code coverage of the OpenPrinting project. So far, I have generated a large number of fuzzers and actually added 6 effective. In particular, coverage for cups increased from 11% to 30%, and coverage for libcups improved from 14% to 17%. ([https://introspector.oss-fuzz.com/project-profile?project=cups](https://introspector.oss-fuzz.com/project-profile?project=cups))
>
> The biggest challenge remains ensuring that fuzzers generated by LLMs can pass compilation and linking successfully. At present, I am encountering difficulties with the Makefile build process of cups-filters, and I am actively working on resolving this issue.

Zixuan's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Zixuan's user name on GitHub is "pushinl".


### GTK Print Dialog: Modern dialog with built-in preview in main view, by Yash Kumar Kasaudhan
Mentors: **Michael Weghorn**, **KushagraSharma**, Till Kamppeter, Zdenek Dohnal, Shivam Mishra

> With guidance from my mentors and Till Sir, I successfully developed a custom GTK-based preview pane using Poppler library for PDF rendering. This component is fully integrated into the application and functioning as intended.
>
> This update also resolved an earlier issue: previously, clicking the “Preview” button in the print dialog would close the dialog. Now, the print dialog behaves like a modal window — it remains active until the preview pane is closed. This means users no longer need to repeatedly reopen the print dialog when making preview changes.
>
> I have now begun developing a combined print dialog with an integrated print preview. Rather than creating a new print dialog from scratch, I’m embedding the custom preview pane into the existing GTK print dialog, using GTK’s native embedding capabilities.
>
> My current focus is on adapting the preview pane into an embeddable component fully compatible with the GTK print dialog. For now, the preview will only update when users click the “Preview” button, as it does not yet refresh automatically when settings change.

Yash has posted about his work on the internet a few days ago, on [Reddit](https://www.reddit.com/r/GTK/comments/1mts0js/comment/n9hs3lw/) and on [LinkedIn](https://www.linkedin.com/posts/yash-kumar-kasaudhan_gsoc2025-linux-opensource-ugcPost-7363251746640420865-Fnxn).

His work is available on [Github](https://github.com/vididvidid/Gtk_GSOC), note that `main` is the original, unchanged code, and the other branches are Yash's changes.

Discussion on [GNOME's Discourse](https://discourse.gnome.org/t/29520).


### Integrating OSS-Fuzz for Go-Based and Python-Based OpenPrinting Projects, by Mohammed Imaduddin
Mentors:  **Jiongchi Yu**, **George-Andrei Iosif**, Dongge Liu, Till Kamppeter, Ira McDonald, Shivam Mishra

> Following up from my last update, I continued my work on fuzzing ipp-usb but eventually moved away from the original “import as a library” approach. This approach had caused persistent build failures due to unexported types and methods, as well as libusb CGO linker errors, when attempting to fuzz functions like sanitizeIppResponse. Even after exporting the required methods and struct fields, importing the usb package still pulled in the USB I/O layer, which depended on hardware-specific libusb functions that were difficult to satisfy in the OSS-Fuzz container environment. After discussing this with Alexander, we agreed that turning ipp-usb into an importable Go package was not practical since it is architecturally a standalone program. The only realistic way to fuzz it would be through its external HTTP-over-USB interface, which normally requires a real IPP-over-USB device. The ideal solution would be to create a virtual IPP-over-USB device simulator, which would allow fuzzing without relying on actual hardware.
>
> I began working on this by experimenting with usbip and the VirtualUSBDevice project to simulate an IPP-over-USB device. The goal was to implement a black-box fuzzing setup in which the fuzzer feeds input to the simulated device, the ipp-usb daemon runs and connects to it, and the fuzzed data is injected into the communication loop for processing. This architecture would allow monitoring the entire interaction for crashes while avoiding direct hardware dependencies. As part of this setup, I successfully created the required build.sh and oss_fuzz_build.sh scripts to compile both the ipp-usb daemon and the emulator. With these changes, the build for both AFL++ and libFuzzer engines now completes successfully without the previous linker errors.
>
> At runtime, however, AFL++ failed because it expects a binary fuzz target, whereas my setup was driven by a shell script. My initial plan was to create a small C++ wrapper to bridge the gap, but instead I decided to switch to libFuzzer, which provided a cleaner and simpler implementation for the black-box approach. With libFuzzer, I was able to write Go-native fuzz drivers that directly launch the ipp-usb binary and communicate with it during fuzzing. I implemented three main drivers: daemon_fuzzer.go, which starts the ipp-usb binary and fuzzes its /ipp/print HTTP endpoint with malformed requests; usb_fuzzer.go, which targets USB protocol parsing logic; and http_client_fuzzer.go, which fuzzes the HTTP client against malformed printer responses.
>
> This new setup now runs without the earlier importability or linking issues and keeps the fuzzing pipeline entirely black-box while still targeting key functionality in ipp-usb. I have created a PR to OSS-Fuzz for this integration.
>
> Links:<BR>
> OSS-Fuzz PR: [https://github.com/google/oss-fuzz/pull/13815](https://github.com/google/oss-fuzz/pull/13815)<BR>
> IPP-over-USB emulation: [https://github.com/OpenPrinting/go-mfp/tree/master/proto/usbip](https://github.com/OpenPrinting/go-mfp/tree/master/proto/usbip)

Mohammed's work is going as pull requests into [OpenPrinting's "fuzzing" repository](https://github.com/OpenPrinting/fuzzing). Here are the [pull requests which are already merged](https://github.com/OpenPrinting/fuzzing/pulls?q=is%3Apr+is%3Aclosed). Mohammed's user name on GitHub is "mdimado".


### Modernize OpenPrinting Website with Next.js, by Rudra Pratap Singh
Mentors: **Till Kamppeter**, Zdenek Dohnal, Deepak Patankar, Bhavanishankar Ravindra

Rudra is concluding his internship this week (Aug 22). He will actually start his GSoC work now. His final submission deadline is moved to November.
