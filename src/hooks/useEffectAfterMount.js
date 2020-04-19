import { useEffect, useRef } from "react"
/**
 *
 * @param {function} cb
 * @param {Array} deps
 */
const useEffectAfterMount = (cb, deps) => {
  const componentJustMountedRef = useRef(true)
  useEffect(() => {
    if (!componentJustMountedRef.current) {
      return cb()
    }
    componentJustMountedRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useEffectAfterMount
