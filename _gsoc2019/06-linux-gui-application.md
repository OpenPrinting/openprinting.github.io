---
title: Linux GUI application (can be part of GNOME printer tool) to admin MF devices using IPP System Service.
---

<div>

<p>
Most network printers have a web interface which allows to configure the printer from any computer in the network using a web browser. Advantage is that no printer-model-specific software needs to be installed on the computer in order to configure a printer, and one has no dependency on certain supported operating systems. One can even configure printers using a smartphone.
</p>

<p>
Disadvantage is that every manufacturer does its web interface differently which makes administration of many printers of different brands awkward. In addition, automated printer administration with scripts requires different interfaces for each printer. And for setting local print queues you open your printer setup tool but for printer administration you have to open your browser.
</p>

<p>
To make this easier the Printing Working Group (PWG) has introduced the IPP System Service standard. This is an interface made up of standardized IPP requests to poll printer capabilities and configure the printer as needed. Every printer from every manufacturer uses the same requests and so a common printer configuration interface can be added to printer setup tools or automated administration with scripts is possible.
</p>

<p>
The student&#039;s task will be to create an appropriate printer configuration interface for system-config-printer or for the GNOME Control Center.
</p>

<p>
Mentors: Upstream developers of GNOME/GTK or system-config-printer TBD.
</p>

<p>
Desired knowledge: C and/or Python programming, GTK
</p>

<p>
Code License: <abbr title="GNU General Public License">GPL</abbr> 2+ or <abbr title="GNU Lesser General Public License">LGPL</abbr> 2+
</p>

</div>