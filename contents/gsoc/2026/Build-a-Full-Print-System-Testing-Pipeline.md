---
title: "Build a Full Print System Testing Pipeline"
---
### Introduction
1 contributor, large-size (350 hours), Level of difficulty: Hard

We currently have a [printer simulator](https://github.com/OpenPrinting/go-mfp) (still a work in progress, but already functional for many tests) and an [image evaluation framework](https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation), both created as part of a GSoC 2025 project.

The missing piece is integrating them into a complete system.

The goal of this project is to build a tool capable of performing the following tasks:

  1. Load a simulation model of the printer
  2. Automatically create a CUPS print queue based on that model
  3. Instantiate a simulator
  4. Test printing in all modes supported by the printer (duplex/simplex, color/monochrome, various DPI settings, etc.)
  5. Capture printed documents from the simulator
  6. Use the image evaluation framework to verify that the resulting document matches expectations

The tool should be able to run tests in both single-test and batch modes to support automated regression testing.

An interesting aspect of this project is the choice of programming language for the main procedure.

The simulator itself is written in Go, and most of its functionality is available as Go libraries (packages), with some simple command-line utilities built on top of them—these mainly add a command-line interface. Therefore, creating and controlling an MFP simulator instance would likely be simpler if done directly in Go, using the same libraries, rather than by invoking external command-line tools.

However, the image evaluation framework is written in Python.

Fortunately, we already use an embedded Python interpreter, which means we can write a Go program that implements and controls the simulation directly while running image evaluation scripts within the embedded Python interpreter.

An alternative would be to write the main program in Python. In that case, we would need to design a method to instantiate and use the simulator from within the Python script.
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), TBD

Desired Knowledge: Programming in Go and Python
### Code License
 BSD 2-Clause "Simplified" License
