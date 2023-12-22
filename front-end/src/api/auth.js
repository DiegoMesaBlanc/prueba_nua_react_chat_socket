import axios from './axios'

export const registerRequest = (user) => {
  return axios.post('/users/register', user)
}

export const loginRequest = (user) => {
  return axios.post('/users/login', user)
}

export const verifyTokenRequest = () => {
  return axios.get('/users/verify')
}
