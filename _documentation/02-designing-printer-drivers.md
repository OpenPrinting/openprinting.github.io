---
title: Designing Printer Drivers
---
**This document contains a complete tutorial as well as information for manufacturers along with examples for designing printer drivers. If you are looking for information regarding the use of printer drivers, kindly refer to <a href="../05-User-Manual/">User Manual</a>**  

__Table of Contents__


1. **[Introduction](#introduction)**
2. **[Components for PAPPL-based Printer Driver](#components)**
3. **[Designing Components](#design)**
4. **[Template for PAPPL-based Printer Driver](#template)**
5. **[Resources](#resources)**

<h2 id="introduction"> Introduction </h2>

A driver is a code or data specific to a certain model or group of hardware devices, needed to make the hardware work with the hardware-model-independent independent code of the operating system. Printing in Linux has move towards [Driverless Printing](https://openprinting.github.io/driverless/), which means there is no need for any hardware-model-specific code or data. However, there are some problems with the current framework. For example, some printers(especially the old ones) that cannot handle IPP requests are devoid of driverless printing capability. Printer Applications help to address these issues. Kindly refer <a href="../01-printer-application/">Printer Applications - A new way to print in Linux</a> to learn more about Printer Applications, its working and benefits.

For Designing the Printer Application Driver, it would be a lot of re-inventing the wheel if everyone who wants to create a printer driver has to implement all things from scratch. Therefore Michael Sweet has created <a href="https://github.com/michaelrsweet/pappl/">PAPPL</a>, a library that provides all the common functionality which is needed in every Printer Application.

The flowchart below mentions the components of the driver that needs to be designed by you (boxes in blue color), along with the PAPPL utilities (boxes in red color) that would be used by your designed components.

![Untitled Diagram (3)](https://user-images.githubusercontent.com/43112419/93055564-cb98df00-f688-11ea-9cbd-a6b9d40230c1.png)  

The following tutorial helps you to understand how to design each component and integrate the PAPPL Utilities to reduce your work. 

<h2 id="components"> Components for PAPPL-based Printer Driver </h2>

* ### papplMainLoop

    1. ### Version number

        This argument is simply a string literal, denoting the version of the printer driver.
        
        Examples of valid version number are "1.0", "2.1", etc.
    <br>

    2. ### Usage Callback

        This function helps the user to know about the capabilities of your printer by showing the set of sub-commands and options supported by your printer. For retrieving the output of this function, the user needs to pass the `--help` argument.

        One may specify the usage callback argument as `NULL` in the papplMainloop function. The `default` function is utilized in this situation. The default function shows the default list of sub-commands and options. The output of the default usage callback function is shown below.
            
            Usage: <basename> SUB-COMMAND [OPTIONS] [FILENAME]
                <basename> [OPTIONS] [FILENAME]
                <basename> [OPTIONS] -

            Sub-commands:
            add PRINTER      Add a printer.
            cancel           Cancel one or more jobs.
            default          Set the default printer.
            delete           Delete a printer.
            devices          List devices.
            drivers          List drivers.
            jobs             List jobs.
            modify           Modify a printer.
            options          List printer options.
            printers         List printers.
            server           Run a server.
            shutdown         Shutdown a running server.
            status           Show server/printer/job status.
            submit           Submit a file for printing.

            Options:
            -a               Cancel all jobs (cancel).
            -d PRINTER       Specify printer.
            -j JOB-ID        Specify job ID (cancel).
            -m DRIVER-NAME   Specify driver (add/modify).
            -n COPIES        Specify number of copies (submit).
            -o NAME=VALUE    Specify option (add,modify,server,submit).
            -u URI           Specify ipp: or ipps: printer/server.
            -v DEVICE-URI    Specify socket: or usb: device (add/modify).
        

        If your printer supports only the default set of sub-commands, you can use the default usage callback function. If you wish to output different information when the user uses --help command-line argument, follow the designing **[usage callback function](#usagecallback)** guidelines.


    3. ### Sub-command name

        This argument is a string literal that denotes the sub-command supported by your printer driver. By default, PAPPL helps each driver to support the following sub-commands:

        * add
        * cancel
        * default
        * delete
        * devices
        * drivers
        * jobs
        * modify
        * options
        * printers
        * server
        * shutdown
        * status
        * submit

        If your printer doesn't support any additional sub-command, you may specify the argument as `NULL`.

    4. ### Sub-command callback

        This callback argument is the function that is to be executed when the sub-command(other than the default sub-commands) is specified.
        
        Since each driver is not bound to support additional sub-command, one may specify this argument as `NULL` in case the printer driver does not support any additional sub-command.

        If you wish to support additional sub-command, then specify the name of the sub-command in the **sub-command name** argument and design a function using the **[design sub-command callback](#subcommandcallback)** guidelines.

    5. ### System Callback

        **[Design system callback](#systemcallback)** guidlines.

    6. ### Data

        This argument is a string literal and signifies the context of the printer driver.  

<h2 id="design"> Designing Components </h2>

* <h3 id = "usagecallback"> Usage Callback </h3>

        pappl_ml_usage_cb_t  usage_cb (
            void *data
        );

    The usage callback function receives only one argument, i.e. the callback data.
    
    The function objective is to show the usage details of the printer. Hence it prints the list of supported sub-commands and options. It can then return.

___

* <h3 id = "subcommandcallback"> Sub-Command Callback </h3>

        pappl_ml_subcmd_cb_t subcmd_cb (
            const char      *base_name,
            int             options,
            cups_option_t   *options,
            int             num_files,
            char            **files,
            void            *data
        );

    The Sub-Command callback function receives six arguments Basename, Number of options, Options, Number of files, Name of files, and Callback data. It then returns a new sub-command object.

    **Design Guidelines to be understood**

___

* <h3 id = "systemcallback"> System Callback </h3>
        
        pappl_ml_system_cb_t *system_cb (
            int             num_options,
            cups_option_t   *options,
            void            *data
        );

    The system callback function receives three arguments Number of options, Options, and Callback data. It then returns a new system object.

    1. **Declare Objects and Variables**
    
        The following objects and variables have to be declared:

        | DataType         | Variable Name | Significance         |
        |------------------|---------------|----------------------|
        | pappl_system_t*  | system        | System object        |
        | char*            | val           | Current option value |
        | char*            | hostname      | Hostname             |
        | char*            | logfile       | Log file             |
        | char*            | system_name   | System name          |
        | char*            | spooldir_name | spool-directory      |
        | char*            | authservice   | auth-service         |        
        | pappl_loglevel_t | loglevel      | Log level            |
        | int              | port          | Port number          |
        | pappl_soptions_t | soptions      | System options       |
        | pappl_version_t  | versions      | Software versions    |


        | Note                                                                                                                                       |
        |--------------------------------------------------------------------------------------------------------------------------------------------|
        |Naturally, you can define other names for variables. We have assumed them as given in the table to reduce ambiguity in the subsequent steps.|

    2. **Fetch values using cupsGetOption**

        From the above listed objects/variables, the following variables can get their values from corressponding option name, using cupsGetOption PAPPL utility: 

        | Variable Name | Option name     |
        |---------------|-----------------|
        | loglevel      | log-level       |
        | logfile       | log-file        |
        | hostname      | server-hostname |
        | system_name   | system-name     |
        | port          | server-port     | 

        The syntax for using cupsGetOption is:

            <variable_name> = cupsGetOption(<option_name>, num_options, options)
        
        Notes:

        * The return type for cupsGetOption utility is char*. Hence for "log-level" and "server-port" options, first fetch them into the `val` variable.
        
        * The values taken by `loglevel` variable based on value returned by "log-level" cupsGetOption can be summarised using the following table:

            | log-level Option | Value for loglevel variable |
            |------------------|-----------------------------|
            | fatal            | PAPPL_LOGLEVEL_FATAL        |
            | error            | PAPPL_LOGLEVEL_ERROR        |
            | warn             | PAPPL_LOGLEVEL_WARN         |
            | info             | PAPPL_LOGLEVEL_INFO         |
            | debug            | PAPPL_LOGLEVEL_DEBUG        |


        * The `port` variable can be retrived from "server-port" option using [atoi](https://linux.die.net/man/3/atoi) function.

        * Don't forget to add a check for the port number. It must be between 0 to 65535(both inclusive).

    3. **Create a system using papplSystemCreate**

        The variables defined and fetched above are passed to papplSystemCreate utility to create a system.

            pappl_system_t* papplSystemCreate(
                pappl_soptions_t    options,
                const char          *name,
                int                 port,
                const char          *subtypes,
                const char          *spooldir,
                const char          *logfile,
                pappl_loglevel_t    loglevel,
                const char          *auth_service,
                bool                tls_only
            );
        
        * The `soptions` variable is passed as the first argument.
        * The `system_name` variable fetched in 2<sup>nd</sup> Step is passed as second argument. Note that the system-name might be `NULL`. So, don't forget to add a check and pass a default value, in case the fetched system-name is `NULL`.
        * The port number is passed as the third argument. You may pass it as `0` for auto.
        * The 4th argument is a string literal that signifies DNS-SD sub-types. One may pass `NULL` for none.
        * Pass the `spooldir`, `logfile` and `loglevel` variable fetched in 2<sup>nd</sup> Step as fifth, sixth and seventh argument respectively. You can pass `NULL` for the fifth and sixth arguments for default values.
        * The 8th argument signifies the PAM authentication service. You may pass `auth_service` variable fetched in 2<sup>nd</sup> Step or `NULL` for none.
        * If the system only supports TLS connection, pass true in the 9th argument, else false. 

    4. **Add listeners and hostname to system**



    5. **Call the [Driver setup function](#setup)**

        Pass the system object created in previous steps as an argument to the Driver setup function. See the [design guidlines](#setup) for knowing about the Driver setup function.
    
    6. **Return System Object**

        The system object created and set up in the previous steps is returned in this step.  

___

* <h3 id = "setup"> Driver setup Function </h3>
    
        void pcl_setup (
            pappl_system_t *system
        );
    
    The Driver setup function receives only one argument, i.e. system object.

    1. **Define Drivers name and description**

        Create two arrays of string literals, one for the names of the drivers and the other for their corresponding descriptions. Initialise them suitably and use as directed in 2<sup>nd</sup> Step.

    2. **Call papplSystemSetPrintDrivers**

            void papplSystemSetPrintDrivers(
                pappl_system_t      *system,
                int                 num_names,
                const char * const  *names,
                const char * const  *desc,
                pappl_pdriver_cb_t  cb,
                void                *data
            );

        * The received pappl_system_t object is passed as the first argument.
        * Pass the number of drivers as the second argument
        * The defined driver name and description array are passed as the third and fourth arguments respectively. 
        * Pass the [Callback Function](#callback) as fifth argument.
        * Pass the callback data as the 6th argument. 

___

* <h3 id = "callback"> Callback Function </h3>

        bool pcl_callback (
            pappl_system_t          *system,
            const char              *driver_name,
            const char              *device_uri,
            pappl_pdriver_data_t    *driver_data,
            ipp_t                   **driver_attrs,
            void                    *data
        );
    
    The callback function receives six arguments System object, Driver name, Device URI, Driver data, Driver Attributes, and Callback data. It then returns either `true` on success or `false` on failure.

    1. **Add suitable checks**

        You may check that the passed values of `driver_name`, `device_uri`, `driver_data`, and `data` variable is non-NULL. Further, you must verify that the callback data is the same as the `data` variable.

    2. **Assign values to common `driver_data` members**

        | Member             | Significance                                         |
        |--------------------|------------------------------------------------------|
        | identify           | [Identify-Printer function](#identify)               |
        | identify_default   | "identify-actions-default" values                    |
        | identify_supported | "identify-actions-supported" values                  |
        | print              | [Print (file) function](#print)                      |
        | rendjob            | [End raster job function](#rendjob)                  |
        | rendpage           | [End raster page function](#rendpage)                |
        | rstartjob          | [Start raster job function](#rstartjob)              |
        | rstartpage         | [Start raster page function](#rstartpage)            |
        | rwrite             | [Write raster line function](#writeline)             |
        | status             | [Status function](#status)                           |
        | format             | Printer-specific format                              |
        | orient_default     | "orientation-requested-default" value                |
        | quality_default    | "print-quality-default" value                        |

    3. **Assign rest of the values `driver_data` members based on `driver_name`**

___

* <h3 id = "identify"> Identify Function </h3>
        
        void pcl_identify(
            pappl_printer_t          *printer,
            pappl_identify_actions_t actions,
            const char               *message
        );

___

* <h3 id = "print"> Print Function </h3>

        bool pcl_print(
            pappl_job_t      *job,
            pappl_poptions_t *options,
            pappl_device_t   *device
        );

___

* <h3 id = "rendjob"> End Job Function </h3>

        bool pcl_rendjob(
            pappl_job_t      *job,
            pappl_poptions_t *options,
            pappl_device_t   *device
        );

___

* <h3 id = "rendpage"> End Page Function </h3>

        bool pcl_rendpage(
            pappl_job_t      *job,
            pappl_poptions_t *options,
            pappl_device_t   *device,
            unsigned         page
        )

___

* <h3 id = "rstartjob"> Start Job Function </h3>

        bool pcl_rstartjob(
            pappl_job_t      *job,
            pappl_poptions_t *options,
            pappl_device_t   *device
        );

___

* <h3 id = "rstartpage"> Start Page Function </h3>

        bool pcl_rstartpage(
            pappl_job_t      *job,
            pappl_poptions_t *options,
            pappl_device_t   *device,
            unsigned         page
        )

___

* <h3 id = "writeline"> Write Line Function </h3>

        bool pcl_rwrite(
            pappl_job_t         *job,
            pappl_poptions_t    *options,
            pappl_device_t      *device,
            unsigned            y,
            const unsigned char *pixels
        )

___

* <h3 id = "status"> Printer Status Function </h3>

        bool pcl_status(
            pappl_printer_t *printer
        )

___

<h2 id="template"> Template for PAPPL-based Printer Driver </h2>

    //
    // Include neccessary headers
    //
    # include <pappl/pappl.h>


    // Declare structure for Job Data


    // Declare supported media sizes for different models of printers


    //
    // Declare local functions
    //

    static bool   callback(pappl_system_t *system, const char *driver_name, const char *device_uri, pappl_pdriver_data_t *driver_data, ipp_t **driver_attrs, void *data);
    static void   compress_data(pappl_job_t *job, pappl_device_t *device, unsigned char *line, unsigned length, unsigned plane, unsigned type);
    static void   identify(pappl_printer_t *printer, pappl_identify_actions_t actions, const char *message);
    static bool   print(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device);
    static bool   rendjob(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device);
    static bool   rendpage(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device, unsigned page);
    static bool   rstartjob(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device);
    static bool   rstartpage(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device, unsigned page);
    static bool   rwrite(pappl_job_t *job, pappl_poptions_t *options, pappl_device_t *device, unsigned y, const unsigned char *pixels);
    static void   setup(pappl_system_t *system);
    static bool   status(pappl_printer_t *printer);
    static pappl_system_t   *system_cb(int num_options, cups_option_t *options, void *data);


    //
    // 'main()' - Main entry for the hp-printer-app.
    //

    int
    main(int  argc,             // I - Number of command-line arguments
        char *argv[])           // I - Command-line arguments
    {
    papplMainloop(argc, argv, "1.0", NULL, NULL, NULL, system_cb, "hp_printer_app");
    return (0);
    }


    //
    // 'callback()' - PCL callback.
    //

    static bool                // O - `true` on success, `false` on failure
    callback(
        pappl_system_t       *system,      // I - System
        const char           *driver_name,   // I - Driver name
        const char           *device_uri,      // I - Device URI
        pappl_pdriver_data_t *driver_data,   // O - Driver data
        ipp_t                **driver_attrs, // O - Driver attributes
        void                 *data)    // I - Callback data
    {

    }


    //
    // 'compress_data()' - Compress a line of graphics.
    //

    static void
    compress_data(
        pappl_job_t    *job,        // I - Job object
        pappl_device_t *device,     // I - Device
        unsigned char  *line,       // I - Data to compress
        unsigned       length,      // I - Number of bytes
        unsigned       plane,       // I - Color plane
        unsigned       type)        // I - Type of compression
    {
    
    }


    //
    // 'identify()' - Identify the printer.
    //

    static void
    identify(
        pappl_printer_t          *printer,  // I - Printer
        pappl_identify_actions_t actions,   // I - Actions to take
        const char               *message)  // I - Message, if any
    {
    // Identify a printer using display, flash, sound or speech.
    }


    //
    // 'print()' - Print file.
    //

    static bool                           // O - `true` on success, `false` on failure
    print(
        pappl_job_t      *job,            // I - Job
        pappl_poptions_t *options,        // I - Options
        pappl_device_t   *device)         // I - Device
    {

    }


    //
    // 'rendjob()' - End a job.
    //

    static bool                     // O - `true` on success, `false` on failure
    rendjob(
        pappl_job_t      *job,      // I - Job
        pappl_poptions_t *options,  // I - Options
        pappl_device_t   *device)   // I - Device
    {

    }


    //
    // 'rendpage()' - End a page.
    //

    static bool                     // O - `true` on success, `false` on failure
    rendpage(
        pappl_job_t      *job,      // I - Job
        pappl_poptions_t *options,  // I - Job options
        pappl_device_t   *device,   // I - Device
        unsigned         page)      // I - Page number
    {

    }


    //
    // 'rstartjob()' - Start a job.
    //

    static bool                     // O - `true` on success, `false` on failure
    rstartjob(
        pappl_job_t      *job,      // I - Job
        pappl_poptions_t *options,  // I - Job options
        pappl_device_t   *device)   // I - Device
    {

    }


    //
    // 'rstartpage()' - Start a page.
    //

    static bool                      // O - `true` on success, `false` on failure
    rstartpage(
        pappl_job_t       *job,       // I - Job
        pappl_poptions_t  *options,   // I - Job options
        pappl_device_t    *device,    // I - Device
        unsigned          page)       // I - Page number
    {

    }


    //
    // 'rwrite()' - Write a line.
    //

    static bool             // O - `true` on success, `false` on failure
    rwrite(
        pappl_job_t         *job,       // I - Job
        pappl_poptions_t    *options,   // I - Job options
        pappl_device_t      *device,    // I - Device
        unsigned            y,      // I - Line number
        const unsigned char *pixels)    // I - Line
    {

    }


    //
    // 'setup()' - Setup PCL drivers.
    //

    static void
    setup(
        pappl_system_t *system)      // I - System
    {
    
    }


    //
    // 'status()' - Get printer status.
    //

    static bool                   // O - `true` on success, `false` on failure
    status(
        pappl_printer_t *printer) // I - Printer
    {

    }


    //
    // 'system_cb()' - System callback.
    //

    pappl_system_t *            // O - New system object
    system_cb(int           num_options,    // I - Number of options
        cups_option_t *options, // I - Options
        void          *data)        // I - Callback data
    {

    }

<h2 id="resources"> Resources </h2>

[1] <a href="../01-printer-application/">Printer Application</a>
<br>
[2] <a href="https://github.com/michaelrsweet/hp-printer-app">HP Printer App Example</a>
<br>
[3] <a href="https://github.com/michaelrsweet/pappl/">PAPPL</a>
<br>
[4] <a href="../04-packaging-drivers/">Packaging Drivers and Uploading them to Snap Store</a>
<br>
[5] <a href="../05-User-Manual/">User Manual</a>