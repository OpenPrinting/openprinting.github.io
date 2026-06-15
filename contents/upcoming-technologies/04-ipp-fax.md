---
title: IPP Fax Out - A new reality
---
To complete the driverless support for IPP network multi-function devices there is also IPP Fax Out, the standard for sending faxes, as print jobs, through the fax functionality of the device.
The fax support is provided by an additional printing channel with its own URI (ending with "/ipp/faxout" instead of "/ipp/print") and printing to this channel makes the document being faxed. It naturally requires supplying the phone number as an IPP attribute, but otherwise it is exactly like printing, if polling this URI for capabilities you get the fax-specific "printer" capabilities and options, to be used for fax jobs.
Current devices have this functionality ready available and we will show how we make it available for desktop applications and discuss possible alternatives.
