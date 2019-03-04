---
title: "Common Print Dialog Backends"
---
The Common Printing Dialog Backends (CPDB) project of OpenPrinting is about separating the print dialogs of different GUI toolkits and applications (GTK, Qt, LibreOffice, ...) from the different print technologies (CUPS/IPP, Google Cloud Print, ...) so that they can get developed independently and so always from all applications one can print with all print technologies and changes in the print technologies get supported quickly.

If one opens the print dialog, the dialog will not talk directly to CUPS, Google Cloud Print, or any other printing system. For this communication there are the backends. The dialog will find all available backend and sends commands to them, for listing all available printers, giving property/option lists for the selected printers, and printing on the selcted printer. This communication is done via D-Bus. So the backends are easily exchangeable and for getting support for a new print technology only its backend needs to get added.

### Project Links

* <a href="https://github.com/OpenPrinting/cpdb-libs" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub - CPDB Libs
  	</a>

* <a href="https://github.com/OpenPrinting/cpdb-backend-cups" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub - CUPS Backend
  	</a>

* <a href="https://github.com/OpenPrinting/cpdb-backend-gcp" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub - Google Cloud Print Backend
  	</a>

* <a href="https://github.com/OpenPrinting/cpdb-backend-file" itemprop="sameAs" rel="nofollow noopener noreferrer">
   	<i class="fab fa-fw fa-github" aria-hidden="true"></i>GitHub - File(PDF) Backend
  	</a>
  