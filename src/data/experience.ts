export interface Job {
  company: string;
  role: string;
  from: number;
  to?: number;
  description: string;
  stack: string[];
}

// Most recent first, without an end year for the current role
const experience: Job[] = [
  {
    company: "Usual Labs",
    role: "Technical Lead",
    from: 2024,
    description:
      "Leading the backend team behind the Usual and Fira protocols: APIs, incentive programs and protocol integrations.",
    stack: [
      "TypeScript (Nest.js)",
      "PostgreSQL",
      "REST",
      "The Graph",
      "Terraform",
      "Cloud Run",
      "Redis/Valkey",
    ],
  },
  {
    company: "Avicenne Studio",
    role: "Lead Software Engineer",
    from: 2022,
    to: 2024,
    description:
      "DeFi consulting: offchain indexing, cloud architecture on Google Cloud and AWS, and training the internal engineering team.",
    stack: [
      "TypeScript (Nest.js)",
      "PostgreSQL/TimescaleDB",
      "GraphQL",
      "Terraform",
      "Grafana",
      "Go",
    ],
  },
  {
    company: "SEPEFREI Junior-Enterprise",
    role: "Head of Information Systems",
    from: 2020,
    to: 2021,
    description:
      "Designed developer tools during a one-year mandate, and sat on the Board of Directors.",
    stack: [],
  },
  {
    company: "Freelance",
    role: "Fullstack Developer",
    from: 2018,
    to: 2022,
    description: "Helped startups build and scale their products.",
    stack: ["TypeScript/Node", "Kubernetes", "Ansible", "Terraform"],
  },
  {
    company: "ShadowAxe",
    role: "Co-founder & CTO",
    from: 2013,
    to: 2018,
    description: "Built and ran multiplayer video game servers.",
    stack: ["Java", "JavaScript/Node", "Docker", "PostgreSQL"],
  },
];

export default experience;
