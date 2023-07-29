import Background from "@/components/background/background";
import Header from "@/components/header/header";
import ContactSection from "@/components/contact-section/contact-section";
import Footer from "@/components/footer/footer";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Background />

      <Header />

      <div className={styles.heading}>
        <h1 className={styles.preHeading}>Hi! I am</h1>

        <h1 className={styles.mainHeading}>Aurélien Garnier</h1>

        <p className={styles.subHeading}>That’s /ɔ.ʁe.ljɛ̃/</p>
      </div>

      <div className={styles.spacer}></div>

      <ContactSection
        title="See what I’m working on..."
        description="I’m most active on the following platforms. Check out the projects I’m contributing to these days."
        type="work"
      />

      <div className={styles.spacer}></div>

      <ContactSection
        title="Reach out to me..."
        description="You can contact me on through the following channels. I’d be happy to answer any questions or to hear about new opportunities."
        type="contact"
      />

      <div className={styles.spacer}></div>

      <ContactSection
        title="Follow me on socials..."
        description="I rarely post publicly about my hobbies, but here are my accounts on various social media where I do."
        type="social"
      />

      <div className={styles.spacer}></div>

      <ContactSection
        title="Or donate to support my work"
        description="If I helped you on a task or if you really liked one of my creations, feel free to buy me a pizza. Never required, always appreciated."
        type="donate"
      />

      <div className={styles.spacer}></div>

      <Footer />
    </>
  );
}
