---
title: OpenPrinting News - The Winter of Code 4.0
layout: single
toc: false
toc_sticky: true
author: Till
excerpt: OpenPrinting is mentoring organization in the WoC 4.0! Apply for doing a 1-month project until Dec 31!
---
Some weeks ago I got e-mail from the Google Developer Groups (GDG) on Campus IIIT Kalyani inviting me as Google Summer of Code (GSoC) org admin for the Linux Foundation to participate in the [Winter of Code (WoC)](https://winterofcode.tech/#about) which they are organizing. Actually, they seem to have invited all the GSoC mentoring organizations, as I got the same e-mail also via the LibreOffice developer mailing list.

The Winter of Code is an Open Source contributor program inspired by the Google Summer of Code, but with only a 1-month coding period and no stipends for contributors and mentors. It is organized by folks at the Indian Institute of Information Technology Kalyani, but as they have approached other GSoC organizations, too, it is not based on my relationships with India that they invited me.

The program is performed for the 4th time this year but I only got note this year, by the e-mail I got this year.

I decided to [participate](https://winterofcode.tech/#orgs) with [3 small projects](https://winterofcode.tech/#projects) to try out the program and see whether it attracts people to join our developer community and also for potential GSoC contributors, by giving us nice code samples by their work on our WoC projects.

## The project ideas we have on offer are:

**[Add support for JPEG-XL as input format](https://github.com/OpenPrinting/libcupsfilters/issues/73)**<BR>
Mentors: [Uddhav Phatak](https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce), [Till Kamppeter](https://www.openprinting.org/)

> JPG-XL is a more modern successor of JPG, supporting high color depths (>8 bits per color), HDR, more flexibility with compression rates, ... to allow for high-quality image files in a standard format. A free software library supporting this format is available, libjxl.
>
> Therefore we should add support for this format and try to carry on to the printer as much as possible of the image quality, especially the higher color depth, as the PWG and CUPS Raster support up to 16 bits per color.

**[Create an OCI container image of ipp-usb](https://github.com/OpenPrinting/ipp-usb/issues/93)**<BR>
Mentor: [Rudra Pratap Singh](https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6)

> As we have OCI container images for CUPS and for the 4 retro-fitting Printer Applications at OpenPrinting, we also want to have an OCI container image of the IPP-over-USB daemon ipp-usb.
>
> This way we can provide the full printing stack as OCI container images, ideally on DockerHub. This allows to add printing functionality to most immutable distributions, and also to distributions in general, using official packages of OpenPrinting.

**[Apply OSS-Fuzz to cups-browsed](https://github.com/OpenPrinting/fuzzing/issues/4)**<BR>
Mentor: [Jiongchi Yu](https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024))

> We have deployed OSS-Fuzz on CUPS (2.x), libcups (of CUPS 3.x), libcupsfilters and cups-filters now to efficiently discover crash bugs and vulnerabilities on these components.
>
> But recently, we had a security vulnerability on cups-browsed, which is not covered by OSS-Fuzz. Therefore we want to apply OSS-Fuzz here, too.

**We will also accept your own project ideas.**

If you are interested, please [register as a contributor](https://winterofcode.devfolio.co/) on the WoC web site. Last day for registering is December 31. Until January 12, you will need to submit your proposal then and coding period is January 20 - February 20 (see [complete schedules](https://winterofcode.tech/#timeline). It is not required to be a student or an open-source beginner, everybody can participate. Please also check out the [FAQs](https://winterofcode.tech/faqs).

A well-done WoC project can also be your launchpad to the GSoC as we will for sure give you higher priority in the GSoC contributor selection process then.

We are looking forward for your participation.


**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**

