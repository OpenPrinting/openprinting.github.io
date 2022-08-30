---
title: system-config-printer 1.5.18
layout: single
author: Zdenek
excerpt: system-config-printer-1.5.18 brings fix for application crash if libhandy is not installed and other fixes
---

system-config-printer-1.5.18 brings fix for application crash if libhandy is not installed, which crashes the application on non-GNOME desktops, and other fixes, the complete list is here:

- Add <launchable/> into the .appdata.xml file (#269)
- Accessiblity improvements (#244)
- system-config-printer couldn't be uninstalled vi GNOME Software (#273)
- system-config-printer crashes due missing libhandy (#283)
- Updated config.sub and config.guess to fix configuration error on RiSC (#282)
- Use pkg-config or --with-cups-serverbin-dir for finding SERVERBIN (#234)
