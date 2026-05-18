---
title: "Behavior-accurate simulation of multi-function printers (printer + scanner)"
---
### Introduction
1-3 contributors full-size (350 hours), Level of difficulty: Hard

Although driverless printing and scanning are governed by standards and specifications, real hardware implementations often have unique details that can deviate from these specifications, impacting the accuracy of our printing and scanning implementations.

We currently have the "ippeveprinter" tool, which implements an "abstract" IPP 2.x printer. However, we lack a behavior-accurate simulation of real printers and do not have any simulation for eSCL/WSD scanners.

The goal is to create a behavior-accurate simulator for multi-function printers (MFPs) that supports at least IPP 2.x for printing, eSCL and WSD for scanning, and DNS-SD and WS-Discovery for device discovery. We aim to build a growing collection of models representing various specific devices.

This simulator will consist of a core simulation engine that provides reference implementations of the aforementioned protocols, along with a customization engine that allows for the expression of implementation details specific to individual devices without the need to reimplement common functionalities repeatedly.

One of our key objectives is to make the process of creating MFP models semi-automated. For instance, printer attributes and scanner capabilities can be automatically obtained, while accurately simulating behavioral features may require manual testing and analysis to identify these details, along with scripting to express them in the simulator. We anticipate that actual device behavior will not deviate significantly from the "ideal" model implemented by the simulation core, allowing models to remain relatively straightforward. Ideally, the model creation process should be simple enough for mid-level technical personnel and qualified users to undertake independently.

This initiative opens up several new avenues:
  * Remote debugging of printing/scanning issues without needing to connect to the device or engage extensively with the device owner
  * The ability to test software changes without physical access to the relevant hardware
  * Full-stack automated testing of printing and scanning against simulated hardware

Initially, our collection of models will be small and may contain inaccuracies. However, as we expand our model collection, we will be able to automatically detect most regression cases during the development of the entire printing and scanning stack.

The implementation of the simulation core has already started, what we need from the contributor(s) is to develop the initial collection of the printer models. During this phase, we will evaluate and refine the overall concept, establishing and assessing the methodology for creating MFP models.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
### Desired knowledge
 Familiarity with relevant protocols (IPP, eSCL, WSD, DNS-SD), knowledge of the Linux printing and scanning stack, programming in C, and proficiency in Python or JavaScript (for scripting MFP models).
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
