export interface WebsiteContributor {
  github: string;
  name?: string;
  role?: string;
  linkedin?: string;
  website?: string;
  featured?: boolean;
}

const websiteContributors: WebsiteContributor[] = [
  {
    github: "rudra-iitm",
    name: "Rudra Pratap Singh",
    role: "UI, theming, comments, and the printer/driver lookup",
    linkedin: "https://www.linkedin.com/in/rudra-iitm/",
    featured: true,
  },
  {
    github: "gativarshney",
    name: "Gati Varshney",
    role: "Author system, content migration, site search, and the homepage",
    linkedin: "https://linkedin.com/in/gativarshney",
  },
  {
    github: "sam-shubham",
    name: "Sam Shubham",
    role: "GSoC pages, teaser images, and deployment fixes",
    linkedin: "https://in.linkedin.com/in/samshubham",
    website: "https://sam.appambient.com",
  },
  {
    github: "harshvns",
    name: "Harsh Upadhyay",
    role: "Extended site search to docs, projects, and pages",
    linkedin: "https://www.linkedin.com/in/harsh-upadhyay-46b99a247/",
  },
  {
    github: "ishpreet404",
    name: "Ishpreet Singh",
    role: "Routes, assets, data, and blog navigation fixes",
    linkedin: "https://www.linkedin.com/in/ishpreet404/",
    website: "https://www.ishpreetsingh.in/",
  },
]

export default websiteContributors
