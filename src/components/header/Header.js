import React, { Component, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

const Header = () => {
  const { i18n } = useTranslation()

  const [values, setValues] = useState({
    language: "en",
  })

  function handleChange(event) {
    event.persist()
    i18n.changeLanguage(event.target.value)
    setValues(oldValues => ({
      ...oldValues,
      language: event.target.value,
    }))
  }

  return (
    <div>
      <select value={values.language} onChange={handleChange} name="language">
        <option value="en">EN</option>
        <option value="ro">RO</option>
      </select>
    </div>
  )
}

export default Header
