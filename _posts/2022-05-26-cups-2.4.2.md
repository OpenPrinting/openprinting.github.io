---
title: CUPS 2.4.2
layout: single
author: Zdenek
excerpt: CUPS 2.4.2 brings the fix for CVE-2022-26691, LibreSSL/OpenSSL and minimal AIX support together with a list of bug fixes
---

CUPS 2.4.2 brings the fix for CVE-2022-26691, together with LibreSSL/OpenSSL and minimal AIX support. There are lots of bug fixes as well, feel free to check the list of changes:

- Fixed certificate strings comparison for Local authorization (CVE-2022-26691)
- The `cupsFileOpen` function no longer opens files for append in read-write
  mode (Issue #291)
- The cupsd daemon removed processing temporary queue (Issue #364)
- Fixed delay in IPP backend if GNUTLS is used and endpoint doesn't confirm
  closing the connection (Issue #365)
- Fixed conditional jump based on uninitialized value in cups/ppd.c (Issue #329)
- Fixed CSS related issues in CUPS Web UI (Issue #344)
- Fixed copyright in CUPS Web UI trailer template (Issue #346)
- mDNS hostname in device uri is not resolved when installaling a permanent
  IPP Everywhere queue (Issues #340, #343)
- The `lpstat` command now reports when the scheduler is not running
  (Issue #352)
- Updated the man pages concerning the `-h` option (Issue #357)
- Re-added LibreSSL/OpenSSL support (Issue #362)
- Updated the Solaris smf service file (Issue #368)
- Fixed a regression in lpoptions option support (Issue #370)
- The scheduler now regenerates the PPD cache information after changing the 
  "cupsd.conf" file (Issue #371)
- Updated the scheduler to set "auth-info-required" to "username,password" if a
  backend reports it needs authentication info but doesn't set a method for 
  authentication (Issue #373)
- Updated the configure script to look for the OpenSSL library the old way if
  pkg-config is not available (Issue #375)
- Fixed the prototype for the `httpWriteResponse` function (Issue #380)
- Brought back minimal AIX support (Issue #389)
- `cupsGetResponse` did not always set the last error.
- Fixed a number of old references to the Apple CUPS web page.
- Restored the default/generic printer icon file for the web interface.
- Removed old stylesheet classes that are no longer used by the web 
  interface. 

Enjoy the new CUPS release!
