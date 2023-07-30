/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // https://nextjs.org/docs/messages/export-image-api
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: { mode: ["react-component"] },
      }
    );
    return config;
  },
};

module.exports = nextConfig;
