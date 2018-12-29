import Cookies from 'js-cookie'

export function getToken() {
  // console.log(Cookies.get(TokenKey))
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}
