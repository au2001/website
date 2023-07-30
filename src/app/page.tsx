import Background from "@/components/background/background";
import Header from "@/components/header/header";
import Title from "@/components/title/title";
import Timeline from "@/components/timeline/timeline";
import Clients from "@/components/clients/clients";
import Interview from "@/components/interview/interview";
import ContactFooter from "@/components/contact-footer/contact-footer";
import Footer from "@/components/footer/footer";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Background />

      <div className={styles.fold}>
        <Header />

        <Title
          pretitle="Hi! I am"
          title="Aurélien Garnier"
          subtitle="That’s /ɔ.ʁe.ljɛ̃/"
          center
        />

        <Timeline />

        <div className={styles.spacer}></div>
      </div>

      <Clients />

      <div className={styles.spacer}></div>

      <Interview />

      <div className={styles.spacer}></div>

      <ContactFooter />

      <div className={styles.spacer}></div>

      <Footer />
    </>
  );
}
