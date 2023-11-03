# Aurélien Garnier's website

This is the source code for my personal website.\
It is currently hosted on [GitHub Pages](https://pages.github.com) at [garnier.dev](https://garnier.dev).

It uses [Next.js](https://nextjs.org) to pre-render all pages to static HTML/CSS which loads blazingly fast™.\
The pages themselves are [React](https://reactjs.org) [Server Components](https://reactjs.org/server-components) styled with [Sass](https://sass-lang.com).

## Build and run

To run the website in development mode, use:

```
npm i
npm run dev
```

To build the website (pre-render all pages) in production mode, use:

```
npm ci
npm run build
```

The resulting static files are placed in the `out` folder.\
They can then be hosted on GitHub Pages, Cloudflare Pages, AWS S3...

## Automation

This repository contains a [`deploy`](./.github/workflows/deploy.yaml) [GitHub Actions](https://github.com/features/actions) workflow.\
It automatically builds the website and deploys it to GitHub Pages.\
A new background SVG is procedurally generated each time (see [Background](#Background)).

A second GitHub Actions workflow, [`background`](./.github/workflows/background.yaml), runs every 6 hours.\
It simply re-triggers the `deploy` workflow based on the same commit as the last deployment.\
This allows to change the background SVG regularly even when the source code doesn't change.

The most up-to-date deployed version can be obtained on the `gh-pages` branch.

## Blog

Some dynamic content is present on the website, even though it is satically generated.\
For example, the `Learn` page shows articles which can be created without manually editing the source code.

This is achieved with [Sveltia CMS](https://github.com/sveltia/sveltia-cms), a Git-based headless CMS.\
Every time a change is made to some content, the update is pushed to this repository.\
This commit triggers an automatic build and deployment of the new version (see [Automation](#Automation)).\
Drafts are kept on different branches than `main` which are not deployed and only visible on the CMS's interface.

Since this repository is public, anyone can access the [Admin page](https://aurelien.garnier.dev/admin) as long as you login with a GitHub account.\
To be able to modify articles, your GitHub account needs to have write access to this repository though.\
This integration uses the [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms) hosted on [Cloudflare Workers](https://workers.cloudflare.com).

## Background

My website's background is like a box of chocolates. You never know what you're going to get.

I wanted to create a [tsParticles](https://particles.js.org/)-like effect for the background, as reference to a computer network.\
But I also aim at making the website the most compatible when disabling client-side JavaScript[^1], mostly for privacy reasons.\
So, as a compromise, a [static SVG](./public/images/background.svg) is [generated procedurally](./scripts/generate-background.tsx) at build time.\
The algorithm I wrote makes sure that it is tileable, so that it can seamlessly cover bigger screens.

As a result, all visitors see the same background every time they visit the website.\
So, as not to bore you if you like visiting it very often or if you set it as desktop background, it is periodically regenerated.\
Every 6 hours, a cron job runs to redeploy the website with a new background SVG (see [Automation](#Automation)).

[^1]: If you know how to copy text to the clipboard without JavaScript, please hit me up so that I can make my website 100% compatible.
