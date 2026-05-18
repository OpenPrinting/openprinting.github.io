---
title: "Porting OpenPrinting Software to Zephyr"
---
### Introduction
1 contributor, large-size (350 hours), Level of difficulty: Intermediate

As printers move further toward driverless IPP Everywhere printing, OpenPrinting’s printing software stands at the forefront of this movement, enabling various driverless print servers. However, for such a print server to be integrated directly within and/or sold with a printer while keeping costs low, a suitable low-power, low-form-factor platform to run the server is needed. This places the system in the realm of embedded systems, where real-time operating systems (RTOSes) are preferred for their reliability for time-critical tasks. However, full-fledged print servers are currently only supported on general-purpose operating systems (GPOSes) such as Linux, which many embedded microcontroller and some system-on-chip (SoC)-based platforms do not support.

This project aims to address this issue by continuing the porting of the OpenPrinting printing stack, including libraries like libcups and parts of PAPPL, as well as applications such as PAPPL and CUPS, to Zephyr, a major open-source RTOS. Furthermore, details on hardware requirements, IPP-over-USB communication with printers, and software changes should be investigated.

This project is the continuation of [Hubert Guan's GSoC 2025 project](https://hubertyguan.github.io/GSoC-2025/posts/final/).
### Mentors
 Iuliana Prodan (iuliana dot prodan at gmail dot com), Hubert Guan (hubertyguan at gmail dot com), Akarshan Kapoor (akarshankap at gmail dot com), Till Kamppeter, organization lead OpenPrinting (till at linux dot com), Zephyr developers TBD

Desired Knowledge: C programming (Rust is also desirable), real-time operating systems (especially Zephyr) and embedded systems, familiarity with networking concepts, especially DNSSD and TLS, is recommended, familiarity with version control systems, including Git
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
