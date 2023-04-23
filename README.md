# Aurélien Garnier's website

This is the source code for my personal website.\
It is currently hosted on GitHub Pages at [garnier.dev](https://garnier.dev).

It uses the [Gatsby Framework](https://www.gatsbyjs.com) to pre-render all pages to static HTML/CSS which loads blazingly fast™.\
The pages themselves are very simple [React](https://reactjs.org) function-based components.

Currently, only two pages exist: index and 404.

## Build and run

To run the website in development mode, use:

```
npm i
npm start
```

To build the website (pre-render all pages), use:

```
npm run build
```

The resulting static files are placed in the `public` folder.

For demo purposes, a web server can serve the contents of the `public` folder by using:

```
npm run serve
```

This is not recommended for production use.\
A static hosting should be used for better performance (ex. GitHub Pages, Cloudflare Pages, AWS S3...).

## Automation

This repository contains a `deploy` GitHub Actions workflow.\
It automatically builds the website and deploys it to GitHub Pages.

The most up-to-date deployed version can be obtained on the `gh-pages` branch.

## TODO

Here is a list of planned upcoming improvements, roughly ranked by priority:

- Adding a portfolio of my projects, contributions, and more generally of my past work;
- Moving the bulk of my social links form the footer to a dedicated `Contact` page, with an additional contact form;
- Creating a `Learn` page with the process through which I learnt different stuff, with a cheatsheet- and tutorial-oriented format;
- Internationalizing and translating to different languages, most notably French;
