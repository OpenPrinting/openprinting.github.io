---
title: OpenPrinting News - September 2019
layout: single
author: Till
excerpt: End of Google Summer of Code 2019, Avahi, OpenPrinting web site work, CUPS 2.3.0 released, cups-filters 1.25.4, cpdb-backend-cups workaround for CUPS bug
---

## Google Summer of Code 2019

Coding ended and the final evaluations are completed, the completed projects officially announced by Google.

For the Linux Foundation we got 12 student slots in the beginning and after 1 stucent dropping out before coding started we had 11 students working. 2 failed in the second and 2 in the final evaluations, leaving 7 having completed their GSoC projects.

This is the worst year in terms of failing students for us.

For OpenPrinting there started 5 students and and 1 failed in the final evaluation. The other 4 completed the program successfully.

Here are the projects with their submitted work product links:


### 1. Generic Framework to turn legacy drivers consisting of CUPS filters and PPDs into Printer Applications

Student: Dheeraj Yadav<br>
Mentor: Till Kamppeter<br>
[Work Product](https://gist.github.com/dheeraj135/852733a6944d2f7ede670fe9d3d0ac6a)

PASSED

Dheeraj will soon work with Sahil to get his Printer Application framework documented on the new OpenPrinting web site.

### 2. Improve the pdftoraster filter to not use undocumented/unstable APIs of Poppler

Student: Tanmay Anand<br>
Mentor: Sahil Arora<br>
[Work Product](https://github.com/tanmayanand44/cups-filters-gsoc19/wiki/Google-Summer-of-Code-2019-%7C-The-Linux-Foundation-%7C-Improving-pdftoraster-filter-to-use-stable-Poppler-APIs)

PASSED

Tanmay completed his original project already in the first month. We asked him whether he would take a project for the rest of the time and he accepted. So he worked also on the adapter backend for the GTK3 print dialog to use the Common Print Dialog Backends (CPDB). Mentor for this project is Dongxu Li. He did not complete this at the end of the GSoC but promised to complete it after GSoC.


### 3. IPP: ipptool test suite updates for IPP errata updates

Student: Sharad Shukla<br>
Mentors: Smith Kennedy, Ira McDonald, Danny Brennan<br>
[Work Product](https://github.com/Sharadd15/ippsample/wiki/Gsoc-2k19-%7C-OpenPrinting-%7C-The-Linux-Foundation-%7C-Ipptool-test-suite-updates-for-IPP-errata-updates)

PASSED

Sharad will soon complete his not yet completed assignment of the bannertopdf filter also supporting the old bannertops input format.


### 4. ipptool test suite for IPP System Service

Student: Aakash Lahoti<br>
Mentors: Smith Kennedy, Ira McDonald, Danny Brennan<br>
[Work Product](https://github.com/aakashlahoti/Google-Summer-Of-Code-2019-The-Linux-Foundation)

PASSED


### 5. Turn the scp-dbus-service of system-config-printer into C

Student: Sobhan Mondal<br>
Mentors: Zdenek Dohnal<br>
[Work Product](https://github.com/sobhaniiest/scp-dbus-service)

FAILED (final evaluation)

Sobhan promised to complete his work after GSoC.


The project results will also get added to the new OpenPrinting web site.


## Avahi

Mike Sweet has posted on [Avahi GitHub Issue #125](https://github.com/lathiat/avahi/issues/125) and he is of the same opinion as me that the DNS-SD records of local services via the loopback ("lo") device should carry the "localhost" host name and not the network host name of the machine:

> If Avahi returns 127.0.0.1 as one of the addresses for a .local lookup, that will cause some serious security problems when machine A (a.local.) looks up machine B ("b.local.") and gets its own loopback address. By returning localhost ("localhost.") that security issue is avoided.
> Keep in mind as well that when CUPS tries to connect to a printer/server, it tries all of the addresses returned by a lookup in parallel until one of the connections succeeds. Since CUPS also validates the Host: header in requests (and block any attempt to communicate with cupsd over the loopback interface if the hostname is not "localhost" or "localhost."), this will result in a successful connection but a failed request, breaking printing.
> So you really do need to return "localhost" for services registered on the loopback interface.

No reaction from Trent Lloyd yet.


## OpenPrinting web site

Now with the GSoC completed we are resuming our work on the web site with Sahil leading the project.

Most of the site is in place, most important part to add now are the results of the 5 GSoC projects of this year.

Also we need to link to the OpenPrinting database interface web app ([Issue #55](https://github.com/OpenPrinting/openprinting.github.io/issues/55)). We will continue using this web app and the MySQL database (which we now feed from the foomatic-db repository on GitHub) as it is not worthwhile (possible?) to implement a replacement on it running on GitHub. The web app needs to get the outfit of our new web site ([Issue #58](https://github.com/OpenPrinting/openprinting.github.io/issues/58)).


## CUPS

2.3.0 released.

CUPS 2.3.0 is finally out! And the licensing resolved! With more than one year or 3 Ubuntu releases of delay it appeared on Fri, August 23, the day after Ubuntu Eoan (19.10) Feature Freeze. The license solution is that the Apache 2.0 license gets an exception added which allows linking with (L)GPL software, so cups-filters and other software using the CUPS library does not need any license change.

For new features see [Mike's slides of the last OpenPrinting Summit](https://ftp.pwg.org/pub/pwg/liaison/openprinting/presentations/cups-plenary-april-19.pdf).

```
Changes in CUPS v2.3.1
----------------------

- Fixed spelling of "fold-accordion".


Changes in CUPS v2.3.0
----------------------

- CVE-2019-8696 and CVE-2019-8675: Fixed SNMP buffer overflows
  (rdar://51685251)
- Added a GPL2/LGPL2 exception to the new CUPS license terms.
- Documentation updates (Issue #5604)
- Localization updates (Issue #5637)
- Fixed a bug in the scheduler job cleanup code (Issue #5588)
- Fixed builds when there is no TLS library (Issue #5590)
- Eliminated some new GCC compiler warnings (Issue #5591)
- Removed dead code from the scheduler (Issue #5593)
- "make" failed with GZIP options (Issue #5595)
- Fixed potential excess logging from the scheduler when removing job
  files (Issue #5597)
- Fixed a NULL pointer dereference bug in `httpGetSubField2` (Issue
  #5598)
- Added FIPS-140 workarounds for GNU TLS (Issue #5601, Issue #5622)
- The scheduler no longer provides a default value for the description
  (Issue #5603)
- The scheduler now logs jobs held for authentication using the error
  level so it is clear what happened (Issue #5604)
- The `lpadmin` command did not always update the PPD file for changes
  to the `cupsIPPSupplies` and `cupsSNMPSupplies` keywords (Issue #5610)
- The scheduler now uses both the group's membership list as well as the
  various OS-specific membership functions to determine whether a user
  belongs to a named group (Issue #5613)
- Added USB quirks rule for HP LaserJet 1015 (Issue #5617)
- Fixed some PPD parser issues (Issue #5623, Issue #5624)
- The IPP parser no longer allows invalid member attributes in
  collections (Issue #5630)
- The configure script now treats the "wheel" group as a potential
  system group (Issue #5638)
- Fixed a USB printing issue on macOS (rdar://31433931)
- Fixed IPP buffer overflow (rdar://50035411)
- Fixed memory disclosure issue in the scheduler (rdar://51373853)
- Fixed DoS issues in the scheduler (rdar://51373929)
- Fixed an issue with unsupported "sides" values in the IPP backend
  (rdar://51775322)
- The scheduler would restart continuously when idle and printers were
  not shared (rdar://52561199)
- Fixed an issue with `EXPECT !name WITH-VALUE ...` tests.
- Fixed a command ordering issue in the Zebra ZPL driver.
- Fixed a memory leak in `ppdOpen`.
```

No changes on 2.2.x branch.


## cups-filters

Currently released is 1.25.4.

Many releases happened during the short time to get bug fixes into the upcoming Ubuntu 19.10 (Eoan).

1.25.5:

Bug fix release, mainly for cups-browsed not to die on left over locally generated queues of unclaen shutdown of the previous session.

1.25.4:

Bug fix release for the page geometry and CUPS Raster output issues in the imagetoraster, imagetopdf, and pdftoraster filters.

1.25.3:

Bug fix release, especially to fix a compatibility issue with CUPS 2.2.12.

1.25.2:

Improved cups-browsed's handling of the DNS-SD records of advertised local and remote IPP print services. Especially make sure that local queues do not get already removed when the service on a single network interface disappears (for example Wi-Fi turned off) while still present on other interfaces. Also let local services preferably be accessed through the loopback ("localhost") interface to avoid data leaks into the network.

```
CHANGES IN V1.25.5

    - rastertopdf: Let the getIPPColorProfileName() function not
      return a pointer to a local variable (clang warning, Issue
      #150).
    - cups-browsed: If a locally generated queue (usually with
          "implicitclass://..." URI) left over from a previous
          (crashed) session is picked up on startup, do not set the
          URI as the remote printer's URI and do not cause a fatal
          error on a failed get-printer-attributes IPP request (Issue
          #148, Debian bug #939316).
    - pdftopdf: Do not preserve encryption, since the output
          already goes into the printer (Issue #146, Pull request
          #147).

CHANGES IN V1.25.4

    - imagetoraster: Do not call imagetops and pstoraster for
      classifications and page labels as these filters are not
      included any more with cups-filters.  Classifications and
      page labels are currently not supported for direct image
      printing, only for PDF or PostScript input (which goes
      through pdftopdf).
    - imagetoraster, imagetopdf: Fixed auto-rotation of images to
      fit output page best (Issue #145).
    - pdftoraster: If the PPD contains several equally-sized page
      size entries which match the size of the input page and one
      is the size selected by the user via the "PageSize" or
      "media" option (or the default selection in the PPD) then
      prefer this one instead of simply the first matching one.
    - pdftoraster: If the input page size cannot be matched with
      one of the PPD's page sizes it is considered a custom size,
      fill the page size name field of the CUPS Raster header with
      "Custom.XXXxYYY" then.
    - pdftoraster: Match the input page size with a page size in
      the PPD only if the differences of the dimensions are less
      than 1%, also match the input page size against the
      imageable area of the PPD's page sizes if no match with the
      full page size is found (Issue #138).

CHANGES IN V1.25.3

    - Sample PPDs: In HP-Color_LaserJet_CM3530_MFP-PDF.ppd renamed
      "custom" choice of the option "stapleoption" to "customsize"
      as from CUPS 2.2.12 on "custom" is not accepted any more as a
      choice name in a PPD file.
    - cups-browsed: Fixed check whether the remote printer
      understands PWG Raster (Issue #141).

CHANGES IN V1.25.2

    - foomatic-rip: Fixed segmentation fault when running
      foomatic-rip by hand and the PRINTER environment variable is
      not set (Pull request #139).
    - cups-browsed: Added note to cups-browsed.conf and man page
      about IP-based URIs depending on the network interface used.
    - cups-browsed: For each DNS-SD-discovered printer register
      each DNS-SD discovery instance with network interface,
      family, and IPP type. When DNS-SD messages of instances
      disappearing show up, only unregister this instance and
      remove the printer only if no instance is left. This
      prevents a local queue of a still available printer being
      removed when Wi-Fi (= one interface) is turned off (Issue
      #136).
    - cups-browsed: If a remote printer is served from the local
      machine, prefer the "localhost"/loopback interface URI.
    - cups-browsed: If a remote printer is discovered more than
      once, use the new instance only if it has no downgrades and
      at least one upgrade compared to the old one. Features
      currently compared are IPP/IPPS, loopback interface or not,
      and discovery via CUPS legacy/LDAP/DNS-SD.
    - cups-browsed: If an Avahi-discovered entry comes through the
      "lo" interface, always use the host name "localhost". Use
      IP addresses instead of host names only if explicitly
      requested.
    - cups-browsed: Consider remote printer entries also as from
      the same printer if one has the local machine's network name
      and the other "localhost" as host name (Issue #136).
```

## ippusbxd

No further news.


## Common Print Dialog Backends

When packaging CUPS 2.2.12 for Ubuntu Eoan (19.10) the automatic tests of Ubuntu's build servers failed cpdb-libs and after several days of debugging I found out that libcups is not initializing some glbal variables with default host name, port, domain socket file for the local CUPS server in some cases. This prevented the CUPS backend from accessing the printer's capabilities via get-printer-attributes IPP request and I had to apply a workaround in the cpdb-backend-cups project.

We have reported [Issue #5642](https://github.com/apple/cups/issues/5642) on the GitHub of CUPS. A workaround for the time being was applied to cpdb-backend-cups, with this [commit](https://github.com/OpenPrinting/cpdb-backend-cups/commit/d8d7aa10)

Released cpdb-backend-cups 1.1.1 with the fix:

```
- Added "ippPort()" call to the beginning of the program, to initialize
  libcups (Issue #2)
```
