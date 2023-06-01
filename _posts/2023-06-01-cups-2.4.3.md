---
title: CUPS 2.4.3
layout: single
author: Zdenek
excerpt: CUPS 2.4.3 brings the fix for CVE-2023-32324, several improvements and a ton of bug fixes
---

CUPS 2.4.3 brings fix for CVE-2023-32324, several improvements and many bug fixes. CUPS now implements fallback for printers with broken firmware, which is not capable of answering to IPP request `get-printer-attributes` with `all, media-col-database` - this enables driverless support for bunch of printers which don't follow IPP Everywhere standard. Aside from the CVE fix the most important fixes are around color settings, printer application support fixes and OpenSSL support.

Detailed list of changes:

- Added a title with device uri for found network printers (Issues #402, #393)
- Added new media sizes defined by IANA (Issues #501)
- Added quirk for GoDEX label printers (Issue #440)
- Fixed `--enable-libtool-unsupported` (Issue #394)
- Fixed configuration on RISC-V machines (Issue #404)
- Fixed the `device_uri` invalid pointer for driverless printers with `.local`
  hostname (Issue #419)
- Fixed an OpenSSL crash bug (Issue #409)
- Fixed a potential SNMP OID value overflow issue (Issue #431)
- Fixed an OpenSSL certificate loading issue (Issue #465)
- Fixed Brazilian Portuguese translations (Issue #288)
- Fixed `cupsd` default keychain location when building with OpenSSL
  (Issue #529)
- Fixed default color settings for CMYK printers as well (Issue #500)
- Fixed duplicate PPD2IPP media-type names (Issue #688)
- Fixed possible heap buffer overflow in `_cups_strlcpy()` (fixes CVE-2023-32324)
- Fixed InputSlot heuristic for photo sizes smaller than 5x7" if there is no
  media-source in the request (Issue #569)
- Fixed invalid memory access during generating IPP Everywhere queue
  (Issue #466)
- Fixed lprm if no destination is provided (Issue #457)
- Fixed memory leaks in `create_local_bg_thread()` (Issue #466)
- Fixed media size tolerance in `ippeveprinter` (Issue #487)
- Fixed passing command name without path into `ippeveprinter` (Issue #629)
- Fixed saving strings file path in `printers.conf` (Issue #710)
- Fixed TLS certificate generation bugs (Issue #652)
- `ippDeleteValues` would not delete the last value (Issue #556)
- Ignore some of IPP defaults if the application sends its PPD alternative
  (Issue #484)
- Make `Letter` the default size in `ippevepcl` (Issue #543)
- Now accessing Admin page in Web UI requires authentication (Issue #518)
- Now look for default printer on network if needed (Issue #452)
- Now we poll `media-col-database` separately if we fail at first (Issue #599)
- Now report fax attributes and values as needed (Issue #459)
- Now localize HTTP responses using the Content-Language value (Issue #426)
- Raised file size limit for importing PPD via Web UI (Issue #433)
- Raised maximum listen backlog size to INT MAX (Issue #626)
- Update print-color-mode if the printer is modified via ColorModel PPD option
  (Issue #451)
- Use localhost when printing via printer application (Issue #353)
- Write defaults into /etc/cups/lpoptions if we're root (Issue #456)

Enjoy! :)
