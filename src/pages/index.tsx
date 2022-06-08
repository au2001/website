import * as React from "react"

import * as styles from "../styles/index.module.scss"

export default function IndexPage() {
  return (
    <main className={styles.page}>
      <title>Home Page</title>
      <h1 className={styles.heading}>
        Hello,
        <br />
        <span className={styles.headingAccent}>World! </span>
        🎉
      </h1>
    </main>
  )
}
