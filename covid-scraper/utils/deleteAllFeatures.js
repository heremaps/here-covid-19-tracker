/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

const fetch = require("node-fetch")
const credentials = require("./credentials")

const baseUrl = `https://xyz.api.here.com/hub/spaces`
const { spaceId, accessToken } = credentials

function deleteAllFeatures() {
  return fetch(`${baseUrl}/${spaceId}/features?tags=*`, {
    method: "delete",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
}

module.exports = deleteAllFeatures
