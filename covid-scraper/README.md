# Covid Scraper

The "covid-scraper" (aka COVID Virus Scraper) is a serverless function to scrape the [Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19) spreadsheet containing global time-series data on the COVID-19 (Corona Virus) outbreak, and the [DXY API](https://ncov.dxy.cn/ncovh5/view/pneumonia) containing the latest data from China. See links below for more information about the data feeds.

## Getting Started

To use the following serverless function you will need an account with [Netlify](https://www.netlify.com) to host the function. 

To deploy the function on Netlify, make sure to install `ncc` and then compile `src` into a `functions` directory.

```
npm i -g @zeit/ncc
```

and then...

```
ncc build src/download.js -o functions
```

You can `build` the function to any other directory by changing the `-o` option.

## Local Development

You don't need to deploy the function to update the data in the Here Data Hub.

If you want to work on or run the function locally, you can install `netlify-cli` and run the function locally via `netlify dev`. Check out [netlify-dev](https://www.netlify.com/products/dev/) for more information.

To update the data locally, run `netlify dev` and then navigate to (use the api key you specified as a `secret` in `./utils/credentials.js`):

```
localhost:8888/.netlify/functions/index?apiKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Updating the Data

To update the data, you send a request to the serverless function. For some security, you can use the secret to prevent random updates:

```
https://my-scraper-app.netlify.com/.netlify/functions/index?apiKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

You can easily automate this update process using e.g. GitHub actions.

## Sources

The data is being scraped from [JHU](https://github.com/CSSEGISandData/COVID-19) and [DXY](https://ncov.dxy.cn/ncovh5/view/pneumonia)

# License


Copyright (C) 2020 HERE Europe B.V.

See the [LICENSE](./LICENSE) file in the root of this project for license details.
