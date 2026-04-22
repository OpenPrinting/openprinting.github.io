---
title: "cups-filters: Add Avahi calls for discovering and resolving driverless IPP printers to API and optimize the processes"
---

### Introduction

1 contributor half-size (175 hrs)

The cups-browsed daemon and the "driverless" utility discover DNS-SD-advertised IPP printers in the network, for the former to automatically create queues and the latter to list the printers for printer setup tools and auto-generate PPD files for them.

DNS-SD/Avahi discovery goes in two steps: First there is the service discovery itself which is very fast, then each discovered service needs to get resolved to get the complete DNS-SD record, this is a rather slow process. A complete DNS-SD discovery run (only on IPP-relevant service types) including resolving all discovered services can take a long time, especially in large networks.

cups-browsed resolves each service which gets discovered, and many of them are duplicate, for example IPP and IPPS, IPv4 and IPv6, and several different network interfaces, as Ethernet, Wi-Fi, and imterfaces for virtual machines. Here one could sort and filter before resolving, for example start resolving only if the discovery run has completed, then resolve only the needed ones.

The "driverless" utility calls "ippfind" to do the DNS-SD discovery and resolving, here further optimization would be possible if the utility directly deals with Avahi and then saves unneeded resolving steps.

The contributor's task is here to add a convenience API for Avahi discovery and resolving calls to libcupsfilters. For example create library functions avahiResolveService(), avahiBrowseResolve(), avahiBrowseOnly() in new files cupsfilters/avahi.[ch], using code of cups/http-support.c and tools/ippfind.c from CUPS. In a next step these functions should be used in cups-browsed and in the "driverless" utility to optimize their performance.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Sahil Arora (sahilarora dot 535 at gmail dot com), TBD
### Desired knowledge
 `C/C++`, CUPS
### Code License
 Apache 2.0
