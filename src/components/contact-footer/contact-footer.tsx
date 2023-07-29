import Link from "next/link";
import SocialIcon from "@/components/social-icon/social-icon";
import socialsData from "@/data/socials.json";

import AngleRightIcon from "@/lib/icons/angle-right.svg";

import styles from "./contact-footer.module.scss";

export default function ContactFooter() {
  return (
    <>
      <h1 className={styles.heading}>Getting in touch</h1>

      <ul className={styles.socials}>
        {socialsData
          .filter((social) => social.footer)
          .map((social, i) => (
            <SocialIcon key={i} social={social} />
          ))}
      </ul>

      <p className={styles.link}>
        <Link href="/contact">
          See all my socials
          <AngleRightIcon className={styles.icon} />
        </Link>
      </p>
    </>
  );
}
