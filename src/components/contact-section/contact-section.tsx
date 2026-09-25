import SocialCard from "@/components/social-card/social-card";
import socialsData from "@/data/socials.json";

import styles from "./contact-section.module.scss";

export default function ContactSection({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) {
  return (
    <section
      className={styles.section}
      id={type}
      aria-labelledby={`${type}-title`}
    >
      <h2 className={styles.heading} id={`${type}-title`}>
        {title}
      </h2>
      <p className={styles.description}>{description}</p>

      <ul className={styles.socials}>
        {socialsData
          .filter((social) => social.type === type)
          .map((social) => (
            <li key={social.name}>
              <SocialCard social={social} />
            </li>
          ))}
      </ul>
    </section>
  );
}
