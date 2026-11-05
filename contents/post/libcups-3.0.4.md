---
title: libcups v3.0.4
layout: single
author: Mike
excerpt: libcups v3.0.4 is a bug fix release.
date: '2026-11-05'
---

libcups v3.0.4 is a bug fix release. Changes include:

- SECURITY-3.5: Updated `cupsOAuthGetTokens` to do more validation of the access token (GHSA-mq7v-g5c2-75fg)
- SECURITY-2.3: `cupsGetDests` did not validate printer/server responses (GHSA-hp44-ph36-rc52)
- Added `cupsDNSSDSetHostName` function.
- Added Swedish localization (Issue #174)
- Added missing `cups_serverroot` variable to "pkg-config" file.
- Updated cookie handling to separate Cookie and Set-Cookie headers (Issue #161)
- Updated `cupsOAuthGetTokens` to support multiple audience values (Issue #166)
- Updated JSON code to support escaped Unicode surrogate pairs (Issue #169)
- Updated `httpSeparateURI` to better detect out of range port numbers (Issue #179)
- Updated `ippValidateAttribute` to check name and text values against RFC 5198 (Issue #180)
- Updated `cupsSignCredentialsRequest` to validate all common names (Issue #189)
- Updated `cupsOAuthGetUserId` to properly expire stale user information (Issue #190)
- Updated `cupsOAuthMakeAuthorizationURL` to require the authorization endpoint to be a "https" URL (Issue #193)
- Updated `cupsJWTHasValidSignature` to use a constant-time comparison function for HMAC signatures.
- Updated `ippeveprinter` to support a single test password.
- Updated `ippeveprinter` to support OAuth/OpenID authorization.
- Updated `ippeveprinter` to add a date/time stamp when logging to a file.
- Updated dateTime parsing in IPP files.
- Updated the HTTP implementation to reduce stack usage.
- Updated `cupsGetRand` and `cupsOAuthMakeBase64Random` to use better random data, when available.
- Now explicitly validate IPP attribute names as keyword strings.
- Fixed `httpGetDateString` with bad date/time values (Issue #167)
- Fixed a potential buffer overflow in `cupsDNSSDAssembleFullName` on Windows (Issue #170)
- Fixed a potential string overrun when loading .strings files (Issue #171)
- Fixed `cupsSignCredentialsRequest` to reject requests with a bad signature (Issue 172)
- Fixed `httpPeek` return value with compressed message bodies (Issue #175)
- Fixed a potential integer overflow with `pwgMediaForPWG` (Issue #176)
- Fixed some character testing that wasn't safe on platforms with a signed `char` type (Issue #177)
- Fixed support for mDNSResponder on Windows (Issue #178)
- Fixed `cupsGetCredentialsTrust` to properly validate the signatures of CA-signed credentials (Issue #181)
- Fixed error checking in `cupsOAuthGetAuthorizationCode` (Issue #182)
- Fixed the handling of `ATTR-IF-[NOT-]DEFINED` in IPP files (Issue #185)
- Fixed a potential race condition in `cupsEnumDests` (Issue #186)
- Fixed a bug in `cupsJSONExportString` when exporting a child node (Issue #187)
- Fixed the ECDSA P-256 curve used for JWT and X.509 certificates and signatures (Issue #188)
- Fixed `ipptransform` margins for small media sizes (Issue #191)
- Fixed `ipptransform` output of more than 10000 pages (Issue #194)
- Fixed `cupsLangFind` issue with POSIX locale (Issue #196)
- Fixed custom media size buffering (Issue #198)
- Fixed a DNS-SD browsing issue on Windows (Issue #199)
- Fixed `httpGetHostname` on Windows (Issue #200)
- Fixed handling of "%c" formatting in `cupsFormatString` (Issue #201)
- Fixed DNS-SD threading issues on Windows (Issue #204)
- Fixed issues related to extension tag values (Issue #205)
- Fixed the loading of the default DigestOptions value (Issue #206)
- Fixed cancellation of the current active job in `ippeveprinter` (Issue #207)
- Fixed PAM support in `ippeveprinter`.
- Fixed a typo in the JWT HS verification code.
- Fixed `ippValidateAttribute` not returning `false` for too-long URIs.
- Fixed a memory leak in `httpGetSecurity` when using GNU TLS.
- Fixed a memory leak in `cupsJWTImportString`.
- Fixed a bug in `cupsJWTExportString` with JSON output.
- Fixed too-permissive parser in `cupsJSONImportString`.

Enjoy!

* <a href="https://github.com/OpenPrinting/libcups/releases/tag/v3.0.4" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download v3.0.4</a>
