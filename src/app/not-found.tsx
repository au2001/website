import Link from "next/link";

import Header from "@/components/header/header";
import PageHeader from "@/components/page-header/page-header";
import Footer from "@/components/footer/footer";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <>
      <Header bordered />

      <main>
        <PageHeader pretitle="404" title="Page not found">
          <p className={styles.description}>
            Sorry, we couldn’t find what you were looking for.
          </p>
          <Link href="/" className={styles.back}>
            ← Back to the home page
          </Link>
        </PageHeader>
      </main>

      <Footer />
    </>
  );
}
