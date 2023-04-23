import * as React from "react";
import { Link } from "gatsby";

import * as styles from "./404.module.scss";

export default function NotFoundPage() {
  return (
    <>
      <title>Not found</title>

      <div className={styles.error}>
        <h1 className={styles.heading}>404 - Page not found!</h1>
        <p className={styles.paragraph}>
          Sorry, we couldn’t find what you were looking for.
          <br />
          <br />
          <Link to="/">Go home</Link>.
        </p>
      </div>
    </>
  );
}
