export type AuthorLinkKind =
  | "website"
  | "linkedin"
  | "mastodon"
  | "launchpad"
  | "other";

export interface AuthorLink {
  label: string;
  href: string;
  kind?: AuthorLinkKind;
}

export interface Author {
  key: string;
  name: string;
  role?: string;
  location?: string;
  email?: string;
  github?: string;
  links?: AuthorLink[];
  image?: string;
}


const authors: Author[] = [
  {
    key: "Till",
    name: "Till Kamppeter",
    role: "OpenPrinting Project Leader",
    location: "Vienna, Austria",
    email: "mailto:till.kamppeter@gmail.com",
    github: "https://github.com/tillkamppeter",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/kamppetertill", kind: "linkedin" },
      { label: "Mastodon", href: "https://ubuntu.social/@till", kind: "mastodon" },
      { label: "Launchpad", href: "https://launchpad.net/~till-kamppeter", kind: "launchpad" },
    ],
    image: "/authors/till-kamppeter.jpg",
  },
  {
    key: "Mike",
    name: "Michael Sweet",
    role: "Author of CUPS and PAPPL",
    location: "Canada",
    github: "https://github.com/michaelrsweet",
    links: [
      { label: "Website", href: "https://www.msweet.org/", kind: "website" },
    ],
    image: "/authors/michael-sweet.jpg",
  },
  {
    key: "Aveek",
    name: "Aveek Basu",
    role: "OpenPrinting Program Manager",
    location: "Kolkata, India",
    email: "mailto:basu.aveek@gmail.com",
    github: "https://github.com/AveekBasu",
    image: "/authors/aveek-basu.jpg",
  },
  {
    key: "Dheeraj",
    name: "Dheeraj",
    role: "Sub Coordinator, Programming Club, IIT Mandi",
    location: "Mandi, 175001, India",
    email: "mailto:dhirajyadav135@gmail.com",
    github: "https://github.com/dheeraj135",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dheeraj135/", kind: "linkedin" },
    ],
    image: "/authors/dheeraj135.jpg",
  },
  {
    key: "Zdenek",
    name: "Zdenek Dohnal",
    role: "Member of CUPS Release Managers group, RHEL/CentOS Stream/Fedora CUPS maintainer",
    location: "Brno, Czech Republic",
    github: "https://github.com/zdohnal",
    image: "/authors/placeholder.jpg",
  },
  {
    key: "CNihelton",
    name: "Carlos Nihelton",
    role: "Software Engineer at Canonical's Ubuntu WSL Team",
    location: "Campinas, Brazil",
    email: "mailto:carlosnsoliveira@gmail.com",
    github: "https://github.com/CarlosNihelton",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/carlos-nihelton", kind: "linkedin" },
      { label: "Launchpad", href: "https://launchpad.net/~cnihelton", kind: "launchpad" },
    ],
    image: "/authors/cnihelton.jpg",
  },
  {
    key: "Rudra",
    name: "Rudra Pratap Singh",
    role: "OpenPrinting Contributor",
    github: "https://github.com/rudra-iitm",
    image: "/authors/rudra-singh.jpg",
    email: "mailto:rudransh.iitm@gmail.com",
    location: "Varanasi, India",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/rudra-iitm/", kind: "linkedin" },
    ],
  },
  {
    key: "Gati",
    name: "Gati Varshney",
    role: "OpenPrinting Contributor",
    github: "https://github.com/gativarshney",
    image: "/authors/gati-varshney.jpg",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/gativarshney", kind: "linkedin" },
    ],
  },
  {
    key: "Sam",
    name: "Sam Shubham",
    role: "OpenPrinting Contributor",
    github: "https://github.com/sam-shubham",
    image: "/authors/sam-shubham.jpg",
    links: [
      { label: "LinkedIn", href: "https://in.linkedin.com/in/samshubham", kind: "linkedin" },
      { label: "Website", href: "https://sam.appambient.com", kind: "website" },
    ],
  },
  {
    key: "Harsh",
    name: "Harsh Upadhyay",
    role: "OpenPrinting Contributor",
    github: "https://github.com/harshvns",
    image: "/authors/harsh-upadhyay.jpg",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-upadhyay-46b99a247/", kind: "linkedin" },
    ],
  },
  {
    key: "Ishpreet",
    name: "Ishpreet Singh",
    role: "OpenPrinting Contributor",
    github: "https://github.com/ishpreet404",
    image: "/authors/ishpreet-singh.jpg",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ishpreet404/", kind: "linkedin" },
      { label: "Website", href: "https://www.ishpreetsingh.in/", kind: "website" },
    ],
  },
];

export default authors;
