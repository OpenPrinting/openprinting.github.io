export interface GsocContributorSocials {
    github?: string;
    website?: string;
    githubPages?: string;
    linkedin?: string;
    x?: string;
    mastodon?: string;
    medium?: string;
    devto?: string;
    twitter?: string;
    facebook?: string;
}

export interface GsocContributor {
    name: string;
    project: string;
    slug: string;
    mentors: string[];
    projectUrl: string;
    codeUrl: string;
    desiredKnowledge: string[];
    codeLicense: string;
    image?: string;
    socials?: GsocContributorSocials;
}

export interface GsocYearContributors {
    year: number;
    orgUrl: string;
    contributors: GsocContributor[];
}

const gsocContributors: GsocYearContributors[] = [
    {
        year: 2019,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2019/organizations/6487994943406080",
        contributors: [
            {
                name: "Dheeraj",
                project:
                    "Generic Framework to turn legacy drivers consisting of CUPS filters and PPDs into Printer Applications",
                slug: "legacy-drivers-to-printer-applications",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2019/projects/5895498257924096",
                codeUrl: "",
                desiredKnowledge: ["C", "DNS-SD", "IPP"],
                codeLicense: "Apache 2.0",
                image: "/authors/dheeraj135.jpg",
                socials: {
                    github: "dheeraj135",
                },
            },
            {
                name: "Tanmay Anand",
                project:
                    "Improve the pdftoraster filter to not need copying Poppler source code or using unstable APIs",
                slug: "pdftoraster-filter",
                mentors: ["Till Kamppeter", "Tobias Hoffmann"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2019/projects/5766689135845376",
                codeUrl: "",
                desiredKnowledge: ["C", "C++"],
                codeLicense: "MIT",
                socials: {
                    github: "tanmayanand44",
                },
            },
            {
                name: "Sharad Shukla",
                project: "IPP - ipptool test suite for IPP Errata Updates",
                slug: "ipp-test-tool-for-ipp-errata-updates",
                mentors: ["Ira McDonald", "Smith Kennedy"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2019/projects/6361523264086016",
                codeUrl: "",
                desiredKnowledge: ["C", "IPP"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "Sharadd15",
                },
            },
            {
                name: "Aakash Lahoti",
                project: "IPP - ipptool test suite for IPP System Service",
                slug: "ipp-test-tool-for-ipp-system-service",
                mentors: ["Ira McDonald", "Smith Kennedy"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2019/projects/5613725327564800",
                codeUrl: "",
                desiredKnowledge: ["C", "IPP"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "aakashlahoti",
                },
            },
        ],
    },

    {
        year: 2020,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2020/organizations/5415607517839360",
        contributors: [
            {
                name: "Vikrant Malik",
                project: "Extract Raster data from PDFs for direct printing",
                slug: "extract-raster-from-pdf",
                mentors: [
                    "Till Kamppeter",
                    "Michael Sweet",
                    "Ira McDonald",
                    "Sahil Arora",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2020/projects/5650438981943296",
                codeUrl:
                    "https://vikrantmalik051.blogspot.com/2020/08/blog-post.html",
                desiredKnowledge: ["C", "CUPS"],
                codeLicense: "(L)GPL 2+, Apache 2.0, MIT",
                socials: {
                    github: "vikrantmalik051",
                    website: "https://vikrantmalik051.blogspot.com/",
                },
            },
            {
                name: "Jai Luthra",
                project: "General Printer Application SDK",
                slug: "general-printer-sdk",
                mentors: [
                    "Ira McDonald",
                    "Till Kamppeter",
                    "Michael Sweet",
                    "Dheeraj",
                    "Danny Brennan",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2020/projects/5724232224342016",
                codeUrl:
                    "https://jailuthra1.github.io/google-summer-of-code-2020/",
                desiredKnowledge: ["C", "DNS-SD", "IPP"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "jailuthra1",
                    githubPages: "https://jailuthra1.github.io/google-summer-of-code-2020/",
                    twitter: "https://twitter.com/jailuthra",
                    facebook: "https://www.facebook.com/jailuthra",
                },
            },
            {
                name: "Mohit Mohan",
                project: "Speed/Scaling optimization of cups-browsed",
                slug: "optimization-cups-browsed",
                mentors: ["Deepak Patankar", "Till Kamppeter", "Aveek Basu"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2020/projects/6494658156298240",
                codeUrl:
                    "https://github.com/mohitmo/GSoC-2020-Documentation",
                desiredKnowledge: ["C", "IPP", "CUPS"],
                codeLicense: "LGPL-2.1+",
                socials: {
                    github: "mohitmo",
                },
            },
            {
                name: "Lakshay Bandlish",
                project:
                    "Linux GUI application to admin MF devices using IPP System Service",
                slug: "Linux-GUI-Application",
                mentors: [
                    "Till Kamppeter",
                    "Michael Sweet",
                    "Rithvik Patibandla",
                    "Smith Kennedy",
                    "Ira McDonald",
                    "Danny Brennan",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2020/projects/6030220022251520",
                codeUrl:
                    "https://github.com/lbandlish/Administrate-MF-Devices-GUI",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "lbandlish",
                },
            },
            {
                name: "Sambhav Dusad",
                project: "Make Printer Applications Configurable",
                slug: "make-printer-application-configurable",
                mentors: [
                    "Aveek Basu",
                    "Till Kamppeter",
                    "Dheeraj",
                    "Ira McDonald",
                    "Michael Sweet",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2020/projects/4880658133942272",
                codeUrl: "https://lonerapier.github.io/gsoc20",
                desiredKnowledge: ["C", "DNS-SD", "IPP"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "lonerapier",
                    githubPages: "https://lonerapier.github.io/gsoc20",
                },
            },
        ],
    },

    {
        year: 2021,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2021/organizations/5715751809318912",
        contributors: [
            {
                name: "Suraj Kulriya",
                project:
                    "Make All Filter Functions Work Well Even Without PPD Files",
                slug: "Filter_withour-PPD",
                mentors: ["Jai Luthra", "Till Kamppeter", "Dheeraj Yadav"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2021/projects/5467975515111424",
                codeUrl:
                    "https://surajkulriya.medium.com/gsoc-2021-final-work-product-the-linux-foundation-make-printing-work-through-cups-without-bf06dbfa1789",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "surajkulriya",
                    githubPages: "https://surajkulriya.github.io/",
                    medium: "https://surajkulriya.medium.com/",
                },
            },
            {
                name: "Divyasheel",
                project: "GUI for listing and managing available IPP services",
                slug: "GUI-for-IPP",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2021/projects/4690129087627264",
                codeUrl: "https://github.com/divyashk/GSOC21_summary",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "divyashk",
                },
            },
            {
                name: "Pranshu Kharkwal",
                project:
                    "Create a single universal CUPS filter to replace the chain of individual filters",
                slug: "Single-universal-filter",
                mentors: ["Till Kamppeter", "Dheeraj Yadav"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2021/projects/6547105979564032",
                codeUrl:
                    "https://gist.github.com/pranshukharkwal/9413499a6744049ef549159948392023",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "pranshukharkwal",
                },
            },
            {
                name: "Bhavna Kosta",
                project: "Firmware and other file handling in PAPPL",
                slug: "File-Handling-in-PAPPL",
                mentors: [
                    "Jai Luthra",
                    "Till Kamppeter",
                    "Ira McDonald",
                    "Michael R Sweet",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2021/projects/6292943874293760",
                codeUrl: "https://github.com/Bhavna2020/GSoC-2021",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "Bhavna2020",
                },
            },
            {
                name: "Pratyush Ranjan",
                project: "CUPS Filters: Converting Filters to Filter Functions",
                slug: "Filters-to-Filter",
                mentors: ["Till Kamppeter", "Dheeraj Yadav"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2021/projects/5205259948916736",
                codeUrl: "https://pranjanpr.github.io/pratyush/#/gsoc",
                desiredKnowledge: ["C", "Python", "GTK"],
                codeLicense: "GPL 2+ or LGPL 2+",
                socials: {
                    github: "pranjanpr",
                    githubPages: "https://pranjanpr.github.io/pratyush/#/gsoc",
                },
            },
        ],
    },

    {
        year: 2022,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2022/organizations/open-printing",
        contributors: [
            {
                name: "Shivam Mishra",
                project:
                    "GUI for discovering non-driverless printers and finding suitable Printer Applications for them",
                slug: "GUI-for-discovering-non-driverless-printers-and-finding-suitable-Printer-Applications-for-them",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/ShivamMishra",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "GPL-2+ and LGPL-2+",
                socials: {
                    github: "pushinl",
                },
            },
            {
                name: "Rishabh Maheshwari",
                project: "Scanning support in PAPPL",
                slug: "Scanning-support-in-PAPPL",
                mentors: [
                    "Till Kamppeter",
                    "Michael Sweet",
                    "Jai Luthra",
                    "Dheeraj Yadav",
                    "Alexander Pevzner",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/RishabhMaheshwari",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "Rishabh-792",
                    githubPages: "https://rishabh-792.github.io/",
                },
            },
            {
                name: "Gaurav Guleria",
                project:
                    "Print Dialogs: Make them use the Common Print Dialog Backends (CPDB)",
                slug: "Print-Dialogs",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/GauravGuleria",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK or Qt", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "GPL-2+ and LGPL-2+, Apache 2.0",
                socials: {
                    github: "TinyTrebuchet",
                },
            },
            {
                name: "Chandresh Soni",
                project:
                    "Converting Braille embosser support into a Printer Application",
                slug: "Converting-Braille-embosser-support-into-a-Printer-Application",
                mentors: ["Till Kamppeter", "Samuel Thibault"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/ChandreshSoni",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "Shell", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "chandresh-soni",
                },
            },
            {
                name: "Sachin Thakan",
                project:
                    "cups-filters: Add Avahi calls for discovering and resolving driverless IPP printers to API and optimize the processes",
                slug: "cups-filters-avahi-discovery",
                mentors: ["Till Kamppeter", "Sahil Arora"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/SachinThakan",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "thakan25",
                },
            },
            {
                name: "Mohit Verma",
                project:
                    "cups-filters: In filter functions call Ghostscript via libgs and not as external executable",
                slug: "cups-filters-libgs",
                mentors: ["Till Kamppeter", "Sahil Arora", "Dheeraj Yadav"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2022/projects/MohitVerma",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "vermamohit13",
                },
            },
        ],
    },

    {
        year: 2023,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2023/organizations/open-printing",
        contributors: [
            {
                name: "Mohit Verma",
                project:
                    "GNOME Control Center: List and handle IPP print services for the New Architecture",
                slug: "GNOME-Control-Center",
                mentors: ["Till Kamppeter", "Marek Kasik"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2023/projects/sNMpMHvf",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "GPL-2+ and LGPL-2+",
                socials: {
                    github: "vermamohit13",
                },
            },
            {
                name: "Akarshan Kapoor",
                project: "Scanning support in PAPPL",
                slug: "Scanning-support-in-PAPPL",
                mentors: [
                    "Till Kamppeter",
                    "Michael Sweet",
                    "Rishabh Maheshwari",
                    "Deepak Patankar",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2023/projects/dqH5at1O",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "Kappuccino111",
                    devto: "https://dev.to/kappuccino111",
                },
            },
            {
                name: "Pratyush Ranjan",
                project:
                    "CI Testing programs for libcupsfilters, libpappl-retrofit, libppd, CPDB, etc.",
                slug: "CI-Testing-programs-for-libcupsfilters-libpappl-retrofit-libppd-CPDB-etc-",
                mentors: ["Till Kamppeter", "Michael Sweet"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2023/projects/80Bfeq1D",
                codeUrl: "",
                desiredKnowledge: ["C", "Shell", "PAPPL", "CUPS", "CI"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "pranjanpr",
                    githubPages: "https://pranjanpr.github.io/pratyush/#/gsoc",
                },
            },
            {
                name: "Kushagra Sharma",
                project:
                    "CPDB support for application print dialogs: Firefox, Chromium, LibreOffice, etc.",
                slug: "CPDB-support-for-application-print-dialogs",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2023/projects/NO5z8yiB",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK or Qt", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "MIT, GPL-2+ and LGPL-2+",
                socials: {
                    github: "kushagra20251",
                },
            },
        ],
    },

    {
        year: 2024,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2024/organizations/open-printing",
        contributors: [
            {
                name: "Uddhav Phatak",
                project:
                    "Replace QPDF by PDFio as PDF manipulation library in libcupsfilters",
                slug: "Replace-QPDF-by-PDFio-as-PDF-manipulation-library-in-libcupsfilters",
                mentors: ["Till Kamppeter", "Michael Sweet", "Ira McDonald"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/UddhavPhatak",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "uddhavphatak",
                    medium: "https://medium.com/@uddhavphatak",
                },
            },
            {
                name: "Kushagra Sharma",
                project:
                    "Desktop integration: CPDB support for print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice",
                slug: "Desktop-integration-cpdb-support",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/KushagraSharma",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK or Qt", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "MIT, GPL-2+ and LGPL-2+",
                socials: {
                    github: "kushagra20251",
                },
            },
            {
                name: "Shivam Jaiswal",
                project:
                    "Desktop Integration: Update system-config-printer for the New Architecture of printing",
                slug: "Desktop-Integration-system-config-printer",
                mentors: ["Till Kamppeter", "Zdenek Dohnal"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/ShivamJaiswal",
                codeUrl: "",
                desiredKnowledge: ["Python", "C", "CUPS"],
                codeLicense: "GPL-2+",
                socials: {
                    github: "TheJayas",
                },
            },
            {
                name: "Arun Patwa",
                project:
                    "Converting Braille embosser support into a Printer Application",
                slug: "Converting-Braille-embosser-support-into-a-Printer-Application",
                mentors: ["Till Kamppeter", "Samuel Thibault", "Chandresh Soni"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/ArunPatwa",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "Shell", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "arunpatwa",
                },
            },
            {
                name: "Biswadeep Purkayastha",
                project:
                    "Desktop integration: CPDB support for print dialogs of Mozilla (Thunderbird/Firefox) and LibreOffice",
                slug: "Desktop-integration-cpdb-support",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/BiswadeepPurkayastha",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK or Qt", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "MIT, GPL-2+ and LGPL-2+",
                socials: {
                    github: "metabiswadeep",
                    medium: "https://medium.com/@bpdps95",
                },
            },
            {
                name: "Ankit Pal Singh",
                project: "Make a native Printer Application from Gutenprint",
                slug: "Turn-cups-browsed-into-a-Printer-Application",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/AnkitPalSingh",
                codeUrl: "",
                desiredKnowledge: ["C", "PAPPL", "CUPS"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "Ankit3002",
                },
            },
            {
                name: "Rudra Pratap Singh",
                project:
                    "Official OCI containers (Docker, ROCKs, podman, ...) of CUPS and Printer Applications",
                slug: "Official-OCI-containers-Docker-ROCKs-podman-of-CUPS-and-Printer-Applications",
                mentors: ["Till Kamppeter"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/RudraPratapSingh",
                codeUrl: "",
                desiredKnowledge: ["Shell", "Python", "packaging", "GIT"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "rudra-iitm",
                    website: "https://rudra-iitm.github.io/",
                    medium: "https://medium.com/@rudransh.iitm",
                },
            },
            {
                name: "Kaushik Veeraraghavan",
                project:
                    "Desktop Integration: User interfaces for using OAuth2 with printers and scanners",
                slug: "Desktop-Integration-oauth2",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/K_V",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK or Qt", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "Apache 2.0, MIT, GPL-2+ and LGPL-2+",
                socials: {
                    github: "Kaushik1216",
                    medium: "https://medium.com/@kaushik.vishwakarma2003",
                },
            },
            {
                name: "ttfish",
                project:
                    "Integrating C-based OpenPrinting projects in OSS-Fuzz testing",
                slug: "Integrating-C-based-OpenPrinting-projects-in-OSS-Fuzz-testing",
                mentors: ["Till Kamppeter", "George-Andrei Iosif"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/ttfish",
                codeUrl: "",
                desiredKnowledge: ["C", "fuzzing"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "fish98",
                },
            },
            {
                name: "Akarshan Kapoor",
                project: "CI Testing programs for libpappl-retrofit and libppd",
                slug: "CI-Testing-programs-for-libpappl-retrofit-and-libppd",
                mentors: ["Till Kamppeter", "Michael Sweet"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2024/projects/AkarshanKapoor",
                codeUrl: "",
                desiredKnowledge: ["C", "Shell", "PAPPL", "CUPS", "CI"],
                codeLicense: "Apache 2.0",
                socials: {
                    github: "Kappuccino111",
                    devto: "https://dev.to/kappuccino111",
                },
            },
        ],
    },

    {
        year: 2025,
        orgUrl:
            "https://summerofcode.withgoogle.com/archive/2025/organizations/the-linux-foundation",
        contributors: [
            {
                name: "Zixuan Liu",
                project:
                    "Utilizing OSS-Fuzz-Gen to improve fuzz testing for OpenPrinting projects",
                slug: "Utilizing-OSS-Fuzz-Gen-to-improve-fuzz-testing-for-OpenPrinting-projects",
                mentors: [
                    "Till Kamppeter",
                    "Shivam Mishra",
                    "Dongge Liu",
                    "Oliver Chang",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/gRbcUkWB",
                codeUrl: "",
                desiredKnowledge: ["C", "Python", "fuzz-testing"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "pushinl",
                },
            },
            {
                name: "Rudra Pratap Singh",
                project: "Modernize OpenPrinting Website with Next.js",
                slug: "Modernize-OpenPrinting-Website-with-Next-js",
                mentors: [
                    "Till Kamppeter",
                    "Zdenek Dohnal",
                    "Akarshan Kapoor",
                    "Shivam Mishra",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/YEV4FNMy",
                codeUrl: "",
                desiredKnowledge: ["TypeScript", "Next.js", "React"],
                codeLicense: "MIT",
                socials: {
                    github: "rudra-iitm",
                    website: "https://rudra-iitm.github.io/",
                    medium: "https://medium.com/@rudransh.iitm",
                },
            },
            {
                name: "Tarun Srivastava",
                project: "KDE Print Manager vs. CUPS 3.x",
                slug: "KDE-Print-Manager-vs-CUPS-3-x",
                mentors: ["Till Kamppeter", "Mike Noe"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/VON8sRJK",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "KDE/Qt", "UI Design"],
                codeLicense: "GPL 2.0 or later and LGPL 2.0 or later",
                socials: {
                    github: "Lord-Morpheus",
                },
            },
            {
                name: "Soumyadeep Ghosh",
                project:
                    "Port pyCUPS to CUPS 3.x API + apply the new pyCUPS to system-config-printer",
                slug: "Port-pyCUPS-to-CUPS-3-x-API-apply-the-new-pyCUPS-to-system-config-printer",
                mentors: ["Till Kamppeter", "Zdenek Dohnal"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/S3e2JPY8",
                codeUrl: "",
                desiredKnowledge: ["Python", "C", "CUPS"],
                codeLicense: "GPL-2+",
                socials: {
                    github: "soumyaDghosh",
                    website: "https://soumyadghosh.github.io/website/",
                    githubPages:
                        "https://soumyadghosh.github.io/website/interns/gsoc-2025/gsoc-final-submission",
                    linkedin: "https://www.linkedin.com/in/soumyadghosh/",
                    x: "https://x.com/s0umyad",
                    mastodon: "https://mastodon.social/@soumyadghosh",
                },
            },
            {
                name: "Sanskar",
                project:
                    "Image output evaluation for testing of print/scan job processing",
                slug: "Image-output-evaluation-for-testing-of-print-scan-job-processing",
                mentors: [
                    "Till Kamppeter",
                    "Shivam Mishra",
                    "Dongge Liu",
                    "Oliver Chang",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/aFApa0Ws",
                codeUrl: "",
                desiredKnowledge: ["C", "Go", "image processing", "computer vision", "OCR"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "Sanskary2303",
                },
            },
            {
                name: "Titiksha Bansal",
                project: "Rust bindings for libcups2/3",
                slug: "Rust-bindings-for-libcups2-3",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/Z88JfqZq",
                codeUrl: "",
                desiredKnowledge: ["Python", "C", "CUPS"],
                codeLicense: "GPL-2+",
                socials: {
                    github: "TitikshaBansal",
                },
            },
            {
                name: "Yash Raj Singh",
                project:
                    "GTK Print Dialog: Modern dialog with built-in preview in main view",
                slug: "GTK-Print-Dialog",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/HcP5bOK2",
                codeUrl: "",
                desiredKnowledge: ["C", "GTK/GNOME", "UI Design"],
                codeLicense: "LGPL-2 or later and LGPL-2.1 or later",
                socials: {
                    github: "vididvidid",
                },
            },
            {
                name: "Kaushik Veeraraghavan",
                project:
                    "GNOME Control Center: List and handle IPP print services for the New Architecture",
                slug: "GNOME-Control-Center-List-and-handle-IPP-print-services-for-the-New-Architecture",
                mentors: ["Till Kamppeter", "Shivam Mishra", "Mohit Verma"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/PTiuC47E",
                codeUrl: "",
                desiredKnowledge: ["C/C++", "GTK", "DNS-SD/Avahi", "CUPS/IPP"],
                codeLicense: "GPL-2+ and LGPL-2+",
                socials: {
                    github: "Kaushik1216",
                    medium: "https://medium.com/@kaushik.vishwakarma2003",
                },
            },
            {
                name: "Mohammed Imaduddin",
                project:
                    "Integrating OSS-Fuzz for Go-based and Python-based OpenPrinting projects",
                slug: "Integrating-OSS-Fuzz-for-Go-based-and-Python-based-OpenPrinting-projects",
                mentors: [
                    "Till Kamppeter",
                    "Shivam Mishra",
                    "Dongge Liu",
                    "Oliver Chang",
                ],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/rBWHXaha",
                codeUrl: "",
                desiredKnowledge: ["Python", "Go", "fuzz-testing"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "mdimado",
                },
            },
            {
                name: "Mintu Gogoi",
                project: "Rust bindings for libcups2/3",
                slug: "Rust-bindings-for-libcups2-3",
                mentors: ["Till Kamppeter", "Gaurav Guleria"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/Vxc0sLQU",
                codeUrl: "",
                desiredKnowledge: ["Python", "C", "CUPS"],
                codeLicense: "GPL-2+",
                socials: {
                    github: "Gmin2",
                },
            },
            {
                name: "Hubert Guan",
                project: "Port CUPS and Printer Applications to Zephyr",
                slug: "Port-CUPS-and-Printer-Applications-to-Zephyr",
                mentors: ["Till Kamppeter", "Iuliana Prodan"],
                projectUrl:
                    "https://summerofcode.withgoogle.com/archive/2025/projects/f9CKDFJW",
                codeUrl: "",
                desiredKnowledge: ["C", "Zephyr", "USB", "network"],
                codeLicense: "Apache 2.0, MIT",
                socials: {
                    github: "HubertYGuan",
                    githubPages: "https://hubertyguan.github.io/GSoC-2025/posts/final/",
                },
            },
        ],
    },
];

export function getContributorsByYear(year: number): GsocContributor[] {
    const yearData = gsocContributors.find((y) => y.year === year);
    return yearData?.contributors ?? [];
}

export function getOrgUrlByYear(year: number): string {
    const yearData = gsocContributors.find((y) => y.year === year);
    return yearData?.orgUrl ?? "";
}

export function getContributorsBySlug(
    year: number,
    slug: string,
): GsocContributor[] {
    const yearData = gsocContributors.find((y) => y.year === year);
    return (
        yearData?.contributors.filter((c) => c.slug === slug) ?? []
    );
}

export function getAllContributors(): GsocYearContributors[] {
    return gsocContributors;
}

export function getContributorYears(): number[] {
    return gsocContributors.map((y) => y.year).sort((a, b) => b - a);
}

export function getContributorImageSrc(
    contributor: GsocContributor,
): string | undefined {
    if (contributor.image) {
        return contributor.image;
    }

    if (contributor.socials?.github) {
        return `https://github.com/${contributor.socials.github}.png`;
    }

    return undefined;
}

export const mentorImages: Record<string, string> = {
    "Till Kamppeter": "/authors/till-kamppeter.jpg",
    "Michael Sweet": "/authors/michael-sweet.jpg",
    "Michael R Sweet": "/authors/michael-sweet.jpg",
    "Aveek Basu": "/authors/aveek-basu.jpg",
};

export default gsocContributors;
