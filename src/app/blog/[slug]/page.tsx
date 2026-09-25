import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/header/header";
import Tags from "@/components/tags/tags";
import Footer from "@/components/footer/footer";

import posts, { Post, getPost } from "@/data/posts";
import { formatDay } from "@/lib/utils";

import styles from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  return {
    title: post?.attributes.title,
    description: post?.attributes.preview,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (post === undefined) notFound();

  // Posts are sorted from the most recent, so the next one comes before
  // Suggest the next post, or the previous one when reading the latest
  const index = posts.indexOf(post);
  const other: Post | undefined = posts[index - 1] ?? posts[index + 1];
  const isNext = index > 0;

  const { date, "last-edited": lastEdited } = post.attributes;
  const updated = formatDay(lastEdited) !== formatDay(date);

  return (
    <>
      <Header bordered />

      <main>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/blog" className={styles.back}>
              ← Back to the blog
            </Link>

            <div className={styles.tags}>
              <Tags tags={post.attributes.tags} />
            </div>

            <h1 className={styles.title}>{post.attributes.title}</h1>

            <p className={styles.meta}>
              <span>{post.attributes["minutes-read"]} min. read</span>
              <span aria-hidden="true">•</span>
              <time dateTime={date}>{formatDay(date)}</time>
              {updated && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>
                    Updated{" "}
                    <time dateTime={lastEdited}>{formatDay(lastEdited)}</time>
                  </span>
                </>
              )}
            </p>
          </header>

          <div className={styles.body}>
            <post.react />
          </div>
        </article>

        {other !== undefined && (
          <Link href={`/blog/${other.attributes.slug}`} className={styles.next}>
            <span className={styles.details}>
              <span className={styles.label}>
                {isNext ? "Next post" : "Previous post"} ·{" "}
                {formatDay(other.attributes.date)}
              </span>
              <span className={styles.nextTitle}>{other.attributes.title}</span>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </main>

      <Footer />
    </>
  );
}

// A static export needs at least one page per dynamic route, so without posts
// this generates a single page showing the not found page instead
export const generateStaticParams = () =>
  posts.length > 0
    ? posts.map((post) => ({ slug: post.attributes.slug }))
    : [{ slug: "none" }];
