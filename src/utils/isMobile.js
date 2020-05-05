/**
 * @returns true value if the user is browsing with a mobile device, return false otherwise.
 */
const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /IEMobile/i,
    /Opera Mini/i,
  ]

  return toMatch.some(toMatchItem => {
    if (process.env.BROWSER) {
      return navigator.userAgent.match(toMatchItem)
    }
    return false
  })
}

export default isMobile
