---
title: "Speed/Scaling optimization of cups browsed"
---

### Introduction
<p>
cups-browsed provides nice features for big networks with many printers, as forming printer clusters, filtering the important printers out of thousands of printers advertised in a local network, and making available printers on legacy CUPS servers.
</p>

<p>
But on the other side cups-browsed has problems in networks with many printers, as it treats every printer it discovers one after the other and so it takes long until it has created local queues for all of them and it can also cause a high system load.
</p>

<p>
In this project the student should analyse the performance of cups-browsed with many remote printers and optimize it, using things like multi-threading for example.
</p>

<p>
And once splitting cups-browsed into threads, adding a form of in-process restart (on  HUP signal and/or restart of CUPS) would be a plus.
</p>

### Mentors
<p>
Deepak Patankar (patankardeepak04 at gmail dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired knowledge
<p>
C programming, IPP, CUPS
</p>

### Code license
<p>
<abbr title="GNU Lesser General Public License">LGPL</abbr>-2.1+
</p>
