import React from "react"

import { Layout } from "./src/components"

export const wrapRootElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
