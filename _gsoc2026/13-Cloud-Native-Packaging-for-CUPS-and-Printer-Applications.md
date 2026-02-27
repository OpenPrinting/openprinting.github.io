---
title: "Cloud-Native Packaging for CUPS and Printer Applications"
---
### Introduction
​
1 contributor, large-size (350 hours), Level of difficulty: Intermediate

**Summary​**

Package OpenPrinting’s CUPS and Printer Applications for use on​​ **cloud-native and immutable Linux systems​** ​using​​ **OCI container technology​**. Evaluate existing container-based packaging and refine it where necessary to​ ensure compliance with cloud-native requirements.​

**Details​**

Modern Linux systems are increasingly adopting​​ **immutable and cloud-native designs**​, where traditional​ ​system-level package installation is not possible. In such environments, system services and daemons such as​ ​**CUPS and Printer Applications​​** must be deployed using​​ **container-based​​ approaches​**.​

For immutable desktop systems, system components are part of the immutable OS image and additional services​ ​must be provided as **​​OCI containers**​. On cloud-native servers, CUPS is often not installed at all and must be​ deployed as a containerized service.​

Previous GSoC work has produced OCI/Docker containers for CUPS and OpenPrinting Printer Applications. It is​ ​currently unclear whether these containers fully meet​​ **cloud-native criteria**​, or whether changes are required to their​ ​build process, configuration, or runtime behavior.​

This project will evaluate the existing containers, determine whether they already qualify as cloud-native, and improve​ ​them where necessary. Printing workflows on immutable desktop systems will also be validated, including printing​ ​from sandboxed desktop applications via the XDG Desktop Portal.​

**Deliverables​**

  * Cloud-native OCI container images for CUPS​
  * Cloud-native OCI container images for OpenPrinting Printer Applications​
  * Evaluation of existing container build approaches and identification of required changes​
  * Optional use of alternative build systems (e.g. Rockcraft) where beneficial​
  * Deployment examples for container-based and orchestrated environments​
  * Documentation for users and administrators​
  * Final project report​
### Mentors
 Kyle Yu (ydz627 at gmail dot com), Mohammad Ali (aerabi at gmx dot de), Sonali Srivastava (srivastava dot sonali1 at gmail dot com), Till Kamppeter, organization lead OpenPrinting (till at linux dot com), CNCF/cloud-native developers TBD
### Desired knowledge
 Experience with containers and cloud-native technologies​, familiarity with Linux system services and daemons​​, basic understanding of CUPS/IPP (or willingness to learn)​, shell scripting and Git​, optional Kubernetes or container orchestration experience​, knowledge of immutable Linux distributions​, ​experience with container build tools​
### Code License
 Apache 2.0
