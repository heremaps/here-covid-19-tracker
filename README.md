# HERE-COVID-2019

This repository is the code used to power the [HERE-hosted COVID-19](https://developer.here.com/coronavirus/) map. HERE is releasing this code to the community so that any developer may iterate, improve or even recommend features/functionality through Pull Requests.

Please note that with the ever-evolving situation of the COVID-19 virus, parts of this map may break from time to time and we will do our best to keep up with the changes.

Please fork at will and let us know what you come up with. You can reach out to us on our Slack channel #covid-19-map. We hope that you find this reference useful.

This repository is organized into two separate sections. There is the "covid-map" which is a [Gatsby-based](https://www.gatsbyjs.org) visualization of the data that is collected with the "covid-scraper" utility. The "covid-scraper" is a serverless function that is hosted over at [Netlify](https://www.netlify.com). This function then updates a "HERE Data Hub" space (think of it like a database for Geo-spatial data). When the map loads, it reads from the HERE Data Hub space and presents the latest snapshot of information.

Requirements to get started.
- An account with [Netlify](https://www.netlify.com) to host the serverless function
- An account with HERE Developer Portal 
- 2 HERE Data Hub Spaces to host the data

How to get in touch
- Join our Slack Channel #covid-19-map
- Follow us on Twitter
- Join our Twitch Streams
- Subscribe on YouTube

# License

Copyright (C) 2020 HERE Europe B.V.

Unless otherwise noted in `LICENSE` files for specific files or directories, the [LICENSE](LICENSE) in the root applies to all content in this repository.
