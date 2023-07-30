import React from "react";

export interface LearnPage {
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

const learnPages: Record<string, LearnPage> = {};

const context = require.context("./learn", false, /\.md$/);
for (const file of context.keys()) {
  const page = context(file) as LearnPage;
  learnPages[page.attributes.slug] = page;
}

export default learnPages;
