export const setToken = receivedToken => {
  window.localStorage.setItem('token', receivedToken)
}


export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  window.localStorage.removeItem('token')
}
