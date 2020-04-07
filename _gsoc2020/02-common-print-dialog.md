---
title: "Common Print Dialog Backends (CPDB) Qt implementation"
---

### Introduction
<p>
The <a href="https://doc.qt.io/qt-5.10/qtprintsupport-index.html" class="urlextern" title="https://doc.qt.io/qt-5.10/qtprintsupport-index.html"  rel="nofollow"> Qt Print Support</a> framework should be updated with the CPD support. The goal is to provide the CPD <abbr title="Graphical User Interface">GUI</abbr> features and d-bus communications with the <a href="https://github.com/OpenPrinting/cpdb-libs" class="urlextern" title="https://github.com/OpenPrinting/cpdb-libs"  rel="nofollow"> CPD backend support</a> for printing from Qt5 applications on support platforms.
</p>

<p>
Based on the GSoC work of the previous year, one example of Qt CPD implementation outside of Qt Print Support can be found at: <a href="https://github.com/rithvikp1998/CPDv2" class="urlextern" title="https://github.com/rithvikp1998/CPDv2"  rel="nofollow">https://github.com/rithvikp1998/CPDv2</a>. For this task, the implementation is expected to start with <a href="https://github.com/openwebos/qt/blob/master/src/gui/dialogs/qprintdialog_unix.cpp" class="urlextern" title="https://github.com/openwebos/qt/blob/master/src/gui/dialogs/qprintdialog_unix.cpp"  rel="nofollow">QPrintDialog</a> instead.
</p>

### Mentors
<p>
Dongxu Li (dongxuli2011 at gmail dot com), Nilanjana Lodh, first implementor of the CPDB  (nilanjanalodh at gmail dot com), Till Kamppeter, Project Leader OpenPrinting (till at linux dot com), TBD
</p>

### Desired Knowledge
<p>
C++ programming, Qt, CUPS
</p>

### License
<p>
Qt Contribution Agreement
</p>
