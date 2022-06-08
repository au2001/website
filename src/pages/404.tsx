import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./404.module.scss"

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <title>Not found</title>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.paragraph}>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code className={styles.code}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}
