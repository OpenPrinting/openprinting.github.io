---
title: OpenPrinting - How did this all begin?
permalink: /history/
layout: splash
header:
 overlay_color: "#616161"
 overlay_filter: "1"
author: Till
excerpt: A brief history of OpenPrinting
---

This is about how I got into printing with free software, and how I made it to what I am now.

If you want to know what we all achieved at OpenPrinting up to now, see [what we have done so far](/achievements/).

## System Administrator in the Physics Department

I have studied Physics at the university, not computer science, but always had a computer and liked programming. I had my first (Commodore VC20, 3.5K of RAM) with 16 years of age.

In the time from 1996-2000 I did my PhD in Theoretical Physics and from 1997 on I was also system administrator for the department. The machines were all UNIX workstations (SGI and DEC) and to get workplace computers for everyone my first task was to set up Linux PCs (SUSE in that time).

This way I got in contact with the wonderful world of free software. Programming work for the system administration (not the Fortran work for the PhD itself) was mainly to make things working in our department, especially also for the less IT-savvy professors.

A first task which I contributed upstream were modifications on X-CD-Roast (an early GUI for recording CDs) to make it working in multi-user environments.

We had also printers, PostScript lasers with 2 trays and duplex. The LPD printing system did not support passing printer-specific options along with jobs, so the admins before me created a wild hack to control these resources. Then we also got a color laser with many more options and these options were only accessible via proprietary GUIs on the commercial UNIXes (SGI and DEC) in our LPD environment.

In spring 2000 I read an article about CUPS in the German "[Linux Magazin](https://www.linux-magazin.de/)" written by Kurt Pfeifle. CUPS was supporting PostScript printers perfectly with its PPD concept. I tried it and one could print on all our printers with all their bells and whistles, from all machines, also the Linux ones, and on all printers, including the color laser. And clients see the server's print queues automatically.

So I adopted it in the department's network. Only disadvantage was that one could control everything only via the command line. GUI print dialogs were available from Michael Sweet, the author of CUPS, but only as proprietary, paid software.

So I wrote a print dialog by myself, called it the "[X Printing Panel](http://cups.sourceforge.net/xpp/)", XPP (so I got the father of Linux print dialogs). This way everyone could easily fully control the printers, also the not so IT-savvy people in the department.

It took me only around 10 days to get this together, but in the end I wanted to make it available for everyone. So I announced it on Freshmeat, and shortly after I got feedback, an invitation from Kurt Pfeifle, the author of the CUPS article in the "Linux Magazin", to the LinuxTag, the biggest Linux show in Europe that time, to present my little project on the booth of his employer, the printer service company Danka (later on overtaken by Ricoh).

Most distributions did not show much interest but MandrakeSoft from Paris (later Mandriva) did. They showed me already on the booth how their development workflow works, and on the social event the told me everything of the daily life in their office. And some days after the show I got an e-mail with the invitation to work for them.

By the way, on that LinuxTag I also met Richard Stallman, who invented the free software concept, and he also suffered a printing problem, and that led him to that step, as I also had a problem with printing, and got what I am today.

## MandrakeSoft in Paris

So in the beginning of July 2000 I was on the LinuxTag and on August 1 2000 I lived in Paris, not knowing any word of French. Inside MandrakeSoft we were speaking English as they hired many people from other countries and they sent us all to French classes. My first task was to switch Mandrake Linux to the CUPS printing system and I succeeded already with the first release after my employment, which came out in fall 2000.

To get PPD files for all, especially non-Postscript, printers I used linuxprinting.org (the site which provided Foomatic in that time) and asked its author, Grant Taylor, for a lot of improvements on it. In 2001 I had overtaken maintainership of the project, as Grant did not have time for it any more. The server was running in his house though, till 2006.

In 2001 I got invited to the HP- and IBM-hosted OSDN Printing Summit in San Jose ([Report from Grant Taylor](https://wiki.linuxfoundation.org/openprinting/database/printingsummit2001)), where I met several people of the printer manufacturers and of the PWG ([Printer Working Group](http://www.pwg.org/)) and with them (Tom Hastings, Michael Sweet, Ira McDonald, Claudia Alimpich, Glen Petrie and, Norm Jacobs) I founded OpenPrinting as part of the Free Standards Group (FSG).

In the following years I did not only do coding and packaging to improve printing, but also a lot of community work, CUPS evangelism, especially I organized a community booth about printing on the LinuxTag every year from 2001 to 2006, gave talks on several conferences, mainly in Germany and Brazil, ran developer meetings on conferences in France, and participated in the work of creating printing APIs via phone meetings of the OpenPrinting people.

Also all distributions switched to CUPS (with Foomatic) as their standard printing environment. The other printing systems disappeared and did not get maintained any more, probably due to lack of user interest.

From 2001 on MandrakeSoft was not going well, was a sinking ship which (fortunately) actually sunk only in 2015.

In Fall 2005 I was running a community booth on the Linux Expo in San Francisco and there I discussed with the folks that we need a meeting to plan how to improve printing and develop it further and we concluded to organize a Printing Summit in 2006, which I started to organize.

End of 2005 I was invited on a Desktop Architects Meeting of the OSDL where I also advertised my plans of a Printing Summit and also got inspired to post on the GNOME mailing list that they should improve their print dialog to properly support CUPS as this was the standard. The first answer then came from Linus Torvalds, calling the GNOME guys "interface nazis" and that triggered a sh*tstorm, which was also mentioned in the end-of-year news reviews of 2005. But the GNOMies created the better dialog actually some time in 2006!

The Printing Summit in 2006 was a great success. It was hosted by Lanier in Atlanta and I succeeded to get nearly everyone important for printing with free software to there, people of several manufacturers, distributions, drivers, Ghostscript, GUI environments, user interface experts, Mike Sweet (author of CUPS), ...

There was also IAN Murdock, one of the founders of DebIAN. He was working for the FSG and I asked him whether the FSG could host linuxprinting.org (Foomatic) as manufacturers have already uploaded PPDs there but it was still running in Grant's house and an official download place deserves the security and reliability of a data center.

But shortly after the Summit it came even better: The FSG did not only want to host Foomatic but also me. They invited me to work full-time on OpenPrinting and expand OpenPrinting to cover everything about printing with free software, especially also merge in linuxprinting.org.

In 2006 I also had my last booth on the LinuxTag and there I met Mark Shuttleworth, founder of Canonical and Ubuntu. He also invited me for working as printing guru of Ubuntu.

## The Linux Foundation and Canonical

So from mid-2006 on I worked mainly for OpenPrinting but also for packaging the printing stack in Ubuntu. This is my work still today, but currently fully paid by Canonical.

In 2007 the FSG and the OSDL joined to be the [Linux Foundation](https://www.linuxfoundation.org/) and so I was their employee. I also got [fellow member](https://www.linuxfoundation.org/board-of-directors-2/) of the Linux Foundation which I am till today.

From then on I did everything to make printing "just work" in non-Mac Unix/Posix-style operating systems. I held OpenPrinting Summits every year, later in collaboration with the Printer Working Group (PWG), work with manufacturers on doing printer drivers correctly, implement PWG standards in free software, ...

From 2008 on I started organizing the participation of the Linux Foundation in the [Google Summer of Code](http://g.co/gsoc) and got accepted for all but one year until now. Many students worked this way for OpenPrinting and recently we got together a student community to work on development tasks, like our new web site and also on mentoring further GSoC contributors.

[And here is what we have all done so far](/achievements/).
