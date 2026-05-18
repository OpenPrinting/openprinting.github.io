---
title: "System-Level Fuzzing for Parsing Features in OpenPrinting Projects"
---
### Introduction
**Security-related project**

1 contributor, large-size (350 hours), Level of difficulty: Hard

**Description**

OpenPrinting projects such as cups-filters and libcupsfilters contain extensive and complex media parsing code, responsible for handling diverse input formats (e.g., PDF, raster, images). While these components are critical for system stability and security, existing fuzzers currently exercise only a small subset of their functionality, leaving many parsing paths untested. Detailed issue can be referred here: <https://github.com/OpenPrinting/fuzzing/issues/47>.

This project proposes building a system-level fuzzing infrastructure that feeds raw media files directly into cups-filters tools or filter pipelines, instead of relying solely on narrow, function-level fuzz harnesses. Using modern coverage-guided fuzzers such as AFL++, the project aims to significantly expand code coverage, uncover new crashes and vulnerabilities, and improve the overall robustness of OpenPrinting’s media processing stack.

**Project Goals**

The primary goal of this project is to design, implement, and maintain a system fuzzing setup for OpenPrinting projects, with a strong focus on media parsing paths.

Specific objectives include:

  * System Fuzzing Infrastructure
    * Create a dedicated system fuzzing repository or branch for OpenPrinting projects
    * Enable fuzzing of cups-filters tools and pipelines using raw media files as input
    * Ensure reproducible and automated builds (e.g., container-based workflows)
  * Seed Corpus Design
    * Collect and curate high-quality seed inputs, including:
      * Valid media files
      * Regression inputs from past crashes and CVEs
      * Structure corpora to maximize reachable parsing paths
  * Coverage Expansion
    * Use coverage-guided fuzzing to exercise parsing logic that is currently untested
    * Analyze and document coverage improvements compared to existing fuzzers
  * Bug Discovery and Fixing

**Expected Outcomes**

By the end of the project, the contributor is expected to deliver: (1) A maintained system fuzzing setup for OpenPrinting projects, which should improve coverage of media parsing code (2) Newly discovered and responsibly fixed bugs (3) A reusable framework for future system-level fuzzing efforts in OpenPrinting. 
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Jiongchi Yu, PhD Candidate, Singapore Management University (jiongchiyu at gmail dot com), Günther Noack (gnoack at google dot com)

Desired Knowledge: C/C++ programming, software testing (fuzzing), optional experience with AFL++, libFuzzer, or similar tools, familiarity with containerization (Docker), interest in software security and systems programming
### Code License
 Apache 2.0, MIT (depending on the OpenPrinting project)
