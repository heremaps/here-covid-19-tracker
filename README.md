# HERE-COVID-2019

*Update: March 17, 2020 - The production version of this map has been updated and refined to listing countries only. We will publish the updated GitHub repo as soon as possible.*

This repository is the code used to power the [HERE-hosted COVID-19](https://developer.here.com/coronavirus/) map. HERE is releasing this code to the community so that any developer may iterate, improve or even recommend features/functionality through Pull Requests.

Please note that with the ever-evolving situation of the COVID-19 virus, parts of this map may break from time to time and we will do our best to keep up with the changes.

Please fork at will and let us know what you come up with. You can reach out to us on our Slack channel #covid-19-map. We hope that you find this reference useful.

This repository is organized into two separate sections. There is the "covid-map" which is a [Gatsby-based](https://www.gatsbyjs.org) visualization of the data that is collected with the "covid-scraper" utility. The "covid-scraper" is a serverless function that is hosted over at [Netlify](https://www.netlify.com). This function then updates a "HERE Data Hub" space (think of it like a database for Geo-spatial data). When the map loads, it reads from the HERE Data Hub space and presents the latest snapshot of information.

Requirements to get started.
- An account with [Netlify](https://www.netlify.com) to host the serverless function
- An account with [HERE Developer Portal](https://developer.here.com/?cid=Freemium-DeveloperPortalTutorial-PJ-0-Javascript-DevPortal-&utm_source=DeveloperPortalTutorial&utm_medium=referral&utm_campaign=Webinar_IOT_2020_Golden-Age-Location-Enabled-AI-Jan-16)
- 2 HERE Data Hub Spaces to host the data

How to get in touch
- [Join our Slack Channel](http://t.her.is/slack) #covid-19-map
- [Follow us on Twitter](https://twitter.com/heredev)
- [Join our Twitch Streams](https://www.twitch.tv/heredev)
- [Subscribe on YouTube](https://www.youtube.com/user/heremaps/playlists?view=50&sort=dd&shelf_id=10)


# License

Copyright (C) 2020 HERE Europe B.V.

Unless otherwise noted in `LICENSE` files for specific files or directories, the [LICENSE](LICENSE) in the root applies to all content in this repository.
