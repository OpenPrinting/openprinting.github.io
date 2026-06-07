export interface ConferenceEdition {
  edition: string;
  year: number;
  venue: string;
  location: string;
  dates: string;
  upcoming?: boolean;
  scheduleUrl?: string;
  recapUrl?: string;
  summary?: string;
}

export const opportunityOpenSource = {
  name: "Opportunity Open Source",
  shortName: "OOSC",
  linkedin: "https://www.linkedin.com/company/opportunityopensource/",
  mission:
    "Opportunity Open Source is a conference held every year at a university or institute in India to showcase free and open source software (FOSS) and to motivate students, professors, and researchers to take part in its development — by contributing code, design, documentation, and more. Each edition features talks and hands-on workshops across a wide range of FOSS topics, and often a hackathon. To give people all over India the chance to take part, every edition is held at a different location.",
  origin:
    "It grew out of the wish of OpenPrinting's Till Kamppeter and Aveek Basu to meet their Google Summer of Code contributors in person and to motivate more people to join the free and open source software community. The conferences have since become a major source of new OpenPrinting and GSoC contributors.",
} as const;

export const editions: ConferenceEdition[] = [
  {
    edition: "4.0",
    year: 2026,
    venue: "IIIT Allahabad",
    location: "Prayagraj, Uttar Pradesh, India",
    dates: "August 28–30, 2026",
    upcoming: true,
    recapUrl: "/OpenPrinting-News-Opportunity-Open-Source-4.0/",
    summary:
      "The fourth edition, hosted together with the Google Developer Group (GDG) at IIIT Allahabad.",
  },
  {
    edition: "3.0",
    year: 2025,
    venue: "IIT Kanpur",
    location: "Kanpur, India",
    dates: "September 5–7, 2025",
    scheduleUrl: "https://events.canonical.com/event/134/timetable/",
    recapUrl: "/OpenPrinting-News-Opportunity-Open-Source-3.0-in-the-IIT-Kanpur,-India/",
    summary:
      "A return to Kanpur with a wide range of sessions on FOSS, OpenPrinting, AI/ML and more, plus a hackathon day.",
  },
  {
    edition: "2.0",
    year: 2024,
    venue: "IIT Kanpur",
    location: "Kanpur, India",
    dates: "August 24–26, 2024",
    scheduleUrl: "https://events.canonical.com/event/89/",
    recapUrl: "/OpenPrinting-News-August-2024/#opportunity-open-source-in-iit-kanpur",
    summary:
      "The second edition, with around 50 sessions and a 12-hour hackathon on the final day.",
  },
  {
    edition: "1.0",
    year: 2023,
    venue: "IIT Mandi",
    location: "Mandi, India",
    dates: "September 2023",
    scheduleUrl: "https://events.canonical.com/event/35/",
    recapUrl: "/OpenPrinting-News-September-2023/#opportunitiy-open-source-in-the-iit-mandi-india",
    summary:
      "The first edition, where about a hundred students of IIT Mandi joined the talks and workshops.",
  },
];
