---
title: cups-filters 1.28.4 released!
layout: single
author: Till
excerpt: Bug fix release, mainly to solve CUPS performance problems caused by the IPP fax support of the "driverless" utility
---
Bug fix release, mainly to solve CUPS performance problems caused by the IPP fax support of the "driverless" utility
- driverless: Avoid duplicate PPD list entries from the same device via UUID
- driverless: Reduce ippfind calls by "driverless" and "driverless-fax"called by CUPS. Let "driverless list" list both print and fax PPDs and "driverless-fax list" do nothing.
- driverless: Avoid duplicate listings in printer discovery, by "driverless-fax" not listing any URI as "driverless" lists them all already.
- driverless: Vastly improve performance by doing only one ippfind call instead of two (IPP, IPPS) as ippfind accepts more than one reg type on the command line.
- Sample PPDs: Corrected manufacturer name in Fuji_Xerox-DocuPrint_CM305_df-PDF.ppd.

[**More Details and Download**](https://github.com/OpenPrinting/cups-filters/releases/tag/1.28.4)
