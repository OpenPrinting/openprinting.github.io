---
title: PAPPL System Utilities
---

* ### papplSystemAddListeners

    Add network or domain socket listeners.

       bool  papplSystemAddListeners (
           pappl_system_t *system,
           const char *name
       );

    The "name" parameter specifies a listener address.  Names starting with a slash (/) specify a UNIX domain socket path, otherwise  the  name  is treated  as  a  fully-qualified domain name or numeric IPv4 or IPv6 address.  If name is NULL, the "any" addresses are used.

    Listeners cannot be added after papplSystemRun is called.

* ### papplSystemAddMIMEFilter

    Add a file filter to the system.

       void papplSystemAddMIMEFilter (
           pappl_system_t *system,
           const char *srctype,
           const char *dsttype,
           pappl_mime_filter_cb_t cb,
           void *data
       );

    The "srctype" and "dsttype" arguments specify the source  and  destination  MIME  media  types as constant strings.  A destination MIME media type of "image/pwg-raster" specifies a filter that  uses  the  driver's raster  interface.   Other destination types imply direct submission to
    the output device.

    Note: This function may not be called while the system is running.

* ### papplSystemCreate

    Create a system object.

       pappl_system_t * papplSystemCreate (
           pappl_soptions_t options,
           const char *name,
           int port,
           const char *subtypes,
           const char *spooldir,
           const char *logfile,
           pappl_loglevel_t loglevel,
           const char *auth_service,
           bool tls_only
       );

* ### papplSystemDelete

    Delete a system object.

       void papplSystemDelete (
           pappl_system_t *system
       );

    Note: A system object cannot be deleted while the system is running.

