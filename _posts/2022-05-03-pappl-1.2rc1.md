---
title: PAPPL 1.2rc1
layout: single
author: Mike
excerpt: PAPPL v1.rc1 adds full localization, support for additional IPP features, and some other improvements.
---

PAPPL v1.2rc1 is now available for download.  PAPPL v1.2 adds full localization, support for additional IPP features, and some other improvements.  Changes in 1.2rc1 include:

- Added explicit support for running macOS printer applications as a server.
- Added unit test support for the new SNMP-based supply level and status monitoring code.
- Updated USB gadget code to not enable gadget until system is started or USB options are set.
- Updated default spool directory to use a persistent, per-user location.
- Fixed DNS-SD advertising when adding a printer from the web interface.
- Fixed double "Supplies" buttons in the web interface.
- Fixed human-readable location fields in web interfaces.
- Fixed an issue with the default system callback for `papplMainloop`.
- Fixed an issue with `papplDeviceList` and DNS-SD discovery when there was no active system.
- Fixed printer compatibility issues with the new `papplDeviceGetSupplies` API.
- Fixed some locking issues with the macOS menubar icon.

Enjoy!

* <a href="https://github.com/michaelrsweet/pappl/releases/tag/v1.2rc1" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v1.2rc1</a>

