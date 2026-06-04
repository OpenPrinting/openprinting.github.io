export interface GsocWorkSummary {
    name: string;
    year: number;
    status: "passed" | "failed" | "withdrawn";
    summary: string;
    workProductUrl?: string;
    codeLinks?: { label: string; url: string }[];
    quote?: string;
}

const gsocWorkSummaries: GsocWorkSummary[] = [
    {
        name: "Dheeraj",
        year: 2019,
        status: "passed",
        summary:
            "Built a generic framework to convert legacy CUPS drivers (filters + PPDs) into Printer Applications, laying the groundwork for the entire driver retro-fitting ecosystem.",
        workProductUrl:
            "https://gist.github.com/dheeraj135/852733a6944d2f7ede670fe9d3d0ac6a",
    },
    {
        name: "Tanmay Anand",
        year: 2019,
        status: "passed",
        summary:
            "Improved the pdftoraster filter to use stable, documented Poppler APIs instead of internal unstable interfaces. Completed the original project in the first month and additionally worked on a CPDB adapter backend for the GTK3 print dialog.",
        workProductUrl:
            "https://github.com/tanmayanand44/cups-filters-gsoc19/wiki/Google-Summer-of-Code-2019-%7C-The-Linux-Foundation-%7C-Improving-pdftoraster-filter-to-use-stable-Poppler-APIs",
    },
    {
        name: "Sharad Shukla",
        year: 2019,
        status: "passed",
        summary:
            "Updated the ipptool test suite to reflect the latest IPP errata, ensuring comprehensive conformance testing for IPP implementations.",
        workProductUrl:
            "https://github.com/Sharadd15/ippsample/wiki/Gsoc-2k19-%7C-OpenPrinting-%7C-The-Linux-Foundation-%7C-Ipptool-test-suite-updates-for-IPP-errata-updates",
    },
    {
        name: "Aakash Lahoti",
        year: 2019,
        status: "passed",
        summary:
            "Created an ipptool test suite for the IPP System Service, enabling automated validation of system-level IPP operations.",
        workProductUrl:
            "https://github.com/aakashlahoti/Google-Summer-Of-Code-2019-The-Linux-Foundation",
    },

    {
        name: "Vikrant Malik",
        year: 2020,
        status: "passed",
        summary:
            "Developed functionality to extract raster data directly from PDF files for direct printing, and contributed to the conversion of CUPS filters into reusable filter functions.",
        workProductUrl:
            "https://vikrantmalik051.blogspot.com/2020/08/blog-post.html",
    },
    {
        name: "Jai Luthra",
        year: 2020,
        status: "passed",
        summary:
            "Created a General Printer Application SDK by working on PAPPL and building an HP PCL sample Printer Application. Also helped convert cups-filters into filter functions.",
        workProductUrl:
            "https://jailuthra1.github.io/google-summer-of-code-2020/",
    },
    {
        name: "Mohit Mohan",
        year: 2020,
        status: "passed",
        summary:
            "Optimized cups-browsed for speed and scalability, improving its performance when handling large numbers of discovered network printers.",
        workProductUrl:
            "https://github.com/mohitmo/GSoC-2020-Documentation",
    },
    {
        name: "Lakshay Bandlish",
        year: 2020,
        status: "passed",
        summary:
            "Built a Linux GUI application to administer multi-function devices using the IPP System Service, providing a user-friendly interface for managing IPP-capable printers and scanners.",
        workProductUrl:
            "https://github.com/lbandlish/Administrate-MF-Devices-GUI",
    },
    {
        name: "Sambhav Dusad",
        year: 2020,
        status: "passed",
        summary:
            "Made Printer Applications configurable through runtime settings, and started creating a native Gutenprint Printer Application — the first larger-scope native Printer Application.",
        workProductUrl: "https://dsam82.github.io/gsoc20",
    },

    {
        name: "Suraj Kulriya",
        year: 2021,
        status: "passed",
        summary:
            "Ensured all cups-filters filter functions work without PPD files, enabling them to operate purely with IPP job and printer attributes — critical for the CUPS 3.x PPD-less architecture.",
        workProductUrl:
            "https://surajkulriya.medium.com/gsoc-2021-final-work-product-the-linux-foundation-make-printing-work-through-cups-without-bf06dbfa1789",
    },
    {
        name: "Pratyush Ranjan",
        year: 2021,
        status: "passed",
        summary:
            "Converted CUPS filters into reusable filter functions inside libcupsfilters, decoupling the printing pipeline from external executables.",
        workProductUrl: "https://pranjanpr.github.io/pratyush/#/gsoc",
    },
    {
        name: "Pranshu Kharkwal",
        year: 2021,
        status: "passed",
        summary:
            "Created a single, universal CUPS filter that calls sequences of filter functions internally, reducing the overhead of external process calls in filter chains.",
        workProductUrl:
            "https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023",
    },
    {
        name: "Divyasheel",
        year: 2021,
        status: "passed",
        summary:
            "Developed a GUI application for listing and managing available IPP Print/Scan services, supporting DNS-SD-advertised network service discovery.",
        workProductUrl: "https://github.com/divyashk/GSOC21_summary",
    },
    {
        name: "Bhavna Kosta",
        year: 2021,
        status: "passed",
        summary:
            "Added printer setup tool support and initial scanning support to PAPPL, extending the framework to handle scanner hardware alongside printers.",
        workProductUrl: "https://github.com/Bhavna2020/GSoC-2021",
    },

    {
        name: "Chandresh Soni",
        year: 2022,
        status: "passed",
        summary:
            "Converted Braille embosser support into a native Printer Application using PAPPL, with separate drivers for embossers and support for raw printing of BRF/UBRL formats and filter conversions.",
        workProductUrl:
            "https://gist.github.com/Chandresh2702/73923b2c686039404cdd9b050edbe995",
    },
    {
        name: "Gaurav Guleria",
        year: 2022,
        status: "passed",
        summary:
            "Added Common Print Dialog Backends (CPDB) support to the Qt print dialog by creating a CPDB print plugin, and fixed bugs in the GTK print dialog's CPDB backend. Also extended cpdb-libs with default printer support and multiple media margins.",
        workProductUrl: "https://github.com/TinyTrebuchet/gsoc22/",
        codeLinks: [
            {
                label: "Qt Merge Request",
                url: "https://codereview.qt-project.org/c/qt/qtbase/+/437301",
            },
            {
                label: "GTK Merge Request",
                url: "https://gitlab.gnome.org/GNOME/gtk/-/merge_requests/4930",
            },
        ],
    },
    {
        name: "Rishabh Maheshwari",
        year: 2022,
        status: "passed",
        summary:
            "Implemented scanning support in PAPPL with eSCL protocol support, completing all necessary parsing functions for client scanner requests and device capabilities data structures.",
        workProductUrl:
            "https://gist.github.com/Rishabh-792/b1a2960b7e0e3d2bd3a5f4db3d260fc0",
    },
    {
        name: "Sachin Thakan",
        year: 2022,
        status: "passed",
        summary:
            "Replaced ippfind with direct Avahi API calls for discovering and resolving driverless IPP printers in cups-filters, optimizing the discovery process to only resolve relevant services.",
        workProductUrl: "https://github.com/thakan25/gsoc22-submission",
    },
    {
        name: "Mohit Verma",
        year: 2022,
        status: "passed",
        summary:
            "Built the GNOME Control Center GUI for discovering non-driverless printers and finding suitable Printer Applications via the OpenPrinting web server lookup service, including Printer Application installation capabilities.",
        workProductUrl:
            "https://github.com/vermamohit13/GSOC_2022_Summary",
        codeLinks: [
            {
                label: "GNOME Issue #1878",
                url: "https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1878",
            },
            {
                label: "cups-pk-helper PR #7",
                url: "https://gitlab.freedesktop.org/cups-pk-helper/cups-pk-helper/-/merge_requests/7",
            },
        ],
    },
    {
        name: "Shivam Mishra",
        year: 2022,
        status: "passed",
        summary:
            "Created a new printer setup tool for the GNOME Control Center that integrates IPP system service management with IPP printing service listing, enabling GUI configuration of IPP multi-function devices alongside CUPS queues.",
        codeLinks: [
            {
                label: "GNOME Issue #1877",
                url: "https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1877",
            },
            {
                label: "GNOME Issue #1879",
                url: "https://gitlab.gnome.org/GNOME/gnome-control-center/-/issues/1879",
            },
        ],
    },

    {
        name: "Kushagra Sharma",
        year: 2023,
        status: "passed",
        summary:
            "Added CPDB support for application print dialogs across Firefox, Chromium, and LibreOffice, bringing the Common Print Dialog Backends to major desktop applications.",
        workProductUrl: "https://github.com/kushagra20251/GSoC/",
        quote:
            "Thank you for amazing guidance, OpenPrinting is an amazing team and working along side helped me learn a lot, I hope to keep contributing and keep in touch with mentors and fellow contributors.",
    },
    {
        name: "Akarshan Kapoor",
        year: 2023,
        status: "passed",
        summary:
            "Built a sand-boxed Scanner Application framework, laying the groundwork for driverless scanning and sandboxing scanner drivers in the new architecture.",
        workProductUrl:
            "https://dev.to/kappuccino111/sandboxing-scanners-a-leap-into-the-driverless-realm-gsoc-23-report-3eci",
    },
    {
        name: "Mohit Verma",
        year: 2023,
        status: "passed",
        summary:
            "Extended the GNOME Control Center to list and handle IPP print services for the New Architecture, enabling GNOME's printer panel to work with modern driverless printers.",
        workProductUrl: "https://github.com/vermamohit13/GSOC-2023",
        quote: "It was a wonderful experience to work with OpenPrinting. I think they (the mentors) are the best out there.",
    },
    {
        name: "Pratyush Ranjan",
        year: 2023,
        status: "passed",
        summary:
            "Built a continuous integration test framework for libcupsfilters, libpappl-retrofit, libppd, CPDB, and CPDB libs, using an easily-editable table for describing test cases.",
        workProductUrl: "https://github.com/pranjanpr/GSoC-23",
    },

    {
        name: "Rudra Pratap Singh",
        year: 2024,
        status: "passed",
        summary:
            "Packaged CUPS and Printer Applications (PostScript, Ghostscript, HPLIP, Gutenprint) into OCI container images (Rocks), and built GitHub Actions for automated updates and versioning.",
        workProductUrl:
            "https://medium.com/@rudransh.iitm/gsoc-2024-final-report-container-chronicles-759fe7f23ac6",
        codeLinks: [
            { label: "CUPS Rock", url: "https://github.com/rudra-iitm/cups-rock" },
            {
                label: "PS Printer App Rock",
                url: "https://github.com/rudra-iitm/ps-printer-app-rock",
            },
            {
                label: "Ghostscript Printer App Rock",
                url: "https://github.com/rudra-iitm/ghostscript-printer-app-rock",
            },
        ],
    },
    {
        name: "Biswadeep Purkayastha",
        year: 2024,
        status: "passed",
        summary:
            "Added CPDB support to the LibreOffice print dialog, connecting LibreOffice to the Common Print Dialog Backends system. All CPDB pull requests merged; LibreOffice upstream merge request pending.",
        workProductUrl:
            "https://medium.com/@bpdps95/providing-cpdb-support-for-the-libreoffice-print-dialog-my-gsoc-journey-e46f72d5a61c",
        codeLinks: [
            {
                label: "LibreOffice Gerrit PR",
                url: "https://gerrit.libreoffice.org/c/core/+/169617",
            },
        ],
    },
    {
        name: "ttfish",
        year: 2024,
        status: "passed",
        summary:
            "Integrated C-based OpenPrinting projects into OSS-Fuzz testing, deploying active fuzzing on CUPS 2.x and libcups 3.x repositories. Discovered and fixed issues resulting in over 5,000 lines of code changes.",
        workProductUrl:
            "https://github.com/OpenPrinting/fuzzing/wiki/Integrating-C%E2%80%90based-OpenPrinting-Projects-in-OSS%E2%80%90Fuzz-Testing-(GSoC-2024)",
        codeLinks: [
            {
                label: "Fuzz Harnesses",
                url: "https://github.com/OpenPrinting/fuzzing",
            },
        ],
    },
    {
        name: "Akarshan Kapoor",
        year: 2024,
        status: "passed",
        summary:
            "Bridged the PAPPL API for Scanner Applications, creating the Scan API in PAPPL and a retrofit interface for replacing SANE with a universal PAPPL interface for driverless scanner operation.",
        workProductUrl:
            "https://dev.to/kappuccino111/pappl-scan-api-bridging-gsoc-2024-project-report-2hoc",
        codeLinks: [
            {
                label: "PAPPL Scan API PR",
                url: "https://github.com/michaelrsweet/pappl/pull/371",
            },
            {
                label: "pappl-retrofit PR #23",
                url: "https://github.com/OpenPrinting/pappl-retrofit/pull/23",
            },
        ],
    },
    {
        name: "Kushagra Sharma",
        year: 2024,
        status: "passed",
        summary:
            "Added CPDB support for the Mozilla Firefox/Thunderbird print dialog, implementing a CPDB backend that dynamically fetches printer properties. Code review pending upstream merge at Mozilla.",
        workProductUrl: "https://github.com/kushagra20251/GSoC24",
        codeLinks: [
            {
                label: "Mozilla Code Review",
                url: "https://phabricator.services.mozilla.com/D227780",
            },
        ],
    },
    {
        name: "Shivam Jaiswal",
        year: 2024,
        status: "passed",
        summary:
            "Updated system-config-printer for the New Architecture of printing, adding asynchronous IPP service discovery and working on the 'Add Printer' functionality for modern IPP printers.",
        workProductUrl:
            "https://github.com/TheJayas/GSoC-2024-Final-Report",
        codeLinks: [
            {
                label: "system-config-printer PR #378",
                url: "https://github.com/OpenPrinting/system-config-printer/pull/378",
            },
        ],
    },
    {
        name: "Ankit Pal Singh",
        year: 2024,
        status: "passed",
        summary:
            "Created a native Printer Application from Gutenprint, converting the Gutenprint driver into a PAPPL-based Printer Application without PPD file dependencies. Plans include adding option preset functionality.",
        workProductUrl:
            "https://docs.google.com/document/d/1BkjO4FAIIyeQCJV_1qkUsx9pG2DD1HqgrsoL0MuYG3A/edit?usp=sharing",
        codeLinks: [
            {
                label: "GitHub Repository",
                url: "https://github.com/Ankit3002/native-gutenprinter-app",
            },
        ],
    },
    {
        name: "Kaushik Veeraraghavan",
        year: 2024,
        status: "passed",
        summary:
            "Finalized the new printing architecture for GNOME in the GNOME Control Center, adding support for driverless IPP printers and Printer Applications in the GUI. Code migration to GCC 47.3 and upstream merge request in progress.",
        workProductUrl:
            "https://medium.com/@kaushik.vishwakarma2003/gsoc-2024-thelinuxfoundation-journey-07e24d7e9be9",
        codeLinks: [
            {
                label: "GCC Branch",
                url: "https://github.com/Kaushik1216/gnome-control-center/tree/cupsgcc46.3",
            },
        ],
    },
    {
        name: "Arun Patwa",
        year: 2024,
        status: "passed",
        summary:
            "Converted Braille embosser support into a PAPPL-based Printer Application, implementing MIME type detection with libmagic and supporting printing of TXT, PDF, HTML, and JPG files to Braille embossers.",
        workProductUrl:
            "https://docs.google.com/document/d/1ZUQV_Qha9f14ceZc6mW39i3RZfWGu6HGPGcXsz3dKUE/edit?tab=t.0#heading=h.uws5sjz8iisy",
        codeLinks: [
            {
                label: "GitHub Repository",
                url: "https://github.com/arunpatwa/braille-printer-app-pappl",
            },
            {
                label: "Upstream PR",
                url: "https://github.com/OpenPrinting/braille-printer-app/pull/10",
            },
        ],
    },
    {
        name: "Uddhav Phatak",
        year: 2024,
        status: "passed",
        summary:
            "Replaced QPDF with PDFio as the PDF manipulation library in libcupsfilters, porting all C++ files in cupsfilters/pdftopdf/*, pdf.cxx, and pclmtoraster.cxx to pure C with all tests passing.",
        workProductUrl:
            "https://medium.com/@uddhavphatak/gsoc-2024-final-report-the-refactor-report-a46756e9d6ce",
        codeLinks: [
            {
                label: "libcupsfilters PR #71",
                url: "https://github.com/OpenPrinting/libcupsfilters/pull/71",
            },
        ],
    },

    {
        name: "Tarun Srivastava",
        year: 2025,
        status: "passed",
        summary:
            "Ported KDE Print Manager to the CUPS 3.x API, updating the KDE framework and establishing an automated testing setup (autotests) with CI/CD pipeline integration. PR under review by KDE developers.",
        workProductUrl:
            "https://github.com/Lord-Morpheus/GSOC-2025?tab=readme-ov-file#google-summer-of-code-2025---project-summary",
        quote:
            "I would like to thank you all for providing the support and direction needed. OpenPrinting and KDE, mentors of both the organizations are really helpful in solving any kind of issue arising.",
    },
    {
        name: "Soumyadeep Ghosh",
        year: 2025,
        status: "passed",
        summary:
            'Ported pyCUPS to the CUPS 3.x API and implemented it in system-config-printer, creating safe Python bindings with method overloading via functools singledispatch and C structure representations.',
        workProductUrl:
            "https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-final-submission",
        codeLinks: [
            {
                label: "pycups libcups3 branch",
                url: "https://github.com/soumyaDghosh/pycups",
            },
        ],
        quote:
            "Callahan, without your continuous support, I could've never been able to complete this project. All those brainstorming sessions, all those Eureka moments, all those jokes on hilarious APIs during the weekly calls, I'll surely miss them.",
    },
    {
        name: "Kaushik Veeraraghavan",
        year: 2025,
        status: "passed",
        summary:
            "Finalized the new printing architecture for GNOME, creating a merge request for GCC 50 that adds support for driverless IPP printers and printer applications with intuitive grouping. Resolved duplicate printer entries by updating discovery from cupsGetDests() to cupsEnumDests().",
        workProductUrl:
            "https://medium.com/@kaushik.vishwakarma2003/gsoc-2025-thelinuxfoundation-advancing-printer-management-in-gnome-control-center-c36a1ce8ae07",
        codeLinks: [
            {
                label: "GCC Merge Request",
                url: "https://gitlab.gnome.org/GNOME/gnome-control-center/-/merge_requests/3226",
            },
        ],
    },
    {
        name: "Hubert Guan",
        year: 2025,
        status: "passed",
        summary:
            "Ported the CUPS/PAPPL printing stack to the Zephyr RTOS, getting libcups HTTP, IPP, and array APIs operational on Zephyr with external memory modules. Implemented mDNS service advertising using Zephyr's API.",
        workProductUrl:
            "https://hubertyguan.github.io/GSoC-2025/posts/final/",
        codeLinks: [
            {
                label: "Zephyr Fork",
                url: "https://github.com/HubertYGuan/zephyr",
            },
        ],
        quote:
            "I have had a great time working with my mentors and Org Admins, as you have always helped me with my questions on different aspects of the project and encouraged me through all the highs and lows of this extended journey.",
    },
    {
        name: "Sanskar",
        year: 2025,
        status: "passed",
        summary:
            "Built an image output verification framework for OpenPrinting with a dedicated filter chain testing pipeline, optimized OpenCV feature matching, vectorized Local Binary Pattern texture analysis, and a four-tier HOWTO system for progressive capability demonstration.",
        workProductUrl:
            "https://github.com/Sanskary2303/OpenPrinting-Image-Evaluation",
    },
    {
        name: "Mintu Gogoi",
        year: 2025,
        status: "passed",
        summary:
            "Developed cups-rs, a safe Rust wrapper for the CUPS printing system covering most of the C API, with printer discovery, job management, authentication callbacks, SSL/TLS certificate management, and RAII-based resource cleanup. Published as a crate (v0.3.0).",
        workProductUrl: "https://github.com/Gmin2/cups-rs",
        codeLinks: [
            {
                label: "crates.io",
                url: "https://docs.rs/crate/cups_rs/0.3.0",
            },
            {
                label: "API Docs",
                url: "https://docs.rs/cups_rs/latest/cups_rs/",
            },
        ],
    },
    {
        name: "Titiksha Bansal",
        year: 2025,
        status: "passed",
        summary:
            "Created safe and idiomatic Rust bindings for cpdb-libs (v2.3), implementing printer discovery, job submission, queue management, async callbacks, RAII cleanup via Drop traits, and comprehensive tests across Linux and macOS.",
        workProductUrl: "https://github.com/TitikshaBansal/cpdb-rs",
        quote:
            "My mentor was very supportive and approachable throughout the program. They provided timely feedback on my code, explained design decisions clearly, and encouraged me to think through problems instead of just giving direct answers.",
    },
    {
        name: "Zixuan Liu",
        year: 2025,
        status: "passed",
        summary:
            "Utilized OSS-Fuzz-Gen to improve fuzz testing for OpenPrinting projects, with pull requests merged into the OpenPrinting fuzzing repository for enhanced security coverage.",
        workProductUrl:
            "https://github.com/OpenPrinting/fuzzing/blob/main/contributions/GSoC%202025%20-%20Utilizing%20OSS-Fuzz-Gen%20to%20Improve%20Fuzz%20Testing%20for%20OpenPrinting%20Projects/Final%20report.md",
        codeLinks: [
            {
                label: "Fuzzing Repository",
                url: "https://github.com/OpenPrinting/fuzzing",
            },
        ],
    },
    {
        name: "Yash Raj Singh",
        year: 2025,
        status: "passed",
        summary:
            "Built libpdfrip, a PDFio-based PDF renderer in straight C under Apache license. Successfully renders shapes, vector graphics, text, and fonts. Image rendering partially completed, with plans for multi-page support and PWG/CUPS/Apple raster output.",
        workProductUrl: "https://github.com/OpenPrinting/libpdfrip",
        codeLinks: [
            {
                label: "pdf2cairo branch",
                url: "https://github.com/vididvidid/pdfio/tree/feature/pdf2cairo",
            },
        ],
        quote:
            "I am very glad and thankful to my mentors who kept a lot of patience with me and believed that I can do things. Their constant support and kindness were very special.",
    },
    {
        name: "Mohammed Imaduddin",
        year: 2025,
        status: "passed",
        summary:
            "Integrated OSS-Fuzz for Go-based and Python-based OpenPrinting projects, the first time Python projects (pyppd, pycups) were integrated into OSS-Fuzz. Developed 14 comprehensive fuzz harnesses covering authentication, buffer handling, IPP I/O, and UTF-8 validation.",
        workProductUrl:
            "https://github.com/OpenPrinting/fuzzing/blob/main/contributions/GSoC%202025%20-%20Integrating%20OSS-Fuzz%20for%20Go-Based%20and%20Python-Based%20OpenPrinting%20Projects/Final%20report.md",
        codeLinks: [
            {
                label: "Fuzzing Repository",
                url: "https://github.com/OpenPrinting/fuzzing",
            },
        ],
        quote:
            "I am very grateful to my mentors for their guidance throughout the project. Till Kamppeter provided deep domain knowledge in printing protocols and OpenPrinting architecture.",
    },
    {
        name: "Rudra Pratap Singh",
        year: 2025,
        status: "passed",
        summary:
            "Built the Foomatic Lookup Site with lazy loading, search functionality, and full static deployment on GitHub Pages. Currently mentoring new contributors joining the project for continued development.",
        workProductUrl:
            "https://medium.com/@rudransh.iitm/static-pages-dynamic-impact-my-gsoc-2025-journey-119a2544f4c9",
        quote:
            "My mentors have been incredibly supportive throughout GSoC. They provided clear guidance when needed, encouraged independent problem-solving, and always ensured that discussions stayed constructive and technically insightful.",
    },
];

export function getWorkSummary(
    name: string,
    year: number,
): GsocWorkSummary | undefined {
    return gsocWorkSummaries.find((s) => s.name === name && s.year === year);
}

export function getWorkSummariesByYear(year: number): GsocWorkSummary[] {
    return gsocWorkSummaries.filter((s) => s.year === year);
}

export function getAllWorkSummaries(): GsocWorkSummary[] {
    return gsocWorkSummaries;
}
