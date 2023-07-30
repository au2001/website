import Background from "@/components/background/background";
import Header from "@/components/header/header";
import Title from "@/components/title/title";
import Footer from "@/components/footer/footer";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <>
      <Background />

      <Header />

      <Title
        title="404 - Page Not Found!"
        subtitle="Sorry, we couldn’t find what you were looking for."
        center
      />

      <div className={styles.spacer}></div>

      <Footer />
    </>
  );
}
