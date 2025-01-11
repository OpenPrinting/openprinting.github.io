---
title: cups-browsed 2.1.1
layout: single
author: Till
excerpt: Bug fix release, especially to fix the long-standing problem that cups-browsed sometimes gets stuck with 100% CPU
---
We have issued this release as it contains a fix for a long-standing bug. Since multi-threading was introduced as a central new feature of the 2.x generation of cups-browsed users started to report that from time to time cups-browsed got stuck with 100% CPU load on 1 or 2 processor cores (Ubuntu bugs [#2049315](https://bugs.launchpad.net/bugs/2049315), [#2067918](https://bugs.launchpad.net/bugs/2067918), and [#2073504](https://bugs.launchpad.net/bugs/2073504)).

It took very long to come to the right idea what actually needed to get fixed, as the bug was not easily reproducable, sometimes it happened but often not. After having collected some tracebacks it turned out that cups-browsed always got stuck in an infinite loop in the `httpGets()` function of libcups. One of the reporters of the cups-browsed problem also reported [an issue in CUPS](https://github.com/OpenPrinting/cups/issues/879). I found out that the `used` field of the data structure `http_t` for HTTP requests, which tells how many bytes in a buffer are used, has to be negative to cause the infinite loop. Reviewing the HTTP-related code in libcups I did not find a way how this can happen. `http_t` is even an opaque data structure, so the `used` field can only be changed by the CUPS library's own functions.

But when I went through the code of cups-browsed I found the culprit: cups-browsed opens only one single HTTP connection to the cupsd it is working for and keeps it throughout its whole life. Only later on multi-threading got added, to do computationally intensitive tasks, CUPS queue creation and DNS-SD resolving, in parallel, and having only one HTTP connection, requests happening in parallel messed up the data structure, ending up with negative `used` field and cups-browsed getting stuck in an infinite loop.

Now we have fixed this by creating separate HTTP connection by each function which needs one. CUPS has no problem with several client connections in parallel.

We also fixed an uninitialized string buffer and a wrong use of a pointer.

### All changes

- Do not use global HTTP connection to local CUPS
  cups-browsed used a simple HTTP connection to CUPS and preserved it in a global variable throughout its whole life. With the addition of multi-threading this caused race-conditions and especially cups-browsed getting stuck in a busy loop. Now we create separate HTTP connections each time we need one, to eliminate this problem (Ubuntu bugs [#2049315](https://bugs.launchpad.net/bugs/2049315), [#2067918](https://bugs.launchpad.net/bugs/2067918), and [#2073504](https://bugs.launchpad.net/bugs/2073504), CUPS Issue [#879](https://github.com/OpenPrinting/cups/issues/879)).
- Fix uninitialized `make_model` in `create_queue()`
  Initialized the buffer by putting a terminating zero to its beginning, also removed a wrong use of `sizeof()` (applying to pointer no to buffer, Issue [#42](https://github.com/OpenPrinting/cups-browsed/issues/42)).

### Package

- **cups-browsed: [More Details and Download](https://github.com/OpenPrinting/cups-browsed/releases/tag/2.1.1), [Discussion](https://github.com/OpenPrinting/cups-browsed/discussions/49)**
