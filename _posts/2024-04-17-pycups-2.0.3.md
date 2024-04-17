---
title: Pycups 2.0.3
layout: single
author: Zdenek
excerpt: Pycups 2.0.3 contains changes related to deprecations and removals in newer Python3 versions.
---

pycups 2.0.3 contains changes from 2.0.2 - mainly changes related to newer Python3 versions:

- removed shebang from example/cupstree.py
- ignore driverless utilities for postscriptdriver tags creation (Fedora bug #1873385)
- remove epydoc from Makefile (#27)
- fix invalid delete of pointer (#11)
- Makefile uses wrong Python (#32)
- define PY_SSIZE_T_CLEAN in cupsipp.h - fixes traceback during IPPRequest.writeIO
  with Python 3.10
  - fix the test.py when there is no printer installed (#46)
  - Use PyObject_Call() instead of deprecated PyEval_CallObject()

  Version 2.0.3 was created to attempt to fix pycups installation via pip, but it was unsuccessful.

  Enjoy!

* <a href="https://github.com/OpenPrinting/pycups/releases/tag/v2.0.3" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-download" aria-hidden="true"></i>Download Pycups v2.0.3</a>
* <a href="https://github.com/OpenPrinting/pycups" itemprop="sameAs" rel="nofollow noopener noreferrer"><i class="fas fa-fw fa-home" aria-hidden="true"></i>Home Page</a>
