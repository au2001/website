export interface Project {
  title: string;
  subtitle: string;
  dates: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "profanity2",
    subtitle: "Ethereum vanity address generator",
    dates: "2026 · Side project",
    description:
      "A fork of 1inch’s generator with a web UI to orchestrate rented GPUs.",
  },
  {
    title: "iCloud Passwords for Firefox",
    subtitle: "Browser add-on",
    dates: "2023 · Open source",
    description: "An open-source add-on to use iCloud Passwords in Firefox.",
  },
  {
    title: "Efrei Paris",
    subtitle: "Engineering degree in Computer Science",
    dates: "2018 — 2023",
    description: "Majors in Cloud Architecture & DevOps.",
  },
];

export default projects;
