---
title: Turn the scp-dbus-service of system-config-printer into C
---

### Introduction

<p>
system-config-printer was the default printer setup tool in Red Hat/Fedora Linux for a lot of time and also got adopted by Ubuntu around ten years ago. During this time it received a lot of development work, especially on the algorithms for finding the best driver for a printer and for identifying whether printer discovery results from the CUPS backends actually come from the same physical printer.
</p>

<p>
To make these algorithms available for other printer setup tools (both interactive <abbr title="Graphical User Interface">GUI</abbr> tools and programs which fully automatically create print queues without user interaction) they got moved into a D-Bus service, scp-dbus-service. Now every other program can simply call the needed function via a D-Bus <abbr title="Application Programming Interface">API</abbr>. The printer setup tool in the GNOME Control Center for example works this way.
</p>

<p>
system-config-printer was written in Python and therefore scp-dbus-service is also written in Python. This makes it depending on Python and also makes it loading the needed Python libraries into memory when started. This can cause delays during boot when a utility to auto-setup print queues is used.Also most printer setup tools are written in C, Therefore it makes sense to convert the D-Bus service into the C language.
</p>

### Student Tasks
<p>
The student&#039;s task is to turn the scp-dbus-service of system-config-printer into C, either as D-Bus service (would work out-of-the-box with many GUIs) or as a C library with <abbr title="Application Programming Interface">API</abbr> (simpler), ideally both. This will make it easier to write printer setup tools in practically any programming language.
</p>

### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), system-config-printer upstream developers TBD
</p>

### Desired Knowledge
<p>
Desired knowledge: C/C++ programming, Python programming
</p>

### Code License
<p>
<abbr title="GNU General Public License">GPL</abbr> 2+ or MIT
</p>
