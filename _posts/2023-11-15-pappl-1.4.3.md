---
title: PAPPL 1.4.3
layout: single
author: Mike
excerpt: PAPPL v1.4.3 is a bug fix release.
---

PAPPL v1.4.3 is now available for download and is a bug fix release.  Changes include:

- Added "smi55357-device-uri" and "smi55357-driver" Printer Status attributes
  to Get-Printer-Attributes responses.
- Fixed missing mutex unlock in DNS-SD code (Issue #299)
- Fixed "printer-id" value for new printers (Issue #301)
- Fixed DNS-SD device list crash (Issue #302)
- Fixed Set-Printer-Attributes for "output-bin-default" and "sides-default"
  (Issue #305) 
- Fixed default "copies" value with `papplJobCreateWithFile`.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.4.3" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.4.3</a>

