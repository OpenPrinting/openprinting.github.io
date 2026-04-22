---
title: "Fuzz/Test go-cpython"
---
### Introduction
**Security-related project**

1 contributor, large-size (350 hours), Level of difficulty: Intermediate

The [go-mfp](https://github.com/OpenPrinting/go-mfp) project includes its own implementation of a CPython binding for Go, which enables Python scripting to be embedded into Go programs.

While other bindings exist, this implementation offers several unique features:

  * It utilizes the host Python installation and is highly tolerant to Python version upgrades, even for compiled binaries, greatly simplifying deployment.
  * It provides a simple API for using multiple independent, isolated virtual Python interpreters (known as sub-interpreters) within the same process.
  * Python objects (values) on the Go side are automatically garbage-collected, eliminating the need for manual memory management.

Currently, this package is part of the go-mfp project, but due to its independence and broader utility, it is planned to be moved into a separate repository — similar to what happened with go-avahi. Once this occurs, OpenPrinting will maintain its own official Go-to-CPython binding.

Should this package attract community interest after the move, it could be widely adopted as a generic embedded scripting engine across many applications, potentially becoming part of critical Linux infrastructure. At that stage, ensuring the absence of serious bugs and vulnerabilities will be essential.

The goal of this project is to fuzz and test the package, as has been done with go-avahi. Given that the CPython interpreter internals can change significantly even between minor versions, it is important to conduct this testing across a range of Python versions, from 3.8 up to the latest available.
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Jiongchi Yu, PhD Candidate, Singapore Management University (jiongchiyu at gmail dot com), TBD

Desired Knowledge: Programming in C and Go, Fuzz testing
### Code License
 BSD 2-Clause "Simplified" License
