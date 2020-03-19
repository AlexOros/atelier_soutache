import i18next from "i18next"

i18next.init({
  fallbackLng: "ro",
  lng: "ro",
  resources: {
    ro: {
      common: require("../locales/ro/common.json"),
      home: require("../locales/ro/home.json"),
      about: require("../locales/ro/about.json"),
      product: require("../locales/ro/product.json"),
      shop: require("../locales/ro/shop.json"),
    },
    en: {
      common: require("../locales/en/common.json"),
      home: require("../locales/en/home.json"),
      about: require("../locales/en/about.json"),
      shop: require("../locales/en/shop.json"),
    },
  },
  load: "languageOnly",
  ns: ["common", "home"],
  defaultNS: "home",
  returnObjects: true,
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
})

i18next.languages = ["ro", "en"]

export default i18next
