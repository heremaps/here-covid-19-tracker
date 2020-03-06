/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"

import App from "../components/App"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Tracking Coronavirus COVID-19" description="Near real-time visualization based on data from the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University and DXY, using HERE Javascript API and HERE Data Hub APIs." />
      <App />
    </Layout>
  )
}

export default IndexPage
