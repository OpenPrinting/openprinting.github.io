---
title: "Integrating OSS-Fuzz for Go-based and Python-based OpenPrinting projects"
---
### Introduction
**Security-related project**

1 contributor medium-size (175 hours), Level of difficulty: Intermediate

OpenPrinting hosts many polyglot projects, which are developed not limited to languages of `C/C++`. We also host software written in languages like Python and Golang, which function as crucial printing APIs and often interface with `C/C++` libraries to deliver comprehensive printing services. The integration of multiple programming languages into our ecosystem underscores the necessity for a broad and inclusive testing approach. Given the diversity of development environments, it is crucial to extend the testing for these projects, specifically for integration of [OSS-Fuzz](https://github.com/google/oss-fuzz).

To this end, we plan to extend the capabilities of the existing OSS-Fuzz frameworks to include projects developed in languages other than `C/C++`. This initiative will target Python and Golang projects, ensuring that our fuzz testing encompasses the full spectrum of development environments within OpenPrinting.

**Project Goals for GSoC 2025:** The primary objective for this Google Summer of Code project is to integrate the polyglot projects in OpenPrinting into OSS-Fuzz framework and refine existing unit tests for these projects. The targeting projects include:
  * **Golang**
    * [ipp-usb](https://github.com/OpenPrinting/ipp-usb)
    * [goipp](https://github.com/OpenPrinting/goipp)
  * **Python**
    * [pycups](https://github.com/OpenPrinting/pycups)
    * [pyppd](https://github.com/OpenPrinting/pyppd)
 
**Contributor Responsibilities:**
  * **Evaluate and Improve Testing Approaches:** The contributor needs to understand existing testing strategies within the project and evaluate their effectiveness. Where there are gaps, particularly in areas that are under-tested, the contributor should develop and improve tests to cover these functionalities.
  * **Integrate Projects into OSS-Fuzz Workflow:** The contributor should also integrate these projects into OSS-Fuzz framework, following previous integrations for `C/C++` projects in OpenPrinting [fuzzing](https://github.com/OpenPrinting/fuzzing) repository with appropriate fuzzing corpus.
  * **Triage and Report Vulnerabilities:** The contributor should work closely with developers from OpenPrinting to identify and report any vulnerabilities that are discovered through the testing process. 
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Jiongchi Yu, PhD Candidate at Singapore Management University (jiongchiyu at gmail dot com), George-Andrei Iosif, Security Engineer at Snap Inc. (hi at iosifache dot me).
### Desired knowledge
 Python, Go, fuzz-testing
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
