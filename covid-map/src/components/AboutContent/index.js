/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import {
  Heading,
  Text,
  Link,
} from "@chakra-ui/core"

const AboutContent = () => {
  return (
    <>
      <Heading fontSize={["1.5rem", "2rem"]} lineHeight={1.125} mb="1.25rem">
        { "About" }
      </Heading>

      <Text>
        { `Using HERE location services (HERE Vector Map Tiles API and HERE Data Hub APIs) and ` }
        <Link alt="Center for Systems Science and Engineering (CSSE)" href="https://github.com/CSSEGISandData/COVID-19" color="#00AFAA">
          { "data provided by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University"}
        </Link>
        { `, and ` }
        <Link alt="DXY" href="https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=singlemessage&isappinstalled=0" color="#00AFAA">
          { "DXY" }
        </Link>
        { `, we display the spread of Coronavirus COVID-19 globally. For questions regarding the global data, please get in touch with ` }
        <Link alt="Center for Systems Science and Engineering (CSSE)" href="https://github.com/CSSEGISandData/COVID-19" color="#00AFAA">
          { "JHU CSSE"}
        </Link>
        { `. For questions regarding China-specific data, please contact ` }
        <Link alt="DXY" href="https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=singlemessage&isappinstalled=0" color="#00AFAA">
          { "DXY" }
        </Link>
        { `.` }
      </Text>

      <Heading fontSize={["1.25rem", "1.5rem"]} lineHeight={1.125} mt="1.75rem" mb="1.25rem">
        { "About HERE Technologies" }
      </Heading>
      <Text>
        { "HERE, a location data and technology platform, moves people, businesses and cities forward by harnessing the power of location. By leveraging our open platform, we empower our customers to achieve better outcomes – from helping a city manage its infrastructure or a business optimize its assets to guiding drivers to their destination safely. To learn more about HERE, please visit " }
        <Link href="https://www.here.com/" target="_blank" rel="noopener noreferrer" color="#00AFAA">{"www.here.com"}</Link>
        { " and " }
        <Link href="https://360.here.com/" target="_blank" rel="noopener noreferrer" color="#00AFAA">{"360.here.com"}</Link>
      </Text>
    </>
  )
}

export default AboutContent
