import Link from "next/link";

import socialsData from "@/data/socials.json";

import styles from "./contact-cards.module.scss";

type Social = (typeof socialsData)[number];

// The socials shown in the footer, with the ways to contact me first
const socials = socialsData
  .filter(
    (social): social is Social & { link: string } =>
      social.footer === true && social.link !== undefined,
  )
  .sort((a, b) => Number(b.type === "contact") - Number(a.type === "contact"));

export default function ContactCards() {
  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title" className={styles.heading}>
        Getting in touch
      </h2>
      <p className={styles.description}>
        I’d be happy to answer any questions or to hear about new opportunities.
      </p>

      <ul className={styles.cards}>
        {socials.map((social) => (
          <li key={social.name}>
            <Link
              href={social.link}
              target={social.link.startsWith("http") ? "_blank" : undefined}
              rel="nofollow external noreferrer noopener"
              className={
                social.type === "contact"
                  ? `${styles.card} ${styles.primary}`
                  : styles.card
              }
            >
              <span className={styles.name}>{social.name}</span>
              <span className={styles.account}>
                {social.prefix}
                {social.account}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/contact" className={styles.all}>
        See all my socials →
      </Link>
    </section>
  );
}
