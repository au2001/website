import * as React from "react";

import Timeline from "../components/index/timeline";
import Clients from "../components/index/clients";
import Interview from "../components/index/interview";
import Footer from "../components/footer";
import Background from "../components/background";

import * as styles from "./index.module.scss";

export default function IndexPage() {
  return (
    <>
      <Background />

      <div className={styles.fold}>
        <div className={styles.heading}>
          <h1 className={styles.preHeading}>Hi! I am</h1>

          <h1 className={styles.mainHeading}>Aurélien Garnier</h1>

          <p className={styles.subHeading}>That’s /ɔ.ʁe.ljɛ̃/</p>
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
  );
}

export function Head() {
  return <title>Aurélien Garnier</title>;
}
