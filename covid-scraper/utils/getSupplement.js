/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

function getSupplement(prefix = "", referenceSheet, sheet, dateHeaders) {
  const relevant = sheet
    ? sheet.find(s => (s["Province/State"] === referenceSheet["Province/State"]) && (s["Country/Region"] === referenceSheet["Country/Region"]))
    : referenceSheet
  return dateHeaders.reduce((acc, cur) => {
    if (!relevant[cur]) return acc
    acc[prefix + cur] = parseInt(relevant[cur])
    return acc
  }, {})
}

module.exports = getSupplement
