import React from "react";

export interface Post {
  attributes: {
    title: string;
    slug: string;
    date: string;
    "last-edited": string;
    "minutes-read": string;
    tags: string[];
    preview: string;
  };
  react: React.ComponentType;
}

// Posts are written with the CMS, which saves them in the learn folder
const context = require.context("./learn", false, /\.md$/);

const postsBySlug = new Map<string, Post>();
for (const file of context.keys()) {
  const post = context(file) as Post;
  postsBySlug.set(post.attributes.slug, post);
}

// Most recent first
const posts = Array.from(postsBySlug.values()).sort(
  (a, b) =>
    new Date(b.attributes.date).getTime() -
    new Date(a.attributes.date).getTime(),
);

export default posts;

export function getPost(slug: string) {
  return postsBySlug.get(slug);
}

export function getTagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

// Every tag once, in the order they first appear
const tagsBySlug = new Map<string, string>();
for (const post of posts) {
  for (const tag of post.attributes.tags) {
    const slug = getTagSlug(tag);
    if (!tagsBySlug.has(slug)) tagsBySlug.set(slug, tag);
  }
}

export const tags = Array.from(tagsBySlug.entries()).map(([slug, name]) => ({
  slug,
  name,
}));

export function getPostsByTag(slug: string) {
  return posts.filter((post) =>
    post.attributes.tags.some((tag) => getTagSlug(tag) === slug),
  );
}
