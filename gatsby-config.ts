import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "arl.sh",
    siteUrl: "https://arl.sh"
  },
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: "gatsby-plugin-manifest",
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: "gatsby-source-filesystem",
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
}

export default config
