---
title: "Make Printer Applications Configurable"
---

### Introduction
<p>
Printer Applications are emulations of IPP printers on the local machine, usually to make a non-IPP printer work, the Printer Application being the printer driver. Printer Applications can also do other printing related things, like for example clustering remote IPP printers and when printing to the Printer Application, the most suitable printer will get automatically selected. Or a Printer Application can <a href="https://github.com/OpenPrinting/ippusbxd" class="urlextern" title="https://github.com/OpenPrinting/ippusbxd"  rel="nofollow">make IPP-over-USB printers work</a>. Even CUPS is a certain form of Printer Application.
</p>

<p>
In the ideal case a Printer Application serving as a printer driver for example works completely automatically, auto-detecting the printers it supports and setting everything up, as creating the socket, registering the service on Avahi for <abbr title="Domain Name System">DNS</abbr>-SD advertising, …, and removing everything if the printer is disconnected or turned off.
</p>

<p>
This does not always work. For example for non-IPP network printers the user perhaps has to enter the IP address manually, or the printer driver can have configurable options which cannot be described in IPP attributes, or a Printer Application which clusters printers has to be told which printers to actually cluster, …
</p>

<p>
The <a href="http://www.pwg.org/" class="urlextern" title="http://www.pwg.org/"  rel="nofollow">Printer Working Group (PWG)</a> has also create a standard for configuring IPP printers which we can use as well for emulated IPP printers, our Printer Applications. This standard is the IPP System Service. This allows to define configurable parameters which a device-independent client can poll from the IPP server and display in a <abbr title="Graphical User Interface">GUI</abbr>, so that the user can change them appropriate to his needs.
</p>

<p>
Curremtly, as the IPP System Service standard is still very new and there are no client GUIs implemented yet, IPP printers (and CUPS) use web interfaces, accessible with a web browser, for configuration. Not that comfortable and fast, and also very different from vendor to vendor. Also this could be implemented in Printer Applications to make them configurable.
</p>

<p>
The student&#039;s task is to create libraries, utilities, contribute to the <a href="https://github.com/OpenPrinting/printer-application-framework" class="urlextern" title="https://github.com/OpenPrinting/printer-application-framework"  rel="nofollow">Printer Application framework</a> to get configurability in the Printer Applications. One could perhaps have two students, one for IPP System Service and one for a web interface.
</p>

### Mentors
<p>
Dheeraj Yadav (dhirajyadav135 at gmail dot com), Michael Sweet, author of CUPS (msweet at msweet dot org), Ira McDonald, OpenPrinting (blueroofmusic at gmail dot com), Smith Kennedy, HP (smith kennedy at hp dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired Knowledge
<p>
C programming, <abbr title="Domain Name System">DNS</abbr>-SD, IPP
</p>

### Code License
<p>
Apache 2.0, MIT
</p>
