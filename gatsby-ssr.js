import React from "react"
import { I18nextProvider, withTranslation } from "react-i18next"

import { Layout } from "./src/components"
import i18next from "./src/config/i18n"

export const wrapRootElement = ({ element }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <Layout>{element}</Layout>
    </I18nextProvider>
  )
}
