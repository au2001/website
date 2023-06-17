import React from "react";

import SocialIcon from "@/components/social-icon/social-icon";
import socialsData from "@/data/socials.json";

import styles from "./footer.module.scss";

export default function Footer({ contact }: { contact?: boolean }) {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      {contact !== false && (
        <>
          <h1 className={styles.heading}>Please get in touch</h1>

          <ul className={styles.socials}>
            {socialsData
              .filter((social) => social.primary)
              .map((social, i) => (
                <SocialIcon key={i} social={social} />
              ))}
          </ul>

          <ul className={styles.socials}>
            {socialsData
              .filter((social) => !social.primary)
              .map((social, i) => (
                <SocialIcon key={i} social={social} />
              ))}
          </ul>
        </>
      )}

      <p>
        Copyright &copy; 2001-{year} by Aurélien Garnier. All rights reserved.
      </p>
    </footer>
  );
}
