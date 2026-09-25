import { Metadata } from "next";

import BlogIndex from "@/components/blog-index/blog-index";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return <BlogIndex />;
}
