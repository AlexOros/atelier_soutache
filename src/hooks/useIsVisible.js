import { useState, useEffect } from "react"

/**
 *
 * @param {*} options -> see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for options
 *
 * @example const [areProductsVisible, setProductsRef] = useIsVisible({ threshold: 1 })
 * ...later
 *  <div ref={setProductsRef}>{areProductsVisible && <Products />}</div>
 */
const useIsVisible = (options = { threshold: 1 }) => {
  const [ref, setRef] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(entry.isIntersecting)
        observer.unobserve(ref)
      }
    }, options)

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      if (ref) {
        observer.unobserve(ref) //cleanup
      }
    }
  }, [options, ref])

  return [visible, setRef]
}

export default useIsVisible
