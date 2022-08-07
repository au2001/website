import * as React from "react"

import Header from "/src/components/header.tsx"
import Timeline from "/src/components/index/timeline.tsx"
import Clients from "/src/components/index/clients.tsx"
import Interview from "/src/components/index/interview.tsx"
import Footer from "/src/components/footer.tsx"

import * as styles from "./index.module.scss"

export default function IndexPage() {
  return (
    <>
      <title>Aurélien Garnier</title>

      <div className={styles.fold}>
        <div className={styles.heading}>
          <h1 className={styles.preHeading}>
            Hi! I am
          </h1>

          <h1 className={styles.mainHeading}>
            Aurélien Garnier
          </h1>

          <p className={styles.subHeading}>
            That’s /ɔ.ʁe.ljɛ̃/
          </p>
        </div>

        <Timeline />

        <div className={styles.spacer}></div>
      </div>

      <Clients />

      <div className={styles.spacer}></div>

      <Interview />

      <div className={styles.spacer}></div>

      <Footer />
    </>
  )
}
