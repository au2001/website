import Timeline from "./components/timeline/timeline";
import Clients from "./components/clients/clients";
import Interview from "./components/interview/interview";
import Background from "@/components/background/background";
import Footer from "@/components/footer/footer";

import styles from "./page.module.scss";

export default function Home() {
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
