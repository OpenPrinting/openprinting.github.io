---
title: "Wrapping Proprietary Drivers into Printer Applications"
---

### Introduction
<p>
With sandboxed packaging, Linux distributions appear which do not use classic RPM or DEB packages any more, like the all-Snap Ubuntu Core. And also standard desktop and server distributions, like Ubuntu Desktop/Server, will convert more and more to Snaps. Especially CUPS will also be moved from a classic package to a <a href="https://github.com/OpenPrinting/printing-stack-snap" class="urlextern" title="https://github.com/OpenPrinting/printing-stack-snap"  rel="nofollow">snap</a>. Then CUPS will not work with classic PPD/filter-based printer drivers any more but requires all drivers being provided as Printer Applications.
</p>

<p>
Free software printer drivers can easily get converted, starting from rebuilding them to live inside a Snap, where everything is in other directories than in a usual system up to integrating its printer capability infoand filter algorithms directly into the IPP server daemon.
</p>

<p>
Proprietary, closed-source printer drivers come as binary RPM or DEB files, or tarballs, or even self-extracting. They require a certain, in classic systems usually available, file system structure to put their files in during installation, and they also need some libraries which are common in classic systems. In a snap you do not have this “standard” file system structure and the binaries with hard-coded paths in them choke on that.
</p>

<p>
A solution is to take the <a href="https://github.com/OpenPrinting/printer-application-framework" class="urlextern" title="https://github.com/OpenPrinting/printer-application-framework"  rel="nofollow">Printer Application framework</a> and add a chroot to it. The proprietary driver will get installed in that chroot then.
</p>

<p>
The student&#039;s task is to add this functionality to the Printer Application framework and create an easy way for users to install proprietary printer drivers into that chroot-equipped Printer Application.
</p>

### Mentors
<p>
Dheeraj Yadav (dhirajyadav135 at gmail dot com), Michael Sweet, author of CUPS (msweet at msweet dot org), Ira McDonald, OpenPrinting (blueroofmusic at gmail dot com), Smith Kennedy, HP (smith kennedy at hp dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired knowledge
<p>
C programming, IPP
</p>

### Code license
<p>
(L)<abbr title="GNU General Public License">GPL</abbr> 2+, Apache 2.0, MIT
</p>
