---
title: ippusbxd 1.34 released!
layout: single
author: Till
excerpt: This release is mainly to improve the DNS-SD advertising to equal the one of the network mode of the device and also to advertise its AirScan scanning capabilities, but we also have some communication and code base improvements.
---
This release is mainly to improve the DNS-SD advertising to equal the one of the network mode of the device and also to advertise its AirScan scanning capabilities, but we also have some communication and code base improvements.
- DNS-SD-advertise the devices capabilities based on polling the device via IPP (printing and send-fax part) and via HTTP (eSCL scanning part, if available), the records now contain the same information as the DNS-SD records which the printer broadcasts through its network connection
- Improved code base by formatting, header files, comments in the header files, and improving debug output
- Added exponential backoff for print read requests when printer's responses are empty for saving resources and reducing log file spam
- Apparmor: Matched path when bin and sbin directories are merged

[**More Details and Download**](https://github.com/OpenPrinting/ippusbxd/releases/tag/1.34)
