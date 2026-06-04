export interface GsocProjectMentors {
    slug: string;
    mentors: string[];
}

export interface GsocYearMentors {
    year: number;
    projects: GsocProjectMentors[];
}

const gsocMentors: GsocYearMentors[] = [
    {
        year: 2026,
        projects: [
            {
                slug: "system-config-printer-vs-CUPS-3-x",
                mentors: ["Till Kamppeter", "Soumyadeep Ghosh", "Zdenek Dohnal"],
            },
            {
                slug: "COSMIC-Desktop",
                mentors: ["Till Kamppeter", "Michael Murphy", "Mintu Gogoi", "Titiksha Bansal"],
            },
            {
                slug: "KDE-Print-Manager",
                mentors: ["Till Kamppeter", "Mike Noe"],
            },
            {
                slug: "AI-Driven-Printer-Compatibility-and-Recommendation-Portal-data-intelligence-ml-pipeline",
                mentors: ["Rudra Pratap Singh", "Till Kamppeter"],
            },
            {
                slug: "AI-Driven-Printer-Compatibility-and-Recommendation-Portal-web-interface",
                mentors: ["Rudra Pratap Singh", "Till Kamppeter"],
            },
            {
                slug: "Automated-and-LLM-Assisted-Fuzz-Harness-Generation-for-OpenPrinting-Projects",
                mentors: ["Till Kamppeter", "Jiongchi Yu", "Zixuan Liu"],
            },
            {
                slug: "System-Level-Fuzzing-for-Parsing-Features-in-OpenPrinting-Projects",
                mentors: ["Till Kamppeter", "Jiongchi Yu", "Günther Noack"],
            },
            {
                slug: "Fuzz-Test-go-cpython",
                mentors: ["Till Kamppeter", "Jiongchi Yu"],
            },
            {
                slug: "Extend-PDFio-to-be-a-PDF-renderer-displayer",
                mentors: ["Till Kamppeter", "Michael Sweet", "Ira McDonald"],
            },
            {
                slug: "Porting-OpenPrinting-Software-to-Zephyr",
                mentors: ["Iuliana Prodan", "Hubert Guan", "Akarshan Kapoor", "Till Kamppeter"],
            },
            {
                slug: "Build-a-Full-Print-System-Testing-Pipeline",
                mentors: ["Till Kamppeter"],
            },
            {
                slug: "Validation-of-the-IANA-IPP-Registrations-Database",
                mentors: ["Till Kamppeter"],
            },
            {
                slug: "Cloud-Native-Packaging-for-CUPS-and-Printer-Applications",
                mentors: ["Kyle Yu", "Mohammad Ali", "Sonali Srivastava", "Till Kamppeter"],
            },
            {
                slug: "CI-Testing-programs-for-libpappl-retrofit-and-libppd",
                mentors: ["Till Kamppeter", "Michael Sweet"],
            },
            {
                slug: "cups-filters",
                mentors: ["Till Kamppeter", "Sahil Arora", "Dheeraj Yadav"],
            },
        ],
    },
];

export function getMentorsBySlug(year: number, slug: string): string[] {
    const yearData = gsocMentors.find((y) => y.year === year);
    const project = yearData?.projects.find((p) => p.slug === slug);
    return project?.mentors ?? [];
}

export function getMentorsByYear(year: number): GsocProjectMentors[] {
    const yearData = gsocMentors.find((y) => y.year === year);
    return yearData?.projects ?? [];
}

export default gsocMentors;
