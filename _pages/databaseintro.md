---
title: "Printer Compatibilty Database"
permalink: /databaseintro/
author_profile: false
---
<div class="level1">

<p>
The OpenPrinting database contains a wealth of information about specific printers, along with extensive driver information, the drivers themselves, basic specifications, and an associated set of configuration tools.
</p>
<ul>
<li class="level1"><div class="li">  You can find all the <em>printer</em> information from the <a href="http://www.openprinting.org/printer_list.cgi" class="urlextern" title="http://www.openprinting.org/printer_list.cgi"  rel="nofollow">printer listing</a> page.</div>
</li>
<li class="level1"><div class="li">  You can find all the <em>driver</em> information and the drivers from the <a href="http://www.openprinting.org/driver_list.cgi" class="urlextern" title="http://www.openprinting.org/driver_list.cgi"  rel="nofollow">driver listing</a> page.</div>
</li>
</ul>

</div>

<h2 class="sectionedit2" id="about_the_data">About the data</h2>
<div class="level2">

<p>
This database includes basic specifications for printers and details of how to make them go under normal unices that can run Ghostscript and/or filters like pnm2ppa. GNU/Linux, the BSDs and Mac <abbr title="Operating System">OS</abbr> X typify this category; users of other commercial unices can usually benefit from this information as well. The information here is not (very) useful for Windows users.
</p>

<p>
For many drivers we ship also the driver itself as distribution-independent packages. These packages can be installed on all LSB-compliant distributions with CUPS, Ghostscript (ESP 8.15.3 or newer, <abbr title="GNU General Public License">GPL</abbr> 8.60 or newer), Perl, and foomatic-rip. This covers the current versions of all major distributions. Appropriate links and links to the installation instructions you find on the <a href="http://www.openprinting.org/driver_list.cgi" class="urlextern" title="http://www.openprinting.org/driver_list.cgi"  rel="nofollow">driver overview page</a> and on the appropriate driver and printer entry pages. The driver packages already contain their PPDs. So do not download and install the PPD in addition.
</p>

<p>
We have also a <a href="/openprinting/database/query" class="wikilink1" title="openprinting:database:query">web API</a> for printer setup tools to be able to browse the database and to download driver packages. This allows fully automatic installation of detected printers which the local distribution does not support, and also updating drivers if the distribution does not ship an update. We provide enough data, that the tool can ask the user whether he really wants to install this driver: free/non-free, license, from manufacturer/third party, support contact and level, …
</p>

<p>
Printers are categorized according to how well they work under Linux and Unix. The ratings do not pertain to whether or not the printer will be auto-recognized or auto-configured, but merely to the highest level of functionality achieved.
</p>
<ul>
<li class="level1"><div class="li"> <strong>Perfectly <img src="/assets/images/Linuxyes.png" class="media" alt="" /><img src="/assets/images/Linuxyes.png" class="media" alt="" /><img src="/assets/images/Linuxyes.png" class="media" alt="" /></strong></div>
<!-- </li>
<li class="level1"><div class="li"> -->  Perfect printers work perfectly; everything the printer can do is working also under Linux and Unix. For multifunction devices, this must include scanning/faxing/etc.
</li>
<li class="level1"><div class="li"> <strong> Mostly <img src="/assets/images/Linuxyes.png" class="media" alt="" /><img src="/assets/images/Linuxyes.png" class="media" alt="" /></strong></div>
<!-- </li>
<li class="level1"><div class="li"> -->  These printers work almost perfectly - funny enhanced resolution modes may be missing, or the color is a bit off, but nothing that would make the printouts not useful.
</li>
<li class="level1"><div class="li"> <strong> Partially <img src="/assets/images/Linuxyes.png" class="media" alt="" /></strong></div>
<!-- </li>
<li class="level1"><div class="li"> -->  These printers mostly don&#039;t work; you may be able to print only in black and white on a color printer, or the printouts look horrible.
</li>
<li class="level1"><div class="li"> <strong> Paperweight<img src="/assets/images/Linuxno.png" class="media" alt="" /></strong></div>
<!-- </li>
<li class="level2"><div class="li"> -->  These printers don&#039;t work at all. They may work in the future, but don&#039;t count on it.
</li>
</ul>

<p>
<br/>
This is an <strong>interactive</strong> database; if you know anything useful that isn&#039;t represented here, please add your knowledge to the pool – post anything you know to the forum for your printer or use our <a href="http://www.openprinting.org/edit_printer.cgi?newentry=1" class="urlextern" title="http://www.openprinting.org/edit_printer.cgi?newentry=1"  rel="nofollow">add printer form</a>, and one of our editors will incorporate your information into the data. If you printer is already listed, enter your contribution to the “User Notes” section of the existing entry.<br/>

</p>

<p>
This entire database (except the driver packages) is available in an XML format as part of the <a href="https://openprinting.github.io/projects/02-foomatic" title="openprinting:foomatic">Foomatic</a> system, which provides configuration tools and filter scripts for a variety of spoolers. All driver packages and the LSB DDK are in <a href="http://www.openprinting.org/download/printdriver/" class="urlextern" title="http://www.openprinting.org/download/printdriver/"  rel="nofollow">this directory</a>.
</p>

</div>
