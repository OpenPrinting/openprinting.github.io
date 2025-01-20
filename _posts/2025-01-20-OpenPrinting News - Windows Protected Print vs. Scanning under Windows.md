---
title: OpenPrinting News - Windows Protected Print vs. Scanning under Windows
layout: single
toc: false
toc_sticky: true
author: Till
excerpt: Windows Protected Print protects you from scanning
---
Around a year ago [I reported here](/OpenPrinting-News-December-2023/#new-architecture-under-windows) about Microsoft's plans to make printing under Windows more secure, going the same way as we are going with the [New Architecture in CUPS 3.x](/current/#the-new-architecture-for-printing-and-scanning), an all-IPP print environment without printer drivers, only supporting modern, driverless IPP printers. In Windows it is especially important to get rid of printer drivers, as they are closed-source code pieces running in system or even kernel level. For Windows Protected Print (WPP) Windows does not use CUPS, but Mopria instead, and they do not have a concept for non-driverless legacy printers, whereas we have the [Printer Applications](/current/#printer-applications) ([which can also be used under Windows](/wsl-printer-app/)).

Microsoft's plans were reported about in a [blog on Microsoft's community forum](https://techcommunity.microsoft.com/blog/MicrosoftSecurityandCompliance/a-new-modern-and-secure-print-experience-from-windows/4002645), where I also left some comments.

Now, some weeks ago, I read new comments there where many users complained that with the 24H2 update of Windows 11, which introduced Windows Protected Print, scanning on the multi-function printers ceased to work, while printing is working. Modern multi-function devices which do driverless IPP printing also do driverless scanning, using at least one of the standard protocols eSCL or WSD, but it seems that Microsoft did not take care of that when implementing Windows Protected Print.

Also [on The Register got reported](https://www.theregister.com/2025/01/02/scanner_canon_windows_update/) that with the update 24H2 of Windows 11 several users of Canon multi-function printers reported scanning not to work any more, despite Microsoft already having issued fixes.

Microsoft promised to fix the bug by end-January, but they already left their users without scanning working for many weeks.

But for the seasoned WSL tinkerer (**Warning: Command line use required!**) it should be solvable. Proceed as [described here for legacy printers](/wsl-printer-app/), but instead of (or in addition to) installing a Printer Application, install [SANE](http://www.sane-project.org/) (Scanner Access Now Easy):
```
sudo apt install sane-backends sane-airscan sane-utils
```
and then use the `scanimage` command. Enter `man scanimage` for how to use it.

I hope this makes Windows 11 SANE for the time being.

We will soon have [Scanner Applications](/current/#scanner-applications) which emulate driverless scanners (eSCL, WSD), but note that current Windows has especially problems with those.


**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**
