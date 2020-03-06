/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Text, Link } from "@chakra-ui/core"

import { formatThousand } from "../../utils/format"
import { useDataDate } from "../../utils/store"

const IntroParagraph = ({ points }) => {
  const currentDate = useDataDate(state => state.currentDate)

  const sum = points.length ? points.reduce((acc, cur) => {
    return acc + (cur.properties[currentDate] || 0)
  }, 0) : null

  return (
    <Text color="gray.600" mb="1.25rem">

      {`The first case of the new Coronavirus COVID-19 was recorded on 31 December in Wuhan, China (`}
      <Link alt="WHO — Novel coronavirus (COVID-19)" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" color="#00AFAA">
        { "WHO" }
      </Link>
      { `). Since then,${sum ? " " + formatThousand(sum) : ""} confirmed cases have been recorded worldwide. This visualization shows the near real-time status based on data from the ` }
      <Link alt="Center for Systems Science and Engineering (CSSE)" href="https://github.com/CSSEGISandData/2019-nCoV" color="#00AFAA">
        { "Center for Systems Science and Engineering (CSSE)" }
      </Link>
      { ` at Johns Hopkins University and ` }
      <Link alt="DXY" href="https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=singlemessage&isappinstalled=0" color="#00AFAA">
        { "DXY." }
      </Link>
      { ` Data currently available on the following zoom levels: City level - US, Canada and Australia; Province level - China; Country level - other countries.` }
      { ` To read more about this map, see ` }
      <Link
        color="#00AFAA"
        alt="How we built an interactive map displaying the COVID-19 outbreak"
        href="https://developer.here.com/blog/how-we-built-an-interactive-map-displaying-the-covid-19-outbreak"
      >
        { "How we built an interactive map displaying the COVID-19 outbreak" }
      </Link>
      { "." }
    </Text>
  )
}

export default IntroParagraph
