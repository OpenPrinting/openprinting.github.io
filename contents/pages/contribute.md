---
title: "Contribute"
layout: splash
permalink: /contribute
header:
    overlay_color: "#616161"
    overlay_filter: "1"
excerpt: "How to help OpenPrinting, with or without programming."
toc: true
---

OpenPrinting is the Linux Foundation workgroup that makes printing and scanning work on Linux and other Unix-like systems. When you print from Linux, the software that finds your printer, converts your document into something the printer understands and sends the job is most likely ours. The best-known part is [CUPS](https://github.com/OpenPrinting/cups), the printing system used by Linux and most other non-Windows systems.

The core team is small, and a lot of the work is done by volunteers and Google Summer of Code contributors. You don't need to be a programmer to help, and new words on this page are explained at the end, under [A few terms explained](#a-few-terms-explained).

Not sure where to start? Pick what fits you:

| If you want to... | Go to | Coding? |
| --- | --- | --- |
| Help someone with their printer | [Help other users](#help-other-users) | No |
| Tell us something is broken | [Report bugs](#report-bugs) | No |
| Test your own printer | [Test printers](#test-printers-and-releases) | No |
| Fix docs or translate | [Docs](#documentation-and-translations) | No |
| Fix bugs or add features | [Contribute code](#contribute-code) | Yes |
| Do a summer project with a mentor | [GSoC](#google-summer-of-code) | Yes |

## Your first steps

If you have never contributed to open source before, this is a good order:

1. Create a [GitHub](https://github.com) account. Almost everything happens there: the code, bug reports and user questions.
2. Say hello in the [Telegram chat](https://t.me/+RizBbjXz4uU2ZWM1) and tell us what you'd like to help with.
3. Read a little about how printing works today, starting with [driverless printing](/driverless) and [Printer Applications](/upcoming-technologies/01-printer-application).
4. Pick one small thing from the sections below, like answering a question or fixing a "good first issue". Ask in the chat whenever you get stuck.

## Join the community

Talking to people is the easiest way in. You get help, and you find out what is needed right now.

- [Telegram chat](https://t.me/+RizBbjXz4uU2ZWM1) is the quickest place for questions and informal conversation.
- The printing-architecture mailing list is where development is discussed in detail. See [lists.linux.dev](https://subspace.kernel.org/lists.linux.dev.html) to subscribe, or read the [archives](https://lore.kernel.org/printing-architecture/).
- [Mastodon](https://ubuntu.social/tags/OpenPrinting) and [LinkedIn](https://www.linkedin.com/company/openprinting/posts/) are for announcements.

Releases, events and GSoC updates are posted on [News and Events](/news). Please follow our [Code of Conduct](/codeofconduct) in all OpenPrinting spaces.

<div id="support"></div>

## Help other users

People who can't get their printer working ask for help in [OpenPrinting's Q&A forum](https://github.com/OpenPrinting/cups/discussions/categories/q-a) on GitHub. If you have solved a printing problem before, you can probably help someone with theirs, and the answer stays there for the next person with the same problem.

Even if you're new, reading the questions is worth it. You quickly learn how the printing stack fits together and where users get stuck.

<div id="bugs"></div>

## Report bugs

A bug report tells the developers about a problem so they can fix it. Report it in the issue tracker of the project it affects, for example [CUPS](https://github.com/OpenPrinting/cups/issues) or [cups-filters](https://github.com/OpenPrinting/cups-filters/issues). Search the existing issues first, it may already be reported. If you're not sure which project it belongs to, or whether it's a bug at all, ask in the [Q&A forum](https://github.com/OpenPrinting/cups/discussions/categories/q-a) first.

A useful report includes:

- your operating system and CUPS version
- your printer model and how it's connected (USB or network)
- what you did, what you expected, and what happened instead
- relevant logs, such as the CUPS error log

[REPORTING_ISSUES.md](https://github.com/OpenPrinting/cups/blob/master/REPORTING_ISSUES.md) in the CUPS repository explains step by step what to collect and how to narrow a problem down.

Please don't report security vulnerabilities in public issues, because everyone can read them. Report them privately as described in the [CUPS security policy](https://github.com/OpenPrinting/cups/blob/master/SECURITY.md).

Broken links or wrong content on this website go to the [website issue tracker](https://github.com/OpenPrinting/openprinting.github.io/issues).

<div id="programming"></div>

## Contribute code

All of OpenPrinting's code is on [GitHub](https://github.com/OpenPrinting). Most of the core projects are written in C. [ipp-usb](https://github.com/OpenPrinting/ipp-usb) is written in Go, and this website uses Next.js. Some of the main projects:

- [CUPS](https://github.com/OpenPrinting/cups), the printing system itself, and [libcups](https://github.com/OpenPrinting/libcups), the library programs use to talk to it
- [libcupsfilters](https://github.com/OpenPrinting/libcupsfilters) and [cups-filters](https://github.com/OpenPrinting/cups-filters), which convert documents such as PDFs and images into what the printer understands
- [PAPPL](https://github.com/michaelrsweet/pappl) and Printer Applications such as the [Ghostscript Printer Application](https://github.com/OpenPrinting/ghostscript-printer-app), which support printers that still need a driver
- [cpdb-libs](https://github.com/OpenPrinting/cpdb-libs), which connects the print dialogs of desktop apps to CUPS
- [ipp-usb](https://github.com/OpenPrinting/ipp-usb), which lets USB printers work without a driver
- [fuzzing](https://github.com/OpenPrinting/fuzzing), automated tests that feed random input to our code to find crashes and security bugs

How a first contribution usually goes:

1. Read the project's README and its CONTRIBUTING.md if it has one.
2. Pick an issue. Issues labeled [good first issue](https://github.com/search?q=org%3AOpenPrinting+label%3A%22good+first+issue%22+state%3Aopen&type=issues) are meant for newcomers.
3. Comment on the issue to say you'd like to work on it, so two people don't do the same work.
4. Fork the repository, make your change on a new branch and open a pull request that explains what you changed and why.
5. Reviewers will often ask for changes. That's normal. Push the fixes to the same branch and the pull request updates itself.

A good first exercise is to build CUPS from source on a Linux machine, set up a print queue and watch the CUPS error log while you print.

To see where Linux printing is going, read about CUPS 3.x and the New Architecture in [25 years of OpenPrinting](/OpenPrinting-News-25-years-of-working-full-time-for-printing-with-free-open-source-software).

<div id="data"></div>

## Test printers and releases

The developers can't own every printer model, so reports from people with real hardware are how many problems get found.

- Try new releases of CUPS and the Printer Applications. Releases are announced on [News and Events](/news).
- If your printer doesn't work, or only partly works, report it to the project you're using, with the details listed under [Report bugs](#report-bugs).
- Check whether your printer is listed in the [printer database](/foomatic/printers) or the list of [driverless printers](/driverless).
- Older printers that need a driver are described in [foomatic-db](https://github.com/OpenPrinting/foomatic-db), the database of printers and the drivers that work with them. You can send corrections and new printers there as pull requests.

## Documentation and translations

Writing and translating don't need any programming.

- Project documentation is usually kept in each project's repository, next to the code. You can fix it with a pull request like any other change.
- This website, including the [documentation section](/documentation), is built from the [openprinting.github.io repository](https://github.com/OpenPrinting/openprinting.github.io). See [Contribute to the website](/contribute-website) to help with it.
- OpenPrinting takes part in Canonical's [Open Documentation Academy](https://discourse.ubuntu.com/t/39615) (CODA). There you can meet Canonical's technical authors, get help with your writing, and pick up documentation tasks from its [issue list](https://github.com/canonical/open-documentation-academy/issues), such as our [libcupsfilters API documentation](https://github.com/canonical/open-documentation-academy/issues/74).
- CUPS is translated on [Weblate](https://hosted.weblate.org/projects/cups/), a website where you translate text right in your browser.

## Google Summer of Code

[Google Summer of Code](https://summerofcode.withgoogle.com) (GSoC) is a yearly program where new contributors work on an open source project over the summer, guided by mentors from that project, and receive a stipend from Google. OpenPrinting takes part every year under The Linux Foundation, and several of today's mentors started as GSoC contributors.

- The [GSoC page](/gsoc) lists past projects and contributors. The [Linux Foundation GSoC wiki](https://github.com/LinuxFoundationGSoC/ProjectIdeas/wiki) has the current project ideas and how to apply.
- Start early. Get in touch and contribute well before the application period, it makes writing your proposal much easier.
- If you have experience with printing or desktop development, you can also help as a mentor. Get in touch through the [Contact Us](/contact) page.

OpenPrinting also runs the [Opportunity Open Source](/opportunity-open-source) conference in India, where many contributors first meet the community.

## For printer manufacturers

If you make printers, these are the best ways to get them working well on Linux:

- Support driverless IPP printing, such as [IPP Everywhere](https://www.pwg.org/ipp/everywhere.html), AirPrint or Mopria. These printers work with Linux without any driver.
- If a printer still needs a driver, write it as a [Printer Application](/documentation/01-printer-application), not as a classic CUPS driver with PPD files. CUPS 3.x drops classic drivers. [Creating your first printer driver](/documentation/02-designing-printer-drivers) shows how to build one with PAPPL.
- Package the Printer Application as a Snap, so one package works on all Linux distributions. See [Packaging and publishing drivers](/documentation/04-packaging-drivers).

To work with OpenPrinting on this, reach us through the [Contact Us](/contact) page.

<div id="otherstuff"></div>

## Donate or sponsor

You can also support OpenPrinting without writing code:

- Donate printers, scanners or other hardware for testing.
- Sponsor events like printing summits and OpenPrinting meetings.
- Invite us to free software events and conferences.
- Sponsor development as an organization, or support us financially.

See [Donations](/donations) and [Sponsors & Supporters](/sponsors) for details.

## A few terms explained

- CUPS: the printing system on Linux and most other non-Windows systems. It manages printers, print queues and print jobs.
- IPP (Internet Printing Protocol): the standard language computers and printers use to talk to each other.
- Driverless printing: modern printers that support IPP and standard formats (AirPrint, IPP Everywhere, Mopria) print without any model-specific driver.
- Printer Application: a small program that makes an older printer, one that needs a driver, look like a driverless IPP printer.
- PPD file: the old way of describing a printer's options to CUPS. CUPS 3.x drops them in favor of driverless printing and Printer Applications.
- Filter: a program that converts a document into the format a printer understands.
- Issue: a bug report or task in a project's tracker on GitHub.
- Fork and pull request: a fork is your own copy of a repository on GitHub. A pull request asks the project to merge the changes from your copy.
