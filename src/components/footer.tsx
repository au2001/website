import * as React from "react";

import socialsData from "../data/socials";

import * as styles from "./footer.module.scss";

export default function Footer({ contact }: { contact?: boolean }) {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  function onAccountClick(social: any) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(social.account);
    } else {
      const elem = document.createElement("input");
      elem.value = social.account;
      document.body.appendChild(elem);
      elem.select();
      elem.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(elem);
    }

    alert(
      `My ${social.name} account is:\n${social.prefix || ""}${
        social.account
      }\n\nIt has been copied to your clipboard.`
    );
  }

  function getSocialIcon(social: any) {
    const img = (
      <img
        src={social.logo}
        alt={social.name}
        title={`${social.name}: ${social.prefix || ""}${social.account}`}
      />
    );

    return (
      <li key={social.name}>
        {social.link !== undefined ? (
          <a href={social.link} target="_blank" rel="nofollow external">
            {img}
          </a>
        ) : (
          <a onClick={() => onAccountClick(social)}>{img}</a>
        )}
      </li>
    );
  }

  return (
    <footer className={styles.footer}>
      {contact !== false && (
        <>
          <h1 className={styles.heading}>Please get in touch</h1>

          <ul className={styles.socials}>
            {socialsData.filter((social) => social.primary).map(getSocialIcon)}
          </ul>

          <ul className={styles.socials}>
            {socialsData.filter((social) => !social.primary).map(getSocialIcon)}
          </ul>
        </>
      )}

      <p>
        Copyright &copy; 2001-{year} by Aurélien Garnier. All rights reserved.
      </p>
    </footer>
  );
}
