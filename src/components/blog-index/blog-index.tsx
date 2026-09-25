import Link from "next/link";

import Header from "@/components/header/header";
import PageHeader from "@/components/page-header/page-header";
import Tags from "@/components/tags/tags";
import Footer from "@/components/footer/footer";

import posts, { getPostsByTag, tags } from "@/data/posts";
import { formatMonth } from "@/lib/utils";

import styles from "./blog-index.module.scss";

// Lists all posts, or only the ones with the given tag slug
export default function BlogIndex({ tag }: { tag?: string }) {
  const list = tag === undefined ? posts : getPostsByTag(tag);

  return (
    <>
      <Header bordered />

      <main>
        <PageHeader pretitle="Follow the journey of…" title="How I learn stuff">
          {tags.length > 0 && (
            <nav aria-label="Filter by tag" className={styles.filter}>
              <ul>
                <li>
                  <Link
                    href="/blog"
                    className={tag === undefined ? styles.active : undefined}
                    aria-current={tag === undefined ? "page" : undefined}
                  >
                    All
                  </Link>
                </li>
                {tags.map(({ slug, name }) => (
                  <li key={slug}>
                    <Link
                      href={`/blog/tags/${slug}`}
                      className={tag === slug ? styles.active : undefined}
                      aria-current={tag === slug ? "page" : undefined}
                    >
                      #{name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </PageHeader>

        {list.length > 0 ? (
          <ul className={styles.posts}>
            {list.map((post) => (
              <li key={post.attributes.slug}>
                <article className={styles.post}>
                  <p className={styles.date}>
                    <time dateTime={post.attributes.date}>
                      {formatMonth(post.attributes.date)}
                    </time>{" "}
                    · {post.attributes["minutes-read"]} min. read
                  </p>

                  <div className={styles.content}>
                    <h2 className={styles.title}>
                      <Link href={`/blog/${post.attributes.slug}`}>
                        {post.attributes.title}
                      </Link>
                    </h2>
                    <p className={styles.preview}>{post.attributes.preview}</p>
                    <Tags tags={post.attributes.tags} />
                  </div>

                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No posts yet. Check back soon!</p>
        )}
      </main>

      <Footer />
    </>
  );
}
