---
title: "Turn cups-browsed into printer application"
---

### Introduction
<p>
cups-browsed is a daemon which discovers remote printers, mainly IPP but also legacy CUPS browsing, and makes them locally available. It gives a lot of possibilities for configuration, like clustering printers so that the most suitable for a job is automatically selected, allowing access to printers from legacy servers, showing only the relevant printers from thousands of printers available on the network, …
</p>

<p>
Currently it makes printers locally available by creating a queue on the locally running CUPS, and generating a PPD file for this queue. As PPD files in CUPS are deprecated and the support for them will soon go away, cups-browsed will have to follow, and the best way to do so, is to make a Printer Application from it. Instead of creating CUPS queues it will emulate IPP printers then, which get picked up automatically by CUPS.
</p>

<p>
The student&#039;s task here is to add IPP server functionality (icluding <abbr title="Domain Name System">DNS</abbr>-SD advertising) to cups-browsed. cups-browsed is already a Glib-based multi-function daemon, so adding a service should not be that much difficult. Nothing of the existing functionality should be removed, the user should be able to select between local queue creation or IPP server by the configuration file.
</p>

<p>
A plus, when there is time left, would be a configuration interface, ideally using IPP System Service.
</p>

### Mentors
<p>
Deepak Patankar (patankardeepak04 at gmail dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired Knowledge
<p>
C programming, IPP, CUPS
</p>

### Code License
<p>
<abbr title="GNU Lesser General Public License">LGPL</abbr>-2.1+
</p>
