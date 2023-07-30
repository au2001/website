import Link from "next/link";

import Tag from "@/components/tag/tag";

import { LearnPage } from "@/data/learn";
import { formatDate } from "@/lib/utils";

import styles from "./learn-link.module.scss";

export default function LearnLink({ page }: { page: LearnPage }) {
  return (
    <Link href={`/learn/${page.attributes.slug}`} className={styles.container}>
      <div className={styles.preview}>
        <h2>{page.attributes.title}</h2>
        <p>{page.attributes.preview}</p>
      </div>

      <div className={styles.stats}>
        <p>{page.attributes["minutes-read"]} min. read</p>
        <p className={styles.tags}>
          {page.attributes.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </p>
        <p>{formatDate(page.attributes.date)}</p>
      </div>
    </Link>
  );
}
