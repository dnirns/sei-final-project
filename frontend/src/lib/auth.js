export const setToken = receivedToken => {
  window.localStorage.setItem('token', receivedToken)
}


export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  window.localStorage.removeItem('token')
}


export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  return payload ? true : false
}
