---
title: CUPS 2.4.10
layout: single
author: Zdenek
excerpt: CUPS 2.4.10 fixes regression for domain socket-only setups
---

CUPS 2.4.10 brings two fixes:

- Fixed error handling when reading a mixed `1setOf` attribute.
- Fixed scheduler start if there is only domain socket to listen on (Issue #985)

which the latter is fix for regression after fix for CVE-2024-35235 in scenarios where is no other listeners in cupsd.conf than domain socket created on demand by systemd, launchd or upstart.

Enjoy!

* <a href="https://github.com/OpenPrinting/cups/releases/tag/v2.4.10" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v2.4.10</a>

