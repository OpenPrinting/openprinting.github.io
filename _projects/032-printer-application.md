---
title: "Printer Applications"
author: Dheeraj
author_profile: true
---

## What are Printer Applications?
Printer applications are a way to separate PPDs and backends, required by the printers, from the CUPS.

## Why do we need Printer Applications?
CUPS will drop support for PPD files in v2.4.x. Thus by decoupling printer drivers from CUPS, we can continue supporting printers which doesn't support driverless printing.

## What exactly Printer Application does?
A Printer Application is developed specifically for a printer driver. So, let's say we have a printer application for hplip printer driver package. This printer application will keep searching for printers which should be supported by the hplip package(By supported I mean, the hplip package should have PPD for that printer).

Next, after it detects a supported printer, the printer application starts a printer emulator based on the PPD file of the printer. Whenever a user prints a job, the job is sent to the printer emulator, then the printer emulator forwards this job to the printer after applying necessary filters and using appropriate backend.

This way, the CUPS only has to take care of driverless printing. All the other technicalities specific to the printer are encapsulated inside the printer application.

## Snap Packages
If we install CUPS snap package, we cannot add printer drivers because we cannot modify snap directories. Printer Applications are a perfect solution to this problem. Printer Applications of different printer driver packages can be installed as separate snaps.
