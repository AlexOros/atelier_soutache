import React, { Component, useState } from "react"
import { useTranslation } from "react-i18next"

const Header = () => {
  const { t, i18n } = useTranslation()

  const [values, setValues] = useState({
    language: "en",
  })

  function handleChange(event) {
    event.persist()
    i18n.changeLanguage(event.target.value)
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div>
      <select
        value={values.language}
        onChange={handleChange}
        disableUnderline
        name="language"
      >
        <option value="en">EN</option>
        <option value="ro">RO</option>
      </select>
    </div>
  )
}

export default Header
