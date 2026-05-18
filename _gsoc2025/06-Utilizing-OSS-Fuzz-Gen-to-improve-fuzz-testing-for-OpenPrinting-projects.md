---
title: "Utilizing OSS-Fuzz-Gen to improve fuzz testing for OpenPrinting projects"
---
### Introduction
**Security- and AI-related project**

1 contributor full-size (350 hours), Level of difficulty: Hard

Recent vulnerabilities (including [CVE-2024-47175, CVE-2024-47176, CVE-2024-47177](https://openprinting.github.io/OpenPrinting-News-Flash-cups-browsed-Remote-Code-Execution-vulnerability/)) reported in OpenPrinting projects have underscored the critical need for robust security measures. Given that most of the projects of OpenPrinting are developed in `C/C++`, which are prone to memory violation bugs. To address these challenges, OpenPrinting has engaged with Google's [OSS-Fuzz](https://github.com/google/oss-fuzz/), a service designed to support open-source communities by providing large-scale fuzz testing and bug reporting, and maintains the fuzz harnesses in the separate [OpenPrinting fuzzing](https://github.com/OpenPrinting/fuzzing) repository.

**Current Integration with OSS-Fuzz:** OpenPrinting has successfully integrated **three** key projects into the OSS-Fuzz workflow, with **two** additional projects currently in progress. Although the integration has already yielded significant results, which have reported **21** critical fixed bugs leading to more than **5,000** lines of code fixes, it remains insufficient. The [testing coverage](https://introspector.oss-fuzz.com/project-profile?project=cups) for critical components is still lacking, and the severity of potential issues within OpenPrinting projects demands further action.

For now, OpenPrinting has integrated projects into the OSS-Fuzz workflow:
  * [cups](https://github.com/OpenPrinting/cups)
  * [libcups (of CUPS 3.x)](https://github.com/OpenPrinting/libcups)
  * [cups-filters](https://github.com/OpenPrinting/cups-filters)

The following projects are under construction:
  * [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters)
  * [cups-browsed](https://github.com/OpenPrinting/cups-browsed)

With Google's introduction of [OSS-Fuzz-Gen](https://github.com/google/oss-fuzz-gen), which leverages Large Language Models (LLMs) to enhance fuzz testing for open-source software, it has demonstrated exceptional potential in facilitating the integration of high-quality fuzz testing ([Google Blog](https://testing.googleblog.com/2016/12/announcing-oss-fuzz-continuous-fuzzing.html)). Therefore, we aim to utilize the OSS-Fuzz-Gen framework to further improve the existing quality of OSS-Fuzz harnesses

**Project Goals for GSoC 2025:** The primary objective for this Google Summer of Code project is to refine and expand our existing fuzz testing harnesses. Specifically:
  * **Enhancing Existing Harnesses:** Improve the quality of dictionaries, configurations, and seed data for current integrations, adhering to OSS-Fuzz best practices.
  * **Expanding Harness Integration:** Utilize OSS-Fuzz-Gen to develop and implement additional harnesses, targeting high-value, difficult-to-reach code sections with the support of LLMs.

**Contributor Responsibilities:**
  * Master OSS-Fuzz best practices to provide high-quality seeds and corpus for existing integrations. Employ OSS-Fuzz-Gen to create and integrate new harnesses, adopting diverse strategies to enhance code coverage.
  * Collaborate with OpenPrinting developers to identify and patch vulnerabilities uncovered through fuzz testing.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Jiongchi Yu, PhD Candidate at Singapore Management University (jiongchiyu at gmail dot com), George-Andrei Iosif, Security Engineer at Snap Inc. (hi at iosifache dot me).
### Desired knowledge
 C, Python, fuzz-testing
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
