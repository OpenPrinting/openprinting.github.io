---
title: "Desktop Integration: User interfaces for using OAuth2 with printers and scanners"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Hard

From version 2.5.x on CUPS uses OAuth2 ([Open Authorization](https://en.wikipedia.org/wiki/OAuth)) for authorization purposes and drops the formerly used Kerberos with the CUPS 3.x generation. See latest state-of-the-art presentation from Michael Sweet: [slides](https://events.canonical.com/event/35/contributions/285/attachments/66/111/oos-cups-september-2023.pdf), [video](https://www.youtube.com/watch?v=vzu0FIyDfOo), slide 11).

Authorization in printing is needed to once protect the data of confidential jobs, and second, to protect printer resources, like toner or paper.

OAuth2, standard for authorization for internet services ("Log in with Google") is also used as authorization standard for IPP (Internet Printing Protocol) printing.

As described in a talk on the OpenPrinting microconference on Linux Plumbers 2022 ([slides](https://lpc.events/event/16/contributions/1165/attachments/1093/2097/LPC2022_OAuth2_for_IPP.pdf), [video](https://www.youtube.com/watch?v=8UjrKos6LuY)) when accessing an IPP printer requiring authorization, it returns the URL to request the authorization from the authorization server in the response to the get-printer-attributes IPP request. Now the print client (print dialog, printer setup tool) has to open the URL in a browser so that the user can log in, create an account, or whatever the authorization server needs to identify the user. On success the server returns a URL with authorization code with which the client can get the access code to the printer.

This works for all kinds of IPP print destinations which require authorization, not only physical network printers but also print servers and IPP-based cloud printing services.

The contributor's task is to add the functionality to open the authorization server URLs and to supply the access code to the printer to the desktop printing workflow. This can be implemented in print dialogs or perhaps even made independent of concrete print dialogs by the [CPDB backend for CUPS](https://github.com/OpenPrinting/cpdb-backend-cups) triggering a D-Bus service for opening the URL (perhaps desktops always have such a thing?). Investigating what the best solution is for this task is part of the project.
### Mentors
 Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Gaurav Guleria (gaurav dot gen3 at gmail dot com), TBD
### Desired knowledge
 `C/C++`, GTK or Qt, DNS-SD/Avahi, CUPS/IPP
### Code License
 Apache 2.0, MIT, GPL-2+ and LGPL-2+
