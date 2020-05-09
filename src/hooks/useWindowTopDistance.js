import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

const useWindowSizeActions = maxNumber => {
  const [isLarger, setIsPassedMaxNumber] = useState(false)

  useEffect(() => {
    if (window) {
      window.addEventListener(
        "scroll",
        throttle(() => {
          if (window.pageYOffset >= maxNumber) {
            setIsPassedMaxNumber(true)
          } else {
            setIsPassedMaxNumber(false)
          }
        }, 200)
      )
    }

    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [maxNumber])

  return isLarger
}

export default useWindowSizeActions
