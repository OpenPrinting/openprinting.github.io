---
title: "Turn cups-browsed into a Printer Application"
---

### Introduction

1 contributor full-size (350 hours).

[cups-browsed](https://openprinting.github.io/achievements/#cups-browsed) is a helper daemon for CUPS to automatically set up network printers. In the beginning it was to overcome that when CUPS from 1.6.x on used DNS-SD instead of its own browsing/broadcasting, it did not auto-setup client queues any more.

With the time it got lots of more functionality: Legacy CUPS browsing/broadcasting for interoperability with CUPS 1.5.x and older (often in long-term support enterprise distros), clustering, manually and automatically, also for clusters of printers of completely different types, user has one "universal" print queue and by their option settings job goes to the correct printer. Also filtering lists of many printers is supported, and everything can be configured/fine-tuned by the user or admin.

With CUPS already having its temporary queue functionality for network printers without need of explicit manual setup, and the Common Print Dialog Backends getting into the print dialogs and talking to CUPS with modern interfaces, we do not need automatic queue creation for network printers any more, but the other functionality of cups-browsed is still very useful.

So we do not want to discontinue cups-browsed, but take it into the New Architecture of printing, giving it the appropriate modern interface. Currently cups-browsed discovers printers via DNS-SD, and then creates (or not creates) local print queues pointing to them according to the rules in its configuration file. But currently it creates classic CUPS queues, with PPD files generated according to the printer's IPP attributes. What we need is make it working with CUPS 3.x, which drops PPD files and classic printer drivers.

For this we want tom turn it into a Printer Application, the new printer driver format, emulating a driverless IPP printer. This way CUPS can access the printers created by cups-browsed and create temporary queues for them on-demand. Internally we define with configuration file what these queues should do: Clusters, retro-fit to old CUPS, ...

The contributor's task is to implement this transition, using PAPPL for all standard elements of a Printer Application, like daemon, IPP parser, web admin interface, ... They will make cups-browsed create a queue in the Printer Application if appropriate destination printers get discovered, and remove it when these printers disappear (turned off, user leaves network, ...). CUPS will simply pick up on the emulated IPP printers then. And there will be a web interface to be created, for the configuration of the clusters, filter rules, .... one does not need to edit cups-browsed.conf manually any more.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Deepak Patankar (patankardeepak04 at gmail dot com), TBD
### Desired knowledge
 `C`, CUPS
### Code License
 Apache 2.0
