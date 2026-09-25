import experience from "@/data/experience";

import styles from "./experience.module.scss";

export default function Experience() {
  return (
    <section
      id="experience"
      className={styles.experience}
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className={styles.heading}>
        Experience
      </h2>

      <ol className={styles.jobs}>
        {experience.map((job) => (
          <li
            key={job.company}
            className={
              job.to === undefined
                ? `${styles.job} ${styles.current}`
                : styles.job
            }
          >
            <p className={styles.dates}>
              {job.from} — {job.to ?? "Present"}
            </p>
            <h3 className={styles.title}>
              {job.company}
              <span className={styles.role}>
                <span className={styles.separator}> · </span>
                {job.role}
              </span>
            </h3>
            <p className={styles.description}>{job.description}</p>

            {job.stack.length > 0 && (
              <ul className={styles.stack} aria-label="Stack">
                {job.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
