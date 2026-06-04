---
title: "Automated and LLM-Assisted Fuzz Harness Generation for OpenPrinting Projects"
---
### Introduction
**Security- and AI-related project**

1 contributor, large-size (350 hours), Level of difficulty: Hard

**Background**

OpenPrinting maintains a set of widely deployed printing-related open-source projects, most of which are written in C/C++ and therefore prone to memory safety vulnerabilities. Recent CVEs in OpenPrinting components highlight the need for systematic, scalable, and automated fuzz testing to improve software security and robustness.

OpenPrinting has actively collaborated with Google OSS-Fuzz, integrating multiple core projects (cups, libcups, cups-filters, libcupsfilters, cups-browsed) and fixing dozens of critical bugs. However, due to the size and complexity of the ecosystem, manual fuzz harness development does not scale, and coverage remains insufficient for many critical code paths.

Building on last year’s GSoC work, OpenPrinting now has an experimental LLM-assisted fuzz harness generation framework, light-fuzz-gen (<https://github.com/pushinl/light-fuzz-gen>), which demonstrates the feasibility of automatically generating and refining fuzz harnesses for complex C/C++ codebases.

Despite existing OSS-Fuzz integrations, OpenPrinting still faces several challenges:
  * Fuzz harness creation remains labor-intensive and expert-driven
  * Many code paths are hard to reach with traditional manually written harnesses
  * Existing fuzz setups lack automation for continuous harness generation, refinement, and coverage feedback
  * Scaling fuzz testing to more OpenPrinting projects is difficult without stronger automation

To address these challenges, OpenPrinting aims to further develop and apply automated, LLM-assisted fuzz testing techniques to systematically improve fuzz coverage and bug discovery across its ecosystem. For this year's GSoC, the primary goal of this project is to advance automated fuzz testing for OpenPrinting projects by extending light-fuzz-gen and related techniques.

Specific objectives include:

  * Extending light-fuzz-gen
    * Improve the robustness and generality of the existing framework
    * Support more complex C/C++ APIs and project layouts
    * Enhance prompt strategies and harness templates for better coverage
  * Automated Fuzz Harness Generation
    * Automatically generate new fuzz harnesses for additional OpenPrinting projects
    * Target high-risk, security-sensitive, and previously under-tested components
    * Reduce manual effort in harness creation
  * Coverage-Guided Improvement
    * Integrate coverage feedback to iteratively refine generated harnesses
    * Compare coverage and bug-finding effectiveness with existing manual harnesses
  * Bug Discovery and Fixing
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Jiongchi Yu, PhD Candidate at Singapore Management University (jiongchiyu at gmail dot com), Zixuan Liu (pushinliu at gmail dot com)

Desired Knowledge: C/C++ programming, software testing (fuzzing), optional experience with AFL++, libFuzzer, or similar tools, familiarity with containerization (Docker), interest in software security and systems programming
### Code License
 Apache 2.0, MIT (depending on the OpenPrinting project)
