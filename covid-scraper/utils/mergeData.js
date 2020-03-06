/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

const dayjs = require("dayjs")

function mergeData(dateHeaders, jhuData, dxyDate) {
  const latestJHUDate = dayjs(dateHeaders[dateHeaders.length - 1]).format("M/D/YYYY")
  const latestJHUDateFull = dateHeaders[dateHeaders.length - 1]
  const latestDxyDate = dayjs(dxyDate[0].updated).format("M/D/YYYY")

  const isSameDay = latestJHUDate === latestDxyDate

  return jhuData.map(point => {
    const listAsChina = point.countryregion === "Mainland China" || point.countryregion === "Macau" || point.countryregion === "Hong Kong" || point.countryregion === "Taiwan"
    const relevantData = dxyDate.find(s => s.provincestate === point.provincestate)
    
    const timeNow = dayjs().subtract(dayjs().utcOffset(), "minute").format("h:mm a")

    const relevantDate = isSameDay ? latestJHUDateFull : latestDxyDate + ` ${timeNow}`

    const base = {
      ...point,
      countryregion: listAsChina ? "China" : point.countryregion,
    }

    const newConfirmed = listAsChina ? relevantData.confirmed : point[latestJHUDateFull]
    const newRecovered = listAsChina ? relevantData.recoveries : point["recoveries_" + latestJHUDateFull]
    const newDeath = listAsChina ? relevantData.deaths : point["deaths_" + latestJHUDateFull]

    if (newConfirmed) base[relevantDate] = newConfirmed
    if (newRecovered) base["recoveries_" + relevantDate] = newRecovered
    if (newDeath) base["deaths_" + relevantDate] = newDeath

    if (!isSameDay) {
      base.headers = base.headers + `;;${relevantDate.toLowerCase()}`
    }

    return base
  })
}

module.exports = mergeData
