import projects from "@/data/projects";

import styles from "./projects.module.scss";

export default function Projects() {
  return (
    <section className={styles.projects} aria-labelledby="projects-title">
      <h2 id="projects-title" className={styles.heading}>
        Side projects &amp; education
      </h2>

      <ul className={styles.cards}>
        {projects.map((project) => (
          <li key={project.title} className={styles.card}>
            <p className={styles.dates}>{project.dates}</p>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.subtitle}>{project.subtitle}</p>
            <p className={styles.description}>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
