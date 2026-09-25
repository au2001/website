import React from "react";

import styles from "./footer.module.scss";

export default function Footer({
  note,
  children,
}: React.PropsWithChildren<{ note?: React.ReactNode }>) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={
        children !== undefined
          ? `${styles.footer} ${styles.expanded}`
          : styles.footer
      }
    >
      {children}

      <div className={styles.bar}>
        <p>
          Copyright &copy; 2001&ndash;{year} by Aurélien Garnier. All rights
          reserved.
        </p>
        <p>
          {note ?? <a href="mailto:contact@garnier.dev">contact@garnier.dev</a>}
        </p>
      </div>
    </footer>
  );
}
