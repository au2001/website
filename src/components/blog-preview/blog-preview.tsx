import Link from "next/link";

import posts from "@/data/posts";
import { formatMonth } from "@/lib/utils";

import styles from "./blog-preview.module.scss";

export default function BlogPreview() {
  if (posts.length === 0) return null;

  const [featured, ...others] = posts;
  const recent = others.slice(0, 3);

  return (
    <section id="blog" className={styles.blog} aria-labelledby="blog-title">
      <div className={styles.heading}>
        <h2 id="blog-title">From the blog</h2>
        <Link href="/blog" className={styles.all}>
          All posts →
        </Link>
      </div>

      <div
        className={
          recent.length > 0 ? styles.grid : `${styles.grid} ${styles.single}`
        }
      >
        <Link
          href={`/blog/${featured.attributes.slug}`}
          className={styles.featured}
        >
          <span className={styles.thumbnail} aria-hidden="true"></span>
          <span className={styles.body}>
            <span className={styles.meta}>
              {formatMonth(featured.attributes.date)} ·{" "}
              {featured.attributes["minutes-read"]} min. read ·{" "}
              {featured.attributes.tags.map((tag) => `#${tag}`).join(" ")}
            </span>
            <h3 className={styles.title}>{featured.attributes.title}</h3>
            <span className={styles.preview}>
              {featured.attributes.preview}
            </span>
          </span>
        </Link>

        {recent.length > 0 && (
          <ul className={styles.recent}>
            {recent.map((post) => (
              <li key={post.attributes.slug}>
                <Link href={`/blog/${post.attributes.slug}`}>
                  <span className={styles.meta}>
                    {formatMonth(post.attributes.date)} ·{" "}
                    {post.attributes.tags.map((tag) => `#${tag}`).join(" ")}
                  </span>
                  <h3 className={styles.title}>{post.attributes.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
