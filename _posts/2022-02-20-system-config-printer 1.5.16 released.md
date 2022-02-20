---
title: system-config-printer 1.5.16 released!
layout: single
author: Till
excerpt: Release covering one year of bug fixes, translations, and updated README.md
---
Release covering one year of bug fixes, translations, and updated README.md
- updates in README.md: build/install instructions, changes related to s-c-p with CUPS 3.x (IPP services/Printer Applications, no PPDs/drivers/static queues), TODOs, need of new developer(s)
- fix preserve_job_files default settings
- add debugprint covering failed fingerprint retrieval attempts
- Remove travis
- .travis.yml: run on focal and its newer python
- Make sure that applet.py is running one instance per user
- fix incorrect use of urllib.request
- remove python3-requests
- build: Migrate build system from Intltool to Gettext
- Makefile.am: Remove zanata usage
- udev-configure-printer.c: Fix possible use after frees and leaks
- scp-dbus-service.py: Fix typo in method call
- add option to disable xmlto manual generation
- allow + in device uris - gutenprint has a backend with + (fixes #208)
- tons of translations

[**More Details and Download**](https://github.com/OpenPrinting/system-config-printer/releases/tag/v1.5.16)
