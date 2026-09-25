import { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogIndex from "@/components/blog-index/blog-index";

import { tags } from "@/data/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const name = tags.find(({ slug }) => slug === tag)?.name;

  return { title: name !== undefined ? `#${name}` : undefined };
}

export default async function BlogTag({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  if (!tags.some(({ slug }) => slug === tag)) notFound();

  return <BlogIndex tag={tag} />;
}

// A static export needs at least one page per dynamic route, so without tags
// this generates a single page showing the not found page instead
export const generateStaticParams = () =>
  tags.length > 0 ? tags.map(({ slug }) => ({ tag: slug })) : [{ tag: "none" }];
