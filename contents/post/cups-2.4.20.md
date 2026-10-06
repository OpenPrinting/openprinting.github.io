---
title: CUPS 2.4.20
layout: single
author: Zdenek
excerpt: CUPS 2.4.20 provides amount of bug and security fixes.
date: '2026-10-05'
---

CUPS 2.4.20 provides amount of bug fixes and security fixes:

Assigned CVE ids:
- CVE-2025-55480, CVE-2026-61702, CVE-2026-87875, CVE-2026-87876, CVE-2026-55453, CVE-2026-55467, CVE-2026-105326

Several fixes use GHSA id of security advisory due long waiting time for CVE ids from CNA. Due our changed policy the fixes referencing GHSA id are for:

* vulnerabilities with CVSS < 7.0, which we take as lower priority vulnerabilities,
* issues which require print admin rights for triggering them,
* issues where its fix is security hardening patch/feature.

Per our security policy, issues which require print admin rights, or are security hardening patches, are not taken as vulnerability and they reference a security advisory due convenience.

More details in CHANGES.md.

Enjoy!

* <a href="https://github.com/OpenPrinting/cups/releases/tag/v2.4.20" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v2.4.20</a>


