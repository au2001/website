import { notFound } from "next/navigation";

import Background from "@/components/background/background";
import Header from "@/components/header/header";
import Title from "@/components/title/title";
import Tag from "@/components/tag/tag";
import Footer from "@/components/footer/footer";

import learnPages from "@/data/learn";

import styles from "./page.module.scss";
import { formatDate } from "@/lib/utils";

export default function LearnDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const page = learnPages[slug];

  if (page === undefined) notFound();

  return (
    <>
      <Background />

      <Header />

      <div className={styles.spacer}></div>

      <Title pretitle="Follow my journey..." title={page.attributes.title} />

      <div className={styles.stats}>
        <p className={styles.dates}>
          <span>{page.attributes["minutes-read"]} min. read</span>
          <span>•</span>
          <span>{formatDate(page.attributes.date)}</span>
          <span>•</span>
          <span>
            Last updated: {formatDate(page.attributes["last-edited"])}
          </span>
        </p>
        <p className={styles.tags}>
          {page.attributes.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </p>
      </div>

      <div className={styles.spacer}></div>

      <article className={styles.article}>
        <page.react />
      </article>

      <div className={styles.spacer}></div>

      <Footer />
    </>
  );
}

export const generateStaticParams = () =>
  Object.keys(learnPages).map((slug) => ({ slug }));
