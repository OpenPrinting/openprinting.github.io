---
title: "Integrating C-based OpenPrinting projects in OSS-Fuzz testing"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Intermediate

[OSS-Fuzz](https://google.github.io/oss-fuzz) is a project aimed at finding vulnerabilities in open-source projects that are critical to the Internet infrastructure. It is powered by Google and was initiated in response to [Heartbleed](https://heartbleed.com), an OpenSSL vulnerability that could have been discovered with classic vulnerability discovery techniques. The codebases integrated into OSS-Fuzz are run multiple times with randomly crafted inputs in an approach called fuzzing.

Most of OpenPrinting's code is written in C, which is susceptible to memory corruption bugs. OpenPrinting's projects do not use fuzzing, with a single exception: CUPS has a [custom fuzzer](https://github.com/OpenPrinting/cups/blob/master/cups/fuzzipp.c) run when testing the build, for a fixed number of iterations.

Due to the compatibility of C projects with OSS-Fuzz, we would like to abandon the existing fuzzer and integrate the following C-based OpenPrinting projects into OSS-Fuzz (projects in priority order):

  * CUPS
  * libcups
  * cups-local
  * cups-sharing
  * libcupsfilters
  * cups-filters
  * cups-browsed
  * PAPPL
  * cpdb-libs
  * cpdb-backend-cups
  * libppd
  * pappl-retrofit

The purpose is to use the Google Summer of Code timeframe to create a mature OSS-Fuzz integration that maximises the number of fuzzed projects and fuzzing efficiency, as measured by coverage and execution speed.

The contributor should work on:

  * Coordinating with OpenPrinting which projects have highest priority and also which functionality of them, to get the best from the limited GSoC time
  * Creating Docker-based build environments
  * Writing libFuzzer fuzz targets
  * Creating a corpus of data
  * Understanding and implementing the [OSS-Fuzz best practices](https://google.github.io/oss-fuzz/advanced-topics/ideal-integration/)
  * Coordinating with the OpenPrinting developers to patch the vulnerabilities found by OSS-Fuzz
  * Analysing the found vulnerabilities and interpreting their details to deduce vulnerability classes that can be mitigated in bulk.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), George-Andrei Iosif, Security Engineer at Snap Inc. (hi at iosifache dot me).
### Desired knowledge
 C, fuzzing
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
