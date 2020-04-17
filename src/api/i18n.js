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
      payment_methods: require("../locales/ro/payment_methods.json"),
      privacy_policy: require("../locales/ro/privacy_policy.json"),
      shipping_and_returns: require("../locales/ro/shipping_and_returns.json"),
      terms_and_services: require("../locales/ro/terms_and_services.json"),
      checkout: require("../locales/ro/checkout.json"),
    },
    en: {
      common: require("../locales/en/common.json"),
      home: require("../locales/en/home.json"),
      about: require("../locales/en/about.json"),
      shop: require("../locales/en/shop.json"),
      payment_methods: require("../locales/en/payment_methods.json"),
      privacy_policy: require("../locales/en/privacy_policy.json"),
      shipping_and_returns: require("../locales/en/shipping_and_returns.json"),
      terms_and_services: require("../locales/en/terms_and_services.json"),
      checkout: require("../locales/en/checkout.json"),
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