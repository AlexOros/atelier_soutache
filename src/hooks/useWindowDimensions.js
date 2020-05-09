import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

/**
 * Returns the window size (w, h) when a resize event is triggered
 * @param {Number} interval
 * @example
 *  const {windowWidth, windowHeight} = useWindowDimensions()
 */
const useWindowDimensions = (interval = 500) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    const throttledHandleResize = throttle(() => {
      setWindowDimensions(getWindowDimensions())
    }, interval)

    window.addEventListener("resize", throttledHandleResize)

    return () => window.removeEventListener("resize", throttledHandleResize)
  }, [interval])

  return windowDimensions
}

export default useWindowDimensions