* ### papplSystemGetAdminGroup

    Get the current admin group, if any.

       char * papplSystemGetAdminGroup (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetAuthService
       
    Get the PAM authorization service, if any.

       const char * papplSystemGetAuthService (
           pappl_system_t *system
       );

* ### papplSystemGetContact
       
    Get the "system-contact" value.

       pappl_contact_t * papplSystemGetContact (
           pappl_system_t *system,
           pappl_contact_t *contact
       );

* ### papplSystemGetDNSSDName
    
    Get the current DNS-SD service name.

       char * papplSystemGetDNSSDName (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetDefaultPrintGroup
    
    Get the default print group, if any.

       char * papplSystemGetDefaultPrintGroup (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetDefaultPrinterID
    
    Get the current "default-printer-id" value.

       int  papplSystemGetDefaultPrinterID (
           pappl_system_t *system
       );

* ### papplSystemGetFirmware
    
    Get the firmware names and versions.

       int  papplSystemGetFirmware (
           pappl_system_t *system,
           int max_versions,
           pappl_version_t *versions
       );

* ### papplSystemGetFooterHTML
    
    Get the footer HTML for the web interface, if any.

       const char * papplSystemGetFooterHTML (
           pappl_system_t *system
       );

* ### papplSystemGetGeoLocation
    
   Get the system geo-location string, if any.

       char * papplSystemGetGeoLocation (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetHostname
       
    Get the system hostname.

       char * papplSystemGetHostname (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetLocation
       
    Get the system location string, if any.

       char * papplSystemGetLocation (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetLogLevel
       
       pappl_loglevel_t  papplSystemGetLogLevel (
           pappl_system_t *system
       );

* ### papplSystemGetMaxLogSize
       
    Get the maximum log file size.

       size_t  papplSystemGetMaxLogSize (
           pappl_system_t *system
       );

    The maximum log size is only used when logging  directly to a file. When the limit is reached, the current log file is renamed to "filename.O" and a new log file is created. Set the maximum size to 0 to disable log file rotation.

    The default maximum log file size is 1MiB or 1048576 bytes.

* ### papplSystemGetName
       
    Get the system name string, if any.

       char * papplSystemGetName (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetNextPrinterID
       
    Get the next "printer-id" value.

       int  papplSystemGetNextPrinterID (
           pappl_system_t *system
       );

* ### papplSystemGetOptions
       
    Get the system options.

       pappl_soptions_t  papplSystemGetOptions (
           pappl_system_t *system
       );

* ### papplSystemGetOrganization
    
    Get the system organization string, if any.

       char * papplSystemGetOrganization (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetOrganizationalUnit
       
    Get the system organizational unit string, if any.

       char * papplSystemGetOrganizationalUnit (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

* ### papplSystemGetPassword
       
    Get the current password hash.

       char * papplSystemGetPassword (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

    Note: The access password is only used when the PAM authentication service is not set.

* ### papplSystemGetServerHeader
       
    Get the Server: header for HTTP responses.

       const char * papplSystemGetServerHeader (
           pappl_system_t *system
       );

* ### papplSystemGetSessionKey
       
    Get the current session key.

       char * papplSystemGetSessionKey (
           pappl_system_t *system,
           char *buffer,
           size_t bufsize
       );

    The session key is used for web interface forms to provide CSRF protection and is refreshed periodically.

* ### papplSystemGetTLSOnly
       
    Get the TLS-only state of the system.

       bool  papplSystemGetTLSOnly (
           pappl_system_t *system
       );

* ### papplSystemGetUUID
       
    Get the "system-uuid" value.

       const char * papplSystemGetUUID (
           pappl_system_t *system
       );

* ### papplSystemHashPassword
       
    Generate a password hash using salt and password strings.

       char * papplSystemHashPassword (
           pappl_system_t *system,
           const char *salt,
           const char *password,
           char *buffer,
           size_t bufsize
       );

    The  salt  string should be NULL to generate a new password hash or the value of an existing password hash to verify that a given plaintext password string matches the password hash.

    Note: Hashes access passwords are only used when the PAM authentication service is not set.

* ### papplSystemIsRunning
       
    Return whether the system is running.

       bool  papplSystemIsRunning (
           pappl_system_t *system
       );

* ### papplSystemIteratePrinters
       
    Iterate all of the printers.

       void papplSystemIteratePrinters (
           pappl_system_t *system,
           pappl_printer_cb_t cb,
           void *data
       );

* ### papplSystemLoadState
       
    Load the previous system state.

       bool  papplSystemLoadState (
           pappl_system_t *system,
           const char *filename
       );

* ### papplSystemRun
       
    Run the printer service.

       void papplSystemRun (
           pappl_system_t *system
       );

* ### papplSystemSaveState
       
    Save the current system state.

       bool  papplSystemSaveState (
           pappl_system_t *system,
           const char *filename
       );

* ### papplSystemSetAdminGroup
       
    Set the administrative group.

       void papplSystemSetAdminGroup (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetContact
       
    Set the "system-contact" value.

       void papplSystemSetContact (
           pappl_system_t *system,
           pappl_contact_t *contact
       );

* ### papplSystemSetDNSSDName
       
    Set the DNS-SD service name.

       void papplSystemSetDNSSDName (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetDefaultPrintGroup
       
    Set the default print group.

       void papplSystemSetDefaultPrintGroup (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetDefaultPrinterID
       
    Set the "default-printer-id" value.

       void papplSystemSetDefaultPrinterID (
           pappl_system_t *system,
           int default_printer_id
       );

* ### papplSystemSetFooterHTML
       
    Set the footer HTML for the web interface.

       void papplSystemSetFooterHTML (
           pappl_system_t *system,
           const char *html
       );

       The footer HTML can only be set prior to calling papplSystemRun.

* ### papplSystemSetGeoLocation
       
    Set the geographic location string.

       void papplSystemSetGeoLocation (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetHostname
       
    Set the system hostname.

       void papplSystemSetHostname (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetLocation
       
    Set the system location string, if any.

       void papplSystemSetLocation (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetLogLevel
       
    Set the system log level

       void papplSystemSetLogLevel (
           pappl_system_t *system,
           pappl_loglevel_t loglevel
       );

* ### papplSystemSetMIMECallback
       
    Set the MIME typing callback for the system.

       void papplSystemSetMIMECallback (
           pappl_system_t *system,
           pappl_mime_cb_t cb,
           void *data
       );

    The MIME typing callback extends the built-in MIME typing support for other media types that are supported by the application, typically vendor print formats.

    The callback function receives a buffer containing the initial bytes of the document data, the length of the buffer, and the callback data. It can then return NULL if the content is not recognized or a constant string containing the MIME media type, for example "application/vnd.hppcl" for PCL print data.

* ### papplSystemSetMaxLogSize
       
    Set the maximum log file size in bytes.

       void papplSystemSetMaxLogSize (
           pappl_system_t *system,
           size_t maxsize
       );

    The maximum log size is only used when  logging  directly to a file. When the limit is reached, the current log file is renamed to "filename.O" and a new log file is created. Set the maximum size to 0 to disable log file rotation.

    The default maximum log file size is 1MiB or 1048576 bytes.

* ### papplSystemSetNextPrinterID
    
    Set the next "printer-id" value.

       void papplSystemSetNextPrinterID (
           pappl_system_t *system,
           int next_printer_id
       );

    The next printer ID can only be set prior to calling papplSystemRun.

* ### papplSystemSetOperationCallback
       
    Set the IPP operation callback.

       void papplSystemSetOperationCallback (
           pappl_system_t *system,
           pappl_ipp_op_cb_t cb,
           void *data
       );

    The operation callback can only be set prior to calling papplSystemRun.

* ### papplSystemSetOrganization
       
    Set the system organization string, if any.

       void papplSystemSetOrganization (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetOrganizationalUnit
    
    Set the system organizational unit string, if any.

       void papplSystemSetOrganizationalUnit (
           pappl_system_t *system,
           const char *value
       );

* ### papplSystemSetPassword
       
    Set the access password hash string.

       void papplSystemSetPassword (
           pappl_system_t *system,
           const char *hash
       );

    The access password hash string is generated using the papplSystemHashPassword function.

    Note: The access password is only used when the PAM authentication service is not set.

* ### papplSystemSetPrintDrivers
       
    Set the save callback.

       void papplSystemSetPrintDrivers (
           pappl_system_t *system,
           int num_names,
           const char *const *names,
           const char *const *desc,
           pappl_pdriver_cb_t cb,
           void *data
       );

* ### papplSystemSetSaveCallback
       
    The save callback can only be set prior to calling papplSystemRun.

       void papplSystemSetSaveCallback (
           pappl_system_t *system,
           pappl_save_cb_t cb,
           void *data
       );

* ### papplSystemSetUUID
    
    Set the system UUID.

       void papplSystemSetUUID (
           pappl_system_t *system,
           const char *value
       );

    The UUID can only be set prior to calling papplSystemRun.

* ### papplSystemSetVersions
       
    Set the firmware names and versions.

       void papplSystemSetVersions (
           pappl_system_t *system,
           int num_versions,
           pappl_version_t *versions
       );

    The firmware information can only be set prior to calling papplSystemRun.