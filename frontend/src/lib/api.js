import axios from 'axios'
import { getToken } from './auth'



const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const login = data => {
  return axios.post('/api/auth/login/', data)
}

export const logout = () => {
  window.localStorage.removeItem('token')
}


//save drawing

export const saveDrawing = data => {
  return axios.post('/api/drawings/', data, withHeaders())
}
