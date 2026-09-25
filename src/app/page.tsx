import Background from "@/components/background/background";
import Header from "@/components/header/header";
import Intro from "@/components/intro/intro";
import Hours from "@/components/hours/hours";
import Experience from "@/components/experience/experience";
import Projects from "@/components/projects/projects";
import BlogPreview from "@/components/blog-preview/blog-preview";
import ContactCards from "@/components/contact-cards/contact-cards";
import Footer from "@/components/footer/footer";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Background />

      <Header />

      <main className={styles.main}>
        <Intro />
        <Hours />
        <Experience />
        <Projects />
        <BlogPreview />
      </main>

      <Footer note="Background regenerated every 6 hours">
        <ContactCards />
      </Footer>
    </>
  );
}
