/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // https://nextjs.org/docs/messages/export-image-api
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
      "*.md": {
        loaders: [
          {
            loader: "frontmatter-markdown-loader",
            options: { mode: ["react-component"] },
          },
        ],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
