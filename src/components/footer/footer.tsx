import React from "react";

import styles from "./footer.module.scss";

export default function Footer() {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy; 2001-{year} by Aurélien Garnier. All rights reserved.
      </p>
    </footer>
  );
}
