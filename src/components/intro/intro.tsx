import Link from "next/link";

import styles from "./intro.module.scss";

export default function Intro() {
  return (
    <section className={styles.intro}>
      <p className={styles.pretitle}>Hi! I am</p>
      <h1 className={styles.title}>Aurélien Garnier</h1>
      <p className={styles.subtitle}>That’s /ɔ.ʁe.ljɛ̃/</p>

      <p className={styles.headline}>
        Backend engineer with 10+ years of TypeScript experience building
        frontend-facing APIs and data pipelines.
      </p>
      <p className={styles.focus}>
        APIs · Data pipelines · Cloud infrastructure · Web3
      </p>

      <div className={styles.actions}>
        <a href="mailto:contact@garnier.dev" className={styles.primary}>
          Get in touch
        </a>
        <Link href="/blog" className={styles.secondary}>
          Read the blog
        </Link>
      </div>
    </section>
  );
}
