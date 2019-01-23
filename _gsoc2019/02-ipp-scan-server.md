---
title: IPP scan (or virtual MF device) server (Scanner Application)
---
<div>

<p>
The Internet Printing Protocol (IPP) does not only support printing, but also scanning, as there are many printers which also have a scanner (multi-function (MF) devices). Both CUPS and the developer tool ippserver emulate IPP network printers but not IPP scanners and so they cannot serve as a server to share a local scanner.
</p>

<p>
This task is about adding the scan server functionality. If you have a scanner connected locally (and it scans via SANE), share it as an IPP scanner, advertising itself and accepting jobs using the IPP driverless scanning standard. In contrary to SANE-based network scanning clients with any operating system, also phones or IoT devices can scan on your shared scanner.
</p>

<p>
Also old hardware can be recycled to a modern MF device, and we have a sample implementation to motivate manufacturers to adopt IPP scanning.
</p>

<p>
This server software will be a so-called Scanner Application, a sample implementation of the future form of scanner drivers, easily packageable in sandboxed, distribution-independent package formats like Snap.
</p>

<p>
Mentors: Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), SANE upstream developers TBD
</p>

<p>
Desired knowledge: C programming, <abbr title="Domain Name System">DNS</abbr>-SD, IPP
</p>

<p>
Code License: Apache 2.0
</p>

</div>
