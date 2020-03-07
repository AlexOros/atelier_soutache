import React, { useState, useEffect } from "react"
import throttle from "lodash.throttle"

const useWindowSizeActions = () => {
  const [top, setTop] = useState(null)

  useEffect(() => {
    if (window) {
      setTop(window.pageXOffset)

      window.addEventListener(
        "scroll",
        throttle(() => setTop(window.pageYOffset), 200)
      )
    }

    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [])

  return {
    top,
  }
}

export default useWindowSizeActions
