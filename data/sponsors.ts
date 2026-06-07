export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  level?: string;
  width?: number;
}

const sponsors: Sponsor[] = [
  {
    name: "Sovereign Tech Agency",
    logo: "/sponsors/sovereign-tech-agency.png",
    url: "https://www.sovereign.tech/",
    level: "Platinum Member",
    width: 210,
  },
];

export default sponsors;
