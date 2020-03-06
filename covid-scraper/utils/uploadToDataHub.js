/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

const fetch = require("node-fetch")
const credentials = require("./credentials")

const baseUrl = `https://xyz.api.here.com/hub/spaces`
const { spaceId, accessToken } = credentials

function uploadToDataHub(reqBody) {
  return fetch(`${baseUrl}/${spaceId}/features`, {
    method: "put",
    body: JSON.stringify(reqBody),
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/geo+json",
    },
  }).then(res => res.json())
}

module.exports = uploadToDataHub
