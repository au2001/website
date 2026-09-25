import { Metadata } from "next";

import Header from "@/components/header/header";
import PageHeader from "@/components/page-header/page-header";
import ContactSection from "@/components/contact-section/contact-section";
import Footer from "@/components/footer/footer";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <Header bordered />

      <main className={styles.main}>
        <PageHeader pretitle="Hi! I am" title="Aurélien Garnier">
          <p className={styles.subtitle}>That’s /ɔ.ʁe.ljɛ̃/</p>
        </PageHeader>

        <ContactSection
          title="See what I’m working on…"
          description="I’m most active on the following platforms. Check out the projects I’m contributing to these days."
          type="work"
        />

        <ContactSection
          title="Reach out to me…"
          description="You can contact me through the following channels. I’d be happy to answer any questions or to hear about new opportunities."
          type="contact"
        />

        <ContactSection
          title="Follow me on socials…"
          description="I rarely post publicly about my hobbies, but here are my accounts on various social media where I do."
          type="social"
        />

        <ContactSection
          title="Or donate to support my work"
          description="If I helped you on a task or if you really liked one of my creations, feel free to buy me a pizza. Never required, always appreciated."
          type="donate"
        />
      </main>

      <Footer />
    </>
  );
}
