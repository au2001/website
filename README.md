# Aurélien Garnier's website

This is the source code for my personal website.\
It is currently hosted on GitHub Pages at [garnier.dev](https://garnier.dev).

It uses [Next.js](https://nextjs.org) to pre-render all pages to static HTML/CSS which loads blazingly fast™.\
The pages themselves are [React](https://reactjs.org) [Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components).

Currently, three pages exist: index, contact, 404.

## Build and run

To run the website in development mode, use:

```
npm i
npm run dev
```

To build the website (pre-render all pages), use:

```
npm run build
```

The resulting static files are placed in the `out` folder.
They can then be hosted on GitHub Pages, Cloudflare Pages, AWS S3...

## Automation

This repository contains a `deploy` GitHub Actions workflow.\
It automatically builds the website and deploys it to GitHub Pages.\
A new background SVG is procedurally generated each time.

A second GitHub Actions workflow `background` runs every 6 hours.\
It simply re-triggers the `deploy` workflow based on the same commit as the last deployment.\
This allows to change the background SVG regularly even when the source code doesn't change.

The most up-to-date deployed version can be obtained on the `gh-pages` branch.

## TODO

Here is a list of planned upcoming improvements, roughly ranked by priority:

- Adding a portfolio of my projects, contributions, and more generally of my past work;
- Creating a `Learn` page with the process through which I learnt different stuff, with a cheatsheet- and tutorial-oriented format;
- Internationalizing and translating to different languages, most notably French;
