---
title: "Official OCI containers (Docker, ROCKs, podman, ...) of CUPS and Printer Applications"
---

### Introduction

1 contributor full-size (350 hours), Level of difficulty: Intermediate

[Immutable desktop operating system distributions](https://ubuntu.com/blog/ubuntu-core-an-immutable-linux-desktop) are currently one of the most talked about subjects in free software. There is barely passing a week where one does not hear about any new distribution of this kind.

Immutable distributions are made up of a read-only (immutable) core file system and applications are installed also as immutable container images. This gives more ease of use, reliability, and security, as the file systems cannot be modified and messed up, but instead, only replaced and updated as a whole, and also each application is in its own security capsule not being able to access any of the other applications or the system. This practice is commonplace on smartphones and got overtaken to PCs.

On most immutable distributions, one installs desktop applications in the [Flatpak](https://flatpak.org/) format. This gives a huge choice of apps, but Flatpak cannot be used for GUI-less system applications and daemons. The solution for adding this type of software is the use of an alternative container format. And here [OCI containers](https://opencontainers.org/) are the solution. The container images can be downloaded from app-store-alike services like the [Docker Hub](https://hub.docker.com/) and be installed an run via [Docker](https://www.docker.com/), [podman](https://podman.io/) or similar.

If you have a look at the Docker Hub you will find several container images for CUPS, but none of them is the official one, none of them comes from OpenPrinting. This makes the choice difficult, to find the most suitable one and also not get hit by a malicious one. So an official OCI container of CUPS is the first thing we need, to be able to have always the latest release of CUPS, directly from its developers.

Another point is how to add printer and scanner drivers to immutable distributions. For this we also need containers of Printer and Scanner Applications.

The contributor's task is to create these containers and infrastructure and scripting to ease their maintenance, like for example update automation when for one or another of their components a new upstream version is released, or for automated test building and testing.

There are tools for creating such images, for example [rockcraft](https://discourse.ubuntu.com/c/rocks/) which uses build instruction files similar to Snap (see this [workshop](https://events.canonical.com/event/31/contributions/228/): [slides](https://events.canonical.com/event/31/contributions/228/attachments/132/209/%5Bslidedeck%5D%20Container%20craftsmanship_%20from%20a%20Pebble%20to%20a%20ROCK.pdf), [video](https://www.youtube.com/watch?v=BDXZxp3aFBY)) and so we can use our [CUPS Snap](https://github.com/OpenPrinting/cups-snap/) as base, but we will not require the contributor to use a special, given tool.
### Mentors
Till Kamppeter, Project Leader OpenPrinting (till at linux dot com)

### Desired knowledge
 Shell, Python, packaging, immutable OS distributions, GIT
### Code License
 Apache 2.0, MIT (licenses of the OpenPrinting projects)
