
# HERE COVID-19 (Coronavirus) tracker

Once you have cloned the repo, run the install:

```
npm install
```

or...

```
yarn install
```

You will have to reference the right spaces and have access keys to be able to run this app. Create a `.env.development` file with the following variables:

> Note, the values are prefixed with "GATSBY_" in order for gatsby to be able to access them in the client code.

```
GATSBY_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GATSBY_ACCESS_TOKEN=INSERT_GATSBY_ACCESS_TOKEN
GATSBY_SPACE_ID=INSERT_GATSBY_HERE_STUDIO_SPACE_ID
GATSBY_PROVINCES_SPACE_ID=INSERT_GATSBY_PROVINCES_HERE_STUDIO_SPACE_ID
GATSBY_PROVINCE_BORDERS_SPACE_ID=INSERT_GATSBY_BORDERS_HERE_STUDIO_SPACE_ID
```

If you are building the site for production locally, make sure that you call your env file `.env.production`.

> Note, if you are deploying your site using a service like netlify, you don't need to build the site locally. Netlify will build the site for you.

You can build the site with:

```
yarn run build
```

or

```
npm run build
```

If you are building your site prefixed, use:

```
yarn run buildPrefixed
```

or

```
npm run buildPrefixed
```

See more about prefixed builds here:
https://www.gatsbyjs.org/docs/path-prefix/

Once built, the site (`public` folder) is a simple static site and can be deployed on any static server.

# License

Copyright (C) 2020 HERE Europe B.V.

See the [LICENSE](./LICENSE) file in the root of this project for license details.

In addition, please note that the [fonts](src/components/Layout/fonts) are under a different set of licenses.
