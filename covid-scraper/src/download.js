/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */


const fetch = require("node-fetch")
const dayjs = require("dayjs")

const parseCsv = require("../utils/parseCsv")
const getSupplement = require("../utils/getSupplement")
const mergeData = require("../utils/mergeData")
const prepareScrapedData = require("../utils/prepareScrapedData")
const deleteAllFeatures = require("../utils/deleteAllFeatures")
const uploadToDataHub = require("../utils/uploadToDataHub")
const credentials = require("../utils/credentials")

const { secret } = credentials

exports.handler = (event, context, callback) => {
  const apiKey = event.queryStringParameters.apiKey
  if (apiKey !== secret) {
    callback(null, {
      statusCode: 403,
      body: `You don't have access!`,
    })
    return
  }

  const sheets = ["Confirmed", "Recovered", "Deaths"]

  const sheetQueries = sheets.map(sheetName => {
    return fetch (`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${sheetName}.csv`).then(d => d.text())
  })

  Promise.all([
    ...sheetQueries,
    fetch("https://ncov.dxy.cn/ncovh5/view/pneumonia").then(d => d.text()),
  ]).then(values => {

    const [confirmedRaw, recoveredRaw, deathRaw] = values.slice(0, 3).map(d => parseCsv(d))
    const dxyData = prepareScrapedData(values[3])

    const [dateHeadersRaw, otherHeaders] = confirmedRaw.columns.reduce((acc, cur, i) => {
      if (!i) acc = [[],[]]
      const d = dayjs(cur).format("M/D/YYYY h:mm a")
      if (d === "Invalid Date") acc[1].push(cur)
      else acc[0].push(cur)
      return acc
    }, [])

    const dateHeaders = dateHeadersRaw.map(d => dayjs(d).format("M/D/YYYY h:mm a"))

    const confirmed = confirmedRaw.map(d => {
      return Object.keys(d).reduce((acc, cur) => {
        const isOtherHeader = otherHeaders.includes(cur)
        const asDate = dayjs(cur).format("M/D/YYYY h:mm a")
        const isDate = asDate !== "Invalid Date"
        if (isDate && dateHeaders.includes(asDate)) {
          acc[asDate] = parseInt(d[cur])
        } else if(isOtherHeader) {
          acc[cur] = d[cur]
        } else {
          return acc
        }
        return acc
      }, {})
    })

    const recovered = recoveredRaw.map(d => {
      return Object.keys(d).reduce((acc, cur) => {
        const isOtherHeader = otherHeaders.includes(cur)
        const asDate = dayjs(cur).format("M/D/YYYY h:mm a")
        const isDate = asDate !== "Invalid Date"
        if (isDate && dateHeaders.includes(asDate)) {
          acc[asDate] = parseInt(d[cur])
        } else if(isOtherHeader) {
          acc[cur] = d[cur]
        } else {
          return acc
        }
        return acc
      }, {})
    })

    const death = deathRaw.map(d => {
      return Object.keys(d).reduce((acc, cur) => {
        const isOtherHeader = otherHeaders.includes(cur)
        const asDate = dayjs(cur).format("M/D/YYYY h:mm a")
        const isDate = asDate !== "Invalid Date"
        if (isDate && dateHeaders.includes(asDate)) {
          acc[asDate] = parseInt(d[cur])
        } else if(isOtherHeader) {
          acc[cur] = d[cur]
        } else {
          return acc
        }
        return acc
      }, {})
    })

    const jhuData = confirmed.map(d => {
      const supplementConfirmed = getSupplement("", d, null, dateHeaders)
      const supplementRecovered = getSupplement("recoveries_", d, recovered, dateHeaders)
      const supplementDeath = getSupplement("deaths_", d, death, dateHeaders)
      return {
        provincestate: d["Province/State"],
        countryregion: d["Country/Region"],
        // Fix column mismatch in the dataset
        lat: d["first_recorded"],
        long: d["lat"],
        headers: dateHeaders.join(";;"),
        ...supplementConfirmed,
        ...supplementRecovered,
        ...supplementDeath,
      }
    })

    const mergedData = mergeData(dateHeaders, jhuData, dxyData)

    const geojson = {
      type: "FeatureCollection",
      features: mergedData.map(properties => {

        const keys = Object.keys(properties)
        const newProps = keys.reduce((acc, cur) => {
          acc[cur.toLowerCase()] = properties[cur]
          return acc
        }, {})

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [parseFloat(properties.long), parseFloat(properties.lat)],
          },
          properties: newProps,
        }
      }),
    }

    deleteAllFeatures()
      .then(() => {
        uploadToDataHub(geojson)
          .then(() => {
            callback(null, {
              statusCode: 200,
              body: "Success!",
            })
          })
          .catch(error => {
            callback(null, {
              statusCode: 422,
              body: String(error),
            })
          })
      })

  })

}
