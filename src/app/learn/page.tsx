import Background from "@/components/background/background";
import Header from "@/components/header/header";
import Title from "@/components/title/title";
import LearnLink from "@/components/learn-link/learn-link";
import Footer from "@/components/footer/footer";

import learnPages from "@/data/learn";

import styles from "./page.module.scss";

export default function Learn() {
  return (
    <>
      <Background />

      <Header />

      <div className={styles.spacer}></div>

      <Title pretitle="Follow the journey of..." title="How I learn stuff" />

      <div className={styles.spacer}></div>

      {Object.values(learnPages).map((page) => (
        <LearnLink key={page.attributes.slug} page={page} />
      ))}

      <div className={styles.spacer}></div>

      <Footer />
    </>
  );
}
