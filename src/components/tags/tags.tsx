import Link from "next/link";

import { getTagSlug } from "@/data/posts";

import styles from "./tags.module.scss";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/blog/tags/${getTagSlug(tag)}`} className={styles.tag}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
