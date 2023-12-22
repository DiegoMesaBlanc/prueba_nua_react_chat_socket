import axios from './axios'

export const messagesRequest = () => {
  return axios.get('/chat/messages/')
}
