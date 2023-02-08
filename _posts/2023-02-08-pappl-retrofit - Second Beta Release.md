---
title: pappl-retrofit - Second Beta Release!
layout: single
author: Till
excerpt: pappl-retrofit 1.0b2 - Fix issues in source code docs and allow installation of Legacy Printer Application as permanently running system daemon.
---
This is the second beta release of the upcoming pappl-retrofit 1.0.0, to fix some issues in the source code documentation and to allow installation of the Legacy Printer Application as a permanently running system daemon.
- Support for Legacy Printer Application as system daemon
  We have added a systemd `*.service` file and an install mode for installing the Legacy Printer Application as system daemon. The mode is triggered by the `--enable-legacy-printer-app-as-daemon` option for `./configure`. Then the `*.service` file gets installed and the executable `legacy-printer-app` gets installed into `/usr/(local/)sbin/`.
- `README.md`: Updated TODOs and fixed minor glitches
  Especially the PAPPL development got already far enough for localization and ink level reporting support, so that we do not need to tell any more that we are waiting for further the devlopment of PAPPL.
- `CONTRIBUTING.md`: Updated text to reflect pappl-retrofit
- `COPYING`, `NOTICE`: Fixed copyright year 2023 and simplified the file based on the fact that one can assign the package's license to all autotools-generated files.
- Adapted `DEVELOPING.md` to the pappl-retrofit API, it was still reflecting the CUPS API (file was copied over from CUPS.
- Removed _prDefaultPaperSize() from pappl-retrofit-private.h. The function got removed when PAPPL had introduced `papplLocGetDefaultMediaSizeName()` which replaces this functionality.

[**More Details and Download**](https://github.com/OpenPrinting/pappl-retrofit/releases/tag/1.0b2)

[**GitHub Discussion**](https://github.com/OpenPrinting/pappl-retrofit/discussions/6)
