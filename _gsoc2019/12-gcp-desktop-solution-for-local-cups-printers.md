---
title: Google Cloud Print - Desktop-integrated solution for registering local CUPS printers
---

### Introduction
<p>
<a href="https://developers.google.com/cloud-print/docs/overview" title="https://developers.google.com/cloud-print/docs/overview"  rel="nofollow">Google Cloud Print</a> is a service from Google which allows to print from anywhere with internet access to anywhere else with internet access, for example from a mobile phone to printer at home or in the office.
</p>

<p>
To do so, one needs a Google account and there one registers one&#039;s printers so that they can accept jobs sent into the print facility of this Google account.
</p>

<p>
On Linux there is already a way to share the local CUPS printers into Cloud Print: The Chrome/Chromium Browser. In its settings you can activate Google Cloud Print and the local queues get registered. The Browser even leaves a user daemon running when one closes it to continue keeping the printers available for Cloud Print.
</p>

<p>
The disadvantage of this is that the functionality is bound to a web browser, so it is awkward for people who use Firefox for example.
</p>

<p>
Do not suggest now to make the CUPS daemon (daemon which handles the print jobs) or cups-browsed (daemon which browses the network for printers and automatically creates local queues for them) registering the printers, as they are system-wide services and Google Cloud Print is based on the user&#039;s Google account, and so something which belongs to a single user.
</p>

### Student Tasks
<p>
What is needed is a user daemon which starts when logging in and stops when logging out, running with the rights of the user, connecting to the user&#039;s Google account registering the local CUPS printers the user is allowed to print on. It will need integration with the desktop for starting and stopping the daemon and for configuration in the desktop&#039;s settings utility.
</p>

<p>
Ideally it should work with the GNOME desktop using GNOME Online Accounts and the GNOME settings manager.
</p>

<p>
<a href="https://developers.google.com/cloud-print/docs/devguide" title="https://developers.google.com/cloud-print/docs/devguide"  rel="nofollow">Google documentation for printer registration</a>.
</p>

### Mentors
<p>
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), Ubuntu/GNOME <abbr title="Graphical User Interface">GUI</abbr> developers TBD
</p>

### Desired Knowledge
<p>
C/C++ programming, <abbr title="Graphical User Interface">GUI</abbr> programming, GTK
</p>
