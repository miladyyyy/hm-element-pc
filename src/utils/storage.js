const KEY = 'my-token-element-pc'

export function getToken() {
  return localStorage.getItem(KEY)
}

export function setToken(newToken) {
  localStorage.setItem(KEY, newToken)
}

export function removeToken() {
  localStorage.removeItem(KEY)
}
