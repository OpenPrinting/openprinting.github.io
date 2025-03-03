---
title: OpenPrinting News - We got a Framework RISC-V board from DeepComputing
layout: single
toc: true
toc_sticky: true
author: Till
excerpt: RISC-V board for OpenPrinting for development and testing, getting it all to work, Ubuntu Desktop, Snap on RISC-V
---
## From a RISC-V SBC to a shiny RISC-V Framework motherboard
On the [Ubuntu Summit 2024 in the Hague](/OpenPrinting-News-October-2024/#ubuntu-summit-2024-in-the-hague) end-October 2024 there was a booth of [DeepComputing](https://deepcomputing.io/), manufacturer of RISC-V-based laptops and consumer electronics, right next to the booth of [Framework](https://frame.work/), manufacturer of the famous modular, easiliy repairable and upgradeable laptops. At the DeepComputing booth I met DeepComputing's founder Yuning Liang (his Ubuntu Summit [talk](https://events.canonical.com/event/51/contributions/518/), [slides](https://docs.google.com/presentation/d/1Z3_dOIojdL3FHTfyEGkcFXrI0KNTyWMC/edit), [video](https://www.youtube.com/watch?v=RFQ_TvCYBYM)) and told him of OpenPrinting and **he gave me a RISC-V-based SBC for testing OpenPrinting's software on this platform**.

He also put me in contact with people who could help me to get an operating system onto the SBC and I was in good hope to get able to install Ubuntu on it.

Unfortunately this did not work out and when [FOSDEM](https://fosdem.org/2025/) was approaching in the beginning of February I saw that [DeepComputing had there a booth again and Yuning was also there](https://deepcomputing.io/deepcomputing-received-overwhelming-interest-at-fosdem-2025/) (he has given a [talk](https://fosdem.org/2025/schedule/event/fosdem-2025-4722-unstoppable-force-behind-linux-on-risc-v/), [video](https://video.fosdem.org/2025/h1309/fosdem-2025-4722-unstoppable-force-behind-linux-on-risc-v.av1.webm)). So I have taken the board with me to ask for help to get Ubuntu onto it. I attended the talk and after it I went with Yuning to the booth.

But Yuning did even something better, he has replaced the SBC by a shiny new RISC-V motherboard for Framework laptops, the one which [got recently released for general sale](https://deepcomputing.io/the-first-risc-v-mainboard-for-framework-laptops-officially-launched/) and which Nirav Patel, founder of Framework, has installed in a Framework laptop in a [lightning demo on the Summit](https://www.youtube.com/watch?v=l6khGznGeyY). And I do not even need a Framework laptop for using it, as he gave it to me in the Cooler Master standalone case with Wi-Fi antennas and interface modules, plus a kit for updating the board's EC firmware. The OS pre-installed on it was Ubuntu 24.04.

**Now I have a working RISC-V sample for OpenPrinting!**

I directly went back to the Ubuntu booth and set it up there for a first test. Fortunately, I had brought a wired keyboard and mouse and some old USB-C power supplies. Colleagues asked for bringing such stuff for demoing Raspberry Pis but nobody actually set them up, so we had an even nicer demo of the Framwaork/DeepComputing RISC-V board on the Sunday afternoon. There was not much to demo though as there wer still some issues, and so we quickly messed it up ...

## Setting it up - The quirks of a pre-production unit

**Note that we have a pre-production unit (the so-called "Early Access Edition") here, so it is to expect that there are some hick-ups ...**

When we booted it for the first time on the booth we had to do some quick lookups on the internet to find out that the power has to be fed in on the upper left or upper right USB-C and also where the power button is in the standalone case (tiny black button at the upper right).

Then, everything once plugged together correctly, the system booted and we already saw the [USB keyboard not working in the GRUB boot menu](https://github.com/DC-DeepComputing/Framework/issues/5) but after the [menu had timed out](https://github.com/DC-DeepComputing/Framework/issues/10) it slowly booted to a GNOME desktop, only that this GNOME desktop was probably the upstream default of GNOME, not the Ubuntu desktop at least. The wallpaper was a DeepComputing one.

Exploring around on the desktop we also found that [there were no web browsers](https://github.com/DC-DeepComputing/Framework/issues/11) and doing a system update (`apt dist-upgrade`) the update complained about "No space left on device", and continuing after cleaning (`apt clean`) it errors on the gdm package, after that [the system did not boot any more](https://github.com/DC-DeepComputing/Framework/issues/9).

Back at home, I wanted to reload the original operating system image on the micro-SD card which serves as storage for the device to restore the system and when I wanted to open the standalone case I saw that it uses small Torx screws, T5 size according to what is written on the box the case came in. I did not have a screwdriver for it and remembered the Framework screwdriver with Torx/Philips flippable double bit on the FOSDEM booth. Probably it was forgotten to get packed into the kit. As Framework asks for 12 EUR for shipping when buying the 5 EUR tool I ended up going to a nearby big-box electronics store and bought an iFixit toolkit, containing the needed bit, and, because of my "No space left on device" experience on the FOSDEM, a 256-GB micro-SD card.

The re-flashing of the SD card was then easy, just putting it into a reader connected to my laptop and [using `dd`](https://github.com/DC-DeepComputing/Framework/issues/8) via (use a tool like GNOME Disks to see whether the output device is really `/dev/sda`)
```
$ sudo dd bs=1M status=progress if=sdcard.img of=/dev/sda
```
restored the system. `sdcard.img` is the uncompressed system image ([Setup instructions and download](https://github.com/DC-DeepComputing/Framework/blob/main/FML13V01/Ubuntu%2024.04%20Installation%20on%20the%20DC-ROMA%20RISC-V%20Mainboard.pdf)).

And the "No space left on device" was [not due to a too small micro-SD card](https://github.com/DC-DeepComputing/Framework/issues/7). The one which came with the board is 64 GB but the root partition was only 16 GB and the ext4 file system in it only 8 GB. So just resizing them to fill up the card's capacity using (GNOME Disks for example) would already do the trick. But with a 256 GB card at hand I used that one, to not run out of storage later.

The system booted as usual, [looong GRUB boot menu timeout](https://github.com/DC-DeepComputing/Framework/issues/10) and [USB keyboard not working in GRUB menu](https://github.com/DC-DeepComputing/Framework/issues/5) to stop it.

Now I had a desktop again to explore around in it. An important point I discovered:

**Printing just works! I see my driverless IPP printers and can print on them.**

For the [missing web browser](https://github.com/DC-DeepComputing/Framework/issues/11) I was not able to install Firefox or Chromium, but I found the Epiphany browser:
```
$ sudo apt install epiphany-browser
```
and could browse the web but not play YouTube videos.

[Local video files do not play with `totem`](https://github.com/DC-DeepComputing/Framework/issues/12) even with all GStreamer codecs (`gstreamer1.0-plugins-XXX` with `XXX` being `base`, `good`, `bad`, and `ugly`) and `ffmpeg` installed and there were also [sound issues](https://github.com/DC-DeepComputing/Framework/issues/13).

I told Yuning about the first issues and he gave me some first answers. I also posted about them on a longer [Mastodon thread](https://fosstodon.org/@zygoon/113944939785535479) started by Zygmunt Krynicki, at Canonical responsible for making Snap working on all distros, and he told me to post them on the [bug tracker on GitHub](https://github.com/DC-DeepComputing/Framework/issues/) where I reported all of them (see the links throughout this article for individual reports), and I got them answered. For most of them I got told that they will get addressed in the next image version, V1.1 of the Ubuntu 24.04 image.

**The Ubuntu 24.04 V1.1 image**

Shortly after Canonical has issued the Ubuntu 24.04.2 LTS point release the [V1.1 image](https://github.com/DC-DeepComputing/fml13v01/releases/tag/V1.1) based on this release got published (yes, it contains my [fix for the 100%-CPU bug of cups-browsed](https://bugs.launchpad.net/bugs/2049315)). I installed it and **Most of my reported issues got fixed!** So my bug reports worked out.

Booting into the new system started with a quicker timeout of the still not accessible GRUB menu and arriving on the desktop a first-time wizard asked for defining host name, user name, password, time zone, ... Also the root partition and file system were automatically extended to the size of the card. So from a test setup (with user and password being "roma") we have advanced to an end-user/production setup now.

After the setup wizard I got presented a nice Ubuntu Desktop now, GNOME with launcher on the left, Ubuntu theming, Ubuntu tools, like App Center ...

And as promised in the [release notes](https://github.com/DC-DeepComputing/fml13v01/releases/tag/V1.1), Firefox, Chromium, and VLC are installed. And both browsers work correctly, and also play YouTube videos, with fluent sound from the monitor's speakers (with HDMI chosen as audio output in the GNOME Control Center), only the image was not very smooth, as, according to the release notes, hardware acceleration for video playback is not yet supported.

[VLC is crashing on playing local video files from the command line though](https://github.com/DC-DeepComputing/Framework/issues/31). I got an answer on the bug report recommending `mpv`. I installed it and it actually works, and rather well for not having hardware acceleration.

I can also do full system updates now, `sudo apt update; sudo apt dist-upgrade`, without making the system unbootable. Problem was not gdm but the [custom 6.6.20 kernel replaced by a stock 6.8.0 kernel](https://github.com/DC-DeepComputing/Framework/issues/9). This is now fixed by the kernel version being pinned, meaning that it does not get updated (according to the release notes).

**And now let us try printing ...**

So let us start easily (This command checks whether the CUPS daemon is running) :
```
$ lpstat -r
-bash: lpstat: command not found
$
```
**WHAT?!**

CUPS is not installed. A desktop system without CUPS installed. This is strange.

I also wanted to have a quick look into a man page. Of `df`, which I have used and therefore it is for sure installed.
```
$ man df
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, including manpages, you can run the 'unminimize'
command. You will still need to ensure the 'man-db' package is installed.
$
```
This is interesting. A desktop system is where users do not log into? OK, let us unminimize:
```
$ sudo apt install man-db unminimize
$ sudo unminimize
```
Lots of packages get installed, and I see also that all the printing stack packages are under them. So I try again:
```
$ lpstat -r
scheduler is running
$
```
And CUPS is back! I also tried to print from applications, and it works!

Reported an [issue](https://github.com/DC-DeepComputing/Framework/issues/32) about this.

**The full Ubuntu Desktop experience**

Let us do
```
$ sudo apt install ubuntu-desktop
```
and something like 300 packages get installed. So I have a lot more desktop applications and utilities, an Ubuntu-themed GNOME desktop, even with the Noble Numbat wallpaper (instead of the DeepComputing one).

And for me it makes the impression that the YouTube videos in Firefox run more smoothly (more fps).

**Thanks a lot, DeepComputing and Framework to provide the hardware for a great RISC-V desktop. And thanks a lot, Yuning Liang, for providing the RISC-V board for OpenPrinting and for your great support to get it all working!**


## The keyboard during boot

**Note:** This applies only to the "Early Access Edition", a pre-production unit sold on conferences, like FOSDEM.

As the boards sold on the DeepComputing booth on FOSDEM are pre-production units they seemed to take into account that they can still have significant bugs in their EC firmware, and probably therefore the kits came with a firmware flashing tool, which I actually had to use.

Already during the first boot at the Ubuntu booth we found out that we [could not interact with the boot menu of GRUB by the (USB) keyboard](https://github.com/DC-DeepComputing/Framework/issues/5) and the only way to get the board booting was to wait for the [too long timeout](https://github.com/DC-DeepComputing/Framework/issues/10) to expire. Once it is a little bit annoying and second, if the machine would not boot one cannot resort to use an older kernel.

In the beginning [I did not realize that the material coming with the board was a firmware flashing tool](https://github.com/DC-DeepComputing/Framework/issues/4), but as, in reaction to my [bug report about the USB keyboard only working in the desktop](https://github.com/DC-DeepComputing/Framework/issues/5) I got a firmware update and [instructions how to apply it with my tool](https://github.com/DC-DeepComputing/Framework/blob/main/FML13V01/DC-ROMA%20RISC-V%20Mainboard%20(Early%20Access%20Edition)%20for%20Framework%20Laptop%2013%20EC%20Firmware%20Flashing%20Instructions.pdf) in a mail from DeepComputing's support, and I got aware that I got this tool and appreciated that I could fix the board with it. After having applied the EC firmware update all my USB keyboards were working, a wired one with built-in USB hub and wireless Logitech keyboard using Logitech's Universal Receiver.

**Note:** For anybody reading this and wanting to update the EC firmware, too. Please have a look into my comment on the bug report about [using the newer STM32Cube flashing software which is also available for Linux](https://github.com/DC-DeepComputing/Framework/issues/5#issuecomment-2676432293).

**Thanks a lot, DeepComputing and Yuning Liang, for including the updating tool with the kit!**


## And what about Snap?
The standard Ubuntu Desktop makes more and more use of the Snap package format to assure continuous updates from upstream also after the Ubuntu release and also enhanced security for common desktop applications, especially Firefox, Chromium, and Thunderbird.

So I had also a look into this on the RISC-V system. The first note I got about Snap and the RISC-V board was a [post by Zygmunt Krynicki on Mastodon](https://fosstodon.org/@zygoon/113951021626118110) in a [long Mastodon thread](https://fosstodon.org/@zygoon/113944939785535479) where he tells that the kernel of the system which came with the does not support Snap and his [GitHub issue report](https://github.com/DC-DeepComputing/Framework/issues/2) telling that it is because the kernel does not include squashfs support. squashfs is the immutable, compressed file system which is used by Snaps.

The kernel issue got fixed with the Ubuntu 24.04 V1.1 image, but snapd was not installed, and Firefox and Chromium were installed as standard Debian packages.

So I tried to install snapd, snapcraft, and rockcraft and it worked:
```
$ sudo apt install snapd
$ sudo snap install --classic snapcraft
$ sudo snap install --classic rockcraft
```
and then I ran
```
$ snap list
core22     20250110  1753   latest/stable  canonical✓  base
core24     20240918  603    latest/stable  canonical✓  base
rockcraft  1.5.3     2223   latest/stable  canonical✓  classic
snapcraft  8.6.3     13621  latest/stable  canonical✓  classic
snapd      2.67      23550  latest/stable  canonical✓  snapd
$
```
That is what is expected. But this was all. I tried to find some Snaps built for RISC-V in the Snap Store but did not find anything.

**It seems that I will soon try to make a start by building the OpenPrinting Snaps (CUPS, ipp-usb, Printer Applications) and then let the Snap Store build them , too.** 

**Thanks a lot, Zygmunt, for reporting the Snap problem!**


## Summary OR The Setup HOWTO
A few steps to a great desktop setup on a RISC-V-based Framework laptop or the RISC-V board in a standalone case:

- Install the [Ubuntu 24.04 V1.1](https://github.com/DC-DeepComputing/fml13v01/releases) image (or newer if available) following [these instructions](https://github.com/DC-DeepComputing/Framework/blob/main/FML13V01/Ubuntu%2024.04%20Installation%20on%20the%20DC-ROMA%20RISC-V%20Mainboard.pdf).
- Boot and go through the first-time wizard
- Unminimize your system with the commands:
```
$ sudo apt install man-db unminimize
$ sudo unminimize
```
- Update your system
```
$ sudo apt update
$ sudo apt dist-upgrade
$ sudo apt autoremove
$ sudo reboot
```
- Get the full Ubuntu desktop
```
$ sudo apt install ubuntu-desktop
```
- Install the `mpv` video player for local video files
```
$ sudo apt install mpv
```
- Set `mpv` as default video player in the GNOME Control Center ("Apps", "Default Apps").
- If you use a standalone case and not a Framework laptop, set audio output to "HDMI" or connect a USB audio output device and point the audio output to that one. Use the quick menu of GNOME or the "Sound" section of GNOME Control Center. If the sound test function does not work, do not worry, test with any sound-producing app.
- If you want to be able to install Snap packages, install snapd:
```
$ sudo apt install snapd
```
- If you want to create Snap packages or port exisiting ones to RISC-V, install snapcraft:
```
$ sudo snap install --classic snapcraft
```
- Now things should work as with a usual Ubuntu desktop.


## Links
- [DeepComputing](https://deepcomputing.io/)
- [Framework](https://frame.work/)
- [Issue tracker for DeepComputing/Framework RISC-V board](https://github.com/DC-DeepComputing/Framework/issues)
- [Mastodon thread about the RISC-V board and my and Zygmunt Krynicki's experience with it](https://fosstodon.org/@zygoon/113944939785535479)


## Contact us

**And as usual: Stay updated on Mastodon: [#OpenPrinting](https://ubuntu.social/tags/OpenPrinting) and [@till@ubuntu.social](https://ubuntu.social/@till).**

**Or discuss on our mailing lists:**
- **Development:** printing-architecture AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-architecture/))
- **Users:** printing-users AT lists DOT linux DOT dev ([Archive](https://lore.kernel.org/printing-users/))

Subscribing/Unsubscribing [instructions](https://subspace.kernel.org/subscribing.html)

**Or on the Telegram [OpenPrinting chat](https://t.me/+RizBbjXz4uU2ZWM1)**
