import SocialIcon from "@/components/social-icon/social-icon";
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
    <>
      <h1 className={styles.heading} id={type}>
        {title}
      </h1>
      <p className={styles.description}>{description}</p>

      <ul className={styles.socials}>
        {socialsData
          .filter((social) => social.type === type)
          .map((social, i) => (
            <SocialIcon key={i} social={social} />
          ))}
      </ul>
    </>
  );
}
