import React from "react";

import styles from "./page-header.module.scss";

export default function PageHeader({
  pretitle,
  title,
  children,
}: React.PropsWithChildren<{ pretitle?: string; title: string }>) {
  return (
    <header className={styles.header}>
      {pretitle !== undefined && <p className={styles.pretitle}>{pretitle}</p>}
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  );
}
