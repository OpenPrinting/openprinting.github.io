---
title: "IPPUSBXD"
---
IPPUSBXD is a userland driver for IPP-over-USB class USB devices. It has been
designed for Linux but uses a cross platform usb library allowing eventual
porting to Windows and other non-POSIX platforms.

The IPP-over-USB standard was ratified by the USB forum in 2012. As of
2014 Mac OS X implemented this standard and with the addition of
ippusbxd Linux shall as well.

IPPUSBXD depends on POSIX threads, POSIX networking, and libusb as
developed by the community at libusb.info

IPPUSBXD has the following advantages:

1. At runtime links only with libc, pthreads, libusb, and
libavahi*. On a typical system these libraries will already be in
RAM. This gives ippusbxd a minimal ram footprint.
2. Requires no read access to any files.
3. Ships with a strict AppArmor profile.
3. Runs warning & leak free in valgrind
4. Compiles warning free in clang
5. Analyzed warning free in Coverity
6. Can be installed anywhere
7. Near zero CPU usage while idle
8. Low CPU usage while working

### Project Links

* <a href="https://github.com/OpenPrinting/ippusbxd" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub
  	</a>
