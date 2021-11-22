---
title: CUPS 2.4b1
layout: single
author: Zdenek
excerpt: CUPS v2.4b1 is the beta release for OpenPrinting CUPS 2.4 which contains new features, deprecations, removals and bugfixes.
---

CUPS 2.4b1 is the beta release for OpenPrinting CUPS 2.4 which contains  several new features such as basic OAuth support, support for AirPrint and Mopria clients and support for running CUPS as a snap, several deprecations (Kerberos, cups-config), removals of old deprecated directives, and many bug fixes.

The detailed list of changes:

- Added support for CUPS running in a Snapcraft snap.
- Added basic OAuth 2.0 client support (Issue #100)
- Added support for AirPrint and Mopria clients (Issue #105)
- Added configure support for specifying systemd dependencies in the CUPS
  service file (Issue #144)
- Added several features and improvements to `ipptool` (Issue #153)
- Added a JSON output mode for `ipptool`.
- The `ipptool` command now correctly reports an error when a test file cannot
  be found.
- CUPS library now uses thread safe `getpwnam_r` and `getpwuid_r` functions (Issue #274)
- Fixed Kerberos authentication for the web interface (Issue #19)
- The ZPL sample driver now supports more "standard" label sizes (Issue #70)
- Fixed reporting of printer instances when enumerating and when no options are 
  set for the main instance (Issue #71)
- Reverted USB read limit enforcement change from CUPS 2.2.12 (Issue #72)
- The IPP backend did not return the correct status code when a job was canceled
  at the printer/server (Issue #74)
- The `testlang` unit test program now loops over all of the available locales
  by default (Issue #85)
- The `cupsfilter` command now shows error messages when options are used
  incorrectly (Issue #88)
- The PPD functions now treat boolean values as case-insensitive (Issue #106)
- Temporary queue names no longer end with an underscore (Issue #110)
- The USB backend now runs as root (Issue #121)
- Added pkg-config file for libcups (Issue #122)
- Fixed a PPD memory leak caused by emulator definitions (Issue #124)
- Fixed a `DISPLAY` bug in `ipptool` (Issue #139)
- The scheduler now includes the `[Job N]` prefix for job log messages, even
  when using syslog logging (Issue #154)
- Added support for locales using the GB18030 character set (Issue #159)
- `httpReconnect2` did not reset the socket file descriptor when the TLS 
  negotiation failed (Apple #5907)
- `httpUpdate` did not reset the socket file descriptor when the TLS
  negotiation failed (Apple #5915)
- The IPP backend now retries Validate-Job requests (Issue #132)
- Now show better error messages when a driver interface program fails to
  provide a PPD file (Issue #148)
- Added dark mode support to the CUPS web interface (Issue #152)
- Added a workaround for Solaris in `httpAddrConnect2` (Issue #156)
- Fixed an interaction between `--remote-admin` and `--remote-any` for the
  `cupsctl` command (Issue #158)
- Now use a 60 second timeout for reading USB backchannel data (Issue #160)
- The USB backend now tries harder to find a serial number (Issue #170)
- Fixed `@IF(name)` handling in `cupsd.conf` (Apple #5918)
- Fixed documentation and added examples for CUPS' limited CGI support
  (Apple #5940)
- Fixed the `lpc` command prompt (Apple #5946)
- Now always pass "localhost" in the `Host:` header when talking over a domain
  socket or the loopback interface (Issue #185)
- Fixed a job history update issue in the scheduler (Issue #187)
- Fixed `job-pages-per-set` value for duplex print jobs.
- Fixed an edge case in `ippReadIO` to make sure that only complete attributes
  and values are retained on an error (Issue #195)
- Hardened `ippReadIO` to prevent invalid IPP messages from being propagated
  (Issue #195, Issue #196)
- The scheduler now supports the "everywhere" model directly (Issue #201)
- Fixed some IPP Everywhere option mapping problems (Issue #238)
- Fixed support for "job-hold-until" with the Restart-Job operation (Issue #250)
- Fixed the default color/grayscale presets for IPP Everywhere PPDs (Issue #262)
- Fixed support for the 'offline-report' state for all USB backends (Issue #264)
- Documentation fixes (Issue #92, Issue #163, Issue #177, Issue #184)
- Localization updates (Issue #123, Issue #129, Issue #134, Issue #146,
  Issue #164)
- USB quirk updates (Issue #192, Issue #270, Apple #5766, Apple #5838,
  Apple #5843, Apple #5867)
- Web interface updates (Issue #142, Issue #218)
- The `ippeveprinter` tool now automatically uses an available port.
- Fixed several Windows TLS and hashing issues.
- Deprecated cups-config (Issue #97)
- Deprecated Kerberos (`AuthType Negotiate`) authentication (Issue #98)
- Removed support for the (long deprecated and unused) `FontPath`,
  `ListenBackLog`, `LPDConfigFile`, `KeepAliveTimeout`, `RIPCache`, and
  `SMBConfigFile` directives in `cupsd.conf` and `cups-files.conf`.
- Stubbed out deprecated `httpMD5` functions.
- Add test for undefined page ranges during printing.

Enjoy!
