export default ({ app }, inject) => {
  // Set a value of cookie for 12 hours
  function setCookie(cname, cvalue) {
    var d = new Date()
    d.setTime(d.getTime() + 12 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }
  inject('setCookie', setCookie)
  // Getting the value of cookie
  function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  inject('getCookie', getCookie)
  // checking whether user is logged in or not
  function isLoggedIn() {
    return getCookie('token') !== '' && getCookie('token') !== undefined
  }
  inject('isLoggedIn', isLoggedIn)
  // parsing jwt token to json data
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  // getting jwt data if any
  inject('getJwtData', getJwtData)
  function getJwtData() {
    const jwt = getCookie('token')
    if (jwt) {
      const data = parseJwt(jwt)
      return data
    } else {
      return null
    }
  }
  inject('getJwtData', getJwtData)
}
