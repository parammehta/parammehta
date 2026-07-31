# Param Mehta — Portfolio

[![Site preview](/public/site-preview.png)](https://parammehta.com)

My personal portfolio site. Built with [Next.js](https://nextjs.org/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/). View the [live site](https://parammehta.com).

## Install & run

Make sure you have Node.js `20.9.0` or higher and npm `8.6.0` or higher installed (see `.nvmrc` — run `nvm use` if you use nvm). Install dependencies with:

```bash
npm install
```

Once it's done, copy `.env.example` to `.env` and fill in the values, then start up a local server with:

```bash
npm run dev
```

To view the components storybook:

```bash
npm run storybook
```

To create a production build (static export):

```bash
npm run build
```

## Deployment

The site is hosted on AWS (S3 for the static site, Lambda for the contact form). You'll need an AWS account and the AWS CLI installed, and the S3 bucket names in `package.json`'s `deploy`/`deploy:storybook` scripts updated to your own.

Deploy the site to S3:

```bash
npm run deploy
```

Deploy the serverless contact form function:

```bash
cd functions
npm run deploy:api
```

## Notes

- The rotating background sphere on the homepage is a Three.js shader; its color comes from the fragment shader in `src/layouts/Home/displacementSphereFragment.glsl`.
- The contact form is wired up to an AWS Lambda function in `functions/`; see `functions/serverless.yml` for its configuration.
