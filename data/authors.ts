export interface Author {
  key: string;
  name: string;
  role?: string;
  location?: string;
  email?: string;
  github?: string;
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
    image: "/authors/till-kamppeter.jpg",
  },
  {
    key: "Mike",
    name: "Michael Sweet",
    role: "Author of CUPS and PAPPL",
    location: "Canada",
    github: "https://github.com/michaelrsweet",
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
    image: "/authors/cnihelton.jpg",
  },
];

export default authors;
