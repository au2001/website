"use client";

import Link from "next/link";

import styles from "./error.module.scss";

export default function Error() {
  return (
    <div className={styles.error}>
      <h1 className={styles.heading}>404 - Page not found!</h1>
      <p className={styles.paragraph}>
        Sorry, we couldn’t find what you were looking for.
        <br />
        <br />
        <Link href="/">Go home</Link>.
      </p>
    </div>
  );
}
