import * as React from "react"
import { Link } from "gatsby"

import * as styles from "../styles/404.module.scss"

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <title>Not found</title>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.paragraph}>
        Sorry, we couldn’t find what you were looking for.
        <br />
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}
